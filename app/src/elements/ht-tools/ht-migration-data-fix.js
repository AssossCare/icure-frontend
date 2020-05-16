import _ from 'lodash/lodash';
import moment from 'moment/src/moment'
import {TkLocalizerMixin} from "../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';

import '../ht-spinner/ht-spinner.js';
import '../../styles/dialog-style.js';
import '../../styles/scrollbar-style.js';
import '../../styles/paper-tabs-style.js';
import '../../styles/shared-styles.js';
import '../../styles/app-theme-tz.js';
import {Base64} from "js-base64";
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models'

class HtMigrationDataFix extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement))  {

    static get template() {
        return html`
        <style include="dialog-style scrollbar-style">

            #migrationDialog{
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

            .hubDocumentsList{
                display: flex;
                height: 100%;
                width: 50%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
            }

            .hubDocumentsList2{
                height: 100%;
                width: 30%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
                overflow: auto;
            }

            .hubDocumentViewer{
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

            .migrationDialog{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .mig-menu-list{
                height: 100%;
                width: 30%;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                overflow: auto;
                position: relative;
            }

            .mig-menu-view{
                height: 100%;
                width: 70%;
                position: relative;
                background: white;
            }

            .mig-menu-list-header{
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

            .mig-menu-list-header-img{
                height: 40px;
                width: 40px;
                background-color: transparent;
                margin: 4px;
                float: left;
            }

            .mig-menu-list-header-info{
                margin-left: 12px;
                display: flex;
                /*align-items: center;*/
            }

            .mig-menu-list-header-img img{
                width: 100%;
                height: 100%;
            }

            .mig-name{
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
               width: 14%;
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

            /*When no h2 on dialog:*/
            .content{
                max-height: calc(100% - 45px);
            }

            .sumehr-form-container {
                position:relative;
            }

            .sumehr-forms-container{
                text-align: right;
                position: absolute;
                margin-top: 8px;
                top: -70px;
                left: -44px;
                background-color: var(--app-background-color);
                opacity: 1;
                border-radius: 2px;
                z-index: 200;
                height: auto !important;
                box-shadow: var(--app-shadow-elevation-2);
                display: flex;
                flex-flow: column nowrap;
                align-items: stretch;
                border-radius: 3px;
                overflow: hidden;
                padding: 0;
            }

            .sumehr-forms-container paper-button{
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                text-transform: capitalize;
                height: 28px;
                padding: 0 12px 0 8px;
                font-weight: 400;
                font-size: var(--font-size-normal);
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                flex-grow: 1;
                border-radius: 0;
                margin: 0;
            }
            .sumehr-forms-container paper-button:hover{
                background: var(--app-background-color-dark);
            }

            .sumehr-forms-container paper-button iron-icon{
                color: var(--app-secondary-color);
                height: 20px;
                width: 20px;
                margin-right: 4px;
                box-sizing: border-box;
            }

            .close-add-forms-btn, .close-sumehr-forms-btn{
                background: var(--app-secondary-color-dark) !important;
            }

            .no-mobile {
                display: none;
            }

            .search-line{
                display: flex;
            }

            .w50{
                width: 49%;
            }

            .ml1{
                margin-left: 1%;
            }

        </style>
        
        <paper-dialog id="migrationDialog" opened="{{opened}}">
            <div class="content migrationDialog">
                <div class="mig-menu-list">
                    <div class="mig-menu-list-header">
                        <div class="mig-menu-list-header-img">
                            <!-- icon here -->
                        </div>
                        <div class="mig-menu-list-header-info">
                            <div class="mig-name">
                                <span class="hub">Patient and data fix</span>
                            </div>
                        </div>
                    </div>
                    <div class="hub-submenu-container">
                        <ht-spinner active="[[isLoading]]"></ht-spinner>
                       <paper-button on-tap="doPatientTelFix" class="button" >Patient tel fix</paper-button>
                       <paper-button on-tap="doDocSfkFix" class="button" >Lab results fix</paper-button>
                    </div>
                </div>
                <div class="mig-menu-view">
                    <!-- content here -->
                    <template is="dom-if" if="[[patientTelFix]]">
                        <br /><paper-button on-tap="startPatientTelFix" class="button button--save" >RUN NOW</paper-button>
                        <br /><div>Processing [[posPat]] of [[numPats]]</div>
                    </template>
                    <template is="dom-if" if="[[docSfkFix]]">
                        <br /><paper-button on-tap="startDocSfkFix_v2" class="button button--save" >RUN NOW</paper-button>
                        <br /><div><b>Total patients: [[numFix]]</b><br />Processing patient [[posFix]]/[[numFix]] : [[patientData]]</div>
                        <br /><div><b>Total documents: [[totalDocumentCount]]</b><br />Processing document [[processedDocumentCount]]/[[totalDocumentCount]] : [[documentData]]</div>
                    </template>
                </div>
            </div>
            <div class="buttons">
				<paper-button class="button" dialog-dismiss="">[[localize('clo','Close',language)]]</paper-button>
			</div>
        </paper-dialog>
        `;
    }

