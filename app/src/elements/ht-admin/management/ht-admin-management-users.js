/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../../styles/dialog-style.js';

import '../../../styles/buttons-style.js';
import '../../../styles/paper-input-style.js';
import '../../../styles/paper-tabs-style.js';

import "@polymer/iron-icon/iron-icon"
import "@polymer/iron-pages/iron-pages"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-dropdown-menu/paper-dropdown-menu"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-item/paper-item"
import "@polymer/paper-listbox/paper-listbox"
import "@polymer/paper-tabs/paper-tabs"
import "@vaadin/vaadin-checkbox/vaadin-checkbox"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"

import _ from 'lodash/lodash';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtAdminManagementUsers extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles dialog-style buttons-style paper-input-style paper-tabs-style">
            :host {
                display: block;
                height: 100%;
            }

            :host *:focus{
                outline:0!important;
            }

            .users-panel{
                height: 100%;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                position:relative;

                display: flex;
                flex-direction: column;
            }

            .panel-title {
                margin-bottom: 0;
            }

            .content{
                padding: 0 12px;
            }

            .grid {
                min-height: 0;
            }

            .grids-section {
                display: flex;
                flex-direction: column;
                flex: 1;
            }

            #userInformationDialog{
                height: calc(485px + 45px + 48px);
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




            .input{
                margin: 12px;
            }

        </style>

        <div class="users-panel">
            <h4 class="panel-title">[[localize('man_usr', 'Management - Users', language)]]</h4>

            <div id="activeUsersListDiv" class="grids-section">
                <h4>[[localize('usr_act', 'Active users', language)]]</h4>
                <vaadin-grid id="activeUsersList" class="material grid" items="[[listOfActiveUsers]]" active-item="{{selectedUser}}">
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('Id','Id',language)]]
                        </template>
                        <template>
                            <div>[[item.healthcarePartyId]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('name','Name',language)]]
                        </template>
                        <template>
                            <div>[[item.name]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('login','Login',language)]]
                        </template>
                        <template>
                            <div>[[item.login]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('crea_date','Create date',language)]]
                        </template>
                        <template>
                            <div>[[_getDateAsString(item.createdDate)]]</div>
                        </template>
                    </vaadin-grid-column>
                </vaadin-grid>
            </div>

            <div id="inactiveUsersListDiv" class="grids-section">
                <h4>[[localize('usr_in', 'inactive users', language)]]</h4>
                <vaadin-grid id="inactiveUsersList" class="material grid" items="[[listOfInactiveUsers]]" active-item="{{selectedUser}}">
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('Id','Id',language)]]
                        </template>
                        <template>
                            <div>[[item.healthcarePartyId]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('name','Name',language)]]
                        </template>
                        <template>
                            <div>[[item.name]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('login','Login',language)]]
                        </template>
                        <template>
                            <div>[[item.login]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('crea_date','Create date',language)]]
                        </template>
                        <template>
                            <div>[[_getDateAsString(item.createdDate)]]</div>
                        </template>
                    </vaadin-grid-column>
                </vaadin-grid>
            </div>

        </div>

        <paper-dialog id="userInformationDialog">
           <h2 class="modal-title">
                <paper-tabs selected="{{tabs}}">
                    <paper-tab id="tab-userInformation" class="adm-tab"><iron-icon icon="vaadin:user" class="marginRight10"></iron-icon><span class="nomobile">[[localize('user_info','User informations',language)]]</span></paper-tab>
                    <paper-tab id="tab-delegations" class="adm-tab"><iron-icon icon="vaadin:key" class="marginRight10"></iron-icon><span class="nomobile">[[localize('usr_deleg','User delegations',language)]]</span></paper-tab>
                </paper-tabs>
           </h2>

            <iron-pages selected="[[tabs]]" class="content panel-content">
                <page>
                    <h4>Informations générales</h4>
                    <div class="line">
                        <paper-input class="input" label="Id" value="{{selectedUser.id}}" readonly=""></paper-input>
                        <paper-input class="input" label="Hcp id" value="{{selectedUser.healthcarePartyId}}" readonly=""></paper-input>
                    </div>
                    <div class="line">
                        <paper-input class="input" label="[[localize('login', 'Login', language)]]" value="{{selectedUser.login}}" readonly=""></paper-input>
                        <paper-input class="input" label="[[localize('email', 'Email', language)]]" value="{{selectedUser.email}}" readonly=""></paper-input>
                    </div>
                    <div class="line">
                        <paper-input class="input" label="[[localize('fir_nam', 'First name', language)]]" value="{{selectedUserHcp.firstName}}" readonly=""></paper-input>
                        <paper-input class="input" label="[[localize('las_nam', 'Last name', language)]]" value="{{selectedUserHcp.lastName}}" readonly=""></paper-input>
                    </div>
                    <div class="line">
                        <paper-input class="input" label="[[localize('inami', 'Nihii', language)]]" value="{{selectedUserHcp.nihii}}" readonly=""></paper-input>
                        <paper-input class="input" label="[[localize('niss', 'Niss', language)]]" value="{{selectedUserHcp.niss}}" readonly=""></paper-input>
                    </div>
                    <h4>Statut</h4>
                    <div class="line">
                        <vaadin-checkbox checked="{{isAdministrator}}" on-checked-changed="_administratorRoleChanged">[[localize('adm','Administrator',language)]]</vaadin-checkbox>
                        <vaadin-checkbox checked="{{agendaCreated}}" disabled="">[[localize('agd_crea','Agenda created',language)]]</vaadin-checkbox>
                        <paper-dropdown-menu class="input" label="[[localize('status','Status',language)]]">
                            <paper-listbox slot="dropdown-content" selected="{{selectedUser.status}}" attr-for-selected="id" selected-item="{{userStatus}}" on-selected-changed="_selectedUserStatusChanged">
                                <paper-item id="ACTIVE">[[localize('user_act','Active',language)]]</paper-item>
                                <paper-item id="DISABLED">[[localize('user_in','Disabled',language)]]</paper-item>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </div>
                    <h4>Type de prestataire</h4>
                    <div class="line">
                        <paper-dropdown-menu class="input" label="[[localize('stat','Type',language)]]">
                            <paper-listbox slot="dropdown-content" selected="{{selectedUserHcp.type}}" attr-for-selected="id" selected-item="{{selectedHcpType}}" on-selected-changed="_selectedHcpStatusChanged">
                                <paper-item id="persphysician">[[localize('prest','Prestataire',language)]]</paper-item>
                                <paper-item id="medicalhouse">[[localize('medical_house','Medical house',language)]]</paper-item>
                            </paper-listbox>
                        </paper-dropdown-menu>
                        <paper-dropdown-menu class="input" label="[[localize('spe','Speciality',language)]]">
                            <paper-listbox slot="dropdown-content" selected="{{selectedHcpSpecialityIdx}}" selected-item="{{selectedHcpSpeciality}}" on-selected-changed="_hcpSpecialityChanged">
                                <template is="dom-repeat" items="[[hcpartyList]]" as="hcparty">
                                    <paper-item id="[[hcparty.id]]">[[_getLabel(hcparty.label)]]</paper-item>
                                </template>
                            </paper-listbox>
                        </paper-dropdown-menu>
                    </div>
                </page>
                <page>
                    <vaadin-grid id="delegationList" class="material" items="[[selectedUserlistOfDelegations]]">
                        <vaadin-grid-column>
                            <template class="header">
                                [[localize('name','Name',language)]]
                            </template>
                            <template>
                                <div>[[item.firstName]] [[item.lastName]]</div>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column>
                            <template class="header">
                                [[localize('deleg_user_type','User type',language)]]
                            </template>
                            <template>
                                <div>[[item.type]]</div>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column>
                            <template class="header">
                                [[localize('deleg_type','Delegation type',language)]]
                            </template>
                            <template>
                                <div>[[item.delegationType]]</div>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column>
                            <template class="header">
                                [[localize('Id','Id',language)]]
                            </template>
                            <template>
                                <div>[[item.id]]</div>
                            </template>
                        </vaadin-grid-column>

                    </vaadin-grid>
                </page>
            </iron-pages>
            <div class="buttons">
                <paper-button class="button" dialog-dismiss="">[[localize('can','Cancel',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_saveUser">[[localize('save','Save',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-admin-management-users'
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
          listOfActiveUsers:{
              type: Object,
              value: () => []
          },
          listOfInactiveUsers:{
              type: Object,
              value: () => []
          },
          selectedUser: {
              type: Object,
              value: () => {}
          },
          selectedUserHcp:{
              type: Object,
              value: () => {}
          },
          tabs: {
              type: Number,
              value: 0
          },
          selectedUserlistOfDelegations:{
              type: Object,
              value: () => []
          },
          userStatus:{
              type: Object,
              value: () => {}
          },
          agendaCreated:{
              type: Boolean,
              value : false
          },
          agendaType:{
              type: Object,
              value: () => {}
          },
          isAdministrator:{
              type: Boolean,
              value : false
          },
          selectedHcpSpeciality:{
              type: Object,
              value: () => {}
          },
          hcpartyList:{
              type: Object,
              value: () => []
          },
          selectedHcpSpecialityIdx : {
              type: Number,
              value: 0
          },
          selectedHcpType:{
              type: Object,
              value: () => {}
          }
      }
  }

  static get observers() {
      return ['_usersDataProvider(user)', '_selectedUserChanged(selectedUser)'];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  _usersDataProvider(){
      this.api.code().findPaginatedCodesByLabel('be', 'CD-HCPARTY', 'fr', 'pers', null, null, 1000)
          .then(hcpList => this.set('hcpartyList', _.uniqBy(_.orderBy(hcpList.rows, ['label.fr'], ['asc']), 'code')))
          .then(() =>  this.api.user().listUsers())
          .then(users => {
              this.set('listOfActiveUsers', users.rows.filter(usr => usr.status === 'ACTIVE'))
              this.set('listOfInactiveUsers', users.rows.filter(usr => usr.status === 'DISABLED'))
          })
  }

  _selectedUserChanged(){
      if(this.selectedUser && this.selectedUser.healthcarePartyId){
          this.set('selectedUserlistOfDelegations', [])
          this.set('selectedUserHcp', {})
          this.set('agendaCreated', false)
          this.set('isAdministrator', false)
          this.set('selectedHcpSpecialityIdx', null)
          this.set('selectedHcpType', {})

          const applicationTokens = _.get(this.selectedUser, "applicationTokens", "" )
          const mikronoUrl = this.selectedUser && this.selectedUser.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url") && this.selectedUser.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url").typedValue.stringValue || null
          const mikronoUser = this.selectedUser && this.selectedUser.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user") && this.selectedUser.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user").typedValue.stringValue || null
          const mikronoPassword = this.selectedUser && this.selectedUser.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password") && this.selectedUser.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password").typedValue.stringValue || null

          mikronoUrl && mikronoUser && mikronoPassword && applicationTokens && applicationTokens.MIKRONO ?  this.set('agendaCreated', true) :  this.set('agendaCreated', false)

          this.selectedUser.roles && this.selectedUser.roles.find(r => r === 'ADMIN' || r === 'MS-ADMIN') ? this.set('isAdministrator', true) : this.set('isAdministrator', false)


          this.api.hcparty().getHealthcareParty(this.selectedUser.healthcarePartyId)
              .then(hcp => this.set('selectedUserHcp', hcp))
              .then(() => Object.keys(this.selectedUser.autoDelegations).length > 0 ? this.api.hcparty().getHealthcareParties(_(_.flatten(Object.keys(this.selectedUser.autoDelegations).map(key => this.selectedUser.autoDelegations[key]))).uniq().value().map(del => del).join(',')) : Promise.resolve([]))
              .then(delegatesHcp => {
                  Object.keys(this.selectedUser.autoDelegations).forEach(key => {
                      this.selectedUser.autoDelegations[key].map(hcp => this.push('selectedUserlistOfDelegations', _.assign((delegatesHcp.find(dhcp => hcp === dhcp.id)), {delegationType: key})))
                  })
              })
              .finally(() => {
                  const specilityCode = this.selectedUserHcp && this.selectedUserHcp.specialityCodes || []
                  const hcpartyType = specilityCode && specilityCode.find(spec => spec.type === "CD-HCPARTY") || null

                  hcpartyType ? this.set('selectedHcpSpecialityIdx', hcpartyType && this.hcpartyList && this.hcpartyList.findIndex(hcp => hcp.id === hcpartyType.id) || null) : null

                  this.shadowRoot.querySelector('#userInformationDialog') ? this.shadowRoot.querySelector('#userInformationDialog').open() : null
                  this.set('tabs',tab>0?tab:0)
              })
      }
  }

  _getDateAsString(date){
      return date ? this.api.moment(date).format('DD/MM/YYYY') : null
  }

  _selectedUserStatusChanged(){
      this.selectedUser && this.userStatus && this.userStatus.id ?  this.set('selectedUser.status', this.userStatus.id) : null
  }

  _saveUser(){
      this.api.user().modifyUser(this.selectedUser)
          .then(selectedUser => this.set('selectedUser', selectedUser))
          .then(() => this.api.hcparty().modifyHealthcareParty(this.selectedUserHcp))
          .then(hcp => this.set('selectedUserHcp', hcp))
          .then(() => this.api.user().listUsers())
          .then(users => {
              this.set('listOfActiveUsers', users.rows.filter(usr => usr.status === 'ACTIVE'))
              this.set('listOfInactiveUsers', users.rows.filter(usr => usr.status === 'DISABLED'))
              this.shadowRoot.querySelector('#userInformationDialog') ? this.shadowRoot.querySelector('#userInformationDialog').close() : null
          })
  }

  _hcpSpecialityChanged(){
      if(this.selectedUserHcp && this.selectedHcpSpeciality && this.selectedHcpSpeciality.id){

          const selectedSpeciality = this.hcpartyList.find(hcp => hcp.id === this.selectedHcpSpeciality.id) || null

          const specialityCodes = this.selectedUserHcp.specialityCodes || []

          specialityCodes.length === 0 ? _.assign(this.selectedUserHcp, {specialityCodes: []}) : null

          const hcpartySpeciality = specialityCodes.find(sc => sc.type === 'CD-HCPARTY') || null

          if(hcpartySpeciality){
              this.splice('selectedUserHcp.specialityCodes', _.indexOf(specialityCodes, hcpartySpeciality), 1)
              this.push('selectedUserHcp.specialityCodes', _.omit(selectedSpeciality, 'rev'))
          }else{
              this.push('selectedUserHcp.specialityCodes', _.omit(selectedSpeciality, 'rev'))
          }

          console.log(this.selectedUserHcp)

      }
  }

  _administratorRoleChanged(e){
      if(this.selectedUser && e.detail){
          if(e.detail.value === true){
              this.push('selectedUser.roles', 'ADMIN')
          }else{
              const idx = this.selectedUser.roles && _.indexOf(this.selectedUser.roles, this.selectedUser.roles.find(r => r === 'ADMIN' || r === 'MS-ADMIN')) || null
              this.splice('selectedUser.roles', idx, 1)
          }
      }
  }

  _getLabel(label){
      return label && this.language && label[this.language]
  }

  _selectedHcpStatusChanged(){
      if(this.selectedUserHcp && this.selectedHcpType && this.selectedHcpType.id){
          this.set('selectedUserHcp.type', this.selectedHcpType.id)
      }
  }
}

customElements.define(HtAdminManagementUsers.is, HtAdminManagementUsers)
