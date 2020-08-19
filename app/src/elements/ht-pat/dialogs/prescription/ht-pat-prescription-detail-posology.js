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
                
            </style>
            
            <div class="posology-container">
            
                <div class="posology-title">
                
                    <h3 class="m0"><iron-icon class="header-icon" icon="[[_getDrugType(selectedDrugForPosology)]]"></iron-icon> [[_getDrugName(selectedDrugForPosology)]]</h3>
                    <p class="m0 mt5">
                        <template is="dom-if" if="[[selectedDrugForPosology.drug.id]]">
                            <paper-icon-button id="CBIPLink[[selectedDrugForPosology.drug.id]]" class="infoIcon" src="[[_getCbipPicture()]]" role="button" on-tap="_openCbipLink"></paper-icon-button>
                            <paper-tooltip id="tt_CBIPLink[[selectedDrugForPosology.drug.id]]" position="right" for="CBIPLink[[selectedDrugForPosology.drug.id]]">[[localize('cbip','CBIP',language)]]</paper-tooltip>
                        </template>
                        
                        <template is="dom-if" if="[[_getRcpLink()]]">
                            <paper-icon-button id="rcpLink_[[selectedDrugForPosology.drug.id]]" class="infoIcon infoIconBlue" icon="vaadin:pill" role="button" on-tap="_openRcpLink"></paper-icon-button>
                            <paper-tooltip id="tt_rcpLink_[[selectedDrugForPosology.drug.id]]" position="right" for="rcpLink_[[selectedDrugForPosology.drug.id]]">[[localize('med_rcp','Résumé caractéristiques du produit (CBiP)',language)]]</paper-tooltip>
                        </template>
                        
                        <template is="dom-if" if="[[_getLeafletLink()]]">
                            <paper-icon-button id="leafletLink_[[selectedDrugForPosology.drug.id]]" class="infoIcon" icon="icons:description" role="button" on-tap="_openLeafletLink"></paper-icon-button>
                            <paper-tooltip id="tt_leafletLink_[[selectedDrugForPosology.drug.id]]" position="right" for="leafletLink_[[selectedDrugForPosology.drug.id]]">[[localize('med_leaflet','Notice pour le public (CBiP)',language)]]</paper-tooltip>
                        </template>                    
                        [[_getDrugId(selectedDrugForPosology)]]&nbsp;&nbsp;[[_getDrugCnk(selectedDrugForPosology)]]
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
                        <div class="allergy-alert">
                            <div class="allergy-title"> <iron-icon class="alert-icon" icon="icons:warning"></iron-icon> [[localize('aller_int','Allergies et intolérances',language)]]</div>
                            <div class="list"><template is="dom-repeat" items="[[medicationDetail.allergies]]" as="allergy"><div><iron-icon class$="code-icon [[_getAtcStyle(allergy)]]" icon="[[_getAllergyIcon(allergy)]]"></iron-icon>[[_getIcpcLabel(allergy)]]<i> [[_shortDateFormat(allergy.openingDate, allergy.valueDate)]]</i> [[allergy.descr]]</div></template></div>
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
                                
                                Portion<br />
                                Posologie (component)<br />
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
            "_getMedicationDetail(user, selectedDrugForPosology)",
            '_changeBeginMoment(medicationDetail.beginMomentAsString)',
            '_changeEndMoment(medicationDetail.endMomentAsString)',
            '_changeDuration(duration)',
            '_regimenChanged(medicationContent.medicationValue, medicationDetail.commentForPatient, medicationContent.medicationValue.regimen.*)',
            '_medicationChanged(medication, medication.*)',
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



    _getMedicationDetail(user, selectedDrugForPosology) {

        const medicationDetail = _
            .chain(selectedDrugForPosology)
            .get("drug.amp.ampps")
            .find(it => _.trim(_.get(it,"id")) === _.trim(_.get(selectedDrugForPosology, "id")))
            .omit(["amp.ampps"])
            .value()

        return (this.set("medicationDetail", medicationDetail)||true) && medicationDetail

    }

    _getDrugName(drug){
        return _.get(drug, 'drug.label', null)
    }

    _getDrugId(drug){
        return 'Sam: '+_.get(drug, 'drug.samCode', '')+' ('+_.get(drug, 'drug.samDate', '')+') CTI-ext: '+_.get(drug, 'drug.ctiExtended', '')
    }

    _getDrugType(drug){

        return _.trim(_.get(drug,'type')) === "chronic" ? "icons:alarm-on" :
            _.trim(_.get(drug,'type')) === "history" ? "vaadin:time-backward" :
            _.trim(_.get(drug,'type')) === "commercial" ? "vaadin:copyright" :
            _.trim(_.get(drug,'type')) === "substance" ? "vaadin:pill" :
            _.trim(_.get(drug,'type')) === "compound" ? "vaadin:flask" :
            ""

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

    _hasAllergies(item) {

        return _.size(_.get(item,"allergies"))

    }

    _getAtcStyle(item) {

        return !_.get(item,"atcCode[0]") ? "" : 'ATC--' + _.trim(_.head(_.get(item,"atcCode"))).toUpperCase();

    }

    _getAllergyIcon(item) {

        return _.trim(_.get(item,"type")) === "allergy" ? "image:filter-vintage" : (_.trim(_.get(item,"type")) === "adr" ? "vaadin:pill" : "")

    }

    _getIcpcLabel(item) {

        const icpc = _.find(_.get(item,"codes",[]), code => ["ICPC","ICPC2"].indexOf(_.trim(_.get(code,"type")).toUpperCase()) > -1)

        return icpc && (icpc.code || icpc.id.split("|")[1]) || "";

    }

    _shortDateFormat(date, altDate) {

        return (date || altDate) && this.api.moment((date || altDate)).format("YY") || "";

    }

    _openAdditionalCnkInfo() {

        return this.dispatchEvent(new CustomEvent('open-additional-cnk-info', {bubbles:true,composed:true,detail:{product:this.selectedDrugForPosology}}))

    }




    // <Axel Stijns>

    _formatCnk(id) {
        return id && ("CNK " + id) || "";
    }

    _customContainer() {
        return this.closable ? "container-prescription" : "container-standalone";
    }

    _isConfidentialChanged() {
        if (!this.medicationDetail || !this.medicationDetail.newMedication) return;
        const newMed = this.medicationDetail.newMedication;
        const confType = "org.taktik.icure.entities.embed.Confidentiality";
        ((newMed.tags || (newMed.tags = [])).find(tag => tag.type === confType) || (newMed.tags[newMed.tags.length] = {type: confType, version: "1"})).code = (this.medicationDetail.isConfidential ? "secret" : "notsecret");
    }

    _substitutionAllowedChanged() {
        if (!this.medicationDetail) return;
        this.set("medicationContent.medicationValue.substitutionAllowed", (this.medicationDetail.substitutionAllowed === "true"));
    }

    _close() {
        this.dispatchEvent(new CustomEvent('close', {detail: {}, bubbles: true, composed: true}));
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

    _isPortion() {
        return this.quantityFactor.denominator > 1;
    }

    _reimbursementReasonChanged() {
        if (!this.reimbursementReason) {
            this.set("medicationContent.medicationValue.reimbursementReason", null);
        }
        else {
            this.set("medicationContent.medicationValue.reimbursementReason", this.reimbursementReason);
        }
    }

    _renewalTimeUnitChanged() {
        this.set("medicationContent.medicationValue.renewal.duration.unit", this.renewalTimeUnit);
    }

    _isAllowed(renewal) {
        return renewal === "allowed";
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

    _any(a,b,c,d,e) {
        return a||b||c||d||e
    }

    _getCodeLabel(code){
        return code && code[this.language]
    }

    _instructionOverride() {
        const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
        if (regimen && regimen.length) {
            this._resetAll()
        }
    }

    _regimenChanged() {
        if (!this.medicationContent || !this.medicationContent.medicationValue || !this.medicationDetail) return;
        this._updateStats();
        this.medicationContent.medicationValue.instructionForPatient = "";
        const posology = this.api.contact().medication().posologyToString(this.medicationContent.medicationValue || {}, this.language);
        this.set("medicationDetail.posology", posology);
        const separator = posology && this.medicationDetail.commentForPatient && this.commentSeparator || "";
        this.medicationContent.medicationValue.instructionForPatient = posology + separator + this.medicationDetail.commentForPatient;
    }

    _extractCommentForPatient() {
        if (!this.medicationContent || !this.medicationContent.medicationValue) return;
        const instructionForPatient = this.medicationContent.medicationValue.instructionForPatient;
        this.medicationContent.medicationValue.instructionForPatient = "";
        const posology = this.api.contact().medication().posologyToString(this.medicationContent.medicationValue || {}, this.language);
        const comment = instructionForPatient && instructionForPatient.replace(posology, "") || "";
        const index =  comment ? comment.indexOf(this.commentSeparator) : -1;
        return (index < 0) ? comment : comment.slice(this.commentSeparator.length);
    }

    _updateStats() {
        if (!this.quantityFactor) return;
        const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
        if (!regimen) return;

        const end = this._endMoment();
        const begin = this._beginMoment();

        let availableDoses = parseInt(_.get(this.medicationDetail, "packDisplayValue", 0), 10) * parseInt(_.get(this.medicationDetail, "boxes", 0), 10) * this.quantityFactor.denominator;
        const keys= this.periodConfig.id === "weeklyPosology" ? this.weekdayKeys : [""];
        let currentDayNumber = this.periodConfig.id === "weeklyPosology" ? begin.weekday() : 0;

        let takes = keys.map(key => regimen.reduce((total, period) => {
                if (!key || _.get(period, "weekday.code", 0) === key) {
                    total += (this.quantityFactor.denominator > 1) && 1 || parseInt(period.administratedQuantity.quantity, 10) || 0;
                }
                return total;
            }, 0)
        );

        const totalTakesPerPeriod = takes.reduce((total, quantity) => {
            total += quantity;
            return total;
        }, 0);

        // this.set("totalTakesPerPeriod", totalTakesPerPeriod);

        const totalQuantityPerPeriod = Math.round(totalTakesPerPeriod / this.quantityFactor.denominator);

        // this.set("totalQuantityPerPeriod", totalQuantityPerPeriod);
        this.set("canShowProvisionInfo", this.medicationContent.isPrescription && availableDoses > 0 && totalTakesPerPeriod > 0);

        let medicationDays = end ? end.diff(begin, "days") : 0;

        this.set("canShowQuantityInfo", medicationDays && totalTakesPerPeriod);

        let provisionDays = 0;
        let totalTakes = 0;

        if (totalTakesPerPeriod > 0) {
            while (availableDoses > 0 || medicationDays > 0) {
                const dailyTakes = (takes[(currentDayNumber++) % takes.length] || 0);
                if (availableDoses > 0) {
                    availableDoses -= dailyTakes;
                    provisionDays += 1;
                }
                if (medicationDays > 0) {
                    medicationDays -= 1;
                    totalTakes += dailyTakes;
                }
            }

            if (availableDoses < 0) {
                provisionDays--;
            }
        }

        const totalQuantity = Math.round(totalTakes / this.quantityFactor.denominator);

        const endProvisionMoment = this._beginMoment().add(provisionDays, "days");

        this.set("provisionDays", provisionDays);
        this.set("totalTakes", totalTakes);
        this.set("totalQuantity", totalQuantity);
        this.set("endProvisionMomentAsString", endProvisionMoment.format("YYYY-MM-DD"));
        this.set("insufficientProvision", (endProvisionMoment.isBefore(this._endMoment())));
    }

    _beginMoment() {
        return this.api.moment(this.medicationDetail.beginMomentAsString, "YYYY-MM-DD");
    }

    _endMoment() {
        return this.api.moment(this.medicationDetail.endMomentAsString, "YYYY-MM-DD");
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

    _isCompoundPrescription() {
        return this.medicationDetail && this.medicationDetail.type === "compound";
    }

    _setSpinnerBusy() {
        this.dispatchEvent(new CustomEvent('spinner-busy', {
            detail: {}, bubbles: true, composed: true
        }));
    }

    _setSpinnerIdle() {
        this.dispatchEvent(new CustomEvent('spinner-idle', {
            detail: {}, bubbles: true, composed: true
        }));
    }

    extractContentWithIdFromMedicationService(m, isNew, isPres) {
        const content = this.api.contact().preferredContent(m, this.language)  || (m.content[this.language] = {
            medicationValue: {regimen: []}
        });
        return {
            id: m.id,
            codes: m.codes,
            medicationValue: content.medicationValue,
            isNew: isNew || false,
            isPrescription: m.isPrescription || isPres || false,
            isMedication: m.tags && m.tags.length && m.tags.some(tag => tag.type === "CD-ITEM" && tag.code === "medication") || false
        };
    }

    _checkCnk(medication) {
        if (medication.type === "medicine" && medication.id && !medication.samCode) {
            return this.api.besamv2().findAmpsByDmppCode(medication.id)
                .then(amps => {
                    // get the latest version and compare cnk
                    const now = moment().valueOf();
                    const validAmpps = amps && amps.length && amps.reduce((validAmpps, amp) => {
                        if ((amp.status === "AUTHORIZED") && amp.ampps && amp.ampps.length) {
                            return validAmpps.concat(amp.ampps.map(ampp => {
                                return Object.assign(ampp, {
                                    amp: amp,
                                    publicDmpp: ampp.dmpps.find(dmpp => dmpp.deliveryEnvironment === "P" && dmpp.codeType === "CNK" && dmpp.from < now && (!dmpp.to || dmpp.to > now))
                                });
                            }));
                        } else {
                            return validAmpps;
                        }
                    }, []);

                    const lastAmpps = validAmpps && validAmpps.filter(ampp => ampp.publicDmpp);
                    const updatedAmpp = lastAmpps && lastAmpps.length && lastAmpps.sort((a, b) => b.publicDmpp.from - a.publicDmpp.from)[0];
                    const samDate = updatedAmpp && updatedAmpp.publicDmpp && moment(updatedAmpp.publicDmpp.from).format("DD/MM/YYYY");
                    Object.assign(medication, {
                        spcLink: _.get(updatedAmpp, `spcLink.${this.language}`, ""),
                        leafletLink: _.get(updatedAmpp, `leafletLink.${this.language}`, ""),
                        ctiExtended: updatedAmpp && updatedAmpp.ctiExtended,
                        posologyNote: updatedAmpp && updatedAmpp.posologyNote,
                        dividable: updatedAmpp && updatedAmpp.dividable,
                        packDisplayValue: updatedAmpp && updatedAmpp.packDisplayValue,
                        samCode: _.get(updatedAmpp, "amp.code", ""),
                        samDate: samDate,
                    });
                    if (lastAmpps.some(ampp => ampp.publicDmpp.code === medication.id)) {
                        // console.log("CNK ok");
                    } else {
                        const updatedCnk = updatedAmpp.publicDmpp.code;
                        const oldCnk = medication.id;
                        // console.log("CNK too old: current CNK: " + oldCnk + "; latest: " + updatedCnk);
                        Object.assign(medication, {
                            oldCnk: oldCnk,
                            id: updatedCnk
                        })
                    }
                    // @ todo also retrieve the current ampp to update data like displayPackage
                    medication.updatedAmpp = updatedAmpp;
                    return medication;
                })
                .catch(err => {
                    console.log(err);
                    return medication;
                })
        } else {
            return Promise.resolve(medication);
        }
    }

    _medicationChanged(medication) {
        if (!medication) return;

        this._setSpinnerBusy();
        this._checkCnk(medication)
            .then(medication => {
                if (this.cachedBoxes && this.cachedBoxes !== medication.boxes) {
                    this._updateStats();
                }
                this.cachedBoxes = medication.boxes;

                this.set("medicationDetail", null);

                const content = this.content || this.extractContentWithIdFromMedicationService(medication.newMedication, medication.options.isNew, medication.options.isPrescription);
                this.set("medicationContent", content);

                this._initmedicationContent();

                const today = this.api.moment(Date.now());
                this.set("initializingDate", true);

                const commentForPatient = this._extractCommentForPatient();

                this.set("medicationDetail", Object.assign(
                    medication,
                    {
                        beginMomentAsString : this.api.moment((content && content.medicationValue && content.medicationValue.beginMoment) || (medication.newMedication && medication.newMedication.valueDate) || (medication.newMedication && medication.newMedication.openingDate) || Date.now()).format('YYYY-MM-DD') || null,
                        endMomentAsString: this.api.moment((content && content.medicationValue && content.medicationValue.endMoment) || (medication.newMedication && medication.newMedication.closingDate)) ? this.api.moment(content.medicationValue.endMoment || (medication.newMedication && medication.newMedication.closingDate)).format("YYYY-MM-DD") : null,
                        deliveryMomentAsString: today.format("YYYY-MM-DD"),
                        endExecMomentAsString: today.add(3, "months").subtract(1, "days").format("YYYY-MM-DD"),
                        dividable: medication.dividable === undefined ? true : medication.dividable,
                        packDisplayValue: medication.packDisplayValue || 0,
                        medicPriority : this.medicationContent.medicationValue.priority === "high" ? 2 : this.medicationContent.medicationValue.priority === "middle" ? 1 : 0,
                        renewal: !!this.medicationContent.medicationValue.renewal ? "allowed" : "forbidden",
                        isConfidential: ((medication.newMedication.tags || []).find(tag => tag.type === "org.taktik.icure.entities.embed.Confidentiality") || {code: ""}).code === "secret",
                        substitutionAllowed: this.medicationContent.medicationValue.substitutionAllowed ? "true" : "false",
                        commentForPatient: commentForPatient
                    }
                ));
                this.set("initializingDate", false);

                // this.set("renewalTimeUnit", this.medicationContent.medicationValue.renewal && this.medicationContent.medicationValue.renewal.duration.unit || this.timeUnits.find(timeUnit => timeUnit.code === "mo"));
                const reimb = this.medicationContent.medicationValue.reimbursementReason;
                this.reimbursementReason = null;
                // this.set("reimbursementReason", reimb && this.reimbursementCodeRecipe.find(item => item.code === reimb.code) || this.reimbursementCodeRecipe.find(item => item.code === "notreimbursable"));
                this.set("reimbursementReason", reimb && this.reimbursementCodeRecipe.find(item => item.code === reimb.code) || "");

                const quantitySample = _.get(this.medicationContent, "medicationValue.regimen[0].administratedQuantity.quantity", "");
                this.set("quantityFactor", quantitySample && !parseInt(quantitySample, 10) && this.quantityFactors.find(q => q.numLabel === quantitySample) || this.quantityFactors[0]);

                // @todo: month (dayNumber) and date
                const period = _.has(this.medicationContent, "medicationValue.regimen[0].weekday") ? "weeklyPosology" : "dailyPosology" ;
                if (this.periodConfig.id !== period) {
                    this.set("periodConfig", this.periodConfigs.find(config => config.id === period));
                } else {
                    this._periodChanged();
                }
                this._updateStats();
            })
            .finally(() => this._setSpinnerIdle());
    }

    _periodChanged() {
        if (!this.periodConfig.id) return;
        let regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
        this.set("medicationContent.medicationValue.regimen", regimen.filter(reg => this.periodConfig.id === "weeklyPosology" ? reg.weekday : !reg.weekday));
        this._initRegimenKeys();
    }

    _initRegimenKeys() {
        this.splice("regimenKeys", 0, this.regimenKeys.length);
        let regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
        if (this.periodConfig.id === "weeklyPosology") {
            if (!regimen.length) {
                this.push("regimenKeys", this.periodConfig.keys[0]);
            } else {
                const keyId = this.periodConfig.keyId;
                if (keyId === "weekday") {
                    const regimenKeys = regimen.filter((e, i, a) => a.findIndex(x => x[keyId].code === e[keyId].code) === i)
                        .map(reg => reg[keyId].code)
                        .filter(code => this.weekdayCodes.some(weekdayCode => weekdayCode.code === code));
                    this.push("regimenKeys", ...regimenKeys)
                } else {
                    // @todo: dayNumber and date cases
                }
            }
        } else {
            this.push("regimenKeys", "none");
        }
        this._updatePeriodConfigs();
    }

    _updatePeriodConfigs() {
        if (!this.periodConfig) return;
        if (this.periodConfig.id !== "dailyPosology") {
            this.splice("availableRegimenKeys", 0, this.availableRegimenKeys.length);
            const availableRegimenKeys = this.periodConfig.keys.filter(key => !this.regimenKeys.some(regKey => regKey === key));
            if (availableRegimenKeys.length) {
                this.push("availableRegimenKeys", ...availableRegimenKeys);
                this.set("regimenKey", availableRegimenKeys[0]);
            }
        }
    }

    _canAddRegimen() {
        // @ todo
        // return (this.periodConfig.id === "weeklyPosology") || (this.periodConfig.id === "monthlyPosology");
        return (this.periodConfig.id === "weeklyPosology" && this.availableRegimenKeys.length);
    }

    _canDeleteRegimen() {
        return (this.regimenKeys.length > 1);
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


    _all(a,b) { return a && b }

    _regimenLines() {
        return this.medicationContent && this.medicationContent.medicationValue && this.medicationContent.medicationValue.regimen || []
    }

    init() {
        return new Promise(resolve => {
            if (this.dayPeriodCodes && this.dayPeriodCodes.length) return resolve();
            else return this.api.code().findCodes("be", "CD-DAYPERIOD")
                .then(codes => this.api.code().findCodes("be", "care.topaz.customDayPeriod")
                    .then(customCodes => this.push("dayPeriodCodes", ...codes.concat(customCodes))))
                .then(() => Promise.all(this.regimenConfig.map(reg => {
                        let dayPeriod = this.dayPeriodCodes.find(dayPeriod => dayPeriod.code === reg.id);
                        if (!dayPeriod) {
                            dayPeriod = {code: reg.id, type: "CD-DAYPERIOD"};
                        }
                        Object.assign(reg, {dayPeriod: dayPeriod});
                        if (!dayPeriod.label || !dayPeriod.label[this.language]) {
                            dayPeriod.label = _.fromPairs([[this.language, _.lowerCase(_.trim(this.localize(`ms_${reg.id}`, reg.id)))]]);
                        }
                    }))
                )
                .then(() => resolve())
        })
            .then(() => {
                if (this.weekdayCodes && this.weekdayCodes.length) return Promise.resolve();
                else return this.api.code().findCodes("be", "CD-WEEKDAY")
                    .then(codes => this.push("weekdayCodes", ...codes.map(code => {
                            const day = code.label[this.language] || "";
                            const number = this.weekdayKeys.indexOf(code.code) || -1;
                            return Object.assign(
                                code,
                                {
                                    "weekday": day,
                                    "weekNumber": (number > -1) && number || 0
                                });
                        })
                    ))
            })
            .then (() => {
                if (this.reimbursementCodeRecipe && this.reimbursementCodeRecipe.length) return Promise.resolve();
                return this.api.code().findCodes("be", "CD-REIMBURSEMENT-RECIPE")
                    .then(reimb => this.push("reimbursementCodeRecipe", "", ..._.orderBy(reimb, ['label.fr'], ['asc'])))
            })
            .then(() => {
                if (this.timeUnits && this.timeUnits.length) return Promise.resolve();
                return this.api.code().findCodes("be", "CD-TIMEUNIT")
                    .then(timeUnits => this.push("timeUnits", ..._.orderBy(_.filter(timeUnits, i => ["ns", "us", "ms", "s", "min"].indexOf(_.trim(_.get(i, "code"))) === -1), ['label.fr'], 'asc')))
            });
    }

    _resetAll() {
        const regimen = _.get(this.medicationContent, "medicationValue.regimen", "");
        if (!regimen) return;
        this.splice("medicationContent.medicationValue.regimen", 0, regimen.length);
    }

    _copyPosologyNote() {
        this._resetAll();
        this.set("medicationDetail.commentForPatient", this.medicationDetail.posologyNote);
    }

    _initmedicationContent(){
        this.medicationContent.medicationValue && !this.medicationContent.medicationValue.regimen ? this.set('medicationContent.medicationValue.regimen', []) : null
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

    _localize(s) {
        return this.api.contact().medication().localize(s, this.language);
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

    cancel() {
        this.close()
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

    test() {
        const regs = this._register();
        //console.log(regs);
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