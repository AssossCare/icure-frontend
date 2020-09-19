
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
                    
                    <vaadin-date-picker id="beginDate-picker" i18n="[[i18n]]" min="[[formatDateMinMax(minBeginDate)]]" max="[[formatDateMinMax(frequency.endDate)]]" value="[[_formatDate(frequency.beginDate)]]" on-value-changed="beginDateChanged"></vaadin-date-picker>
                    
                    <vaadin-date-picker id="endDate-picker" i18n="[[i18n]]" min="[[formatDateMinMax(frequency.beginDate)]]" max="[[formatDateMinMax(maxEndDate)]]" value="[[_formatDate(frequency.endDate)]]" on-value-changed="endDateChanged"></vaadin-date-picker>
                    
                    <paper-input id="duration-number" value="[[frequency.numberDuration]]"></paper-input>
                    <paper-dropdown-menu id="duration-number" value="[[frequency.typeDuration]]"></paper-dropdown-menu>
                </div>
                
                <div id="body-editor">
                    <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'hours')]]"></template>
                    <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'day')]]">
                        <ht-regime-day-editor></ht-regime-day-editor>
                    </template>
                    <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'week')]]"></template>
                    <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'month')]]"></template>
                    <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'year')]]"></template>
                    <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'years')]]"></template>
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
                value : () => {
                    return [
                        {
                            id : 'hour',
                            label : { fr: 'Heure',nl: 'Uur',en: 'Hour'}
                        },
                        {
                            id : 'day',
                            label : { fr: 'jour',nl: 'dag',en: 'day'}
                        },
                        {
                            id : 'week',
                            label : { fr: 'Semaine',nl: 'week',en: 'week'}
                        },
                        {
                            id : 'month',
                            label : { fr: 'Mois',nl: 'maand',en: 'month'}
                        },
                        {
                            id : 'year',
                            label : { fr: 'Année',nl: 'Jaar',en: 'Year'}
                        },
                        {
                            id : 'years',
                            label : { fr: 'Années',nl: 'Jaaren',en: 'Years'}
                        }
                    ]
                }
            },
            frequency:{
                type: Object,
                value : () => {}
            },
            units: {
                type: Array,
                value: () => []
            },
            minBeginDate:{//YYYY-MM-DD
                type: String,
                value : ''
            },
            maxEndDate:{
                type: String,
                value: ''
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

    //observers
    writePosology(){

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

    _isDisplayed(text,displayer){
        return text===displayer;
    }

    formatDateMinMax(date){
        if(!date)return ''
        return typeof date === 'String' ? date : this.api.moment(date).format("YYY-MM-DD")
    }
}
customElements.define(HtPatPrescriptionDetailPosologyFrequencyEditor.is, HtPatPrescriptionDetailPosologyFrequencyEditor);
