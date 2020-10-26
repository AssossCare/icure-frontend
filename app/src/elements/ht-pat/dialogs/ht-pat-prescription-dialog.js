import '../../../styles/dialog-style.js';
import '../../../styles/paper-input-style.js';

import _ from 'lodash/lodash';
import JsBarcode from 'jsbarcode';
import mustache from "mustache/mustache.js";
import moment from 'moment/src/moment';


import '@vaadin/vaadin-grid/vaadin-grid-column'
import '@vaadin/vaadin-grid/vaadin-grid'
import '@vaadin/vaadin-grid/vaadin-grid-sort-column'
import '@vaadin/vaadin-date-picker/vaadin-date-picker'
import '@polymer/paper-checkbox/paper-checkbox'
import {} from '@polymer/polymer/lib/elements/dom-repeat.js';

import {TkLocalizerMixin} from "../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatPrescriptionDialog extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
    return html`
        <style include="dialog-style paper-input-style">

            paper-dialog {
				width: 80%;
                min-width:30%;
                margin: 0;
			}

            vaadin-grid {
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


            @media screen and (max-width: 952px) {
                paper-dialog#prescriptionDialog {
                    position: fixed;
                    max-height: none;
                    max-width: none !important;
                    top: 64px !important;
                    left: 0 !important;
                    height: calc(100vh - 64px - 20px) !important; /* 64 = app-header 20 = footer */
                    width: 100% !important;
                }
            }

            @media screen and (max-width: 800px) {
				.endline {
					padding-bottom: 16px;
				}
				paper-radio-group paper-radio-button {
					line-height: normal;
				}
			}

            @media screen and (max-width: 672px) {
                .button {
                    margin: 4px 0;
                }
            }

            @media screen and (max-width: 664px) {
                paper-radio-group, .buttons {
                    flex-direction: column;
                }
            }

            
            ht-spinner {
                width: 42px;
                height: 42px;
            }


        </style>
        
        <!-- new Dialog -->
        
        <paper-dialog id="prescriptions-list-dialog" class="presc-dialog">
            <h2 class="modal-title">[[localize('list_prescription','Liste des prescriptions',language)]]</h2>
            <div class="content">
                <div class="error-message">[[errorMessage]]</div>
                <template is="dom-if" if="[[isLoading]]">
                    <div style="height: 50px; width: 50px;"><ht-spinner active="[[isLoading]]"></ht-spinner></div>
                </template>
                <vaadin-grid id="prescriptions-grid" items="[[prescriptionsList]]">
                    <vaadin-grid-sort-column path="name" header="[[localize('name','Nom',language)]]"></vaadin-grid-sort-column>
                    <vaadin-grid-column path="posology" header="[[localize('posology','Posology',language)]]"></vaadin-grid-column>
                    <vaadin-grid-column header="[[localize('start_valid_date','date début validité',language)]]" frozen>
                        <template>
                            <template is="dom-if" if="[[!_isReadOnly(item.id,prescriptionsGroups,prescriptionsGroups.*)]]">
                                <vaadin-date-picker i18n="[[i18n]]" value="[[item.startValidDate]]" setter$="[[item.id]]" disabled="[[_isReadOnly(item.id,prescriptionsGroups,prescriptionsGroups.*)]]" on-value-changed="_setStartDate" min="[[_today()]]" max="[[_oneYear()]]"></vaadin-date-picker>
                            </template> 
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column header="[[localize('end_valid_date','date de fin de validité',language)]]" frozen>
                        <template>
                            <template is="dom-if" if="[[!_isReadOnly(item.id,prescriptionsGroups,prescriptionsGroups.*)]]">
                                <vaadin-date-picker i18n="[[i18n]]" value="[[item.endValidDate]]" setter$="[[item.id]]" disabled="[[_isReadOnly(item.id,prescriptionsGroups,prescriptionsGroups.*)]]" on-value-changed="_setEndDate" min="[[_getMin(item.startValidDate,item)]]" max="[[_oneYear()]]"></vaadin-date-picker>
                            </template>
                        </template>
                    </vaadin-grid-column>
                    <dom-repeat items="[[prescriptionsGroups]]" as="group"><template>
                        <vaadin-grid-column flex-grow="0" width="58px" header="[[_getGroupIndex(group)]]">
                            <template>
                                <paper-checkbox class="styled" prescription$="[[item.id]]" group$="[[_getGroupIndex(group)]]" disabled="[[_isCheckBoxDisabled(group,item.id,prescriptionsGroups,prescriptionsGroups.*)]]" on-change="_check" checked="[[_isCheck(item.id,group)]]"></paper-checkbox>
                            </template>
                        </vaadin-grid-column>
                    </template></dom-repeat>
                </vaadin-grid>
            </div>
            <div class="buttons">
                <paper-button class="button" dialog-dismiss>[[localize('can', "Annuler", language)]]</paper-button>
                <!-- Request by @Fabien Zimmer
                <paper-button class="button button--other" on-tap="sendByMail"><iron-icon icon="communication:email"></iron-icon> [[localize('sendByEmail','Send by email',language)]]</paper-button>-->
                <paper-button class="button button--other" on-tap="print" ><iron-icon icon="print"></iron-icon>[[localize('print_no_recipe', "Imprimer sans recipe", language)]]</paper-button>
                <paper-button class="button button--save" autofocus on-tap="_sendToRecipe"><iron-icon icon="print"></iron-icon>[[localize('send_to_recipe','Envoyer à Recip-e',language)]]</paper-button>
            </div>
        </paper-dialog>

        <canvas id="barCode"></canvas>
`;
  }

  static get is() {
      return 'ht-pat-prescription-dialog';
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
          patient: {
              type: Object
          },
          i18n : {
              type: Object,
              value: ()=>{}
          },

          //new variables
          currentContact: {
              type: Object
          },
          isLoading:{
              type: Boolean,
              value : false
          },
          selectedFormat: {
              type: String,
              value : 'presc'
          },
          samVersion: {
              type: Object,
              value: ()=> {}
          },
          errorMessage:{
              type: String,
              value: ""
          },
          prescriptionsGroups:{
              type: Array,
              object : ()=>[]
          }
      }
  }

  static get observers() {
      return [
      ];
  }

    ready() {
        super.ready();
        this.set('selectedFormat', localStorage.getItem('prefillFormat') ? localStorage.getItem('prefillFormat') : 'presc')
    }

    _check(e){
        const prescr =_.get(e.currentTarget.getAttributeNode("prescription"),'value','')
        const group = _.get(e.currentTarget.getAttributeNode("group"),'value','')-1
        if(!prescr || group<0)return;
        const index = _.get(this,"prescriptionsGroups",[]).findIndex(group => (group || []).find(id => id===prescr))

        index>=0 && this.set("prescriptionsGroups."+index,_.get(this,"prescriptionsGroups."+index,[]).filter(id => id!==prescr) || [])
        if(group!==index){
            this.push("prescriptionsGroups."+group,prescr)
        }

        this.set("prescriptionsGroups",_.get(this,"prescriptionsGroups",[]).filter(group => group && group.length))
        this.push("prescriptionsGroups",[])
        this.completeDate()
    }

    _isReadOnly(id){
        return !_.get(this,"prescriptionsGroups",[]).find(group => group && group.length && group[0]===id)
    }

    _isCheck(id,group){
        return !!(group || []).find(g => g===id)
    }

    open() {
        this.shadowRoot.querySelector('#prescriptions-list-dialog').open()
        this.set("prescriptionsList", this.api.contact().filteredServices([this.currentContact], (service)=> this._isDrugNotPrescribed(service)).map(s => {
            return {
                name : _.get(this.api.contact().medicationValue(s),"medicinalProduct.label",false) || _.get(this.api.contact().medicationValue(s),"medicinalProduct.intendedname",""),
                posology : this.api.contact().medication().posologyToString(this.api.contact().medicationValue(s, this.language), this.language) ,
                startValidDate :this._today(),
                id : s.id,
                endValidDate :this._endDate()
            }
        }))
        this.api.electron().getPrinterSetting(this.user.id).then( data => {
            this.set('selectedFormat',data && data.data && JSON.parse(data.data) && JSON.parse(data.data).find(x => x.type==="recipe") ? JSON.parse(data.data).find(x => x.type==="recipe").format : "A4")
        })

        this.set("prescriptionsGroups",[[]])
        this.shadowRoot.querySelector('#prescriptions-grid').setRowHeight("50px")

    }

    _isDrugNotPrescribed(s) {
        return _.get(s, 'tags', []).find(t => (t.type === 'CD-ITEM' && t.code === 'treatment') || (t.type === 'ICURE' && t.code === 'PRESC')) && !s.endOfLife && !s.tags.find(t => t.type === 'CD-LIFECYCLE' && ['ordered', 'completed', 'delivered'].includes(t.code)) && this.api.contact().medicationValue(s, this.language)
    }

    _today(){
        return moment().format("YYYY-MM-DD")
    }

    _endDate(){
        return moment().add(3,"month").subtract(1,"day").format("YYYY-MM-DD")
    }

    _oneYear(){
        return moment().add(1,"year").format("YYYY-MM-DD")
    }

    _getMin(date){
        return date ? moment(date,"YYYY-MM-DD").add(1,"day").format("YYYY-MM-DD") : this._today()
    }

    _setStartDate(e){
        _.get(this,"prescriptionsList",[]).find(p => p.id===_.get(e.currentTarget.getAttributeNode("setter"),'value','')) && this.set("prescriptionsList."+(_.get(this,"prescriptionsList",[]).findIndex(p => p.id===_.get(e.currentTarget.getAttributeNode("setter"),'value','')))+".startValidDate",_.get(e,"detail.value",""))
        this.completeDate()
    }

    _setEndDate(e){
        _.get(this,"prescriptionsList",[]).find(p => p.id===_.get(e.currentTarget.getAttributeNode("setter"),'value','')) && this.set("prescriptionsList."+(_.get(this,"prescriptionsList",[]).findIndex(p => p.id===_.get(e.currentTarget.getAttributeNode("setter"),'value','')))+".endValidDate",_.get(e,"detail.value",""))
        this.completeDate()
    }

    completeDate(){
        _.get(this,"prescriptionsGroups",[]).map(group => {
            if(group.length<=1)return;
            const mainId = _.get(group,"0","")
            const mainIndex = _.get(this,"prescriptionsList",[]).findIndex(prescr => prescr.id===mainId)
            group.filter(id => id!==mainId).map(id =>{
                _.get(this,"prescriptionsList",[]).find(prescr => prescr.id===id) && this.set("prescriptionsList."+_.get(this,"prescriptionsList",[]).findIndex(prescr => prescr.id===id)+".startValidDate",_.get(this,"prescriptionsList."+mainIndex+".startValidDate",""))
                _.get(this,"prescriptionsList",[]).find(prescr => prescr.id===id) && this.set("prescriptionsList."+_.get(this,"prescriptionsList",[]).findIndex(prescr => prescr.id===id)+".endValidDate",_.get(this,"prescriptionsList."+mainIndex+".endValidDate",""))
            })

        })
    }

    _isCheckBoxDisabled(group,id){
        return group.length>=5 && !group.find( g => g.includes(id))
    }

    _sendToRecipe(){


        //todo @julien gestion des prescriptions de 5 medocs

        //const prescriptions = _.get(this.shadowRoot.querySelector('#prescriptions-grid'),"selectedItems",[])
        const prescriptionGroups = _.get(this,"prescriptionsGroups",[]).map(group => group.map(id => _.get(this,"prescriptionsList",[]).find(prescr => prescr.id===id)))

        if(!prescriptionGroups || !prescriptionGroups.length)return;

        if(prescriptionGroups.find( group => group.find(p => !p.startValidDate || !p.endValidDate))){
            this.set("errorMessage",this.localize("err_date_no_complete","Erreur: une des dates n'a pas été complété"))
            return;
        }

        const barcode = this.root.querySelector("#barCode");
        let toPrint = undefined
        this.set('selectedFormat', (this.patient.ssin && this.api.tokenId) ? this.selectedFormat : 'presc')


        if (this.patient.ssin && this.api.tokenId) { // if ehealth connected
            this.set("isLoading",true)
            this.api.besamv2().getSamVersion()
                .then(v => {
                    this.set('samVersion', v)
                    return this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
                })
                .then(hcp => {
                    return Promise.all(prescriptionGroups.map( group=> {
                        if(!group || !group.length)return Promise.resolve([])
                        const medications = group.map( p => {
                            const service = this.currentContact.services.find(s => p.id === s.id)
                            const medicationValue = this.api.contact().medicationValue(service, this.language)
                            if (medicationValue) {
                                medicationValue.status = 0 ;
                            }
                            return service
                        })

                        return medications.length ? this.api.sleep(100).then(() =>this.api.fhc().Recipe().createPrescriptionV4UsingPOST(this.api.keystoreId, this.api.tokenId, "persphysician", hcp.nihii, hcp.ssin, hcp.lastName, this.api.credentials.ehpassword, {
                            patient: _.omit(this.patient, ['personalStatus']),
                            hcp: hcp,
                            feedback: false,
                            medications: medications.map( service => _.assign(_.omit(this.api.deleteRecursivelyNullValues(this.addEmptyPosologyIfNeeded(this.api.contact().medicationValue(service, this.language))), ['substanceProduct']), {instructionsForReimbursement: "NOT_REIMBURSABLE"})),
                            deliveryDate: moment(group[0].startValidDate, "YYYY-MM-DD").format("YYYYMMDD"),
                            samVersion: _.get(this, 'samVersion.version', null),
                            expirationDate: moment(group[0].endValidDate, "YYYY-MM-DD").format("YYYYMMDD"),
                            vendorPhone: "+3223192241",
                            vendorEmail: "support@topaz.care",
                            packageVersion: "1",
                            packageName: "Topaz"
                        })).then(recipe => {
                            this._download(_.get(recipe,"xmlRequest",""))
                            return Promise.all(group.map( p => {
                                const service = this.currentContact.services.find(s => p.id === s.id)
                                const medicationValue = this.api.contact().medicationValue(service, this.language)
                                p.rid = recipe.rid
                                p.recipeResponse = recipe
                                this.api.contact().medicationValue(service, this.language).prescriptionRID = _.get(recipe, "rid", "")
                                return this.api.receipt().createReceipt({
                                    documentId: service.id,
                                    references: [recipe.rid],
                                    category: "recip-e",
                                    subCategory: "transactionRequest"
                                })
                                    .then(receipt => this.api.receipt().setReceiptAttachment(receipt.id, "kmehrResponse", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(_.get(recipe, "xmlRequest", null))))))
                                    .then((receipt) => {
                                        medicationValue.status = 2 ;
                                        service.receipts = receipt.id ? _.assign(service.receipts || {}, {recipe: receipt.id}) : service.receipts
                                        return service
                                    }).catch(error => {
                                        this.set("errorMessage", this.localize("error_send_recipe", "Error:" + error))
                                        return service;
                                    })
                            }))
                        }) : Promise.resolve({})

                    })).then((services) => {
                        _.compact(_.flatMap(services)).filter(s => s.id).map(service => {
                            const id = "CD-LIFECYCLE|ordered|1";
                            const tag = service.tags.find(t => t.type === 'CD-LIFECYCLE')
                            if (tag) {
                                tag.id = id;
                                tag.code = "ordered"
                            } else {
                                service.tags.push({
                                    id: id,
                                    code : "ordered",
                                    type : 'CD-LIFECYCLE'
                                })
                            }

                            const medicationValue = this.api.contact().medicationValue(service, this.language)
                            if (medicationValue) {
                                medicationValue.status |= 4;
                            }
                        })
                        const toPrint = this._formatPrescriptionsBody(prescriptionGroups.filter( g => g.length), _.compact(_.flatMap(services)).filter(s => s.id), this.patient, hcp, barcode)
                        return this._pdfReport(services, toPrint, this.selectedFormat)
                    }).catch(error => {
                        this.set("errorMessage", this.localize("error_send_recipe", "Error:" + error))
                    }).finally(() => {
                        this.set("isLoading",false)
                        this.dispatchEvent(new CustomEvent("save-current-contact",{bubbles:true,composed:true,detail:{}}))
                        this.shadowRoot.querySelector('#prescriptions-grid').selectedItems=[]
                        this.set("prescriptionsList", this.api.contact().filteredServices([this.currentContact], (service)=> this._isDrugNotPrescribed(service)).map(s => {
                            return {
                                name : _.get(this.api.contact().medicationValue(s),"medicinalProduct.label",false) || _.get(this.api.contact().medicationValue(s),"medicinalProduct.intendedname",""),
                                posology : this.api.contact().medication().posologyToString(this.api.contact().medicationValue(s, this.language), this.language) ,
                                startValidDate :this._today(),
                                id : s.id,
                                endValidDate :this._endDate()
                            }
                        }))
                    })
                })

        }else{
            this.set("errorMessage",this.localize("err_ehealth_token","Erreur: vous n'êtes pas connecté à e-health"))
        }
    }

    print(e) {
        const prescriptions = _.get(this.shadowRoot.querySelector('#prescriptions-grid'),"selectedItems",[])

        if(!prescriptions)return;

        if(prescriptions.find(p => !p.startValidDate || !p.endValidDate)){
            this.set("errorMessage",this.localize("err_date_no_complete","Erreur: une des dates n'a pas été complété"))
            return;
        }
        this.set('selectedFormat', (this.patient.ssin && this.api.tokenId) ? this.selectedFormat : 'presc')
        const element = this.root.querySelector("#barCode");
        const services = this.currentContact.services.filter(s => prescriptions.find(p=> p.id === s.id))

        this.set("isLoading",true)

        this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId)
        .then(hcp => {
            const toPrint = this._formatPrescriptionsBody(prescriptions, services, this.patient, hcp, element)
            return this._pdfReport(services, toPrint, this.selectedFormat)
        })
        .then(() => {
            services.map(s => {
                const tag = s.tags.find(t => t.type === 'CD-LIFECYCLE')
                if (tag) {
                    tag.id = id;
                    tag.code = "ordered"
                } else {
                    s.tags.push({
                        id: id,
                        code : "ordered",
                        type : 'CD-LIFECYCLE'
                    })
                }
                const medicationValue = this.api.contact().medicationValue(s, this.language)
                if (medicationValue) {
                    medicationValue.status = 1;
                }
            })
        })
        .finally(()=>{
            this.set("isLoading",false)
            this.dispatchEvent(new CustomEvent("save-current-contact",{bubbles:true,composed:true,detail:{}}))
            this.shadowRoot.querySelector('#prescriptions-grid').selectedItems=[]
            this.set("prescriptionsList", this.api.contact().filteredServices([this.currentContact], (service)=> this._isDrugNotPrescribed(service)).map(s => {
                return {
                    name : _.get(this.api.contact().medicationValue(s),"medicinalProduct.label",false) || _.get(this.api.contact().medicationValue(s),"medicinalProduct.intendedname",""),
                    posology : this.api.contact().medication().posologyToString(this.api.contact().medicationValue(s, this.language), this.language) ,
                    startValidDate :this._today(),
                    id : s.id,
                    endValidDate :this._endDate()
                }
            }))
        })
    }

    addEmptyPosologyIfNeeded(mv){
        if(mv.instructionForPatient || mv.regimen && mv.regimen.length > 0){
            return mv
        } else {
            mv.instructionForPatient = this.localize('known_use','Known use',this.language);//"pas d'application";
            return mv;
        }
    }

    //todo @julien ré-écrire cette impression trop gros à faire!!!!
    _formatPrescriptionsBody(splitColumns,drugsToBePrescribed,patient,hcp, element) {
        // console.log('_formatPrescriptionsBody, hello hcp is : ',hcp)
        let prescriToPrint = [], allPages = []
        let prescNum = 0, pageNum = 1

        const inRecipeMode = this.patient.ssin && _.flatMap(splitColumns).find(c=>c.rid) // else print good old prescription format && this.api.tokenId
        splitColumns.forEach((c, idx) => {
            const ridOrNihii = c.length && c[0].rid ? c[0].rid : hcp.nihii;
            JsBarcode(element, ridOrNihii, {format: "CODE128A", displayValue: false, height: 75});
            const jpegUrl = element.toDataURL("image/jpeg");
            const ridLabel = ridOrNihii.split('').join('&nbsp;')
            prescNum += 1
            const prescriByPage = this.selectedFormat == 'A4' ? 2 : 1
            if (prescNum > prescriByPage * pageNum) { // if doesn't fit in page
                pageNum += 1 // add a page
            } // will be set on next page

            let prescArray = [], posology = {}
            _.flatMap(drugsToBePrescribed.filter(s => c.find( p => p.id===s.id)), s => {
                const medicationApi = this.api.contact().medication();
                const med = this.api.contact().medicationValue(s, this.language);
                const medPoso = this.api.contact().medication().posologyToString(med, this.language) || "N/A";
                const medR = medicationApi.medicationNameToString(med, this.language)
                const medS = med.regimen && med.regimen.length && medicationApi.posologyToString(med, this.language) || med.instructionForPatient || this.localize("known_usage", "Usage connu");
                const thisMed = {'S': medS, 'R': medR, 'poso':medPoso};
                const medC = medicationApi.reimbursementReasonToString(med, this.language);
                if (medC) {
                    Object.assign(thisMed, {'C': medC});
                }
                prescArray.push(thisMed) // add to the medications list
            }) // flatmap end
            // console.log("prescArray",prescArray)

            let prescriContent = ""
            let articlePoso = []
            let articleMedWithPoso = []
            let medicName = ""

            prescArray.map(onePrescri => { // create prescription content
                prescriContent += (`<article>
                  <p class="bigtxt" style="white-space: pre-line;"><span class="bold bigtxt">R/</span> ${onePrescri.R}</p>
                  <p class="bigtxt"><span class="bold bigtxt">S/</span> ${onePrescri.S}</p>` +
                    (onePrescri.C && `<p class="bigtxt"><span class="bold bigtxt">C/</span> ${onePrescri.C}</p>` || "") +
                    `</article>`);
                articlePoso.push(onePrescri.poso) // add posology to the list
                articleMedWithPoso.push({medR: onePrescri.R, poso: onePrescri.poso})//add medication with posology to the list
                medicName = onePrescri.R
            }) // map end

            const prescri = inRecipeMode ? `<article class="prescription">
              <header>
                  <img src="${jpegUrl}" alt="code-bar">
                  <div class="barcode-num">${ridLabel}</div>
                  <hr>
                  <h2>${this.localize('proof_of_e_prescription','Please present this document to the pharmacist to scan the barcode and issue the prescribed medications',this.language)}</h2>
                  <hr>
                  <p class="center">${this.localize('ple_present_doc','Please present this document to the pharmacist to scan the barcode and issue the prescribed medications',this.language)}.</p>
                  <hr>
                  <div class="profile">
                      <small>${this.localize("prescriber_name_lastname","Prescriber first name and last name",this.language)}&nbsp;:</small>
                      <ul class="prescripteur-details">
                          <li><b>${hcp.firstName} ${hcp.lastName}</b></li>
                          <li><b>`+ this.localize('inami','inami',this.language) +`&nbsp;:</b> ${hcp.nihii}</li>
                      </ul>
                  </div>
                  <hr>
                  <div class="profile">
                      <small>${this.localize("benef_name_lastname","Name and surname of the beneficiary",this.language)}&nbsp;:</small>
                      <ul class="patient-details">
                          <li><b>${this.patient.firstName} ${this.patient.lastName}</b></li>
                          <li><b>NISS&nbsp;:</b> ${this.patient.ssin}</li>
                      </ul>
                  </div>
                  <hr>
              </header>
              <h2>${this.localize('content_of_e_prescription','Content of electronical prescription',this.language)}</h2>
              <hr>
              <div class="prescription-content">
                  ${prescriContent}
              </div>
              <footer>
                  <hr>
                  <p class="center">${this.localize('no_man_ad','No manuscript additions will be taken into account',this.language)}.</p>
                  <hr>
                  <small class="center">${this.localize('date','Date',this.language)}&nbsp;:</small>
                  <p class="center">${c.startValidDate}</p>
                  <hr>
                  <small class="center">${this.localize('deliv_from','Deliverable from',this.language)}&nbsp;:</small>
                  <p class="center">${c.startValidDate}</p>
                  <hr>
                  <small class="center">${this.localize('EndDateForExecution','End date for execution',this.language)}&nbsp;:</small>
                  <p class="center">${c.endValidDate}</p>
              </footer>
          </article>` : prescriContent; // create single prescription body

            prescriToPrint.push({name:medicName,'prescriBody':prescri,'page':pageNum,'posology':articlePoso, 'medWithPosology': articleMedWithPoso,'myRid':ridLabel, 'myJpegUrl':jpegUrl,"startValidDate": c.startValidDate,"endValidDate":c.endValidDate}) // add a prescription with its datas
        }) // splitCol forEach end
        // console.log("prescriToPrint",prescriToPrint)

        // console.log("allPages before map",allPages)
        prescriToPrint.map((prescri)=>{ // for every prescription found in list
            let singlePage = {body:'',poso:[],rid:'',jpegUrl: ''}
            singlePage.body += (prescri.prescriBody) // get the body
            singlePage.name = prescri.name
            singlePage.rid = prescri.myRid
            singlePage.jpegUrl = prescri.myJpegUrl
            singlePage.startValidDate = prescri.startValidDate
            singlePage.endValidDate = prescri.endValidDate
            prescri.medWithPosology.map((poso)=>{ // check if there's posology
                singlePage.poso.push(poso)
            })
            if (!allPages[prescri.page-1]) {
                allPages.push([singlePage]) // assign posology to prescription
            } else {
                allPages[prescri.page-1].push(singlePage)
            }
        })
        // console.log("allPages after map",allPages)

        const hcpAddress = _.chain(_.get(hcp, "addresses", {})).filter({addressType:"work"}).head().value() ||
            _.chain(_.get(hcp, "addresses", {})).filter({addressType:"home"}).head().value() ||
            _.chain(_.get(hcp, "addresses", {})).head().value() ||
            {}
        ;

        const hcpTel = _.trim( _.get( _.filter(_.get(hcpAddress, "telecoms", {}), {telecomType:"phone"}), "[0].telecomNumber", "" ) ) ||
            _.trim( _.get( _.filter(_.get(hcpAddress, "telecoms", {}), {telecomType:"mobile"}), "[0].telecomNumber", "" ) )


        let allPagesBody = ""
        allPages.map((onePage)=>{
            let posoByDay = { // make the arrays that will receive sorted posologies
                    'byMoment':[],
                    'byHour':[]
                },
                posoByWeek = [],
                posoByMonth = []
            if (typeof onePage == 'object') {
                let posoTable = ''
                let thatBody = ''
                onePage.map((onePrescription)=>{
                    let singleName = onePrescription.name
                    if (inRecipeMode) {
                        thatBody += onePrescription.body
                        onePrescription.poso.map((singlePoso)=>{posoTable += "<tr><td><b>"+singlePoso.medR+"</b></td><td>"+singlePoso.poso.toString()+"</td></tr>"}) // construct the posology body
                    }else{
                        thatBody += `
                      <div id="prescription">
                          <header id="header" class="flexbox vert bt center">
                              <div class="horiz">
                                  <div class="cell br w50 p1025">
                                      <img class="codbar" src="${onePrescription.jpegUrl}" alt="code-bar">
                                      <span>${onePrescription.rid}</span>
                                  </div>
                                  <div class="cell w50">
                                      <p>${this.localize("prescriber_name_lastname","Prescriber first name and last name",this.language)}</p>
                                      <p class="bold">Dr. ${hcp.lastName} ${hcp.firstName}</p>
                                  </div>
                              </div>
                          </header>
                          <div class="horiz w100">
                              <div class="vert bt bb flex1 cell">
                                  <p class="uppercase">${this.localize("complete_by_prescriber","To be completed by the prescriber",this.language)}</p>
                                  <p>${this.localize("benef_name_lastname","Name and surname of the beneficiary",this.language)} : <span class="bold">${this.patient.firstName} ${this.patient.lastName}</span></p>
                              </div>
                          </div>
                          <main id="main" class="flexbox flex1 horiz bb">
                              <div class="cell br w33">
                                  <p>${this.localize("reserved_sticker","Reserved for the packaging sticker",this.language)}</p>
                              </div>
                              <div class="cell">
                                  ${onePrescription.body}
                              </div>
                          </main>
                          <footer id="footer" class="flex horiz bb">
                              <div class="flex1 cell br w50">
                                  <p class="title bold center w100">${this.localize("prescriber_stamp","Prescriber's stamp",this.language)}</p>
                                  <ul>
                                      <li>Dr. ${hcp.lastName} ${hcp.firstName}</li>` +

                            "<li>" + _.get(hcpAddress, "street", "") + ", " + _.get(hcpAddress, "houseNumber", "") + ( _.trim(_.get(hcpAddress, "postboxNumber", "")) ? " / " + _.trim(_.get(hcpAddress, "postboxNumber", "")) : "" ) + "</li>" +
                            "<li class='uppercase'>" + _.get(hcpAddress, "postalCode", "") + " - " + _.get(hcpAddress, "city", "") + "</li>" +
                            ( _.trim(hcpTel) ? "<li>Tel: " + _.trim(hcpTel) + "</li>" : "" ) + `

                                      <li><span class="uppercase">`+ this.localize('inami','inami',this.language) +`</span>&nbsp;: ${hcp.nihii}</li>
                                  </ul>
                              </div>
                              <div class="w50">
                                  <div class="vert w100">
                                      <div class="cell bb center">
                                          <p class="mt0">${this.localize('date_and_sign_of_presc',"Date and prescriber's signature",this.language)}</p>
                                          <p>${onePage.startValidDate}</p>
                                      </div>
                                      <div class="cell">
                                          <p class="center">${this.localize('deliv_date','Deliverable from the specified date or from',this.language)}&nbsp;:</p>
                                          <p class="signdate center bold w100">${onePage.startValidDate}</p>
                                      </div>
                                      <div class="cell">
                                          <p class="center">${this.localize('EndDateForExecution','End date for execution',this.language)}&nbsp;:</p>
                                          <p class="signdate center bold w100">${onePage.endValidDate}</p>
                                      </div>
                                  </div>
                              </div>
                          </footer>
                          <aside>
                              <div class="horiz">
                                  <p class="big uppercase center w100 bold fs1">${this.localize('presc_of_med','Prescription of drugs',this.language)}</p>
                              </div>
                              <div class="horiz">
                                  <p class="big uppercase center w100 bold fs1">${this.localize('presc_of_med_20191101','Application from November 1st 2019',this.language)}</p>
                              </div>
                          </aside>
                      </div>`
                    }
                })
                if (inRecipeMode) {
                    const onePageBodyTop = `<div class="page"><main>${thatBody}</main><footer><table><thead><tr><td>${this.localize('name','Name',this.language)}</td><td>${this.localize('freq','Frequency',this.language)}</td></tr></thead><tbody>`; // prepare the PDF's pages
                    const onepageBodyBottom = `</tbody></table></footer></div>`;
                    allPagesBody += onePageBodyTop+posoTable+onepageBodyBottom;
                } else {
                    allPagesBody += `<div class="page">
                      ${thatBody}
                  </div>`;
                } // elif end

            }
        }) // allPage map end

        const toPrint = inRecipeMode ?
            `<html>
              <head><style>
              body {margin: 0;width: ${this.selectedFormat == 'A4' ? '210mm' : '105mm'};height: ${this.selectedFormat == 'A4' ? '297mm' : '210mm'};}
              body > div.page {display:block;size: A4;margin: 0;width: ${this.selectedFormat == 'A4' ? '210mm' : '105mm'};height: ${this.selectedFormat == 'A4' ? '297mm' : '210mm'};page-break-after: always;display:flex;flex-direction:column;}
              body > div.page:last-child {page-break-after: avoid;}
              body > div.page >main {display: flex;width: 100%;}
              body > div.page > main > article.prescription {padding-top: 15px;width: ${this.selectedFormat == 'A4' ? '105mm' : '100%'};height: ${this.selectedFormat == 'A4' ? '200mm' : '210mm'};overflow: hidden;font-size: 12px;display: flex;flex-direction: column;}
              body > div.page > main > article.prescription:first-child{border-right: ${this.selectedFormat == 'A4' ? '.5px dashed lightgrey' : 'none'};}
              body > div.page > main > article img {display: block;width: 95%;max-height:80px;margin: 0 auto;text-align: center;}
              body > div.page > main > article div.barcode-num {margin: 3px 25px 10px 25px;font-size: 1.2em;text-align: justify;}
              body > div.page > main > article div.barcode-num:after {content: "";display: inline-block;width: 100%;}
              body > div.page > main > article h2 {font-size: .9em;text-transform: uppercase;margin: 5px auto;text-align: center;}
              body > div.page > main > article header p.center {text-align: center;max-width: 80%;margin: 5px auto;}
              body > div.page > main > article .prescription-content p.center {margin:2px;text-align: center;}
              body > div.page > main > article small.center {text-align: center;width: 100%;display: block;margin: 0 auto;}
              body > div.page > main > article hr {border-top: 1px solid darkgrey;border-bottom: 0;margin: 0 10px;}
              body > div.page > main > article div.profile {margin: 0 25px;}
              body > div.page > main > article ul {padding-left: 0;list-style: none;margin-top: 2px;}
              body > div.page > main > article div.prescription-content {display: flex;padding: 0 25px;flex-direction: column;flex: 1;}
              body > div.page > main > article div.prescription-content > article {margin: 0 0 10px 0;}
              body > div.page > main > article div.prescription-content > article > p {font-size:1.1em; margin: 0;padding: 0;}
              body > div.page > main > article div.prescription-content > article > p > .bold {font-weight: bold;}
              body > div.page > main > article footer p {text-align: center;margin: 2px 0;}
              body > div.page > footer {${this.selectedFormat != 'A4' ? 'display:none;' : ''}border-top: .5px dashed lightgrey;text-align:center;padding:25px 20px 0 20px;}
              body > div.page > footer table {width: 100%;border-collapse: collapse;border-top:1px solid black;}
              body > div.page > footer table:first-child {border-top:none;}
              body > div.page > footer table tr td {font-size:.8em; border-bottom:1px solid black;text-align: left;overflow: hidden;text-overflow: ellipsis;white-space: nowrap;}
              body > div.page > footer table tr td:first-child {width:258px;border-right:1px solid black;}
              body > div.page > footer table tr td:not(:first-child){padding: 0 5px;}
              body > div.page > footer table thead {font-weight: bold;border-bottom: 2px solid black;}
              body > div.page > footer table thead tr td {text-align: center;background-color: lightgrey;}
          </style></head><body>${allPagesBody}</body></html>`
            : // no eHe connection =
            `<html><head><style>
              /* body */
              body {margin: 0;padding: 0;}
              div.page {display:flex;flex-direction: row;margin: 0;padding:0;padding-top:20mm;width: ${this.selectedFormat == 'A4' ? '210mm' : '105mm'};height:200mm;overflow:hidden;page-break-after:always;}
              div.page:last-child {page-break-after: avoid;}
              div#prescription {display:flex;flex-direction:column;${this.selectedFormat == 'A4' && "width: 50%;border-left: .25px solid black; border-right: .25px solid black; border-bottom: .25px solid black;" || ""}}
              div#prescription:first-child {${this.selectedFormat == 'A4' ? "margin-right: 1px" : "margin: 0"}}
              * {font-size:10px;font-family: Arial,sans-serif;}
              *.bigtxt {font-size:13px; white-space: pre-line; }
              /* flex */
              *.flexbox, *.horiz, *.vert {display: flex;} *.horiz {flex-direction: row;} *.vert {flex-direction: column;} *.flex1 {flex:1;}
              /* elems */
              img.codbar {height:auto;width:100%;background: black;margin-bottom: 5px;} *.signdate {border-bottom: .25px dotted grey;} *.cell {padding: 5px; overflow: hidden;} article {margin-bottom: 15px;} article > p {margin: 0;}
              /* style */
              *.w100 {width:100%} *.w50 {width: 50%;} *.w40 {width:40%;} *.w33 {width: 33%;min-width:33%;} *.w20 {width: 20%;}
              *.bold {font-weight: bold;} *.p1025 {padding: 10px 25px;} *.mt0 {margin-top: 0;}
              *.br {border-right: .25px solid black;} *.bt {border-top: .25px solid black} *.bb {border-bottom: .25px solid black}
              *.center {text-align: center;} *.capitalize {text-transform: capitalize;} *.uppercase{text-transform: uppercase;e}
              *.right {text-align: right;} *.fs1 {font-size: 1em;} ul {list-style: none; padding-left: 0}
          </style></head><body>${allPagesBody}</body></html>`; // finalize PDF body

        //console.log("toPrint",toPrint)
        return toPrint
    }

    _pdfReport(drugsToBePrescribed,toPrint,size) {


        this.set("isLoading",true)

        const pdfPrintingData = {
            downloadFileName: _.kebabCase([ "prescription", _.get(this.patient, "lastName", ""), _.get(this.patient, "firstName", ""), +new Date()].join(" ")) + ".pdf",
            documentMetas : {
                title : "Prescription",
                contactId : _.get(this.selectedContactForPrescription, "id", ""),
                created: ""+ +new Date(),
                patientId : _.trim(_.get(this.patient, "id", "")),
                patientName : _.compact([ _.get(this.patient, "lastName", ""), _.get(this.patient, "firstName", "") ]).join(" ")
            }
        }

        return this.api.pdfReport(mustache.render(toPrint, null), {
            type: "recipe",
            paperWidth: this.patient.ssin && this.api.tokenId && size == 'A4' ? 210 : 105,
            paperHeight: this.patient.ssin && this.api.tokenId && size == 'A4' ? 297 : 210,
            marginLeft: 5,
            marginRight: 5,
            marginTop: 5,
            marginBottom: 5
        })
            .then(({pdf:pdfFileContent, printed:wasPrinted}) => _.assign({pdfFileContent:pdfFileContent, printed:wasPrinted}, pdfPrintingData))
            .then(pdfPrintingData => this.api.message().newInstanceWithPatient(this.user, this.patient)
                    .then(newMessageInstance=>_.assign({newMessageInstance: newMessageInstance}, pdfPrintingData))
                    .then(pdfPrintingData=>this.api.message().createMessage(
                        _.merge(
                            pdfPrintingData.newMessageInstance,
                            {
                                transportGuid: "PRESCRIPTION:PHARMACEUTICALS:ARCHIVE",
                                recipients: [_.get(this.user, 'healthcarePartyId', _.trim(this.user.id))],
//TODO                              metas: pdfPrintingData.documentMetas,
                                toAddresses: [_.get(this.user, 'email', _.get(this.user, 'healthcarePartyId', _.trim(this.user.id)))],
                                subject: pdfPrintingData.documentMetas.title
                            }
                        )
                    ).then(createMessageResponse=>_.assign({createMessageResponse: createMessageResponse}, pdfPrintingData)))
            )
            .then(pdfPrintingData=>this.api.document().newInstance(
                this.user,pdfPrintingData.createMessageResponse,
                {
                    documentType: 'report',
                    mainUti: this.api.document().uti("application/pdf"),
                    name: pdfPrintingData.documentMetas.title + " - " + pdfPrintingData.documentMetas.patientName
                }
                ).then(newDocumentInstance=>_.assign({newDocumentInstance:newDocumentInstance},pdfPrintingData))
            )
            .then(pdfPrintingData=>this.api.document().createDocument(pdfPrintingData.newDocumentInstance).then(createDocumentResponse=>_.assign({createDocumentResponse:createDocumentResponse},pdfPrintingData)))
            .then(pdfPrintingData=>this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("encrypt", this.user.healthcarePartyId, pdfPrintingData.createDocumentResponse, pdfPrintingData.pdfFileContent).then(encryptedFileContent=>_.assign({encryptedFileContent:encryptedFileContent},pdfPrintingData)))
            .then(pdfPrintingData=>this.api.document().setDocumentAttachment(pdfPrintingData.createDocumentResponse.id, null, pdfPrintingData.encryptedFileContent).then(setAttachmentResponse=>_.assign({setAttachmentResponse:setAttachmentResponse},pdfPrintingData)))
            .then(pdfPrintingData=>{
                //todo @julien sauver le document dans un service
                this.dispatchEvent(new CustomEvent('save-document-as-service', {detail: {
                        documentId: _.trim(_.get(pdfPrintingData, "createDocumentResponse.id", "")),
                        stringValue: pdfPrintingData.documentMetas.title,
                        contactId: pdfPrintingData.documentMetas.contactId,
                    }}))
                return pdfPrintingData
            })
            .then(pdfPrintingData => !pdfPrintingData.printed && this.api.triggerFileDownload( pdfPrintingData.pdfFileContent, "application/pdf", pdfPrintingData.downloadFileName ))
            .catch(e=>{
                console.log(e)
            }).finally(()=>{
                this.set("isLoading",false)
            })
    }

    _download(doc) {
        var a = document.createElement('a')
        a.href = window.URL.createObjectURL(new Blob([doc], {type : "text/plain;charset=utf-8"}))
        a.download = `prescription_${+new Date()}.xml`
        a.click()
    }

    _getGroupIndex(group){
        return _.get(this,"prescriptionsGroups",[]).findIndex( g => g===group)+1
    }

}

customElements.define(HtPatPrescriptionDialog.is, HtPatPrescriptionDialog);
