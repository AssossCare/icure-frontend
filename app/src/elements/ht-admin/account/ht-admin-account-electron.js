/**
 @license
 Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
 This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
 The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
 The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
 Code distributed by Google as part of the polymer project is also
 subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
 */
import '../../../styles/dropdown-style.js';

import '../../../styles/paper-input-style.js';
import '../../../styles/buttons-style.js';

import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-icon-button/paper-icon-button"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-item/paper-item"
import "@polymer/paper-radio-group/paper-radio-group"

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
import _ from 'lodash/lodash';

class HtAdminAccountElectron extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
        <style include="shared-styles dropdown-style paper-input-style buttons-style">
            :host {
                display: block;
                height: calc(100% - 20px);
                --paper-font-caption: {
					line-height: 0;
				}
            }

            :host *:focus{
                outline:0!important;
            }

            .section-title{
                margin-top: 24px;
                margin-bottom: 0;
            }

            .electron-panel{
                width: 100%;
                height: 100%;
                grid-column-gap: 24px;
                grid-row-gap: 24px;
                padding: 0 24px;
                box-sizing: border-box;
                background: white;
            }
            
            .edit {
                height: 90%;
                overflow: auto;
            }

            .buttons{
                display: flex;
                flex-flow: row-reverse;
                margin-bottom: 12px;
            }

            #savedIndicator{
                position: fixed;
                top:50%;
                right: 0;
                z-index:1000;
                color: white;
                font-size: 13px;
                background:rgba(0,0,0,0.42);
                height: 24px;
                padding: 0 8px 0 12px;
                border-radius: 3px 0 0 3px;
                width: 0;
                opacity: 0;
            }
            .saved{
                animation: savedAnim 2.5s ease-in;
            }
            .saved iron-icon{
                margin-left: 4px;
                padding: 4px;
            }

            @keyframes savedAnim {
                0%{
                    width: 0;
                    opacity: 0;
                }
                20%{
                    width: 114px;
                    opacity: 1;
                }
                25%{
                    width: 96px;
                    opacity: 1;
                }
                75%{
                    width: 96px;
                    opacity: 1;
                }
                100%{
                    width: 0;
                    opacity: 0;
                }
            }
            
            paper-radio-group{
                padding-left: 16px;
            }

            paper-radio-button{
                --paper-radio-button-unchecked-ink-color: var(--app-secondary-color-dark);
                --paper-radio-button-checked-color: var(--app-secondary-color);
                --paper-radio-button-checked-ink-color: var(--app-secondary-color);
            }
            
            .p-l-0 {
                padding-left:0;
            }
        </style>

        <div class="electron-panel">

            <paper-item id="savedIndicator">[[localize('sav','SAVED',language)]]
                <iron-icon icon="icons:check"></iron-icon>
            </paper-item>

            <h4 class="section-title">[[localize('my_pro', 'My profil', language)]] - [[localize('my-electron','my electron',language)]]</h4>

            <div class="edit">
               <template is="dom-if" if="[[isUserTester(user)]]">
                   <div>
                       <paper-radio-group selected="{{electronData.frontendChoose}}">
                           <label class="p-l-0">[[localize('choose_url','Choix de l url',language)]]: </label>
                           <paper-radio-button name="dev-url">locale (dev only)</paper-radio-button>
                           <paper-radio-button name="official">TZ (prod)</paper-radio-button>
                           <paper-radio-button name="testB">TZB (test)</paper-radio-button>
                           <paper-radio-button name="testC">TZC (autre test)</paper-radio-button>
                       </paper-radio-group>
                   </div>
               </template>
               <div>
                   <paper-radio-group selected="{{electronData.backendChoose}}">
                       <label class="p-l-0">[[localize('choose_backend','Choix de la source de données',language)]]: </label>
                       <template is="dom-if" if="[[electronData.hasLocaleCouchDB]]">
                           <paper-radio-button name="locale">locale</paper-radio-button>
                       </template>
                       <paper-radio-button name="online">[[localize('online','En ligne',language)]]</paper-radio-button>
                       <template is="dom-if" if="[[isUserTester(user)]]">
                           <paper-radio-button name="online-test">[[localize('online_test','En ligne - test',language)]]</paper-radio-button>
                       </template>
                       <template is="dom-repeat" items="[[electronData.backendServers]]">
                           <paper-radio-button name="[[item.url]]">[[item.url]]</paper-radio-button>
                       </template>
                   </paper-radio-group>
               </div>
            </div>
            <div class="buttons">
                <paper-button on-tap="_save" class="button button--save"><iron-icon icon="save"></iron-icon>[[localize('save','Save',language)]]</paper-button>
            </div>
        </div>
`;
    }

    static get is() {
        return 'ht-admin-account-electron'
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
            electronData: {
                type: Object,
                value : {}
            }
        }
    }

    static get observers() {
        return ["_electronInit(electronAvailable)"];
    }

    constructor() {
        super()
    }

    ready() {
        super.ready()
        this.api && this.api.isElectronAvailable().then(elect=>this.set('electronAvailable',elect))
    }

    _electronInit(){
        if(!this.electronAvailable)return;
        fetch("http://127.0.0.1:16042/getConfigFile").then(response => response.json()).then(configuration => {
            this.set("electronData",{
                frontendChoose : configuration.frontend.includes("tzc.icure.cloud") ? "testC" : configuration.frontend.includes("tzb.icure.cloud") ? "testB" : configuration.frontend.includes("tz.icure.cloud") ? "official" : "dev-url",
                backendChoose : !configuration.backend ? "locale" : configuration.backend.includes("https://backend.svc.icure.cloud") ? "online" : configuration.backend.includes("https://backendb.svc.icure.cloud") ? "online-test" : configuration.backend,
                hasLocaleCouchDB : configuration.hasCouchDB,
                backendServers : configuration.servers
            })
        })
    }

    _save(){
        if(this.electronData){
            const body = {
                frontend: !_.get(this, "electronData.frontendChoose", false) ? "https://tz.icure.cloud" : this.electronData.frontendChoose.includes("testC") ? "https://tzc.icure.cloud" : this.electronData.frontendChoose.includes("testB") ? "https://tzb.icure.cloud" : this.electronData.frontendChoose.includes("dev-url") ? "http://127.0.0.1:9001" :"https://tz.icure.cloud",
                servers : _.get(this,"electronData.backendServers",[]),
                hasCouchDB : _.get(this,"electronData.hasLocaleCouchDB",false)
            }
            if(!_.get(this,"electronData.backendChoose","").includes("locale")){
                body.backend= !_.get(this, "electronData.backendChoose", false) ? "https://backend.svc.icure.cloud" : this.electronData.backendChoose.includes("online") ? "https://backend.svc.icure.cloud" : this.electronData.backendChoose.includes("online-test") ? "https://backendb.svc.icure.cloud" : this.electronData.backendChoose
            }

            fetch("http://127.0.0.1:16042/setConfigFile",{
                method: "POST",
                headers: {
                    "Content-Type" : "application/json; charset=utf-8"
                },
                body: JSON.stringify({"data" : body})
            })
        }
    }

    isUserTester(){
        return !!this.user.roles.find(role => role.includes("TESTER"))
    }
}

customElements.define(HtAdminAccountElectron.is, HtAdminAccountElectron)