    static get is() {
        return 'ht-migration-data-fix';
    }

    static get properties() {
        return {
            api: {
                type: Object,
                noReset: true
            },
            user: {
                type: Object,
                noReset: true
            },
            hcp: {
                type : Object
            },
            patientTelFix:{
                type: Boolean,
                value: false
            },
            docSfkFixFix:{
                type: Boolean,
                value: false
            },
            numPats:{
                type: Number,
                value: 0
            },
            posPat:{
                type: Number,
                value:0
            },
            numFix:{
                type: Number,
                value: 0
            },
            posFix:{
                type: Number,
                value:0
            },
            processedDocumentCount:{
                type: Number,
                value: 0
            },
            totalDocumentCount:{
                type: Number,
                value:0
            },
            documentData:{
                type: String,
                value:""
            }
        };
    }

    static get observers() {
        return [];
    }

    reset() {
        const props = HtHcp.properties
        Object.keys(props).forEach(k => { if (!props[k].noReset) { this.set(k, (typeof props[k].value === 'function' ? props[k].value() : (props[k].value || null))) }})
    }

    ready() {
        super.ready()
    }

    open() {
        this.$.migrationDialog.open();
    }

    doPatientTelFix() {
        this.set('patientTelFix', true)
        this.set('docSfkFix', false)
    }

    doDocSfkFix() {
        this.set('patientTelFix', false)
        this.set('docSfkFix', true)
    }

    startPatientTelFix() {

        this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
        this.api.setPreventLogging();

        //1. get patients
        let iPos = 0
        this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(response =>{
            this.set("hcp",response);
            let hcpId = this.hcp.parentId ? this.hcp.parentId : this.hcp.id;
            this.getPatientsByHcp(hcpId).then(myPatients => {
                console.log("# patients", myPatients.length)
                this.set("numPats", myPatients.length)
                let prom = Promise.resolve([])
                _.map(myPatients, pat => {

                    prom = prom
                        .then(promiseCarrier => this.api.patient().getPatientWithUser(this.user, pat.id).then(pat =>{
                            console.log("before", pat.addresses);
                            const telcoBefore = pat.addresses.map(addr => addr.telecoms).flat().length
                            let isMobile = false
                            //2.1 remove empty telecoms
                            //2.2 set mobile telecom to mobile (detect gsm numbers)
                            pat.addresses.forEach(addr => {
                                addr.telecoms = addr.telecoms.filter(tc => !!tc.telecomNumber && tc.telecomNumber !=="")
                                addr.telecoms.filter(tc => tc && tc.telecomType && tc.telecomType === "phone").forEach(tc => {
                                    isMobile = this.isMobileNumber(tc.telecomNumber)
                                    tc.telecomType = this.isMobileNumber(tc.telecomNumber) ? "mobile" : tc.telecomType
                                })
                            })
                            console.log("after", pat.addresses);
                            const telcoAfter = pat.addresses.map(addr => addr.telecoms).flat().length
                            iPos++;
                            console.log("patient n°", iPos)
                            this.set("posPat", iPos)
                            if(telcoAfter < telcoBefore || isMobile) {
                                this.api.patient().modifyPatientWithUser(this.user, pat).then(patient => this.api.register(patient, 'patient'))
                            }
                        })
                            .then(x => _.concat(promiseCarrier,x))
                            .catch(() => _.concat(promiseCarrier,null)))
                })
                prom.then(resList =>{
                    Promise.all(resList).then(res => console.log(res))
                })
            })
        })

    }

    isMobileNumber(tcNumber) {
        const clean = tcNumber.replace("/", "").replace("-", "").replace(" ", "").replace(".", "").replace("(", "").replace(")", "").replace("+32", "0")
        // 04xxaabbcc
        // length = 10
        // startswith = 04
        return clean.length === 10 && clean.startsWith("04");
    }

