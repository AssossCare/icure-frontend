import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../icons/icure-icons';
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
import './search/ht-pat-prescription-detail-search-otc'


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
                    <!--
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:raster"></iron-icon> [[localize('presc-sear-otc','Otc',language)]] ([[_getDrugsCount(searchResult.otc, searchResult.otc.*)]])
                    </paper-tab>
                    -->
                </paper-tabs>
                <iron-pages selected="[[tabs]]">
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-chronic id="htPatPrescriptionDetailSearchHistory" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]" is-loading="[[isLoading]]"></ht-pat-prescription-detail-search-chronic>              
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-history id="htPatPrescriptionDetailSearchHistory" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]" is-loading="[[isLoading]]"></ht-pat-prescription-detail-search-history>                   
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-commercial id="htPatPrescriptionDetailSearchCommercial" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]" is-loading="[[isLoading]]"></ht-pat-prescription-detail-search-commercial>          
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-substance id="htPatPrescriptionDetailSearchSubstance" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]" is-loading="[[isLoading]]"></ht-pat-prescription-detail-search-substance>
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-compound id="htPatPrescriptionDetailSearchCompound" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]" is-loading="[[isLoading]]"></ht-pat-prescription-detail-search-compound>
                        </div>
                    </page>
                    <!--
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-otc id="htPatPrescriptionDetailSearchOtc" api="[[api]]" user="[[user]]" hcp="[[hcp]]" language="[[language]]" search-result="[[searchResult]]" resources="[[resources]]" is-loading="[[isLoading]]"></ht-pat-prescription-detail-search-otc>
                        </div>
                    </page>
                    -->
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
                    chronic: [],
                    otc: []
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
            },
            allergies: {
                type: Array,
                value: () => []
            },
            isLoading:{
                type: Boolean,
                value: false
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
            chronic: _.orderBy(_.get(this, 'listOfChronic', []), ['startDate'], ['desc']),
            otc: []
        })
        this.set('drugsFilter', null)
    }


    _drugsFilterChanged(drugsFilter, parentUuid, groupId){
        this.set('isLoading', true)
        if(drugsFilter){
            setTimeout(() => {
                if(_.size(drugsFilter) >= 2){
                    Promise.all([
                        this.api.besamv2().findPaginatedVmpGroupsByLabel(this.language, drugsFilter),
                        this.api.besamv2().findPaginatedAmpsByLabel(this.language, drugsFilter)
                    ]).then(([vmpGroups, amps]) => {
                        this.set("searchResult.commercialName", _.orderBy(this._prepareCommercialForDisplay(amps, null, null), ['label'], ['asc']))
                        return this._prepareMoleculeForDisplay(vmpGroups)
                    }).then(vmpGroupList =>
                        this.set("searchResult.molecule", _.orderBy(this._formatIngredient(vmpGroupList.filter(vpmGroup => _.get(vpmGroup, 'intendedName', null) && _.get(vpmGroup, 'id', null))), ['label'], ['asc']))
                    ).finally(() => {
                        this.set('searchResult.compound',  _.orderBy(this._filterValue(drugsFilter, _.get(this, 'listOfCompound', [])), ['label'], ['asc']))
                        this.set('searchResult.history',  _.orderBy(this._filterValue(drugsFilter, _.get(this, 'listOfPrescription', [])), ['startDate'], ['desc']))
                        this.set('searchResult.chronic',  _.orderBy(this._filterValue(drugsFilter, _.get(this, 'listOfChronic', [])), ['startDate'], ['desc']))
                        this.set('searchResult.otc', [])
                        this.set('isLoading', false)
                    })
                }else{
                    this.set('searchResult', {
                        compound: _.get(this, 'listOfCompound', []),
                        commercialName: [],
                        history: _.orderBy(_.get(this, 'listOfPrescription', []), ['startDate'], ['desc']),
                        molecule: [],
                        chronic: _.orderBy(_.get(this, 'listOfChronic', []), ['startDate'], ['desc']),
                        otc: []
                    })
                    this.set('isLoading', false)
                }
            }, 100)
        }else{
            this.set('searchResult', {
                compound: _.get(this, 'listOfCompound', []),
                commercialName: [],
                history: _.orderBy(_.get(this, 'listOfPrescription', []), ['startDate'], ['desc']),
                molecule: [],
                chronic: _.orderBy(_.get(this, 'listOfChronic', []), ['startDate'], ['desc']),
                otc: []
            })
            this.set('isLoading', false)
        }
    }

    _searchCheaperAlternative(groupId, parentUuid, parentUuids, parentDrug){
        this.api.besamv2().findPaginatedAmpsByGroupId(groupId).then(amps => {
            this.dispatchEvent(new CustomEvent('cheaper-drugs-list-loaded', {
                bubbles: true,
                composed: true,
                detail: {
                    cheaperDrugsList: _.orderBy(this._prepareCommercialForDisplay(amps, parentUuid, parentUuids), ['label'], ['asc']),
                    parentDrug: parentDrug
                }
            }))
        })
    }

    _prepareCommercialForDisplay(ampps, parentUuid, parentUuids){
        const level = parentUuid ? 1 : 0
        const insurability = _.get(_.get(this, 'patient', {}), 'insurabilities', []).find(ins => !_.get(ins, 'endDate', null) && _.get(ins, 'insuranceId', null) !== "")
        const patientBim = parseInt(_.get(insurability, 'parameters.tc1', null) % 2) === 1
        const hierarchicalAmpps = _.get(ampps, 'rows', []).reduce((ampps, row) => {
            if (_.size(_.get(row, 'ampps', []))){
                return ampps.concat(_.get(row, 'ampps', []).map(ampp => {
                    const now = moment().valueOf();
                    const publicDmpp = _.get(ampp, 'dmpps', []).find(dmpp => _.get(dmpp, 'deliveryEnvironment', null) === "P")
                    const atcCodes = _.get(ampp, 'atcs', []).map(atc => _.get(atc, 'code', null)) || []
                    const drugCnk = _.trim(_.get(publicDmpp, 'codeType')) === 'CNK' && _.trim(_.get(publicDmpp, 'code'))

                    // _.filter(_.get(this,"allergies",[]), patAllergy => {
                    //
                    //     const patAllergyAtcCodes = _
                    //         .chain(patAllergy)
                    //         .get("codes")
                    //         .filter({type:"CD-ATC"})
                    //         .map("code")
                    //         .uniq()
                    //         .compact()
                    //         .value()
                    //
                    //     console.log("patAllergyAtcCodes", patAllergyAtcCodes);
                    //
                    // })

                    return _.assign(ampp, {
                        id: drugCnk,
                        groupId: _.get(row, 'vmp.vmpGroup.id', null),
                        hasChildren: (level === 0) && !!_.get(row, 'vmp.vmpGroup.id', null),
                        uuid: _.get(publicDmpp, 'codeType', null) === 'CNK' && _.get(publicDmpp, 'code', null),
                        parentUuid: null,
                        publicDmpp: publicDmpp,
                        currentReimbursement: _.get(publicDmpp, 'reimbursements', []).find(reimbursement => _.get(reimbursement, 'from', null) < now && (!_.get(reimbursement, 'to', null) || _.get(reimbursement, 'to', null) > now )),
                        intendedName: (_.get(ampp, 'prescriptionName['+this.language+']', null)) || (_.get(publicDmpp, 'prescriptionName['+this.language+']', null)) || (_.get(ampp, 'abbreviatedName['+this.language+']', null)) || '',
                        posologyNote: _.get(ampp, 'posologyNote['+this.language+']', null) || "",
                        unit: _.get(row, "components[0].pharmaceuticalForms[0].name[" + this.language + "]", ""),
                        atcCodes: atcCodes,
                        allergies: _.get(this, 'allergies', []).filter(allergy => (_.get(allergy, 'cnk', null) && drugCnk === _.get(allergy, 'cnk', null)) || (atcCodes && atcCodes.some(atcCode => atcCode === _.get(allergy, 'atcCode', null)) || "")),
                        dividable: !(_.get(row, "components[0].dividable", "") === "X"),
                        samDate: _.get(publicDmpp, 'from', null) ? moment(_.get(publicDmpp, 'from', null)).format("DD/MM/YYYY") : null,
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
                intendedName: this.localize("no_alt", "Pas d'alternative", this.language),
                id: 'no_alt'
            });
        }

        return this._formatCommercial(finalList)
    }

    _formatCommercial(amppList) {
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
                    atcCodes: _.get(ampp, 'atcCodes', null),
                    atcCat: _.get(ampp, "atcCodes[0][0]", ""),
                    allergies: _.get(ampp, 'allergies', []),
                    allergyType: this._getAllergyType(_.get(ampp, 'allergies', [])),
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
                    reinfPharmaVigiIcon: this._reinfPharmaVigiIconSamV2(_.get(ampp, "amp", false)),
                    narcoticIcon: this._narcoticIcon(_.get(ampp, "amp", null)),
                    compProhibIcon: this._compProhibIconSamV2(_.get(ampp, 'vmpGroup',null)),
                    informationsForPosology:{
                        scpLink: _.get(ampp, 'spcLink', null),
                        crmLink: _.get(ampp, 'crmLink', null),
                        leafletLink: _.get(ampp, 'leafletLink', null),
                        rmaLink: null,
                        dhpcLink: null,
                        novos: null,
                        noswitch: null,
                        cbipLink: null,
                        dopingStatus: null,
                        prescCondition: null,
                        deliveryCondition: {
                            deliveryModus: _.get(ampp, 'deliveryModus', null),
                            deliveryModusCode: _.get(ampp, 'deliveryModusCode', null),
                            deliveryModusSpecification: _.get(ampp, 'deliveryModusSpecification', null)
                        },
                        yellowLink: null,
                        dividable: _.get(ampp, 'dividable', false),
                        currentReimbursement: _.get(ampp, 'currentReimbursement', {}),
                        vmp: _.get(ampp, 'amp.vmp', {})
                    }
                }
            })
    }

    _prepareMoleculeForDisplay(vmpGroups){
        let prom = Promise.resolve([])
        _.get(vmpGroups, 'rows', []).map(vmpGroup =>
            prom = prom.then(vmpGroupList =>
                this.api.besamv2().findPaginatedAmpsByGroupCode(_.get(vmpGroup, 'code', null), null, null, 1)
                    .then(amps => {
                        const atcCodes = _.get(_.get(_.head(amps), "ampps", []).find(ampp => !_.get(ampp, 'to', null) && _.size(_.get(ampp, 'atcs', [])) && _.get(ampp, 'dmpps', []).some(dmpp => _.trim(_.get(dmpp, 'deliveryEnvironment')) === 'P' && _.trim(_.get(dmpp, 'codeType')) === 'CNK' && !_.get(dmpp, 'to', null))), 'atcs', []).map(atc => atc.code) || []
                        const id = _.get(vmpGroup, 'code', null)
                        return _.concat(vmpGroupList, _.assign(vmpGroup, {
                                id: id,
                                intendedName: _.get(vmpGroup, "name[" + this.language + "]", ""),
                                unit: _.get(_.head(amps), "components[0].pharmaceuticalForms[0].name[" + this.language + "]", ""),
                                atcCodes: atcCodes,
                                allergies: _.get(this, 'allergies', []).filter(allergy => (_.get(allergy, 'cnk', null) && (id === _.get(allergy, 'cnk', null))) || (atcCodes && atcCodes.some(atcCode => atcCode === _.get(allergy, 'atcCode', null)) || ""))
                            }))
                        }
                    ))
        )
        return prom
    }

    _formatIngredient(vmpGroups) {
         return vmpGroups.map(vmpGroup => {
               return  {
                    id: _.get(vmpGroup, 'id', null),
                    label: _.get(vmpGroup, 'intendedName', null),
                    atcCodes: _.get(vmpGroup, 'atcCodes', null),
                    atcCat: _.get(vmpGroup, "atcCodes[0][0]", ""),
                    allergies: _.get(vmpGroup, 'allergies', []),
                    allergyType: this._getAllergyType(_.get(vmpGroup, 'allergies', [])),
                    unit: _.get(vmpGroup, 'unit', null),
                    noSwitchReason: _.get(vmpGroup, 'noSwitchReason', null),
                    type: 'substance'
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

    _reinfPharmaVigiIconSamV2(info) {
        return _.get(info, 'blackTriangle', null) ? 'reinf-pharma-vigi' : null
    }

    _compProhibIconSamV2(vmpGroup) {
        return _.get(vmpGroup, 'noGenericPrescriptionReason.code', null) === "5" ? 'cat-doping-prod' : null
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

    _narcoticIcon(info) {
        return _.get(info, 'note', null) === 'stupéfiant' ? 'stup' : null
    }

}
customElements.define(HtPatPrescriptionDetailSearch.is, HtPatPrescriptionDetailSearch);
