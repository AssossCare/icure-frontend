import '../dynamic-form/ckmeans-grouping.js';
import '../../styles/vaadin-icure-theme.js';
import '../../styles/spinner-style.js';
import '../ht-spinner/ht-spinner.js';
import '../ht-pat/dialogs/ht-pat-invoicing-dialog.js';

import './dialogs/invoice/ht-msg-invoice-accepted';
import './dialogs/invoice/ht-msg-invoice-archived';
import './dialogs/invoice/ht-msg-invoice-pending';
import './dialogs/invoice/ht-msg-invoice-rejected';
import './dialogs/invoice/ht-msg-invoice-toBeCorrected';
import './dialogs/invoice/ht-msg-invoice-toBeSend';
import './dialogs/invoice/ht-msg-invoice-batch-detail';
import './dialogs/invoice/ht-msg-invoice-invoice-detail';


//TODO import "@polymer/iron-collapse-button/iron-collapse-button"
import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-tooltip/paper-tooltip"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"
import "@vaadin/vaadin-grid/vaadin-grid-column-group"
import "@vaadin/vaadin-grid/vaadin-grid-sorter"
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle"
import '@vaadin/vaadin-accordion/vaadin-accordion'
import '@vaadin/vaadin-details/vaadin-details'

import moment from 'moment/src/moment';
import _ from 'lodash/lodash';
import * as models from 'icc-api/dist/icc-api/model/models'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class htMsgInvoice extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <custom-style>
            <style include="shared-styles spinner-style">

                :host {
                    display: block;
                    z-index:2;
                }

                :host *:focus {
                    outline: 0 !important;
                }
                
                .invoice-panel{
                    height: 100%;
                    width: 100%;
                    padding: 0 20px;
                    box-sizing: border-box;
                    z-index: -1;
                    position: relative;
                }
                
                #htMsgInvoiceBatchDetail{
                    top: 0;
                    display: block;
                    position: absolute;
                    z-index: 100;
                    height: calc(100% - 8px);                    
                    width: 98%;
                }
                
                #htMsgInvoiceInvoiceDetail{
                    top: 0;
                    display: block;
                    position: absolute;
                    z-index: 100;
                    height: calc(100% - 8px);                    
                    width: 98%;
                }
            </style>
        </custom-style>
        
        <div class="invoice-panel">      
            <template is="dom-if" if="[[_displayInvoicePanel(invoicesStatus, 'toBeCorrected')]]">
                <ht-msg-invoice-to-be-corrected 
                    api="[[api]]" 
                    i18n="[[i18n]]" 
                    user="[[user]]" 
                    hcp="[[hcp]]"
                    language="[[language]]" 
                    resources="[[resources]]" 
                    list-of-invoice="[[messagesToBeCorrected]]"
                    is-loading="[[isLoading]]"
                    on-open-invoice-detail-panel="_openInvoiceDetailPanel"
                    on-get-message="fetchMessageToBeSendOrToBeCorrected"
                ></ht-msg-invoice-to-be-corrected>
            </template>  
            <template is="dom-if" if="[[_displayInvoicePanel(invoicesStatus, 'toBeSend')]]">
                <ht-msg-invoice-to-be-send 
                    api="[[api]]" 
                    i18n="[[i18n]]" 
                    user="[[user]]" 
                    hcp="[[hcp]]"
                    language="[[language]]" 
                    resources="[[resources]]" 
                    list-of-invoice="[[selectedInvoicesToBeSend]]"
                    is-loading="[[isLoading]]"
                    on-open-invoice-detail-panel="_openInvoiceDetailPanel"
                    on-get-message="fetchMessageToBeSendOrToBeCorrected"
                    >                   
                </ht-msg-invoice-to-be-send>
            </template>   
            <template is="dom-if" if="[[_displayInvoicePanel(invoicesStatus, 'process')]]">
                <ht-msg-invoice-pending 
                    api="[[api]]" 
                    i18n="[[i18n]]" 
                    user="[[user]]" 
                    hcp="[[hcp]]"
                    language="[[language]]" 
                    resources="[[resources]]" 
                    list-of-invoice="[[messagesProcessed]]"
                    list-of-oa="[[listOfOa]]"
                    on-open-detail-panel="_openDetailPanel"
                    on-get-message="fetchMessageToBeSendOrToBeCorrected"
                    is-loading="[[isLoading]]"
                ></ht-msg-invoice-pending>
            </template>   
            <template is="dom-if" if="[[_displayInvoicePanel(invoicesStatus, 'reject')]]">
                <ht-msg-invoice-rejected 
                    api="[[api]]" 
                    i18n="[[i18n]]" 
                    user="[[user]]" 
                    hcp="[[hcp]]"
                    language="[[language]]" 
                    resources="[[resources]]" 
                    list-of-invoice="[[messagesRejected]]"
                    message-ids-can-be-auto-archived="[[messageIdsCanBeAutoArchived]]"
                    list-of-oa="[[listOfOa]]"
                    on-open-detail-panel="_openDetailPanel"
                    on-get-message="fetchMessageToBeSendOrToBeCorrected"
                    is-loading="[[isLoading]]"
                 ></ht-msg-invoice-rejected>
            </template>   
            <template is="dom-if" if="[[_displayInvoicePanel(invoicesStatus, 'accept')]]">
                <ht-msg-invoice-accepted 
                    api="[[api]]" 
                    i18n="[[i18n]]" 
                    user="[[user]]" 
                    hcp="[[hcp]]"
                    language="[[language]]" 
                    resources="[[resources]]" 
                    list-of-invoice="[[messagesAccepted]]"
                    list-of-oa="[[listOfOa]]"
                    on-open-detail-panel="_openDetailPanel"
                    is-loading="[[isLoading]]"
                ></ht-msg-invoice-accepted>
            </template>   
            <template is="dom-if" if="[[_displayInvoicePanel(invoicesStatus, 'archive')]]">
                <ht-msg-invoice-archived 
                    api="[[api]]" 
                    i18n="[[i18n]]" 
                    user="[[user]]" 
                    hcp="[[hcp]]"
                    language="[[language]]" 
                    resources="[[resources]]" 
                    list-of-invoice="[[messagesArchived]]"
                    list-of-oa="[[listOfOa]]"
                    on-open-detail-panel="_openDetailPanel"
                    is-loading="[[isLoading]]"
                ></ht-msg-invoice-archived>
            </template>  
            <template is="dom-if" if="[[isDisplayDetail]]">
                <ht-msg-invoice-batch-detail id="htMsgInvoiceBatchDetail" 
                    api="[[api]]" 
                    i18n="[[i18n]]" 
                    user="[[user]]" 
                    hcp="[[hcp]]"
                    language="[[language]]" 
                    resources="[[resources]]" 
                    selected-invoice-for-detail="[[selectedBatchForDetail]]"
                    on-close-detail-panel="_closeDetailPanel"
                    on-archive-batch="_openArchiveDialog"
                    on-transfer-invoices-for-resending="_transferInvoicesForResending"
                    on-get-message="fetchMessageToBeSendOrToBeCorrected"
                 ></ht-msg-invoice-batch-detail>      
            </template>
            <template is="dom-if" if="[[isDisplayInvoiceDetail]]">
                <ht-msg-invoice-invoice-detail id="htMsgInvoiceInvoiceDetail" 
                    api="[[api]]" 
                    i18n="[[i18n]]" 
                    user="[[user]]" 
                    hcp="[[hcp]]"
                    language="[[language]]" 
                    resources="[[resources]]" 
                    selected-invoice-for-detail="[[selectedInvoiceForDetail]]"
                    on-close-invoice-detail-panel="_closeInvoiceDetailPanel"     
                    on-get-message="fetchMessageToBeSendOrToBeCorrected"
                 ></ht-msg-invoice-invoice-detail>      
            </template>
        </div> 
