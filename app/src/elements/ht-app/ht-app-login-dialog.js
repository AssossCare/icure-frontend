import './ht-app-server-dialog.js';
import '../../styles/buttons-style.js';
import '../ht-spinner/ht-spinner.js';

import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-dropdown-menu/paper-dropdown-menu"
import "@polymer/paper-icon-button/paper-icon-button"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-item/paper-item"
import "@polymer/paper-listbox/paper-listbox"

//noinspection JSUnusedGlobalSymbols

import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-dropdown-menu/paper-dropdown-menu"
import "@polymer/paper-icon-button/paper-icon-button"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-item/paper-item"
import "@polymer/paper-listbox/paper-listbox"

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";

class HtAppLoginDialog extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
		<style include="buttons-style">
			paper-dialog{
				border-radius:2px;
			}
            #loginDialog {
                min-width: 256px;
                width: 50vw;
                max-width: 384px;
            }
			.top-gradient{
				line-height:0;
				font-size:0;
				display:block;
				background: linear-gradient(90deg, var(--app-secondary-color-dark), var(--app-secondary-color));
				height:10px;
				position:relative;
				top:0;
				left:0;
				right:0;
				margin:0;
				border-radius:2px 2px 0 0;
			}
			paper-input{
				--paper-input-container-focus-color: var(--app-secondary-color-dark);
				--paper-input-container-invalid-color: var(--app-error-color);
			}

			paper-dropdown-menu {
				--paper-input-container-focus-color: var(--app-secondary-color-dark);
			}

			paper-button[type="submit"]{
				margin:2em auto 0 auto;
				color:var(--app-text-color-light);
				background:var(--app-secondary-color);
				--paper-button-ink-color: var(--app-secondary-color-dark);
				@apply --shadow-elevation-2dp;
				align-self:flex-end;
			}

			h3 {
				margin-bottom: 0;
			}

			.server-list {
				padding: 0;
			}

			.server-item {
				display: flex;
				justify-content: space-between;
				flex-wrap: nowrap;
			}

			.server-icon {

				box-sizing: border-box;

				height: 24px;
				width: 24px;
				text-align: right;

				z-index: 1000;

				padding: 4px;

				color: var(--app-text-color);
				background: var(--app-background-color-darker);
				border-radius: 50%;

			}

			.server-icon.server-icon--add {
				padding: 2px;
				margin-right: 8px;
				background: none;
			}

			paper-item:hover {

				cursor: pointer;

			}

			#add-server-form {
				margin-top: 7px;
			}

			.flex{
				display:flex;
				flex-direction: column;
				justify-content: center!important;
			}

			.message.error{
				color: var(--app-error-color);
			}

			.taktik{
				height: 30px;
				margin: 32px 0;
			}

			.taktik span{
				width: 100px;
				line-height: 0.5;
				display: block;
				font-size: 10px;
				color: var(--app-text-color-disabled);
				margin: 0 auto;
			}

			.taktik .logo{
				width: 100px;
				margin: 0 auto;
			}

			.taktik .logo svg .st1{
				fill: var(--app-text-color);
			}

            .toggleOptionsBtn {
                font-size: 12px;
            }
            .login-options-container {
                transform: scaleY(0);
                transition: .5s ease-in-out;
                transform-origin: top;
            }
            .login-options-container.visible-true {
                transform: scaleY(1);
            }
            .login-options {
                display: none;
            }
            .login-options.visible-true {
                display: block;
            }
            div.in-place-of-btn {
                display: flex;
                color: red;
                width: 60%;
                margin: 2em auto 0 auto;
                justify-content: space-evenly;
            }
            ht-spinner {
                width: 36px;
                height: 24px;
            }

			#submitButton{
				height: 32px;
				min-width: 100px;
			}

		</style>

		<paper-dialog id="loginDialog" opened="{{opened}}" modal="">
			<div class="top-gradient">&nbsp;</div>
			<div style="text-align: center;"><!--img src="images/logo.png" style="width: 100px;" /--><h1>[[localize('Topaz','Topaz',language)]]</h1></div>
			<div hidden$="{{!credentials.error}}" class="message error">
				[[localize('inv_use_or_pas','Invalid username or password.',language)]]
			</div>
			<div hidden$="{{!credentials.logout}}" class="message">
				[[localize('you_hav_bee_log_out','You have been logged out.',language)]]
			</div>
			<form is="form" id="login-form">
				<div class="layout vertical center flex">
					<paper-input id="username" label="Username" name="username" always-float-label="true" value="{{credentials.username}}" invalid$="{{credentials.error}}"></paper-input>
					<paper-input label="Password" name="password" type="password" always-float-label="true" value="{{credentials.password}}" on-keydown="checkForEnter" invalid$="{{credentials.error}}"></paper-input>
                    <paper-input label="2FA (optional)" name="twofa" always-float-label="true" value="{{credentials.twofa}}" on-keydown="checkForEnter"></paper-input>
					<paper-input label="Ehealth password (optional)" name="password" type="password" always-float-label="true" value="{{credentials.ehpassword}}" on-keydown="checkForEnter"></paper-input>
					<!-- <paper-dropdown-menu  label="Database server" vertical-align="bottom" horizontal-align="left">
						<paper-listbox class="server-list" slot="dropdown-content" selected="{{dbServerSelected}}" selected-item="{{dbServerObject}}">
							<paper-item data-server="http://127.0.0.1">Local</paper-item>
							<template is="dom-repeat" items="[[dbServers]]" as="server" index-as="index">
								<paper-item class="server-item" data-server$="[[server.url]]">
									<div>
										[[server.name]]
									</div>
									<paper-icon-button noink icon="icons:clear" data-index$="[[index]]" class="server-icon" title="delete" on-click="_handleServerDelete"></paper-icon-button>
								</paper-item>
							</template>
							<paper-item class="server-item">
								<iron-icon role="button" icon="icons:add" class="server-icon server-icon--add"></iron-icon>
								<div>
									Add a server
								</div>
							</paper-item>
						</paper-listbox>
					</paper-dropdown-menu> -->
                    <template is="dom-if" if="[[!showMoreOption]]">
                        <paper-button class="toggleOptionsBtn" on-tap="_toggleMoreOption">[[localize('more_login_options','More login options',language)]]<iron-icon icon="expand-more"></iron-icon>
                        </paper-button>
                    </template>
                    <template is="dom-if" if="[[showMoreOption]]">
                        <paper-button class="toggleOptionsBtn" on-tap="_toggleMoreOption">[[localize('less_login_options','Less login options',language)]]<iron-icon icon="expand-less"></iron-icon>
                        </paper-button>
                    </template>
                    <!--<template is="dom-if" if="[[showMoreOption]]">-->
                    <div class$="login-options-container visible-[[showMoreOption]]">
                        <div class$="login-options visible-[[showMoreOption]]">
                            <ht-app-server-dialog id="icure-servers-list" title="iCure [[localize('server', 'server', language)]]" server-name="icure" db-server-selected="[[icureSelected]]" db-servers="[[icureServers]]" api="[[api]]" user="[[user]]" i18n="[[i18n]]" language="[[language]]"></ht-app-server-dialog>

                            <ht-app-server-dialog id="fhc-servers-list" title="Free Health Connector [[localize('server', 'server', language)]]" server-name="fhc" db-server-selected="[[fhcSelected]]" db-servers="[[fhcServers]]" api="[[api]]" user="[[user]]" i18n="[[i18n]]" language="[[language]]"></ht-app-server-dialog>
                            <paper-button raised="true" id="submitButton" class="button button--save" type="submit" on-click="refreshUrl" autofocus="">[[localize('swap_connection','Swap Connection',language)]]</paper-button>
                        </div>
                    </div>
                    <!--</template>-->
                    <template is="dom-if" if="[[!disabled]]">
                        <paper-button raised="true" id="submitButton" class="button button--save" type="submit" on-click="login" autofocus="">[[localize('log_in','Log in',language)]]</paper-button>
                    </template>
                    <template is="dom-if" if="[[disabled]]">
                        <div class="in-place-of-btn">
                            <ht-spinner active="[[disabled]]"></ht-spinner> [[localize('please_wait','Please wait ...',language)]]
                        </div>
                    </template>
				</div>
			</form>
			<div class="taktik">
					<span>Engineered by</span>
					<div class="logo">
						<!-- Generator: Adobe Illustrator 22.1.0, SVG Export Plug-In  -->
						<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:a="http://ns.adobe.com/AdobeSVGViewerExtensions/3.0/" x="0px" y="0px" width="100px" height="17.3px" viewBox="0 0 100 17.3" style="enable-background:new 0 0 100 17.3;" xml:space="preserve">
						<style type="text/css">
						.st1{fill-rule:evenodd;clip-rule:evenodd;fill:#455A64;}
						</style>
						<defs>
						</defs>
						<polygon class="st1" points="0,8.3 6.9,8.3 6.9,17.2 10,17.2 10,8.3 16.9,8.3 16.9,5.3 0,5.3 "></polygon>
						<path class="st1" d="M36.1,17.2v-8c0-2.1-1.6-3.9-3.6-3.9H19.3v3H33v1.5H22.5c-2.1,0-3.8,1.7-3.8,3.7c0,2.1,1.8,3.8,4,3.8H36.1z
						M21.9,12.8H33v1.5H21.9V12.8z"></path>
						<polygon class="st1" points="56.8,8.3 63.7,8.3 63.7,17.2 66.8,17.2 66.8,8.3 73.7,8.3 73.7,5.3 56.8,5.3 "></polygon>
						<rect x="75.7" y="5.3" class="st1" width="3.1" height="11.9"></rect>
						<rect x="75.7" class="st1" width="3.1" height="3.1"></rect>
						<path class="st1" d="M43,9.4C43,9.4,43,9.4,43,9.4C43,9.4,43,9.4,43,9.4z"></path>
						<path class="st1" d="M86.9,9.4C87,9.4,87,9.4,86.9,9.4C87,9.4,87,9.4,86.9,9.4z"></path>
						<path class="st1" d="M91.3,12.3l8.7,5h-6.3l-5.2-3.1c-0.2-0.1-0.5-0.3-0.7-0.4c-0.2-0.1-0.4-0.3-0.6-0.4c-0.2-0.2-0.4-0.4-0.6-0.6
						c0,0,0-0.1-0.1-0.1c-0.2-0.3-0.4-0.7-0.4-1.2v5.7h-3.1V5.4h3.1V11c0.1-0.6,0.3-1.2,0.7-1.6c0,0,0,0,0.1-0.1c0,0,0,0,0,0
						c0.3-0.3,0.7-0.6,1.3-0.9l5.5-3.1h6.3l-8.7,4.9l-1.7,1L91.3,12.3z"></path>
						<path class="st1" d="M43.1,9.4C43.1,9.4,43.1,9.4,43.1,9.4C43.1,9.4,43.1,9.4,43.1,9.4z"></path>
						<path class="st1" d="M43.1,9.4C43.1,9.4,43.1,9.4,43.1,9.4C43.1,9.4,43.1,9.4,43.1,9.4z"></path>
						<path class="st1" d="M47.4,12.3l8.7,5h-6.3l-5.2-3.1c-0.2-0.1-0.5-0.3-0.7-0.4c-0.2-0.1-0.4-0.3-0.6-0.4c-0.2-0.2-0.4-0.4-0.6-0.6
						c0,0,0-0.1-0.1-0.1c-0.2-0.3-0.4-0.7-0.4-1.2v5.7h-3.1V5.4h3.1V11c0.1-0.6,0.3-1.2,0.7-1.6c0,0,0,0,0.1-0.1c0,0,0,0,0,0
						c0.3-0.3,0.7-0.6,1.3-0.9l5.5-3.1h6.3l-8.7,4.9l-1.7,1L47.4,12.3z"></path>
						</svg>

					</div>
				</div>
		</paper-dialog>
`;
  }

  static get is() {
      return "ht-app-login-dialog";
	}

  static get properties() {
      return {
          credentials: {
              type: Object
          },
          api: {
              type: Object,
              noReset: true,
              value: null,
              observer : 'apiReady'
          },
          opened: {
              type: Boolean,
              value: false,
              notify: true
          },
          disabled: {
              type: Boolean,
              value: false
          },
          showMoreOption: {
              type: Boolean,
              value: false
          },
          appStarting:{
              type: Boolean,
              value: true,
              noReset:true
          },
          icureServers:{
              type: Array,
              value : () => []
          },
          icureUrlSelected:{
              type: String,
              value : ""
          },
          icureSelected:{
              type: Number,
              value : 0
          },
          fhcServers:{
              type: Array,
              value : () => []
          },
          fhcUrlSelected:{
              type: String,
              value : ""
          },
          fhcSelected:{
              type: Number,
              value : 0
          }
      };
	}

  constructor() {
      super();
	}

	apiReady() {
        let servers = [{name: this.localize("online","Online"),url:"https://backend.svc.icure.cloud"}]
        let finder = this.icureUrlSelected
        this.api && this.api.electron().checkAvailable().then(() =>this.api.electron().getConfigFile()).then(config => {
            if(!config)return;
            servers = servers.concat(_.uniq(_.get(config, 'servers', []).map(serv => {
                return {
                    name: serv.match(/\d{1,4}.\d{1,4}.\d{1,4}.\d{1,4}/)[0] || serv,
                    url : serv
                }
            }).concat(_.get(config,"hasCouchDB",false) ? [{name: this.localize("locale","locale"),url: ""}] : [])
                .concat(_.get(config,"isTester",false) ? [{name: "backend B",url : "https://backendb.svc.icure.cloud"}] : [])))
            finder = _.get(config,"backend","")+"/rest/v1"
        }).finally(()=>{
            let find = servers.findIndex(serv => serv.url+"/rest/v1" === finder)
            if(find===-1){
                find=servers.length
                servers.push({name : finder, url : finder})
            }

            this.set("icureServers",servers)
            this.set("icureSelected",find)


            this.set('fhcServers',_.uniqBy([{name: this.localize("prod","Production"),url :"https://fhcpr.icure.cloud"},{name: this.localize("acceptance","Acceptance"), url: "https://fhcacc.icure.cloud"},{name:this.fhcUrlSelected,url:this.fhcUrlSelected}],"url"))
            this.set("fhcSelected",this.fhcServers.findIndex(serv => serv.url===this.fhcUrlSelected) || 0)
        })
    }


  login() {

      const currentIcureServerUrl = this.$["icure-servers-list"].getServersInfo()
      const currentFhcServerUrl = this.$["fhc-servers-list"].getServersInfo()

      this.dispatchEvent(new CustomEvent('login', { detail: { credentials: this.credentials, icureurl: currentIcureServerUrl, fhcurl: currentFhcServerUrl}, bubbles: true, composed: true }))

	}

  checkForEnter(e) {
      // check if 'enter' was pressed
      if (e.keyCode === 13 && !this.disabled) {
          this.login()
      }
	}

  open(){
      this.$["loginDialog"].open()
  }

  _toggleMoreOption() {
      this.set('showMoreOption',!this.showMoreOption)
  }

  disable() {
      if(!this.opened)return;
      if(this.appStarting){
          this.set("appStarting",false)
          this.set("credentials.username",localStorage.getItem("last_connection"))
      }
      this.set('disabled', true)
	}

  enable() {
      if(!this.opened)return;
      if(this.appStarting){
          this.set("appStarting",false)
          this.set("credentials.username",localStorage.getItem("last_connection"))
      }
      this.set('disabled', false)
	}

    refreshUrl(){
        const currentIcureServerUrl = this.$["icure-servers-list"].getServersInfo()
        const currentFhcServerUrl = this.$["fhc-servers-list"].getServersInfo()
        this.dispatchEvent(new CustomEvent('url-change', { detail: {  icureurl: currentIcureServerUrl, fhcurl: currentFhcServerUrl}, bubbles: true, composed: true }))

    }

}

customElements.define(HtAppLoginDialog.is, HtAppLoginDialog);
