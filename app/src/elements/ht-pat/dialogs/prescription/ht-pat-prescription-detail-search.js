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
            
            ht-spinner{
                height: 20px;
                width: 20px;
                margin-left: 10px;
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
                        <ht-spinner active="[[isLoading]]"></ht-spinner>
                    </paper-tab> 
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:time-backward"></iron-icon> [[localize('presc-sear-hist','History',language)]] ([[_getDrugsCount(searchResult.history, searchResult.history.*)]])
                        <ht-spinner active="[[isLoading]]"></ht-spinner>
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:copyright"></iron-icon> [[localize('presc-sear-comm','Commercial name',language)]] ([[_getDrugsCount(searchResult.commercialName, searchResult.commercialName.*)]])
                        <ht-spinner active="[[isLoadingCommercial]]"></ht-spinner>
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:pill"></iron-icon> [[localize('presc-sear-mol','Molecule',language)]] ([[_getDrugsCount(searchResult.molecule, searchResult.molecule.*)]])
                        <ht-spinner active="[[isLoadingSubstance]]"></ht-spinner>
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:flask"></iron-icon> [[localize('presc-sear-comp','Compound',language)]] ([[_getDrugsCount(searchResult.compound, searchResult.compound.*)]])
                        <ht-spinner active="[[isLoading]]"></ht-spinner>
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:raster"></iron-icon> [[localize('presc-sear-otc','Otc',language)]] ([[_getDrugsCount(searchResult.otc, searchResult.otc.*)]])
                        <ht-spinner active="[[isLoadingOtc]]"></ht-spinner>
                     </paper-tab>
                 
                </paper-tabs>
                <iron-pages selected="[[tabs]]">
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-chronic 
                                id="htPatPrescriptionDetailSearchHistory" 
                                api="[[api]]" 
                                user="[[user]]" 
                                hcp="[[hcp]]" 
                                language="[[language]]" 
                                search-result="[[searchResult]]" 
                                resources="[[resources]]" 
                                is-loading="[[isLoading]]"
                                sam-version="[[samVersion]]"
                             ></ht-pat-prescription-detail-search-chronic>              
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-history 
                                id="htPatPrescriptionDetailSearchHistory" 
                                api="[[api]]" 
                                user="[[user]]" 
                                hcp="[[hcp]]" 
                                language="[[language]]" 
                                search-result="[[searchResult]]" 
                                resources="[[resources]]" 
                                is-loading="[[isLoading]]"
                                sam-version="[[samVersion]]"
                            ></ht-pat-prescription-detail-search-history>                   
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-commercial 
                                id="htPatPrescriptionDetailSearchCommercial" 
                                api="[[api]]" 
                                user="[[user]]" 
                                hcp="[[hcp]]" 
                                language="[[language]]" 
                                search-result="[[searchResult]]" 
                                resources="[[resources]]" 
                                is-loading="[[isLoadingCommercial]]"
                                sam-version="[[samVersion]]"
                            ></ht-pat-prescription-detail-search-commercial>          
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-substance 
                                id="htPatPrescriptionDetailSearchSubstance" 
                                api="[[api]]" 
                                user="[[user]]" 
                                hcp="[[hcp]]" 
                                language="[[language]]" 
                                search-result="[[searchResult]]" 
                                resources="[[resources]]" 
                                is-loading="[[isLoadingSubstance]]"
                                sam-version="[[samVersion]]"
                            ></ht-pat-prescription-detail-search-substance>
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-compound 
                                id="htPatPrescriptionDetailSearchCompound" 
                                api="[[api]]" 
                                user="[[user]]" 
                                hcp="[[hcp]]" 
                                language="[[language]]" 
                                search-result="[[searchResult]]" 
                                resources="[[resources]]" 
                                is-loading="[[isLoading]]"
                                sam-version="[[samVersion]]"
                            ></ht-pat-prescription-detail-search-compound>
                        </div>
                    </page>
                    <page>
                        <div class="page-content">
                            <ht-pat-prescription-detail-search-otc 
                                id="htPatPrescriptionDetailSearchOtc" 
                                api="[[api]]" 
                                user="[[user]]" 
                                hcp="[[hcp]]" 
                                language="[[language]]" 
                                search-result="[[searchResult]]" 
                                resources="[[resources]]" 
                                is-loading="[[isLoadingOtc]]"
                                sam-version="[[samVersion]]"
                            ></ht-pat-prescription-detail-search-otc>
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
            isLoadingCommercial:{
                type: Boolean,
                value: false
            },
            isLoadingOtc:{
                type: Boolean,
                value: false
            },
            isLoadingSubstance:{
                type: Boolean,
                value: false
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            samVersion:{
                type: Object,
                value: () => {}
            },
            reqIdx:{
                type: Number,
                value: 0
            }
        };
    }

    static get observers() {
        return ['_drugsFilterChanged(drugsFilter)','_compoundChanged(listOfCompound,listOfCompound.*)', '_initializeDataProvider(api, user,  listOfPrescription, listOfChronic, listOfPrescription.*, listOfChronic.*)', '_selectedTabChanged(tabs)'];
    }

    ready() {
        super.ready();
    }

    _initializeDataProvider(){
        this._reset()
    }

    _compoundChanged(){
        this.set('searchResult.compound',this.drugsFilter ?  _.orderBy(this._filterValue(this.drugsFilter, _.get(this, 'listOfCompound', [])), ['label'], ['asc']) : _.get(this, 'listOfCompound', []))
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
        this.set('isLoadingCommercial', false)
        this.set('isLoadingOtc', false)
        this.set('isLoadingSubstance', false)
        this.set('isLoading', false)
    }

    _drugsFilterChanged(drugsFilter, parentUuid, groupId){
        this.set('isLoadingCommercial', true)
        this.set('isLoadingOtc', true)
        this.set('isLoadingSubstance', true)
        this.set('isLoading', true)
        let prom = Promise.resolve({})

        const reqIdx = (this.reqIdx = (this.reqIdx || 0) + 1)

        if(drugsFilter){
            setTimeout(() => {
                if (reqIdx !== this.reqIdx) return
                if(_.size(_.trim(drugsFilter)) >= 2){
                    prom = prom.then(() => {
                        this.set('searchResult.compound',  _.orderBy(this._filterValue(drugsFilter, _.get(this, 'listOfCompound', [])), ['label'], ['asc']))
                        this.set('searchResult.history',  _.orderBy(this._filterValue(drugsFilter, _.get(this, 'listOfPrescription', [])), ['startDate'], ['desc']))
                        this.set('searchResult.chronic',  _.orderBy(this._filterValue(drugsFilter, _.get(this, 'listOfChronic', [])), ['startDate'], ['desc']))
                        this.set('isLoading', false)
                    }).then(() =>
                        Promise.all([
                            this.api.besamv2().findPaginatedVmpGroupsByLabel(this.language, drugsFilter),
                            this.api.besamv2().findPaginatedAmpsByLabel(this.language, drugsFilter),
                            this.api.besamv2().findPaginatedNmpsByLabel(this.language, drugsFilter)
                        ])
                    ).then(([vmpGroups, amps, nmps]) => {
                        if (reqIdx === this.reqIdx){
                            this.set("searchResult.commercialName", this._prepareCommercialForDisplay(amps, null, null)),
                            this.set("searchResult.molecule", _.orderBy(this._formatIngredient(_.get(vmpGroups, 'rows', []).filter(vpmGroup => _.get(vpmGroup, 'id', null))), ['label'], ['asc']))
                            this.set("searchResult.otc", _.orderBy(this._prepareOtcForDisplay(nmps), ['label'], ['asc']))
                            this.set('isLoadingCommercial', false)
                            this.set('isLoadingOtc', false)
                        }
                    }).finally(() => {
                        // Assign internal id
                        _.map(this.searchResult, it => !_.size(it) ? false : !Array.isArray(_.head(it)) ? _.map(it, drug => !_.trim(_.get(drug,"internalUuid")) && _.assign(drug,{internalUuid: this.api.crypto().randomUuid()})) : _.map(it, drugGroup => _.map(drugGroup, drug => !_.trim(_.get(drug,"internalUuid")) && _.assign(drug,{internalUuid: this.api.crypto().randomUuid()}))))
                        this.set('isLoadingCommercial', false)
                        this.set('isLoadingOtc', false)
                        this.set('isLoadingSubstance', false)
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
                    this.set('isLoadingCommercial', false)
                    this.set('isLoadingOtc', false)
                    this.set('isLoadingSubstance', false)
                    this.set('isLoading', false)
                }
            }, 300)
        }else{
            this.set('searchResult', {
                compound: _.get(this, 'listOfCompound', []),
                commercialName: [],
                history: _.orderBy(_.get(this, 'listOfPrescription', []), ['startDate'], ['desc']),
                molecule: [],
                chronic: _.orderBy(_.get(this, 'listOfChronic', []), ['startDate'], ['desc']),
                otc: []
            })
            this.set('isLoadingCommercial', false)
            this.set('isLoadingOtc', false)
            this.set('isLoadingSubstance', false)
            this.set('isLoading', false)
        }
    }

    _searchCheaperAlternative(groupId, parentUuid, parentUuids, parentDrug){
        Promise.all([
            this.api.besamv2().findPaginatedVmpsByGroupCode(_.get(parentDrug, 'informations.vmpGroupCode')),
            this.api.besamv2().findPaginatedAmpsByGroupId(groupId)]
        ).then(([vmps, amps]) => {
            this.dispatchEvent(new CustomEvent('cheaper-drugs-list-loaded', {
                bubbles: true,
                composed: true,
                detail: {
                    cheaperDrugsList: _.map(_.assign(
                        _.groupBy(this._prepareCommercialForDisplay(amps, parentUuid, parentUuids), 'officialName'),
                        {
                            'Générique': _.uniqBy(this._formatIngredient(_.get(vmps, 'rows', [])), 'code')
                        }), group => group),
                    parentDrug: parentDrug
                }
            }))
        })
    }

    _searchAmpsByVmpGroup(vmpGroupId, parentMolecule){
            this.set('amppsByVmpGroupList', [])
            this.api.besamv2().findPaginatedAmpsByGroupId(vmpGroupId).then(amps => {
                this.dispatchEvent(new CustomEvent('amps-by-vmp-group-loaded', {
                    bubbles: true,
                    composed: true,
                    detail: {
                        ampsByVmpGroupList: _.map(_.groupBy(this._prepareCommercialForDisplay(amps), 'officialName'), group => group),
                        parentMolecule: parentMolecule
                    }
                }))
            })
    }

    _prepareCommercialForDisplay(ampps, parentUuid, parentUuids){

        const level = parentUuid ? 1 : 0

        let hierarchicalAmpps = _.sortBy(_.get(ampps, 'rows', []).reduce((ampps, row) => {
            if (_.size(_.get(row, 'ampps', []))){
                return ampps.concat(_.get(row, 'ampps', []).map(ampp => {
                    const now = moment().valueOf();
                    const publicDmpp = _.get(ampp, 'dmpps', []).find(dmpp => _.get(dmpp, 'deliveryEnvironment', null) === "P")
                    const atcCodes = _.compact(_.map(_.get(ampp,"atcs",[]), "code"))
                    const drugCnk = _.trim(_.get(publicDmpp, 'codeType')) === 'CNK' && _.trim(_.get(publicDmpp, 'code'))

                    return _.assign(ampp, {
                        id: drugCnk || this.api.crypto().randomUuid(),
                        groupId: _.get(row, 'vmp.vmpGroup.id', null),
                        hasChildren: (level === 0) && !!_.get(row, 'vmp.vmpGroup.id', null),
                        uuid: _.get(publicDmpp, 'codeType', null) === 'CNK' && _.get(publicDmpp, 'code', null),
                        parentUuid: null,
                        publicDmpp: publicDmpp,
                        currentReimbursement: _.get(publicDmpp, 'reimbursements', []).find(reimbursement => _.get(reimbursement, 'from', null) < now && (!_.get(reimbursement, 'to', null) || _.get(reimbursement, 'to', null) > now )),
                        intendedName: (_.get(ampp, 'prescriptionName['+this.language+']', null)) || (_.get(publicDmpp, 'prescriptionName['+this.language+']', null)) || (_.get(ampp, 'abbreviatedName['+this.language+']', null)) || '',
                        label: (_.get(ampp, 'prescriptionName['+this.language+']', null)) || (_.get(publicDmpp, 'prescriptionName['+this.language+']', null)) || (_.get(ampp, 'abbreviatedName['+this.language+']', null)) || '',
                        posologyNote: _.get(ampp, 'posologyNote['+this.language+']', null) || "",
                        unit: _.get(row, "components[0].pharmaceuticalForms[0].name[" + this.language + "]", ""),
                        atcCodes: atcCodes,
                        allergies: _.filter(_.get(this,"allergies"), patAllergy => _.size(_.get(patAllergy,"codes",[])) && _.some(_.get(patAllergy,"codes",[]), code => _.trim(_.get(code,"type")) === "CD-ATC" && _.trim(_.get(code,"code")).indexOf(atcCodes) > -1 )),
                        dividable: !(_.get(row, "components[0].dividable", "") === "X"),
                        samDate: _.get(publicDmpp, 'from', null) ? moment(_.get(publicDmpp, 'from', null)).format("DD/MM/YYYY") : null,
                        amp: row
                    })
                }));
            }
            return ampps;
        }, [])
        .filter(e => _.trim(_.get(e,"amp.status")) === "AUTHORIZED" && _.get(e, 'publicDmpp', null) && _.get(e, 'id', null) && _.get(e, 'intendedName', null) && (level === 0 || level === 1 && _.get(e, 'uuid', null) !== parentUuid))
        , ['index', 'label'])
        //.filter(a => _.get(a, 'status', null) === "AUTHORIZED")

        hierarchicalAmpps = _.map(_.groupBy(hierarchicalAmpps, 'ctiExtended'), x => _.head(x)).filter(hierarchicalAmpp => _.size(_.get(hierarchicalAmpp, 'commercializations', [])) > 0)

        let filteredAmpps = [];
        if (level === 0) {
            // build uuids
            const uuids = hierarchicalAmpps.map(hierarchicalAmpp => _.get(hierarchicalAmpp, 'uuid', null))
            filteredAmpps = hierarchicalAmpps.map(hierarchicalAmpp => Object.assign(hierarchicalAmpp, {uuids: uuids}))
        } else {
            // filter against parentUuids
            filteredAmpps = hierarchicalAmpps.filter(hierarchicalAmpp => !parentUuids.includes(_.get(hierarchicalAmpp, 'uuid', null)))
        }

        if (_.size(filteredAmpps) === 0 && level > 0) {
            filteredAmpps.push({
                intendedName: this.localize("no_alt", "Pas d'alternative", this.language),
                id: 'no_alt'
            });
        }

        return this._formatCommercial(filteredAmpps)
    }

    _getCommercialInformations(ampp, currentDmpp, currentReimbursement) {

        const amppAmpAmpps = _.find(_.get(ampp, 'amp.ampps', []), a => _.get(ampp, 'id', null) === _.get(a, 'id', '')) || ampp || {}

        return {
            ampp: amppAmpAmpps,
            dmpp: currentDmpp,
            crmLink: _.get(amppAmpAmpps, 'crmLink', null),
            currentReimbursement: currentReimbursement,
            deliveryModus: _.get(amppAmpAmpps, 'deliveryModus', null),
            deliveryModusSpecification: _.get(amppAmpAmpps, 'deliveryModusSpecification', null),
            leafletLink: _.get(amppAmpAmpps, 'leafletLink', null),
            noGenericPrescriptionReasons:_.get(amppAmpAmpps, 'noGenericPrescriptionReasons', null),
            posologyNote: _.get(amppAmpAmpps, 'posologyNote', null),
            speciallyRegulated: _.get(amppAmpAmpps, 'speciallyRegulated', null),
            supplyProblems: _.get(amppAmpAmpps, 'supplyProblems', null),
            currentSupplyProblem: this._getCurrentSupplyProblem(_.get(amppAmpAmpps, 'supplyProblems', null)),
            blackTriangle: _.get(amppAmpAmpps, 'amp.blackTriangle', null),
            company: _.get(amppAmpAmpps, 'company', null),
            commercializations: _.get(amppAmpAmpps, 'commercializations', null),
            currentCommercialization: this._getCurrentCommercialization(_.get(amppAmpAmpps, 'commercializations', null)),
            amppFinished: this._getFinishedCommercializations(_.get(ampp, 'amp.ampps', [])),
            hasAtLeastOneValidAmpp: this._hasAtLeastOneValidAmpp(_.get(ampp, 'ctiExtended', null), _.get(ampp, 'amp.ampps', [])),
            vmpName: _.get(ampp, 'amp.vmp.name.'+this.language, null),
            vmpGroupName: _.get(ampp, 'amp.vmp.vmpGroup.name.'+this.language, null),
            rmaLink: _.get(ampp, 'rmaPatientLink', {}),
            rmaProfessionalLink: _.get(ampp, 'rmaProfessionalLink', {}),
            rma: !_.isEmpty(_.get(ampp, 'rmaPatientLink', {})),
            patientPrice: this._getPatientPrice(currentReimbursement, currentDmpp),
            publicPrice: this._getPublicPrice(currentReimbursement, currentDmpp),
            priceIndex: this._getPriceIndex(currentDmpp),
            index: _.get(ampp, 'index', null),
            vmpGroupCode: _.get(ampp, 'amp.vmp.vmpGroup.code', null),
        }

    }

    _formatCommercial(amppList) {

        return _
            .chain(amppList)
            .map(ampp => {
                const currentDmpp = this._getCurrentDmpp(_.get(ampp, 'dmpps', []).filter(dmpp => _.get(dmpp, 'code', null) === _.get(ampp, 'id', null) && _.get(dmpp, 'deliveryEnvironment', null) === 'P'))
                const currentReimbursement = _.get(_.get(ampp, 'amp.ampps', []).find(a => _.get(ampp, 'id', null) === _.get(a, 'id', '')), 'currentReimbursement', null)
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
                    unit: _.get(ampp, 'unit', null),
                    amp: _.get(ampp, 'amp', null),
                    officialName: _.get(ampp, 'amp.officialName', null),
                    posologyNote: _.get(ampp, 'posologyNote', null),
                    dividable: _.get(ampp, 'dividable', null),
                    packDisplayValue: _.get(ampp, 'packDisplayValue', null),
                    samCode: _.get(ampp, "amp.code", ""),
                    samDate: _.get(ampp, 'samDate', null),
                    type: "medicine",
                    reinfPharmaVigiIcon: this._reinfPharmaVigiIconSamV2(_.get(ampp, "amp", false)),
                    informations: this._getCommercialInformations(ampp, currentDmpp, currentReimbursement)
                }
        })
        .filter(it => _.get(it,"informations.hasAtLeastOneValidAmpp"))
        .value()
    }

    _getCurrentSupplyProblem(supplyProblems){
        const now = moment().valueOf()
        return supplyProblems && supplyProblems.find(prob => _.get(prob, 'from', null) < now && _.get(prob, 'to', null) ? _.get(prob, 'to', null) > now : true) || {}
    }

    _getCurrentCommercialization(commercializations){
        const now = moment().valueOf()
        return commercializations && commercializations.find(com => _.get(com, 'from', null) < now && _.get(com, 'to',  null) ? _.get(com, 'to',  null) > now : true) || {}
    }

    _getFinishedCommercializations(ampps){
       const now = moment().valueOf()
       return ampps && ampps.filter(a => _.get(a, 'commercializations', []).find(c => _.get(c, 'from', null) && (_.get(c, 'to', null) ? this.api.moment(_.clone(_.get(c, 'to', null))).add(12, 'month') > now : false))) || []
    }

    _hasAtLeastOneValidAmpp(ctiExtended, ampps){

        const now = +new Date()

        // Commercialization is still valid when expired less than two years ago (http://www.samportal.be/fr/sam_portal_news_messages/82)

        // Allow for no "to" value && "from" in the past
        // return _.some(ampps, ampp => _.find(_.get(ampp,"commercializations"), c => c && c.from && c.from <= now && c.to && moment(_.clone(c.to)).add(24, "month") >= now || !c.to && c.from && c.from <= now))

        // Allow for no "to" value && don't check on "from" in the past but must still be present
        return _.some(ampps.filter(ampp => _.get(ampp, 'ctiExtended', null) === ctiExtended), ampp => _.find(_.get(ampp,"commercializations"), c => c && c.from && c.to && moment(_.clone(c.to)).add(24, "month") >= now || !c.to && c.from))

        // Should not appear when no "commercialized_until" defined
        // return _.some(ampps, ampp => _.find(_.get(ampp,"commercializations"), c => c && c.from && c.to && c.from <= now && moment(_.clone(c.to)).add(24, "month") >= now))

        // Should not appear when no "to" defined - "from" could be in the future
        // return _.some(ampps, ampp => _.find(_.get(ampp,"commercializations"), c => c && c.from && c.to && moment(_.clone(c.to)).add(24, "month") >= now))

    }

    _getCurrentDmpp(dmpps){

        const now = moment().valueOf()

        // "from" defined and < now && either no "to" or "to" in the future
        return dmpps && dmpps.find(dmpp => _.get(dmpp, 'from', null) <= now && _.get(dmpp, 'to',  null) ? _.get(dmpp, 'to',  null) >= now : true) || {}

        // From && to must be defined
        // return dmpps && dmpps.find(dmpp => dmpp && dmpp.from && dmpp.to && dmpp.from <= now && dmpp.to >= now) || {}

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
                   code: _.get(vmpGroup, 'code', null),
                   label: _.get(vmpGroup, 'name.'+this.language, null),
                   vmpGroup:  vmpGroup,
                   informations:{
                       commercialization:{
                           from: _.get(vmpGroup, 'from', null),
                           to: _.get(vmpGroup, 'to', null)
                       },
                       patientPrice: '0.00',
                       publicPrice: '0.00'
                   },
                   type: 'substance'
                }
            })
    }

    _prepareOtcForDisplay(nmps){
        return _.get(nmps, 'rows', []).map(nmp => {
            return {
                id: _.get(nmp, 'id', null),
                label: _.get(nmp, 'name.'+this.language, null),
                productId: _.get(nmp, 'productId', null),
                code: _.get(nmp, 'code', null),
                distributor: _.get(nmp, 'distributor.'+this.language, null),
                producer: _.get(nmp, 'producer.'+this.language, null)
            }
        })
    }

    _filterValue(drugsFilter, listOfDrugs){

        const keywordsString = _.trim(drugsFilter).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, " ")
        const keywordsArray = _.compact(_.uniq(_.map(keywordsString.split(" "), _.trim)))

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

    _getAllergyType(allergies) {
         return _.size(allergies) ? allergies.some(allergy => _.get(allergy, 'type', null) === "allergy") ? "allergy" : allergies.some(allergy => _.get(allergy, 'type', null) === "adr") ? "adr" : null : null
    }

    _getPublicPrice(reimbursement, dmpp){
        return _.isEmpty(reimbursement) ?
            parseFloat(_.get(dmpp, 'price', 0.00)).toFixed(2) :
        _.get(reimbursement, 'referenceBasePrice', null) && _.get(reimbursement, 'copaymentSupplement', null) ?
            parseFloat(parseFloat(_.get(reimbursement, 'referenceBasePrice', 0.00)) + parseFloat(_.get(reimbursement, 'copaymentSupplement', 0.00))).toFixed(2) :
        parseFloat(_.get(reimbursement, 'reimbursementBasePrice', 0.00)).toFixed(2)
    }

    _getPatientPrice(reimbursement, dmpp){
        const insurability = _.get(_.get(this, 'patient', {}), 'insurabilities', []).find(ins => !_.get(ins, 'endDate', null) && _.get(ins, 'insuranceId', null) !== "")
        const patientBim = parseInt(_.get(insurability, 'parameters.tc1', null) % 2) === 1

        return _.isEmpty(reimbursement) ?
            parseFloat(_.get(dmpp, 'price', 0.00)).toFixed(2) :
        _.size(_.get(reimbursement, 'copayments', [])) === 2 ?
            patientBim ?
                parseFloat(_.get(reimbursement, 'copayments[0].feeAmount', 0.00)).toFixed(2) :
            parseFloat(_.get(reimbursement, 'copayments[1].feeAmount', 0.00)).toFixed(2) :
        parseFloat(0.00).toFixed(2)
    }

    _getPriceIndex(dmpp){
        return _.get(dmpp, 'cheapest', null) ? 0 : (_.get(dmpp, 'cheap', null) ? 1 : 2)
    }

    _selectedTabChanged(tabs){
        this.dispatchEvent(new CustomEvent('tab-changed', {
            bubbles: true,
            composed: true,
            detail: {
               tabNumber: _.get(this, 'tabs', 0),
               tabName: _.get(this, 'tabs', 0) === 0 ? 'chronic' : _.get(this, 'tabs', 0) === 1 ? 'history' : _.get(this, 'tabs', 0) === 2 ? 'commercial' : _.get(this, 'tabs', 0) === 3 ? 'substance' : _.get(this, 'tabs', 0) === 4 ? 'compound' : _.get(this, 'tabs', 0) === 5 ? 'otc' : null
            }
        }))
    }
}
customElements.define(HtPatPrescriptionDetailSearch.is, HtPatPrescriptionDetailSearch);
