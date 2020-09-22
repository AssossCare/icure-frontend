import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../dynamic-form/ht-regimen-day.js';

import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-dropdown-menu/paper-dropdown-menu"
import "@polymer/paper-icon-button/paper-icon-button"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-item/paper-item"
import "@polymer/paper-listbox/paper-listbox"
import "@polymer/iron-autogrow-textarea/iron-autogrow-textarea"

import './posology/ht-pat-precription-detail-posology-frequency-editor.js'

import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/shared-styles.js';
import '../../../../styles/buttons-style.js';
import '../../../../styles/dropdown-style.js';
import '../../../../styles/icd-styles.js';
import '../../../../styles/icpc-styles.js';
import '../../../../styles/paper-input-style.js';
import '../../../../styles/spinner-style.js';
import '../../../../styles/tk-token-field-style.js';
import '../../../../styles/atc-styles.js';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash";

class HtPatPrescriptionDetailPosology extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {

    static get template() {
        return html`

            <style include="dialog-style scrollbar-style shared-styles buttons-style dropdown-style icd-styles icpc-styles paper-input-styles spinner-style tk-token-field-style atc-styles">
            
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
                
                .fg5{
                    flex-grow: 4.6;
                }
                
                .posology-container{
                    height: calc(100% - 20px);
                    width: auto;
                    border: 1px solid var(--app-background-color-dark);
                    margin: 5px;
                }
                
                .medication-container{
                    height: calc((100% / 2) - 10px);
                    margin: 5px;
                    width: auto;
                    border: 1px solid var(--app-background-color-dark);
                }
                
                .prescription-container{
                    height: calc((100% / 2) - 10px);
                    margin: 5px;
                    width: auto;
                    border: 1px solid var(--app-background-color-dark);
                }
                
                .header-title{
                    font-size: var(--font-size-large);
                    background: var(--app-background-color-dark);
                    padding: 0 12px;
                    box-sizing: border-box;
                }
                
                .medication-container-content{
                    height: calc(100% - 30px);
                    overflow: auto;
                }
                
                .prescription-container-content{
                
                }
                
                .posology-container-content{
                    height: calc(100% - 30px);
                }
                
                .posology-title{
                    padding: 5px;
                    box-sizing: border-box;
                    position: relative;
                }
                
                .bold{
                    font-weight: bold;         
                }
                
                .fs16{
                    font-size: 16px;
                }
                
                .header-icon{
                    height: 15px;
                    width: 15px;
                }

                .infoIcon {
                    width:24px;
                    height:24px;
                    padding:4px;
                }

                .infoIconBlue {
                    color:#0054ff;
                }
                
                .infoIconMore {
                    position:absolute;
                    top:5px;
                    right:5px;
                    color:var(--app-secondary-color);
                }
                
                .regimen-line {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: flex-start;
                }
    
                .regimen-line.block{
                    justify-content: flex-start;
                    align-items: flex-end;
                    height: 46px;
                    padding: 0 0 16px 0;
                }
    
                .regimen-line paper-icon-button {
                    height: 16px;
                    width: 16px;
                    padding: 0px;
                    margin-right: 8px;
                }
                .regimen-line vaadin-checkbox {
                    margin-right: 8px;
                }
                .regimen-line div {
                    /*align-self: flex-end;*/
                    /*margin-bottom: 8px;*/
                    /*width: auto;*/
                }
                .regimen-line paper-input[type=number] {
                    margin-right: 8px;
                    width: 128px;
                }
                .regimen-line paper-input[type=text] {
                    margin-right: 8px;
                }
    
                .regimen-line paper-dropdown-menu {
                    margin-right: 8px;
                }
    
                .regimen-line.block .renewal-input{
                    max-height: 42px;
                    min-height: 0;
                    max-width: 50px;
                    text-align: center;
                    --paper-input-container: {
                        padding: 0;
                    }
                }
                
                .regimen-line.block paper-dropdown-menu {
                    margin-right: 8px;
                    --paper-dropdown-menu-input: {
                        height: 42px;
                        padding: 0;
                    };
                    --paper-input-container: {
                        padding: 0;
                    };
                    --paper-input-container-focus-color: var(--app-primary-color);
                }
    
                .regimen-line.block span{
                    margin-right: 4px;
                }
    
                .regimen-line.block paper-checkbox{
                    margin-right: 8px;
                    --paper-checkbox-checked-color: var(--app-secondary-color);
                }
    
                .regimen-line vaadin-date-picker {
                    margin-right: 8px;
                    margin-top: 18px;
                    cursor: pointer;
                }
    
                .regimen--frequency {
                    margin: auto;
                }
    
                .regimen--tod {
                    margin: auto;
                    margin: 0 4px;
                    flex-grow: 1;
                }
    
                .regimen--quantity {
                    margin-right: 4px;
                    width: 80px;
                    text-align: right;
                }
    
                .regimen-grid-quantity {
                    margin-left: auto;
                    margin-right: auto;
                    width: 48px;
                    text-align: center;
                    position: relative;
                    --paper-input-container-underline: {
                        border-color: transparent;
                    };
                    --paper-input-container-input: {
                        transition: all .12s cubic-bezier(0.075, 0.82, 0.165, 1);
                    };
                }
    
                .regimen-grid-quantity:hover{
                    --paper-input-container-input: {
                        background: var(--app-background-color-darker);
                    }
                }
    
                .regimen--units {
                    margin: auto;
                    width: 168px;
                }
    
                .regimen--datepicker {
                    max-width: 152px;
                    cursor: pointer;
                    flex: 1;
                }
    
                .regimen-extra {
                    display: flex;
                    flex-direction: row;
                }
                    
                .regimen-lines {
                    border-top: 1px solid var(--app-background-color-dark);
                    margin-bottom: auto;
                    padding: 0 12px;
                }
                
                .allergy-alert {
                }
                
                .allergy-title {
                    color: var(--app-error-color-dark);
                }
                
            </style>
            
            <template is="dom-if" if="[[isLoading]]" restamp="true"><ht-spinner active="[[isLoading]]"></ht-spinner></template>            
            
            <div class="posology-container">
            
                <!--don't touch just need more graphic improve-->
            
                <div class="posology-title">
                
                    <h3 class="m0"><iron-icon class="header-icon" icon="[[_getDrugType(medication)]]"></iron-icon> [[medicationDetail.label]] 
                        <template is="dom-if" if="[[_isDoping(medicationDetail)]]"><iron-icon icon="medication-svg-icons:[[_getDopingIcon(medicationDetail)]]" id="doping_[[medicationDetail.id]]" class="table-icon"</iron-icon><paper-tooltip for="doping_[[medicationDetail.id]]" position="right" animation-delay="0">[[localize('presc-narco', 'Doping', language)]]</paper-tooltip></template>
                        <template is="dom-if" if="[[_isBlackTriangle(medicationDetail)]]"><iron-icon icon="medication-svg-icons:[[_getBlackTriangleIcon(medicationDetail)]]" id="bt_[[medicationDetail.id]]" class="table-icon"></iron-icon><paper-tooltip for="bt_[[medicationDetail.id]]" position="right" animation-delay="0">[[localize('presc-new-act-ing', 'New active ingredient', language)]]</paper-tooltip></template>                                                
                        <template is="dom-if" if="[[_isRma(medicationDetail)]]"><iron-icon icon="medication-svg-icons:[[_getRmaIcon(medicationDetail)]]" id="rma_[[medicationDetail.id]]" class="table-icon" on-tap="_openRmaLink"></iron-icon><paper-tooltip for="rma_[[medicationDetail.id]]" position="right" animation-delay="0">[[localize('presc-new-rma', 'Risk Minimisation Activities', language)]]</paper-tooltip></template>                                                
                    </h3>
                    <p class="m0 mt5">
                        <template is="dom-if" if="[[medicationDetail.id]]">
                            <paper-icon-button id="CBIPLink[[medicationDetail.id]]" class="infoIcon" src="[[_getCbipPicture()]]" role="button" on-tap="_openCbipLink"></paper-icon-button>
                            <paper-tooltip id="tt_CBIPLink[[medicationDetail.id]]" position="right" for="CBIPLink[[medicationDetail.id]]">[[localize('cbip','CBIP',language)]]</paper-tooltip>
                        </template>
                        
                        <template is="dom-if" if="[[_getRcpLink(medicationDetail)]]">
                            <paper-icon-button id="rcpLink_[[medicationDetail.id]]" class="infoIcon infoIconBlue" icon="vaadin:pill" role="button" on-tap="_openRcpLink"></paper-icon-button>
                            <paper-tooltip id="tt_rcpLink_[[medicationDetail.id]]" position="right" for="rcpLink_[[medicationDetail.id]]">[[localize('med_rcp','Résumé caractéristiques du produit (CBiP)',language)]]</paper-tooltip>
                        </template>
                        
                        <template is="dom-if" if="[[_getLeafletLink(medicationDetail)]]">
                            <paper-icon-button id="leafletLink_[[medicationDetail.id]]" class="infoIcon" icon="icons:description" role="button" on-tap="_openLeafletLink"></paper-icon-button>
                            <paper-tooltip id="tt_leafletLink_[[medicationDetail.id]]" position="right" for="leafletLink_[[medicationDetail.id]]">[[localize('med_leaflet','Notice pour le public (CBiP)',language)]]</paper-tooltip>
                        </template>
                        
                        <template is="dom-if" if="[[_getDhpcLink(medicationDetail)]]">
                            <paper-icon-button id="DhpcLink_[[medicationDetail.id]]" class="infoIcon" src="[[_getDhpcPicture()]]" role="button" on-tap="_openDhpcLink"></paper-icon-button>
                            <paper-tooltip id="tt_leafletLink_[[medicationDetail.id]]" position="right" for="DhpcLink_[[medicationDetail.id]]">[[localize('med_Dhpc','DHPC',language)]]</paper-tooltip>
                        </template>                    
                        [[_getDrugId(medicationDetail)]]&nbsp;&nbsp;
                        <template is="dom-if" if="[[!medicationDetail.oldCnk]]">[[_getDrugCnk(medicationDetail)]]</template>
                        <template is="dom-if" if="[[medicationDetail.oldCnk]]"><iron-icon class="alert-icon darkRed" icon="icons:warning"></iron-icon>[[localize('', 'Attention', language)]] <span class="strikeOut">CNK: [[medicationDetail.oldCnk]]</span> [[localize('', 'devient', language)]] <b>[[_getDrugCnk(medicationDetail)]]</b></template>                        
                    </p>
                    
                    <template is="dom-if" if="[[_hasAllergies(medicationDetail)]]">
                        <div class="allergy-alert mt5 mb5">
                            <div class="allergy-title fw700"> <paper-icon-button class="infoIcon" icon="icons:warning"></paper-icon-button> [[localize('aller_int','Allergies et intolérances',language)]]: </div>
                            <div class="list"><template is="dom-repeat" items="[[medicationDetail.allergies]]" as="allergy"><div><iron-icon class$="mw15 mh15 code-icon [[_getAtcStyle(allergy)]]" icon="[[_getAllergyIcon(allergy)]]"></iron-icon> ([[_getIcpcLabel(allergy)]])<i> [[_shortDateFormat(allergy)]]</i> [[allergy.descr]]</div></template></div>
                        </div>
                    </template>
                    
                    <paper-icon-button class="infoIconMore" icon="icons:help-outline" on-tap="_openAdditionalCnkInfo"></paper-icon-button>

                </div>
                
                
                <!-- work in progress-->
                
                <div class="posology-container-content">
                
                    <div class="medication-container">
                        
                        <div class="header-title">[[localize('pos-med', 'Medication', language)]]</div>
                        
                        <div class="medication-container-content">
                            <div>
                                <!-- creation medication chronic-->
                                <vaadin-checkbox class="checkbox" checked="{{medicationDetail.options.createMedication}}" on-checked-changed=""><template is="dom-if" if="[[!medicationContent.isMedication]]">[[localize('pos-chronical', 'Chronical', language)]]</template><template is="dom-if" if="[[medicationContent.isMedication]]">[[localize('pos-chronical-update', 'Chronical update', language)]]</template></vaadin-checkbox>
                                <!-- set confidential boolean-->
                                <vaadin-checkbox class="checkbox" checked="{{medicationDetail.isConfidential}}" on-checked-changed="">[[localize('pos-confidential', 'Confidential', language)]]</vaadin-checkbox>
                                <!-- usage connu ? instructionForPatient no-utilisé surement un rapport avec les instructions patients on peut peut-etre l'enlever-->
                                <vaadin-checkbox class="checkbox" checked="{{medicationContent.medicationValue.knownUsage}}" on-checked-changed="">[[localize('pos-known-usage', 'Known usage', language)]]</vaadin-checkbox>
                            </div>
                            <div class="medication-fields">
                                
                                <!-- fourni par samv2 modifiable ????-->
                                <template is="dom-if" if="[[medicationDetail.posologyNote]]">
                                    <div class="regimen-line display-type-regimen comment">
                                        <paper-input-container always-float-label="true" class="w100pc">
                                            <label slot="label" class="color-status">[[localize('proposed_posology','Posologie proposée',language)]]</label>
                                            <iron-autogrow-textarea slot="input" disabled value="[[medicationDetail.posologyNote]]"></iron-autogrow-textarea>
                                        </paper-input-container>
                                    </div>
                                </template>
                                
                                <!-- fourni par samV2 choix de la portion 1 - 1/2 - 1/3 répercussion dans la posology-->
                                <!-- todo @julien constructPosology-->
                                <!--<div class="regimen-line display-type-regimen">
                                    <paper-dropdown-menu always-float-label id="unit" label="[[localize('portion', 'Portion', language)]]" disabled="[[!medicationDetail.dividable]]">
                                        <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{quantityFactor}}">
                                            <template is="dom-repeat" items="[[quantityFactors]]"><paper-item id="[[item.id]]" value="[[item]]">[[localize(item.label, item.numLabel, language)]]</paper-item></template>
                                        </paper-listbox>
                                    </paper-dropdown-menu>
                                </div>-->
                                
                                <!-- regimen 1 par fréquence et une fréquence par service-->
                                <!--<template is="dom-repeat" items="[[regimenKeys]]">
                                    <ht-regimen-day
                                        api="[[api]]" 
                                        i18n="[[i18n]]" 
                                        language="[[language]]" 
                                        resources="[[resources]]" 
                                        period-config="[[periodConfig]]" 
                                        regimen-config="[[regimenConfig]]" 
                                        regimen="{{medicationContent.medicationValue.regimen}}" 
                                        key="[[item]]" 
                                        medication-unit="[[medicationDetail.unit]]" 
                                        weekday-codes="[[weekdayCodes]]" 
                                        occurrences="[[regimenKeys.length]]"
                                        quantity-factor=[[quantityFactorValue]] 
                                        on-regimen-changed="_regimenChanged" 
                                        on-regimen-delete="_removeRegimen"
                                    ></ht-regimen-day>
                                </template>-->
                                <!-- todo @julien refactor variables of axel--> 
                                <ht-pat-prescription-detail-posology-frequency-editor api="[[api]]" resources="[[resources]]" user="[[user]]" language="[[language]]" units="[[quantityFactor]]" on-frequency-changed="frequencyChanged"></ht-pat-prescription-detail-posology-frequency-editor>
                                
                                <!--<div class="regimen-line display-type-regimen">
                                
                                    <paper-dropdown-menu always-float-label id="peri" label="[[localize('peri', 'Période', language)]]">
                                        <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{periodConfig}}">
                                            <template is="dom-repeat" items="[[periodConfigs]]"><paper-item value="[[item]]">[[localize(item.id, item.id, language)]]</paper-item></template>
                                        </paper-listbox>
                                    </paper-dropdown-menu>
                                
                                    <template is="dom-if" if="[[_canAddRegimen(periodConfig)]]">
                                        <paper-icon-button class="button--icon-btn" icon="icons:add" on-tap="_addRegimen"></paper-icon-button>
                                        <paper-dropdown-menu always-float-label id="periodConfigDropDown" label="[[localize(periodConfig.label, periodConfig.label, language)]]" disabled=[[periodConfig.disabled]]>
                                            <paper-listbox id="periodConfig" slot="dropdown-content" attr-for-selected="value" selected="{{regimenKey}}">
                                                <template is="dom-repeat" items="[[availableRegimenKeys]]"><paper-item value="[[item]]">[[localize(item, item, language)]]</paper-item></template>
                                            </paper-listbox>
                                        </paper-dropdown-menu>
                                    </template>
                                    
                                </div>
                                
                                <div class="regimen-line display-type-regimen comment">
                                    <paper-input-container always-float-label="true" class="w100pc">
                                        <label slot="label" class="color-status">[[localize('pos','Posology',language)]]</label>
                                        <iron-autogrow-textarea readonly slot="input" value="{{medicationDetail.posology}}"></iron-autogrow-textarea>
                                    </paper-input-container>
                                </div>
                                
                                <div class="regimen-line display-type-regimen comment">
                                    <paper-input-container always-float-label="true" class="w100pc">
                                        <label slot="label" class="color-status">[[localize('instructions-for-patient','Instructions pour le patient',language)]]/[[localize('pos','Posology',language)]]</label>
                                        <iron-autogrow-textarea slot="input" value="{{medicationDetail.commentForPatient}}"></iron-autogrow-textarea>
                                    </paper-input-container>
                                </div>    -->                          

                            </div>
                        </div>
                    </div>
                    
                    <div class="prescription-container">
                        <div class="header-title">
                            [[localize('pos-presc', 'Prescription', language)]]
                        </div>
                        <div class="prescription-container-content">
                        
                        
                        
                            <div class="regimen-line display-type-regimen">
                            
                                <vaadin-date-picker id="beginMoment" label="[[localize('start-date', 'Start date', language)]]" value="{{medicationDetail.beginMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]" required></vaadin-date-picker>
                                
                                <template is="dom-if" if="[[medicationContent.isPrescription]]">
                                    <vaadin-date-picker id="endMoment" label="[[localize('end-date', 'End date', language)]]" value="{{medicationDetail.endMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]" min="[[medicationDetail.beginMomentAsString]]"></vaadin-date-picker>
                                    <paper-input always-float-label type="number" min="0" label="[[localize('','Nombre de jours',language)]]" value="{{duration}}" autovalidate pattern="^\\d*$"></paper-input>
                                
                                    <template is="dom-if" if="[[canShowProvisionInfo]]">
                                        <vaadin-date-picker id="endProvisionMoment" label="[[localize('', 'Fin boîte', language)]]" readonly value="[[endProvisionMomentAsString]]" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                                        <paper-input always-float-label type="number" min="0" readonly label="[[localize('provision-days','Jours couverts',language)]]" value="[[provisionDays]]"></paper-input>
                                        <template is="dom-if" if="[[insufficientProvision]]"><div class="date-alert"><iron-icon class="alert-icon" icon="icons:warning"></iron-icon></div></template>
                                    </template>
                                
                                </template>
                                
                            </div>
                            
                            
                            
                            <div class="regimen-line display-type-regimen">
                            
                                <template is="dom-if" if="[[medicationContent.isPrescription]]">
                                    <paper-dropdown-menu always-float-label id="medicSubstitution" label="[[localize('', 'Substitution', language)]]">
                                        <paper-listbox id="substitution" slot="dropdown-content" selected="{{medicationDetail.substitutionAllowed}}" attr-for-selected="value">
                                            <paper-item value="true">[[localize('subtitutionAllowed','Autorisée',language)]]</paper-item>
                                            <paper-item value="false">[[localize('subtitutionForbidden','Interdite',language)]]</paper-item>
                                        </paper-listbox>
                                    </paper-dropdown-menu>
                                </template>
                            
                                <paper-dropdown-menu always-float-label id="medicReimbursement" label="[[localize('presc_reimb', 'Reimbursement', language)]]" class="regimen--reimbursement">
                                    <paper-listbox id="reimbursementReason" slot="dropdown-content" class="dropdown-reimbursement" attr-for-selected="value" selected="{{reimbursementReason}}">
                                        <template is="dom-repeat" items="[[reimbursementCodeRecipe]]"><paper-item value="[[item]]">[[_getCodeLabel(item.label)]]</paper-item></template>
                                    </paper-listbox>
                                </paper-dropdown-menu>
                            
                                <template is="dom-if" if="[[medicationContent.isPrescription]]">
                                    <vaadin-date-picker id="deliveryDate" label="[[localize('deliv_from', 'Délivrable à partir du', language)]]" readonly value="{{medicationDetail.deliveryMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                                    <vaadin-date-picker id="endExecDate" label="[[localize('EndDateForExecution', 'Date de fin pour excécution', language)]]" readonly value="{{medicationDetail.endExecMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                                </template>
                                
                            </div>
                            
                            
                            
                            <template is="dom-if" if="[[medicationContent.isPrescription]]">
                                <div class="regimen-line display-type-regimen">
                                
                                    <paper-dropdown-menu always-float-label id="medicRenewal" label="[[localize('renewal', 'Renouvellement', language)]]">
                                        <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{medicationDetail.renewal}}">
                                            <paper-item value="allowed">[[localize('allowed','Permis',language)]]</paper-item>
                                            <paper-item value="forbidden">[[localize('forbidden','Interdit',language)]]</paper-item>
                                        </paper-listbox>
                                    </paper-dropdown-menu>
                            
                                    <template is="dom-if" if="[[_isAllowed(medicationDetail.renewal)]]">
                                        <paper-input always-float-label type="number" min="0" label="[[localize('amount', 'Nombre', language)]]" max="100" value="{{medicationContent.medicationValue.renewal.decimal}}"></paper-input>
                                        <paper-input always-float-label type="number" min="0" label="[[localize('everyX', 'tous le', language)]]" max="100" value="{{medicationContent.medicationValue.renewal.duration.value}}"></paper-input>
                                        <paper-dropdown-menu always-float-label id="medicRenewalTimeUnit" label="[[localize('time_unit','Time unit',language)]]" class="regimen--renewalTimeUnit">
                                            <paper-listbox id="renewalTimeUnit" slot="dropdown-content" class="dropdown-renewalTimeUnit" attr-for-selected="value" selected="{{renewalTimeUnit}}">
                                                <template is="dom-repeat" items="[[timeUnits]]"><paper-item value="[[item]]">[[_getCodeLabel(item.label)]]</paper-item></template>
                                            </paper-listbox>
                                        </paper-dropdown-menu>
                                    </template>
                                    
                                </div>
                            </template>



                        </div>
                    </div>
                </div>  
            </div>
        `;
    }

