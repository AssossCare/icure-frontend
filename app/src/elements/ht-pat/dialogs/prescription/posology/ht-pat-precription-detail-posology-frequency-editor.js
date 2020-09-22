
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

import '@vaadin/vaadin-date-picker/vaadin-date-picker'
import '@polymer/paper-input/paper-input'
import '@polymer/paper-dropdown-menu/paper-dropdown-menu'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-item/paper-item'
import '@polymer/paper-card/paper-card'

import './ht-regimen-day-editor.js'
import '../../../../dynamic-form/dynamic-text-area.js'


import {TkLocalizerMixin} from "../../../../tk-localizer";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash";
import moment from "moment/src/moment";

class HtPatPrescriptionDetailPosologyFrequencyEditor extends TkLocalizerMixin(PolymerElement) {

    static get template() {
        return html`

            <style include="dialog-style scrollbar-style shared-styles buttons-style dropdown-style icd-styles icpc-styles paper-input-styles spinner-style tk-token-field-style atc-styles">
                .pat-details-card{
                    width: calc( 100% - 10px);
                    margin: 5px;
                }
            
                #head-editor {
                    display : flex;
                }
            </style>
            <paper-card class="pat-details-card">
                <div class="form-title">
                    <span>[[_getTitle(frequency)]]</span>
                    <!--<template is="dom-if" if="[[_canReset(regimen.length)]]">
                        <paper-icon-button id="undo" role="button" icon="icons:undo" on-tap="_reset"></paper-icon-button>
                    </template>
                    <template is="dom-if" if="[[_canDelete(occurrences)]]">
                        <paper-icon-button id="remove" role="button" icon="icons:delete" on-tap="_removeRegimen"></paper-icon-button>
                    </template>-->
                </div>
                <div id="host">
                    <div id="head-editor">
                        <!-- periodicity not managed now
                        <paper-dropdown-menu always-float-label id="periodicity-dropdown" label="[[localize('peri', 'Période', language)]]">
                            <paper-listbox slot="dropdown-content" attr-for-selected="value" on-selected-changed="_selectedPeriodicityChanged" selectable="paper-item" selected="[[frequency.periodicity]]">
                                <template is="dom-repeat" items="[[periodicities]]">
                                    <paper-item value="[[item.id]]">[[_getLabel(item,language)]]</paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>-->
                        
                        <!-- on va utiliser les portions au niveau au dessus on fera ca plus tard idem pour les dates
                        <paper-dropdown-menu always-float-label id="unit-dropdown" label="[[localize('portion', 'Portion', language)]]" disabled="[[!_isDividable(units)]]">
                            <paper-listbox slot="dropdown-content" attr-for-selected="value" on-selected-changed="_selectedUnitChanged" selectable="paper-item" selected="[[frequency.unit]]">
                                <template is="dom-repeat" items="[[units]]">
                                    <paper-item value="[[item.id]]">[[localize(item.label,item.label,language)]]</paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>
                        
                        <vaadin-date-picker label="[[localize('beg_date', 'begin date', language)]]" id="beginDate-picker" i18n="[[i18n]]" min="[[_formatDateMinMax(minBeginDate)]]" max="[[_formatDateMinMax(frequency.endDate)]]" value="[[_formatDate(frequency.beginDate)]]" on-value-changed="_beginDateChanged"></vaadin-date-picker>
                        
                        <vaadin-date-picker label="[[localize('end_date', 'end date', language)]]" id="endDate-picker" i18n="[[i18n]]" min="[[_formatDateMinMax(frequency.beginDate)]]" max="[[_formatDateMinMax(maxEndDate)]]" value="[[_formatDate(frequency.endDate)]]" on-value-changed="_endDateChanged"></vaadin-date-picker>
                        -->
                        <!--<paper-input always-float-label label="[[localize('dur_numb', 'duration number', language)]]" type="number" min="0" id="duration-number" value="[[frequency.numberDuration]]"></paper-input>
                        
                        <paper-dropdown-menu id="duration-type" label="[[localize('dur_type', 'duration type', language)]]">
                            <paper-listbox slot="dropdown-content" attr-for-selected="value" on-selected-changed="_typeDurationChanged" selectable="paper-item" selected="[[frequency.typeDuration]]">
                                <paper-item value="hours">[[localize('hours','hours',language)]]</paper-item>
                                <paper-item value="day">[[localize('days','days',language)]]</paper-item>
                                <paper-item value="week">[[localize('weeks','weeks',language)]]</paper-item>
                                <paper-item value="month">[[localize('months','months',language)]]</paper-item>
                                <paper-item value="years">[[localize('years','years',language)]]</paper-item>
                            </paper-listbox>
                        </paper-dropdown-menu>-->
                        
                        <!-- todo @julien faire les warning dans le slot header--> 
                        <slot name="header"></slot>
                    </div>
                    
                    <div id="body-editor">
                        <ht-regimen-day-editor id="regimen-day-editor" api="[[api]]" resources="[[resources]]" user="[[user]]" language="[[language]]" regimen="[[_getRegimen(frequency.regimen)]]" unit="[[unit]]" quantity-factor="[[frequency.unit]]" on-regimen-changed="_regimenDayChanged"></ht-regimen-day-editor>
    
                        <!--<template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'hours')]]"></template>
                        <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'day')]]">
                            <ht-regimen-day-editor id="regimen-day-editor" api="[[api]]" resources="[[resources]]" user="[[user]]" language="[[language]]" regimen="[[_getRegimen(frequency.regimen)]]" quantity-factor="[[frequency.unit]]" on-regimen-changed="_regimenDayChanged"></ht-regimen-day-editor>
                        </template>
                        <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'week')]]"></template>
                        <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'month')]]"></template>
                        <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'year')]]"></template>
                        <template is="dom-if" if="[[_isDisplayed(frequency.periodicity,'years')]]"></template>-->
                        
                        <slot name="body"></slot>
                    </div>
                    
                   <!-- <div id="footer-editor">
                        <dynamic-text-area value="[[frequency.posology]]" label="[[localize('posology','Posology',language)]]" on-field-changed="_posologyChanged"></dynamic-text-area>
                        
                        <slot name="footer"></slot>
                    </div>-->
                </div>
            </paper-card>
        `;
    }

