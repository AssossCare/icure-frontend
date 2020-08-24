import '../../../dynamic-form/dynamic-link.js'
import '../../../dynamic-form/dynamic-pills.js'
import '../../../ht-spinner/ht-spinner.js'
import '../../../../styles/dialog-style.js'
import '../../../../styles/buttons-style.js'
import '../../../../styles/spinner-style';
import '../../../../styles/scrollbar-style';
import '../../../../styles/shared-styles';
import * as models from '@taktik/icc-api/dist/icc-api/model/models'
import moment from 'moment/src/moment'
import _ from 'lodash/lodash'

import XLSX from 'xlsx'
import 'xlsx/dist/shim.min'

// import {TkLocalizerMixin} from "../../../tk-localizer"
// import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class"
// import {IronResizableBehavior} from "@polymer/iron-resizable-behavior"
import {PolymerElement, html} from '@polymer/polymer'
import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";

class HtPatSubscriptionSendRecovery extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">

.subscription-container{
    height: 100%;
    width: 98%;
    margin: 1%;
}

.request-container{
    height: 100%;
    width: auto;
}

.mhm-sub-container{
    height: 100%;
    width: auto;
    margin: 10px;
    border: 1px solid var(--app-background-color-dark);
}

.mhm-person-container{
    height: 100%;
    width: auto;
    border: 1px solid var(--app-background-color-dark);
}

.mt10{
    margin-top: 10px;
}

.headerMasterTitleError{
    font-size: var(--font-size-large);
    background: var(--app-status-color-nok);
    padding: 0 12px;
    box-sizing: border-box;
}

.headerLabel{
    font-weight: bold;
}

.headerInfoLine{
    width: 100%;
    padding: 4px;
    display: flex;
    flex-flow: row wrap;
    justify-content: flex-start;
    align-items: flex-start;
}

.headerInfoField{
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: center;
    align-content: stretch;
    width: calc(100% / 4);
    padding: 0 8px;
    box-sizing: border-box;
}

.headerLabel{
    font-weight: bold;
}

.m5{
    margin: 5px;
}
.fw2{
    width: calc(100% / 2);
}

.headerLabel{
    font-weight: bold;
}

.headerMasterTitle{
    font-size: var(--font-size-large);
    background: var(--app-background-color-dark);
    padding: 0 12px;
    box-sizing: border-box;
}

.mhm-person-container-content{
    padding: 5px;
}

.mhm-log-container-content{
    padding: 5px;
    overflow: auto;
    height: calc(100% - 100px);
}

.w300{
    width: 300px;
}

.w400{
    width: 400px;
}

</style>

