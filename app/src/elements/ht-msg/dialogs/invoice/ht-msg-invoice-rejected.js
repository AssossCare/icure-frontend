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
class HtMsgInvoiceRejected extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
     <style include="shared-styles spinner-style scrollbar-style buttons-style dialog-style invoicing-style">
            .panel{
                margin: 0.5%;
                height: calc(100% - 20px);
                width: auto;
            }
            
            .panel-title{
                height: 40px;
                width: auto;
            }
            
            .panel-search{
                height: 45px;
                width: auto;
            }
            
            .panel-content{
                height: calc(100% - 125px);
                width: auto;
            }
            
            .panel-button{
                height: 32px;
                width: auto; 
                padding: 4px; 
                display: flex;
                justify-content: flex-end!important;              
            }
                       
            .invoice-status {
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
                
                .invoice-status--redStatus{
                    background: #ff4d4d4d;
                }
                
                .statusIcon{
                    height: 8px;
                    width: 8px;
                }
               
                .statusIcon.invoice-status--redStatus {
                    color: var(--app-status-color-nok);
                }
                
                
                .statusIcon.invoice-status--orangeStatus,
                .statusIcon.invoice-status--greenStatus,
                .statusIcon.invoice-status--redStatus,
                .statusIcon.invoice-status--purpleStatus {
                    background: transparent !important;
                }

                *.txtcolor--redStatus {
                    color: var(--app-status-color-nok);
                }
                
                *.txtcolor--greenStatus {
                    color: var(--app-status-color-ok);
                }
                
                .batchNumber{
                    color: var(--app-text-color-light);
                    border-radius: 25px;
                    min-height: 0;
                    margin-left: 8px;
                    font-size: .6em;
                    display: inline-block;                  
                    line-height: 0.8;
                    text-align: center;
                    height: 10px;
                    padding: 5px;
                    margin-top: 2px;
                }
                .batchPending{background-color: var(--paper-orange-400);}
                .batchToBeCorrected{background-color: var(--paper-red-400);}
                .batchProcessed{background-color: var(--paper-blue-400);}
                .batchRejected{background-color: var(--paper-red-400);}
                .batchAccepted{background-color: var(--paper-green-400);}
                .batchArchived{background-color: var(--paper-purple-300);}
                       
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
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            } 
            
            .fg3{
                flex-grow: 2.6;
            }
           
            .status{
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
            
            .info-icon{
                height: 14px;
                width: 14px;
            }
            
            .searchField{
                display: block;
            }
            
            .title{
                display:flex;
                padding: 5px;
            }
            
            .tr-group{
                background-color: #f4f4f6;
                font-weight: bold;
            }

            
        </style>
        
        <div class="panel">
            <div class="panel-title">
                <div class="title">
                    [[localize('inv-rejected', 'Batch rejected', language)]]
                    <span class="batchNumber batchRejected">{{_forceZeroNum(listOfInvoice.length)}}</span>
                 </div>                 
            </div>
            <div class="panel-search">
                 <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{filter}}"></dynamic-text-field>
            </div>
            <div class="panel-content">
                <div class="table">
                    <div class="tr th">                     
                        <div class="td fg2">[[localize('inv_prest','Physician',language)]]</div>
                        <div class="td fg05">[[localize('inv_oa','Oa',language)]]</div>                        
                        <div class="td fg1">[[localize('inv_batch_num','Batch number',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_month','Invoiced month',language)]]</div>
                        <div class="td fg1">[[localize('inv_date_fact','Invoice date',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_invoiced','Invoiced',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_acc','Accepted',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_rej','Rejected',language)]]</div>
                        <div class="td fg1">[[localize('inv_stat','Status',language)]]</div>
                        <div class="td fg2">Motif rejet</div> 
                        <div class="td fg0"></div> 
                    </div>
                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                    <template is="dom-if" if="[[!isLoading]]">
                        <template is="dom-repeat" items="[[filteredListOfInvoice]]" as="group">
                            <div class="tr tr-group">
                                <div class="td fg3">[[_getGroupInformation(group)]]</div>
                                <div class="td fg1"></div>
                                <div class="td fg1"></div>
                                <div class="td fg1"></div>
                                <div class="td fg1">[[_getTotalOfGroup(group, 'fact')]]€</div>
                                <div class="td fg1">[[_getTotalOfGroup(group, 'acc')]]€</div>
                                <div class="td fg1">[[_getTotalOfGroup(group, 'ref')]]€</div>
                                <div class="td fg1"></div>
                                <div class="td fg2"></div>
                                <div class="td fg0"></div>
                            </div>
                            <template is="dom-repeat" items="[[group]]" as="inv">
                                <div class="tr tr-item" id="[[inv.invoiceId]]" data-item$="[[inv]]" on-tap="_displayInfoPanel">
                                    <div class="td fg2">[[inv.messageInfo.hcp]]</div>
                                    <div class="td fg05">[[inv.messageInfo.oa]]</div>
                                    <div class="td fg1">[[inv.messageInfo.invoiceNumber]]</div>
                                    <div class="td fg1">[[formatDate(inv.messageInfo.invoiceMonth,'month')]]</div>
                                    <div class="td fg1">[[formatDate(inv.messageInfo.invoiceDate,'date')]]</div>
                                    <div class="td fg1"><span class="">[[_formatAmount(inv.messageInfo.invoicedAmount)]]€</span></div>
                                    <div class="td fg1"><span class="txtcolor--greenStatus">[[_formatAmount(inv.messageInfo.acceptedAmount)]]€</span></div>
                                    <div class="td fg1"><span class="txtcolor--redStatus">[[_getRefusedAmount(inv.messageInfo.invoicedAmount, inv.messageInfo.acceptedAmount)]]€</span></div>
                                    <div class="td fg1"><span class="invoice-status invoice-status--redStatus"><iron-icon icon="vaadin:circle" class="statusIcon invoice-status--redStatus"></iron-icon> [[inv.messageInfo.invoiceStatus]]</span></div>
                                    <div class="td fg2">[[inv.messageInfo.rejectionReason]]</span></div>
                                    <div class="td fg0">
                                        <iron-icon icon="vaadin:info-circle" class="info-icon"></iron-icon>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </template>     
                </div>
            </div>
            <div class="panel-button">
                <template is="dom-if" if="[[_isBatchCanBeAutoArchived(messageIdsCanBeAutoArchived.splices)]]">
                    <paper-button class="button button--other" on-tap="_archiveBatchAuto">[[localize('arch','Archive',language)]] [[_getNbMsgToArchive(messageIdsCanBeAutoArchived.splices)]] envoi(s)</paper-button>
                </template>
            </div>
        </div> 
        
`;
    }

    static get is() {
        return 'ht-msg-invoice-rejected';
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
            filter:{
                type: String,
                value: null
            },
            filteredListOfInvoice:{
                type: Array,
                value: () => []
            },
            messageIdsCanBeAutoArchived:{
                type: Array,
                value: []
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            listOfOa:{
                type: Array,
                value: () => []
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return ['_initialize(api, user, listOfInvoice)', '_filterValueChanged(filter)'];
    }

    ready() {
        super.ready();
    }

    _initialize(){
        if(_.size(_.get(this, 'listOfInvoice', [])) > 0){
            this.set('filteredListOfInvoice',  _.map(_.groupBy(_.get(this, 'listOfInvoice', []), 'message.metas.ioFederationCode'), inv => inv))
        }
    }

    formatDate(d,f) {
        const input = d && d.toString() || _.trim(d)
        const yyyy = input.slice(0,4), mm = input.slice(4,6), dd = input.slice(6,8)
        switch(f) {
            case 'date' :
                return `${dd}/${mm}/${yyyy}`;
            case 'month' :
                const monthStr =
                    (mm.toString() === '01') ? this.localize('Jan',this.language) :
                        (mm.toString() === '02') ? this.localize('Feb',this.language) :
                            (mm.toString() === '03') ? this.localize('Mar',this.language) :
                                (mm.toString() === '04') ? this.localize('Apr',this.language) :
                                    (mm.toString() === '05') ? this.localize('May',this.language) :
                                        (mm.toString() === '06') ? this.localize('Jun',this.language) :
                                            (mm.toString() === '07') ? this.localize('Jul',this.language) :
                                                (mm.toString() === '08') ? this.localize('Aug',this.language) :
                                                    (mm.toString() === '09') ? this.localize('Sep',this.language) :
                                                        (mm.toString() === '10') ? this.localize('Oct',this.language) :
                                                            (mm.toString() === '11') ? this.localize('Nov',this.language) :
                                                                this.localize('Dec',this.language)
                return `${monthStr} ${yyyy}`
        }
    }

    _formatAmount(amount){
        return this.findAndReplace(((Number(amount).toFixed(2)).toString()),'.',',')
    }

    findAndReplace(string, target, replacement) {
        for (let i = 0; i < string.length; i++) { string = string.replace(target, replacement); }
        return string;
    }

    _sortInvoiceListByInvoiceRef(listOfInvoice) {
        return _.sortBy(listOfInvoice, ['invoiceReference'], ['asc'])
    }

    _displayInfoPanel(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){
            this.dispatchEvent(new CustomEvent('open-detail-panel', {bubbles: true, composed: true, detail: {selectedInv: JSON.parse(_.get(e, 'currentTarget.dataset.item', null))}}))
        }
    }

    _forceZeroNum(num) {
        return (!num) ? '0' : num.toString()
    }

    _filterValueChanged(){
        if(this.filter){
            const keywordsString = _.trim(_.get(this,"filter","")).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            const keywordsArray = _.compact(_.uniq(_.map(keywordsString.split(" "), i=>_.trim(i))))

            setTimeout(() => {
                if(parseInt(_.get(keywordsString,"length",0)) > 2) {
                    const invoiceSearchResults =  _.chain(_.get(this, "listOfInvoice", []))
                        .chain(_.get(this, "filter", []))
                        .filter(i => _.size(keywordsArray) === _.size(_.compact(_.map(keywordsArray, keyword => _.trim(_.get(i, "normalizedSearchTerms", "")).indexOf(keyword) > -1))))
                        .compact()
                        .uniq()
                        .orderBy(['code', 'label.' + this.language, 'id'], ['asc', 'asc', 'asc'])
                        .value()
                    this.set('filteredListOfInvoice', _.map(_.groupBy(_.sortBy(invoiceSearchResults, ['insuranceCode'], ['asc']), 'message.metas.ioFederationCode'), inv => inv))
                }else{
                    this.set('filteredListOfInvoice', _.map(_.groupBy(_.sortBy(_.get(this, 'listOfInvoice', []), ['insuranceCode'], ['asc']), 'message.metas.ioFederationCode'), inv => inv))
                }
            }, 100)
        }else{
            this.set('filteredListOfInvoice',_.map(_.groupBy(_.sortBy(_.get(this, 'listOfInvoice', []), ['insuranceCode'], ['asc']), 'message.metas.ioFederationCode'), inv => inv))
        }
    }

    _isBatchCanBeAutoArchived(){
        return !!_.size(_.get(this, 'messageIdsCanBeAutoArchived', []))
    }

     _archiveBatchAuto(){
      if(_.size(_.get(this, 'messageIdsCanBeAutoArchived', [])) > 0){
          this.api.setPreventLogging()
          Promise.all(_.get(this, 'messageIdsCanBeAutoArchived', []).map(id =>
              this.api.message().getMessage(id).then(msg => {
                  msg.status = (msg.status | (1 << 21))
                  this.api.message().modifyMessage(msg)
                      .then(msg => this.api.register(msg, 'message'))
                      .then(msg => this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: msg.invoiceIds.map(i => i)})))
                      .then(invoices => invoices.map(inv => {
                          inv.invoicingCodes.map(ic => ic.archived = true)
                          this.api.invoice().modifyInvoice(inv).then(inv => this.api.register(inv,'invoice'))
                      }))
              })))
              .then(() => {
                  this.dispatchEvent(new CustomEvent('get-message', {bubbles: true, composed: true, detail: {refreshAll: true}}))
              })
              .finally(()=>this.api.setPreventLogging(false))
      }
  }

    _getRefusedAmount(totalAmount, acceptedAmount){
        return this.findAndReplace(((Number(Number(totalAmount) - Number(acceptedAmount)).toFixed(2)).toString()),'.',',')
    }

    _getNbMsgToArchive(){
        return _.size(_.get(this, 'messageIdsCanBeAutoArchived', []))
    }

    _getGroupInformation(group){
        const oa = _.get(this, 'listOfOa', []).find(oa => _.get(oa, 'code', null) === _.get(_.head(group), 'message.metas.ioFederationCode', '000'))
        return _.get(oa, 'code', null)+": "+_.get(oa, 'name.'+this.language, null)
    }

    _getTotalOfGroup(group, type){
        return type === "fact" ? group.reduce((tot, mess) => {return tot + Number(_.get(mess, 'messageInfo.invoicedAmount', 0.00))}, 0).toFixed(2) :
            type === "acc" ? group.reduce((tot, mess) => {return tot + Number(_.get(mess, 'messageInfo.acceptedAmount', 0.00))}, 0).toFixed(2) :
                type === "ref" ? group.reduce((tot, mess) => {return tot + Number(_.get(mess, 'messageInfo.refusedAmount', 0.00))}, 0).toFixed(2) : 0.00
    }

}

customElements.define(HtMsgInvoiceRejected.is, HtMsgInvoiceRejected);
