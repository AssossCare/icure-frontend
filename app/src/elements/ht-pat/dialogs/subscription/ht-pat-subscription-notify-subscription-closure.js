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
class HtPatSubscriptionNotifySubscriptionClosure extends TkLocalizerMixin(PolymerElement) {

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

            *.txtcolor--orangeStatus {
                color: var(--app-status-color-pending);
            }
            *.txtcolor--greenStatus {
                color: var(--app-status-color-ok);
            }
            *.txtcolor--redStatus {
                color: var(--app-status-color-nok);
            }
            *.txtcolor--blueStatus {
                color: var(--paper-blue-400);
            }

            .statusIcon.subscription-status--orangeStatus,
            .statusIcon.subscription-status--greenStatus,
            .statusIcon.subscription-status--redStatus {
                background: transparent !important;
            }

            .statusIcon.subscription-status--orangeStatus {
                color: var(--app-status-color-pending);
            }
            .statusIcon.subscription-status--greenStatus {
                color: var(--app-status-color-ok);
            }
            .statusIcon.subscription-status--redStatus {
                color: var(--app-status-color-nok);
            }
            .statusIcon.invoice-status--blueStatus {
                color: var(--paper-blue-400);
            }

            .subscription-status--orangeStatus{
                background: #fcdf354d;
            }
            .subscription-status--greenStatus{
                background: #07f8804d;
            }
            .subscription-status--redStatus{
                background: #ff4d4d4d;
            }
            .subscription-status--blueStatus {
                background: #84c8ff;
            }

            .statusIcon{
                height: 8px;
                width: 8px;
            }