`;
  }

  static get is() {
      return 'ht-msg-invoice';
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          user: {
              type: Object
          },
          hcp: {
              type : Object
          },
          selectedMessages: {
              type: Object,
              notify: true
          },
          activeItem: {
              type: Object
          },
          messages: {
              type: Array,
              value: function () {
                  return [];
              }
          },
          selectList: {
              type: Object
          },
          totalInvoicesToBeSend:{
              type: Object,
              value : () => ({
                  totalReimbursement:          Number(0.00).toFixed(2),
                  totalAmount:                 Number(0.00).toFixed(2),
                  totalPatientIntervention:    Number(0.00).toFixed(2),
                  totalDoctorSupplement:       Number(0.00).toFixed(2)
              })
          },
          invoicesStatus: {
              type: String,
              value: null
          },
          statusToBeSend:{
              type: Boolean,
              value: true
          },
          selectedInvoicesToBeSend:{
              type: Object,
              value : () => ({})
          },
          messagesToBeCorrected:{
              type: Object,
              value : () => ({})
          },
          selectedInvoicesByStatus:{
              type: Object,
              value : () => ({})
          },
          multiSort:{
              type: Boolean,
              value: true
          },
          activeGridItem:{
              type: Object,
              value: function () {
                  return [];
              }
          },
          filterValue:{
              type: String,
              value: ""
          },
          invoicesFromBatch:{
              type: Object,
              value: function () {
                  return [];
              }
          },
          displayedYear: {
              type: Number,
              value: () => Number(moment().format('YYYY'))
          },
          processing:{
              type: Boolean,
              value: false
          },
          toBeCorr:{
              type: Boolean,
              value: false
          },
          messageIdsCanBeAutoArchived:{
              type: Array,
              value: []
          },
          isMessagesLoaded:{
              type: Boolean,
              value: false,
          },
          flagInvoiceAsLostId: {
              type: String,
              value: ""
          },
          selectedBatchForDetail:{
              type: Object,
              value: () => {}
          },
          selectedInvoiceForDetail:{
              type: Object,
              value: () => {}
          },
          isDisplayDetail:{
              type: Boolean,
              value: false
          },
          isDisplayInvoiceDetail:{
            type: Boolean,
            value: false
          },
          selectedBatchToBeArchived:{
              type: Object,
              value: () => {}
          },
          isLoading:{
              type: Boolean,
              value: false
          },
          allMessages:{
              type: Array,
              value: () => []
          },
          routeData:{
              type: Object,
              value: () => {}
          },
          refreshAll:{
              type: Boolean,
              value: false
          },
          listOfOa:{
              type: Array,
              value: [
                  {code: "100", name: {"fr": "Alliance nationale des mutualités chrétiennes", "nl": "Landsbond der christelijke mutualiteiten"}},
                  {code: "200", name: {"fr": "Union nationale des mutualités neutres", "nl": "Landsbond van de neutrale ziekenfondsen"}},
                  {code: "300", name: {"fr": "Union Nationale des Mutualités Socialistes", "nl": "Nationaal verbond van socialistiche mutualiteiten"}},
                  {code: "306", name: {"fr": "Union Nationale des Mutualités Socialistes 306", "nl": "Nationaal verbond van socialistiche mutualiteiten 306"}},
                  {code: "400", name: {"fr": "Union nationale des mutualités libérales", "nl": "Landsbond van liberale mutualiteiten"}},
                  {code: "500", name: {"fr": "Union nationale des mutualités libres", "nl": "Landsbond van de onafhankelijke ziekenfondsen"}},
                  {code: "600", name: {"fr": "Caisse auxiliaire d'assurance maladie-invalidité", "nl": "Hulpkas voor Ziekte-en Invaliditeitsverzekering"}},
                  {code: "900", name: {"fr": "Caisse des Soins de santé de HR Rail", "nl": "Kas der Geneeskundige Verzorging van HR Rail"}}
              ]
          }
      };
  }

  constructor() {
      super();
  }

  static get observers() {
      return ['_getDataProvider(api, user, routeData)', '_invoicesStatusChanged(invoicesStatus)'];
  }

  ready() {
    super.ready();
  }

   _getDataProvider(){
       this.api.hcparty().getHealthcareParty(_.get(this.user, 'healthcarePartyId', null))
           .then(hcp => this.set('hcp', hcp))
           .finally(() => {
               this.set("isMessagesLoaded",false)
           })
   }

    _displayInvoicePanel(selectedStatus, status){
        return selectedStatus === status
    }

    _closeAllPanel(){
        this.shadowRoot.querySelector('#htMsgInvoiceInvoiceDetail') ? this.shadowRoot.querySelector('#htMsgInvoiceInvoiceDetail')._closeDetailPanel() : null
        this.shadowRoot.querySelector('#htMsgInvoiceBatchDetail') ? this.shadowRoot.querySelector('#htMsgInvoiceBatchDetail')._closeDetailPanel(): null
    }

    getMessage(){
        if(!_.get(this, 'isMessagesLoaded', false))
            this.fetchMessageToBeSendOrToBeCorrected({detail: {refreshAll: true}})
    }

    fetchMessageToBeSendOrToBeCorrected(e){
        this.set("isLoading",true)
        this.set("refreshAll", _.get(e, 'detail.refreshAll', true))
        let prom = Promise.resolve()

        this.api.setPreventLogging()

        this.api.invoice().listToInsurancesUnsent(this.user.id).then(invoicesUnsent => {
            const efactUnsent = invoicesUnsent.filter(iu => iu.sentMediumType === "efact")

            efactUnsent.forEach(eu =>
                prom = prom.then(listOfEfact =>
                    this.api.crypto().extractCryptedFKs(eu, this.user.healthcarePartyId).then(ids => _.concat(listOfEfact, {invoice: eu, patientId: ids.extractedKeys[0]})))
            )
            prom = prom.then(listOfEfact =>
                Promise.all([_.compact(listOfEfact), this.api.patient().getPatientsWithUser(this.user, new models.ListOfIdsDto({ids: _.uniq(_.compact(listOfEfact).map(x => x.patientId))}))])
                    .then(([listOfEfact, patientsList]) => listOfEfact.map(efact => _.assign(efact, {patient: patientsList.find(p => p.id === efact.patientId)})))
            ).then(listOfEfact =>
                Promise.all([listOfEfact, this.api.insurance().getInsurances(new models.ListOfIdsDto({ids: _.uniq(_.compact(listOfEfact.map(e => e.invoice.recipientId || null)))}))])
                    .then(([listOfEfact, insuranceList]) => listOfEfact.map(efact => _.assign(efact, {insurance: insuranceList.find(i => i.id === efact.invoice.recipientId) || null})))
            ).then(listOfEfact =>
                Promise.all([listOfEfact, this.api.insurance().getInsurances(new models.ListOfIdsDto({ids: _.uniq(_.compact(listOfEfact.map(e => _.get(e, 'insurance.parent', null))))}))])
                    .then(([listOfEfact, parentInsuranceList]) => listOfEfact.map(efact => _.assign(efact, {parentInsurance: parentInsuranceList.find(ins => ins.id === _.get(efact, 'insurance.parent', null))})))
            ).then(listOfEfact => listOfEfact.map(efact => {
                let insurabilityComplete = false

                efact.patient && efact.patient.insurabilities ? efact.patient.insurabilities = efact.patient.insurabilities.filter(ins => ins.insuranceId && ins.insuranceId.length && ins.parameters && ins.parameters.tc1 && ins.parameters.tc1.length && ins.parameters.tc2 && ins.parameters.tc2.length) : []
                efact.patient.insurabilities.length > 0 ? insurabilityComplete = true : insurabilityComplete = false

                return ({
                    patientName: _.get(efact, 'patient.lastName', null)+" "+_.get(efact, 'patient.firstName', null),
                    invoiceId: _.get(efact, 'invoice.id', null),
                    sentMediumType: _.get(efact, 'invoice.sentMediumType', null),
                    insuranceCode: _.get(efact, 'insurance.code', null),
                    insuranceParent: _.get(efact, 'insurance.parent', null),
                    invoiceReference: _.get(efact, 'invoice.invoiceReference', null),
                    patientSsin: _.get(efact, 'patient.ssin', null),
                    invoiceDate: _.get(efact, 'invoice.invoiceDate', null),
                    reimbursement: efact.invoice.invoicingCodes ? efact.invoice.invoicingCodes.reduce((tot, m) => tot + Number(m.reimbursement), 0).toFixed(2) : 0.00,
                    patientIntervention: efact.invoice.invoicingCodes ? efact.invoice.invoicingCodes.reduce((tot, m) => tot + Number(m.patientIntervention), 0).toFixed(2) : 0.00,
                    totalAmount: efact.invoice.invoicingCodes ? efact.invoice.invoicingCodes.reduce((tot, m) => tot + Number(m.totalAmount), 0).toFixed(2) : 0.00 ,
                    doctorSupplement: efact.invoice.invoicingCodes ? efact.invoice.invoicingCodes.reduce((tot, m) => tot + Number(m.doctorSupplement), 0).toFixed(2) : 0.00,
                    statut : (!!efact.invoice.invoicingCodes.find(ic => ic.resent === true)) === true ? this.localize('inv_to_be_corrected','To be corrected',this.language) : this.localize('inv_to_be_send','To be send'),
                    hasChildren : false,
                    uuid : efact.invoice.id,
                    parentUuid : efact.insurance && efact.insurance.code ? efact.insurance.code.charAt(0) : null,
                    patient: _.get(efact, 'patient', {}),
                    invoice: _.get(efact, 'invoice', {}),
                    insuranceDto: _.get(efact, 'insurance', {}),
                    parentInsuranceDto: _.get(efact, 'parentInsurance', {}),
                    toBeCorrected: !!efact.invoice.invoicingCodes.find(ic => ic.resent === true),
                    error: efact.invoice.error || "",
                    insurabilityCheck: insurabilityComplete,
                    realizedByTrainee : efact.invoice.internshipNihii && efact.invoice.internshipNihii.length ? true : false,
                    sendingFlag: insurabilityComplete,
                    normalizedSearchTerms: _.map(_.uniq(_.compact(_.flatten(_.concat([_.get(efact, _.trim('patient.lastName'), ""), _.get(efact, _.trim('patient.firstName'), ""), _.trim(_.get(efact, 'invoice.invoiceReference', "")).toString(), _.trim(_.get(efact, 'insurance.code', "")).toString(), _.trim(_.get(efact, 'patient.ssin', "")).toString(), _.trim(_.get(efact, 'invoice.invoiceDate', '')).toString()])))), i =>  _.trim(i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")).join(" ")
                })
            })).then(invoices => {
                this.set("messagesToBeCorrected", invoices.filter(inv => inv.toBeCorrected === true))
                this.set('selectedInvoicesToBeSend', invoices.filter(inv => inv.toBeCorrected === false && inv.invoice.printedDate))

                this.set("totalInvoicesToBeSend.totalPatientIntervention",this.selectedInvoicesToBeSend ? this.selectedInvoicesToBeSend.reduce((tot, m) => tot + Number(m.patientIntervention), 0).toFixed(2) : 0.00)
                this.set("totalInvoicesToBeSend.totalDoctorSupplement",this.selectedInvoicesToBeSend ? this.selectedInvoicesToBeSend.reduce((tot, m) => tot + Number(m.doctorSupplement), 0).toFixed(2) : 0.00)
                this.set("totalInvoicesToBeSend.totalReimbursement",this.selectedInvoicesToBeSend ? this.selectedInvoicesToBeSend.reduce((tot, m) => tot + Number(m.reimbursement), 0).toFixed(2) : 0.00)
                this.set("totalInvoicesToBeSend.totalAmount",this.selectedInvoicesToBeSend ? this.selectedInvoicesToBeSend.reduce((tot, m) => tot + Number(m.totalAmount), 0).toFixed(2) : 0.00)
            }).finally(() =>{
                this.api.setPreventLogging(false)
                if( _.get(this, 'refreshAll', true)){
                    return this.fetchMessages()
                }else{
                    this.set("isLoading",false)
                    return Promise.resolve({})
                }
            })
                .catch(e => console.log('Erreur lors de la récupération des factures: ', e))
        })
    }

    fetchMessages() {
        this.messageIdsCanBeAutoArchived = []

        this.api.message().findMessagesByTransportGuid("EFACT:BATCH:*").then(messages => {

            const filteredMessages = messages.rows.filter(msg => msg.transportGuid && msg.responsible === this.hcp.id && (msg.transportGuid.startsWith("EFACT:BATCH:" + this.displayedYear) || msg.transportGuid.startsWith("EFACT:BATCH:" + (this.displayedYear-1))))

            Promise.all(filteredMessages.map(msg =>
                this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: msg.invoiceIds.map(id => id)}))
                    .then(invsFromMess => this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: invsFromMess.map(inv => inv.correctiveInvoiceId)})))
                    .then(correctiveInvoices => {
                        let allInvoicesIsCorrected = false

                        if((msg.status & (1 << 17)) !== 0 && !(msg.status & (1 << 21))){
                            const resentNmclStatus = _.uniq(_.flatten(correctiveInvoices && correctiveInvoices.map(inv =>inv && inv.invoicingCodes && inv.invoicingCodes.map(c => c.resent))))
                            let allInvoicesIsCorrected = false

                            if(resentNmclStatus.length === 1 && resentNmclStatus[0] === false){
                                this.push("messageIdsCanBeAutoArchived", msg.id)
                                allInvoicesIsCorrected = true
                            }
                        }

                        return this.api.document().findByMessage(this.user.healthcarePartyId, msg)
                            .then(docs => {
                                console.log(docs)
                                const jsonDoc = docs.find(d => d.mainUti === "public.json" && _.endsWith(d.name, '_records'))
                                return jsonDoc && jsonDoc.attachmentId ?
                                    (_.size(jsonDoc.encryptionKeys) || _.size(jsonDoc.delegations) ?
                                        this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, jsonDoc.id, _.size(jsonDoc.encryptionKeys) ? jsonDoc.encryptionKeys : jsonDoc.delegations).then(({extractedKeys: enckeys}) => this.api.document().getAttachment(jsonDoc.id, jsonDoc.attachmentId, enckeys.join(','))) : this.api.document().getAttachment(jsonDoc.id, jsonDoc.attachmentId))

                                        .then(a => {
                                    if (typeof a === "string"){
                                        try { a = JSON.parse( this.cleanStringForJsonParsing(a) ) } catch (ignored) {}
                                    } else if (typeof a === "object") {
                                        try { a = JSON.parse( this.cleanStringForJsonParsing(new Uint8Array(a).reduce((data, byte) => data + String.fromCharCode(byte), ''))); } catch (ignored) {}
                                    }

                                    const zone200 = a && a.find(enr => enr.zones.find(z => z.zone === "200"))
                                    const zone300 = a && a.find(enr => enr.zones.find(z => z.zone === "300"))
                                    const zone400 = a && a.find(enr => enr.zones.find(z => z.zone === "400"))
                                    const zone500 = a && a.find(enr => enr.zones.find(z => z.zone === "500"))
                                    const enr10 = a && a.find(enr => enr.zones.find(z => z.zone === "1" && z.value === "10"))

                                    const st = msg.status

                                    const invoiceStatus =
                                        !!(st & (1 << 21)) ? this.localize('inv_arch','Archived',this.language):
                                            !!(st & (1 << 17)) ? this.localize('inv_err','Error',this.language):
                                                !!(st & (1 << 16)) ? this.localize('inv_par_acc','Partially accepted',this.language):
                                                    !!(st & (1 << 15)) ? this.localize('inv_full_acc','Fully accepted',this.language):
                                                        !!(st & (1 << 12)) ? this.localize('inv_rej','Rejected',this.language):
                                                            !!(st & (1 << 11)) ? this.localize('inv_tre','Treated',this.language):
                                                                !!(st & (1 << 10)) ? this.localize('inv_acc_tre','Accepted for treatment',this.language):
                                                                    !!(st & (1 << 9))  ? this.localize('inv_succ_tra_oa','Successfully transmitted to OA',this.language):
                                                                        !!(st & (1 << 8))  ? this.localize('inv_pen','Pending',this.language):
                                                                            !!(st & (1 << 7))  ? this.localize('inv_pen','Pending',this.language): ""


                                    const rejectionReason = !!(st & (1 << 17)) ? this.localize('inv_rej_5%','More than 5% error',this.language) :
                                        !!(st & (1 << 12)) ? this.localize('inv_rej_block','Blocking error',this.language): ""

                                    return (zone200 && zone300) ?
                                        ({
                                            message: msg,
                                            messageInfo: {
                                                messageType:        zone200.zones && zone200.zones.find(z => z.zone === "200") ? zone200.zones.find(z => z.zone === "200").value : "",
                                                hcp:                this.hcp.firstName + " " + this.hcp.lastName,
                                                oa:                 _.get(msg, 'metas.ioFederationCode', ""),
                                                hcpReference:       enr10.zones && enr10.zones.find(z => z.zone === "28") ? enr10.zones.find(z => z.zone === "28").value : "",
                                                invoiceNumber:      zone300.zones && zone300.zones.find(z => z.zone === "301") ? zone300.zones.find(z => z.zone === "301").value : "",
                                                invoiceMonth:       zone300.zones &&zone300.zones.find(z => z.zone === "300") ? zone300.zones.find(z => z.zone === "300").value : "",
                                                invoiceDate:        zone300.zones && zone300.zones.find(z => z.zone === "302") ? zone300.zones.find(z => z.zone === "302").value : "",
                                                invoicedAmount:     Number(_.get(msg, 'metas.totalAmount', '0.00')),
                                                acceptedAmount:     Number(_.get(msg, 'metas.totalAcceptedAmount', '0.00')),
                                                refusedAmount:      Number(_.get(msg, 'metas.totalRejectedAmount', '0.00')),
                                                invoiceStatus:      invoiceStatus,
                                                rejectionReason:    rejectionReason,
                                                paymentReference:   _.get(msg, 'metas.paymentReferenceAccount1', ""),
                                                paymentDate:        "",
                                                amountPaid:         Number(_.get(msg, 'metas.totalAcceptedAmount', '0.00')).toFixed(2),
                                                paymentAccount:     enr10.zones && enr10.zones.find(z => z.zone === "36") ? enr10.zones.find(z => z.zone === "36").value : "",
                                                paid: false,
                                                allInvoicesIsCorrected : allInvoicesIsCorrected,
                                                sendError: false
                                            },
                                            normalizedSearchTerms: _.map(_.uniq(_.compact(_.flatten(_.concat([_.trim(_.get(msg, 'metas.ioFederationCode', "")), _.trim(_.get(this.hcp, 'firstName', "")), _.trim(_.get(this.hcp, 'lastName', "")), _.trim(zone300.zones && zone300.zones.find(z => z.zone === "301") ? zone300.zones.find(z => z.zone === "301").value : ""), _.trim(zone300.zones &&zone300.zones.find(z => z.zone === "300") ? zone300.zones.find(z => z.zone === "300").value : ""), _.trim(zone300.zones && zone300.zones.find(z => z.zone === "302") ? zone300.zones.find(z => z.zone === "302").value : ""), _.trim(msg.metas && msg.metas.paymentReferenceAccount1 ? msg.metas.paymentReferenceAccount1 : "")])))), i =>  _.trim(i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")).join(" ")
                                        }) : {}
                                }) : Promise.resolve({
                                    message: msg,
                                    messageInfo: {
                                        messageType:        null,
                                        hcp:                _.get(this.hcp, 'firstName', "") + " " + _.get(this.hcp, 'lastName', ""),
                                        oa:                 _.get(msg, 'metas.ioFederationCode', null),
                                        hcpReference:       _.get(msg, 'metas.errors', null),
                                        invoiceNumber:      _.get(msg, 'externalRef', null),
                                        invoiceMonth:       msg.metas && msg.metas.invoiceMonth && msg.metas.invoiceYear ? msg.metas.invoiceYear+''+msg.metas.invoiceMonth : null,
                                        invoiceDate:        msg.metas && msg.metas.invoiceMonth && msg.metas.invoiceYear ? msg.metas.invoiceYear+''+msg.metas.invoiceMonth+'01' : null,
                                        invoicedAmount:     Number(_.get(msg, 'metas.totalAmount', '0.00')),
                                        acceptedAmount:     Number(_.get(msg, 'metas.totalAcceptedAmount', '0.00')),
                                        refusedAmount:      Number(_.get(msg, 'metas.totalAmount', '0.00')),
                                        invoiceStatus:      !!(msg.status & (1 << 21)) ? this.localize('inv_arch','Archived',this.language) : this.localize('inv_send_err','Send error',this.language),
                                        rejectionReason:    _.get(msg, 'metas.errors', ""),
                                        paymentReference:   _.get(msg, 'metas.paymentReferenceAccount1', ""),
                                        paymentDate:        null,
                                        amountPaid:         Number(_.get(msg, 'metas.totalAcceptedAmount', '0.00')).toFixed(2),
                                        paymentAccount:     null,
                                        paid:               false,
                                        allInvoicesIsCorrected : false,
                                        sendError:          true
                                    },
                                    normalizedSearchTerms: _.map(_.uniq(_.compact(_.flatten(_.concat([_.trim(_.get(msg, 'metas.ioFederationCode', "")), _.trim(_.get(this.hcp, 'firstName', "")), _.trim(_.get(this.hcp, 'lastName', "")), _.trim(_.get(msg, 'externalRef', "")), _.trim(msg.metas && msg.metas.invoiceMonth && msg.metas.invoiceYear ? msg.metas.invoiceYear+''+msg.metas.invoiceMonth : null,), _.trim(msg.metas && msg.metas.invoiceMonth && msg.metas.invoiceYear ? msg.metas.invoiceYear+''+msg.metas.invoiceMonth+'01' : null), _.trim(_.get(msg, 'metas.paymentReferenceAccount1', ""))])))), i =>  _.trim(i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")).join(" ")
                                })
                            })

                    })))
                .then(msgsStructs => {
                    this.set("isMessagesLoaded",true)
                    this.set('allMessages', msgsStructs)
                    this.dispatchMessages()
                    this.set("isLoading",false)
                })

        })
    }

    dispatchMessages() {
        !!this.set("messagesArchived", this.allMessages.filter( m => m.message && m.message.status && (m.message.status & (1 << 21)) !== 0))
        this.set("messagesProcessed", this.allMessages.filter(m => m.message && m.message.status && (m.message.status & (1 << 15 | 1 << 16 | 1 << 17)) === 0 && !(m.message.status & (1<<21))))
        !!this.set("messagesAccepted", this.allMessages.filter( m => m.message && m.message.status && (m.message.status & (1 << 15 | 1 << 16 )) !== 0 && !(m.message.status & (1<<21))))
        !!this.set("messagesRejected", this.allMessages.filter( m => m.message && m.message.status && (m.message.status & (1 << 17)) !== 0 && !(m.message.status & (1<<21))))

        !!this.initializeBatchCounter(this.selectedInvoicesToBeSend.length ? this.selectedInvoicesToBeSend.length : 0, this.messagesToBeCorrected.length ? this.messagesToBeCorrected.length : 0 , this.allMessages.filter(m => m.message && m.message.status && (m.message.status & (1 << 15 | 1 << 16 | 1 << 17)) === 0 && !(m.message.status & (1<<21))).length, this.allMessages.filter( m => m.message && m.message.status && (m.message.status & (1 << 15 | 1 << 16 )) !== 0 && !(m.message.status & (1<<21))).length, this.allMessages.filter( m => m.message && m.message.status && (m.message.status & (1 << 17)) !== 0 && !(m.message.status & (1<<21))).length, this.allMessages.filter( m => m.message && m.message.status && (m.message.status & (1 << 21)) !== 0).length)
    }

    initializeBatchCounter(toBeSend, toBeCorrected, processedCounter, acceptedCounter, rejectedCounter, archivedCounter){
        this.dispatchEvent(new CustomEvent('initialize-batch-counter', { bubbles: true, composed: true, detail: { toBeSend: toBeSend, toBeCorrected: toBeCorrected,  processing: processedCounter, rejected: rejectedCounter, accepted: acceptedCounter, archived: archivedCounter} }));
    }

    _openDetailPanel(e){
      if(_.get(e, 'detail.selectedInv', {})){
          this.set('selectedBatchForDetail', _.get(e, 'detail.selectedInv', {}))
          this.set('isDisplayDetail', true)
      }
    }

    _closeDetailPanel(){
        this.set('selectedBatchForDetail', {})
        this.set('isDisplayDetail', false)
    }

    _openInvoiceDetailPanel(e){
        if(_.get(e, 'detail.selectedInv', {})){
            this.set('selectedInvoiceForDetail', _.get(e, 'detail.selectedInv', {}))
            this.set('isDisplayInvoiceDetail', true)
        }
    }

    _closeInvoiceDetailPanel(){
        this.set('selectedInvoiceForDetail', {})
        this.set('isDisplayInvoiceDetail', false)
    }

    _invoicesStatusChanged(){
        this._closeDetailPanel()
    }


}

customElements.define(htMsgInvoice.is, htMsgInvoice);