    static get is() {
        return 'ht-pat-prescription-detail-posology-frequency-editor';
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value: () => {
                }
            },
            language: {
                type: String,
                value: () => {
                }
            },
            i18n: {
                type: Object,
                value: () => {
                }
            },
            user: {
                type: Object,
                value: () => {
                }
            },
            periodicities: {
                type: Array,
                value: () => {
                    return [
                        {
                            id: 'hour',
                            label: {fr: 'Heure', nl: 'Uur', en: 'Hour'}
                        },
                        {
                            id: 'day',
                            label: {fr: 'jour', nl: 'dag', en: 'day'}
                        },
                        {
                            id: 'week',
                            label: {fr: 'Semaine', nl: 'week', en: 'week'}
                        },
                        {
                            id: 'month',
                            label: {fr: 'Mois', nl: 'maand', en: 'month'}
                        },
                        {
                            id: 'year',
                            label: {fr: 'Année', nl: 'Jaar', en: 'Year'}
                        },
                        {
                            id: 'years',
                            label: {fr: 'Années', nl: 'Jaaren', en: 'Years'}
                        }
                    ]
                }
            },
            frequency: {
                type: Object,
                value: () => {
                }
            },
            units: {
                type: Array,
                value: () => []
            },
            minBeginDate: {//YYYY-MM-DD
                type: String,
                value: ''
            },
            maxEndDate: {
                type: String,
                value: ''
            },
            unit : {
                type: String,
                value : ''
            }
        }

    }

    static get observers() {
        return [
            "resetRegimenEditor(frequency.periodicity)",
            "frequencyChanged(frequency,frequency.*)"
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

    _beginDateChanged(e){
        if(moment(_.get(e,"detail.value","")).format("YYYYMMDD") === _.get(this,"frequency.beginDate", false))return;
        this.set("frequency.beginDate",e.detail.value)
    }

    _endDateChanged(e){
        if(moment(_.get(e,"detail.value","")).format("YYYYMMDD") === _.get(this,"frequency.endDate", false))return;
        this.set("frequency.endDate",e.detail.value)
    }

    _typeDurationChanged(e){
        if(_.get(e,"detail.value","") === _.get(this,"frequency.typeDuration", false))return;
        this.set("frequency.typeDuration",e.detail.value)
    }

    _regimenDayChanged(e){
        if(!_.get(e,"detail.regimen",false))return;
        this.set("frequency.regimen",_.get(e,"detail.regimen",[]));
    }

    //observers

    resetRegimenEditor(){
        this.shadowRoot.querySelector("#regimen-day-editor") && this.shadowRoot.querySelector("#regimen-day-editor").reset()
    }

    frequencyChanged(){
        this.dispatchEvent(new CustomEvent("frequency-changed",{bubbles: true,composed: true, detail : { frequency : _.get(this,"frequency",{})}}))
    }




    // call by html
    _getLabel(item){
        return _.get(item,"label."+this.language,"")
    }

    _isDividable(){
        return (_.get(this,'units',[]) || []).length > 1
    }

    _formatDate(date){
        return date ? this.api.moment(date).format("YYYY-MM-DD") : ""
    }

    _isDisplayed(text,displayer){
        return text===displayer;
    }

    _formatDateMinMax(date){
        if(!date)return ''
        return typeof date === 'String' ? date : this.api.moment(date).format("YYY-MM-DD")
    }

    _getRegimen(){
        if(!_.get(this,"frequency.regimen",false))return {morning: 0,
            afterwakingup : 0,
            beforebreakfast: 0,
            duringbreakfast: 0,
            afterbreakfast: 0,
            betweenbreakfastandlunch: 0,
            beforelunch: 0,
            duringlunch: 0,
            afterlunch: 0,
            afternoon: 0,
            betweenlunchanddinner: 0,
            beforedinner: 0,
            duringdinner: 0,
            afterdinner: 0,
            evening: 0,
            thehourofsleep: 0,
            night: 0,
            aftermeal: 0,
            betweenmeals: 0};
        return _.zipObject(_.get(this,"frequency.regimen",[]).filter(reg => _.get(reg,"dayPeriod.type","")!=="care.topaz.customTime").map(reg => _.get(reg,"dayPeriod.code","")),_.get(this,"frequency.regimen",[]).filter(reg => _.get(reg,"dayPeriod.type","")!=="care.topaz.customTime").map(reg => _.get(reg,"administratedQuantity.quantity",0)))
    }

    _getTitle(){
        return _.get(this,"frequency.weekDay","")==="none" ? "Regimen Quotidien" : "Regimen Hebdomadaire - "+this.localize(_.get(this,"frequency.weekDay","")) ;
    }
}
customElements.define(HtPatPrescriptionDetailPosologyFrequencyEditor.is, HtPatPrescriptionDetailPosologyFrequencyEditor);