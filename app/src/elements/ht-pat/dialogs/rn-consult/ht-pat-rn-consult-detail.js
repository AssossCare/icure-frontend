import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/buttons-style.js';
import '../../../../styles/paper-tabs-style.js';
import '../../../dynamic-form/dynamic-text-field.js';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatRnConsultDetail extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style">

            .headerInfoLine{
                width: 100%;
                padding: 4px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .headerInfoField{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                align-content: stretch;
                width: calc(100% / 4);
                padding: 0 8px;
                box-sizing: border-box;
            }

            .headerLabel{
                font-weight: bold;
            }

            .rn-result-container{
                margin-bottom: 12px;
                border: 1px solid var(--app-background-color-dark);
            }

            .headerMasterTitle{
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
            }

            .rn-sub-container{
                height: auto;
                width: auto;
                margin: 10px;
                border: 1px solid var(--app-background-color-dark);
            }

            .rn-person-container{
                height: auto;
                width: auto;
            }

            .rn-address-container{
                height: auto;
                width: auto;
            }

            .rn-partnerInfo-container{
                height: auto;
                width: auto;
            }

            .rn-error-container{
                height: auto;
                width: auto;
                color: var(--app-status-color-nok);
                font-weight: bold;
            }

            .m5{
                margin: 5px;
            }

        </style>

        <div class="rn-result-container m5">
            <div class="headerMasterTitle headerLabel h25">[[selectedPersonData.personData.name.first]] [[selectedPersonData.personData.name.last]] - [[selectedPersonData.ssin.value]]</div>
            <div class="rn-sub-container">
                <div class="rn-person-container">
                    <div class="headerMasterTitle headerLabel">[[localize('rn-pat-info','Information',language)]]</div>
                    <div class="headerInfoLine">
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-firstName', 'Firstname', language)]]: </span> [[selectedPersonData.personData.name.first]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-middleName', 'Middlename', language)]]: </span> [[selectedPersonData.personData.name.middle]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-lastName', 'Lastname', language)]]: </span> [[selectedPersonData.personData.name.last]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-gender', 'Gender', language)]]: </span> [[_getGender(selectedPersonData.personData.gender.value)]]
                        </div>
                    </div>
                    <div class="headerInfoLine">
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-niss', 'Niss', language)]]: </span> [[formatNissNumber(selectedPersonData.ssin.value)]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-nationality', 'Nationality', language)]]: </span> [[_getDescription(selectedPersonData.personData.nationality)]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-civilState', 'Civil state', language)]]: </span> [[_getDescription(selectedPersonData.personData.civilstate)]]
                        </div>
                    </div>
                    <div class="headerInfoLine">
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-birthDate', 'Birthdate', language)]]: </span> [[_formatDate(selectedPersonData.personData.birth.date)]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-birthPlace', 'Birthplace', language)]]: </span> [[_getDescription(selectedPersonData.personData.birth.localisation.municipality)]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-birthCountry', 'Birthcountry', language)]]: </span> [[_getDescription(selectedPersonData.personData.birth.localisation.country)]]
                        </div>
                    </div>
                </div>
            </div>
            <template is="dom-if" if="[[_isPartnerInfo(pers.personData.civilstate)]]">
                <div class="rn-sub-container">
                    <div class="rn-partnerInfo-container">
                        <div class="headerMasterTitle headerLabel">[[localize('rn-partInfo','Partner info',language)]]</div>
                        <div class="headerInfoLine">
                            <div class="headerInfoField">
                                <span class="headerLabel">[[localize('rn-firstName', 'Firstname', language)]]: </span> [[selectedPersonData.personData.civilstate.partner.name.first]]
                            </div>
                            <div class="headerInfoField">
                                <span class="headerLabel">[[localize('rn-lastName', 'Lastname', language)]]: </span> [[selectedPersonData.personData.civilstate.partner.name.last]]
                            </div>
                            <div class="headerInfoField">
                                <span class="headerLabel">[[localize('rn-niss', 'Niss', language)]]: </span> [[formatNissNumber(selectedPersonData.personData.civilstate.partner.ssin)]]
                            </div>
                        </div>
                    </div>
                </div>
            </template>
            <div class="rn-sub-container">
                <div class="rn-address-container">
                    <div class="headerMasterTitle headerLabel">[[localize('rn-pat-adr','Address',language)]]</div>
                    <div class="headerInfoLine">
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-street', 'Street', language)]]: </span> [[selectedPersonData.personData.address.standardAddress.street]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-houseNumber', 'House number', language)]]: </span> [[selectedPersonData.personData.address.standardAddress.housenumber]]
                        </div>
                    </div>
                    <div class="headerInfoLine">
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-postalCode', 'Postal code', language)]]: </span> [[selectedPersonData.personData.address.standardAddress.municipality.postalCode]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-city', 'City', language)]]: </span> [[_getDescription(selectedPersonData.personData.address.standardAddress.city)]]
                        </div>
                        <div class="headerInfoField">
                            <span class="headerLabel">[[localize('rn-country', 'Country', language)]]: </span> [[_getDescription(selectedPersonData.personData.address.standardAddress.country)]]
                        </div>
                    </div>
                </div>
            </div>
        </div>
`;
  }

  static get is() {
      return 'ht-pat-rn-consult-detail';
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
          patient:{
              type: Object,
              value: () => {}
          },
          selectedPersonData:{
              type: Object,
              value: () => {}
          }
      };
  }

  static get observers() {
      return [];
  }

  ready() {
      super.ready();
  }


  _isPartnerInfo(civilState){
      return _.isEmpty(_.get(civilState, 'partner', {})) ? false : true
  }

  formatNissNumber(niss) {
      return niss ? ("" + niss).replace(/([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{3})([0-9]{2})/, '$1.$2.$3-$4.$5') : ''
  }

  _formatDate(date){
      return date ? this.api.moment(date).format('DD/MM/YYYY') : null
  }

  _getGender(gender){
      return this.localize(_.toLower(gender), gender, this.language)
  }


  _getDescription(data){
      return _.get(_.get(data, 'descriptions', []).find(d => _.lowerCase(d.lang) === this.language), 'value', null) ? _.get(_.get(data, 'descriptions', []).find(d => _.lowerCase(d.lang) === this.language), 'value', null) : _.get(_.head(_.get(data, 'descriptions', [])), 'value', null) ? _.get(_.head(_.get(data, 'descriptions', [])), 'value', null) : null
  }

  _getGender(gender){
      return this.localize(_.toLower(gender), gender, this.language)
  }
}
customElements.define(HtPatRnConsultDetail.is, HtPatRnConsultDetail);
