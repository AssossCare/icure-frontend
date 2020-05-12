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
                       <paper-button on-tap="doDocSfkFix" class="button" >Document sfk fix</paper-button>
                       <paper-button on-tap="doLabImportFix" class="button" >Lab import fix</paper-button>
                    </div>
                </div>
                <div class="mig-menu-view">
                    <!-- content here -->
                    <template is="dom-if" if="[[patientTelFix]]">
                        <paper-button on-tap="startPatientTelFix" class="button" >Fix patients</paper-button>
                        <div>Processing [[posPat]] of [[numPats]]</div>
                    </template>
                    <template is="dom-if" if="[[docSfkFix]]">
                        <paper-button on-tap="startDocSfkFix" class="button" >Fix sfk docs</paper-button>
                        <div>Processing [[posFix]] of [[numFix]]</div>
                    </template>
                    <template is="dom-if" if="[[labImportFix]]">
                        <paper-button on-tap="startLabImportFix" class="button" >Fix import labs</paper-button>
                        <div>Processing [[posFix]] of [[numFix]]</div>
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
            labImportFixFix:{
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

    open(){
        this.$.migrationDialog.open();
    }

    doPatientTelFix(){
        this.set('patientTelFix', true);
        this.set('docSfkFix', false);
        this.set('labImportFix', false);
    }

    doDocSfkFix(){
        this.set('patientTelFix', false);
        this.set('docSfkFix', true);
        this.set('labImportFix', false);
    }

    doLabImportFix(){
        this.set('patientTelFix', false);
        this.set('docSfkFix', false);
        this.set('labImportFix', true);
    }
    
    startPatientTelFix() {
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

    isMobileNumber(tcNumber){
        const clean = tcNumber.replace("/", "").replace("-", "").replace(" ", "").replace(".", "").replace("(", "").replace(")", "").replace("+32", "0")
        // 04xxaabbcc
        // length = 10
        // startswith = 04
        return clean.length === 10 && clean.startsWith("04");
    }

    getPatientsByHcp( hcpId ) {

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

    startDocSfkFix(){

        //per patient
        //per contact
        //per doc

        return this.api.hcparty().getHealthcareParty(_.get(this,"user.healthcarePartyId",""))
            .then(hcp => this.set("hcp",hcp))
            .then(() => this.getPatientsByHcp(_.trim(_.get(this,"hcp.parentId","")) ? _.trim(_.get(this,"hcp.parentId","")) : _.trim(_.get(this,"hcp.id",""))))
            .then(myPatients => {

                this.set("numPats", _.size(myPatients))
                let promPat = Promise.resolve([])
                let promDoc = Promise.resolve([])

                _.map(myPatients, pat => {
                    promPat = promPat.then(promiseCarrierPat => this._getDirectoryDocuments(pat).then(doclist => {
                        _.map(_.compact(_.map(doclist, "document")), doc => { promDoc = promDoc.then(promiseCarrierDoc => this._recreateDocument(doc, pat).then(x => _.concat(promiseCarrierDoc, x)).catch(x => _.concat(promiseCarrierDoc, null))) })
                        return promDoc.then(x => _.concat(promiseCarrierPat, x)).catch(x => _.concat(promiseCarrierPat, null))
                    }))
                })

                promPat.then(resList => _.map(resList, res => console.log(res)))

            })

    }

    _recreateDocument(doc, pat){
        console.log("recreate doc for pat", doc, pat)
        return this.api.document().getAttachment(doc.id, doc.attachmentId, null)
            .then(att => this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("decrypt", this.user, doc, att))
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
                ]))
                .then(ndoc => this.api.document().modifyDocument(ndoc))
                .then(mdoc => this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("encrypt", this.user, mdoc, decryptedAttachment).then(encryptedFileContent => this.api.document().setAttachment(mdoc.id, null, encryptedFileContent)))
            )
    }

    startLabImportFix(){
        //per patient
        //per contact
        //per doc
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
                            this._getDirectoryDocuments(pat).then(doclist => {
                                console.log("doclist", doclist)
                                let docs = doclist.map(dl => dl.document)
                                return docs.map(doc => this._doLabImport(doc, pat))
                            })
                        }))
                })
                prom.then(resList =>{
                    Promise.all(resList).then(res => console.log(res))
                })
            })
        })
    }

    _doLabImport(doc, pat){
        console.log("do labimport of doc from pat", doc, pat)


    }

    _YYYYMMDDHHmmssToDDMMYYYY(inputValue) {
        return parseInt(inputValue) ? this.api.moment(_.trim(parseInt(inputValue)),"YYYYMMDDHHmmss").format('DD/MM/YYYY') : ""
    }

    _getPrettifiedHcps(hcpIds=null) {

        const promResolve = Promise.resolve()

        return this.api.hcparty().getHealthcareParties((Array.isArray(hcpIds) && !!_.size(hcpIds)) ? hcpIds.join(",") : (typeof hcpIds === "string" && !!_.size(hcpIds)) ? hcpIds : _.get(this,"user.healthcarePartyId",""))
            .then(hcps => _.map(hcps, hcp => {
                const addressData = _.find(_.get(hcp,"addresses",[]), {addressType:"work"}) || _.find(_.get(hcp,"addresses",[]), {addressType:"home"}) || _.get(hcp,"addresses[0]",[])
                return _.merge({}, hcp, _.mapValues({
                    address: [ _.trim(_.get(addressData,"street","")), _.trim(_.get(addressData,"houseNumber","")) + (!!_.trim(_.get(addressData,"postboxNumber","")) ? "/" + _.trim(_.get(addressData,"postboxNumber","")) : "") ].join(", "),
                    postalCode: _.trim(_.get(addressData,"postalCode","")),
                    city: this._upperFirstAll(_.trim(_.get(addressData,"city",""))),
                    country: this._upperFirstAll(_.trim(_.get(addressData,"country",""))),
                    phone: _.trim(_.get(_.find(_.get(addressData,"telecoms",[]), {"telecomType":"phone"}), "telecomNumber", "")),
                    mobile: _.trim(_.get(_.find(_.get(addressData,"telecoms",[]), {"telecomType":"mobile"}), "telecomNumber", "")),
                    email: _.trim(_.get(_.find(_.get(addressData,"telecoms",[]), {"telecomType":"email"}), "telecomNumber", "")),
                    firstName: this._upperFirstAll(_.get(hcp,"firstName","")),
                    lastName: this._upperFirstAll(_.get(hcp,"lastName","")),
                    nihiiHr: this.api.formatInamiNumber(_.trim(_.get(hcp,"nihii",""))),
                    ssinHr: this.api.formatSsinNumber(_.trim(_.get(hcp,"ssin",""))),
                }, i => typeof i === "string" ? !!_.trim(i) ? _.trim(i) : '-' : i))
            }))
            .then(hcps => {
                const specialityIds = _.compact(_.uniq(_.flatten(_.map(hcps, i => _.map(_.get(i, "specialityCodes", []), sc => _.trim(_.get(sc, "id", "")))))))
                return !_.size(specialityIds) ? hcps : this.api.code().getCodes(specialityIds.join(",")).then(specialityCodes => _.map(hcps, hcp => _.merge(hcp, {specialitiesHr: _.compact(_.map(_.get(hcp, "specialityCodes", []), sc => _.trim(_.get(_.find(specialityCodes, {id: _.trim(_.get(sc, "id", ""))}), "label." + this.language, "")))).join(", ")})))
            }).catch(()=>promResolve)

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
                // Target ehealthbox message
                (!_.size(_.find(_.get(singleContact,"tags",[]), {type:"originalEhBoxMessageId"})) || !!_.trim(_.get(this.api.contact().preferredContent(_.get(singleContact,"services[0]",{}), this.language),"documentId")) ? false : {
                    contact: singleContact,
                    services: singleContact.services,
                    serviceTitle: _.trim(_.get(singleContact,"descr")),
                    date: parseInt(_.get(singleContact,"openingDate"))||+new Date(),
                    dateHr: this._YYYYMMDDHHmmssToDDMMYYYY(parseInt(_.get(singleContact,"openingDate",""))||+new Date()),
                    documentId: _.get(_.find(_.get(singleContact,"tags",[]), {type:"originalEhBoxDocumentId"}), "id",""),
                    isLabResultOrProtocol: true,
                }),
                // Target migrations - imported documents from epicure / medispring (docs don't exist as such, rather a services list)
                (!_.size(_.find(_.get(singleContact,"tags",[]), {type:"CD-TRANSACTION"})) || !!_.size(_.find(_.get(singleContact,"tags",[]), {type:"originalEhBoxMessageId"})) || !!_.trim(_.get(this.api.contact().preferredContent(_.get(singleContact,"services[0]",{}), this.language),"documentId")) ? false : {
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
                return !!_.get(fswd,"isFromMigration",false) ? fswd : (!_.trim(_.get(serviceDocument,"id","")) || !_.trim(_.get(serviceDocument,"attachmentId","")) ) ? false : _.merge({}, fswd, {document: serviceDocument})
            })))
            .then(contactsAndDocuments => _.chain(contactsAndDocuments).filter(i => !!_.get(i,"isFromMigration",false) || !!_.trim(_.get(i,"document.id"))).orderBy(['date'], ['desc']).value())
            .then(contactsAndDocuments => Promise.all(_.compact(_.map(contactsAndDocuments, cad => !_.trim(_.get(cad,"document.id")) ? false : this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(_.get(this,"_data.currentHcp.id",""), _.get(cad,"document.id"), _.get(cad,"document.cryptedForeignKeys")).then(x=>({documentId:_.get(cad,"document.id"), messageId:_.trim(_.head(_.get(x, "extractedKeys")))})).catch(()=>null)))).then(documentsIdsAndMessagesIds => ([contactsAndDocuments,documentsIdsAndMessagesIds])))
            .then(([contactsAndDocuments,documentsIdsAndMessagesIds]) => !_.size(documentsIdsAndMessagesIds) ? contactsAndDocuments : Promise.all(_.map(documentsIdsAndMessagesIds, it => this.api.message().getMessage(_.get(it,"messageId")).then(msg => _.merge({}, it,{message:msg})).catch(()=>it)))
                .then(messagesLinkedToDocuments => Promise.all(_.map(messagesLinkedToDocuments, msgLinkedToDoc => {

                        const msg = _.merge({}, _.get(msgLinkedToDoc,"message",{}), {linkedDocumentId: _.get(msgLinkedToDoc,"documentId")})
                        const cryptedInfo = _.trim(_.get(msg,"metas.cryptedInfo",""));
                        const dataToDecrypt = ( ["DOC:IMPORT:IN", "DOC:SCAN:IN"].indexOf( _.trim(_.get(msg,"transportGuid",""))) > -1 ) && !!cryptedInfo ? new Uint8Array(this.api.crypto().utils.base64toArrayBuffer(cryptedInfo)) :
                            ( ["HUB:IN:IMPORTED-DOCUMENT"].indexOf( _.trim(_.get(msg,"transportGuid",""))) > -1 ) && !!cryptedInfo ? this.api.crypto().utils.text2ua(Base64.decode(cryptedInfo)) :
                                ( _.trim(_.get(msg,"transportGuid","")).indexOf("INBOX") > -1 ) && !!_.trim(_.get(msg,"metas.annexesInfos","")) ? this.api.crypto().utils.text2ua(Base64.decode(_.trim(_.get(msg,"metas.annexesInfos","")))) :
                                    false;
                        let documentList = []; try{ documentList = JSON.parse(_.trim(_.get(msg,"metas.documentListJson",{}))); } catch(e) {}

                        return !dataToDecrypt ? msg : this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("decrypt", this.user, msg, dataToDecrypt)
                            .then(uaDecryptedContent => JSON.parse(this.api.crypto().utils.ua2text(uaDecryptedContent)))
                            .then(decryptedContent => _.merge(msg,{metas:{
                                    decryptedInfo: !!Array.isArray(decryptedContent) ? _.head(decryptedContent) : decryptedContent,
                                    documentList: documentList,
                                    isScanned:(((msg.status & (1 << 24)) !== 0)||msg.transportGuid === "DOC:SCAN:IN"),
                                    isImported:((msg.status & (1 << 25)) !== 0)
                                }}))
                            .catch(()=>msg)

                    }))
                        .then(messagesLinkedToDocuments => Promise.all(_.map(messagesLinkedToDocuments, msg => {
                            const targetDocument = _.get(_.find(contactsAndDocuments, {documentId:_.get(msg,"linkedDocumentId","")}),"document", {})
                            const targetMessageDocumentList = _.find(_.get(msg,"metas.documentList",[]), {id:_.get(msg,"linkedDocumentId","")})
                            return !_.trim(_.get(targetMessageDocumentList,"comment","")) ? Promise.resolve(msg) : this.api.encryptDecryptFileContentByUserHcpIdAndDocumentObject("decrypt", this.user, targetDocument, this.api.crypto().utils.text2ua(Base64.decode(_.trim(_.get(targetMessageDocumentList,"comment",""))))).then(uaDecryptedContent => msg.metas.documentList = _.merge(targetMessageDocumentList, {decryptedComment: this.api.crypto().utils.ua2text(uaDecryptedContent)})).then(()=>msg).catch(()=>msg)
                        })))
                        .then(decryptedMessages => _.map(contactsAndDocuments, it => _.merge({}, it, {message:_.find(decryptedMessages,{linkedDocumentId:_.get(it,"documentId")})})))
                        .catch(e=>{ console.log("ERROR _getMessages", e); return promResolve; })

                ))
            .then(datas => this._getPrettifiedHcps(_.uniq(_.compact(_.map(datas, data => _.trim(_.get(data,"contact.responsible","")))))).then(hcps=>([datas,hcps])))
            .then(([datas,hcps]) => _.map(datas, data => {

                const documentTypeFromSubContactsStatus = !_.get(data,"isFromMigration",false) ? null :
                    ((_.get(data,"contact.subContacts[0].status",0) & (1 << 0)) !== 0 ) ? this.localize("cd-transaction-labresult", "Laboratory result", this.language) :
                        ((_.get(data,"contact.subContacts[0].status",0) & (1 << 5)) !== 0 ) ? this.localize("prot", "Protocol", this.language) :
                            null

                const transactionCodeLabelHr = !!_.get(data,"isFromMigration",false) && !!_.trim(documentTypeFromSubContactsStatus) ? _.trim(documentTypeFromSubContactsStatus) :
                    !!_.get(data,"isLabResultOrProtocol",false) || !!_.get(data,"isFromMigration",false) ?
                        _.trim(_.get(_.find(_.get(this,"_data.codes['CD-TRANSACTION']",[]), {code:_.get(_.find(_.get(data,"contact.tags",[]), {type:"CD-TRANSACTION"}),"code","")}), "labelHr","")) :
                        _.trim(_.get(data,"message.transportGuid")) === "PRESCRIPTION:ITT:ARCHIVE" ? this.localize("medicalCertificate","Medical certificate",this.language) :
                            _.trim(_.get(data,"message.transportGuid")) === "PRESCRIPTION:KINE:ARCHIVE" ? this.localize("requestForKineCare_header1","Kinesitherapy prescription",this.language) :
                                _.trim(_.get(data,"message.transportGuid")) === "PRESCRIPTION:NURSE:ARCHIVE" ? this.localize("requestForNurseCare_header1","Nursing prescription",this.language) :
                                    _.trim(_.get(data,"message.transportGuid")) === "PRESCRIPTION:IMAGING:ARCHIVE" ? this.localize("requestForImagingExam","Medical imaging exam",this.language) :
                                        _.trim(_.get(data,"message.transportGuid")) === "MEDEX:OUT:PDF" ? this.localize("medicalCertificate","Medical certificate",this.language) + " Medex" :
                                            _.trim(_.get(data,"message.transportGuid")) === "MEDEX:OUT:KHMER" ? "KHMER - " + this.localize("medicalCertificate","Medical certificate",this.language) + " Medex" :
                                                !!_.size(_.get(data,"service.tags",[])) ? _.trim(_.get(_.find(_.get(this,"_data.codes['CD-TRANSACTION']",[]), {code:_.get(_.find(_.get(data,"service.tags",[]), {type:"CD-TRANSACTION"}),"code","")}), "labelHr","")) :
                                                    !!_.size(_.get(data,"contact.tags",[])) ? _.trim(_.get(_.find(_.get(this,"_data.codes['BE-CONTACT-TYPE']",[]), {code:_.get(_.find(_.get(data,"contact.tags",[]), {type:"BE-CONTACT-TYPE"}),"code","")}), "labelHr","")) :
                                                        ""

                const inComingOrOutGoing = !!_.get(data,"isFromMigration",false) ? "inComing" :
                    ( _.trim(_.get(_.find(_.get(data,"service.tags",[]),{type:"HUB-TRANSACTION"}),"code","")).toLowerCase() === "download" || _.trim(_.get(data,"message.transportGuid","")).indexOf("HUB:IN:") > -1 ) ? 'inComing' :
                        (_.trim(_.get(_.find(_.get(data,"service.tags",[]),{type:"HUB-TRANSACTION"}),"code","")).toLowerCase() === "upload" || _.trim(_.get(data,"message.transportGuid","")).indexOf("HUB:OUT:") > -1 )? 'outGoing' :
                            _.trim(_.get(data, "service.label")).toLowerCase().indexOf("imported document") > -1 ? 'inComing' :
                                !!_.size(_.find(_.get(data,"service.tags",[]), {type:"originalEhBoxMessageId"})) ? 'inComing' :
                                    !!_.size(_.find(_.get(data,"service.tags",[]), {type:"outgoingDocument"})) ? 'outGoing' :
                                        (!!_.get(data,"isLabResultOrProtocol",false) || !!_.trim(_.get(data,"message.fromAddress","")) || !!_.get(data,"isFromMigration",false)) ? 'inComing' :
                                            'outGoing'

                const documentOrigin = (!!_.size(_.find(_.get(data,"service.tags",[]),{type:"HUB-TRANSACTION"})) || _.trim(_.get(data,"message.transportGuid","")).indexOf("HUB:") > -1 ) ? 'hub' :
                    (!!parseInt(_.get(data,"message.metas.documentList.scanned",0)) || !!_.get(data,"message.metas.isScanned",false) || _.trim(_.get(data,"message.transportGuid","")) === "DOC:SCAN:IN") ? 'scannedDoc' :
                        _.trim(_.get(data, "service.label")).toLowerCase().indexOf("imported document") > -1 ? 'importedDoc' :
                            !!_.size(_.find(_.get(data,"service.tags",[]), {type:"originalEhBoxMessageId"})) ? 'eHealthbox' :
                                (!!_.get(data,"isLabResultOrProtocol",false) || !!_.trim(_.get(data,"message.fromAddress",""))) ? 'eHealthbox' :
                                    !!_.size(_.find(_.get(data,"service.tags",[]), {type:"outgoingDocument"})) ? 'patientFile' :
                                        'patientFile'

                return _.merge({},data, {
                    description: (!!_.get(data,"isLabResultOrProtocol",false) || !!_.get(data,"isFromMigration",false)) && !!_.trim(_.get(data,"contact.descr","")) ? _.trim(_.get(data,"contact.descr","")) :
                        (!!_.get(data,"isFromMigration",false) && !_.trim(_.get(data,"contact.descr","")) && !!_.trim(_.get(data,"contact.subContacts[0].descr",""))) ? _.trim(_.get(data,"contact.subContacts[0].descr","")) :
                            (!!_.get(data,"isFromMigration",false) && !_.trim(_.get(data,"contact.descr","")) && !!_.trim(_.get(data,"contact.subContacts[0].protocol",""))) ? this.localize("prot", "Protocol", this.language) + " " + _.trim(_.get(data,"contact.subContacts[0].protocol","")) :
                                !!_.trim(_.get(data,"message.metas.documentList.decryptedComment","")) ? _.trim(_.get(data,"message.metas.documentList.decryptedComment","")) :
                                    !!_.trim(_.get(data,"document.name","")) ? _.trim(_.get(data,"document.name","")) :
                                        _.trim(_.get(data,"documentId","")),
                    typeHr: !!_.trim(transactionCodeLabelHr) ? _.trim(transactionCodeLabelHr) : _.trim(_.get(data, "serviceTitle")),
                    inComingOutGoingHr: this.localize(inComingOrOutGoing, inComingOrOutGoing, this.language),
                    originHr: this.localize("documentsDirectoryOrigin_" + documentOrigin, documentOrigin, this.language) + (!!_.trim(_.get(data,"message.fromAddress","")) ? " - " + _.trim(_.get(data,"message.fromAddress","")) : ""),
                    authorHr: _.get(_.find(hcps, {id:_.trim(_.get(data,"contact.responsible",""))}),"lastName","") + " " + _.get(_.find(hcps, {id:_.trim(_.get(data,"contact.responsible",""))}),"firstName",""),
                    authorSpecialitiesHr: _.get(_.find(hcps, {id:_.trim(_.get(data,"contact.responsible",""))}),"specialitiesHr",""),
                    // recipientHr: "Dr. Maxime Mennechet", /* Only available in eHealthbox while sent item is not deleted yet */
                })
            }))
            .catch(e=>{ console.log("ERROR _getDirectoryDocuments", e); return promResolve; })

    }

}

customElements.define(HtMigrationDataFix.is, HtMigrationDataFix);
