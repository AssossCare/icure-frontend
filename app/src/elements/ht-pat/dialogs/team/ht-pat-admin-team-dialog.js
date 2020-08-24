/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../../../styles/scrollbar-style.js';

import '../../../../styles/scrollbar-style.js';
import '../../../../styles/notification-style.js';
import '../../../../styles/paper-tabs-style.js';
import '../../../../styles/shared-styles.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/icpc-styles.js';
import moment from 'moment/src/moment';
import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../../tk-localizer";
class HtPatAdminTeamDialog extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="icpc-styles scrollbar-style notification-style buttons-style paper-tabs-style shared-styles dialog-style">
            #hcpInfoDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 0;
                position: fixed;
                z-index: 1100;
            }

            paper-material.card {
                background-color: #fff;
                padding: 10px;
                margin-left: 5px;
                margin-right: 5px;
                margin-bottom: 10px;
            }
            paper-input {
                padding-left: 5px;
                padding-right: 5px;
            }
            paper-input {
                --paper-input-container-focus-color: var(--app-primary-color);
                --paper-input-container-label: {
                    color: var(--app-text-color);
                    opacity: 1;
                };
                --paper-input-container-underline-disabled: {
                    border-bottom: 1px solid var(--app-text-color);
                };
                --paper-input-container-color: var(--app-text-color);
            }
            paper-textarea {
                --paper-input-container-focus-color: var(--app-primary-color);
            }
            paper-dropdown-menu {
                padding-left: 5px;
                padding-right: 5px;
            }

            .external-care-team-form{
                height: 275px;
                overflow: auto;
            }
            .external-care-team-line{
                display: flex;
            }
            .external-care-team-line-item{
                width: 50%!important;
                padding: 5px!important;
            }
            .external-care-team-line-item-only{
                width: 99%!important;
                padding: 5px!important;
            }
            .external-care-team-block{
                width: 99%;
                height: auto;
                border: 1px solid var(--app-background-color-dark);
                margin-bottom: 12px;
            }
            .external-care-team-block-title{
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
            }
            .colour-code{
                line-height: 12px;
                margin-right:4px;
                color: black;
            }
            #activeHealthElements{
                height: 200px;
                width: 99%;
            }
            #inactiveHealthElements{
                height: 200px;
                width: 99%;
            }
            .pageContent{
                max-height: 600px;
                overflow: auto;
            }
            vaadin-text-field {
                height: 40px;
                padding: 0;
            }
            .tabIcon{
                heigth: 14px;
                width: 14px;
                padding: 4px;
            }

            .hcpInfoDialog{
                height: 100%;
                width: auto;
                margin: 0;
                padding: 0;
                background-color: white;
                position: relative;
            }

            .m5{
                margin: 5px;
            }

        </style>

        <paper-dialog id="hcpInfoDialog">
            <div class="hcpInfoDialog">
                <paper-tabs class="tab-selector" selected="{{tabs}}">
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:doctor"></iron-icon> [[localize('adm-team-care-proc-info','Care provider informations',language)]]
                    </paper-tab>
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:clipboard-pulse"></iron-icon> [[localize('adm-team-path-foll-care','Pathologies follow by care provider',language)]]
                    </paper-tab>
                </paper-tabs>
                <iron-pages selected="[[tabs]]">
                    <page>
                        <div class="pageContent m5">
                            <div class="external-care-team-block">
                                <div class="external-care-team-block-title">[[localize('adm-team-prov', 'Provider', language)]]</div>
                                <div class="external-care-team-line">
                                    <vaadin-text-field class="external-care-team-line-item" label="[[localize('las_nam','Last name',language)]]" value="{{selectedHcp.lastName}}" readonly=""></vaadin-text-field>
                                    <vaadin-text-field class="external-care-team-line-item" label="[[localize('fir_nam','First name',language)]]" value="{{selectedHcp.firstName}}" readonly=""></vaadin-text-field>
                                </div>
                                <div class="external-care-team-line">
                                    <vaadin-text-field class="external-care-team-line-item" label="[[localize('inami','Nihii',language)]]" value="{{selectedHcp.nihii}}"></vaadin-text-field>
                                    <vaadin-combo-box id="hcpSpeciality" class="external-care-team-line-item" items="[[specialityList]]" item-label-path="label.fr" item-value-path="id" label="[[localize('speciality','Speciality',language)]]" selected-item="{{selectedHcpSpeciality}}"></vaadin-combo-box>
                                    <vaadin-text-field class="external-care-team-line-item" label="[[localize('niss','Niss',language)]]" value="{{selectedHcp.ssin}}"></vaadin-text-field>
                                </div>
                                <div class="external-care-team-line">
                                    <vaadin-text-field class="external-care-team-line-item" label="[[localize('cbe','Cbe',language)]]" value="{{selectedHcp.cbe}}"></vaadin-text-field>
                                    <vaadin-text-field class="external-care-team-line-item" label="[[localize('comp_nam','Compagny name',language)]]" value="{{selectedHcp.companyName}}"></vaadin-text-field>
                                </div>
                            </div>
                            <div class="external-care-team-block">
                                <div class="external-care-team-block-title">[[localize('adm-team-comment', 'Comment', language)]]</div>
                                <div class="external-care-team-line">
                                    <vaadin-text-field class="external-care-team-line-item-only" label="[[localize('adm-team-comment','Comment',language)]]" value="{{selectedHcp.notes}}"></vaadin-text-field>
                                </div>
                            </div>
                            <div class="external-care-team-block">
                                <div class="external-care-team-block-title">[[localize('adm-team-ref-period', 'Referral periods', language)]]</div>
                                <div class="external-care-team-line">
                                    <vaadin-date-picker class="external-care-team-line-item" label="[[localize('foll-up-beg','Beginning of the follow-up',language)]]" value="{{referalPeriodsAsString.startDate}}" i18n="[[i18n]]"></vaadin-date-picker>
                                    <vaadin-date-picker class="external-care-team-line-item" label="[[localize('foll-up-end','End of the follow-up',language)]]" value="{{referalPeriodsAsString.endDate}}" i18n="[[i18n]]"></vaadin-date-picker>
                                    <paper-checkbox class="external-care-team-line-item" value="{{selectedHcp.referral}}" on-checked-changed="_chckIfReferral" checked="[[selectedHcp.referral]]">[[localize('ref-hcp', 'Referral hcp', language)]]</paper-checkbox>
                                    <!--<paper-checkbox class="external-care-team-line-item" value="{{selectedHcp.invite}}" on-change="chckInvite">[[localize('inv-hcp', 'Invite hcp', language)]]</paper-checkbox>-->
                                </div>
                            </div>
                            <!--
                            <div class="external-care-team-block">
                                <div class="external-care-team-block-title">[[localize('adm-team-ctc-data', 'Contacts data', language)]]</div>
                                <template is="dom-repeat" items="[[selectedHcp.addresses]]" as="adr">
                                    <div class="external-care-team-line">
                                        <vaadin-text-field class="external-care-team-line-item" label="[[localize('street','Street',language)]]" value="{{adr.street}}"></vaadin-text-field>
                                        <vaadin-text-field class="external-care-team-line-item" label="[[localize('number','Number',language)]]" value="{{adr.houseNumber}}"></vaadin-text-field>
                                        <vaadin-text-field class="external-care-team-line-item" label="[[localize('postalCode','Postal code',language)]]" value="{{adr.postalCode}}"></vaadin-text-field>
                                        <vaadin-text-field class="external-care-team-line-item" label="[[localize('city','City',language)]]" value="{{adr.city}}"></vaadin-text-field>
                                    </div>

                                    <template is="dom-repeat" items="[[adr.telecoms]]" as="tel">
                                        <div class="external-care-team-line">
                                            <vaadin-text-field class="external-care-team-line-item" label="[[localize('type','Type',language)]]" value="{{tel.telecomType}}"></vaadin-text-field>
                                            <vaadin-text-field class="external-care-team-line-item" label="[[localize('number','Number',language)]]" value="{{tel.telecomNumber}}"></vaadin-text-field>
                                        </div>
                                    </template>
                                </template>
                            </div>
                            -->
                        </div>
                    </page>
                    <page>
                        <div class="pageContent m5">
                            <div>
                                <h4>[[localize('adm-team-act-he', 'Active health elements', language)]]</h4>
                                <vaadin-grid id="activeHealthElements" class="material" overflow="bottom" items="[[he.activeElements]]">
                                    <vaadin-grid-column width="40px">
                                        <template class="header">
                                            <vaadin-grid-sorter path="">Code</vaadin-grid-sorter>
                                        </template>
                                        <template>
                                            <template is="dom-if" if="[[_hasColor(item)]]">
                                                <label class\$="colour-code [[item.colour]]"><span></span></label>
                                            </template>
                                            [[_getCode(item)]]
                                        </template>
                                    </vaadin-grid-column>
                                    <vaadin-grid-column width="80px">
                                        <template class="header">
                                            <vaadin-grid-sorter path="">[[localize('adm-team-label', 'Label', language)]]</vaadin-grid-sorter>
                                        </template>
                                        <template>
                                            [[item.descr]]
                                        </template>
                                    </vaadin-grid-column>
                                    <vaadin-grid-column width="80px">
                                        <template class="header">
                                            <vaadin-grid-sorter path="">[[localize('adm-team-start-date', 'Start date', language)]]</vaadin-grid-sorter>
                                        </template>
                                        <template>
                                            [[_dateFormat(item.openingDate, item.valueDate)]]
                                        </template>
                                    </vaadin-grid-column>
                                    <vaadin-grid-column width="80px">
                                        <template class="header">
                                            <vaadin-grid-sorter path="">[[localize('adm-team-end-date', 'End date', language)]]</vaadin-grid-sorter>
                                        </template>
                                        <template>
                                            [[_dateFormat(item.closingDate)]]
                                        </template>
                                    </vaadin-grid-column>
                                </vaadin-grid>
                            </div>

                            <div>
                                <h4>[[localize('adm-team-inact-he', 'Inactive health elements', language)]]</h4>
                                <vaadin-grid id="inactiveHealthElements" class="material" overflow="bottom" items="[[he.inactiveElements]]">
                                    <vaadin-grid-column width="40px">
                                        <template class="header">
                                            <vaadin-grid-sorter path="name">[[localize('adm-team-code', 'Code', language)]]</vaadin-grid-sorter>
                                        </template>
                                        <template>
                                            <template is="dom-if" if="[[_hasColor(item)]]">
                                                <label class\$="colour-code [[item.colour]]"><span></span></label>
                                            </template>
                                            [[_getCode(item)]]
                                        </template>
                                    </vaadin-grid-column>
                                    <vaadin-grid-column width="80px">
                                        <template class="header">
                                            <vaadin-grid-sorter path="">[[localize('adm-team-label', 'Label', language)]]</vaadin-grid-sorter>
                                        </template>
                                        <template>
                                            [[item.descr]]
                                        </template>
                                    </vaadin-grid-column>
                                    <vaadin-grid-column width="80px">
                                        <template class="header">
                                            <vaadin-grid-sorter path="">[[localize('adm-team-start-date', 'Start date', language)]]</vaadin-grid-sorter>
                                        </template>
                                        <template>
                                            [[_dateFormat(item.openingDate, item.valueDate)]]
                                        </template>
                                    </vaadin-grid-column>
                                    <vaadin-grid-column width="80px">
                                        <template class="header">
                                            <vaadin-grid-sorter path="">[[localize('adm-team-end-date', 'End date', language)]]</vaadin-grid-sorter>
                                        </template>
                                        <template>
                                            [[_dateFormat(item.closingDate)]]
                                        </template>
                                    </vaadin-grid-column>
                                </vaadin-grid>
                            </div>
                        </div>
                    </page>
                </iron-pages>
                <div class="buttons">
                    <paper-button class="button" on-tap="_closeDialogs"><iron-icon icon="icons:close" class="mr5 smallIcon"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                    <paper-button class="button button--save" on-tap="_updateHcp"><iron-icon icon="icons:save" class="mr5 smallIcon"></iron-icon> [[localize('save','Save',language)]]</paper-button>
                </div>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-admin-team-dialog';
  }
  static get properties() {
      return {
          api: {
              type: Object
          },
          resources: {
              type: Object
          },
          i18n:{
              type: Object
          },
          credentials: {
              type: Object,
              noReset: true
          },
          user: {
              type: Object
          },
          selectedTeamHcp:{
              type: String
          },
          patient: {
              type: Object,
              notify: true
          },
          selectedHcp: {
              type: Object,
              value: () => {}
          },
          specialityList:{
              type: Array,
              value: () => []
          },
          selectedHcpSpeciality:{
              type: Object,
              value: () => {}
          },
          tabs:{
              type: Number,
              value: 0
          },
          contacts:{
              type: Array,
              value: () => []
          },
          activeHealthElements:{
              type: Array,
              value: () => []
          },
          inactiveHealthElements:{
              type: Array,
              value: () => []
          },
          he:{
              type: Object,
              value: () => {}
          },
          selectedCareProvider:{
              type: Object,
              value: () => {}
          },
          telecomType:{
              type: Array,
              value: () => [
                  {code: "home", label: {fr: "Domicile", nl: "Home", en: "Home"}},
                  {code: "work", label: {fr: "Travail", nl: "Work", en: "Work"}},
                  {code: "hospital", label: {fr: "Hopital", nl: "Hospital", en: "Hospital"}},
                  {code: "clinic", label: {fr: "Clinique", nl: "Clinic", en: "Clinic"}},
                  {code: "other", label: {fr: "Autre", nl: "Other", en: "Other"}}
              ]
          },
          addresseType: {
              type: Array,
              value: () => [
                  {code: "mobile", label: {fr: "Portable", nl: "Mobile", en: "Mobile"}},
                  {code: "phone", label: {fr: "Tél", nl: "Phone", en: "Phone"}},
                  {code: "email", label: {fr: "Email", nl: "Email", en: "Email"}},
                  {code: "fax", label: {fr: "Fax", nl: "Fax", en: "Fax"}}
              ]
          },
          referalPeriodsAsString:{
              type: Object,
              value: {
                  startDate: null,
                  endDate: null
              }
          }
      };
  }
  static get observers() {
      return ['_selectedHcpSpecialityChanged(selectedHcpSpeciality)'];
  }
  constructor() {
      super();
  }
  ready() {
      super.ready();
  }
  _openDialog(){
      this.set('selectedHcpSpeciality', {})
      if(_.get(this, "selectedCareProvider.id", null)){
          this.api.hcparty().getHealthcareParty(_.get(this, "selectedCareProvider.id", null))
              .then(hcp => {
                  this.set('selectedHcp', _.size(_.get(hcp, 'addresses', [])) ? _.assign(hcp, {
                      referral: _.get(_.get(this.patient, "patientHealthCareParties", []).find(phcp => phcp.healthcarePartyId === _.get(hcp, 'id', null)), "referral" , false),
                      referralPeriods: _.get(_.get(this.patient, "patientHealthCareParties", []).find(phcp => phcp.healthcarePartyId === _.get(hcp, 'id', null)), "referralPeriods", [])
                  }) : _.assign(hcp, {
                      addresses: [{
                          addressType: "work",
                          street: null,
                          houseNumber: null,
                          postalCode: null,
                          city: null,
                          telecoms: [{
                              telecomType: null,
                              telecomNumber: null
                          }]
                      }],
                      referral: _.get(_.get(this.patient, "patientHealthCareParties", []).find(phcp => phcp.healthcarePartyId === _.get(hcp, 'id', null)), "referral" , false),
                      referralPeriods: _.get(_.get(this.patient, "patientHealthCareParties", []).find(phcp => phcp.healthcarePartyId === _.get(hcp, 'id', null)), "referralPeriods", [])
                  }))
              })
              .then(() => this.api.code().findPaginatedCodesByLabel('be', 'CD-HCPARTY', 'fr', 'pers', null, null, 1000))
              .then(listOfHcp => this.set('specialityList', listOfHcp.rows))
              .finally(() => {
                  this.set('referalPeriodsAsString', {
                      startDate: _.get(_.head(_.get(_.get(this.patient, "patientHealthCareParties", []).find(phcp => phcp.healthcarePartyId === _.get(this.selectedHcp, 'id', null)), 'referralPeriods', null)), "startDate", null) ? this.api.moment(_.get(_.head(_.get(_.get(this.patient, "patientHealthCareParties", []).find(phcp => phcp.healthcarePartyId === _.get(this.selectedHcp, 'id', null)), 'referralPeriods', null)), "startDate", null)).format("YYYY-MM-DD") : null,
                      endDate: _.get(_.head(_.get(_.get(this.patient, "patientHealthCareParties", []).find(phcp => phcp.healthcarePartyId === _.get(this.selectedHcp, 'id', null)), 'referralPeriods', null)), "endDate", null) ? this.api.moment(_.get(_.head(_.get(_.get(this.patient, "patientHealthCareParties", []).find(phcp => phcp.healthcarePartyId === _.get(this.selectedHcp, 'id', null)), 'referralPeriods', null)), "endDate", null)).format("YYYY-MM-DD") : null
                  })
                  this.set('he', {activeElements: this.activeHealthElements.filter(he => _.get(he, 'responsible', "") === this.selectedHcp.id), inactiveElements: this.inactiveHealthElements.filter(he => _.get(he, 'responsible', "") === this.selectedHcp.id)})
                  this.set('selectedHcpSpeciality', this.specialityList.find(spec => spec.code === this.selectedHcp.speciality) ? this.specialityList.find(spec => spec.code === this.selectedHcp.speciality) : this.specialityList.find(spec => spec.id === this.selectedHcp.speciality))
                  this.shadowRoot.querySelector('#hcpInfoDialog') ? this.shadowRoot.querySelector('#hcpInfoDialog').open() : null
              })
      }
  }
  _closeDialogs(){
      this.set('selectedHcpSpeciality', {})
      this.shadowRoot.querySelector('#hcpInfoDialog') ? this.shadowRoot.querySelector('#hcpInfoDialog').close() : null
  }
  _getCode(he){
      return _.get(_.get(he, 'codes', []).find(c => c.type === "ICPC"), 'code', null)
  }
  _dateFormat(date, altDate){
      return (date || altDate) && this.api.moment((date || altDate)).format('DD/MM/YYYY') || '';
  }
  _selectedHcpSpecialityChanged(){
      this.set('selectedHcp.speciality', _.get(this, "selectedHcpSpeciality.code", null))
  }
  _updateHcp(){
      console.log(this.selectedHcp)
      this.api.hcparty().modifyHealthcareParty(this.selectedHcp)
          .then(() => this.api.patient().getPatientWithUser(this.user, this.patient.id))
          .then(patient => {
              patient.patientHealthCareParties.splice(_.indexOf(_.get(this.patient, "patientHealthCareParties", []), _.get(this.patient, "patientHealthCareParties", []).find(phcp => phcp.healthcarePartyId === _.get(this.selectedHcp, 'id', null))), 1)
              patient.patientHealthCareParties.push({
                  healthcarePartyId : _.get(this.selectedHcp, 'id', null),
                  referral: _.get(this.selectedHcp, 'referral', false),
                  referralPeriods: [{
                      startDate : _.get(this.referalPeriodsAsString, 'startDate', null) != null ? parseInt(moment(_.trim(_.get(this.referalPeriodsAsString, "startDate"))).format('YYYYMMDD')) : null,
                      endDate: _.get(this.referalPeriodsAsString, 'endDate', null) != null ? parseInt(moment(_.trim(_.get(this.referalPeriodsAsString, "endDate"))).format('YYYYMMDD')) : null
                  }]
              })
              return patient
          })
          .then(patient => this.api.patient().modifyPatientWithUser(this.user, patient))
          .then(patient => this.api.register(patient, 'patient'))
          .finally(() => {
              this.dispatchEvent(new CustomEvent('refresh-grid', {detail: {}, composed: true, bubbles: true}))
              this.shadowRoot.querySelector('#hcpSpeciality')._clear()
              this._closeDialogs()
      }).catch(e => console.log("Error: "+e))
  }

  _hasColor() {
      return !!(this.he.colour)
  }

  _chckIfReferral(e){
      if(e.target.checked){
          this.set("selectedHcp.referral", true)
      }else{
          this.set("selectedHcp.referral", false)
      }
  }
}
customElements.define(HtPatAdminTeamDialog.is, HtPatAdminTeamDialog);