    static get is() {
        return 'ht-pat-prescription-detail-posology';
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
            language: {
                type: String
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            listOfCompound: {
                type: Array,
                value: () => []
            },
            listOfPrescription: {
                type: Array,
                value: () => []
            },
            hcp: {
                type: Object,
                value: () => {}
            },
            contacts:{
                type: Array,
                value: () => []
            },
            currentContact:{
                type: Object,
                value: () => {}
            },
            allergies: {
                type: Array,
                value: () => []
            },
            reimbursementTypeList:{
                type: Array,
                value: () => []
            },

            // <Axel Stijns>
            medicationDetail: {
                type: Object,
                value:() => {}
            }, // The ampp corresponding to the CNK code we're being passed for drug X
            medicationContent: {
                type: Object,
                value: null,
                notify: true
            },
            medications: {
                type: Array,
                value: []
            },
            medication: {
                type: Object,
                value: null
            },
            bufferUnit: {
                type: String
            },
            bufferQuantity: {
                type: Number,
                value: 1
            },
            bufferNumberByFrequency: {
                type: Number,
                value: 1
            },
            bufferFrequency: {
                type: String,
                value: "daily"
            },
            bufferGeneralFrequency: {
                type: Number,
                value: 0
            },
            medicPriority: {
                type: Number,
                value: 0,
                observer: "_changeMedicPriority"
            },
            selectedTab: {
                type: Number,
                value: 0
            },
            openAddDropDown: {
                type: Boolean,
                value: false
            },
            openAddColDropDown: {
                type: Boolean,
                value: false
            },
            reimbursementCodeRecipe: {
                type: Array,
                value: () => []
            },
            reimbursementItem:{
                type: Object,
                value: () => {}
            },
            reimbursementItemIdx:{
                type: Number,
                value: 0
            },
            timeUnits:{
                type: Array,
                value: () => []
            },
            renewalDurationUnitItem: {
                type: Object,
                value: () => {}
            },
            renewalTimeUnitIdx:{
                type: Number,
                value: 0
            },
            renewalDurationValue: {
                type: Number,
                value: 0
            },
            isRenewal:{
                type: Boolean,
                value: false
            },
            renewalDecimalValue:{
                type: Number,
                value: 0
            },
            medicationMustBeCreated:{
                type: Boolean,
                value: false
            },
            substitution: {
                type: Number,
                value: 0
            },
            duration: {
                type: Number
            },
            time: {
                type: String,
                value: "10:00"
            },
            renewal: {
                type: Number,
                value: 0
            },
            quantityFactor: {
                type: Object,
                value: null
            },
            totalQuantity: {
                type: Number,
                value: 0
            },
            totalTakes: {
                type: Number,
                value: 0
            },
            regimenKeys: {
                type: Array,
                value: () => [],
                notify: true
            },
            regimenKey: {
                type: String,
                value: ""
            },
            medicationId: {
                type: String,
                value: ""
            },
            quantityFactors: {
                type: Array,
                value: () => [
                    {id: "one", label: "quantity_factor_one", numLabel: "1", denominator: 1},
                    {id: "half", label: "quantity_factor_half", numLabel: "1/2", denominator: 2},
                    {id: "third", label: "quantity_factor_third", numLabel: "1/3", denominator: 3},
                    {id: "quarter", label: "quantity_factor_quarter", numLabel: "1/4", denominator: 4}
                ]
            },
            weekdayKeys: {
                type: Array,
                value: () => ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"]
            },
            periodConfigs: {
                type: Array,
                value: () => [
                    {id: "dailyPosology", title: "dai", keys: [], label: "", disabled: true, keyId: ""},
                    {id: "weeklyPosology", title: "wee", keys: ["sunday", "monday", "tuesday", "wednesday", "thursday", "friday", "saturday"], label: "dayOfWeek", disabled: false, keyId: "weekday"}
                    // todo: dayNumber not supported in posologyString
                    // {id: "monthly", keys: _.range(1, 32), label: "dayOfMonth", disabled: false, keyId: "dayNumber"}
                ]
            },
            periodConfig: {
                type: Object,
                value: {id: ""}
            },
            availableRegimenKeys: {
                type: Array,
                value: () => [""]
            },
            regimenConfig: {
                type: Array,
                value: () => [
                    {id: "afterwakingup"},
                    {id: "beforebreakfast", parentId: "morning"},
                    {id: "morning"},
                    {id: "duringbreakfast", parentId: "morning"},
                    {id: "afterbreakfast", parentId: "morning"},
                    {id: "betweenbreakfastandlunch"},
                    {id: "beforelunch", parentId: "midday"},
                    {id: "midday"},
                    {id: "duringlunch", parentId: "midday"},
                    {id: "afterlunch", parentId: "midday"},
                    {id: "betweenlunchanddinner"},
                    {id: "beforedinner", parentId: "evening"},
                    {id: "evening"},
                    {id: "duringdinner", parentId: "evening"},
                    {id: "afterdinner", parentId: "evening"},
                    {id: "thehourofsleep"}
                ]
            },
            weekdayCodes: {
                type: Array,
                value: () => []
            },
            dayPeriodCodes: {
                type: Array,
                value: () => []
            },
            reimbursementReason: {
                type: Object,
                value: () => {}
            },
            insufficientProvision: {
                type: Boolean,
                value: false
            },
            renewalTimeUnit: {
                type: Object,
                value: () => {}
            },
            canShowProvisionInfo: {
                type: Boolean,
                value: false
            },
            canShowQuantityInfo: {
                type: Boolean,
                value: false
            },
            cachedBoxes: {
                type: String,
                value: ""
            },
            closable: {
                type: Boolean,
                value: false
            },
            initializingDate: {
                type: Boolean,
                value: false,
            },
            commentSeparator: {
                type: String,
                value: " - "
            },
            // </Axel Stijns>

            // julien posology

        };
    }

