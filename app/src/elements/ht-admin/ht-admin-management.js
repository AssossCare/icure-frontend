/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import './management/ht-admin-management-delegations.js';

import './management/ht-admin-management-groups.js';
import './management/ht-admin-management-users.js';
import './management/ht-admin-management-parent.js';
import './management/ht-admin-management-facturation-flat-rate.js';
import './management/ht-admin-management-facturation-service-fee.js';
import './management/ht-admin-management-forms.js';
import './management/ht-admin-management-export-users-mda'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class HtAdminManagement extends TkLocalizerMixin(PolymerElement) {
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


        <template is="dom-if" if="[[groupsManagementLayout]]">
            <ht-admin-management-groups id="admin-management-groups" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-management-groups>
        </template>
        
        <template is="dom-if" if="[[exportUsersMdaLayout]]">
            <ht-admin-management-export-users-mda id="admin-management-export-users-mda" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-management-export-users-mda>
        </template>


        <template is="dom-if" if="[[usersManagementLayout]]">
            <ht-admin-management-users id="admin-management-users" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-management-users>
        </template>

        <template is="dom-if" if="[[parentManagementLayout]]">
            <ht-admin-management-parent id="admin-management-parent" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-management-parent>
        </template>

        <template is="dom-if" if="[[delegationsManagementLayout]]">
            <ht-admin-management-delegations id="admin-management-delegations" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-management-delegations>
        </template>

        <template is="dom-if" if="[[facturationServiceFeeManagementLayout]]">
            <ht-admin-management-facturation-service-fee id="admin-management-facturation-service-fee" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-management-facturation-service-fee>
        </template>

        <template is="dom-if" if="[[facturationFlatRateManagementLayout]]">
            <ht-admin-management-facturation-flat-rate id="admin-management-facturation-flat-rate" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-management-facturation-flat-rate>
        </template>

        <template is="dom-if" if="[[formsManagementLayout]]">
            <ht-admin-management-forms id="admin-management-forms" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" user="[[user]]"></ht-admin-management-forms>
        </template>
`;
  }

  static get is() {
      return 'ht-admin-management'
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
              observer: '_selectedManagementSubMenuChanged'
          },
          groupsManagementLayout:{
              type: Boolean,
              value: false
          },
          usersManagementLayout:{
              type: Boolean,
              value: false
          },
          exportUsersMdaLayout:{
              type: Boolean,
              value: false
          },
          parentManagementLayout:{
              type: Boolean,
              value: false
          },
          delegationsManagementLayout:{
              type: Boolean,
              value: false
          },
          facturationServiceFeeManagementLayout:{
              type: Boolean,
              value: false
          },
          facturationFlatRateManagementLayout:{
              type: Boolean,
              value: false
          },
          formsManagementLayout:{
              type: Boolean,
              value: false
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

  _selectedManagementSubMenuChanged(){

      if(this.selectedSubMenu === "groupsManagementSubMenu"){
          this.set('groupsManagementLayout', true)
          this.set('usersManagementLayout', false)
          this.set('exportUsersMdaLayout', false)
          this.set('parentManagementLayout', false)
          this.set('delegationsManagementLayout', false)
          this.set('facturationServiceFeeManagementLayout', false)
          this.set('facturationFlatRateManagementLayout', false)
          this.set('formsManagementLayout', false)
      }else if(this.selectedSubMenu === "usersManagementSubMenu"){
          this.set('groupsManagementLayout', false)
          this.set('usersManagementLayout', true)
          this.set('exportUsersMdaLayout', false)
          this.set('parentManagementLayout', false)
          this.set('delegationsManagementLayout', false)
          this.set('facturationServiceFeeManagementLayout', false)
          this.set('facturationFlatRateManagementLayout', false)
          this.set('formsManagementLayout', false)
      }else if(this.selectedSubMenu === "exportUsersMdaSubMenu"){
          this.set('groupsManagementLayout', false)
          this.set('usersManagementLayout', false)
          this.set('exportUsersMdaLayout', true)
          this.set('parentManagementLayout', false)
          this.set('delegationsManagementLayout', false)
          this.set('facturationServiceFeeManagementLayout', false)
          this.set('facturationFlatRateManagementLayout', false)
          this.set('formsManagementLayout', false)
      }else if(this.selectedSubMenu === "parentManagementSubMenu"){
          this.set('groupsManagementLayout', false)
          this.set('usersManagementLayout', false)
          this.set('exportUsersMdaLayout', false)
          this.set('parentManagementLayout', true)
          this.set('delegationsManagementLayout', false)
          this.set('facturationServiceFeeManagementLayout', false)
          this.set('facturationFlatRateManagementLayout', false)
          this.set('formsManagementLayout', false)
      }else if(this.selectedSubMenu === "delegationsManagementSubMenu"){
          this.set('groupsManagementLayout', false)
          this.set('usersManagementLayout', false)
          this.set('exportUsersMdaLayout', false)
          this.set('parentManagementLayout', false)
          this.set('delegationsManagementLayout', true)
          this.set('facturationServiceFeeManagementLayout', false)
          this.set('facturationFlatRateManagementLayout', false)
          this.set('formsManagementLayout', false)
      }else if(this.selectedSubMenu === "facturationServiceFeeManagementSubMenu"){
          this.set('groupsManagementLayout', false)
          this.set('usersManagementLayout', false)
          this.set('exportUsersMdaLayout', false)
          this.set('parentManagementLayout', false)
          this.set('delegationsManagementLayout', false)
          this.set('facturationServiceFeeManagementLayout', true)
          this.set('facturationFlatRateManagementLayout', false)
          this.set('formsManagementLayout', false)
      }else if(this.selectedSubMenu === "facturationFlatRateManagementSubMenu"){
          this.set('groupsManagementLayout', false)
          this.set('usersManagementLayout', false)
          this.set('exportUsersMdaLayout', false)
          this.set('parentManagementLayout', false)
          this.set('delegationsManagementLayout', false)
          this.set('facturationServiceFeeManagementLayout', false)
          this.set('facturationFlatRateManagementLayout', true)
          this.set('formsManagementLayout', false)
      }else if(this.selectedSubMenu === "formsManagementSubMenu"){
          this.set('groupsManagementLayout', false)
          this.set('usersManagementLayout', false)
          this.set('exportUsersMdaLayout', false)
          this.set('parentManagementLayout', false)
          this.set('delegationsManagementLayout', false)
          this.set('facturationServiceFeeManagementLayout', false)
          this.set('facturationFlatRateManagementLayout', false)
          this.set('formsManagementLayout', true)
      }

  }
}

customElements.define(HtAdminManagement.is, HtAdminManagement)
