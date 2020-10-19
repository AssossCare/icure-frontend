import '../../../../dynamic-form/dynamic-link.js';
import '../../../../dynamic-form/dynamic-pills.js';
import '../../../../ht-spinner/ht-spinner.js';
import '../../../../icons/medication-icons';
import '../../../../icons/icure-icons';
import '../../../../dynamic-form/dynamic-doc.js';
import '../../../../collapse-button/collapse-button.js';
import '../../../../../styles/dialog-style.js';
import '../../../../../styles/scrollbar-style.js';
import '../../../../../styles/paper-tabs-style';
import '../../../../../styles/shared-styles';
import '../../../../../styles/buttons-style';
import '../../../../../styles/atc-styles';

import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionDetailSearchCommercialResult extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles spinner-style">
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
                z-index: 1;             
            }
            
            .tr-tooltip{
                display: flex;
                height: 15px;              
                padding: 4px;   
                z-index: 1;        
            }
            
            .td-tooltip{
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
                font-size: 12px;
                text-overflow: ellipsis;
            }
            
            .tr-group{
                display: flex;
                height: 15px;            
                background-color:  var(--app-background-color-dark);   
                padding: 4px;
                font-weight: bold;   
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
               height: 12px;
               width: 12px;
               cursor: pointer;
               color: white;
               padding: 2px;
            }

            
             .atcIcon{
                height: 8px;
                width: 8px;
            }
            
            .icon-code {
                width: 12px;
                height: 12px;
                color: var(--app-primary-color-dark);
            }
            
            .colour-code span{
                content: '';
                display: inline-block;
                height: 8px;
                width: 8px;
                border-radius: 50%;
                vertical-align: middle;
                background-color: transparent;
                margin-left: 2px;
            }
            
            .table-icon {
                --iron-icon-height: 18px !important;
                --iron-icon-width: 18px !important;
                padding: 0px;
            }

            .small-table-icon {
                --iron-icon-height: 14px !important;
                --iron-icon-width: 14px !important;
                padding: 0px;
            }
            
            ht-spinner{
                height: 100px;
                width: 100px;
            }
            
            .newDrug{
                background-color: #FBFF85;
                border-radius: 4px;
                padding-left: 2px;
                padding-right: 2px;
                font-size: 10px;
                width: 40px;
                text-align: center;
                margin-left: 5px;
            }
            
            .supplyIcon{
                height: 14px;
                width: 14px;
                margin-left: 5px;
                color: red;
                margin-top: -3px;
                opacity: 1;
            }
            
            .supplyProb{
                opacity: 0.4;
            }
            
            .tooltipSupply{
                width: 300px;
                font-size: 12px;
            }
            
            .notRel{
                position: initial;
            }
            
            .fs12{
                font-size: 12px;
            }
            
            .cheapestDrug{
                background-color: #dfffdf;
            }
            
            .deletedDrug{
                color: red;
            }
            
            .deletedIcon{
                height: 14px;
                width: 14px;
                margin-left: 5px;
                color: red;
                margin-top: -3px;
                opacity: 1;
            }
      
        </style>
        
        <template is="dom-if" if="[[isLoading]]" restamp="true">
            <ht-spinner active="[[isLoading]]"></ht-spinner>
        </template>
        <template is="dom-if" if="[[!isLoading]]" restamp="true">
            <div class="table">
                <div class="tr th">                 
                    <div class="td fg01"></div> 
                    <div class="td fg01"></div>    
                    <div class="td fg2">[[localize('presc-sear-name','Name',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-atc','ATC',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-type','Type',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-remb','Remb',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-del','Del',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-cat','Cat',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-pat','Pat',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-pub','Pub',language)]]</div>
                </div>
                <template is="dom-repeat" items="[[searchResult]]"as="group">
                    <div class="tr-group">             
                        <div class="td fg01"></div> 
                        <div class="td fg01"></div>    
                        <div class="td fg2">[[_getCategoryName(group)]]</div>
                        <div class="td fg05"></div>
                        <div class="td fg05"></div>
                        <div class="td fg05"></div>
                        <div class="td fg05"></div>
                        <div class="td fg05"></div>
                        <div class="td fg05"></div>
                        <div class="td fg05"></div>
                    </div>
                    <template is="dom-repeat" items="[[group]]" as="drug">
                        <div class$="tr tr-item [[_isCheapestDrugLine(drug)]]">
                            <div class="td fg01 notRel">
                                <iron-icon class="addIcon" id="add_[[drug.id]]" icon="icons:add" data-id$="[[drug.id]]" data-internaluuid$="[[drug.internalUuid]]" data-type="commercial" on-tap="_openPosologyView"></iron-icon>
                                <paper-tooltip for="add_[[drug.id]]" position="right" animation-delay="0">[[localize('presc-add-drug', 'Add drug', language)]]</paper-tooltip>
                            </div>  
                            <div class="td fg01 notRel">
                                <template is="dom-if" if="[[_isAvailableCheaperDrugsSearch(origin)]]">
                                    <iron-icon class="addIcon" id="alt_[[drug.id]]" icon="icons:swap-horiz" data-id$="[[drug.id]]" data-internaluuid$="[[drug.internalUuid]]" on-tap="_searchCheaperDrugs"></iron-icon>
                                    <paper-tooltip for="alt_[[drug.id]]" position="left" animation-delay="0">[[localize('presc-sear-cheaper-alt', 'Search cheaper alternative', language)]]</paper-tooltip>
                                </template>
                            </div>   
                            <div class="td fg2 notRel" data-id$="[[drug.id]]" data-internaluuid$="[[drug.internalUuid]]" data-type="commercial" on-tap="_openPosologyView">
                                [[drug.label]]
                                <template is="dom-if" if="[[_isNewDrug(drug)]]">
                                    <span class="newDrug">[[localize('presc-new', 'New', language)]]</span>
                                </template>
                                <template is="dom-if" if="[[_isSupplyProblem(drug)]]">
                                    <iron-icon icon="vaadin:truck" class="supplyIcon" id="supply_[[drug.id]]"></iron-icon>   
                                    <paper-tooltip class="tooltipSupply" for="supply_[[drug.id]]" position="right" animation-delay="0">
                                        <div class="fs12">
                                            <iron-icon icon="vaadin:truck" class="supplyIcon"></iron-icon>&nbsp;&nbsp;
                                            [[localize('presc-sup-prob-una', 'Temporarily unavailable', language)]]
                                        </div>
                                        <div>
                                            <div class="table">
                                                 <div class="tr-tooltip">
                                                    <div class="td-tooltip fg05">[[localize('presc-sup-prob-from', 'From', language)]]: </div>
                                                    <div class="td-tooltip fg1">[[_getStartOfUnavailability(drug)]]</div>
                                                 </div>
                                                 <div class="tr-tooltip">
                                                    <div class="td-tooltip fg05">[[localize('presc-sup-prob-until', 'Until', language)]]: </div>
                                                    <div class="td-tooltip fg1">[[_getEndOfUnavailability(drug)]]</div>
                                                 </div>
                                                 <div class="tr-tooltip">
                                                    <div class="td-tooltip fg05">[[localize('presc-sup-prob-reason', 'Reason', language)]]: </div>
                                                    <div class="td-tooltip fg1">[[_getReasonOfUnavailability(drug)]]</div>
                                                 </div>
                                            </div>
                                        </div>
                                    </paper-tooltip>                  
                                </template>
                            </div>
                            <div class="td fg05 notRel">
                                <template is="dom-if" if="[[_hasIcon(drug)]]"><iron-icon class$="icon-code [[_getStyle('ATC', drug.atcCat)]]" icon="[[_getIcon(drug)]] id="tt_[[drug.atcCat]]_[[drug.id]]"></iron-icon></template>
                                <template is="dom-if" if="[[_hasColor(drug)]]">
                                    <label class$="colour-code [[_getStyle('ATC', drug.atcCat, 'span')]]" id="tt_[[drug.atcCat]]_[[drug.id]]" ><span></span></label>
                                    <paper-tooltip for="tt_[[drug.atcCat]]_[[drug.id]]" position="right" animation-delay="0">[[_atcTooltip(drug.atcCat)]]</paper-tooltip>
                                </template>
                            </div>
                            <div class="td fg05 notRel">
                                <div class="icon-type-group">
                                    <!--<template is="dom-if" if="[[]]"><iron-icon icon="medication-svg-icons:[[drug.compProhibIcon]]" class="table-icon"></iron-icon></template>-->
                                    <template is="dom-if" if="[[_isDoping(drug)]]"><iron-icon icon="medication-svg-icons:[[_getDopingIcon(drug)]]" id="doping_[[drug.id]]" class="table-icon"</iron-icon></template>
                                    <!--<template is="dom-if" if="[[]]"><iron-icon icon="medication-svg-icons:[[drug.reinfPharmaVigiIcon]]" class="table-icon"></iron-icon></template>-->
                                    <template is="dom-if" if="[[_isBlackTriangle(drug)]]"><iron-icon icon="medication-svg-icons:[[_getBlackTriangleIcon(drug)]]" id="bt_[[drug.id]]" class="table-icon"></iron-icon></template>                                                
                                    <template is="dom-if" if="[[_isRma(drug)]]"><iron-icon icon="medication-svg-icons:[[_getRmaIcon(drug)]]" id="rma_[[drug.id]]" class="table-icon"></iron-icon></template>                                                
                                </div>
                                <!--<template is="dom-if" if="[[]]"><paper-tooltip for="bt_[[drug.id]]" position="right" animation-delay="0">[[localize('presc-prohib', 'Prohibited drug', language)]]</paper-tooltip> </template>-->
                                <!--<template is="dom-if" if="[[]]"><paper-tooltip for="bt_[[drug.id]]" position="right" animation-delay="0">[[localize('presc-rein', 'Renal failure', language)]]</paper-tooltip> </template>-->
                                <template is="dom-if" if="[[_isDoping(drug)]]"><paper-tooltip for="doping_[[drug.id]]" position="right" animation-delay="0">[[localize('presc-narco', 'Doping', language)]]</paper-tooltip></template>
                                <template is="dom-if" if="[[_isBlackTriangle(drug)]]"><paper-tooltip for="bt_[[drug.id]]" position="right" animation-delay="0">[[localize('presc-new-act-ing', 'New active ingredient', language)]]</paper-tooltip></template>
                                <template is="dom-if" if="[[_isRma(drug)]]"><paper-tooltip for="rma_[[drug.id]]" position="right" animation-delay="0">[[localize('presc-new-rma', 'Risk Minimisation Activities', language)]]</paper-tooltip></template>
                            </div>
                            <div class="td fg05 notRel">
                                <span id="reimbCateg_[[drug.id]]">[[_getCategOfReimbursement(drug)]]</span>
                                <paper-tooltip for="reimbCateg_[[drug.id]]" position="right" animation-delay="0">[[_getDescriptionOfCategForReimbursement(drug)]]</paper-tooltip>
                            </div>
                            <div class="td fg05"></div>  
                            <div class="td fg05"><iron-icon icon="medication-svg-icons:[[_isCheapestDrug(drug)]]" class="table-icon"></iron-icon></div>
                            <div class="td fg05">[[drug.informations.patientPrice]] €</div>
                            <div class="td fg05">[[drug.informations.publicPrice]] €</div> 
                        </div>
                        <template is="dom-if" if="[[_isFinishedCommercializations(drug)]]">
                            <template is="dom-repeat" items="[[drug.informations.amppFinished]]" as="amppFinished">
                                <div class="tr deletedDrug">
                                    <div class="td fg01"></div>  
                                    <div class="td fg01">
                                        <template is="dom-if" if="[[_hasGroupId(amppFinished.id)]]">
                                            <iron-icon class="addIcon" id="alt_[[amppFinished.id]]_[[drug.id]]" icon="icons:swap-horiz" data-id$="[[amppFinished.id]]" on-tap="_searchAlternative"></iron-icon>
                                            <paper-tooltip for="alt_[[amppFinished.id]]_[[drug.id]]" position="left" animation-delay="0">[[localize('presc-sear-cheaper-alt', 'Search cheaper alternative', language)]]</paper-tooltip>
                                        </template>
                                    </div>   
                                    <div class="td fg2 notRel" data-id$="[[amppFinished.id]]" data-type="commercial">
                                        [[_getAmppFinishedName(amppFinished)]]
                                        <iron-icon icon="medication-svg-icons:deletedDrug" id="deleted_[[amppFinished.id]]_[[drug.id]]" class="deletedIcon"></iron-icon>
                                        <paper-tooltip class="tooltipSupply" for="deleted_[[amppFinished.id]]_[[drug.id]]" position="right" animation-delay="0">
                                            <div class="fs12">
                                                <iron-icon icon="medication-svg-icons:deletedDrug" class="deletedIcon"></iron-icon>&nbsp;&nbsp;
                                                [[localize('presc-rec-del', 'Recent deletion', language)]]
                                            </div>
                                            <div>
                                                <div class="table">
                                                     <div class="tr-tooltip">
                                                        <div class="td-tooltip fg05">[[localize('presc-del-from', 'From', language)]]: </div>
                                                        <div class="td-tooltip fg1">[[_getStartOfCommercialization(amppFinished.commercializations)]]</div>
                                                     </div>
                                                     <div class="tr-tooltip">
                                                        <div class="td-tooltip fg05">[[localize('presc-del-until', 'Until', language)]]: </div>
                                                        <div class="td-tooltip fg1">[[_getEndOfCommercialization(amppFinished.commercializations)]]</div>
                                                     </div>
                                                     <div class="tr-tooltip">
                                                        <div class="td-tooltip fg05">[[localize('presc-del-reason', 'Reason', language)]]: </div>
                                                        <div class="td-tooltip fg1">[[_getReasonOfEndOfCommercialization(amppFinished.commercializations)]]</div>
                                                     </div>
                                                </div>
                                            </div>
                                        </paper-tooltip>   
                                    </div>
                                    <div class="td fg05 notRel">
                                        
                                    </div>
                                    <div class="td fg05 notRel">
                                        <div class="icon-type-group">
                                                                                 
                                        </div>
                                    </div>
                                    <div class="td fg05"></div>
                                    <div class="td fg05"></div>  
                                    <div class="td fg05"></div>
                                    <div class="td fg05"></div>
                                    <div class="td fg05"></div> 
                                </div>
                            </template>
                        </template>
                    </template>
                </template>
            </div>
        </template>                
`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-search-commercial-result';
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
            searchResult: {
                type: Array,
                value: () => []
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            samVersion:{
                type: Object,
                value: () => {}
            },
            origin:{
                type: String,
                value: null
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }

    _openPosologyView(e){

        const drugId = _.trim(_.get(e, 'currentTarget.dataset.id'))
        const dataType = _.trim(_.get(e, 'currentTarget.dataset.type'))
        const internalUuid = _.trim(_.get(e, 'currentTarget.dataset.internaluuid'))

        return !drugId || !dataType || !internalUuid ? null : this.dispatchEvent(new CustomEvent('open-posology-view', {
            bubbles: true,
            composed: true,
            detail: {
                id: drugId,
                internalUuid: internalUuid,
                type: dataType,
                bypassPosologyView: false,
                product: _
                    .chain(this)
                    .get("searchResult")
                    .flatten()
                    .find(it => _.trim(_.get(it,"internalUuid","")) === internalUuid)
                    .value()
            }
        }))
    }

    _getCategoryName(categ){
        return _.get(_.head(categ), 'officialName', null)
    }

    _formatDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }
    _getAtcColor(cat){
        return cat ? "ATC--"+_.toUpper(cat) : null
    }

    _getIcon(item) {
        return item.allergyType === "allergy" ? "image:filter-vintage" : (item.allergyType === "adr" ? "vaadin:pill" : "");
    }

    _getStyle(prefix, cat, el = "span") {
        return cat ? prefix + '--' + cat.toUpperCase() + (el ? (' ' + el) : '') : null
    }

    _hasIcon(item) {
        return !!item.allergyType
    }

    _hasColor(item) {
        return !item.allergyType
    }

    _atcTooltip(cat) {
        return cat ? this.localize('atc-' + cat, '') : null
    }

    _isNewDrug(drug){
        const now = moment().valueOf()
        const warningEndDate =  _.get(drug, 'informations.currentCommercialization.from', null) ? this.api.moment(_.get(drug, 'informations.currentCommercialization.from', null)).add(3, 'month').valueOf() : null
        return warningEndDate > now
    }

    _isSupplyProblem(drug){
        return !_.isEmpty(_.get(drug, 'informations.currentSupplyProblem', {}))
    }

    _isSupplyProblemLine(drug){
        return !_.isEmpty(_.get(drug, 'informations.currentSupplyProblem', {})) ? 'supplyProb' : null
    }

    _getReasonOfUnavailability(drug){
        return _.get(drug, "informations.currentSupplyProblem.reason."+this.language, null)
    }

    _getEndOfUnavailability(drug){
        return _.get(drug, 'informations.currentSupplyProblem.expectedEndOn', null) ? this.api.moment(_.get(drug, 'informations.currentSupplyProblem.expectedEndOn', null)).format('DD/MM/YYYY') : null
    }

    _getStartOfUnavailability(drug){
        return _.get(drug, 'informations.currentSupplyProblem.from', null) ? this.api.moment(_.get(drug, 'informations.currentSupplyProblem.from', null)).format('DD/MM/YYYY') : null
    }

    _isCheapestDrugLine(drug){
        return _.get(drug, 'informations.dmpp.cheap', false) ? 'cheapestDrug' : ''
    }

    _isCheapestDrug(drug){
        return _.get(drug, 'informations.dmpp.cheap', false) ? 'cat-cheap-noacm' : 'cat-notcheap-noacm'
    }

    _getDopingIcon(drug){
        return _.get(drug, 'informations.speciallyRegulated', null) !== 0 && _.get(drug, 'informations.speciallyRegulated', null) !== null ? 'cat-doping-prod' : ''
    }

    _getBlackTriangleIcon(drug){
        return _.get(drug, 'informations.blackTriangle', false) ? 'blackTriangle' : ''
    }

    _isDoping(drug){
        return _.get(drug, 'informations.speciallyRegulated', null) !== 0 && _.get(drug, 'informations.speciallyRegulated', null) !== null
    }

    _isBlackTriangle(drug){
        return _.get(drug, 'informations.blackTriangle', false)
    }

    _isRma(drug){
        return _.get(drug, 'informations.rma', false)
    }

    _getRmaIcon(drug){
        return _.get(drug, 'informations.blackTriangle', false) ? 'rma-pharma-vigi' : ''
    }

    _searchCheaperDrugs(e){

        const drugId = _.trim(_.get(e, 'currentTarget.dataset.id'))
        const internalUuid = _.trim(_.get(e, 'currentTarget.dataset.internaluuid'))

        const drug =  _
            .chain(this)
            .get("searchResult")
            .flatten()
            .find(it => _.trim(_.get(it,"internalUuid","")) === internalUuid)
            .value()

        return internalUuid && drug && this.launchCheaperAlternativeEvent(drug)

    }

    _searchAlternative(e){
        const drugId = _.trim(_.get(e, 'currentTarget.dataset.id'))
        const drug =  _.flatten(_.get(this, 'searchResult', [])).find(drug => _.get(drug, 'amp.ampps', []).find(ampp => _.get(ampp, 'id', null) === drugId))
        const amp = _.get(drug, 'amp.ampps', []).find(ampp => _.get(ampp, 'id', null) === drugId)

        return this.launchCheaperAlternativeEvent(amp)
    }

    _hasGroupId(id){
        const drug =  _.flatten(_.get(this, 'searchResult', [])).find(drug => _.get(drug, 'amp.ampps', []).find(ampp => _.get(ampp, 'id', null) === id))
        const amp = _.get(drug, 'amp.ampps', []).find(ampp => _.get(ampp, 'id', null) === id)

        return !!_.get(amp,"groupId",false)
    }

    launchCheaperAlternativeEvent(drug){
        return !_.get(drug,"id",false) ? null : this.dispatchEvent(new CustomEvent('search-cheaper-drugs', {
            bubbles: true,
            composed: true,
            detail: {
                id: _.get(drug, 'id', null),
                internalUuid: _.trim(_.get(it,"internalUuid","")),
                uuid: _.get(drug, 'uuid', null),
                groupId: _.get(drug, 'groupId', null),
                uuids: _.get(drug, 'uuids', []),
                drug: drug
            }
        }))
    }

    _isFinishedCommercializations(drug){
        return !!_.size(_.get(drug, 'informations.amppFinished', []))
    }

    _getReasonOfEndOfCommercialization(commercializations){
        const now = moment().valueOf()
        const com = commercializations && commercializations.find(c => _.get(c, 'from', null) && (_.get(c, 'to', null) ? this.api.moment(_.get(c, 'to', null)).add(12, 'month') > now : false))
        return _.get(com, 'reason.'+this.language , null)
    }

    _getEndOfCommercialization(commercializations){
        const now = moment().valueOf()
        const com = commercializations && commercializations.find(c => _.get(c, 'from', null) && (_.get(c, 'to', null) ? this.api.moment(_.get(c, 'to', null)).add(12, 'month') > now : false))
        return _.get(com, 'to', null) ? this.api.moment(_.get(com, 'to', null)).format('DD/MM/YYYY') : null
    }

    _getStartOfCommercialization(commercializations){
        const now = moment().valueOf()
        const com = commercializations && commercializations.find(c => _.get(c, 'from', null) && (_.get(c, 'to', null) ? this.api.moment(_.get(c, 'to', null)).add(12, 'month') > now : false))
        return _.get(com, 'from', null) ? this.api.moment(_.get(com, 'from', null)).format('DD/MM/YYYY') : null
    }

    _getAmppFinishedName(drug){
        return _.get(drug, 'amp.name.'+this.language, null)+' '+(_.get(drug, 'packDisplayValue', null) ? _.get(drug, 'packDisplayValue', null)+'x' : null)+' ('+this.localize('presc-not-available', 'not available from', this.language)+' '+this._getEndOfCommercialization(_.get(drug, 'commercializations', []))+')'
    }

    _getCategOfReimbursement(drug){
        return _.get(drug, 'informations.currentReimbursement.reimbursementCriterion.category', null)
    }

    _getDescriptionOfCategForReimbursement(drug){
        return _.get(drug, 'informations.currentReimbursement.reimbursementCriterion.description.'+this.language, null)
    }

    _isAvailableCheaperDrugsSearch(origin){
        return origin && origin === "commercialSearch"
    }
}
customElements.define(HtPatPrescriptionDetailSearchCommercialResult.is, HtPatPrescriptionDetailSearchCommercialResult);