    static get observers() {
        return [
            '_medicationChanged(user, medication, medication.*)',

            // Todo: refactor these beauties
            '_changeBeginMoment(medicationDetail.beginMomentAsString)',
            '_changeEndMoment(medicationDetail.endMomentAsString)',
            '_changeDuration(duration)',
            '_regimenChanged(medicationContent.medicationValue, medicationDetail.commentForPatient, medicationContent.medicationValue.regimen.*)',
            '_quantityFactorChanged(quantityFactor)',
            '_periodChanged(periodConfig)',
            '_renewalChanged(medicationDetail.renewal)',
            '_reimbursementReasonChanged(reimbursementReason)',
            '_renewalTimeUnitChanged(renewalTimeUnit)',
            '_isConfidentialChanged(medicationDetail.isConfidential)',
            '_substitutionAllowedChanged(medicationDetail.substitutionAllowed)'
        ];
    }

    ready() {
        super.ready();
    }

    _reset() {
        const promResolve = Promise.resolve()
        return promResolve
            .then(() => {
                const componentProperties = HtPatOutgoingDocument.properties
                Object.keys(componentProperties).forEach(k => { if (!_.get(componentProperties[k], "noReset", false)) { this.set(k, (typeof componentProperties[k].value === 'function' ? componentProperties[k].value() : (componentProperties[k].value || null))) }})
                return promResolve
            })
    }

