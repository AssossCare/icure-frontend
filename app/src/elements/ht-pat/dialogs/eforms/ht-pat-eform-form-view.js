import '../../../dynamic-form/ckmeans-grouping.js';
import '../../../../styles/vaadin-icure-theme.js';
import '../../../../styles/spinner-style.js';
import '../../../../styles/scrollbar-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/dialog-style';
import '../../../ht-spinner/ht-spinner.js';

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

import '../../../dynamic-form/dynamic-doc'
import '../../../dynamic-form/dynamic-pills'
import '../../../dynamic-form/dynamic-link'
import '../../../../styles/notification-style'

import moment from 'moment/src/moment';
import _ from 'lodash/lodash';
import * as models from '@taktik/icc-api/dist/icc-api/model/models'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../../tk-localizer";
class HtPatEformFormView extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
         <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style notification-style">

            .formContainer{
                height: calc(98% - 20px);
                width: 98%;
                padding: 1%;
            }

            .pageContent{
                padding: 12px;
                width: auto;
                box-sizing: border-box;
                height: 100%;
            }

            .tabIcon{
                padding-right: 10px;
            }

            iron-pages{
                height: 100%;
                height: calc(100% - 50px);
            }

            .modalDialog {
                height: 240px;
                width: 600px;
                padding:0px;
            }

            .content {
                padding: 12px;
            }

            .modal-title {
                justify-content: flex-start;
            }

            .modal-title iron-icon{
                margin-right: 8px;
            }

        </style>

        <paper-tabs selected="{{tabs}}" >
            <paper-tab>
                <iron-icon class="tabIcon" icon="icons:assignment"></iron-icon> [[localize('eforms','E-forms',language)]]
            </paper-tab>
            <template is="dom-if" if="[[attachmentAvailable]]">
                <paper-tab class="doNotDisplay" id="tabAttachments">
                    <iron-icon class="tabIcon" icon="editor:attach-file"></iron-icon> [[_getAttachmentCount(attachmentCount)]] [[localize('attachments','Attachments',language)]]
                </paper-tab>
            </template>
        </paper-tabs>
        <iron-pages selected="[[tabs]]">
            <page>
                <div class="pageContent">
                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                    <template is="dom-if" if="[[embededFormDomIf]]" restamp="true"><embed id="embededForm" src="[[selectedFormInfo.clientUrl]]" class="formContainer"/></template>
                </div>
            </page>
            <page>
                <div class="pageContent">
                    <ht-pat-eform-form-documents id="htPatEformFormDocuments" api="[[api]]" i18n="[[i18n]]" user="[[user]]" patient="[[patient]]" language="[[language]]" resources="[[resources]]" current-contact="[[currentContact]]" available-document-list="[[availableDocumentList]]"></ht-pat-eform-form-documents>
                </div>
            </page>
        </iron-pages>

        <paper-dialog class="modalDialog" id="etkNotRetrievedDialog" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content textaligncenter">
                <p class="fw700">[[localize('ehboxMissingEtkLine1','Your recipient does not support message encryption.',language)]]</p>
                <p class="">[[localize('ehboxMissingEtkLine2','Its ETK could not be found within the public keys repository.',language)]]</p>
                <p class="">[[localize('ehboxMissingEtkLine3','Please get in touch with the support and/or with your recipient.',language)]]</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other" dialog-dismiss><iron-icon icon="icons:close"></iron-icon>[[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
        <paper-dialog class="modalDialog" id="recipientWithoutEHealthBoxDialog" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:warning"></iron-icon> [[localize('warning','Warning',language)]]</h2>
            <div class="content textaligncenter">
                <p class="fw700">[[localize('ehBox_recipientHasNoEhbox_1','We encountered a problem with your recipient.',language)]]</p>
                <p class="">[[localize('ehBox_recipientHasNoEhbox_2','Even though found in the address book, it does not have a valid e-Health box.',language)]]</p>
                <p class="">[[localize('ehBox_recipientHasNoEhbox_3','Therefore, your message can not be sent to that recipient.',language)]]</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other" dialog-dismiss><iron-icon icon="icons:close"></iron-icon>[[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
 
