import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import './ht-pat-hub-transaction-preview.js';
import './ht-pat-hub-utils.js';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatHubHistoryViewer extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="dialog-style scrollbar-style">

            #historyViewer{
                height: calc(95% - 12vh);
                width: 95%;
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

            .sublist{
                background:var(--app-light-color);
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

            .buttons{
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 0;
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
            .sumehrPreviewDialog{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .historyViewer{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .hub-menu-list{
                height: 100%;
                width: 30%;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                overflow: auto;
                position: relative;
            }

            .hub-menu-view{
                height: 100%;
                width: 70%;
            }

            .hub-menu-list-header{
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

            .hub-menu-list-header-img{
                height: 40px;
                width: 40px;
                background-color: transparent;
                margin: 4px;
                float: left;
            }

            .hub-menu-list-header-info{
                margin-left: 12px;
                display: flex;
                align-items: center;
            }

            .hub-menu-list-header-img img{
                width: 100%;
                height: 100%;
            }

            .hub-name{
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
                width: 100%;
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
                width: 45%
            }

            .table-line-menu .pat{
                width: 4%;
                padding-right: 4px;
                padding-left: 4px;
            }

            .table-line-menu .dateTit{
                width: 14%;
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
                width: 45%;
            }

            .table-line-menu .patTit{
                width: 4%;
                padding-left: 4px;
                padding-right: 4px;
                text-align: center;
                padding-left: var(--padding-menu-item_-_padding-left);
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

            .pat-access{
                height: 16px;
                width: 16px;
                position: relative;
                color: var(--app-text-color);
            }

            .pat-access::after{
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

            .hub{
                text-transform: uppercase;
            }

            .tab-selector {
                height: 48px;
                background: var(--app-secondary-color-light);
            }

            .content{
                max-height: calc(100% - 45px);
            }

            .pageContent{
                padding: 12px;
                width: auto;
                box-sizing: border-box;
            }

            .modalDialog {
                height: 500px;
                width: 800px;
            }

            /*Local style mods*/
            iron-pages{
                height: calc(100% - 48px);
                width: auto;
                overflow: auto;
            }

            .hub-submenu-title {
                padding-left: 12px;
            }

            .hub-menu-view {
                width: 85%;
            }

            .hub-menu-list{
                width: 15%;
            }

            #commentDialog .content {
                padding: 0 12px;
                display: block;
                height: calc(100% - 120px);
                margin: 0%;
            }

        </style>

        <paper-dialog id="historyViewer">
            <div class="content sumehrPreviewDialog">
                <div class="hub-menu-list">
                    <div class="hub-menu-list-header">
                        <div class="hub-menu-list-header-img">
                            <template is="dom-if" if="[[_isEqual(curHub,'rsw')]]">
                                <img src="data:image/png;base64,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">
                            </template>
                            <template is="dom-if" if="[[_isEqual(curHub,'vitalink')]]">
                                <img src="data:image/png;base64,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">
                            </template>
                            <template is="dom-if" if="[[_isEqual(curHub,'rsb')]]">
                                <img src="data:image/png;base64,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">
                            </template>
                        </div>
                        <div class="hub-menu-list-header-info">
                            <div class="hub-name">
                                [[localize('hub','Hubs',language)]] <span class="hub">[[curHub]]</span>
                            </div>
                        </div>
                    </div>
                    <div class="hub-submenu-container">
                        <div class="hub-submenu-title">
                            <ht-spinner active="[[isLoading]]"></ht-spinner>
                            [[localize('hist_sum_change','History of sumehr updates by Topaz',language)]]
                        </div>
                        <template is="dom-if" if="[[!isLoading]]">
                            <paper-listbox class="menu-content sublist" selectable="paper-item" toggle-shift="">
                                <div class="table-line-menu table-line-menu-top">
                                    <div class="dateTit">[[localize('dat','Date',language)]]</div>
                                </div>
                                <template is="dom-repeat" items="[[updateList]]">
                                    <paper-item data-item\$="[[item]]" on-tap="_showHistoryItem">
                                        <div id="subMenu" class="table-line-menu">
                                            <div class="date" data-item\$="[[item]]">[[_dateFormat(item.created)]]</div>
                                        </div>
                                    </paper-item>
                                </template>
                            </paper-listbox>
                        </template>
                    </div>
                </div>
                <div class="hub-menu-view">
                    <paper-tabs class="tab-selector" selected="{{tabs}}">
                        <paper-tab>
                            <iron-icon class="tabIcon" icon="icons:flip-to-back"></iron-icon> [[localize('before','Before',language)]]
                        </paper-tab>
                        <paper-tab>
                            <iron-icon class="tabIcon" icon="icons:flip-to-front"></iron-icon> [[localize('after','After',language)]]
                        </paper-tab>
                    </paper-tabs>
                    <iron-pages selected="[[tabs]]">
                        <page>
                            <div class="pageContent">
                                <ht-pat-hub-transaction-view id="htPatHubTransactionViewerBefore" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" resources="[[resources]]" on-hub-download="_hubDownload"></ht-pat-hub-transaction-view>
                            </div>
                        </page>
                        <page>
                            <div class="pageContent">
                                <ht-pat-hub-transaction-view id="htPatHubTransactionViewerAfter" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" resources="[[resources]]" on-hub-download="_hubDownload"></ht-pat-hub-transaction-view>
                            </div>
                        </page>
                    </iron-pages>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeHistoryViewer">[[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
        <ht-pat-hub-utils id="htPatHubUtils" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" current-contact="[[currentContact]]" resources="[[resources]]" on-hub-download="_hubDownload" on-close-hub-dialog="_closeOverlay"></ht-pat-hub-utils>
`;
  }

  static get is() {
      return 'ht-pat-hub-history-viewer';
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
          currentContact:{
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
          activeItem: {
              type: Object,
              observer: '_activeItemChanged'
          },
          curHub:{
              type: String,
              value: null,
              observer: '_curHubChanged'
          },
          curEnv:{
              type: String,
              value: null
          },
          hubId:{
              type: Number,
              value : 0
          }
          ,
          hubEndPoint:{
              type: String,
              value:'https://acchub.reseausantewallon.be/HubServices/IntraHub/V3/IntraHub.asmx'
          },
          hubPackageId:{
              type: String,
              value:null
          },
          hubApplication : {
              type: String,
              value:null
          },
          hubSupportsConsent:{
              type: Boolean,
              value: false
          },
          hcpHubConsent:{
              type: Object
          },
          patientHubConsent:{
              type: Object
          },
          patientHubTherLinks:{
              type: Object
          },
          patientHubInfo:{
              type: Object
          },
          hcpZip:{
              type:String,
              value:'1000'
          },
          selectedTransaction:{
              type: Object
          },
          revokeTransactionResp:{
              type: String,
              value: ""
          },
          supportBreakTheGlass:{
              type: Boolean,
              value: false
          },
          breakTheGlassReason:{
              type: String,
              value: null
          },
          newSumehr:{
              type: Object,
              value: null
          },
          hubSumehr:{
              type: Object,
              value: null
          },
          hubSumehrXml:{
              type: String,
              value: null
          },
          itemsToExclude:{
              type:Array,
              value: function(){
                  return [];
              }
          },
          newSumehrToLog:{
              type: Object,
              value: null
          },
          updateList:{
              type:Array,
              value: function(){
                  return [];
              }
          },
          parentDialog:{
              type: Object,
              value: null
          },
          viewHistory:{
              type: Boolean,
              value: false
          },
          messageBefore:{
              type: Object,
              value: null
          },
          messageAfter:{
              type: Object,
              value: null
          },
          myComment:{
              type: String,
              value: ""
          },
          isTest:{
              type: Boolean,
              value: false
          },
          uploading:{
              type: Boolean,
              value: false
          }
      };
  }

  static get observers() {
      return ['apiReady(api,user,opened)','sumehrChanged(newSumehr)'];
  }

  ready() {
      super.ready();
      document.addEventListener('xmlHubUpdated', () => this.xmlHubListener() );
  }

  _dateFormat(date) {
      return date ? this.api.moment(date).format('DD/MM/YYYY') : '';
  }

  apiReady() {
      if (!this.api || !this.user || !this.user.id || !this.opened) return;

      try {
      } catch (e) {
          console.log(e);
      }
  }

  attached() {
      super.attached();
      this.async(this.notifyResize, 1);
  }

  open() {
      this.set('isLoading',true);
      this.set("messageBefore", {});
      this.set("messageAfter", {});
      this.$['htPatHubTransactionViewerBefore'].openHist(this.messageBefore);
      this.$['htPatHubTransactionViewerAfter'].openHist(this.messageAfter);

      this.$['historyViewer'].open();
      this.set('updateList', []);
      this._refresh();
      this.getSumehrUpdateServices();
  }

  _refresh(){
      const propHub = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.preferredhub') ||
          (this.user.properties[this.user.properties.length] = {
              type: {identifier: 'org.taktik.icure.user.preferredhub'},
              typedValue: {type: 'STRING', stringValue: 'rsw'}
          })

      const propEnv = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.eHealthEnv') ||
          (this.user.properties[this.user.properties.length] = {
              type: {identifier: 'org.taktik.icure.user.eHealthEnv'},
              typedValue: {type: 'STRING', stringValue: 'prd'}
          })
      this.set("curHub", propHub.typedValue.stringValue);
      this.set("curEnv", propEnv.typedValue.stringValue);
      this.set("supportBreakTheGlass", false);
      this._setHub();
  }

  _curHubChanged(){
      this._setHub();
  }

  _setHub(){
      const hubConfig = this.$["htPatHubUtils"].getHubConfig(this.curHub, this.curEnv);

      this.set('hcpHubConsent', null);
      this.set('patientHubConsent', null);
      this.set('patientHubTherLinks', null);
      this.set('patientHubInfo', null);
      this.set('breakTheGlassReason', null);

      this.hubId = hubConfig.hubId;
      this.hubEndPoint = hubConfig.hubEndPoint;
      this.set("hubSupportsConsent", hubConfig.hubSupportsConsent);
      this.hubPackageId = hubConfig.hubPackageId;
      this.hubApplication = hubConfig.hubApplication;
      this.set("supportBreakTheGlass", hubConfig.supportBreakTheGlass);
  }

  close() {
      this.$.dialog.close();
  }

  _activeItemChanged(item){

  }

  _isEqual(a,b) {
      return (a === b)
  }

  getAttachment(doc) {
      return this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, doc.id, _.size(doc.encryptionKeys) ? doc.encryptionKeys : doc.delegations).then(
          ({extractedKeys: enckeys}) => this.api.document().getAttachment(_.trim(_.get(doc,"id","")), _.trim(_.get(doc,"attachmentId","")), enckeys.join(','))
      ).catch(err => {
          return err;
      })
  }

  getSumehrUpdateServices(){
      const patient = this.patient;
      this.api.contact().findBy(this.user.healthcarePartyId, patient).then(ctcs => ctcs.map(ctc => this.api.register(ctc, 'contact'))).then(ctcs => {
          ctcs.sort((a, b) => (a.created || 0) - (b.created || 0));
          console.log("Contacts", ctcs);
          this.api.contact().filterServices(ctcs, s => s.tags.find(c => c.type === 'CD-TRANSACTION' && ['sumehr'].includes(c.code))).then(svcs => {
              const contents = svcs.map(svc => this.api.contact().preferredContent(svc, this.language));
              Promise.all(contents.map(cnt => this.api.document().getDocument(cnt.documentId))).then(docs => {
                  Promise.all(docs.map(doc => this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, doc.id, doc.cryptedForeignKeys).then(cfks => ([cfks,doc]))))
                      .then(promResults => {
                          const idsAndDocs = promResults.map(res => {
                              return {messageId: res[0].extractedKeys[0], doc: res[1] };
                          });
                          return Promise.all(idsAndDocs.map(idDoc => this.api.message().getMessage(idDoc.messageId).then(msg => [msg, idDoc.doc]).catch(err => [err, idDoc.doc] ))).then(msgAndDocs => {
                              return msgAndDocs.map(msgNdoc => {return {msg: msgNdoc[0], doc: msgNdoc[1]}});
                          })
                      })
                      .then(msgNdocs => {
                          console.log("msgNdocs", msgNdocs);
                          const docList = msgNdocs.filter(m => m.msg && m.msg.transportGuid && m.msg.transportGuid === "HUB:OUT:UPDATE-SUMEHR" && m.msg.metas.updateReference);
                          const oldDocList = docList.filter(m => m.msg.metas.filename && m.msg.metas.filename === "old");
                          const newDocList = docList.filter(m => m.msg.metas.filename && m.msg.metas.filename === "new");
                          const pairList = oldDocList.map(m => {
                              const newDoc = newDocList.find(mn => mn.msg.metas.updateReference === m.msg.metas.updateReference);
                              return {old : m, new: newDoc, updateReference: m.msg.metas.updateReference, created: m.msg.created};
                          }).filter(m => m.new);
                          //TODO: get Attachments for docs in pairList;

                          Promise.all(pairList.map(pair => this.getAttachment(pair.old.doc).then(
                              attachmentResponse =>
                                  ({oldatt: attachmentResponse,old: pair.old, new: pair.new, created: pair.created, updateReference: pair.updateReference})))).then(
                              pairs => Promise.all(pairs.map(pair => this.getAttachment(pair.new.doc).then(
                                  attachmentResponse =>
                                      ({newatt: attachmentResponse, oldatt: pair.oldatt, old: pair.old, new: pair.new, created: pair.created, updateReference: pair.updateReference})
                              )))).then(
                              pairs => {
                                  // console.log("pairs with att", pairs)
                                  // console.log("pairList", pairList);
                                  this.set("updateList", _.orderBy(pairs, "created", "desc"));
                                  this.set("isLoading", false);
                                  return this.updateList;
                              });
                      })
              });
          })
      })
  }

  _transactionId(tr){
      this.set('selectedTransaction', tr); //is this needed ?
      if(tr) {
          const idLocal = tr.ids.find(id => id.s === "LOCAL");
          if (idLocal) {
              return idLocal.value;
          }
          else {
              return "--";
          }
      }
      else
      {
          return "";
      }
  }

  _transactionType(tr){
      const cdTransType = tr.cds.find(cd => cd.s === "CD-TRANSACTION");
      if(cdTransType){
          return this.localize("cd-transaction-"+cdTransType.value, cdTransType.value, this.language);
      }
      else {
          return "--";
      }
  }

  _transactionDate(tr){
      if(tr.date) {
          let d = new Date(0);
          d.setUTCMilliseconds(tr.date + (tr.time ? tr.time : 0) );
          return this.api.moment(d).format("DD/MM/YY");
      } else {
          return "";
      }
  }

  _transactionAuthor(tr){
      return _.flatMap(tr.author || [], it => it).filter(it => it.familyname).map(it => it.familyname + " " + it.firstname).join("/");
  }

  _transactionCDHcParties(trn, ignore){
      let a = _.flatMap(trn.author || [], it => it);
      let b = _.flatMap(a || [], it => it.cds.find(cd => cd.s === "CD-HCPARTY"));
      return _.flatMap(b.filter(it  => it !== undefined) || [], it => it.value).filter(it => it !== ignore)
      //return "--"
  }

  _patientAccessCD(tr, sl){
      const cdres = tr && tr.cds && tr.cds.length ? tr.cds.find(cd => cd.sl && cd.sl === sl) : undefined;
      return cdres
  }

  _patientAccessDate(tr){
      const cd1 = this._patientAccessCD(tr, "PatientAccess");
      let d = "";
      if(cd1){
          const cd2 = cd1.value && cd1.value === "yes" ?  this._patientAccessCD(tr, "PatientAccessDate") : undefined;
          d = (cd1.value === "never" ? this.localize(cd1.value, cd1.value, this.language) : "") + " " + (cd2 && cd2.value ? "" + cd2.value + "" : "") + "";
      }

      return d;
  }

  _patientAccessIcon(tr){
      const cd1 = this._patientAccessCD(tr, "PatientAccess");
      let d = "";
      if(cd1){
          const cd2 = cd1.value && cd1.value === "yes" ?  this._patientAccessCD(tr, "PatientAccessDate") : undefined;
          d = (cd1.value === "never" ? this.localize(cd1.value, cd1.value, this.language) : "") + " " + (cd2 && cd2.value ? "" + cd2.value + "" : "") + "";
      }

      return moment().isBefore(moment(_.trim(d), "DD/MM/YYYY")) ? "no" : moment().isSameOrAfter(moment(_.trim(d), "DD/MM/YYYY"))  ? "yes" : "never"

  }

  _getHcPartyTypes(trns, ignore){
      if(trns){
          let a = _.uniq(_.flatMap(trns.map(trn => this._transactionCDHcParties(trn, ignore))))
          return a
      }
      else {
          return "";
      }
  }

  _filterList(list, hcptype){
      //console.log("filterlist")
      return  list && hcptype ? list.filter(itm => itm.author && itm.author.hcparties && itm.author.hcparties.length > 0 && itm.author.hcparties.filter(hcp => hcp.cds && hcp.cds.length > 0 && hcp.cds.find(cd => cd.s && cd.s === "CD-HCPARTY" && cd.value && cd.value === hcptype)).length > 0) : []
  }

  _patientHasHubConsent(cs){
      if((cs && cs.author && cs.author.hcparties && cs.author.hcparties[0]) || !this.hubSupportsConsent){
          return true;
      }
      else{
          return false;
      }
  }

  getHubEndPoint(){
      return this.hubEndPoint;
  }

  _isTransactionSet(tr){
      let cd = tr.cds.find(cd => cd.value.toLowerCase()==='gettransactionset');
      if(cd){
          return true;
      } else {
          return false;
      }
  }

  xmlHubListener() {
      this._putHubTransactionSet(document.getElementById('putHubXml').value).then(resp => {
          console.log('---response _putHubTransactionSet---');
          console.log(resp);
          this.set("tsResp", resp);
      })
  }

  _closeDialogs(){
      this.$['sumehrPreviewDialog'].close();
  }

  _localizeHcpType(type){
      return this.localize("cd-hcp-"+type, type, this.language)
  }

  _showHistoryItem(e){
      if(e.target && e.target.dataset && e.target.dataset.item) {
          const item = JSON.parse(e.target.dataset.item);
          console.log(item);
          this.set("messageBefore", JSON.parse(item.oldatt));
          this.set("messageAfter", JSON.parse(item.newatt));
          this.$['htPatHubTransactionViewerBefore'].openHist(this.messageBefore);
          this.$['htPatHubTransactionViewerAfter'].openHist(this.messageAfter);
          //this.$["historyViewer"].open();
      }
  }

  _closeHistoryViewer(){
      this.$["historyViewer"].close();
  }
}
customElements.define(HtPatHubHistoryViewer.is, HtPatHubHistoryViewer);
