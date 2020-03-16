import '../../ht-spinner/ht-spinner.js';
import '../../dynamic-form/ckmeans-grouping.js';
import '../../../styles/dialog-style.js';
import '../../../styles/notification-style.js';

import _ from 'lodash/lodash';
import moment from 'moment/src/moment';
import promiseLimit from 'promise-limit';

import XLSX from 'xlsx'

import {TkLocalizerMixin} from "../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtImportMfDialog extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="dialog-style">
            .subcontent{
                margin-top: 1px;
                box-sizing: border-box;
                padding: 12px;
            }

            /*****/

            .midbuttons {
                bottom: 0;
                width: 100%;
                height: auto;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-end;
                align-items: center;
                padding: 8px 12px;
                box-sizing: border-box;
                border-top: 1px solid var(--app-background-color-dark);
            }

            .row-button {
                --paper-button-ink-color: var(--app-secondary-color-dark);
                color: var(--app-text-color);
                font-weight: 400;
                font-size: var(--font-size-normal);
                height: 28px;
                text-transform: capitalize;
            }

            .import-spinner {
                height: 42px;
                align: center;
                width: 42px;
            }

            paper-dialog {
                width: 80%;
                height:80%;
                min-width:30%;
                margin: 0;
            }

            paper-radio-group paper-radio-button {
                line-height: 48px;
            }


            vaadin-grid {
                height: 100%;
                max-height:100%;
                overflow-y: auto;
                border: none;
                --vaadin-grid-body-row-hover-cell: {
                    /* background-color: var(--app-primary-color); */
                    color: white;
                };
                --vaadin-grid-body-row-selected-cell: {
                    background-color: var(--app-primary-color);
                    color: white;
                };
            }



            .supercontent{
                height:80%;
                padding-top: 0px;
                overflow-y: auto;
            }

            #loading {
                padding: 10px
            }

            .status-green {
                background: #07f8804d;
            }

            .ok-circle {
                color: green;
            }

            .status-red {
                background: #ff4d4d4d;
            }

            .extra-info{
                color:var(--app-text-color-disabled);
                font-style: italic;
                font-size: 80%;
            }

        </style>


        <paper-dialog id="dialog">
            <h2 class="modal-title">[[localize('upl_mffil','Upload SMF/PMF files',language)]]<span class="extra-info">[[localize('xml_files', '(XML files)', language)]]</span></h2>
            <div class="content">
                <div class="subcontent">
                    <vaadin-upload id="vaadin-upload" no-auto="" files="{{files}}" accept="text/xml,application/xml" target="[[api.host]]/document/{documentId}/attachment/multipart" method="PUT" form-data-name="attachment" on-upload-request="_mfAddCredentials" on-upload-success="_mfFileUploaded">

                        <!--                        <slot name="file-list">

                                                <vaadin-grid items="[[files]]" as="file">
                                                    <vaadin-grid-column width="150px">
                                                        <template class="header">
                                                            [[localize('file','File',language)]]
                                                        </template>
                                                        <template>
                                                            <vaadin-upload-file file="[[file]]"></vaadin-upload-file>
                                                        </template>
                                                    </vaadin-grid-column>
                                                </vaadin-grid>
                                                </slot>-->

                    </vaadin-upload>
                </div>


                <template is="dom-if" if="[[patientCheckStatuses.length]]">
                    <h2 class="modal-title">[[localize("pat_import_exist","Patient exists status",language)]]</h2>
                    <div class="subcontent">
                        <vaadin-grid items="[[patientCheckStatuses]]">
                            <vaadin-grid-column width="150px">
                                <template class="header">
                                    [[localize('file','File',language)]]
                                </template>
                                <template>
                                    [[item.filename]]
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="150px">
                                <template class="header">
                                    [[localize('smf_patient','Patient SMF',language)]]
                                </template>
                                <template>
                                    [[item.smf_patients]]
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="150px">
                                <template class="header">
                                    [[localize('existing_patient','Patient existant',language)]]
                                </template>
                                <template>
                                    [[item.existing_patients]]
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="70px">
                                <template class="header">
                                    [[localize('import_in_new_patient','Import dans nouveau patient',language)]]
                                </template>
                                <template>
                                    <paper-button class="row-button button button--save" docid="[[item.document.id]]" on-click="_renameSmfPatient">
                                        <iron-icon icon="vaadin:plus-circle-o" docid="[[item.document.id]]" on-click="_renameSmfPatient"></iron-icon>
                                    </paper-button>
                                </template>
                            </vaadin-grid-column>
                            <vaadin-grid-column width="70px" id="checkboxColumn">
                                <template class="header">
                                    <template is="dom-if" if="[[!equal(patientCheckStatuses.length, 1)]]">
                                        <paper-checkbox id="checkboxToggleAll" on-checked-changed="_toggleAllCheckboxes"> </paper-checkbox>
                                    </template>
                                    [[localize('import_in_existing_patient','Import dans patient existant',language)]]
                                </template>
                                <template>
                                    <template is="dom-if" if="[[equal(patientCheckStatuses.length, 1)]]">
                                        <paper-button class="row-button button button--save" docid="[[item.document.id]]" on-click="acceptClickedImport">
                                            <iron-icon icon="vaadin:compress" docid="[[item.document.id]]" on-click="acceptClickedImport"></iron-icon>
                                        </paper-button>
                                    </template>
                                    <template is="dom-if" if="[[!equal(patientCheckStatuses.length, 1)]]">
                                        <paper-checkbox class="fusion-checkbox" checked="{{item.check}}" on-change="_refreshFusionButton"> </paper-checkbox>
                                    </template>
                                </template>
                            </vaadin-grid-column>
                        </vaadin-grid>
                    </div>
                    <div class="midbuttons">

                        <template is="dom-if" if="[[!equal(patientCheckStatuses.length, 1)]]">
                            <paper-button class="button button--save" on-click="acceptImport" disabled="[[!_hasPatientToFusion]]">
                                <iron-icon icon="vaadin:compress"></iron-icon>
                                [[localize('accept_fusion','Importer dans les patients existants',language)]]
                            </paper-button>
                        </template>
                    </div>

                </template>

                <h2 class="modal-title">[[localize("pat_import_sta","Patient import status",language)]] <span class="extra-info">([[remainingPatientImports.length]] [[localize("file_import_remaining", "remaining files")]])</span></h2>
                <div class="subcontent">
                    <vaadin-grid items="[[patientImportStatuses]]">
                        <vaadin-grid-column width="150px">
                            <template class="header">
                                [[localize('file','File',language)]]
                            </template>
                            <template>
                                [[item.filename]]
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column width="150px">
                            <template class="header">
                                [[localize('pati','Patient',language)]]
                            </template>
                            <template>
                                [[item.patientsLabel]]
                            </template>
                        </vaadin-grid-column>
                        <!--
                        <vaadin-grid-column width="70px">
                            <template class="header">
                                [[localize('folder','Folder',language)]]
                            </template>
                            <template>
                                <span class\$="[[_statusDetailClass(item.statuses.patient)]]">[[_statusDetail(item.statuses.patient)]]</span>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column width="70px">
                            <template class="header">
                                [[localize('contacts','Contacts',language)]]
                            </template>
                            <template>
                                <span class\$="[[_statusDetailClass(item.statuses.contacts)]]">[[_statusDetail(item.statuses.contacts)]]</span>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column width="70px">
                            <template class="header">
                                Health elements
                            </template>
                            <template>
                                <span class\$="[[_statusDetailClass(item.statuses.healthElements)]]">[[_statusDetail(item.statuses.healthElements)]]</span>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column width="70px">
                            <template class="header">
                                Invoices
                            </template>
                            <template>
                                <span class\$="[[_statusDetailClass(item.statuses.invoices)]]">[[_statusDetail(item.statuses.invoices)]]</span>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column width="70px">
                            <template class="header">
                                [[localize('files','Files',language)]]
                            </template>
                            <template>
                                <span class\$="[[_statusDetailClass(item.statuses.documents)]]">[[_statusDetail(item.statuses.documents)]]</span>
                            </template>
                        </vaadin-grid-column>
                        -->
                        <vaadin-grid-column width="70px">
                            <template class="header">
                                [[localize('import_sta','Statut d import',language)]]
                            </template>
                            <template>
                                <template is="dom-if" if="[[_progressIsState(item.progress, 'pending')]]">
                                    <vaadin-progress-bar value="[[item.progress]]"></vaadin-progress-bar>
                                </template>
                                <template is="dom-if" if="[[_progressIsState(item.progress, 'error')]]">
                                    <span class\$="[[_statusDetailClass(item.statuses.patient)]]">[[_statusDetail(item.statuses.patient)]]</span>
                                </template>
                                <template is="dom-if" if="[[_progressIsState(item.progress, 'done')]]">
                                    <iron-icon class="ok-circle" icon="vaadin:check-circle-o"></iron-icon>
                                </template>
                            </template>
                        </vaadin-grid-column>
                    </vaadin-grid>
                </div>
                </div>
                <div class="buttons">
                    <ht-spinner class="import-spinner" active="[[_isBusy(isImportingPatient, isCheckingPatient, isUploadingFile)]]"></ht-spinner>
                    <paper-button class="button button--other" on-click="cleanImportList">[[localize('reset','Remise a zero',language)]]</paper-button>
                    <paper-button class="button button--other" on-click="abortImport">[[localize('abort','Abort',language)]]</paper-button>
                    <paper-button class="button button--other" on-click="saveImportLog">[[localize('save_import_log','Save import log',language)]]</paper-button>
                    <paper-button class="button" dialog-dismiss="">[[localize('clo','Close',language)]]</paper-button>
                </div>
            
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-import-mf-dialog';
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
          files: {
              type: Array
          },
          remainingPatientImports: {
              type: Array,
              value: () => []
          },
          patientImportStatuses: {
              type: Array,
              value: () => []
          },
          patientCheckStatuses: {
              type: Array,
              value: () => []
          },
          importPromisePool: {
              type: Array,
              value: () => []
          },
          forceImport: {
              type: Boolean,
              value: false
          },
          addedPatient: {
              type: Object,
          },
          isImportingPatient: {
              type: Boolean,
              value: false
          },
          isCheckingPatient: {
              type: Boolean,
              value: false
          },
          isUploadingFile: {
              type: Boolean,
              value: false
          },
          _hasPatientToFusion: {
              type: Boolean,
              value: false
          },
      }
  }

  static get observers() {
      return [
          '_filesChanged(files.*)',
          '_smfPatientRenamed(addedPatient)',
      ];

  }

  constructor() {
      super();
  }

  ready() {
      super.ready();
      const vaadinUpload = this.root.querySelector('#vaadin-upload');
      vaadinUpload && vaadinUpload.set && vaadinUpload.set('i18n.addFiles.many', this.localize('upl_fil','Upload file',this.language))
      vaadinUpload && vaadinUpload.set && vaadinUpload.set('i18n.dropFiles.many', this.localize('uplabel','Drop files here...',this.language))
      this.checkLimit = promiseLimit(5)
      this.importLimit = promiseLimit(2)
      console.log("ready language", this.language)
  }

  open() {
      console.log("open language", this.language)
      this.$.dialog.open()
  }

  _progressIsState(val, state) {
      if(val === 1) {
          return state === 'done'
      } else {
          if(val < 0) {
              return state === 'error'
          } else {
              return state === 'pending'
          }
      }
  }

  //////////////

  _toggleAllCheckboxes(e) {
      console.log("_toggleAllCheckboxes", e.detail.value)
      /*
      this.patientCheckStatuses.forEach(i=>i.checked = e.detail.value)
      */

      //let col = this.shadowRoot.querySelector('#checkboxColumn');
      //let allCheckboxes = col? col.querySelectorAll('.fusion-checkbox') : []
      let allCheckboxes = this.shadowRoot.querySelectorAll('.fusion-checkbox') || []
      console.log("allCheckboxes", allCheckboxes)
      const selectedState = e.detail.value
      allCheckboxes.forEach(box=>{
          box.checked = selectedState;
      })
      this._refreshFusionButton()
  }

  _refreshFusionButton(e) {
      console.log("_hasPatientToFusion", this.patientCheckStatuses.find(s => s.check) != undefined)
      this._hasPatientToFusion = (this.patientCheckStatuses.find(s => s.check) != undefined)
  }

  _isBusy() {
      return this.isImportingPatient || this.isUploadingFile || this.isCheckingPatient
  }

  equal(a, b) {
      return a === b
  }

  _mfAddCredentials(e) {
      e.detail.xhr.setRequestHeader('Authorization', this.api.authorizationHeader());
  }

  _mfFileUploaded(e) {
      const vaadinUpload = this.$['vaadin-upload']
      const f = e.detail.file
      const d = f.doc
      this.push('importPromisePool', this.checkIfPatientExists(d))
      this.isUploadingFile = false
      console.log("file uploaded: " + d.name)
  }

  _filesChanged() {
      const vaadinUpload = this.$['vaadin-upload']
      let prom = Promise.resolve(null)
      const allFiles = this.files.filter(f => !f.attached)
      _.chunk(allFiles, 10).forEach(files =>
          Promise.all(files.map(f => {
                  this.isUploadingFile = true
                  f.attached = true
                  return this.api.document().newInstance(this.user, null, {
                      documentType: 'result',
                      mainUti: this.api.document().uti(f.type),
                      name: f.name
                  }).then(d => this.api.document().createDocument(d)).then(d => {
                      f.doc = d
                      f.uploadTarget = (f.uploadTarget || vaadinUpload.target).replace(/\{documentId\}/, d.id)
                      return f
                  })
              })
          ).then(files => {
              files.length && vaadinUpload.uploadFiles(files)
          })
      )
  }

  acceptImport() {
      const ids = []
      this.patientCheckStatuses.forEach(p => {
          if(p.check) {
              this.push('importPromisePool', this.importPatientFromSmfItem(p))
              ids.push(p.document.id)
          }
      })
      this.$.dialog.querySelector("#checkboxToggleAll").checked = false
      this.set('patientCheckStatuses', this.patientCheckStatuses.filter(pat=> !ids.includes(pat.document.id)))
  }

  acceptClickedImport(e) {
      const docid = e.target.docid
      const item = this.patientCheckStatuses.find(stat => stat.document.id === docid)
      if(item) {
          this.push('importPromisePool', this.importPatientFromSmfItem(item) )
          this.set('patientCheckStatuses', this.patientCheckStatuses.filter(pat=> docid !== pat.document.id))
      } else {
          console.log("can't find document", docid)
      }
  }

  checkIfPatientExists(document) {
      this.checkLimit(() => {
          this.isCheckingPatient = true
          return this.api.bekmehr().checkIfSMFPatientsExists(document.id, null, null, this.user.language, {})
              .then(results => {
                  return Promise.all(results.map(res => {
                      if(res.existingPatientId) {
                          return this.api.patient().getPatientWithUser(this.user, res.existingPatientId).then(pat => {
                              res.existingPatient = pat
                              return res
                          })
                      } else {
                          return res
                      }
                  }))
              })
              .then(results => {
                  if(!this.forceImport && _.some(results, (pat => pat.exists))) {
                      if(results.length > 1) {
                          //// Case 1: refused due to multiple pat per file and at least one exists
                          // backend currently accept only one destination patient as argument to importSmf call
                          const status = {
                              patient: {},
                              smf_patients: this._formatPatientsDetails(results),
                              existing_patients: this._formatPatientsDetails(results.filter(pat=>pat.exists).map(pat=>pat.existingPatient)),
                              patientsLabel: this._formatPatientsDetails(results.filter(pat=>pat.exists).map(pat=>pat.existingPatient)),
                              filename: document.name,
                              document: document,
                              progress: -1,
                              statuses: {
                                  contacts: {success: null, error: null},
                                  healthElements: {success: null, error: null},
                                  invoices: {success: null, error: null},
                                  documents: {success: null, error: null},
                                  patient: {success: false, error: {message:"Can't import more than one patient per file"}}
                              }
                          }
                          this.removeFromRemainingPatientImports(document)
                          this.push('patientImportStatuses', status)
                          this.splice('files', this.files.indexOf(document.name), 1)
                      } else {
                          //// Case 2: patient exists, ask user what to do
                          this.push('patientCheckStatuses', {
                              filename: document.name,
                              smf_patients: this._formatPatientsDetails(results),
                              existing_patients: this._formatPatientsDetails(results.filter(pat=>pat.exists).map(pat=>pat.existingPatient)),
                              patientsLabel: this._formatPatientsDetails(results.filter(pat=>pat.exists).map(pat=>pat.existingPatient)), // will use existing pat
                              document: document,
                              check:false,
                          })
                          this.removeFromRemainingPatientImports(document)
                          this.splice('files', this.files.indexOf(document.name), 1)
                          console.log('files', this.files)
                      }
                  } else {
                      //// Case 3: patient doesnt exists, continue import
                      this.push('importPromisePool',
                          this.importPatientFromSmfItem({
                              document,
                              filename:document.name,
                              smf_patients: this._formatPatientsDetails(results),
                              existing_patients: this._formatPatientsDetails(results.filter(pat=>pat.exists).map(pat=>pat.existingPatient)),
                              patientsLabel: this._formatPatientsDetails(results), // no existing pat
                          }),
                          false // don't add, already added to remaining
                      )
                      this.splice('files', this.files.indexOf(document.name), 1)
                  }
                  this.isCheckingPatient = false
              })
              .catch(err => {
                  //// Case 4: something went wrong
                  const status = {
                      patient: {},
                      filename: document.name,
                      progress: -1,
                      statuses: {
                          contacts: {success: null, error: null},
                          healthElements: {success: null, error: null},
                          invoices: {success: null, error: null},
                          documents: {success: null, error: null},
                          patient: {success: false, error: {message:err}}
                      }
                  }
                  console.log("checkIfPatientExists", err)
                  this.push('patientImportStatuses', status)
                  this.splice('files', this.files.indexOf(document.name), 1)
                  this.removeFromRemainingPatientImports(document)
                  this.isCheckingPatient = false
              })
      })
  }


  importPatientFromSmfItem(smfitem, addToRemaining=true) {
      const document = smfitem.document
      if(addToRemaining) {
          this.push('remainingPatientImports', document);
      }
      const status = {
          patient: {},
          smf_patients: smfitem.smf_patients,
          existing_patients: smfitem.existing_patients,
          patientsLabel: smfitem.patientsLabel,
          filename: document.name,
          progress: 0,
          statuses: {
              contacts: {success: null, error: null},
              healthElements: {success: null, error: null},
              invoices: {success: null, error: null},
              documents: {success: null, error: null},
              patient: {success: null, error: null}
          }
      }
      this.push('patientImportStatuses', status)

      if (this.importAborted) {
          console.log("import aborted: " + document.name)
          this.set('isImportingPatient', false)
          this.set('isCheckingPatient', false)
          this.set('isUploadingFile', false)
          let fakepat = {
              firstName: "Document",
              lastName: document.name
          }
          this.set(['patientImportStatuses', this.patientImportStatuses.indexOf(status), 'statuses'],
              {
                  contacts: {success: null, error: null},
                  healthElements: {success: null, error: null},
                  invoices: {success: null, error: null},
                  documents: {success: null, error: null},
                  patient: {success: false, error: {message: "Aborted"}}
              }
          )
          this.set(['patientImportStatuses', this.patientImportStatuses.indexOf(status), 'progress'], -1)
          this.removeFromRemainingPatientImports(document)
          return Promise.resolve()
      }
      this.set('isImportingPatient', true)
      console.log("importing: " + document.name)
      this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
      this.startTime = Date.now()

      return this.importLimit(() => {

          return this.api.bekmehr().importSmf(document.id, null, false, smfitem.renameTo ? smfitem.renameTo.id : null, this.user.language, {}).then(results => {
              console.log("done importSmf", (Date.now() - this.startTime) / 1000)

              const idxOfStatus = this.patientImportStatuses.indexOf(status)
              this.set(['patientImportStatuses', idxOfStatus, 'progress'], 0.5)
              this.set(['patientImportStatuses', idxOfStatus, 'smf_patients'], this._formatPatientsDetails(results.map(r => r.patient)))
              let patpromises = results.map(result => {
                  return this.api.patient().modifyPatientWithUser(this.user, result.patient).then(pat => {
                      let prolist = [
                          Promise.all(result.forms.map(form => {
                              return this.api.form().newInstance(this.user, pat, form)
                          })).then(forms => this.api.form().modifyForms(forms)),
                          Promise.all(result.ctcs.map(ctc => {
                              return this.api.contact().newInstance(this.user, pat, ctc)
                          })).then(c => {
                              return this.api.contact().modifyContactsWithUser(this.user, c)
                          }),
                          Promise.all(result.hes.map(he => {
                              return this.api.helement().newInstance(this.user, pat, he)
                          })).then(h => {
                              return this.api.helement().modifyHealthElements(h)
                          }),
                          Promise.all(result.documents.map(doc => {
                              return this.api.document().newInstance(this.user, pat, doc)
                          })).then(d => {
                              return this.api.document().modifyDocuments(d)
                          })
                      ]
                      return prolist.reduce((acc, prom) => acc.then(res => prom.then(innerRes => res.concat(innerRes))), Promise.resolve([]))
                          .then(
                              datastatus => {
                                  console.log("done import: " + document.name + ":" + pat.firstName + " " + pat.lastName + "; " + pat.id)
                                  console.log(datastatus)

                                  this.set(['patientImportStatuses', this.patientImportStatuses.indexOf(status), 'progress'], 1 / results.length) // handle multiple pat per file
                                  this.set(['patientImportStatuses', this.patientImportStatuses.indexOf(status), 'statuses.patient.success'], true)
                                  return Promise.resolve()
                              },
                              // patient imported but error importing patient data
                              err => {
                                  // TODO: check specific error for contacts, he, etc
                                  console.log(err)
                                  this.set(['patientImportStatuses', this.patientImportStatuses.indexOf(status), 'statuses'],
                                      {
                                          contacts: {success: null, error: null},
                                          healthElements: {success: null, error: null},
                                          invoices: {success: null, error: null},
                                          documents: {success: null, error: null},
                                          patient: {success: false, error: {message: err}}
                                      }
                                  )
                                  this.set(['patientImportStatuses', this.patientImportStatuses.indexOf(status), 'progress'], -1)
                                  return Promise.resolve()
                              }
                          )
                  })
              })
              return Promise.all(patpromises)
          }).then(
              () => {
                  // import status already pushed at patient level
                  this.removeFromRemainingPatientImports(document)
                  console.log("done encrypt", (Date.now() - this.startTime) / 1000)
                  return Promise.resolve()
              },
              err => {
                  console.log(err)
                  let fakepat = {
                      firstName: "Document",
                      lastName: document.name
                  }
                  this.set(['patientImportStatuses', this.patientImportStatuses.indexOf(status), 'statuses'],
                      {
                          contacts: {success: null, error: null},
                          healthElements: {success: null, error: null},
                          invoices: {success: null, error: null},
                          documents: {success: null, error: null},
                          patient: {success: false, error: {message: err}}
                      }
                  )
                  this.set(['patientImportStatuses', this.patientImportStatuses.indexOf(status), 'progress'], -1)
                  this.removeFromRemainingPatientImports(document)
                  return Promise.resolve()
              }
          )
      })
  }

  removeFromRemainingPatientImports(doc) {
      this.remainingPatientImports = this.remainingPatientImports.filter(item => {
          return item.id !== doc.id
      })
      console.log("remaining: " + this.remainingPatientImports.length)
      if (this.remainingPatientImports.length === 0) {
          this.importAborted = false
          console.log("ALL IMPORT DONE")
          this.set('isImportingPatient', false)
          this.set('isCheckingPatient', false)
          this.set('isUploadingFile', false)
      }
  }

  abortImport() {
      if (this.remainingPatientImports.length) {
          this.importAborted = true
      }
  }

  cleanImportList() {
      this.patientImportStatuses = []
      this.patientCheckStatuses = []

  }

  _renameSmfPatient(e) {
      const docid = e.target.docid
      const item = this.patientCheckStatuses.find(stat => stat.document.id === docid)
      this.docIdBeingRenamed = docid
      if(item) {
          this.dispatchEvent(new CustomEvent('add-patient', { composed: true }));
      } else {
          console.log("can't find document", docid)
      }
  }

  _debugRenameSmfPatient(e) {
      this.dispatchEvent(new CustomEvent('add-patient', { composed: true }));
  }

  _smfPatientRenamed(e) {
      console.log("pat renamed", this.addedPatient)
      if(this.docIdBeingRenamed) {
          const item = this.patientCheckStatuses.find(stat => stat.document.id === this.docIdBeingRenamed)
          if(item) {
              item.renameTo = this.addedPatient
              item.patientsLabel = this._formatPatientsDetails([this.addedPatient]) // existing pat destination changed
              this.push('importPromisePool', this.importPatientFromSmfItem(item))
              this.set('patientCheckStatuses', this.patientCheckStatuses.filter(pat=> this.docIdBeingRenamed !== pat.document.id))
          } else {
              console.log("can't find document", docid)
          }
          this.docIdBeingRenamed = null
      }
  }

  _formatPatientsDetails(patients) {
      return patients.map(pat => pat.firstName + " " + pat.lastName + " (" + (pat.ssin || moment(pat.dateOfBirth, "YYYYMMDD").format("DD/MM/YYYY")) + ")").join(" - ")
  }

  saveImportLog() {
      this.generateXlsFile(this.patientImportStatuses.map(stat => {
          return {
              filename: stat.filename,
              patient: stat.patientsLabel,
              status: this._statusDetail(stat.statuses.patient).toString(),
          }
      }))
  }

  generateXlsFile(data) {

      // Create xls work book and assign properties
      const xlsWorkBook = {SheetNames: [], Sheets: {}}
      xlsWorkBook.Props = {Title: "Patients list", Author: "iCure"}

      // Create sheet based on json data collection
      var xlsWorkSheet = XLSX.utils.json_to_sheet(data)

      // Link sheet to workbook
      XLSX.utils.book_append_sheet(xlsWorkBook, xlsWorkSheet, 'Patients list')

      // Virtual data output
      var xlsWorkBookOutput = new Buffer(XLSX.write(xlsWorkBook, {bookType: 'xls', type: 'buffer'}))

      // Put output to virtual "file"
      var fileBlob = new Blob([xlsWorkBookOutput], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})

      // Create download link and append to page's body
      var downloadLink = document.createElement("a")
      document.body.appendChild(downloadLink)
      downloadLink.style = "display: none"

      // Create url
      var urlObject = window.URL.createObjectURL(fileBlob)

      // Link to url
      downloadLink.href = urlObject
      downloadLink.download = "patient-list_" + moment().format("YYYYMMDD-HHmmss") + ".xls"

      // Trigger download and drop object
      downloadLink.click()
      window.URL.revokeObjectURL(urlObject)

      // Free mem
      fileBlob = false
      xlsWorkBookOutput = false

      return
  }

  _statusDetail(status) {
      return status.success === null ? 'N/A' : status.success ? 'OK' : status.error && status.error.message || 'NOK'
  }

  _statusDetailClass(status) {
      return status.success === null ? '' : status.success ? 'status-green' : 'status-red'
  }
}

customElements.define(HtImportMfDialog.is, HtImportMfDialog);
