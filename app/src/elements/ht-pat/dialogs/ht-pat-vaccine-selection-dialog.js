import '../../../styles/dialog-style.js';
import '../../../styles/scrollbar-style.js';
import _ from 'lodash/lodash';

import {TkLocalizerMixin} from "../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatVaccineSelectionDialog extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="scrollbar-style dialog-style">
            #vaccineSelectionDialog {
                height: 480px;
                width: 640px;
                max-height: 480px;
                min-height: 480px;
                min-width: 640px;
            }
            .content {
                display:flex;
                flex-direction: column;
            }

            .vaccines{
                padding: 12px;
                width: auto;
                box-sizing: border-box;
            }

            .line {
                display: flex;
            }

            .column {
                border: 1px solid #bababa;
                height: 30px;
                display: flex;
                justify-content: center;
                align-items: center;
            }

            .header {
                border: 1px solid #bababa;
                height: 30px;
                text-align: center;
                font-weight: bold;
            }

            .title {
                height: 21px;
                padding: 5px;
            }

            .vaccine {
                display: flex;
                flex-flow: column nowrap;
                text-align: center;
                font-size: small;
            }

            .centered {
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                align-self: center;
                text-align: center;
            }

            .modal-button--save[disabled] {
                background: var(--app-secondary-color-dark);
                box-shadow: none;
            }

            .w1 { width: 100px; }
            .w2 { width: 100px; }

            .message { padding-left: 10px;}

            .late {
                background-color: #FF000030;
            }

            .status {
                font-size: x-small;
            }

        </style>

        <paper-dialog id="vaccineSelectionDialog">
            <h2 class="modal-title">[[localize('vacc_selection','vacc_selection')]]</h2>
            <div class="content">
                <div class="message"><p>[[message]]</p></div>
                <div class="vaccines">
                    <div class="line">
                        <div class="header w1">
                            <div class="title">[[localize('dat','Date')]]</div>
                        </div>
                        <div class="header w1">
                            <div class="title">[[localize('sta','Status')]]</div>
                        </div>
                        <template is="dom-repeat" items="[[periods]]" as="period">
                            <div class="header w2">
                                <div class="title">[[period.name]]</div>
                            </div>
                        </template>
                    </div>

                    <template is="dom-repeat" items="[[vaccines]]" as="vaccine">
                        <div class="line">
                            <div class="column w1">
                                <div>[[_formatDate(vaccine.date)]]</div>
                            </div>
                            <div class="column w1 status">
                                <div>[[_formatStatus(vaccine.status)]]</div>
                            </div>
                            <template is="dom-repeat" items="[[periods]]" as="period">
                                <div class="column w2 centered" id="[[period.code]][[vaccine.id]]-div">
                                    <vaadin-checkbox id="[[period.code]][[vaccine.id]]" on-checked-changed="_onCheckedChanged"></vaadin-checkbox>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_cancel" dialog-dismiss="">[[localize('can', "Cancel", language)]]</paper-button>
                <paper-button class="button button--save" id="btnSave" dialog-dismiss="" autofocus="" on-tap="_save">[[localize('save','Save',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-vaccine-selection-dialog';
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
          periods: {
              type: Array,
              value: []
          },
          vaccines: {
              type: Array,
              value: []
          },
          valid: {
              type: Boolean,
              value: false,
          },
          message: {
              type: String,
              value: "",
          },
      };
  }

  static get observers() {
      return []
  }

  ready() {
      super.ready();
  }

  openDialog(detail) {
      this._detail = detail;
      this.$['vaccineSelectionDialog'].open();
      this.set("periods", detail.periods);
      this.set("vaccines", detail.vaccines);
      setTimeout(() => this._onTimer(), 500);
  }

  _onTimer() {
      if (this._isLoaded()) {
          this._onLoad();
          return;
      }
      setTimeout(() => this._onTimer(), 500);
  }

  _save() {
      this._detail.vaccines = this.vaccines;
      this.dispatchEvent(new CustomEvent('vaccines-selected', {
          detail: this._detail,
          bubbles: true
      }));
      this._close();
  }

  _close() {
      this.$['vaccineSelectionDialog'].close()
  }

  _formatDate(date) {
      return this.api.moment(date).format('DD/MM/YYYY');
  }

  _formatStatus(status) {
      return this.localize("proc_status_" + status, status);
  }

  _setChecked(id, value) {
      _.set(this.shadowRoot.querySelector("#" + id), "checked", value);
  }

  _onCheckedChanged(e) {
      if ((e.path || e.composedPath()).length < 5) return;
      const code = e.currentTarget.id.substring(0, 2);
      const id = e.currentTarget.id.substring(2);
      const vaccine = this.vaccines.find(v => v.id == id);
      if (e.detail.value) {
          vaccine.period = code;
          this.periods.filter(p => p.code != code).forEach(p => this._setChecked(p.code + vaccine.id, false));
          this.vaccines.filter(v => v.id != id && v.period == code).forEach(v => {
              v.period = null;
              this._setChecked(code + v.id, false);
          });
      } else if (vaccine.period == code) vaccine.period = null;
      this._update();
  }

  _isLoaded() {
      this.vaccines.forEach(vaccine => {
          this.periods.forEach(period => {
              if (!this.shadowRoot.querySelector("#" + period.code + vaccine.id))
                  return false;
          })
      })
      return true;
  }

  _onLoad() {
      this.vaccines.forEach(vaccine => {
          const date = this.api.moment(vaccine.service.valueDate);
          this.periods.forEach(period => {
              this._setChecked(period.code + vaccine.id, vaccine.period == period.code);
              const div = this.shadowRoot.querySelector("#" + period.code + vaccine.id + "-div");
              if (div) {
                  const delay = period.code.match(/^M/) ? 15 : 30;
                  if (period.date.diff(date, "days") > delay)
                      div.classList.add("late");
                  else
                      div.classList.remove("late");
              }
          })
      })
      this.set("message", this._localizePlural("vacc_selection_message", this.periods.length));
  }

  _update() {
      this.set("valid", this.vaccines.filter(v => v.period != null).length == this.periods.length);
      _.set(this.shadowRoot.querySelector("#btnSave"), "disabled", !this.valid);
  }

  _localizePlural(message, length) {
      if (length < 2) return this.localize(message, message);
      message += "_plural";
      return this.localize(message, message).replace(/\${count}/g, length.toString());
  }
}
customElements.define(HtPatVaccineSelectionDialog.is, HtPatVaccineSelectionDialog);
