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


import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionDetailCommercialBySubstance extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
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
            
            .cheaper-drugs-container{
                height: calc(100% - 20px);
                width: auto;
                border: 1px solid var(--app-background-color-dark);
                margin: 5px;
            }
            
            .cheaper-drugs-title{
                height: 30px;
                padding: 5px;
                background: var(--app-background-color-dark);
                box-sizing: border-box;
            }
            
            .cheaper-drugs-container-content{
                height: calc(100% - 30px);
            }
            
            .no-alternative{
                font-size: 20px;
                padding: 40px;
                margin: auto;
                height: 100px;
                width: auto;
                text-align: center;
            }
            
            .bold{
                font-weight: bold;
            }
            
            .btn-close{
                float: right;
                margin-top: -4px;
                margin-right: -4px;
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

        </style>
        
         <div class="cheaper-drugs-container">
            <div class="cheaper-drugs-title">
                <span class="bold">[[localize('presc-com--sub', 'Commercial drugs with substance', language)]]: </span> [[selectedMoleculeForAmps.label]]
                <paper-icon-button id="" class="button button--other btn-close" icon="icons:close" on-tap="_closeCommercialBySubstanceView"></paper-icon-button>
            </div>
            <div class="cheaper-drugs-container-content">
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
                        <template is="dom-repeat" items="[[ampsByVmpGroupList]]"as="group">
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
                                    <div class="td fg01"><iron-icon class="addIcon" icon="icons:add" data-id$="[[drug.id]]" data-type="commercial" on-tap="_openPosologyView"></iron-icon></div>  
                                    <div class="td fg01"><iron-icon class="addIcon" icon="icons:swap-horiz" data-id$="[[drug.id]]" on-tap="_searchCheaperDrugs" title="Alternative"></div>   
                                    <div class="td fg2 notRel" data-id$="[[drug.id]]" data-type="commercial" on-tap="_openPosologyView">
                                    [[drug.label]]
                                    <template is="dom-if" if="[[_isNewDrug(drug)]]">
                                        <span class="newDrug">[[localize('presc-new', 'New', language)]]</span>
                                    </template>
                                    <template is="dom-if" if="[[_isSupplyProblem(drug)]]">
                                        <iron-icon icon="vaadin:truck" class="supplyIcon" id="supply_[[drug.id]]"></iron-icon>   
                                        <paper-tooltip class="tooltipSupply" for="supply_[[drug.id]]" position="right" animation-delay="0">
                                            <div class="fs12">
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
                                        <template is="dom-if" if="[[_hasColor(drug)]]"><label class$="colour-code [[_getStyle('ATC', drug.atcCat, 'span')]]" id="tt_[[drug.atcCat]]_[[drug.id]]" ><span></span></label></template>
                                        <paper-tooltip for="tt_[[drug.atcCat]]_[[drug.id]]" position="right" animation-delay="0">[[_atcTooltip(drug.atcCat)]]</paper-tooltip>
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
                                            <div class="td fg01"></iron-icon></div>  
                                            <div class="td fg01"></div>   
                                            <div class="td fg2 notRel" data-id$="[[amppFinished.id]]" data-type="commercial">
                                                [[_getAmppFinishedName(amppFinished)]]
                                                <iron-icon icon="medication-svg-icons:deletedDrug" id="deleted_[[amppFinished.id]]" class="deletedIcon"</iron-icon>
                                                <paper-tooltip class="tooltipSupply" for="deleted_[[amppFinished.id]]" position="right" animation-delay="0">
                                                    <div class="fs12">
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
            </div>
         </div>
                    
`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-commercial-by-substance';
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
            isLoading:{
                type: Boolean,
                value: false
            },
            ampsByVmpGroupList: {
                type: Array,
                value: () => []
            },
            selectedMoleculeForAmps:{
                type: Object,
                value: () => {}
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
        if(_.get(e, 'currentTarget.id', null) && _.get(e, 'currentTarget.dataset.type', null)){
            this.dispatchEvent(new CustomEvent('open-posology-view', {
                bubbles: true,
                composed: true,
                detail: {
                    id: _.get(e, 'currentTarget.id', null),
                    product: _.get(this, 'cheaperDrugsList', []).find(cn => _.get(cn, 'id',  null) === _.get(e, 'currentTarget.id', null)),
                    type: _.get(e, 'currentTarget.dataset.type', null),
                    bypassPosologyView: false
                }
            }))
        }
    }

    _closeCommercialBySubstanceView(){
        this.dispatchEvent(new CustomEvent('close-commercial-by-substance-view', {
            bubbles: true,
            composed: true
        }))
    }
}
customElements.define(HtPatPrescriptionDetailCommercialBySubstance.is, HtPatPrescriptionDetailCommercialBySubstance);
