import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatPrescriptionDetailPosology extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style">
        
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
            
        </style>
        
        <div class="posology-container">
            <div class="posology-title">
              <iron-icon class="header-icon" icon="[[_getDrugType(selectedDrugForPosology)]]"></iron-icon>
              <span class="bold fs16">[[_getDrugName(selectedDrugForPosology)]]</span>&nbsp;&nbsp;[[_getDrugId(selectedDrugForPosology)]]           
            </div>
            <div class="posology-container-content">
                <div class="medication-container">
                    <div class="header-title">
                        [[localize('pos-med', 'Medication', language)]]
                    </div>
                    <div class="medication-container-content">
                        <div>
                            <vaadin-checkbox class="checkbox" id="" checked="" on-checked-changed="">[[localize('pos-chronical', 'Chronical', language)]]</vaadin-checkbox>
                            <vaadin-checkbox class="checkbox" id="" checked="" on-checked-changed="">[[localize('pos-confidential', 'Confidential', language)]]</vaadin-checkbox>
                            <vaadin-checkbox class="checkbox" id="" checked="" on-checked-changed="">[[localize('pos-known-usage', 'Known usage', language)]]</vaadin-checkbox>
                        </div>                
                    </div>
                </div>
                <div class="prescription-container">
                    <div class="header-title">
                        [[localize('pos-presc', 'Prescription', language)]]
                    </div>
                    <div class="prescription-container-content">
                    
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
            }
        };
    }

    static get observers() {
        return ["_openPosologyPanel(user, selectedDrugForPosology)"];
    }

    ready() {
        super.ready();
    }

    _reset(){

    }

    _openPosologyPanel(){

    }

    _createMedication(){

    }

    _validatePosology(){

    }

    _getDrugName(drug){
        return _.get(drug, 'drug.label', null)
    }

    _getDrugId(drug){
        return 'Sam: '+_.get(drug, 'drug.samCode', '')+' ('+_.get(drug, 'drug.samDate', '')+') CTI-ext: '+_.get(drug, 'drug.ctiExtended', '')
    }

    _getDrugType(drug){
        return _.get(drug, 'type', null) === "chronic" ? "icons:alarm-on" : _.get(drug, 'type', null) === "history" ? "vaadin:time-backward" : _.get(drug, 'type', null) === "commercial" ? "vaadin:copyright" : _.get(drug, 'type', null) === "substance" ? "vaadin:pill" : _.get(drug, 'type', null) === "compound" ? "vaadin:flask" : null
    }


}
customElements.define(HtPatPrescriptionDetailPosology.is, HtPatPrescriptionDetailPosology);