    _getDrugId(drug) {

        return 'Sam: '+_.get(drug, 'samCode', '')+' ('+_.get(drug, 'samDate', '')+') CTI-ext: '+_.get(drug, 'ctiExtended', '')

    }

    _getDrugType(medication){

        return _.trim(_.get(medication,'type')) === "chronic" ? "icons:alarm-on" :
            _.trim(_.get(medication,'type')) === "history" ? "vaadin:time-backward" :
            _.trim(_.get(medication,'type')) === "commercial" ? "vaadin:copyright" :
            _.trim(_.get(medication,'type')) === "substance" ? "vaadin:pill" :
            _.trim(_.get(medication,'type')) === "compound" ? "vaadin:flask" :
            ""

    }

    _getDrugCnk(drug) {

        return !_.trim(_.get(drug,"id")) ? "" : "CNK: " + _.trim(_.get(drug,"id"))

    }

    _getCbipPicture() {
        return require('../../../../../images/cbip-logo.png')
    }

    _getDhpcPicture() {
        return require('../../../../../images/afmps.png')
    }

    _openCbipLink() {

        return window.open('http://www.cbip.be/' + this.language + '/contents/jump?cnk=' + _.trim(_.get(this, "medicationDetail.id")));

    }

    _getRcpLink(medicationDetail) {

        return _.trim(_.get(medicationDetail, "spcLink"))

    }

    _getLeafletLink(medicationDetail) {

        return _.trim(_.get(medicationDetail, "leafletLink"))

    }

    _getDhpcLink(medicationDetail){
        return _.trim(_.get(medicationDetail, "informations.rmaProfessionalLink."+this.language))
    }

    _openRcpLink() {
        const targetUrl = this._getRcpLink(this.medicationDetail);
        return targetUrl && window.open(targetUrl);
    }

    _openLeafletLink() {
        const targetUrl = this._getLeafletLink(this.medicationDetail);
        return targetUrl && window.open(targetUrl);
    }

    _openDhpcLink(){
        const targetUrl = this._getDhpcLink(this.medicationDetail);
        return targetUrl && window.open(targetUrl);
    }

