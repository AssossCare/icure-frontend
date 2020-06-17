import '../../../dynamic-form/ckmeans-grouping.js';
import '../../../../styles/vaadin-icure-theme';
import '../../../../styles/spinner-style';
import '../../../../styles/scrollbar-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/dialog-style';
import '../../../../styles/invoicing-style';
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
class HtMsgFlatrateInvoiceToBeCorrected extends TkLocalizerMixin(PolymerElement) {
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
            
            .statusIcon.invoice-status--redStatus {
                color: var(--app-status-color-nok);
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
                       
            .status{
              display: block;
              margin-left: auto;
              margin-right: auto;
            }
            
            .info-icon{
                heigth: 14px;
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
            
        </style>
        
        <div class="panel">
            <div class="panel-title">
                [[localize('inv-to-be-corrected', 'To be corrected', language)]] 
                <span class="batchNumber batchToBeCorrected">{{_forceZeroNum(listOfInvoice.length)}}</span>
            </div>
            <div class="panel-search">
                <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{filter}}"></dynamic-text-field>
            </div>
            <div class="panel-content">
                <div class="table">
                    <div class="tr th">
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
                        <template is="dom-repeat" items="[[_sortInvoiceListByOa(filteredListOfInvoice)]]" as="inv">
                            <div class="tr tr-item" id="[[inv.invoiceId]]" data-item$="[[inv]]" on-tap="_displayInfoInvoicePanel">
                                <div class="td fg05">[[inv.insuranceCode]]</div>
                                <div class="td fg1">[[inv.invoiceReference]]</div>
                                <div class="td fg2">
                                    [[inv.patientName]]
                                </div>
                                <div class="td fg1">[[inv.patientSsin]]</div>
                                <div class="td fg1">[[formatDate(inv.invoiceDate,'date')]]</div>                         
                                <div class="td fg1">[[inv.reimbursement]]€</div>
                                <div class="td fg1">[[inv.patientIntervention]]€</div>
                                <div class="td fg1">[[inv.doctorSupplement]]€</div>
                                <div class="td fg1">[[inv.totalAmount]]€</div>
                                <div class="td fg1">
                                    <span class="invoice-status invoice-status--redStatus">
                                        <iron-icon icon="vaadin:circle" class="statusIcon invoice-status--redStatus"></iron-icon>
                                        [[inv.statut]]
                                     </span>
                                </div>                    
                            </div>
                        </template>
                    </template>
                </div>
            </div>
            <div class="panel-button">
            
            </div>
        </div>
`;
    }

    static get is() {
        return 'ht-msg-flatrate-invoice-to-be-corrected';
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
            isLoading:{
                type: Boolean,
                value: false
            },
            filteredListOfInvoice:{
                type: Array,
                value: () => []
            },
            filter:{
                type: String,
                value: null
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return ['_initialize(api, user, listOfInvoice)','_filterValueChanged(filter)'];
    }

    ready() {
        super.ready();
    }

    _forceZeroNum(num) {
        return (!num) ? '0' : num.toString()
    }

    _initialize(){
        this.set('filteredListOfInvoice', _.get(this, 'listOfInvoice', []))
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
                    this.set('filteredListOfInvoice', _.sortBy(invoiceSearchResults, ['insuranceCode'], ['asc']))
                }else{
                    this.set('filteredListOfInvoice', _.sortBy(_.get(this, 'listOfInvoice', []), ['insuranceCode'], ['asc']))
                }
            }, 100)
        }
    }

    _sortInvoiceListByOa(listOfInvoice) {
        return _.sortBy(listOfInvoice, ['insuranceCode'], ['asc'])
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

    _displayInfoInvoicePanel(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){
            this.dispatchEvent(new CustomEvent('open-invoice-detail-panel', {bubbles: true, composed: true, detail: {selectedInv: JSON.parse(_.get(e, 'currentTarget.dataset.item', null))}}))
        }
    }

}

customElements.define(HtMsgFlatrateInvoiceToBeCorrected.is, HtMsgFlatrateInvoiceToBeCorrected);
