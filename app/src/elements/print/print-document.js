import '../ht-spinner/ht-spinner.js';

import _ from 'lodash/lodash';
import moment from 'moment/src/moment';
import {Base64} from 'js-base64';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";

class PrintDocument extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
        <style>
            .overlaySpinnerContainer {
                position:absolute;
                width:100%;
                height:100%;
                z-index:10;
                background:rgba(255, 255, 255, .8);
                top:0;
                left:0;
            }
            .overlaySpinner {
                max-width:80px;
                margin:100px auto
            }
        </style>
        <template is="dom-if" if="[[_isBusy]]"><div class="overlaySpinnerContainer"><div class="overlaySpinner"><ht-spinner active=""></ht-spinner></div></div></template>
`;
    }

    static get is() {
        return 'print-document';
    }

    static get properties() {
        return {
            api: {
                type: Object,
                noReset: true,
                value: () => {
                }
            },
            user: {
                type: Object,
                noReset: true,
                value: () => {
                }
            },
            resources: {
                type: Object,
                noReset: true,
                value: () => {
                }
            },
            language: {
                type: String,
                noReset: true,
                value: "fr"
            },
            patient: {
                type: Object,
                noReset: true,
                value: () => {
                }
            },
            _isBusy: {
                type: Boolean,
                value: false,
                noReset: true
            },
            _data: {
                type: Object,
                value: () => {
                    return {
                        currentHcp: {
                            type: Object,
                            value: () => {
                            }
                        },
                        currentPatient: {
                            type: Object,
                            value: () => {
                            }
                        },
                        codes: {
                            type: Object,
                            value: () => {
                            }
                        },
                        contact: {
                            type: Object,
                            value: () => {
                            }
                        },
                        document: {
                            type: Object,
                            value: () => {
                            }
                        },
                    }
                }
            }
        };
    }

    static get observers() {
        return [];
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
        // if(this.patientHealthCarePartiesById == null) {
        //     Promise.all(
        //         _.chunk(this.patient.patientHealthCareParties,100).map(uChunk =>
        //             this.api.hcparty().getHealthcareParties(uChunk.map(u => u.healthcarePartyId).filter(id => !!id).join(','))
        //         )
        //     ).then(hcps => {
        //         this.patientHealthCarePartiesById = _.flatMap(hcps).reduce((acc, hcp) => {
        //             if(_.trim(_.get(hcp,"id",""))) acc[hcp.id] = hcp
        //             return acc
        //         }, {});
        //     } )
        // }
    }

    _resetComponentProperties() {
        const promResolve = Promise.resolve();
        return promResolve
            .then(() => {
                const componentProperties = PrintDocument.properties
                Object.keys(componentProperties).forEach(k => {
                    if (!_.get(componentProperties[k], "noReset", false)) {
                        this.set(k, (typeof componentProperties[k].value === 'function' ? componentProperties[k].value() : (componentProperties[k].value || null)))
                    }
                })
                return promResolve
            })
    }

    _msTstampToDDMMYYYY(msTstamp) {
        return parseInt(msTstamp) ? this.api.moment(parseInt(msTstamp)).format('DD/MM/YYYY') : ""
    }

    _msTstampToYYYYMMDD(msTstamp) {
        return parseInt(msTstamp) ? this.api.moment(parseInt(msTstamp)).format('YYYYMMDD') : ""
    }

    _YYYYMMDDToDDMMYYYY(inputValue) {
        return parseInt(inputValue) ? this.api.moment(_.trim(parseInt(inputValue)), "YYYYMMDD").format('DD/MM/YYYY') : ""
    }

    _YYYYMMDDHHmmssToDDMMYYYYHHmmss(inputValue) {
        return parseInt(inputValue) ? this.api.moment(_.trim(parseInt(inputValue)), "YYYYMMDDHHmmss").format('DD/MM/YYYY HH:mm:ss') : ""
    }

    _upperFirstAll(inputValue) {
        return _.trim(_.map(_.trim(inputValue).toLowerCase().split(" "), i => _.upperFirst(_.trim(i))).join(" "))
    }

    _dobToAge(inputValue) {
        return inputValue ? this.api.getCurrentAgeFromBirthDate(inputValue, (e, s) => this.localize(e, s, this.language)) : ''
    }

    _getServiceAuthor(svc) {
        return this.api.getAuthor(svc.author);
    }

    _getServiceShortDescription(svc) {
        return this.api.contact().shortServiceDescription(svc, this.language);
    }

    _prettifyText(input) {
        return _.trim(input).replace(/\r\n|\n|\r/gm, "\n")
    }

    _getServiceNormalValues(svc) {
        const c = this.api.contact().preferredContent(svc, this.language)
        return c && c.measureValue && `${c.measureValue.ref ? c.measureValue.ref.toFixed(2) : ''} ${c.measureValue.min || c.measureValue.max ? `${c.measureValue.min ? c.measureValue.min.toFixed(1) : '*'} - ${c.measureValue.max ? c.measureValue.max.toFixed(1) : '*'}` : ''}` || '';
    }

    _getPrettifiedHcp() {
        const promResolve = Promise.resolve()
        return this.api.hcparty().getCurrentHealthcareParty()
            .then(hcp => {
                const addressData = _.find(_.get(hcp, "addresses", []), {addressType: "work"}) || _.find(_.get(hcp, "addresses", []), {addressType: "home"}) || _.get(hcp, "addresses[0]", [])
                return _.merge({}, hcp, {
                    address: [_.trim(_.get(addressData, "street", "")), _.trim(_.get(addressData, "houseNumber", "")) + (!!_.trim(_.get(addressData, "postboxNumber", "")) ? "/" + _.trim(_.get(addressData, "postboxNumber", "")) : "")].join(", "),
                    postalCode: _.trim(_.get(addressData, "postalCode", "")),
                    city: this._upperFirstAll(_.trim(_.get(addressData, "city", ""))),
                    country: this._upperFirstAll(_.trim(_.get(addressData, "country", ""))),
                    phone: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "phone"}), "telecomNumber", "")),
                    mobile: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "mobile"}), "telecomNumber", "")),
                    email: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "email"}), "telecomNumber", "")),
                    firstName: this._upperFirstAll(_.get(hcp, "firstName", "")),
                    lastName: this._upperFirstAll(_.get(hcp, "lastName", "")),
                    nihiiHr: this.api.formatInamiNumber(_.trim(_.get(hcp, "nihii", ""))),
                    ssinHr: this.api.formatSsinNumber(_.trim(_.get(hcp, "ssin", ""))),
                })
            })
            .catch(() => promResolve)
    }

    _prettifyPatient(patient) {
        const addressData = _.find(_.get(patient, "addresses", []), {addressType: "home"}) || _.find(_.get(patient, "addresses", []), {addressType: "work"}) || _.get(patient, "addresses[0]", [])
        return _.merge({}, patient, {
            address: [_.trim(_.get(addressData, "street", "")), _.trim(_.get(addressData, "houseNumber", "")) + (!!_.trim(_.get(addressData, "postboxNumber", "")) ? "/" + _.trim(_.get(addressData, "postboxNumber", "")) : "")].join(", "),
            postalCode: _.trim(_.get(addressData, "postalCode", "")),
            city: this._upperFirstAll(_.trim(_.get(addressData, "city", ""))),
            country: this._upperFirstAll(_.trim(_.get(addressData, "country", ""))),
            phone: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "phone"}), "telecomNumber", "")),
            mobile: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "mobile"}), "telecomNumber", "")),
            email: _.trim(_.get(_.find(_.get(addressData, "telecoms", []), {"telecomType": "email"}), "telecomNumber", "")),
            firstName: this._upperFirstAll(_.get(patient, "firstName", "")),
            lastName: this._upperFirstAll(_.get(patient, "lastName", "")),
            ssinHr: this.api.formatSsinNumber(_.trim(_.get(patient, "ssin", ""))),
            gender: _.trim(_.get(patient, "gender", "male")),
            genderHr: this._upperFirstAll(this.localize(_.trim(_.get(patient, "gender", "male")) + "GenderLong", "masculin")),
            dateOfBirthHr: this._YYYYMMDDToDDMMYYYY(_.trim(_.get(patient, "dateOfBirth"))),
            insuranceData: _
                .chain(_.get(patient, "insurabilities", {}))
                .filter((i) => {
                    return i &&
                        !!moment(_.trim(_.get(i, "startDate", "0")), "YYYYMMDD").isBefore(moment()) &&
                        (!!moment(_.trim(_.get(i, "endDate", "0")), "YYYYMMDD").isAfter(moment()) || !_.trim(_.get(i, "endDate", ""))) &&
                        !!_.trim(_.get(i, "insuranceId", ""))
                })
                .map(i => {
                    return {
                        insuranceId: _.trim(_.get(i, "insuranceId", "")),
                        identificationNumber: _.trim(_.get(i, "identificationNumber", "")),
                        tc1: _.trim(_.get(i, "parameters.tc1", "")),
                        tc2: _.trim(_.get(i, "parameters.tc2", "")),
                        preferentialstatus: typeof _.get(i, "parameters.preferentialstatus") === "boolean" ? !!_.get(i, "parameters.preferentialstatus", false) : _.trim(_.get(i, "parameters.preferentialstatus")) === "true"
                    }
                })
                .head()
                .value(),
        })
    }

    _getPrettifiedPatient(user, patientId, patientObject = null) {
        const promResolve = Promise.resolve()
        return !_.size(patientObject) && (!_.trim(_.get(user, "id")) || !_.trim(patientId)) ? promResolve : (!!_.size(patientObject) ? Promise.resolve(patientObject) : this.api.patient().getPatientWithUser(user, patientId))
            .then(patient => this._prettifyPatient(patient))
            .then(patient => this._getInsuranceData(_.trim(_.get(patient, "insuranceData.insuranceId"))).then(insuranceData => _.merge({}, patient, {insuranceData: insuranceData})))
            .catch(() => promResolve)
    }

    _getInsuranceData(insuranceId) {
        const promResolve = Promise.resolve()
        return !_.trim(insuranceId) ? promResolve : this.api.insurance().getInsurance(insuranceId)
            .then(insuranceData => _.merge({}, {
                code: _.trim(_.get(insuranceData, "code", "")),
                name: this._upperFirstAll(!!_.trim(_.get(insuranceData, "name." + this.language, "")) ? _.trim(_.get(insuranceData, "name." + this.language, "")) : _.trim(_.find(_.get(insuranceData, "name", {}), _.trim)))
            }))
            .catch(() => promResolve)
    }

    _getCodesByType(codeType) {
        const promResolve = Promise.resolve()
        return !_.trim(codeType) ? promResolve : this.api.code().findPaginatedCodes("be", codeType)
            .then(({rows}) => _
                .chain(rows)
                .filter(i => !_.get(i, "disabled", false))
                .map(i => _.merge({}, i, {
                    labelHr: codeType === "CD-TRANSACTION" ?
                        _.upperFirst(_.trim(this.localize("cd-transaction-" + _.trim(_.get(i, "code")), _.trim(_.get(i, "code")), this.language)).toLowerCase()) :
                        _.trim(_.get(i, "label." + this.language, "")) ?
                            _.upperFirst(_.trim(_.get(i, "label." + this.language, "")).toLowerCase()) :
                            _.upperFirst(_.trim(_.head(_.flatMap(_.get(i, "label", "")))).toLowerCase())
                }))
                .orderBy(["labelHr"], ["asc"])
                .value()
            )
            .then(codes => _.fromPairs([[codeType, codes]]))
            .catch(() => promResolve)
    }

    _getContact(user, contactId) {
        const promResolve = Promise.resolve()
        return !_.trim(_.get(user, "id")) || !_.trim(contactId) ? promResolve : this.api.contact().getContactWithUser(user, contactId)
            .then(contact => _.merge(contact, {
                createdHr: this._msTstampToDDMMYYYY(_.get(contact, "created", "")),
                openingDateHr: this._YYYYMMDDToDDMMYYYY(_.trim(_.get(contact, "openingDate", "")).substring(0, 8)),
                openingDateYYYYMMDD: _.trim(_.get(contact, "openingDate", "")).substring(0, 8),
                closingDateHr: this._YYYYMMDDToDDMMYYYY(_.trim(_.get(contact, "closingDate", "")).substring(0, 8)),
            }))
            .catch(() => promResolve)
    }

    _prettifyDocInfo(docInfo) {
        return !_.size(docInfo) ? null : _.merge({}, docInfo, {
            demandDateHr: this._msTstampToDDMMYYYY(_.get(docInfo, "demandDate", "")),
            firstName: this._upperFirstAll(_.get(docInfo, "firstName", "")),
            lastName: this._upperFirstAll(_.get(docInfo, "lastName", "")),
            labo: this._upperFirstAll(_.get(docInfo, "labo", "")),
            ssinHr: this.api.formatSsinNumber(_.trim(_.get(docInfo, "ssin", ""))),
            dateOfBirthHr: this._YYYYMMDDToDDMMYYYY(_.trim(_.get(docInfo, "dateOfBirth"))),
        })
    }

    _getDocument(user, documentId) {
        const promResolve = Promise.resolve()
        return !_.trim(documentId) ? promResolve : this.api.document().getDocument(documentId)
            .then(document => !_.size(_.get(document, "encryptionKeys", [])) && !_.size(_.get(document, "delegations", [])) ?
                Promise.resolve([document, null]) :
                this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(_.trim(_.get(user, "healthcarePartyId", "")), _.trim(_.get(document, "id", "")), _.size(_.get(document, "encryptionKeys", [])) ? _.get(document, "encryptionKeys", []) : _.get(document, "delegations", []))
                    .then(({extractedKeys: enckeys}) => ([document, enckeys]))
                    .catch(() => Promise.resolve([document, null]))
            )
            .then(([document, enckeys]) => this.api.beresultimport().canHandle(_.trim(_.get(document, "id", "")), (enckeys || []).join(',')).then(canHandle => ([document, enckeys, !!canHandle])).catch(() => Promise.resolve([document, enckeys, false])))
            .then(([document, enckeys, canHandle]) => !canHandle ? Promise.resolve([document, enckeys]) : this.api.beresultimport().getInfos(_.trim(_.get(document, "id", "")), true, null, (enckeys || []).join(',')).then(docInfo => ([_.merge({}, document, {docInfo: this._prettifyDocInfo(_.head(docInfo))}), enckeys])).catch(() => Promise.resolve([document, enckeys])))
            .then(([document, enckeys]) => this.api.document().getAttachment(_.trim(_.get(document, "id", "")), _.trim(_.get(document, "attachmentId", "")), (enckeys || []).join(','))
                .then(attachmentContent =>
                    this.api.document().getAttachmentUrl(_.trim(_.get(document, "id", "")), _.trim(_.get(document, "attachmentId", "")), enckeys)
                        .then(url => ({attachmentContent, url})))
                .then(({attachmentContent, url}) => _.merge({}, document, {
                    attachment: {
                        content: attachmentContent,
                        downloadUrl: url
                    }
                })).catch(() => Promise.resolve(document)))
            .then(document => {
                const fileExtension = (_.trim(_.get(document, "name", "")).split(".").pop()).toLowerCase()
                const attachmentSize = _.get((typeof _.get(document, "attachment.content", "") === "string" ? this.api.crypto().utils.text2ua(_.get(document, "attachment.content", "")) : _.get(document, "attachment.content", "")), "byteLength", 0)
                const attachmentSizePow = attachmentSize > (1024 ** 2) ? 2 : attachmentSize > 1024 ? 1 : 0
                return _.merge({}, document, {
                    attachment: {
                        filename: _.kebabCase(_.trim(_.get(document, "name", "")).toLowerCase().replace("." + fileExtension, "")) + "." + _.trim(fileExtension),
                        fileExtension: fileExtension,
                        size: this.api._powRoundFloatByPrecision(attachmentSize / (1024 ** attachmentSizePow), 2) + " " + _.trim(attachmentSizePow === 2 ? "Mb" : attachmentSizePow === 1 ? "Kb" : "Bytes"),
                        mimeType: _.trim(this.api.document().mimeType(_.trim(_.get(document, "mainUti", "")))) ? _.trim(this.api.document().mimeType(_.trim(_.get(document, "mainUti", "")))) : "text/plain",
                    }
                })
            })
            .then(document => !_.trim(_.get(document, "docInfo.ssin", "")) ?
                document :
                this.api.patient().findByNameBirthSsinAutoWithUser(user, _.trim(_.get(user, "healthcarePartyId", "")), _.trim(_.get(document, "docInfo.ssin", "")), null, null, 10)
                    .then(({rows}) => !_.size(rows) ? document : this._getPrettifiedPatient(null, null, _.chain(rows).filter(i => !!_.get(i, "active", false)).orderBy(["modified"], ["desc"]).head().value()).then(patient => _.merge({}, document, {docInfo: {patient: patient}})))
                    .catch(() => Promise.resolve(document))
            )
            .catch(() => promResolve)
    }

    _isServiceOutOfRange(svc) {
        const c = this.api.contact().preferredContent(svc, this.language)
        return (c && c.measureValue && (c.measureValue.value < c.measureValue.min || c.measureValue.value > c.measureValue.max))
    }

    _getServiceDate(svc) {
        return (svc && svc.modified) ? this.api.moment(svc.modified).format(svc.modified > 99991231 ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY') : '';
    }

    _getHealthCareParty(ctc) {
        const usr = this.api.users && this.api.users[ctc.author];
        const hcpid = ctc.responsible ? ctc.responsible : (usr ? usr.healthcarePartyId : null);
        let hcp = hcpid && this.patientHealthCarePartiesById ? this.patientHealthCarePartiesById[hcpid] : null;
        hcp = hcp ? hcp : (hcpid ? this.api.hcParties[hcpid] : null);
        let name
        if (hcp && hcp.name != null && hcp.name != "") {
            name = hcp && hcp.name
        } else {
            name = hcp && hcp.lastName + " " + (hcp.firstName && hcp.firstName.length && hcp.firstName.substr(0, 1) + ".")
        }
        return name || usr && usr.login || "N/A";
    }

    _isPdf(input) {
        return _.trim(_.get(input, "fileExtension", "")) === "pdf" || _.trim(_.get(input, "mimeType", "")) === "application/pdf"
    }

    _isImage(input) {
        return ["jpg", "jpeg", "gif", "png"].indexOf(_.trim(_.get(input, "fileExtension", ""))) > -1 || _.trim(_.get(input, "mimeType", "")).substring(0, 6) === "image/"
    }

    _getImage(mimeType, content) {
        return '<div class="imageContainer p10 textaligncenter borderSolid borderW1px borderColorBlack"><img src="data:' + _.trim(mimeType) + ';base64,' + btoa(this.api.crypto().utils.ua2text(content)) + '"/></div>'
    }

    _localize(value, defaultValue) {
        return value ? this.localize(value.code, value.default, this.language) : defaultValue;
    }

    _isDocument(service) {
        return service.label === "document" || service.label === "imported document";
    }

    _generatePdfDate(date, format = "DD/MM/YYYY hh:mm", empty = "") {
        return date ? this.api.moment(date).format(format) : empty;
    }

    _generatePdfShortDate(date, empty = "") {
        return this._generatePdfDate(date, "DD/MM/YYYY", empty);
    }

    _generatePdfRow(label, value, codes = null) {
        let html = "<div class='row'>";
        html += "<div class='label'>" + label + "</div>";
        const code = codes ? codes.find(c => c.id == value) : null;
        value = code ? code.label.fr : value;
        html += "<div class='value'>" + value + "</div>";
        html += "</div>";
        return html;
    }

    _generatePdfContact(contact, codes, forms, templates, healthElements, documents) {
        if ((!contact.services || contact.services.length < 1) &&
            (!contact.subContacts || contact.subContacts.length < 1) &&
            (!contact.healthElements || contact.healthElements.length < 1))
            return "";
        if (contact.encounterType && contact.encounterType.type == "CD-TRANSACTION")
            return "";

        let html = "<div class='contact'>";
        html += "<div class='contact-header'>";
        html += "<div>" + this._generatePdfDate(contact.openingDate) + "&nbsp;(" + contact.id.substring(0, 8) + ")&nbsp;</div>";
        html += "<div>" + (contact.userDescr || "").replace(/(\r\n|\n|\r)/gm, " ") + "&nbsp;</div>";
        html += "<div class='contact-hcp'>" + this._getHealthCareParty(contact) + "</div>";
        //html += this._generatePdfDate(contact.closingDate);
        html += "</div>";

        html += "<div class='contact-body'>";

        if (contact.healthElements && contact.healthElements.length > 0) {
            html += "<div class='b'>Elements de santé</div>";
            contact.healthElements.forEach(healthElement => {
                html += this._generatePdfHealthElement(healthElement, healthElements);
            });
        }

        let subContacts = contact.subContacts.filter(s => !s.status || s.status != 64);

        if (subContacts && subContacts.length > 0) {
            html += "<div class='b'>Sous-contacts</div>";
            subContacts.forEach(subContact => {
                html += this._generatePdfSubContact(subContact, contact.services, codes, forms, templates);
            });
        }

        let services = contact.services.filter(s => this._isDocument(s));

        if (services && services.length > 0) {
            html += "<div class='b'>Services</div>";
            services.forEach(service => {
                html += this._generatePdfService(service, documents);
            });
        }

        html += "</div>";
        html += "</div>";
        return html;
    }

    static getHealthElementAttributes() {
        return {
            status: {
                label: {code: "sta", default: "Status"},
                values: [
                    {id: "active-relevant", code: "act-rel", default: "Active relevant"},
                    {id: "active-irrelevant", code: "act_irr", default: "Active irrelevant"},
                    {id: "inactive", code: "ina", default: "Inactive"},
                    {id: "archived", code: "archiv", default: "Archived"}
                ]
            },
            certainty: {
                type: "CD-CERTAINTY",
                label: {code: "cert", default: "Certainty"},
                values: [
                    {id: "proven", code: "proven", default: "Proven"},
                    {id: "probable", code: "probable", default: "Probable"},
                    {id: "unprobable", code: "unprobable", default: "Improbable"},
                    {id: "excluded", code: "excluded", default: "Excluded"}
                ]
            },
            severity: {
                type: "CD-SEVERITY",
                label: {code: "sev", default: "Severity"},
                values: [
                    {id: "normal", code: "normal", default: "No problem"},
                    {id: "verylow", code: "verylow", default: "Light"},
                    {id: "low", code: "low", default: "Moderate"},
                    {id: "high", code: "high", default: "Severe"},
                    {id: "veryhigh", code: "veryhigh", default: "Total"}
                ]
            },
            temporality: {
                type: "CD-TEMPORALITY",
                label: {code: "", default: "Rémanence"},
                values: [
                    {id: "chronic", code: "chronic", default: "Chronic"},
                    {id: "subbacute", code: "subbacute", default: "Sub-acute"},
                    {id: "acute", code: "acute", default: "Acute"}
                ]
            },
            extraTemporality: {
                type: "CD-EXTRA-TEMPORALITY",
                label: {code: "ext_temp", default: "Extra temporalité"},
                values: [
                    {id: "remission", code: "remission", default: "Remission"},
                    {id: "relapse", code: "relapse", default: "Relapse"}
                ]
            },
            openingDate: {
                label: {code: "st_da", default: "Start date"}
            },
            closingDate: {
                label: {code: "en_da", default: "End date"}
            }
        }
    }

    _generatePdfHealthElementTag(healthElement, attribute) {
        const tag = healthElement.tags.find(t => t.type == attribute.type);
        if (!(tag && tag.code)) return "";
        const label = attribute.label;
        const value = attribute.values.find(v => v.id == tag.code);
        return this._generatePdfRow(this._localize(label), this._localize(value, tag.code));
    }

    _generatePdfHealthElement(healthElement, healthElements) {
        healthElement = healthElements.find(he => he.id == healthElement.id);
        if (!healthElement) return "";
        let code = healthElement.codes.find(c => c.type == "ICPC");
        let html = this._generatePdfRow((code ? code.code : healthElement.id), healthElement.descr);

        const attributes = PrintDocument.getHealthElementAttributes();

        if (healthElement.status) {
            const status = parseInt(healthElement.status);
            const value = attributes.status.values[status - 1];
            html += this._generatePdfRow(this._localize(attributes.status.label), this._localize(value));
        }
        html += this._generatePdfHealthElementTag(healthElement, attributes.certainty);
        html += this._generatePdfHealthElementTag(healthElement, attributes.severity);
        html += this._generatePdfHealthElementTag(healthElement, attributes.temporality);
        html += this._generatePdfHealthElementTag(healthElement, attributes.extraTemporality);

        html += this._generatePdfRow(this._localize(attributes.openingDate.label),
            this._generatePdfShortDate(healthElement.openingDate));

        if (healthElement.closingDate)
            this._generatePdfRow(this._localize(attributes.closingDate.label),
                this._generatePdfShortDate(healthElement.closingDate));

        return html;
    }

    _getDocumentType(code) {
        const type = this.documentTypes.find(t => t.code == code);
        return type ? type.name : this.localize('cd-transaction-' + code, code, this.language);
    }

    _getValue(service) {
        return
        service.content &&
        service.content.fr &&
        service.content.fr.stringValue ? service.content.fr.stringValue : "";
    }

    _generatePdfService(service, documents) {
        let html = "<div class='row'>";
        if (service.label === "document") {
            let tag = service.tags.find(t => t.type == "CD-TRANSACTION");
            const code = tag && tag.code ? tag.code : null;
            if (code)
                html += "<div class='b'>" + this._getDocumentType(code) + ":&nbsp;</div>";
            html += "<div>" + this._getValue(service) + "</div>";
        } else if (service.label === "imported document") {
            let tag = service.tags.find(t => t.type == "CD-TRANSACTION");
            const code = tag && tag.code ? tag.code : "unknwon";
            html += "<div class='b'>" + this._getDocumentType(code) + ":&nbsp;</div>";
            html += "<div>" + this._getValue(service) + "</div>";
        } else {
            html += "<div>" + service.id + "</div>";
            html += "<div>" + service.label + "</div>";
        }
        html += "</div>";
        if (service.content && service.content.fr && service.content.fr.documentId) {
            const document = documents.find(d => d.id == service.content.fr.documentId);
            if (document && document.attachment && this._isImage(document.attachment))
                html += this._getImage(document.attachment.mimeType, document.attachment.content);
        }
        return html;
    }

    _generatePdfValue(id, services, fields, codes) {
        const service = services.find(s => s.id == id);
        if (!service || service.endOfLife) return "";
        // Quick and dirty, should be improved (if possible)
        if (service.label === "Anamnèse")
            return "";
        const field = fields.find(f => f.name == service.label);
        let label = field ? field.label : service.label;
        let value = null;
        if (service.content && service.content.fr) {
            if (service.label == "Prescription") {
                if (service.content.fr.medicationValue.medicinalProduct)
                    value = service.content.fr.medicationValue.medicinalProduct.intendedname;
                else if (service.content.fr.medicationValue.substanceProduct)
                    value = service.content.fr.medicationValue.substanceProduct.intendedname;
            } else if (service.content.fr.numberValue)
                value = service.content.fr.numberValue;
            else if (service.content.fr.stringValue)
                value = service.content.fr.stringValue;
            else if (service.content.fr.measureValue)
                value = service.content.fr.measureValue.value;
        }
        if (!value) return "";
        return this._generatePdfRow(label, value, codes);
    }

    _generatePdfSubContact(subContact, services, codes, forms, templates) {
        let html = "";
        if (subContact.formId) {
            let fields = []
            let title = subContact.formId;
            let form = forms.find(f => f.id == subContact.formId);
            if (form) {
                title = form.descr;
                const template = templates.find(t => t.id == form.formTemplateId);
                if (template && template.layout) {
                    if (/^(([0-9A-F]){8}-(([0-9A-F]){4}-){3}([0-9A-F]){12})$/i.test(title))
                        title = template.layout.name;
                    fields = template.layout.sections.flatMap(s => s.formColumns.flatMap(c => c.formDataList.flatMap(i => i)));
                }
            }
            html = "<div>" + title + "</div>";
            subContact.services.forEach(service => {
                html += this._generatePdfValue(service.serviceId, services, fields, codes);
            });
        } else if (subContact.status == 64 && subContact.tags && subContact.tags.length > 0 && subContact.tags[0].type && subContact.tags[0].code)
            html += this._generatePdfRow(subContact.tags[0].type, subContact.tags[0].code, codes);
        return html;
    }

    _getPdfStyle() {
        return `
          <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

          <style>

              @page {size: A4; width: 210mm; height: 297mm; margin: 0; padding: 0; }
              body {margin: 0; padding: 0; font-family: /* "Open Sans", */ Arial, Helvetica, sans-serif; line-height:1.3em; }
              .page { width: 210mm; color:#000000; font-size:12px; padding:10mm; position:relative; /* border:1px solid #f00; */ }

              h1 { font-size:17px; margin:0; padding:0; }
              h2 { font-size:15px; font-weight:400; font-style: italic; text-align: center; padding:0; margin:0; }
              p { margin:0 0 10px 0; padding:0; }

              .m0auto { margin:0 auto }

              .m0 { margin:0px } .m1 { margin:1px } .m2 { margin:2px } .m3 { margin:3px } .m4 { margin:4px } .m5 { margin:5px } .m6 { margin:6px } .m7 { margin:7px } .m8 { margin:8px } .m9 { margin:9px } .m10 { margin:10px } .m15 { margin:15px } .m20 { margin:20px } .m25 { margin:25px } .m30 { margin:30px } .m35 { margin:35px } .m40 { margin:40px } .m45 { margin:45px } .m50 { margin:50px }
              .mt0 { margin-top:0px } .mt1 { margin-top:1px } .mt2 { margin-top:2px } .mt3 { margin-top:3px } .mt4 { margin-top:4px } .mt5 { margin-top:5px } .mt6 { margin-top:6px } .mt7 { margin-top:7px } .mt8 { margin-top:8px } .mt9 { margin-top:9px } .mt10 { margin-top:10px } .mt15 { margin-top:15px } .mt20 { margin-top:20px } .mt25 { margin-top:25px } .mt30 { margin-top:30px } .mt35 { margin-top:35px } .mt40 { margin-top:40px } .mt45 { margin-top:45px } .mt50 { margin-top:50px }
              .mr0 { margin-right:0px } .mr1 { margin-right:1px } .mr2 { margin-right:2px } .mr3 { margin-right:3px } .mr4 { margin-right:4px } .mr5 { margin-right:5px } .mr6 { margin-right:6px } .mr7 { margin-right:7px } .mr8 { margin-right:8px } .mr9 { margin-right:9px } .mr10 { margin-right:10px } .mr15 { margin-right:15px } .mr20 { margin-right:20px } .mr25 { margin-right:25px } .mr30 { margin-right:30px } .mr35 { margin-right:35px } .mr40 { margin-right:40px } .mr45 { margin-right:45px } .mr50 { margin-right:50px }
              .mb0 { margin-bottom:0px } .mb1 { margin-bottom:1px } .mb2 { margin-bottom:2px } .mb3 { margin-bottom:3px } .mb4 { margin-bottom:4px } .mb5 { margin-bottom:5px } .mb6 { margin-bottom:6px } .mb7 { margin-bottom:7px } .mb8 { margin-bottom:8px } .mb9 { margin-bottom:9px } .mb10 { margin-bottom:10px } .mb15 { margin-bottom:15px } .mb20 { margin-bottom:20px } .mb25 { margin-bottom:25px } .mb30 { margin-bottom:30px } .mb35 { margin-bottom:35px } .mb40 { margin-bottom:40px } .mb45 { margin-bottom:45px } .mb50 { margin-bottom:50px }
              .ml0 { margin-left:0px } .ml1 { margin-left:1px } .ml2 { margin-left:2px } .ml3 { margin-left:3px } .ml4 { margin-left:4px } .ml5 { margin-left:5px } .ml6 { margin-left:6px } .ml7 { margin-left:7px } .ml8 { margin-left:8px } .ml9 { margin-left:9px } .ml10 { margin-left:10px } .ml15 { margin-left:15px } .ml20 { margin-left:20px } .ml25 { margin-left:25px } .ml30 { margin-left:30px } .ml35 { margin-left:35px } .ml40 { margin-left:40px } .ml45 { margin-left:45px } .ml50 { margin-left:50px }

              .p0 { padding:0px } .p1 { padding:1px } .p2 { padding:2px } .p3 { padding:3px } .p4 { padding:4px } .p5 { padding:5px } .p6 { padding:6px } .p7 { padding:7px } .p8 { padding:8px } .p9 { padding:9px } .p10 { padding:10px } .p15 { padding:15px } .p20 { padding:20px } .p25 { padding:25px } .p30 { padding:30px } .p35 { padding:35px } .p40 { padding:40px } .p45 { padding:45px } .p50 { padding:50px }
              .pt0 { padding-top:0px } .pt1 { padding-top:1px } .pt2 { padding-top:2px } .pt3 { padding-top:3px } .pt4 { padding-top:4px } .pt5 { padding-top:5px } .pt6 { padding-top:6px } .pt7 { padding-top:7px } .pt8 { padding-top:8px } .pt9 { padding-top:9px } .pt10 { padding-top:10px } .pt15 { padding-top:15px } .pt20 { padding-top:20px } .pt25 { padding-top:25px } .pt30 { padding-top:30px } .pt35 { padding-top:35px } .pt40 { padding-top:40px } .pt45 { padding-top:45px } .pt50 { padding-top:50px }
              .pr0 { padding-right:0px } .pr1 { padding-right:1px } .pr2 { padding-right:2px } .pr3 { padding-right:3px } .pr4 { padding-right:4px } .pr5 { padding-right:5px } .pr6 { padding-right:6px } .pr7 { padding-right:7px } .pr8 { padding-right:8px } .pr9 { padding-right:9px } .pr10 { padding-right:10px } .pr15 { padding-right:15px } .pr20 { padding-right:20px } .pr25 { padding-right:25px } .pr30 { padding-right:30px } .pr35 { padding-right:35px } .pr40 { padding-right:40px } .pr45 { padding-right:45px } .pr50 { padding-right:50px }
              .pb0 { padding-bottom:0px } .pb1 { padding-bottom:1px } .pb2 { padding-bottom:2px } .pb3 { padding-bottom:3px } .pb4 { padding-bottom:4px } .pb5 { padding-bottom:5px } .pb6 { padding-bottom:6px } .pb7 { padding-bottom:7px } .pb8 { padding-bottom:8px } .pb9 { padding-bottom:9px } .pb10 { padding-bottom:10px } .pb15 { padding-bottom:15px } .pb20 { padding-bottom:20px } .pb25 { padding-bottom:25px } .pb30 { padding-bottom:30px } .pb35 { padding-bottom:35px } .pb40 { padding-bottom:40px } .pb45 { padding-bottom:45px } .pb50 { padding-bottom:50px }
              .pl0 { padding-left:0px } .pl1 { padding-left:1px } .pl2 { padding-left:2px } .pl3 { padding-left:3px } .pl4 { padding-left:4px } .pl5 { padding-left:5px } .pl6 { padding-left:6px } .pl7 { padding-left:7px } .pl8 { padding-left:8px } .pl9 { padding-left:9px } .pl10 { padding-left:10px } .pl15 { padding-left:15px } .pl20 { padding-left:20px } .pl25 { padding-left:25px } .pl30 { padding-left:30px } .pl35 { padding-left:35px } .pl40 { padding-left:40px } .pl45 { padding-left:45px } .pl50 { padding-left:50px }

              .clear { clear: both; } .clearl { clear: left; } .clearr { clear: right; }
              .fr {float:right} .fl {float:left} .flnone {float:none}
              .fl50 { float:left; width: calc(50% - 10px); } .fr50 { float:right; width: calc(50% - 10px) }
              .fl45 { float:left; width: calc(45% - 10px); } .fr55 { float:right; width: calc(55% - 10px) }

              .textaligncenter { text-align: center; } .textalignleft { text-align: left; } .textalignright { text-align: right; }

              .fs8px {font-size:8px!important;} .fs9px {font-size:9px!important;} .fs10px {font-size:10px!important;} .fs11px {font-size:11px!important;} .fs12px {font-size:12px!important;} .fs13px {font-size:13px!important;} .fs14px {font-size:14px!important;} .fs15px {font-size:15px!important;} .fs16px {font-size:16px!important;} .fs17px {font-size:17px!important;} .fs18px {font-size:18px!important;} .fs19px {font-size:19px!important;} .fs20px {font-size:20px!important;}
              .fspoint1em { font-size:.1em!important; } .fspoint2em { font-size:.2em!important; } .fspoint3em { font-size:.3em!important; } .fspoint4em { font-size:.4em!important; } .fspoint5em { font-size:.5em!important; } .fspoint6em { font-size:.6em!important; } .fspoint7em { font-size:.7em!important; } .fspoint8em { font-size:.8em!important; } .fspoint9em { font-size:.9em!important; }
              .fs1em { font-size:1em!important; } .fs11em { font-size:1.1em!important; } .fs12em { font-size:1.2em!important; } .fs13em { font-size:1.3em!important; } .fs14em { font-size:1.4em!important; } .fs15em { font-size:1.5em!important; } .fs16em { font-size:1.6em!important; } .fs17em { font-size:1.7em!important; } .fs18em { font-size:1.8em!important; } .fs19em { font-size:1.9em!important; } .fs2em { font-size:2em!important; }
              .fw100 {font-weight:100} .fw200 {font-weight:200} .fw300 {font-weight:300} .fw400 {font-weight:400} .fw500 {font-weight:500} .fw600 {font-weight:600} .fw700 {font-weight:700} .fw800 {font-weight:800} .fw900 {font-weight:900}
              .fontstyleitalic {font-style:italic!important;} .fontstylenormal {font-style:normal!important;}

              .ttuppercase { text-transform: uppercase; } .ttn { text-transform:none; }

              .displayblock {display:block} .displayinlineblock {display:inline-block} .displaynone {display:none} .displayFlex {display: flex}

              .w10pc { width:10%!important; } .w20pc { width:20%!important; } .w30pc { width:30%!important; } .w40pc { width:40%!important; } .w50pc { width:50%!important; } .w60pc { width:60%!important; } .w70pc { width:70%!important; } .w80pc { width:80%!important; } .w90pc { width:90%!important; } .w100pc { width:100%!important; }
              .minw0 { min-width:0px!important; } .minw1 { min-width:1px!important; } .minw2 { min-width:2px!important; } .minw3 { min-width:3px!important; } .minw4 { min-width:4px!important; } .minw5 { min-width:5px!important; } .minw6 { min-width:6px!important; } .minw7 { min-width:7px!important; } .minw8 { min-width:8px!important; } .minw9 { min-width:9px!important; } .minw10 { min-width:10px!important; } .minw15 { min-width:15px!important; } .minw20 { min-width:20px!important; } .minw25 { min-width:25px!important; } .minw30 { min-width:30px!important; } .minw35 { min-width:35px!important; } .minw40 { min-width:40px!important; } .minw45 { min-width:45px!important; } .minw50 { min-width:50px!important; } .minw55 { min-width:55px!important; } .minw60 { min-width:60px!important; } .minw65 { min-width:65px!important; } .minw70 { min-width:70px!important; } .minw75 { min-width:75px!important; } .minw80 { min-width:80px!important; } .minw85 { min-width:85px!important; } .minw90 { min-width:90px!important; } .minw95 { min-width:95px!important; } .minw100 { min-width:100px!important; }
              .mw0 { max-width:0px!important; } .mw1 { max-width:1px!important; } .mw2 { max-width:2px!important; } .mw3 { max-width:3px!important; } .mw4 { max-width:4px!important; } .mw5 { max-width:5px!important; } .mw6 { max-width:6px!important; } .mw7 { max-width:7px!important; } .mw8 { max-width:8px!important; } .mw9 { max-width:9px!important; } .mw10 { max-width:10px!important; } .mw15 { max-width:15px!important; } .mw20 { max-width:20px!important; } .mw25 { max-width:25px!important; } .mw30 { max-width:30px!important; } .mw35 { max-width:35px!important; } .mw40 { max-width:40px!important; } .mw45 { max-width:45px!important; } .mw50 { max-width:50px!important; } .mw55 { max-width:55px!important; } .mw60 { max-width:60px!important; } .mw65 { max-width:65px!important; } .mw70 { max-width:70px!important; } .mw75 { max-width:75px!important; } .mw80 { max-width:80px!important; } .mw85 { max-width:85px!important; } .mw90 { max-width:90px!important; } .mw95 { max-width:95px!important; } .mw100 { max-width:100px!important; }
              .mh0 { max-height:0px!important; } .mh1 { max-height:1px!important; } .mh2 { max-height:2px!important; } .mh3 { max-height:3px!important; } .mh4 { max-height:4px!important; } .mh5 { max-height:5px!important; } .mh6 { max-height:6px!important; } .mh7 { max-height:7px!important; } .mh8 { max-height:8px!important; } .mh9 { max-height:9px!important; } .mh10 { max-height:10px!important; } .mh15 { max-height:15px!important; } .mh20 { max-height:20px!important; } .mh25 { max-height:25px!important; } .mh30 { max-height:30px!important; } .mh35 { max-height:35px!important; } .mh40 { max-height:40px!important; } .mh45 { max-height:45px!important; } .mh50 { max-height:50px!important; } .mh55 { max-height:55px!important; } .mh60 { max-height:60px!important; } .mh65 { max-height:65px!important; } .mh70 { max-height:70px!important; } .mh75 { max-height:75px!important; } .mh80 { max-height:80px!important; } .mh85 { max-height:85px!important; } .mh90 { max-height:90px!important; } .mh95 { max-height:95px!important; } .mh100 { max-height:100px!important; }

              .b0 { border:0!important; } .bt0 {border-top:0!important;} .br0 {border-right:0!important;} .bb0 {border-bottom:0!important;} .bl0 {border-left:0!important;}
              .borderSolid { border-style: solid; } .borderDashed { border-style: dashed; } .borderDotted { border-style: dotted; }
              .borderW1px { border-width: 1px; } .borderW2px { border-width: 2px; } .borderW3px { border-width: 3px; } .borderW4px { border-width: 4px; } .borderW5px { border-width: 5px; }
              .borderColorBlack { border-color: #000 } .borderColorGrey { border-color: #ddd } .borderColorDarkBlue { border-color: #101079!important }

              .black {color:#000000!important; }
              .darkRed { color:#a00000!important; }
              .darkGreen { color:#41671e!important; }
              .darkBlue { color:#101079!important; }

              .bgColor_f5f5f5 {background-color:#f5f5f5;}
              .bgColor_eeeeee {background-color:#eeeeee;}
              .bgColor_dddddd {background-color:#dddddd;}
              .bgColor_cccccc {background-color:#cccccc;}

              /* ----------------------------------------------------------------------------- */

              .documentType { width:calc(100% - 50mm) }
              .documentDate { width:50mm; }

              pre { white-space: pre-wrap; word-wrap: break-word; }

              .resultLines {}
              .resultHeader {}
              .resultHeader div, .singleLineResult div {display:inline-block;}
              .singleLineResult {}
              .singleLineResult.outOfRange { color:#a00000; font-weight:700; }
              .resultsLabel { width:60mm; vertical-align: top; }
              .resultsValue { width:75mm; vertical-align: top; }
              .resultsNormalValue { width:50mm; text-align:center; vertical-align: top; }
              .resultsAuthor { width:30mm; vertical-align: top; }
              .resultsDate { width:15mm; text-align:center; vertical-align: top; }

              .imageContainer img {max-width:100%; height:auto;}
          </style>
      `
    }

    _getPdfExtraStyle() {
        return `
          <style>
              .b {font-weight: bold}
              .row {
                  display: flex;
                  flex-flow: row nowrap;
              }
              .label { width:60mm; vertical-align: top; }
              .value { vertical-align: top; }
              .contact {
                  border: 1px solid #eeeeee;
                  margin: 5px;
              }
              .contact-header {
                  background-color: #eeeeee;
                  display: flex;
                  flex-flow: row nowrap;
              }
              .contact-hcp {
                  margin-left: auto;
              }
          </style>
      `
    }

    _getPdfScript() {
        return '<' + 'script' + '>' + 'document.fonts.ready.then(() => { setInterval(() => {document.body.dispatchEvent(new CustomEvent("pdfDoneRenderingEvent"))}, 500); }); <' + '/script' + '>';
    }

    _getPdfPatient(patient) {
        return `
          <div class="pt3 pb3 pl10 pr10 mt30 mb30 borderSolid borderW1px borderColorBlack">
              <div class="fl45">
                  <b>` + this.localize("lastAndFirstName", "Last and first names", this.language) + `:</b> ` + _.trim(_.get(patient, "lastName", "-")) + ` ` + _.trim(_.get(patient, "firstName", "-")) + `<br />
                  <b>` + this.localize("address", "Address", this.language) + `:</b> ` + _.trim(_.get(patient, "address", "-")) + ` - ` + _.trim(_.get(patient, "postalCode", "-")) + ` ` + _.trim(_.get(patient, "city", "-")) + `<br />
                  <b>` + this.localize("birthDate", "Birthdate", this.language) + `:</b> ` + _.trim(_.get(patient, "dateOfBirthHr", "-")) + `<br />
                  <b>` + this.localize("ssinPatVerbose", "SSIN", this.language) + `:</b> ` + _.trim(_.get(patient, "ssinHr", "-")) + `<br />
              </div>
              <div class="fr55 textalignright">
                  <b>` + this.localize("adm_in", "Insurance", this.language) + `:</b> ` + _.trim(_.get(patient, "insuranceData.name", "-")) + `<br />
                  <b>` + this.localize("insuranceCode", "Insurance code", this.language) + `:</b> ` + _.trim(_.get(patient, "insuranceData.code", "-")) + `<br />
                  <b>CT1 - CT2:</b> ` + _.trim(_.get(patient, "insuranceData.tc1", "-")) + ` - ` + _.trim(_.get(patient, "insuranceData.tc2", "-")) + `<br />
                  <b>` + this.localize("AFF", "Membership number", this.language) + `:</b> ` + _.trim(_.get(patient, "insuranceData.identificationNumber", "-")) + `<br />
              </div>
              <div class="clear"></div>
          </div>
      `
    }

    _getPdfFooter() {

        return `<div class="pageFooter pt5 mt30 textaligncenter borderSolid borderW1px borderColorBlack bb0 br0 bl0">
      <b>` + this.localize("doctor", "Doctor", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentHcp.lastName")) + " " + _.trim(_.get(this, "_data.currentHcp.firstName")) + ` - <b>N° ` + this.localize("inami", "INAMI", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentHcp.nihiiHr")) + `<br />
      <b>` + this.localize("postalAddress", "Address", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentHcp.address", "-")) + ` -  ` + _.trim(_.get(this, "_data.currentHcp.postalCode", "-")) + ` ` + _.trim(_.get(this, "_data.currentHcp.city", "-")) + ` - <b>` + this.localize("telAbreviation", "Tel", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentHcp.phone", "-")) + ` - <b>` + this.localize("mobile", "Mobile", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentHcp.mobile", "-")) + ` - <b>E-mail:</b> ` + _.trim(_.get(this, "_data.currentHcp.email", "-")) + `
      </div>
      </div>` +
            '<' + 'script' + '>' + 'document.fonts.ready.then(() => { setInterval(() => {document.body.dispatchEvent(new CustomEvent("pdfDoneRenderingEvent"))}, 500); }); <' + '/script' + '>' + `
      </body>
      </html>`

    }

    _getPdfHeader() {
        return `
          <html>
              <head>

                  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">

                  <style>

                      @page {size: A4; width: 210mm; height: 297mm; margin: 0; padding: 0; }
                      body {margin: 0; padding: 0; font-family: /* "Open Sans", */ Arial, Helvetica, sans-serif; line-height:1.3em; }
                      .page { width: 210mm; color:#000000; font-size:12px; padding:10mm; position:relative; /* border:1px solid #f00; */ }

                      h1 { font-size:17px; margin:0; padding:0; }
                      h2 { font-size:15px; font-weight:400; font-style: italic; text-align: center; padding:0; margin:0; }
                      p { margin:0 0 10px 0; padding:0; }

                      .m0auto { margin:0 auto }

                      .m0 { margin:0px } .m1 { margin:1px } .m2 { margin:2px } .m3 { margin:3px } .m4 { margin:4px } .m5 { margin:5px } .m6 { margin:6px } .m7 { margin:7px } .m8 { margin:8px } .m9 { margin:9px } .m10 { margin:10px } .m15 { margin:15px } .m20 { margin:20px } .m25 { margin:25px } .m30 { margin:30px } .m35 { margin:35px } .m40 { margin:40px } .m45 { margin:45px } .m50 { margin:50px }
                      .mt0 { margin-top:0px } .mt1 { margin-top:1px } .mt2 { margin-top:2px } .mt3 { margin-top:3px } .mt4 { margin-top:4px } .mt5 { margin-top:5px } .mt6 { margin-top:6px } .mt7 { margin-top:7px } .mt8 { margin-top:8px } .mt9 { margin-top:9px } .mt10 { margin-top:10px } .mt15 { margin-top:15px } .mt20 { margin-top:20px } .mt25 { margin-top:25px } .mt30 { margin-top:30px } .mt35 { margin-top:35px } .mt40 { margin-top:40px } .mt45 { margin-top:45px } .mt50 { margin-top:50px }
                      .mr0 { margin-right:0px } .mr1 { margin-right:1px } .mr2 { margin-right:2px } .mr3 { margin-right:3px } .mr4 { margin-right:4px } .mr5 { margin-right:5px } .mr6 { margin-right:6px } .mr7 { margin-right:7px } .mr8 { margin-right:8px } .mr9 { margin-right:9px } .mr10 { margin-right:10px } .mr15 { margin-right:15px } .mr20 { margin-right:20px } .mr25 { margin-right:25px } .mr30 { margin-right:30px } .mr35 { margin-right:35px } .mr40 { margin-right:40px } .mr45 { margin-right:45px } .mr50 { margin-right:50px }
                      .mb0 { margin-bottom:0px } .mb1 { margin-bottom:1px } .mb2 { margin-bottom:2px } .mb3 { margin-bottom:3px } .mb4 { margin-bottom:4px } .mb5 { margin-bottom:5px } .mb6 { margin-bottom:6px } .mb7 { margin-bottom:7px } .mb8 { margin-bottom:8px } .mb9 { margin-bottom:9px } .mb10 { margin-bottom:10px } .mb15 { margin-bottom:15px } .mb20 { margin-bottom:20px } .mb25 { margin-bottom:25px } .mb30 { margin-bottom:30px } .mb35 { margin-bottom:35px } .mb40 { margin-bottom:40px } .mb45 { margin-bottom:45px } .mb50 { margin-bottom:50px }
                      .ml0 { margin-left:0px } .ml1 { margin-left:1px } .ml2 { margin-left:2px } .ml3 { margin-left:3px } .ml4 { margin-left:4px } .ml5 { margin-left:5px } .ml6 { margin-left:6px } .ml7 { margin-left:7px } .ml8 { margin-left:8px } .ml9 { margin-left:9px } .ml10 { margin-left:10px } .ml15 { margin-left:15px } .ml20 { margin-left:20px } .ml25 { margin-left:25px } .ml30 { margin-left:30px } .ml35 { margin-left:35px } .ml40 { margin-left:40px } .ml45 { margin-left:45px } .ml50 { margin-left:50px }

                      .p0 { padding:0px } .p1 { padding:1px } .p2 { padding:2px } .p3 { padding:3px } .p4 { padding:4px } .p5 { padding:5px } .p6 { padding:6px } .p7 { padding:7px } .p8 { padding:8px } .p9 { padding:9px } .p10 { padding:10px } .p15 { padding:15px } .p20 { padding:20px } .p25 { padding:25px } .p30 { padding:30px } .p35 { padding:35px } .p40 { padding:40px } .p45 { padding:45px } .p50 { padding:50px }
                      .pt0 { padding-top:0px } .pt1 { padding-top:1px } .pt2 { padding-top:2px } .pt3 { padding-top:3px } .pt4 { padding-top:4px } .pt5 { padding-top:5px } .pt6 { padding-top:6px } .pt7 { padding-top:7px } .pt8 { padding-top:8px } .pt9 { padding-top:9px } .pt10 { padding-top:10px } .pt15 { padding-top:15px } .pt20 { padding-top:20px } .pt25 { padding-top:25px } .pt30 { padding-top:30px } .pt35 { padding-top:35px } .pt40 { padding-top:40px } .pt45 { padding-top:45px } .pt50 { padding-top:50px }
                      .pr0 { padding-right:0px } .pr1 { padding-right:1px } .pr2 { padding-right:2px } .pr3 { padding-right:3px } .pr4 { padding-right:4px } .pr5 { padding-right:5px } .pr6 { padding-right:6px } .pr7 { padding-right:7px } .pr8 { padding-right:8px } .pr9 { padding-right:9px } .pr10 { padding-right:10px } .pr15 { padding-right:15px } .pr20 { padding-right:20px } .pr25 { padding-right:25px } .pr30 { padding-right:30px } .pr35 { padding-right:35px } .pr40 { padding-right:40px } .pr45 { padding-right:45px } .pr50 { padding-right:50px }
                      .pb0 { padding-bottom:0px } .pb1 { padding-bottom:1px } .pb2 { padding-bottom:2px } .pb3 { padding-bottom:3px } .pb4 { padding-bottom:4px } .pb5 { padding-bottom:5px } .pb6 { padding-bottom:6px } .pb7 { padding-bottom:7px } .pb8 { padding-bottom:8px } .pb9 { padding-bottom:9px } .pb10 { padding-bottom:10px } .pb15 { padding-bottom:15px } .pb20 { padding-bottom:20px } .pb25 { padding-bottom:25px } .pb30 { padding-bottom:30px } .pb35 { padding-bottom:35px } .pb40 { padding-bottom:40px } .pb45 { padding-bottom:45px } .pb50 { padding-bottom:50px }
                      .pl0 { padding-left:0px } .pl1 { padding-left:1px } .pl2 { padding-left:2px } .pl3 { padding-left:3px } .pl4 { padding-left:4px } .pl5 { padding-left:5px } .pl6 { padding-left:6px } .pl7 { padding-left:7px } .pl8 { padding-left:8px } .pl9 { padding-left:9px } .pl10 { padding-left:10px } .pl15 { padding-left:15px } .pl20 { padding-left:20px } .pl25 { padding-left:25px } .pl30 { padding-left:30px } .pl35 { padding-left:35px } .pl40 { padding-left:40px } .pl45 { padding-left:45px } .pl50 { padding-left:50px }

                      .clear { clear: both; } .clearl { clear: left; } .clearr { clear: right; }
                      .fr {float:right} .fl {float:left} .flnone {float:none}
                      .fl50 { float:left; width: calc(50% - 10px); } .fr50 { float:right; width: calc(50% - 10px) }
                      .fl45 { float:left; width: calc(45% - 10px); } .fr55 { float:right; width: calc(55% - 10px) }

                      .textaligncenter { text-align: center; } .textalignleft { text-align: left; } .textalignright { text-align: right; }

                      .fs8px {font-size:8px!important;} .fs9px {font-size:9px!important;} .fs10px {font-size:10px!important;} .fs11px {font-size:11px!important;} .fs12px {font-size:12px!important;} .fs13px {font-size:13px!important;} .fs14px {font-size:14px!important;} .fs15px {font-size:15px!important;} .fs16px {font-size:16px!important;} .fs17px {font-size:17px!important;} .fs18px {font-size:18px!important;} .fs19px {font-size:19px!important;} .fs20px {font-size:20px!important;}
                      .fspoint1em { font-size:.1em!important; } .fspoint2em { font-size:.2em!important; } .fspoint3em { font-size:.3em!important; } .fspoint4em { font-size:.4em!important; } .fspoint5em { font-size:.5em!important; } .fspoint6em { font-size:.6em!important; } .fspoint7em { font-size:.7em!important; } .fspoint8em { font-size:.8em!important; } .fspoint9em { font-size:.9em!important; }
                      .fs1em { font-size:1em!important; } .fs11em { font-size:1.1em!important; } .fs12em { font-size:1.2em!important; } .fs13em { font-size:1.3em!important; } .fs14em { font-size:1.4em!important; } .fs15em { font-size:1.5em!important; } .fs16em { font-size:1.6em!important; } .fs17em { font-size:1.7em!important; } .fs18em { font-size:1.8em!important; } .fs19em { font-size:1.9em!important; } .fs2em { font-size:2em!important; }
                      .fw100 {font-weight:100} .fw200 {font-weight:200} .fw300 {font-weight:300} .fw400 {font-weight:400} .fw500 {font-weight:500} .fw600 {font-weight:600} .fw700 {font-weight:700} .fw800 {font-weight:800} .fw900 {font-weight:900}
                      .fontstyleitalic {font-style:italic!important;} .fontstylenormal {font-style:normal!important;}

                      .ttuppercase { text-transform: uppercase; } .ttn { text-transform:none; }

                      .displayblock {display:block} .displayinlineblock {display:inline-block} .displaynone {display:none} .displayFlex {display: flex}

                      .w10pc { width:10%!important; } .w20pc { width:20%!important; } .w30pc { width:30%!important; } .w40pc { width:40%!important; } .w50pc { width:50%!important; } .w60pc { width:60%!important; } .w70pc { width:70%!important; } .w80pc { width:80%!important; } .w90pc { width:90%!important; } .w100pc { width:100%!important; }
                      .minw0 { min-width:0px!important; } .minw1 { min-width:1px!important; } .minw2 { min-width:2px!important; } .minw3 { min-width:3px!important; } .minw4 { min-width:4px!important; } .minw5 { min-width:5px!important; } .minw6 { min-width:6px!important; } .minw7 { min-width:7px!important; } .minw8 { min-width:8px!important; } .minw9 { min-width:9px!important; } .minw10 { min-width:10px!important; } .minw15 { min-width:15px!important; } .minw20 { min-width:20px!important; } .minw25 { min-width:25px!important; } .minw30 { min-width:30px!important; } .minw35 { min-width:35px!important; } .minw40 { min-width:40px!important; } .minw45 { min-width:45px!important; } .minw50 { min-width:50px!important; } .minw55 { min-width:55px!important; } .minw60 { min-width:60px!important; } .minw65 { min-width:65px!important; } .minw70 { min-width:70px!important; } .minw75 { min-width:75px!important; } .minw80 { min-width:80px!important; } .minw85 { min-width:85px!important; } .minw90 { min-width:90px!important; } .minw95 { min-width:95px!important; } .minw100 { min-width:100px!important; }
                      .mw0 { max-width:0px!important; } .mw1 { max-width:1px!important; } .mw2 { max-width:2px!important; } .mw3 { max-width:3px!important; } .mw4 { max-width:4px!important; } .mw5 { max-width:5px!important; } .mw6 { max-width:6px!important; } .mw7 { max-width:7px!important; } .mw8 { max-width:8px!important; } .mw9 { max-width:9px!important; } .mw10 { max-width:10px!important; } .mw15 { max-width:15px!important; } .mw20 { max-width:20px!important; } .mw25 { max-width:25px!important; } .mw30 { max-width:30px!important; } .mw35 { max-width:35px!important; } .mw40 { max-width:40px!important; } .mw45 { max-width:45px!important; } .mw50 { max-width:50px!important; } .mw55 { max-width:55px!important; } .mw60 { max-width:60px!important; } .mw65 { max-width:65px!important; } .mw70 { max-width:70px!important; } .mw75 { max-width:75px!important; } .mw80 { max-width:80px!important; } .mw85 { max-width:85px!important; } .mw90 { max-width:90px!important; } .mw95 { max-width:95px!important; } .mw100 { max-width:100px!important; }
                      .mh0 { max-height:0px!important; } .mh1 { max-height:1px!important; } .mh2 { max-height:2px!important; } .mh3 { max-height:3px!important; } .mh4 { max-height:4px!important; } .mh5 { max-height:5px!important; } .mh6 { max-height:6px!important; } .mh7 { max-height:7px!important; } .mh8 { max-height:8px!important; } .mh9 { max-height:9px!important; } .mh10 { max-height:10px!important; } .mh15 { max-height:15px!important; } .mh20 { max-height:20px!important; } .mh25 { max-height:25px!important; } .mh30 { max-height:30px!important; } .mh35 { max-height:35px!important; } .mh40 { max-height:40px!important; } .mh45 { max-height:45px!important; } .mh50 { max-height:50px!important; } .mh55 { max-height:55px!important; } .mh60 { max-height:60px!important; } .mh65 { max-height:65px!important; } .mh70 { max-height:70px!important; } .mh75 { max-height:75px!important; } .mh80 { max-height:80px!important; } .mh85 { max-height:85px!important; } .mh90 { max-height:90px!important; } .mh95 { max-height:95px!important; } .mh100 { max-height:100px!important; }

                      .b0 { border:0!important; } .bt0 {border-top:0!important;} .br0 {border-right:0!important;} .bb0 {border-bottom:0!important;} .bl0 {border-left:0!important;}
                      .borderSolid { border-style: solid; } .borderDashed { border-style: dashed; } .borderDotted { border-style: dotted; }
                      .borderW1px { border-width: 1px; } .borderW2px { border-width: 2px; } .borderW3px { border-width: 3px; } .borderW4px { border-width: 4px; } .borderW5px { border-width: 5px; }
                      .borderColorBlack { border-color: #000 } .borderColorGrey { border-color: #ddd } .borderColorDarkBlue { border-color: #101079!important }

                      .black {color:#000000!important; }
                      .darkRed { color:#a00000!important; }
                      .darkGreen { color:#41671e!important; }
                      .darkBlue { color:#101079!important; }

                      .bgColor_f5f5f5 {background-color:#f5f5f5;}
                      .bgColor_eeeeee {background-color:#eeeeee;}
                      .bgColor_dddddd {background-color:#dddddd;}
                      .bgColor_cccccc {background-color:#cccccc;}

                      /* ----------------------------------------------------------------------------- */

                      .documentType { width:calc(100% - 50mm) }
                      .documentDate { width:50mm; }

                      pre { white-space: pre-wrap; word-wrap: break-word; font-family: Arial, Helvetica, sans-serif; line-height:1.3em; }

                      .resultLines {}
                      .resultHeader {}
                      .resultHeader div, .singleLineResult div {display:inline-block;}
                      .singleLineResult {}
                      .singleLineResult.outOfRange { color:#a00000; font-weight:700; }
                      .resultsLabel { width:60mm; vertical-align: top; }
                      .resultsValue { width:75mm; vertical-align: top; }
                      .resultsNormalValue { width:50mm; text-align:center; vertical-align: top; }
                      .resultsAuthor { width:30mm; vertical-align: top; }
                      .resultsDate { width:15mm; text-align:center; vertical-align: top; }

                      .imageContainer img {max-width:100%; height:auto;}

                  </style>
              </head>

              <body>
                  <div class="page">

                      <h1 class="darkBlue fw700 pb10">
                          <span class="fl documentType ttuppercase">` + _.trim(_.get(this, "_data.content.type", "-")) + `</span>
                          <span class="fr black fw400 fs11px textalignright documentDate">` + (!!_.trim(_.get(this, "_data.currentHcp.city", "-")) ? _.trim(_.get(this, "_data.currentHcp.city", "-")) + ", " : "") + _.trim(_.get(this, "_data.content.dateHr", "-")) + `</span>
                      </h1>
                      <h1 class="darkBlue fw400 fs13px pb5 borderSolid borderW1px borderColorDarkBlue bt0 br0 bl0">` + _.trim(_.get(this, "_data.content.title", "-")) + `</h1>
                      <div class="pt3 pb3 pl10 pr10 mt30 mb30 borderSolid borderW1px borderColorBlack">
                      <div class="fl45">
                      <b>` + this.localize("lastAndFirstName", "Last and first names", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentPatient.lastName", "-")) + ` ` + _.trim(_.get(this, "_data.currentPatient.firstName", "-")) + `<br />
                      <b>` + this.localize("address", "Address", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentPatient.address", "-")) + ` - ` + _.trim(_.get(this, "_data.currentPatient.postalCode", "-")) + ` ` + _.trim(_.get(this, "_data.currentPatient.city", "-")) + `<br />
                      <b>` + this.localize("birthDate", "Birthdate", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentPatient.dateOfBirthHr", "-")) + `<br />
                      <b>` + this.localize("ssinPatVerbose", "SSIN", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentPatient.ssinHr", "-")) + `<br />
                      </div>
                      <div class="fr55 textalignright">
                      <b>` + this.localize("adm_in", "Insurance", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentPatient.insuranceData.name", "-")) + `<br />
                      <b>` + this.localize("insuranceCode", "Insurance code", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentPatient.insuranceData.code", "-")) + `<br />
                      <b>CT1 - CT2:</b> ` + _.trim(_.get(this, "_data.currentPatient.insuranceData.tc1", "-")) + ` - ` + _.trim(_.get(this, "_data.currentPatient.insuranceData.tc2", "-")) + `<br />
                      <b>` + this.localize("AFF", "Membership number", this.language) + `:</b> ` + _.trim(_.get(this, "_data.currentPatient.insuranceData.identificationNumber", "-")) + `<br />
                      </div>
                      <div class="clear"></div>
                      </div>
                      
                      `
    }


    _getPdfContent() {
        return "" +
            this._getPdfHeader() +
            (
                // Simple text
                ((typeof _.get(this, "_data.content.body") === "string" ? "<pre>" + _.get(this, "_data.content.body") + "</pre>" : // Images
                    _.get(this, "_data.content.body") instanceof ArrayBuffer && this._isImage(_.get(this, "_data.content")) ? this._getImage(_.get(this, "_data.content.mimeType"), _.get(this, "_data.content.body")) :

                        // Lab or protocol
                        _.get(this, "_data.content.body") instanceof ArrayBuffer && !!_.size(_.get(this, "_data.document.docInfo", {})) && !!_.trim(_.get(_.flatMap(_.get(this, "_data.document.docInfo.services[0].content", "")), "[0].stringValue", "")) ? "<pre>" + this._prettifyText(_.trim(_.get(_.flatMap(_.get(this, "_data.document.docInfo.services[0].content", "")), "[0].stringValue", ""))) + "</pre>" :

                            // Array of services
                            Array.isArray(_.get(this, "_data.content.body")) && !!_.size(_.get(this, "_data.content.body")) ? '' +
                                '<div class="resultHeader fw700 ttuppercase p3 borderSolid borderW1px borderColorBlack br0 bl0 bgColor_eeeeee">' +
                                '<div class="resultsLabel">' + this.localize("lab", "Label", this.language) + '</div>' +
                                '<div class="resultsValue">' + this.localize("val", "Value", this.language) + '</div>' +
                                '<div class="resultsNormalValue">' + this.localize("nor_val", "Normal values", this.language) + '</div>' +
                                '<!--<div class="resultsAuthor">' + this.localize("aut", "Author", this.language) + '</div>-->' +
                                '<div class="resultsDate">' + this.localize("dat", "Date", this.language) + '</div>' +
                                '</div>' +
                                '<div class="resultLines">' +
                                _.map(_.get(this, "_data.content.body"), (it, k) => "" +
                                    '<div class="singleLineResult p3 pt2 pb2 mb2 borderSolid borderW1px borderColorGrey bt0 br0 bl0 ' + (k % 2 ? "bgColor_f5f5f5" : "") + ' ' + (!!_.get(it, "isOutOfRange", false) ? "outOfRange" : "") + '">' +
                                    '<div class="resultsLabel">' + _.trim(_.get(it, "label", "")) + '</div>' +
                                    '<div class="resultsValue">' + _.trim(_.get(it, "value", "")) + '</div>' +
                                    '<div class="resultsNormalValue">' + _.trim(_.get(it, "normalValue", "")) + '</div>' +
                                    '<!--<div class="resultsAuthor">' + _.trim(_.get(it, "author", "")) + '</div>-->' +
                                    '<div class="resultsDate">' + (!!_.trim(_.get(it, "date", "")) ? _.trim(_.get(it, "date", "")) : _.trim(_.get(this, "_data.content.dateHr", ""))) + '</div>' +
                                    "</div>"
                                ).join("") +
                                "</div>" :

                                // Can't render
                                ""))

            ) +
            this._getPdfFooter();
    }

    _getPdf(content, patient) {
        return `
          <html>
              <head>
      ` + this._getPdfStyle() + `
      ` + this._getPdfExtraStyle() + `
              </head>
              <body>
                  <div class="page">
      ` + this._getPdfPatient(this._prettifyPatient(patient)) + `
      ` + content + `
                  </div>
      ` + this._getPdfScript() + `
              </body>
          </html>`
    }

    _getServices(services) {
        return services.filter(s => s.content && s.content.fr && /^CD-[A-Z]+\|[a-z]+\|[0-9]+$/.test(s.content.fr.stringValue));
    }

    _getCodes(contacts) {
        let services = contacts.flatMap(c => this._getServices(c.services));
        let codeIds = services.map(s => s.content.fr.stringValue);
        codeIds = codeIds.filter((v, i, a) => a.indexOf(v) === i);
        return codeIds.length > 0 ? this.api.code().getCodes(codeIds) : Promise.resolve([]);
    }

    _getForms(contacts) {
        let formIds = contacts.flatMap(c => c.subContacts.filter(s => s.formId).map(s => s.formId));
        formIds = formIds.filter((v, i, a) => a.indexOf(v) === i);
        return formIds.length > 0 ? this.api.form().getForms({ids: formIds}) : Promise.resolve([]);
    }

    _getFormTemplates(forms) {
        let templateIds = forms.filter(f => f.formTemplateId).map(f => f.formTemplateId);
        templateIds = templateIds.filter((v, i, a) => a.indexOf(v) === i);
        return templateIds.map(id => this.api.form().getFormTemplate(id));
    }

    _getHealthElements(contacts) {
        let heIds = contacts.flatMap(c => c.healthElements);
        heIds = heIds.filter((v, i, a) => a.indexOf(v) === i);
        return heIds.filter(he => he).map(he => this.api.helement().getHealthElement(he.id));
    }

    _getDocuments(contacts) {
        const docIds = contacts.flatMap(c => c.services
            .filter(s => this._isDocument(s) && s.content && s.content.fr && s.content.fr.documentId)
            .map(s => s.content.fr.documentId));
        return docIds.map(id => this._getDocument(this.user, id));
    }

    printPatient(patient, contacts, documentTypes, patientHealthCarePartiesById) {
        return new Promise((resolve) => {
            this._printPatient(patient, contacts, documentTypes, patientHealthCarePartiesById, null);
            resolve();
        });
    }

    _printPatient(patient, contacts, documentTypes, patientHealthCarePartiesById, callback = null) {
        this.documentTypes = documentTypes;
        this.patientHealthCarePartiesById = patientHealthCarePartiesById;
        this._getCodes(contacts).then(codes => this._getForms(contacts).then(forms => [codes, forms]))
            .then(([codes, forms]) => Promise.all(this._getFormTemplates(forms)).then(templates => [codes, forms, templates])
                .then(([codes, forms, templates]) => Promise.all(this._getHealthElements(contacts)).then(healthElements => [codes, forms, templates, healthElements])
                    .then(([codes, forms, templates, healthElements]) => Promise.all(this._getDocuments(contacts)).then(documents => [codes, forms, templates, healthElements, documents])
                        .then(([codes, forms, templates, healthElements, documents]) => {
                            let html = "";
                            contacts = contacts.sort((a, b) => {
                                return this.api.moment(b.openingDate).diff(this.api.moment(a.openingDate));
                            });
                            contacts.forEach(contact => {
                                html += this._generatePdfContact(contact, codes, forms, templates, healthElements, documents);
                            });
                            html = this._getPdf(html, patient);
                            return this.api.pdfReport(html, {
                                type: "unknown",
                                completionEvent: "pdfDoneRenderingEvent"
                            });
                        }).then(printedPdf => {
                            const filename = patient.lastName + " " + patient.firstName + ".pdf";
                            return !printedPdf.printed && this.api.triggerFileDownload(printedPdf.pdf, "application/pdf", filename)
                        })
                    )))
            .finally(() => {
                if (callback) callback();
            });
    }

    _getContentFromDocument() {

        const promResolve = Promise.resolve()
        const contact = _.get(this, "_data.contact")
        const document = _.get(this, "_data.document", {})
        const targetServiceId = _.get(_.find(_.get(contact, "subContacts", []), sctc => !!((parseInt(_.get(sctc, "status", 0)) & (1 << 6)))), "services[0].serviceId", "")
        const targetService = _.find(_.get(contact, "services", []), {id: targetServiceId})
        const documentType = !!_.trim(_.get(_.find(_.get(targetService, "tags", []), {type: "CD-TRANSACTION"}), "code", "")) ? _.trim(_.get(_.find(_.get(targetService, "tags", []), {type: "CD-TRANSACTION"}), "code", "")) : !!_.trim(_.get(_.find(_.get(document, "docInfo.codes", []), {type: "CD-TRANSACTION"}), "code", "")) ? _.trim(_.get(_.find(_.get(document, "docInfo.codes", []), {type: "CD-TRANSACTION"}), "code", "")) : "unknown"
        const documentInfoServices = _.compact(_.map(_.get(document, "docInfo.services", {}), svc => svc))

        return !_.size(document) ? promResolve : promResolve
            .then(() => {
                return {
                    dateHr: !!_.size(contact) ? _.get(contact, "openingDateHr", "") : !!(parseInt(_.get(document, "docInfo.demandDate")) || 0) ? this._msTstampToDDMMYYYY(parseInt(_.get(document, "docInfo.demandDate"))) : !!(parseInt(_.get(document, "created")) || 0) ? this._msTstampToDDMMYYYY(parseInt(_.get(document, "created"))) : moment().format("DD/MM/YYYY"),
                    dateYYYYMMDD: !!_.size(contact) ? _.get(contact, "openingDateYYYYMMDD", "") : !!(parseInt(_.get(document, "docInfo.demandDate")) || 0) ? this._msTstampToYYYYMMDD(parseInt(_.get(document, "docInfo.demandDate"))) : !!(parseInt(_.get(document, "created")) || 0) ? this._msTstampToYYYYMMDD(parseInt(_.get(document, "created"))) : moment().format("YYYYMMDD"),
                    title: !_.size(contact) && !!_.size(_.get(document, "docInfo")) && (!!_.trim(_.get(document, "docInfo.labo")) || !!_.trim(_.get(document, "docInfo.protocol"))) ?
                        (!!_.trim(_.get(document, "docInfo.labo", "")) ? _.trim(_.get(document, "docInfo.labo", "")) : _.trim(_.get(document, "attachment.filename", this.api.crypto().randomUuid() + ".topaz"))) + (!!_.trim(_.get(document, "docInfo.protocol", "")) ? " (" + this.localize("prot", "Protocol", this.language) + " #" + _.trim(_.get(document, "docInfo.protocol", "")) + ")" : "") :
                        !!_.trim(_.get(targetService, "content." + this.language + ".stringValue", "")) ? _.trim(_.get(targetService, "content." + this.language + ".stringValue", "")) :
                            _.trim(_.get(document, "attachment.filename", this.api.crypto().randomUuid() + ".topaz")),
                    type: !!_.trim(_.get(_.find(_.get(this, "_data.codes.CD-TRANSACTION", []), {code: documentType}), "labelHr", "")) ? _.trim(_.get(_.find(_.get(this, "_data.codes.CD-TRANSACTION", []), {code: documentType}), "labelHr", "")) : this.localize("cd-transaction-unknown", "Unknown", this.language),
                    body: !_.size(contact) && _.size(documentInfoServices) === 1 ? this._prettifyText(this._getServiceShortDescription(_.head(documentInfoServices))) :
                        !_.size(contact) && _.size(documentInfoServices) > 1 ? _.map(documentInfoServices, svc => {
                                return {
                                    isOutOfRange: !!this._isServiceOutOfRange(svc),
                                    label: _.trim(_.get(svc, "label", "")),
                                    date: this._getServiceDate(svc),
                                    value: this._getServiceShortDescription(svc),
                                    normalValue: this._getServiceNormalValues(svc),
                                    author: this._getServiceAuthor(svc),
                                }
                            }) :
                            typeof _.get(document, "attachment.content") === "string" ? this._prettifyText(_.trim(_.get(document, "attachment.content"))) :
                                _.get(document, "attachment.content"),
                    fileExtension: _.trim(_.get(document, "attachment.fileExtension")).toLowerCase(),
                    mimeType: _.trim(_.get(document, "attachment.mimeType")).toLowerCase(),
                    downloadUrl: _.trim(_.get(document, "attachment.downloadUrl")),
                }
            })

    }

    _getContentFromContact() {

        const promResolve = Promise.resolve()

        const user = _.get(this, "user", {})
        const contact = _.get(this, "_data.contact")
        const document = _.get(this, "_data.document", {})
        const patient = _.get(this, "_data.currentPatient")
        const sourceContactId = _.trim(_.get(contact, "id", ""))
        const sourceContactGroupId = _.trim(_.get(contact, "groupId", ""))

        return !sourceContactId ? promResolve : promResolve
            .then(() => (!_.trim(_.get(user, "id")) || !_.size(patient)) ? Promise.resolve([contact]) : this.api.contact().findBy(_.trim(_.get(user, "healthcarePartyId", "")), patient)
                .then(contacts => (!sourceContactGroupId || _.size(contacts) === 1) ? contacts : _
                    .chain(contacts)
                    .filter(ctc => !!_.size(_.get(ctc, "services", [])) && _.trim(_.get(ctc, "groupId", "")) === sourceContactGroupId)
                    .orderBy(["modified"], ["asc"])
                    .value()
                )
            )
            .then(contacts => this._getContentFromDocument().then(contentFromDocument => ([contacts, contentFromDocument])))
            .then(([contacts, contentFromDocument]) => {

                const servicesOfContacts = this._getServicesOfContacts(contacts)
                const contactType = _.get(_.find(_.get(this, "_data.codes.CD-TRANSACTION", []), {code: _.get(_.find(_.get(contact, "tags", []), {type: "CD-TRANSACTION"}), "code", "")}), "labelHr", "")
                const subContactType = _.get(_.find(_.get(this, "_data.codes.CD-TRANSACTION", []), {code: _.get(_.find(_.flatMap(_.get(contact, "subContacts", []), sctc => _.get(sctc, "tags", [])), {type: "CD-TRANSACTION"}), "code", "")}), "labelHr", "")
                const targetSubContact = _.find(_.get(contact, "subContacts", []), sctc => !!((parseInt(_.get(sctc, "status", 0)) & (1 << 0)) || (parseInt(_.get(sctc, "status", 0)) & (1 << 5))))

                const documentServiceId = _.trim(_.get(_.find(_.get(contact, "subContacts", []), sctc => !!((parseInt(_.get(sctc, "status", 0)) & (1 << 6)))), "services[0].serviceId", ""))
                const documentService = _.find(_.get(contact, "services", []), {id: documentServiceId})
                const documentType = _.get(_.find(_.get(this, "_data.codes.CD-TRANSACTION", []), {code: _.trim(_.get(_.find(_.get(documentService, "tags", []), {type: "CD-TRANSACTION"}), "code", ""))}), "labelHr", "")
                const documentTitle = _.trim(_.get(documentService, "content." + this.language + ".stringValue", ""))

                const contactOrDocumentType = !!_.trim(subContactType) ? _.trim(subContactType) : !!_.trim(contactType) ? _.trim(contactType) : _.trim(documentType)
                const contactOrDocumentTitle = !!_.trim(_.get(contact, "descr", "")) && !!_.trim(_.trim(_.get(contact, "descr", "")).replace(contactOrDocumentType + ":", "")) ?
                    _.trim(_.get(contact, "descr", "")).replace(contactOrDocumentType + ":", "") :
                    (!!_.trim(_.get(targetSubContact, "descr", "")) || !!_.trim(_.get(targetSubContact, "protocol", ""))) ? _.trim(_.get(targetSubContact, "descr", "")) + (!!_.trim(_.get(targetSubContact, "protocol", "")) ? " (" + this.localize("prot", "Protocol", this.language) + " #" + _.trim(_.get(targetSubContact, "protocol", "")) + ")" : "") :
                        documentTitle

                const contentFromContact = {
                    dateHr: _.get(contact, "openingDateHr", ""),
                    dateYYYYMMDD: _.get(contact, "openingDateYYYYMMDD", ""),
                    title: contactOrDocumentTitle,
                    type: contactOrDocumentType,
                    fileExtension: _.trim(_.get(document, "attachment.fileExtension")).toLowerCase(),
                    mimeType: _.trim(_.get(document, "attachment.mimeType")).toLowerCase(),
                    downloadUrl: _.trim(_.get(document, "attachment.downloadUrl")),
                    body: !_.size(servicesOfContacts) && typeof _.get(document, "attachment.content") === "string" && !!_.trim(_.get(document, "attachment.content")) ? this._prettifyText(_.trim(_.get(document, "attachment.content"))) :
                        !_.size(servicesOfContacts) && _.get(document, "attachment.content") instanceof ArrayBuffer ? _.get(document, "attachment.content") :
                            _.size(servicesOfContacts) === 1 ? this._prettifyText(this._getServiceShortDescription(_.head(servicesOfContacts))) :
                                _.map(servicesOfContacts, svc => {
                                    return {
                                        isOutOfRange: !!this._isServiceOutOfRange(svc),
                                        label: _.trim(_.get(svc, "label", "")),
                                        date: this._getServiceDate(svc),
                                        value: this._getServiceShortDescription(svc),
                                        normalValue: this._getServiceNormalValues(svc),
                                        author: this._getServiceAuthor(svc),
                                    }
                                })
                }

                return !_.size(contentFromDocument) ? contentFromContact : _.merge(contentFromContact, contentFromDocument)

            })

    }

    _getServicesOfContacts(contacts) {

        return _.filter(
            _.sortBy(
                _.compact(_.flatMap(contacts, c => {
                    const labOrProtocolSubContacts = _.filter(_.get(c, "subContacts", []), sctc => !!((parseInt(_.get(sctc, "status", 0)) & (1 << 0)) || (parseInt(_.get(sctc, "status", 0)) & (1 << 5))))
                    const labOrProtocolSubContactsServices = _.compact(_.flatMap(labOrProtocolSubContacts, it => _.map(_.get(it, "services", []), svc => _.trim(_.get(svc, "serviceId", "")))))
                    return (!!parseInt(_.get(c, "endOfLife", 0)) || !!parseInt(_.get(c, "deletionDate", 0))) ? false : _.compact(_.map(_.get(c, "services", {}), svc => !!parseInt(_.get(svc, "endOfLife", 0)) || labOrProtocolSubContactsServices.indexOf(_.trim(_.get(svc, "id", ""))) === -1 ? false : svc))
                })),

                ["modified", "index"], ["asc", "asc"]
            ),
            svc => true /* !!_.trim(this._getServiceShortDescription(svc)) */
        )

    }

    printDocument(inputData) {

        if (!!_.get(this, "_isBusy", false)) return;
        this.set("_isBusy", true)

        const promResolve = Promise.resolve()
        const patientId = !!_.trim(_.get(inputData, "patientId", "")) ? _.trim(_.get(inputData, "patientId", "")) : _.trim(_.get(this, "patient.id", ""))
        const contactId = _.trim(_.get(inputData, "contactId", ""))
        const documentId = _.trim(_.get(inputData, "documentId", ""))
        const ehboxMessageId = _.trim(_.get(inputData, "ehboxMessageId", ""))

        // Make sure properties of component (that aren't set yet) actually are a variable rather than an object with a value key representing their value.
        _.map(_.get(this, "_data", {}), (propValue, propKey) => typeof _.get(propValue, "value", null) !== "function" ? null : this.set("_data." + propKey, _.get(propValue, "value", null)()))

        return this._resetComponentProperties()
            .then(() => this._getPrettifiedHcp().then(hcp => _.assign(this._data, {currentHcp: hcp})))
            .then(() => this._getPrettifiedPatient(_.get(this, "user", {}), patientId).then(patient => _.assign(this._data, {currentPatient: patient})))
            .then(() => this._getCodesByType("CD-TRANSACTION").then(codes => _.merge(this._data, {codes: codes})))
            .then(() => this._getContact(_.get(this, "user", {}), contactId, _.get(this, "_data.currentPatient")).then(contact => _.assign(this._data, {contact: contact})))
            .then(() => this._getDocument(_.get(this, "user", {}), documentId).then(document => _.assign(this._data, {document: document})))
            .then(() => ((!_.size(_.get(this, "_data.document")) && !_.size(_.get(this, "_data.contact"))) ? promResolve : !!_.size(_.get(this, "_data.contact")) ? this._getContentFromContact() : this._getContentFromDocument()).then(content => _.assign(this._data, {content: content})))
            .then(() => _.assign(this._data, {pdfHtmlContent: this._getPdfContent()}))
            .then(() => this.api.pdfReport(this._data.pdfHtmlContent, {
                type: "rapp-mail",
                completionEvent: "pdfDoneRenderingEvent"
            }))
            .then(printedPdf => !printedPdf.printed && this.api.triggerFileDownload(printedPdf.pdf, "application/pdf", _.kebabCase(_.trim(_.get(this, "_data.content.dateYYYYMMDD", moment().format("YYYYMMDD"))) + "-" + _.trim(_.get(this, "_data.content.title", this.api.crypto().randomUuid()))) + ".pdf"))
            .catch(e => {
                console.log("[ERROR] printDocument", e, inputData);
                return promResolve;
            })
            .finally(() => {

                console.log("--- this._data ---", this._data);
                console.log("inputData", inputData);

                this.set("_isBusy", false)
                this.dispatchEvent(new CustomEvent('done-printing-document', {
                    composed: true,
                    bubbles: true,
                    detail: {}
                }))
                return promResolve

            })
    }
}

customElements.define(PrintDocument.is, PrintDocument);
