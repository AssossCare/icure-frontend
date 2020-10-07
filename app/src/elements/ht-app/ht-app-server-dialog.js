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

class HtAppServerDialog extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style  include="buttons-style">

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
                width: 100%;
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

			#add-pannel {
			    display : flex;
			}
			
			#cancelButton {
			    align-self: flex-end;
			}
			
			paper-listbox {
			    width : 295px;
			}
			
			

		</style>
        <paper-dropdown-menu close-on-activate="false" label="[[title]]" horizontal-align="left">
            <paper-listbox class="server-list" slot="dropdown-content" selected="{{dbServerSelected}}" selected-item="{{dbServerObject}}">
                <template is="dom-repeat" items="[[dbServers]]" as="server" index-as="index">
                    <paper-item class="server-item" data-server\$="[[server.url]]">
                        <div>
                            [[server.name]]
                        </div>
                        <template is="dom-if" if="[[_isRemovable(server.removable)]]">
                            <paper-icon-button noink="" icon="icons:clear" data-index\$="[[index]]" class="server-icon" title="delete" on-click="_handleServerDelete"></paper-icon-button>
                        </template>
                    </paper-item>
                </template>
                <template is="dom-if" if="[[editable]]">
                    <paper-item class="server-item">
                        <iron-icon role="button" icon="icons:add" class="server-icon server-icon--add"></iron-icon>
                        <div>
                            [[localize("add_server","Add a server ", language)]]
                        </div>
                    </paper-item>
                </template>  
            </paper-listbox>
        </paper-dropdown-menu>
        
        <template is="dom-if" if="[[addServerOpened]]">
            <div id="add-pannel">
                <paper-input label="url" value="{{dbServerInput}}" type="url"></paper-input>
                <paper-button id="cancelButton" class="button button--other" id="server-cancel" on-click="_handleCancel">[[localize('cancel','Cancel',language)]]</paper-button>
                <paper-button id="submitButton" class="button button--save" type="submit" on-click="_handleServerAddition" autofocus="">[[localize('add','Add',language)]]</paper-button>
            </div>
        </template>
`;
  }

  static get is() {
      return "ht-app-server-dialog";
  }

  static get properties() {
      return {
          dbServers: {
              type: Array,
              value: () => ([])
          },
          dbServerSelected: {
              type: Number,
              value: () => 0,
              observer: '_handleServerSelect'
          },
          addServerOpened: {
              type: Boolean,
              value: false
          },
          dbServerInput: {
              type: String,
              value : ""
          },
          title: {
              type: String
          },
          serverName: {
              type: String
          },
          editable : {
              type: Boolean,
              value : false
          }
      };
  }

  constructor() {
      super();
  }

  ready() {
      super.ready()
      this.set("addServerOpened",false)
  }

    getServersInfo() {
       return {
           servers : this.dbServers,
           selected : _.get(this, 'dbServerObject.dataset.server', null)
       }
    }

  _handleServerSelect(value, oldValue) {

      if (value === this.dbServers.length) {
          this.dbServerSelected = oldValue
          this.set("addServerOpened", true)
      }
  }

  _handleServerAddition(e) {

      const urlMatches = this.dbServerInput.trim().match("(http[s]{0,1}:\/\/)?(.*)")

      urlMatches[2] = urlMatches[2].endsWith('/') ? urlMatches[2].substring(0,urlMatches[2].length - 1) : urlMatches[2]

      if ( urlMatches) {

          this.dbServerInput = (urlMatches[1] || 'http'+(urlMatches[2].match(/\d{1,4}.\d{1,4}.\d{1,4}.\d{1,4}/) ?"" : "s")+'://') + urlMatches[2]
          const index = this.dbServers.length
          this.push('dbServers', {
              name : urlMatches[2],
              url : this.dbServerInput,
              removable : true
          })


          this.set("dbServerSelected", index)


          this.set("dbServerInput","")
          this.set("addServerOpened", false)

          this.dispatchEvent(new CustomEvent('save',{detail: {servers : this.dbServers}, bubbles:true, composed:true}))
      }
  }

  _handleServerDelete(e) {

      e.preventDefault()

      if (e.target.dataset.index) {

          const index = parseInt(e.target.dataset.index)
          this.splice("dbServers", index, 1)

          this.set("dbServerSelected", 0)

          this.dispatchEvent(new CustomEvent('save',{detail: {servers : this.dbServers}, bubbles:true, composed:true}))


      }


  }

  _handleCancel(e) {

      this.set("dbServerInput","")
      this.set("addServerOpened", false)

  }

    _isRemovable(bool){
      return this.editable && bool
    }
}

customElements.define(HtAppServerDialog.is, HtAppServerDialog);
