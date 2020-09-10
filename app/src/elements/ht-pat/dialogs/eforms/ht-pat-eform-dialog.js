import '../../../dynamic-form/ckmeans-grouping.js';
import '../../../../styles/vaadin-icure-theme.js';
import '../../../../styles/spinner-style.js';
import '../../../../styles/scrollbar-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/dialog-style';
import '../../../ht-spinner/ht-spinner.js';
import '../../../../styles/notification-style'

import './ht-pat-eform-form-view'
import '../../../dynamic-form/dynamic-link'
import '../../../dynamic-form/dynamic-pills'
import '../../../dynamic-form/dynamic-doc'


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
import * as models from '@taktik/icc-api/dist/icc-api/model/models'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../../tk-localizer";
class HtPatEformDialog extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style notification-style">

            #eformDetailDialog{
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
                max-height: 100%!important;
                width: auto;
                margin: 1%;
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


            .eformDetailDialog{
                display: flex;
                height: calc(100% - 45px);
                width: auto;
                margin: 0;
                padding: 0;
            }

            .eforms-menu-list{
                height: 100%;
                width: 30%;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                position: relative;
            }

            .eforms-menu-view{
                height: 100%;
                width: 70%;
                position: relative;
                background: white;
            }

            .eforms-menu-list-header{
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

            .eforms-menu-list-header-img{
                height: 40px;
                width: 40px;
                background-color: transparent;
                margin: 4px;
                float: left;
            }

            .eforms-menu-list-header-info{
                margin-left: 12px;
                display: flex;
                /*align-items: center;*/
            }

            .eforms-menu-list-header-img img{
                width: 100%;
                height: 100%;
            }

            .eforms-menu-list-header-info{
                margin-left: 12px;
                display: flex;
                /*align-items: center;*/
            }

            .eforms-menu-list-header-img img{
                width: 100%;
                height: 100%;
            }

            .eforms-name{
                font-size: var(--font-size-large);
                font-weight: 700;
            }

            .search-line{
                display: flex;
            }

            collapse-button[opened] .menu-item-icon{
                transform: scaleY(-1);
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

            .sublist .menu-item {
                font-size: var(--font-size-normal);
                min-height:20px;
                height:20px;
            }
            .sublist{
                background:var(--app-light-color);
                padding:0;
            }

            .table-line-menu-top{
                padding-left: var(--padding-menu-item_-_padding-left);
                padding-right: var(--padding-menu-item_-_padding-right);
                box-sizing: border-box;
            }

            .eforms-submenu-container{
                overflow: auto;
                height: calc(100% - 48px);
            }

            .formIconTit{
                width: 5%;
                padding-right: 10px;
                font-weight: bold;
            }

            .formTitleTit{
                width: 95%;
                padding-right: 10px;
                font-weight: bold;
            }

            .formIcon{
                width: 5%;
                padding-right: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .formTitle{
                width: 95%;
                padding-right: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }

            .icons{
                height: 12px;
                width: 12px;
            }

            #htPatEformFormView{
                height: calc(100% - 45px);
                width: 100%;
            }

        </style>
        
        <paper-dialog id="eformDetailDialog">
            <div class="content eformDetailDialog">
                <div class="eforms-menu-list">
                    <div class="eforms-menu-list-header">
                        <div class="eforms-menu-list-header-info">
                            <div class="eforms-name">
                                <span class="eforms">[[localize('eforms', 'E-forms', language)]]</span>
                            </div>
                        </div>
                    </div>
                    <div class="eforms-submenu-container">
                        <ht-spinner active="[[isLoading]]"></ht-spinner>
                        <template is="dom-if" if="[[!isLoading]]">
                            <div class="search-line">

                            </div>

                            <paper-listbox id="" class="menu-content sublist" selectable="paper-item"  toggle-shift>
                                <div class="table-line-menu table-line-menu-top">
                                    <div class="formIconTit"></div>
                                    <div class="formTitleTit">[[localize('eforms-type','E-forms type',language)]]</div>
                                </div>
                                <template is="dom-repeat" items="[[formList]]" as="form" >
                                    <collapse-button>
                                        <paper-item slot="sublist-collapse-item" id$="[[form.id.name]]" aria-selected="[[selected]]" class$="menu-trigger menu-item [[isIronSelected(selected)]]" on-tap="_createFormInstance">
                                            <div id="subMenu" class="table-line-menu">
                                                <div class="formIcon">
                                                    <iron-icon icon="icons:assignment" class="icons"></iron-icon>
                                                </div>
                                                <div class="formTitle">[[form.label]]</div>
                                            </div>
                                        </paper-item>
                                    </collapse-button>
                                </template>
                            </paper-listbox>
                        </template>
                    </div>
                </div>
                <div class="eforms-menu-view">
                    <ht-pat-eform-form-view id="htPatEformFormView" api="[[api]]" i18n="[[i18n]]" user="[[user]]" patient="[[patient]]" language="[[language]]" resources="[[resources]]" current-contact="[[currentContact]]" selected-form="[[selectedForm]]" eforms-host="[[eformsHost]]" o-auth-token="[[oAuthToken]]" patient-sumehr="[[patientSumehr]]" available-document-list="[[availableDocumentList]]" selected-document-id-to-be-imported="[[selectedDocumentIdToBeImported]]" on-show-error-notification="_showErrorNotification" on-close-dialog="_closeDialog" on-selected-document="_selectedDocument"></ht-pat-eform-form-view>
                </div>
            </div>
            <div class="buttons">
                <paper-button class="button button--other" on-tap="_closeDialog"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <template is="dom-if" if="[[linkBtnAvailable]]">
                    <paper-button class="button button--other" on-tap="_addFormAttachment"><iron-icon icon="icons:add"></iron-icon> [[localize('eforms-join-doc','Join document',language)]]</paper-button>
                </template>
                <!--
                <template is="dom-if" if="[[unlinkBtnAvailable]]">
                    <paper-button class="button button--other" on-tap="_removeFormAttachment"><iron-icon icon="icons:add"></iron-icon> [[localize('eforms-remove-doc','Remove document',language)]]</paper-button>
                </template>
                -->
                <template is="dom-if" if="[[isSelectedForm]]">
                    <paper-button class="button button--save" on-tap="_sendForm"><iron-icon icon="icons:check"></iron-icon> [[localize('send','Send',language)]]</paper-button>
                </template>

            </div>
        </paper-dialog>

        <paper-item id="eforms-notification" class="notification-container error">
            <iron-icon class="notification-icn" icon="vaadin:exclamation"></iron-icon>
            <div class="notification-msg">
                <h4>[[localize('err', 'Error', language)]]</h4>
                <p>[[errorInfo.response.status]]: [[errorInfo.content.message]]</p>
            </div>
            <paper-button name="closePostit" class="notification-btn single-btn" on-tap="_closeEformsErrorNotification">
                [[localize('clo','Close',language)]]
            </paper-button>
        </paper-item>
 
`;
    }

    static get is() {
        return 'ht-pat-eform-dialog';
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
            tabs: {
                type:  Number,
                value: 0
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            hcp: {
                type: Object,
                value: () => {}
            },
            eformsHost: {
                type: Object,
                value: {
                    healthConnect: null,
                    eForms: null,
                    credentials: null
                }
            },
            formList:{
                type: Array,
                value: () => []
            },
            selectedForm:{
                type: Object,
                value: () => {}
            },
            oAuthToken:{
                type: Object,
                value: () => {}
            },
            patientSumehr:{
                type: String,
                value: null
            },
            errorInfo:{
                type: Object,
                value: () => {}
            },
            contacts:{
                type: Array,
                value: () => []
            },
            healthElements:{
                type: Object,
                value : () => {}
            },
            availableDocumentList:{
                type: Array,
                value: () => []
            },
            selectedDocumentIdToBeImported:{
                type: String,
                value: null
            },
            linkBtnAvailable:{
                type: Boolean,
                value: false
            },
            unlinkBtnAvailable:{
                type: Boolean,
                value: false
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
        return ['_initialize(api, user)', '_selectedFormChanged(selectedForm, selectedForm.*)'];
    }

    _reset(){
        this.set('formList', [])
        this.set('hcp', {})
        this.set('isLoading', false)
        this.set('formList', [])
        this.set('selectedForm', {})
        this.set('oAuthToken', {})
        this.set('patientSumehr', null)
        this.set('availableDocumentList', [])
        this.set('isSelectedForm', false)
        this.set('selectedDocumentIdToBeImported', null)
        this.shadowRoot.querySelector('#htPatEformFormView')._reset()
        this.set('unlinkBtnAvailable', false)
        this.set('linkBtnAvailable', false)
    }

    _initialize(){

        this._reset()

        // Could be https://healthconnect.be for prod
        this.set('eformsHost.healthConnect', _.get(_.get(this, 'user.properties', []).find(p => _.get(p, 'type.identifier', null) === 'org.taktik.icure.user.eHealthEnv'), "typedValue.stringValue", null) === "acc" ? "https://acc.healthconnect.be" : "https://services.healthconnect.be")

        // Could be https://acc.e-forms.be (acc) and https://e-forms.be (prod)
        this.set('eformsHost.eForms', _.get(_.get(this, 'user.properties', []).find(p => _.get(p, 'type.identifier', null) === 'org.taktik.icure.user.eHealthEnv'), "typedValue.stringValue", null) === "acc" ? "https://acc-services.e-forms.be" : "https://services.e-forms.be")

        this.set('eformsHost.credentials', _.get(_.get(this, 'user.properties', []).find(p => _.get(p, 'type.identifier', null) === 'org.taktik.icure.user.eHealthEnv'), "typedValue.stringValue", null) === "acc" ? 'ZmlnYWM6bjdFLjJbWVBRakAiOFc2Slc7NGM=' : "ZmlnYWM6bW5IN1h6THhZY016V25Dcg==")

    }

    openDialog(){
        this._reset()
        if(_.get(this.api, 'tokenId', null) && _.get(this, 'api.keystoreId', null)) {
            this.set('isLoading', true)
            this.shadowRoot.querySelector("#eformDetailDialog").open()
            this.api.hcparty().getHealthcareParty(_.get(this.user, 'healthcarePartyId', null)).then(hcp => {
                this.set('hcp', hcp)
                return this._getDocuments()
            }).then(availableDocument => {
                this.set("availableDocumentList", availableDocument.map(ad => ad.document))
                //return this._generateSumehrV2()
                return this._generateSimplifiedSumehr(false)
            }).then(sumehr => {
                this.set('patientSumehr', sumehr)
                return this._requestOAuthToken()
            }).then(oAuthResponse => {
                _.parseInt(_.get(oAuthResponse, 'response.status', 0)) === 200 ? this.set('oAuthToken', _.get(oAuthResponse, 'content', {})) : this._showErrorNotification({
                    response: _.get(oAuthResponse, 'response', 0),
                    content: _.get(oAuthResponse, 'content', {})
                })
                return _.parseInt(_.get(oAuthResponse, 'response.status', 0)) === 200 ? this._getFormDefinition() : Promise.resolve([])
            }).then(formDefinitionResponse => {
                _.parseInt(_.get(formDefinitionResponse, 'response.status', 0)) === 200 ? this.set('formList', _.get(formDefinitionResponse, 'content', {})) : this._showErrorNotification({
                    response: _.get(formDefinitionResponse, 'response', 0),
                    content: _.get(formDefinitionResponse, 'content', {})
                })
            }).finally(() => {
                this.set('isLoading', false)
            })
        }
    }

    _generateSumehrV2() {
        return this.api.icure().getVersion().then(v =>  this.api.crypto().extractDelegationsSFKs(this.patient, this.user.healthcarePartyId)
            .then(secretForeignKeys => this.api.bekmehr().generateSumehrV2ExportWithEncryptionSupport(this.patient.id, this.user.healthcarePartyId, "fr", {
                secretForeignKeys: secretForeignKeys.extractedKeys,
                recipient: this.hcp,
                comment: "",
                excludedIds: null,
                softwareName: "TOPAZ",
                softwareVersion: v
            })).then(output => output.text())
        )
    }

    _requestOAuthToken(){
        return this.api.executeFetchRequest(_.get(this, 'eformsHost.healthConnect', null)+"/iamWeb/oauth/token", {
            method: "POST",
            mode: "cors",
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded; charset=ISO-8859-1',
                Authorization: 'Basic '+_.get(this, 'eformsHost.credentials', null),
                Accept: '*/*',
                'Accept-Language': this.language+"-BE"
            },
            body: 'sts-token='+this._getToken()+'&grant_type=sts_token&integratorVersion=2.3.7'
        })
    }

    _getToken(){
        return this.api.crypto().utils.base64url(new Uint8Array(Buffer.from(_.get(this.api, 'fhcTokenInfo.token', null))))
    }

    _getFormDefinition(){
        return this.api.executeFetchRequest(_.get(this, 'eformsHost.eForms', null)+"/catalogue/api/v1/form-definitions", {
            method: "GET",
            headers: {
                Accept: "application/json;charset=UTF-8",
                "Accept-Language": this.language+"-BE",
                Authorization: 'Bearer '+_.get(this.oAuthToken, 'access_token', {})
            }
        })
    }



    _closeDialog(){
        this._reset()
        this.shadowRoot.querySelector("#eformDetailDialog").close()
    }



    _createFormInstance(e){
        if(_.get(e, 'currentTarget.id', null)){
            this.set("selectedForm", _.get(this, 'formList', []).find(form => _.get(form, 'id.name', '') === _.get(e, 'currentTarget.id', null)))
            //@julien i added this because max wanted a different sumher between SPF and the other eform.
            if(this.selectedForm.id.name.includes("HANDICARE")){
                this._generateSimplifiedSumehr(true).then(sumehr=>{
                    this.set("patientSumehr",sumehr)
                    this.shadowRoot.querySelector('#htPatEformFormView')._showForm()
                })
            }else{
                this.shadowRoot.querySelector('#htPatEformFormView')._showForm()
            }
        }
    }

    _sendForm(){
        this.shadowRoot.querySelector("#htPatEformFormView")._sendForm()
    }

    _showErrorNotification(e){
        if(!_.isEmpty(_.get(e, 'detail', {})) || !_.isEmpty(_.get(e, 'response', {}))){
            this.set("errorInfo", _.get(e, 'detail', null) ? _.get(e, 'detail', {}) : e)
            this.shadowRoot.querySelector("#eforms-notification").classList ? this.shadowRoot.querySelector("#eforms-notification").classList.add('notification') : null
            setTimeout(() => {
                this._closeEformsErrorNotification()
            }, 10000);
        }
    }

    _closeEformsErrorNotification(){
        this.shadowRoot.querySelector("#eforms-notification").classList ? this.shadowRoot.querySelector("#eforms-notification").classList.remove('notification') : null
    }

    _getDocuments(){
        return this.api.contact().findBy( _.trim(_.get(this,"user.healthcarePartyId","")), this.patient )
            .then(patientContacts => _.compact(_.flatten(_.map(patientContacts, singleContact => _.map(singleContact.services, singleService => !_.trim(_.get(singleService,"content." + this.language + ".documentId")) ? false : {
                contact: singleContact,
                service: singleService,
                serviceTitle: _.trim(_.get(singleService,"content." + this.language + ".stringValue")),
                formId: _.trim(_.get(singleService,"formId")),
                date: parseInt(_.get(singleService,"valueDate")),
                dateAndTimeHr: moment(parseInt(_.trim(_.get(singleService,"valueDate")).substring(0,8)),"YYYYMMDD").format('DD/MM/YYYY') + " - " + _.trim(_.get(singleService,"valueDate")).substring(8,10) + ":" + _.trim(_.get(singleService,"valueDate")).substring(10,12),
                documentId: _.trim(_.get(singleService,"content." + this.language + ".documentId"))
            })))))
            .then(foundServices => !_.size(foundServices) ? Promise.resolve([foundServices, []]) : this.api.document().getDocuments({ids:_.map(foundServices,s=>s.documentId)}).then(foundDocuments=>[foundServices,foundDocuments]))
            .then(([foundServices,foundDocuments]) => _.compact(_.map(foundServices, fs => {
                const serviceDocument = _.find(foundDocuments, {id: _.trim(_.get(fs, "documentId"))})
                const documentExtension = _.trim(_.last(_.trim(_.get(serviceDocument,"name","")).split("."))).toLowerCase()
                return (
                    ['jpg','jpeg','pdf','png','tif','tiff'].indexOf(documentExtension) === -1 ||
                    !_.trim(_.get(serviceDocument,"id","")) ||
                    !_.trim(_.get(serviceDocument,"attachmentId","")) ||
                    !_.trim(_.get(serviceDocument,"secretForeignKeys",""))
                ) ? false : _.merge({}, _.omit(fs, ['documentId']), {document: serviceDocument})
            })))
            .then(servicesAndDocuments => Promise.all(servicesAndDocuments.map(sad => this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(_.get(this, "user.healthcarePartyId", null), _.trim(_.get(sad.document, "id", "")), _.size(_.get(sad.document, "encryptionKeys", [])) ? _.get(sad.document, "encryptionKeys", []) : _.get(sad.document, "delegations", []))
                    .then(({extractedKeys: enckeys}) => !!_.trim(_.get(sad.document,"id","")) && _.trim(_.get(sad.document,"attachmentId","")) ? this.api.document().getDocumentAttachment(_.trim(_.get(sad.document,"id","")), _.trim(_.get(sad.document,"attachmentId","")), enckeys.join(',')).then(decryptedContent=>(_.merge(sad, {document:{decryptedContent:decryptedContent}}))).catch(e=>{console.log("ERROR with getAttachment: ",e); }) : sad)
                )).then(servicesAndDocuments => servicesAndDocuments)
            )
            .then(servicesAndDocuments => _
                .chain(servicesAndDocuments)
                .filter(i => !!_.trim(_.get(i,"document.id")) && !!parseInt(_.get(i,"document.decryptedContent.byteLength")) )
                .orderBy(['date'], ['desc'])
                .value()
            )
    }

    _selectedFormChanged(){
        _.get(this, 'selectedForm.id.name', null) ? this.set('isSelectedForm', true) : this.set('isSelectedForm', false)
        this.set('availableDocumentList', _.get(this, 'availableDocumentList', []).map(doc => _.omit(doc, ['uploadedDocumentId'])))
        this.set("unlinkBtnAvailable", false)
        this.set("linkBtnAvailable", false)
    }

    _selectedDocument(e){
        if(_.get(e, 'detail', null)){
            this.set("unlinkBtnAvailable", false)
            this.set("linkBtnAvailable", false)
            const selectedDoc = _.get(this, 'availableDocumentList', []).find(doc => _.get(doc, 'id', null) === _.get(e, 'detail.documentId', null))
            _.get(selectedDoc, 'uploadedDocumentId', null) ? this.set('unlinkBtnAvailable', true) : this.set("linkBtnAvailable", true)
            this.set('selectedDocumentIdToBeImported',  _.get(e, 'detail.documentId', null))
        }
    }

    _addFormAttachment(){
        this.shadowRoot.querySelector("#htPatEformFormView")._addFormAttachment()
    }

    _removeFormAttachment(){
        this.shadowRoot.querySelector("#htPatEformFormView")._removeFormAttachment(_.get(this, 'availableDocumentList', []).find(doc => _.get(doc, 'id', null) === _.get(this, 'selectedDocumentIdToBeImported', null)))
    }

    _generateSimplifiedSumehr(isFull){
        const dmg= _.get(this,"patient.patientHealthCareParties",[]).find(hcp => hcp.referral && hcp.type==="doctor" && hcp.referralPeriods.length  && hcp.referralPeriods.find(p => p && (p.startDate && !p.endDate) || (p.startDate && p.endDate && moment().isBetween(this.api.moment(p.startDate),this.api.moment(p.endDate),'day') ) ))
        const treatments = this.api.contact().filteredServices(this.contacts, s => s.label==="Actes")

        const codesToGet = _.chunk(_.compact(_.uniq(_.flatten(_.flatMap(this.healthElements).map(he => he.codes.map(code => code.id))).concat(_.flatten(treatments.map(t => t.codes.map(code=> code.id)))))),100)

        let cptId = 1

        const XMLFormat = (text) => [["&",'&amp;'],["<","&lt;"],[">","&gt;"],['"','&quot;'],["'","&apos;"]].reduce((acc , [key,value]) => _.replace(acc,key,value), text)

        const _getDmgData = (hcp)=> {
            if(hcp){
                return '<item>' +
                    '   <id S="ID-KMEHR" SV="1.0">'+(cptId++)+'</id>' +
                    '   <cd S="CD-ITEM" SV="1.11">gmdmanager</cd>' +
                    '   <content>' +
                    '       <hcparty>' +
                    '           <id S="ID-HCPARTY" SV="1.0">'+XMLFormat(_.get(hcp,'nihii',null))+'</id>' +
                    '           <cd S="CD-HCPARTY" SV="1.10">'+XMLFormat(_.get(hcp,'speciality','persphysician'))+'</cd>' +
                    '           <firstname>'+XMLFormat(_.get(hcp,'firstName',null))+'</firstname>' +
                    '           <familyname>'+XMLFormat(_.get(hcp,'lastName',null))+'</familyname>' +
                    '       </hcparty>' +
                    '   </content>' +
                    '</item>'
            }else{
                return ''
            }
        }

        const _getMedicationContent = ((he) => {
            if(he){
                const content =this.api.contact().preferredContent(he, this.language)
                return '   <content>' +
                    ( _.get(content,"medicationValue.medicinalProduct",false) ?
                        '       <medicinalproduct>' +
                        (_.get(content,"medicationValue.medicinalProduct.intendedcds",[]).reduce((accIcd, icd)=> accIcd+'<intendedcd SV="'+XMLFormat(_.get(content,"medicationValue.beginMoment",""))+'" S="'+XMLFormat(_.get(icd,"type","CD-DRUG-CNK"))+'">'+XMLFormat(_.get(icd,"code",""))+'</intendedcd>' ,''))+
                        '           <intendedname>'+XMLFormat(_.get(content,"medicationValue.medicinalProduct.intendedname",""))+'</intendedname>' +
                        '       </medicinalproduct>' :
                    _.get(content,"medicationValue.substanceProduct ",false)?
                        '<substanceproduct>' +
                        (_.get(content,"medicationValue.substanceProduct.intendedcds",[]).reduce((accIcd, icd)=> accIcd+'<intendedcd SV="'+XMLFormat(_.get(content,"medicationValue.beginMoment",""))+'" S="'+XMLFormat(_.get(icd,"type",""))+'">'+XMLFormat(_.get(icd,'code',''))+'</intendedcd>' , ''))+
                        '           <intendedname>'+XMLFormat(_.get(content,"medicationValue.medicinalProduct.intendedname",""))+'</intendedname>' +
                        '</substanceproduct>' :'') +
                '   </content>'
                //todo compound
            }else{
                return ''
            }
        }).bind(this)

        const _getHE = ((labels) => {
            if(this.healthElements){
                return _.flatMap(this.healthElements).filter(he => !_.get(he,"codes",[{code : "*"}]).find(code => code.code.startsWith('*'))).reduce((accHe , he) =>
                    accHe.toString() +'<item>' +
                        '   <id S="ID-KMEHR" SV="1.0">'+(cptId++)+'</id>' +
                        '   <cd S="CD-ITEM" SV="1.11">'+(_.get(he,'tags',[]).find(tag=> tag.type==="CD-ITEM").code==="healthissue" ? "healthelement" : XMLFormat(_.get(he,'tags',[]).find(tag=> tag.type==="CD-ITEM").code))+'</cd>' +
                        (he.codes.filter(code => _.get(code,"code","BE-ALLERGEN").includes("BE-ALLERGEN")).length ?
                        '   <content>' +
                        he.codes.filter(code => _.get(code,"code","BE-ALLERGEN").includes("BE-ALLERGEN")).reduce((accCode, code) => accCode.toString() + '<cd S="' + XMLFormat((code.type.includes("BE-THESAURUS") ? "CD-CLINICAL" : code.type)) + '" SV="'+XMLFormat((code.type.includes("ICPC") ? '2' : code.type.includes("CD-CLINICAL") ? "3.0" : code.type.includes("ICD") ? '10' : '1.0'))+'" DN="' + XMLFormat((labels.find(l => l.id === code.id) && _.get(labels.find(l => l.id === code.id), 'label.' + this.language, ''))) + '" L="' + this.language + '">' + XMLFormat(code.code) + '</cd>','') +
                        '   </content>' : "")+
                        ((_.get(he,'tags',[]).find(tag=> tag.type==="CD-ITEM") || {code : 'problem'}).code==="medication" ? _getMedicationContent(he) :'')+
                        '   <content>' +
                        '       <text L="'+this.language+'">'+XMLFormat(_.get(he,'descr',''))+'</text>' +
                        '   </content>' +
                        (_.get(he,'openingDate',false) ?
                        '   <beginmoment>' +
                        '       <date>'+this.api.moment(_.get(he,'openingDate','')).format("YYYY-MM-DD")+'</date>' +
                        '   </beginmoment>' : '') +
                        (_.get(he,'closingDate',false) ?
                            '<endmoment>' +
                            '   <date>'+this.api.moment(_.get(he,'closingDate','')).format("YYYY-MM-DD")+'</date>' +
                            '</endmoment>'  : '')+
                        (!['risk','medication'].find(code => _.get(he,'tags',[]).find(tag=> tag.type==="CD-ITEM").code.includes(code)) ?
                            '   <lifecycle>' +
                            '       <cd S="CD-LIFECYCLE" SV="1.9">'+XMLFormat((_.get(he,'tags',[]).find(tag=> tag.type==="CD-LIFECYCLE") ? _.get(he,'tags',[]).find(tag=> tag.type==="CD-LIFECYCLE").code : _.get(he,'status',1)!==0 ||  (_.get(he,'closingDate',false) && moment().isAfter(this.api.moment(_.get(he,'closingDate',false)),'day')  ) ? 'inactive' : 'active' ))+'</cd>' +
                            '   </lifecycle>' : '')+
                        '</item>'
                    ,'')
            }else{
                return ''
            }
        }).bind(this)

        const _getTreatments = ((labels)=> {
            if(treatments){
                return treatments.reduce((accTreat, treatment) => accTreat+'<item>' +
                    '<id S="ID-KMEHR" SV="1.0">'+(cptId++)+'</id>' +
                    '<cd S="CD-ITEM" SV="1.11">treatment</cd>' +
                    '<content>' +
                    _.get(treatment,"codes",[]).reduce((accCode, code) => accCode.toString() + '<cd S="' + XMLFormat((code.type.includes("BE-THESAURUS") ? "ICD" : code.type)) + '" SV="'+XMLFormat((code.type.includes("ICPC") ? '2' : code.type.includes("CD-CLINICAL") ? "3.0" : code.type.includes("ICD") || code.type.includes("BE-THESAURUS")  ? '10' : '1.0'))+'" DN="' + XMLFormat((labels.find(l => l.id === code.id) && _.get(labels.find(l => l.id === code.id), 'label.' + this.language, ''))) + '" L="' + this.language + '">' + XMLFormat(code.code) + '</cd>','') +
                    '</content>' +
                    '<content>' +
                    '   <text L="'+this.language+'">'+XMLFormat(_.get(this.api.contact().preferredContent(treatment,this.language),'stringValue',""))+'</text>' +
                    '</content>' +
                    (_.get(treatment,'openingDate',false) ?
                        '   <beginmoment>' +
                        '       <date>'+this.api.moment(_.get(treatment,'openingDate','')).format("YYYY-MM-DD")+'</date>' +
                        '   </beginmoment>' : '') +
                    (_.get(treatment,'closingDate',false) ?
                        '<endmoment>' +
                        '   <date>'+this.api.moment(_.get(treatment,'closingDate','')).format("YYYY-MM-DD")+'</date>' +
                        '</endmoment>'  : '')+
                    '<lifecycle>' +
                    '   <cd S="CD-LIFECYCLE" SV="1.9">'+XMLFormat(_.get(_.get(treatment,'tags',[]).find(tag=> tag.type==="CD-LIFECYCLE"),'code','inactive'))+'</cd>' +
                    '</lifecycle>' +
                    '</item>','')
            }else{
                return ''
            }
        }).bind(this)

        return Promise.all(codesToGet.map(codes => this.api.code().getCodes(codes.join(',')))).then( (codes) => Promise.all([
            _.get(dmg,"healthcarePartyId",false) ? this.api.hcparty().getHealthcareParty(_.get(dmg,"healthcarePartyId","")) : Promise.resolve(),
            Promise.resolve(_.flatten(codes))
        ])).then(([dmgHcp,codes]) => {
            const xml = '<?xml version="1.0" encoding="utf-8"?>' +
                '<kmehrmessage xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance" xmlns="http://www.ehealth.fgov.be/standards/kmehr/schema/v1" xsi:schemaLocation="http://www.ehealth.fgov.be/standards/kmehr/schema/v1 kmehr_elements.xsd">' +
                '   <header>' +
                '       <standard>' +
                '         <cd S="CD-STANDARD" SV="1.0">20161201</cd>' +
                '       </standard>' +
                '       <id S="ID-KMEHR" SV="1.0">'+XMLFormat(_.get(this, 'hcp.nihii', null))+'.'+this.api.crypto().randomUuid()+'</id>' +
                '       <date>'+moment().format('YYYY-MM-DD')+'</date>' +
                '       <time>'+moment().format('HH:mm:ss')+'</time>' +
                '       <sender>' +
                '           <hcparty>' +
                '               <id S="ID-HCPARTY" SV="1.0">'+XMLFormat(_.get(this, 'hcp.nihii', null))+'</id>' +
                '               <cd S="CD-HCPARTY" SV="1.10">'+XMLFormat(_.get(this,'hcp.speciality',"persphysician"))+'</cd>' +
                '               <firstname>'+XMLFormat(_.get(this, 'hcp.firstName', null))+'</firstname>' +
                '               <familyname>'+XMLFormat(_.get(this, 'hcp.lastName', null))+'</familyname>' +
                '               <telecom>' +
                '                   <cd S="CD-ADDRESS" SV="1.1">home</cd>' +
                '                   <cd S="CD-TELECOM" SV="1.0">mobile</cd>' +
                '                   <telecomnumber>'+XMLFormat(_.get(_.get(_.get(this, 'hcp.addresses', []).find(adr => _.get(adr, 'telecoms', []).map(tel => _.get(tel, 'telecomType', null) === 'mobile' && _.get(tel, 'telecomNumber', null) !== '' && _.get(tel, 'telecomNumber', null) !== null)), 'telecoms', []).find(tel => _.get(tel, 'telecomType', null) === 'mobile'), 'telecomNumber', ''))+'</telecomnumber>' +
                '               </telecom>' +
                '               <telecom>' +
                '                   <cd S="CD-ADDRESS" SV="1.1">home</cd>' +
                '                   <cd S="CD-TELECOM" SV="1.0">email</cd>' +
                '                   <telecomnumber>'+XMLFormat(_.get(_.get(_.get(this, 'hcp.addresses', []).find(adr => _.get(adr, 'telecoms', []).map(tel => _.get(tel, 'telecomType', null) === 'email' && _.get(tel, 'telecomNumber', null) !== '' && _.get(tel, 'telecomNumber', null) !== null)), 'telecoms', []).find(tel => _.get(tel, 'telecomType', null) === 'email'), 'telecomNumber', ''))+'</telecomnumber>' +
                '               </telecom>' +
                '               <telecom>' +
                '                   <cd S="CD-ADDRESS" SV="1.1">home</cd>' +
                '                   <cd S="CD-TELECOM" SV="1.0">phone</cd>' +
                '                   <telecomnumber>'+XMLFormat(_.get(_.get(_.get(this, 'hcp.addresses', []).find(adr => _.get(adr, 'telecoms', []).map(tel => _.get(tel, 'telecomType', null) === 'phone' && _.get(tel, 'telecomNumber', null) !== '' && _.get(tel, 'telecomNumber', null) !== null)), 'telecoms', []).find(tel => _.get(tel, 'telecomType', null) === 'phone'), 'telecomNumber', ''))+'</telecomnumber>' +
                '               </telecom>' +
                '           </hcparty>' +
                '       </sender>' +
                '   </header>' +
                '   <folder>' +
                '       <id S="ID-KMEHR" SV="1.0">1</id>' +
                // patient administrative data
                '       <patient>' +
                '           <id S="INSS" SV="1.0">'+XMLFormat(_.get(this, 'patient.ssin', null))+'</id>' +
                '           <firstname>'+XMLFormat(_.get(this, 'patient.firstName', null))+'</firstname>' +
                '           <familyname>'+XMLFormat(_.get(this, 'patient.lastName', null))+'</familyname>' +
                '           <birthdate>' +
                '               <date>'+(_.get(this, 'patient.dateOfBirth', null) ? this.api.moment(_.get(this, 'patient.dateOfBirth', null)).format('YYYY-MM-DD') : null)+'</date>' +
                '           </birthdate>' +
                '           <sex>' +
                '               <cd S="CD-SEX" SV="1.1">'+XMLFormat(_.get(this, 'patient.gender', null))+'</cd>' +
                '           </sex>' +
                '           <address>' +
                '               <cd S="CD-ADDRESS" SV="1.1">home</cd>' +
                '               <country>' +
                '                   <cd S="CD-FED-COUNTRY" SV="1.2">be</cd>' +
                '               </country>' +
                '               <zip>'+XMLFormat(_.get(_.get(this, 'patient.addresses', []).find(adr => _.get(adr, 'addressType', null) === "home" && _.trim(_.get(adr, 'postalCode', null))  && _.trim(_.get(adr, 'postalCode', null)) !== ""), 'postalCode', null))+'</zip>' +
                '               <city>'+XMLFormat(_.get(_.get(this, 'patient.addresses', []).find(adr => _.get(adr, 'addressType', null) === "home" && _.trim(_.get(adr, 'city', null))  && _.trim(_.get(adr, 'city', null)) !== ""), 'city', null))+'</city>' +
                '               <street>'+XMLFormat(_.get(_.get(this, 'patient.addresses', []).find(adr => _.get(adr, 'addressType', null) === "home" && _.trim(_.get(adr, 'street', null))  && _.trim(_.get(adr, 'street', null)) !== ""), 'street', null))+'</street>' +
                '               <housenumber>'+XMLFormat(_.get(_.get(this, 'patient.addresses', []).find(adr => _.get(adr, 'addressType', null) === "home" && _.trim(_.get(adr, 'houseNumber', null))  && _.trim(_.get(adr, 'houseNumber', null)) !== ""), 'houseNumber', null))+'</housenumber>' +
                '               <postboxnumber>'+XMLFormat(_.get(_.get(this, 'patient.addresses', []).find(adr => _.get(adr, 'addressType', null) === "home" && _.trim(_.get(adr, 'postboxNumber', null))  && _.trim(_.get(adr, 'postboxNumber', null)) !== ""), 'postboxNumber', null))+'</postboxnumber>' +
                '           </address>' +
                '           <telecom>' +
                '               <cd S="CD-ADDRESS" SV="1.1">home</cd>' +
                '               <cd S="CD-TELECOM" SV="1.0">phone</cd>' +
                '               <telecomnumber>'+XMLFormat(_.get(_.get(_.get(this, 'patient.addresses', []).find(adr => _.get(adr, 'telecoms', []).map(tel => _.get(tel, 'telecomType', null) === 'mobile' && _.get(tel, 'telecomNumber', null) !== '' && _.get(tel, 'telecomNumber', null) !== null)), 'telecoms', []).find(tel => _.get(tel, 'telecomType', null) === 'mobile'), 'telecomNumber', ''))+'</telecomnumber>' +
                '           </telecom>' +
                '           <usuallanguage>'+_.get(this, 'language', 'fr')+'</usuallanguage>' +
                '       </patient>' +
                '        <transaction>' +
                '            <id S="ID-KMEHR" SV="1.0">1</id>' +
                '            <cd S="CD-TRANSACTION" SV="1.9">sumehr</cd>' +
                '            <date>'+moment().format('YYYY-MM-DD')+'</date>' +
                '            <time>'+moment().format('HH:mm:ss')+'</time>' +
                '            <author>' +
                '                <hcparty>' +
                '                    <id S="ID-HCPARTY" SV="1.0">'+XMLFormat(_.get(this, 'hcp.nihii', null))+'</id>' +
                '                    <cd S="CD-HCPARTY" SV="1.10">'+XMLFormat(_.get(this,'hcp.speciality','persphysician'))+'</cd>' +
                '                    <firstname>'+XMLFormat(_.get(this, 'hcp.firstName', null))+'</firstname>' +
                '                    <familyname>'+XMLFormat(_.get(this, 'hcp.lastName', null))+'</familyname>' +
                '                </hcparty>' +
                '            </author>' +
                '            <iscomplete>true</iscomplete>' +
                '            <isvalidated>true</isvalidated>' +
                // dmg data
                (isFull ? (_getDmgData(dmgHcp)+
                _getHE(codes)+
                _getTreatments(codes)) : '')+
                '        </transaction>' +
                '   </folder>' +
                '</kmehrmessage>'


            return xml
        })
    }

}

customElements.define(HtPatEformDialog.is, HtPatEformDialog);