    _hasAllergies(item) {

        return _.size(_.get(item,"allergies"))

    }

    _getAtcStyle(item) {

        const atcFirstLetter = _
            .chain(item)
            .get("codes")
            .find({type:"CD-ATC"})
            .get("code")
            .trim()
            .value()
            .substr(0,1)
            .toUpperCase()

        return atcFirstLetter ? "ATC--" + atcFirstLetter : ""

    }

    _getAllergyIcon(item) {

        const cdItemType = _.trim(_.get(_.find(_.get(item,"tags",[]), {type:"CD-ITEM"}), "code"))

        return cdItemType === "allergy" ? "image:filter-vintage" : cdItemType === "adr" ? "vaadin:pill" : ""

    }

    _getIcpcLabel(item) {

        const icpc = _.find(_.get(item,"codes",[]), code => ["ICPC","ICPC2"].indexOf(_.trim(_.get(code,"type")).toUpperCase()) > -1)

        return icpc && (icpc.code || icpc.id.split("|")[1]) || "";

    }

    _shortDateFormat(item) {

        return !_.trim(_.get(item,"openingDate")) ? "" : moment(_.trim(_.get(item,"openingDate")),"YYYYMMDD").format("DD/MM/YYYY")

    }

    _openAdditionalCnkInfo() {

        return this.dispatchEvent(new CustomEvent('open-additional-cnk-info', {bubbles:true,composed:true,detail:{product:this.medicationDetail}}))

    }

    _all(a,b) { return a && b }

    _any(a,b,c,d,e) {
        return a||b||c||d||e
    }

    _formatCnk(id) {

        return !_.trim(id) ? "" : "CNK " + id

    }

    _getCodeLabel(code) {
        return code && code[this.language]
    }

    extractContentWithIdFromMedicationService(m, isNew, isPres) {

        const content = m && this.api.contact().preferredContent(m, this.language) || m && m.content && (m.content[this.language] = { medicationValue: {regimen: []} });

        return {
            id: _.get(m, "id"),
            codes: _.get(m, "codes"),
            medicationValue: _.get(content, "medicationValue"),
            isNew: isNew || false,
            isPrescription: _.get(m, "isPrescription") || isPres || false,
            isMedication: _.size(_.get(m, "tags")) && _.some(_.get(m, "tags"), tag => tag && tag.type === "CD-ITEM" && tag.code === "medication") || false
        };

    }

    _extractCommentForPatient() {

        if (!_.get(this,"medicationContent") || !_.get(this,"medicationContent.medicationValue")) return

        const instructionForPatient = _.trim(_.get(this,"medicationContent.medicationValue.instructionForPatient"))

        const comment = !instructionForPatient ? "" : _.trim(instructionForPatient.replace(this.api.contact().medication().posologyToString(_.get(this,"medicationContent.medicationValue")||{}, this.language), ""))

        _.merge(this, {medicationContent:{medicationValue:{instructionForPatient:""}}})

        return (comment ? comment.indexOf(_.get(this,"commentSeparator")) : -1) < 0 ? comment : comment.slice(_.size(_.get(this,"commentSeparator")))

    }

    _periodChanged() {

        // Todo: refactor / rather ugly @ axel...

        const periodConfigId = _.trim(_.get(this,"periodConfig.id"))
        const regimen = _.get(this, "medicationContent.medicationValue.regimen", [])

        if(!periodConfigId) return

        this.set("medicationContent.medicationValue.regimen", _.filter(regimen, r => periodConfigId === "weeklyPosology" ? r.weekday : !r.weekday));

        this.splice("regimenKeys", 0, _.get(this,"regimenKeys.length"))

        if (periodConfigId === "weeklyPosology") {

            if (!_.size(regimen)) {

                this.push("regimenKeys", _.get(this,"periodConfig.keys[0]"))

            } else {

                const keyId = _.get(this,"periodConfig.keyId")

                if (keyId === "weekday") {

                    this.push("regimenKeys", ...regimen
                        .filter((e, i, a) => a.findIndex(x => x[keyId].code === e[keyId].code) === i)
                        .map(reg => reg[keyId].code)
                        .filter(code => this.weekdayCodes.some(weekdayCode => weekdayCode.code === code))
                    )

                } else {

                    // @todo: dayNumber and date cases

                }

            }

        } else { this.push("regimenKeys", "none") }

        this._updatePeriodConfigs();

    }

    _updatePeriodConfigs() {

        if (!_.get(this,"periodConfig") || _.trim(_.get(this,"periodConfig.id")) === "dailyPosology" ) return;

        this.splice("availableRegimenKeys", 0, _.size(_.get(this,"availableRegimenKeys.length")))

        const availableRegimenKeys = _.filter(_.get(this,"periodConfig.keys"), k => !_.some(_.get(this,"regimenKeys"), regKey => regKey === k))

        if (_.size(availableRegimenKeys)) {

            this.push("availableRegimenKeys", ...availableRegimenKeys);
            this.set("regimenKey", _.get(availableRegimenKeys,"[0]"));

        }

    }

    _beginMoment() {

        return this.api.moment(_.get(this,"medicationDetail.beginMomentAsString"), "YYYY-MM-DD");

    }

    _endMoment() {

        return this.api.moment(_.get(this,"medicationDetail.endMomentAsString"), "YYYY-MM-DD");

    }

    _updateStats() {

        const regimen = _.get(this, "medicationContent.medicationValue.regimen", [])

        if (!_.size(regimen) || !_.get(this,"quantityFactor")) return

        const endMoment = this._endMoment(), beginMoment = this._beginMoment()
        const keys = _.trim(_.get(this,"periodConfig.id")) === "weeklyPosology" ? _.get(this,"weekdayKeys") : [""]
        const takes = keys.map(key => regimen.reduce((total, period) => { if (!key || _.get(period, "weekday.code", 0) === key) total += (_.get(this,"quantityFactor.denominator") > 1) && 1 || parseInt(_.get(period,"administratedQuantity.quantity"), 10) || 0; return total; }, 0));
        const totalTakesPerPeriod = takes.reduce((total, quantity) => { total += quantity; return total; }, 0);

        let provisionDays = 0, totalTakes = 0;
        let medicationDays = endMoment ? endMoment.diff(beginMoment, "days") : 0;
        let availableDoses = parseInt(_.get(this, "medicationDetail.packDisplayValue", 0), 10) * parseInt(_.get(this, "medicationDetail.boxes", 0), 10) * _.get(this,"quantityFactor.denominator")
        let currentDayNumber = _.trim(_.get(this,"periodConfig.id")) === "weeklyPosology" ? beginMoment.weekday() : 0;

        this.set("canShowProvisionInfo", _.get(this,"medicationContent.isPrescription") && availableDoses > 0 && totalTakesPerPeriod > 0)
        this.set("canShowQuantityInfo", medicationDays && totalTakesPerPeriod);

        if (totalTakesPerPeriod > 0) {

            while (availableDoses > 0 || medicationDays > 0) {
                const dailyTakes = (takes[(currentDayNumber++) % takes.length] || 0);
                if (availableDoses > 0) { availableDoses -= dailyTakes; provisionDays += 1; }
                if (medicationDays > 0) { medicationDays -= 1; totalTakes += dailyTakes; }
            }

            if (availableDoses < 0) { provisionDays--; }

        }

        const totalQuantity = Math.round(totalTakes / _.get(this,"quantityFactor.denominator"))

        const endProvisionMoment = _.cloneDeep(beginMoment).add(provisionDays, "days");

        this.set("provisionDays", provisionDays);
        this.set("totalTakes", totalTakes);
        this.set("totalQuantity", totalQuantity);
        this.set("endProvisionMomentAsString", endProvisionMoment.format("YYYY-MM-DD"));
        this.set("insufficientProvision", (endProvisionMoment.isBefore(this._endMoment())));

    }

    _canDeleteRegimen() {

        return _.size(_.get(this,"regimenKeys")) > 1

    }

