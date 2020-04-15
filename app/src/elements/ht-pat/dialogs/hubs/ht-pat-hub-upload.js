import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import './ht-pat-hub-transaction-view.js';
import '../../../../styles/dialog-style.js';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatHubUpload extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="dialog-style">

            #hubUploadError{
                height: 300px;
                width: 600px;
            }

            #hubUploadError .modal-title iron-icon{
                margin-right: 12px;
            }

            #hubUploadError .modal-title iron-icon{
                margin-right: 12px;
            }

            hubUploadError .content{
                padding-top: 48px;
                padding-bottom: 48px;
                height: auto;
            }

            #uploadDocumentOnHubDialog{
                height: 400px;
                width: 600px;
            }
        </style>

        <paper-dialog class="" id="uploadDocumentOnHubDialog">
            <div class="modal-title">
                [[localize('hub-upl-fil', 'Upload file on hubs', language)]]
            </div>
            <div class="contnet">
                <paper-input label="Document title" value="{{uploadedDocumentInfo.title}}"></paper-input>

                <paper-dropdown-menu id="documentType" label="Document type">
                    <paper-listbox slot="dropdown-content" selected="{{uploadedDocumentInfo.type}}">
                        <template is="dom-repeat" items="[[cdTransaction]]" as="cd">
                            <paper-item id="[[cd.id]]">[[_getCodeLabel(cd.label)]]</paper-item>
                        </template>
                    </paper-listbox>
                </paper-dropdown-menu>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeUploadDialog"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_uploadDocument"><iron-icon icon="icons:cloud-upload"></iron-icon>  [[localize('hub-upl','Send',language)]]</paper-button>
            </div>
        </paper-dialog>

        <paper-dialog class="modalDialog" id="hubUploadError" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content">
                <template is="dom-repeat" items="[[hubUploadControlError]]" as="error">
                    <p class="textAlignCenter m-t-20">[[error.errorDescription]]</p>
                </template>
            </div>
            <div class="buttons">
                <paper-button class="button" dialog-dismiss="">[[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-hub-upload';
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
          patient:{
            type: Object,
            value: () => {}
          },
          currentContact:{
            type: Object,
            value: () => {}
          },
          language: {
              type: String
          },
          haveTherLinks:{
              type: Boolean,
              value: false
          },
          patientConsent:{
              type: Object,
              value: () => {}
          },
          selectedDocumentIdToUpload:{
              type: String,
              value: null
          },
          hubUploadControlError:{
              type: Object,
              value: () => []
          },
          ehealthSession: {
              type: Boolean,
              value: false
          },
          hubEndPoint: {
              type: Object,
              value: () => {}
          },
          hubId:{
              type: Number,
              value: null
          },
          hubApplication:{
              type: String,
              value:null
          },
          hubPackageId:{
              type: String,
              value:null
          },
          hcp: {
              type: Object,
              value: () => {}
          },
          uploadedDocumentInfo:{
              type: Object,
              value : () => {}
          },
          cdTransaction:{
              type: Object,
              value: () => [
                  {
                      type: 'contactreport',
                      label: {
                          fr : 'Rapport de contact'
                      }
                  },
                  {
                      type: 'labresult',
                      label: {
                          fr : 'Résultat de laboratoire'
                      }
                  },
                  {
                      type: 'note',
                      label: {
                          fr : 'Note'
                      }
                  },
                  {
                      type: 'report',
                      label: {
                          fr : 'Rapport'
                      }
                  },
                  {
                      type: 'diarynote',
                      label: {
                          fr : 'Note de journal'
                      }
                  }
              ]
          }

      };
  }

  static get observers() {
      return [];
  }

  ready() {
      super.ready();
  }

  openHubDocumentUploadDialog(){
      this.set('hubUploadControlError', [])

      if (!this.selectedDocumentIdToUpload) return;

      this.$['uploadDocumentOnHubDialog'].open()

      if(this.ehealthSession && this.haveTherLinks && this.patientConsent.complete === true && this.patientConsent.consent){
          this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp => {
              this.set('hcp', hcp)
              this.set('uploadedDocumentInfo', {})
              this.$['uploadDocumentOnHubDialog'].open()
          })
      }else{
          !this.ehealthSession ? this.push('hubUploadControlError', {errorDescription: this.localize("notConnectedToeHealth", "You are not connected to your ehealth yet", this.language)}) : null
          !this.haveTherLinks ? this.push('hubUploadControlError', {errorDescription: this.localize("noTherapeuticLink", "You doesn't have any therapeutic link with the patient", this.language)}) : null
          this.patientConsent.complete === false || !this.patientConsent.consent ? this.push("hubUploadControlError", {errorDescription: this.localize("noConsent", "You doesn't have any consent with the patient", this.language)}) : null

          this.set("_bodyOverlay", true)
          this.$["hubUploadError"].open()
      }

  }

  _uploadDocument(){


      // Todo: when saving SERVICE, tag it as such: (for ht-pat-documents-directory-dialog)
      // {type: 'CD-TRANSACTION', code: this.selectedDocumentToBeImported && this.selectedDocumentToBeImported.docType ? this.selectedDocumentToBeImported.docType : 'report'},
      // {type: 'HUB-TRANSACTION', code: 'upload'},


  /*
      this.api.document().getDocument(this.selectedDocumentIdToUpload)
          .then(doc => Promise.all([doc, this.api.document().getAttachment(doc.id, doc.attachmentId, null)]))
          .then(([doc, att]) => Promise.all([doc, this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("decrypt", this.user, doc, att)]))
          .then(([doc, decryptedContent]) => {
              const base64Content = btoa(String.fromCharCode.apply(null, new Uint8Array(decryptedContent)))

              this.api.bekmehr().exportNote(this.patient.id, this.language, null, "note", new models.NoteExportInfoDto({comment: base64Content})).then(kmehr => {
                  console.log(kmehr)
              })


              this.api.fhc().Hubcontroller().putTransactionUsingPOST(this.hubEndPoint, this.api.keystoreId, this.api.tokenId, this.api.credentials.ehpassword, this.hcp.lastName, this.hcp.firstName, this.hcp.nihii, this.hcp.ssin, '6000',
                  this.hubId, this.patient.ssin, output, this.hubPackageId, this.hubApplication
              )
          })
  */
  }

  createHubsMessage(doc, contentOfDoc){

  }

  _closeUploadDialog(){
      this.$['uploadDocumentOnHubDialog'].close()
  }

  _getCodeLabel(label){
      return label && label[this.language] ? label[this.language] : "No traduction"
  }
}
customElements.define(HtPatHubUpload.is, HtPatHubUpload);
