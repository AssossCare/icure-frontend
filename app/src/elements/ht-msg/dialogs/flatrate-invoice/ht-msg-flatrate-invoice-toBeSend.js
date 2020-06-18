import '../../../dynamic-form/ckmeans-grouping.js'
import '../../../../styles/vaadin-icure-theme.js'
import '../../../../styles/spinner-style.js'
import '../../../../styles/scrollbar-style'
import '../../../../styles/shared-styles'
import '../../../../styles/buttons-style'
import '../../../../styles/dialog-style'
import '../../../../styles/invoicing-style';
import '../../../ht-spinner/ht-spinner.js'
import '../../../ht-pat/dialogs/medicalhouse/ht-pat-flatrate-utils.js';


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

import moment from 'moment/src/moment'
import _ from 'lodash/lodash'
import * as models from 'icc-api/dist/icc-api/model/models'

import {PolymerElement, html} from '@polymer/polymer'
import {TkLocalizerMixin} from "../../../tk-localizer"
import promiseLimit from "promise-limit"
import * as retry from "icc-api/dist/icc-x-api/utils/net-utils"
import mustache from "mustache"

class HtMsgFlatrateInvoiceToBeSend extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
        
        <style include="shared-styles spinner-style scrollbar-style buttons-style dialog-style invoicing-style">
            .panel{
                margin: 5px;
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
            
            .assurability--redStatus{
                color: var(--app-status-color-nok);
                height: 8px;
                width: 8px;
            }

            .assurability--greenStatus{
                color: var(--app-status-color-ok);
                height: 8px;
                width: 8px;
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

            .invoice-status--orangeStatus{
                background: #fcdf354d;
            }
            
            .statusIcon{
                height: 8px;
                width: 8px;
                background: transparent !important
            }
            .statusIcon.invoice-status--orangeStatus {
                color: var(--app-status-color-pending);
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
            
            .tr-item{
                cursor: pointer;
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
             
             #checkBeforeSendingDialog{
                    height: 500px;
                    width: 800px;
             }

             .unsentInvoice{
                 height: 250px;
                 width: auto;
             }

             previousCheck{
                 height: 100px;
                 width: auto;
             }

             .errorBeforeSendInvoice{
                 color: var(--app-status-color-nok);
                 font-weight: bold;
             }

             #patientsWithoutAssurabilityGrid{
                 max-height: 200px;
                 overflow: auto;
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
             
             .content-container{
                padding: 4px;
                width: auto;
             }
             
             .previousCheckContainer{
             
             }
             
             .listOfUnsentInvoiceContainer{
             
             }
             
             .tr-group{
                background-color: #f4f4f6;
                font-weight: bold;
                }
   
        </style>
        
        <div class="panel">
            <div class="panel-title">
                <div class="title">
                    [[localize('inv-to-be-send', 'Invoice to be send', language)]]
                    <span class="batchNumber batchPending">{{_forceZeroNum(listOfInvoice.length)}}</span>
                 </div>                 
            </div>
            <div class="panel-search">
                <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{filter}}"></dynamic-text-field>
            </div>
            <div class="panel-content">
                <div class="table">
                    <div class="tr th">
                        <div class="td fg02"></div>                     
                        <div class="td fg05">[[localize('inv_mut','Mutual',language)]]</div>
                        <div class="td fg1">[[localize('inv_num_fac','Invoice number',language)]]</div>
                        <div class="td fg2">[[localize('inv_pat','Patient',language)]]</div>
                        <div class="td fg1">[[localize('inv_niss','Inss',language)]]</div>
                        <div class="td fg1">[[localize('inv_date','Invoice date',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_oa','Oa',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_pat','Patient',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_supp','Extra',language)]]</div>
                        <div class="td fg1">[[localize('inv_batch_amount','Amount',language)]]<br/>[[localize('inv_tot','Total',language)]]</div>
                        <div class="td fg1">[[localize('inv_stat','Status',language)]]</div>
                    </div>
                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                    <template is="dom-if" if="[[!isLoading]]">
                        <template is="dom-repeat" items="[[filteredListOfInvoice]]" as="group" id="invoiceList">
                            <div class="tr tr-group">
                                <div class="td fg4">[[_getGroupInformation(group)]]</div>
                                <div class="td fg1"></div>
                                <div class="td fg1"></div>
                                <div class="td fg1">[[_getTotalOfGroup(group, 'oa')]]€</div>
                                <div class="td fg1">[[_getTotalOfGroup(group, 'pat')]]€</div>
                                <div class="td fg1">[[_getTotalOfGroup(group, 'ext')]]€</div>
                                <div class="td fg1">[[_getTotalOfGroup(group, 'tot')]]€</div>
                                <div class="td fg1"></div>
                            </div>
                            <template is="dom-repeat" items="[[group]]" as="inv">
                                <div class="tr tr-item" id="[[inv.invoiceId]]" data-item$="[[inv]]" on-tap="_displayInfoInvoicePanel">
                                    <div class="td fg02"><vaadin-checkbox checked="[[inv.sendingFlag]]" id="[[inv.uuid]]" on-checked-changed="_selectedSendingFlagChanged" on-tap="_stopPropagation"></vaadin-checkbox></div>
                                    <div class="td fg02">
                                        <template is="dom-if" if="[[inv.realizedByTrainee]]">
                                            <iron-icon icon="vaadin:academy-cap" class="info-icon"></iron-icon>
                                        </template>
                                    </div>
                                    <div class="td fg05">[[inv.insuranceCode]]</div>
                                    <div class="td fg1">[[inv.invoiceReference]]</div>
                                    <div class="td fg2">
                                        <template is="dom-if" if="[[!inv.insurabilityCheck]]">
                                            <iron-icon icon="vaadin:circle" class="assurability--redStatus"></iron-icon>
                                        </template>
                                        <template is="dom-if" if="[[inv.insurabilityCheck]]">
                                            <iron-icon icon="vaadin:circle" class="assurability--greenStatus"></iron-icon>
                                        </template>
                                        [[inv.patientName]]
                                    </div>
                                    <div class="td fg1">[[inv.patientSsin]]</div>
                                    <div class="td fg1">[[formatDate(inv.invoiceDate,'date')]]</div>
                                    <div class="td fg1">[[inv.reimbursement]]€</div>
                                    <div class="td fg1">[[inv.patientIntervention]]€</div>
                                    <div class="td fg1">[[inv.doctorSupplement]]€</div>
                                    <div class="td fg1">[[inv.totalAmount]]€</div>
                                    <div class="td fg1">
                                    <span class="invoice-status invoice-status--orangeStatus">
                                        <iron-icon icon="vaadin:circle" class="statusIcon invoice-status--orangeStatus"></iron-icon>
                                        [[inv.statut]]
                                     </span>
                                    </div>
                                </div>
                            </template>
                        </template>
                    </template>              
                </div>
            </div>
            <div class="panel-button">
                <template is="dom-if" if="[[!isLoading]]" restamp="true">
                    <paper-button class="button button--other" on-tap="_refreshInvoiceList">[[localize('refresh','Refresh',language)]]</paper-button>
                    <paper-button class="button button--other" on-tap="_exportFlatRateInvoicing">[[localize('inv_gen','Generate invoice',language)]]</paper-button>
                    <template is="dom-if" if="[[api.tokenIdMH]]" restamp="true">
                        <paper-button on-tap="_checkBeforeSend" class="button button--save" disabled="[[cannotSend]]">[[localize('inv_send','Send',language)]]</paper-button>
                    </template>
                    <template is="dom-if" if="[[!api.tokenIdMH]]" restamp="true">                   
                        <paper-button on-tap="" class="button button--other" disabled title="Pas de connexion ehealth active">[[localize('inv_send','Send',language)]]</paper-button>
                    </template> 
                </template>
            </div>
        </div>  
        
        <paper-dialog class="modalDialog" id="selectMonthDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('inv-trt-in-prog','treatment in progress',language)]]</h2>
            <div class="modalDialogContent m-t-50">
                <div class="textAlignCenter">

                    <div class="exportMonthPicker pb20">
                        <div class="exportMonthPickerTitle"><iron-icon icon="vaadin:calendar" style="max-width:20px; max-height:20px; margin-right:7px;"></iron-icon> [[localize('j20_monthToGenerate','Month to generate',language)]]</div>
                        <vaadin-combo-box id="exportedMonth" filtered-items="[[_getExportMonthsList()]]" item-label-path="label" item-value-path="id" label="[[localize('month','Month',language)]]" value="[[_getExportCurrentMonth()]]"></vaadin-combo-box>
                        <vaadin-combo-box id="exportedYear" filtered-items="[[_getExportYearsList()]]" item-label-path="label" item-value-path="id" label="[[localize('year','Year',language)]]" value="[[_getExportCurrentYear()]]"></vaadin-combo-box>

<!--                        <vaadin-checkbox checked="[[overrideBatchNumber]]" on-tap="_overrideBatchNumberGotChanged">[[localize('override_batchnr','Override batch number',language)]]</vaadin-checkbox>-->
<!--                        <template is="dom-if" if="[[overrideBatchNumber]]"><paper-input label="[[localize('batchnr','Batch number',language)]]" value="{{batchNumber}}" class="batchNumberInput"></paper-input></template>-->
                    </div>

                    <paper-button class="button button--save tool-btn m-t-20 f-s-1em bordered" id="largeButton" dialog-confirm on-tap="_exportFlatRateInvoicing_dialogResult"><iron-icon icon="icons:cloud-download" class="w30px h30px"></iron-icon> &nbsp; [[localize('invoicingExport','Télécharger la facturation',language)]]</paper-button>
                </div>   
            </div>        
        </paper-dialog>
        
         <paper-dialog class="modalDialog" id="sendingDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('inv-trt-in-prog','treatment in progress',language)]]</h2>
            <div class="modalDialogContent m-t-50">
                <div class="sendingSpinner">
                    <ht-spinner active="[[isSending]]"></ht-spinner>
                </div>
                <div class="prossessList">
                   <template is="dom-repeat" items="[[progressItem]]" as="pi">
                      <div>[[pi]]</div>
                   </template>
                </div>     
            </div>        
        </paper-dialog>
        
        <ht-pat-flatrate-utils id="flatrateUtils" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" i18n="[[i18n]]" resources="[[resources]]" no-print></ht-pat-flatrate-utils>
`
    }

    static get is() {
        return 'ht-msg-flatrate-invoice-to-be-send'
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value: () => {
                }
            },
            user: {
                type: Object,
                value: () => {
                }
            },
            hcp: {
                type: Object,
                value: () => {
                }
            },
            listOfInvoice: {
                type: Array,
                value: () => []
            },
            filteredListOfInvoice:{
              type: Array,
              value: () => []
            },
            filter:{
                type: String,
                value: null
            },
            cannotSend: {
                type: Boolean,
                value: false
            },
            checkBeforeSendEfact:{
                type: Object,
                value: () => ({
                    inamiCheck : false,
                    ssinCheck: false,
                    bceCheck: false,
                    ibanCheck: false,
                    bicCheck: false,
                    invoiceCheck100: false,
                    invoiceCheck200: false,
                    invoiceCheck300: false,
                    invoiceCheck306: false,
                    invoiceCheck400: false,
                    invoiceCheck500: false,
                    invoiceCheck600: false,
                    invoiceCheck900: false
                })
            },
            patientWithoutMutuality:{
                type: Array,
                value: () => []
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            isSending:{
                type: Boolean,
                value: false
            },
            progressItem:{
                type: Array,
                value: () => []
            },
            _loadingMessages: {
                type: Array,
                value: () => []
            }
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    static get observers() {
        return ['_initialize(api, user, listOfInvoice)', '_filterValueChanged(filter)']
    }

    _initialize(){
        if(_.size(_.get(this, 'listOfInvoice', [])) > 0) {
            this.set('filteredListOfInvoice', _.map(_.groupBy(_.get(this, 'listOfInvoice', []), 'parentInsuranceDto.code'), inv => inv))

            const lastSend = parseInt(localStorage.getItem('lastInvoicesSent')) ? this.api.moment(parseInt(localStorage.getItem('lastInvoicesSent'))).format('YYYY-MM-DD') : '2000-01-01'
            const maySend =  this.api.moment(lastSend).isSame(this.api.moment(Date.now()).format('YYYY-MM-DD'))
            this.set('cannotSend',maySend)

        }

    }

    _getGroupInformation(group){
        return _.get(_.head(group), 'parentInsuranceDto.code', null)+": "+_.get(_.head(group), 'parentInsuranceDto.name.'+this.language, null)
    }

    _getTotalOfGroup(group, type){
        return type === "oa" ? group.reduce((tot, inv) => {return tot + Number(_.get(inv, 'reimbursement', 0.00))}, 0).toFixed(2) :
            type === "pat" ? group.reduce((tot, inv) => {return tot + Number(_.get(inv, 'patientIntervention', 0.00))}, 0).toFixed(2) :
                type === "ext" ? group.reduce((tot, inv) => {return tot + Number(_.get(inv, 'doctorSupplement', 0.00))}, 0).toFixed(2) :
                    type === "tot" ? group.reduce((tot, inv) => {return tot + Number(_.get(inv, 'totalAmount', 0.00))}, 0).toFixed(2) : 0.00
    }

    _forceZeroNum(num) {
        return (!num) ? '0' : num.toString()
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
                    this.set('filteredListOfInvoice', _.map(_.groupBy(_.sortBy(invoiceSearchResults, ['insuranceCode'], ['asc']), 'parentInsuranceDto.code'), inv => inv))

                }else{
                    this.set('filteredListOfInvoice', _.map(_.groupBy(_.sortBy(_.get(this, 'listOfInvoice', []), ['insuranceCode'], ['asc']), 'parentInsuranceDto.code'), inv => inv))
                }
            }, 100)
        }else{
            this.set('filteredListOfInvoice', _.map(_.groupBy(_.sortBy(_.get(this, 'listOfInvoice', []), ['insuranceCode'], ['asc']), 'parentInsuranceDto.code'), inv => inv))
        }
    }

    _checkBeforeSend(){

        this.set('checkBeforeSendEfact.inamiCheck', !_.get(this.hcp, 'nihii', null))
        this.set('checkBeforeSendEfact.ssinCheck', !_.get(this.hcp, 'ssin', null))
        this.set('checkBeforeSendEfact.bceCheck', !_.get(this.hcp, 'cbe', null))

        this.set('checkBeforeSendEfact.ibanCheck', !((this.hcp && this.hcp.bankAccount && this.hcp.nihii.bankAccount) || (this.hcp && this.hcp.financialInstitutionInformation && this.hcp.financialInstitutionInformation[0] && this.hcp.financialInstitutionInformation[0].bankAccount)))
        this.set('checkBeforeSendEfact.bicCheck', !((this.hcp && this.hcp.bic && this.hcp.bic.length) || (this.hcp && this.hcp.financialInstitutionInformation && this.hcp.financialInstitutionInformation[0] && this.hcp.financialInstitutionInformation[0].bic)))
        this.set('patientWithoutMutuality', _.get(this, 'listOfInvoice', []).filter(inv => inv.insurabilityCheck === false) || [])

        this.set('checkBeforeSendEfact.invoiceCheck100',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 100, 200))
        this.set('checkBeforeSendEfact.invoiceCheck200',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 200, 300))
        this.set('checkBeforeSendEfact.invoiceCheck300',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 300, 400))
        this.set('checkBeforeSendEfact.invoiceCheck306',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 306, 307))
        this.set('checkBeforeSendEfact.invoiceCheck400',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 400, 500))
        this.set('checkBeforeSendEfact.invoiceCheck500',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 500, 600))
        this.set('checkBeforeSendEfact.invoiceCheck600',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 600, 700))
        this.set('checkBeforeSendEfact.invoiceCheck900',this.checkIfDoubleInvoiceNumber(_.get(this, 'listOfInvoice', []), 900, 1000))

        if(_.size(_.get(this, 'patientWithoutMutuality', [])) > 0 || _.get(this, 'checkBeforeSendEfact.inamiCheck', null) === true || _.get(this, 'checkBeforeSendEfact.ssinCheck', null) === true ||
            _.get(this, 'checkBeforeSendEfact.bceCheck', null) === true || _.get(this, 'checkBeforeSendEfact.ibanCheck', null) === true || _.get(this, 'checkBeforeSendEfact.bicCheck', null) === true ||
            _.get(this, 'checkBeforeSendEfact.invoiceCheck100', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck200', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck300', null) === false ||
            _.get(this, 'checkBeforeSendEfact.invoiceCheck306', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck400', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck500', null) === false ||
            _.get(this, 'checkBeforeSendEfact.invoiceCheck600', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck900', null) === false){
            this.shadowRoot.querySelector('#checkBeforeSendingDialog').open()
        }else{
            this.sendInvoices()
        }
    }

    checkIfDoubleInvoiceNumber(invoices, startOfRange, endOfRange){
        if(startOfRange === 300 && endOfRange === 400){
            return _.uniq(_.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange && i.insuranceCode !== "306").map( i => parseInt(i.invoiceReference)))).length === _.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange && i.insuranceCode !== "306").map( i => parseInt(i.invoiceReference))).length
        }else{
            return _.uniq(_.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange).map( i => parseInt(i.invoiceReference)))).length === _.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange).map( i => parseInt(i.invoiceReference))).length
        }
    }

    sendInvoices(){
        //todo
        this.shadowRoot.querySelector('#checkBeforeSendingDialog') ? this.shadowRoot.querySelector('#checkBeforeSendingDialog').close() : null
        this.set('progressItem', [])

        const lastSend = parseInt(localStorage.getItem('lastInvoicesSent')) ? this.api.moment(parseInt(localStorage.getItem('lastInvoicesSent'))).format('YYYY-MM-DD') : '2000-01-01'
        const maySend =  !this.api.moment(lastSend).isSame(this.api.moment(Date.now()).format('YYYY-MM-DD'))

        if (maySend) {
            this.set('cannotSend',true)
            localStorage.setItem('lastInvoicesSent', Date.now())
            this.shadowRoot.querySelector('#sendingDialog').open()
            this.set('isSending', true)
            this.push('progressItem', this.localize('inv-step-1', 'inv-step-1', this.language))

            let prom = Promise.resolve()
            _.chain(_.head(_.chunk(this.listOfInvoice.filter(inv => _.get(inv, 'insurabilityCheck', false) === true && _.get(inv, 'sendingFlag', false) === true), 100)))
                .groupBy(fact => fact.insuranceParent)
                .toPairs().value()
                .forEach(([fedId,invoices]) => {
                    prom = prom.then(() => this.api.message().sendBatch(this.user, this.hcp, invoices.map(iv=>({invoiceDto:iv.invoice, patientDto:_.omit(iv.patient, ['personalStatus'])})), _.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenIdMH', null), _.get(this.api, 'credentials.ehpassword', null), this.api.fhc().Efactcontroller(),
                        undefined,
                        (fed, hcpId) => Promise.resolve(`efact:${hcpId}:${fed.code === "306" ? "300" : fed.code}:`), "medicalhouse")
                    ).then(message => {
                        this.push('progressItem', this.localize('inv-step-2', 'inv-step-2', this.language)+' '+_.get(message, 'metas.ioFederationCode', ""))
                        this.api.register(message,'message')
                    })
                })

            return prom.then(() => {
                this.set('isSending',false)
                this.shadowRoot.querySelector('#sendingDialog').close()
                this.getMessage(true)
            })
        }
    }

    getMessage(refreshAll){
        this.dispatchEvent(new CustomEvent('get-message', {bubbles: true, composed: true, detail: {refreshAll: refreshAll}}))
    }

    _refreshInvoiceList(){
        this.dispatchEvent(new CustomEvent('get-message', {bubbles: true, composed: true, detail: {refreshAll: false}}))
    }

    _displayInfoInvoicePanel(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){
            this.dispatchEvent(new CustomEvent('open-invoice-detail-panel', {bubbles: true, composed: true, detail: {selectedInv: JSON.parse(_.get(e, 'currentTarget.dataset.item', null))}}))
        }
    }

    _selectedSendingFlagChanged(e){
        e.stopPropagation()
        if(_.get(e, 'target.id', null)){
            let inv = _.get(this, 'listOfInvoice', []).find(inv => _.get(inv, 'uuid', null) === _.get(e, 'target.id', ''))
            inv.sendingFlag = _.get(e, 'target.checked', false)
        }
    }

    _stopPropagation(e){
        e.stopPropagation()
    }

    _getGroupId(group){
        return _.get(_.head(group), 'parentInsuranceDto.id', null)
    }

    _exportFlatRateInvoicing() {
        this.shadowRoot.querySelector('#selectMonthDialog').open()
    }

    _exportFlatRateInvoicing_dialogResult() {
        //TODO: add cancel possibility
        this._exportFlatRateInvoicing_step2()
    }

    _exportFlatRateInvoicing_step2() {

        this.set('isLoading', true );
        this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_1',this.language), icon:"arrow-forward"});
        this.reportCurrentDateString = null;
        const flatRateUtil = this.$.flatrateUtils;

        // Force refresh - could be new "valorisation" / bce / bank account / contact person / ... was just set
        if(_.size(_.get(this.api.hcparty().cache, _.get(this.user, "healthcarePartyId", "" )))) delete this.api.hcparty().cache[_.get(this.user, "healthcarePartyId", "" )];

        this.api.hcparty().getHealthcareParty(_.get(this.user, "healthcarePartyId", "" )) //0
            .then(hcp => { //1

                this.set("hcp", hcp);
                if (!_.trim(_.get(this, "hcp.nihii", ""))) throw new Error("no-nihii");

                this.flatRateInvoicingDataObject = {
                    hcpData: {
                        id: _.trim(_.get(this.hcp, "id")),
                        name: _.trim(_.get(this.hcp, "name", "")) || _.trim(_.trim(_.get(this.hcp, "firstName", "")) + " " + _.trim(_.get(this.hcp, "lastName", ""))) || _.trim(_.get(this.user, "name", "")),
                        address: _.chain(_.get(this.hcp, "addresses", {})).filter({addressType: "work"}).head().value() || _.chain(_.get(this.hcp, "addresses", {})).filter({addressType: "home"}).head().value() || _.chain(_.get(this.hcp, "addresses", {})).head().value() || {},
                        cbe: _.trim(_.get(this.hcp, "cbe", "")),
                        nihii: _.trim(_.get(this.hcp, "nihii", "")),
                        nihiiFormated: this.api.formatInamiNumber(_.trim(_.get(this.hcp, "nihii", ""))),
                        contactPersonHcpId: _.trim(_.get(this.hcp, "contactPersonHcpId", "")),
                        contactPerson: "",  // Make it empty at first, done on purpose
                        financialInfo: _.head(_.filter(_.get(this.hcp, "financialInstitutionInformation", []), i => _.trim(_.get(i, "bankAccount", ""))))
                    },
                    patientsData: [],
                    insurancesData: [],
                    iosData: [],
                    listsData: [],
                    patientIdsWithValidInvoiceForExportedMonth: [],
                    invoicesData: [],
                    oaTotalPrices: [],
                    batchExportTstamp: +new Date(),
                    exportedDate: _.trim( parseInt(_.get(this.shadowRoot.getElementById("exportedYear"), "value", this._getExportCurrentYear())) + ((_.trim(_.get(this.shadowRoot.getElementById("exportedMonth"), "value", this._getExportCurrentMonth())).length === 1 ? "0" : "") + parseInt(_.get(this.shadowRoot.getElementById("exportedMonth"), "value", this._getExportCurrentMonth()))) + "01" ),
                    generatedFiles: { pdfs: {}, oaPdfs: {}, flatFiles: {}, slips: {} },
                    finalArchiveSpeakingName: { archiveDownloadFileName: _.kebabCase(_.compact([ moment().format('YYYY-MM-DD-HH[h]-mm[m]-ss[s]'), "medical house", _.trim(_.get(this.hcp, "name", "")) || _.trim(_.trim(_.get(this.hcp, "firstName", "")) + " " + _.trim(_.get(this.hcp, "lastName", ""))) || _.trim(_.get(this.user, "name", "")), "invoicing export", +new Date() ]).join(" ")) + ".zip" },
                    finalArchive: { archiveDownloadFileName: _.kebabCase(_.compact([ moment().format('YYYY-MM-DD-HH[h]-mm[m]-ss[s]'), "invoicing export", ]).join(" ")) + ".zip" },
                    pendingInvoicesToResend: [],
                    pendingInvoicesAndPatToResend: [],
                    hcpValorisationsByMonth: []
                }
                this.reportCurrentDateMomentObject = moment(_.trim(this.flatRateInvoicingDataObject.exportedDate), "YYYYMMDD")
                this.flatRateInvoicingDataObject.hcpData = _.merge(this.flatRateInvoicingDataObject.hcpData, {
                    phone: _.trim(_.get(_.filter(this.flatRateInvoicingDataObject.hcpData.address.telecoms, {telecomType: "phone"}), "[0].telecomNumber", "")) || _.trim(_.get(_.filter(this.flatRateInvoicingDataObject.hcpData.address.telecoms, {telecomType: "mobile"}), "[0].telecomNumber", "")),
                    email: _.trim(_.get(_.filter(this.flatRateInvoicingDataObject.hcpData.address.telecoms, {telecomType: "email"}), "[0].telecomNumber", "")),
                    financialInfo: {
                        bankAccount: _.trim(_.get(this.flatRateInvoicingDataObject, "hcpData.financialInfo.bankAccount", "")),
                        bankAccountFormated: this.api.formatBankAccount(_.trim(_.get(this.flatRateInvoicingDataObject, "hcpData.financialInfo.bankAccount", ""))),
                        bic: _.trim(_.get(this.flatRateInvoicingDataObject, "hcpData.financialInfo.bic", "")) || this.api.getBicByIban(_.trim(_.get(this.flatRateInvoicingDataObject, "hcpData.financialInfo.bankAccount", ""))),
                        name: _.trim(_.get(this.flatRateInvoicingDataObject, "hcpData.financialInfo.name", "")),
                    }
                })


                // Make sure - refuse to proceed if missing
                if (!_.trim(_.get(this, "flatRateInvoicingDataObject.hcpData.cbe"))) throw new Error("missing-cbe");

                // Make sure - refuse to proceed if missing
                if (!_.trim(_.get(this, "flatRateInvoicingDataObject.hcpData.contactPersonHcpId"))) throw new Error("missing-contact-person");

                // Make sure - refuse to proceed if missing
                if (!_.size(this.flatRateInvoicingDataObject.hcpData.financialInfo) || !_.trim(_.get(this, "flatRateInvoicingDataObject.hcpData.financialInfo.bankAccount", ""))) throw new Error("missing-bank-account");

                // Check again, even if already done in this.super() - could be got updated meanwhile & this.super() is only called !once
                this.api.hcparty().getHealthcareParty(_.trim(_.get(this, "flatRateInvoicingDataObject.hcpData.contactPersonHcpId")))
                    .then(hcpContactPerson => {
                        if (!_.size(hcpContactPerson) || !_.trim(_.get(hcpContactPerson, "id", "")) || !_.trim(_.get(hcpContactPerson, "lastName", "")) || !_.trim(_.get(hcpContactPerson, "firstName", ""))) throw new Error("missing-contact-person");
                        const contactPerson = _.trim(_.trim(_.get(hcpContactPerson, "lastName", "")) + " " + _.trim(_.get(hcpContactPerson, "firstName", "")))
                        this.set("contactPerson", contactPerson);
                        this.flatRateInvoicingDataObject.hcpData.contactPerson = contactPerson
                    })
                    .catch((e) => { throw new Error("missing-contact-person"); })


                // Get valorisations for last X months - as of export date
                let valorisationMonths = [];
                for (let i = 0; i < 240; i++) { valorisationMonths.push(_.trim(moment(_.trim(this.flatRateInvoicingDataObject.exportedDate), "YYYYMMDD").startOf('month').subtract(i, "month").format("YYYYMMDD"))) }
                this.flatRateInvoicingDataObject.hcpValorisationsByMonth = valorisationMonths.map(valorisationMonth => {
                    return {
                        month: parseInt(valorisationMonth),
                        valorisations: _.merge(
                            [
                                {code: "109616", price: 0.00, flatRateType: "physician"},           // Doctor
                                {code: "509611", price: 0.00, flatRateType: "physiotherapist"},     // Kine
                                {code: "409614", price: 0.00, flatRateType: "nurse"}                // Nurse
                            ],
                            _.compact(
                                _.chain(_.get(this.hcp, "flatRateTarifications", []))
                                    .map(singleNomenclature => {
                                        const valorisationObject = _.head(
                                            _.orderBy(
                                                _
                                                    .chain(singleNomenclature.valorisations)
                                                    .filter(singleValorisation => {
                                                        return (
                                                            !!singleValorisation
                                                            && parseFloat(_.get(singleValorisation, "reimbursement", 0))
                                                            && (
                                                                (moment(_.trim(_.get(singleValorisation, "startOfValidity", "0")), "YYYYMMDD").startOf('month')).isBefore(moment(_.trim(valorisationMonth), "YYYYMMDD").startOf('month')) ||
                                                                (moment(_.trim(_.get(singleValorisation, "startOfValidity", "0")), "YYYYMMDD").startOf('month')).format("YYYYMMDD") === moment(_.trim(valorisationMonth), "YYYYMMDD").startOf('month').format("YYYYMMDD")
                                                            )
                                                        )

                                                    })
                                                    .value(),
                                                ["startOfValidity"],
                                                ["desc"]
                                            )
                                        )
                                        return parseFloat(_.get(valorisationObject, "reimbursement", 0)) ? {
                                            code: _.trim(_.get(singleNomenclature, "code")),
                                            label: _.get(singleNomenclature, "label"),
                                            flatRateType: _.trim(_.get(singleNomenclature, "flatRateType")),
                                            price: parseFloat(_.get(valorisationObject, "reimbursement", 0)),
                                            valorisationMonth: parseInt(valorisationMonth)
                                        } : false
                                    })
                                    .value()
                            )
                        )
                    }
                })


                // HCP NIHII last 3 digits = booleans (0/1) tell us whether or not HCP has (respectively) MKI availabilities (respectively: M = physician, K = physiotherapist & I = nurse)
                const medicalHouseNihiiLastThreeDigits = _.trim(this.hcp.nihii).slice(-3).split("")
                const medicalHouseAvailableValorisationsByNihii = _.compact(_.map(["physician", "physiotherapist", "nurse"], (v, k) => !!parseInt(medicalHouseNihiiLastThreeDigits[k]) ? {flatRateType: v} : false ))

                // At least one MH valorisation is missing
                if (
                    !parseInt(_.size(medicalHouseAvailableValorisationsByNihii))
                    || _.size(medicalHouseAvailableValorisationsByNihii) !== _.size(_.compact(_.map(medicalHouseAvailableValorisationsByNihii, mhValorisation => !!parseInt(_.size(_.filter(_.get(this, "flatRateInvoicingDataObject.hcpValorisationsByMonth[0].valorisations", {}), i =>  _.trim(_.get(i, "flatRateType", "")) === _.trim(mhValorisation.flatRateType) && parseFloat(_.get(i, "price", 0))))))))
                ) throw new Error("missing-flatrate-tarification");

                return null

            }) //1
            .then(()=>{ //2

                // Make sure we won't get disconnected if process runs for over an hour
                this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))

                // Check for existing exports - did it run already? - do we have anything to run again for this month?
                //     1. Get existing messages of month we're trying to export
                //     2. No message found -> allow to run. Only of status fullyAccepted / pending -> don't allow to run again. If some of status archived / error / partiallyAccepted / rejected -> allow to run again (after checking invoicingCode booleans).
                //     3. Take & resolve invoiceIds
                //     4. Only keep (old) invoices with a correctiveInvoiceId
                //     5. Resolve corrective invoices & drop already sent ones
                //     6. Filter inv.invoicingCodes based on all bool false but "pending" === true (when BOTH pending & resent are true -> invoice will appear under "Invoices to be corrected" / customer has to flag as being corrected)
                //     7. One+ record found? Export may run again
                return this.api.getRowsUsingPagination(
                    (key,docId) =>
                        this.api.message().findMessagesByTransportGuid('MH:FLATRATE:INVOICING-FLATFILE', null, key, docId, 1000)
                            .then(pl => { return {
                                rows:_.filter(pl.rows, m => {
                                    m.evaluatedStatus =
                                        !!(m.status & (1 << 21)) ? "archived" :
                                            !!(m.status & (1 << 17)) ? "error" :
                                                !!(m.status & (1 << 16)) ? "partiallyAccepted" :
                                                    !!(m.status & (1 << 15)) ? "fullyAccepted" :
                                                        !!(m.status & (1 << 12)) ? "rejected" :
                                                            !!(m.status & (1 << 11)) ? "treated" :
                                                                !!(m.status & (1 << 10)) ? "acceptedForTreatment" :
                                                                    !!(m.status & (1 << 9))  ? "successfullySentToOA" :
                                                                        !!(m.status & (1 << 8))  ? "pending" :
                                                                            ""
                                    return m
                                        && _.get(m,'fromHealthcarePartyId',false)===this.user.healthcarePartyId
                                        && _.get(m, "recipients", []).indexOf(this.user.healthcarePartyId) > -1
                                        && parseInt( _.get(m, "metas.batchExportTstamp", 0) )
                                        && parseInt( _.size( _.get(m, "invoiceIds", [] ) ) )
                                        && (
                                            parseInt( _.get(m, "metas.exportedDate", "" ) ) === parseInt(this.flatRateInvoicingDataObject.exportedDate)     // Either current month
                                            || parseInt( _.get(m, "metas.exportedDate", "" ) ) < parseInt(this.flatRateInvoicingDataObject.exportedDate)    // Or before, NEVER take resent invoices "in the future"
                                        )
                                }),
                                nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                                nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                                done: !pl.nextKeyPair
                            }})
                            .catch(()=>{ return Promise.resolve(); })
                ).then(foundMessages=> {

                    // Export already ran this month - any message at all?
                    this.flatRateInvoicingDataObject.exportAlreadyRanThisMonth = !!parseInt( _.size(_.filter(foundMessages, m=>{return _.trim(_.get(m,"metas.exportedDate",0))=== _.trim(this.flatRateInvoicingDataObject.exportedDate) })) )

                    // Invoices / no invoices to resend
                    return !parseInt(_.size(foundMessages)) ? [] :

                        // All are pending or fully accepted, nothing to resend
                        !parseInt( _.size(_.filter(foundMessages, msg => { return ["archived","error","partiallyAccepted","rejected"].indexOf(msg.evaluatedStatus) > -1 }))) ? [] :

                            this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: _.compact(_.uniq(_.flatMap(_.map(_.filter(foundMessages, msg => { return ["archived","error","partiallyAccepted","rejected"].indexOf(msg.evaluatedStatus) > -1 }), "invoiceIds"))))}))
                                .then(invoicesToBeCorrected => !parseInt(_.size(invoicesToBeCorrected)) ? [] :
                                    this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: _.compact(_.uniq(_.map(_.filter(invoicesToBeCorrected, _.trim("correctiveInvoiceId")), "correctiveInvoiceId")))}))
                                        .then(correctiveInvoices => !parseInt(_.size(correctiveInvoices)) ? [] :
                                            _.compact(
                                                _.filter(correctiveInvoices, i => !_.trim(_.get(i, "sentDate", ""))).map(inv => {
                                                    // Make sure I have to take it into account (all false but the pending bool)
                                                    const invoicingCodes = _.get(inv, "invoicingCodes", [])
                                                    return !parseInt(_.size(invoicingCodes)) ? false :
                                                        _.every(invoicingCodes, ic => {
                                                            return _.get(ic,"accepted",false)===false
                                                                && _.get(ic,"archived",false)===false
                                                                && _.get(ic,"canceled",false)===false
                                                                && _.get(ic,"resent",false)===false
                                                                && _.get(ic,"lost",false)===false
                                                                && _.get(ic,"pending",false)===true
                                                        }) ? inv : false
                                                })
                                            )
                                        )
                                        .catch(e => { console.log("Could not getInvoices (corrective ones) by ", _.compact(_.uniq(_.map(_.filter(invoicesToBeCorrected, _.trim("correctiveInvoiceId")), "correctiveInvoiceId")))); console.log(e); return false; })
                                )
                                .catch(e => { console.log("Could not getInvoices (to be corrected) by ", _.compact(_.uniq(_.flatMap(_.map(foundMessages, "invoiceIds"))))); console.log(e); return false; })
                })

            }) //2
            .then(pendingInvoicesToResend => {

                // Go for any invoice(s) to be added in the batch (could be manually created using PAT's timeline (timeline && pat-flatrate-utils)
                // For performance purposes, such invoices could be found by scanning for messages with transportGuid "MH:FLATRATE:INVOICE-TO-ADD" (current or previous month allowed, never in the future), then go for the invoiceIds
                return flatRateUtil.getInvoicesToAddFromTimelineByMaxExportDate(parseInt(_.get(this,"flatRateInvoicingDataObject.exportedDate")))
                    .then(invoicesToAdd => _
                        .chain(invoicesToAdd)
                        .map(inv => {
                            // Make sure I have to take it into account (all false but the pending bool)
                            const invoicingCodes = _.get(inv, "invoicingCodes", [])
                            return !parseInt(_.size(invoicingCodes)) ? false :
                                _.every(invoicingCodes, ic => {
                                    return _.get(ic,"accepted",false)===false
                                        && _.get(ic,"archived",false)===false
                                        && _.get(ic,"canceled",false)===false
                                        && _.get(ic,"resent",false)===false
                                        && _.get(ic,"lost",false)===false
                                        && _.get(ic,"pending",false)===true
                                }) ? inv : false
                        })
                        .concat((pendingInvoicesToResend||[]))
                        .value()
                    )
            }) // 2 Bis
            .then(pendingInvoicesToResend => { //3
                if(!parseInt(_.size(pendingInvoicesToResend)) && !!this.flatRateInvoicingDataObject.exportAlreadyRanThisMonth) throw new Error("export-already-ran")
                this.flatRateInvoicingDataObject.pendingInvoicesToResend = pendingInvoicesToResend
                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_1_done',this.language), icon:"check-circle", updateLastMessage: true, done:true});
                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_2',this.language), icon:"arrow-forward"});
                return !!this.flatRateInvoicingDataObject.exportAlreadyRanThisMonth ? false : this._getPatientsByHcp(_.get(this.hcp, "id")).then(myPatients => _
                    .chain(myPatients)
                    .uniqBy('ssin')
                    .filter(pat => (
                        // Either pat is alive
                        !parseInt(_.get(pat, "dateOfDeath", 0)) ||
                        // Or pat's death occured during exported month -> at which point he should still be taken into account
                        (!!parseInt(_.get(pat, "dateOfDeath", 0)) && moment( _.get(pat, "dateOfDeath", 0), 'YYYYMMDD').startOf('month').add(1,"month").isAfter(this.reportCurrentDateMomentObject.startOf('month')))
                    ))
                    .orderBy(['lastName', 'firstName'],['asc','asc'])
                    .value()
                )
            }) //3
            .then(myPatients=> {
                return !parseInt(_.size(this.flatRateInvoicingDataObject.pendingInvoicesToResend)) ?
                    { myPatients: _.compact(myPatients), myPatientsToResend: [] } :
                    Promise.all(this.flatRateInvoicingDataObject.pendingInvoicesToResend.map(inv => this.api.crypto().extractCryptedFKs(inv, this.user.healthcarePartyId).then(ids => [inv, ids.extractedKeys[0]]).catch(e=>{console.log(e); console.log("Could not extractCryptedFKs for invoices to resend");})))
                        .then(invAndIdsPat => this.api.patient().getPatientsWithUser(this.user,new models.ListOfIdsDto({ids: _.uniq(invAndIdsPat.map(x => x[1]))})).then(pats => invAndIdsPat.map(it => [it[0], pats.find(p => p.id === it[1])])).catch(e=>{console.log(e); console.log("Could not get getPatientsWithUser for invoices to resend");}))
                        .then(invoicesAndPatient=>{
                            invoicesAndPatient = invoicesAndPatient.filter(ip => !!ip[0] && !ip[1])
                            invoicesAndPatient = _.compact(_.map(invoicesAndPatient, invAndPat => {
                                let tempPat = _.cloneDeep(invAndPat[1])
                                tempPat.invoiceToBeResent = _.get(_.cloneDeep(invAndPat),"[0]",{})
                                tempPat.ssin = _.trim(_.get(tempPat,"ssin","")).replace(/[^\d]/gmi,"")
                                tempPat.lastName = (tempPat.lastName||"").toUpperCase()
                                tempPat.firstName = (tempPat.firstName||"").toUpperCase()
                                tempPat.dateOfBirth = (tempPat.dateOfBirth?moment(tempPat.dateOfBirth+"", "YYYYMMDD").format('DD/MM/YYYY'):"")
                                tempPat.finalInsurability = _.find(
                                    tempPat.insurabilities,
                                    (ins) => {
                                        return ins &&
                                            _.size(ins) &&
                                            !!_.trim(_.get( ins, "insuranceId", "" )) &&
                                            _.trim(_.get(ins, "parameters.tc1", "")).length === 3 &&
                                            _.trim(_.get(ins, "parameters.tc2", "")).length === 3 &&
                                            ( _.trim(_.get(ins, "parameters.tc1", "")) + _.trim(_.get(ins, "parameters.tc2", "")) !== "000000" ) &&
                                            // !!_.trim(_.get( ins, "identificationNumber", "" ) ) &&
                                            (
                                                moment(_.get(ins, "startDate"+"", 0), 'YYYYMMDD').isBefore( moment(_.trim(_.get(tempPat,"invoiceToBeResent.invoiceDate",0)),"YYYYMMDD") ) ||
                                                moment(_.get(ins, "startDate"+"", 0), 'YYYYMMDD').isSame(moment(_.trim(_.get(tempPat,"invoiceToBeResent.invoiceDate",0)),"YYYYMMDD")) ||
                                                !parseInt(_.get(ins, "startDate", 0))
                                            ) &&
                                            (
                                                moment(_.get(ins, "endDate"+"", 0), 'YYYYMMDD').isAfter(moment(_.trim(_.get(tempPat,"invoiceToBeResent.invoiceDate",0)),"YYYYMMDD")) ||
                                                moment(_.get(ins, "endDate"+"", 0), 'YYYYMMDD').isSame(moment(_.trim(_.get(tempPat,"invoiceToBeResent.invoiceDate",0)),"YYYYMMDD")) ||
                                                !parseInt(_.get(ins, "endDate", 0))
                                            )

                                        // 20200203 - Don't do that anymore, it would prevent errors from getting fixed. The correct way to reconcile an INVOICE vs. an INS is based on invoice's date and INS' date
                                        // When resending a corrective invoice, make sure we match PAT's INS to whom original invoice was sent to
                                        // _.trim(_.get(tempPat,"invoiceToBeResent.recipientId","")) === _.trim(_.get( ins, "insuranceId", "" ))
                                    }
                                )
                                tempPat.insurancePersonType = !_.trim( _.get( tempPat, "finalInsurability.titularyId", "" )) ? "T" : ( moment().diff(moment(_.get(tempPat, "dateOfBirth"+"", "0")+"", "DD/MM/YYYY"), 'years') < 18 ) ? "E" : "C"
                                tempPat.titularyId = _.trim( _.get( tempPat, "finalInsurability.titularyId", "" ))
                                invAndPat[1] = tempPat
                                // Make sure patient has a valid INS ("finalInsurability" corresponds to invoice date) for that invoice, otherwise drop (invoice can't be resent when it has nos valid insurance to related to)
                                return !_.size(_.get(tempPat,"finalInsurability",[])) ? false : invAndPat
                            }))
                            this.flatRateInvoicingDataObject.pendingInvoicesAndPatToResend = invoicesAndPatient
                            return { myPatients: _.compact(myPatients), myPatientsToResend: _.compact(_.map(invoicesAndPatient,x=>x[1])) }
                        })
            }) //4
            .then(patsAndPatsToResend=>{

                // PATS of mine, to be invoiced this month
                let myPatients = patsAndPatsToResend.myPatients

                // PATS of previous invoices (either rejected + corrected OR from PAT's timeline)
                const myPatientsToResend = _.cloneDeep(patsAndPatsToResend.myPatientsToResend)

                // If same PAT of same INS -> collect all invoicing codes under 1! invoice
                // If same PAT with different INS -> duplicate PAT with all invoicing codes of THAT INS (and append invoicing codes when already existing)
                // To figure it out (in case of a resent) -> look at invoice's "invoiceDate" and reconcile vs. PAT's INS of that time (*)

                // At this stage, 1+ the same patient could be present in myPatientsToResend but they'll all have 1! "invoiceToBeResent"
                // At this stage and because of previous step, PAT's "finalInsurability" already matches the invoice.sendDate it should be sent to (the correct INS based on date reconciliation)
                _.map(myPatientsToResend, patToResend => {
                    const patWithThatIns = _.find(myPatients, pat => { return pat &&
                        _.trim(_.get(pat,"ssin","")) === _.trim(_.get(patToResend,"ssin","")) &&
                        _.trim(_.get(pat,"finalInsurability.insuranceId","")) === _.trim(_.get(patToResend,"finalInsurability.insuranceId",""))
                    })
                    if(_.size(patWithThatIns)) {
                        patWithThatIns.invoiceToBeResent = _.concat((patWithThatIns.invoiceToBeResent||[]), patToResend.invoiceToBeResent)
                    }
                    else {
                        patToResend.isResent = true;
                        patToResend.invoiceToBeResent = [patToResend.invoiceToBeResent];
                        myPatients.push(patToResend);
                    }
                })

                // Todo: refactor this:
                // Either is not a resent -> can let go as below
                // Or it is, at which point valid MHC should be evaluated vs. ALL 1+ "invoiceToBeResent" date (discard invoiceToBeResent when non-legit)
                // Should we not have any "invoiceToBeResent" anymore -> either drop PAT (should it not exist in patsAndPatsToResend.myPatients) OR keep PAT when already existing in patsAndPatsToResend.myPatients

                // Find valid MHContract or drop entry
                myPatients = _.compact(_.map( myPatients, pat => {
                    pat.finalMedicalHouseContracts = _.get(
                        _.orderBy(
                            _
                                .chain(pat.medicalHouseContracts||[])
                                .filter(mhc => {
                                    // Eval final MHC either based on export date OR based on resent invoice date
                                    let mhcExportDateOrResentDate = !!parseInt(_.size(_.get(pat,"invoiceToBeResent[0]",[]))) ? moment(_.trim(_.get(pat,"invoiceToBeResent[0].invoiceDate",0)),"YYYYMMDD") : moment(_.trim(this.flatRateInvoicingDataObject.exportedDate), "YYYYMMDD")
                                    return (
                                        !!mhc &&
                                        !!_.size(mhc) &&
                                        // Has to begin in the past
                                        //TODO: I think it should be: startOfCoverage instead of startOfContract
                                        moment(_.trim(_.get(mhc, "startOfContract", 0)), "YYYYMMDD").startOf('month').isBefore(mhcExportDateOrResentDate) &&
                                        // Either end of contract is in the future or is not set
                                        //TODO: I think it should be: endOfCoverage instead of endOfContract
                                        ( moment(_.trim(_.get(mhc, "endOfContract", "0")), "YYYYMMDD").endOf('month').isAfter(mhcExportDateOrResentDate) || !parseInt(_.get(mhc, "endOfContract", 0)) ) &&
                                        (
                                            // Either start of coverage is before this month AND set OR
                                            // Start of coverage isn't set and start of contract is two month in the past (start of coverage = start of contract + 1 month when no trial period)
                                            ( parseInt(_.get(mhc, "startOfCoverage", 0)) && moment(_.trim(_.get(mhc, "startOfCoverage", "0")), "YYYYMMDD").endOf('month').isBefore(mhcExportDateOrResentDate) ) ||
                                            ( !parseInt(_.get(mhc, "startOfCoverage", 0)) && moment(_.trim(_.get(mhc, "startOfContract", 0)), "YYYYMMDD").startOf('month').add(1, 'months').isBefore(mhcExportDateOrResentDate) )
                                        )
                                        && //remove suspended contracts also during their time of suspension
                                        (
                                            //Allow contracts that:
                                            // don't have startOfSuspension (we ignore suspensions that only have endOfSuspension as they are incomplete data)
                                            // OR the invoicedate is before startOfSuspension
                                            // OR the invoicedate is after endOfSuspension
                                            (parseInt(_.get(mhc, "startOfSuspension", -1)) < 0) ||
                                            (parseInt(_.get(mhc, "startOfSuspension", 0)) && moment(_.trim(_.get(mhc, "startOfSuspension", "0")), "YYYYMMDD").isAfter(mhcExportDateOrResentDate)) ||
                                            (parseInt(_.get(mhc, "endOfSuspension", 0)) && moment(_.trim(_.get(mhc, "endOfSuspension", 0)), "YYYYMMDD").isBefore(mhcExportDateOrResentDate))
                                        )
                                    )
                                })
                                .value(),
                            ["startOfContract"],
                            ["desc"]
                        ),
                        "[0]", []
                    )
                    return _.size( pat.finalMedicalHouseContracts ) ? pat : false
                }))




                // Assign startOfCoverage if not set yet
                _.map( myPatients, pat => {
                    pat.finalMedicalHouseContracts = parseInt(_.get(pat.finalMedicalHouseContracts, "startOfCoverage", 0)) ?
                        pat.finalMedicalHouseContracts :
                        _.merge(
                            pat.finalMedicalHouseContracts,
                            {startOfCoverage: parseInt(moment(_.trim(_.get(pat.finalMedicalHouseContracts, "startOfContract", 0)), "YYYYMMDD").startOf('month').add(1, 'months').format("YYYYMMDD"))}
                        )
                })

                this.flatRateInvoicingDataObject.patientsData = myPatients
                this._setLoadingMessage({ message:this.localize('mhListing.spinner.step_3_done',this.language), icon:"check-circle", updateLastMessage: true, done:true});
                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_3',this.language), icon:"arrow-forward"});
                return this._getInsuranceTitularyInfo(myPatients)

            }) //5
            .then((myPatientsWithInsuranceTitularyInfo)=>{
                this.flatRateInvoicingDataObject.patientsData = myPatientsWithInsuranceTitularyInfo
                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_3_done',this.language), icon:"check-circle", updateLastMessage: true, done:true});
                this._setLoadingMessage({ message:this.localize('mhListing.spinner.step_4',this.language), icon:"arrow-forward"});
                return this._getInsurancesDataByPatientsList(myPatientsWithInsuranceTitularyInfo).then(x=>x)
            }) //6
            .then((insurancesData)=>{
                this.flatRateInvoicingDataObject.insurancesData = insurancesData
                return this._getIOsDataByInsurancesList(this.flatRateInvoicingDataObject.insurancesData).then(x=>x);}) //7
            .then((iosData) => {
                // Ins 306 has to be seen as a child of 300
                return this._getInsurancesDataByCode(300)
                    .then(ins300=>{
                        iosData = parseInt(_.size(_.filter(iosData, {code:"300"}))) ? iosData : _.size(_.filter(iosData, {code:"306"})) ? _.sortBy(_.concat(iosData, _.head(ins300)), "code") : iosData
                        _.remove(iosData, i=>_.trim(_.get(i,"code",""))==="306")
                        this.flatRateInvoicingDataObject.iosData = iosData
                        this.flatRateInvoicingDataObject.insurancesData = _.map(this.flatRateInvoicingDataObject.insurancesData, ins => { if(_.trim(_.get(ins, "code", "")) === "306") ins.parent = _.trim(_.get(_.filter(this.flatRateInvoicingDataObject.iosData, {code:"300"}), "[0].id", "")); return ins })
                        return null
                    })
                    .then(()=>{

                        this._setLoadingMessage({ message:this.localize('mhListing.spinner.step_4_done',this.language), icon:"check-circle", updateLastMessage: true, done:true});
                        this._setLoadingMessage({ message:this.localize('mhListing.spinner.step_5',this.language), icon:"arrow-forward"});

                        const listsData = { list5: [], list6: [], list8: [] }

                        // Eval pat's list 5/6/8
                        _.map(this.flatRateInvoicingDataObject.patientsData, pat => {

                            // None of the contracts -> Drop (Valid INS vs. exported date and valid MHC vs. exported date are already checked against at this stage)
                            if(!(_.get(pat, "finalMedicalHouseContracts.gp", false) || _.get(pat, "finalMedicalHouseContracts.kine", false) || _.get(pat, "finalMedicalHouseContracts.nurse", false))) return false

                            // Can only be a resent if for current exported month THAT PAT with THAT INS doesn't exist (most likely rejected+correct invoice OR invoice create via timeline AND for another INS)
                            // Ie: isResent is evaluated on BOTH pat's NISS AND pat's INS (between existing pats and pats to resend -> rejected+correct OR timeline)
                            const isResent = _.get(pat, "isResent", false)
                            const mhcStartOfCoverage = moment(_.get(pat,"finalMedicalHouseContracts.startOfCoverage"), "YYYYMMDD").startOf("month")
                            const mhcStartOfContract = moment(_.get(pat,"finalMedicalHouseContracts.startOfContract"), "YYYYMMDD").startOf("month")

                            // When is a resent -> Only look at the most recent invoice to define which list pat belongs to (remember: if original invoices of list 5/6 are to be resent: patient is known by now -> list 8).
                            // When not a resent = patient IS to be exported for this month (even though may have invoices to resend) -> always look at the month's exported date (at it will be the most recent date, we never re-invoice data of the future)
                            const compareDate = moment(_.trim( !isResent ? _.get(this,"flatRateInvoicingDataObject.exportedDate") : _
                                .chain(_.get(pat,"invoiceToBeResent",[]))
                                .orderBy(["invoiceDate"], ["desc"])
                                .head()
                                .get("invoiceDate")
                                .value()
                            ),"YYYYMMDD").startOf("month").subtract(1, "month")

                            // List 5 = New patients WITHOUT tryout (double amounts / must appear twice): Start of month of start cover must be EQUAL TO (start of export month -1 month) - AND Start of month of cover - 1 month === Start of month of contract
                            // List 6 = New patients WITH tryout (double amounts / must appear twice) - Start of month of start cover must be EQUAL TO (start of export month -1 month) - AND Start of month of cover - 1 month > Start of month of contract
                            // List 8 = "Old" patients: Start of month of start cover must be BEFORE (start of export month -1 month) - (Ie: start of coverage began 2+ month before exported month)
                            const isList5 = mhcStartOfCoverage.isSame(compareDate) && (_.cloneDeep(mhcStartOfCoverage).subtract(1, 'month')).isSame(mhcStartOfContract)
                            const isList6 = mhcStartOfCoverage.isSame(compareDate) && (_.cloneDeep(mhcStartOfCoverage).subtract(1, 'month')).isAfter(mhcStartOfContract)
                            const isList8 = mhcStartOfCoverage.isBefore(compareDate)

                            return isList8 ? listsData.list8 = _.concat(listsData.list8, [pat]) :
                                isList5 ? listsData.list5 = _.concat(listsData.list5, [pat]) :
                                    isList6 ? listsData.list6 = _.concat(listsData.list6, [pat]) :
                                        false

                        })

                        return listsData;

                    })

            }) //8
            .then((listsData)=> {

                this.flatRateInvoicingDataObject.listsData = listsData
                this.flatRateInvoicingDataObject.invoicesToBeModified = []

                // Drop patients we couldn't find in list (no valorisation)
                const patientsInLists = _.uniq(_.compact(_.flatMap(_.get(this, "flatRateInvoicingDataObject.listsData", {})).map(i => i.id))) || []
                this.flatRateInvoicingDataObject.patientsData = _.compact(_.map(this.flatRateInvoicingDataObject.patientsData, i => patientsInLists.indexOf(_.trim(i.id)) > -1 ? i : false))
                if (!parseInt(_.size(this.flatRateInvoicingDataObject.patientsData) || 0)) throw new Error("no-data-to-export")

                // Drop when not in use
                this.flatRateInvoicingDataObject.insurancesData = _.compact(_.map(this.flatRateInvoicingDataObject.insurancesData, i => !!(_.uniq(_.compact(_.map(this.flatRateInvoicingDataObject.patientsData, pat => _.get(pat, "finalInsurability.insuranceId", "")))) || []).indexOf(_.trim(i.id)) > -1 ? i : false))
                this.flatRateInvoicingDataObject.iosData = _.compact(_.map(this.flatRateInvoicingDataObject.iosData, i => !!(_.uniq(_.compact(_.map(this.flatRateInvoicingDataObject.insurancesData, oa => _.get(oa, "parent", ""))))).indexOf(_.trim(i.id)) > -1 ? i : false))

                this._setLoadingMessage({message: this.localize('mhListing.spinner.step_5_done', this.language),icon: "check-circle",updateLastMessage: true,done: true});
                this._setLoadingMessage({message: this.localize('mhInvoicing.spinner.step_4', this.language),icon: "arrow-forward"});

            }) //9
            .then(() => this._getPatientsWithValidInvoiceForExportedMonth(_.flatMap(_.cloneDeep(this.flatRateInvoicingDataObject.listsData)), _.trim(this.flatRateInvoicingDataObject.exportedDate)).then(x=>_.assign(this.flatRateInvoicingDataObject.patientIdsWithValidInvoiceForExportedMonth,x))) //10
            .then(() => {
                return Promise.all(_.toPairs(this.flatRateInvoicingDataObject.listsData).map(list => {

                    const typeList = list[0]
                    const patientList = list[1]
                    const codesList = typeList === "list5" || typeList === "list6" ?
                        // Lists 5 & 6 = NEW patients with respectively no tryout ; tryout
                        _.concat(
                            _.get(_.find(this.flatRateInvoicingDataObject.hcpValorisationsByMonth, {month:parseInt(_.trim(moment(_.trim(this.flatRateInvoicingDataObject.exportedDate), "YYYYMMDD").startOf('month').format("YYYYMMDD")))}), "valorisations"),
                            _.get(_.find(this.flatRateInvoicingDataObject.hcpValorisationsByMonth, {month:parseInt(_.trim(moment(_.trim(this.flatRateInvoicingDataObject.exportedDate), "YYYYMMDD").startOf('month').subtract(1,"month").format("YYYYMMDD")))}), "valorisations")
                        ) :
                        // List 8 = old / regular patients
                        _.get(_.find(this.flatRateInvoicingDataObject.hcpValorisationsByMonth, {month:parseInt(_.trim(moment(_.trim(this.flatRateInvoicingDataObject.exportedDate), "YYYYMMDD").startOf('month').format("YYYYMMDD")))}), "valorisations")

                    return _.compact(_.map(patientList, pat => {

                        // If is a resent -> pat already exists for exported month, with another INS.
                        // Ie: should NOT be charged for current exported month
                        const originalInvoicingCodes = _.get(pat,"isResent",false) ? [] : codesList.filter(code =>
                            parseFloat(code.price) && (
                                (code.flatRateType === "physician" && pat.finalMedicalHouseContracts.gp === true ) ||
                                (code.flatRateType === "nurse" && pat.finalMedicalHouseContracts.nurse === true) ||
                                (code.flatRateType === "physiotherapist" && pat.finalMedicalHouseContracts.kine === true)
                            )
                        )

                        const additionalInvoicingCodes = _.flatMap(_.map(_.get(pat,"invoiceToBeResent",[]), invoiceToBeResent => {

                            // In case we inherit of an invoice to be resent, make sure we don't invoice month to be resent twice
                            const invoiceCodesToBeDeleted = _.get(invoiceToBeResent,"invoicingCodes",[]).filter(ic=>_.compact(_.uniq(_.map(originalInvoicingCodes,oic=>_.trim(_.get(oic,"valorisationMonth",0))))).indexOf(_.trim(_.get(ic,"dateCode",0))) > -1 )

                            // 1+ times the same invoicing codes ? Update IC codes & DB
                            if( !!parseInt(_.size(invoiceCodesToBeDeleted)) ) {
                                const newInvoicingCodes = _.compact(_.map(invoiceToBeResent.invoicingCodes, ic => _.compact(_.map(invoiceCodesToBeDeleted,"id")).indexOf(_.trim(_.get(ic,"id",false)))>-1 ? false : ic ))
                                const invoiceToBeResentWithOmittedDuplicatedInvCodes = _.assign(_.cloneDeep(invoiceToBeResent), {invoicingCodes:newInvoicingCodes})
                                this.flatRateInvoicingDataObject.invoicesToBeModified.push(invoiceToBeResentWithOmittedDuplicatedInvCodes)
                            }

                            return _.map(
                                _.get(invoiceToBeResent,"invoicingCodes",[]).filter(ic=>_.compact(_.uniq(_.map(originalInvoicingCodes,oic=>_.trim(_.get(oic,"valorisationMonth",0))))).indexOf(_.trim(_.get(ic,"dateCode",0))) === -1 ),
                                ic => _.merge({},{
                                    code: _.get(ic,"code",""),
                                    label: { fr: _.get(ic,"label",""), nl: _.get(ic,"label",""), en: _.get(ic,"label","") },
                                    price: _.get(ic,"totalAmount",0),
                                    valorisationMonth: _.get(ic,"dateCode",null)
                                })
                            )

                        })||[])

                        // Say we generate month 01, then we generate month 02
                        // Then we flag invoices of month 01 as rejected + corrected
                        // Then we re-run month 02
                        // Export should only hold pat X for month 01 but not for month 02
                        const finalInvoicingCodes = _.compact(_.concat( additionalInvoicingCodes||[], (_.get(this,"flatRateInvoicingDataObject.patientIdsWithValidInvoiceForExportedMonth",[]).indexOf(_.get(pat,"id")) > -1 ? [] : originalInvoicingCodes) ))

                        return !_.size(finalInvoicingCodes) ? false : _.assign(pat, {
                            invoicingCodes: _.orderBy(_.map(finalInvoicingCodes, ic => ({
                                code: ic.code,
                                tarificationId: "INAMI-RIZIV|" + ic.code + "|1.0",
                                label: _.get(ic, "label."+this.language,""),
                                totalAmount: Number(_.get(ic,"price",0)),
                                reimbursement: Number(_.get(ic,"price",0)),
                                patientIntervention: Number(0.00).toFixed(2),
                                doctorSupplement: Number(0.00).toFixed(2),
                                units: 1,
                                canceled: false,
                                accepted: false,
                                pending: false,
                                resent: false,
                                lost: false,
                                archived: false,
                                dateCode: parseInt(_.get(ic,"valorisationMonth",0))||null,
                                id: this.api.crypto().randomUuid(),
                                logicalId: this.api.crypto().randomUuid(),
                                contractDate: _.get(_.get(pat, "finalMedicalHouseContracts", {startOfContract:0}), "startOfContract", 0)
                            })), ["dateCode"], ["desc"])
                        })
                    }))
                }))
                    .then(()=>{

                        console.log("--- Before generate invoices ---");
                        console.log(_.cloneDeep(this.flatRateInvoicingDataObject));

                        let prom = Promise.resolve([])
                        let invoicesToBeModified = _.cloneDeep(this.flatRateInvoicingDataObject.invoicesToBeModified);
                        return !parseInt(_.size(invoicesToBeModified||[])) ?
                            prom :
                            Promise.all(invoicesToBeModified.map( inv => {
                                prom = prom.then(invoicesToBeModified => this.api.invoice().modifyInvoice(inv)
                                    .then(() => _.concat(invoicesToBeModified, [inv]))
                                    .catch(e => { console.log("Can't modify invoice", inv, e); return false; })
                                )
                            }))
                    })
                    .then(()=> this._sleep(5000)) /* Cool down */
                    .then(()=>this._createOrUpdateMedicalHousePatientsInvoices())
            }) //11
            .then(invoicesData=>{
                this.flatRateInvoicingDataObject.invoicesData = invoicesData
                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_4_done',this.language), icon:"check-circle", updateLastMessage: true, done:true});
                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_7',this.language), icon:"arrow-forward"});



            }) //12
            .catch((e)=>{
                console.log(e);
                return (
                    ( _.trim(e).indexOf('no-nihii') > -1 ) ? this._showWarningNoHcpNihii() && e :
                        ( _.trim(e).indexOf('missing-flatrate-tarification') > -1 ) ? this._showWarningNoHcpFlatrateTarification() && e :
                            ( _.trim(e).indexOf('no-data-to-export') > -1 ) ? this._showWarningNoDataToExport() && e :
                                ( _.trim(e).indexOf('missing-contact-person') > -1 ) ? this._showWarningNoHcpContactPerson() && e :
                                    ( _.trim(e).indexOf('missing-cbe') > -1 ) ? this._showWarningNoCbe() && e :
                                        ( _.trim(e).indexOf('missing-bank-account') > -1 ) ? this._showWarningNoBankAccount() && e :
                                            ( _.trim(e).indexOf('export-already-ran') > -1 ) ? this._showWarningExportAlreadyRan() && e :
                                                e
                )
            }) //22
            .finally(()=>{
                console.log("finally:flatRateInvoicingDataObject", this.flatRateInvoicingDataObject);
                console.log(JSON.stringify(this.flatRateInvoicingDataObject));
                this.flatRateInvoicingDataObject = {}
                this.set('isLoading', false );
                this.set('activeGridItem', null );
                this.set('messagesCachedData', null );
                this.set('messagesGridData', [] );
                this.set('messagesGridDataReset', [] );

            }) //23

    }

    _createOrUpdateMedicalHousePatientsInvoices() {
        let prom = Promise.resolve([])
        const allPats = _.flatMap(this.flatRateInvoicingDataObject.listsData)
        const patsCount = _.size(allPats)
        const parentInsuranceIds = _.compact(_.uniq(_.map( this.flatRateInvoicingDataObject.insurancesData, i=>_.get(i,"parent", false ))))
        const childrenInsurancesData = _.compact(_.uniqBy(this.flatRateInvoicingDataObject.insurancesData, 'id'))

        return this.api.insurance().getInsurances(new models.ListOfIdsDto({ids : parentInsuranceIds})).then(parentInsurances => {
            allPats.forEach((pat,loopIndex) => {
                prom = prom.then(pats =>
                    this.api.crypto().extractDelegationsSFKs(pat, this.user.healthcarePartyId)
                        .then(secretForeignKeys => {

                            // TOP-435
                            const insParent = _.get(_.filter( parentInsurances, parentIns=> _.trim(_.get(parentIns, "id", "")) === _.trim(_.get(_.get(_.filter(childrenInsurancesData, i=>_.trim(_.get(i,"id",""))===_.trim(_.get(pat,"finalInsurability.insuranceId", ""))), "[0]", {}), "parent", ""))), "[0]", {})

                            return retry.retry(() => (this.api.invoice().appendCodes(this.user.id, "patient", "efact", _.trim(_.get(pat,"finalInsurability.insuranceId","")), secretForeignKeys.extractedKeys.join(","), null, (365*2), pat.invoicingCodes)))
                                .then(invoices => !_.trim(_.get(invoices, "[0].id", "")) ?
                                    this.api.invoice().newInstance(this.user, pat, invoices[0]).then(inv => {
                                        inv.printedDate =  moment().format("YYYYMMDD")
                                        inv.careProviderType = "medicalhouse"
                                        return inv
                                    }).then(inv => retry.retry(() => (this.api.invoice().createInvoice(inv, 'invoice:' + this.user.healthcarePartyId + ':' + this.getChangeParentCode306(insParent && insParent.code ? insParent.code : '000') + ':')))) :
                                    Promise.resolve(invoices[0])
                                )
                                .then(newInvoice => {

                                    if(this.invoiceHasDoubles(newInvoice)){

                                        // Drop duplicated codes
                                        pat.invoicingCodes.forEach(pic => { newInvoice.invoicingCodes = _.remove(newInvoice.invoicingCodes, ic => ic.dateCode === pic.dateCode && ic.code === pic.dateCode); });
                                        newInvoice.invoicingCodes = newInvoice.invoicingCodes.concat(pat.invoicingCodes);
                                        newInvoice.printedDate =  moment().format("YYYYMMDD")
                                        newInvoice.careProviderType = "medicalhouse"
                                        // && Update invoice
                                        return this.api.invoice().modifyInvoice(newInvoice).then(inv =>this.api.register(inv,'invoice'))
                                            .then(newInvoiceMod => {

                                                pat.invoices = [newInvoiceMod]
                                                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_4',this.language) + " " + (loopIndex+1) + "/" + patsCount, icon:"arrow-forward", updateLastMessage: true, done:false});
                                                return _.concat(pats, [pat])
                                            });

                                    } else {
                                        pat.invoices = [newInvoice]
                                        this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_4',this.language) + " " + (loopIndex+1) + "/" + patsCount, icon:"arrow-forward", updateLastMessage: true, done:false});
                                        return _.concat(pats, [pat])

                                    }

                                })
                        })
                )
            })
            return prom
        })
    }

    invoiceHasDoubles(inv){
        let hasDouble = false;
        inv.invoicingCodes.forEach(ic => {
            const ics = inv.invoicingCodes.filter(icf => icf.dateCode === ic.dateCode && icf.code === ic.code);
            if(_.size(ics) > 1) hasDouble = true;
        });
        return hasDouble;
    }

    _getExportMonthsList() {
        let toReturn = [];
        for(let i=1; i<=12; i++) toReturn.push({id: i, label: this.localize('month_'+i,this.language) })
        return toReturn
    }

    _getExportYearsList() {
        let toReturn = [];
        for(let i=(parseInt(moment().format('YYYY'))+1); i>=(parseInt(moment().format('YYYY'))-2); i--) toReturn.push({id: i, label: i })
        return toReturn
    }

    _getExportCurrentMonth() {
        return parseInt(moment().format('MM'))
    }

    _getExportCurrentYear() {
        return parseInt(moment().format('YYYY'))
    }

    _sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    getChangeParentCode306(code){
        return code === "306" ? "300" : code;
    }

    _setLoadingMessage( messageData ) {
        if( messageData.updateLastMessage ) { this._loadingMessages.pop(); }
        this._loadingMessages.push( messageData );
        let loadingContentTarget = this.shadowRoot.querySelectorAll('#loadingContent')[0];
        if(loadingContentTarget) { loadingContentTarget.innerHTML = ''; _.each(this._loadingMessages, (v)=>{ loadingContentTarget.innerHTML += "<p><iron-icon icon='"+v.icon+"' class='"+(v.done?"loadingIcon done":"loadingIcon")+"'></iron-icon>" + v.message + "</p>"; }); }
    }

    _resetLoadingMessage() {
        this._loadingMessages = [];
    }

    _getPatientsByHcp( hcpId ) {

        return this.api.getRowsUsingPagination(
            (key,docId) =>
                this.api.patient().listPatientsByHcPartyWithUser(this.user, hcpId, null, key && JSON.stringify(key), docId, 1000)
                    .then(pl => {
                        pl.rows = _
                            .chain(pl.rows)
                            .filter((i)=>{return(
                                !!i
                                && !!_.get(i,"active", true)
                                && !!_.trim(_.get(i,"dateOfBirth", ""))
                                && !!_.trim(_.get(i,"ssin", ""))
                                && !!_.size(_.get(i,"insurabilities", []))

                                // Make sure there is at least one valid insurance versus exported date
                                && !!_.size(
                                    _.chain(i.insurabilities)
                                        .filter(i=>{return(
                                            !!i
                                            // && i.identificationNumber
                                            && !!_.trim(_.get(i,"insuranceId", ""))
                                            && _.trim(_.get(i, "parameters.tc1", "")).length === 3
                                            && _.trim(_.get(i, "parameters.tc2", "")).length === 3
                                            && ( _.trim(_.get(i, "parameters.tc1", "")) + _.trim(_.get(i, "parameters.tc2", "")) !== "000000" )
                                            && (
                                                moment(_.get(i, "startDate"+"", 0), 'YYYYMMDD').isBefore(this.reportCurrentDateMomentObject, 'date') ||
                                                moment(_.get(i, "startDate"+"", 0), 'YYYYMMDD').isSame(this.reportCurrentDateMomentObject, 'date') ||
                                                !parseInt(_.get(i, "startDate", 0))
                                            )
                                            && (
                                                moment(_.get(i, "endDate"+"", 0), 'YYYYMMDD').isAfter(this.reportCurrentDateMomentObject, 'date') ||
                                                moment(_.get(i, "endDate"+"", 0), 'YYYYMMDD').isSame(this.reportCurrentDateMomentObject, 'date') ||
                                                !parseInt(_.get(i, "endDate", 0))
                                            )
                                        )})
                                        .value()
                                )
                                && !!_.size(_.get(i, "medicalHouseContracts", []))
                                && !!_.size(_.filter(_.get(i, "medicalHouseContracts",[]), i => _.trim(_.get(i,"hcpId", "something")) === _.trim(_.get(this,"user.healthcarePartyId","else"))))
                            )})
                            .uniqBy( 'ssin' )
                            .value()
                            .map((i) => {
                                i.ssin = _.trim(_.get(i,"ssin","")).replace(/[^\d]/gmi,"")
                                i.lastName = (_.get(i,"lastName","")).toUpperCase()
                                i.firstName = (_.get(i,"firstName","")).toUpperCase()
                                i.dateOfBirth = (!!_.trim(_.get(i,"dateOfBirth",""))?moment(_.trim(_.get(i,"dateOfBirth",0)), "YYYYMMDD").format('DD/MM/YYYY'):"")

                                // Eval "finalInsurability" to be the one corresponding to exported date
                                i.finalInsurability = _.get(
                                    _.filter(
                                        i.insurabilities,
                                        (ins) => {
                                            return ins &&
                                                _.size(ins) &&
                                                !!_.trim(_.get( ins, "insuranceId", "" )) &&
                                                _.trim(_.get(ins, "parameters.tc1", "")).length === 3 &&
                                                _.trim(_.get(ins, "parameters.tc2", "")).length === 3 &&
                                                ( _.trim(_.get(ins, "parameters.tc1", "")) + _.trim(_.get(ins, "parameters.tc2", "")) !== "000000" ) &&
                                                // !!_.trim(_.get( ins, "identificationNumber", "" ) ) &&
                                                (
                                                    moment(_.get(ins, "startDate"+"", 0), 'YYYYMMDD').isBefore(this.reportCurrentDateMomentObject, 'date') ||
                                                    moment(_.get(ins, "startDate"+"", 0), 'YYYYMMDD').isSame(this.reportCurrentDateMomentObject, 'date') ||
                                                    !parseInt(_.get(ins, "startDate", 0))
                                                ) &&
                                                (
                                                    moment(_.get(ins, "endDate"+"", 0), 'YYYYMMDD').isAfter(this.reportCurrentDateMomentObject, 'date') ||
                                                    moment(_.get(ins, "endDate"+"", 0), 'YYYYMMDD').isSame(this.reportCurrentDateMomentObject, 'date') ||
                                                    !parseInt(_.get(ins, "endDate", 0))
                                                )
                                        }
                                    ), "[0]", {}
                                )
                                i.insurancePersonType = !_.trim( _.get( i, "finalInsurability.titularyId", "" )) ? "T" : ( moment().diff(moment(_.get(i, "dateOfBirth"+"", "0")+"", "DD/MM/YYYY"), 'years') < 18 ) ? "E" : "C"
                                i.titularyId = _.trim( _.get( i, "finalInsurability.titularyId", "" ))
                                return i
                            })
                        ;
                        return {
                            rows:pl.rows,
                            nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                            nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                            done: !pl.nextKeyPair
                        }
                    })
                    .catch(()=>{ return Promise.resolve(); })
        )||[];

    }

    _getPatientsWithValidInvoiceForExportedMonth(patients, exportedMonth) {

        let prom = Promise.resolve([])

        _.map(patients, pat => {
            prom = prom.then(promisesCarrier => this.api.invoice().findBy(_.get(this,"user.healthcarePartyId"), pat)
                .then(invoices => _.filter(invoices, inv => inv &&
                    inv.sentDate &&
                    inv.sentMediumType === "efact" &&
                    _.size(_.filter(inv.invoicingCodes, ic => !ic.lost && !ic.canceled && !ic.resent)) &&
                    _.trim(inv.invoiceDate) === exportedMonth
                ))
                .then(patValidInvoicesForExportedMonth => !!_.size(patValidInvoicesForExportedMonth) ? _.get(pat,"id",false) : false)
                .then(patId => _.concat(promisesCarrier, [patId]))
                .catch(()=>_.concat(promisesCarrier, [false]))
            )
        })

        return prom.then(x=>_.compact(x))

    }

    getDestCode(affCode){
        let destCode = affCode;
        if (affCode.startsWith("3")) {
            if (["304", "305", "309", "311", "315", "317", "319", "322", "323", "325"].includes(affCode)) {
                destCode = "300";
            } else {
                destCode ="306";
            }
        } else if (affCode.startsWith("4")) {
            destCode =  "400"
        }
        return  destCode;
    }

    _getInsuranceTitularyInfo(inputPatientsList=false) {
        return new Promise(resolve =>{
            const insuranceTitularyIds = _.compact(_.uniq(_.filter( (inputPatientsList?inputPatientsList:this.flatRateAllPatients), (i)=>{ return _.trim(_.get(i, "titularyId", "")) }).map(i=>i.titularyId) ));
            return !_.size(insuranceTitularyIds) ? resolve((inputPatientsList?inputPatientsList:this.flatRateAllPatients)) : this.api.patient().getPatientsWithUser(this.user, new models.ListOfIdsDto({ ids: insuranceTitularyIds })).then(results => {
                //this.api.setPreventLogging(false)
                return resolve(
                    _.map((inputPatientsList?inputPatientsList:this.flatRateAllPatients), (i=>{
                        if(!_.trim(_.get(i,"titularyId", "" ))) return i
                        let titularyRecord = _.head(_.filter(results,(j=>{ return _.trim(j.id) === _.get(i,"titularyId", "" ) })))
                        i.titularyLabel = _.upperCase(_.get(titularyRecord, "firstName", "" )) + ' ' + _.upperCase(_.get(titularyRecord, "lastName", "" ))
                        return i
                    }))
                )
            })
        })
    }

    _getInsurancesDataByPatientsList(inputPatientsList) {
        return new Promise(resolve => {
            this.api.insurance().getInsurances(new models.ListOfIdsDto({ids : _.chain(inputPatientsList).map(i=> i.insurabilities.map(ins => _.trim(_.get(ins, "insuranceId")))).flattenDeep().uniq().compact().value()}))
                .then(insurancesData => resolve(
                    _
                        .chain(insurancesData)
                        .map((i)=>{ i.finalName = (i && i.name && i.name[this.language]) ? i.name[this.language] : i.name[(this.language==='fr' ? 'nl' : 'fr')]; return i; })
                        .sortBy((i)=>{ return i.code; })
                        .value()
                ))
        })
    }

    _getInsurancesDataByIds(insurancesIds) {
        return new Promise(resolve => {
            this.api.insurance().getInsurances(new models.ListOfIdsDto({ids : insurancesIds}))
                .then(insurancesData => resolve(
                    _
                        .chain(insurancesData)
                        .map((i)=>{ i.finalName = (i && i.name && i.name[this.language]) ? i.name[this.language] : i.name[(this.language==='fr' ? 'nl' : 'fr')]; return i; })
                        .sortBy((i)=>{ return i.code; })
                        .value()
                ))
        })
    }

    _getInsurancesDataByCode(insurancesCode) {
        return new Promise(resolve => {
            this.api.insurance().listInsurancesByCode(insurancesCode)
                .then(insurancesData => resolve(
                    _
                        .chain(insurancesData)
                        .map((i)=>{ i.finalName = (i && i.name && i.name[this.language]) ? i.name[this.language] : i.name[(this.language==='fr' ? 'nl' : 'fr')]; return i; })
                        .sortBy((i)=>{ return i.code; })
                        .value()
                ))
        })
    }

    _getIOsDataByInsurancesList(inputInsurancesList) {

        return new Promise(resolve => {
            this.api.insurance().getInsurances(new models.ListOfIdsDto({ids : _.chain(inputInsurancesList).map(i=>_.trim(_.get(i, "parent"))).uniq().compact().value()}))
                .then(insurancesData => resolve(
                    _
                        .chain(insurancesData)
                        .map((i)=>{ i.finalName = (i && i.name && i.name[this.language]) ? i.name[this.language] : i.name[(this.language==='fr' ? 'nl' : 'fr')]; return i; })
                        .sortBy((i)=>{ return i.code; })
                        .value()
                ))
        })
    }
}

customElements.define(HtMsgFlatrateInvoiceToBeSend.is, HtMsgFlatrateInvoiceToBeSend)
