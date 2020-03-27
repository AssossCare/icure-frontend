/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../dynamic-form/validator/ht-iban-validator.js';

import '../../../styles/buttons-style.js';

import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-icon-button/paper-icon-button"
import "@polymer/paper-input/paper-input"

import _ from 'lodash/lodash';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtAdminAccountBank extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles buttons-style">
            :host {
                display: block;
            }

            :host *:focus{
                outline:0!important;
            }

            .bank-panel{
                height: 100%;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                position:relative;
            }

            #activeUsersListDiv{
                height: 25%;
            }

            #inactiveUsersListDiv{
                height: 25%;
            }

            #userInformationDialog{
                height: 500px;
                width: 900px;
            }

            .line {
                display: flex;
            }
            .line.p8 {
                padding: 0 8px;
                box-sizing: border-box;
            }
            .line.p16 {
                padding: 0 16px;
                box-sizing: border-box;
            }
            .line > * {
                flex-grow: 1;
            }
            .line > *.no-grow {
                flex-grow: 0;
            }
            .line > *.w50 {
                width: 50px;
            }
            .line > *.w100 {
                width: 100px;
            }
            .line > *.w150 {
                width: 150px;
            }
            .line > *.grow-3 {
                flex-grow: 3;
            }

            .line span.lang {
                padding-top: 20px;
                width: 80px !important;
            }

            .marginRight10 {
                margin-right:10px;
            }

            @media screen and (max-width: 1024px) {
                .nomobile {
                    display: none;
                }
                .onlymobile {
                    display: block;
                }
            }

            .bank-panel .panel-content {
                padding: 0 12px;
                overflow: hidden;
                border-bottom: 1px solid var(--app-background-color-dark);
                box-sizing: border-box;
                height: 400px;
                overflow-y: auto;
            }

            paper-tabs {
                background: var(--app-background-color);
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
                --paper-tabs: {
                    color: var(--app-text-color);
                };
            }

            paper-tab {
                --paper-tab-ink: var(--app-text-color);
            }

            paper-tab.iron-selected {
                font-weight: bold;
            }

            paper-tab.iron-selected iron-icon{
                opacity: 1;
            }

            paper-tab iron-icon{
                opacity: 0.5;
                color: var(--app-text-color);
            }

            :host {
                width: 100%!important;
            }

            .financialInstitutionInformationContainer {
                display: flex;
                flex-wrap: wrap;
                flex-direction: row;
                justify-content: space-between;
                align-items: center;
                align-content: space-between;
                width: 100%;
                /*min-height: 620px;*/
            }

            /*.financialInstitutionInformationContainer::after { content: ""; flex: auto; flex-basis: 30% }*/


            .singleFinancialInstitutionInformationContainer {
                position: relative;
                flex-basis: 30%;
                flex-grow: 1;
                background-color: var(--app-background-color);
                min-height: 200px;
                overflow: hidden;
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                padding-bottom: 8px;
                min-height:360px;
            }

            .singleFinancialInstitutionInformationContainer .header {
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                background: #fff;
                padding: 16px;
                width: 100%;
                box-sizing: border-box;
                margin: 0;
                height: 56px;
                font-size: 16px;
                font-weight: 700;
                text-align: left;
                color: var(--app-text-color);
            }

             .singleFinancialInstitutionInformationContainer .header iron-icon{
                opacity: .5;
                margin-right: 8px;
             }

            .singleFinancialInstitutionInformationContainer .header .delete {
                position: absolute;
                top: 50%;
                right: 4px;
                transform: translate(0, -50%);
            }
            .singleFinancialInstitutionInformationContainer .header .delete paper-icon-button{
                padding: 4px;
                height: 32px;
                width: 32px;
                color: var(--app-text-color-disabled);
                transition: color .12s cubic-bezier(.075,.82,.165,1);
            }
            .singleFinancialInstitutionInformationContainer .header .delete paper-icon-button:hover {
                color:var(--app-text-color);
            }

            paper-input{
                margin: 0 16px;
                --paper-input-container-focus-color: var(--app-primary-color);
                font-size:var(--form-font-size);
            }

            iron-icon{
                margin-right: 8px;
            }

            @media (max-width:940px) {
                .singleFinancialInstitutionInformationContainer { flex-basis:44%; }
                .button--save{ margin-top:30% }
            }

            .textAlignCenter { text-align: center; }

            .hidden, .fii_hidden { display:none }

        </style>

        <ht-iban-validator validator-name="ht-iban-validator"></ht-iban-validator>

        <div class="bank-panel">
            <h4>[[localize('my_pro', 'My profil', language)]] - [[localize('acc_bank_info', 'Bank informations', language)]]</h4>

            <div class="financialInstitutionInformationContainer" id="financialInstitutionInformationContainer">

                <template is="dom-repeat" items="{{hcp.financialInstitutionInformation}}">

                    <div class\$="singleFinancialInstitutionInformationContainer [[_getFiiCssDisplayClass(item, index)]]" id="fiiContainer_{{index}}">
                        <div class="header"><iron-icon icon="icons:payment" class=""></iron-icon>Compte [[_plusOne(index)]]<div class="delete"><paper-icon-button icon="delete" on-tap="_deleteFii" id="fii_{{index}}_delete"></paper-icon-button></div></div>
                        <paper-input step="{{index}}" label="[[localize('bank_account_label','Libellé compte bancaire',language)]]" value="{{item.name}}" id="fii_{{index}}_name"></paper-input>
                        <paper-input step="{{index}}" label="[[localize('bank_account_iban','Compta bancaire / IBAN',language)]]" value="{{item.bankAccount}}" id="fii_{{index}}_bankAccount" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic"></paper-input>
                        <paper-input step="{{index}}" label="BIC" value="{{item.bic}}" id="fii_{{index}}_bic" readonly=""></paper-input>
                        <paper-input step="{{index}}" label="[[localize('bank_account_iban','IBAN (tiers de confiance / non-requis)',language)]]" value="{{item.proxyBankAccount}}" id="fii_{{index}}_proxyBankAccount" validator="ht-iban-validator" auto-validate="" on-value-changed="_evalBic" on-tap="_evalBic"></paper-input>
                        <paper-input step="{{index}}" label="[[localize('bank_account_iban','BIC (tiers de confiance / non-requis)',language)]]" value="{{item.proxyBic}}" id="fii_{{index}}_proxyBic" readonly=""></paper-input>
                    </div>

                </template>

                <template is="dom-if" if="{{allowNewFii}}">
                    <div class="singleFinancialInstitutionInformationContainer textAlignCenter" id="newFiiContainer">
                        <div class="header"><iron-icon icon="icons:payment" class=""></iron-icon>Nouveau compte ?</div>
                        <paper-button on-tap="_addNewFinancialInformation" class="button button--save">
                            <iron-icon icon="icons:add-circle-outline" class=""></iron-icon>
                            [[localize('add_an_account','Ajouter un compte',language)]]
                        </paper-button>
                    </div>
                </template>

            </div>

        </div>
