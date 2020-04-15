import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/buttons-style.js';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';
import moment from 'moment/src/moment';
import _ from 'lodash/lodash';
import promiseLimit from 'promise-limit';


import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatHubUtils extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`

`;
  }

  static get is() {
      return 'ht-pat-hub-utils';
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
          patient: {
              type: Object,
              notify: true
          },
          language: {
              type: String
          },
          opened: {
              type: Boolean,
              value: false
          },
          tabs: {
              type:  Number,
              value: 0
          },
          isLoading:{
              type: Boolean,
              value: false
          }
      };
  }

  static get observers() {
      return ['apiReady(api,user,opened)'];
  }

  ready() {
      super.ready();
      // this.addEventListener('iron-resize', () => this.onWidthChange());
      document.addEventListener('xmlHubUpdated', () => this.xmlHubListener() );
  }

  _dateFormat(date) {
      return date ? this.api.moment(date).format('DD/MM/YYYY') : '';
  }

  _timeFormat(date) {
      return date ? this.api.moment(date).format(date > 99991231 ? 'DD/MM/YYYY HH:mm' : 'DD/MM/YYYY') : '';
  }

  _dateFormat2(date, fFrom, fTo){
      return date ? this.api.moment(date, fFrom).format(fTo) : '';
  }

  _shortDateFormat(date, altDate) {
      return (date || altDate) && "'"+this.api.moment((date || altDate)).format('YY') || '';
  }

  _trueOrUnknown(b){
      return b ? this.localize('yes','yes',this.language) : '?'
  }

  _yesOrNo(b){
      return b ? this.localize('yes','yes',this.language) : this.localize('no','no',this.language)
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

  // getHubConfig(){
  //     const propHub = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.preferredhub') ||
  //         (this.user.properties[this.user.properties.length] = {
  //             type: {identifier: 'org.taktik.icure.user.preferredhub'},
  //             typedValue: {type: 'STRING', stringValue: 'rsw'}
  //         })
  //
  //     const propEnv = this.user.properties.find(p => p.type && p.type.identifier === 'org.taktik.icure.user.eHealthEnv') ||
  //         (this.user.properties[this.user.properties.length] = {
  //             type: {identifier: 'org.taktik.icure.user.eHealthEnv'},
  //             typedValue: {type: 'STRING', stringValue: 'prd'}
  //         })
  // }

  getHubConfig(hub, environment){
      const hubConfig = {};
      switch (hub) {
          case 'rsb':
              hubConfig.hubId = 1990000728;
              hubConfig.hubEndPoint = environment ===  'acc' ? 'https://acchub.abrumet.be/hubservices/intrahub/v3/intrahub.asmx' : 'https://hub.abrumet.be/hubservices/intrahub/v3/intrahub.asmx';
              hubConfig.hubSupportsConsent = true;
              hubConfig.hubPackageId = null;
              hubConfig.hubApplication = "" ;//TODO: verify value
              hubConfig.supportBreakTheGlass = false;
              break;
          case 'rsw':
              hubConfig.hubId = 1990000035;
              hubConfig.hubEndPoint = environment === 'acc' ? 'https://acchub.reseausantewallon.be/HubServices/IntraHub/V3/IntraHub.asmx' : 'https://hub.reseausantewallon.be/HubServices/IntraHub/V3/IntraHub.asmx';
              hubConfig.hubSupportsConsent = true;
              hubConfig.hubPackageId = null;
              hubConfig.hubApplication = environment === 'acc' ? 'RSW' : '';
              hubConfig.supportBreakTheGlass =  false;
              break;
          case 'cozo':
              hubConfig.hubId = 1990000134;
              hubConfig.hubEndPoint = environment === 'acc' ? 'https://servicestest.cozo.be/IntrahubServiceTest/servicev3.asmx' : 'https://services.cozo.be/IntrahubService/servicev3.asmx';
              hubConfig.hubSupportsConsent = false;
              hubConfig.hubPackageId = null;
              hubConfig.hubApplication = environment === 'acc' ? 'TST2017' : 'COZO';
              hubConfig.supportBreakTheGlass = false;
              break;
          case 'vitalink':
              hubConfig.hubId = 1990001916;
              hubConfig.hubEndPoint = environment === 'acc' ? 'https://vitalink-acpt.ehealth.fgov.be/vpmg/vitalink-gateway/IntraHubService' : 'https://vitalink.ehealth.fgov.be/vpmg/vitalink-gateway/IntraHubService';
              hubConfig.hubSupportsConsent = false;
              hubConfig.hubPackageId = environment === 'acc' ? "ACC_73424e1e-7eab-4b2c-9a8d-90a2bd1c078f" : "PROD_82fa1e06-7efc-4d84-8f4c-f88513009b9e"; //TODO: replace Pricare by TOPAZ Keys
              hubConfig.hubApplication = "VITALINKGATEWAY";
              hubConfig.supportBreakTheGlass =  true;
              break
      }
      return hubConfig;
  }
}
customElements.define(HtPatHubUtils.is, HtPatHubUtils);
