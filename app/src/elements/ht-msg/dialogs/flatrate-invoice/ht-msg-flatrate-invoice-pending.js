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
class HtMsgFlatrateInvoicePending extends TkLocalizerMixin(PolymerElement) {
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
                
                .invoice-status--orangeStatus{
                    background: #fcdf354d;
                }
                .invoice-status--greenStatus{
                    background: #07f8804d;
                }
                .invoice-status--blueStatus {
                    background: #84c8ff;
                }
                .invoice-status--redStatus{
                    background: #ff4d4d4d;
                }
                .invoice-status--purpleStatus {
                    background: #e1b6e6;
                }
                
                 .statusIcon.invoice-status--orangeStatus {
                    color: var(--app-status-color-pending);
                }
                .statusIcon.invoice-status--greenStatus {
                    color: var(--app-status-color-ok);
                }
                .statusIcon.invoice-status--blueStatus {
                    color: var(--paper-blue-400);
                }
                .statusIcon.invoice-status--redStatus {
                    color: var(--app-status-color-nok);
                }
                .statusIcon.invoice-status--purpleStatus {
                    color: var(--paper-purple-300);
                }
                .statusIcon.invoice-status--orangeStatus,
                .statusIcon.invoice-status--greenStatus,
                .statusIcon.invoice-status--redStatus,
                .statusIcon.invoice-status--purpleStatus {
                    background: transparent !important;
                }