    _YYYYMMDDHHmmssToDDMMYYYY(inputValue) {
        return parseInt(inputValue) ? this.api.moment(_.trim(parseInt(inputValue)),"YYYYMMDDHHmmss").format('DD/MM/YYYY') : ""
    }

    _getDirectoryDocuments(patientObject) {

        const promResolve = Promise.resolve();

        return this.api.contact().findBy( _.trim(_.get(this,"user.healthcarePartyId","")), patientObject )
            .then(patientContacts => _.compact(_.flatten(_.map(patientContacts, singleContact => _.concat(
                // Target documentId in svc
                _.map(singleContact.services, singleService => !( _.trim(_.get(this.api.contact().preferredContent(singleService, this.language),"documentId")) )? false : {
                    contact: singleContact,
                    service: singleService,
                    serviceTitle: _.trim(_.get(singleService,"content." + this.language + ".stringValue")),
                    date: parseInt(_.get(singleContact,"openingDate"))||+new Date(),
                    dateHr: this._YYYYMMDDHHmmssToDDMMYYYY(parseInt(_.get(singleContact,"openingDate",""))||+new Date()),
                    documentId: _.trim(_.get(this.api.contact().preferredContent(singleService, this.language),"documentId")),
                }),
                // Target migrations - imported documents from epicure / medispring (docs don't exist as such, rather a services list)
                (!_.size(_.find(_.get(singleContact,"tags",[]), {type:"CD-TRANSACTION"})) || !!_.trim(_.get(this.api.contact().preferredContent(_.get(singleContact,"services[0]",{}), this.language),"documentId")) ? false : {
                    contact: singleContact,
                    services: singleContact.services,
                    serviceTitle: _.trim(_.get(singleContact,"descr")),
                    date: parseInt(_.get(singleContact,"openingDate"))||+new Date(),
                    dateHr: this._YYYYMMDDHHmmssToDDMMYYYY(parseInt(_.get(singleContact,"openingDate",""))||+new Date()),
                    documentId:null,
                    isFromMigration: true,
                })
            )))))
            .then(foundServicesWithDocumentId => !_.size(foundServicesWithDocumentId) ? Promise.resolve([foundServicesWithDocumentId, []]) : this.api.document().getDocuments({ids:_.uniq(_.compact(_.map(foundServicesWithDocumentId,s=>_.trim(_.get(s,"documentId","")))))}).then(foundDocuments=>[foundServicesWithDocumentId,foundDocuments]))
            .then(([foundServicesWithDocumentId,foundDocuments]) => _.compact(_.map(foundServicesWithDocumentId, fswd => {
                const serviceDocument = _.find(foundDocuments, {id: _.trim(_.get(fswd, "documentId"))})
                return (!_.trim(_.get(serviceDocument,"id","")) || !_.trim(_.get(serviceDocument,"attachmentId",""))) ? false : _.merge({}, fswd, {document: serviceDocument})
            })))
            .then(contactsAndDocuments => _.chain(contactsAndDocuments).filter(i => !!_.trim(_.get(i,"document.id"))).orderBy(['date'], ['desc']).value())
            .then(datas => _.map(datas, data => {
                const transactionCodeLabelHr = _.size(_.get(data,"service.tags",[])) ? _.trim(_.get(_.find(_.get(this,"_data.codes['CD-TRANSACTION']",[]), {code:_.get(_.find(_.get(data,"service.tags",[]), {type:"CD-TRANSACTION"}),"code","")}), "labelHr","")) :
                    !!_.size(_.get(data,"contact.tags",[])) ? _.trim(_.get(_.find(_.get(this,"_data.codes['BE-CONTACT-TYPE']",[]), {code:_.get(_.find(_.get(data,"contact.tags",[]), {type:"BE-CONTACT-TYPE"}),"code","")}), "labelHr","")) :
                        ""
                return _.merge({},data, {
                    description: !!_.trim(_.get(data,"contact.descr","")) ? _.trim(_.get(data,"contact.descr","")) : !!_.trim(_.get(data,"document.name","")) ? _.trim(_.get(data,"document.name","")) : _.trim(_.get(data,"documentId","")),
                    typeHr: !!_.trim(transactionCodeLabelHr) ? _.trim(transactionCodeLabelHr) : _.trim(_.get(data, "serviceTitle")),
                })
            }))
            .catch(e=>{ console.log("ERROR _getDirectoryDocuments", e); return promResolve; })

    }

