/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import './account/ht-admin-account-preferences.js';

import './account/ht-admin-account-bank.js';
import './account/ht-admin-account-delegations.js';
import './account/ht-admin-account-edmg.js';
import './account/ht-admin-account-informations.js';
import './account/ht-admin-account-electron.js';
import './account/ht-admin-account-printers.js';
import './account/ht-admin-account-agenda.js';
import './account/ht-admin-account-invoice.js';

import moment from 'moment/src/moment';
import _ from 'lodash/lodash';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtAdminAccount extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles">
            :host {
                display: block;
            }

            :host *:focus{
                outline:0!important;
            }

            .col-left{
                position: relative;
                box-sizing: border-box;
                grid-column: 1 / 1;
                grid-row: 1 / 1;
                background:var(--app-background-color-dark);
                @apply --shadow-elevation-3dp;
                padding: 24px 0;
                display:flex;
                flex-flow: column nowrap;
                align-items: center;
                height: 100%;
                width: 100%;
                overflow-y: auto;
                overflow-x: hidden;
                z-index: 25;
            }


        </style>

        <template is="dom-if" if="[[preferencesLayout]]">
            <ht-admin-account-preferences id="admin-account-preferences" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-account-preferences>
        </template>

        <template is="dom-if" if="[[edmgInformationLayout]]">
            <ht-admin-account-edmg id="admin-account-edmg" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-account-edmg>
        </template>

        <template is="dom-if" if="[[printersInformationLayout]]">
            <ht-admin-account-printers id="admin-account-printers" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]" socket="[[socket]]"></ht-admin-account-printers>
        </template>
        
        <template is="dom-if" if="[[configurationElectronLayout]]">
            <ht-admin-account-electron id="admin-account-electron" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]" socket="[[socket]]"></ht-admin-account-electron>
        </template>

        <template is="dom-if" if="[[accountInformationsLayout]]">
            <ht-admin-account-informations id="admin-account-informations" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-account-informations>
        </template>

        <template is="dom-if" if="[[bankInformationsLayout]]">
            <ht-admin-account-bank id="admin-account-bank" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-account-bank>
        </template>

        <template is="dom-if" if="[[delegationLayout]]">
            <ht-admin-account-delegations id="admin-account-delegations" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-account-delegations>
        </template>

        <template is="dom-if" if="[[agendaLayout]]">
            <ht-admin-account-agenda id="admin-account-agenda" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-account-agenda>
        </template>

        <template is="dom-if" if="[[invoiceLayout]]">
            <ht-admin-account-invoice id="admin-account-invoice" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-account-invoice>
        </template>
`;
  }

  static get is() {
      return 'ht-admin-account'
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
          selectedSubMenu: {
              type: String,
              observer: '_selectedAccountSubMenuChanged'
          },
          preferencesLayout:{
              type: Boolean,
              value: false
          },
          edmgInformationLayout:{
              type: Boolean,
              value: false
          },
          printersInformationLayout:{
              type: Boolean,
              value: false
          },
          configurationElectronLayout:{
              type: Boolean,
              value: false
          },
          accountInformationsLayout:{
              type: Boolean,
              value: false
          },
          bankInformationsLayout:{
              type: Boolean,
              value: false
          },
          delegationLayout:{
              type: Boolean,
              value: false
          },
          socket : {
              type : Object,
              value: {}
          }

      }
  }

  static get observers() {
      return [];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  _selectedAccountSubMenuChanged(){

      if(this.selectedSubMenu === "preferencesSubMenu"){
          this.set('preferencesLayout', true)
          this.set('edmgInformationLayout', false)
          this.set('printersInformationLayout', false)
          this.set('accountInformationsLayout', false)
          this.set('bankInformationsLayout', false)
          this.set('delegationLayout', false)
          this.set('agendaLayout', false)
          this.set('invoiceLayout', false)
          this.set('configurationElectronLayout', false)
      }else if(this.selectedSubMenu === "edmgInformationSubMenu"){
          this.set('preferencesLayout', false)
          this.set('edmgInformationLayout', true)
          this.set('printersInformationLayout', false)
          this.set('accountInformationsLayout', false)
          this.set('bankInformationsLayout', false)
          this.set('delegationLayout', false)
          this.set('agendaLayout', false)
          this.set('invoiceLayout', false)
          this.set('configurationElectronLayout', false)
      }else if (this.selectedSubMenu === "printersInformationSubMenu"){
          this.set('preferencesLayout', false)
          this.set('edmgInformationLayout', false)
          this.set('printersInformationLayout', true)
          this.set('accountInformationsLayout', false)
          this.set('bankInformationsLayout', false)
          this.set('delegationLayout', false)
          this.set('agendaLayout', false)
          this.set('invoiceLayout', false)
          this.set('configurationElectronLayout', false)
      }else if (this.selectedSubMenu === "configurationElectronSubMenu"){
          this.set('preferencesLayout', false)
          this.set('edmgInformationLayout', false)
          this.set('printersInformationLayout', false)
          this.set('configurationElectronLayout', true)
          this.set('accountInformationsLayout', false)
          this.set('bankInformationsLayout', false)
          this.set('delegationLayout', false)
          this.set('agendaLayout', false)
          this.set('invoiceLayout', false)
      }else if(this.selectedSubMenu === "accountInformationSubMenu"){
          this.set('preferencesLayout', false)
          this.set('edmgInformationLayout', false)
          this.set('printersInformationLayout', false)
          this.set('accountInformationsLayout', true)
          this.set('bankInformationsLayout', false)
          this.set('delegationLayout', false)
          this.set('agendaLayout', false)
          this.set('invoiceLayout', false)
          this.set('configurationElectronLayout', false)
      }else if(this.selectedSubMenu === "bankInformationsSubMenu"){
          this.set('preferencesLayout', false)
          this.set('edmgInformationLayout', false)
          this.set('printersInformationLayout', false)
          this.set('accountInformationsLayout', false)
          this.set('bankInformationsLayout', true)
          this.set('delegationLayout', false)
          this.set('agendaLayout', false)
          this.set('invoiceLayout', false)
          this.set('configurationElectronLayout', false)
      }else if(this.selectedSubMenu === "myDelegationsSubMenu"){
          this.set('preferencesLayout', false)
          this.set('edmgInformationLayout', false)
          this.set('printersInformationLayout', false)
          this.set('accountInformationsLayout', false)
          this.set('bankInformationsLayout', false)
          this.set('delegationLayout', true)
          this.set('agendaLayout', false)
          this.set('invoiceLayout', false)
          this.set('configurationElectronLayout', false)
      }else if(this.selectedSubMenu === "agendaSubMenu"){
          this.set('preferencesLayout', false)
          this.set('edmgInformationLayout', false)
          this.set('printersInformationLayout', false)
          this.set('accountInformationsLayout', false)
          this.set('bankInformationsLayout', false)
          this.set('delegationLayout', false)
          this.set('agendaLayout', true)
          this.set('invoiceLayout', false)
          this.set('configurationElectronLayout', false)
      }else if(this.selectedSubMenu === "invoiceSubMenu"){
          this.set('preferencesLayout', false)
          this.set('edmgInformationLayout', false)
          this.set('printersInformationLayout', false)
          this.set('accountInformationsLayout', false)
          this.set('bankInformationsLayout', false)
          this.set('delegationLayout', false)
          this.set('agendaLayout', false)
          this.set('invoiceLayout', true)
          this.set('configurationElectronLayout', false)
      }
  }
}

customElements.define(HtAdminAccount.is, HtAdminAccount)
