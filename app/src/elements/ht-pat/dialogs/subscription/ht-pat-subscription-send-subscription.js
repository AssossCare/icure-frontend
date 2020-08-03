import'@vaadin/vaadin-icons/vaadin-icons'
import'@vaadin/vaadin-date-picker/vaadin-date-picker'
import'@vaadin/vaadin-text-field/vaadin-text-field'
import'@vaadin/vaadin-checkbox/vaadin-checkbox'
import'@vaadin/vaadin-combo-box/vaadin-combo-box'
import'@vaadin/vaadin-text-field/vaadin-text-area'
import'@polymer/paper-dialog/paper-dialog'
import'@polymer/paper-button/paper-button'
import'@polymer/paper-card/paper-card'
import'@polymer/paper-listbox/paper-listbox'
import'@polymer/paper-item/paper-icon-item'
import'@polymer/paper-fab/paper-fab'
import'@polymer/paper-icon-button/paper-icon-button'
import'@polymer/paper-styles/shadow'
import'@polymer/iron-resizable-behavior/iron-resizable-behavior'

import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/buttons-style.js';
import '../../../../styles/paper-tabs-style.js';
import '../../../dynamic-form/dynamic-text-field.js';
import '../../../../styles/notification-style.js';

import './ht-pat-subscription-mda-medical-house-result'

