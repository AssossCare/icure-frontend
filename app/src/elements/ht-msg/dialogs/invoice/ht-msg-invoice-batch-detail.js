import '../../../dynamic-form/ckmeans-grouping.js';
import '../../../../styles/vaadin-icure-theme';
import '../../../../styles/spinner-style';
import '../../../../styles/scrollbar-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/dialog-style';
import '../../../ht-spinner/ht-spinner';

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
class HtMsgInvoiceBatchDetail extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`

        <style include="shared-styles spinner-style scrollbar-style buttons-style dialog-style">
        
            .panel{
                background-color: white;
                height: calc(100% - 20px);
                width: auto;
            }
            
            .panel-title{
                height: 40px;
                width: auto;               
            }
            
            .panel-search{
                height: 40px;
                width: auto;
            }
            
            .panel-content{
                height: calc(100% - 120px);
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
            
               .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .tr{
                display: flex;
                height: auto;               
                border-bottom: 1px solid lightgray;   
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
            
            .rejectionInfo{
                white-space: normal!important;
            }
            
            .button{
               display: inline-flex!important;
               align-items: center!important;
            }
            
        </style>
        
        <div class="panel">
           <div class="panel-title">
                [[localize('inv-num-detail', 'Detail of batch number', language)]] [[_getInvoiceReference(selectedInvoiceForDetail)]]              
            </div>
            <div class="panel-search">
                <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{filter}}"></dynamic-text-field>
            </div>
            <div class="panel-content">
                <div class="table">
                    <div class="tr th">                     
                        <div class="td fg1">[[localize('inv_num_fac','Invoice number',language)]]</div>
                        <div class="td fg2">[[localize('inv_pat','Patient',language)]]</div>
                        <div class="td fg1">[[localize('inv_niss','Niss',language)]]</div>
                        <div class="td fg1">[[localize('nmcl','Nmcl',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_month','Invoiced month',language)]]</div>
                        <div class="td fg1">[[localize('inv_date_fact','Invoice date',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_invoiced','Invoiced',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_acc','Accepted',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_batch_amount_rej','Rejected',language)]]</div>
                        <div class="td fg3">Motif rejet</div>  
                        <div class="td fg05">Payé</div>  
                        <div class="td fg1">[[localize('inv_stat','Status',language)]]</div>                                          
                    </div>
                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                    <template is="dom-if" if="[[!isLoading]]">
                        <template is="dom-repeat" items="[[_sortInvoiceListByInvoiceRef(invoicesFromBatch)]]" as="inv">
                            <div class="tr">
                                <div class="td fg1">[[inv.invoiceReference]]</div>
                                <div class="td fg2">[[inv.patient]]</div>
                                <div class="td fg1">[[inv.ssin]]</div>
                                <div class="td fg1"></div>
                                <div class="td fg1">[[formatDate(inv.invoiceDate,'date')]]</div>
                                <div class="td fg1"><span class\$="[[_getTxtStatusColor(inv.statut,inv.totalAmount)]]">[[_formatAmount(inv.invoicedAmount)]]€</span></div>
                                <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-green',inv.acceptedAmount)]]">[[_formatAmount(inv.acceptedAmount)]]€</span></div>
                                <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-red',inv.refusedAmount)]]">[[_formatAmount(inv.refusedAmount)]]€</span></div>
                                <div class="td fg3 rejectionInfo">[[inv.rejectionReason]]</div>
                                <div class="td fg05">[[_formatAmount(inv.paid)]]€</div>                             
                                <div class="td fg1"><span class\$="invoice-status [[_getIconStatusClass(inv.status))]]"><iron-icon icon="vaadin:circle" class\$="statusIcon [[_getIconStatusClass(inv.status)]]"></iron-icon> [[inv.status]]</span></div>           
                            </div>
                            <template is="dom-repeat" items="[[inv.invoicingCodes]]" as="invco">
                                <div class="tr">
                                    <div class="td fg1"></div>
                                    <div class="td fg2"></div>
                                    <div class="td fg1"></div>
                                    <div class="td fg1 center">[[invco.invoicingCode]]</div>
                                    <div class="td fg1">[[formatDate(invco.invoiceDate,'date')]]</div>
                                    <div class="td fg1"><span class\$="[[_getTxtStatusColor(inv.statut,inv.totalAmount)]]">[[_formatAmount(invco.invoicedAmount)]]€</span></div>
                                    <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-green',inv.acceptedAmount)]]">[[_formatAmount(invco.acceptedAmount)]]€</span></div>
                                    <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-red',inv.refusedAmount)]]">[[_formatAmount(invco.refusedAmount)]]€</span></div>
                                    <div class="td fg3 rejectionInfo">[[invco.rejectionReason]]</div>
                                    <div class="td fg05"></div>                             
                                    <div class="td fg1"><span class\$="invoice-status [[_getIconStatusClass(invco.status))]]"><iron-icon icon="vaadin:circle" class\$="statusIcon [[_getIconStatusClass(invco.status)]]"></iron-icon>[[invco.status]]</span></div>                                      
                                </div>
                            </template>
                        </template>
                    </template>                   
                </div>
            </div>
            <div class="panel-button">
                <template is="dom-if" if="[[batchCanBeArchived]]">
                   <paper-button class="button button--other" on-tap="_archiveBatch">Archiver</paper-button>
                </template>
                <template is="dom-if" if="[[batchCanBeResent]]">
                   <paper-button class="button button--other" on-tap="_transferInvoicesForResending">Transférer pour réenvoi</paper-button>
                </template>
                <paper-button class="button button--other" on-tap="_closeDetailPanel">[[localize('clo','Close',language)]]</paper-button>              
            </div>
        </div>
`;
    }

    static get is() {
        return 'ht-msg-invoice-batch-detail';
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value : () => {}
            },
            user: {
                type: Object,
                value : () => {}
            },
            hcp: {
                type : Object,
                value : () => {}
            },
            selectedInvoiceForDetail:{
                type: Object,
                value : () => {}
            },
            isSendError:{
                type: Boolean,
                value: false
            },
            invoicesErrorMsg: {
                type: String,
                value: null
            },
            invoicesFromBatch:{
                type: Array,
                value: () => []
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            batchCanBeArchived:{
                type: Boolean,
                value: false
            },
            batchCanBeResent:{
                type: Boolean,
                value: false
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return ['_initializeDataProvider(api, user, selectedInvoiceForDetail, selectedInvoiceForDetail.*)', '_filterValueChanged(filter)'];
    }

    _initializeDataProvider(){
        this.set('invoicesFromBatch', [])
        if(!_.isEmpty(_.get(this, 'selectedInvoiceForDetail', {}))){
            this._showDetail()
        }
    }

    _closeDetailPanel(){
        this.set('invoicesFromBatch', [])
        this.set('batchCanBeArchived', false)
        this.set('batchCanBeResent', false)
        this.dispatchEvent(new CustomEvent('close-detail-panel', {bubbles: true, composed: true}))
    }

    _archiveBatch(){
        this.dispatchEvent(new CustomEvent('archive-batch', {detail: {inv: _.get(this, 'selectedInvoiceForDetail', {})}, bubbles: true, composed: true}))
    }

    _transferInvoicesForResending(){
        this.dispatchEvent(new CustomEvent('transfer-invoices-for-resending', {detail: {inv: _.get(this, 'selectedInvoiceForDetail', {})}, bubbles: true, composed: true}))
    }

    _showDetail() {
            this.set('batchCanBeArchived', false)
            this.set('batchCanBeResent', false)
            this.set('isLoading', true)
            this.set('invoicesErrorMsg', null);

            this.api.setPreventLogging()

            this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: _.get(this.selectedInvoiceForDetail, 'message.invoiceIds', []).map(i => i)}))
                .then(invoices => Promise.all(invoices.map(inv => this.api.crypto().extractCryptedFKs(inv, _.get(this.user, 'healthcarePartyId', null)).then(ids => [inv, ids.extractedKeys[0]]))))
                .then(invAndIdsPat =>
                    this.api.patient().getPatientsWithUser(this.user,new models.ListOfIdsDto({ids: _.uniq(invAndIdsPat.map(x => x[1]))})).then(pats => invAndIdsPat.map(it => [it[0], pats.find(p => p.id === it[1])]))
                )
                .then(invAndPats => invAndPats.map( ([inv, pat]) => ({
                    invoiceReference: _.get(inv, 'invoiceReference', null),
                    patient: _.get(pat, 'firstName', null)+" "+_.get(pat, 'lastName', null),
                    ssin: _.get(pat, 'ssin', null),
                    invoiceDate: _.get(inv, 'invoiceDate', null),
                    invoicedAmount: _.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.reimbursement || 0), 0),
                    acceptedAmount: (!!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 17)) || !!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 12))) ? 0.00 : _.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.paid || 0), 0),
                    refusedAmount: (!!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 17)) || !!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 12))) ? _.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.reimbursement || 0), 0) : (Number(_.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.reimbursement || 0), 0)) -  Number(_.get(inv, 'invoicingCodes', []).reduce((t,c) => t + (c.paid || 0), 0))),
                    rejectionReason: _.get(inv, 'error', null),
                    paid: false,
                    status: _.get(this.selectedInvoiceForDetail, 'messageInfo.invoiceStatus', null),
                    invoice: inv,
                    invoicingCodes: _.get(inv, 'invoicingCodes', []).map(code => ({
                        invoicingCode: _.get(code, 'code', null),
                        invoiceDate: _.get(code, 'dateCode', null),
                        invoicedAmount: Number(_.get(code, 'reimbursement', null)),
                        acceptedAmount:  (!!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 17)) || !!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 12))) ? 0.00 : ((_.get(code, 'paid', 0) >= 0) ? _.get(code, 'paid', 0) : 0.00),
                        refusedAmount:  (!!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 17)) || !!(_.get(this.selectedInvoiceForDetail, 'message.status', null) & (1 << 12))) ? Number(_.get(code, 'reimbursement', 0)) : (_.get(code, 'paid', 0) >= 0) ? (Number(code.reimbursement) - Number(code.paid)) : 0.00,
                        rejectionReason: _.get(code, 'error', null),
                        paid: false,
                        accepted: _.get(code, 'accepted', null),
                        status: _.get(code, 'accepted', false) === true ?  this.localize('nmcl-accepted','Accepted',this.language) : this.localize('nmcl-rejected','Rejected',this.language)
                    }))
                })))
                .then(infos => this.set('invoicesFromBatch', infos))
                .then(() => this.api.message().getChildren(_.get(this.selectedInvoiceForDetail, 'message.id', null)))
                .then((msgs) => Promise.all(_.map(msgs.filter(m => m.subject && ['920999','920099', '920098', '920900'].includes(m.subject.substr(0,6))), (msg => this.api.document().findByMessage(this.user.healthcarePartyId, msg)))))
                .then((docs) => Promise.all(_.flatMap(docs).filter(d => !_.endsWith(d.name, '_parsed_records') && _.endsWith(d.name, '_records') && d.mainUti === "public.json").map(d => this.api.document().getAttachment(d.id, d.attachmentId))))
                .then((attachs) => {
                    this.api.setPreventLogging(false)
                    attachs.forEach( a => {

                        if (typeof a === "string"){
                            try { a = JSON.parse( this.cleanStringForJsonParsing(a) ) } catch (ignored) {}
                        } else if (typeof a === "object") {
                            try { a = JSON.parse( this.cleanStringForJsonParsing(new Uint8Array(a).reduce((data, byte) => data + String.fromCharCode(byte), ''))); } catch (ignored) {}
                        }

                        const zone1and90 = _.get(a, 'message', []).find(enr => _.get(enr, 'zones', []).find(z => z.zone === "1" || z.zone === "90"))
                        let errorString = ''
                        Object.keys(_.get(zone1and90, 'errorDetail', [])).find(key => {
                            if(key.includes('rejectionCode')) {
                                if( parseInt(zone1and90.errorDetail[key]) > 0 ){
                                    const index = key.replace('rejectionCode',"")
                                    errorString = zone1and90.errorDetail['rejectionDescr' + index] + ' '
                                    return zone1and90.errorDetail['rejectionDescr' + index] && zone1and90.errorDetail['rejectionDescr' + index].length
                                }
                            }
                            return false
                        })

                        this.set('invoicesErrorMsg',errorString);

                        const zone200 = _.get(a, 'message', []).find(enr => enr.zones.find(z => z.zone === "200"))
                        const zone300 = _.get(a, 'message', []).find(enr => enr.zones.find(z => z.zone === "300"))
                        const zone400 = _.get(a, 'message', []).find(enr => enr.zones.find(z => z.zone === "400"))
                        const zone500 = _.get(a, 'message', []).find(enr => enr.zones.find(z => z.zone === "500"))

                        let globalError = _.compact(_.uniq([zone200 && this.SEG_getErrSegment_200(zone200.zones || []),
                            zone300 && this.SEG_getErrSegment_300(zone300.zones || []),
                            zone400 && this.SEG_getErrSegment_400(zone400.zones || []),
                            zone500 && this.SEG_getErrSegment_500(zone500.zones || [])]))

                        this.set('invoicesErrorMsg',this.invoicesErrorMsg+" "+globalError);

                    })
                }).finally(()=>{
                    this._batchCanBeArchived()
                    this.set('batchCanBeResent', _.get(this.selectedInvoiceForDetail, 'messageInfo.sendError', null) ? _.get(this.selectedInvoiceForDetail, 'messageInfo.sendError', null) : false)
                    this.set('isLoading', false)
                    this.api.setPreventLogging(false)
            })

    }

    cleanStringForJsonParsing(inputValue) {
        return inputValue
            .replace(/\\n/g, "\\n")
            .replace(/\\'/g, "\\'")
            .replace(/\\"/g, '\\"')
            .replace(/\\&/g, "\\&")
            .replace(/\\r/g, "\\r")
            .replace(/\\t/g, "\\t")
            .replace(/\\b/g, "\\b")
            .replace(/\\f/g, "\\f")
            .replace(/[\u0000-\u0019]+/g,"")
    }

    _getInvoiceReference(){
        return _.get(this.selectedInvoiceForDetail, 'messageInfo.invoiceNumber', null)
    }

    _sortInvoiceListByInvoiceRef(listOfInvoice) {
        return _.sortBy(listOfInvoice, ['invoiceReference'], ['asc'])
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

    SEG_getErrSegment_200(zones){
        var erreur = '';

        //Erreur sur le nom du message
        if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value !== '00'){
            if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '10'){
                erreur += 'Nom du message => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '11'){
                erreur += 'Nom du message => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '20'){
                erreur += 'Nom du message => Codification inconnue<br>';
            }else if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '21'){
                erreur += 'Nom du message => Message non autorisé pour cet émetteur<br>';
            }else if(zones.find(z => z.zone === "2001") && zones.find(z => z.zone === "2001").value === '22'){
                erreur += 'Nom du message => # de 920000<br>';
            }
        }

        //Erreur sur le n° de version du message
        if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value !== '00'){
            if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '10'){
                erreur += 'N° version mess => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '11'){
                erreur += 'N° version mess => Erreur format<br>';
            }else if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '20'){
                erreur += 'N° version mess => N° de version n\'est plus d\'application<br>';
            }else if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '21'){
                erreur += 'N° version mess => N° de version pas encore d\'application<br>';
            }else if(zones.find(z => z.zone === "2011") && zones.find(z => z.zone === "2011").value === '30'){
                erreur += 'N° version mess => N° de version non autorisé pour ce flux<br>';
            }
        }

        //Erreur sur le type de message
        if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value !== '00'){
            if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '10'){
                erreur += 'Type de mess => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '11'){
                erreur += 'Type de mess => Erreur format<br>';
            }else if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '20'){
                erreur += 'Type de mess => Valeur non permise<br>';
            }else if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '30'){
                erreur += 'Type de mess => Message test dans un buffer de production (1er car zone 107 = P)<br>';
            }else if(zones.find(z => z.zone === "2021") && zones.find(z => z.zone === "2021").value === '31'){
                erreur += 'Type de mess => Message de production dans un buffer de test (1er car zone 107 = T)<br>';
            }
        }

        //Erreur sur le statut du message
        if(zones.find(z => z.zone === "2031") && zones.find(z => z.zone === "2031").value !== '00'){
            if(zones.find(z => z.zone === "2031") && zones.find(z => z.zone === "2031").value === '10'){
                erreur += 'Statut mess => Erreur format<br>';
            }else if(zones.find(z => z.zone === "2031") && zones.find(z => z.zone === "2031").value === '20'){
                erreur += 'Statut mess => Valeur non permise<br>';
            }
        }

        //Erreur sur la référence message institution ou prestataire de soins
        if(zones.find(z => z.zone === "2041") && zones.find(z => z.zone === "2041").value !== '00'){
            if(zones.find(z => z.zone === "2041") && zones.find(z => z.zone === "2041").value === '10'){
                erreur += 'Réf mess => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "2041") && zones.find(z => z.zone === "2041").value === '11'){
                erreur += 'Réf mess => Erreur format<br>';
            }
        }

        //Erreur sur la référence message O.A
        if(zones.find(z => z.zone === "2051") && zones.find(z => z.zone === "2051").value !== '00'){
            if(zones.find(z => z.zone === "2051") && zones.find(z => z.zone === "2051").value === '10'){
                erreur += 'Réf mess OA => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "2051") && zones.find(z => z.zone === "2051").value === '11'){
                erreur += 'Réf mess OA => Erreur format<br>';
            }
        }

        return erreur;
    }

    SEG_getErrSegment_300(zones){
        var erreur = '';

        //Erreur sur l'année et le mois de facturation
        if(zones.find(z => z.zone === "3001") && zones.find(z => z.zone === "3001").value !== '00'){
            if(zones.find(z => z.zone === "3001") && zones.find(z => z.zone === "3001").value === '10'){
                erreur += 'Année mois fact => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "3001") && zones.find(z => z.zone === "3001").value === '11'){
                erreur += 'Année mois fact => Erreur format<br>';
            }else if(zones.find(z => z.zone === "3001") && zones.find(z => z.zone === "3001").value === '20'){
                erreur += 'Année mois fact => Valeur non permise<br>';
            }
        }

        //Erreur sur le n° d'envoi
        if(zones.find(z => z.zone === "3011") && zones.find(z => z.zone === "3011").value !== '00'){
            if(zones.find(z => z.zone === "3011") && zones.find(z => z.zone === "3011").value === '10'){
                erreur += 'N° envoi => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "3011") && zones.find(z => z.zone === "3011").value === '11'){
                erreur += 'N° envoi => Erreur format<br>';
            }else if(zones.find(z => z.zone === "3011") && zones.find(z => z.zone === "3011").value === '40'){
                erreur += 'N° envoi => Signalisation de double fichier de facturation transmis<br>';
            }
        }

        //Erreur sur la date de création de la facture
        if(zones.find(z => z.zone === "3021")  && zones.find(z => z.zone === "3021").value !== '00'){
            if(zones.find(z => z.zone === "3021") && zones.find(z => z.zone === "3021").value === '10'){
                erreur += 'Date création facture => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "3021") && zones.find(z => z.zone === "3021").value === '11'){
                erreur += 'Date création facture => Erreur format<br>';
            }else if(zones.find(z => z.zone === "3021") && zones.find(z => z.zone === "3021").value === '20'){
                erreur += 'Date création facture => Date > date du jour<br>';
            }else if(zones.find(z => z.zone === "3021") && zones.find(z => z.zone === "3021").value === '21'){
                erreur += 'Date création facture => Date invraisemblable ( date < 01/01/2002)<br>';
            }
        }


        //Erreur sur le n° de version des instruction
        if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value !== '00'){
            if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value === '10'){
                erreur += 'N° version instruction => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value === '11'){
                erreur += 'N° version instruction => Erreur format<br>';
            }else if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value === '20'){
                erreur += 'N° version instruction => Valeur non permise<br>';
            }else if(zones.find(z => z.zone === "3041") && zones.find(z => z.zone === "3041").value === '21'){
                erreur += 'N° version instruction => Incompatibilité avec valeur reprise en zone 202<br>';
            }
        }

        //Erreur sur le nom de la personne de contact
        if(zones.find(z => z.zone === "3051") && zones.find(z => z.zone === "3051").value !== '00'){
            if(zones.find(z => z.zone === "3051") && zones.find(z => z.zone === "3051").value === '10'){
                erreur += 'Nom personne de contact => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "3051") && zones.find(z => z.zone === "3051").value === '11'){
                erreur += 'Nom personne de contact => Erreur format<br>';
            }
        }

        //Erreur sur le prenom de la personne de contact
        if(zones.find(z => z.zone === "3061") && zones.find(z => z.zone === "3061").value !== '00'){
            if(zones.find(z => z.zone === "3061") && zones.find(z => z.zone === "3061").value === '10'){
                erreur += 'Prénom personne de contact => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "3061") && zones.find(z => z.zone === "3061").value === '11'){
                erreur += 'Prénom personne de contact => Erreur format<br>';
            }
        }

        //Erreru sur le n° de tel de contact
        if(zones.find(z => z.zone === "3071") && zones.find(z => z.zone === "3071").value !== '00'){
            if(zones.find(z => z.zone === "3071") && zones.find(z => z.zone === "3071").value === '10'){
                erreur += 'N° téléphone => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "3071") && zones.find(z => z.zone === "3071").value === '11'){
                erreur += 'N° téléphone => Erreur format<br>';
            }
        }

        //Erreur sur le type de la facture
        if(zones.find(z => z.zone === "3081") && zones.find(z => z.zone === "3081").value !== '00'){
            if(zones.find(z => z.zone === "3081") && zones.find(z => z.zone === "3081").value === '10'){
                erreur += 'Type de la facture => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "3081") && zones.find(z => z.zone === "3081").value  === '11'){
                erreur += 'Type de la facture => Erreur format<br>';
            }else if(zones.find(z => z.zone === "3081") && zones.find(z => z.zone === "3081").value  === '20'){
                erreur += 'Type de la facture => Valeur non permise en fonction du secteur qui émet la facturation';
            }
        }

        //Erreur sur le type de facturation
        if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value !== '00'){
            if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value === '10'){
                erreur += 'Type de facturation => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value === '11'){
                erreur += 'Type de facturation => Erreur format<br>';
            }else if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value === '20'){
                erreur += 'Type de facturation => Valeur non permise en fonction du secteur qui émet la facturation';
            }else if(zones.find(z => z.zone === "3091") && zones.find(z => z.zone === "3091").value === '30'){
                erreur += 'Type de facturation => Valeur # de 1 ou 2 alors que la zone 308 = 3';
            }
        }

        return erreur;

    }

    SEG_getErrSegment_400(zones){
        var erreur = '';

        //Erreur sur le type de record
        if(zones.find(z => z.zone === "4001")  && zones.find(z => z.zone === "4001").value  !== '00'){
            if(zones.find(z => z.zone === "4001") && zones.find(z => z.zone === "4001").value === '10'){
                erreur +='Type de record => Zone obligatoire<br>';
            }else if(zones.find(z => z.zone === "4001") && zones.find(z => z.zone === "4001").value === '11'){
                erreur += 'Type de record => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "4001") && zones.find(z => z.zone === "4001").value === '20'){
                erreur += 'Type de record => Valeur non permise<br>';
            }
        }

        //Erreur sur le num de mut
        if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value  !== '00'){
            if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value === '10'){
                erreur += 'N° de mutualité => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value === '11'){
                erreur +='N° de mutualité => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value === '20'){
                erreur +='N° de mutualité => Numéro inconnu ou codification erronée<br>';
            }else if(zones.find(z => z.zone === "4011") && zones.find(z => z.zone === "4011").value === '21'){
                erreur += 'N° de mutualité => N° de mutualité non retrouvé dans le détail de la facturation<br>';
            }
        }

        //Erreur sur le num fact
        if(zones.find(z => z.zone === "4021") && zones.find(z => z.zone === "4021").value  !== '00'){
            if(zones.find(z => z.zone === "4021") && zones.find(z => z.zone === "4021").value === '10'){
                erreur +='N° de facture récapitulative => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "4021") && zones.find(z => z.zone === "4021").value === '11'){
                erreur += 'N° de facture récapitulative => Erreur de format<br>';
            }
        }

        //Erreur sur le signe montant a ou montant demande a
        if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value !== '00'){
            if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value === '11'){
                erreur += 'Montant demandé cpt a => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value === '40'){
                erreur += 'Montant demandé cpt a => Erreur code signe (# de + ou -)<br>';
            }else if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value === '41'){
                erreur +='Montant demandé cpt a => Discordance entre montant ci-mentionné et total du fichier facturation pour la mutualité<br>';
            }else if(zones.find(z => z.zone === "4041") && zones.find(z => z.zone === "4041").value === '20'){
                erreur += 'Montant demandé cpt a => Somme erronée<br>';
            }
        }

        //Erreur sur le signe montant b ou montant demande b
        if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value !== '00'){
            if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '11'){
                erreur += 'Montant demandé cpt b => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '15'){
                erreur +='Montant demandé cpt b => Zone # de 0 si l\'émetteur n\est pas une institution hospitalière - Zone signe # de «blanc» et émetteur de la facturation # d’une institution hospitalière<br>';
            }else if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '40'){
                erreur +='Montant demandé cpt b => Erreur code signe (# de + ou -)';
            }else if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '41'){
                erreur +='Montant demandé cpt b => Discordance entre montant ci-mentionné et total du fichier facturation pour la mutualité<br>';
            }else if(zones.find(z => z.zone === "4061") && zones.find(z => z.zone === "4061").value === '20'){
                erreur +='Montant demandé cpt b => Somme erronée<br>';
            }
        }

        //Erreur sur le signe montant a + b ou montant demande a + b
        if(zones.find(z => z.zone === "4081") && zones.find(z => z.zone === "4081").value !== '00'){
            if(zones.find(z => z.zone === "4081") && zones.find(z => z.zone === "4081").value === '11'){
                erreur +='Total montant demandés cpt a + cpt b => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "4081") && zones.find(z => z.zone === "4081").value === '20'){
                erreur +='Total montant demandé cpt a + cpt b => Montant # somme des montants cpt a et cpt b<br>';
            }else if(zones.find(z => z.zone === "4081") && zones.find(z => z.zone === "4081").value === '40'){
                erreur +='Total montant demandé cpt a + cpt b => Erreur code signe (# de + ou -)<br>';
            }
        }

        //Erreur sur le nb d'enreg
        if(zones.find(z => z.zone === "4091") && zones.find(z => z.zone === "4091").value !== '00'){
            if(zones.find(z => z.zone === "4091") && zones.find(z => z.zone === "4091").value === '10'){
                erreur += 'Nb de records détail => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "4091") && zones.find(z => z.zone === "4091").value === '11'){
                erreur +='Nb de records détail => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "4091") && zones.find(z => z.zone === "4091").value === '20'){
                erreur += 'Nb de records détail => Somme erronée<br>';
            }
        }

        //Erreur sur le num de controle par mutualite si 95 ou num de controle de l'envoi si 96
        if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "400").value !== '00'){
            if(zones.find(z => z.zone === "400") && zones.find(z => z.zone === "400").value === '95'){
                if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "4101").value === '10'){
                    erreur += 'N° de contrôle par mutualité => zone obligaoire non complétée<br>';
                }else if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "4101").value === '11'){
                    erreur +='N° de contrôle par mutualité => Erreur de format<br>';
                }
            }else if(zones.find(z => z.zone === "400") && zones.find(z => z.zone === "4101").value  === '96'){
                if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "4101").value === '10'){
                    erreur += 'N° de contrôle de l\'envoi => zone obligaoire non complétée<br>';
                }else if(zones.find(z => z.zone === "4101") && zones.find(z => z.zone === "4101").value === '11'){
                    erreur +='N° de contrôle de l\'envoi => Erreur de format<br>';
                }
            }
        }

        return erreur;
    }

    SEG_getErrSegment_500(zones){
        var erreur = '';

        //Erreur sur le type de record
        if(zones.find(z => z.zone === "5001") && zones.find(z => z.zone === "5001").value  !== '00'){
            if(zones.find(z => z.zone === "5001") && zones.find(z => z.zone === "5001").value === '10'){
                erreur +='Type de record => Zone obligatoire<br>';
            }else if(zones.find(z => z.zone === "5001") && zones.find(z => z.zone === "5001").value === '11'){
                erreur += 'Type de record => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "5001") && zones.find(z => z.zone === "5001").value === '20'){
                erreur += 'Type de record => Valeur non permise<br>';
            }
        }

        //Erreur sur le num de mut
        if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value !== '00'){
            if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value === '10'){
                erreur += 'N° de mutualité => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value === '11'){
                erreur +='N° de mutualité => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value === '20'){
                erreur +='N° de mutualité => Numéro inconnu ou codification erronée<br>';
            }else if(zones.find(z => z.zone === "5011") && zones.find(z => z.zone === "5011").value === '21'){
                erreur += 'N° de mutualité => N° de mutualité non retrouvé dans le détail de la facturation<br>';
            }
        }

        //Erreur sur le num fact
        if(zones.find(z => z.zone === "5021") && zones.find(z => z.zone === "5021").value !== '00'){
            if(zones.find(z => z.zone === "5021") && zones.find(z => z.zone === "5021").value === '10'){
                erreur +='N° de facture récapitulative => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "5021") && zones.find(z => z.zone === "5021").value === '11'){
                erreur += 'N° de facture récapitulative => Erreur de format<br>';
            }
        }

        //Erreur sur le signe montant a ou montant demande a
        if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value !== '00'){
            if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value === '11'){
                erreur += 'Montant demandé cpt a => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value === '40'){
                erreur += 'Montant demandé cpt a => Erreur code signe (# de + ou -)<br>';
            }else if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value === '41'){
                erreur +='Montant demandé cpt a => Discordance entre montant ci-mentionné et total du fichier facturation pour la mutualité<br>';
            }else if(zones.find(z => z.zone === "5041") && zones.find(z => z.zone === "5041").value === '20'){
                erreur += 'Montant demandé cpt a => Somme erronée<br>';
            }
        }

        //Erreur sur le signe montant b ou montant demande b
        if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value !== '00'){
            if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '11'){
                erreur += 'Montant demandé cpt b => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '15'){
                erreur +='Montant demandé cpt b => Zone # de 0 si l\'émetteur n\est pas une institution hospitalière - Zone signe # de «blanc» et émetteur de la facturation # d’une institution hospitalière<br>';
            }else if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '40'){
                erreur +='Montant demandé cpt b => Erreur code signe (# de + ou -)';
            }else if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '41'){
                erreur +='Montant demandé cpt b => Discordance entre montant ci-mentionné et total du fichier facturation pour la mutualité<br>';
            }else if(zones.find(z => z.zone === "5061") && zones.find(z => z.zone === "5061").value === '20'){
                erreur +='Montant demandé cpt b => Somme erronée<br>';
            }
        }

        //Erreur sur le signe montant a + b ou montant demande a + b
        if(zones.find(z => z.zone === "5081") && zones.find(z => z.zone === "5081").value !== '00'){
            if(zones.find(z => z.zone === "5081") && zones.find(z => z.zone === "5081").value === '11'){
                erreur +='Total montant demandés cpt a + cpt b => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "5081") && zones.find(z => z.zone === "5081").value === '20'){
                erreur +='Total montant demandé cpt a + cpt b => Montant # somme des montants cpt a et cpt b<br>';
            }else if(zones.find(z => z.zone === "5081") && zones.find(z => z.zone === "5081").value === '40'){
                erreur +='Total montant demandé cpt a + cpt b => Erreur code signe (# de + ou -)<br>';
            }
        }

        //Erreur sur le nb d'enreg
        if(zones.find(z => z.zone === "5091") && zones.find(z => z.zone === "5091").value !== '00'){
            if(zones.find(z => z.zone === "5091") && zones.find(z => z.zone === "5091").value === '10'){
                erreur += 'Nb de records détail => Zone obligatoire non complétée<br>';
            }else if(zones.find(z => z.zone === "5091") && zones.find(z => z.zone === "5091").value === '11'){
                erreur +='Nb de records détail => Erreur de format<br>';
            }else if(zones.find(z => z.zone === "5091") && zones.find(z => z.zone === "5091").value === '20'){
                erreur += 'Nb de records détail => Somme erronée<br>';
            }
        }

        //Erreur sur le num de controle par mutualite si 95 ou num de controle de l'envoi si 96
        if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value !== '00'){
            if(zones.find(z => z.zone === "500") && zones.find(z => z.zone === "500").value === '95'){
                if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value === '10'){
                    erreur += 'N° de contrôle par mutualité => zone obligaoire non complétée<br>';
                }else if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value === '11'){
                    erreur +='N° de contrôle par mutualité => Erreur de format<br>';
                }
            }else if(zones.find(z => z.zone === "500") && zones.find(z => z.zone === "500").value === '96'){
                if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value === '10'){
                    erreur += 'N° de contrôle de l\'envoi => zone obligatoire non complétée<br>';
                }else if(zones.find(z => z.zone === "5101") && zones.find(z => z.zone === "5101").value === '11'){
                    erreur +='N° de contrôle de l\'envoi => Erreur de format<br>';
                }
            }
        }

        return erreur;
    }

    _getBatchStatus(batchStatus){
           return  !!(batchStatus & (1 << 21)) ? "archived" :
                   !!(batchStatus & (1 << 17)) ? "error" :
                   !!(batchStatus & (1 << 16)) ? "partially accepted" :
                   !!(batchStatus & (1 << 15)) ? "fully accepted" :
                   !!(batchStatus & (1 << 12)) ? "rejected":
                   !!(batchStatus & (1 << 11)) ? "treated":
                   !!(batchStatus & (1 << 10)) ? "acceptedForTreatment":
                   !!(batchStatus & (1 << 9))  ? "successfullyTransmittedToOA":
                   !!(batchStatus & (1 << 8))  ? "pending":
                   !!(batchStatus & (1 << 7))  ? "pending": ""
    }

    _batchCanBeArchived(){
        const res = this._getBatchStatus(_.get(this, 'selectedInvoiceForDetail.message.status', null)) !== "archived"
        this.set('batchCanBeArchived', res)
    }

}

customElements.define(HtMsgInvoiceBatchDetail.is, HtMsgInvoiceBatchDetail);