`;
  }

  static get is() {
      return 'ht-admin-account-bank'
  }

  static get properties() {
      return {
          api: {
              type: Object,
              noReset: true
          },
          user: {
              type: Object,
              noReset: true
          },
          fiiCount: {
              type: Number,
              value: 0
          },
          fiiMaxCount: {
              type: Number,
              value: 7
          },
          allowNewFii: {
              type: Boolean,
              value: true
          },
          visibleContainersCount: {
              type: Number,
              value: 0
          }
      }
  }

  static get observers() {
      return ['build(user, hcp)'];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  build() {

      // Make sure we're here
      if(!this.opened || !this.user || !this.hcp) return;

      // Assign
      this.fiiCount = ( typeof this.hcp.financialInstitutionInformation !== 'object' ) ? 0 : _.size(_.filter(this.hcp.financialInstitutionInformation, 'bankAccount')) || 0;

      // Happen entries should we miss some
      if( _.size(this.hcp.financialInstitutionInformation) < this.fiiMaxCount ) for (var i = this.fiiCount; i < this.fiiMaxCount; i++) this.hcp.financialInstitutionInformation.push({});

      // Can we add new ones ?
      this.allowNewFii = this.fiiCount < this.fiiMaxCount;

  }



  _plusOne(inputValue) { return parseInt( inputValue ) + 1; }
  _getFiiCssDisplayClass( item, index ) { return (typeof item.bankAccount !== 'undefined' && typeof item.bic !== 'undefined' ) ? '' : ' fii_hidden ' ; }



  // Resolve and assign BIC based on IBAN
  _evalBic( event, fieldObject ) {

      // Could be a click event / we wouldn't have any value here
      if( typeof fieldObject.value === 'undefined' ) return;

      // target & save
      var ibanFieldObject = (event.path || event.composedPath())[0];

      // Which one ?
      var fiiIndex = _.chain( ibanFieldObject.getAttribute('id') ).split('_').nth(1).value() || 1

      // Which one ?
      var fiiFieldType = _.chain( ibanFieldObject.getAttribute('id') ).split('_').nth(2).value() + '' === 'bankAccount' ? 'bic' : 'proxyBic';

      // Get bic based on iban
      var bicValue = this.api.getBicByIban( fieldObject.value || '' );

      // Do affect
      _.assign( { fiiFieldType: bicValue }, this.hcp.financialInstitutionInformation[fiiIndex] );
      this.shadowRoot.querySelector( '#fii_' + fiiIndex + '_' + fiiFieldType ).value = bicValue;

  }



  getVisibleFiiCount() { return _.size(this.shadowRoot.querySelectorAll('.singleFinancialInstitutionInformationContainer:not(.fii_hidden):not(#newFiiContainer)') ) || 0; }



  _addNewFinancialInformation() {

      // Get visible boxes we have so far
      this.visibleContainersCount = this.getVisibleFiiCount();

      // Target the one we should show
      let targetObjectToShow = this.shadowRoot.querySelector('#fiiContainer_' + this.visibleContainersCount );

      // Display new box
      if( targetObjectToShow ) targetObjectToShow.classList.remove('fii_hidden');

      // Eval again after modification
      this.visibleContainersCount = this.getVisibleFiiCount();

      // Reached max ?
      if( parseInt( this.visibleContainersCount ) === this.fiiMaxCount ) {

          // Hide "add new"
          this.shadowRoot.querySelector('#newFiiContainer').classList.add('hidden');

          // Don't
          this.allowNewFii = false;

      }

  }



  _deleteFii( event, fieldObject ) {

      let targetContainer = _.chain(event.path || event.composedPath()).filter((item)=>{ return /(?:.*)singleFinancialInstitutionInformationContainer(?:.*)/.exec(item.className) }).head().value();

      // Which one ?
      let fiiIndex = _.chain( targetContainer.getAttribute('id') ).split('_').nth(1).value() || 1;

      // Do hide
      if( targetContainer ) targetContainer.classList.add('fii_hidden');

      // Drop values
      this.hcp.financialInstitutionInformation[fiiIndex] = {};

      // Target
      let fieldsListToReset = this.shadowRoot.querySelectorAll( 'paper-input[id^="fii_' + fiiIndex + '_"' );

      // Do reset
      _.forEach(fieldsListToReset,(item)=>item.value='');

      // Allow again
      this.shadowRoot.querySelector('#newFiiContainer').classList.remove('hidden');

      // Don't
      this.allowNewFii = true;

  }

  _evalBic( event, fieldObject ) {

      // Could be a click event / we wouldn't have any value here
      if( typeof fieldObject.value === 'undefined' ) return;

      // target & save
      var ibanFieldObject = (event.path || event.composedPath())[0];

      // Target (100,200,300,400,500,600,900)
      var oaValue = parseInt( ibanFieldObject.getAttribute('rel') );

      // Get bic based on iban
      var bicValue = this.api.getBicByIban( fieldObject.value || '' );

      // Assign bic value back, should we have any
      if( ( bicValue+'').length ) {

          if(oaValue==100) this.userBIC_100 = bicValue;
          if(oaValue==200) this.userBIC_200 = bicValue;
          if(oaValue==300) this.userBIC_300 = bicValue;
          if(oaValue==400) this.userBIC_400 = bicValue;
          if(oaValue==500) this.userBIC_500 = bicValue;
          if(oaValue==600) this.userBIC_600 = bicValue;
          if(oaValue==900) this.userBIC_900 = bicValue;

      }
  }
}

customElements.define(HtAdminAccountBank.is, HtAdminAccountBank)