    _recreateDocument(doc, pat) {
        return !_.size(doc) || !_.size(pat) || !_.size(doc.attachmentId) ? null : this.api.document().getAttachmentAs(doc.id, doc.attachmentId, "application/octet-stream", null)
            .then(attachment => this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("decrypt", this.user, doc, attachment))
            .then(decryptedAttachment => this.api.document().newInstance(this.user, pat, _.omit(doc, [
                "attachmentId",
                "deletionDate",
                "created",
                "modified",
                "secretForeignKeys",
                "cryptedForeignKeys",
                "delegations",
                "encryptionKeys",
                "encryptedSelf"
            ])).then(ndoc => [decryptedAttachment, ndoc]))
            .then(([decryptedAttachment, ndoc]) => this.api.document().modifyDocument(ndoc).then(mdoc=>[decryptedAttachment,mdoc]))
            .then(([decryptedAttachment,mdoc]) => this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("encrypt", this.user, mdoc, decryptedAttachment).then(encryptedFileContent => [mdoc,encryptedFileContent])
            .then(([mdoc,encryptedFileContent]) => this.api.document().setAttachment(mdoc.id, null, encryptedFileContent)))
    }

    getPatientsByHcp( hcpId ) {

        // return this.api.patient().getPatientsWithUser(this.user, new models.ListOfIdsDto({ids: ["ee2743be-8c29-4e33-a743-be8c29be3390","ba0e7498-ee59-41bf-8e74-98ee5991bf9f"]}))

        return this.api.getRowsUsingPagination(
            (key,docId) =>
                this.api.patient().listPatientsByHcPartyWithUser(this.user, hcpId, null, key && JSON.stringify(key), docId, 1000)
                    .then(pl => {
                        pl.rows = _
                            .chain(pl.rows)
                            .value()
                            .map((i) => {
                                i.ssin = _.trim(_.get(i,"ssin","")).replace(/[^\d]/gmi,"")
                                i.lastName = (_.get(i,"lastName","")).toUpperCase()
                                i.firstName = (_.get(i,"firstName","")).toUpperCase()
                                i.dateOfBirth = (!!_.trim(_.get(i,"dateOfBirth",""))?moment(_.trim(_.get(i,"dateOfBirth",0)), "YYYYMMDD").format('DD/MM/YYYY'):"")
                                return i
                            })
                        ;
                        return {
                            rows:pl.rows,
                            nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                            nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                            done: !pl.nextKeyPair
                        }
                    })
                    .catch(()=>{ return Promise.resolve(); })
        )||[];

    }

    startDocSfkFix() {

        this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
        this.api.setPreventLogging();

        const documentsByPatient = {}

        return this.api.hcparty().getHealthcareParty(_.get(this,"user.healthcarePartyId",""))
            .then(hcp => this.set("hcp",hcp))
            .then(() => this.getPatientsByHcp(_.trim(_.get(this,"hcp.parentId","")) ? _.trim(_.get(this,"hcp.parentId","")) : _.trim(_.get(this,"hcp.id",""))))
            .then(myPatients => {

                this.set("numPats", _.size(myPatients))
                let promPat = Promise.resolve([])
                let promDoc = Promise.resolve([])

                _.map(myPatients, pat => {
                    promPat = promPat.then(promiseCarrierPat => this._getDirectoryDocuments(pat).then(doclist => {
                        _.merge(documentsByPatient, _.fromPairs([[_.trim(_.get(pat,"id")), doclist]]))
                        _.map(_.compact(_.map(doclist, "document")), doc => { promDoc = promDoc.then(promiseCarrierDoc => (_.size(_.get(doc,"cryptedForeignKeys")) && _.size(_.get(doc,"secretForeignKeys")) && _.size(_.get(doc,"delegations")) && _.size(_.get(doc,"encryptionKeys"))) ? _.concat(promiseCarrierDoc, null) : this._recreateDocument(doc, pat).then(x => _.concat(promiseCarrierDoc, x)).catch(x => _.concat(promiseCarrierDoc, null))) })
                        return promDoc.then(x => _.concat(promiseCarrierPat, x)).catch(x => _.concat(promiseCarrierPat, null))
                    }))
                })

                return promPat

            })
            .then(() => this._fixLabResultsProtocols(documentsByPatient))

    }