<div class="subscription-container">
    <div class="request-container">
        <div class="mhm-sub-container">
            <div class="mhm-person-container">
                <div class="headerMasterTitle headerLabel">[[localize('mhm-rep', 'Reprise des contrats MM', language)]]</div>
                <div class="mhm-person-container-content">
                    <div>[[localize('mhm-rep-num-1', 'Patients à reprendre', language)]]: [[numTodo]] [[localize('mhm-rep-num-2', 'patiens de', language)]] [[numTotal]] [[localize('mhm-rep-num-3', 'patients avec contrat MM', language)]]</div>
                    <template is="dom-if" if="[[isLoading]]">
                        <div><b>[[localize('mhm-rep-loading', 'Chargement en cours ...', language)]]</b></div>
                    </template>
                    <template is="dom-if" if="[[isRunning]]">
                        <div>[[localize('mhm-rep-run', 'Reprise en cours ...', language)]]</div>
                        <div>[[localize('mhm-rep-run-pat', 'Patient en cours', language)]]: [[curPat]]</div>
                    </template>
                    <template is="dom-if" if="[[!isLoading]]">
                        <template is="dom-if" if="[[!isRunning]]">
                            <template is="dom-if" if="[[isValidDate]]">
                                <template is="dom-if" if="[[!hasRunned]]">
                                    <div><b>[[localize('mhm-rep-ready', 'Prêt pour lancer reprise.', language)]]</b></div>
                                </template>
                            </template>
                            <template is="dom-if" if="[[!isValidDate]]">
                                <div>[[localize('mhm-rep-invalid-date', 'Reprise seulement possible entre 1/10/2020 et 31/10/2020', language)]]</div>
                            </template>
                        </template>
                    </template>
                </div>
                <div class="headerMasterTitle headerLabel">[[localize('mhm-rep-log', 'Log', language)]]</div>
                    <div class="mhm-log-container-content">
                        <template is="dom-repeat" items="[[recoveryLog]]" as="logitem">
                        <div>
                            <div>[[logitem.timestamp]]: [[logitem.patient]] --> [[logitem.status]]</div>
                        </div>
                        </template>
                    </div>
                </div>
            </div>
        </div>
    </div>
        `
    }

    static get is() {
        return 'ht-pat-subscription-send-recovery';
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
            i18n:{
                type: Object,
                value: {}
            },
            resources:{
                type: Object,
                value: {}
            },
            language: {
                type: String
            },
            patient:{
                type: Object,
                value: () => {}
            },
            hcp:{
                type: Object,
                value: () => {}
            },
            tabs:{
                type: Number,
                value: 0
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            mdaResult:{
                type: Object,
                value: () => {}
            },
            trialPeriod:{
                type: Array,
                value: [
                    {code: true, label: {fr: 'Oui', nl: 'Ja', en:'Yes'}},
                    {code: false, label: {fr: 'Non', nl: 'Nee', en: 'No'}}
                ]
            },
            selectedTrialPeriod:{
                type: Object,
                value: () => {}
            },
            signatureTypeList:{
                type: Array,
                value: [
                    {code: "holder-eid", label:{fr: "Signature électronique par le patient", nl: "Handtekening met EID van de patiënt", en: "Signature with patient's EID"}},
                    {code: "legalrepresentative-eid", label:{fr: "Signature électronique du représentant légal", nl: "Handtekening met EID van de wettelijke vertegenwoordiger", en: "Signature with EID of the legal representative"}},
                    {code: "holder-paper", label:{fr: "Contrat papier signé par le patient", nl: "Patiënthandtekening via papieren formulier", en: "Patient signature via paper form"}},
                    {code: "legalrepresentative-paper", label:{fr: "Contrat papier signé par le représentant légal", nl: "Handtekening van de wettelijke vertegenwoordiger via het papieren formulier", en: "Signature of the legal representative via the paper form"}}
                ]
            },
            selectedSignatureType:{
                type: Object,
                value: () => {}
            },
            sendSubscriptionRequest:{
                type: Object,
                value: {
                    patientFirstName: null,
                    patientLastName: null,
                    patientGender: null,
                    patientSsin: null,
                    patientIo: null,
                    patientIoMembership: null,
                    startSubscriptionDate: null,
                    realStartSubscriptionDate: null,
                    isTrial: false,
                    signatureType: null,
                    isRecovery: false,
                    isTestForNotify: false
                }
            },
            sendSubscriptionResponse:{
                type: Object,
                value: () => {}
            },
            recoveredPatients:{
                type: Array,
                value : []
            },
            patientsToRecover:{
                type: Array,
                value : []
            },
            numTodo:{
                type: Number,
                value : 0
            },
            numTotal:{
                type: Number,
                value:  0
            },
            isRunning:{
                type: Boolean,
                value : false
            },
            hasRunned:{
                type: Boolean,
                value : false
            },
            dateRecoveryStart:{
                type: Date,
                value: null
            },
            dateRecoveryEnd:{
                type: Date,
                value: null
            },
            isValidDate:{
                type: Boolean,
                value: false
            },
            curPat:{
                type: Object,
                value: null
            },
            recoveryLog:{
                type: Array,
                value: []
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return [
            '_todoCountChanged(patientsToRecover)',
            '_totalCountChanged(patientsToRecover,recoveredPatients)',
            '_sendStatusEvent(patientsToRecover,isRunning,isLoading,hasRunned)'
        ];
    }

    ready() {
        super.ready();
    }

    _loadData(){
        console.log("loadData")
        this.set("isLoading", true )
        this._loadRecoveryPatients().then(patientsToRecover => {
            console.log("patientsToRecover", patientsToRecover)
            this.set("isLoading", false)
        })
    }

    _initialize(){
        this._reset()
        this._loadData()
    }

    _reset(){
        this.set('isLoading', false)
        this.set('isRunning', false)
        this.set('hasRunned', false)
        this.set('recoveredPatients', [])
        this.set('patientsToRecover', [])
        this.set('recoveryLog', [])
        //TODO DEFINE fixed dates for start and end of recovery
        this.dateRecoveryStart = Date.parse("2020-07-29")
        this.dateRecoveryEnd = Date.parse("2020-08-31")
        console.log("date limits", this.dateRecoveryStart, this.dateRecoveryEnd)
        const now = moment().format('YYYY-MM-DD')
        this.set("isValidDate", this.api.moment(now).isSameOrAfter(this.api.moment(this.dateRecoveryStart).format('YYYY-MM-DD')) && this.api.moment(now).isSameOrBefore(this.api.moment(this.dateRecoveryEnd).format('YYYY-MM-DD')))
    }

    _selectedTrialPeriodChanged(){
        this.set('sendSubscriptionRequest.isTrial', _.get(_.get(this, 'trialPeriod', []).find(st => _.get(st, 'code', null) === _.get(this.selectedTrialPeriod, 'code', '')), 'code', null))
    }

    _selectedSignatureTypeChanged(){
        this.set('sendSubscriptionRequest.signatureType', _.get(_.get(this, 'signatureTypeList', []).find(st => _.get(st, 'code', null) === _.get(this.selectedSignatureType, 'code', '')), 'code', null))
    }

    _displayResultTab(){
        this.dispatchEvent(new CustomEvent("subscription-result", { composed: true, bubbles: true, detail: { subscriptionResultDetail: {commonOutput: _.get(this.sendSubscriptionResponse, 'commonOutput', {}), mycarenetConversation: _.get(this.sendSubscriptionResponse, 'mycarenetConversation', {})}} }))
    }

    _sendStatusEvent(){
        console.log("sending event")
        this.dispatchEvent(new CustomEvent("recovery-status", { composed: true, bubbles: true, detail: {statusDetail: {isLoading: this.isLoading, hasTodo: this._hasTodo(this.patientsToRecover), isRunning: this.isRunning, hasRunned: this.hasRunned }} }))
    }

    _formatNiss(niss){
        return niss ? ("" + niss).replace(/([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{3})([0-9]{2})/, '$1.$2.$3-$4.$5') : ''
    }

    _getLabel(item){
        return _.get(item, this.language, null)
    }

    cleanData(data){
        return _.trim(data).replace(/[^\d]/gmi,"")
        //return data && data.replace(/ /g, "").replace(/-/g,"").replace(/\./g,"").replace(/_/g,"").replace(/\//g,"")
    }

    _calculateSubscriptionStartDate(){

        const startDate = _.get(this.sendSubscriptionRequest, 'startSubscriptionDate', null)
        const isTrial = _.get(this.sendSubscriptionRequest, 'isTrial', false)
        const realStartDate = startDate ? isTrial ? this.api.moment(startDate).startOf("month").add(4, 'month').format("YYYY-MM-DD") : this.api.moment(startDate).startOf("month").add(1, 'month').format("YYYY-MM-DD") : null

        this.set('sendSubscriptionRequest.realStartSubscriptionDate', realStartDate)
    }

    _formatDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }

    _localizeGender(gender){
        return this.localize(gender, gender, this.language)
    }

    _getIoMembership(patient, mdaResult){
        return _.get(_.get(patient, 'insurabilities', []).find(ass => _.get(ass, 'startDate', null) && !_.get(ass, 'endDate', null)), 'identificationNumber', null)
    }

    _patientIoChanged(){
        this.set('sendSubscriptionRequest.patientIo', _.head(_.split(_.get(this.patientInsuranceParent, 'code', ''), ',')))
    }

    _loadRecoveryPatients(){
        return this.api.hcparty().getHealthcareParty(_.get(this,"user.healthcarePartyId",""))
            .then(hcp => this.set("hcp",hcp))
            .then(() => this._getPatientsByHcp(_.trim(_.get(this,"hcp.parentId","")) ? _.trim(_.get(this,"hcp.parentId","")) : _.trim(_.get(this,"hcp.id",""))))
            .then(myPatients => {
                const patientSendLimit = _.trim(_.trim(_.get(document,"location.href")).match(/patientSendLimit=([^&#]*)/gi)).split("=").pop()
                console.log("url parametes patientSendLimit", patientSendLimit)

//                        const recoveredPatients = myPatients.filter(pat => this._patHasRunningSubscription(pat) && this._patRecoveryDone(pat));
                const recoveredPatients = myPatients.filter(pat => this._patRecoveryDone(pat));
                let patientsToRecover = myPatients.filter(pat => this._patHasRunningSubscription(pat) && !this._patRecoveryDone(pat));

                if(!!_.trim(patientSendLimit)) patientsToRecover = patientsToRecover.slice(0, parseInt(patientSendLimit))

                this.set("recoveredPatients", recoveredPatients);
                this.set("patientsToRecover", patientsToRecover);
                console.log("recoveredPatients", recoveredPatients)
                return Promise.resolve(patientsToRecover);
            })
    }

    _sendRecovery(){
        this.set("isRunning", true);
        this.set("recoveryLog", []);

        //TODO remove : limit patients
        // if(_.size(this.patientsToRecover) > 3){
        //     this.patientsToRecover = this.patientsToRecover.slice(0, 10)
        // }
        let tmpLog = []
        let prom = Promise.resolve([])
        _.map(this.patientsToRecover, pat => {
            prom = prom.then(promiseCarrier =>this.api.patient().getPatientWithUser(this.user, pat.id)
                .then(pat =>{
                    this.curPat = pat.lastName + " " + pat.firstName
                    let recoveryLogItem = {patient: _.get(pat, 'ssin', '') + " " + pat.lastName + " " + pat.firstName, status: "En cours...", patientId : pat.id}
                    return this._sendSubscription(pat, recoveryLogItem).then(res => {
                        recoveryLogItem.timestamp = moment().format('YYYY-MM-DD HH:mm:ss')
                        this.push("recoveryLog", recoveryLogItem)
                        return this._sleep(5000)
                    })
                }).then(x => _.concat(promiseCarrier,x))
                .catch(() => _.concat(promiseCarrier,null)))
        })

        prom.then(res => {
            //this.set("recoveryLog", this.patientsToRecover.map(pat => pat.recoveryLogItem))
            console.log("recoveryLog", this.recoveryLog)
            //this._loadData()
            //this.exportToCsv()
            this.set("isRunning", false);
            this.set("hasRunned", true);
        })
    }

    _sleep (time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    _patHasRunningSubscription(pat){
        // 1. get mh subscriptions

        const mhc = _.sortBy(_.get(pat, 'medicalHouseContracts', []).filter(mhs => _.get(mhs, 'startOfCoverage', null)), 'startOfContract', 'desc')

        if(_.size(_.get(pat, 'medicalHouseContracts', []))) {
            console.log("mhc",mhc)
        }

        const now = moment().format('YYYY-MM-DD')
        return _.size(_.get(pat, 'medicalHouseContracts', []))
            && _.get(pat, 'medicalHouseContracts', []).find(mhs =>
                _.get(mhs, 'startOfCoverage', null)
                && this.api.moment(this.dateRecoveryStart).isAfter(this.api.moment(_.get(mhs, 'startOfContract', null)).format('YYYY-MM-DD'))
                && (!_.get(mhs, 'endOfCoverage', null) || this.api.moment(this.dateRecoveryEnd).isBefore(this.api.moment(_.get(mhs, 'endOfCoverage', null)).format('YYYY-MM-DD')))
                && _.get(mhs, "hcpId", null)
                && (_.get(mhs, "kine", false) || _.get(mhs, "gp", false) || _.get(mhs, "nurse", false))
            )
    }

    _patRecoveryDone(pat){
        if(_.size(_.get(pat, 'medicalHouseContracts', []))){
            _.get(pat, 'medicalHouseContracts', []).forEach(mhs => {
                console.log(_.get(mhs, 'startOfCoverage', null), _.get(mhs, "contractId", null), _.get(mhs, "mmNihii", null))
            })
        }
        return _.size(_.get(pat, 'medicalHouseContracts', []))
            && _.get(pat, 'medicalHouseContracts', []).find(mhs =>
                _.get(mhs, 'startOfCoverage', null)
                && _.get(mhs, "contractId", null)
                && _.get(mhs, "mmNihii", null)
            )
    }

    _numPatsTodo(todo){
        return todo ? todo.length : 0
    }

    _numPatsTotal(done, todo){
        return (done ? done.length : 0) + (todo ? todo.length : 0)
    }

    _todoCountChanged(patientsToRecover){
        this.set("numTodo", this._numPatsTodo(patientsToRecover))
    }
    _totalCountChanged(patientsToRecover,recoveredPatients){
        this.set("numTotal", this._numPatsTotal(patientsToRecover, recoveredPatients))
    }

    _hasTodo(todo){
        return !!(todo && todo.length > 0)
    }

    _test(){
        // this.set("recoveredPatients", [{a:1}]);
        // this.set("patientsToRecover", [{b:1}]);
        //
        this._loadData()
    }

    _getPatientsByHcp( hcpId ) {

        const patientIdStartsWith = _.trim(_.trim(_.get(document,"location.href")).match(/patientIdStartsWith=([^&#]*)/gi)).split("=").pop()
        const patientNameStartsWith = _.trim(_.trim(_.get(document,"location.href")).match(/patientNameStartsWith=([^&#]*)/gi)).split("=").pop()


        console.log("url parametes", patientIdStartsWith, patientNameStartsWith)

        return this.api.getRowsUsingPagination((key,docId) => this.api.patient().listPatientsByHcPartyWithUser(this.user, hcpId, null, key && JSON.stringify(key), docId, 1000)
            .then(pl => {
                pl.rows = _
                    .chain(pl.rows)
                    .filter(pat => !_.trim(patientIdStartsWith) ? true : _.trim(_.get(pat,"id")).startsWith(patientIdStartsWith))
                    .filter(pat => !_.trim(patientNameStartsWith) ? true : _.trim(_.get(pat,"lastName")).toLowerCase().startsWith(patientNameStartsWith.toLowerCase()))
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

    _makeSubscriptionRequest(pat){
        return {
            patientFirstName: _.get(pat, 'firstName', null),
            patientLastName: _.get(pat, 'lastName', null),
            patientGender: _.get(pat, 'gender', null),
            patientSsin: _.get(pat, 'ssin', null),
            patientIo: this._getIo(pat),
            patientIoMembership: this._getIoMembership(pat),
            startSubscriptionDate: moment().format('YYYY-MM-DD'),
            realStartSubscriptionDate: null,
            isTrial: false,
            signatureType: "holder-paper",
            isRecovery: true,
            isTestForNotify: false
        }
    }

    _getIo(patient){
        return null
    }

    _getIoMembership(patient){
        return _.get(_.get(patient, 'insurabilities', []).find(ass => _.get(ass, 'startDate', null) && !_.get(ass, 'endDate', null)), 'identificationNumber', null)
    }

    _sendSubscription(pat, recoveryLogItem){
        this.set("sendSubscriptionRequest", this._makeSubscriptionRequest(pat))
        console.log(this.sendSubscriptionRequest)
        //TODO add the errors to an array
        const requestError = this._checkBeforeSend()
        //keep original mhc values
        //const orMhc = _.cloneDeep(pat.)

        if(!_.size(requestError)){
            return this.api.fhc().Mhm().sendSubscriptionUsingPOST(
                _.get(this.api, "keystoreId", null),
                _.get(this.api, "tokenIdMH", null),
                _.get(this.api, "credentials.ehpassword", null),
                this.cleanData(_.get(this.hcp, "nihii", null)),
                _.get(this.hcp, 'name', null),
                _.get(this.sendSubscriptionRequest, 'patientFirstName', null),
                _.get(this.sendSubscriptionRequest, 'patientLastName', null),
                _.get(this.sendSubscriptionRequest, 'patientGender', null),
                _.parseInt(this.api.moment(_.get(this.sendSubscriptionRequest, 'startSubscriptionDate', null)).format('YYYYMMDD')),
                _.get(this.sendSubscriptionRequest, 'isTrial', false).toString(),
                _.get(this.sendSubscriptionRequest, 'signatureType', null),
                this.cleanData( _.get(this.sendSubscriptionRequest, 'patientSsin', null)),
                !_.get(this.sendSubscriptionRequest, 'patientSsin', null) ? this.cleanData(_.get(this.sendSubscriptionRequest, 'patientIo', null)) : null,
                !_.get(this.sendSubscriptionRequest, 'patientSsin', null) ? this.cleanData(_.get(this.sendSubscriptionRequest, 'patientIoMembership', null)) : null,
                true,
                false
            ).then(mhmResponse => {
                    console.log("sendSubscriptionLog ", mhmResponse)
                    //TODO, create an array of responses
                    this.set('sendSubscriptionResponse', mhmResponse)

                    const mhc = _.sortBy(_.get(pat, 'medicalHouseContracts', []).filter(mhs => _.get(mhs, 'startOfCoverage', null)), 'startOfContract', 'desc')[0]
                    mhc.contractId = _.get(mhmResponse, 'reference', null)
                    recoveryLogItem.sendSubscriptionRespone = mhmResponse
                    if(!mhc.contractId){
                        console.log("sendSubscriptionLog no contractid for", pat)
                        recoveryLogItem.sendSubscriptionResponseErrpr = "no contractid"

                        recoveryLogItem.status = "Erreur: " + _.map(mhmResponse.errors, err => err.msgFr ).join(", ") + _.map(mhmResponse.genericErrors, err => this._getGenericErrorMessage(err)).join(", ")

                        //TODO: extract error
                    }
                    else
                    {
                        mhc.mmNihii = _.get(this.hcp, 'nihii', null)
                        mhc.signatureType = _.camelCase(_.get(this.sendSubscriptionRequest, 'signatureType', null))
                        mhc.status = 1 << 1
                        pat.medicalHouseContracts = []
                        pat.medicalHouseContracts.push(mhc)

                        return Promise.all([
                            this.api.receipticc.createReceipt({
                                documentId: _.get(mhmResponse, 'reference', null),
                                references: Object.values(mhmResponse.commonOutput),
                                category: "subscription",
                                subCategory:"xades"
                            }),
                            this.api.receipticc.createReceipt({
                                documentId: _.get(mhmResponse, 'reference', null),
                                references: Object.values(mhmResponse.commonOutput),
                                category: "subscription",
                                subCategory:"soapResponse"
                            }),
                            this.api.receipticc.createReceipt({
                                documentId: _.get(mhmResponse, 'reference', null),
                                references: Object.values(mhmResponse.commonOutput),
                                category: "subscription",
                                subCategory:"transactionRequest"
                            }),
                            this.api.receipticc.createReceipt({
                                documentId: _.get(mhmResponse, 'reference', null),
                                references: Object.values(mhmResponse.commonOutput),
                                category: "subscription",
                                subCategory:"transactionResponse"
                            }),
                            this.api.receipticc.createReceipt({
                                documentId: _.get(mhmResponse, 'reference', null),
                                references: Object.values(mhmResponse.commonOutput),
                                category: "subscription",
                                subCategory:"soapRequest"
                            })
                        ]).then(([xades,soap,request,response, soapRequest]) => Promise.all([
                            _.get(xades,"id",false) && _.get(mhmResponse,"xades",false) && this.api.receipt().setReceiptAttachment(xades.id, "xades", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(atob(mhmResponse.xades))))) || Promise.resolve(xades),
                            _.get(soap,"id",false) && _.get(mhmResponse,"mycarenetConversation.soapResponse",false) && this.api.receipt().setReceiptAttachment(soap.id, "soapResponse", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(mhmResponse.mycarenetConversation.soapResponse)))) || Promise.resolve(soap),
                            _.get(request,"id",false) && _.get(mhmResponse,"mycarenetConversation.transactionRequest",false) && this.api.receipt().setReceiptAttachment(request.id, "kmehrRequest", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(mhmResponse.mycarenetConversation.transactionRequest)))) || Promise.resolve(request),
                            _.get(response,"id",false) && _.get(mhmResponse,"mycarenetConversation.transactionResponse",false) && this.api.receipt().setReceiptAttachment(response.id, "kmehrResponse", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(mhmResponse.mycarenetConversation.transactionResponse)))) || Promise.resolve(response),
                            _.get(soapRequest,"id",false) && _.get(mhmResponse,"mycarenetConversation.soapRequest",false) && this.api.receipt().setReceiptAttachment(soapRequest.id, "soapRequest", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(mhmResponse.mycarenetConversation.soapRequest)))) || Promise.resolve(soapRequest)
                        ]))
                            .then(([xades,soap,request,response, soapRequest]) => {
                                const mhc = pat.medicalHouseContracts.find(m => m.contractId=== _.get(mhmResponse, 'reference', null))
                                if(!_.get(mhc,'receipts',false))mhc.receipts={}
                                if(_.get(xades,"id",false))
                                    mhc.receipts.xadesCreation=xades.id
                                if(_.get(soap,"id",false))
                                    mhc.receipts.soapCreation=soap.id
                                if(_.get(request,"id",false))
                                    mhc.receipts.requestCreation=request.id
                                if(_.get(response,"id",false))
                                    mhc.receipts.responseCreation=response.id
                                if(_.get(soapRequest,"id",false))
                                    mhc.receipts.soapRequestCreation=soapRequest.id
                            }).finally(()=>{
                                recoveryLogItem.requestSucceeded = true
                                recoveryLogItem.status = "OK: ContractId" + mhc.contractId
                                return this._updatePatient(pat)
                            })
                    }
                    //return this._updatePatient(pat)
                }).catch((error) => {
                    console.log("sendSubscriptionLog error for patient", pat, error)
                    recoveryLogItem.sendSubscriptionError = error
                    recoveryLogItem.status = "Erreur : " + error
                    return Promise.resolve(pat)
                })
        } else {
            console.log("sendSubscriptionLog pre-send errors for patient", pat, requestError)
            recoveryLogItem.requestError = requestError
            recoveryLogItem.status = "Erreur : " +  _.map(requestError, err => this.localize(err, err, this.language)).join(", ")
            return Promise.resolve(pat)
        }
    }

    _checkBeforeSend(){

        let error = []
        !_.get(this.api, "keystoreId", null) ? error.push("mhm-keystore-error") : null
        !_.get(this.api, "tokenIdMH", null) ? error.push("mhm-token-id-error") : null
        !_.get(this.api, "credentials.ehpassword", null) ? error.push("mhm-ehpassword-error") : null
        !_.get(this.hcp, "nihii", null) ? error.push("mhm-nihii-error") : null
        !_.get(this.hcp, 'name', null) ? error.push("mhm-name-error") : null
        !_.get(this.sendSubscriptionRequest, 'patientFirstName', null) ? error.push("mhm-patient-first-name-error") : null
        !_.get(this.sendSubscriptionRequest, 'patientLastName', null) ? error.push("mhm-patient-last-name-error") : null
        !_.get(this.sendSubscriptionRequest, 'patientGender', null) ? error.push("mhm-patient-gender-error") : null
        !_.get(this.sendSubscriptionRequest, 'startSubscriptionDate', null) ? error.push("mhm-start-subscription-date-error") : null
        _.get(this.sendSubscriptionRequest, 'isTrial', false) === true || _.get(this.sendSubscriptionRequest, 'isTrial', false) === false ? null : error.push("mhm-is-trial-error")
        !_.get(this.sendSubscriptionRequest, 'signatureType', null) ? error.push("mhm-signature-type-error") : null

        //!_.get(this.sendSubscriptionRequest, 'patientSsin', null) ? error.push("mhm-patient-ssin-error") : null
        _.get(this.sendSubscriptionRequest, 'patientSsin', null) ? !this.api.patient().isValidSsin(_.get(this.sendSubscriptionRequest, 'patientSsin', null)) ? error.push("mhm-patient-ssin-format-error") : null : null

        !_.get(this.sendSubscriptionRequest, 'patientSsin', null) ? !_.get(this.sendSubscriptionRequest, 'patientIo', null) ? error.push("mhm-patient-ssin-error", "mhm-patient-io-error") : null : null
        !_.get(this.sendSubscriptionRequest, 'patientSsin', null) ? !_.get(this.sendSubscriptionRequest, 'patientIoMembership', null) ? error.push("mhm-patient-ssin-error", "mhm-patient-io-membership-error") : null : null

        return error
    }

    _updatePatient(pat){
        console.log("sendSubscriptionLog updating patient", pat)
        return this.api.patient().modifyPatientWithUser(this.user, pat)
            .then(pat => this.api.register(pat, 'patient'))
    }

    _getLogReport(){
        this.exportToCsv()
    }

    _getGenericErrorMessage(e){
        return _.get(e, 'faultSource', null)+' '+_.get(e, 'faultCode', null)
    }

    exportToCsv() {
        let items = null
        items = this.recoveryLog
        this.generateXlsFile(items.map(inv => {
            const xllog = JSON.parse(JSON.stringify(inv));
            return xllog
        }))
    }

    generateXlsFile(data) {

        // Create xls work book and assign properties
        const xlsWorkBook = {SheetNames: [], Sheets: {}}
        xlsWorkBook.Props = {Title: "Recovery", Author: "Topaz"}

        // Create sheet based on json data collection
        var xlsWorkSheet = XLSX.utils.json_to_sheet(data)

        // Link sheet to workbook
        XLSX.utils.book_append_sheet(xlsWorkBook, xlsWorkSheet, 'Recovery log')

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
        downloadLink.download = "mhm_recovery_log_" + moment().format("YYYYMMDD-HHmmss") + ".xls"

        // Trigger download and drop object
        downloadLink.click()
        window.URL.revokeObjectURL(urlObject)

        // Free mem
        fileBlob = false
        xlsWorkBookOutput = false

        return
    }
}
customElements.define(HtPatSubscriptionSendRecovery.is, HtPatSubscriptionSendRecovery);
