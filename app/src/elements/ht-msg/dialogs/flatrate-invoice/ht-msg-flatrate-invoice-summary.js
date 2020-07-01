import '../../../dynamic-form/ckmeans-grouping.js';
import '../../../../styles/vaadin-icure-theme.js';
import '../../../../styles/spinner-style.js';
import '../../../../styles/scrollbar-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/dialog-style';
import '../../../../styles/invoicing-style';
import '../../../ht-spinner/ht-spinner.js';

//TODO import "@polymer/iron-collapse-button/iron-collapse-button"
import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-tooltip/paper-tooltip"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"
import "@vaadin/vaadin-grid/vaadin-grid-column-group"
import "@vaadin/vaadin-grid/vaadin-grid-sorter"
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle"
import '@vaadin/vaadin-accordion/vaadin-accordion'
import '@vaadin/vaadin-details/vaadin-details'

import moment from 'moment/src/moment';
import _ from 'lodash/lodash';
import * as models from 'icc-api/dist/icc-api/model/models'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../../tk-localizer";
class HtMsgFlatrateInvoiceSummary extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
        
        <style include="shared-styles spinner-style scrollbar-style buttons-style dialog-style invoicing-style">
              #summary-dialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
             }
             
             .summary-dialog{               
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
             }  
             
              .content{
                height: calc(98% - 30px)!important;
                max-height: 100%;            
                width: auto;               
            }
            
            .title{
                height: 19px;
                width: auto;
                font-size: 18px;
                padding: 10px;
            }  
            
            .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
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
                flex-grow: 0;
            }
            
            .fg02{
                flex-grow: 0.2;
            }
            
            .fg05{
                flex-grow: 0.5;
            }
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }  
            
            .fg4{
                flex-grow: 4.2;
            } 
            
            .tr-group{
                background-color: #f4f4f6;
                font-weight: bold;
            }
            
            .summery-info{
            
            }
            
            .right{
                justify-content: flex-end;
            }
            
            .group{
                height: auto;
                width: auto;
                margin-bottom: 20px;
            }

        </style>
        
        <paper-dialog id="summary-dialog" no-cancel-on-outside-click no-cancel-on-esc-key>
            <div class="content summary-dialog">
                <div class="title">
                    [[localize('inv-sum', 'Summary', language)]]
                </div>
                <div class="summery-info">
                   <template is="dom-repeat" items="[[_getInvoiceGroupByMonth(invoicesForSummery)]]" as="monthGroup">
                       <div class="group">
                           <div class="tr tr-group">
                              <div class="td fg1">[[_getMonthGroupInformation(monthGroup)]]</div>
                           </div>
                           <div class="table">
                                <div class="tr tr-group">
                                    <div class="td fg0"></div>
                                    <div class="td fg3">Oa</div>
                                    <div class="td fg1">[[localize('inv-sum-tot-pat', 'Total of patient', language)]]</div>
                                    <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]] [[localize('inv_oa','Oa',language)]]</div>
                                    <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]] [[localize('inv_pat','Patient',language)]]</div>
                                    <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]] [[localize('inv_supp','Extra',language)]]</div>
                                    <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]] [[localize('inv_tot','Total',language)]]</div>
                                </div>
                                <template is="dom-repeat" items="[[_getInvoiceGroupByOa(monthGroup)]]" as="oaGroup">
                                    <div class="tr">
                                        <div class="td fg0"></div>
                                        <div class="td fg3">[[_getOaGroupInformation(oaGroup)]]</div>
                                        <div class="td fg1">[[_getNumberOfPatient(oaGroup)]]</div>
                                        <div class="td fg1">[[_getAmount(oaGroup, 'oa')]]€</div>
                                        <div class="td fg1">[[_getAmount(oaGroup, 'pat')]]€</div>
                                        <div class="td fg1">[[_getAmount(oaGroup, 'supp')]]€</div>
                                        <div class="td fg1">[[_getAmount(oaGroup, 'tot')]]€</div>
                                    </div>
                                </template>
                                <div class="tr tr-group">
                                     <div class="td fg0"></div>
                                     <div class="td fg3">[[localize('inv_tot','Total',language)]]</div>
                                     <div class="td fg1">[[_getNumberOfPatient(monthGroup)]]</div>
                                     <div class="td fg1">[[_getAmount(monthGroup, 'oa')]]€</div>
                                     <div class="td fg1">[[_getAmount(monthGroup, 'pat')]]€</div>
                                     <div class="td fg1">[[_getAmount(monthGroup, 'supp')]]€</div>
                                     <div class="td fg1">[[_getAmount(monthGroup, 'tot')]]€</div>
                                 </div>
                           </div>
                       </div>
                    </template>
                    <div class="table">
                        <div class="tr tr-group">
                             <div class="td fg0"></div>
                             <div class="td fg3">[[localize('inv_tot_batch','Total of batch',language)]]</div>
                             <div class="td fg1">[[_getNumberOfPatient(invoicesForSummery)]]</div>
                             <div class="td fg1">[[_getAmount(invoicesForSummery, 'oa')]]€</div>
                             <div class="td fg1">[[_getAmount(invoicesForSummery, 'pat')]]€</div>
                             <div class="td fg1">[[_getAmount(invoicesForSummery, 'supp')]]€</div>
                             <div class="td fg1">[[_getAmount(invoicesForSummery, 'tot')]]€</div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button button--other" on-tap="_closeSummaryDialog">[[localize('clo','Close',language)]]</paper-button> 
                <paper-button class="button button--save" on-tap="_sendInvoices">[[localize('inv_send','Send',language)]]</paper-button>      
            </div>
        </paper-dialog>   
     