    _fixLabResultsProtocols(documentsByPatient) {

        const promResolve = Promise.resolve()

        let promPats = Promise.resolve({})
        let promPatsFixed = Promise.resolve({})

        // Foreach PAT && each PAT's DOCS, check if BE can handle file format (to be then imported as SVC collection rather than simple file (documentId) in CTC)
        return promResolve
            .then(() => {
                _.map(documentsByPatient, (docs, patientId) => {
                    let promDocs = Promise.resolve([])
                    promPats = promPats.then(promiseCarrierPat => {

                        _.map(docs, doc => {
                            const documentId = _.trim(_.get(doc, "document.id"))
                            promDocs = promDocs.then(promiseCarrierDoc => !_.trim(_.get(doc, "contact.id")) || !_.trim(_.get(doc, "service.id")) || !documentId || !_.trim(_.get(doc, "document.attachmentId")) || (!_.size(_.get(doc, "document.encryptionKeys")) && !_.size(_.get(doc, "document.delegations "))) ?
                                promiseCarrierDoc :
                                (this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(_.get(this, "user.healthcarePartyId", null), documentId, _.size(_.get(doc, "document.encryptionKeys", [])) ? _.get(doc, "document.encryptionKeys", []) : _.get(doc, "document.delegations", [])).then(({extractedKeys: enckeys}) => enckeys).catch(() => []))
                                    .then(enckeys => this.api.beresultimport().canHandle(documentId, enckeys.join(',')).then(canHandle => [enckeys, !!canHandle]).catch(e => [enckeys, false]))
                                    .then(([enckeys, canHandle]) => !canHandle ? [enckeys, canHandle, null] : this.api.beresultimport().getInfos(documentId, false, null, enckeys.join(',')).then(docInfos => [enckeys, canHandle, docInfos]).catch(e => [enckeys, canHandle, null]))
                                    .then(([enckeys, canHandle, docInfos]) => !canHandle ? promiseCarrierDoc : _.concat(promiseCarrierDoc, _.merge({}, doc, _.merge({}, doc, {document: {enckeys: enckeys, docInfos: _.pick(_.head(docInfos), ["protocol", "labo", "codes"])}}))))
                                    .catch(e => promiseCarrierDoc)
                            )
                        })

                        return promDocs.then(documentsToFix => _.merge(promiseCarrierPat, _.fromPairs([[patientId, _.compact(documentsToFix)]]))).catch(e => promiseCarrierPat)

                    })
                })
                return promPats
            })
            .then(documentsToFixByPatient => {
                _.map(documentsToFixByPatient, (docs, patientId) => {
                    let promDocs = Promise.resolve([])
                    let promDelCtc = Promise.resolve([])
                    promPatsFixed = promPatsFixed.then(promiseCarrierPat => {

                        _.map(docs, doc => { promDocs = promDocs.then(promiseCarrierDoc => this._importLabResultOrProtocolAsSvcCollection(
                            patientId,
                            _.get(doc, "contact"),
                            _.get(doc, "document"),
                            _.get(_.find(_.get(doc,"document.docInfos.codes", []), {type:"CD-TRANSACTION"}), "code", "result"),
                            _.get(doc, "description"),
                            (parseInt(_.get(doc,"service.valueDate"))||0 ? parseInt(_.get(doc,"service.valueDate")) : parseInt(_.get(doc, "openingDate")))
                        ).then(x => _.concat(promiseCarrierDoc, [x])).catch(e => promiseCarrierDoc))})

                        promDocs.then(contactsToDelete => {
                            _.map(_.uniq(_.compact(contactsToDelete)), ctcId => { promDelCtc = promDelCtc.then(promisesCarrier => this.api.contact().deleteContacts(ctcId).then(x=>_.concat(promisesCarrier,[x])).catch(e=>promisesCarrier)) })
                            return promDelCtc.then(x => _.concat(promiseCarrierPat, x))
                        })
                        return promDocs

                    })
                })
                return promPatsFixed
            })
            .then(promisesCarrier=>console.log("- DONE -"))

    }