            .subscription-status {
                border-radius: 20px;
                padding: 1px 12px 1px 8px;
                font-size: 12px;
                display: block;
                width: auto;
                max-width: fit-content;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .w100{
                width: 100%;
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
                                            <span class="headerLabel">[[localize('mhm-sub-pat-name', 'Name', language)]]: &nbsp;</span> [[notifySubscriptionClosureRequest.patientLastName]]
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-firstName', 'First name', language)]]: &nbsp;</span> [[notifySubscriptionClosureRequest.patientFirstName]]
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-gender', 'Gender', language)]]: &nbsp;</span> [[_localizeGender(notifySubscriptionClosureRequest.patientGender)]]
                                        </div>
                                    </div>
                                    <div class="headerInfoLine">
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-inss', 'Ssin', language)]]: &nbsp;</span> [[_formatNiss(notifySubscriptionClosureRequest.patientSsin)]]
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-io', 'Io', language)]]: &nbsp;</span> [[notifySubscriptionClosureRequest.patientIo]]
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-pat-iomembership', 'Io membership', language)]]: &nbsp;</span> [[notifySubscriptionClosureRequest.patientIoMembership]]
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="mhm-person-container mt10">
                                <div class="headerMasterTitle headerLabel">[[localize('mhm-sub', 'Subscription', language)]]: [[selectedMedicalHouseContract.contractId]]</div>
                                <div class="headerInfoLine">
                                    <div class="headerInfoField">
                                        <span class="headerLabel">[[localize('mhm-medical-house', 'Medical house', language)]]: &nbsp;</span> [[selectedMedicalHouseContract.medicalHouseName]]
                                    </div>
                                </div>
                                <div class="headerInfoLine">
                                    <div class="headerInfoField">
                                        <span class="headerLabel">[[localize('mhm-sub-start-contract', 'Start of contract', language)]]: &nbsp;</span> [[_formatContractDate(selectedMedicalHouseContract.startOfContract)]]
                                    </div>
                                    <div class="headerInfoField">
                                        <span class="headerLabel">[[localize('mhm-sub-start-coverage', 'Start of coverage', language)]]: &nbsp;</span> [[_formatContractDate(selectedMedicalHouseContract.startOfCoverage)]]
                                    </div>
                                    <div class="headerInfoField">
                                        <span class="headerLabel">[[localize('mhm-sub-end-contract', 'End of contract', language)]]: &nbsp;</span> [[_formatContractDate(selectedMedicalHouseContract.endOfContract)]]
                                    </div>
                                    <div class="headerInfoField">
                                        <span class="headerLabel">[[localize('mhm-sub-end-coverage', 'End of coverage', language)]]: &nbsp;</span> [[_formatContractDate(selectedMedicalHouseContract.endOfCoverage)]]
                                    </div>
                                </div>
                                <div class="headerInfoLine">
                                    <div class="headerInfoField">
                                        <span class="headerLabel">[[localize('mhm-sub-sign-type', 'Signature type', language)]]: &nbsp;</span> [[selectedMedicalHouseContract.hrSignatureType]]
                                    </div>
                                    <div class="headerInfoField">
                                        <span class="headerLabel">[[localize('mhm-sub-trial', 'Trial period', language)]]: &nbsp;</span>
                                    </div>
                                    <div class="headerInfoField">
                                        <span class="headerLabel">[[localize('mhm-flatrate-type', 'Flatrate type', language)]]: &nbsp;</span> [[selectedMedicalHouseContract.hrFlatRateType]]
                                    </div>
                                </div>
                                <div class="headerInfoLine">
                                    <div class="headerInfoField">
                                        <span class="headerLabel">[[localize('mhm-sub-status', 'Status', language)]]: &nbsp;</span> </span> <span class\$="subscription-status [[_getIconStatusClass(selectedMedicalHouseContract)]]"><iron-icon icon="vaadin:circle" class\$="statusIcon [[_getIconStatusClass(selectedMedicalHouseContract)]]"></iron-icon> [[selectedMedicalHouseContract.hrStatus]]</span>
                                    </div>
                                    <template is="dom-if" if="[[_isClosure(selectedMedicalHouseContract)]]">
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-clo-type', 'Cancellation by', language)]]: &nbsp;</span> [[selectedMedicalHouseContract.hrClosureType]]
                                        </div>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-rea-clo', 'Reason of cancellation', language)]]: &nbsp;</span> [[selectedMedicalHouseContract.hrClosureReason]]
                                        </div>
                                    </template>
                                </div>
                            </div>

                            <div class="mhm-person-container mt10">
                                <div class="headerMasterTitle headerLabel">[[localize('mhm-rea-clo', 'Reason of closure', language)]]</div>
                                <div class="headerInfoLine">
                                    <div class="headerInfoLine">
                                        <template is="dom-if" if="[[!isMedicalHouseClosure]]">
                                            <div class="headerInfoField">
                                                <vaadin-date-picker class="mtm2 mw0 mr1" label="[[localize('mhm-sub-end-contract', 'End of contract', language)]]" value="{{notifySubscriptionClosureRequest.subscriptionEndDate}}" i18n="[[i18n]]" min="[[dateRange.minDate]]" max="[[dateRange.maxDate]]"></vaadin-date-picker>
                                            </div>
                                        </template>
                                        <template is="dom-if" if="[[isMedicalHouseClosure]]">
                                            <div class="headerInfoField">
                                                <span class="headerLabel">[[localize('mhm-sub-end-contract', 'End of contract', language)]]: &nbsp;</span> [[_formatContractDate(notifySubscriptionClosureRequest.subscriptionEndDate)]]
                                            </div>
                                        </template>
                                        <div class="headerInfoField">
                                            <span class="headerLabel">[[localize('mhm-sub-end-coverage', 'End of coverage', language)]]: &nbsp;</span> [[_formatContractDate(notifySubscriptionClosureRequest.subscriptionRealEndDate)]]
                                        </div>
                                    </div>
                                    <div class="headerInfoLine">
                                        <div class="headerInfoField">
                                            <vaadin-combo-box class="w33 p4 mw0" label="[[localize('mhm-clo-type', 'Closure type', language)]]" selected-item="{{selectedSubscriptionClosureType}}"  filtered-items="[[subscriptionClosureTypeList]]" item-label-path="label.fr" >
                                                <template>[[_getLabel(item.label)]]</template>
                                            </vaadin-combo-box>
                                        </div>
                                        <div class="headerInfoField fw2">
                                            <vaadin-combo-box class="w33 p4 mw0 w100" label="[[localize('mhm-clo-just', 'Closure justification', language)]]" selected-item="{{selectedSubscriptionClosureJustification}}"  filtered-items="[[filteredSubscriptionClosureJustificationList]]" item-label-path="label.fr" >
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

            <template is="dom-if" if="[[_isRequestError(notifySubscriptionClosureResponse.errors)]]" restamp="true">
                <div class="error-container">
                    <div class="mhm-error-container-content">
                        <div class="mhm-sub-container-error">
                            <div class="headerMasterTitleError headerLabel">[[localize('mhm-mcn-error', 'Mcn error', language)]]</div>
                            <div class="mhm-container-error p4">
                                <template is="dom-repeat" items="[[notifySubscriptionClosureResponse.errors]]" as="error">
                                    <div>- [[_getMcnErrorMessage(error)]]</div>
                                </template>
                            </div>
                        </div>
                    </div>
                </div>
            </template>

            <template is="dom-if" if="[[_isRequestError(notifySubscriptionClosureResponse.genericErrors)]]" restamp="true">
                <div class="error-container">
                    <div class="mhm-error-container-content">
                        <div class="mhm-sub-container-error">
                            <div class="headerMasterTitleError headerLabel">[[localize('mhm-mcn-error', 'Mcn error', language)]]</div>
                            <div class="mhm-container-error p4">
                                <template is="dom-repeat" items="[[notifySubscriptionClosureResponse.genericErrors]]" as="error">
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
        return 'ht-pat-subscription-notify-subscription-closure';
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value: null,
                noReset: true
            },
            user: {
                type: Object,
                value: null,
                noReset: true
            },
            i18n:{
                type: Object,
                value: {},
                noReset: true
            },
            resources:{
                type: Object,
                value: {},
                noReset: true
            },
            language: {
                type: String,
                noReset: true
            },
            patient:{
                type: Object,
                value: () => {},
                noReset: true
            },
            hcp:{
                type: Object,
                value: () => {},
                noReset: true
            },
            tabs:{
                type: Number,
                value: 0
            },
            isLoading:{
                type: Boolean,
                value: false,
                noReset: true
            },
            mdaResult:{
                type: Object,
                value: () => {}
            },
            notifySubscriptionClosureRequest:{
                type: Object,
                value: {
                    patientFirstName: null,
                    patientLastName: null,
                    patientGender: null,
                    patientSsin: null,
                    patientIo: null,
                    patientIoMembership: null,
                    subscriptionReference: null,
                    subscriptionEndDate: null,
                    subscriptionClosureJustification: null,
                    subscriptionClosureType: null,
                    subscriptionRealEndDate: null
                }
            },
            notifySubscriptionClosureResponse:{
                type: Object,
                value: () => {}
            },
            selectedSubscriptionClosureType:{
                type: Object,
                value: () => {}
            },
            subscriptionClosureTypeList:{
                type: Array,
                value: () => []
            },
            selectedSubscriptionClosureJustification:{
                type: Object,
                value: () => {}
            },
            subscriptionClosureJustificationList:{
                type: Array,
                value: () => []
            },
            filteredSubscriptionClosureJustificationList:{
                type: Array,
                value: () => []
            },
            selectedMedicalHouseContract:{
                type: Object,
                value: () => {}
            },
            dateRange:{
                type: Object,
                value: () => {}
            },
            requestError:{
                type: Array,
                value: () => []
            },
            isMedicalHouseClosure: {
                type: Boolean,
                value: false
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return [
            '_initialize(api, user, patient, mdaResult)',
            '_selectedSubscriptionClosureJustificationChanged(selectedSubscriptionClosureJustification, selectedSubscriptionClosureJustification.*)',
            '_selectedSubscriptionClosureTypeChanged(selectedSubscriptionClosureType, selectedSubscriptionClosureType.*)',
            '_calculateSubscriptionEndDate(selectedSubscriptionClosureType, selectedSubscriptionClosureType.*, notifySubscriptionClosureRequest.subscriptionEndDate)'
        ];
    }

    ready() {
        super.ready();
    }

    _initialize(){
        this._reset()
        this.set('notifySubscriptionClosureRequest', {
            patientFirstName: _.get(this.patient, 'firstName', null),
            patientLastName: _.get(this.patient, 'lastName', null),
            patientGender: _.get(this.patient, 'gender', null),
            patientSsin: _.get(this.patient, 'ssin', null),
            patientIo: _.head(_.split(_.get(this.patientInsuranceParent, 'code', ''), ',')),
            patientIoMembership: this._getIoMembership(this.patient, this.mdaResult),
            subscriptionReference: _.get(this, 'selectedMedicalHouseContract.contractId', null),
            subscriptionEndDate: moment().format('YYYY-MM-DD'),
            subscriptionClosureJustification: _.get(this, 'subscriptionClosureJustificationList', []).find(ctype => _.get(ctype, 'code', null) === "201"),
            subscriptionClosureType: _.get(this, 'subscriptionClosureTypeList', []).find(ctype => _.get(ctype, 'code', null) === "patientdecision"),
            subscriptionRealEndDate: null
        })

        this.set("selectedSubscriptionClosureJustification", _.get(this, 'subscriptionClosureJustificationList', []).find(ctype => _.get(ctype, 'code', null) === "201"))
        this.set("selectedSubscriptionClosureType",_.get(this, 'subscriptionClosureTypeList', []).find(ctype => _.get(ctype, 'code', null) === "patientdecision"))
        this.set("filteredSubscriptionClosureJustificationList", _.get(this, 'subscriptionClosureJustificationList', []).filter(sct => _.get(sct, 'closureType', null) === "patientdecision"))

    }

    _reset(){
        this.set('notifySubscriptionClosureRequest', {})
        this.set('notifySubscriptionClosureResponse', {})
        this.set('selectedSubscriptionClosureType', {})
        this.set('selectedSubscriptionClosureJustification', {})
        this.set('isMedicalHouseClosure', false)
    }

    _notifySubscriptionClosure(){
        console.log(this.notifySubscriptionClosureRequest)

        this._checkBeforeSend()
        if(!_.size(_.get(this, 'requestError', []))){
            this.api.fhc().Mhm().notifySubscriptionClosureUsingPOST(
                _.get(this.api, "keystoreId", null),
                _.get(this.api, "tokenIdMH", null),
                _.get(this.api, "credentials.ehpassword", null),
                this.cleanData(_.get(this.hcp, "nihii", null)),
                _.get(this.hcp, 'name', null),
                _.get(this.notifySubscriptionClosureRequest, 'patientFirstName', null),
                _.get(this.notifySubscriptionClosureRequest, 'patientLastName', null),
                _.get(this.notifySubscriptionClosureRequest, 'patientGender', null),
                _.get(this.notifySubscriptionClosureRequest, 'subscriptionReference', null),
                _.parseInt(this.api.moment(_.get(this.notifySubscriptionClosureRequest, 'subscriptionEndDate', null)).format('YYYYMMDD')),
                _.get(this.notifySubscriptionClosureRequest, 'subscriptionClosureJustification', null),
                _.get(this.notifySubscriptionClosureRequest, 'subscriptionClosureType', null),
                this.cleanData( _.get(this.notifySubscriptionClosureRequest, 'patientSsin', null)),
                !_.get(this.notifySubscriptionClosureRequest, 'patientSsin', null) ? this.cleanData(_.get(this.notifySubscriptionClosureRequest, 'patientIo', null)) : null,
                !_.get(this.notifySubscriptionClosureRequest, 'patientSsin', null) ?this.cleanData(_.get(this.notifySubscriptionClosureRequest, 'patientIoMembership', null)) : null
            ).then(notifySubscriptionClosureResponse => {
                console.log(notifySubscriptionClosureResponse)
                this.set('notifySubscriptionClosureResponse', notifySubscriptionClosureResponse)

                if(_.get(notifySubscriptionClosureResponse, 'reference', null)){
                    let mhc = _.get(this.patient,'medicalHouseContracts', []).find(mhc => _.get(mhc, 'contractId', null) === _.get(this.notifySubscriptionClosureRequest, 'subscriptionReference', null))

                    mhc.endOfContract = _.parseInt(this.api.moment(_.get(this.notifySubscriptionClosureRequest, 'subscriptionEndDate', null)).format('YYYYMMDD'))
                    mhc.endOfCoverage = _.get(notifySubscriptionClosureResponse, 'subscriptionsEndDate', null)
                    mhc.status = (1 << 1) | (1 << 3)
                    mhc.unsubscriptionReasonId =  _.get(this.notifySubscriptionClosureRequest, 'subscriptionClosureJustification', null)

                    Promise.all([
                        this.api.receipticc.createReceipt({
                            documentId: _.get(notifySubscriptionClosureResponse, 'reference', null),
                            references: Object.values(notifySubscriptionClosureResponse.commonOutput),
                            category: "subscription",
                            subCategory:"xades"
                        }),
                        this.api.receipticc.createReceipt({
                            documentId: _.get(notifySubscriptionClosureResponse, 'reference', null),
                            references: Object.values(notifySubscriptionClosureResponse.commonOutput),
                            category: "subscription",
                            subCategory:"soapResponse"
                        }),
                        this.api.receipticc.createReceipt({
                            documentId: _.get(notifySubscriptionClosureResponse, 'reference', null),
                            references: Object.values(notifySubscriptionClosureResponse.commonOutput),
                            category: "subscription",
                            subCategory:"transactionRequest"
                        }),
                        this.api.receipticc.createReceipt({
                            documentId: _.get(notifySubscriptionClosureResponse, 'reference', null),
                            references: Object.values(notifySubscriptionClosureResponse.commonOutput),
                            category: "subscription",
                            subCategory:"transactionResponse"
                        }),
                        this.api.receipticc.createReceipt({
                            documentId: _.get(notifySubscriptionClosureResponse, 'reference', null),
                            references: Object.values(notifySubscriptionClosureResponse.commonOutput),
                            category: "subscription",
                            subCategory:"soapRequest"
                        })
                    ])
                        .then(([xades,soap,request,response, soapRequest]) => Promise.all([
                            _.get(xades,"id",false) && _.get(notifySubscriptionClosureResponse,"xades",false) && this.api.receipt().setReceiptAttachment(xades.id, "xades", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(atob(notifySubscriptionClosureResponse.xades))))) || Promise.resolve(xades),
                            _.get(soap,"id",false) && _.get(notifySubscriptionClosureResponse,"mycarenetConversation.soapResponse",false) && this.api.receipt().setReceiptAttachment(soap.id, "soapResponse", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(notifySubscriptionClosureResponse.mycarenetConversation.soapResponse)))) || Promise.resolve(soap),
                            _.get(request,"id",false) && _.get(notifySubscriptionClosureResponse,"mycarenetConversation.transactionRequest",false) && this.api.receipt().setReceiptAttachment(request.id, "kmehrRequest", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(notifySubscriptionClosureResponse.mycarenetConversation.transactionRequest)))) || Promise.resolve(request),
                            _.get(response,"id",false) && _.get(notifySubscriptionClosureResponse,"mycarenetConversation.transactionResponse",false) && this.api.receipt().setReceiptAttachment(response.id, "kmehrResponse", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(notifySubscriptionClosureResponse.mycarenetConversation.transactionResponse)))) || Promise.resolve(response),
                            _.get(soapRequest,"id",false) && _.get(notifySubscriptionClosureResponse,"mycarenetConversation.soapRequest",false) && this.api.receipt().setReceiptAttachment(soapRequest.id, "soapRequest", undefined, (this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.text2ua(notifySubscriptionClosureResponse.mycarenetConversation.soapRequest)))) || Promise.resolve(soapRequest)
                        ]))
                        .then(([xades,soap,request,response, soapRequest]) => {
                            if(!_.get(mhc,'receipts',false))mhc.receipts={}
                            if(_.get(xades,"id",false))
                                mhc.receipts.xadesClosure=xades.id
                            if(_.get(soap,"id",false))
                                mhc.receipts.soapClosure=soap.id
                            if(_.get(request,"id",false))
                                mhc.receipts.requestClosure=request.id
                            if(_.get(response,"id",false))
                                mhc.receipts.responseClosure=response.id
                            if(_.get(soapRequest,"id",false))
                                mhc.receipts.soapRequestClosure=soapRequest.id
                        }).finally(()=>{
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
        !_.get(this.notifySubscriptionClosureRequest, 'patientFirstName', null) ? error.push("mhm-patient-first-name-error") : null
        !_.get(this.notifySubscriptionClosureRequest, 'patientLastName', null) ? error.push("mhm-patient-last-name-error") : null
        !_.get(this.notifySubscriptionClosureRequest, 'patientGender', null) ? error.push("mhm-patient-gender-error") : null
        !_.get(this.notifySubscriptionClosureRequest, 'subscriptionReference', null) ? error.push("mhm-subscription-reference-error") : null
        !_.get(this.notifySubscriptionClosureRequest, 'subscriptionEndDate', null) ? error.push("mhm-subscription-end-date-error") : null
        !_.get(this.notifySubscriptionClosureRequest, 'subscriptionClosureJustification', null) ? error.push("mhm-subscription-closure-justification-error") : null
        !_.get(this.notifySubscriptionClosureRequest, 'subscriptionClosureType', null) ? error.push("mhm-subscription-closure-type-error") : null
        //!_.get(this.notifySubscriptionClosureRequest, 'patientSsin', null) ? error.push("mhm-patient-ssin-error") : null
        _.get(this.notifySubscriptionClosureRequest, 'patientSsin', null) ? !this.api.patient().isValidSsin(_.get(this.notifySubscriptionClosureRequest, 'patientSsin', null)) ? error.push("mhm-patient-ssin-format-error") : null : null
        !_.get(this.hcp, "nihii", null) ? !_.get(this.notifySubscriptionClosureRequest, 'patientIo', null) ? error.push("mhm-patient-io-error") : null : null
        !_.get(this.hcp, "nihii", null) ? !_.get(this.notifySubscriptionClosureRequest, 'patientIoMembership', null) ? error.push("mhm-patient-io-membership-error") : null : null

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
        this.dispatchEvent(new CustomEvent("subscription-result", { composed: true, bubbles: true, detail: { subscriptionResultDetail: {commonOutput: _.get(this.notifySubscriptionClosureResponse, 'commonOutput', {}), mycarenetConversation: _.get(this.notifySubscriptionClosureResponse, 'mycarenetConversation', {})}} }))
    }

    cleanData(data){
        return data && data.replace(/ /g, "").replace(/-/g,"").replace(/\./g,"").replace(/_/g,"").replace(/\//g,"")
    }

    _formatNiss(niss){
        return niss ? ("" + niss).replace(/([0-9]{2})([0-9]{2})([0-9]{2})([0-9]{3})([0-9]{2})/, '$1.$2.$3-$4.$5') : ''
    }

    _selectedSubscriptionClosureJustificationChanged(){
        this.set("notifySubscriptionClosureRequest.subscriptionClosureJustification", _.get(_.get(this, 'subscriptionClosureJustificationList', []).find(ctype => _.get(ctype, 'code', null) === _.get(this.selectedSubscriptionClosureJustification, 'code', '')), 'code', null))
    }

    _selectedSubscriptionClosureTypeChanged(){
        this.set('isMedicalHouseClosure', false)
        this.set("notifySubscriptionClosureRequest.subscriptionClosureType", _.get(_.get(this, 'subscriptionClosureTypeList', []).find(ctype => _.get(ctype, 'code', null) === _.get(this.selectedSubscriptionClosureType, 'code', '')), 'code', null))
        this.set("filteredSubscriptionClosureJustificationList", _.get(this, 'subscriptionClosureJustificationList', []).filter(sct => _.get(sct, 'closureType', null) === _.get(this, 'notifySubscriptionClosureRequest.subscriptionClosureType', null)))
        this.set("selectedSubscriptionClosureJustification", _.get(this, 'notifySubscriptionClosureRequest.subscriptionClosureType', null) === "patientdecision" ? _.get(this, 'subscriptionClosureJustificationList', []).find(ctype => _.get(ctype, 'code', null) === "201") : _.get(this, 'subscriptionClosureJustificationList', []).find(ctype => _.get(ctype, 'code', null) === "101"))
        _.get(this, 'notifySubscriptionClosureRequest.subscriptionClosureType', null) === "patientdecision" ? this.set('isMedicalHouseClosure', false) : this.set('isMedicalHouseClosure', true)
    }

    _localizeGender(gender){
        return this.localize(gender, gender, this.language)
    }

    _getIoMembership(patient, mdaResult){
        return _.get(_.get(patient, 'insurabilities', []).find(ass => _.get(ass, 'startDate', null) && !_.get(ass, 'endDate', null)), 'identificationNumber', null)
    }

    _calculateSubscriptionEndDate(){

        const endDate = _.get(this.notifySubscriptionClosureRequest, 'subscriptionEndDate', null)
        const closureType = _.get(this.notifySubscriptionClosureRequest, 'subscriptionClosureType', null)

        const realEndDate = closureType === 'patientdecision' ?
            endDate ?
                this.api.moment(endDate).endOf("month").format('YYYY-MM-DD') :
                null :
            closureType === "healthcarepartydecision" ?
                endDate ?
                    this.api.moment(endDate).isSameOrBefore(this.api.moment(endDate).format('YYYY-MM-')+"15") ? this.api.moment(endDate).endOf("month").format('YYYY-MM-DD') : this.api.moment(endDate).add(1, 'month').endOf("month").format('YYYY-MM-DD') :
                    null :
                null

        this.set('notifySubscriptionClosureRequest.subscriptionRealEndDate', realEndDate)
    }

    _getLabel(item){
        return _.get(item, this.language, null)
    }

    _formatContractDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }

    _getIconStatusClass(mhc){
        return !!(_.get(mhc, 'status', null) & (1 << 3)) ? "subscription-status--orangeStatus" :
            !!(_.get(mhc, 'status', null) & (1 << 2)) ? "subscription-status--redStatus":
                !!(_.get(mhc, 'status', null) & (1 << 1)) ?  "subscription-status--greenStatus":
                    "subscription-status--blueStatus"
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

    _isClosure(mhc){
        return !!(_.get(mhc, 'status', null) & (1 << 3))
    }

    _getGenericErrorMessage(e){
        return _.get(e, 'faultSource', null)+' '+_.get(e, 'faultCode', null)
    }


}

customElements.define(HtPatSubscriptionNotifySubscriptionClosure.is, HtPatSubscriptionNotifySubscriptionClosure);