`;
    }

    static get is() {
        return 'ht-msg-flatrate-invoice-summary';
    }

    static get properties() {
        return {
            api: {
                type: Object
            },
            user: {
                type: Object
            },
            hcp: {
                type : Object
            },
            listOfInvoice:{
                type: Array,
                value: () => []
            },
            invoicesForSummery:{
                type: Array,
                value: () => []
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }

    _openSummaryDialog(){
        if(_.size(_.get(this, 'listOfInvoice', [])) > 0){
            this.set('invoicesForSummery', this.listOfInvoice.filter(inv => _.get(inv, 'insurabilityCheck', false) === true && _.get(inv, 'sendingFlag', false) === true))
            this.shadowRoot.querySelector("#summary-dialog").open()
        }
    }

    _closeSummaryDialog(){
        this.shadowRoot.querySelector("#summary-dialog").close()
    }

    _sendInvoices(){
        this.dispatchEvent(new CustomEvent('send-invoice', {bubbles: true, composed: true}))
    }

    _getInvoiceGroupByMonth(inv){
        return _.map(_.groupBy(inv, "invoiceMonth"), inv => inv)
    }

    _getMonthGroupInformation(group){
        return _.get(_.head(group), 'invoiceMonth', null) ? moment(_.get(_.head(group), 'invoiceMonth', null), 'YYYYMM').format("MM/YYYY") : _.get(_.head(group), 'invoiceMonth', null)
    }

    _getOaGroupInformation(group){
        return _.get(_.head(group), 'parentInsuranceDto.code', null)+": "+_.get(_.head(group), 'parentInsuranceDto.name.'+this.language, null)
    }

    _getInvoiceGroupByOa(monthGroup){
        return _.map(_.groupBy(monthGroup, 'parentInsuranceDto.code'), inv => inv)
    }

    _getAmount(group, type){
        return type === "oa" ? group.reduce((tot, inv) => {return tot + Number(_.get(inv, 'reimbursement', 0.00))}, 0).toFixed(2) :
            type === "pat" ? group.reduce((tot, inv) => {return tot + Number(_.get(inv, 'patientIntervention', 0.00))}, 0).toFixed(2) :
                type === "supp" ? group.reduce((tot, inv) => {return tot + Number(_.get(inv, 'doctorSupplement', 0.00))}, 0).toFixed(2) :
                    type === "tot" ? group.reduce((tot, inv) => {return tot + Number(_.get(inv, 'totalAmount', 0.00))}, 0).toFixed(2) : "0.00"
    }

    _getNumberOfPatient(group){
        return _.size(group)
    }
}


customElements.define(HtMsgFlatrateInvoiceSummary.is, HtMsgFlatrateInvoiceSummary);
