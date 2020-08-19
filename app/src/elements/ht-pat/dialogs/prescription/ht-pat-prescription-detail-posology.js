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

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash";

class HtPatPrescriptionDetailPosology extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {

    static get template() {
        return html`

            <style include="dialog-style scrollbar-style shared-styles buttons-style dropdown-style icd-styles icpc-styles paper-input-styles spinner-style tk-token-field-style">
            
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
                
                }
                
                .prescription-container-content{
                
                }
                
                .posology-container-content{
                    height: calc(100% - 30px);
                }
                
                .posology-title{
                    height: 30px;
                    padding: 5px;
                    background: var(--app-background-color-dark);
                    box-sizing: border-box;
                }
                
                .bold{
                    font-weight: bold;         
                }
                
                .fs16{
                    font-size: 16px;
                }
                
                .header-icon{
                    height: 16px;
                    width: 16px;
                }

                .infoIcon {
                    width:24px;
                    height:24px;
                    padding:4px;
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
                
            </style>
            
            <div class="posology-container">
            
                <div class="posology-title">
                    
                    <template is="dom-if" if="[[selectedDrugForPosology.drug.id]]">
                        <paper-icon-button id="CBIPLink[[selectedDrugForPosology.drug.id]]" class="infoIcon" src="[[_getCbipPicture()]]" role="button" on-tap="_openCbipLink"></paper-icon-button>
                        <paper-tooltip id="tt_CBIPLink[[selectedDrugForPosology.drug.id]]" position="right" for="CBIPLink[[selectedDrugForPosology.drug.id]]">[[localize('cbip','CBIP',language)]]</paper-tooltip>
                    </template>
                    
                    <template is="dom-if" if="[[_getRcpLink()]]">
                        <paper-icon-button id="rcpLink_[[selectedDrugForPosology.drug.id]]" class="infoIcon" icon="vaadin:pill" role="button" on-tap="_openRcpLink"></paper-icon-button>
                        <paper-tooltip id="tt_rcpLink_[[selectedDrugForPosology.drug.id]]" position="right" for="rcpLink_[[selectedDrugForPosology.drug.id]]">[[localize('med_rcp','Résumé caractéristiques du produit (CBiP)',language)]]</paper-tooltip>
                    </template>
                    
                    <template is="dom-if" if="[[_getLeafletLink()]]">
                        <paper-icon-button id="leafletLink_[[selectedDrugForPosology.drug.id]]" class="infoIcon" icon="icons:description" role="button" on-tap="_openLeafletLink"></paper-icon-button>
                        <paper-tooltip id="tt_leafletLink_[[selectedDrugForPosology.drug.id]]" position="right" for="leafletLink_[[selectedDrugForPosology.drug.id]]">[[localize('med_leaflet','Notice pour le public (CBiP)',language)]]</paper-tooltip>
                    </template>
                    
                    <iron-icon class="header-icon" icon="[[_getDrugType(selectedDrugForPosology)]]"></iron-icon>
                    <span class="bold fs16">[[_getDrugName(selectedDrugForPosology)]]</span>&nbsp;&nbsp;[[_getDrugId(selectedDrugForPosology)]]&nbsp;&nbsp;[[_getDrugCnk(selectedDrugForPosology)]]

                </div>
                
                <div class="posology-container-content">
                    <div class="medication-container">
                        
                        <div class="header-title">[[localize('pos-med', 'Medication', language)]]</div>
                        
                        <div class="medication-container-content">
                            <div>
                                <vaadin-checkbox class="checkbox" id="" checked="" on-checked-changed="">[[localize('pos-chronical', 'Chronical', language)]]</vaadin-checkbox>
                                <vaadin-checkbox class="checkbox" id="" checked="" on-checked-changed="">[[localize('pos-confidential', 'Confidential', language)]]</vaadin-checkbox>
                                <vaadin-checkbox class="checkbox" id="" checked="" on-checked-changed="">[[localize('pos-known-usage', 'Known usage', language)]]</vaadin-checkbox>
                            </div>
                            <div class="medication-fields">
                                
                                <template is="dom-if" if="[[targetAmpp.posologyNote]]">
                                    <div class="regimen-line display-type-regimen comment">
                                        <paper-input-container always-float-label="true" class="w100pc">
                                            <label slot="label" class="color-status">[[localize('proposed_posology','Posologie proposée',language)]]</label>
                                            <iron-autogrow-textarea slot="input" disabled value="[[targetAmpp.posologyNote]]"></iron-autogrow-textarea>
                                        </paper-input-container>
                                    </div>
                                </template>
                                
                                <div class="regimen-line display-type-regimen">
                                    <paper-dropdown-menu always-float-label id="unit" label="[[localize('portion', 'Portion', language)]]" disabled="[[!targetAmpp.dividable]]">
                                        <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{posologyData.quantityFactor}}">
                                            <template is="dom-repeat" items="[[quantityFactors]]"><paper-item id="[[item.id]]" value="[[item]]">[[localize(item.numLabel, item.numLabel, language)]]</paper-item></template>
                                        </paper-listbox>
                                    </paper-dropdown-menu>
                                </div>
                                
                                <template is="dom-repeat" items="[[regimenKeys]]">
                                    <ht-regimen-day
                                        api="[[api]]" 
                                        i18n="[[i18n]]" 
                                        language="[[language]]" 
                                        resources="[[resources]]"
                                        period-config="[[periodConfig]]"
                                        regimen-config="[[regimenConfig]]"
                                        regimen="{{medicationContent.medicationValue.regimen}}"
                                        key="[[item]]"
                                        medication-unit="[[targetAmpp.unit]]" 
                                        weekday-codes="[[weekdayCodes]]" 
                                        occurrences="[[regimenKeys.length]]"
                                        quantity-factor=[[quantityFactorValue]] 
                                        on-regimen-changed="_regimenChanged" 
                                        on-regimen-delete="_removeRegimen"
                                    ></ht-regimen-day>
                                </template>
                                
                                <div class="regimen-line display-type-regimen">
                                    
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
                                    <paper-input-container always-float-label="true">
                                        <label slot="label" class="color-status">[[localize('pos','Posology',language)]]</label>
                                        <iron-autogrow-textarea readonly slot="input" value="{{targetAmpp.posology}}"></iron-autogrow-textarea>
                                    </paper-input-container>
                                </div>
                                
                                <div class="regimen-line display-type-regimen comment">
                                    <paper-input-container always-float-label="true">
                                        <label slot="label" class="color-status">[[localize('instructions-for-patient','Instructions pour le patient',language)]]/[[localize('pos','Posology',language)]]</label>
                                        <iron-autogrow-textarea slot="input" value="{{targetAmpp.commentForPatient}}"></iron-autogrow-textarea>
                                    </paper-input-container>
                                </div>
                                
                                
                                
                            </div>
                        </div>
                    </div>
                    <div class="prescription-container">
                        <div class="header-title">
                            [[localize('pos-presc', 'Prescription', language)]]
                        </div>
                        <div class="prescription-container-content">
                        
                            Date début<br />
                            Date fin<br />
                            Nombre de jours<br />
                            Fin boite<br />
                            Jours couverts<br />
                            Substitution<br />
                            Remboursement<br />
                            Déliverable à partir du<br />
                            Date de fin pour l'exécution<br />
                            
                            <div class="regimen-line display-type-regimen">
                            
                                <vaadin-date-picker id="beginMoment" label="[[localize('start-date', 'Start date', language)]]" value="{{targetAmpp.beginMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]" required></vaadin-date-picker>
                                
                                <template is="dom-if" if="[[medicationContent.isPrescription]]">
                                
                                    <vaadin-date-picker id="endMoment" label="[[localize('end-date', 'End date', language)]]" value="{{targetAmpp.endMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]" min="[[targetAmpp.beginMomentAsString]]"></vaadin-date-picker>
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
                                        <paper-listbox id="substitution" slot="dropdown-content" selected="{{targetAmpp.substitutionAllowed}}" attr-for-selected="value">
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
                                    <vaadin-date-picker id="deliveryDate" label="[[localize('deliv_from', 'Délivrable à partir du', language)]]" readonly value="{{targetAmpp.deliveryMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                                    <vaadin-date-picker id="endExecDate" label="[[localize('EndDateForExecution', 'Date de fin pour excécution', language)]]" readonly value="{{targetAmpp.endExecMomentAsString}}" class="regimen--datepicker" i18n="[[i18n]]"></vaadin-date-picker>
                                </template>
                                
                            </div>
                            
                            <div class="regimen-line display-type-regimen">

                                <template is="dom-if" if="[[medicationContent.isPrescription]]">
                                
                                    <paper-dropdown-menu always-float-label id="medicRenewal" label="[[localize('renewal', 'Renouvellement', language)]]">
                                        <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{targetAmpp.renewal}}">
                                            <paper-item value="allowed">[[localize('allowed','Permis',language)]]</paper-item>
                                            <paper-item value="forbidden">[[localize('forbidden','Interdit',language)]]</paper-item>
                                        </paper-listbox>
                                    </paper-dropdown-menu>
                                    
                                    <template is="dom-if" if="[[_isAllowed(targetAmpp.renewal)]]">
                                        <paper-input always-float-label type="number" min="0" label="[[localize('amount', 'Nombre', language)]]" max="100" value="{{medicationContent.medicationValue.renewal.decimal}}"></paper-input>
                                        <paper-input always-float-label type="number" min="0" label="[[localize('everyX', 'tous le', language)]]" max="100" value="{{medicationContent.medicationValue.renewal.duration.value}}"></paper-input>
                                        <paper-dropdown-menu always-float-label id="medicRenewalTimeUnit" label="[[localize('time_unit','Time unit',language)]]" class="regimen--renewalTimeUnit">
                                            <paper-listbox id="renewalTimeUnit" slot="dropdown-content" class="dropdown-renewalTimeUnit" attr-for-selected="value" selected="{{renewalTimeUnit}}">
                                                <template is="dom-repeat" items="[[timeUnits]]"><paper-item value="[[item]]">[[_getCodeLabel(item.label)]]</paper-item></template>
                                            </paper-listbox>
                                        </paper-dropdown-menu>
                                    </template>
                                    
                                </template>
                                
                            </div>
                            
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
            selectedDrugForPosology:{
                type: Object,
                value: () => {}
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
            targetAmpp: {
                type: Object,
                value:() => {}
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
            posologyData: {
                type: Object,
                value:() => {}
            }
        };
    }

    static get observers() {
        return [
            "_getTargetAmpp(user, selectedDrugForPosology)"
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

    _getTargetAmpp(user, selectedDrugForPosology) {

        const targetAmpp = _
            .chain(selectedDrugForPosology)
            .get("drug.amp.ampps")
            .find(it => _.trim(_.get(it,"id")) === _.trim(_.get(selectedDrugForPosology, "id")))
            .omit(["amp.ampps"])
            .value()

        return (this.set("targetAmpp", targetAmpp)||true) && targetAmpp

    }

    _getDrugName(drug){
        return _.get(drug, 'drug.label', null)
    }

    _getDrugId(drug){
        return 'Sam: '+_.get(drug, 'drug.samCode', '')+' ('+_.get(drug, 'drug.samDate', '')+') CTI-ext: '+_.get(drug, 'drug.ctiExtended', '')
    }

    _getDrugType(drug){
        return _.get(drug, 'type', null) === "chronic" ? "icons:alarm-on" : _.trim(_.get(drug,'type')) === "history" ? "vaadin:time-backward" : _.trim(_.get(drug,'type')) === "commercial" ? "vaadin:copyright" : _.trim(_.get(drug,'type')) === "substance" ? "vaadin:pill" : _.trim(_.get(drug,'type')) === "compound" ? "vaadin:flask" : null
    }

    _getDrugCnk(drug){
        return _.get(drug, 'drug.id', '') && 'CNK: ' + _.get(drug, 'drug.id', '')
    }

    _getCbipPicture() {
        return require('../../../../../images/cbip-logo.png')
    }

    _openCbipLink() {
        return window.open('http://www.cbip.be/' + this.language + '/contents/jump?cnk=' + _.trim(_.get(this, "selectedDrugForPosology.drug.id")));
    }

    _getRcpLink() {

        return _
            .chain(_.get(this,"selectedDrugForPosology.drug.amp.ampps"))
            .find(it => _.trim(_.get(it,"id")) === _.trim(_.get(this,"selectedDrugForPosology.id")))
            .get("spcLink." + _.trim(_.get(this,"language","fr")))
            .trim()
            .value()
    }

    _getLeafletLink() {
        return _
            .chain(_.get(this,"selectedDrugForPosology.drug.amp.ampps"))
            .find(it => _.trim(_.get(it,"id")) === _.trim(_.get(this,"selectedDrugForPosology.id")))
            .get("leafletLink." + _.trim(_.get(this,"language","fr")))
            .trim()
            .value()
    }

    _openRcpLink() {
        const targetUrl = this._getRcpLink();
        return targetUrl && window.open(targetUrl);
    }

    _openLeafletLink() {
        const targetUrl = this._getLeafletLink();
        return targetUrl && window.open(targetUrl);
    }

    _createMedication(){

    }

    _validatePosology(){

    }

    _debug(x) {

        console.log("_debug", x)

    }



}
customElements.define(HtPatPrescriptionDetailPosology.is, HtPatPrescriptionDetailPosology);
