import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/paper-tabs-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/atc-styles';

import './search/ht-pat-prescription-detail-search-chronic'
import './search/ht-pat-prescription-detail-search-commercial'
import './search/ht-pat-prescription-detail-search-compound'
import './search/ht-pat-prescription-detail-search-history'
import './search/ht-pat-prescription-detail-search-substance'


import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionDetailSearch extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles">
            .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .tr-item{
                cursor: pointer;
            }
            
            .th{
                height: auto!important;
                font-weight: bold;
                vertical-align: middle;
            }
            
            .tr{
                display: flex;
                height: 22px;            
                border-bottom: 1px solid var(--app-background-color-dark);   
                padding: 4px;                
            }
            
            .td{
               position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                flex-grow: 1;
                flex-basis: 0;
                padding: 6px;
                overflow: hidden;
                min-width: 0px;
                z-index: 2;
                word-break: break-word;
                white-space: nowrap;               
                font-size: 13px;
                text-overflow: ellipsis;
            }

            .fg0{
                flex-grow: 0.2;
            }
            
            .fg05{
                flex-grow: 0.5;
            }
            
            .fg01{
                flex-grow: 0.1;
            }
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }  
            
            .fg5{
                flex-grow: 4.6;
            }
            
            .search-container{
                height: 100%;
            }
            
            .search-container-search{
                margin-left: 1%;
                margin-right: 1%;
                height: 45px;
                width: auto;
            }
            
            .search-container-result{
                margin-left: 1%;
                margin-right: 1%;
                margin-top: 1%;
                height: calc(100% - 80px);
                border: 1px solid var(--app-background-color-dark);
            }
            
            .tabIcon{
                height: 14px;
                width: 14px;
                margin-right: 6px;
            }
            
            iron-pages{
                height: calc(100% - 50px);
                overflow: auto;
            }
            
            .page-content{
            
            }
            
            .addIcon{
                background-color: var(--app-secondary-color);
                height: 14px;
                width: 14px;
                cursor: pointer;
                color: white;
            }
            
            .atcIcon{
                height: 14px;
                width: 14px;
            }
            
        </style>
        
        <div class="search-container">
            <div class="search-container-search">
                 <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{drugsFilter}}"></dynamic-text-field>
            </div>
            <div class="search-container-result">
                <paper-tabs selected="{{tabs}}">
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="icons:alarm-on"></iron-icon> [[localize('presc-sear-chro','Chronic',language)]] ([[_getDrugsCount(searchResult.chronic, searchResult.chronic.*)]])
                    </paper-tab> 
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:time-backward"></iron-icon> [[localize('presc-sear-hist','History',language)]] ([[_getDrugsCount(searchResult.history, searchResult.history.*)]])
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:copyright"></iron-icon> [[localize('presc-sear-comm','Commercial name',language)]] ([[_getDrugsCount(searchResult.commercialName, searchResult.commercialName.*)]])
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:pill"></iron-icon> [[localize('presc-sear-mol','Molecule',language)]] ([[_getDrugsCount(searchResult.molecule, searchResult.molecule.*)]])
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:flask"></iron-icon> [[localize('presc-sear-comp','Compound',language)]] ([[_getDrugsCount(searchResult.compound, searchResult.compound.*)]])
                    </paper-tab>
                </paper-tabs>
                <iron-pages selected="[[tabs]]">
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-chronic id="htPatPrescriptionDetailSearchHistory" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]"></ht-pat-prescription-detail-search-chronic>              
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-history id="htPatPrescriptionDetailSearchHistory" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]"></ht-pat-prescription-detail-search-history>                   
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-commercial id="htPatPrescriptionDetailSearchCommercial" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]"></ht-pat-prescription-detail-search-commercial>          
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-substance id="htPatPrescriptionDetailSearchSubstance" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]"></ht-pat-prescription-detail-search-substance>
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-compound id="htPatPrescriptionDetailSearchCompound" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]"></ht-pat-prescription-detail-search-compound>
                        </div>
                    </page>
                </iron-pages>
            </div>
        </div>

