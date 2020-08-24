import '../../../styles/dialog-style.js';
import '../../../styles/paper-input-style.js';
import '../../../styles/buttons-style.js';
import '../../../styles/dropdown-style.js';
import '../../../styles/scrollbar-style.js';
import '../../../styles/atc-styles.js';
import '../../icons/medication-icons.js';

import _ from 'lodash/lodash'

const STATUS_NOT_SENT = 1;
const STATUS_SENT = 2;
const STATUS_PENDING = 4;
const STATUS_DELIVERED = 8;
const STATUS_REVOKED = 16;

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class PrescriptionHistory extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="dialog-style paper-input-style dropdown-style buttons-style scrollbar-style atc-styles">

            .table-container {
                margin-bottom: 24px;
            }

            .table-header {
                width: 100%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--app-background-color-dark);
                font-size: 11px;
                color: var(--app-text-color-disabled);
                height: 28px;
            }

            .col {
                height: 100%;
                padding: 0 4px;
                box-sizing: border-box;
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                align-items: center;
            }

            .table-row {
                width: 100%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                color: var(--app-text-color);
                height: 40px;
            }

            .table-row:nth-child(even) {
                background: var(--app-background-color-light);
            }

            .table-row .col:not(:last-child) {
                border-right: 1px solid var(--app-background-color-dark);
            }

            .table {
                display: flex;
                flex-flow: column nowrap;
                font-size: .8rem;
                margin: 0.5rem;
                line-height: 1.5;
                flex: 1 1 auto;
            }

            .table div{
                box-sizing: border-box;
            }

            .th {
                display: none;
                font-weight: 700;
                text-align: left;
            }

            .th:first-child {
                border-top: 1px solid var(--app-background-color-dark);
            }

            .th > .td {
                white-space: nowrap;
                text-overflow: ellipsis;
                justify-content: center;
            }

            .th .td {
                color: var(--app-text-color);
            }

            .th .td:first-child {
                box-sizing: border-box;
            }

            .tr {
                position: relative;
                width: 100%;
                display: flex;
                flex-flow: row nowrap;
                color: var(--app-text-color);
                z-index: 1;
                height: 32px;
            }

            .td {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                flex-basis: 0;
                padding: 0.5em;
                overflow: hidden;
                min-width: 0px;
                z-index: 2;
                word-break: break-word;
                white-space: nowrap;
                border-right: 1px solid var(--app-background-color-dark);
                font-size: 13px;
                text-align: left;
            }

            .fg0 {
                flex-grow: 0;
            }

            .fg1 {
                flex-grow: 1;
            }

            .fg2 {
                flex-grow: 2;
            }

            .td span{
                text-overflow: ellipsis;
                width: 100%;
                overflow: hidden;
                text-align: center;
            }

            .td:first-child {
                border-left: 1px solid var(--app-background-color-dark);
            }

            .th .td {
                border-bottom: 1px solid var(--app-background-color-dark);
            }

            .status {
                border-radius: 20px;
                padding: 1px 12px 1px 8px;
                font-size: 14px;
                display: block;
                width: auto;
                max-width: fit-content;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .statusOrange{
                background: #fcdf354d;
            }
            .statusGreen{
                background: #07f8804d;
            }
            .statusRed{
                background: #ff4d4d4d;
            }

            .statusIcon {
                height: 8px;
                width: 8px;
            }

            .statusIconOrange {
                color: var(--app-status-color-pending);
            }
            .statusIconGreen {
                color: var(--app-status-color-ok);
            }
            .statusIconRed {
                color: var(--app-status-color-nok);
            }

            paper-icon-button > iron-icon {
                height: 16px;
                width: 16px;
            }

            paper-input{
                --paper-input-container-focus-color: var(--app-primary-color);
            }

            .filter {
                display: flex;
                flex-flow: row nowrap;
            }

            .dateFilter {
                margin-left: 5px;
            }

            .prescription-history {
                padding: 0;
            }

            .actions {
                display: flex;
                flex-flow: row nowrap;
            }

            .form-title-bar-btn {
                height: 20px;
                width: 20px;
                padding: 2px;
            }

            .action {
                padding: 0px;
            }

            .my-input {
                margin-top: -5px;
            }

            .filter {
                margin-left: 5px;
            }

            .content{
                max-height: 100%;
            }

            ht-spinner {
                height: 42px;
                width: 42px;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }

        </style>
        <div class="prescription-history">

            <div class="filter">
                <vaadin-date-picker class="dateFilter" id="dateMin" on-value-changed="_onValueChanged" label="[[localize('from2','Du',language)]]" value="{{dateMin}}" i18n="[[i18n]]"></vaadin-date-picker>
                <vaadin-date-picker class="dateFilter" id="dateMax" on-value-changed="_onValueChanged" label="[[localize('to2','Au',language)]]" value="{{dateMax}}" i18n="[[i18n]]"></vaadin-date-picker>
                <paper-input id="filterRID" label="RID" value="{{filterRID}}" on-value-changed="_onValueChanged" class="my-input filter" always-float-label=""></paper-input>
                <vaadin-combo-box id="filterStatus" class="filter" filtered-items="[[allStatus]]" item-label-path="label" item-value-path="value" label="[[localize('sta','Status',language)]]" value="{{filterStatus}}" on-value-changed="_onValueChanged"></vaadin-combo-box>
                <ht-spinner class="center" active="[[isLoading]]"></ht-spinner>
            </div>

            <div class="table">
                <div class="tr th">
                    <div class="td fg0" style="min-width: 100px">[[localize('dat','Date',language)]]</div>
                    <div class="td fg0" style="min-width: 140px">[[localize('co','Code',language)]]</div>
                    <div class="td fg2" style="min-width: 300px">[[localize('nam','Name',language)]]</div>
                    <div class="td fg1" style="min-width: 200px">[[localize('freq','Fréquence',language)]]</div>
                    <div class="td fg0" style="min-width: 140px">[[localize('sta','Statut',language)]]</div>
                    <div class="td fg0" style="min-width: 100px">&nbsp;</div>
                </div>
                <template is="dom-repeat" items="[[prescriptions]]" as="item">
                    <div class="tr">
                        <div class="td fg0" style="min-width: 100px">[[item.date]]</div>
                        <div class="td fg0" style="min-width: 140px">[[item.rid]]</div>
                        <div class="td fg2" style="min-width: 300px">[[item.name]]</div>
                        <div class="td fg1" style="min-width: 200px">[[_frequency(item, refresher)]]</div>
                        <div class="td fg0" style="min-width: 140px">
                            <span class\$="status status[[_getStatusClass(item, refresher)]]"><iron-icon icon="vaadin:circle" class\$="statusIcon statusIcon[[_getStatusClass(item, refresher)]]"></iron-icon>&nbsp;[[_formatStatus(item, refresher)]]</span>
                        </div>
                        <div class="actions fg0" style="min-width: 100px">
                            <div class="action"><paper-icon-button data-id\$="[[item.service.id]]" class="form-title-bar-btn" icon="print" on-tap="_print"></paper-icon-button></div>
                            <template is="dom-if" if="[[item.rid]]">
                                <template is="dom-if" if="[[!_isRevoked(item.service)]]">
                                    <div class="action"><paper-icon-button data-rid\$="[[item.rid]]" class="form-title-bar-btn" icon="icons:block" on-tap="_revoke"></paper-icon-button></div>
                                    <!--<div class="action"><paper-icon-button data-rid$="[[item.rid]]" class="form-title-bar-btn" icon="icons:code" on-tap="_getPrescriptionFromRecipe"></paper-icon-button></div>-->
                                </template>
                            </template>
                        </div>
                    </div>
                </template>
            </div>
        </div>
`;
  }

  static get is() {
      return 'prescription-history'
  }

  static get properties() {
      return {
          hcp: {
              type: Object,
              value: null
          },
          api: {
              type: Object
          },
          user: {
              type: Object
          },
          dateMin: {
              type: Object,
              value: null
          },
          dateMax: {
              type: Object,
              value: null
          },
          patient : {
              type : Object,
              value : {}
          },
          refresher: {
              type: Number,
              value: 0
          },
          filterRID: {
              type: String,
              value: ""
          },
          filterStatus: {
              type: Number,
              value: 0
          },
          allStatus: {
              type: Array,
              value: () => []
          },
          prescriptions: {
              type: Array,
              value: () => []
          },
          isLoading:{
              type: Boolean,
              value: false
          }
      }
  }

  static get observers() {
      return []
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  attached() {
      super.attached();
      this.async(this.notifyResize, 1);
  }

  setPrescriptions(prescriptions) {
      this._prescriptions = prescriptions;
      this.set("prescriptions", prescriptions);
      this.set("refresher", this.refresher + 1)
      const min = this.api.moment(Date.now()).subtract(1, 'Y');
      const max = this._tomorrow();
      this.set("dateMin", min.format("YYYY-MM-DD"));
      this.set("dateMax", max.format("YYYY-MM-DD"));
      this.set("allStatus", [
          {
              value: STATUS_SENT,
              label: this.localize("pr_status_sent", "Envoyée")
          },
          {
              value: STATUS_NOT_SENT,
              label: this.localize("pr_status_not_sent", "Non envoyée")
          },
          {
              value: STATUS_PENDING,
              label: this.localize("pr_status_pending", "En attente")
          },
          {
              value: STATUS_DELIVERED,
              label: this.localize("pr_status_delivered", "Délivrée")
          },
          {
              value: STATUS_REVOKED,
              label: this.localize("pr_status_revoked", "Révoquée")
          },
      ]);
      this._filter();
  }

  _isRevoked(service) {
      return service.status & STATUS_REVOKED;
  }

  _tomorrow() {
      return this.api.moment(Date.now()).add(1, 'd');
  }

  _between(date, min, max) {
      if (min && max) return this._compareDate(date, min) >= 0 && this._compareDate(date, max) <= 0;
      if (min) return this._compareDate(date, min) >= 0;
      if (max) return this._compareDate(date, max) <= 0;
      return true;
  }

  _compareDate(a, b) {
      return this.api.moment(a).diff(this.api.moment(b));
  }

  _filter() {
      if (!this._prescriptions) return;
      this.$["dateMin"].max = this.$["dateMax"].value;
      this.$["dateMax"].min = this.$["dateMin"].value;
      this.$["dateMax"].max = this._tomorrow().format("YYYY-MM-DD");
      const min = this.dateMin ? parseInt(this.api.moment(this.dateMin).format('YYYYMMDDHHmmss')) : null;
      const max = this.dateMax ? parseInt(this.api.moment(this.dateMax).format('YYYYMMDDHHmmss')) : null;
      let prescriptions = this._prescriptions.filter(p => this._between(p.service.valueDate, min, max));
      if (this.filterRID && this.filterRID.length > 0)
          prescriptions = prescriptions.filter(p => p.rid && p.rid.includes(this.filterRID));
      if (this.filterStatus > 0)
          prescriptions = prescriptions.filter(p => this._getStatus(p.service) & this.filterStatus);
      prescriptions = prescriptions.sort((a, b) => this._compareDate(b.service.valueDate, a.service.valueDate));
      this.set("prescriptions", prescriptions);
  }

  _onValueChanged(e) {
      console.log("change");
      this.dateMin = this.$["dateMin"].value;
      this.dateMax = this.$["dateMax"].value;
      if (e.currentTarget.id === "filterRID")
          this.filterRID = e.detail.value;
      if (e.currentTarget.id === "filterStatus")
          this.filterStatus = !!e.detail.value ? e.detail.value : 0;
      this._filter();
  }

  _frequency(item){
      return this.api.contact().medication().frequencyToString((this.api.contact().preferredContent(item.service, this.language) || {}).medicationValue, this.language)
  }

  _getContent(service) {
      return this.api.contact().preferredContent(service, this.language)
  }

  _getStatus(service) {
      return this._getContent(service).medicationValue.status;
  }

  _getStatusClass(item) {
      const status = this._getStatus(item.service);
      if (status & STATUS_DELIVERED )
          return "Green";
      if (status & STATUS_REVOKED )
          return "Red";
      return "Orange";
  }

  _formatStatus(item) {
      const status = this._getStatus(item.service);
      if (status & STATUS_REVOKED) return this.localize("pr_status_revoked", "Révoquée")
      else if (status & STATUS_DELIVERED) return this.localize("pr_status_delivered", "Délivrée")
      else if (status & STATUS_PENDING) return this.localize("pr_status_pending", "En attente")
      else if (status & STATUS_SENT) return this.localize("pr_status_sent", "Envoyée")
      return this.localize("pr_status_not_sent", "Non envoyée");
  }

  _updateFeedback(e) {
      const rid = e.currentTarget.dataset.rid;
      console.log("_update " + rid);
      if (!this.hcp) return;
      this.api.fhc().Recipe().updateFeedbackFlagUsingPUT(this.api.keystoreId, this.api.tokenId, "persphysician", this.hcp.nihii, this.hcp.ssin, this.hcp.lastName, this.api.credentials.ehpassword, rid)
      .then(result => {
          console.log("updated: ", result)
      })
      .catch(error => {
          console.log("error:", error)
      })
  }

  _notify(e) {
      const rid = e.currentTarget.dataset.rid;
      console.log("_notify " + rid);
      if (!this.hcp) return;
      this.api.fhc().Recipe().sendNotificationUsingPOST(this.api.keystoreId, this.api.tokenId, "persphysician", this.hcp.nihii, this.hcp.ssin, this.hcp.lastName, this.api.credentials.ehpassword, rid)
      .then(result => {
          console.log("notified: ", result)
      })
      .catch(error => {
          console.log("error:", error)
      })
  }

  _revoke(e) {
      const rid = e.currentTarget.dataset.rid;
      console.log("_revoke " + rid);
      if (!this.hcp) return;
      const prescription = this.prescriptions.find(p => p.rid === rid);
      const contact = prescription && prescription.contact || null;
      if (!contact) {
          console.log("no contact for the prescription with rid ", rid);
          return;
      }
      this.prescriptions.filter(p => p.rid === rid).forEach(prescription => {
          const content = this._getContent(prescription.service);
          content && (content.medicationValue.status = STATUS_SENT | STATUS_REVOKED);
      });
      this.api.fhc().Recipe().revokePrescriptionUsingDELETE(this.api.keystoreId, this.api.tokenId, "persphysician", this.hcp.nihii, this.hcp.ssin, this.hcp.lastName, this.api.credentials.ehpassword, rid, "no reason specified")
          .then(isDeleted => {
              console.log("revoke1", isDeleted)
              return isDeleted ? this.api.contact().modifyContactWithUser(this.user, contact)
                  .then(() => {
                      console.log("revoke2")
                      this._refresh();
                  }) : Promise.resolve();
          })
          .catch(error => {
              console.log("error:", error)
          })
  }

  _refresh() {
      console.log("_refresh")
      this.set("refresher", this.refresher + 1);
  }

  _print(e) {
      const pres = _.find(this.prescriptions, p => p.service.id === _.get(e,"currentTarget.dataset.id",false))
      const listServices = _.uniqBy( _.compact(pres.rid ? this.prescriptions.filter(p => p.rid === pres.rid).map(p => _.get(p,"service",{})) : [_.get(pres,"service",{})]),"id")
      return !this.hcp ? null : this.dispatchEvent(new CustomEvent('print-prescription', { detail: { rid : pres.rid, services:  listServices}, bubbles:true, composed:true }))

  }

  _printAndSendByEmail(e) {
     const pres = _.find(this.prescriptions, p => p.service.id === _.get(e,"currentTarget.dataset.id",false))
     const listServices = _.uniqBy( _.compact(pres.rid ? this.prescriptions.filter(p => p.rid === pres.rid).map(p => _.get(p,"service",{})) : [_.get(pres,"service",{})]),"id")
     return !this.hcp ? null : this.dispatchEvent(new CustomEvent('print-prescription', { detail: { rid : pres.rid, services: listServices, sendDocumentByEmail:true }, bubbles:true, composed:true }))
  }

  _getPrescriptionFromRecipe(e){
      if(_.get(e, 'currentTarget.dataset.rid', null)){
          this.api.fhc().Recipe().getPrescriptionMessageUsingGET(this.api.keystoreId, this.api.tokenId, "persphysician", this.hcp.nihii, this.hcp.ssin, this.hcp.lastName, this.api.credentials.ehpassword, _.get(e, 'currentTarget.dataset.rid', null)).then( pr => {
              console.log(pr)
          })
      }
  }
}

customElements.define(PrescriptionHistory.is, PrescriptionHistory)
