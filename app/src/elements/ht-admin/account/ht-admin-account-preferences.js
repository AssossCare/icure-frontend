/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import "@polymer/paper-checkbox/paper-checkbox"
import "@polymer/paper-dropdown-menu/paper-dropdown-menu"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-item/paper-item"
import "@polymer/paper-listbox/paper-listbox"
import "@polymer/paper-radio-button/paper-radio-button"
import "@polymer/paper-radio-group/paper-radio-group"

import '../../../styles/buttons-style'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtAdminAccountPreferences extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles button-styles">
            :host {
                display: block;
                height: 100%;
            }

            :host *:focus{
                outline:0!important;
            }

            .users-panel{ 
                width: 100%;
                height: 100%;
                padding: 0 24px;
                box-sizing: border-box;
                overflow-y: auto;
            }

            .section-title{
                width: 100%;
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

            .flex-horizontal, .flex-horizontal .format {
                display: flex;
                flex-direction: row;
                flex-grow: 1;
            }
            .flex-horizontal .format {
                border-bottom: 1px solid var(--app-background-color-dark);
            }
            .flex-horizontal .format.regulations {
                border-bottom: 0;
            }

            .flex-horizontal > div {
                flex-grow: 1;
                box-sizing: border-box;
                border: 1px solid var(--app-background-color-darker);
                margin: 16px 8px;
                border-radius: 4px;
            }
            .flex-horizontal > div.col {
                border: 0;
                margin: initial;
                border-radius: 0;
            }
            .flex-horizontal div.print-tile {
                border: 1px solid var(--app-background-color-darker);
                margin: 16px 8px;
                border-radius: 4px;
            }

            .flex-horizontal h2 {
                background: var(--app-background-color-dark);
                padding: 8px;
                width: 100%;
                text-align: center;
                box-sizing: border-box;
                margin: 0;
            }
            .flex-horizontal .format {
                flex-direction: row;
            }
            .flex-horizontal .format .left {
                flex-grow: initial;
                width: 128px;
                line-height: 64px;
                text-align: center;
                font-weight: bold;
            }

            .flex-horizontal .format .right {
                flex-grow: 1;
                padding: 0 16px;
            }
            .flex-horizontal .format .right paper-dropdown-menu {
                width: 100%;
            }

            .flex-horizontal paper-listbox {
                max-height: 256px;
                max-width: 256px;
            }
            .flex-horizontal paper-item {
                cursor: pointer;
                box-sizing: border-box;
            }
            .flex-horizontal paper-item:hover {
                background: var(--app-background-color-dark);
            }
            .flex-horizontal paper-item:active,
            .flex-horizontal paper-item:focus {
                background: var(--app-background-color-darker);
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

            .user-panel .panel-content {
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

            .flex{
                flex: 1;
            }

            .line {
                display: flex;
            }

            .card{
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                margin-bottom: 24px;
            }

            .card .header{
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

            .card .content{
                padding: 16px;
                background: var(--app-background-color);
            }

            .card .content paper-checkbox{
                --paper-checkbox-checked-color: var(--app-secondary-color);
                --paper-checkbox-unchecked-ink-color: var(--app-secondary-color-dark);
                width: 100%;
                margin-bottom: 8px;
            }

            .card .content paper-input{
                --paper-input-container-focus-color: var(--app-primary-color-dark);
            }

            .card.dossier, .card.ehbox, .card.hubs{
                width:50%;
            }

            .card.facturation{
                width: 100%;
            }

        </style>

        <div class="users-panel">
            <h4 class="section-title">[[localize('my_pro', 'My profil', language)]] - [[localize('acc_prefs', 'Preferences', language)]]</h4>

            <div class="card dossier">
                <h5 class="header">Dossier patient</h5>
                <div class="content">
                    <paper-checkbox checked="{{openPostItAuto}}">[[localize('open_post_it','Open post-it with patient folder',language)]]</paper-checkbox>
                    <paper-checkbox checked="{{showAllHE}}">[[localize('show-all-HE','don t hide actif health element before january 2018',language)]]</paper-checkbox>
                </div>
            </div>


            <div class="card ehbox">
                <h5 class="header">Ehbox</h5>
                <div class="content">
                    <paper-checkbox checked="{{receiveMailAuto}}">[[localize('auto_ehbox','Receive mails automatically',language)]]</paper-checkbox>
                    <paper-checkbox checked="{{assignMailAuto}}">[[localize('','Assign mails automatically',language)]]</paper-checkbox>
                </div>
            </div>

            <div class="card hubs">
                <h5 class="header">Hubs</h5>
                <div class="content">
                    <paper-dropdown-menu id="preferredHub" label="[[localize('pre_hub','Preferred hub',language)]]">
                        <paper-listbox slot="dropdown-content" attr-for-selected="name" selected="{{userPreferredHub}}">
                            <paper-item name="rsb">[[localize('rsw','RSB',language)]]</paper-item>
                            <paper-item name="rsw">[[localize('rsb','RSW',language)]]</paper-item>
                            <paper-item name="vitalink">[[localize('vitalink','Vitalink',language)]]</paper-item>
                        </paper-listbox>
                    </paper-dropdown-menu>
    
                    <paper-radio-group selected="{{userEHealthEnv}}">
                        <paper-radio-button name="acc">[[localize('acceptance','Acceptance',language)]]</paper-radio-button>
                        <paper-radio-button name="prd">[[localize('prd','Production',language)]]</paper-radio-button>
                    </paper-radio-group>
                </div>
            </div>

            <div class="card facturation">
                <h5 class="header">Facturation</h5>
                <div class="content">
                    <h5>Gestion des numéros d'envois</h5>
                    <paper-input label="OA 100" value="{{_getBatchNumber(100)}}"></paper-input>
                    <paper-input label="OA 200" value="{{_getBatchNumber(200)}}"></paper-input>
                    <paper-input label="OA 300" value="{{_getBatchNumber(300)}}"></paper-input>
                    <paper-input label="OA 400" value="{{_getBatchNumber(400)}}"></paper-input>
                    <paper-input label="OA 500" value="{{_getBatchNumber(500)}}"></paper-input>
                    <paper-input label="OA 600" value="{{_getBatchNumber(600)}}"></paper-input>
                    <paper-input label="OA 900" value="{{_getBatchNumber(900)}}"></paper-input>
                </div> 
            </div>
            
            <div class="buttons">
                <paper-button class="button button--save" role="button" on-tap="save">
                    [[localize('save','save',this.language)]]
                </paper-button>
            </div>
        </div>
`;
  }

  static get is() {
      return 'ht-admin-account-preferences'
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
          openPostItAuto: {
              type: Boolean,
              value: false
          },
          showAllHE: {
              type: Boolean,
              value: false
          },
          receiveMailAuto: {
              type: Boolean,
              value: false
          },
          assignMailAuto:{
              type: Boolean,
              value: false
          },
          listOfEfactBatchNumbers:{
              type: Array,
              value: () => []
          }
      }
  }

  static get observers() {
      return ['_preferencesDataProvider(user)'];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  _preferencesDataProvider(){
      const prefixTab = [
          'efact:'+this.user.healthcarePartyId+':100:',
          'efact:'+this.user.healthcarePartyId+':200:',
          'efact:'+this.user.healthcarePartyId+':300:',
          'efact:'+this.user.healthcarePartyId+':400:',
          'efact:'+this.user.healthcarePartyId+':500:',
          'efact:'+this.user.healthcarePartyId+':600:',
          'efact:'+this.user.healthcarePartyId+':900:'
      ]

      Promise.all(prefixTab.map(prefix => ({
          nextBatchNumber: this.api.invoice().getNextInvoiceReference(prefix, this.api.entityRef()),
          prefix: prefix

      }))).then(batchNumbers => this.set('listOfEfactBatchNumbers', batchNumbers))
          .finally(() => console.log(this.listOfEfactBatchNumbers))


      this.set("showAllHE",(this.user.properties.find(prop => prop.type.identifier==="be.topaz.preferred.showAllHe")|| {typedValue: {booleanValue:false}}).typedValue.booleanValue)
  }

  _getBatchNumber(oa){
      const batchNumber = this.listOfEfactBatchNumbers.find(batch => batch.prefix === 'efact:'+this.user.healthcarePartyId+':'+oa+':')
      //return batchNumber.nextBatchNumber
  }

  _getValueLabel(label){
      return label[this.language]
  }

  save(){
      const propShowAllHe = this.user.properties.find(prop => prop.type.identifier==="be.topaz.preferred.showAllHe")
      if(propShowAllHe){
          propShowAllHe.typedValue.booleanValue= this.showAllHE
      }else{
          this.push("user.properties",{
              type : {
                  identifier : "be.topaz.preferred.showAllHe",
                  type: "BOOLEAN",
                  unique : true,
                  localized : false
              },
              typedValue:{
                  type : "BOOLEAN",
                  booleanValue : this.showAllHE
              }
          })
      }

      this.api.user().modifyUser(this.user).then(u=> this.api.register(u,"user")).then(u=>this.set("user",u))
  }
}

customElements.define(HtAdminAccountPreferences.is, HtAdminAccountPreferences)
