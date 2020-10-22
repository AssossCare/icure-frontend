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
class HtPatPrescriptionDetailCnkInfo extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles spinner-style">
            .cnk-info-container{
                height: calc(100% - 20px);
                width: auto;
                border: 1px solid var(--app-background-color-dark);
                margin: 5px;
            }
            
            .cnk-info-title{
                height: 30px;
                padding: 5px;
                background: var(--app-background-color-dark);
                box-sizing: border-box;
            }
            
            .cnk-info-container-title{
                height: 22px;
                width: auto;
                padding: 2px;
                background: var(--app-background-color-dark);
                box-sizing: border-box;
            }
            
            .cnk-info-container-content{
               height: calc(100% - 30px);
            }
            
            .btn-close{
               float: right;
               margin-top: -4px;
               margin-right: -4px;
            }
            
            .bold{
                font-weight: bold;
            }
            
            .cnk-info-reimbursement-container{
                height: 100px;
                width: auto;
                border: 1px solid var(--app-background-color-dark);
                margin: 5px;
            }
            
            .cnk-info-delivery-container{
                height: 115px;
                width: auto;
                border: 1px solid var(--app-background-color-dark);
                margin: 5px;
            }
            
            .cnk-info-commercialisation-container{
                height: 100px;
                width: auto;
                border: 1px solid var(--app-background-color-dark);
                margin: 5px;
            }
            
            .cnk-info-drug-container{
                height: 115px;
                width: auto;
                border: 1px solid var(--app-background-color-dark);
                margin: 5px;
            }
            
            .bold{
                font-weight: bold;
            }
            
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
            
            .warningColor{
                color: var(--paper-red-500);
            }
            
            .warningIcon{
                height: 14px;
                width: 14px;
                padding: 4px;
            }
            
        </style>
        
         <div class="cnk-info-container">
            <div class="cnk-info-title">
                <span class="bold">[[localize('presc-cnk-info', 'Informations about', language)]]: </span> [[selectedCnkForInformation.label]]
                <paper-icon-button id="" class="button button--other btn-close" icon="icons:close" on-tap="_closeCnkInfoView"></paper-icon-button>
            </div>
            <div class="cnk-info-container-content">
                <div class="cnk-info-drug-container">
                    <div class="cnk-info-container-title">
                        [[localize('', 'Médicament', language)]]
                    </div>
                    <div class="cnk-info-drug-container-content">
                        <div class="table">
                             <div class="tr">
                                <div class="td fg1 bold">[[localize('','Nom',language)]]</div>    
                                <div class="td fg1">[[selectedCnkForInformation.label]]</div>
                             </div>
                             <template is="dom-if" if="[[!_isDCI(selectedCnkForInformation)]]">
                                 <div class="tr">
                                    <div class="td fg1 bold">[[localize('','Vmp',language)]]</div>    
                                    <div class="td fg1">[[_getVmp(selectedCnkForInformation)]]</div>
                                    <div class="td fg1 bold">[[localize('','Vmp group',language)]]</div>
                                    <div class="td fg1">[[_getVmpGroup(selectedCnkForInformation)]]</div>   
                                 </div>
                             </template>
                             <template is="dom-if" if="[[_isDCI(selectedCnkForInformation)]]">
                                 <div class="tr">
                                     <div class="td fg1 bold">[[localize('','Nom du groupe vmp',language)]]</div>
                                    <div class="td fg1">[[_getVmpGroup(selectedCnkForInformation)]]</div> 
                                    <div class="td fg1 bold">[[localize('','Code du groupe vmp',language)]]</div>
                                    <div class="td fg1">[[_getVmpGroupCode(selectedCnkForInformation)]]</div> 
                                 </div>
                                 <div class="tr">
                                    <div class="td fg1 bold">[[localize('','Status du groupe vmp',language)]]</div>
                                    <div class="td fg1">[[_getVmpGroupStatusCode(selectedCnkForInformation)]] </div>
                                    <div class="td fg1 bold">[[localize('','Description',language)]]</div>
                                    <div class="td fg1">[[_getVmpGroupStatusDescription(selectedCnkForInformation)]] </div>
                                 </div>
                             </template>
                             <template is="dom-if" if="[[_isWadaSpecification(selectedCnkForInformation)]]">
                                 <div class="tr">
                                    <div class="td fg1 warningColor">
                                        <iron-icon icon='vaadin:warning' class="warningIcon"></iron-icon> [[_isNarcotic(selectedCnkForInformation)]]
                                    </div>
                                 </div>
                             </template>
                        </div>
                    </div>
                </div>
                <div class="cnk-info-commercialisation-container">
                    <div class="cnk-info-container-title">
                        [[localize('', 'Commercialisation', language)]]
                    </div>
                    <div class="cnk-info-commercialisation-container-content">
                        <div class="table">
                            <div class="tr">
                                <div class="td fg1 bold">[[localize('','Début de la commercialisation',language)]]</div>    
                                <div class="td fg1">[[_getStartDateOfCommercialization(selectedCnkForInformation)]]</div>
                                <div class="td fg1 bold">[[localize('','Fin de la commercialisation',language)]]</div>
                                <div class="td fg1">[[_getEndDateOfCommercialization(selectedCnkForInformation)]]</div>
                             </div>
                             <div class="tr">
                                <div class="td fg1 bold">[[localize('','Début prescriptibilité',language)]]</div>    
                                <div class="td fg1">[[_getStartDateOfPrescribing(selectedCnkForInformation)]]</div>
                                <div class="td fg1 bold">[[localize('','Fin de prescriptibilité',language)]]</div>
                                <div class="td fg1">[[_getEndDateOfPrescribing(selectedCnkForInformation)]]</div>
                             </div>
                        </div>
                    </div>
                </div>
                <div class="cnk-info-delivery-container heightUnset">
                    <div class="cnk-info-container-title">
                        [[localize('', 'Délivrance', language)]]
                    </div>
                    <div class="cnk-info-delivery-container-content">
                        <div class="table">
                            <div class="tr">
                                <div class="td fg1 bold">[[localize('','Mode de délivrance',language)]]</div>    
                                <div class="td fg1">[[_getDeliveryModus(selectedCnkForInformation)]]</div>
                                <div class="td fg1 bold">[[localize('','Condition de prescription',language)]]</div>    
                                <div class="td fg1">[[_getDeliveryModusSpecification(selectedCnkForInformation)]]</div>
                             </div>
                        </div>
                        <template is="dom-repeat" items="[[_getWadaSpecification(selectedCnkForInformation)]]" as="wada">
                            <div class="table">
                                 <div class="tr heightUnset">
                                    <div class="td fg1 overflowUnset whiteSpaceUnset">[[_getWadaName(wada)]]</div>
                                 </div>
                                 <div class="tr heightUnset">
                                    <div class="td fg1 overflowUnset whiteSpaceUnset">[[_getWadaDescr(wada)]]</div>
                                 </div>
                            </div>
                        </template>
                    </div>
                </div>
                <div class="cnk-info-reimbursement-container">
                   <div class="cnk-info-container-title">
                        [[localize('', 'Remboursement', language)]]
                    </div>
                    <div class="cnk-info-reimbursement-container-content">
                        <div class="table">
                            <div class="tr">
                                <div class="td fg1 bold">[[localize('','Catégorie',language)]]</div>    
                                <div class="td fg1">[[_getReimbursementName(selectedCnkForInformation)]]</div>
                                <div class="td fg1 bold">[[localize('','Description',language)]]</div>    
                                <div class="td fg1">[[_getReimbursementDescription(selectedCnkForInformation)]]</div>
                             </div>
                             <div class="tr">
                                <div class="td fg1 bold">[[localize('','Chapitre',language)]]</div>    
                                <div class="td fg1"></div>
                                <div class="td fg1 bold">[[localize('','Interventions',language)]]</div>    
                                <div class="td fg1"></div>
                             </div>
                        </div>
                    </div>
                </div>
            </div>
         </div>
                    