`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-search';
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value: null
            },
            user: {
                type: Object,
                value: null
            },
            hcp:{
                type: Object,
                value: () => {}
            },
            language: {
                type: String,
                value: null
            },
            contacts: {
                type: Array,
                value: () => []
            },
            patient: {
                type: Object,
                value: ()  => {}
            },
            currentContact: {
                type: Object,
                value: () => {}
            },
            searchResult: {
                type: Object,
                value: {
                    compound: [],
                    commercialName: [],
                    history: [],
                    molecule: [],
                    chronic: []
                }
            },
            drugsFilter:{
                type: String,
                value: null
            },
            tabs:{
                type: Number,
                value: 0
            },
            listOfCompound: {
                type: Array,
                value: () => []
            },
            listOfPrescription: {
                type: Array,
                value: () => []
            },
            listOfChronic:{
                type: Array,
                value: () => []
            }
        };
    }

    static get observers() {
        return ['_drugsFilterChanged(drugsFilter)', '_initializeDataProvider(api, user, listOfCompound, listOfPrescription, listOfChronic,  listOfCompound.*, listOfPrescription.*, listOfChronic.*)'];
    }

    ready() {
        super.ready();
    }

    _initializeDataProvider(){
        this._reset()
    }

    _reset(){
        this.set('tabs', 0)
        this.set('searchResult', {
            compound: _.get(this, 'listOfCompound', []),
            commercialName: [],
            history: _.orderBy(_.get(this, 'listOfPrescription', []), ['startDate'], ['desc']),
            molecule: [],
            chronic: _.orderBy(_.get(this, 'listOfChronic', []), ['startDate'], ['desc'])
        })
        this.set('drugsFilter', null)
    }

    _drugsFilterChanged(drugsFilter){
        if(drugsFilter){
            setTimeout(() => {
                if(_.size(drugsFilter) > 2){
                    Promise.all([
                        this.api.besamv2().findPaginatedVmpsByLabel(this.language, drugsFilter),
                        this.api.besamv2().findPaginatedVmpGroupsByLabel(this.language, drugsFilter),
                        this.api.besamv2().findPaginatedAmpsByLabel(this.language, drugsFilter)
                    ]).then(([vmps, vmpGroups, amps]) => {
                        this.set("searchResult.commercialName", this._prepareAmppsForDisplay(amps))
                        this.set("searchResult.molecule", _.orderBy(_.get(vmpGroups, 'rows', []).map(vmpGroup => {
                            return {
                                endDate: null,
                                startDate: null,
                                publicPrice: null,
                                chapt4: null,
                                atc: null,
                                label: _.get(vmpGroup, 'name.'+this.language, null),
                                delivery: null,
                                cat: null,
                                narcotic: null,
                                reinPharmaVigi: null,
                                pharmaVigi: null,
                                severeRenalInsu: null,
                                moderateRenalInsu: null,
                                atcCat: null,
                                id: _.get(vmpGroup, 'id', null),
                                status: null
                            }
                        }).filter(vmpGroup => _.get(vmpGroup, 'label', null)), ["label"], ["asc"]))
                    })
                        .finally(() => {
                            this.set('searchResult.compound', this._filterValue(drugsFilter, _.get(this, 'listOfCompound', [])))
                            this.set('searchResult.history', this._filterValue(drugsFilter, _.get(this, 'listOfPrescription', [])))
                            this.set('searchResult.chronic', this._filterValue(drugsFilter, _.get(this, 'listOfChronic', [])))
                        })
                }else{
                    this.set('searchResult', {
                        compound: _.get(this, 'listOfCompound', []),
                        commercialName: [],
                        history: _.orderBy(_.get(this, 'listOfPrescription', []), ['startDate'], ['desc']),
                        molecule: [],
                        chronic: _.orderBy(_.get(this, 'listOfChronic', []), ['startDate'], ['desc'])
                    })
                }
            }, 100)
        }else{
            this.set('searchResult', {
                compound: _.get(this, 'listOfCompound', []),
                commercialName: [],
                history: _.orderBy(_.get(this, 'listOfPrescription', []), ['startDate'], ['desc']),
                molecule: [],
                chronic: _.orderBy(_.get(this, 'listOfChronic', []), ['startDate'], ['desc'])
            })
        }
    }

    _prepareAmppsForDisplay(ampps){
        const level = 0
        const insurability = _.get(_.get(this, 'patient', {}), 'insurabilities', []).find(ins => !_.get(ins, 'endDate', null) && _.get(ins, 'insuranceId', null) !== "")
        const patientBim = parseInt(_.get(insurability, 'parameters.tc1', null) % 2) === 1
        const hierarchicalAmpps = _.get(ampps, 'rows', []).reduce((ampps, row) => {
            if (_.size(_.get(row, 'ampps', []))){
                return ampps.concat(_.get(row, 'ampps', []).map(ampp => {
                    const now = moment().valueOf();
                    const publicDmpp = _.get(ampp, 'dmpps', []).find(dmpp => _.get(dmpp, 'deliveryEnvironment', null) === "P")
                    const currentReimbursement = _.get(publicDmpp, 'reimbursements', []).find(reimbursement => _.get(reimbursement, 'from', null) < now && (!_.get(reimbursement, 'to', null) || _.get(reimbursement, 'to', null) > now ))
                    const groupId = _.get(row, 'vmp.vmpGroup.id', null)
                    const hasChildren = (level === 0) && !!groupId
                    const id = _.get(publicDmpp, 'codeType', null) === 'CNK' && _.get(publicDmpp, 'code', null)
                    const unit = _.get(row, "components[0].pharmaceuticalForms[0].name[" + this.language + "]", "")
                    const atcCodes = _.get(ampp, 'atcs', []).map(atc => _.get(atc, 'code', null)) || []
                    const allergies = _.get(this, 'allergies', []).filter(allergy => (_.get(allergy, 'cnk', null) && id === _.get(allergy, 'cnk', null)) || (atcCodes && atcCodes.some(atcCode => atcCode === _.get(allergy, 'atcCode', null)) || ""));
                    const dividable = !(_.get(row, "components[0].dividable", "") === "X");
                    const samDate = _.get(publicDmpp, 'from', null) ? moment(_.get(publicDmpp, 'from', null)).format("DD/MM/YYYY") : null

                    return Object.assign(ampp, {
                        id: id,
                        groupId: groupId,
                        hasChildren: hasChildren,
                        uuid: id,
                        parentUuid: null,
                        publicDmpp: publicDmpp,
                        currentReimbursement: currentReimbursement,
                        intendedName: (_.get(ampp, 'prescriptionName['+this.language+']', null)) || (_.get(publicDmpp, 'prescriptionName['+this.language+']', null)) || (_.get(ampp, 'abbreviatedName['+this.language+']', null)) || '',
                        posologyNote: _.get(ampp, 'posologyNote['+this.language+']', null) || "",
                        unit: unit,
                        atcCodes: atcCodes,
                        allergies: allergies,
                        dividable: dividable,
                        samDate: samDate,
                        amp: row
                    })
                }));
            }
            return ampps;
        }, [])
        .filter(e => e.amp.status === "AUTHORIZED" && _.get(e, 'publicDmpp', null) && _.get(e, 'id', null) && _.get(e, 'intendedName', null) && (level === 0 || level === 1 && _.get(e, 'uuid', null) !== parentUuid))
        .filter((e, i, a) => a.findIndex(x => _.get(x, 'id', null) === _.get(e, 'id', '')) === i)

        let filteredAmpps = [];
        if (level === 0) {
            // build uuids
            const uuids = hierarchicalAmpps.map(hierarchicalAmpp => _.get(hierarchicalAmpp, 'uuid', null))
            filteredAmpps = hierarchicalAmpps.map(hierarchicalAmpp => Object.assign(hierarchicalAmpp, {uuids: uuids}))
        } else {
            // filter against parentUuids
            filteredAmpps = hierarchicalAmpps.filter(hierarchicalAmpp => !parentUuids.includes(_.get(hierarchicalAmpp, 'uuid', null)))
        }

        const finalList = filteredAmpps
            .map(filteredAmpp => {
                const dmpp = _.get(filteredAmpp, 'publicDmpp', null)
                const reimb = _.get(filteredAmpp, 'currentReimbursement', null)
                const publicPrice =  !reimb ? parseFloat(dmpp.price || 0) :
                    (_.get(reimb, 'referenceBasePrice', null) && _.get(reimb, 'copaymentSupplement', null)) ? (parseFloat(_.get(reimb, 'referenceBasePrice', 0)) + parseFloat(_.get(reimb, 'copaymentSupplement', 0))) :
                        parseFloat(_.get(reimb, 'reimbursementBasePrice', 0))
                const patientPrice = !reimb ? parseFloat(_.get(dmpp, 'price', 0)) :
                    (_.size(_.get(reimb, 'copayments', []) === 2)) ? parseFloat(patientBim ? reimb.copayments[0].feeAmount : reimb.copayments[1].feeAmount) : 0
                return Object.assign(filteredAmpp, {
                    publicPrice: publicPrice,
                    patientPrice: patientPrice,
                    priceIndex: _.get(dmpp, 'cheapest', null) ? 0 : (_.get(dmpp, 'cheap', null) ? 1 : 2)
                })
            })
            .sort((a, b) => _.get(a, 'priceIndex', null) !== _.get(b, 'priceIndex', '') ? (_.get(a, 'priceIndex', 0) - _.get(b, 'priceIndex', 0)) : (_.get(a, 'patientPrice', 0) - _.get(b, 'patientPrice', 0)));

        if (_.size(finalList) === 0 && level > 0) {
            finalList.push({
                intendedName: this.localize("no_alt", "Pas d'alternative", this.language)
            });
        }

        return this._formatAmpp(finalList)
    }

    _formatAmpp(amppList) {
        return amppList.map(ampp => {
                return {
                    id: _.get(ampp, 'id', null),
                    groupId: _.get(ampp, 'groupId', null),
                    uuid: _.get(ampp, 'uuid', null),
                    uuids: _.get(ampp, 'uuids', null),
                    hasChildren: _.get(ampp, 'hasChildren', null),
                    parentUuid: _.get(ampp, 'parentUuid', null),
                    ctiExtended: _.get(ampp, 'ctiExtended', null),
                    label: _.get(ampp, 'intendedName', null),
                    reinfPharmaVigiIcon: this._reinfPharmaVigiIcon(_.get(ampp, "amp.blackTriangle", false)),
                    atcCodes: _.get(ampp, 'atcCodes', null),
                    atcCat: _.get(ampp, "atcCodes[0][0]", ""),
                    allergies: _.get(ampp, 'allergies', []),
                    allergyType: this._getAllergyType(ampp.allergies),
                    patientPrice: _.get(ampp, 'id', null) && _.get(ampp, 'patientPrice', 0.00).toFixed(2) + " €",
                    publicPrice: _.get(ampp, 'id', null) && _.get(ampp, 'publicPrice', 0.00).toFixed(2) + " €",
                    priceIndex: _.get(ampp, 'id', null) && _.get(ampp, 'priceIndex', null) || 3,
                    catIcon: this._catIconSamV2(ampp),
                    unit: _.get(ampp, 'unit', null),
                    amp: _.get(ampp, 'amp', null),
                    posologyNote: _.get(ampp, 'posologyNote', null),
                    dividable: _.get(ampp, 'dividable', null),
                    packDisplayValue: _.get(ampp, 'packDisplayValue', null),
                    samCode: _.get(ampp, "amp.code", ""),
                    samDate: _.get(ampp, 'samDate', null),
                    type: "medicine",
                    narcoticIcon: null,
                    compProhibIcon: null
                }
            })
    }

    _filterValue(drugsFilter, listOfDrugs){
        const keywordsString = _.trim(drugsFilter).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
        const keywordsArray = _.compact(_.uniq(_.map(keywordsString.split(" "), i=>_.trim(i))))

       return _.chain(listOfDrugs)
            .chain(drugsFilter)
            .filter(i => _.size(keywordsArray) === _.size(_.compact(_.map(keywordsArray, keyword => _.trim(_.get(i, "normalizedSearchTerms", "")).indexOf(keyword) > -1))))
            .compact()
            .uniq()
            .value()
    }

    _localizeDrugName(name){
        return _.get(name, this.language, null)
    }

    _getDrugsCount(drugsList){
        return _.size(drugsList)
    }

    _formatDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }

    _getAtc(cat) {
        return cat ? this.localize('atc-' + cat, '') : null
    }

    _reinfPharmaVigiIcon(info) {
        return info ? 'reinf-pharma-vigi' : null;
    }

    _getAllergyType(allergies) {
         return _.size(allergies) ? allergies.some(allergy => _.get(allergy, 'type', null) === "allergy") ? "allergy" : allergies.some(allergy => _.get(allergy, 'type', null) === "adr") ? "adr" : null : null
    }

    _catIconSamV2(ampp) {
        return _.get(ampp, 'publicDmpp', null) || _.get(ampp, 'currentReimbursement', null) ?
                    _.get(ampp, 'publicDmpp.cheap', null) ?
                        _.get(ampp, 'currentReimbursement.copaymentSupplement', null) ?
                            null
                        : "cat-cheap-noacm"
                    : _.get(ampp, 'currentReimbursement.copaymentSupplement', null) ?
                        null
                    : "cat-notcheap-noacm"
               : null
    }

}
customElements.define(HtPatPrescriptionDetailSearch.is, HtPatPrescriptionDetailSearch);
