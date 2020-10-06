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
import './ht-msg-flatrate-invoice-summary';

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
import * as models from '@taktik/icc-api/dist/icc-api/model/models';

import {PolymerElement, html} from '@polymer/polymer'
import {TkLocalizerMixin} from "../../../tk-localizer"
import promiseLimit from "promise-limit"
import * as retry from "@taktik/icc-api/dist/icc-x-api/utils/net-utils"
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
                
                .modal-title {
                    justify-content: flex-start;
                }

                .modal-title iron-icon{
                    margin-right: 8px;
                }
                
            .exportMonthPicker {
                width: 100%;
            }
            
            .textAlignCenter {
                text-align:center;
            }     
 
            .sub-title{
                padding: 5px;
            }    
            
            .panel-flatrate-info-detail{
                padding: 10px;
                width: auto;
                height: 40px;
                overflow: auto;
            }   
            
            .bold{
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
                                <div class="td fg4">[[_getGroupInformation(group)]] - [[_getPatientNumber(group)]] [[localize('inv_pats', 'patients', 'language')]]</div>
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
        
        <template is="dom-if" if="[[_bodyOverlay]]">
                <div id="loadingContainer"></div>
            </template>
            <template is="dom-if" if="[[_isGeneratingInvoice]]">
                <div id="loadingContainer">
                    <div id="loadingContentContainer">
                        <div style="max-width:80px; margin:0 auto"><ht-spinner class="spinner" alt="Loading..." active></ht-spinner></div>
                        <div id="loadingContent"><p><iron-icon icon="arrow-forward" class="loadingIcon"></iron-icon> [[localize("mhListing.spinner.step_1", language)]]</p></div>
                    </div>
                </div>
            </template>
        
        <paper-dialog class="modalDialog" id="missingNihiiDialog" no-cancel-on-outside-click no-cancel-on-esc-key>
                <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
                <div class="content textaligncenter pt20 pb70 pl20 pr20">
                    <p class="fw700">[[localize('incompleteUserProfile','Incomplete user profile',language)]].</p>
                    <p class="">[[localize('provideNihiiNumber','Please provide your number',language)]] <b>[[localize('inami','INAMI',language)]]</b>.</p>
                    <p class="fw700"><iron-icon icon="communication:phone" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="tel:+3223192241" class="textDecorationNone">+32(0)2/319.22.41</a> - <iron-icon icon="icons:mail" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="mailto:support@topaz.care" class="textDecorationNone">support@topaz.care</a>.</p>
                </div>
                <div class="buttons">
                    <paper-button class="button button--other " on-tap="_closeDialogs"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                    <paper-button class="button button--save" on-tap="_gotoMyProfileTab1"><iron-icon icon="icons:settings"></iron-icon> [[localize('configure','Configure',language)]]</paper-button>
                </div>
            </paper-dialog>
            
        <paper-dialog class="modalDialog" id="missingMedicalHouseValorisations" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="fw700">[[localize('incompleteUserProfile','Incomplete user profile',language)]].</p>
                <p class="">[[localize('provideMissingValorisations','Please provide your flat rates',language)]].</p>
                <p class="fw700"><iron-icon icon="communication:phone" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="tel:+3223192241" class="textDecorationNone">+32(0)2/319.22.41</a> - <iron-icon icon="icons:mail" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="mailto:support@topaz.care" class="textDecorationNone">support@topaz.care</a>.</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other " on-tap="_closeDialogs"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_gotoMyAdmin"><iron-icon icon="icons:settings"></iron-icon>[[localize('configure','Configure',language)]]</paper-button>
            </div>
        </paper-dialog>
        
        <paper-dialog class="modalDialog" id="missingMedicalHousePtdValorisations" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="fw700">[[localize('incompleteUserProfile','Incomplete user profile',language)]].</p>
                <p class="">[[localize('provideMissingPtdValorisations',"Veuillez s'il vous plait renseigner vos tarifications forfaitaires pour le prétrajet de soin",language)]].</p>
                <p class="fw700"><iron-icon icon="communication:phone" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="tel:+3223192241" class="textDecorationNone">+32(0)2/319.22.41</a> - <iron-icon icon="icons:mail" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="mailto:support@topaz.care" class="textDecorationNone">support@topaz.care</a>.</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other " on-tap="_closeDialogs"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_gotoMyAdmin"><iron-icon icon="icons:settings"></iron-icon>[[localize('configure','Configure',language)]]</paper-button>
            </div>
        </paper-dialog>
        
        <paper-dialog class="modalDialog" id="noDataToExport" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="">[[localize('noDataToExport','We could not find any data to export',language)]].</p>
                <p class="fw700"><iron-icon icon="communication:phone" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="tel:+3223192241" class="textDecorationNone">+32(0)2/319.22.41</a> - <iron-icon icon="icons:mail" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="mailto:support@topaz.care" class="textDecorationNone">support@topaz.care</a>.</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other " on-tap="_closeDialogs"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
        
        <paper-dialog class="modalDialog" id="noHcpContactPerson" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="fw700">[[localize('incompleteUserProfile','Incomplete user profile',language)]].</p>
                <p class=" ">[[localize('missingMhHcpContactPerson1','Please provide an invoicing contact person',language)]].<br />[[localize('missingMhHcpContactPerson2','Required information for Insurances',language)]].</p>
                <p class="fw700"><iron-icon icon="communication:phone" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="tel:+3223192241" class="textDecorationNone">+32(0)2/319.22.41</a> - <iron-icon icon="icons:mail" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="mailto:support@topaz.care" class="textDecorationNone">support@topaz.care</a>.</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other " on-tap="_closeDialogs"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_gotoMyProfileTab1"><iron-icon icon="icons:settings"></iron-icon>[[localize('configure','Configure',language)]]</paper-button>
            </div>
        </paper-dialog>
        
        <paper-dialog class="modalDialog" id="noHcpBce" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="fw700">[[localize('incompleteUserProfile','Incomplete user profile',language)]].</p>
                <p class="">[[localize('missingMhBce','Please provide a valid BCE',language)]].</p>
                <p class="fw700"><iron-icon icon="communication:phone" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="tel:+3223192241" class="textDecorationNone">+32(0)2/319.22.41</a> - <iron-icon icon="icons:mail" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="mailto:support@topaz.care" class="textDecorationNone">support@topaz.care</a>.</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other " on-tap="_closeDialogs"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_gotoMyProfileTab2"><iron-icon icon="icons:settings"></iron-icon>[[localize('configure','Configure',language)]]</paper-button>
            </div>
        </paper-dialog>
        
        <paper-dialog class="modalDialog" id="noHcpBankAccount" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="fw700">[[localize('incompleteUserProfile','Incomplete user profile',language)]].</p>
                <p class="">[[localize('missingMhBankAccount','Please provide with a valid bank account',language)]].</p>
                <p class="fw700"><iron-icon icon="communication:phone" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="tel:+3223192241" class="textDecorationNone">+32(0)2/319.22.41</a> - <iron-icon icon="icons:mail" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="mailto:support@topaz.care" class="textDecorationNone">support@topaz.care</a>.</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other " on-tap="_closeDialogs"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_gotoMyProfileTab3"><iron-icon icon="icons:settings"></iron-icon>[[localize('configure','Configure',language)]]</paper-button>
            </div>
        </paper-dialog>
        
        <paper-dialog class="modalDialog" id="exportAlreadyRan" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="fw700">[[localize('flatRateInvoicingAlreadyRan','Incomplete user profile',language)]].</p>
                <p class="">[[localize('getInTouchWithUsToUnlock','Please provide with a valid bank account',language)]].</p>
                <p class="fw700"><iron-icon icon="communication:phone" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="tel:+3223192241" class="textDecorationNone">+32(0)2/319.22.41</a> - <iron-icon icon="icons:mail" class="mr5 smallIcon colorAppSecondaryColorDark" ></iron-icon> <a href="mailto:support@topaz.care" class="textDecorationNone">support@topaz.care</a>.</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other " on-tap="_closeDialogs"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
    
        <paper-dialog class="modalDialog" id="selectMonthDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="vaadin:calendar"></iron-icon> [[localize('j20_monthToGenerate','Month to generate',language)]]</h2>
            <div class="content textAlignCenter" style="max-height:calc(100% - 45px)">
                    <div class="exportMonthPicker pt90">
                        <vaadin-combo-box id="exportedMonth" filtered-items="[[_getExportMonthsList()]]" item-label-path="label" item-value-path="id" label="[[localize('month','Month',language)]]" value="[[_getExportCurrentMonth()]]" class="mr20"></vaadin-combo-box>
                        <vaadin-combo-box id="exportedYear" filtered-items="[[_getExportYearsList()]]" item-label-path="label" item-value-path="id" label="[[localize('year','Year',language)]]" value="[[_getExportCurrentYear()]]"></vaadin-combo-box>
<!--                        <vaadin-combo-box id="exportedOAs" filtered-items="[[_getExportOAsList()]]" item-label-path="label" item-value-path="id" label="[[localize('OA','OA',language)]]" value="[[_getExportOA()]]"></vaadin-combo-box>-->
<!--                        <vaadin-checkbox checked="[[overrideBatchNumber]]" on-tap="_overrideBatchNumberGotChanged">[[localize('override_batchnr','Override batch number',language)]]</vaadin-checkbox>-->
<!--                        <template is="dom-if" if="[[overrideBatchNumber]]"><paper-input label="[[localize('batchnr','Batch number',language)]]" value="{{batchNumber}}" class="batchNumberInput"></paper-input></template>-->
                    </div>
                    <div class="buttons">
                        <paper-button class="button button--save" dialog-confirm on-tap="_exportFlatRateInvoicing_dialogResult"><iron-icon icon="icons:cloud-download"></iron-icon> &nbsp; [[localize('invoicingExport','Télécharger la facturation',language)]]</paper-button>
                        <paper-button class="button button--other" dialog-dismiss >[[localize('cancel','Annuler',language)]]</paper-button>
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
        
        <!-- Medical Houses - Flatrate MDA calls already took place (this month) -->
        <paper-dialog class="modalDialog" id="routeGotRewritten" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title" style="justify-content: flex-start;"><iron-icon icon="vaadin:euro" class="mr8"></iron-icon> [[localize('fac_fla_rat','Facturation au forfait',language)]]</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="">[[localize('mh_eInvoicing.mdaAlreadyRan.text1',"La vérification des données du membre (MDA) a déjà été faite ce mois-ci.",language)]]</p>
                <p class="fw700">[[localize('mh_eInvoicing.mdaAlreadyRan.text2',"Vous pouvez à présent procéder à votre facturation.",language)]]</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other" dialog-dismiss><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>  

        <ht-pat-flatrate-utils id="flatrateUtils" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" i18n="[[i18n]]" resources="[[resources]]" no-print></ht-pat-flatrate-utils>
        <ht-msg-flatrate-invoice-summary id="htMsgFlatrateInvoiceSummary" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" resources="[[resources]]" list-of-invoice="[[listOfInvoice]]" on-send-invoice="sendInvoices"></ht-msg-flatrate-invoice-summary>
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
            _isGeneratingInvoice: {
                type: Boolean,
                value: false,
                observer: '_loadingStatusChanged'
            },
            _bodyOverlay: {
                type: Boolean,
                value: false
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
            console.log("lastsend maysend", lastSend, maySend)
            this.set('cannotSend', maySend)

        }
    }

    _getGroupInformation(group){
        return _.get(_.head(group), 'parentInsuranceDto.code', null)+": "+_.get(_.head(group), 'parentInsuranceDto.name.'+this.language, null)
    }

    _getPatientNumber(group){
        return _.size(group)
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
        //this.set('checkBeforeSendEfact.ssinCheck', !_.get(this.hcp, 'ssin', null))
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

        if(_.size(_.get(this, 'patientWithoutMutuality', [])) > 0 || _.get(this, 'checkBeforeSendEfact.inamiCheck', null) === true ||
            _.get(this, 'checkBeforeSendEfact.bceCheck', null) === true || _.get(this, 'checkBeforeSendEfact.ibanCheck', null) === true || _.get(this, 'checkBeforeSendEfact.bicCheck', null) === true ||
            _.get(this, 'checkBeforeSendEfact.invoiceCheck100', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck200', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck300', null) === false ||
            _.get(this, 'checkBeforeSendEfact.invoiceCheck306', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck400', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck500', null) === false ||
            _.get(this, 'checkBeforeSendEfact.invoiceCheck600', null) === false || _.get(this, 'checkBeforeSendEfact.invoiceCheck900', null) === false){
            this.shadowRoot.querySelector('#checkBeforeSendingDialog').open()
        }else{
            this._showSummaryDialog()

        }
    }

    _showSummaryDialog(){
        this.shadowRoot.querySelector("#htMsgFlatrateInvoiceSummary")._openSummaryDialog()
    }

    _closeSummaryDialog(){
        this.shadowRoot.querySelector("#htMsgFlatrateInvoiceSummary")._closeSummaryDialog()
    }


    checkIfDoubleInvoiceNumber(invoices, startOfRange, endOfRange){
        if(startOfRange === 300 && endOfRange === 400){
            return _.uniq(_.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange && i.insuranceCode !== "306").map( i => parseInt(i.invoiceReference)))).length === _.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange && i.insuranceCode !== "306").map( i => parseInt(i.invoiceReference))).length
        }else{
            return _.uniq(_.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange).map( i => parseInt(i.invoiceReference)))).length === _.sortBy(invoices.filter(i => i.insuranceCode >= startOfRange && i.insuranceCode < endOfRange).map( i => parseInt(i.invoiceReference))).length
        }
    }

    getContactPersonHcp(){
        return this.api.hcparty().getHealthcareParty(this.hcp.contactPersonHcpId)
    }

    sendInvoices(){
        //todo
        this._closeSummaryDialog()
        this.shadowRoot.querySelector('#checkBeforeSendingDialog') ? this.shadowRoot.querySelector('#checkBeforeSendingDialog').close() : null
        this.set('progressItem', [])
        this.getContactPersonHcp().then(contactPersonHcp => {
            this.hcp.ssin = _.get(contactPersonHcp, "ssin", null)
            const lastSend = parseInt(localStorage.getItem('lastInvoicesSent')) ? this.api.moment(parseInt(localStorage.getItem('lastInvoicesSent'))).format('YYYY-MM-DD') : '2000-01-01'
            const maySend =  !this.api.moment(lastSend).isSame(this.api.moment(Date.now()).format('YYYY-MM-DD'))

            if (maySend) {
                this.set('cannotSend',true)
                //localStorage.setItem('lastInvoicesSent', Date.now())
                this.shadowRoot.querySelector('#sendingDialog').open()
                this.set('isSending', true)
                this.push('progressItem', this.localize('inv-step-1', 'inv-step-1', this.language))

                let prom = Promise.resolve()
                //_.chain(_.head(_.chunk(this.listOfInvoice.filter(inv => _.get(inv, 'insurabilityCheck', false) === true && _.get(inv, 'sendingFlag', false) === true), 100)))
                _.chain(this.listOfInvoice.filter(inv => _.get(inv, 'insurabilityCheck', false) === true && _.get(inv, 'sendingFlag', false) === true))
                    .groupBy(fact => fact.insuranceParent)
                    .toPairs().value()
                    .forEach(([fedId,invoices]) => {
                        prom = prom.then(() =>
                            this.api.message().sendBatch(
                                this.user,
                                this.hcp,
                                invoices.map(iv=>({invoiceDto:iv.invoice, patientDto:_.omit(iv.patient, ['personalStatus'])})),
                                _.get(this.api, 'keystoreId', null),
                                _.get(this.api, 'tokenIdMH', null),
                                _.get(this.api, 'credentials.ehpassword', null),
                                this.api.fhc().Efact(),
                                undefined,
                                (fed, hcpId) => Promise.resolve(`efact:${hcpId}:${fed.code === "306" ? "300" : fed.code}:`),
                                false,
                                'medicalhouse'
                            )
                        ).then(message => {
                            console.log(message)
                            this.push('progressItem', this.localize('inv-step-2', 'inv-step-2', this.language)+' '+_.get(message, 'metas.ioFederationCode', ""))
                            this.api.register(message,'message')
                        }).then(() => {
                            let subProm = Promise.resolve()
                            invoices.map(inv => {
                                //remove tag flatRateLastInvoiced
                                _.remove(_.get(inv, 'patient.tags', []).find(tag => tag.type === "flatRateLastInvoiced"))
                                !_.get(inv, 'patient.tags', null) ? _.assign(inv.patient, {tags: []}) : null

                                //added new tag flatRateLastInvoiced
                                inv.patient.tags.push({
                                    type: "flatRateLastInvoiced",
                                    code: moment().startOf('month').format("YYYYMMDD")
                                })

                                //modify patient
                                subProm = subProm.then(modifiedPatList => this.api.patient().modifyPatientWithUser(this.user, inv.patient).then(pat => _.concat(modifiedPatList, pat)))
                            })

                            subProm.then(modifiedPatList => {
                                console.log(_.compact(modifiedPatList))
                            })
                        })
                    })

                return prom.then(() => {
                    this.set('isSending',false)
                    this.shadowRoot.querySelector('#sendingDialog').close()
                    this.getMessage(true)
                })
        }})
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
        this._exportFlatRateInvoicing_step2_v2()
    }



    _createOrUpdateMedicalHousePatientsInvoices(patsToInvoice) {

        let prom = Promise.resolve([])
        const patsCount = _.size(patsToInvoice)
        const childrenInsurancesData = _.get(this,"flatRateInvoicingDataObject.insurancesData", [])

        patsToInvoice.forEach((pat,loopIndex) => {
            prom = prom.then(pats =>
                this.api.crypto().extractDelegationsSFKs(pat, this.user.healthcarePartyId)
                    .then(secretForeignKeys => {

                        const patInsuranceId = _.trim(_.get(pat,"finalInsurability.insuranceId"))
                        const patInsuranceParentId = _.trim(_.get(_.find(childrenInsurancesData, {id:patInsuranceId}), "parent"))
                        const patParentInsuranceData = _.find(this.flatRateInvoicingDataObject.iosData, {id:patInsuranceParentId})

                        //TODO re-enable filtered invoice creation (maybe obsolete)
                        const includePat = true
                        // const includePat = this.flatRateInvoicingDataObject.exportedOA === 'all' || this.flatRateInvoicingDataObject.exportedOA === patParentInsuranceData.code

                        // Update PTD last invoiced date should we do so
                        _.some(_.get(pat,"invoicingCodes", []), ic => _.trim(_.get(ic,"code")) === "109594") && this._patPTDYearToInvoice(pat) ? this._updatePatPTD(pat, this._patPTDYearToInvoice(pat)).then(res =>{ console.log("_updatePatPTD done", res) }) : null

                        return !includePat || !patInsuranceId || !patInsuranceParentId || !_.size(patParentInsuranceData) ? null : retry.retry(() => (this.api.invoice().appendCodes(this.user.id, "patient", "efact", secretForeignKeys.extractedKeys.join(","), _.trim(_.get(pat,"finalInsurability.insuranceId")), null, 0, _.get(pat,"invoicingCodes",[]))))
                            .then(invoices => !_.trim(_.get(invoices, "[0].id", "")) ?
                                this.api.invoice().newInstance(this.user, pat, _.head(invoices)).then(inv => {
                                    inv.printedDate =  moment().format("YYYYMMDD")
                                    inv.careProviderType = "medicalhouse"
                                    return inv
                                }).then(inv => retry.retry(() => (this.api.invoice().createInvoice(inv, 'invoice:' + _.trim(_.get(this,"user.healthcarePartyId")) + ':' + (_.trim(_.get(patParentInsuranceData,"code")) ? _.trim(_.get(patParentInsuranceData,"code")) : '000') + ':')))) :
                                Promise.resolve(invoices[0])
                            )
                            .then(newInvoice => {

                                // if(this.invoiceHasDoubles(newInvoice)){
                                //
                                //     // Drop duplicated codes
                                //     pat.invoicingCodes.forEach(pic => { newInvoice.invoicingCodes = _.remove(newInvoice.invoicingCodes, ic => ic.dateCode === pic.dateCode && ic.code === pic.dateCode); });
                                //     newInvoice.invoicingCodes = newInvoice.invoicingCodes.concat(pat.invoicingCodes);
                                //     newInvoice.printedDate =  moment().format("YYYYMMDD")
                                //     newInvoice.careProviderType = "medicalhouse"
                                //     // && Update invoice
                                //     return this.api.invoice().modifyInvoice(newInvoice).then(inv =>this.api.register(inv,'invoice'))
                                //         .then(newInvoiceMod => {
                                //
                                //             pat.invoices = [newInvoiceMod]
                                //             this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_4',this.language) + " " + (loopIndex+1) + "/" + patsCount, icon:"arrow-forward", updateLastMessage: true, done:false});
                                //             return _.concat(pats, [pat])
                                //         });
                                //
                                // } else {
                                //     pat.invoices = [newInvoice]
                                //     this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_4',this.language) + " " + (loopIndex+1) + "/" + patsCount, icon:"arrow-forward", updateLastMessage: true, done:false});
                                //     return _.concat(pats, [pat])
                                //
                                // }

                                pat.invoices = [newInvoice]
                                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_4',this.language) + " " + (loopIndex+1) + "/" + patsCount, icon:"arrow-forward", updateLastMessage: true, done:false});
                                return _.concat(pats, [pat])

                            })
                    })
            )
        })

        return prom
    }

    invoiceHasDoubles(inv){
        let hasDouble = false;
        inv.invoicingCodes.forEach(ic => {
            const ics = inv.invoicingCodes.filter(icf => icf.dateCode === ic.dateCode && icf.code === ic.code);
            if(_.size(ics) > 1) hasDouble = true;
        });
        return hasDouble;
    }

    _showWarningNoHcpFlatrateTarification() {
        this.set("_bodyOverlay", true);
        this.$["missingMedicalHouseValorisations"].open()
    }

    _showWarningNoHcpFlatratePtdTarification() {
        this.set("_bodyOverlay", true);
        this.$["missingMedicalHousePtdValorisations"].open()
    }

    _showWarningNoDataToExport() {
        this.set("_bodyOverlay", true);
        this.$["noDataToExport"].open()
    }

    _showWarningNoHcpContactPerson() {
        this.set("_bodyOverlay", true);
        this.$["noHcpContactPerson"].open()
    }

    _showWarningNoCbe() {
        this.set("_bodyOverlay", true);
        this.$["noHcpBce"].open()
    }

    _showWarningNoBankAccount() {
        this.set("_bodyOverlay", true);
        this.$["noHcpBankAccount"].open()
    }

    _showWarningExportAlreadyRan() {
        this.set("_bodyOverlay", true);
        this.$["exportAlreadyRan"].open()
    }

    _showWarningNoHcpNihii() {
        this.set("_bodyOverlay", true);
        this.$["missingNihiiDialog"].open()
    }

    _getExportMonthsList() {
        let toReturn = [];
        for(let i=1; i<=12; i++) toReturn.push({id: i, label: this.localize('month_'+i,this.language) })
        return toReturn
    }

    _getExportOAsList(){
        let toReturn= [
            {id: 'all', label: this.localize('all', 'all', this.language)},
            {id: '100', label: '100'},
            {id: '200', label: '200'},
            {id: '300', label: '300'},
            {id: '400', label: '400'},
            {id: '500', label: '500'},
            {id: '600', label: '600'},
            {id: '900', label: '900'},
        ]
        return toReturn
    }

    _getExportOA(){
        return 'all'
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

    // {
    //     "type": {
    //         "identifier": "PreTrajDiab",
    //         "type": "JSON",
    //         "unique": false,
    //         "localized": false,
    //         "_attachments": {},
    //         "_id": "cb070790-058c-4146-8707-90058c714622",
    //         "java_type": "org.taktik.icure.entities.PropertyType",
    //         "rev_history": {}
    //     },
    //     "typedValue": {
    //         "type": "STRING",
    //         "stringValue": "{\"start\":\"2020-02-27T23:00:00+0000\",\"end\":\"2020-02-27T23:00:00+0000\",\"dmf\":\"\"}"
    //     },
    //     "_attachments": {},
    //     "java_type": "org.taktik.icure.entities.Property",
    //     "rev_history": {}
    // }

    _patHasPTD(pat, invDate){
        //Temporary solution: as migrated from Pricare: in pat.properties
        // identifier: PreTrajDiab
        // stringValue:
        //            {start: "2019-05-01T00:00:00+0000", end: "...", dmf:"2019/05"}
        const propPTD = _.get(pat, 'properties', []).find(prop => _.get(prop, 'type.identifier', null) === "PreTrajDiab")
        // console.log("propPTD", propPTD)
        const ptdValue = propPTD ? _.get(propPTD, 'typedValue.stringValue', null) : null
        const ptd = ptdValue ? JSON.parse(ptdValue) : null
        // console.log("ptd",ptd)
        return ptdValue ? (this._isPTDInvoicable(ptd, invDate)) : false
    }

    _updatePatPTD(pat, newDate){
        return this.api.patient().getPatientWithUser(this.user, pat.id)
            .then(patient => {
                const propPTD = _.get(patient, 'properties', []).find(prop => _.get(prop, 'type.identifier', null) === "PreTrajDiab")
                const ptdValue = propPTD ? _.get(propPTD, 'typedValue.stringValue', null) : null
                const ptd = ptdValue ? JSON.parse(ptdValue) : null
                ptd.dmf = this.api.moment(newDate.toString()).format('YYYY/MM')
                propPTD.typedValue.stringValue = JSON.stringify(ptd)
                return this.api.patient().modifyPatientWithUser(this.user, patient)
                    .then(p => this.api.register(p, 'patient'))
            })
    }

    _isPTDInvoicable(ptd, invDate){
        // 1. startdate is before or equal to invdate
        // 2. enddate is after invdate or before 01/01/1900
        // 3. dmf is empty of 1yr before invdate
        // console.log("_isPTDInvoicable", ptd, invDate)
        const startDate = this.api.moment(ptd.start)
        const endDate = this.api.moment(ptd.end)
        const dmfAniv = !!ptd.dmf ? this.api.moment(ptd.dmf + "/01").add('years', 1) : null
        const invDateTmp = this.api.moment(invDate)
        return !!startDate && startDate.isSameOrBefore(invDateTmp, 'day') && (startDate.isAfter(this.api.moment("19001231")))
            && (endDate.isBefore(this.api.moment("19000101"))|| endDate.isAfter(invDateTmp))
            && (!dmfAniv || dmfAniv.isSameOrBefore(invDateTmp, 'day'))
    }

    _patPTDYearToInvoice(pat){
        const propPTD = _.get(pat, 'properties', []).find(prop => _.get(prop, 'type.identifier', null) === "PreTrajDiab")
        const ptdValue = propPTD ? _.get(propPTD, 'typedValue.stringValue', null) : null
        const ptd = ptdValue ? JSON.parse(ptdValue) : null

        const startDate = this.api.moment(ptd.start)
        const dmfAniv = !!ptd.dmf ? this.api.moment(ptd.dmf + "/01").add('years', 1) : null

        return parseInt((dmfAniv ? dmfAniv : startDate).format('YYYYMMDD'))
    }

    _closeDialogs() {
        this.set("_bodyOverlay", false);
        _.map( this.shadowRoot.querySelectorAll('.modalDialog'), i=> i && typeof i.close === "function" && i.close() )
    }

    openRewriteRouteDialog() {

        return this.shadowRoot.getElementById("routeGotRewritten") && this.shadowRoot.getElementById("routeGotRewritten").open()

    }

    _gotoMyProfileTab1() {
        this._closeDialogs()
        this.dispatchEvent(new CustomEvent('trigger-open-my-profile', { bubbles: true, composed: true, detail: {tabIndex:0} }));
    }

    _gotoMyProfileTab2() {
        this._closeDialogs()
        this.dispatchEvent(new CustomEvent('trigger-open-my-profile', { bubbles: true, composed: true, detail: {tabIndex:1} }));
    }

    _gotoMyProfileTab3() {
        this._closeDialogs()
        this.dispatchEvent(new CustomEvent('trigger-open-my-profile', { bubbles: true, composed: true, detail: {tabIndex:2} }));
    }

    _gotoMyAdmin() {
        this._closeDialogs()
        this.dispatchEvent(new CustomEvent('trigger-goto-admin', { bubbles: true, composed: true, detail: {} }));
    }

    _exportFlatRateInvoicing_step2_v2() {

        const promResolve = Promise.resolve()
        const flatRateUtil = this.$.flatrateUtils;

        const exportedYear = _.trim(parseInt(parseInt(_.get(this.shadowRoot.getElementById("exportedYear"), "value"))||this._getExportCurrentYear()))
        let exportedMonth = _.trim(parseInt(parseInt(_.get(this.shadowRoot.getElementById("exportedMonth"), "value"))||this._getExportCurrentMonth())); exportedMonth = exportedMonth.length === 1 ? "0" + exportedMonth : exportedMonth;

        const exportedDate = exportedYear + exportedMonth + "01"
        const exportedDateMoment = moment(exportedDate, "YYYYMMDD")

        // DEVELOPERS ONLY (reset pat's tag of type "flatRateLastInvoiced" and "code" >= exportedDate)
        //return flatRateUtil.resetPatientsLastInvoicedTagByMaxExportedDate(exportedDate);

        return promResolve

            // 1 - Init
            .then(() => {

                this._resetLoadingMessage();
                this.set('isLoading', true );
                this.set('_isGeneratingInvoice', true );
                this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_1',this.language), icon:"arrow-forward"});
                // Force refresh - could be new "valorisation" / bce / bank account / contact person / ... was just set
                return _.size(_.get(this.api.hcparty().cache, _.get(this.user, "healthcarePartyId", "" ))) ? delete this.api.hcparty().cache[_.get(this.user, "healthcarePartyId", "" )] : null

            })

            // 2 - Get current HCP / MH
            .then(() => this.api.hcparty().getHealthcareParty(_.trim(_.get(this,"user.healthcarePartyId"))).then(hcp => this.set("hcp", hcp)))

            // 3 - Verify requirements
            .then(() => {

                if (!_.trim(_.get(this, "hcp.nihii", ""))) throw new Error("no-nihii");

                this.flatRateInvoicingDataObject = {
                    iosData: [],
                    insurancesData: [],
                    createdInvoicesAndPats: [],
                    patientsOfExportedMonth: [],
                    hcpValorisationsByMonth: [],
                    exportedDate: exportedDate,
                    exportedOA: _.get(this.shadowRoot.getElementById("exportedOAs"), "value", 'all'),
                    hcpData: {
                        id: _.trim(_.get(this.hcp, "id")),
                        name: _.trim(_.get(this.hcp, "name")) ? _.trim(_.get(this.hcp, "name")) : _.trim(_.get(this.user, "name")) ? _.trim(_.get(this.user, "name")) : _.trim(_.trim(_.get(this.hcp, "firstName", "")) + " " + _.trim(_.get(this.hcp, "lastName", ""))),
                        address: _.chain(_.get(this.hcp, "addresses", {})).filter({addressType: "work"}).head().value() || _.chain(_.get(this.hcp, "addresses", {})).filter({addressType: "home"}).head().value() || _.chain(_.get(this.hcp, "addresses", {})).head().value() || {},
                        cbe: _.trim(_.get(this.hcp, "cbe", "")),
                        nihii: _.trim(_.get(this.hcp, "nihii", "")),
                        nihiiFormated: this.api.formatInamiNumber(_.trim(_.get(this.hcp, "nihii", ""))),
                        contactPersonHcpId: _.trim(_.get(this.hcp, "contactPersonHcpId", "")),
                        contactPerson: "",  // Make it empty at first, done on purpose
                        financialInfo: _.head(_.filter(_.get(this.hcp, "financialInstitutionInformation", []), i => _.trim(_.get(i, "bankAccount", ""))))
                    }
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



                // Hcp doesn't have the PTD valorisations yet
                const mhPtdValorisations = _.find(_.get(this, "hcp.flatRateTarifications", []), {code:"109594"})
                if(!_.size(mhPtdValorisations)) throw new Error("missing-ptd-valorisation")



                // Get valorisations for last X months - as of export date
                let valorisationMonths = [];
                for (let i = 0; i < 48; i++) { valorisationMonths.push(_.trim(moment(_.trim(this.flatRateInvoicingDataObject.exportedDate), "YYYYMMDD").startOf('month').subtract(i, "month").format("YYYYMMDD"))) }
                this.flatRateInvoicingDataObject.hcpValorisationsByMonth = valorisationMonths.map(valorisationMonth => {
                    return {
                        month: parseInt(valorisationMonth),
                        valorisations: _.merge(
                            [
                                {code: "109616", price: 0.00, flatRateType: "physician"},           // Doctor
                                {code: "509611", price: 0.00, flatRateType: "physiotherapist"},     // Kine
                                {code: "409614", price: 0.00, flatRateType: "nurse"},               // Nurse
                                {code: "109594", price: 0.00, flatRateType: "ptd"}                  // Prétrajet de soin diabète
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



                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_1_done',this.language), icon:"check-circle", updateLastMessage: true, done:true})
                return this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_2',this.language), icon:"arrow-forward"})



            })

            // 4 - Get all patients of mine, valid for export
            //      a) Has to be active
            //      b) SSIN must be valid (because of mda call)
            //      c) Has to be alive (not deceased before exportedDate)
            //      d) 1+ valid MHC (versus exportedDate)
            //      e) 1+ valid INS (versus exportedDate)
            //      f) Not already exported (versus exportedDate)
            //      g) Rules (some) can be overridden if patient was forced as valid (using mda flow)
            .then(() => flatRateUtil.getPatientsEligibleForInvoicingByExportedDate(exportedDate).then(patientsToExportThisMonth => _.assign(this.flatRateInvoicingDataObject, {patientsOfExportedMonth:patientsToExportThisMonth})))

            // 5 - Collect insurances
            .then(() => {
                if(!_.size(_.get(this,"flatRateInvoicingDataObject.patientsOfExportedMonth",[]))) throw new Error("no-data-to-export")
                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_2_done',this.language), icon:"check-circle", updateLastMessage: true, done:true})
                this._setLoadingMessage({ message:this.localize('mhInvoicing.collectInsurances',this.language), icon:"arrow-forward"})
                return this._getInsurancesDataByPatientsList(_.get(this,"flatRateInvoicingDataObject.patientsOfExportedMonth",[])).then(insurancesData => _.assign(this.flatRateInvoicingDataObject, {insurancesData:insurancesData}))
            })

            // 6 - Collect IO's
            .then(() => this._getIOsDataByInsurancesList(_.get(this,"flatRateInvoicingDataObject.insurancesData",[])).then(iosData =>  _.assign(this.flatRateInvoicingDataObject, {iosData:iosData})))

            // 7 - Generate invoices
            .then(() => {

                this._setLoadingMessage({ message:this.localize('mhInvoicing.collectInsurances_done',this.language), icon:"check-circle", updateLastMessage: true, done:true})
                this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_4',this.language), icon:"arrow-forward"})

                const patientsToInvoiceIncludingPTD = _.compact(_.concat(
                    _.get(this,"flatRateInvoicingDataObject.patientsOfExportedMonth",[]),
                    _.map(_.get(this,"flatRateInvoicingDataObject.patientsOfExportedMonth",[]), patToInvoice => this._patHasPTD(patToInvoice, _.trim(_.get(this,"flatRateInvoicingDataObject.exportedDate"))) ? _.merge({},patToInvoice,{isPtd:true}) : false )
                ))

                return this._createOrUpdateMedicalHousePatientsInvoices(
                    _.map(patientsToInvoiceIncludingPTD, patToInvoice => {

                        const isPtdPat = _.get(patToInvoice,"isPtd",false)
                        const finalMhc = _.get(patToInvoice,"finalMedicalHouseContract",{})
                        const valorisationsOfExportedMonth = _.get(_.find(_.get(this,"flatRateInvoicingDataObject.hcpValorisationsByMonth",[]), valByMonth => parseInt(_.get(valByMonth,"month")) === parseInt(exportedDate)), "valorisations",[])
                        const ptdValorisationsOfExportedMonth = !isPtdPat ? null : _.get(_.find(_.get(this,"flatRateInvoicingDataObject.hcpValorisationsByMonth",[]), valByMonth => parseInt(_.get(valByMonth,"month")) === parseInt(this._patPTDYearToInvoice(patToInvoice))), "valorisations",[])

                        const invoicingCodes = _.compact(_.concat(
                            [],
                            _.get(finalMhc,"gp",false) && !isPtdPat ? _.find(valorisationsOfExportedMonth, {flatRateType: "physician"}) : [],
                            _.get(finalMhc,"kine",false) && !isPtdPat ? _.find(valorisationsOfExportedMonth, {flatRateType: "physiotherapist"}) : [],
                            _.get(finalMhc,"nurse",false) && !isPtdPat ? _.find(valorisationsOfExportedMonth, {flatRateType: "nurse"}) : [],
                            isPtdPat ? _.find(ptdValorisationsOfExportedMonth, {flatRateType: "ptd"}) : [],
                        ))

                        return _.assign({}, patToInvoice, { invoicingCodes: _.map(invoicingCodes, ic => ({
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
                                contractDate: parseInt(_.get(patToInvoice, "finalMedicalHouseContract.startOfContract"))||0
                            }))})

                    })
                )

            })

            // 8 - Invoices are generated
            .then(createdInvoicesAndPats => (_.assign(this.flatRateInvoicingDataObject, {createdInvoicesAndPats: createdInvoicesAndPats})||true) && this._setLoadingMessage({ message:this.localize('mhInvoicing.spinner.step_4_done',this.language), icon:"check-circle", updateLastMessage: true, done:true}))

            .catch(e => (console.log("[ERROR] _exportFlatRateInvoicing_step2_v2", e)||true) && (
                ( _.trim(e).indexOf('no-nihii') > -1 ) ? this._showWarningNoHcpNihii() && e :
                ( _.trim(e).indexOf('missing-flatrate-tarification') > -1 ) ? this._showWarningNoHcpFlatrateTarification() && e :
                ( _.trim(e).indexOf('no-data-to-export') > -1 ) ? this._showWarningNoDataToExport() && e :
                ( _.trim(e).indexOf('missing-contact-person') > -1 ) ? this._showWarningNoHcpContactPerson() && e :
                ( _.trim(e).indexOf('missing-cbe') > -1 ) ? this._showWarningNoCbe() && e :
                ( _.trim(e).indexOf('missing-bank-account') > -1 ) ? this._showWarningNoBankAccount() && e :
                ( _.trim(e).indexOf('export-already-ran') > -1 ) ? this._showWarningExportAlreadyRan() && e :
                ( _.trim(e).indexOf('missing-ptd-valorisation') > -1 ) ? this._showWarningNoHcpFlatratePtdTarification() && e :
                e
            ))

            .finally(()=>{
                console.log("[FINALLY] flatRateInvoicingDataObject", this.flatRateInvoicingDataObject);
                this.flatRateInvoicingDataObject = {}
                this.set('isLoading', false );
                this.set('_isGeneratingInvoice', false );
                this.set('activeGridItem', null );
                this.set('messagesCachedData', null );
                this.set('messagesGridData', [] );
                this.set('messagesGridDataReset', [] );
                this._refreshInvoiceList();
            })

    }



}

customElements.define(HtMsgFlatrateInvoiceToBeSend.is, HtMsgFlatrateInvoiceToBeSend)