    _importLabResultOrProtocolAsSvcCollection(patientId, contact, document, documentType, documentDescription, documentDate) {

        const promResolve = Promise.resolve()
        const documentId = _.trim(_.get(document,"id",""))
        const documentTypeLabel = _.trim(documentDescription) ? _.trim(documentDescription) : _.trim(_.get(document,"name"))
        const laboAndProtocol = _.trim((!!_.trim(_.get(document,"docInfos.labo","")) ? _.trim(_.get(document,"docInfos.labo","")) : "" ) + ( !!_.trim(_.get(document,"docInfos.protocol","")) ? " (Protocole #" + _.trim(_.get(document,"docInfos.protocol","")) + ")" : "" ))
        const importDescription = _.trim(laboAndProtocol + (_.trim(laboAndProtocol) && _.trim(documentTypeLabel) ? " - " : "") + _.trim(documentTypeLabel))

        return (!documentId || !patientId || !_.size(document)) ? promResolve : this.api.patient().getPatientWithUser(this.user,patientId)
            .then(patientObject => this.api.contact().newInstance(this.user, patientObject,{
                groupId: this.api.crypto().randomUuid(),
                created: documentDate,
                modified: +new Date,
                author: _.trim(_.get(this,"user.id","")),
                responsible: _.trim(_.get(this,"user.healthcarePartyId","")),
                openingDate:_.get(contact,"openingDate",""),
                closingDate: _.get(contact,"closingDate",""),
                encounterType: {type: "CD-TRANSACTION", version: "1", code: documentType},
                descr: importDescription,
                tags: _.uniq(_.compact([{type:'CD-TRANSACTION', code:documentType},{type:"originalEhBoxDocumentId", id:documentId}, _.find(_.get(contact,"tags"), {type:"BE-CONTACT-TYPE"})])),
                subContacts: []
            }).then(contactInstance => [patientObject,contactInstance]))
            .then(([patientObject,contactInstance]) => this.api.contact().createContactWithUser(this.user, contactInstance).then(createdContact => [patientObject,createdContact]))
            .then(([patientObject,createdContact]) => this.api.form().newInstance(this.user, patientObject, {contactId: _.trim(_.get(createdContact,"id","")), descr: importDescription}).then(formInstance=>[createdContact,formInstance]))
            .then(([createdContact,formInstance]) => this.api.form().createForm(formInstance).then(createdForm=>[createdContact,_.trim(_.get(createdForm,"id",""))]))
            .then(([createdContact,createdFormId]) => this.api.beresultimport().doImport(documentId, _.trim(_.get(this,"user.healthcarePartyId","")), this.language, encodeURIComponent(_.trim(_.get(document,"docInfos.protocol",""))), createdFormId, null, _.get(document,"enckeys",[]).join(','), createdContact).then(updatedContactAfterImport => [createdContact,createdFormId,updatedContactAfterImport]).catch(e=>[createdContact,createdFormId, null]))
            .then(([createdContact,createdFormId,updatedContactAfterImport]) => !_.size(updatedContactAfterImport) ?
                promResolve.then(()=>this.api.form().deleteForms(createdFormId).catch(e=>null).then(()=>this.api.contact().deleteContacts(_.get(createdContact,"id")).catch(e=>null).then(()=>null))) :
                this.api.contact().modifyContactWithUser(this.user, _.merge({},updatedContactAfterImport,{ subContacts: [{tags:[{ type: 'CD-TRANSACTION', code: documentType },{ type: "originalEhBoxDocumentId", id: documentId }],descr: importDescription}]})).then(() => _.trim(_.get(contact,"id"))) /* Return original ctc id (we just re-imported) when successful -> will be deleted */
            )
            .catch(e => null)

    }













