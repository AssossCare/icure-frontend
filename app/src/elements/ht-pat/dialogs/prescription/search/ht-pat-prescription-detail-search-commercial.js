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
class HtPatPrescriptionDetailSearchCommercial extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
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
                height: 14px;
                width: 14px;
                cursor: pointer;
                color: white;
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
                height: 100px;
                width: 200px;
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
                    <div class="td fg05">[[localize('presc-sear-iv','IV',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-del','Del',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-cat','Cat',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-pat','Pat',language)]]</div>
                    <div class="td fg05">[[localize('presc-sear-pub','Pub',language)]]</div>
                </div>
                <template is="dom-repeat" items="[[searchResult.commercialName]]"as="group">
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
                        <div class="tr tr-item">
                            <div class="td fg01"><iron-icon class="addIcon" icon="icons:add" data-id$="[[drug.id]]" data-type="commercial" on-tap="_openPosologyView"></iron-icon></div>  
                            <div class="td fg01"><iron-icon class="addIcon" icon="icons:swap-horiz" data-id$="[[drug.id]]" on-tap="_searchCheaperDrugs" title="Alternative"></div>   
                            <div class="td fg2" data-id$="[[drug.id]]" data-type="commercial" on-tap="_openPosologyView">
                            [[drug.label]]
                            <template is="dom-if" if="[[_isNewDrug(drug)]]">
                                <span class="newDrug">[[localize('pos-new', 'New', language)]]</span>
                            </template>
                            <template is="dom-if" if="[[_isSupplyProblem(drug)]]">
                                <iron-icon icon="vaadin:truck" class="supplyIcon" id="supply_[[drug.id]]"></iron-icon>
                                <paper-tooltip for="supply_[[drug.id]]" position="right" animation-delay="0">
                                    <div>
                                        [[localize('', 'Temporarily unavailable', language)]]
                                    </div>
                                    <div>
                                        <div class="table">
                                             <div class="tr th">
                                                <div class="td fg05">[[localize('', 'From', language)]]</div>
                                                <div class="td fg05">[[_getStartOfUnavailability(drug)]]</div>
                                             </div>
                                             <div class="tr th">
                                                <div class="td fg05">[[localize('', 'Until', language)]]</div>
                                                <div class="td fg05">[[_getEndOfUnavailability(drug)]]</div>
                                             </div>
                                             <div class="tr th">
                                                <div class="td fg05">[[localize('', 'Reason', language)]]</div>
                                                <div class="td fg05">[[_getReasonOfUnavailability(drug)]]</div>
                                             </div>
                                        </div>
                                    </div>
                                </paper-tooltip>
                            </template>
                            </div>
                            <div class="td fg05">
                                <template is="dom-if" if="[[_hasIcon(drug)]]"><iron-icon class$="icon-code [[_getStyle('ATC', drug.atcCat)]]" icon="[[_getIcon(drug)]]"></iron-icon></template>
                                <template is="dom-if" if="[[_hasColor(drug)]]"><label class$="colour-code [[_getStyle('ATC', drug.atcCat, 'span')]]"><span></span></label></template>
                                <paper-tooltip class="tooltipSupply" z-index="1000" id="tt_[[drug.atcCat]]_[[drug.id]]" for="[[drug.atcCat]]_[[drug.id]]">[[_atcTooltip(drug.atcCat)]]</paper-tooltip>
                            </div>
                            <div class="td fg05">
                                <div class="icon-type-group">
                                    <iron-icon icon="medication-svg-icons:[[drug.compProhibIcon]]" class="table-icon"></iron-icon>
                                    <iron-icon icon="medication-svg-icons:[[drug.narcoticIcon]]" class="table-icon"></iron-icon>
                                    <iron-icon icon="medication-svg-icons:[[drug.reinfPharmaVigiIcon]]" class="table-icon"></iron-icon>                  
                                </div>
                            </div>
                            <div class="td fg05">[[drug.chapt4]]</div>
                            <div class="td fg05"></div>  
                            <div class="td fg05"><iron-icon icon="medication-svg-icons:[[drug.catIcon]]" class="table-icon"></iron-icon></div>
                            <div class="td fg05">[[drug.patientPrice]]</div>
                            <div class="td fg05">[[drug.publicPrice]]</div> 
                        </div>
                    </template>
                </template>
            </div>
        </template>                
`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-search-commercial';
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
            searchResult:{
                type: Object,
                value: () => {}
            },
            isLoading:{
                type: Boolean,
                value: false
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

        return !drugId || !dataType ? null : this.dispatchEvent(new CustomEvent('open-posology-view', {
            bubbles: true,
            composed: true,
            detail: {
                id: drugId,
                type: dataType,
                bypassPosologyView: false,
                product: _.flatten(_.get(this, 'searchResult.commercialName', [])).find(h => _.get(h, 'id', null) === drugId)
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
        return _.get(drug, 'informations.currentSupplyProblem.reason', null)
    }

    _getEndOfUnavailability(drug){
        return _.get(drug, 'informations.currentSupplyProblem.to', null)
    }
    _getStartOfUnavailability(drug){
        return _.get(drug, 'informations.currentSupplyProblem.from', null)
    }

    _searchCheaperDrugs(e){

        const drugId = _.trim(_.get(e, 'currentTarget.dataset.id'))
        const drug =  _.flatten(_.get(this, 'searchResult.commercialName', [])).find(h => _.get(h, 'id', null) === drugId)

        return !drugId ? null : this.dispatchEvent(new CustomEvent('search-cheaper-drugs', {
            bubbles: true,
            composed: true,
            detail: {
                id: _.get(drug, 'id', null),
                uuid: _.get(drug, 'uuid', null),
                groupId: _.get(drug, 'groupId', null),
                uuids: _.get(drug, 'uuids', []),
                drug: drug
            }
        }))

    }
}
customElements.define(HtPatPrescriptionDetailSearchCommercial.is, HtPatPrescriptionDetailSearchCommercial);