    _init() {

        const promResolve = Promise.resolve()

        return _.size(_.get(this,"dayPeriodCodes")) ? promResolve : promResolve
            .then(() => this.set('isLoading', true))
            .then(() => this.api.code().findCodes("be", "CD-DAYPERIOD"))
            .then(codes => this.api.code().findCodes("be", "care.topaz.customDayPeriod").then(customCodes => [codes, customCodes]))
            .then(([codes, customCodes]) => this.push("dayPeriodCodes", ...codes.concat(customCodes)))
            .then(() => Promise.all(_.map(_.get(this,"regimenConfig"), reg => {
                const regId = _.trim(_.get(reg,"id"))
                const dayPeriod = _.find(_.get(this,"dayPeriodCodes"), it => _.trim(_.get(it,"code")) === regId) || {code: regId, type: "CD-DAYPERIOD"}
                _.merge(dayPeriod, !_.trim(_.get(dayPeriod,"label[" + this.language + "]")) ? {} : {label: _.fromPairs([[this.language, _.lowerCase(_.trim(this.localize("ms_" + regId, reg.id, this.language)))]])})
                return _.merge(reg, {dayPeriod: dayPeriod})
            })))
            .then(() => _.size(_.get(this,"weekdayCodes")) ? promResolve : promResolve
                .then(() => this.api.code().findCodes("be", "CD-WEEKDAY"))
                .then(codes => this.push("weekdayCodes", ..._.map(codes, code => {
                    const index = _.get(this,"weekdayKeys").indexOf(_.trim(_.get(code,"code"))) || -1
                    return _.assign(code, { "weekday": _.trim(_.get(code,"label["+this.language+"]")), "weekNumber": (index > -1) && index || 0 })
                })))
            )
            .then(() => _.size(_.get(this,"reimbursementCodeRecipe")) ? promResolve : this.api.code().findCodes("be", "CD-REIMBURSEMENT-RECIPE").then(r => this.push("reimbursementCodeRecipe", "", ..._.orderBy(r, ['label.' + this.language], ['asc']))))
            .then(() => _.size(_.get(this,"timeUnits")) ? promResolve : this.api.code().findCodes("be", "CD-TIMEUNIT").then(timeUnits => this.push("timeUnits", ..._.orderBy(_.filter(timeUnits, i => ["ns", "us", "ms", "s", "min"].indexOf(_.trim(_.get(i, "code"))) === -1), ['label.' + this.language], ['asc']))))
            .catch(e => console.log("[ERROR]", e))
            .finally(() => this.set('isLoading', false))

    }

    _substitutionAllowedChanged() {

        return !_.get(this,"medicationDetail") ? null : this.set("medicationContent.medicationValue.substitutionAllowed", _.get(this,"medicationDetail.substitutionAllowed") === true)

    }

    _isPortion() {

        return _.get(this,"quantityFactor.denominator") > 1

    }

    _reimbursementReasonChanged() {

        return !_.get(this,"reimbursementReason") ?  this.set("medicationContent.medicationValue.reimbursementReason", null) : this.set("medicationContent.medicationValue.reimbursementReason", _.get(this,"reimbursementReason"))

    }

    _renewalTimeUnitChanged() {

        this.set("medicationContent.medicationValue.renewal.duration.unit", _.get(this, "renewalTimeUnit"))

    }

    _isAllowed(renewal) {

        return renewal === "allowed";

    }

    _instructionOverride() {

        return !_.size(_.get(this, "medicationContent.medicationValue.regimen", [])) ? null :  this._resetAll()

    }

    _resetAll() {

        const regimen = _.get(this, "medicationContent.medicationValue.regimen", [])

        return !regimen ? null : this.splice("medicationContent.medicationValue.regimen", 0, _.size(regimen))

    }

    _isCompoundPrescription() {

        return _.trim(_.get(this,"medicationDetail.type")) === "compound"

    }

    _canAddRegimen() {

        // Todo: @ axel
        // return (this.periodConfig.id === "weeklyPosology") || (this.periodConfig.id === "monthlyPosology");

        return _.trim(_.get(this,"periodConfig.id")) === "weeklyPosology" && _.size(_.get(this,"availableRegimenKeys"))

    }

    _regimenLines() {

        return _.get(this,"medicationContent.medicationValue.regimen",[])

    }

    _copyPosologyNote() {

        return (this._resetAll()||true) &&  this.set("medicationDetail.commentForPatient", _.get(this, "medicationDetail.posologyNote"))
    }

    _addRegimen() {

        return !_.size(_.get(this, "medicationContent.medicationValue.regimen", [])) || !_.get(this,"regimenKey") || _.get(this,"regimenKeys",[]).includes(_.get(this,"regimenKey")) ? null : (this.push("regimenKeys", _.get(this,"regimenKey"))||true) && this._updatePeriodConfigs();

    }

    _removeRegimen(e) {

        const key = _.trim(_.get(e, "detail.key"))
        const medicationRegimen = _.get(this, "medicationContent.medicationValue.regimen", [])

        if(!key || _.trim(_.get(this,"periodConfig.id")) === "dailyPosology" || _.size(_.get(this,"regimenKeys")) < 2) return;

        this.set("medicationContent.medicationValue.regimen", _.trim(_.get(this,"periodConfig.keyId")) !== "weekday" ? medicationRegimen : _.filter(medicationRegimen, reg => _.trim(_.get(reg,"weekday.code")) !== key));
        this.splice("regimenKeys", _.get(this,"regimenKeys",[]).indexOf(key), 1);

        this._updatePeriodConfigs();

    }

    _renewalChanged() {

        const promResolve = Promise.resolve()

        return !this.medicationDetail || !this.medicationContent ? promResolve : promResolve
            .then(() => _.trim(_.get(this,"medicationDetail.renewal")) !== "allowed" ?
                (_.merge(this, {medicationContent: {medicationValue: {renewal: {}}}})||true) && this.notifyPath("medicationContent.medicationValue.renewal") :
                promResolve.then(() => {
                    const renewal = _.get(this,"medicationContent.medicationValue.renewal",null) || { decimal: 1, duration: { value: 1, unit: this.timeUnits.find(timeUnit => timeUnit && timeUnit.code === "mo")}}
                    this.set("medicationContent.medicationValue.renewal", renewal)
                    this.set("renewalTimeUnit", _.find(_.get(this,"timeUnits"), timeUnit => _.trim(_.get(timeUnit,"code")) === _.trim(_.get(renewal,"duration.unit.code"))))
                })
            )

    }

    _regimenChanged() {

        const promResolve = Promise.resolve()
        const currentPosology = this.api.contact().medication().posologyToString(_.get(this,"medicationContent.medicationValue",{}), this.language)
        const instructionsForPatient = _.trim(_.get(this,"medicationDetail.commentForPatient"))

        return !_.get(this,"medicationContent.medicationValue") || !this.medicationDetail ? promResolve : promResolve
            .then(() => this._updateStats())
            .then(() => this.set("medicationContent.medicationValue.instructionForPatient", ""))
            .then(() => this.set("medicationDetail.posology", currentPosology))
            .then(() => this.set("medicationContent.medicationValue.instructionForPatient", _.trim(currentPosology) + (currentPosology && instructionsForPatient ? this.commentSeparator : "") + instructionsForPatient))

    }

    _isConfidentialChanged() {

        const promResolve = Promise.resolve()

        return !_.get(this,"medicationDetail.newMedication") ? promResolve : promResolve
            .then(() =>  _.get(this,"medicationDetail.newMedication",false) && _.assign(this.medicationDetail.newMedication, {tags: _
                .chain(_.get(this, "medicationDetail.newMedication.tags", []))
                .filter(tag => _.trim(_.get(tag, "type")) !== "org.taktik.icure.entities.embed.Confidentiality")
                .concat({type: "org.taktik.icure.entities.embed.Confidentiality", version: "1", code: (_.get(this, "medicationDetail.isConfidential", false) ? "secret" : "notsecret")})
                .value()
        }))

    }