import moment from 'moment/src/moment';
import {TkLocalizerMixin} from "../../../tk-localizer";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatSubscriptionSendSubscription extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">

            .subscription-container{
                height: 100%;
                width: 98%;
                margin: 1%;
            }

            .request-container{
                height: auto;
                width: auto;
            }

            .mhm-sub-container{
                height: auto;
                width: auto;
                margin: 10px;
                border: 1px solid var(--app-background-color-dark);
            }

            .mhm-person-container{
                height: auto;
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

            .w300{
                width: 300px;
            }

            .w400{
                width: 400px;
            }

            .error-container{
                height: 150px;
                width: auto;
            }

            .p4{
                padding: 4px;
            }

            .mhm-container-error{
                height: auto;
                width: auto;
            }

            .headerMasterTitleError{
                font-size: var(--font-size-large);
                background: var(--app-status-color-nok);
                padding: 0 12px;
                box-sizing: border-box;
            }

            .mhm-sub-container-error{
                height: auto;
                width: auto;
                margin: 5px;
                border: 1px solid var(--app-status-color-nok);
            }

            .mhm-error-container-content{
                padding: 5px;
            }

            .mhm-checkbox-container{
                margin-right: 20px;
            }

            .mhm-checkbox{
                width: 24px!important;
            }

        </style>

        <div class="subscription-container">
            <div class="request-container">
                <div class="mhm-sub-container">
                    <div class="mhm-person-container">
                        <div class="headerMasterTitle headerLabel">[[localize('mhm-sub', 'Subscription', language)]]</div>
                        <div class="mhm-person-container-content">
                            <div class="mhm-person-container mt10">
                                <div class="headerMasterTitle headerLabel">[[localize('mhm-sub-pat', 'Patient informations', language)]]</div>
                                <div class="headerInfoLine">
                                    <div class="headerInfoLine">
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-name', 'Name', language)]]: &nbsp;</span> [[sendSubscriptionRequest.patientLastName]]
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-firstName', 'First name', language)]]: &nbsp;</span> [[sendSubscriptionRequest.patientFirstName]]
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-gender', 'Gender', language)]]: &nbsp;</span> [[_localizeGender(sendSubscriptionRequest.patientGender)]]
                                        </div>
                                    </div>
                                    <div class="headerInfoLine">
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-inss', 'Ssin', language)]]: &nbsp;</span> [[_formatNiss(sendSubscriptionRequest.patientSsin)]]
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-io', 'Io', language)]]: &nbsp;</span> [[sendSubscriptionRequest.patientIo]]
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-iomembership', 'Io membership', language)]]: &nbsp;</span> [[sendSubscriptionRequest.patientIoMembership]]
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mhm-person-container mt10">
                                <div class="headerMasterTitle headerLabel">[[localize('mhm-sub-type', 'Subscription type', language)]]</div>
                                <div class="headerInfoLine">
                                    <div class="headerInfoLine">
                                        <div class="headerInfoField">
                                            <vaadin-date-picker class="mtm2 mw0 mr1" label="[[localize('mhm-sub-start-contract', 'Start of contract', language)]]" value="{{sendSubscriptionRequest.startSubscriptionDate}}" i18n="[[i18n]]" min="[[dateRange.minDate]]" max="[[dateRange.maxDate]]"></vaadin-date-picker>
                                            <vaadin-checkbox on-checked-changed="_subscriptionInPastFlagChanged"></vaadin-checkbox>
                                        </div>
                                        <div class="headerInfoField fw2">
                                            <vaadin-combo-box class="w33 p4 mw0 w300" label="[[localize('mhm-sub-trial', 'Trial period', language)]]" selected-item="{{selectedTrialPeriod}}"  filtered-items="[[trialPeriod]]" item-label-path="label.fr" >
                                                <template>[[_getLabel(item.label)]]</template>
                                            </vaadin-combo-box>
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-start-coverage', 'Actual start date', language)]]: &nbsp;</span> [[_formatDate(sendSubscriptionRequest.realStartSubscriptionDate)]]
                                        </div>
                                    </div>
                                    <div class="headerInfoLine">
                                        <div class="headerInfoField fw2">
                                            <span class="headerLabel">[[localize('mhm-coverage-type', 'Coverage type', language)]]: &nbsp;</span>
                                            <template is="dom-if" if="[[_isCoverageAvailable('doctor')]]">
                                                <span class="mhm-checkbox-container"><vaadin-checkbox class="mhm-checkbox" checked="[[sendSubscriptionRequest.doctor]]" id="doctorType" on-checked-changed="_selectedCoverageTypeChanged"></vaadin-checkbox> [[localize('mhm-cov-type-doctor', 'Doctor', language)]]</span>
                                            </template>
                                            <template is="dom-if" if="[[_isCoverageAvailable('physio')]]">
                                                <span class="mhm-checkbox-container"><vaadin-checkbox class="mhm-checkbox" checked="[[sendSubscriptionRequest.physio]]" id="physioType" on-checked-changed="_selectedCoverageTypeChanged"></vaadin-checkbox> [[localize('mhm-cov-type-physio', 'Physiotherapist', language)]]</span>
                                            </template>
                                            <template is="dom-if" if="[[_isCoverageAvailable('nurse')]]">
                                                <span class="mhm-checkbox-container"><vaadin-checkbox class="mhm-checkbox" checked="[[sendSubscriptionRequest.nurse]]" id="nurseType" on-checked-changed="_selectedCoverageTypeChanged"></vaadin-checkbox> [[localize('mhm-cov-type-nurse', 'Nurse' , language)]]</span>
                                            </template>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="mhm-person-container mt10">
                                <div class="headerMasterTitle headerLabel">[[localize('mhm-sub-sign', 'Signature', language)]]</div>
                                <div class="headerInfoLine">
                                    <div class="headerInfoLine">
                                        <div class="headerInfoField">
                                            <vaadin-combo-box class="w33 p4 mw0 w400" label="[[localize('mhm-sub-sign-type', 'Signature type', language)]]" selected-item="{{selectedSignatureType}}"  filtered-items="[[signatureTypeList]]" item-label-path="label.fr" >
                                                <template>[[_getLabel(item.label)]]</template>
                                            </vaadin-combo-box>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <template is="dom-if" if="[[_isRequestError(requestError)]]" restamp="true">
                <div class="error-container">
                    <div class="mhm-error-container-content">
                        <div class="mhm-sub-container-error">
                            <div class="headerMasterTitleError headerLabel">[[localize('mhm-error-ctn', 'Error before send', language)]]</div>
                            <div class="mhm-container-error p4">
                                <template is="dom-repeat" items="[[requestError]]" as="error">
                                    <div>- [[_getErrorMessage(error)]]</div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template is="dom-if" if="[[_isRequestError(sendSubscriptionResponse.errors)]]" restamp="true">
                <div class="error-container">
                    <div class="mhm-error-container-content">
                        <div class="mhm-sub-container-error">
                            <div class="headerMasterTitleError headerLabel">[[localize('mhm-mcn-error', 'Mcn error', language)]]</div>
                            <div class="mhm-container-error p4">
                                <template is="dom-repeat" items="[[sendSubscriptionResponse.errors]]" as="error">
                                    <div>- [[_getMcnErrorMessage(error)]]</div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template is="dom-if" if="[[_isRequestError(sendSubscriptionResponse.genericErrors)]]" restamp="true">
                <div class="error-container">
                    <div class="mhm-error-container-content">
                        <div class="mhm-sub-container-error">
                            <div class="headerMasterTitleError headerLabel">[[localize('mhm-mcn-error', 'Mcn error', language)]]</div>
                            <div class="mhm-container-error p4">
                                <template is="dom-repeat" items="[[sendSubscriptionResponse.genericErrors]]" as="error">
                                    <div>- [[_getGenericErrorMessage(error)]]</div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </div>
        `
    }

    static get is() {
        return 'ht-pat-subscription-send-subscription';
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
                    {code: true, label: {fr: 'Oui', nl: 'Ya', en:'Yes'}},
                    {code: false, label: {fr: 'Non', nl: 'Ne', en: 'No'}}
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
                    isTestForNotify: false,
                    doctor: false,
                    nurse: false,
                    physio: false
                }
            },
            sendSubscriptionResponse:{
                type: Object,
                value: () => {}
            },
            patientInsuranceParent:{
                type: Object,
                value: () => {}
            },
            dateRange:{
                type: Object,
                value: () => {}
            },
            requestError:{
                type: Array(),
                value: () => []
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return [
            '_initialize(api, user, patient, mdaResult)',
            '_selectedSignatureTypeChanged(selectedSignatureType, selectedSignatureType.*)',
            '_selectedTrialPeriodChanged(selectedTrialPeriod, selectedTrialPeriod.*)',
            '_calculateSubscriptionStartDate(sendSubscriptionRequest.startSubscriptionDate, selectedTrialPeriod, selectedTrialPeriod.*)',
            '_patientIoChanged(patientInsuranceParent, patientInsuranceParent.*)'
        ];
    }

    ready() {
        super.ready();
    }

    _initialize(){
        this._reset()
        this.set('sendSubscriptionRequest', {
            patientFirstName: _.get(this.patient, 'firstName', null),
            patientLastName: _.get(this.patient, 'lastName', null),
            patientGender: _.get(this.patient, 'gender', null),
            patientSsin: _.get(this.patient, 'ssin', null),
            patientIo: null,
            patientIoMembership: this._getIoMembership(this.patient, this.mdaResult),
            startSubscriptionDate: moment().format('YYYY-MM-DD'),
            realStartSubscriptionDate: null,
            isTrial: _.get(_.get(this, 'trialPeriod', []).find(tp => _.get(tp, 'code', null) === false), 'code', false),
            signatureType: _.get(_.get(this, 'signatureTypeList', []).find(st => _.get(st, 'code', null) === "holder-paper"), 'code', "holder-paper"),
            isRecovery: false,
            isTestForNotify: false,
            doctor: this._isCoverageAvailable('doctor'),
            nurse: this._isCoverageAvailable('nurse'),
            physio: this._isCoverageAvailable('physio')
        })

        this.set('selectedTrialPeriod', _.get(this, 'trialPeriod', []).find(tp => _.get(tp, 'code', false) === false))
        this.set('selectedSignatureType', _.get(this, 'signatureTypeList', []).find(st => _.get(st, 'code', null) === "holder-paper"))
    }

    _reset(){
        this.set('sendSubscriptionRequest', {})
        this.set('sendSubscriptionResponse', {})
        this.set('selectedTrialPeriod', {})
        this.set('selectedSignatureType', {})
        this.set('requestError', [])
    }

    _selectedTrialPeriodChanged(){
        this.set('sendSubscriptionRequest.isTrial', _.get(_.get(this, 'trialPeriod', []).find(st => _.get(st, 'code', null) === _.get(this.selectedTrialPeriod, 'code', '')), 'code', null))
    }

    _selectedSignatureTypeChanged(){
        this.set('sendSubscriptionRequest.signatureType', _.get(_.get(this, 'signatureTypeList', []).find(st => _.get(st, 'code', null) === _.get(this.selectedSignatureType, 'code', '')), 'code', null))
    }

    _sendSubscription(){
        console.log(this.sendSubscriptionRequest)
        this._checkBeforeSend()
        if(!_.size(_.get(this, 'requestError', []))){
            this.api.fhc().MhmController().sendSubscriptionUsingPOST(
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
                _.get(this.sendSubscriptionRequest, 'isRecovery', false),
                _.get(this.sendSubscriptionRequest, 'isTestForNotify', false),
                this.cleanData( _.get(this.sendSubscriptionRequest, 'patientSsin', null)),
                !_.get(this.sendSubscriptionRequest, 'patientSsin', null) ? this.cleanData(_.get(this.sendSubscriptionRequest, 'patientIo', null)) : null,
                !_.get(this.sendSubscriptionRequest, 'patientSsin', null) ? this.cleanData(_.get(this.sendSubscriptionRequest, 'patientIoMembership', null)) : null)
                .then(mhmResponse => {
                    console.log(mhmResponse)
                    this.set('sendSubscriptionResponse', mhmResponse)
                    if(_.get(mhmResponse, 'reference', null)) {
                        this.push('patient.medicalHouseContracts', {
                            contractId: _.get(mhmResponse, 'reference', null),
                            mmNihii: _.get(this.hcp, 'nihii', null),
                            hcpId: _.get(this.hcp, 'id', null),
                            startOfContract: _.get(mhmResponse, 'inscriptionDate', null),
                            startOfCoverage: _.get(mhmResponse, 'subscriptionsStartDate', null),
                            endOfContract: null,
                            endOfCoverage: null,
                            gp:_.get(this.sendSubscriptionRequest, 'doctor', false),
                            kine: _.get(this.sendSubscriptionRequest, 'physio', false),
                            nurse: _.get(this.sendSubscriptionRequest, 'nurse', false),
                            status: 1 << 1,
                            signatureType: _.camelCase(_.get(this.sendSubscriptionRequest, 'signatureType', null))
                        })
                        Promise.all([
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
                        ])
                            .then(([xades,soap,request,response, soapRequest]) => Promise.all([
                                _.get(xades,"id",false) && _.get(mhmResponse,"xades",false) && this.api.receipt().setAttachment(xades.id, "xades", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(atob(mhmResponse.xades))))) || Promise.resolve(xades),
                                _.get(soap,"id",false) && _.get(mhmResponse,"mycarenetConversation.soapResponse",false) && this.api.receipt().setAttachment(soap.id, "soapResponse", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(mhmResponse.mycarenetConversation.soapResponse)))) || Promise.resolve(soap),
                                _.get(request,"id",false) && _.get(mhmResponse,"mycarenetConversation.transactionRequest",false) && this.api.receipt().setAttachment(request.id, "kmehrRequest", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(mhmResponse.mycarenetConversation.transactionRequest)))) || Promise.resolve(request),
                                _.get(response,"id",false) && _.get(mhmResponse,"mycarenetConversation.transactionResponse",false) && this.api.receipt().setAttachment(response.id, "kmehrResponse", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(mhmResponse.mycarenetConversation.transactionResponse)))) || Promise.resolve(response),
                                _.get(soapRequest,"id",false) && _.get(mhmResponse,"mycarenetConversation.soapRequest",false) && this.api.receipt().setAttachment(soapRequest.id, "soapRequest", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(mhmResponse.mycarenetConversation.soapRequest)))) || Promise.resolve(soapRequest)
                            ]))
                            .then(([xades,soap,request,response, soapRequest]) => {
                                const mhc=this.patient.medicalHouseContracts.find(m => m.contractId=== _.get(mhmResponse, 'reference', null))
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
                            })
                            .finally(()=>{
                                this._updatePatient()
                            })
                    }
                })

        }

    }

    _checkBeforeSend(){
        this.set("requestError", [])
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

        !_.get(this.sendSubscriptionRequest, 'patientSsin', null) ? !_.get(this.sendSubscriptionRequest, 'patientIo', null) ? error.push("mhm-patient-io-error") : null : null
        !_.get(this.sendSubscriptionRequest, 'patientSsin', null) ? !_.get(this.sendSubscriptionRequest, 'patientIoMembership', null) ? error.push("mhm-patient-io-membership-error") : null : null

        this.set("requestError", error)
    }

    _updatePatient(){
        this.api.patient().modifyPatientWithUser(this.user, this.patient)
            .then(pat => this.set('patient', this.api.register(pat, 'patient')))
            .finally(() => {
                this._displayResultTab()
            })
    }

    _displayResultTab(){
        this.dispatchEvent(new CustomEvent("subscription-result", { composed: true, bubbles: true, detail: { subscriptionResultDetail: {commonOutput: _.get(this.sendSubscriptionResponse, 'commonOutput', {}), mycarenetConversation: _.get(this.sendSubscriptionResponse, 'mycarenetConversation', {})}} }))
    }

    _formatNiss(niss){
        return niss ? ("" + niss).replace(/([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{3})([0-9]{2})/, '$1.$2.$3-$4.$5') : ''
    }

    _getLabel(item){
        return _.get(item, this.language, null)
    }

    cleanData(data){
        return data && data.replace(/ /g, "").replace(/-/g,"").replace(/\./g,"").replace(/_/g,"").replace(/\//g,"")
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

    _getErrorMessage(error){
        return this.localize(error, error, this.language)
    }

    _isRequestError(errorList){
        return !!_.size(errorList)
    }

    _getMcnErrorMessage(errorMessage){
        return _.get(errorMessage, "code", null)+' - '+(this.language === "fr" ? _.get(errorMessage, "msgFr", null) : this.language === "nl" ? _.get(errorMessage, "msgNl", null) : _.get(errorMessage, "msgEn", null))
    }

    _subscriptionInPastFlagChanged(e){
        if(_.get(e, 'target', null)){
            this.set('sendSubscriptionRequest.isTestForNotify', _.get(e, 'target.checked', false))
        }
    }

    _getGenericErrorMessage(e){
        return _.get(e, 'faultSource', null)+' '+_.get(e, 'faultCode', null)
    }

    _selectedCoverageTypeChanged(e){
        if(_.get(e, 'target', null) && _.get(e, 'target.id', null)){
            _.get(e, 'target.id', null) === "doctorType" ?
                this.set('sendSubscriptionRequest.doctor',  _.get(e, 'target.checked', false)) :
                _.get(e, 'target.id', null) === "physioType" ?
                    this.set("sendSubscriptionRequest.physio",  _.get(e, 'target.checked', false)) :
                    _.get(e, 'target.id', null) === "nurseType" ?
                        this.set("sendSubscriptionRequest.nurse",  _.get(e, 'target.checked', false)) :
                        null
        }
    }

    _isCoverageAvailable(coverageType){
        const doctor = _.size(_.get(this.hcp, 'nihii', null)) === 11 ? _.get(this.hcp, 'nihii', null).substr(8, 1) === "1" : false
        const physio = _.size(_.get(this.hcp, 'nihii', null)) === 11 ? _.get(this.hcp, 'nihii', null).substr(9, 1) === "1" : false
        const nurse = _.size(_.get(this.hcp, 'nihii', null)) === 11 ? _.get(this.hcp, 'nihii', null).substr(10, 1) === "1" : false

        return coverageType === "doctor" ? doctor : coverageType === "physio" ? physio : coverageType === "nurse" ? nurse : false
    }


}

customElements.define(HtPatSubscriptionSendSubscription.is, HtPatSubscriptionSendSubscription);
