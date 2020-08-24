import '../../dynamic-form/dynamic-link.js';
import '../../dynamic-form/dynamic-pills.js';
import '../../../styles/dialog-style.js';
import '../../../styles/paper-tabs-style.js';
import '../../ht-spinner/ht-spinner.js';

import moment from 'moment/src/moment'

import {TkLocalizerMixin} from "../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatPatientWillDialog extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="dialog-style paper-tabs-style">

            paper-tabs{
                width: 50%;
                max-width: 400px;
            }

            .dialog-content{
                padding: 0 12px;
            }

            .dialog-content > div {
                /*display: flex;*/
                /*flex-flow: row nowrap;*/
                /*justify-content: flex-start;*/
                /*align-items: center;*/
            }

            #dialog .dialog-content vaadin-date-picker {
                margin-right: 8px;
            }

            #dialog a {
                text-decoration: none;
                color:	var(--app-secondary-color);
            }

            #dialog{
                min-height: 700px;
                min-width: 950px;
            }

            .links {
                position: absolute;
                right: 0;
            }

            .pills {
                float: right;
            }

            dynamic-link {
                float: right;
                top:4px;
            }

            vaadin-combo-box {
                width: 100%;
            }

            vaadin-text-area {
                width: 100%;
            }

            #dialog .info{
                margin-top:0;
                /*display:flex;*/
                /*flex-flow: row nowrap;*/
                /*justify-content: flex-start;*/
                /*align-items: flex-start;*/
            }

            #dialog .info div{
                margin-right: 24px;
            }

            #dialog .info div p{
                margin: 8px 0;
            }

            #dialog .info div b{
                margin-right: 8px;
            }
            ht-spinner {
                position: relative;
                height: 42px;
                width: 42px;
            }

            .content {
                height: 596px;
            }

            .grid {
                display: grid;
                grid-template-columns: 300px 1fr;
                grid-template-rows: 1fr;
                margin-bottom: 12px;
                grid-column-gap: 12px;
            }

            .flex {
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
            }

            .label {
                color: var(--app-primary-color-dark);
                font-size: var(--font-size-normal);
                justify-content: space-between;
                place-self: center start;
            }

            paper-radio-group {
                --paper-radio-group-item-padding: 8px;
            }

            paper-radio-button {
                --paper-radio-button-checked-color: var(--app-secondary-color);
                --paper-radio-button-size: 12px;
                --paper-radio-button-label: {
                    font-size: var(--font-size-normal)
                };
                padding: 4px 8px;
            }

            #patientWillDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .patientWillDialog{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }


        </style>