    _editCompoundPrescription() {

        return this.dispatchEvent(new CustomEvent('edit-compound', {
            detail: {
                item : {
                    title: _.trim(_.get(this,"medicationDetail.compoundTitle")),
                    formula: _.trim(_.get(this, "medicationDetail.intendedName")),
                    fromPrescription: { update: false, onChange: this._updateCompoundPrescription.bind(this) }
                }
            },
            bubbles: true,
            composed: true
        }))

    }

    _updateCompoundPrescription(compound) {

        const promResolve = Promise.resolve()

        return !_.get(this, "medicationContent.medicationValue", false) ? promResolve : promResolve
            .then(() => this.set("medicationContent.medicationValue.compoundPrescription", _.trim(_.get(compound,"title")) + "\r\n" + _.trim(_.get(compound,"formula"))))
            .then(() => this.set("medicationDetail.compoundTitle", _.trim(_.get(compound,"title"))))
            .then(() => this.set("medicationDetail.intendedName", _.trim(_.get(compound,"formula"))))
            .then(() => this.set("medicationDetail.label", _.trim(_.get(compound,"formula"))))

    }

    _quantityFactorChanged() {

        const promResolve = Promise.resolve()
        const regimen = _.get(this, "medicationContent.medicationValue.regimen", [])

        return !regimen ? promResolve : promResolve
            .then(() => _
                .chain(regimen)
                .filter(it => _.trim(_.get(it,"administratedQuantity.quantity")))
                .map(it => _.merge(it, {administratedQuantity: {
                        unit: this.medicationDetail.unit || this.localize("uni", "Unités"),
                        quantity: _.get(this,"quantityFactor.denominator",0) > 1 && this.quantityFactor.numLabel || parseInt(_.get(it,"administratedQuantity.quantity")) || ""
                    }}))
                .value()
            )
            .then(() => this.set("quantityFactorValue", _. get(this,"quantityFactor")))
            .then(() => this.notifyPath("medicationContent.medicationValue", "changed"))

    }

    _changeBeginMoment() {

        const promResolve = Promise.resolve()

        return !_.get(this,"medicationDetail") ? promResolve : promResolve
            .then(() => !this._beginMoment() ? this.set("medicationDetail.beginMomentAsString", moment().format("YYYY-MM-DD")) : promResolve.then(() => {

                if (_.trim(_.get(this,"medicationDetail.endMomentAsString")) && !_.get(this,"initializingDate")) {

                    const endMoment = this._beginMoment().add(this.duration, "days")
                    this.set("medicationDetail.endMomentAsString", endMoment.format("YYYY-MM-DD"))
                    this.set("medicationContent.medicationValue.endMoment", parseInt(endMoment.format("YYYYMMDD"), 10))

                } else {

                    this.set("medicationContent.medicationValue.endMoment", null)

                }

                this.set("medicationContent.medicationValue.beginMoment", parseInt(this._beginMoment().format("YYYYMMDD"), 10));
                this._updateStats();

            }))

    }

    _changeEndMoment() {

        const promResolve = Promise.resolve()

        return !_.get(this,"medicationDetail") || !this._beginMoment() ? promResolve : promResolve
            .then(() => !!this._endMoment() ? this.set("duration", "") : promResolve
                .then(() => {

                    let endMoment = this._endMoment()
                    let duration = endMoment.diff(this._beginMoment(), "days")
                    if (duration < 0) { duration = 0; endMoment = this._beginMoment(); this.set("medicationDetail.endMomentAsString", endMoment.format("YYYY-MM-DD")); }

                    this.set("duration", _.trim(duration))
                    this.set("medicationContent.medicationValue.endMoment", parseInt(endMoment.format("YYYYMMDD"), 10));

                })
            )
            .then(() => this._updateStats())

    }

    _changeDuration() {

        const promResolve = Promise.resolve()

        return !_.get(this,"medicationDetail") || !this._beginMoment() ? promResolve : promResolve
            .then(() => {

                if (this.duration === "0") {

                    this.set("duration", "")

                } else if (!_.get(this,"duration")) {

                    this.set("medicationDetail.endMomentAsString", "")
                    this.set("medicationContent.medicationValue.endMoment", null)

                } else {

                    const endMoment = this._beginMoment().add(this.duration, "days")
                    this.set("medicationDetail.endMomentAsString", endMoment.format("YYYY-MM-DD"))
                    this.set("medicationContent.medicationValue.endMoment", parseInt(endMoment.format("YYYYMMDD"), 10))

                }

            })
            .then(() => this._updateStats())

    }

    _changeMedicPriority() {

        const currentPriority = _.trim(_.get(this,"medicationContent.medicationValue.priority"))
        return !_.get(this,"medicationContent") ? null : this.set("medicationContent.medicationValue.priority",  currentPriority === "2" ? "high" : currentPriority === "1" ? "middle" : "low")

    }

    _isDoping(drug){
        return _.get(drug, 'informations.speciallyRegulated', null) !== 0 && _.get(drug, 'informations.speciallyRegulated', null) !== null
    }

    _isBlackTriangle(drug){
        return _.get(drug, 'informations.blackTriangle', false)
    }

    _isRma(drug){
        return _.get(drug, 'informations.rma', false)
    }

    _getDopingIcon(drug){
        return _.get(drug, 'informations.speciallyRegulated', null) !== 0 && _.get(drug, 'informations.speciallyRegulated', null) !== null ? 'cat-doping-prod' : ''
    }

    _getBlackTriangleIcon(drug){
        return _.get(drug, 'informations.blackTriangle', false) ? 'blackTriangle' : ''
    }

    _getRmaIcon(drug){
        return _.get(drug, 'informations.blackTriangle', false) ? 'rma-pharma-vigi' : ''
    }

    _openRmaLink(e){
        window.open(_.get(this, 'medicationDetail.informations.rmaLink.'+this.language, ""))
    }

    _changeRenewalTimeUnitItem(item, unitValue, decimalValue) {

        return !_.get(item,"id") ? null : this.set("medicationContent.medicationValue.renewal", { decimal: decimalValue, duration: { value: unitValue, unit: _.find(_.get(this,"timeUnit",[]), it => it && it.id === item.id)} })

    }

    _medicationName(svc) {

        return this.api.contact().medication().medicationNameToString(this.api.contact().preferredContent(svc, this.language).medicationValue) || ''

    }