    _importLabResultOrProtocolAsSvcCollection_v2(patient, contact, document, documentType, documentDescription, documentDate) {

        const promResolve = Promise.resolve()
        const documentId = _.trim(_.get(document,"id",""))
        const documentTypeLabel = _.trim(documentDescription) ? _.trim(documentDescription) : _.trim(_.get(document,"name"))
        const laboAndProtocol = _.trim((!!_.trim(_.get(document,"docInfos.labo","")) ? _.trim(_.get(document,"docInfos.labo","")) : "" ) + ( !!_.trim(_.get(document,"docInfos.protocol","")) ? " (Protocole #" + _.trim(_.get(document,"docInfos.protocol","")) + ")" : "" ))
        const importDescription = _.trim(laboAndProtocol + (_.trim(laboAndProtocol) && _.trim(documentTypeLabel) ? " - " : "") + _.trim(documentTypeLabel))

        return !documentId || !_.trim(_.get(patient,"id")) || !_.size(document) ? promResolve : promResolve
            .then(() => this.api.contact().newInstance(this.user, patient,{
                groupId: this.api.crypto().randomUuid(),
                created: documentDate,
                modified: +new Date,
                author: _.trim(_.get(this,"user.id","")),
                responsible: _.trim(_.get(this,"user.healthcarePartyId","")),
                openingDate:_.get(contact,"openingDate",""),
                closingDate: _.get(contact,"closingDate",""),
                encounterType: {type: "CD-TRANSACTION", version: "1", code: documentType},
                descr: importDescription,
                tags: _.uniq(_.compact([{type:'CD-TRANSACTION', code:documentType},{type:"originalEhBoxDocumentId", id:documentId}, _.find(_.get(contact,"tags"), {type:"BE-CONTACT-TYPE"})])),
                subContacts: []
            }))
            .then(contactInstance => this.api.contact().createContactWithUser(this.user, contactInstance))
            .then(createdContact => this.api.form().newInstance(this.user, patient, {contactId: _.trim(_.get(createdContact,"id","")), descr: importDescription}).then(formInstance=>[createdContact,formInstance]))
            .then(([createdContact,formInstance]) => this.api.form().createForm(formInstance).then(createdForm=>[createdContact,_.trim(_.get(createdForm,"id",""))]))
            .then(([createdContact,createdFormId]) => this.api.beresultimport().doImport(documentId, _.trim(_.get(this,"user.healthcarePartyId","")), this.language, encodeURIComponent(_.trim(_.get(document,"docInfos.protocol",""))), createdFormId, null, _.get(document,"enckeys",[]).join(','), createdContact).then(updatedContactAfterImport => [createdContact,createdFormId,updatedContactAfterImport]).catch(e=>[createdContact,createdFormId, null]))
            .then(([createdContact,createdFormId,updatedContactAfterImport]) => !_.size(updatedContactAfterImport) ?
                promResolve.then(()=>this.api.form().deleteForms(createdFormId).catch(e=>null).then(()=>this.api.contact().deleteContacts(_.get(createdContact,"id")).catch(e=>null).then(()=>null))) :
                this.api.contact().modifyContactWithUser(this.user, _.merge({},updatedContactAfterImport,{ subContacts: [{tags:[{ type: 'CD-TRANSACTION', code: documentType },{ type: "originalEhBoxDocumentId", id: documentId }],descr: importDescription}]})).then(() => this.api.contact().deleteContacts(_.trim(_.get(contact,"id"))))
            )
            .catch(e => null)

    }

    _fixLabResultsProtocols_v2(pat, doc) {

        const promResolve = Promise.resolve()
        const documentId = _.trim(_.get(doc, "document.id"))

        return this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(_.get(this, "user.healthcarePartyId", null), documentId, _.size(_.get(doc, "document.encryptionKeys", [])) ? _.get(doc, "document.encryptionKeys", []) : _.get(doc, "document.delegations", []))
            .then(({extractedKeys: enckeys}) => enckeys)
            .then(enckeys => this.api.beresultimport().canHandle(documentId, enckeys.join(',')).then(canHandle => [enckeys, !!canHandle]).catch(e => [enckeys, false]))
            .then(([enckeys, canHandle]) => !canHandle ? [enckeys, canHandle, null] : this.api.beresultimport().getInfos(documentId, false, null, enckeys.join(',')).then(docInfos => [enckeys, canHandle, docInfos]).catch(e => [enckeys, canHandle, null]))
            .then(([enckeys, canHandle, docInfos]) => !canHandle ? null : _.merge({}, doc, {document: {enckeys: enckeys, docInfos: _.pick(_.head(docInfos), ["protocol", "labo", "codes"])}}))
            .then(doc => !_.size(doc) ? promResolve : promResolve.then(() => this._importLabResultOrProtocolAsSvcCollection_v2(
                pat,
                _.get(doc, "contact"),
                _.get(doc, "document"),
                _.get(_.find(_.get(doc,"document.docInfos.codes", []), {type:"CD-TRANSACTION"}), "code", "result"),
                _.get(doc, "description"),
                (parseInt(_.get(doc,"service.valueDate"))||0 ? parseInt(_.get(doc,"service.valueDate")) : parseInt(_.get(doc, "openingDate")))
            )))

    }

