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
                height: 100px;
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
                height: 100px;
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
            
        </style>
        
         <div class="cnk-info-container">
            <div class="cnk-info-title">
                <span class="bold">[[localize('presc-cnk-info', 'Informations about', language)]]: </span> [[selectedCnkForInformation.drug.label]]
                <paper-icon-button id="" class="button button--other btn-close" icon="icons:close" on-tap="_closeCnkInfoView"></paper-icon-button>
            </div>
            <div class="cnk-info-container-content">
                <div class="cnk-info-drug-container">
                    <div class="cnk-info-container-title">
                        [[localize('', 'Drug', language)]]
                    </div>
                    <div class="cnk-info-drug-container-content">
                        <div class="table">
                             <div class="tr">
                                <div class="td fg1 bold">[[localize('','Drug name',language)]]</div>    
                                <div class="td fg1">[[selectedCnkForInformation.drug.label]]</div>
                                <div class="td fg1 bold">[[localize('','',language)]]</div>
                                <div class="td fg1"></div>   
                             </div>
                             <div class="tr">
                                <div class="td fg1 bold">[[localize('','Vmp',language)]]</div>    
                                <div class="td fg1">[[_getVmp(selectedCnkForInformation.drug)]]</div>
                                <div class="td fg1 bold">[[localize('','Vmp group',language)]]</div>
                                <div class="td fg1">[[_getVmpGroup(selectedCnkForInformation.drug)]]</div>   
                             </div>
                        </div>
                    </div>
                </div>
                <div class="cnk-info-commercialisation-container">
                    <div class="cnk-info-container-title">
                        [[localize('', 'Commercialization', language)]]
                    </div>
                    <div class="cnk-info-commercialisation-container-content">
                        <div class="table">
                            <div class="tr">
                                <div class="td fg1 bold">[[localize('','Start of commercialisation',language)]]</div>    
                                <div class="td fg1">[[_getStartDateOfCommercialization(selectedCnkForInformation.drug)]]</div>
                                <div class="td fg1 bold">[[localize('','End of commercialisation',language)]]</div>
                                <div class="td fg1">[[_getEndDateOfCommercialization(selectedCnkForInformation.drug)]]</div>
                             </div>
                             <div class="tr">
                                <div class="td fg1 bold">[[localize('','Start of prescribing',language)]]</div>    
                                <div class="td fg1"></div>
                                <div class="td fg1 bold">[[localize('','End of prescribing',language)]]</div>
                                <div class="td fg1"></div>   
                             </div>
                        </div>
                    </div>
                </div>
                <div class="cnk-info-delivery-container">
                    <div class="cnk-info-container-title">
                        [[localize('', 'Delivery', language)]]
                    </div>
                    <div class="cnk-info-delivery-container-content">
                        <div class="table">
                            <div class="tr">
                                <div class="td fg1 bold">[[localize('','Delivery modus',language)]]</div>    
                                <div class="td fg1">[[_getDeliveryModus(selectedCnkForInformation.drug)]]</div>
                                <div class="td fg1 bold">[[localize('','',language)]]</div>
                                <div class="td fg1"></div>   
                             </div>
                             <div class="tr">
                                <div class="td fg1 bold">[[localize('','Condition of prescription',language)]]</div>    
                                <div class="td fg1">[[_getDeliveryModusSpecification(selectedCnkForInformation.drug)]]</div>
                                <div class="td fg1 bold">[[localize('','',language)]]</div>
                                <div class="td fg1"></div>   
                             </div>
                        </div>
                    </div>
                </div>
                <div class="cnk-info-reimbursement-container">
                   <div class="cnk-info-container-title">
                        [[localize('', 'Reimbursement', language)]]
                    </div>
                    <div class="cnk-info-reimbursement-container-content">
                        <div class="table">
                        
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
        return _.get(drug, 'informations.vmpGroupName', null)
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

}
customElements.define(HtPatPrescriptionDetailCnkInfo.is, HtPatPrescriptionDetailCnkInfo);
