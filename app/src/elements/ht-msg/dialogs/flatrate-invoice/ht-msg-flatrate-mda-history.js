import '../../../dynamic-form/ckmeans-grouping.js'
import '../../../../styles/vaadin-icure-theme.js'
import '../../../../styles/spinner-style.js'
import '../../../../styles/scrollbar-style'
import '../../../../styles/shared-styles'
import '../../../../styles/buttons-style'
import '../../../../styles/dialog-style'
import '../../../../styles/invoicing-style';
import '../../../ht-spinner/ht-spinner.js'

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

class HtMsgFlatrateMdaHistory extends TkLocalizerMixin(PolymerElement) {
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
                [MDA HISTORY] Panel content
            </div>
            <div class="panel-button">
                <template is="dom-if" if="[[!isLoading]]" restamp="true">
                    <paper-button class="button button--other" on-tap="_refreshInvoiceList">[[localize('refresh','Refresh',language)]]</paper-button>
                    <paper-button class="button button--other" on-tap="_exportFlatRateInvoicing">[[localize('generate','Generate',language)]]</paper-button>
                    <template is="dom-if" if="[[api.tokenId]]" restamp="true">
                        <paper-button on-tap="_checkBeforeSend" class="button button--save" disabled="[[cannotSend]]">[[localize('inv_send','Send',language)]]</paper-button>
                    </template>
                    <template is="dom-if" if="[[!api.tokenId]]" restamp="true">                   
                        <paper-button on-tap="" class="button button--other" disabled title="Pas de connexion ehealth active">[[localize('inv_send','Send',language)]]</paper-button>
                    </template> 
                </template>
            </div>
        </div>  
        
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
`
    }

    static get is() {
        return 'ht-msg-flatrate-mda-history'
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
            isLoading:{
                type: Boolean,
                value: false
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
        return []
    }

}

customElements.define(HtMsgFlatrateMdaHistory.is, HtMsgFlatrateMdaHistory)
