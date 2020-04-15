import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/paper-tabs-style.js';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatTherlinkDetail extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="dialog-style scrollbar-style paper-tabs-style">
            #therlinkDetailDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .title{
                height: 30px;
                width: auto;
                font-size: 20px;
            }

            .content{
                display: flex;
                height: calc(98% - 140px);
                width: auto;
                margin: 1%;
            }

            .therlinkDocumentsList{
                display: flex;
                height: 100%;
                width: 50%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
            }

            .therlinkDocumentsList2{
                height: 100%;
                width: 30%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
                overflow: auto;
            }

            .therlinkDocumentViewer{
                display: flex;
                height: 100%;
                width: 70%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
            }

            #transaction-list{
                height: 100%;
                width: 100%;
                max-height: 100%;
                overflow: auto;
            }

            #htPatHubTransactionViewer{
                height: 98%;
                width: 100%;
                max-height: 100%;
            }

            .sublist{
                background:var(--app-light-color);
                margin:0 0 0 -30px;
                padding:0;
                border-radius:0 0 2px 2px;
            }

            collapse-buton{
                --iron-collapse: {
                    padding-left: 0px !important;
                };

            }

            ht-spinner {
                height: 42px;
                width: 42px;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }

            .documentListContent{
                margin: 1%;
                width: auto;
            }

            .modal-title {
                background: var(--app-background-color-dark);
                margin-top: 0;
                padding: 16px 24px;
            }

            .buttons{
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 0;
            }


            .menu-item {
                @apply --padding-menu-item;
                height: 24px;
                min-height: 24px;
                font-size: var(--font-size-normal);
                text-transform: inherit;
                justify-content: space-between;
                cursor: pointer;
                @apply --transition;
            }

            .sublist .menu-item {
                font-size: var(--font-size-normal);
                min-height:20px;
                height:20px;
            }

            .menu-item:hover{
                background: var(--app-dark-color-faded);
                @apply --transition;
            }

            .menu-item .iron-selected{
                background:var(--app-primary-color);

            }

            .list-title {
                flex-basis: calc(100% - 72px);
                font-weight: bold;
            }

            .one-line-menu {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 400;
                padding-left:0;
            }

            .therlinkDetailDialog{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .therlink-menu-list{
                height: 100%;
                width: 30%;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                overflow: auto;
                position: relative;
            }

            .therlink-menu-view{
                height: 100%;
                width: 70%;
                position: relative;
                background: white;
            }

            .therlink-menu-list-header{
                height: 48px;
                width: 100%;
                border-bottom: 1px solid var(--app-background-color-darker);
                background-color: var(--app-background-color-dark);
                padding: 0 12px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                box-sizing: border-box;
            }

            .therlink-menu-list-header-img{
                height: 40px;
                width: 40px;
                background-color: transparent;
                margin: 4px;
                float: left;
            }

            .therlink-menu-list-header-info{
                margin-left: 12px;
                display: flex;
                align-items: center;
            }

            .therlink-menu-list-header-img img{
                width: 100%;
                height: 100%;
            }

            .therlink-name{
                font-size: var(--font-size-large);
                font-weight: 700;
            }

            .menu-item-icon{
                height: 20px;
                width: 20px;
                padding: 0px;
            }

            collapse-button[opened] .menu-item-icon{
                transform: scaleY(-1);
            }

            .bold {
                font-weight: bold;
            }

            .sublist{
                background:var(--app-light-color);
                margin:0 0 0 -30px;
                padding:0;
            }

            .table-line-menu {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                width: 100%;
            }

            .table-line-menu-top{
                padding-left: var(--padding-menu-item_-_padding-left);
                padding-right: var(--padding-menu-item_-_padding-right);
                box-sizing: border-box;
            }

            .table-line-menu div:not(:last-child){
                border-right: 1px solid var(--app-background-color-dark);
                height: 20px;
                line-height: 20px;
            }

            .table-line-menu .date{
                width: 20%;
                padding-right: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .table-line-menu .type{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 35%;
            }

            .table-line-menu .auth{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 39%
            }

            .table-line-menu .pat{
                width: 4%;
                padding-right: 4px;
                padding-left: 4px;
            }

            .table-line-menu .dateTit{
                width: 20%;
                padding-right: 10px;
            }

            .table-line-menu .typeTit{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 35%;
                white-space: nowrap;
            }

            .table-line-menu .authTit{
                padding-left:4px;
                padding-right:4px;
                width: 39%;
            }

            .table-line-menu .patTit{
                width: 4%;
                padding-left: 4px;
                padding-right: 4px;
                text-align: center;
            }

            .never::after{
                background-color: var(--app-status-color-nok)
            }

            .yes::after{
                background-color: var(--app-status-color-ok)
            }

            .no::after{
                background-color: var(--app-status-color-pending)
            }

            .therlink-access{
                height: 16px;
                width: 16px;
                position: relative;
                color: var(--app-text-color);
            }

            .therlink-access::after{
                position: absolute;
                display: block;
                content: '';
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                height: 6px;
                width: 6px;
                border-radius: 50%;
            }

            .therlink{
                text-transform: uppercase;
            }

            .tabIcon{
                padding-right: 10px;
                height: 14px;
                width: 14px;
            }

            .headerInfoLine{
                width: 100%;
                padding: 4px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: flex-start;
            }
            .headerInfoField{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                align-content: stretch;
                width: calc(100% / 4);
                padding: 0 8px;
                box-sizing: border-box;
            }
            .headerLabel{
                font-weight: bold;
            }
            .therlink-result-container{
                margin-bottom: 12px;
                border: 1px solid var(--app-background-color-dark);
            }
            .headerMasterTitle{
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
            }
            .therlink-sub-container{
                height: auto;
                width: auto;
                margin: 10px;
                border: 1px solid var(--app-background-color-dark);
            }
            .therlink-person-container{
                height: auto;
                width: auto;
            }

            .therlink-error-container{
                height: auto;
                width: auto;
                color: var(--app-status-color-nok);
                font-weight: bold;
            }
            .m5{
                margin: 5px;
            }

            .items-number{
                font-size: var(--font-size-small);
                padding: 2px;
                border-radius: 50%;
                height: 14px;
                width: 14px;
                background: var(--app-background-color-light);
                color: var(--app-text-color);
                display: flex;
                flex-flow: row nowrap;
                justify-content: center;
                align-items: center;
                text-align: center;
                float: right;
                margin: 2px;
            }

            .capitalize{
                text-transform: capitalize;
            }

            .w100{
                width: 99%;
            }

            .lt-error-container{
                height: auto;
                width: auto;
                color: var(--app-status-color-nok);
                font-weight: bold;
            }
            .lt-success-container{
                height: auto;
                width: auto;
                color: var(--app-status-color-ok);
                font-weight: bold;
            }

        </style>

        <paper-dialog id="therlinkDetailDialog" opened="{{opened}}">
            <div class="therlinkDetailDialog">
                <div class="therlink-menu-list">
                    <div class="therlink-menu-list-header">
                        <div class="therlink-menu-list-header-info">
                            <div class="therlink-name">
                                [[localize('tl-therlink','Therapeutic links',language)]]
                            </div>
                        </div>
                    </div>
                    <div class="therlink-submenu-container">
                        <template is="dom-if" if="[[_isTherapeuticLink(therlinkList, therlinkList.*)]]">
                            <template is="dom-repeat" items="[[_getTherlinkMasterType(therlinkList, therlinkList.*)]]" as="tlType">
                                <collapse-button id="[[tlType]]" opened="">
                                    <paper-item id="account" slot="sublist-collapse-item" class="menu-trigger menu-item bold" on-tap="toggleMenu" elevation="">
                                        <div class="one-line-menu list-title account-line">
                                            <div>
                                                <span class="force-left force-ellipsis box-txt bold capitalize">[[tlType]]</span>
                                            </div>
                                        </div>
                                        <paper-icon-button class="menu-item-icon" icon="hardware:keyboard-arrow-down" hover="none" on-tap="toggleMenu"></paper-icon-button>
                                    </paper-item>
                                    <paper-listbox id="" class="menu-content sublist" selectable="paper-item" toggle-shift="">
                                        <div class="table-line-menu table-line-menu-top">
                                            <div class="dateTit">[[localize('tl-start-date','Start date',language)]]</div>
                                            <div class="dateTit">[[localize('tl-end-date','End date',language)]]</div>
                                            <div class="typeTit">[[localize('type','Type',language)]]</div>
                                            <div class="authTit">[[localize('aut','Author',language)]]</div>
                                            <div class="patTit"></div>
                                        </div>
                                        <template is="dom-repeat" items="[[_getTherapeuticLinkByType(therlinkList, tlType, therlinkList.*)]]">
                                            <collapse-button>
                                                <paper-item slot="sublist-collapse-item" id\$="[[item]]" data-item\$="[[item]]" aria-selected="[[selected]]" class\$="menu-trigger menu-item [[isIronSelected(selected)]]" on-tap="_showInformation">
                                                    <div id="subMenu" class="table-line-menu">
                                                        <div class="date">[[_getDateFromTherlink(item.startDate)]]</div>
                                                        <div class="date">[[_getDateFromTherlink(item.endDate)]]</div>
                                                        <div class="type">[[_getTherlinkTypeShort(item)]]</div>
                                                        <div class="auth">[[_getAuthor(item)]]</div>
                                                        <div class="pat">
                                                            <iron-icon icon="vaadin:male" class\$="therlink-access [[_therlinkAccessIcon(item.endDate)]]"></iron-icon>
                                                        </div>
                                                    </div>
                                                </paper-item>
                                            </collapse-button>
                                        </template>
                                    </paper-listbox>
                                </collapse-button>
                            </template>
                        </template>
                    </div>
                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                </div>
                <div class="therlink-menu-view">
                    <paper-tabs selected="{{tabs}}">
                        <paper-tab>
                            <iron-icon class="tabIcon" icon="vaadin:info-circle-o"></iron-icon> [[localize('tl-info','Info',language)]]
                        </paper-tab>
                        <template is="dom-if" if="[[!_isRegisterAvailable(therlinkList, therlinkList.*, hcp)]]">
                            <paper-tab>
                                <iron-icon class="tabIcon" icon="vaadin:plus-circle-o"></iron-icon> [[localize('tl-crea','Creation',language)]]
                            </paper-tab>
                        </template>
                    </paper-tabs>
                    <iron-pages selected="[[tabs]]">
                        <page>
                            <ht-spinner active="[[isLoading]]"></ht-spinner>
                            <template is="dom-if" if="[[_isSelectedTherLink(selectedTherlink)]]">
                                <div class="therlink-result-container m5">
                                    <div class="headerMasterTitle headerLabel h25">[[_getTherlinkType(selectedTherlink)]]</div>
                                    <div class="therlink-sub-container">
                                        <div class="therlink-person-container">
                                            <div class="headerMasterTitle headerLabel">[[localize('tl-hcp-info','Hcp information',language)]]</div>
                                            <div class="headerInfoLine">
                                                <div class="headerInfoField">
                                                    <span class="headerLabel">[[localize('tl-firstName', 'Firstname', language)]]: </span> [[selectedTherlink.hcParty.firstname]]
                                                </div>
                                                <div class="headerInfoField">
                                                    <span class="headerLabel">[[localize('tl-lastName', 'Lastname', language)]]: </span> [[selectedTherlink.hcParty.familyname]]
                                                </div>
                                            </div>
                                            <div class="headerInfoLine">
                                                <div class="headerInfoField">
                                                    <span class="headerLabel">[[localize('tl-nihii', 'Nihii', language)]]: </span> [[_getAuthor(selectedTherlink)]]
                                                </div>
                                                <div class="headerInfoField">
                                                    <span class="headerLabel">[[localize('tl-inss', 'Inss', language)]]: </span> [[formatNissNumber(selectedTherlink.hcParty.inss)]]
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="therlink-sub-container">
                                        <div class="therlink-person-container">
                                            <div class="headerMasterTitle headerLabel">[[localize('tl-pat-info','Patient info',language)]]</div>
                                            <div class="headerInfoLine">
                                                <div class="headerInfoField">
                                                    <span class="headerLabel">[[localize('tl-firstName', 'Firstname', language)]]: </span> [[selectedTherlink.patient.firstName]]
                                                </div>
                                                <div class="headerInfoField">
                                                    <span class="headerLabel">[[localize('tl-lastName', 'Lastname', language)]]: </span> [[selectedTherlink.patient.lastName]]
                                                </div>
                                                <div class="headerInfoField">
                                                    <span class="headerLabel">[[localize('tl-inss', 'Inss', language)]]: </span> [[formatNissNumber(selectedTherlink.patient.inss)]]
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div class="therlink-sub-container">
                                        <div class="therlink-person-container">
                                            <div class="headerMasterTitle headerLabel">[[localize('tl-tl-info','Therapeutic link info',language)]]</div>
                                            <div class="headerInfoLine">
                                                <div class="headerInfoField">
                                                    <span class="headerLabel">[[localize('tl-start-date-lg', 'Start date', language)]]: </span> [[_getDateFromTherlink(selectedTherlink.startDate)]]
                                                </div>
                                                <div class="headerInfoField">
                                                    <span class="headerLabel">[[localize('tl-end-date-lg', 'End date', language)]]: </span> [[_getDateFromTherlink(selectedTherlink.endDate)]]
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </template>
                        </page>
                        <page>
                            <ht-spinner active="[[isLoading]]"></ht-spinner>
                            <div id="legaltextTL"></div>
                            <div class="m5">
                                <paper-icon-button icon="vaadin:health-card" id="read-eid" class="eid" on-tap="_readEid"></paper-icon-button>
                                <vaadin-combo-box id="therlinkType" class="w100" label="[[localize('tl-type', 'Therapeutic link type', language)]]" filter="{{therlinkFilter}}" selected-item="{{selectedTherlinkType}}" filtered-items="[[availableTherlinkType]]" item-label-path="label.fr">
                                    <template>[[_getLabel(item.label)]]</template>
                                </vaadin-combo-box>
                                <paper-input id="idCardNo" always-float-label="" label="[[localize('eid_no','eID Card Number',language)]]" value="{{eidCardNumber}}"></paper-input>
                                <paper-input id="isiCardNo" always-float-label="" label="[[localize('isi_no','ISI+ Card Number',language)]]" value="{{isiCardNumber}}"></paper-input>
                            </div>

                            <template is="dom-if" if="[[_isReturnErrorStatus(therlinkResponseError, therlinkResponseError.*)]]">
                                <div class="lt-error-container m5">
                                    <div>[[localize('lt-error-code', 'Error code', language)]]: </div>
                                    <template is="dom-repeat" items="[[therlinkResponseError]]">
                                        <div>[[item.code]] [[_getError(item)]]</div>
                                    </template>
                                </div>
                            </template>

                            <template is="dom-if" if="[[_isErrorList(errorList, errorList.*)]]">
                                <div class="lt-error-container m5">
                                    <div>[[localize('lt-error-code', 'Error code', language)]]: </div>
                                    <template is="dom-repeat" items="[[errorList]]">
                                        <div>[[_localizeError(item)]]</div>
                                    </template>
                                </div>
                            </template>
                        </page>
                    </iron-pages>
                </div>
                <div class="buttons">
                    <paper-button class="button" on-tap="_closeDialogs"><iron-icon icon="icons:close" class="mr5 smallIcon"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                    <template is="dom-if" if="[[_isRevokeAvailable(selectedTherlink, tabs)]]">
                        <paper-button class="button button--other" on-tap="_revoke"><iron-icon icon="vaadin:close-circle-o" class="mr5 smallIcon"></iron-icon> [[localize('tl-revoke','Revoke',language)]]</paper-button>
                    </template>
                    <template is="dom-if" if="[[_isRegisterTab(tabs)]]">
                        <paper-button class="button button--other" on-tap="_registerTherLink"><iron-icon icon="vaadin:plus-circle-o" class="mr5 smallIcon"></iron-icon> [[localize('tl-add','Add',language)]]</paper-button>
                    </template>
                    <template is="dom-if" if="[[!_isRegisterTab(tabs)]]">
                        <paper-button class="button button--other" on-tap="_refresh"><iron-icon icon="icons:refresh" class="mr5 smallIcon"></iron-icon> [[localize('refresh','Refresh',language)]]</paper-button>
                    </template>
                </div>
            </div>

        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-therlink-detail';
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
          opened: {
              type: Boolean,
              value: false
          },
          patient:{
              type: Object
          },
          tabs: {
              type:  Number,
              value: 0
          },
          isLoading:{
              type: Boolean,
              value: false
          },
          therlinkList:{
              type: Array,
              value: () => []
          },
          selectedTherlink:{
              type: Object,
              value: () => {}
          },
          hcp:{
              type: Object,
              value: () => {}
          },
          hubEndPoint:{
              type: String,
              value: null
          },
          hubSupportsConsent:{
              type: Boolean,
              value: true
          },
          eidCardNumber:{
              type: String,
              value: null
          },
          isiCardNumber:{
              type: String,
              value: null
          },
          hcpZip:{
              type: String,
              value: null
          },
          hubPackageId:{
              type: String,
              value: null
          },
          therlinkType:{
              type: Array,
              value: () => [
                  {type: "national", label: {fr: "Lien thérapeutique national", en: "National therapeutic link", nl: ""}},
                  {type: "hub", label: {fr: "Lien thérapeutique hub", en: "Hub therapeutic link", nl: ""}}
              ]
          },
          availableTherlinkType:{
              type: Array,
              value: () => []
          },
          selectedTherlinkType:{
              type: Object,
              value: () => {}
          },
          isNotificationSuccess:{
              type: Boolean,
              value: false
          },
          therlinkResponseError:{
              type: Object,
              value: () => {}
          },
          errorList:{
              type: Array,
              value: []
          }
      };
  }

  static get observers() {
      return [];
  }

  ready() {
      super.ready();
  }

  _open(){
      this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
          .then(hcp => this.set('hcp', hcp))
          .finally(() => {
              if(this.hubSupportsConsent){
                  this.set('therlinkType',  [
                      {type: "national", label: {fr: "Lien thérapeutique national", en: "National therapeutic link", nl: ""}},
                      {type: "hub", label: {fr: "Lien thérapeutique hub", en: "Hub therapeutic link", nl: ""}}
                  ]);
              }else{
                  this.set('therlinkType',  [
                      {type: "national", label: {fr: "Lien thérapeutique national", en: "National therapeutic link", nl: ""}},
                  ]);
              }
              this.set('eidCardNumber', null)
              this.set('isiCardNumber', null)
              this.set('hcpZip', _.get(_.get(this.hcp, 'addresses', []).find(adr => _.get(adr, 'addressType', null) === "work"), "postalCode", null))
              this.set('isNotificationSuccess', false)
              this.set('selectedTherlink', {})
              this.set('therlinkResponseError', [])
              this.set('errorList', [])
              this.set('availableTherlinkType', _.get(this, 'therlinkType').filter(tlType => !this.therlinkList.find(tll => tll.tlType === tlType.type)))
              this.set('selectedTherlinkType', _.head(_.get(this, 'availableTherlinkType', [])))
              this.$['therlinkDetailDialog'].open();
          })
  }

  _closeDialogs(){
      this.set('eidCardNumber', null)
      this.set('isiCardNumber', null)
      this.set('errorList', [])
      this.set('isNotificationSuccess', false)
      this.set('selectedTherlink', {})
      this.set('therlinkList', [])
      this.set('therlinkResponseError', [])
      this.$['therlinkDetailDialog'].close();
  }

  _isTherapeuticLink(){
      return _.get(this, 'therlinkList', []).length
  }

  _getTherlinkMasterType(){
      return  _.uniq(_.compact(_.get(this, 'therlinkList', []).map(type => _.get(type, 'tlType', null))))
  }

  _getTherapeuticLinkByType(links, type){
      return links && links.filter(l => l.tlType === type) || []
  }

  _getDateFromTherlink(date){
      return date ? this.api.moment(date).format("DD/MM/YYYY") : null
  }

  _getTherlinkTypeShort(item){
      return this.localize('tl-'+_.get(item, 'type', null)+'-short', _.get(item, 'type', null), this.language)
  }

  _getTherlinkType(item){
      return this.localize('tl-'+_.get(item, 'type', null), _.get(item, 'type', null), this.language)
  }


  _getAuthor(item){
      return _.get(_.get(item, 'hcParty.ids', []).find(id => id.s === "ID-HCPARTY"), 'value', null)
  }

  _therlinkAccessIcon(endDate){
      return endDate ? moment().isBetween(this.api.moment(endDate).subtract(2, 'months'), this.api.moment(endDate)) ? "no" :
          moment().isBefore(this.api.moment(endDate)) ? "yes" :
              "never" : "never"
  }

  _showInformation(e){
      if(e && e.currentTarget && e.currentTarget.dataset && e.currentTarget.dataset.item){
          const selected = JSON.parse(e.currentTarget.dataset.item)
          this.set('selectedTherlink', selected);
          this.set('tabs', 0)
      }
  }

  formatNissNumber(niss) {
      return niss ? ("" + niss).replace(/([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{3})([0-9]{2})/, '$1.$2.$3-$4.$5') : ''
  }

  _isSelectedTherLink(){
      return !_.isEmpty(_.get(this, 'selectedTherlink', {}))
  }

  _isRevokeAvailable(){
      return (!_.isEmpty(_.get(this, 'selectedTherlink', {})) && (_.get(this, 'tabs', null) === 0))
  }

  _revoke(){
      this.set('errorList', [])
      this.set("isLoading",true)
      _.get(this.selectedTherlink, 'tlType', null) === "national" ? this._revokeNationalTherlink() : this._revokeHubTherlink()
  }

  _revokeHubTherlink(){
      this.api.fhc().Hubcontroller().revokeTherapeuticLinkUsingDELETE(_.get(this, 'hubEndPoint', null), _.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenId', null), _.get(this.api, 'credentials.ehpassword', null), _.get(this.hcp, 'lastName', null), _.get(this.hcp, 'firstName', null),  _.get(this.hcp, 'nihii', null), _.get(this.hcp, 'ssin', null), _.get(this, 'hcpZip', null), this.cleanNumberSequence(_.get(this.patient, 'ssin', null)), _.get(this, 'hubPackageId', null))
          .then(revokeResp => {
              console.log(revokeResp)
          })
  }

  _revokeNationalTherlink(){
      const proof =  _.get(this.patient, 'dateOfBirth', null) && moment().diff(moment(_.get(this.patient, 'dateOfBirth', null), "YYYYMMDD"), 'months', true) > 3 && !!(_.get(this, 'eidCardNumber', null) || _.get(this, 'isiCardNumber', null)) ? "EIDENCODING_NOCARD" : null

      this._verifData(["keystoreId", "token", "keystorePassword", "hcpNihii", "hcpSsin", "hcpFirstName", "hcpLastName", "patientInss"]) ?
      this.api.fhc().Therlinkcontroller().revokeLinkUsingPOST(_.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenId', null), _.get(this.api, 'credentials.ehpassword', null), _.get(this.hcp, 'nihii', null), _.get(this.hcp, 'ssin', null), _.get(this.hcp, 'firstName', null), _.get(this.hcp, 'lastName', null), this.cleanNumberSequence(_.get(this.patient, 'ssin', null)), _.get(this.patient, 'firstName', null), _.get(this.patient, 'lastName', null), null, null, null, null, null, null, null, proof)
          .then(revokeResp => {
              this.set('therlinkResponseError', _.get(revokeResp, "errors"))
              !_.isEmpty(revokeResp) && !!_.size(_.get(revokeResp, "therapeuticLinks"), []) ? this._refresh() : null
          })
          .finally(() =>{
              this.set("isLoading",false)
          }) : this.set("isLoading",false)
  }

  _refresh(){
      this.set('errorList', [])
      this.set("isLoading",true)
      this.set('eidCardNumber', null)
      this.set('isiCardNumber', null)
      ;(this.patient.ssin && this.api.tokenId ?
      Promise.all([
          this.api.fhc().Therlinkcontroller().getAllTherapeuticLinksUsingGET(_.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenId', null), _.get(this.api, 'credentials.ehpassword', null), _.get(this.hcp, 'nihii', null), _.get(this.hcp, 'ssin', null), _.get(this.hcp, 'firstName', null), _.get(this.hcp, 'lastName', null), this.cleanNumberSequence(_.get(this.patient, 'ssin', null)), _.get(this.patient, 'firstName', null), _.get(this.patient, 'lastName', null), _.toUpper(this.cleanNumberSequence(_.get(this, 'eidCardNumber', null))), _.toUpper(this.cleanNumberSequence(_.get(this, 'isiCardNumber', null))), null, null,null,null),
          this.api.fhc().Hubcontroller().getTherapeuticLinksUsingGET(_.get(this, 'hubEndPoint', null), _.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenId', null), _.get(this.api, 'credentials.ehpassword', null), _.get(this.hcp, 'lastName', null), _.get(this.hcp, 'firstName', null), _.get(this.hcp, 'nihii', null), _.get(this.hcp, 'ssin', null), _.get(this, 'hcpZip', null), this.cleanNumberSequence(_.get(this.patient, 'ssin', null)))
      ]) : Promise.resolve([]))
      .then(([nationalTlResp, hubTlResp]) => {
          this.set('tabs', 0)
          this.set('selectedTherlink', {});
          this.set('therlinkList', _.concat(_.get(hubTlResp, 'therapeuticLinks', []).map(link => _.assign(link, {tlType: 'hub'})), _.get(nationalTlResp, 'therapeuticLinks', []).map(link => _.assign(link, {tlType: 'national'}))))
          this.set('availableTherlinkType', _.get(this, 'therlinkType').filter(tlType => !this.therlinkList.find(tll => tll.tlType === tlType.type)))
          this.set('selectedTherlinkType', _.head(_.get(this, 'availableTherlinkType', [])))
      }).finally(() => {
              this.set("isLoading",false)
      })
  }

  _readEid(){
      this.dispatchEvent(new CustomEvent('read-eid',{detail: {}, bubbles:true, composed:true}))
  }

  _isRegisterTab(tab){
      return tab === 1
  }

  _registerTherLink(){
      this.set('errorList', [])
      this.set("isLoading",true)
      _.get(this.selectedTherlinkType, 'type', null) === "national" ? this._registerNationalTherLink() : this._registerHubTherLink()
  }

  _registerHubTherLink(){
      this._verifData(["hubEndpoint", "keystoreId", "token", "keystorePassword", "hcpNihii", "hcpSsin", "hcpFirstName", "hcpLastName", "patientInss", "eidCardNumber", "hcpZip", "gender", "dateOfBirth"]) ?
      this.api.fhc().Hubcontroller().getPatientConsentUsingGET1(this.hubEndPoint, _.get(this.api, "keystoreId", null), _.get(this.api, "tokenId", null), _.get(this.api, "credentials.ehpassword", null), _.get(this.hcp, "lastName", null), _.get(this.hcp, "firstName", null), _.get(this.hcp, "nihii", null), _.get(this.hcp, "ssin", null), this.hcpZip, _.get(this.patient, "ssin", null))
          .then(patientConsentResp => !!_.get(patientConsentResp, "signdate", null) && !!(_.get(patientConsentResp, "revokedate", null) === null || !!moment().isBefore(_.get(patientConsentResp, "revokedate", null))) ? Promise.resolve(patientConsentResp) : this.api.fhc().Hubcontroller().putPatientUsingPOST(this.hubEndPoint, _.get(this.api, "keystoreId", null), _.get(this.api, "tokenId", null), _.get(this.api, "credentials.ehpassword", null), _.get(this.hcp, "lastName", null), _.get(this.hcp, "firstName", null), _.get(this.hcp, "nihii", null), _.get(this.hcp, "ssin", null), this.hcpZip, _.get(this.patient, "ssin", null), _.get(this.patient, "firstName", null), _.get(this.patient, "lastName", null), _.get(this.patient, "gender", null), _.get(this.patient, "dateOfBirth", null)))
          .then(patientConsentResp => Promise.all([patientConsentResp, this.api.fhc().Hubcontroller().registerTherapeuticLinkUsingPOST(_.get(this, 'hubEndPoint', null), _.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenId', null), _.get(this.api, 'credentials.ehpassword', null), _.get(this.hcp, 'lastName', null), _.get(this.hcp, 'firstName', null), _.get(this.hcp, 'nihii', null), _.get(this.hcp, 'ssin', null), _.get(this, 'hcpZip', null), _.get(this.patient, 'ssin', null), _.get(this, 'hubPackageId', null), _.toUpper(this.cleanNumberSequence((_.get(this, 'eidCardNumber', null)))))]))
          .then(([patientConsentResp, hubTherlinkResp]) => {
              if(!_.isEmpty(hubTherlinkResp)){
                  this.set('therlinkResponseError', _.get(hubTherlinkResp, "acknowledge.errors") ? _.get(hubTherlinkResp, "acknowledge.errors") : _.get(hubTherlinkResp, "errors"))
                  ;((_.get(hubTherlinkResp, 'complete', null) === true ||  _.get(hubTherlinkResp, "acknowledge.iscomplete") === true)  && !!_.size(_.get(hubTherlinkResp, "therapeuticLinks", []))) ? this._refresh() : null
                  this.dispatchEvent(new CustomEvent('refresh-therlink',{detail: {}, bubbles:true, composed:true}))
              }
          })
          .finally(() => {
              this.set('eidCardNumber', null)
              this.set('isiCardNumber', null)
              this.set("isLoading",false)
          }) : this.set("isLoading",false)

  }

  _registerNationalTherLink(){
     const proof =  _.get(this.patient, 'dateOfBirth', null) && moment().diff(moment(_.get(this.patient, 'dateOfBirth', null), "YYYYMMDD"), 'months', true) > 3 && !!(_.get(this, 'eidCardNumber', null) || _.get(this, 'isiCardNumber', null)) ? "EIDENCODING_NOCARD" : null

      this._verifData(["keystoreId", "keystorePassword", "token", "hcpNihii", "hcpSsin", "hcpFirstName", "hcpLastName", "patientInss", "patientFirstName", "patientLastName", "eidCardNumber"]) ?
       this.api.fhc().Therlinkcontroller().registerTherapeuticLinkUsingPOST1(_.get(this.api, 'keystoreId', null), _.get(this.api, 'tokenId', null), _.get(this.api, 'credentials.ehpassword', null), _.get(this.hcp, 'nihii', null), _.get(this.hcp, 'ssin', null), _.get(this.hcp, 'firstName', null), _.get(this.hcp, 'lastName', null), this.cleanNumberSequence(_.get(this.patient, 'ssin', null)), _.get(this.patient, 'firstName', null), _.get(this.patient, 'lastName', null), _.toUpper(this.cleanNumberSequence(_.get(this, 'eidCardNumber', null))), _.toUpper(this.cleanNumberSequence(_.get(this, 'isiCardNumber', null))), null, null, null, null, null, proof)
           .then(nationalTherlinkResp => {
               if(!_.isEmpty(nationalTherlinkResp)){
                   this.set('therlinkResponseError', _.get(nationalTherlinkResp, "acknowledge.errors") ? _.get(nationalTherlinkResp, "acknowledge.errors") : _.get(nationalTherlinkResp, "errors"))
                   _.get(nationalTherlinkResp, 'complete', null) === true && !!_.size(_.get(nationalTherlinkResp, "therapeuticLinks", [])) ? this._refresh() : null
                   this.dispatchEvent(new CustomEvent('refresh-therlink',{detail: {}, bubbles:true, composed:true}))
               }
           })
           .finally(() => {
               this.set('eidCardNumber', null)
               this.set('isiCardNumber', null)
               this.set("isLoading",false)
          }) : this.set("isLoading",false)
  }

  _verifData(dataToBeVerified){
      const error = []
      !_.get(this.api, 'keystoreId', null) ? error.push({tag: 'keystoreId', code: 'lt-keystoreId-ko', label: 'Keystore id is missing'}) : null
      !_.get(this.api, 'tokenId', null) ? error.push({tag: 'token',code: 'lt-token-ko', label: 'Token id is missing'}) : null
      !_.get(this.api, 'credentials.ehpassword', null) ? error.push({tag: 'keystorePassword',code: 'lt-keystorePassword-ko', label: 'Keystore password is missing'}) : null
      !_.get(this.hcp, 'nihii', null) ? error.push({tag: 'hcpNihii',code: 'lt-hcpNihii-ko', label: 'Hcp nihii is missing'}) : null
      !_.get(this.hcp, 'ssin', null) ? error.push({tag: 'hcpSsin',code: 'lt-hcpSsin-ko', label: 'Hcp ssin is missing'}) : null
      !_.get(this.hcp, 'firstName', null) ? error.push({tag: 'hcpFirstName',code: 'lt-hcpFirstName-ko', label: 'Hcp first name is missing'}) : null
      !_.get(this.hcp, 'lastName', null) ? error.push({tag: 'hcpLastName',code: 'lt-hcpLastName-ko', label: 'Hcp last name is missing'}) : null
      !_.get(this.patient, 'ssin', null) ? error.push({tag: 'patientInss',code: 'lt-patientInss-ko', label: 'Patient inss is missing'}) : null
      !_.get(this.patient, 'firstName', null) ? error.push({tag: 'patientFirstName',code: 'lt-patientFirstName-ko', label: 'Patient first name is missing'}) : null
      !_.get(this.patient, 'lastName', null) ? error.push({tag: 'patientLastName',code: 'lt-patientLastName-ko', label: 'Patient last name is missing'}) : null
      !_.get(this, 'hubEndPoint', null) ? error.push({tag: 'hubEndpoint',code: 'lt-hubEndpoint-ko', label: 'Hub endpoint is missing'}) : null
      !_.get(this, 'hcpZip', null) ? error.push({tag: 'hcpZip',code: 'lt-hcpZip-ko', label: 'Hcp zip is missing'}) : null
      !_.get(this.patient, "gender", null) ? error.push({tag: 'gender',code: 'lt-gender-ko', label: 'Patient gender is missing'}) : null
      !_.get(this.patient, "dateOfBirth", null) ? error.push({tag: 'dateOfBirth',code: 'lt-dateOfBirth-ko', label: 'Patient date of birth is missing'}) : null
      !_.get(this, 'hubPackageId', null) ? error.push({tag: 'hubPackageId',code: 'lt-hubPackageId-ko', label: 'Hub package id is missing'}) : null

      _.get(this.patient, 'dateOfBirth', null) && moment().diff(moment(_.get(this.patient, 'dateOfBirth', null), "YYYYMMDD"), 'months', true) > 3 && !(_.get(this, 'eidCardNumber', null) || _.get(this, 'isiCardNumber', null)) ? error.push({tag: 'eidCardNumber',code: 'lt-eidCardNumber-ko', label: 'Patient eid or isi+ card number is missing'}) : null

      this.set("errorList", error.filter(err => dataToBeVerified.find(data => data === _.get(err, "tag", null))))
      return !_.size(_.get(this, "errorList", [])) > 0
  }

  _isRegisterAvailable(){
      return this.hubSupportsConsent ? ( !!_.get(this, 'therlinkList', []).find(tl => tl.tlType === 'hub' && (_.get(_.get(tl, 'hcParty.ids', []).find(id => id.s === "ID-HCPARTY"), 'value', null) === _.get(this.hcp, 'nihii', ''))) && !!_.get(this, 'therlinkList', []).find(tl => tl.tlType === 'national' && (_.get(_.get(tl, 'hcParty.ids', []).find(id => id.s === "ID-HCPARTY"), 'value', null) === _.get(this.hcp, 'nihii', ''))))
          : (!!_.get(this, 'therlinkList', []).find(tl => tl.tlType === 'national' && (_.get(_.get(tl, 'hcParty.ids', []).find(id => id.s === "ID-HCPARTY"), 'value', null) === _.get(this.hcp, 'nihii', ''))))
  }

  cleanNumberSequence(niss){
      return niss && niss.replace(/ /g, "").replace(/-/g,"").replace(/\./g,"").replace(/_/g,"").replace(/\//g,"")
  }

  _getLabel(label){
      return _.get(label, this.language, label.en)
  }

  _isReturnErrorStatus(error){
      return _.size(error) > 0
  }

  _getError(error){
      return _.get(error, 'description.value', null) ? _.get(error, 'description.value', null) :  _.get(error, 'descr', null)
  }

  _localizeError(error){
      return this.localize(_.get(error, 'code', null), _.get(error, 'label', null) , this.language)
  }

  _isErrorList(){
      return _.get(this, 'errorList', []).length > 0
  }
}
customElements.define(HtPatTherlinkDetail.is, HtPatTherlinkDetail);