    _getPatientsByHcp_v2( hcpId ) {

        // Todo: remove this
        // return this.api.patient().getPatientsWithUser(this.user, new models.ListOfIdsDto({ids: ["2708da20-597e-4c86-88da-20597e8c8637", "e61880b2-d802-40fc-9880-b2d80240fc8c"]}))

        const patientIdStartsWith = _.trim(_.trim(_.get(document,"location.href")).match(/patientIdStartsWith=([^&#]*)/gi)).split("=").pop()

        return this.api.getRowsUsingPagination((key,docId) => this.api.patient().listPatientsByHcPartyWithUser(this.user, hcpId, null, key && JSON.stringify(key), docId, 1000)
            .then(pl => {
                pl.rows = _
                    .chain(pl.rows)
                    .filter(pat => !_.size(_.find(_.get(pat,"tags",[]), {code:"labResultsAndProtocolsGotReImported"})))
                    .filter(pat => !_.trim(patientIdStartsWith) ? true : _.trim(_.get(pat,"id")).startsWith(patientIdStartsWith))
                    .value()
                return {
                    rows:pl.rows,
                    nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                    nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                    done: !pl.nextKeyPair
                }
            })
            .catch(()=>null)
        )||[];

    }

    startDocSfkFix_v2() {

        this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
        this.api.setPreventLogging();

        return this.api.hcparty().getHealthcareParty(_.get(this,"user.healthcarePartyId",""))
            .then(hcp => this.set("hcp",hcp))
            .then(() => this._getPatientsByHcp_v2(_.trim(_.get(this,"hcp.parentId","")) ? _.trim(_.get(this,"hcp.parentId","")) : _.trim(_.get(this,"hcp.id",""))))
            .then(myPatients => {

                let promPat = Promise.resolve([])
                let promDoc = Promise.resolve([])

                this.set("numFix", _.size(myPatients))
                this.set("posFix", (parseInt(_.get(this,"posFix",0))||0)+1)

                _.map(myPatients, pat => {

                    promPat = promPat
                        .then(promisesCarrierPat => (this.set("patientData", _.trim(_.get(pat,"firstName")) + " " + _.trim(_.get(pat,"lastName")) + " - " +_.trim(_.get(pat,"dateOfBirth")).substring(6,8) + "/" + _.trim(_.get(pat,"dateOfBirth")).substring(4,6) + "/" + _.trim(_.get(pat,"dateOfBirth")).substring(0,4))||true) && promisesCarrierPat)
                        .then(promisesCarrierPat => this._getDirectoryDocuments(pat).then(doclist => {

                            this.set("totalDocumentCount", _.size(doclist))
                            this.set("processedDocumentCount", 0)

                            _.map(_.compact(doclist), doc => {

                                promDoc = promDoc
                                    .then(promiseCarrierDoc => {
                                        this.set("processedDocumentCount", (parseInt(_.get(this,"processedDocumentCount",0))||0)+1)
                                        this.set("documentData", _.get(doc, "description"))
                                        return promiseCarrierDoc
                                    })
                                    .then(promiseCarrierDoc => (
                                        (!_.size(_.get(doc, "document.delegations")) && !_.size(_.get(doc, "document.encryptionKeys"))) ||
                                        !_.trim(_.get(doc, "contact.id")) ||
                                        !_.trim(_.get(doc, "service.id")) ||
                                        !_.trim(_.get(doc, "document.id")) ||
                                        !_.trim(_.get(doc, "document.attachmentId")) ||
                                        ["pdf","jpg","jpeg","png","gif","rtf"].indexOf(((_.trim(_.get(doc, "document.name")).split(".")||[]).pop()).toLowerCase()) > -1 ||
                                        ["com.adobe.pdf", "public.jpeg", "public.png", "public.rtf", "public.tiff"].indexOf(_.trim(_.get(doc, "document.mainUti")).toLowerCase()) > -1
                                    ) ? promiseCarrierDoc||[] : this._fixLabResultsProtocols_v2(pat, doc).then(x => _.concat(promiseCarrierDoc, [x])).catch(x => _.concat(promiseCarrierDoc, [null])))

                            })

                            return promDoc
                                .then(x => _.concat(promisesCarrierPat, x))
                                .then(() => this.api.patient().modifyPatientWithUser(this.user, _.merge(pat, {tags: [{type:"pricareMigrationStatus", code:"labResultsAndProtocolsGotReImported"}]})))
                                .then(() => this.set("posFix", (parseInt(_.get(this,"posFix",0))||0)+1))
                                .catch(x => (this.set("posFix", (parseInt(_.get(this,"posFix",0))||0)+1)||true) && _.concat(promisesCarrierPat, null))

                        }))

                })

                return promPat

            })
            .then(promPat => {})

    }

}

customElements.define(HtMigrationDataFix.is, HtMigrationDataFix);
