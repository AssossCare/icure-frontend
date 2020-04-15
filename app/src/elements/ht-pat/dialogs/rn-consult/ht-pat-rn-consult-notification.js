import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/buttons-style.js';
import '../../../../styles/paper-tabs-style.js';
import '../../../../styles/paper-input-style.js';
import '../../../dynamic-form/dynamic-text-field.js';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatRnConsultNotification extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style paper-input-style">
            .register-line{
                width: 100%;
                padding: 4px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .sub-container{
                height: auto;
                width: auto;
                margin: 10px;
                border: 1px solid var(--app-background-color-dark);
            }

            .container-title{
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
            }

            .w100{
                width: 99%;
            }

            .w80{
                width: 79%;
            }

            .w50{
                width: 50%;
            }

            .w30{
                width: 29%;
            }

            .w20{
                width: 19%;
            }

            .mw0{
                min-width: 0
            }

            .w20-date-picker{
                width: 19%!important;
                min-width: 19%;
            }

            .sub-container-error{
                height: auto;
                width: auto;
                margin: 10px;
                border: 1px solid var(--app-status-color-nok);
                color: var(--app-status-color-nok);
            }

            .container-title-error{
                font-size: var(--font-size-large);
                background: var(--app-status-color-nok);
                padding: 0 12px;
                box-sizing: border-box;
                color: white;
            }

            .p4{
                padding: 4px;
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

        <div class="notification-content">
            <div class="sub-container-error">
                <div class="container-title-error">Recommandations</div>
                <div class="p4">
                    Attention, créer un numéro BIS n'est pas un acte anodin.<br>
                        Veuillez faire attention aux points suivants:
                        <ul>
                            <li>Vous devez recueillir le plus possible d'informations sur la personne</li>
                            <li>Vous devez garder une trace des documents montrés par le patient sous forme de scan dans son dossier</li>
                            <li>La création d'un n° bis ne peut se faire qu'en présence du patient</li>
                        </ul>
                        En cas de problème, vous pouvez contacter la cellule identification de la BCSS via mail <a href="mailto:identification@ksz-bcss.fgov.be">identification@ksz-bcss.fgov.be</a>
                </div>
            </div>

            <template is="dom-if" if="[[_isError(errorList, errorList.*)]]">
                <div class="rn-error-container m5">
                    <div>
                        [[localize('rn-error-code', 'Error code', language)]]:
                        <template is="dom-repeat" items="[[errorList]]" as="err">
                            [[localize(err.code, err.label, language)]],
                        </template>
                    </div>
                </div>
            </template>

            <div class="sub-container">
                <div class="container-title">[[localize('rn-info-creation', 'Information for creation', language)]]</div>
                <div class="sub-container">
                    <div class="sub-container">
                        <div class="container-title">[[localize('rn-gen-info', 'General information', language)]]</div>
                        <div class="register-line">
                            <dynamic-text-field class="w20 p4 mw0" label="[[localize('rn-lastName', 'Lastname', language)]]*" value="{{registerData.person.lastName}}"></dynamic-text-field>
                            <dynamic-text-field class="w20 p4 mw0" label="[[localize('rn-firstName', 'Firstname', language)]]" value="{{registerData.person.firstName}}"></dynamic-text-field>
                            <dynamic-text-field class="w20 p4 mw0" label="[[localize('rn-birthYear', 'Birth year', language)]]*" value="{{registerData.person.birthYear}}"></dynamic-text-field>
                        </div>
                    </div>
                    <div class="register-line">
                        <vaadin-combo-box id="registerType" class="w100" label="[[localize('rn-register-type', 'Register type', language)]]" filter="{{regTypeFilter}}" selected-item="{{selectedRegisterType}}" filtered-items="[[registerType]]" item-label-path="label.fr">
                            <template>[[_getLabel(item.label)]]</template>
                        </vaadin-combo-box>
                    </div>
                    <template is="dom-if" if="[[_isBasedOnBirth(selectedRegisterType)]]">
                        <div class="sub-container">
                            <div class="container-title">[[localize('rn-based-birth', 'Based on birth', language)]]</div>
                            <div class="register-line">
                                <vaadin-combo-box id="registerType" class="w100 p4 mw0" label="[[localize('rn-birthCountry', 'Birth country', language)]]*" filter="{{countryFilter}}" selected-item="{{selectedBirthCountry}}" filtered-items="[[filteredCountries]]" item-label-path="label.fr">
                                    <template>[[_getLabel(item.label)]]</template>
                                </vaadin-combo-box>
                            </div>
                            <div class="register-line">
                                <vaadin-date-picker label="[[localize('rn-birthDate', 'Birth date', language)]]*" value="{{registerData.birth.birthDate}}" class="w20-date-picker" i18n="[[i18n]]"></vaadin-date-picker>
                                <vaadin-combo-box id="registerType" class="w30 p4 mw0" label="[[localize('rn-gender', 'Gender', language)]]*" filter="{{genderFilter}}" selected-item="{{selectedGender}}" filtered-items="[[genderType]]" item-label-path="label.fr">
                                    <template>[[_getLabel(item.label)]]</template>
                                </vaadin-combo-box>
                                <template is="dom-if" if="[[isCityOfBelgium]]">
                                    <vaadin-combo-box id="registerType" class="w30 p4 mw0" label="[[localize('rn-birthCity', 'Birth city', language)]]*" filter="{{municipalityFilter}}" selected-item="{{selectedBirthMunicipality}}" filtered-items="[[filteredMunicipalities]]" item-label-path="label.fr">
                                        <template>[[_getLabel(item.label)]]</template>
                                    </vaadin-combo-box>
                                </template>
                                <template is="dom-if" if="[[!isCityOfBelgium]]">
                                    <dynamic-text-field class="w30 p4 mw0" label="[[localize('rn-birthCity', 'Birth city', language)]]*" value="{{registerData.birth.cityName}}"></dynamic-text-field>
                                </template>
                            </div>
                        </div>
                    </template>
                    <template is="dom-if" if="[[_isBaseOnResidentialAddressInBelgium(selectedRegisterType)]]">
                        <div class="sub-container">
                            <div class="container-title">[[localize('rn-based-in', 'Based on a residential address in Belgium', language)]]</div>
                            <div class="register-line">
                                <dynamic-text-field class="w20 p4 mw0" label="[[localize('rn-postalCode', 'Postal code', language)]]*" value="{{registerData.inBelgium.postalCode}}"></dynamic-text-field>
                                <dynamic-text-field class="w20 p4 mw0" label="[[localize('rn-street', 'Street', language)]]*" value="{{registerData.inBelgium.streetName}}"></dynamic-text-field>
                                <vaadin-combo-box id="registerType" class="w50" label="[[localize('rn-city', 'City', language)]]*" filter="{{municipalityFilter}}" selected-item="{{selectedInBelgiumMunicipality}}" filtered-items="[[filteredMunicipalities]]" item-label-path="label.fr">
                                    <template>[[_getLabel(item.label)]]</template>
                                </vaadin-combo-box>
                            </div>
                        </div>
                    </template>
                    <template is="dom-if" if="[[_isBasedOnResidentialAddressOutOfBelgium(selectedRegisterType)]]">
                        <div class="sub-container">
                            <div class="container-title">[[localize('rn-based-out', 'Based on a residential address which is not in Belgium', language)]]</div>
                            <div class="register-line">
                                <dynamic-text-field class="w30 p4 mw0" label="[[localize('rn-street', 'Street', language)]]*" value="{{registerData.outBelgium.streetName}}"></dynamic-text-field>
                                <dynamic-text-field class="w30 p4 mw0" label="[[localize('rn-city', 'City', language)]]*" value="{{registerData.outBelgium.cityName}}"></dynamic-text-field>
                                <vaadin-combo-box id="registerType" class="w30" label="[[localize('rn-country', 'Country', language)]]*" filter="{{countryFilter}}" selected-item="{{selectedOutBelgiumCountry}}" filtered-items="[[filteredCountries]]" item-label-path="label.fr">
                                    <template>[[_getLabel(item.label)]]</template>
                                </vaadin-combo-box>
                            </div>
                        </div>
                    </template>
                </div>
            </div>
        </div>
`;
  }

  static get is() {
      return 'ht-pat-rn-consult-notification';
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
          registerData:{
              type: Object,
              value: () => {}
          },
          registerType:{
              type: Array,
              value: () => [
                  {type: 'birth', label: {fr: 'Basée sur la naissance', nl: 'Based on birth', en: 'Based on birth'}},
                  {type: 'residentialAddressInBelgium', label: {fr: 'Basée sur une adresse de résidence en Belgique', nl: 'Based on a residential address in Belgium', en: 'Based on a residential address in Belgium'}},
                  {type: 'residentialAddressOutBelgium', label: {fr: 'Basée sur une adresse de résidence hors Belgique', nl: 'Based on a residential address which is not in Belgium', en: 'Based on a residential address which is not in Belgium'}}
              ]
          },
          selectedRegisterType:{
              type: Object,
              value: () => {}
          },
          listOfCountries:{
              type: Array,
              value: () => []
          },
          listOfMunicipality:{
              type: Array,
              value: () => []
          },
          isCityOfBelgium:{
              type: Boolean,
              value: false
          },
          selectedBirthMunicipality:{
              type: Object,
              value: () => {}
          },
          selectedBirthCountry:{
              type: Object,
              value: () => {}
          },
          selectedGender:{
              type: Object,
              value: () => {}
          },
          selectedInBelgiumMunicipality:{
              type: Object,
              value: () => {}
          },
          selectedOutBelgiumCountry:{
              type: Object,
              value: () => {}
          },
          genderType:{
              type: Array,
              value:() => [
                  {type: 'male', label: {fr: 'Masculin', en: 'Male', nl: 'Male'}},
                  {type: 'female', label: {fr: 'Féminin', en: 'Female', nl: 'Female'}}
              ]
          },
          countryFilter:{
              type: String,
              value: null
          },
          notificationResponse:{
              type: Object,
              value: () => {}
          },
          municipalityFilter:{
              type: String,
              value: null
          },
          filteredCountries:{
              type: Array,
              value: () => []
          },
          filteredMunicipalities:{
              type: Array,
              value: () => []
          },
          errorList:{
              type: Array,
              value: () => []
          }
      };
  }

  static get observers() {
      return ['_initialize(user, api)', '_selectedRegisterTypeChanged(selectedRegisterType)',  '_comboboxValueChanged(selectedRegisterType, selectedBirthMunicipality, selectedBirthCountry, selectedGender, selectedInBelgiumMunicipality, selectedOutBelgiumCountry)', '_countryFilterChanged(countryFilter)', '_municipalityFilterChanged(municipalityFilter)'];
  }

  ready() {
      super.ready();
  }

  _initialize(){
      this.set('errorList', [])
      this.set('selectedRegisterType', _.get(this, 'registerType', []).find(rt => rt.type === "birth"))
      this.set('filteredMunicipalities', [])
      this.set('filteredCountries', [])
      this.set('registerData', {
          type: 'birth',
          person: {
              lastName: null,
              firstName: null,
              birthYear: null,
              nationalityCode: null,
              gender: null
          },
          birth: {
              cityName: null,
              cityCode: null,
              countryCode: null,
              date: null
          },
          inBelgium: {
              countryCode: '150',
              cityCode: null,
              postalCode: null,
              streetName: null
          },
          outBelgium: {
              countryCode: null,
              cityName: null,
              streetName: null
          }
      })
  }

  _sendNotification(){

      this.set('errorList', [])

      let mid = {
          firstName: _.startCase(_.lowerCase(_.trim(_.get(this.registerData, 'person.firstName', null)))),
          lastName:  _.startCase(_.lowerCase(_.trim(_.get(this.registerData, 'person.lastName', null)))),
          nationalityCode: null//_.get(this.registerData, 'person.nationalityCode', null)
      }

      let midBirth = {
          dateOfBirth: _.get(this.registerData, 'birth.birthDate', null) !== null && _.get(this.registerData, 'birth.birthDate', null) !== "" ? moment(_.get(this.registerData, 'birth.birthDate', null)).format('YYYYMMDD') : null,
          birthPlace: {
              cityCode:  _.get(this.registerData, 'birth.cityCode', null),
              cityName:  _.get(this.registerData, 'birth.cityName', null),
              countryCode:  _.get(this.registerData, 'birth.countryCode', null)
          },
          gender: _.get(this.registerData, 'person.gender', null)
      }

      let midInBelgium = {
          dateOfBirth:  parseInt(_.padEnd(_.trim(_.get(this.registerData, 'person.birthYear', null)), 8, 0)) || null,
          residentialAddress: {
              countryCode : _.get(this.registerData, 'inBelgium.countryCode', null),
              cityCode : _.get(this.registerData, 'inBelgium.cityCode', null),
              postalCode: _.get(this.registerData, 'inBelgium.postalCode', null),
              streetName: _.get(this.registerData, 'inBelgium.streetName', null)
          }
      }

      let midOutBelgium = {
          dateOfBirth:  parseInt(_.padEnd(_.trim(_.get(this.registerData, 'person.birthYear', null)), 8, 0)) || null,
          residentialAddress: {
              countryCode : _.get(this.registerData, 'outBelgium.countryCode', null),
              cityName : _.get(this.registerData, 'outBelgium.cityName', null),
              streetName: _.get(this.registerData, 'outBelgium.streetName', null)
          }
      }

      if(_.get(this, 'selectedRegisterType.type', null) === "birth"){
          !_.get(mid, 'lastName', null) ? this.push('errorList', {code: 'rn-firstName-ko', label: 'First name is missing'}) : null
          !_.get(midBirth, 'dateOfBirth', null) ? this.push('errorList', {code: 'rn-birthDate-ko', label: 'Birth date is missing'}) : null
          !_.get(midBirth, 'birthPlace.cityName', null) ? this.push('errorList', {code: 'rn-birthPlace-cityCode-ko', label: 'City code is missing'}) : null
          !_.get(midBirth, 'birthPlace.countryCode', null) ? this.push('errorList', {code: 'rn-birthPlace-countryCode-ko', label: 'Country code is missing'}) : null
          !_.get(midBirth, 'gender', null) ? this.push('errorList', {code: 'rn-birthPlace-gender-ko', label: 'Gender is missing'}) : null
      }

      if(_.get(this, 'selectedRegisterType.type', null) === "residentialAddressInBelgium"){
          !_.get(midInBelgium, 'dateOfBirth', null) ? this.push('errorList', {code: 'rn-birthYear-ko', label: 'Year of birth is missing'}) : null
          !_.get(mid, 'lastName', null) ? this.push('errorList', {code: 'rn-firstName-ko', label: 'First name is missing'}) : null
          !_.get(midInBelgium, 'residentialAddress.countryCode', null) ? this.push('errorList', {code: 'rn-residentialAddress-countryCode-ko', label: 'Country code is missing'}) : null
          !_.get(midInBelgium, 'residentialAddress.cityCode', null) ? this.push('errorList', {code: 'rn-residentialAddress-cityCode-ko', label: 'City code is missing'}) : null
          !_.get(midInBelgium, 'residentialAddress.postalCode', null) ? this.push('errorList', {code: 'rn-residentialAddress-postalCode-ko', label: 'Postal code is missing'}) : null
          !_.get(midInBelgium, 'residentialAddress.streetName', null) ? this.push('errorList', {code: 'rn-residentialAddress-streetName-ko', label: 'Street name is missing'}) : null
      }

      if(_.get(this, 'selectedRegisterType.type', null) === "residentialAddressOutBelgium"){
          !_.get(midInBelgium, 'dateOfBirth', null) ? this.push('errorList', {code: 'rn-birthYear-ko', label: 'Year of birth is missing'}) : null
          !_.get(mid, 'lastName', null) ? this.push('errorList', {code: 'rn-firstName-ko', label: 'First name is missing'}) : null
          !_.get(midOutBelgium, 'residentialAddress.countryCode', null) ? this.push('errorList', {code: 'rn-residentialAddress-countryCode-ko', label: 'Country code is missing'}) : null
          !_.get(midOutBelgium, 'residentialAddress.cityName', null) ? this.push('errorList', {code: 'rn-residentialAddress-cityName-ko', label: 'City name is missing'}) : null
          !_.get(midOutBelgium, 'residentialAddress.streetName', null) ? this.push('errorList', {code: 'rn-residentialAddress-streetName-ko', label: 'Street name is missgin'}) : null
      }

      _.get(this, 'selectedRegisterType.type', null) === "birth" ? _.assign(mid, midBirth) : _.get(this, 'selectedRegisterType.type', null) === "residentialAddressInBelgium" ? _.assign(mid, midInBelgium) : _.get(this, 'selectedRegisterType.type', null) === "residentialAddressOutBelgium" ? _.assign(mid, midOutBelgium) : {}

      if(_.size(this.errorList) === 0){
          this.api.fhc().RnConsultController().registerPersonUsingPOST(this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword, mid).then(resp => {
              this.set('notificationResponse', resp)
              if(this._notificationSuccess()){
                  this.dispatchEvent(new CustomEvent('notification-success', { detail: {ssin: _.get(resp, 'result.newlyRegisteredPerson.ssin', null), newlyRegisteredPerson: _.get(resp, 'result.newlyRegisteredPerson', null), status: _.get(resp, 'status', null)},  bubbles:true, composed:true }));
              }else{
                  _.size(_.get(resp, 'result.existingPersons.existingPersons', [])) ? this.dispatchEvent(new CustomEvent('notification-existing-persons', { detail: {notificationRequest: mid,  existingPersons: _.get(resp, 'result.existingPersons.existingPersons', []), status: _.get(resp, 'status', null)},  bubbles:true, composed:true })) : null
              }
          })
      }
  }

  _isBasedOnBirth(){
      return _.get(this.selectedRegisterType, 'type', null) === 'birth'
  }

  _isBaseOnResidentialAddressInBelgium(){
      return _.get(this.selectedRegisterType, 'type', null) === 'residentialAddressInBelgium'
  }

  _isBasedOnResidentialAddressOutOfBelgium(){
      return _.get(this.selectedRegisterType, 'type', null) === 'residentialAddressOutBelgium'
  }

  _getLabel(label){
      return _.get(label, this.language, label.en)
  }

  _comboboxValueChanged(){
      _.get(this, 'selectedBirthCountry', null) ? this.set('isCityOfBelgium', _.get(this.selectedBirthCountry, 'code', null) === "150.0") : null
      this.set('registerData.type', _.get(this.selectedRegisterType, 'type', null))
      this.set('registerData.birth.countryCode', _.get(this.selectedBirthCountry, 'code', null))
      this.set('registerData.birth.cityCode', _.get(this.selectedBirthMunicipality, 'code', null))
      this.set('registerData.person.gender', _.get(this.selectedGender, 'type', null))
      this.set('registerData.inBelgium.cityCode', _.get(this.selectedInBelgiumMunicipality, 'code', null))
      this.set('registerData.outBelgium.countryCode', _.get(this.selectedOutBelgiumCountry, 'code', null))
      this.set('filteredMunicipalities', _.sortBy(this.listOfMunicipality, ['code', 'label.'+this.language, 'id'], ['asc', 'asc', 'asc']))
      this.set('filteredCountries', _.sortBy(this.listOfCountries, ['code', 'label.'+this.language, 'id'], ['asc', 'asc', 'asc']))
  }

  _countryFilterChanged(){
      if(this.countryFilter){
          const keywordsString = _.trim(_.get(this,"countryFilter","")).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
          const keywordsArray = _.compact(_.uniq(_.map(keywordsString.split(" "), i=>_.trim(i))))
          setTimeout(() => {
              if(parseInt(_.get(keywordsString,"length",0)) > 2) {
                  const countrySearchResults =  _.chain(_.get(this, "listOfCountries", []))
                      .chain(_.get(this, "countryFilter", []))
                      .filter(i => _.size(keywordsArray) === _.size(_.compact(_.map(keywordsArray, keyword => _.trim(_.get(i, "normalizedSearchTerms", "")).indexOf(keyword) > -1))))
                      .compact()
                      .uniq()
                      .orderBy(['code', 'label.' + this.language, 'id'], ['asc', 'asc', 'asc'])
                      .value()
                  this.set('filteredCountries', _.sortBy(countrySearchResults, ['code', 'label.' + this.language, 'id'], ['asc', 'asc', 'asc']))
              }else{
                  this.set('filteredCountries', _.sortBy(this.listOfCountries, ['code', 'label.'+this.language, 'id'], ['asc', 'asc', 'asc']))
              }
          }, 100)
      }
  }

  _municipalityFilterChanged(){
      if(this.municipalityFilter){
          const keywordsString = _.trim(_.get(this,"municipalityFilter","")).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
          const keywordsArray = _.compact(_.uniq(_.map(keywordsString.split(" "), i=>_.trim(i))))
          setTimeout(() => {
              if(parseInt(_.get(keywordsString,"length",0)) > 2) {
                  const countrySearchResults =  _.chain(_.get(this, "listOfMunicipality", []))
                      .chain(_.get(this, "municipalityFilter", []))
                      .filter(i => _.size(keywordsArray) === _.size(_.compact(_.map(keywordsArray, keyword => _.trim(_.get(i, "normalizedSearchTerms", "")).indexOf(keyword) > -1))))
                      .compact()
                      .uniq()
                      .orderBy(['code', 'label.' + this.language, 'id'], ['asc', 'asc', 'asc'])
                      .value()
                  this.set('filteredMunicipalities', _.sortBy(countrySearchResults, ['code', 'label.' + this.language, 'id'], ['asc', 'asc', 'asc']))
              }else{
                  this.set('filteredMunicipalities', _.sortBy(this.listOfMunicipality, ['code', 'label.'+this.language, 'id'], ['asc', 'asc', 'asc']))
              }
          }, 100)
      }
  }

  _notificationSuccess(){
      return _.get(this.notificationResponse, 'status.statusCode.value', null) === "urn:be:fgov:ehealth:2.0:status:Success"
  }

  _isError(){
      return _.size(this.errorList) !== 0
  }
}
customElements.define(HtPatRnConsultNotification.is, HtPatRnConsultNotification);
