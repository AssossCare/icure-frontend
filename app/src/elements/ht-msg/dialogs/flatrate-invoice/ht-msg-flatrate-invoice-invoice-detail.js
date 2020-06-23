import '../../../dynamic-form/ckmeans-grouping.js';
import '../../../../styles/vaadin-icure-theme';
import '../../../../styles/spinner-style';
import '../../../../styles/scrollbar-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/dialog-style';
import '../../../ht-spinner/ht-spinner';
import '../../../ht-pat/dialogs/ht-pat-invoicing-dialog';

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
class HtMsgFlatrateInvoiceInvoiceDetail extends TkLocalizerMixin(PolymerElement) {
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
            
            .modalDialog{
                height: 350px;
                width: 600px;
             }

             .modalDialogContent{
                  height: calc(100% - 113px);
                  width: auto;
                  margin: 0;
                  background-color: white;
                  position: relative;
                  padding: 10px;
             }
             
             #correctiveDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
             }
             
             .correctiveDialog{               
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
                    
            .flatrate-person-container{
                height: auto;
                width: auto;
            }
            
             .headerInfoLine{
                width: 100%;
                padding: 4px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .headerInfoField{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                align-content: stretch;
                width: calc(100% / 4);
                padding: 0 8px;
                box-sizing: border-box;
            }

            .headerLabel{
                font-weight: bold;
            }

            .flatrate-result-container{
                margin-bottom: 12px;
                border: 1px solid var(--app-background-color-dark);
            }

            .headerMasterTitle{
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
            }

            .flatrate-sub-container{
                height: auto;
                width: auto;
                margin: 10px;
                border: 1px solid var(--app-background-color-dark);
            }
            
            .closeBtn{
                height: 14px;
                width: 14px;
                cursor: pointer;
            }
                      
        </style>
        
        <div class="panel">
           <div class="panel-title">
                [[localize('inv-num-inv-detail', 'Detail of invoice number', language)]] [[_getInvoiceReference(selectedInvoiceForDetail)]]              
            </div>
            <div class="panel-search">
                <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{filter}}"></dynamic-text-field>
            </div>
            <div class="panel-content">
                <div class="table">
                    <div class="tr th">                                             
                        <div class="td fg2">[[localize('inv_pat','Patient',language)]]</div>
                        <div class="td fg1">[[localize('inv_niss','Niss',language)]]</div>
                        <div class="td fg1">[[localize('nmcl','Nmcl',language)]]</div>
                        <div class="td fg1">[[localize('inv_date_fact','Invoice date',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_oa','Oa',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_pat','Patient',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_supp','Extra',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_tot','Total',language)]]</div>
                        <div class="td fg3">Motif rejet</div>                        
                        <div class="td fg1">[[localize('inv_stat','Status',language)]]</div>                                          
                    </div>
                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                    <template is="dom-if" if="[[!isLoading]]">
                        <template is="dom-repeat" items="[[_getInvoicingCodes(selectedInvoiceForDetail)]]" as="invco">                       
                             <div class="tr">                                 
                                 <div class="td fg2">[[selectedInvoiceForDetail.patientName]]</div>
                                 <div class="td fg1">[[selectedInvoiceForDetail.patientSsin]]</div>
                                 <div class="td fg1 center">[[invco.code]]</div>
                                 <div class="td fg1">[[formatDate(selectedInvoiceForDetail.invoiceDate,'date')]]</div>
                                 <div class="td fg1"><span class\$="[[_getTxtStatusColor(inv.statut,inv.totalAmount)]]">[[_formatAmount(invco.reimbursement)]]€</span></div>
                                 <div class="td fg1"><span class\$="[[_getTxtStatusColor(inv.statut,inv.totalAmount)]]">[[_formatAmount(invco.patientIntervention)]]€</span></div>
                                 <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-green',inv.acceptedAmount)]]">[[_formatAmount(invco.doctorSupplement)]]€</span></div>
                                 <div class="td fg1"><span class\$="[[_getTxtStatusColor('force-red',inv.refusedAmount)]]">[[_formatAmount(invco.totalAmount)]]€</span></div>
                                 <div class="td fg3 rejectionInfo">[[invco.error]]</div>                            
                                 <div class="td fg1"><span class\$="invoice-status [[_getIconStatusClass(selectedInvoiceForDetail.statut))]]"><iron-icon icon="vaadin:circle" class\$="statusIcon [[_getIconStatusClass(selectedInvoiceForDetail.statut)]]"></iron-icon>[[selectedInvoiceForDetail.statut]]</span></div>                                      
                             </div>   
                        </template>
                    </template>                   
                </div>
            </div>
            <div class="panel-button">
                <template is="dom-if" if="[[isRejected]]" restamp="true">
                    <paper-button class="button button--other" on-tap="_flagInvoiceAsLostConfirmationDialog" data-invoice-id\$="[[selectedInvoiceForDetail.invoice.id]]">
                         <iron-icon icon="error" data-invoice-id\$="[[selectedInvoiceForDetail.invoice.id]]"></iron-icon> 
                         &nbsp; [[localize('invoiceIsUnrecoverable',"Unrecoverable invoice",language)]]
                     </paper-button>  
                </template>              
                <template is="dom-if" if="[[!isRejected]]" restamp="true">
                    <paper-button class="button button--other" on-tap="_openCancelConfirmationDialog" >[[localize('btn-can-inv', 'Cancel invoice', language)]]</paper-button> 
                </template>
                <template is="dom-if" if="[[isRejected]]" restamp="true">
                    <paper-button class="button button--save" on-tap="_openCorrectiveDialog" >[[localize('btn-correct', 'Correct', language)]]</paper-button>
                </template>
                <paper-button class="button button--other" on-tap="_closeDetailPanel">[[localize('clo','Close',language)]]</paper-button>              
            </div>
        </div>
        
        <ht-pat-invoicing-dialog id="invoicingForm" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[selectedInvoiceForDetail.patient]]" i18n="[[i18n]]" resources="[[resources]]" on-close-invoicing-dialog="_closeInvoicingDialog"></ht-pat-invoicing-dialog>
        
        <paper-dialog class="modalDialog" id="flagInvoiceAsLostConfirmationDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="modalDialogContent m-t-50">
                <h3 class="textAlignCenter">[[localize('areYouSureFlagInvoiceAsLost','Are you sure you wish to flag invoice as permanently lost?',language)]]</h3>
                <p class="textAlignCenter m-t-50 bold">[[localize('unrecoverableAction','This action is unrecoverable',language)]].</p>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeLostDialog">[[localize('can','Cancel',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_flagInvoiceAsLost"><iron-icon icon="check-circle"></iron-icon> [[localize('confirm','Confirm',language)]]</paper-button>
            </div>
        </paper-dialog>
        
        <paper-dialog class="modalDialog" id="cancelInvoiceDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="modalDialogContent m-t-50">
                <h3 class="textAlignCenter">[[localize('confirm-cancel','Are you sure you wish to cancel this invoice?',language)]]</h3>
                <p class="textAlignCenter m-t-50 bold"></p>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeCancelDialog">[[localize('can','Cancel',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_cancelInvoice"><iron-icon icon="check-circle"></iron-icon> [[localize('confirm','Confirm',language)]]</paper-button>
            </div>
        </paper-dialog>
        
        <paper-dialog class="" id="correctiveDialog" no-cancel-on-outside-click no-cancel-on-esc-key>
            <div class="content correctiveDialog">
                <div class="title">
                    [[localize('flatrate-correction-invoice', 'Correction of invoice', language)]]
                </div>
                <div class="patient-info">
                    <div class="flatrate-sub-container">
                        <div class="flatrate-person-container">
                             <div class="headerMasterTitle headerLabel">[[localize('mda-patientData', 'Patient data', language)]]</div>
                             <div class="headerInfoLine">
                                 <div class="headerInfoField">
                                     <span class="headerLabel">[[localize('mda-name', 'Name', language)]]: &nbsp;</span> [[selectedInvoiceForDetail.patient.lastName]]
                                 </div>
                                 <div class="headerInfoField">
                                     <span class="headerLabel">[[localize('mda-firstName', 'First name', language)]]: &nbsp;</span> [[selectedInvoiceForDetail.patient.firstName]]
                                 </div>
                                 <div class="headerInfoField">
                                     <span class="headerLabel">[[localize('mda-gender', 'Gender', language)]]: &nbsp;</span> [[_localizeGender(selectedInvoiceForDetail.patient.gender)]]
                                 </div>
                             </div>
                             <div class="headerInfoLine">
                                 <div class="headerInfoField">
                                     <span class="headerLabel">[[localize('mda-niss', 'Niss', language)]]: &nbsp;</span> [[_formatNissNumber(selectedInvoiceForDetail.patientSsin)]]
                                 </div>
                                 <div class="headerInfoField">
                                     <span class="headerLabel">[[localize('mda-birdthDate', 'Birth date', language)]]: &nbsp;</span> [[_formatDate(selectedInvoiceForDetail.patient.birthDate)]]
                                 </div>                               
                             </div>
                        </div>                   
                    </div>
                </div>
                <div class="invoice-info">
                    <div class="flatrate-sub-container">
                        <div class="flatrate-person-container">
                        <div class="headerMasterTitle headerLabel">[[localize('flatrate-invoice-info', 'Invoice informations', language)]]</div>
                             <div class="table">
                                 <div class="tr th">                                             
                                     <div class="td fg0">[[localize('flatrate-inv-code','Code',language)]]</div>
                                     <div class="td fg2">[[localize('flatrate-inv-label','Label',language)]]</div>
                                     <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_oa','Oa',language)]]</div>
                                     <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_pat','Patient',language)]]</div>
                                     <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_supp','Extra',language)]]</div>
                                     <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_tot','Total',language)]]</div>      
                                     <div class="td fg0">[[localize('','',language)]]</div>                                  
                                 </div>
                                 <ht-spinner active="[[isLoading]]"></ht-spinner>
                                 <template id="invoicingCodeList" is="dom-repeat" items="[[selectedInvoiceForCorrection.invoicingCodes]]" as="nmcl">              
                                    <div class="tr">                                 
                                        <div class="td fg0">[[nmcl.code]]</div>
                                        <div class="td fg2">[[nmcl.label]]</div>
                                        <div class="td fg1"><span class\$="">[[nmcl.reimbursement]] €</span></div>
                                        <div class="td fg1"><span class\$="">[[nmcl.patientIntervention]] €</span></div>
                                        <div class="td fg1"><span class\$="">[[nmcl.doctorSupplement]] €</span></div>
                                        <div class="td fg1"><span class\$="">[[nmcl.totalAmount]] €</span></div>
                                        <div class="td fg0 center"><iron-icon icon="vaadin:close" id="[[nmcl.id]]" class="closeBtn" on-tap="_deleteNmcl"></iron-icon></div>
                                    </div>                                    
                                 </template>                   
                             </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button button--save" on-tap="_correctInvoice">[[localize('btn-correct','Correct',language)]]</paper-button>      
                <paper-button class="button button--other" on-tap="_closeCorrectiveDialog">[[localize('clo','Close',language)]]</paper-button>      
            </div>
        </paper-dialog>

