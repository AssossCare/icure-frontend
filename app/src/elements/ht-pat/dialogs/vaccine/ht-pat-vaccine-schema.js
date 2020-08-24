import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import './ht-pat-vaccine-period.js';

const procedureStatus = [ "aborted", "error", "refused", "pending", "planned", "completed", "proposed", "cancelled" ];

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatVaccineSchema extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="scrollbar-style dialog-style">

            #confirmDate {
                height: 240px;
                width: 320px;
                max-height: 240px;
                min-height: 240px;
                min-width: 320px;
            }

            .content {
                display:flex;
                flex-direction: column;
            }

            .schema{
                padding: 12px;
                width: auto;
                box-sizing: border-box;
                position: relative;
                background-color: white;
            }

            .schemaLine{
                display: flex;
            }

            .schemaColumn{
                border: 1px solid #bababa;
                height: 90px;
            }

            .schemaLine-title{
                display: flex;
            }

            .schemaColumn-title{
                border: 1px solid #bababa;
                height: 30px;
                text-align: center;
                font-weight: bold;
            }

            .schemaColumn-cat{
                border: 1px solid #bababa;
                height: 30px;
                text-align: center;
                font-weight: bold;
            }

            .w11 { width: 9%; }
            .w44 { width: 36%; }
            .w55 { width: 45%; }

            .no-border{
                border: 1px solid transparent;
            }

            .baby{
                background-color: #f3b738;
                color: white;
                height: 21px;
                padding: 5px;
            }

            .childAndAdo{
                background-color: #aebf41;
                color: white;
                height: 21px;
                padding: 5px;
            }

            .titleTxt{
                height: 21px;
                padding: 5px;
            }

            .product{
                padding: 5px;
                height: 60px;
                font-size: 10px;
                text-align: center;
                line-height: 12px;
                display: flex;
                flex-flow: column;
            }

            .productCode{
                font-weight: bold;
            }

            .small-icon {
                padding: 0px;
                margin: 0px;
                height: 16px;
                width: 16px;
            }

            .confirmDateMessage {
                position: relative;
                margin:40px auto 0 auto;
                text-align: center;
            }

        </style>

        <div>
            <template is="dom-if" if="[[hasSchema]]">
                <div class="schema">
                    <div class="schemaLine-title">
                        <div class="schemaColumn-cat w11 no-border">
                            <div></div>
                        </div>
                        <div class="schemaColumn-cat w55">
                            <div class="baby">[[localize('vacc_infants','vacc_infants')]]</div>
                        </div>
                        <div class="schemaColumn-cat w55">
                            <div class="childAndAdo">[[localize('vacc_children_adolescents','vacc_children_adolescents')]]</div>
                        </div>
                    </div>
                    <div class="schemaLine-title">
                        <div class="schemaColumn-title w11 no-border">
                            <div></div>
                        </div>
                        <template is="dom-repeat" items="[[periods]]" as="period">
                            <div class="schemaColumn-title w11">
                                <div class="titleTxt">[[period.name.fr]]</div>
                            </div>
                        </template>
                    </div>
                    <template is="dom-repeat" items="[[rows]]" as="row">
                        <div class="schemaLine">
                            <div class="schemaColumn w11">
                                <div class="product">
                                    <div class="productCode">
                                        [[row.procedure.code]]
                                        <paper-icon-button id="[[row.procedure.code]]" class="small-icon" icon="paper-dropdown-menu:arrow-drop-down" on-tap="_onSelectVaccines"></paper-icon-button>
                                    </div>
                                    <div>[[row.procedure.label.fr]]</div>
                                </div>
                            </div>
                            <template is="dom-repeat" items="[[row.periods]]" as="period">
                                <div class="schemaColumn w11">
                                    <ht-pat-vaccine-period id="[[row.procedure.code]]-[[period.code]]" api="[[api]]" i18n="[[i18n]]" period="[[period]]" language="[[language]]" statuses="[[statuses]]" procedure="[[row.procedure]]" on-open-action="_onOpenAction" on-date-changed="_dateChanged" on-update-service="_onUpdateService"></ht-pat-vaccine-period>
                                </div>
                            </template>
                        </div>
                    </template>
                </div>
            </template>
        </div>

        <paper-dialog id="confirmDate" class="modalDialog" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title">[[localize('vacc_changedate','vacc_changedate')]]</h2>
            <div class="content">
                <div class="confirmDateMessage">
                    <p>[[localize('vacc_changedate_message','vacc_changedate_message')]]</p>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button button--other" id="yes" on-tap="_confirmDate">[[localize('yes','Yes')]]</paper-button>
                <paper-button class="button button--save" id="no" on-tap="_confirmDate">[[localize('no','No')]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-vaccine-schema';
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
          patient: {
              type: Object,
              value: null
          },
          region: {
              type: String,
              value: "nl"
          },
          language: {
              type: String
          },
          contacts: {
              type: Array,
              value: () => []
          },
          rows: {
              type: Array,
              value: () => []
          },
          periods: {
              type: Array,
              value: () => []
          },
          statuses: {
              type: Array,
              value: () => []
          },
          hasSchema: {
              type: Boolean,
              value: true
          }
      };
  }

  static get observers() {
      return [];
  }

  ready() {
      super.ready();
  }

  initialize(schema, services) {
      this.set("hasSchema", schema != null);
      if (!schema) return;
      this._periodicities = [];
      this._newServices = [];
      this._oldServices = [];
      this._schema = schema;

      this.set("statuses", procedureStatus.map(code => { return {
          code : code, value: this.localize("proc_status_" + code, code)
      }}));

      this.set("periods", schema.periods);
      this.api.code().getCodes(this.periods.map(period => "CD-PERIODICITY|" + period.code + "|1"))
          .then(codes => {
              this._periodicities = codes;
              let rows = schema.procedures.map(procedure => ({
                  procedure: procedure,
                  periods: this.periods.map(period => ({
                      used: procedure.periodicity.some(p => p.relatedCode.id == schema.id && p.relatedPeriodicity.code == period.code),
                      code: period.code,
                      name: period.name.fr,
                      date: this.api.moment(this.patient.dateOfBirth).add(period.months, 'M'),
                      months: period.months,
                      service: null
                  }))
              }));

              rows.forEach(row => {
                  row.services = services.filter(s => s.codes.some(c => c.type === "BE-THESAURUS-PROCEDURES" && c.code === row.procedure.code));
                  row.services = row.services.sort((a, b) => this.api.moment(a.valueDate).isBefore(this.api.moment(b.valueDate)) ? -1 : 0);
                  row.periods.filter(p => p.used).forEach(period => {
                      let candidates = row.services.filter(s => s.tags.some(t => t.type === "CD-PERIODICITY" && t.code === period.code));
                      if (candidates.length < 1) {
                          const assigned = row.periods.map(p => p.service);
                          candidates = row.services.filter(s => !assigned.includes(s));
                      }
                      if (candidates.length > 0) {
                          candidates.forEach(s => this._resetPeriodicity(s));
                          period.service = candidates[0];
                      } else {
                          period.service = this._createService(row.procedure, period);
                          row.services.push(period.service);
                      }
                      this._setPeriodicity(period.service, period);
                  })
              });

              this._oldServices = rows.flatMap(r => r.services.filter(s => typeof(s.id) !== "undefined"));
              this._newServices = rows.flatMap(r => r.services.filter(s => typeof(s.id) === "undefined"));

              this._update();
              this.set("rows", rows);
          });
  }

  _getRow(code) {
      return this.rows.find(r => r.procedure.code == code);
  }

  _getSelector(procedure, period) {
      return '#' + procedure.code.split(".").join("\\.") + "-" + period.code;
  }

  _update() {
      this._oldServices.forEach(service => {
          const tag = service.tags.find(t => t.type == "care.topaz.vaccineschema");
          if (tag) {
              tag.id = "care.topaz.vaccineschema|" + this._schema.code + "|1";
              tag.code = this._schema.code;
              tag.version = "1";
          }
          else service.tags.push({
              id: "care.topaz.vaccineschema|" + this._schema.code + "|1",
              type: "care.topaz.vaccineschema",
              code: this._schema.code,
              version: "1"
          })
      })
      this._oldServices.forEach(service => {
          if (!service.tags.find(t => t.type == "CD-ITEM" && t.code == "vaccine"))
              service.tags.push({ type: "CD-ITEM", code: "vaccine" })
      })
      this.rows.forEach(row => {
          let doseNumber = 1;
          row.periods.filter(p => p.service).map(p => {
              if (_.get(p.service.tags.find(t => t.type == "CD-LIFECYCLE"), "code", "") != "cancelled") {
                  p.service.content.fr = this._setDoseNumber(p.service.content.fr, doseNumber);
                  p.service.content.nl = this._setDoseNumber(p.service.content.nl, doseNumber);
                  doseNumber++;
              }
          });
      })
  }

  _setDoseNumber(content, doseNumber) {
      if ((typeof content) == "string")
          content = { stringValue: content };
      _.set(content, 'medicationValue.options.doseNumber.stringValue', doseNumber.toString());
      return content;
  }

  _setMedication(content, product) {
      if ((typeof content) == "string")
          content = { stringValue: content };
      const cds = product.code ? [{ type: "CD-DRUG-CNK", code: product.code }] : []
      _.set(content, 'medicationValue.medicinalProduct.intendedcds', cds);
      _.set(content, 'medicationValue.medicinalProduct.intendedname', product.name);
      return content;
  }

  _setProduct(service, product) {
      service.comment = product.name;
      service.content.fr = this._setMedication(service.content.fr, product);
      service.content.nl = this._setMedication(service.content.nl, product);
      if (product.code) {
          const tag = service.tags.find(t => t.type == "CD-DRUG-CNK");
          if (tag)
              tag.code = product.code;
          else
              service.tags.push({
                  type: "CD-DRUG-CNK",
                  code: product.code
              });
          return;
      }
      service.tags = service.tags.filter(t => t.type != "CD-DRUG-CNK");
  }

  updateService(detail) {
      console.log("updateService");
      this.rows.forEach(row => {
          const periods = row.periods.filter(p => p.service && p.service.id === detail.service.id);
          periods.forEach(period => this._refresh(row.procedure, period));
      })
  }

  onActionChanged(detail) {
      this.updateService(detail)
      this.dispatchEvent(new CustomEvent('update-service', {
          detail: detail
      }));
  }

  _onOpenAction(e) {
      const service = e.detail.period.service;
      const contact = this.contacts.find(contact => contact.id === service.contactId);
      this.dispatchEvent(new CustomEvent('open-action', {
          detail: {
              caller: this,
              source: "schema",
              contact: contact,
              service: service
          }
      }));
  }

  _onUpdateService(e) {
      console.log("onUpdateService1");
      this._dispatchEvent("update-service", e.detail);
  }

  _onSelectVaccines(e) {
      console.log("onSelectVaccines1");
      const row = this._getRow(e.currentTarget.id);
      const periods =  row.periods.filter(p => p.used);
      const vaccines = row.services.map((s, i) => {
          return {
              id: i,
              date: s.valueDate,
              status: s.tags.find(t => t.type == "CD-LIFECYCLE").code,
              service: s,
              period: _.get(s.tags.find(t => t.type == "CD-PERIODICITY"), "code", null),
          }
      });

      this._dispatchEvent("select-vaccines", {
          code: row.procedure.code,
          periods: periods,
          vaccines: vaccines
      });
  }

  _refresh(procedure, period) {
      const selector = this._getSelector(procedure, period);
      this.shadowRoot.querySelector(selector).refresh();
  }

  selectVaccines(detail) {
      const row = this._getRow(detail.code);
      row.periods.forEach(period => {
          const vaccine = detail.vaccines.find(v => v.period === period.code);
          if (vaccine) {

              const candidates = row.services.filter(s => s.tags.some(t => t.type === "CD-PERIODICITY" && t.code === period.code));
              candidates.forEach(s => this._resetPeriodicity(s));
              this._setPeriodicity(vaccine.service, period);

              period.service = vaccine.service;
              this._refresh(row.procedure, period);
          }
      });
  }

  _getPeriods(detail) {
      const row = this._getRow(detail.procedure.code);
      const index = row.periods.indexOf(detail.period);
      return row.periods.filter((period, i) => period.service && i > index);
  }

  _dateChanged(e) {
      console.log("onDateChanged1");
      this._detail = e.detail;
      const periods = this._getPeriods(this._detail);
      if (periods.length > 0) {
          this.shadowRoot.querySelector('#confirmDate') ? this.shadowRoot.querySelector('#confirmDate').open() : null
          return;
      }
      this._dispatchEvent("update-service", e.detail);
  }

  _confirmDate(e) {
      if (_.get(e, 'currentTarget.id', null) == "yes") {
          const periods = this._getPeriods(this._detail);
          periods.forEach(period => {
              const months = period.months - this._detail.period.months;
              const date = _.get(this._detail, 'period.service.valueDate', null) ? this.api.moment(_.get(this._detail, 'period.service.valueDate', null)) : null
              period.service.valueDate = date.add(months, 'M').format("YYYYMMDD");
              this._refresh(this._detail.procedure, period);
          });
      }

      const row = this._getRow(this._detail.procedure.code);
      row.services = row.services.sort((a, b) => this.api.moment(a.valueDate).isBefore(this.api.moment(b.valueDate)) ? -1 : 0);

      this._dispatchEvent("update-service", this._detail);
      this.shadowRoot.querySelector('#confirmDate') ? this.shadowRoot.querySelector('#confirmDate').close() : null
  }

  _dispatchEvent(code, detail) {
      detail.source = "schema";
      this.dispatchEvent(new CustomEvent(code, {
          detail: detail,
          bubbles: true
      }));
  }

  _getProduct(svc) {
      const content = this._getContent(svc);
      if (_.get(content, 'medicationValue.medicinalProduct.intendedname', null))
          return _.get(content, 'medicationValue.medicinalProduct.intendedname', null);
      return svc.comment ? svc.comment : this.localize('not_specified', 'n/a', this.language)
  }

  _getContent(svc) {
      return svc && this.api.contact().preferredContent(svc, this.language) || svc.content[this.language]
  }

  _resetPeriodicity(service) {
      service.tags = service.tags.filter(t => t.type != "CD-PERIODICITY");
  }

  _setPeriodicity(service, period) {
      this._resetPeriodicity(service);
      const periodicity = this._periodicities.find(code => code.code == period.code);
      service.tags.push({
          id: _.get(periodicity, 'id', null),
          type: _.get(periodicity, 'type', null),
          code: _.get(periodicity, 'code', null),
          version: _.get(periodicity, 'version', null)
      })
  }

  _createService(procedure, period) {
      const date = this.api.moment(this.patient.dateOfBirth).add(period.months, 'M').format("YYYYMMDD");
      return {
          content: {
              "fr" : { stringValue: _.get(procedure, 'label.fr', null) },
              "nl" : { stringValue: _.get(procedure, 'label.nl', null) }
          },
          label: "Actes",
          valueDate: parseInt(date + "000000"),
          codes: [
              {
                  id: _.get(procedure, 'id', null),
                  type: _.get(procedure, 'type', null),
                  code: _.get(procedure, 'code', null),
                  version: _.get(procedure, 'version', null)
              }
          ],
          tags: [
              { type: 'CD-TRANSACTION', code: 'request' },
              {
                  id: "CD-CLINICALPLAN|primaryprevention|1",
                  type: "CD-CLINICALPLAN",
                  code: "primaryprevention",
                  version: "1"
              },
              { type: 'CD-ITEM', code: 'vaccine' },
              { type: 'CD-LIFECYCLE', code: 'pending' },
              {
                  id: "care.topaz.vaccineschema|" + this._schema.code + "|1",
                  type: 'care.topaz.vaccineschema',
                  code: this._schema.code,
                  version: "1"
              }
          ]
      }
  }

  createMedicationSchema(caller) {
      let ids = this._oldServices.map(s => s.contactId).filter((x, i, a) => a.indexOf(x) == i);

      const getContacts = ids.map(id => this.api.contact().getContactWithUser(this.user, id));

      const promises = this._newServices.map(s => this.api.contact().service().newInstance(this.user, s));

      const now = parseInt(this.api.moment(new Date()).format('YYYYMMDDHHmmss'));

      this.api.contact().newInstance(this.user, this.patient, {
          created: now,
          modified: now,
          author: _.trim(_.get(this, "user.id", "")),
          responsible: _.trim(_.get(this, "user.healthcarePartyId", "")),
          openingDate: now,
          closingDate: now,
          encounterType: {type: "CD-TRANSACTION", version: "1", code: 'request'},
          tags: [],
          services: []
      }).then(contact => Promise.all([contact, promises])).then(([contact, services]) => {
          contact.services = services;
          if (contact.services.length > 0)
              return this.api.contact().createContactWithUser(this.user, contact);
      }).then(() => Promise.all(getContacts)).then(contacts => {
          contacts.forEach(contact => {
              contact.services = this._oldServices.filter(s => s.contactId == contact.id);
          });
          const updates = contacts.map(contact => {
              return this.api.contact().modifyContactWithUser(this.user, contact)
          });
          return Promise.all(updates).then((contacts) => {
              const registrations = contacts.map(contact => {
                  return this.api.register(contact, 'contact');
              });
              return Promise.all(registrations).then(() => {
                  caller._refresh();
              });
          });
      });
  }

  toggle(schema, services) {
      // TODO: LDE: remove these two lines for production
      //const clean = this.rows.flatMap(r => r.periods.filter(p => p.service).map(p => p.service));
      //clean.forEach(s => this._resetPeriodicity(s));
      this.initialize(schema, services);
  }

  clean() {
      const getContacts = this.contacts.map(contact => this.api.contact().getContactWithUser(this.user, contact.id));
      Promise.all(getContacts).then(contacts => {
          contacts.forEach(contact => {
              contact.services = contact.services.filter(s => !s.tags.some(t => t.type === "CD-ITEM" && t.code === "vaccine"));
          });
          const promises = contacts.map(contact => {
              return this.api.contact().modifyContactWithUser(this.user, contact)
          });
          return Promise.all(promises);
      });
  }

  print() {
      let html = '';
      html += '<div class="schema">';

      html += '<div class="schemaLine header">';
      html += '<div class="schemaColumn w00 no-border"></div>';
      html += '<div class="schemaColumn w55 group1"><div class="pad">' + this.localize("vacc_infants", "vacc_infants") + '</div></div>';
      html += '<div class="schemaColumn w55 group2"><div class="pad">' + this.localize("vacc_children_adolescents", "vacc_children_adolescents") + '</div></div>';
      html += '</div>';

      html += '<div class="schemaLine header2">';
      html += '<div class="schemaColumn w00 no-border"></div>';
      this.periods.forEach(period => {
          html += '<div class="schemaColumn w11"><div class="pad">' + period.name[this.region] + '</div></div>';
      });
      html += '</div>';

      this.rows.forEach(row => {
          html += '<div class="schemaLine row">';
          html += '<div class="schemaColumn w00">';
          html += '<div class="product">' + row.procedure.label[this.region] + '</div>';
          html += '</div>';
          row.periods.forEach(period => {
              html += '<div class="schemaColumn w11">';
              html += '<div class="period">';
              if (period.service) {
                  const status = period.service.tags.find(t => t.type == "CD-LIFECYCLE").code;
                  const date = this.api.moment(period.service.valueDate);
                  const late = ((status == "pending" || status == "planned") && this.api.moment(new Date()).isAfter(date));
                  if (late)
                      html += "<div class='late'>";
                  else html += "<div>";
                  html += this.api.moment(date).format('DD/MM/YYYY');
                  html += "</div>";
                  html += "<div>" + this.localize("proc_status_" + status, status) + "</div>";
                  html += "<div>" + this._getProduct(period.service) + "</div>";
              }
              html += '</div>';
              html += '</div>';
          });
          html += '</div>';
      })

      html += '</div>';
      return html;
  }
}

customElements.define(HtPatVaccineSchema.is, HtPatVaccineSchema);
