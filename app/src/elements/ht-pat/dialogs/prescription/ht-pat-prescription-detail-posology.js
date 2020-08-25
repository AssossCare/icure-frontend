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
                
                }
                
                .prescription-container-content{
                
                }
                
                .posology-container-content{
                    height: calc(100% - 30px);
                }
                
                .posology-title{
                    padding: 5px;
                    background: var(--app-background-color-dark);
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
                    height: 16px;
                    width: 16px;
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
                    border:1px dashed var(--app-error-color-dark);
                }
                
                .allergy-title {
                    color: var(--app-error-color-dark);
                }
                
            </style>
            
            <template is="dom-if" if="[[isLoading]]" restamp="true"><ht-spinner active="[[isLoading]]"></ht-spinner></template>            
            
            <div class="posology-container">
            
                <div class="posology-title">
                
                    <h3 class="m0"><iron-icon class="header-icon" icon="[[_getDrugType(medication)]]"></iron-icon> [[medicationDetail.label]]</h3>
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
                        [[_getDrugId(medicationDetail)]]&nbsp;&nbsp;[[_getDrugCnk(medication)]]
                    </p>
                    
                    <!--
                    <div class="sam-code-item">
                        <template is="dom-if" if="[[!medicationDetail.oldCnk]]">[[_formatCnk(medicationDetail.id)]]</template>
                        <template is="dom-if" if="[[medicationDetail.oldCnk]]">
                            <iron-icon class="alert-icon" icon="icons:warning"></iron-icon>
                            [[localize('', 'Attention', language)]] <span class="strikeOut">[[_formatCnk(medicationDetail.oldCnk)]]</span> [[localize('', 'devient', language)]] [[_formatCnk(medicationDetail.id)]]
                        </template>
                    </div>
                    -->
                    
                    <template is="dom-if" if="[[_hasAllergies(medicationDetail)]]">
                        <div class="allergy-alert p10 mt5 mb5">
                            <div class="allergy-title fw700"> <iron-icon class="alert-icon mw15 mh15" icon="icons:warning"></iron-icon> [[localize('aller_int','Allergies et intolérances',language)]]: </div>
                            <div class="list"><template is="dom-repeat" items="[[medicationDetail.allergies]]" as="allergy"><div><iron-icon class$="mw15 mh15 code-icon [[_getAtcStyle(allergy)]]" icon="[[_getAllergyIcon(allergy)]]"></iron-icon> ([[_getIcpcLabel(allergy)]])<i> [[_shortDateFormat(allergy)]]</i> [[allergy.descr]]</div></template></div>
                        </div>
                    </template>
                    
                    <paper-icon-button class="infoIconMore" icon="icons:help-outline" on-tap="_openAdditionalCnkInfo"></paper-icon-button>

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
                                    <paper-dropdown-menu always-float-label id="unit" label="[[localize('portion', 'Portion', language)]]" disabled="[[!medicationDetail.dividable]]">
                                        <paper-listbox slot="dropdown-content" attr-for-selected="value" selected="{{quantityFactor}}">
                                            <template is="dom-repeat" items="[[quantityFactors]]"><paper-item id="[[item.id]]" value="[[item]]">[[localize(item.label, item.numLabel, language)]]</paper-item></template>
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
                                        medication-unit="[[medicationDetail.unit]]" 
                                        weekday-codes="[[weekdayCodes]]" 
                                        occurrences="[[regimenKeys.length]]"
                                        quantity-factor=[[quantityFactorValue]] 
                                        on-regimen-changed="_regimenChanged" 
                                        on-regimen-delete="_removeRegimen"
                                    ></ht-regimen-day>
                                </template>                                                                
                                
                                Période<br />
                                Posologie (text)<br />
                                Instructions pour le patient<br />

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
                    // @ todo: dayNumber not supported in posologyString
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
            }
            // </Axel Stijns>

        };
    }

    static get observers() {
        return [
            '_medicationChanged(user, medication, medication.*)',

            // Todo: refactor those beauties
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

    _openCbipLink() {

        return window.open('http://www.cbip.be/' + this.language + '/contents/jump?cnk=' + _.trim(_.get(this, "medicationDetail.id")));

    }

    _getRcpLink(medicationDetail) {

        return _.trim(_.get(medicationDetail, "spcLink." + _.trim(_.get(this,"language","fr"))))

    }

    _getLeafletLink(medicationDetail) {

        return _.trim(_.get(medicationDetail, "leafletLink." + _.trim(_.get(this,"language","fr"))))

    }

    _openRcpLink() {
        const targetUrl = this._getRcpLink(this.medicationDetail);
        return targetUrl && window.open(targetUrl);
    }

    _openLeafletLink() {
        const targetUrl = this._getLeafletLink(this.medicationDetail);
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
            id: _.get(m,"id"),
            codes: _.get(m,"codes"),
            medicationValue: _.get(content,"medicationValue"),
            isNew: isNew || false,
            isPrescription: _.get(m,"isPrescription") || isPres || false,
            isMedication: _.size(_.get(m,"tags")) && _.some(_.get(m,"tags"), tag => tag && tag.type === "CD-ITEM" && tag.code === "medication") || false
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

        const regimen = _.get(this, "medicationContent.medicationValue.regimen", "")

        if (!regimen || !_.get(this,"quantityFactor")) return

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

        return !_.size(_.get(this, "medicationContent.medicationValue.regimen", "")) ? null :  this._resetAll()

    }

    _resetAll() {

        const regimen = _.get(this, "medicationContent.medicationValue.regimen", "")

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

    _medicationChanged(user, medication) {

        const now = +new Date()
        const promResolve = Promise.resolve()

        return !medication ? this._init() : this._init()
            .then(() => this.set('isLoading', true))
            .then(() => _.assign(medication && medication.drug||(medication.drug={}), {newMedication: _.get(medication,"drug.newMedication")||{content: {}, codes: []}}))
            .then(() => !_.trim(_.get(medication,"drug.amp.vmp.vmpGroup.id")) ? null : this.api.besamv2().findPaginatedVmpsByGroupId(_.trim(_.get(medication,"drug.amp.vmp.vmpGroup.id")),null,null,100).then(vmps => _.merge(medication, {drug:{vmps:_.size(_.get(vmps,"rows")) ? _.get(vmps,"rows") : null}})).catch(e => console.log("[ERROR]", e)))
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
                        return _.merge(_.get(medication,"drug"), _.some(validAmpps, ampp=> _.trim(_.get(ampp,"publicDmpp.code")) === _.trim(_.get(medication,"id"))) ? {} : {id: _.trim(_.get(latestAmpp,"publicDmpp.code")), drug: { id: _.trim(_.get(latestAmpp,"publicDmpp.code")), oldCnk: _.trim(_.get(medication,"id")) } })

                    })
                    .catch(e => (console.log("[ERROR]", e)||true) && _.get(medication,"drug"))
            )
            .then(medicationWithAmpps => _.get(this,"cachedBoxes") && _.get(this,"cachedBoxes") !== _.get(medicationWithAmpps,"boxes") ? (this._updateStats()||true) && medicationWithAmpps : medicationWithAmpps)
            .then(medicationWithAmpps => (this.set("cachedBoxes", _.get(medicationWithAmpps,"boxes"))||true) && medicationWithAmpps)
            .then(medicationWithAmpps => {

                const content = this.content || this.extractContentWithIdFromMedicationService(_.get(medicationWithAmpps,"newMedication"), _.get(medicationWithAmpps,"options.isNew"), _.get(medicationWithAmpps,"options.isPrescription"))
                this.set("medicationContent", content);

                // Used to be this._initmedicationContent()
                _.get(this,"medicationContent.medicationValue") && !_.get(this,"medicationContent.medicationValue.regimen") ? this.set('medicationContent.medicationValue.regimen', []) : null

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

                    // Todo: FZ need this [OR] double check previous class structure % displayed infos % axel
                    // label: _.trim(_.get(medication,"drug.label")),
                    // informationsForPosology: _.get(medication,"drug.informationsForPosology"),
                    // narcoticIcon: _.get(medication,"drug.narcoticIcon"),
                    // samCode: _.trim(_.get(medication,"drug.samCode")),
                    // productType: _.trim(_.get(medication,"type")),
                    // type: _.trim(_.get(medication,"drug.type")),
                    // allergyType: _.get(medication,"drug.allergyType"),
                    // atcCat: _.trim(_.get(medication,"drug.atcCat")),
                    // catIcon: _.trim(_.get(medication,"drug.catIcon")),
                    // publicPriceHr: _.trim(_.get(medication,"drug.publicPrice")),

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
            .finally(() => this.set('isLoading', false))



        // Todo: Call 4 Max getByVmp (group id) -> get wada -> throw back 2 max (info btn)
        // Todo: Check currentReimboursment
        // Todo: .omit(["amp.ampps"]) avoid infinite / deep loop
        // Todo: make sure class.medication object equals previous lines of code (embeded object with ..drug, .type .id)

    }











    // <Axel Stijns>
    // Refactor the whole mess

    _regimenChanged() {
        console.log("_regimenChanged");
        if (!this.medicationContent || !this.medicationContent.medicationValue || !this.medicationDetail) return;
        this._updateStats();
        this.medicationContent.medicationValue.instructionForPatient = "";
        const posology = this.api.contact().medication().posologyToString(this.medicationContent.medicationValue || {}, this.language);
        this.set("medicationDetail.posology", posology);
        const separator = posology && this.medicationDetail.commentForPatient && this.commentSeparator || "";
        this.medicationContent.medicationValue.instructionForPatient = posology + separator + this.medicationDetail.commentForPatient;
    }

    _removeRegimen(e) {
        const key = _.get(e, "detail.key", "")
        if (!key) return;
        if (this.periodConfig.id === "dailyPosology") return;
        if (this.regimenKeys.length < 2) return;
        const keyId = this.periodConfig.keyId;
        let regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
        if (keyId === "weekday") {
            regimen = regimen.filter(reg => reg.weekday && reg.weekday.code != key)
        } else {
            // @ todo dayNumber and date
        }
        this.set("medicationContent.medicationValue.regimen", regimen);
        this.splice("regimenKeys", this.regimenKeys.indexOf(key), 1);
        this._updatePeriodConfigs();
    }

    _isConfidentialChanged() {
        if (!this.medicationDetail || !this.medicationDetail.newMedication) return;
        const newMed = this.medicationDetail.newMedication;
        const confType = "org.taktik.icure.entities.embed.Confidentiality";
        ((newMed.tags || (newMed.tags = [])).find(tag => tag.type === confType) || (newMed.tags[newMed.tags.length] = {type: confType, version: "1"})).code = (this.medicationDetail.isConfidential ? "secret" : "notsecret");
    }

    _editCompoundPrescription() {
        this.dispatchEvent(new CustomEvent('edit-compound', {
            detail: {
                item : {
                    title: this.medicationDetail.compoundTitle,
                    formula: this.medicationDetail.intendedName,
                    fromPrescription: {
                        update: false,
                        onChange: this._updateCompoundPrescription.bind(this)
                    }
                }
            }, bubbles: true, composed: true
        }));
    }

    _updateCompoundPrescription(compound) {
        const medicationValue = _.get(this.medicationContent, "medicationValue", "");
        if (medicationValue) {
            medicationValue.compoundPrescription = compound.title + "\r\n" + compound.formula;
            this.set("medicationDetail.compoundTitle", compound.title);
            this.set("medicationDetail.intendedName", compound.formula);
        }
    }

    _renewalChanged() {
        if (!this.medicationDetail || !this.medicationContent) return;
        if (this.medicationDetail.renewal === "allowed") {
            const renewal = this.medicationContent.medicationValue.renewal || {
                decimal: 1,
                duration: {
                    value: 1,
                    unit: this.timeUnits.find(timeUnit => timeUnit.code === "mo")
                }
            };
            this.set("medicationContent.medicationValue.renewal", renewal);
            this.set("renewalTimeUnit", this.timeUnits.find(timeUnit => timeUnit.code === renewal.duration.unit.code));
        } else {
            delete this.medicationContent.medicationValue.renewal;
            this.notifyPath("medicationContent.medicationValue.renewal");
        }
    }

    _quantityFactorChanged() {
        const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
        if (!regimen) return;
        regimen.filter(reg => reg.administratedQuantity && reg.administratedQuantity.quantity || "")
            .forEach(reg => {
                const quantity = reg.administratedQuantity.quantity;
                reg.administratedQuantity.unit = this.medicationDetail.unit || this.localize("uni", "Unités");
                reg.administratedQuantity.quantity = this.quantityFactor.denominator > 1 && this.quantityFactor.numLabel || parseInt(quantity) || "";
            });
        this.set("quantityFactorValue", this.quantityFactor);
        this.notifyPath("medicationContent.medicationValue", "changed");
    }

    _changeBeginMoment() {
        if (this.medicationDetail) { // begin moment can NOT be empty
            if (!this._beginMoment()) {
                this.set("medicationDetail.beginMomentAsString", moment().format("YYYY-MM-DD"))
            } else {
                if (this.medicationDetail.endMomentAsString && !this.initializingDate) {
                    const endMoment = this._beginMoment().add(this.duration, "days");
                    this.set("medicationDetail.endMomentAsString", endMoment.format("YYYY-MM-DD"));
                    this.set("medicationContent.medicationValue.endMoment", parseInt(endMoment.format("YYYYMMDD"), 10));
                } else {
                    this.set("medicationContent.medicationValue.endMoment", null);
                }
                this.set("medicationContent.medicationValue.beginMoment", parseInt(this._beginMoment().format("YYYYMMDD"), 10));
                this._updateStats();
            }
        }
    }

    _changeEndMoment() {
        if (this.medicationDetail && this._beginMoment()) {
            if (!this._endMoment()) {
                this.set("duration", "");
            } else {
                let endMoment = this._endMoment();
                let duration = endMoment.diff(this._beginMoment(), "days");
                if (duration < 0) {
                    duration = 0;
                    endMoment = this._beginMoment();
                    this.set("medicationDetail.endMomentAsString", endMoment.format("YYYY-MM-DD"));
                }
                this.set("duration", duration.toString());
                this.set("medicationContent.medicationValue.endMoment", parseInt(endMoment.format("YYYYMMDD"), 10));
            }
            this._updateStats();
        }
    }

    _changeDuration() {
        if (this.medicationDetail && this._beginMoment()) {
            if (this.duration === "0") {
                this.set("duration", "");
            }
            else if (!this.duration) {
                this.set("medicationDetail.endMomentAsString", "");
                this.set("medicationContent.medicationValue.endMoment", null);
            } else {
                const endMoment = this._beginMoment().add(this.duration, "days");
                this.set("medicationDetail.endMomentAsString", endMoment.format("YYYY-MM-DD"));
                this.set("medicationContent.medicationValue.endMoment", parseInt(endMoment.format("YYYYMMDD"), 10));
            }
            this._updateStats();
        }
    }

    _addRegimen() {
        const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
        if (!regimen) return;
        if (!this.regimenKey) return;
        if (this.regimenKeys.includes(this.regimenKey))
            return;
        this.push("regimenKeys", this.regimenKey);
        this._updatePeriodConfigs();
    }

    openList(list) {
        // ------------------if we want to create an array even when we have only one medication selected
        // list && list.length > 0 ? this.set('medications', _.clone(list)) : (list.newMedication && this.set('medications',[list])) || this.set('medications', [])
        // ----------------------------------------------------------------------------------------------
        list && list.length > 0 ? this.set('medications', _.clone(list)) : this.set('medications', [])
        if (this.medications.length) {
            this.open(this.medications[0], this.extractContentWithIdFromMedicationService(this.medications[0].newMedication, true, this.medications[0].options.isPrescription), this.medications[0].boxes);
            this.set('selectedMedication',0);
        }
    }

    _changeMedicPriority() {
        // console.log('_changeMedicPriority')
        if (this.medicationContent) {
            const priority = this.medicationContent.medicationValue.priority?
                this.medicationContent.medicationValue.priority=== 2 ? 'high' :
                    this.medicationContent.medicationValue.priority=== 1 ? 'middle' : 'low' :
                'low';
            this.set("medicationContent.medicationValue.priority", priority);
        }
    }

    EOLAndClose(){
        const today = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"), 10)
        this.set("medicationDetail.newMedication.endOfLife", today)
        this.save()
        this.close()
    }

    endAndClose(){
        const yesterday = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"), 10)
        this.set("medicationContent.medicationValue.endMoment", yesterday)
        this.save()
        this.close()
    }

    saveAndClose() {
        this.save() // instant save
        this.close()
    }

    close() {
        this.set("medicationContent", null)
        this.set('medications', [])
    }

    _changeRenewalTimeUnitItem(item, unitValue, decimalValue){
        if(item && item.id){
            const timeUnitItem = this.timeUnit.find(r => r.id === item.id)
            this.set("medicationContent.medicationValue.renewal", {
                decimal: decimalValue,
                duration: {
                    value: unitValue,
                    unit: timeUnitItem
                }
            })
        }
    }

    _createMedication(e){
        this.set('medicationDetail.options.createMedication', e.target.checked)
        this.set('medicationContent.createMedication', e.target.checked)
    }

    _medicationName(svc) {
        return this.api.contact().medication().medicationNameToString(this.api.contact().preferredContent(svc, this.language).medicationValue) || ''
    }

    // </Axel Stijns>









    // Max
    _createMedication(){

    }

    _validatePosology(){

    }

}
customElements.define(HtPatPrescriptionDetailPosology.is, HtPatPrescriptionDetailPosology);