                *.txtcolor--orangeStatus {
                    color: var(--app-status-color-pending);
                }
                *.txtcolor--greenStatus {
                    color: var(--app-status-color-ok);
                }
                *.txtcolor--blueStatus {
                    color: var(--paper-blue-400);
                }
                *.txtcolor--redStatus {
                    color: var(--app-status-color-nok);
                }
                *.txtcolor--purpleStatus {
                    color: var(--paper-purple-300)
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
            
            .tr{
                display: flex;
                height: 22px;               
                border-bottom: 1px solid var(--app-background-color-dark);   
                padding: 4px;                
            }
            
            .th{
                height: auto!important;
                font-weight: bold;
                vertical-align: middle;
            }
            
            .tr-item{
                cursor: pointer;
            }
            
            .td{
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;                           
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
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }   
            
            .fg3{
                flex-grow: 3;
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
            
            .button{
               display: inline-flex!important;
               align-items: center!important;
            }
            
            .title{
                display:flex;
                padding: 5px;
            }
            
            #processMessage{
                height: 200px;
                width: 400px;
            }
            
            .modalDialog{
                height: 350px;
                width: 600px;
            }

            .modalDialogContent{
                 height: calc(100% - 69px);
                 width: auto;
                 margin: 0;
                 background-color: white;
                 position: relative;
                 padding: 10px;
            }
            
            .sendingSpinner{
               height: 100px!important;
               width: 100px!important;
               margin: auto;
           }

           .prossessList{
               height: calc(100% - 100px);
               width: auto;
               padding: 4px;
           }
           
           .tr-group{
                background-color: #f4f4f6;
                font-weight: bold;
            }

            
        </style>
        
        <div class="panel">
            <div class="panel-title">
                <div class="title">
                    [[localize('inv-pending', 'Process invoice', language)]]
                    <span class="batchNumber batchProcessed">{{_forceZeroNum(listOfInvoice.length)}}</span>
                 </div> 
            </div>
            <div class="panel-search">
                 <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{filter}}"></dynamic-text-field>
            </div>
            <div class="panel-content">
                <div class="table">
                    <div class="tr th">                     
                        <div class="td fg2">[[localize('inv_prest','Physician',language)]]</div>
                        <div class="td fg1">[[localize('inv_oa','Oa',language)]]</div>                      
                        <div class="td fg1">[[localize('inv_batch_num','Batch number',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_month','Invoiced month',language)]]</div>
                        <div class="td fg1">[[localize('inv_date_fact','Invoice date',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_invoiced','Invoiced',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/> [[localize('inv_batch_amount_acc','Accepted',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/> [[localize('inv_batch_amount_rej','Rejected',language)]]</div>
                        <div class="td fg1">[[localize('inv_stat','Status',language)]]</div>        
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
                                <div class="td fg0"></div>
                            </div>
                            <template is="dom-repeat" items="[[group]]" as="inv">
                                <div class="tr tr-item" id="[[inv.invoiceId]]" data-item$="[[inv]]" on-tap="_displayInfoPanel">
                                    <div class="td fg2">[[inv.messageInfo.hcp]]</div>
                                    <div class="td fg1">[[inv.messageInfo.oa]]</div>
                                    <div class="td fg1">[[inv.messageInfo.invoiceNumber]]</div>
                                    <div class="td fg1">[[formatDate(inv.messageInfo.invoiceMonth,'month')]]</div>
                                    <div class="td fg1">[[formatDate(inv.messageInfo.invoiceDate,'date')]]</div>
                                    <div class="td fg1 right"><span class$="[[_getTxtStatusColor(_getIconStatusClass(inv.messageInfo.invoiceStatus),inv.messageInfo.refusedAmount)]]">[[_formatAmount(inv.messageInfo.invoicedAmount)]]€</span></div>
                                    <div class="td fg1 right"><span class$="[[_getTxtStatusColor(_getIconStatusClass(inv.messageInfo.invoiceStatus),inv.messageInfo.refusedAmount)]]">[[_formatAmount(inv.messageInfo.acceptedAmount)]]€</span></div>
                                    <div class="td fg1 right"><span class$="[[_getTxtStatusColor(_getIconStatusClass(inv.messageInfo.invoiceStatus),inv.messageInfo.refusedAmount)]]">[[_formatAmount(inv.messageInfo.refusedAmount)]]€</span></div>
                                    <div class="td fg1"><span class$="invoice-status [[_getIconStatusClass(inv.messageInfo.invoiceStatus)]]"><iron-icon icon="vaadin:circle" class$="statusIcon [[_getIconStatusClass(inv.messageInfo.invoiceStatus)]]"></iron-icon> [[inv.messageInfo.invoiceStatus]]</span></div>
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
                <template is="dom-if" if="[[api.tokenIdMH]]">
                    <paper-button on-tap="receiveInvoices" class="button button--save" disabled="[[cannotGet]]">[[localize('inv_get','Get',language)]]</paper-button>
                </template>
                <template is="dom-if" if="[[!api.tokenIdMH]]">
                    <paper-button on-tap="" class="button button--other" disabled title="Pas de connexion ehealth active">[[localize('inv_get','Get',language)]]</paper-button>
                </template>
            </div>
        </div>   
        
         <paper-dialog class="modalDialog" id="receivingDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('inv-trt-in-prog','treatment in progress',language)]]</h2>
            <div class="modalDialogContent m-t-50">
                <div class="sendingSpinner">
                    <ht-spinner active="[[isProcessing]]"></ht-spinner>
                </div>
                <div class="prossessList">
                   <template is="dom-repeat" items="[[progressItem]]" as="pi">
                      <div>[[pi]]</div>
                   </template>
                </div>     
            </div>        
        </paper-dialog>
     
`;
    }

    static get is() {
        return 'ht-msg-flatrate-invoice-pending';
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
            cannotGet: {
                type: Boolean,
                value: false
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            isProcessing:{
                type: Boolean,
                value: false
            },
            progressItem:{
                type: Array,
                value: () => []
            },
            listOfOa: {
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
            const LastGet = parseInt(localStorage.getItem('lastInvoicesGet')) ? parseInt(localStorage.getItem('lastInvoicesGet')) : -1
            const mayGet = (LastGet < Date.now() + 24*60*60000 || LastGet===-1)
            this.set('cannotGet',!mayGet)
        }
    }

    _sortInvoiceListByInvoiceRef(listOfInvoice) {
        return _.sortBy(listOfInvoice, ['invoiceReference'], ['asc'])
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

    _getIconStatusClass(status) {
        console.log("geticonstatus",status)
        return (status === this.localize('inv_acc_tre','Accepted for treatment',this.language)) ? "invoice-status--blueStatus" :
            (status === this.localize('inv_to_be_send','To be send',this.language)) ? (!this.statusToBeSend)  ? "invoice-status--blueStatus" : "invoice-status--orangeStatus" :
                (status === this.localize('inv_to_be_corrected','To be corrected',this.language))  ? "invoice-status--redStatus" :
                    (status === this.localize('inv_par_acc','Partially accepted',this.language)) ? "invoice-status--orangeStatus" :
                        (status === this.localize('inv_full_acc','Fully accepted',this.language)) ? "invoice-status--greenStatus" :
                            (status === this.localize('inv_tre','Treated',this.language)) ? "invoice-status--greenStatus" :
                                (status === this.localize('inv_acc_tre','Accepted for treatment',this.language)) ? "invoice-status--blueStatus" :
                                    (status === this.localize('inv_pen','Pending',this.language)) ? (!this.statusToBeSend) ? "invoice-status--blueStatus" : "" :
                                        (status === this.localize('inv_err','Error',this.language)) ? "invoice-status--redStatus" :
                                            (status === this.localize('inv_arch','Archived',this.language)) ? "invoice-status--purpleStatus" :
                                                (status === this.localize('nmcl-rejected','Rejected',this.language)) ? "invoice-status--redStatus" :
                                                    (status === this.localize('nmcl-accepted','Accepted',this.language)) ? "invoice-status--greenStatus" :
                                                        (status === this.localize('inv_send_err', 'Send error', this.language)) ? "invoice-status--redStatus" :
                                                            ""
    }
    _getTxtStatusColor(status,amount) {
        console.log("gettxtstatus",status,amount)
        if (amount > 0) {
            return (status === this.localize('inv_par_acc','Partially accepted',this.language)) ? "txtcolor--orangeStatus" :
                (status === this.localize('inv_full_acc','Fully accepted',this.language)) ? "txtcolor--greenStatus" :
                    (status === this.localize('inv_to_be_corrected','To be corrected',this.language))  ? "txtcolor-status--redStatus" :
                        (status === this.localize('inv_acc_tre','Accepted for treatment',this.language)) ? "txtcolor--blueStatus" :
                            (status === this.localize('inv_pen','Pending',this.language)) ? "txtcolor--blueStatus" :
                                (status === this.localize('inv_tre','Treated',this.language)) ? "txtcolor--greenStatus" :
                                    (status === this.localize('inv_err','Error',this.language)) ? "txtcolor--redStatus" :
                                        (status === this.localize('inv_arch','Archived',this.language)) ? "txtcolor--purpleStatus" :
                                            (status === this.localize('nmcl-rejected','Rejected',this.language)) ? "txtcolor--redStatus" :
                                                (status === this.localize('nmcl-accepted','Accepted',this.language)) ? "txtcolor--greenStatus" :
                                                    (status === 'force-red') ? "txtcolor--redStatus" :
                                                        (status === 'force-green') ? "txtcolor--greenStatus" :
                                                            (status === this.localize('inv_send_err', 'Send error', this.language)) ? "invoice-status--redStatus" :
                                                                ""
        }
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

    receiveInvoices() {

        const LastGet = parseInt(localStorage.getItem('lastInvoicesGet')) ? parseInt(localStorage.getItem('lastInvoicesGet')) : -1
        const mayGet = (LastGet < Date.now() + 60*60000 || LastGet===-1)
        if (mayGet) {
            this.shadowRoot.querySelector('#receivingDialog').open()
            this.set('isProcessing', true)
            this.push('progressItem', this.localize('inv-get-step-1', 'inv-get-step-1', this.language))
            this.set('cannotGet',true)
            localStorage.setItem('lastInvoicesGet', Date.now())
            this.api.fhc().Efactcontroller().loadMessagesUsingGET(_.get(this.hcp, 'nihii', null), this.language, _.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenIdMH', null), _.get(this.api, 'credentials.ehpassword', null), _.get(this.hcp, 'ssin', null), _.get(this.hcp, 'name', null), "", "medicalhouse").then( x => this.api.logMcn(x, this.user, this.hcp.id, "eFact", "loadMessages") ).then(response => {
                let prom = Promise.resolve()
                this.push('progressItem', this.localize('inv-get-step-2', 'inv-get-step-2', this.language))
                response.forEach(message => {
                    // console.log(message)
                    prom = prom.then(messages =>
                        new Promise((resolve) => {
                            if (message.detail) {
                                this.api.message().processEfactMessage(this.user, this.hcp, message, null, (iv, hcpId) =>
                                    iv.recipientId && this.api.insurance().getInsurance(iv.recipientId)
                                        .then(ins => this.api.insurance().getInsurance(ins.parent))
                                        .then(ins => `invoice:${hcpId}:${ins.code || '000'}:`)
                                    || Promise.resolve(`invoice:${hcpId}:000:`)
                                ).then(msg => {
                                    msg ? resolve(_.concat(messages, message)) : resolve(messages)
                                })
                                    .catch(e => {
                                        console.log('Erreur lors de la reception des messages efact',e)
                                        resolve(messages)
                                    })
                            } else if (message.tack) {
                                this.api.message().processTack(this.user, this.hcp, message)
                                    .then(rcpt => {
                                        rcpt ? resolve(_.concat(messages, message)) : resolve(messages)
                                    })
                                    .catch(e => {
                                        console.log('Erreur lors de la reception des tacks efact',e)
                                        resolve(messages)
                                    })
                            }
                        })
                    )

                })

                prom = prom.then(treatedMessages => {
                    console.log(treatedMessages)
                    this.push('progressItem', this.localize('inv-get-step-3', 'inv-get-step-3', this.language))

                    let sprom = Promise.resolve()
                    /*_.chunk(treatedMessages, 20).forEach(chunk => {
                        const tacks = chunk.filter(x => x && x.tack)
                        const responses = chunk.filter(x => x && x.detail)

                        sprom = sprom
                            .then(() =>this.api.fhc().Efactcontroller().confirmAcksUsingPUT(_.get(this.hcp, 'nihii', null), _.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenIdMH', null), _.get(this.api, 'credentials.ehpassword', null), _.get(this.hcp, 'ssin', null), _.get(this.hcp, 'firstName', null), _.get(this.hcp, 'lastName', null), "medicalhouse", tacks.map(t => t.hashValue)))
                            .then(() => this.api.fhc().Efactcontroller().confirmMessagesUsingPUT(_.get(this.hcp, 'nihii', null), _.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenIdMH', null), _.get(this.api, 'credentials.ehpassword', null), _.get(this.hcp, 'ssin', null), _.get(this.hcp, 'firstName', null), _.get(this.hcp, 'lastName', null), "medicalhouse", responses.map(t => t.hashValue)))

                    })*/
                    return sprom

                })

                return prom.then(() => {
                    this.shadowRoot.querySelector('#receivingDialog').close()
                    this.set('isProcessing', false)
                    this.set('isReceiving',false)
                    this.set("isMessagesLoaded",false)
                    this.getMessage()
                })
            })
        }
    }

    getMessage(){
        this.dispatchEvent(new CustomEvent('get-message', {bubbles: true, composed: true, detail: {refreshAll: true}}))
    }

    _getRefusedAmount(totalAmount, acceptedAmount){
        return this.findAndReplace(((Number(Number(totalAmount) - Number(acceptedAmount)).toFixed(2)).toString()),'.',',')
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

customElements.define(HtMsgFlatrateInvoicePending.is, HtMsgFlatrateInvoicePending);