<!--        <div class="grid">-->
<!--            <div class="label">[[localize('sev','Severity',language)]]</div>-->
<!--            <paper-radio-group selected="[[_severity(entity, entity.tags, entity.tags.*, entity.status, entity.closingDate)]]" class="flex" on-selected-changed="_severityChanged">-->
<!--                <paper-radio-button name="normal">[[localize('normal','No problem',language)]]</paper-radio-button>-->
<!--                <paper-radio-button name="verylow">[[localize('verylow','Light',language)]]</paper-radio-button>-->
<!--                <paper-radio-button name="low">[[localize('low','Moderate',language)]]</paper-radio-button>-->
<!--                <paper-radio-button name="high">[[localize('high','Severe',language)]]</paper-radio-button>-->
<!--                <paper-radio-button name="veryhigh">[[localize('veryhigh','Total',language)]]</paper-radio-button>-->
<!--            </paper-radio-group>-->
<!--        </div>-->

        <paper-dialog id="patientWillDialog" opened="{{opened}}">
            <h2 class="modal-title">
                [[localize('patientwill','Patient will',language)]]
            </h2>
            <div class="content">
                <div class="dialog-content">
                    <div class="info">
                        <template is="dom-repeat" items="[[patientWillFormItems]]">
                            <div class="grid">
                                <div class="label">[[_myLocalize("cd-patientwill-", item.patientwilltype, language)]]</div>
                                <paper-radio-group data-willitem="[[item]]" selected="[[_selectedPatientWillItem(item)]]" class="flex" on-selected-changed="_selectedPatientWillItemChanged">
                                    <template is="dom-repeat" items="[[item.responsetype]]" as="responsetype">
                                        <paper-radio-button name="[[responsetype.response]]">[[_myLocalize(item.labelprefix , responsetype.response, language)]]</paper-radio-button>
                                    </template>
                                </paper-radio-group>
                            </div>
                        </template>
                    </div>
                </div>
            </div>
            <div class="buttons">
                <ht-spinner active="[[isLoading]]"></ht-spinner>
                <!--<paper-button class="button" on-tap="getResultingPatientWill">[[localize('test','test',language)]]</paper-button>-->
                <paper-button class="button button--other" dialog-dismiss="">[[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_savePatientWill">[[localize('save','save',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-patientwill-dialog';
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
          userHcp: {
              type:Object,
              value: {"supervisorId" : null}
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
          },
          patientWillServices:{
              type: Array,
              value: () => []
          },
          euthanasiaRequest:{
              type: String,
              value: ""
          },
          patientWillFormItems:{
              type: Array,
              value: () => []
          }
      };
  }

  static get observers() {
      return ['apiReady(api,user,opened)'];
  }

  ready() {
      super.ready();
      this.addEventListener('iron-resize', () => this.onWidthChange());
  }

  _dateFormat(date) {
      return date ? this.api.moment(date).format('DD/MM/YYYY') : '';
  }

  onWidthChange() {
      const offsetWidth = this.$['patientWillDialog'].offsetWidth;
      const offsetHeight = this.$['patientWillDialog'].offsetHeight;
      if (!offsetWidth || !offsetHeight) {
          return;
      }
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


  open(patientWillServices) {
      this.set("patientWillServices", patientWillServices);
      this.shadowRoot.querySelector('#patientWillDialog') ? this.shadowRoot.querySelector('#patientWillDialog').open() : null
      this.getResultingPatientWill();

      this.set("patientWillFormItems",
          [
              {cdtype : "CD-PATIENT-WILL", patientwilltype : "bloodtransfusionrefusal", order : 0, responsetype: [{response : "consent"},{response: "noconsent"},{response: "notasked"}], labelprefix: "patientwilldialog_"},
              {cdtype : "CD-PATIENT-WILL", patientwilltype : "clinicaltrialparticipationconsent", order : 0, responsetype: [{response : "consent"},{response: "noconsent"},{response: "notasked"}], labelprefix: "patientwilldialog_"},
              {cdtype : "CD-PATIENT-WILL", patientwilltype : "datareuseforclinicalresearchconsent", order : 0, responsetype: [{response : "consent"},{response: "noconsent"},{response: "notasked"}], labelprefix: "patientwilldialog_"},
              {cdtype : "CD-PATIENT-WILL", patientwilltype : "datareuseforclinicaltrialsconsent", order : 0, responsetype: [{response : "consent"},{response: "noconsent"},{response: "notasked"}], labelprefix: "patientwilldialog_"},
              {cdtype : "CD-PATIENT-WILL", patientwilltype : "euthanasiarequest", order : 0, responsetype: [{response : "consent"},{response: "noconsent"},{response: "notasked"}], labelprefix: "patientwilldialog_"},
              {cdtype : "CD-PATIENT-WILL", patientwilltype : "intubationrefusal", order : 0, responsetype: [{response : "consent"},{response: "noconsent"},{response: "notasked"}], labelprefix: "patientwilldialog_"},
              {cdtype : "CD-PATIENT-WILL", patientwilltype : "omissionofmedicaldata", order : 0, responsetype: [{response : "consent"},{response: "noconsent"},{response: "notasked"}], labelprefix: "patientwilldialog_"},
              {cdtype : "CD-PATIENT-WILL", patientwilltype : "organdonationconsent", order : 0, responsetype: [{response : "consent"},{response: "noconsent"},{response: "notasked"}], labelprefix: "patientwilldialog_"},
              {cdtype : "CD-PATIENT-WILL", patientwilltype : "vaccinationrefusal", order : 0, responsetype: [{response : "consent"},{response: "noconsent"},{response: "notasked"}], labelprefix: "patientwilldialog_"},
              {cdtype : "CD-PATIENT-WILL-RES", patientwilltype : "resuscitation", order : 0, responsetype: [{response : "dnr0"},{response: "dnr1"},{response: "dnr2"},{response: "dnr3"},{response: "notasked"}], labelprefix: "cd-patientwill-res-"},
              {cdtype : "CD-PATIENT-WILL-HOS", patientwilltype : "hospitalisation", order : 0, responsetype: [{response : "hos0"},{response: "hos1"},{response: "hos2"},{response: "notasked"}], labelprefix: "cd-patientwill-hos-"}
          ]
      );
  }

  _myLocalize(prefix, txt){
      return this.localize(prefix + txt,txt,language)
  }

  getResultingPatientWill(){
      console.log(this.patientWillFormItems);

      // //TODO: this function will be replaced by _selectedPatientWillItem(patientwilltype)
      //
      //     //euthanasiarequest:
      //     //s.tags.find(c => c.type === 'CD-ITEM' && ['patientwill'].includes(c.code))
      //     const er = _.orderBy(this.patientWillServices.filter(svc => svc.codes.find(c => c.code === "euthanasiarequest")), 'modified', 'asc');
      //     if(er.length && er.length > 1){
      //         const erToEol = er[0];
      //         const today = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"))
      //         erToEol.endOfLife = today;
      //         this._sendServiceChanged(erToEol);
      //     }
      //     //keep the last set rest to endOfLife
      //     // const today = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"))
      //     // this.set("medicationDetail.newMedication.endOfLife", today)
      //     //this.dispatchEvent(new CustomEvent('value-changed', {detail: {medication: this.medicationDetail, medications:this.medications}, bubbles: true, composed: true}))
      //     console.log("er", er);
      //
      //
      //     this.patientWillFormItems.forEach(itm => {
      //         //get all services corresponding to item.patientwilltype, then remove the oldest versions by setting them end-of-life
      //
      // })
  }

  _selectedPatientWillItem(itm){
      //get all services corresponding to item.patientwilltype, then remove the oldest versions by setting them end-of-life
      const svctmpl = {
          codes: [{
              type: itm.cdtype,
              code: itm.patientwilltype,
              disabled: false
          }],
          tags: [{
              type: "CD-ITEM",
              code: "patientwill",
              disabled: false
          }]
      };
      svctmpl.content = _.fromPairs([[this.language, { stringValue: "care.topaz.patientWill.response|notasked|1" }]]);
      const itmsvcs = _.orderBy(this.patientWillServices.filter(svc => svc.codes.find(c => c.code === itm.patientwilltype)), 'modified', 'asc');
      while(itmsvcs.length && itmsvcs.length > 1){
          const svcToEol = itmsvcs[0];
          const today = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"))
          svcToEol.endOfLife = today;
          console.log("EOL", itm.patientwilltype, svcToEol);
          this._sendServiceChanged(svcToEol);
          itmsvcs.shift();
      }
      const itmsvc = itmsvcs.length && itmsvcs.length > 0 ? itmsvcs[0] : this.api.contact().service().newInstance(this.user, svctmpl);
      //correction of invalid cdtype
      const codeToCorrect = itmsvc.codes.filter(c => c.type !== itm.cdtype && c.code === itm.patientwilltype && c.type !== "care.topaz.customPatientWill").forEach(codeToCorrect => {
          console.log("code to correct", codeToCorrect);
          codeToCorrect.type = itm.cdtype;
      });

      const content = this.api.contact().preferredContent(itmsvc, this.language);
      console.log("service for: ", itm.patientwilltype, itmsvc, content, content && content.stringValue && content.stringValue.split("|").length > 2 ? content.stringValue.split("|")[1] : "notasked");
      itm.svc = itmsvc;
      return content && content.stringValue && content.stringValue.split("|").length > 2 ? content.stringValue.split("|")[1] : "notasked";
  }

  _selectedPatientWillItemChanged(e){
      console.log(e.detail.value, e.model.item);
      const svc = e.model.item.svc;
      //svc.newValue = e.detail.value;
      if(e.detail.value && e.model.item && e.model.item.svc){
          const content = _.fromPairs([[this.language, { stringValue: "care.topaz.patientWill.response|" + e.detail.value +"|1" }]]);
          svc.content = content;
          console.log("svc after update", svc);
      }
  }

  _savePatientWill(){
      this.patientWillFormItems.forEach(itm => {
          console.log(itm.svc);
          this._sendServiceChanged(itm.svc);
      })
      this.shadowRoot.querySelector('#patientWillDialog') ? this.shadowRoot.querySelector('#patientWillDialog').close() : null
  }

  _sendServiceChanged(svc) {
      this.dispatchEvent(new CustomEvent('service-changed', {
          detail: {service: svc},
          bubbles: true,
          composed: true
      }))
  }

  close() {
      this.shadowRoot.querySelector('#patientWillDialog') ? this.shadowRoot.querySelector('#patientWillDialog').close() : null
  }
}
customElements.define(HtPatPatientWillDialog.is, HtPatPatientWillDialog);
