"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
	function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
	return new (P || (P = Promise))(function (resolve, reject) {
		function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
		function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
		function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
		step((generator = generator.apply(thisArg, _arguments || [])).next());
	});
};
Object.defineProperty(exports, "__esModule", { value: true });
const lodash_1 = require("lodash");
const date_fns_1 = require("date-fns");
function filter(parsedInput, api, hcpartyId, debug) {
	return __awaiter(this, void 0, void 0, function* () {
		const hcpHierarchy = [hcpartyId];
		let hcp;
		while ((hcp = yield api.hcpartyicc.getHealthcareParty(hcpHierarchy[0])).parentId) {
			hcpHierarchy.unshift(hcp.parentId);
		}
		const requestToFilterTypeMap = {
			'SVC': 'ServiceByHcPartyTagCodeDateFilter',
			'HE': 'HealthElementByHcPartyTagCodeFilter',
			'INV': 'InvoiceByHcPartyCodeDateFilter',
			'CTC': 'ContactByHcPartyTagCodeDateFilter'
		};
		const reducers = {
			'count': (params) => (acc, x) => __awaiter(this, void 0, void 0, function* () { return acc === undefined ? [0] : [(yield acc)[0] + 1]; }),
			'sum': (params) => (acc, x) => __awaiter(this, void 0, void 0, function* () {
				const val = (params && params[0] ? lodash_1.get(x, params[0]) : x);
				return acc === undefined ? [0] : [(yield acc)[0] + val];
			}),
			'mean': (params) => (acc, x, idx) => __awaiter(this, void 0, void 0, function* () {
				const val = (params && params[0] ? lodash_1.get(x, params[0]) : x);
				return acc === undefined ? [0] : [(yield acc)[0] + (val - (yield acc)[0]) / ((idx || 0) + 1)];
			}),
			'min': (params) => (acc, x, idx) => __awaiter(this, void 0, void 0, function* () {
				const val = (params && params[0] ? lodash_1.get(x, params[0]) : x);
				return acc === undefined ? [999999999999] : [val < (yield acc)[0] ? val : (yield acc)[0]];
			}),
			'max': (params) => (acc, x, idx) => __awaiter(this, void 0, void 0, function* () {
				const val = (params && params[0] ? lodash_1.get(x, params[0]) : x);
				return acc === undefined ? [-999999999999] : [val > (yield acc)[0] ? val : (yield acc)[0]];
			}),
			's2d': (params) => (acc, x, idx) => __awaiter(this, void 0, void 0, function* () {
				const val = (params && params[0] ? lodash_1.get(x, params[0]) : x);
				const d = val && Number(date_fns_1.format(date_fns_1.fromUnixTime(val), 'yyyyMMdd'));
				return acc === undefined ? [] : (yield acc).concat([d]);
			}),
			'd2s': (params) => (acc, x, idx) => __awaiter(this, void 0, void 0, function* () {
				const val = (params && params[0] ? lodash_1.get(x, params[0]) : x);
				const d = val && date_fns_1.getUnixTime(date_fns_1.parse(val.toString(), 'yyyyMMdd', 0)) || 0;
				return acc === undefined ? [] : (yield acc).concat([d]);
			}),
			'd2y': (params) => (acc, x, idx) => __awaiter(this, void 0, void 0, function* () {
				const val = (params && params[0] ? lodash_1.get(x, params[0]) : x);
				const d = val && date_fns_1.getUnixTime(date_fns_1.parse(val.toString(), 'yyyyMMdd', 0)) || 0;
				return acc === undefined ? [] : (yield acc).concat([(+new Date() / 1000 - d) / (365.25 * 24 * 3600)]);
			}),
			'select': (params) => (acc, x, idx) => __awaiter(this, void 0, void 0, function* () { return acc === undefined ? [] : (yield acc).concat([params ? lodash_1.pick(x, params) : x]); }),
			'share': (params) => (acc, x, idx) => __awaiter(this, void 0, void 0, function* () {
				return acc === undefined || !api.currentUser ? [] : (yield acc).concat([yield api.patienticc.share(api.currentUser, x.id, api.currentUser.healthcarePartyId, params, params.reduce((tags, k) => {
					tags[k] = ['all'];
					return tags;
				}, {}))]);
			})
		};
		const converters = {
			'SVC': (filter) => Object.assign({}, lodash_1.pick(filter, ['healthcarePartyId']), { $type: requestToFilterTypeMap['SVC'] }, {
				codeType: filter.key,
				codeCode: filter.value,
				tagType: filter.colonKey,
				tagCode: filter.colonValue,
				startValueDate: (filter.startDate && filter.startDate.length <= 8) ? filter.startDate + '000000' : filter.startDate,
				endValueDate: (filter.endDate && filter.endDate.length <= 8) ? filter.endDate + '000000' : filter.startDate
			}),
			'HE': (filter) => Object.assign({}, lodash_1.pick(filter, ['healthcarePartyId']), { $type: requestToFilterTypeMap['HE'] }, { codeType: filter.key, codeNumber: filter.value, tagType: filter.colonKey, tagCode: filter.colonValue }),
			'INV': (filter) => Object.assign({}, lodash_1.pick(filter, ['healthcarePartyId']), { $type: requestToFilterTypeMap['INV'] }, { code: filter.value, startInvoiceDate: filter.startDate, endInvoiceDate: filter.endDate }),
			'CTC': (filter) => Object.assign({}, lodash_1.pick(filter, ['healthcarePartyId']), { $type: requestToFilterTypeMap['CTC'] }, {
				// TODO patientSecretForeignKey(s)
				codeType: filter.key,
				codeCode: filter.value,
				tagType: filter.colonKey,
				tagCode: filter.colonValue,
				startServiceValueDate: (filter.startDate && filter.startDate.length <= 8) ? filter.startDate + '000000' : filter.startDate,
				endServiceValueDate: (filter.endDate && filter.endDate.length <= 8) ? filter.endDate + '000000' : filter.startDate
			})
		};
		function rewriteFilter(filter, first, mainEntity, subEntity) {
			return __awaiter(this, void 0, void 0, function* () {
				try {
					if (debug)
						console.error('Rewriting ' + JSON.stringify(filter));
					if (!filter) {
						if (subEntity === 'PAT') {
							return {
								$type: 'PatientByHcPartyFilter',
								healthcarePartyId: hcpartyId
							};
						}
						else if (subEntity === 'CTC') {
							return {
								$type: 'ContactByHcPartyTagCodeDateFilter',
								healthcarePartyId: hcpartyId
							};
						}
					}
					if (filter.$type === 'request' && first && filter.entity) {
						return {
							$type: 'request',
							entity: filter.entity,
							filter: yield rewriteFilter(filter.filter, false, filter.entity, subEntity),
							reducers: filter.reducers
						};
					}
					else if (filter.$type === 'request') {
						if (filter.entity === 'SUBTRACT') {
							if (debug)
								console.log('Subtract');
							const left = yield rewriteFilter(filter.left, first, mainEntity, subEntity);
							const right = filter.right.length > 1 ? { $type: 'UnionFilter', filters: yield Promise.all(filter.right.map((f) => rewriteFilter(f, first, mainEntity, subEntity))) } : yield rewriteFilter(filter.right[0], first, mainEntity, subEntity);
							return { $type: 'ComplementFilter', superSet: left, subSet: right };
						}
						const rewritten = yield rewriteFilter(filter.filter, first, mainEntity, filter.entity);
						const body = { filter: rewritten };
						try {
							if (filter.entity === 'SVC') {
								if (debug)
									console.error('Request SVC: ' + JSON.stringify(body));
								const servicesOutput = lodash_1.uniqBy(lodash_1.flatMap(yield Promise.all(hcpHierarchy.map(hcpId => api.contacticc.filterServicesBy(undefined, undefined, 10000, Object.assign({}, body, { filter: Object.assign({}, body.filter, { healthcarePartyId: hcpId }) })))), pl => pl.rows || []), x => x.id);
								if (mainEntity === 'PAT') {
									const patientIds = yield servicesToPatientIds(servicesOutput);
									if (debug)
										console.log('Patient Ids: ' + patientIds);
									return { $type: 'PatientByIdsFilter', ids: patientIds };
								}
							}
							else if (filter.entity === 'HE') {
								if (debug)
									console.log('Request HE: ' + JSON.stringify(body));
								const helementOutput = lodash_1.uniqBy(lodash_1.flatMap(yield Promise.all(hcpHierarchy.map(hcpId => api.helementicc.filterBy(Object.assign({}, body, { filter: Object.assign({}, body.filter, { healthcarePartyId: hcpId }) })))), pl => pl.rows || []), x => x.id);
								if (mainEntity === 'PAT') {
									const patientIds = yield helementsToPatientIds(helementOutput || []);
									return { $type: 'PatientByIdsFilter', ids: patientIds };
								}
							}
							else if (filter.entity === 'INV') {
								if (debug)
									console.log('Request INV: ' + JSON.stringify(body));
								const invoiceOutput = lodash_1.uniqBy(lodash_1.flatMap(yield Promise.all(hcpHierarchy.map(hcpId => api.invoiceicc.filterBy(Object.assign({}, body, { filter: Object.assign({}, body.filter, { healthcarePartyId: hcpId }) })))), pl => pl.rows || []), x => x.id);
								if (mainEntity === 'PAT') {
									const patientIds = yield invoicesToPatientIds(invoiceOutput || []);
									return { $type: 'PatientByIdsFilter', ids: patientIds };
								}
							}
							else if (filter.entity === 'CTC') {
								if (debug)
									console.log('Request CTC: ' + JSON.stringify(body));
								const user = yield api.usericc.getCurrentUser();
								const contactOutput = lodash_1.uniqBy(lodash_1.flatMap(yield Promise.all(hcpHierarchy.map(hcpId => api.contacticc.filterByWithUser(user, undefined, undefined, undefined, Object.assign({}, body, { filter: Object.assign({}, body.filter, { healthcarePartyId: hcpId }) })))), pl => pl.rows || []), x => x.id);
								if (mainEntity === 'PAT') {
									const patientIds = yield contactsToPatientIds(contactOutput);
									return { $type: 'PatientByIdsFilter', ids: patientIds };
								}
							}
						}
						catch (error) {
							console.error('Error occurred while handling entity ' + filter.entity + ' with body: ' + JSON.stringify(body));
							console.error(error);
							return Promise.reject();
						}
						console.error('Filter not supported yet: ' + filter);
						return Promise.reject();
					}
					else if (filter.$type !== 'request') {
						if (filter.filters) {
							let target = JSON.parse(JSON.stringify(filter));
							target.filters = yield Promise.all(filter.filters.map((f) => __awaiter(this, void 0, void 0, function* () { return rewriteFilter(f, first, mainEntity, subEntity); })));
							return target;
						}
						else if (filter.subSet || filter.superSet) {
							let target = JSON.parse(JSON.stringify(filter));
							if (filter.subSet)
								target.subSet = yield rewriteFilter(target.subSet, first, mainEntity, subEntity);
							if (filter.superSet)
								target.superSet = yield rewriteFilter(target.superSet, first, mainEntity, subEntity);
							return target;
						}
						else { // TODO maybe other conditions here
							if (filter.$type === 'PLACEHOLDER') {
								// @ts-ignore
								const newFilter = converters[subEntity || mainEntity](filter);
								if (debug)
									console.log('Leaf filter: ' + JSON.stringify(filter));
								return newFilter;
							}
							if (debug)
								console.error('Leaf filter: ' + JSON.stringify(filter));
							return filter;
						}
					}
					else { // never hits this
						console.error('Failed to parse filter: ' + JSON.stringify(filter));
						return Promise.reject();
					}
				}
				catch (error) {
					console.error('Error occurred while rewriting filter: ' + JSON.stringify(filter));
					console.error(error);
					return Promise.reject();
				}
			});
		}
		function handleFinalRequest(filter) {
			return __awaiter(this, void 0, void 0, function* () {
				if (debug)
					console.log('Final request: ' + JSON.stringify(filter));
				if (filter.$type === 'request' && filter.entity && filter.filter) {
					let res;
					if (filter.entity === 'PAT') {
						res = yield api.patienticc.filterByWithUser(yield api.usericc.getCurrentUser(), undefined, undefined, undefined, undefined, undefined, undefined, { filter: filter.filter });
					}
					else if (filter.entity === 'HE') {
						res = yield api.helementicc.filterBy({ filter: filter.filter });
					}
					else if (filter.entity === 'SVC') {
						res = yield api.contacticc.filterServicesBy(undefined, undefined, undefined, { filter: filter.filter });
					}
					else if (filter.entity === 'INV') {
						res = yield api.invoiceicc.filterBy({ filter: filter.filter });
					}
					else if (filter.entity === 'CTC') {
						res = yield api.contacticc.filterByWithUser(yield api.usericc.getCurrentUser(), undefined, undefined, undefined, { filter: filter.filter });
					}
					else {
						console.error('Entity not supported yet: ' + filter.entity);
						return Promise.reject();
					}
					if (res && res.rows) {
						filter.reducers && (yield filter.reducers.reduce((p, r) => __awaiter(this, void 0, void 0, function* () {
							yield p;
							const red = reducers[r.reducer] && reducers[r.reducer](r.params);
							if (red) {
								const reducedRows = yield res.rows.reduce(red, yield red());
								res = Object.assign(res, { rows: reducedRows });
							}
						}), null));
					}
					return res;
				}
				else {
					console.error('Filter not valid: ' + JSON.stringify(filter, null, ' '));
					return {};
				}
			});
		}
		function servicesToPatientIds(services) {
			return __awaiter(this, void 0, void 0, function* () {
				try {
					const extractPromises = services.map((svc) => {
						return api.cryptoicc.extractKeysFromDelegationsForHcpHierarchy(hcpartyId, svc.contactId || '', svc.cryptedForeignKeys || {});
					}).map(it => it.catch(e => {
						console.error('Skipped error while converting service to patient id (might be due to missing patient)');
						console.error(e);
						return e;
					}));
					// @ts-ignore (no smartcast to non-nullable)
					return [...new Set(lodash_1.flatMap((yield Promise.all(extractPromises)).filter(result => !(result instanceof Error)), it => it.extractedKeys))]; // set to remove duplicates
				}
				catch (error) {
					console.error('Error while converting services to patient ids');
					console.error(error);
					return Promise.reject();
				}
			});
		}
		function helementsToPatientIds(helements) {
			return __awaiter(this, void 0, void 0, function* () {
				try {
					const extractPromises = helements.map((he) => api.cryptoicc.extractKeysFromDelegationsForHcpHierarchy(hcpartyId, he.id || '', he.cryptedForeignKeys || {}));
					return [...new Set(lodash_1.flatMap(yield Promise.all(extractPromises), it => it.extractedKeys))];
				}
				catch (error) {
					console.error('Error while converting health elements to patient ids');
					console.error(error);
					return Promise.reject();
				}
			});
		}
		function invoicesToPatientIds(invoices) {
			return __awaiter(this, void 0, void 0, function* () {
				try {
					const extractPromises = invoices.map((inv) => api.cryptoicc.extractKeysFromDelegationsForHcpHierarchy(hcpartyId, inv.id || '', inv.cryptedForeignKeys || {}));
					return [...new Set(lodash_1.flatMap(yield Promise.all(extractPromises), it => it.extractedKeys))];
				}
				catch (error) {
					console.error('Error while converting invoices to patient ids');
					console.error(error);
					return Promise.reject();
				}
			});
		}
		function contactsToPatientIds(contactsOutput) {
			return __awaiter(this, void 0, void 0, function* () {
				try {
					const contacts = contactsOutput || [];
					const extractPromises = contacts.map((ctc) => api.cryptoicc.extractKeysFromDelegationsForHcpHierarchy(hcpartyId, ctc.id || '', ctc.cryptedForeignKeys || {}));
					return [...new Set(lodash_1.flatMap(yield Promise.all(extractPromises), it => it.extractedKeys))];
				}
				catch (error) {
					console.error('Error while converting contacts to patient ids');
					console.error(error);
					return Promise.reject();
				}
			});
		}
		const treatedFilter = yield rewriteFilter(parsedInput, true, '', '');
		return handleFinalRequest(treatedFilter);
	});
}
exports.filter = filter;
//# sourceMappingURL=filters.js.map