`;
    }

    static get is() {
        return 'ht-pat-eform-form-view';
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
                value: () => {
                }
            },
            currentContact: {
                type: Object,
                value: () => {
                }
            },
            isLoading: {
                type: Boolean,
                value: false
            },
            hcp: {
                type: Object,
                value: () => {
                }
            },
            eformsHost: {
                type: Object,
                value: {}
            },
            selectedForm: {
                type: Object,
                value: () => {
                }
            },
            oAuthToken: {
                type: Object,
                value: () => {
                }
            },
            selectedFormInfo: {
                type: Object,
                value: () => {
                }
            },
            patientSumehr: {
                type: String,
                value: null
            },
            dataSetId:{
                type:String,
                value: null
            },
            embededFormDomIf: {
                type: Boolean,
                value: false
            },
            tabs:{
                type: Number,
                value: 0
            },
            attachmentAvailable:{
                type: Boolean,
                value: false
            },
            availableDocumentList:{
                type: Array,
                value: () => []
            },
            selectedDocumentIdToBeImported:{
                type: String,
                value: null
            }

        };
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    static get observers() {
        return ['_selectedTabChanged(tabs)'];
    }

    _reset() {
        this.set('selectedForm', {})
        this.set('dataSetId', null)
        this.set('selectedFormInfo', {})
        this.set('embededFormDomIf', false)
        this.set('isLoading', false)
    }

    _showForm() {

        const promResolve = Promise.resolve()

        return promResolve
            .then(() => {
                this.set('tabs', 0)
                this.set('isLoading', true)
                this.set('attachmentAvailable', false)
            })
            .then(() => this._removeForm())
            .then(removeFormResonse => _.parseInt(_.get(removeFormResonse, 'response.status', 0)) !== 204 ? this._showErrorNotification(_.get(removeFormResonse, 'response', 0), _.get(removeFormResonse, 'content', {})) : null)
            .then(() => this._createFormInstance())
            .then(formInstanceResponse => _.parseInt(_.get(formInstanceResponse, 'response.status', 0)) !== 201 ? this._showErrorNotification(_.get(formInstanceResponse, 'response', 0), _.get(formInstanceResponse, 'content', {})) : promResolve
                .then(() => this.set("embededFormDomIf", false))
                .then(() => this.set("selectedFormInfo", _.get(formInstanceResponse, 'content', {})))
                .then(() => this.set("embededFormDomIf", true))
                .then(() => this._uploadDataSet())
            )
            .then(dataSetResponse => _.parseInt(_.get(dataSetResponse, 'response.status', 0)) !== 200 ? this._showErrorNotification(_.get(dataSetResponse, 'response', 0), _.get(dataSetResponse, 'content', {})) : promResolve
                .then(() => this.set("dataSetId", _.get(dataSetResponse, 'content', null)))
                .then(() => this._mergeDataSet())
            )
            .then(mergeDataSetResponse => _.parseInt(_.get(mergeDataSetResponse, 'response.status', 0)) === 204 ? this._unlockForm() : this._showErrorNotification(_.get(mergeDataSetResponse, 'response', 0), _.get(mergeDataSetResponse, 'content', {})))
            .finally(() => {
                this.set('isLoading', false)
                this.set('attachmentAvailable', true)
            })

    }

    _createFormInstance() {
        return this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/", {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer ' + _.get(this, 'oAuthToken.access_token', null),
                'Content-Type': "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                id: _.get(this, 'selectedForm.id', {}),
                format: _.get(this, 'selectedForm.exportConfiguration.defaultDocumentFormat', 'A4'),
                integrator: {
                    name: 'Topaz',
                    version: '1.0'
                },
                headless: false,
                formManagesAttachments: true
            })
        })
    }

    _uploadDataSet(){
        return this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null)+"/data-set", {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "text/plain",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer ' + _.get(this, 'oAuthToken.access_token', null),
                'Content-Type': "application/vnd.healthconnect.eforms.kmehr.integrator.v1+xml;charset=UTF-8"
            },
            body: _.get(this, 'patientSumehr', null)
        })
    }

    _mergeDataSet(){
        return this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null)+"/merge", {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer ' + _.get(this, 'oAuthToken.access_token', null),
                "Content-Type": "application/json;charset=UTF-8"
            },
            body: JSON.stringify({
                "dataSetId" : _.get(this, 'dataSetId', null),
                "mergeStrategy" : "extend"
            })
        })
    }

    _unlockForm(){
        return this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null)+"/lock", {
            method: "DELETE",
            mode: "cors",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer ' + _.get(this, 'oAuthToken.access_token', null),

            }
        })
    }

    _removeForm(){
        return _.get(this.selectedFormInfo, 'formId', null) ? this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null), {
            method: "DELETE",
            mode: "cors",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer ' + _.get(this, 'oAuthToken.access_token', null),

            }
        }) : Promise.resolve({response: {status: 204}})
    }

    _removeAttachment(attachmentId){
        return attachmentId ? this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null)+"/attachments/"+attachmentId, {
            method: "DELETE",
            mode: "cors",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer ' + _.get(this, 'oAuthToken.access_token', null),

            }
        }) : Promise.resolve({response: {status: 204}})
    }

    _getFormAdr(){
        return this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null)+"/adr", {
            method: "GET",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer '+ _.get(this, 'oAuthToken.access_token', null),
                'Content-Type': 'application/xml'
            }
        })
    }

    _getFormPdf(){
        return this.api.executeFetchRequest(
            _.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null)+"/pdf",
            {
                method: "GET",
                headers: {
                    Accept: "application/json;charset=UTF-8",
                    "Accept-Language": this.language+"-BE",
                    Authorization: 'Bearer '+ _.get(this, 'oAuthToken.access_token', null),
                    'Content-Type': 'application/xml'
                }
            },
            "application/octet-stream"
        )
    }

    _getAllAttachments(){
        return this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null)+"/attachments", {
            method: "GET",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer '+ _.get(this, 'oAuthToken.access_token', null),
                'Content-Type': 'application/xml'
            }
        })
    }

    _getExportFormat() {
        return this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null)+"/pdf", {
            method: "GET",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer '+ _.get(this, 'oAuthToken.access_token', null),
            }
        })
    }

    _showErrorNotification(response, content) {
        this.dispatchEvent(new CustomEvent('show-error-notification', {bubbles: true, composed: true, detail: {response: response, content: content}}))
    }

    _tabChanged() {
        this.dispatchEvent(new CustomEvent('tab-changed', {bubbles: true, composed: true, detail: {tab: _.get(this, 'tabs', 0)}}))
    }

    _addFormAttachment() {
        if(_.get(this, 'selectedDocumentIdToBeImported', null)) {
            const selectedDoc = _.get(this, 'availableDocumentList', []).find(doc => _.get(doc, 'id', null) === _.get(this, 'selectedDocumentIdToBeImported', ''))

            if(_.get(selectedDoc, 'attachmentId', null)){
                (_.size(_.get(selectedDoc, 'encryptionKeys', [])) || _.size(_.get(selectedDoc, 'delegations', [])) ?
                        this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(_.get(this.user, 'healthcarePartyId', null), _.get(selectedDoc, 'id', null), _.size(_.get(selectedDoc, 'encryptionKeys', [])) ?
                            _.get(selectedDoc, 'encryptionKeys', []) : _.get(selectedDoc, 'delegations', []))
                            .then(({extractedKeys: enckeys}) => this.api.document().getDocumentAttachment(_.get(selectedDoc, 'id', null), _.get(selectedDoc, 'attachmentId', null), enckeys.join(','))) :
                        this.api.document().getDocumentAttachment(_.get(selectedDoc, 'id', null), _.get(selectedDoc, 'attachmentId', null))
                ).then(attachment => this._addAttachment(selectedDoc, attachment))
                    .then(attachmentResponse =>
                        _.parseInt(_.get(attachmentResponse, 'response.status', 0)) === 201 ? this._linkDocument(selectedDoc, _.get(attachmentResponse, 'content.id', null)) : this._showErrorNotification(_.get(attachmentResponse, 'response', 0), _.get(attachmentResponse, 'content', {}))
                    ).finally(() => {

                })
            }

        }
    }

    _removeFormAttachment(selectedDoc){
        if(_.get(selectedDoc, 'uploadedDocumentId', null)){
            this._removeAttachment(_.get(selectedDoc, 'uploadedDocumentId', null)).then(removeAttachmentResponse => {
                _.parseInt(_.get(removeAttachmentResponse, 'response.status', 0)) === 201 ? this._unlinkDocument(selectedDoc) : this._showErrorNotification(_.get(removeAttachmentResponse, 'response', 0), _.get(removeAttachmentResponse, 'content', {}))
            })
        }
    }

    _linkDocument(selectedDoc, attachmentId){
        let targetDocument = _.get(this, 'availableDocumentList', []).find(doc => _.get(doc, 'id', null) === _.get(selectedDoc, 'id', ''))
        _.assign(targetDocument, {uploadedDocumentId: attachmentId})
        this.shadowRoot.querySelector('#htPatEformFormDocuments')._refreshLinkedAndAvailableDocuments()
    }

    _unlinkDocument(selectedDoc){
        let targetDocument = _.get(this, 'availableDocumentList', []).find(doc => _.get(doc, 'id', null) === _.get(selectedDoc, 'id', ''))
        _.omit(targetDocument, ['uploadedDocumentId'])
        this.shadowRoot.querySelector('#htPatEformFormDocuments')._refreshLinkedAndAvailableDocuments()
    }

    _addAttachment(doc, attachment) {
        const attachmentAsBlob = new Blob([new Uint8Array(attachment)], {type: 'application/pdf'})

        const formData = new FormData();
        formData.append('attachment', attachmentAsBlob, _.get(doc, 'name', null));

        return this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null) + "/cloud/api/v1/forms/"+_.get(this.selectedFormInfo, 'formId', null)+"/attachments", {
            method: "POST",
            mode: "cors",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer ' + _.get(this, 'oAuthToken.access_token', null)
            },
            body: formData
        })
    }

    _selectedTabChanged() {
        _.get(this, 'tabs', 0) === 1 ?  this.shadowRoot.querySelector('#htPatEformFormDocuments')._refreshLinkedAndAvailableDocuments() : null
    }

    xmlStringToObject(xml){
        return new Promise((resolve, reject) => {
            xml2js.parseString(xml, { explicitArray: true, attrkey: 'attributes', charkey: 'value' }, (err, doc) => {
                if (err) reject(err);
                resolve(doc);
            });
        });
    }

    _importDocumentIntoPatient(content, docName, mimeType) {

        const promResolve = Promise.resolve()

        return this.api.message().newInstance(this.user)
            .then(nmi => this.api.message().createMessage(_.merge(nmi, {
                transportGuid: "EFORM:IN:IMPORTED-DOCUMENT",
                recipients: [this.user && this.user.healthcarePartyId],
                metas: {
                    filename: docName,
                    mediaType: mimeType
                },
                toAddresses: [_.get(this.user, 'email', this.user && this.user.healthcarePartyId)],
                subject: "Import form: "+ _.get(this. selectedForm, 'label', null) || null,
                status : 0 | 1<<25 | (this.patient.id ? 1<<26 : 0)
            })))
            .then(createdMessage => Promise.all([createdMessage, this.api.encryptDecrypt("encrypt", this.user, createdMessage, this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(JSON.stringify({patientId : _.get(this.patient, 'id', null), isAssigned: true}))))]))
            .then(([createdMessage, cryptedMeta]) => {
                createdMessage.metas.cryptedInfo = Base64.encode(String.fromCharCode.apply(null, new Uint8Array(cryptedMeta)))
                return this.api.message().modifyMessage(createdMessage)
            })
            .then(createdMessage => this.api.document().newInstance(this.user, createdMessage, {
                documentType: 'request',
                mainUti: this.api.document().uti(mimeType),
                name: docName
            }))
            .then(newDocInstance => this.api.document().createDocument(newDocInstance))
            .then(createdDocument => this.api.encryptDecrypt('encrypt', this.user, createdDocument, content).then(encryptedFileContent => ({createdDocument, encryptedFileContent })))
            .then(({createdDocument, encryptedFileContent}) => this.api.document().setDocumentAttachment(createdDocument.id, null, encryptedFileContent))
            .then(resourcesObject => {
                //Import into currentContact
                let sc = this.currentContact.subContacts.find(sbc => (sbc.status || 0) & 64);
                if (!sc) {
                    sc = { status: 64, services: [] };
                    this.currentContact.subContacts.push(sc);
                }
                const svc = this.api.contact().service().newInstance(this.user, {
                    content: _.fromPairs([[this.language, { documentId: resourcesObject.id, stringValue: resourcesObject.name }]]),
                    label: 'document',
                    tags: [
                        {type: 'CD-TRANSACTION', code: 'request'},
                        {type: 'EFORMS', code: 'download'},
                    ]
                });
                this.currentContact.services.push(svc);
                sc.services.push({ serviceId: svc.id });

                return this.saveCurrentContact().then(() => this.dispatchEvent(new CustomEvent('eforms-download', {bubbles: true, composed: true, detail: {}})))
            })
            .catch(e => { console.log("---error upload attachment---", e); return promResolve })

    }

    saveCurrentContact() {
        if(!this.currentContact.id ) {
            this.currentContact.id = this.api.crypto().randomUuid()
        }
        return (this.currentContact.rev ? this.api.contact().modifyContactWithUser(this.user, this.currentContact) : this.api.contact().createContactWithUser(this.user, this.currentContact)).then(c=>this.api.register(c,'contact')).then(c => (this.currentContact.rev = c.rev) && c);
    }

    _arrayBufferToByteArray(arrayBuffer) {
        let fileByteArray = [];
        new Uint8Array(arrayBuffer).forEach(int8 => fileByteArray.push(int8));
        return fileByteArray;
    }

    _checkRecipientIsValid(recipientId, recipientQuality) {

        // Cobra sometimes returns cbe, ehp, nihii, ssin with hyphens, spaces or dots
        recipientId = _.trim(recipientId).replace(/[^0-9]*/g,"")
        const isOrg = ["hospital","institution","labo","institution_ehp","sorting_center"].indexOf(_.trim(recipientQuality).toLowerCase()) > -1

        const patternsValidation = { heightDigits: /^([0-9]){8}$/i, tenDigits: /^([0-9]){10}$/i, elevenDigits: /^([0-9]){11}$/i}
        const isValidCbe = !!patternsValidation.tenDigits.test(recipientId)
        const isValidEhp = !!patternsValidation.tenDigits.test(recipientId)
        const isValidSsin = !!patternsValidation.elevenDigits.test(recipientId) && this.api.patient().isValidSsin(recipientId)
        const isValidNihii = !!patternsValidation.heightDigits.test(recipientId) || !!patternsValidation.elevenDigits.test(recipientId)

        const getProms = _.compact([
            (!isOrg || !isValidCbe) ? false : this.api.fhc().Addressbook().getOrgByCbeUsingGET(_.get(this, "api.keystoreId", null), _.get(this, "api.tokenId", null), _.get(this, "api.credentials.ehpassword", null), recipientId).catch(()=>Promise.resolve([])),
            (!isOrg || !isValidEhp) ? false : this.api.fhc().Addressbook().getOrgByEhpUsingGET(_.get(this, "api.keystoreId", null), _.get(this, "api.tokenId", null), _.get(this, "api.credentials.ehpassword", null), recipientId).catch(()=>Promise.resolve([])),
            (!isOrg || !isValidNihii) ? false : this.api.fhc().Addressbook().getOrgByNihiiUsingGET(_.get(this, "api.keystoreId", null), _.get(this, "api.tokenId", null), _.get(this, "api.credentials.ehpassword", null), recipientId).catch(()=>Promise.resolve([])),
            (isOrg || !isValidSsin) ? false : this.api.fhc().Addressbook().getHcpBySsinUsingGET(_.get(this, "api.keystoreId", null), _.get(this, "api.tokenId", null), _.get(this, "api.credentials.ehpassword", null), recipientId).catch(()=>Promise.resolve([])),
            (isOrg || !isValidNihii) ? false : this.api.fhc().Addressbook().getHcpByNihiiUsingGET(_.get(this, "api.keystoreId", null), _.get(this, "api.tokenId", null), _.get(this, "api.credentials.ehpassword", null), recipientId).catch(()=>Promise.resolve([]))
        ])

        return !_.trim(recipientId) ? Promise.resolve(true) : Promise.all(getProms)
            .then(searchResults => !!_.size(_.get(_.chain(searchResults).flatMap().filter(sr => !!_.size(_.get(sr,"ehealthBoxes"))).compact().uniq().head().value(), "ehealthBoxes")))
            .catch(() => true)

    }

    _eformSuccessfullySent(sendMessageResponse) {

        return typeof sendMessageResponse === "boolean" && sendMessageResponse===true || _.get(sendMessageResponse,"success") === true

    }

    _sendForm() {

        const promResolve = Promise.resolve()

        return promResolve
            .then(() => this._getFormAdr())
            .then(adrResponse => _.parseInt(_.get(adrResponse, 'response.status', 0)) !== 200 ? this._showErrorNotification(_.get(adrResponse, 'response', 0), _.get(adrResponse, 'content', {})) : this.xmlStringToObject(_.get(adrResponse, 'content', null))
                .then(parsedXml => this._getFormPdf().then(formPdf => ([parsedXml, formPdf])).catch(e=>([parsedXml, null])))
                .then(([parsedXml, formPdf]) => (this.set('isLoading', true)||true) && [parsedXml, formPdf])
                .then(([parsedXml, formPdf]) => !_.get(formPdf, "content", null) instanceof ArrayBuffer || !(parseInt(_.get(formPdf, "content.byteLength", 0)) || 0) ? [parsedXml, formPdf] : this._importDocumentIntoPatient(_.get(formPdf, "content", null), [(_.trim(_.get(this, "selectedFormInfo.formId")) ? _.trim(_.get(this, "selectedFormInfo.formId")) : this.api.crypto().randomUuid()), moment().format("YYYYMMDDHHmmss")].join("-") + ".pdf", "application/pdf").then(() => parsedXml).catch(() => parsedXml))
            )
            .then(parsedXml => !_.size(parsedXml) ? this.set('isLoading', false) : this._checkRecipientIsValid(_.trim(_.get(_.get(parsedXml,"ADR.Addressee[0]",{}), "Identifier[0]")), _.trim(_.get(_.get(parsedXml,"ADR.Addressee[0]",{}), "Quality[0]"))).then(recipientIsValid => recipientIsValid ? parsedXml : (this.set('isLoading', false)||true) && this.shadowRoot.querySelector("#recipientWithoutEHealthBoxDialog").open()))
            .then(parsedXml => !_.size(parsedXml) ? this.set('isLoading', false) : this._sendFormUsingEhBox(parsedXml)
                .then(sendMessageResponse => (this.dispatchEvent(new CustomEvent("feedback-message", {composed: true, bubbles: true, detail: {message:this._eformSuccessfullySent(sendMessageResponse) ? this.localize("sen_succ", "Message successfully sent", this.language) : this.localize("sen_error", "Message could not be sent", this.language)}}))||true) && sendMessageResponse)
                .then(sendMessageResponse => this._eformSuccessfullySent(sendMessageResponse) ? (this._reset()||true) && this.dispatchEvent(new CustomEvent('close-dialog', {bubbles: true, composed: true, detail: {}})) : (this.set('isLoading', false)||true) && (["api-errorundefined","api-error403"].indexOf(_.trim(sendMessageResponse.message && _.get(sendMessageResponse,"message","") || _.get(sendMessageResponse,"error",""))) > -1 ? this.$["etkNotRetrievedDialog"].open() : null))
            )

    }

    _sendFormUsingEhBox(parsedXml) {

        const promResolve = Promise.resolve()
        const patternsValidation = {
            heightDigits: /^([0-9]){8}$/i,
            tenDigits: /^([0-9]){10}$/i,
            elevenDigits: /^([0-9]){11}$/i
        }
        const publicationId = +new Date
        const additionalCustomMetas = _
            .chain(_.get(parsedXml,"ADR.MetaData",[]))
            // All ADR metas
            .reduce((acc, it) => _.merge(acc, _.fromPairs([[_.get(it,"Key[0]"),_.get(it,"Value[0]")]])), {})
            // First attachment - name
            .merge(_.fromPairs([["HC-AttachmentFilename",_.get(parsedXml,"ADR.Attachment[0].Name[0]")]]))
            // First attachment - type
            .merge(_.fromPairs([["HC-FunctionalType",_.get(parsedXml,"ADR.Attachment[0].FunctionalType[0]")]]))
            // All OTHER attachments - name
            .merge(_.reduce(_.get(parsedXml, "ADR.Attachment", []).slice(1), (acc, it, index) => _.merge(acc, _.fromPairs([["HC-AttachmentFilename-" + _.trim(index+1), _.get(it,"Name[0]")]])), {}))
            // All OTHER attachments - type
            .merge(_.reduce(_.get(parsedXml, "ADR.Attachment", []).slice(1), (acc, it, index) => _.merge(acc, _.fromPairs([["HC-FunctionalType-" + _.trim(index+1), _.get(it,"FunctionalType[0]")]])), {}))
            .value()
        const subject = _.trim(_.get(parsedXml, "ADR.Subject[0]", ""))
        const annexes = _.compact(_.map(_.get(parsedXml, "ADR.Attachment", []), it => {
            const filename = _.trim(_.get(it, "Name[0]", this.api.crypto().randomUuid()))
            const attachmentContent = this._arrayBufferToByteArray(this.api.crypto().utils.base64toArrayBuffer(_.get(it, "Content[0]")))
            return !_.trim(_.get(it, "Content[0]")) ? false : {
                title: filename,
                filename: filename,
                content: attachmentContent,
                mimeType: _.trim(_.get(it, "MimeType[0]", "text/plain")),
            }
        }))

        return !_.size(parsedXml) ? promResolve : promResolve
            .then(() => this.set('isLoading', true))
            .then(() => _.map(_.get(parsedXml, "ADR.Addressee", []), it => {
                const identifierValue = _.trim(_.trim(_.get(it, "Identifier[0]", "")).replace(/[^0-9]*/g, ""))
                const isValidCbe = !!patternsValidation.tenDigits.test(identifierValue)
                const isValidEhp = !!patternsValidation.tenDigits.test(identifierValue)
                const isValidSsin = !!patternsValidation.elevenDigits.test(identifierValue) && this.api.patient().isValidSsin(identifierValue)
                const isValidNihii = !!patternsValidation.heightDigits.test(identifierValue) || !!patternsValidation.elevenDigits.test(identifierValue)
                const recipientsName = _.trim(_.get(it, "Name[0]", "")) ? _.trim(_.get(it, "Name[0]", "")) : _.trim(_.trim(_.get(it, "FirstName[0]", "")) + " " + _.trim(_.get(it, "FirstName[0]", "")))
                return {
                    identifierType: {type: isValidCbe ? "CBE" : isValidEhp ? "EHP" : isValidSsin ? "SSIN" : "NIHII"},
                    id: identifierValue,
                    name: (isValidCbe || isValidEhp) ? null : _.trim(recipientsName) ? _.trim(recipientsName) : null,
                    quality: _.trim(_.get(it, "Quality[0]", "DOCTOR")),
                }
            }))
            .then(recipients => this.api.hcparty().getCurrentHealthcareParty().then(currentHcp => [currentHcp, recipients]))
            .then(([currentHcp, recipients]) => _.merge({}, {
                id: this.api.crypto().randomUuid(),
                publicationId: publicationId,
                publicationDateTime: parseInt(moment().format('YYYYMMDD')),
                expirationDateTime: parseInt(moment().add(1, "years").format('YYYYMMDD')),
                customMetas: {
                    "CM-AuthorID": _.trim(_.get(currentHcp, "nihii", _.get(currentHcp, "ssin", ""))),
                    "CM-AuthorIDType": _.trim(_.get(currentHcp, "nihii", "")) ? "NIHII" : "SSIN",
                    "CM-AuthorType": _.trim(_.get(currentHcp, "civility", "doctor")).toUpperCase(),
                    "CM-AuthorLastName": _.trim(_.get(currentHcp, "lastName", "")).toUpperCase(),
                    "CM-AuthorFirstName": _.trim(_.get(currentHcp, "firstName", "")),
                    "CM-AuthorName": (!_.trim(_.get(currentHcp, "lastName", "")) && !_.trim(_.get(currentHcp, "firstName", ""))) ? _.trim(_.get(currentHcp, "name", _.get(currentHcp, "companyName", ""))) : "",
                    "CM-RecipientID": _.trim(_.get(recipients, "[0].id", "")),
                    "CM-RecipientIDType": _.trim(_.get(recipients, "[0].type", "NIHII")),
                    "CM-RecipientName": _.get(recipients,"[0].name", null),
                    "CM-EhrMessage": false,
                    "CM-EhrMessageType": "Functionnal",
                    "CM-EtkApplicationID": _.trim(_.get(this, "api.tokenId", "")),
                    "CM-Requestnumber": publicationId,
                    "CM-SendDateTime": moment().format('YYYY-MM-DD HH:mm:ss'),
                    "CM-AttachmentTransportType": "EFORMS",
                    "HC-publicationDate": moment().format('YYYY-MM-DD HH:mm:ss'),
                },
                document: {title: subject, textContent: "", mimeType: 'text/plain', filename: subject},
                freeText: "",
                freeInformationTableTitle: null,
                freeInformationTableRows: {},
                // _.trim(_.get(parsedXml,"ADR.Patient[0].INSS[0]")) ? _.trim(_.get(parsedXml,"ADR.Patient[0].INSS[0]")) : null
                patientInss: null,
                annex: annexes,
                copyMailTo: [],
                documentTitle: subject,
                annexList: annexes,
                useReceivedReceipt: true,
                useReadReceipt: false,
                usePublicationReceipt: false,
                hasAnnex: !!_.size(annexes),
                hasFreeInformations: false,
                important: false,
                encrypted: false,
                destinations: recipients,
                sender: {
                    identifierType: "NIHII",
                    id: _.trim(_.get(currentHcp, "nihii", "")),
                    quality: _.trim(_.get(currentHcp, "quality", "doctor")).toUpperCase(),
                    applicationId: "",
                    lastName: _.trim(_.get(currentHcp, "lastName", "")),
                    firstName: _.trim(_.get(currentHcp, "firstName", "")),
                    organizationName: (!_.trim(_.get(currentHcp, "lastName", "")) && !_.trim(_.get(currentHcp, "firstName", ""))) ? _.trim(_.get(currentHcp, "name", _.get(currentHcp, "companyName", ""))) : "",
                    personInOrganisation: ""
                },
                fromHealthcarePartyId: _.get(currentHcp, "id", ""),
                status: (((1 << 1) /*| 1 << 3*/) | 1 << 4) // 1 << 1 (unread) | 1 << 3 (is encrypted) | 1 << 4 (has annexes)
            }))
            .then(message => _.merge({}, message, {customMetas:_.extend({
                    "CM-SenderID": _.get(message, "customMetas.CM-AuthorID",""),
                    "CM-SenderIDType": _.get(message, "customMetas.CM-AuthorIDType",""),
                    "CM-SenderType": _.get(message, "customMetas.CM-AuthorType",""),
                    "CM-SenderLastName": _.get(message, "customMetas.CM-AuthorLastName",""),
                    "CM-SenderFirstName": _.get(message, "customMetas.CM-AuthorFirstName",""),
                    "CM-SenderName": _.get(message, "customMetas.CM-AuthorName",""),
                    "HC-SenderMainIdentifier": _.get(message, "customMetas.CM-AuthorID",""),
                }, additionalCustomMetas)}))
            .then(message => {
                Object.keys(message.customMetas).forEach(k => { if (!_.trim(message.customMetas[k])) try { delete message.customMetas[k] } catch (e) {}})
                return this.api.fhc().EhboxV3().sendMessageUsingPOST1(
                    _.get(this, "api.keystoreId", null),
                    _.get(this, "api.tokenId", null),
                    _.get(this, "api.credentials.ehpassword", null),
                    _.get(message,"usePublicationReceipt",false),
                    _.get(message,"useReceivedReceipt",true),
                    _.get(message,"useReadReceipt",false),
                    message
                ).catch(e => e)
            })
            .catch(e => null)

    }

}

customElements.define(HtPatEformFormView.is, HtPatEformFormView);
