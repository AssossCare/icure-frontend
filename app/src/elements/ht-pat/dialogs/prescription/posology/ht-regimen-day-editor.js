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

import './ht-regimen-item-editor'

import {TkLocalizerMixin} from "../../../../tk-localizer";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash";
import moment from "moment/src/moment";

class HtRegimenDayEditor extends TkLocalizerMixin(PolymerElement) {

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
                grid-template-columns: 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr 1fr;
                grid-template-rows: auto 24px 24px;
                grid-template-areas: "a1_1_11 a1_1_11 a1_1_11 a1_1_11 a1_1_11 a1_1_11 a1_1_11 a1_1_11 a1_1_11 a1_1_11 a1_1_11 a1_2_8 a1_2_8 a1_2_8 a1_2_8 a1_2_8 a1_2_8 a1_2_8 a1_2_8 a1_3_4 a1_3_4 a1_3_4 a1_3_4 a1_4_1" "a2_1_11 a2_1_11 a2_1_11 a2_1_11 a2_1_11 a2_1_11 a2_1_11 a2_1_11 a2_1_11 a2_1_11 a2_1_11 a2_2_8 a2_2_8 a2_2_8 a2_2_8 a2_2_8 a2_2_8 a2_2_8 a2_2_8 a2_3_4 a2_3_4 a2_3_4 a2_3_4 a2_4_1" "a3_1_6 a3_1_6 a3_1_6 a3_1_6 a3_1_6 a3_1_6 a3_2_2 a3_2_2 a3_3_6 a3_3_6 a3_3_6 a3_3_6 a3_3_6 a3_3_6 a3_4_2 a3_4_2 a3_5_6 a3_5_6 a3_5_6 a3_5_6 a3_5_6 a3_5_6 a3_6_2 a3_6_2 " "a3bis_1_2 a3bis_1_2 a3bis_2_2 a3bis_2_2 a3bis_3_2 a3bis_3_2 . . a3bis_4_2 a3bis_4_2 a3bis_5_2 a3bis_5_2 a3bis_6_2 a3bis_6_2 . . a3bis_7_2 a3bis_7_2 a3bis_8_2 a3bis_8_2 a3bis_9_2 a3bis_9_2 . ." "a4_1_2 a4_1_2 a4_2_2 a4_2_2 a4_3_2 a4_3_2 a4_4_2 a4_4_2 a4_5_2 a4_5_2 a4_6_2 a4_6_2 a4_7_2 a4_7_2 a4_8_2 a4_8_2 a4_9_2 a4_9_2 a4_10_2 a4_10_2 a4_11_2 a4_11_2 a4_12_2 a4_12_2 " ;
            }

            .gc-header {
                background: var(--app-background-color-light);
                color: var(--app-text-color-dark);
                font-weight: 500;
                text-align: center;
                font-size: var(--font-size-small);
            }
            
            .area1_1_11 { grid-area : a1_1_11;}
            .area1_2_8  { grid-area : a1_2_8 ;}
            .area1_3_4  { grid-area : a1_3_4 ;}
            .area1_4_1  { grid-area : a1_4_1 ;}
            .area2_1_11 { grid-area : a2_1_11;}
            .area2_2_8  { grid-area : a2_2_8 ;}
            .area2_3_4  { grid-area : a2_3_4 ;}
            .area2_4_1  { grid-area : a2_4_1 ;}
            .area3_1_6  { grid-area : a3_1_6 ;}
            .area3_2_2  { grid-area : a3_2_2 ;}
            .area3_3_6  { grid-area : a3_3_6 ;}
            .area3_4_2  { grid-area : a3_4_2 ;}
            .area3_5_6  { grid-area : a3_5_6 ;}
            .area3_6_2  { grid-area : a3_6_2 ;}
            .area4_1_2  { grid-area : a4_1_2 ;}
            .area4_2_2  { grid-area : a4_2_2 ;}
            .area4_3_2  { grid-area : a4_3_2 ;}
            .area4_4_2  { grid-area : a4_4_2 ;}
            .area4_5_2  { grid-area : a4_5_2 ;}
            .area4_6_2  { grid-area : a4_6_2 ;}
            .area4_7_2  { grid-area : a4_7_2 ;}
            .area4_8_2  { grid-area : a4_8_2 ;}
            .area4_9_2  { grid-area : a4_9_2 ;}
            .area4_10_2 { grid-area : a4_10_2;}
            .area4_11_2 { grid-area : a4_11_2;}
            .area4_12_2 { grid-area : a4_12_2;}
            
            .area3bis_1_2 { grid-area: a3bis_1_2 ;}
            .area3bis_2_2 { grid-area: a3bis_2_2 ;}
            .area3bis_3_2 { grid-area: a3bis_3_2 ;}
            .area3bis_4_2 { grid-area: a3bis_4_2 ;}
            .area3bis_5_2 { grid-area: a3bis_5_2 ;}
            .area3bis_6_2 { grid-area: a3bis_6_2 ;}
            .area3bis_7_2 { grid-area: a3bis_7_2 ;}
            .area3bis_8_2 { grid-area: a3bis_8_2 ;}
            .area3bis_9_2 { grid-area: a3bis_9_2 ;}
                     
            .pat-details-card {
                margin-top: 16px;
                padding: 0 8px 8px;
                overflow: hidden;
                width: 100%;
            }
            
             ht-regimen-item-editor {
                --counter-height: 28px;
                --counter-border-top-width: 1px;
                --counter-border-left-width: 1px;
                --counter-border-right-width: 1px;
                --counter-border-bottom-width: 1px;
                --counter-border-radius: 0 0 0 0;
            }

            ht-regimen-item-editor.big {
            }

            ht-regimen-item-editor.small {
                --counter-border-left-width: 0px;
                --counter-border-right-width: 0px;
            }

            ht-regimen-item-editor.left {
                --counter-border-right-width: 0px;
                --counter-border-radius: 4px 0 0 4px;
            }

            ht-regimen-item-editor.right {
                --counter-border-left-width: 0px;
                --counter-border-radius: 0 4px 4px 0;
            }

            ht-regimen-item-editor.bottom-left {
                --counter-border-top-width: 0px;
                --counter-border-radius: 0 0 0 4px;
            }

            ht-regimen-item-editor.bottom-right {
                --counter-border-top-width: 0px;
                --counter-border-radius: 0 0 4px 0;
            }

            ht-regimen-item-editor.bottom-center {
                --counter-border-top-width: 0px;
                --counter-border-left-width: 0px;
                --counter-border-right-width: 0px;
            }

            ht-regimen-editor {
                margin: 9px 8px;
            }
            
            .regimen-line {
                width: calc( 100% - 5px);
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
            
            .footer{
                display : flex;
            }
            
            .footer-div {
                width: calc( 50% - 20px);
                max-width: 200px;
                padding: 10px;
            }
            
        </style>
        <div class="regimen-line">
            <div class="grid-container">
                 <!--24 de large-->
                 <!-- class ligne_colum_largeur-->
                <div class="area1_1_11 gc-header">[[localize('mom_morning','Matin',language)]]</div>
                <div class="area1_2_8 gc-header">[[localize('mom_afternoon','Après-midi',language)]]</div>
                <div class="area1_3_4 gc-header">[[localize('mom_evening','Soir',language)]]</div>
                <div class="area1_4_1 gc-header">[[localize('mom_night','Nuit',language)]]</div>
                
                <div class="area2_1_11"><ht-regimen-item-editor class="left" id="morning" quantity="[[regimen.morning]]" path="morning" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-editor></div>
                <div class="area2_2_8"><ht-regimen-item-editor class="left" id="afternoon" quantity="[[regimen.afternoon]]" path="afternoon" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-editor></div>
                <div class="area2_3_4"><ht-regimen-item-editor class="left" id="evening" quantity="[[regimen.evening]]" path="evening" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-editor></div>
                <div class="area2_4_1"><ht-regimen-item-editor class="left" id="night" quantity="[[regimen.night]]" path="night" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-editor></div>    
                            
                <div class="area3_1_6 gc-header">[[localize('mom_breakfast','Déjeuner',language)]]</div>
                <div class="area3_2_2 gc-header">[[localize('mom_between_morning','Entre-repas matin',language)]]</div>
                <div class="area3_3_6 gc-header">[[localize('mom_lunch','Dinner',language)]]</div>
                <div class="area3_4_2 gc-header">[[localize('mom_between_evening','Entre-repas après-midi',language)]]</div>
                <div class="area3_5_6 gc-header">[[localize('mom_dinner','Souper',language)]]</div>
                <div class="area3_6_2 gc-header">[[localize('mom_sleep','Couché',language)]]</div>
                
                <div class="area3bis_1_2 gc-header">[[localize('before','Avant',language)]]</div>
                <div class="area3bis_2_2 gc-header">[[localize('during','Pendant',language)]]</div>
                <div class="area3bis_3_2 gc-header">[[localize('after','Après',language)]]</div>
                <div class="area3bis_4_2 gc-header">[[localize('before','Avant',language)]]</div>
                <div class="area3bis_5_2 gc-header">[[localize('during','Pendant',language)]]</div>
                <div class="area3bis_6_2 gc-header">[[localize('after','Après',language)]]</div>
                <div class="area3bis_7_2 gc-header">[[localize('before','Avant',language)]]</div>
                <div class="area3bis_8_2 gc-header">[[localize('during','Pendant',language)]]</div>
                <div class="area3bis_9_2 gc-header">[[localize('after','Après',language)]]</div>
               
                
                <div class="area4_1_2"><ht-regimen-item-editor class="left" id="beforebreakfast" quantity="[[regimen.beforebreakfast]]" path="beforebreakfast" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_2_2"><ht-regimen-item-editor class="left" id="duringbreakfast" quantity="[[regimen.duringbreakfast]]" path="duringbreakfast" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_3_2"><ht-regimen-item-editor class="left" id="afterbreakfast" quantity="[[regimen.afterbreakfast]]" path="afterbreakfast" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_4_2"><ht-regimen-item-editor class="left" id="betweenbreakfastandlunch" quantity="[[regimen.betweenbreakfastandlunch]]" path="betweenbreakfastandlunch" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_5_2"><ht-regimen-item-editor class="left" id="beforelunch" quantity="[[regimen.beforelunch]]" path="beforelunch" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_6_2"><ht-regimen-item-editor class="left" id="duringlunch" quantity="[[regimen.duringlunch]]" path="duringlunch" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_7_2"><ht-regimen-item-editor class="left" id="afterlunch" quantity="[[regimen.afterlunch]]" path="afterlunch" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_8_2"><ht-regimen-item-editor class="left" id="betweenlunchanddinner" quantity="[[regimen.betweenlunchanddinner]]" path="betweenlunchanddinner" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_9_2"><ht-regimen-item-editor class="left" id="beforedinner" quantity="[[regimen.beforedinner]]" path="beforedinner" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_10_2"><ht-regimen-item-editor class="left" id="duringdinner" quantity="[[regimen.duringdinner]]" path="duringdinner" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_11_2"><ht-regimen-item-editor class="left" id="afterdinner" quantity="[[regimen.afterdinner]]" path="afterdinner" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
                <div class="area4_12_2"><ht-regimen-item-editor class="left" id="thehourofsleep" quantity="[[regimen.thehourofsleep]]" path="thehourofsleep" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></div>
            </div>
            <div class="footer">
                <div class="footer-div"><span class="gc-header">[[localize('aftermeal','Après chaque repas',language)]]</span><ht-regimen-item-editor class="left" id="aftermeal" quantity="[[regimen.aftermeal]]" path="aftermeal" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-editor></div>
                <div class="footer-div"><span class="gc-header">[[localize('betweenmeals','Entre chaque repas',language)]]</span><ht-regimen-item-editor class="left" id="betweenmeals" quantity="[[regimen.betweenmeals]]" path="betweenmeals" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item-editor></div>
            </div>
        </div> 
        `;
    }

    static get is() {
        return 'ht-regimen-day-editor';
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
            quantityFactor: {
                type: Number,
                value : 1
            },
            regimen: {
                type : Object,
                value : () => {
                    return {
                        morning: 0,

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
                        betweenmeals: 0
                    }
                }
            }
        }

    }

    static get observers() {
        return [
        ];
    }

    ready() {
        super.ready();
    }

    _quantityChanged(e){
        e.stopPropagation()
        if(!e.detail || !e.currentTarget)return;
        this.set('regimen.'+_.get(e.currentTarget.getAttributeNode("path"),'value','badPath'),_.get(e,"detail.value",0))


        // faire attention au cas particulier
        if(_.get(e.currentTarget.getAttributeNode("path"),'value',"") ==="aftermeal"){
            this.set("regimen.afterbreakfast",_.get(e,"detail.value",0))
            this.set("regimen.afterlunch",_.get(e,"detail.value",0))
            this.set("regimen.afterdinner",_.get(e,"detail.value",0))
        }else if(_.get(e.currentTarget.getAttributeNode("path"),'value',"") ==="betweenmeals"){
            this.set("regimen.betweenlunchanddinner",_.get(e,"detail.value",0))
            this.set("regimen.betweenbreakfastandlunch",_.get(e,"detail.value",0))
        }else {
            (_.get(this, "regimen.afterbreakfast", 0) === _.get(this, "regimen.afterlunch", 0) && _.get(this, "regimen.afterbreakfast", 0) === _.get(this, "regimen.afterdinner", 0)) && this.set("regimen.aftermeal", _.get(this, "regimen.afterbreakfast", 0));
            (_.get(this, "regimen.betweenlunchanddinner", 0) === _.get(this, "regimen.betweenbreakfastandlunch", 0)) && this.set("regimen.betweenmeals",_.get(this, "regimen.betweenlunchanddinner", 0));
        }

        this.dispatchEvent(new CustomEvent("regimen-changed",{bubbles: true, composed: true,detail : { regimen : this.getFormatedRegimen()}}))

    }

    reset(){
        this.set("regimen", {
            morning: 0,
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
            betweenmeals: 0
        })
    }

    getFormatedRegimen(){
        return _.keys(_.get(this,"regimen",{})).map(key => {
            return {
                period : key,
                quantity : _.get(this,"regimen."+key,0)
            }
        }).filter(reg => reg.quantity)
    }

}
customElements.define(HtRegimenDayEditor.is, HtRegimenDayEditor);
