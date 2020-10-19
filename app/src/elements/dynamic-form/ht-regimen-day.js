import '../../styles/shared-styles.js';
import '../../styles/buttons-style.js';
import './ht-regimen.js';
import './ht-regimen-item.js';
import _ from 'lodash/lodash'
import moment from 'moment/src/moment'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtRegimenDay extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="buttons-style dropdown-style dialog-style shared-styles">
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

            .regimen-line.block span{
                margin-right: 4px;
            }

            .extra-regimen {
                align-items: flex-start;
            }

            .extra-line {
                flex-grow: 1;
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
            }
            .extra-control {
                flex-grow: 0;
                flex-shrink: 0;
                display: flex;
                flex-direction: row;
                flex-wrap: nowrap;
                align-items: center;
            }
            .extra-control paper-icon-button {
                margin-right: 8px;
            }
            .small-input {
                width: 128px;
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

            .reset-all {
                height: 22px;
                width: 22px;
                margin: 0 4px 0 8px;
                padding: 2px;
            }

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

            .form-title {
                color: var(--app-primary-color);
                border-top: 2px solid var(--app-background-color-dark);
                border-radius: 2px 2px 0 0;
                background: var(--app-background-color-dark);
                font-size: 12px;
                margin: 0 0 8px -8px;
                padding: 2px 4px 2px 20px;
                display: flex;
                flex-flow: row nowrap;
                width: calc(100% - 8px);
                text-align: left;
                justify-content: space-between;
                align-items: center;
            }
            .form-title > span {
                flex-grow: 1;
                min-width: 100px;
            }

            .form-title > div {
                flex-grow: 0;
                margin-bottom: 4px;
            }

            paper-icon-button.list-item-icon--add {
                padding: 0;
                height: 16px;
                width: 16px;
                border-radius: 2px;
                background: var(--app-secondary-color);
                color: var(--app-text-color-light);
            }

            .form-title paper-icon-button {
                height: 20px;
                width: 20px;
                padding: 2px;
            }

        </style>

        <paper-card class="pat-details-card">
        
            <div class="form-title">
                <span>[[_getTitle(key)]]</span>
                <template is="dom-if" if="[[_canReset(regimen.length)]]"><paper-icon-button id="undo" role="button" icon="icons:undo" on-tap="_reset"></paper-icon-button></template>
                <template is="dom-if" if="[[_canDelete(occurrences)]]"><paper-icon-button id="remove" role="button" icon="icons:delete" on-tap="_removeRegimen"></paper-icon-button></template>
            </div>
            
            <div class="regimen-line">
                
                <div class="grid-container">
                
                    <div class="a_a gc-header">[[localize('afterwakingup','Au lever',language)]]</div>
                    <div class="a_bcd gc-header">[[localize('mom_morning','Matin',language)]]</div>
                    <div class="a_e gc-header">[[localize('ms_betweenmeals','Entre les repas',language)]]</div>
                    <div class="a_fgh gc-header">[[localize('mom_midday','Midi',language)]]</div>
                    <div class="a_i gc-header">[[localize('ms_betweenmeals','Entre les repas',language)]]</div>
                    <div class="a_jkl gc-header">[[localize('mom_evening','Soir',language)]]</div>
                    <div class="a_m gc-header">[[localize('','Couché',language)]]</div>

                    <div class="b_a"><ht-regimen-item class="left" id="afterwakingup" quantity="{{afterwakingup}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="b_bcd"><ht-regimen-item class="big" id="morning" quantity="{{morning}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="b_e"><ht-regimen-item class="small" id="betweenbreakfastandlunch" quantity="{{betweenbreakfastandlunch}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="b_fgh"><ht-regimen-item class="big" id="midday" quantity="{{midday}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="b_i"><ht-regimen-item class="small" id="betweenlunchanddinner" quantity="{{betweenlunchanddinner}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="b_jkl"><ht-regimen-item class="big" id="evening" quantity="{{evening}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="b_m"><ht-regimen-item class="right" id="thehourofsleep" quantity="{{thehourofsleep}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    
                    <div class="c_b"><ht-regimen-item class="bottom-left" id="beforebreakfast" quantity="{{beforebreakfast}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="c_c"><ht-regimen-item class="bottom-center" id="duringbreakfast" quantity="{{duringbreakfast}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="c_d"><ht-regimen-item class="bottom-right" id="afterbreakfast" quantity="{{afterbreakfast}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="c_f"><ht-regimen-item class="bottom-left" id="beforelunch" quantity="{{beforelunch}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="c_g"><ht-regimen-item class="bottom-center" id="duringlunch" quantity="{{duringlunch}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="c_h"><ht-regimen-item class="bottom-right" id="afterlunch" quantity="{{afterlunch}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="c_j"><ht-regimen-item class="bottom-left" id="beforedinner" quantity="{{beforedinner}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="c_k"><ht-regimen-item class="bottom-center" id="duringdinner" quantity="{{duringdinner}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>
                    <div class="c_l"><ht-regimen-item class="bottom-right" id="afterdinner" quantity="{{afterdinner}}" quantity-factor="[[quantityFactor]]" on-quantity-changed="_quantityChanged"></ht-regimen-item></div>

                </div>
                
                <template is="dom-if" if="[[devShow]]"><vaadin-checkbox checked="[[]]" id="ifNeeded" on-checked-changed="_ifNeededChanged">[[localize('', 'Si nécessaire', language)]]</vaadin-checkbox></template>
                
            </div>
            
            <div class="regimen-line extra-regimen">
            
                <div class="extra-control">
                    <div class="mt12">(Optionnel) Ajouter une/des prise(s) à: </div> <paper-input always-float-label="" class="small-input ml10 mr10 mw50" id="input" value="{{time}}"></paper-input>
                    <paper-button class="button button--other mt16" on-tap="_addExtra"><iron-icon icon="icons:add-circle-outline"></iron-icon> [[localize('add','Add',language)]]</paper-button>
                </div>
                
                <div class="extra-line mt16"><template is="dom-repeat" items="[[extras]]" as="extra"><ht-regimen id="extra[[extra.code]]" extra="{{extra}}" unit="[[medicationDetail.bufferUnit]]" quantity-factor="[[quantityFactor]]" on-extra-changed="_extraChanged"></ht-regimen></template></div>
                
            </div>
            
        </paper-card>
`;
  }

  static get is() {
      return 'ht-regimen-day';
  }
  static get properties() {
      return {
          api: {
              type: Object
          },
          devShow: {
              type: Boolean,
              value: false
          },
          regimenConfig: {
              type: Array,
              value: () => {}
          },
          regimen: {
              type: Array,
              value: () => {}
          },
          key: {
              type: String,
              value: ""
          },
          keyId: {
              type: String,
              value: ""
          },
          medicationUnit: {
              type: String,
              value: ""
          },
          quantityFactor: {
              type: Object,
              value: {}
          },
          extras:{
              type: Array,
              value: () => []
          },
          time: {
              type: String,
              value: "10:00"
          },
          frequency: {
              type: String,
              value: ""
          },
          title: {
              type: String,
              value: ""
          },
          weekdayCodes: {
              type: Array,
              value: () => []
          },

          periodConfig: {
              type: Object,
              value: {}
          },

          canDelete: {
              type: Boolean,
              value: false
          },

          occurrences: {
              type: Number,
              value: 0
          }
      }
  }
  static get observers() {
      return [
          "_updateView(quantityFactor, regimen.*, key)"
      ];
  }

  constructor() {
      super();
  }

  ready() {
      super.ready();
  }

  _getTitle() {
      const header = _.capitalize(this.localize(this.periodConfig.title));
      return _.capitalize(this.periodConfig.id === "dailyPosology" ? header :
          this.periodConfig.id === "weeklyPosology" ? `${header} -  ${this.localize(this.key)}` :
              `$header - ${this.localize("the")} ${this.key}`);
  }

  _canDelete() {
      return (parseInt(this.occurrences) > 1);
  }

  _removeRegimen() {
      this.dispatchEvent(new CustomEvent('regimen-delete', {detail: {key: this.key}, bubbles: true, composed: true}));
      this._updateView();
  }

  _filterRegimenItemByKey(reg) {
      return !this.periodConfig.keyId || (reg[this.periodConfig.keyId] && (reg[this.periodConfig.keyId].code === this.key));
  }

  _getDayPeriodQuantity(dayPeriod) {
      const reg = this.regimen.find(reg => this._filterRegimenItemByKey(reg) && reg.dayPeriod && reg.dayPeriod.type === dayPeriod.type && reg.dayPeriod.code === dayPeriod.code);
      return reg ? reg.administratedQuantity.quantity : 0;
  }

  _updateView() {
      if (!this.regimen) return;
      this.regimenConfig.forEach(base => {
          this.set(base.id, this._getDayPeriodQuantity(base.dayPeriod));
      });

      if (this.extras && this.extras.length) {
          this.splice("extras", 0, this.extras.length);
      }
      this.regimen.filter(reg => this._filterRegimenItemByKey(reg) && !reg.dayPeriod).forEach(reg => {
          this.push("extras", {
              code: reg.timeOfDay,
              quantity: reg.administratedQuantity.quantity
          });
          this.extras.sort((a, b) => a.code - b.code);
      });
  }

  _setQuantity(id, quantity = 0) {
      console.log("_setQuantity:" + id);
      this.set(id, quantity);
  }

  _getQuantity(id) {
      console.log("_getQuantity:" + id);
      return this.get(id);
  }

  _createRegItem(quantity, timeKey, timeValue) {
      const regItem = {
          administratedQuantity: {
              quantity: this.quantityFactor.denominator > 1 && this.quantityFactor.numLabel || parseInt(quantity, 10) || "",
              unit: this.medicationUnit,
          }
      };
      if (timeKey && timeValue) {
          regItem[timeKey] = timeValue;
      }

      const keyId = this.periodConfig.keyId;
      if (keyId) {
          if (keyId === "weekday") {
              regItem[keyId] = this.weekdayCodes.find(weekdayCode => weekdayCode.code === this.key);
          } else {
              regItem[keyId] = this.key;
          }
      }
      return regItem;
  }

  _updateDayPeriodRegimen(id, quantity = "") {
      if (!this.regimen) return;
      const dayPeriod = (this.regimenConfig.find(reg => reg.id === id) || {dayPeriod: ""}).dayPeriod;
      if (!dayPeriod) return;
      const index = this.regimen.findIndex(reg => this._filterRegimenItemByKey(reg) && reg.dayPeriod && reg.dayPeriod.code === dayPeriod.code);
      if (quantity) {
          const updated = this._createRegItem(quantity, "dayPeriod", dayPeriod);
          if (index > -1) {
              this.splice("regimen", index, 1, updated);
          } else {
              this.push("regimen", updated);
          }
      } else {
          if (index > -1) {
              this.splice("regimen", index, 1);
          }
      }
  }

  _quantityChanged(e) {
      const id = e.currentTarget.id;
      let quantity = e.currentTarget.quantity;
      if (quantity === "") return;
      this._updateDayPeriodRegimen(id, quantity);

      this.regimenConfig.filter(reg => reg.parentId === id).forEach(reg => {
          this._setQuantity(reg.id);
          this._updateDayPeriodRegimen(reg.id);
      });
      const reg = this.regimenConfig.find(reg => reg.id === id);
      if (reg && reg.parentId) {
          this._setQuantity(reg.parentId);
          this._updateDayPeriodRegimen(reg.parentId);
      }
      // this._updateDayPeriodRegimen(id, quantity);
  }

  _canReset() {
      return _.size(_.filter(this.regimen, reg => this._filterRegimenItemByKey(reg)))
  }

  _reset() {
      if (!this.regimen) return;
      this.regimen.filter(reg => this._filterRegimenItemByKey(reg)).map(reg => this.regimen.indexOf(reg)).sort((a, b) => (b - a)).map(index => this.splice("regimen", index, 1));
      // this.regimen = this.regimen.filter(reg => !this._filterRegimenItemByKey(reg));
      this._updateView();
  }

  _addExtra() {
      if (!this.regimen) return;
      const time = moment(this.time,['HH:mm','HHmm']);
      const timeOfDay = parseInt(time.format("HHmmss"), 10);
      const index = this.regimen.findIndex(reg => this._filterRegimenItemByKey(reg) && reg.timeOfDay && reg.timeOfDay === timeOfDay);
      let quantity = 0;
      if (this.quantityFactor.denominator > 1) {
          if (index > -1) return;
          quantity = this.quantityFactor.numLabel;
      } else {
          quantity = ((index > -1) && parseInt(this.regimen[index].administratedQuantity.quantity, 10) || 0) + 1;
      }
      const updated = this._createRegItem(quantity, "timeOfDay", timeOfDay);
      if (index > -1) {
          this.splice("regimen", index, 1, updated);
      } else {
          this.push("regimen", updated);
      }
      this._updateView();
  }

  _extraChanged(e) {
      const extra = _.get(e, "currentTarget.extra", "");
      const quantity = extra.quantity;
      if (!extra) return;
      if (!this.regimen) return;
      const index = this.regimen.findIndex(reg => this._filterRegimenItemByKey(reg) && reg.timeOfDay && !reg.dayPeriod && reg.timeOfDay === extra.code);

      if (quantity) {
          const updated = this._createRegItem(quantity, "timeOfDay", extra.code);
          if (index > -1) {
              this.splice("regimen", index, 1, updated);
          } else {
              this.push("regimen", updated);
          }
      } else {
          if (index > -1) {
              this.splice("regimen", index, 1);
          }
      }
      this._updateView();
  }
}

customElements.define(HtRegimenDay.is, HtRegimenDay);
