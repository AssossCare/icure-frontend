
import '../../../../../styles/dialog-style.js';
import '../../../../../styles/scrollbar-style.js';
import '../../../../../styles/shared-styles.js';
import '../../../../../styles/buttons-style.js';
import '../../../../../styles/dropdown-style.js';
import '../../../../../styles/icd-styles.js';
import '../../../../../styles/icpc-styles.js';
import '../../../../../styles/paper-input-style.js';
import '../../../../../styles/spinner-style.js';
import '../../../../../styles/tk-token-field-style.js';
import '../../../../../styles/atc-styles.js';

import {TkLocalizerMixin} from "../../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash";
import moment from "moment/src/moment";

class HtPatPrescriptionDetailPosologyFrequencyEditor extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {

    static get template() {
        return html`

            <style include="dialog-style scrollbar-style shared-styles buttons-style dropdown-style icd-styles icpc-styles paper-input-styles spinner-style tk-token-field-style atc-styles">
            </style>
            
            <div id="editor-contenair">
                <div id="head-editor">
                    <paper-dropdown-menu always-float-label id="periodicity-dropdown" label="[[localize('peri', 'Période', language)]]" >
                        <paper-listbox slot="dropdown-content" attr-for-selected="value" on-selected-changed="_selectedPeriodicityChanged" selectable="paper-item" selected="[[frequency.periodicity]]">
                            <template is="dom-repeat" items="[[periodicities]]">
                                <paper-item value="[[item.id]]">[[_getLabel(item,language)]]</paper-item>
                            </template>
                        </paper-listbox>
                    </paper-dropdown-menu>
                    
                    <paper-dropdown-menu always-float-label id="unit-dropdown" label="[[localize('portion', 'Portion', language)]]" disabled="[[!_isDividable(units)]]">
                        <paper-listbox slot="dropdown-content" attr-for-selected="value" on-selected-changed="_selectedUnitChanged" selectable="paper-item" selected="[[frequency.unit]]">
                            <template is="dom-repeat" items="[[units]]">
                                <paper-item value="[[item.id]]">[[localize(item.label,language)]]</paper-item>
                            </template>
                        </paper-listbox>
                    </paper-dropdown-menu>
                    
                    <vaadin-date-picker id="beginDate-picker" value="[[_formatDate(frequency.beginDate)]]"></vaadin-date-picker>
                    
                    <vaadin-date-picker id="endDate-picker" value="[[_formatDate(frequency.endDate)]]"></vaadin-date-picker>
                </div>
                
                <div id="body-editor">
                
                </div>
                
                <div id="footer-editor">
                    <dynamic-text-area value="[[frequency.posology]]" label="[[localize('posology','Posology',language)]]" on-field-changed="_posologyChanged"></dynamic-text-area>
                </div>
            </div>
        `;
    }

    static get is() {
        return 'ht-pat-prescription-detail-posology-frequency-editor';
    }

    static get properties() {
        return {
            api :{
                type: Object,
                value : () => {}
            },
            language : {
                type: String,
                value : () => {}
            },
            i18n : {
                type : Object,
                value : () => {}
            },
            user : {
                type: Object,
                value : () => {}
            },
            periodicities : {
                type: Array,
                value : () => []
            },
            frequency:{
                type: Object,
                value : () => {}
            },
            units: {
                type: Array,
                value: () => []
            }
        }
    }

    static get observers() {
        return [
            "writePosology(frequency.unit,frequency.beginDate,frequency.endDate,frequency.period)"
        ];
    }

    ready() {
        super.ready();
    }

    //event
    _selectedPeriodicityChanged(e){
        if(_.get(e,"detail.value","") === _.get(this,"frequency.periodicity", false))return;
        this.set("frequency.periodicity",e.detail.value)
    }

    _selectedUnitChanged(e){
        if(_.get(e,"detail.value","") === _.get(this,"frequency.unit", false))return;
        this.set("frequency.unit",e.detail.value)
    }

    _posologyChanged(e){
        if(_.get(e,"detail.value","") === _.get(this,"frequency.posology", false))return;
        this.set("frequency.posology",e.detail.value)
    }




    // call by html
    _getLabel(item){
        return _.get(item,"label."+this.language,"")
    }

    _isDividable(){
        return _.get(this,'units',[]).length > 1
    }

    _formatDate(date){
        return moment(date).format("YYYY-MM-DD")
    }
}
customElements.define(HtPatPrescriptionDetailPosologyFrequencyEditor.is, HtPatPrescriptionDetailPosologyFrequencyEditor);
