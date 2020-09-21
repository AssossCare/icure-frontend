
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



import '@polymer/paper-card/paper-card';


import {TkLocalizerMixin} from "../../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash";
import moment from "moment/src/moment";

class HtRegimenDayEditor extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {

    static get template() {
        return html`
        <style include="dialog-style scrollbar-style shared-styles buttons-style dropdown-style icd-styles icpc-styles paper-input-styles spinner-style tk-token-field-style atc-styles">
           
        </style>
        
        <div id="host">affiche toi stp</div>

        <!--<div class="regimen-line">
            <div class="grid-container">
                <div class="a_a gc-header">[[localize('afterwakingup','Au lever',language)]]</div>
                <div class="a_bcd gc-header">[[localize('mom_morning','Matin',language)]]</div>
                <div class="a_e gc-header">[[localize('ms_betweenmeals','Entre les repas',language)]]</div>
                <div class="a_fgh gc-header">[[localize('mom_midday','Midi',language)]]</div>
                <div class="a_i gc-header">[[localize('ms_betweenmeals','Entre les repas',language)]]</div>
                <div class="a_jkl gc-header">[[localize('mom_evening','Soir',language)]]</div>
                <div class="a_m gc-header">[[localize('','Couché',language)]]</div>

                <div class="b_a">
                    <ht-regimen-item-bis class="left" id="afterwakingup" quantity="[[regimen.other.beforeWaking]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="b_bcd">
                    <ht-regimen-item-bis class="big" id="morning" quantity="[[regimen.breakfast.general]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="b_e">
                    <ht-regimen-item-bis class="small" id="betweenbreakfastandlunch" quantity="[[regime.other.morningSnack]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="b_fgh">
                    <ht-regimen-item-bis class="big" id="midday" quantity="[[regimen.lunch.general]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="b_i">
                    <ht-regimen-item-bis class="small" id="betweenlunchanddinner" quantity="[[regimen.other.afternoonSnack]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="b_jkl">
                    <ht-regimen-item-bis class="big" id="evening" quantity="[[regimen.dinner.general]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="b_m">
                    <ht-regimen-item-bis class="right" id="thehourofsleep" quantity="[[regimen.other.beforeSleep]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>

                <div class="c_b">
                    <ht-regimen-item-bis class="bottom-left" id="beforebreakfast" quantity="[[regimen.breakfast.before]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="c_c">
                    <ht-regimen-item-bis class="bottom-center" id="duringbreakfast" quantity="[[regimen.breakfast.during]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="c_d">
                    <ht-regimen-item-bis class="bottom-right" id="afterbreakfast" quantity="[[regimen.breakfast.after]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="c_f">
                    <ht-regimen-item-bis class="bottom-left" id="beforelunch" quantity="[[regimen.lunch.before]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="c_g">
                    <ht-regimen-item-bis class="bottom-center" id="duringlunch" quantity="[[regimen.lunch.during]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="c_h">
                    <ht-regimen-item-bis class="bottom-right" id="afterlunch" quantity="[[regimen.lunch.after]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="c_j">
                    <ht-regimen-item-bis class="bottom-left" id="beforedinner" quantity="[[regimen.dinner.before]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="c_k">
                    <ht-regimen-item-bis class="bottom-center" id="duringdinner" quantity="[[regimen.dinner.during]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
                <div class="c_l">
                    <ht-regimen-item-bis class="bottom-right" id="afterdinner" quantity="[[regimen.dinner.after]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-bis>
                </div>
            </div>
        </div>  -->  
        `;
    }

    static get is() {
        return 'ht-regimen-day-editor';
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
            regimen : {
                type: Object,
                value : () =>{
                    return {
                        other: {
                            beforeWaking: 0,
                            beforeSleep : 0,
                            morningSnack :0,
                            afternoonSnack : 0,
                        },
                        dinner: {
                            general : 0,
                            before : 0,
                            during : 0,
                            after : 0
                        },
                        lunch: {
                            general : 0,
                            before : 0,
                            during : 0,
                            after : 0
                        },
                        breakfast: {
                            general : 0,
                            before : 0,
                            during : 0,
                            after : 0
                        }
                    }
                }
            }
        }
    }

    static get observers() {
        return [
            ""
        ];
    }

    ready() {
        super.ready();
    }
}
customElements.define(HtRegimenDayEditor.is, HtRegimenDayEditor);

