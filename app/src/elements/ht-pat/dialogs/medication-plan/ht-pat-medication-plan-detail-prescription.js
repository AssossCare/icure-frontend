import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';



import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatMedicationPlanDetailPrescription extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style">
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
            
            .tabIcon{
                height: 12px;
                width: 12px;
            }
            
            .recipe-status--orangeStatus{
                background: #fcdf354d;
            }
            .recipe-status--greenStatus{
                background: #07f8804d;
            }
            .recipe-status--blueStatus {
                background: #84c8ff;
            }
            .recipe-status--redStatus{
                background: #ff4d4d4d;
            }
            .recipe-status--purpleStatus {
                background: #e1b6e6;
            }
            
            .recipe-status {
                border-radius: 20px;
                padding: 1px 12px 1px 8px;
                font-size: 12px;
                display: block;
                width: auto;
                max-width: fit-content;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }
            .statusIcon{
                height: 8px;
                width: 8px;
            }
            .statusIcon.recipe-status--orangeStatus {
                color: var(--app-status-color-pending);
            }
            .statusIcon.recipe-status--greenStatus {
                color: var(--app-status-color-ok);
            }
            .statusIcon.recipe-status--blueStatus {
                color: var(--paper-blue-400);
            }
            .statusIcon.recipe-status--redStatus {
                color: var(--app-status-color-nok);
            }
            .statusIcon.recipe-status--purpleStatus {
                color: var(--paper-purple-300);
            }
            .statusIcon.recipe-status--orangeStatus,
            .statusIcon.recipe-status--greenStatus,
            .statusIcon.recipe-status--redStatus,
            .statusIcon.recipe-status--purpleStatus {
                background: transparent !important;
            }
            
            .iconBtn{
                height: 12px;
                width: 12px;
            }
            
            .tooltipPrescriber{
                width: 300px;
                font-size: 12px;
            }
            
            .notRel{
                position: initial;
            }
            
            .emptyBtn{
                height: 12px;
                width: 12px;
            }
            
        </style>
        
        <div>
          <div class="table">
            <div class="tr th">                 
                <div class="td fg0">[[localize('','',language)]]</div>
                <div class="td fg0">[[localize('','',language)]]</div>
                <div class="td fg05">[[localize('med-plan-presc-sta-date','Date',language)]]</div>
                <div class="td fg05">[[localize('med-plan-presc-exp-date','Expiration date',language)]]</div>
                <div class="td fg05">[[localize('med-plan-presc-rid','Rid',language)]]</div>
                <div class="td fg2">[[localize('med-plan-presc-drug','Drug',language)]]</div>
                <div class="td fg1">[[localize('med-plan-presc-freq','Frequency',language)]]</div>
                <div class="td fg1">[[localize('med-plan-prescr-stat','Status',language)]]</div>
                <div class="td fg1">[[localize('','',language)]]</div>
            </div>
            <template is="dom-repeat" items="[[listOfDrugs]]" as="drug">
                <div class="tr tr-item">
                    <div class="td fg0 notRel">
                        <iron-icon id="user_[[drug.id]]" class="tabIcon" icon="vaadin:doctor"></iron-icon>
                        <paper-tooltip id="user_[[drug.id]]" class="tooltipPrescriber" for="user_[[drug.id]]" position="right" animation-delay="0">
                        <div class="fs12">
                            <iron-icon icon="vaadin:doctor"></iron-icon>&nbsp;&nbsp;
                            [[localize('med-plan-prescr-prescriber', 'Prescriber', language)]]
                        </div>
                        <div>
                            <div class="table">
                                 <div class="tr-tooltip">
                                    <div class="td-tooltip fg05">[[localize('med-plan-prescr-nihii', 'Nihii', language)]]: </div>
                                    <div class="td-tooltip fg1"></div>
                                 </div>
                                 <div class="tr-tooltip">
                                    <div class="td-tooltip fg05">[[localize('med-plan-prescr-name', 'Name', language)]]: </div>
                                    <div class="td-tooltip fg1"></div>
                                 </div>
                            </div>
                        </div>
                        </paper-tooltip>
                    </div>
                    <div class="td fg0 notRel">
                        <template is="dom-if" if="[[_isCompound(drug.type)]]">
                            <iron-icon id="comp_[[drug.id]]" class="tabIcon" icon="vaadin:flask"></iron-icon>
                            <paper-tooltip for="comp_[[drug.id]]" position="left" animation-delay="0">[[localize('med-plan-presc-compound', 'Compound', language)]]</paper-tooltip>
                        </template>
                        <template is="dom-if" if="[[_isCommercial(drug.type)]]">
                            <iron-icon id="com_[[drug.id]]" class="tabIcon" icon="vaadin:copyright"></iron-icon>
                            <paper-tooltip for="com_[[drug.id]]" position="left" animation-delay="0">[[localize('med-plan-presc-commercial', 'Commercial', language)]]</paper-tooltip>
                        </template>
                        <template is="dom-if" if="[[_isSubstance(drug.type)]]">
                            <iron-icon id="sub_[[drug.id]]" class="tabIcon" icon="vaadin:pill"></iron-icon>
                            <paper-tooltip for="sub_[[drug.id]]" position="left" animation-delay="0">[[localize('med-plan-presc-substance', 'Substance', language)]]</paper-tooltip>
                        </template>
                    </div>
                    <div class="td fg05">[[_formatDate(drug.startOfValidity)]]</div>
                    <div class="td fg05">[[_formatDate(drug.endOfValidity)]]</div>
                    <div class="td fg05">[[drug.rid]]</div>
                    <div class="td fg2">[[drug.label]]</div>
                    <div class="td fg1">[[drug.posology]]</div>
                    <div class="td fg1 notRel">
                        <iron-icon icon="vaadin:circle" class$="statusIcon [[_getStatusColor(drug.status)]]"></iron-icon>
                        <span class$="recipe-status [[_getStatusColor(drug.status)]]]">[[_getStatusHr(drug.status)]]</span> 
                    </div>
                    <div class="td fg1 notRel">
                        <template is="dom-if" if="[[]]">
                            <div class="emptyBtn"></div>
                        </template>
                        <template is="dom-if" if="[[]]">
                            <iron-icon icon="vaadin:print" class="iconBtn" id="print_[[drug.id]]" data-item$="[[drug.id]]" on-tap="_printPrescription"></iron-icon>
                            <paper-tooltip for="print_[[drug.id]]" position="left" animation-delay="0">[[localize('med-plan-presc-btn-print', 'Print', language)]]</paper-tooltip>
                        </template>
                        <template is="dom-if" if="[[]]">
                             <div class="emptyBtn"></div>
                        </template>
                        <template is="dom-if" if="[[]]">
                            <iron-icon icon="vaadin:ban" class="iconBtn" id="revoke_[[drug.id]]" data-item$="[[drug.id]]" on-tap="_revokePrescription"></iron-icon>
                            <paper-tooltip for="revoke_[[drug.id]]" position="left" animation-delay="0">[[localize('med-plan-presc-btn-revoke', 'Revoke', language)]]</paper-tooltip>
                        </template>
                        <template is="dom-if" if="[[]]">
                             <div class="emptyBtn"></div>
                        </template>
                        <template is="dom-if" if="[[]]">
                            <iron-icon icon="vaadin:trash" class="iconBtn" id="delete_[[drug.id]]" data-item$="[[drug.id]]" on-tap="_deleteDrug"></iron-icon>
                            <paper-tooltip for="delete_[[drug.id]]" position="left" animation-delay="0">[[localize('med-plan-presc-btn-delete', 'Delete', language)]]</paper-tooltip>
                        </template>
                        <template is="dom-if" if="[[]]">
                             <div class="emptyBtn"></div>
                        </template>
                        <template is="dom-if" if="[[]]">
                            <iron-icon icon="vaadin:bell-o" class="iconBtn" id="notif_[[drug.id]]" data-item$="[[drug.id]]" on-tap="_sendNotification"></iron-icon>
                            <paper-tooltip for="notif_[[drug.id]]" position="left" animation-delay="0">[[localize('med-plan-presc-btn-notification', 'Notify', language)]]</paper-tooltip>
                        </template>
                        <template is="dom-if" if="[[]]">
                             <div class="emptyBtn"></div>
                        </template>
                        <temlpate is="dom-if" if="[[]]">
                            <iron-icon icon="vaadin:flag-o" class="iconBtn" id="flag_[[drug.id]]" data-item$="[[drug.id]]" on-tap="_changedVisuFlag"></iron-icon>
                            <paper-tooltip for="flag_[[drug.id]]" position="left" animation-delay="0">[[localize('med-plan-presc-btn-visu', 'Change vision flag', language)]]</paper-tooltip>
                        </temlpate>
                        <template is="dom-if" if="[[]]">
                             <div class="emptyBtn"></div>
                        </template>
                        <template is="dom-if" if="[[]]">
                            <iron-icon icon="vaadin:code" class="iconBtn" id="kmehr_[[drug.id]]" data-item$="[[drug.id]]" on-tap="_downloadKmehr"></iron-icon>
                            <paper-tooltip for="kmehr_[[drug.id]]" position="left" animation-delay="0">[[localize('med-plan-presc-btn-kmehr', 'Download xml', language)]]</paper-tooltip>
                        </template>
                        <template is="dom-if" if="[[]]">
                             <div class="emptyBtn"></div>
                        </template>
                    </div>
                </div>
            </template>
          </div>        
      </div>
        
      