`;
    }

    static get is() {
        return 'ht-msg-flatrate-invoice-invoice-detail';
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
            selectedInvoiceForCorrection: {
              type: Object,
              value: () => {}
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            isRejected:{
                type: Boolean,
                value: false
            }
        };
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    static get observers() {
        return ['_selectedInvoiceForDetailChanged(selectedInvoiceForDetail.statut, selectedInvoiceForDetail.*)'];
    }

    _selectedInvoiceForDetailChanged(){
        this.set('isRejected', false)
        if(_.get(this, 'selectedInvoiceForDetail.statut', null)){
            this.set('isRejected',_.get(this, 'selectedInvoiceForDetail.statut', null) !== "A envoyer")
            console.log(this.isRejected)
        }

    }

    _closeDetailPanel(){
        this.set('selectedInvoiceForCorrection', {})
        this.set('isRejected', false)
        this.set('isLoading', false)
        this.set('selectedInvoiceForDetail', {})
        this.dispatchEvent(new CustomEvent('close-invoice-detail-panel', {bubbles: true, composed: true}))
    }

    _getInvoiceReference(){
        return _.get(this.selectedInvoiceForDetail, 'invoiceReference', null)
    }

    _getInvoicingCodes(){
        return _.get(this.selectedInvoiceForDetail, 'invoice.invoicingCodes', [])
    }

    _formatAmount(amount){
        return this.findAndReplace(((Number(amount).toFixed(2)).toString()),'.',',')
    }

    findAndReplace(string, target, replacement) {
        for (let i = 0; i < string.length; i++) { string = string.replace(target, replacement); }
        return string;
    }

    _getIconStatusClass(status) {
        //console.log("geticonstatus",status)
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
        //console.log("gettxtstatus",status,amount)
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

    _flagInvoiceAsLostConfirmationDialog() {
        this.shadowRoot.querySelector("#flagInvoiceAsLostConfirmationDialog").open()
    }

    _flagInvoiceAsLost() {
        if(_.get(this, 'selectedInvoiceForDetail.invoiceId', null)){
            this.api.invoice().getInvoice(_.get(this, 'selectedInvoiceForDetail.invoiceId', null))
                .then(invoice => {
                    invoice.invoicingCodes.map(ic => {
                        ic.canceled = true;
                        ic.lost = true;
                        ic.accepted = false;
                        ic.pending = false;
                        ic.resent = false;
                        ic.archived = false;
                        return ic;
                    })
                    invoice.error = "Flagged as lost"
                    return Promise.resolve(invoice)
                })
                .then(inv => this.api.invoice().modifyInvoice(inv))
                .then(inv => this.api.register(inv, 'invoice'))
                .finally(() => {
                    this.set('flagInvoiceAsLostId', null)
                    this._closeDetailPanel()
                    this._closeLostDialog()
                    this._getMessage()
                })
        }
    }

    _closeLostDialog(){
        this.shadowRoot.querySelector("#flagInvoiceAsLostConfirmationDialog").close()
    }

    _getMessage(){
        this.dispatchEvent(new CustomEvent('get-message', {bubbles: true, composed: true, detail: {refreshAll: false}}))
    }

    _openCancelConfirmationDialog(){
        this.shadowRoot.querySelector("#cancelInvoiceDialog").open()
    }

    _closeCancelDialog(){
        this.shadowRoot.querySelector("#cancelInvoiceDialog").close()
    }

    _cancelInvoice(){
        if(_.get(this, 'selectedInvoiceForDetail.invoiceId', null)){
            this.api.invoice().getInvoice(_.get(this, 'selectedInvoiceForDetail.invoiceId', null))
                .then(inv => this.api.invoice().modifyInvoice( _.omit(inv, ['printedDate'])))
                .then(inv => this.api.register(inv, 'invoice'))
                .finally(() => {
                    this._getMessage()
                    this._closeDetailPanel()
                })
        }
    }

    _closeInvoicingDialog(){
        this._closeDetailPanel()
        this._getMessage()
    }

    _openCorrectiveDialog(){
        this.set("selectedInvoiceForCorrection", _.cloneDeep(_.get(this.selectedInvoiceForDetail, 'invoice', {})))
        this.shadowRoot.querySelector("#correctiveDialog").open()
    }

    _closeCorrectiveDialog(){
        this.shadowRoot.querySelector("#correctiveDialog").close()
    }

    _localizeGender(gender){
        return gender ? this.localize('mda-gender-'+_.toLower(gender), gender, this.language) : null
    }

    _formatNissNumber(niss) {
        return niss ? ("" + niss).replace(/([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{3})([0-9]{2})/, '$1.$2.$3-$4.$5') : ''
    }

    _formatDate(date){
        return date ? moment(parseInt(date)).format("DD/MM/YYYY"): null
    }

    _deleteNmcl(e){
        if(_.get(e, 'target.id', null)){
            _.remove(_.get(this.selectedInvoiceForCorrection, 'invoicingCodes', []), ic => _.get(ic, 'id', null) === _.get(e, 'target.id', ''))
            this.shadowRoot.querySelector('#invoicingCodeList').render()
        }
    }

    _correctInvoice(){

        this.selectedInvoiceForCorrection.printedDate = moment().format('YYYYMMDD')
        _.get(this, 'selectedInvoiceForCorrection.invoicingCodes', []).map(ic => {
            ic.pending = false
            ic.resent = false
        })

        this.api.invoice().modifyInvoice(this.selectedInvoiceForCorrection)
            .then(inv => {
               console.log(inv)
            }).finally(() => {
                this._closeDetailPanel()
                this._closeCorrectiveDialog()
                this._getMessage()
            })
    }
}

customElements.define(HtMsgFlatrateInvoiceInvoiceDetail.is, HtMsgFlatrateInvoiceInvoiceDetail);
