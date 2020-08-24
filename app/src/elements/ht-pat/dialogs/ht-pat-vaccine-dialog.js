import '../../../styles/dialog-style.js';
import '../../../styles/scrollbar-style.js';
import '../../../styles/paper-tabs-style.js';
import './vaccine/ht-pat-vaccine-history.js';
import './vaccine/ht-pat-vaccine-schema.js';
import './ht-pat-vaccine-selection-dialog.js';
import _ from 'lodash/lodash';

import {TkLocalizerMixin} from "../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatVaccineDialog extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="scrollbar-style dialog-style paper-tabs-style">
            #vaccineDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .loadingContainer {
                position:absolute;
                width: 100%;
                height: 100%;
                top: 0;left: 0;
                background-color: rgba(0,0,0,.3);
                z-index: 10;
                text-align: center;
            }

            .loadingContentContainer {
                position:relative;
                width: 400px;
                min-height: 200px;
                background-color: #ffffff;
                padding:20px;
                border:3px solid var(--app-secondary-color);
                margin:40px auto 0 auto;
                text-align: center;
            }

            .buttons {
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 0;
            }

            .content-container {
                margin: 0;
                position: relative;
                padding: 0px;
                height: calc(100% - 45px);
            }

            .schemaSelector {
                position: relative;
                margin:80px auto 0 auto;
                text-align: center;
            }

            iron-pages{
                height: calc(100% - 48px);
                width: auto;
                overflow: auto;
            }

            .content{
                max-height: calc(100% - 45px)!important;
            }

        </style>

        <paper-dialog id="vaccineDialog">
            <div class="content">
                <paper-tabs class="tab-selector" selected="{{tabs}}">
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:time-backward"></iron-icon> [[localize('vacc_his','Vaccination history',language)]]
                    </paper-tab>
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:child"></iron-icon> [[localize('cd-transaction-vaccinationscheme','Vaccination schema',language)]]
                    </paper-tab>
                </paper-tabs>
                <iron-pages selected="[[tabs]]">
                    <page>
                        <ht-pat-vaccine-history id="history" api="[[api]]" user="[[user]]" patient="[[patient]]" resources="[[resources]]" language="[[language]]" i18n="[[i18n]]" contacts="[[contacts]]" on-open-action="_onOpenAction" on-update-service="_onUpdateService"></ht-pat-vaccine-history>
                    </page>
                    <page>
                        <template is="dom-if" if="[[!hasSchema]]">
                            <div class="schemaSelector">
                                <h2>[[localize('vacc-no-schema-found', 'No vaccination schema found', language)]]</h2>
                                <p>[[localize('vacc-select-schema', 'Please select a schema', language)]]:</p>
                                <div class="schemaSelectorButtons">
                                    <paper-button class="button" id="fr" on-tap="_createSchema">[[localize('vacc-wallonia', 'Wallonia', language)]]</paper-button>
                                    <paper-button class="button" id="nl" on-tap="_createSchema">[[localize('vacc-flanders', 'Flanders', language)]]</paper-button>
                                </div>
                            </div>
                        </template>
                        <ht-pat-vaccine-schema id="schema" region="fr" api="[[api]]" user="[[user]]" patient="[[patient]]" resources="[[resources]]" language="[[language]]" i18n="[[i18n]]" hasschema="[[hasSchema]]" contacts="[[contacts]]" on-open-action="_onOpenAction" on-update-service="_onUpdateService" on-select-vaccines="_onSelectVaccines"></ht-pat-vaccine-schema>
                    </page>
                </iron-pages>
                <template is="dom-if" if="[[isLoading]]">
                    <div class="loadingContainer">
                        <div class="loadingContentContainer">
                            <div style="max-width:200px; margin:0 auto"><ht-spinner class="spinner" alt="Loading..." active=""></ht-spinner></div>
                        </div>
                    </div>
                </template>
            </div>
            <div class="buttons">
                <!--<paper-button class="button" on-tap="_clean">Clean</paper-button>-->
                <paper-button class="button" on-tap="_close"><iron-icon icon="icons:close" class="mr5 smallIcon"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <template is="dom-if" if="[[detected]]">
                    <paper-button class="button button--other" on-tap="_toggle">[[toggle]]</paper-button>
                </template>
                <paper-button class="button button--other" on-tap="_print"><iron-icon icon="vaadin:print" class="mr5 smallIcon"></iron-icon> [[localize('print','Print',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_createMedicationSchema"><iron-icon icon="icons:save" class="mr5 smallIcon"></iron-icon> [[localize('save','Save',language)]]</paper-button>
            </div>
        </paper-dialog>

        <ht-pat-vaccine-selection-dialog id="vaccineSelectionDialog" api="[[api]]" user="[[user]]" resources="[[resources]]" language="[[language]]" i18n="[[i18n]]" on-vaccines-selected="_onVaccinesSelected"></ht-pat-vaccine-selection-dialog>
`;
  }

  static get is() {
      return 'ht-pat-vaccine-dialog';
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
          tabs:{
              type: Number,
              value: 0
          },
          toggle: {
              type: String
          },
          detected: {
              type: Object,
              value: null
          },
          hasSchema: {
              type: Boolean,
              value: false
          },
          isLoading: {
              type: Boolean,
              value: false
          }
      };
  }

  static get observers() {
      return [];
  }

  ready() {
      super.ready();

      this._schemas = {
          fr: {
              id: "care.topaz.procedurepackage|schéma-de-vaccination-wallonie|1",
              code: "wallonia",
              periods: [
                  {name: {fr: "2 mois", nl: "", en: ""}, code: "MT", months: 2},
                  {name: {fr: "3 mois", nl: "", en: ""}, code: "MD", months: 3},
                  {name: {fr: "4 mois", nl: "", en: ""}, code: "MV", months: 4},
                  {name: {fr: "12 mois", nl: "", en: ""}, code: "MW", months: 12},
                  {name: {fr: "15 mois", nl: "", en: ""}, code: "MF", months: 15},
                  {name: {fr: "5-6 ans", nl: "", en: ""}, code: "JQ", months: 60},
                  {name: {fr: "11-12 ans", nl: "", en: ""}, code: "JE", months: 132},
                  {name: {fr: "13 ans", nl: "", en: ""}, code: "JY", months: 156},
                  {name: {fr: "13 ans et demi", nl: "", en: ""}, code: "JA", months: 162},
                  {name: {fr: "15-16 ans", nl: "", en: ""}, code: "JF", months: 180}
              ],
              procedures: []
          },
          nl: {
              id: "care.topaz.procedurepackage|vlaams-vaccinatieschema|1",
              code: "flanders",
              periods: [
                  {name: {fr: "2 mois", nl: "", en: ""}, code: "MT", months: 2},
                  {name: {fr: "3 mois", nl: "", en: ""}, code: "MD", months: 3},
                  {name: {fr: "4 mois", nl: "", en: ""}, code: "MV", months: 4},
                  {name: {fr: "12 mois", nl: "", en: ""}, code: "MW", months: 12},
                  {name: {fr: "15 mois", nl: "", en: ""}, code: "MF", months: 15},
                  {name: {fr: "6 ans", nl: "", en: ""}, code: "JZ", months: 72},
                  {name: {fr: "10 ans", nl: "", en: ""}, code: "JX", months: 120},
                  {name: {fr: "12 ans", nl: "", en: ""}, code: "JW", months: 144},
                  {name: {fr: "12 ans et demi", nl: "", en: ""}, code: "JC", months: 150},
                  {name: {fr: "14 ans", nl: "", en: ""}, code: "JB", months: 168}
              ],
              procedures: []
          }
      }
  }

  _openDialog(){
      this.shadowRoot.querySelector('#vaccineDialog') ? this.shadowRoot.querySelector('#vaccineDialog').open() : null
      this.set("isLoading", true);
      this.api.contact().filterServices(this.contacts, s => s.label==='Actes')
          .then(services => {
              this._services = services.filter(s => s.tags.some(t => t.type == "CD-ITEM" && t.code == "vaccine"));
          }).then(() => this.api.code().getCode(this._schemas.fr.id))
          .then(pack => {
              const links = pack.links.filter(l => l.startsWith("BE-THESAURUS-PROCEDURES"));
              const promises = links.map(l => this.api.code().getCode(l));
              return Promise.all(promises);
          }).then(procedures => {
              this._schemas.fr.procedures = procedures;
              console.log("resolve fr");
          }).then(() => this.api.code().getCode(this._schemas.nl.id))
          .then(pack => {
              const links = pack.links.filter(l => l.startsWith("BE-THESAURUS-PROCEDURES"));
              const promises = links.map(l => this.api.code().getCode(l));
              return Promise.all(promises);
          }).then(procedures => {
              this._schemas.nl.procedures = procedures;
              console.log("resolve nl");
          }).then(() => {
              console.log("resolve all");
              const schema =
                  this._detect(this._schemas.fr) ? this._schemas.fr :
                  this._detect(this._schemas.nl) ? this._schemas.nl : null;
              this._setSchema(schema);

              this.shadowRoot.querySelector('#schema') ? this.shadowRoot.querySelector('#schema').initialize(this._schema, this._services) : null
              this.shadowRoot.querySelector('#history') ? this.shadowRoot.querySelector('#history').initialize(this._schema, this._services) : null
              this.set("detected", schema);
              this.set("isLoading", false);
          })
  }

  _detect(schema) {
      return this._services.some(s => s.tags.some(t => t.type === "care.topaz.vaccineschema" && t.code === schema.code));
  }

  _setSchema(schema) {
      this.set("hasSchema", !!schema);
      this._schema = schema;
      if (!this._schema) return;
      if (this._schema !== this._schemas.fr)
          this.set("toggle", this.localize("vacc_toggle_wallonia", "Basculer vers le schéma wallon"));
      else
          this.set("toggle", this.localize("vacc_toggle_flanders", "Basculer vers le schéma flamand"));
  }

  _createSchema(e) {
      if (e.currentTarget.id == "fr") {
          this.$['schema'].region = "fr";
          this.shadowRoot.querySelector('#schema') ? this.shadowRoot.querySelector('#schema').initialize(this._schemas.fr, this._services) : null
      }
      if (e.currentTarget.id == "nl") {
          this.$['schema'].region = "nl";
          this.shadowRoot.querySelector('#schema') ? this.shadowRoot.querySelector('#schema').initialize(this._schemas.nl, this._services) : null
      }
      this.set("hasSchema", true);
  }

  _onUpdateService(e) {
      console.log("onUpdateService2");
      _.get(e, 'detail.source', null) != "history" ? this.shadowRoot.querySelector('#history') ? this.shadowRoot.querySelector('#history').updateService(e.detail) : null : this.shadowRoot.querySelector('#schema') ? this.shadowRoot.querySelector('#schema').updateService(e.detail) : null
  }

  _onSelectVaccines(e) {
      console.log("onSelectVaccines2");
      this.shadowRoot.querySelector('#vaccineSelectionDialog') ? this.shadowRoot.querySelector('#vaccineSelectionDialog').openDialog(e.detail) : null
  }

  _onVaccinesSelected(e) {
      this.shadowRoot.querySelector('#schema') ? this.shadowRoot.querySelector('#schema').selectVaccines(e.detail) : null
  }

  _onOpenAction(e) {
      this.dispatchEvent(new CustomEvent('open-action', { detail: e.detail }));
  }

  _createMedicationSchema() {
      this.shadowRoot.querySelector('#schema') ? this.shadowRoot.querySelector('#schema').createMedicationSchema(this) : null
  }

  _refresh() {
      this.dispatchEvent(new CustomEvent("refresh-patient",{bubbles:true,composed:true}));
      this._close();
  }

  _clean(){
      this.shadowRoot.querySelector('#schema') ? this.shadowRoot.querySelector('#schema').clean() : null
      this.dispatchEvent(new CustomEvent("refresh-patient",{bubbles:true,composed:true}));
      this._close();
  }

  _toggle(){
      this._setSchema(this._schema != this._schemas.fr ?
          this._schemas.fr :
          this._schemas.nl);
      this.shadowRoot.querySelector('#schema') ? this.shadowRoot.querySelector('#schema').toggle(this._schema, this._services) : null
      this.dispatchEvent(new CustomEvent("refresh-patient",{bubbles:true,composed:true}));
  }

  _close(){
      this.shadowRoot.querySelector('#vaccineDialog') ? this.shadowRoot.querySelector('#vaccineDialog').close() : null
  }

  _print() {
      const name = this.tabs < 1 ? "history.pdf" : "vaccine.pdf";
      const html = this.tabs < 1 ? this.shadowRoot.querySelector('#history') ? this.shadowRoot.querySelector('#history').print() : null : this.shadowRoot.querySelector('#schema') ? this.shadowRoot.querySelector('#schema').print() : null
      this.api.pdfReport(this._getHtml(html), {type:"unknown",completionEvent:"pdfDoneRenderingEvent"})
      .then(printedPdf => !printedPdf.printed && this.api.triggerFileDownload(printedPdf.pdf, "application/pdf", name, this.$['vaccineDialog']))
      .finally(() => {
          console.log("Printed");
      })
  }

  _getHtml(body) {
      return `
          <html>
              <head>
                  <link href="https://fonts.googleapis.com/css?family=Open+Sans" rel="stylesheet">
                  <style>

                      @page {size: A4 landscape; width: 210mm; height: 297mm; margin: 0; padding: 0; }
                      body {margin: 0; padding: 0; font-family: /* "Open Sans", */ Arial, Helvetica, sans-serif; line-height:1.3em; }
                      .page { width: 300mm; color:#000000; font-size:12px; padding:10mm; position:relative; /* border:1px solid #f00; */ }

                      .schema {
                          padding: 12px;
                          width: auto;
                          box-sizing: border-box;
                      }

                      .schemaLine {
                          display: flex;
                      }

                      .schemaColumn {
                          border: 1px solid #bababa;
                          display: flex;
                      }

                      .header {
                          height: 31px;
                          text-align: center;
                          font-weight: bold;
                      }

                      .header2 {
                          height: 36px;
                          text-align: center;
                          font-weight: bold;
                      }

                      .pad {
                          padding: 5px;
                          margin: auto;
                          line-height: 12px;
                      }

                      .row {
                          height: 80px;
                      }

                      .w00 { width: 260px; }
                      .w11 { width: 88px; }
                      .w44 { width: 358px; }
                      .w55 { width: 448px; }

                      .no-border{
                          border: 1px solid transparent;
                      }

                      .group1 {
                          background-color: #f3b738;
                          color: white;
                      }

                      .group2 {
                          background-color: #aebf41;
                          color: white;
                      }

                      .late {
                          color: red;
                      }

                      .product {
                          padding: 5px;
                          font-weight: bold;
                          font-size: x-small;
                          text-align: center;
                      }

                      .period {
                          display: flex;
                          flex-flow: column nowrap;
                          padding: 5px;
                          line-height: 14px;
                          font-size: x-small;
                          text-align: center;
                      }

                      .history {
                          padding: 12px;
                          width: auto;
                          box-sizing: border-box;
                      }

                      .history-line {
                          display: flex;
                          flex-flow: row nowrap;
                      }

                      .w100 { width: 100px; }
                      .w400 { width: 400px; }
                      .w300 { width: 300px; }
                      .w150 { width: 150px; }

                      .history-header {
                          border: 1px solid #bababa;
                          font-weight: bold;
                          font-size: small;
                      }

                      .history-column {
                          border: 1px solid #bababa;
                          font-size: small;
                      }


                  </style>
              </head>

              <body>
                  <div class="page">` + body + `
                  </div>` +
                  '<script>document.fonts.ready.then(() => { setInterval(() => {document.body.dispatchEvent(new CustomEvent("pdfDoneRenderingEvent"))}, 500); }); <'+'/script>' + `
              </body>
          </html>
      `
  }
}
customElements.define(HtPatVaccineDialog.is, HtPatVaccineDialog);