`;
    }

    static get is() {
        return 'ht-pat-medication-plan-detail-prescription';
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
            isLoading:{
                type: Boolean,
                value: false
            },
            listOfDrugs: {
                type: Array,
                value: () => []
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }

    _reset(){

    }

    _getStatusColor(status){
        return !!(status & (1 << 6)) ? "recipe-status--purpleStatus" :
            !!(status & (1 << 5)) ? "recipe-status--redStatus" :
                !!(status & (1 << 4)) ? "recipe-status--greenStatus" :
                    !!(status & (1 << 3)) ? "recipe-status--orangeStatus" :
                        !!(status & (1 << 2)) ? "recipe-status--blueStatus" :
                            !!(status & (1 << 1)) ? "recipe-status--blueStatus" :
                                "recipe-status--blueStatus"
    }

    _getStatusHr(status){
        return !!(status & (1 << 5)) ? this.localize("pr_status_expired", "Expiré", this.language) :
            !!(status & (1 << 5)) ? this.localize("pr_status_revoked", "Révoqué", this.language) :
                !!(status & (1 << 4)) ? this.localize("pr_status_delivered", "Déliveré", this.language) :
                    !!(status & (1 << 3)) ? this.localize("pr_status_pending", "Non délivré", this.language) :
                        !!(status & (1 << 2)) ? this.localize("pr_status_sent", "Envoyé", this.language) :
                            !!(status & (1 << 1)) ? this.localize("pr_status_not_sent", "Non envoyé", this.language) :
                                this.localize("pr_status_not_sent", "Non envoyé", this.language)
    }

    _formatDate(date){
        return date ? date !== '19700101' ? this.api.moment(date).format('DD/MM/YYYY') : null : null
    }

    _isSubstance(type){
        return type === 'substance'
    }

    _isCommercial(type){
        return type === 'commercial'
    }

    _isCompound(type){
        return type === 'compound'
    }

    _downloadKmehr(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){

        }
    }

    _changedVisuFlag(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){

        }
    }

    _sendNotification(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){

        }
    }

    _deleteDrug(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){

        }
    }

    _revokePrescription(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){

        }
    }

    _printPrescription(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){

        }
    }

}
customElements.define(HtPatMedicationPlanDetailPrescription.is, HtPatMedicationPlanDetailPrescription);