    _medicationChanged(user, medication) {

        const now = +new Date()
        const promResolve = Promise.resolve()

        return !medication ? this._init() : this._init()
            .then(() => this.set('isLoading', true))
            .then(() => !_.trim(_.get(medication,"drug.amp.vmp.vmpGroup.id")) ? null : this.api.besamv2().findPaginatedVmpsByGroupId(_.trim(_.get(medication,"drug.amp.vmp.vmpGroup.id")),null,null,100).then(vmps => _.merge(medication, {
                drug:{
                    vmps:_.size(_.get(vmps,"rows")) ? _.get(vmps,"rows") : null
                }
            })).catch(e => console.log("[ERROR]", e)))
            .then(() => !_.trim(_.get(medication,"id")) || _.trim(_.get(medication,"drug.type")) !== "medicine" ?
                Promise.resolve(_.get(medication,"drug")) :
                promResolve
                    .then(() => this.api.besamv2().findAmpsByDmppCode(_.trim(_.get(medication,"id"))))
                    .then(amps => {

                        const validAmpps = _
                            .chain(amps)
                            .filter(amp => _.trim(_.get(amp,"status")) === "AUTHORIZED" && _.size(_.get(amp,"ampps")))
                            .map(amp => _.map(_.get(amp, "ampps"), ampp => _.some(_.get(ampp,"commercializations"), com => com && (com.from||0) < now && (!com.to || com.to > now)) && _.assign(ampp, {
                                amp: amp,
                                publicDmpp: _.find(_.get(ampp,"dmpps",[]), dmpp => dmpp
                                    && _.trim(_.get(dmpp,"deliveryEnvironment")) === "P"
                                    && _.trim(_.get(dmpp,"codeType")) === "CNK"
                                    && _.get(dmpp,"from",0) < now
                                    && (!_.get(dmpp,"to",false) || _.get(dmpp,"to") > now)
                                )
                            })))
                            .flatten()
                            .compact()
                            .filter("publicDmpp")
                            .value()

                        // Latest version
                        const latestAmpp = _.head(_.orderBy(validAmpps, ["from"], ["desc"]))||{}

                        _.merge(_.get(medication,"drug"), {
                            spcLink: _.trim(_.get(latestAmpp, "spcLink." + this.language)),
                            leafletLink: _.trim(_.get(latestAmpp, "leafletLink." + this.language)),
                            ctiExtended: _.get(latestAmpp, "ctiExtended"),
                            posologyNote: _.trim(_.get(latestAmpp, "posologyNote")),
                            dividable: _.get(latestAmpp, "dividable"),
                            packDisplayValue: _.trim(_.get(latestAmpp, "packDisplayValue")),
                            samCode: _.trim(_.get(latestAmpp, "amp.code")),
                            samDate: !_.trim(_.get(latestAmpp, "publicDmpp.from")) ? null : moment(_.get(latestAmpp, "publicDmpp.from")).format("DD/MM/YYYY"),
                        })

                        // Cnk changed / replaced ?
                        return _.get(_.merge(medication, _.some(validAmpps, ampp=> _.trim(_.get(ampp,"publicDmpp.code")) === _.trim(_.get(medication,"id"))) ? {} : {id: _.trim(_.get(latestAmpp,"publicDmpp.code")), drug: { id: _.trim(_.get(latestAmpp,"publicDmpp.code")), oldCnk: _.trim(_.get(medication,"id")) } }), "drug")

                    })
                    .catch(e => (console.log("[ERROR]", e)||true) && _.get(medication,"drug"))
            )
            .then(medicationWithAmpps => _.get(this,"cachedBoxes") && _.get(this,"cachedBoxes") !== _.get(medicationWithAmpps,"boxes") ? (this._updateStats()||true) && medicationWithAmpps : medicationWithAmpps)
            .then(medicationWithAmpps => (this.set("cachedBoxes", _.get(medicationWithAmpps,"boxes"))||true) && medicationWithAmpps)
            .then(medicationWithAmpps => {

                const content = this.content || this.extractContentWithIdFromMedicationService(_.get(medicationWithAmpps,"newMedication"), _.get(medicationWithAmpps,"options.isNew"), _.get(medicationWithAmpps,"options.isPrescription"))
                this.set("medicationContent", content);

                // Used to be this._initmedicationContent()
                _.get(this,"medicationContent.medicationValue") && !_.size(_.get(this,"medicationContent.medicationValue.regimen")) ? this.set('medicationContent.medicationValue.regimen', []) : null

                // Avoid infinitely nested objects
                _.assign(_.get(medicationWithAmpps,"amp.ampps"), _
                    .chain(medicationWithAmpps)
                    .get("amp.ampps")
                    .map(it => _.omit(it,["amp.ampps"]))
                    .value()
                )

                const beginMoment = _.get(content,"medicationValue.beginMoment") ? _.get(content,"medicationValue.beginMoment") :
                    _.get(medicationWithAmpps,"newMedication.valueDate") ? _.get(medicationWithAmpps,"newMedication.valueDate") :
                    _.get(medicationWithAmpps,"newMedication.openingDate") ? _.get(medicationWithAmpps,"newMedication.openingDate") :
                    undefined
                const endMoment = _.get(content,"medicationValue.endMoment") ? _.get(content,"medicationValue.endMoment") : _.get(medicationWithAmpps,"newMedication.closingDate")

                this.set("initializingDate", true)
                this.set("medicationDetail", _.merge(medicationWithAmpps, {
                    beginMomentAsString : !beginMoment ? null : this.api.moment(beginMoment).format('YYYY-MM-DD') || null,
                    endMomentAsString: !endMoment ? null : this.api.moment(endMoment).format("YYYY-MM-DD") || null,
                    deliveryMomentAsString: moment().format("YYYY-MM-DD"),
                    endExecMomentAsString: moment().add(3, "months").subtract(1, "days").format("YYYY-MM-DD"),
                    dividable: _.get(medicationWithAmpps,"dividable") === undefined || _.get(medicationWithAmpps,"dividable"),
                    packDisplayValue: _.get(medicationWithAmpps,"packDisplayValue")||0,
                    medicPriority : _.trim(_.get(this,"medicationContent.medicationValue.priority")) === "high" ? 2 : _.trim(_.get(this,"medicationContent.medicationValue.priority")) === "middle" ? 1 : 0,
                    renewal: _.get(this,"medicationContent.medicationValue.renewal") ? "allowed" : "forbidden",
                    // org.taktik.icure.entities.embed.Confidentiality
                    isConfidential: _.chain(medicationWithAmpps).get("newMedication.tags").find(tag => _.trim(_.get(tag,"type")).toLowerCase().indexOf("confidentiality") > -1).get("code").trim().lowerCase().value() === "secret",
                    substitutionAllowed: _.get(this,"medicationContent.medicationValue.substitutionAllowed") ? "true" : "false",
                    commentForPatient: this._extractCommentForPatient(),
                    productType: _.trim(_.get(this,"medication.type")),
                    patientPrice: _.trim(_.get(medicationWithAmpps,"informations.patientPrice")),
                    publicPrice: _.trim(_.get(medicationWithAmpps,"informations.publicPrice")),
                    unit: _.trim(_.get(medicationWithAmpps,"informations.ampp.unit")),
                }))
                this.set("initializingDate", false);

                this.set("reimbursementReason", !_.size(_.get(this,"medicationContent.medicationValue.reimbursementReason")) ? {} : _.find(_.get(this,"reimbursementCodeRecipe"), it => _.trim(_.get(it,"code")) === _.get(this,"medicationContent.medicationValue.reimbursementReason.code"))||{})

                const quantitySample = _.trim(_.get(this, "medicationContent.medicationValue.regimen[0].administratedQuantity.quantity"))
                this.set("quantityFactor", quantitySample && !parseInt(quantitySample, 10) && _.find(_.get(this,"quantityFactors"), q => _.get(q,"numLabel") === quantitySample) || _.get(this,"quantityFactors[0]"))

                // Todo: (axel) month (dayNumber) and date
                const period = _.has(_.get(this,"medicationContent"), "medicationValue.regimen[0].weekday") ? "weeklyPosology" : "dailyPosology"
                _.get(this,"periodConfig.id") !== period ? this.set("periodConfig", _.find(_.get(this,"periodConfigs"), c => _.get(c,"id") === period)) : this._periodChanged()

                this._updateStats();

            })
            .catch(e => console.log("[ERROR]", e))
            .finally(() => (console.log("Medication", this.medication)||true) && (console.log("MedicationDetail", this.medicationDetail)||true) && this.set('isLoading', false))

    }



    // Todo: handle this / not used anymore?
    // Used to be "EOLAndClose" -> for svc deletion
    deleteAndClose() {

        const promResolve = Promise.resolve()

        return promResolve
            .then(() => this.set("medicationDetail.newMedication.endOfLife", parseInt(moment().subtract(1, 'days').format("YYYYMMDD"), 10)))
            .then(() => this.triggerSave())
            .then(() => this.triggerClosePosology())

    }

    // Ie: end / close PAT's medication
    // Todo: handle this
    endAndClose() {

        const promResolve = Promise.resolve()

        return promResolve
            .then(() => this.set("medicationContent.medicationValue.endMoment", parseInt(moment().subtract(1, 'days').format("YYYYMMDD"), 10)))
            .then(() => this.triggerSave())
            .then(() => this.triggerClosePosology())

    }

    // Todo: handle this
    _createMedication(e){

        const promResolve = Promise.resolve()

        return promResolve
            .then(() => (this.set('medicationDetail.options.createMedication', _.get(e,"target.checked"))||true) && (this.set('medicationContent.createMedication', _.get(e,"target.checked"))||true))
            .then(() => this.triggerCreateMedication())
            .then(() => this.triggerClosePrescription())

    }

}
customElements.define(HtPatPrescriptionDetailPosology.is, HtPatPrescriptionDetailPosology);