`;

    }

    static get is() {
        return 'ht-pat-prescription-detail-cnk-info';
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
            selectedCnkForInformation:{
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

    _closeCnkInfoView(){
        this.dispatchEvent(new CustomEvent('close-cnk-info-view', {
            bubbles: true,
            composed: true
        }))
    }

    _getVmpGroup(drug){
        return this._isDCI(drug) ? _.get(drug,"vmpGroup.name."+this.language,"-") : _.get(drug, 'informations.vmpGroupName', "-")
    }

    _getVmpGroupCode(drug){
        return _.get(drug,"vmpGroup.code","-")
    }

    _getVmp(drug){
        return _.get(drug, 'informations.vmpName', null)
    }

    _getDeliveryModus(drug){
        return _.get(_.get(drug, 'amp.ampps', []).find(ampp => _.get(ampp, 'id', null) === _.get(drug, 'id', '')), 'deliveryModus.'+this.language , null)
    }

    _getDeliveryModusSpecification(drug){
        return _.get(_.get(drug, 'amp.ampps', []).find(ampp => _.get(ampp, 'id', null) === _.get(drug, 'id', '')), 'deliveryModusSpecification.'+this.language , null)
    }

    _getStartDateOfCommercialization(drug){
        return _.get(drug, 'informations.currentCommercialization.from', null) ? this.api.moment(_.get(drug, 'informations.currentCommercialization.from', null)).format('DD/MM/YYYY') : "-"
    }

    _getEndDateOfCommercialization(drug){
        return  _.get(drug, 'informations.currentCommercialization.to', null) ? this.api.moment(_.get(drug, 'informations.currentCommercialization.to', null)).format('DD/MM/YYYY') : "-"
    }

    _getWadaSpecification(drug){
        const now = moment().valueOf()
        const currentVmp = _.get(drug, 'vmps', []).find(vmp => _.get(vmp, 'from', null) < now && _.get(vmp, 'to', null) ? _.get(vmp, 'to', null) > now : true)
        return _.get(currentVmp, 'wadas', [])
    }

    _isNarcotic(drug){
        const now = moment().valueOf()
        const currentVmp = _.get(drug, 'vmps', []).find(vmp => _.get(vmp, 'from', null) < now && _.get(vmp, 'to', null) ? _.get(vmp, 'to', null) > now : true)
        return _.get(_.head(_.get(currentVmp, 'wadas', [])), 'name.'+this.language, null)
    }

    _isWadaSpecification(drug){
        const now = moment().valueOf()
        const currentVmp = _.get(drug, 'vmps', []).find(vmp => _.get(vmp, 'from', null) < now && _.get(vmp, 'to', null) ? _.get(vmp, 'to', null) > now : true)
        return _.size(_.get(currentVmp, 'wadas', [])) > 0
    }

    _getWadaName(wada){
        return _.get(wada, 'name.'+this.language, null)
    }

    _getWadaDescr(wada){
        return _.get(wada, 'description.'+this.language, null)
    }

    _getStartDateOfPrescribing(drug){
        return _.get(drug, 'informations.ampp.from', null) ? this.api.moment(_.get(drug, 'informations.ampp.from', null)).format('DD/MM/YYYY') : "-"
    }

    _getEndDateOfPrescribing(drug){
        return _.get(drug, 'informations.ampp.to', null) ? this.api.moment(_.get(drug, 'informations.ampp.to', null)).format('DD/MM/YYYY') : "-"
    }

    _getReimbursementName(drug){
        return _.get(drug, 'informations.currentReimbursement.reimbursementCriterion.category', "-")
    }

    _getReimbursementDescription(drug){
        return _.get(drug, 'informations.currentReimbursement.reimbursementCriterion.description.'+this.language, "-")
    }

    _isDCI(drug){
        return _.get(drug,"type","")==="substance"
    }

    _getVmpGroupStatusCode(drug){
        return _.get(drug,"vmpGroup.noSwitchReason.code","-")
    }

    _getVmpGroupStatusDescription(drug){
        return _.get(drug,"vmpGroup.noSwitchReason.description."+this.language,"-")
    }



}
customElements.define(HtPatPrescriptionDetailCnkInfo.is, HtPatPrescriptionDetailCnkInfo);
