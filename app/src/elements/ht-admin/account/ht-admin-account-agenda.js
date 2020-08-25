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

import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-icon-button/paper-icon-button"
import "@vaadin/vaadin-checkbox/vaadin-checkbox"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"

import _ from 'lodash/lodash';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtAdminAccountAgenda extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles dialog-style buttons-style">
            :host {
                display: block;
            }

            :host *:focus{
                outline:0!important;
            }

            .agenda-panel{
                height: 100%;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                position:relative;
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

            paper-input{
                margin: 0 16px;
                --paper-input-container-focus-color: var(--app-primary-color);
                font-size:var(--form-font-size);
            }

            iron-icon{
                margin-right: 8px;
            }

            .textAlignCenter { text-align: center; }

            .hidden, .fii_hidden { display:none }

            #addDisplayedAgendaDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .trashIcon{
                height: 14px;
                width: 14px;
            }

            .btnDiv{
                text-align: right;
            }

            .buttons{
                display: flex;
                flex-grow: 1;
                box-sizing: border-box;
                justify-content: flex-end;
                padding-top: 16px;
            }

            #agendaListDialog{
                height: calc(100% - 10px);
                overflow: auto;
            }

            .listOfAgenda{
                margin-top: 0px!important;
                height: calc(100% - 101px);
                width: auto;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                position: relative;
            }

            .agenda-panel h4{
                display: flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
            }

           
        </style>

        <ht-iban-validator validator-name="ht-iban-validator"></ht-iban-validator>

        <div class="agenda-panel">
            <h4>[[localize('my_pro', 'My profil', language)]] - [[localize('acc_agenda_info', 'agenda information', language)]]</h4>
            <div class="agendaContainer" id="agendaContainer">
                <h4>[[localize('list_of_vis_dia', 'List of visible diary in Mikrono', language)]]<paper-icon-button class="button--icon-btn" icon="icons:add-circle" on-tap="_addAgenda"></paper-icon-button></h4>
                <div>
                    <vaadin-grid id="agendaList" class="material" items="[[listOfVisibleAgendas]]">
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
                            </template>
                            <template>
                                <div class="btnDiv">
                                    <iron-icon icon="vaadin:trash" class="trashIcon" on-tap="_hiddenAgenda" data-item\$="[[item]]"></iron-icon>
                                </div>
                            </template>
                        </vaadin-grid-column>
                    </vaadin-grid>
                </div>
            </div>
        </div>

        <paper-dialog id="addDisplayedAgendaDialog">
            <h2 class="modal-title">[[localize('add_diary', 'Add diary', language)]]</h2>
            <div class="listOfAgenda">
                <vaadin-grid id="agendaListDialog" class="material" items="[[listOfActivesUsersWithAgenda]]">
                    <vaadin-grid-column width="4%">
                        <template class="header"></template>
                        <template>
                            <vaadin-checkbox class="checkbox" id="[[item.id]]" checked="[[_sharingAgenda(item, listOfActivesUsersWithAgenda.*)]]" on-checked-changed="_checkAgenda"></vaadin-checkbox>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column width="85%">
                        <template class="header">
                            [[localize('name','Name',language)]]
                        </template>
                        <template>
                            <div>[[item.name]]</div>
                        </template>
                    </vaadin-grid-column>
                </vaadin-grid>
            </div>
            <div class="buttons">
                <paper-button class="button" dialog-dismiss="">[[localize('can','Cancel',language)]]</paper-button>
                <paper-button class="button button--save" dialog-confirm="" autofocus="" on-tap="confirmSharingAgenda">[[localize('add','Add',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-admin-account-agenda'
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
          listOfActivesUsersWithAgenda:{
              type: Array,
              value: () => []
          },
          listOfVisibleAgendas:{
              type: Array,
              value: () => []
          },
          selectedAgendasToBeVisible: {
              type: Object,
              notify: true,
              value: () => []
          }
      }
  }

  static get observers() {
      return ['agendaDataProvider(user)'];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  agendaDataProvider(){
      this.set('listOfActivesUsersWithAgenda', [])
      this.set('listOfVisibleAgendas', [])

      this.api.user().listUsers().then(users => {

          const listOfUsers = users.rows

          this.set('listOfActivesUsersWithAgenda', listOfUsers && listOfUsers.filter(u => u && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url") && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user") && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password") && u.status && u.status === "ACTIVE" && u.id !== this.user.id) || [])

          const properties = this.user && this.user.properties || []
          const displayedAgendasProperty = properties && properties.find(prop => prop.type.identifier === "be.mikrono.displayedAgendas") || []
          const listOfDisplayedAgendaIds = JSON.parse(displayedAgendasProperty && displayedAgendasProperty.typedValue && displayedAgendasProperty.typedValue.stringValue || null) || []
          this.listOfActivesUsersWithAgenda.map(u => listOfDisplayedAgendaIds.map(ua => u.id === ua ? this.push('listOfVisibleAgendas', u) : null))

      })
  }

  _addAgenda(){
      this.shadowRoot.querySelector('#addDisplayedAgendaDialog') ? this.shadowRoot.querySelector('#addDisplayedAgendaDialog').open() : null
  }

  _sharingAgenda(item){
      if (item) {
          const mark = this.selectedAgendasToBeVisible.find(m => m.id === item.id)
          return mark && mark.check
      }else {
          return false
      }
  }

  _checkAgenda(e){
      if (e.target.id !== "") {
          const mark = this.selectedAgendasToBeVisible.find(m => m.id === e.target.id)
          if (!mark) {
              this.push('selectedAgendasToBeVisible', {id: e.target.id,check: true})
          } else {
              mark.check = !mark.check
              this.notifyPath('selectedAgendasToBeVisible.*')
          }
      }
  }

  confirmSharingAgenda(){

      const properties = this.user && this.user.properties || []

      if(properties && !properties.find(prop => prop.type.identifier === "be.mikrono.displayedAgendas")){
          this.push('user.properties', {
              type: {
                  identifier: "be.mikrono.displayedAgendas",
                  type: "JSON",
                  unique: false,
                  localized: false,
                  _attachments: {},
                  java_type: "org.taktik.icure.entities.PropertyType",
                  rev_history: {}
              },
              typedValue: {
                  type: "STRING",
                  stringValue: ""
              },
              _attachments: {},
              java_type: "org.taktik.icure.entities.Property",
              rev_history: {}
          })
      }


      const displayedAgendasProperty = properties && properties.find(prop => prop.type.identifier === "be.mikrono.displayedAgendas") || []
      const listOfDisplayedAgendaIds = JSON.parse(displayedAgendasProperty && displayedAgendasProperty.typedValue && displayedAgendasProperty.typedValue.stringValue || null) || []
      const agendaToBeAdded = this.selectedAgendasToBeVisible && this.selectedAgendasToBeVisible.filter(a => a.check === true).map(a => a.id) || []
      const newListOfDisplayedAgendaIds =  _.uniq(_.union(listOfDisplayedAgendaIds, agendaToBeAdded))

      displayedAgendasProperty.typedValue.stringValue = JSON.stringify(newListOfDisplayedAgendaIds)

      this.api.user().modifyUser(this.user)
          .then(user => this.api.register(user, 'user'))
          .then(user => this.set('user', user))
          .finally(() => {
              this.set('listOfVisibleAgendas', [])
              const properties = this.user && this.user.properties || []
              const displayedAgendasProperty = properties && properties.find(prop => prop.type.identifier === "be.mikrono.displayedAgendas") || []
              const listOfDisplayedAgendaIds = JSON.parse(displayedAgendasProperty.typedValue.stringValue) || null
              this.listOfActivesUsersWithAgenda.map(u => listOfDisplayedAgendaIds.map(ua => u.id === ua ? this.push('listOfVisibleAgendas', u) : null))

              this.shadowRoot.querySelector('#addDisplayedAgendaDialog') ? this.shadowRoot.querySelector('#addDisplayedAgendaDialog').close() : null
          })
  }

  _hiddenAgenda(e){
      e.stopPropagation()
      if(e.target.dataset && e.target.dataset.item){
          const dataToBeDeleted = JSON.parse(e.target.dataset.item)
          const properties = this.user && this.user.properties || []
          const displayedAgendasProperty = properties && properties.find(prop => prop.type.identifier === "be.mikrono.displayedAgendas") || []
          const listOfDisplayedAgendaIds = JSON.parse(displayedAgendasProperty && displayedAgendasProperty.typedValue && displayedAgendasProperty.typedValue.stringValue || null) || []
          const agendaIdxToBeHidden = listOfDisplayedAgendaIds.findIndex(id => id === dataToBeDeleted.id)
          listOfDisplayedAgendaIds.splice(agendaIdxToBeHidden, 1)
          displayedAgendasProperty.typedValue.stringValue = JSON.stringify(listOfDisplayedAgendaIds)

          this.api.user().modifyUser(this.user)
              .then(user => this.api.register(user, 'user'))
              .then(user => this.set('user', user))
              .finally(() => {
                  this.set('listOfVisibleAgendas', [])
                  const properties = this.user && this.user.properties || []
                  const displayedAgendasProperty = properties && properties.find(prop => prop.type.identifier === "be.mikrono.displayedAgendas") || []
                  const listOfDisplayedAgendaIds = JSON.parse(displayedAgendasProperty.typedValue.stringValue) || null
                  this.listOfActivesUsersWithAgenda.map(u => listOfDisplayedAgendaIds.map(ua => u.id === ua ? this.push('listOfVisibleAgendas', u) : null))

              })

      }
  }
}

customElements.define(HtAdminAccountAgenda.is, HtAdminAccountAgenda)
