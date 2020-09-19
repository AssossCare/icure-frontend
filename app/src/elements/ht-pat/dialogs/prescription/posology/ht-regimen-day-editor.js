
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

import './ht-regimen-item.js';

import {TkLocalizerMixin} from "../../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash";
import moment from "moment/src/moment";

class HtRegimenDayEditor extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {

    static get template() {
        return html`
        <style>
            .grid-container {
                font-size: var(--font-size-normal);
                border-collapse: collapse;
                border-spacing: 0;
                box-sizing: border-box;
                padding: 8px 0;
                flex-grow: 1;
                margin-right: 8px;
                grid-gap: 1px;
            }

            .grid-container * {
                position: relative;
                --counter-height: 24px;
                --counter-border-top-width: 1px;
                --counter-border-left-width: 1px;
                --counter-border-right-width: 1px;
                --counter-border-bottom-width: 1px;
                --counter-border-radius: 0 0 0 0;
            }

            .grid-container *:after {
                position: absolute;
                top: 0;
                left: 0;
            }

            .grid-container {
                display: grid;
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                grid-template-rows: auto 24px 24px;
                grid-template-areas: "a_a a_bcd a_bcd a_bcd a_e a_fgh a_fgh a_fgh a_i a_jkl a_jkl a_jkl a_m" "b_a b_bcd b_bcd b_bcd b_e b_fgh b_fgh b_fgh b_i b_jkl b_jkl b_jkl b_m" ". c_b c_c c_d . c_f c_g c_h . c_j c_k c_l .";
            }

            .gc-header {
                background: var(--app-background-color-light);
                color: var(--app-text-color-dark);
                font-weight: 500;
                text-align: center;
                font-size: var(--font-size-small);
            }
            
            .a_a { grid-area: a_a; }
            .a_bcd { grid-area: a_bcd; }
            .a_e { grid-area: a_e; }
            .a_fgh { grid-area: a_fgh; }
            .a_i { grid-area: a_i; }
            .a_jkl { grid-area: a_jkl; }
            .a_m { grid-area: a_m; }
            .b_a { grid-area: b_a; }
            .b_bcd { grid-area: b_bcd;}
            .b_e { grid-area: b_e; }
            .b_fgh { grid-area: b_fgh; }
            .b_i { grid-area: b_i; }
            .b_jkl { grid-area: b_jkl; }
            .b_m { grid-area: b_m; }
            .c_b { grid-area: c_b; }
            .c_c { grid-area: c_c; }
            .c_d { grid-area: c_d; }
            .c_f { grid-area: c_f; }
            .c_g { grid-area: c_g; }
            .c_h { grid-area: c_h; }
            .c_j { grid-area: c_j; }
            .c_k { grid-area: c_k; }
            .c_l { grid-area: c_l; }
            
            .pat-details-card {
                margin-top: 16px;
                padding: 0 8px 8px;
                overflow: hidden;
                width: 100%;
            }
            
             ht-regimen-item {
                --counter-height: 28px;
                --counter-border-top-width: 1px;
                --counter-border-left-width: 1px;
                --counter-border-right-width: 1px;
                --counter-border-bottom-width: 1px;
                --counter-border-radius: 0 0 0 0;
            }

            ht-regimen-item.big {
            }

            ht-regimen-item.small {
                --counter-border-left-width: 0px;
                --counter-border-right-width: 0px;
            }

            ht-regimen-item.left {
                --counter-border-right-width: 0px;
                --counter-border-radius: 4px 0 0 4px;
            }

            ht-regimen-item.right {
                --counter-border-left-width: 0px;
                --counter-border-radius: 0 4px 4px 0;
            }

            ht-regimen-item.bottom-left {
                --counter-border-top-width: 0px;
                --counter-border-radius: 0 0 0 4px;
            }

            ht-regimen-item.bottom-right {
                --counter-border-top-width: 0px;
                --counter-border-radius: 0 0 4px 0;
            }

            ht-regimen-item.bottom-center {
                --counter-border-top-width: 0px;
                --counter-border-left-width: 0px;
                --counter-border-right-width: 0px;
            }

            ht-regimen {
                margin: 9px 8px;
            }
            
            .regimen-line {
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
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
            }
            .regimen-line vaadin-checkbox {
                margin-right: 8px;
            }
            .regimen-line div {
            }

            .regimen-line paper-input[type=number] {
                margin: 0 8px;
                width: 128px;
            }
            .regimen-line paper-input[type=text] {
                margin: 0 8px;
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
        </style>
        <paper-card class="pat-details-card">
            <div class="regimen-line">
                <div class="grid-container">
                    <div class="a_a gc-header">[[localize('afterwakingup','Au lever',language)]]</div>
                    <div class="a_bcd gc-header">[[localize('mom_morning','Matin',language)]]</div>
                    <div class="a_e gc-header">[[localize('ms_betweenmeals','Entre les repas',language)]]</div>
                    <div class="a_fgh gc-header">[[localize('mom_midday','Midi',language)]]</div>
                    <div class="a_i gc-header">[[localize('ms_betweenmeals','Entre les repas',language)]]</div>
                    <div class="a_jkl gc-header">[[localize('mom_evening','Soir',language)]]</div>
                    <div class="a_m gc-header">[[localize('','Couché',language)]]</div>

                    <div class="b_a">
                        <ht-regimen-item class="left" id="afterwakingup" quantity="[[regimen.other.beforeWaking]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="b_bcd">
                        <ht-regimen-item class="big" id="morning" quantity="[[regimen.breakfast.general]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="b_e">
                        <ht-regimen-item class="small" id="betweenbreakfastandlunch" quantity="[[regime.other.morningSnack]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="b_fgh">
                        <ht-regimen-item class="big" id="midday" quantity="[[regimen.lunch.general]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="b_i">
                        <ht-regimen-item class="small" id="betweenlunchanddinner" quantity="[[regimen.other.afternoonSnack]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="b_jkl">
                        <ht-regimen-item class="big" id="evening" quantity="[[regimen.dinner.general]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="b_m">
                        <ht-regimen-item class="right" id="thehourofsleep" quantity="[[regimen.other.beforeSleep]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>

                    <div class="c_b">
                        <ht-regimen-item class="bottom-left" id="beforebreakfast" quantity="[[regimen.breakfast.before]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="c_c">
                        <ht-regimen-item class="bottom-center" id="duringbreakfast" quantity="[[regimen.breakfast.during]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="c_d">
                        <ht-regimen-item class="bottom-right" id="afterbreakfast" quantity="[[regimen.breakfast.after]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="c_f">
                        <ht-regimen-item class="bottom-left" id="beforelunch" quantity="[[regimen.lunch.before]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="c_g">
                        <ht-regimen-item class="bottom-center" id="duringlunch" quantity="[[regimen.lunch.during]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="c_h">
                        <ht-regimen-item class="bottom-right" id="afterlunch" quantity="[[regimen.lunch.after]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="c_j">
                        <ht-regimen-item class="bottom-left" id="beforedinner" quantity="[[regimen.dinner.before]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="c_k">
                        <ht-regimen-item class="bottom-center" id="duringdinner" quantity="[[regimen.dinner.during]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                    <div class="c_l">
                        <ht-regimen-item class="bottom-right" id="afterdinner" quantity="[[regimen.dinner.after]]" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item>
                    </div>
                </div>
            </div>    
        </paper-card>
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

