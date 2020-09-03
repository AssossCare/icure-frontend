import '@vaadin/vaadin-icons/vaadin-icons'
import '@vaadin/vaadin-date-picker/vaadin-date-picker'
import '@vaadin/vaadin-text-field/vaadin-text-field'
import '@vaadin/vaadin-checkbox/vaadin-checkbox'
import '@vaadin/vaadin-combo-box/vaadin-combo-box'
import '@vaadin/vaadin-text-field/vaadin-text-area'
import '@polymer/paper-dialog/paper-dialog'
import '@polymer/paper-button/paper-button'
import '@polymer/paper-card/paper-card'
import '@polymer/paper-listbox/paper-listbox'
import '@polymer/paper-item/paper-icon-item'
import '@polymer/paper-fab/paper-fab'
import '@polymer/paper-icon-button/paper-icon-button'
import '@polymer/paper-styles/shadow'
import '@polymer/iron-resizable-behavior/iron-resizable-behavior'

import '../../../dynamic-form/dynamic-link.js'
import '../../../dynamic-form/dynamic-pills.js'
import '../../../ht-spinner/ht-spinner.js'
import '../../../dynamic-form/dynamic-doc.js'
import '../../../collapse-button/collapse-button.js'
import '../../../../styles/dialog-style.js'
import '../../../../styles/scrollbar-style.js'
import '../../../../styles/buttons-style.js'
import '../../../../styles/paper-tabs-style.js'
import '../../../dynamic-form/dynamic-text-field.js'
import '../../../../styles/notification-style.js'

import './ht-pat-subscription-send-subscription'
import './ht-pat-subscription-cancel-subscription'
import './ht-pat-subscription-notify-subscription-closure'
import './ht-pat-subscription-technical-info'


import moment from 'moment/src/moment'
import {TkLocalizerMixin} from "../../../tk-localizer"
import {PolymerElement, html} from '@polymer/polymer'

class HtPatSubscriptionDetail extends TkLocalizerMixin(PolymerElement) {

    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">
            #subscriptionDetailDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .subscriptionDetailDialog{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .subscription-content{
                display: flex;
                width: 100%;
                position: relative;
                height: 100%;
                background-color: white;
            }

            .subscription-view{
                width: 100%;
                height: 100%;
                overflow: auto;
            }

            .page-content{
                padding: 12px;
                width: auto;
                box-sizing: border-box;
                height: calc(100% - 50px);
            }

            iron-pages{
                height: calc(100% - 48px);
                width: auto;
                overflow: auto;
            }

            .subscription-container{
                height: 100%;
                width: 98%;
                margin: 1%;
            }

            .medical-house-result-container{
                height: auto;
                width: auto;
            }

            .subscription-history-container{

            }

            .mhm-sub-container{
                height: auto;
                width: auto;
                margin: 10px;
                border: 1px solid var(--app-background-color-dark);
            }

            .mhm-person-container{
                height: auto;
                position: relative;
                width: auto;
                border: 1px solid var(--app-background-color-dark);
            }

            .mhm-person-container.cancelled::after{
                content: "Abonnement annulé";
                background: rgba(90,0,0,.7019607843137254);
                height: calc(100% - 75px);
                width: 100%;
                position: absolute;
                z-index: 10;
                margin: 20px 0 0 0;
                text-align: center;
                padding-top: 55px;
                font-size: 1.7em;
                color: #fff;
                font-weight: 700;
                top: 0;
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

            .infoBtn{
                height: 16px;
                width: 16px;
                padding: 2px;
                cursor: pointer;
                float: right;
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

            paper-menu-button {
                padding:0;
            }

            paper-menu-button paper-listbox {
                padding:0!important;
            }

            paper-menu-button paper-listbox paper-item {
                padding:0 8px!important;
                font-size: var(--font-size-normal);
            }

            .btn-20{
                height: 20px;
                width: 20px;
                float: right;
                z-index: 20;
            }

        </style>

        <paper-dialog id="subscriptionDetailDialog">
            <div class="subscriptionDetailDialog">
                <div class="subscription-content">
                    <div class="subscription-view">
                        <paper-tabs selected="{{tabs}}">
                            <paper-tab>
                                <iron-icon class="tabIcon" icon="icons:note-add"></iron-icon> [[localize('mhm-sub-info','Subscription informations',language)]]
                            </paper-tab>
                            <template is="dom-if" if="[[isNewSubscription]]" restamp="true">
                                <paper-tab>
                                    <iron-icon class="tabIcon" icon="icons:note-add"></iron-icon> [[localize('mhm-send-subscription','Send subscription',language)]]
                                </paper-tab>
                            </template>
                            <template is="dom-if" if="[[isCancelSubscription]]" restamp="true">
                                <paper-tab>
                                    <iron-icon class="tabIcon" icon="icons:close"></iron-icon> [[localize('mhm-cancel-subscription','Cancel subscription',language)]]
                                </paper-tab>
                            </template>
                             <template is="dom-if" if="[[isNotifySubscriptionClosure]]" restamp="true">
                                <paper-tab>
                                    <iron-icon class="tabIcon" icon="icons:last-page"></iron-icon> [[localize('mhm-notify-subscription-closure','Notify subscription closure',language)]]
                                </paper-tab>
                             </template>
                            <template is="dom-if" if="[[_isTechnicalInfo(subscriptionResultDetail, subscriptionResultDetail.*)]]" restamp="true">
                                <paper-tab>
                                    <iron-icon class="tabIcon" icon="vaadin:tools"></iron-icon> [[localize('mda-technical-info','Technical info',language)]]
                                </paper-tab>
                            </template>
                        </paper-tabs>
                        <iron-pages selected="[[tabs]]">
                            <page>
                               <div class="page-content">
                                   <div class="subscription-container">
                                       <template is="dom-if" if="[[_isMedicalHouseContractFromMda(mdaResult, mdaResult.*)]]">
                                           <div class="medical-house-result-container">
                                               <ht-pat-subscription-mda-medical-house-result id="htPatSubscriptionMdaMedicalHouseResult" api="[[api]]" i18n="[[i18n]]" user="[[user]]" patient="[[patient]]" language="[[language]]" resources="[[resources]]" mda-result="[[mdaResult]]"></ht-pat-subscription-mda-medical-house-result>
                                           </div>
                                       </template>

                                       <div class="subscription-history-container">
                                           <div class="mhm-sub-container">
                                               <div class="mhm-person-container">
                                                   <div class="headerMasterTitle headerLabel">[[localize('mhm-sub-history', 'Subscription history', language)]]</div>
                                                   <div class="mhm-person-container-content">
                                                       <template is="dom-repeat" items="[[medicalHouseContracts]]" as="mhc">
                                                           <div class\$="mhm-person-container mt10 [[_isCancelledSubscription(mhc)]]">
                                                               <div class="headerMasterTitle headerLabel">
                                                                   [[localize('mhm-sub', 'Subscription', language)]]: [[mhc.contractId]]
                                                                   <paper-tooltip position="bottom" for="dl-master"></paper-tooltip>
                                                                   <paper-menu-button class="btn-20" horizontal-align="right" dynamic-align="true" vertical-offset="26">
                                                                       <paper-icon-button id="dl-master" class="button--icon-btn" icon="icons:info-outline" slot="dropdown-trigger" alt="menu"></paper-icon-button>
                                                                       <paper-listbox slot="dropdown-content">
                                                                           <template is="dom-repeat" items="[[mhc.receiptsList]]" as="rc">
                                                                               <paper-item id="[[rc.id]]" on-tap="_download">[[_localizeReceipts(rc.descr)]]</paper-item>
                                                                           </template>
                                                                       </paper-listbox>
                                                                   </paper-menu-button>
                                                               </div>
                                                               <div class="headerInfoLine">
                                                                   <div class="headerInfoField">
                                                                       <span class="headerLabel">[[localize('mhm-medical-house', 'Medical house', language)]]: &nbsp;</span> [[mhc.medicalHouseName]]
                                                                   </div>
                                                               </div>
                                                               <div class="headerInfoLine">
                                                                   <div class="headerInfoField">
                                                                       <span class="headerLabel">[[localize('mhm-sub-start-contract', 'Signature date', language)]]: &nbsp;</span> [[_formatContractDate(mhc.startOfContract)]]
                                                                   </div>
                                                                   <div class="headerInfoField">
                                                                       <span class="headerLabel">[[localize('mhm-sub-start-coverage', 'Start of coverage', language)]]: &nbsp;</span> [[_formatContractDate(mhc.startOfCoverage)]]
                                                                   </div>
                                                                   <div class="headerInfoField">
                                                                       <span class="headerLabel">[[localize('mhm-sub-end-contract', 'End of contract', language)]]: &nbsp;</span> [[_formatContractDate(mhc.endOfContract)]]
                                                                   </div>
                                                                   <div class="headerInfoField">
                                                                       <span class="headerLabel">[[localize('mhm-sub-end-coverage', 'End of coverage', language)]]: &nbsp;</span> [[_formatContractDate(mhc.endOfCoverage)]]
                                                                   </div>
                                                               </div>
                                                               <div class="headerInfoLine">
                                                                   <div class="headerInfoField">
                                                                       <span class="headerLabel">[[localize('mhm-sub-sign-type', 'Signature type', language)]]: &nbsp;</span> [[mhc.hrSignatureType]]
                                                                   </div>
                                                                   <div class="headerInfoField">
                                                                       <span class="headerLabel">[[localize('mhm-sub-trial', 'Trial period', language)]]: &nbsp;</span> [[_isTrialPeriod(mhc)]]
                                                                   </div>
                                                                   <div class="headerInfoField">
                                                                       <span class="headerLabel">[[localize('mhm-flatrate-type', 'Flatrate type', language)]]: &nbsp;</span> [[mhc.hrFlatRateType]]
                                                                   </div>
                                                               </div>
                                                               <div class="headerInfoLine">
                                                                   <div class="headerInfoField">
                                                                       <span class="headerLabel">[[localize('mhm-sub-status', 'Status', language)]]: &nbsp;</span> </span> <span class\$="subscription-status [[_getIconStatusClass(mhc)]]"><iron-icon icon="vaadin:circle" class\$="statusIcon [[_getIconStatusClass(mhc)]]"></iron-icon> [[mhc.hrStatus]]</span>
                                                                   </div>
                                                                   <template is="dom-if" if="[[_isClosure(mhc)]]">
                                                                       <div class="headerInfoField">
                                                                           <span class="headerLabel">[[localize('mhm-clo-type', 'Cancellation by', language)]]: &nbsp;</span> [[mhc.hrClosureType]]
                                                                       </div>
                                                                       <div class="headerInfoField fw2">
                                                                           <span class="headerLabel">[[localize('mhm-rea-clo', 'Reason of cancellation', language)]]: &nbsp;</span> [[mhc.hrClosureReason]]
                                                                       </div>
                                                                   </template>
                                                               </div>
                                                           </div>
                                                       </template>
                                                   </div>
                                               </div>
                                           </div>
                                       </div>
                                    </div>
                                </div>
                            </page>
                            <template is="dom-if" if="[[isNewSubscription]]" restamp="true">
                                <page>
                                    <div class="page-content">
                                        <ht-pat-subscription-send-subscription id="htPatSubscriptionSendSubscription" api="[[api]]" i18n="[[i18n]]" user="[[user]]" patient="[[patient]]" language="[[language]]" resources="[[resources]]" current-contact="[[currentContact]]" hcp="[[hcp]]" patient-insurance-parent="[[patientInsuranceParent]]" date-range="[[dateRange]]" on-subscription-result="_displaySubscriptionResult"></ht-pat-subscription-send-subscription>
                                    </div>
                                </page>
                            </template>
                            <template is="dom-if" if="[[isCancelSubscription]]" restamp="true">
                                <page>
                                    <div class="page-content">
                                        <ht-pat-subscription-cancel-subscription id="htPatSubscriptionCancelSubscription" api="[[api]]" i18n="[[i18n]]" user="[[user]]" patient="[[patient]]" language="[[language]]" resources="[[resources]]" current-contact="[[currentContact]]" hcp="[[hcp]]" patient-insurance-parent="[[patientInsuranceParent]]" selected-medical-house-contract="[[selectedMedicalHouseContract]]" date-range="[[dateRange]]" on-subscription-result="_displaySubscriptionResult"></ht-pat-subscription-cancel-subscription>
                                    </div>
                                </page>
                            </template>
                            <template is="dom-if" if="[[isNotifySubscriptionClosure]]" restamp="true">
                                <page>
                                    <div class="page-content">
                                        <ht-pat-subscription-notify-subscription-closure id="htPatSubscriptionNotifySubscriptionClosure" api="[[api]]" i18n="[[i18n]]" user="[[user]]" patient="[[patient]]" language="[[language]]" resources="[[resources]]" current-contact="[[currentContact]]" hcp="[[hcp]]" patient-insurance-parent="[[patientInsuranceParent]]" subscription-closure-type-list="[[subscriptionClosureTypeList]]" subscription-closure-justification-list="[[subscriptionClosureJustificationList]]" date-range="[[dateRange]]" selected-medical-house-contract="[[selectedMedicalHouseContract]]" on-subscription-result="_displaySubscriptionResult"></ht-pat-subscription-notify-subscription-closure>
                                    </div>
                                </page>
                            </template>
                            <template is="dom-if" if="[[_isTechnicalInfo(subscriptionResultDetail, subscriptionResultDetail.*)]]" restamp="true">
                                <page>
                                    <div class="page-content">
                                        <ht-pat-subscription-technical-info id="htPatSubscriptionTechnicalInfo" api="[[api]]" i18n="[[i18n]]" user="[[user]]" patient="[[patient]]" language="[[language]]" resources="[[resources]]" hcp="[[hcp]]" subscription-result-detail="[[subscriptionResultDetail]]"></ht-pat-subscription-technical-info>
                                    </div>
                                </page>
                            </template>
                        </iron-pages>
                    </div>
                </div>
                <div class="buttons">
                    <template is="dom-if" if="[[_canDisplayButton(isNewSubscription, tabs)]]">
                        <paper-button class="button button--save" on-tap="_sendSubscription"><iron-icon icon="icons:note-add" class="mr5 smallIcon" ></iron-icon> [[localize('mhm-send-subscription','Send subscription',language)]]</paper-button>
                    </template>
                    <template is="dom-if" if="[[_canDisplayButton(isCancelSubscription, tabs)]]">
                        <paper-button class="button button--save" on-tap="_cancelSubscription"><iron-icon icon="icons:close" class="mr5 smallIcon" ></iron-icon> [[localize('mhm-cancel-subscription','Cancel subscription',language)]]</paper-button>
                    </template>
                    <template is="dom-if" if="[[_canDisplayButton(isNotifySubscriptionClosure, tabs)]]">
                        <paper-button class="button button--save" on-tap="_notifySubscriptionClosure"><iron-icon icon="icons:last-page" class="mr5 smallIcon" ></iron-icon> [[localize('mhm-notify-subscription-closure','Notify subscription closure',language)]]</paper-button>
                    </template>
                    <paper-button class="button button--other" on-tap="_closeDialog"><iron-icon icon="icons:close" class="mr5 smallIcon" ></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                </div>
            </div>
        </paper-dialog>
        `
    }

    static get is() {
        return 'ht-pat-subscription-detail'
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
            i18n: {
                type: Object,
                value: {}
            },
            resources: {
                type: Object,
                value: {}
            },
            language: {
                type: String
            },
            patient: {
                type: Object,
                value: () => {
                }
            },
            hcp: {
                type: Object,
                value: () => {
                }
            },
            tabs: {
                type: Number,
                value: 0
            },
            isLoading: {
                type: Boolean,
                value: false
            },
            mdaResult: {
                type: Object,
                value: () => {
                }
            },
            subscriptionResultDetail: {
                type: Object,
                value: () => {
                }
            },
            patientInsuranceParent: {
                type: Object,
                value: () => {
                }
            },
            medicalHouseList: {
                type: Array,
                value: function () {
                    return require('../mda/rsrc/listOfMedicalHouse.json')
                }
            },
            subscriptionClosureJustificationList: {
                type: Array,
                value: function () {
                    return require('./rsrc/listOfSubscriptionClosureJustification.json')
                }
            },
            subscriptionClosureTypeList: {
                type: Array,
                value: [
                    {code: "patientdecision", label: {fr: "Patient", nl: "Patiënt", en: "Patient"}},
                    {
                        code: "healthcarepartydecision",
                        label: {fr: "Maison médicale", nl: "Medisch huis", en: "Medical house"}
                    }
                ]
            },
            medicalHouseContracts: {
                type: Object,
                value: () => {
                }
            },
            selectedMedicalHouseContract: {
                type: Object,
                value: () => {
                }
            },
            isNewSubscription: {
                type: Boolean,
                value: false
            },
            isCancelSubscription: {
                type: Boolean,
                value: false
            },
            isNotifySubscriptionClosure: {
                type: Boolean,
                value: false
            },
            dateRange: {
                type: Object,
                value: () => {
                }
            }
        }
    }

    constructor() {
        super()
    }

    static get observers() {
        return []
    }

    ready() {
        super.ready()
    }

    _reset() {
        this.set('isNotifySubscriptionClosure', false)
        this.set('isCancelSubscription', false)
        this.set('isNewSubscription', false)
        this.set('subscriptionResultDetail', {})
        this.set('patientInsuranceParent', {})
        this.set('medicalHouseContracts', {})
        this.set('selectedMedicalHouseContract', {})
    }

    _openDialog() {
        this._reset()
        const insuranceId = _.get(_.get(this.patient, 'insurabilities', []).find(ass => _.get(ass, 'startDate', null) && !_.get(ass, 'endDate', null)), 'insuranceId', null)
        this.api.hcparty().getHealthcareParty(_.get(this.user, 'healthcarePartyId', null))
            .then(hcp => this.set('hcp', hcp))
            .then(() => (insuranceId ? this.api.insurance().getInsurance(insuranceId) : Promise.resolve({})))
            .then(ins => this.set('patientInsuranceParent', ins))
            .finally(() => {
                this.set('dateRange', {
                    minDate: moment().format("YYYY-MM-DD"),
                    maxDate: moment().add(1, 'years').format("YYYY-MM-DD")
                })
                this.set('tabs', 0)
                this._initializeMedicalHouseContract()
                this.shadowRoot.querySelector('#subscriptionDetailDialog') ? this.shadowRoot.querySelector('#subscriptionDetailDialog').open() : null
            })
    }

    _initializeMedicalHouseContract() {
        this.set('isNotifySubscriptionClosure', false)
        this.set('isCancelSubscription', false)
        this.set('isNewSubscription', false)

        Promise.all(
            _.uniqBy(_.get(this.patient, 'medicalHouseContracts', []), 'hcpId')
            .filter(mhc => !!mhc.hcpId)
            .map(mhc => this.api.hcparty().getHealthcareParty(mhc.hcpId).then(mhc.hcpId))).then(mmHcps => {

            this.set('medicalHouseContracts', _.orderBy(_.get(this.patient, 'medicalHouseContracts', []), 'startOfContract', 'desc').map(mhc => {
                const fallBackNihii = !!mhc.hcpId && mmHcps.find(hcp => hcp.id === mhc.hcpId) ? _.get(mmHcps.find(hcp => hcp.id === mhc.hcpId), 'nihii', null) : null
                return _.assign(mhc, {
                medicalHouseName: this._getMedicalHouse(_.get(mhc, 'mmNihii', fallBackNihii)),
                hrStatus: this._getSubscriptionStatus(mhc),
                hrFlatRateType: this._getFlatRateType(mhc),
                hrSignatureType: this._localizeSignatureType(_.get(mhc, 'signatureType', null)),
                hrClosureReason: this._getClosureReason(mhc),
                hrClosureType: this._getClosureType(mhc),
                receiptsList: this._getReceiptsList(mhc)
            })
            }))

            this.set('selectedMedicalHouseContract', _.get(this, 'medicalHouseContracts', []).find(mhc => _.get(mhc, 'contractId', null) && !(_.get(mhc, 'status', null) & (1 << 2)) && !(_.get(mhc, 'status', null) & (1 << 3))))

            const now = moment().format('YYYY-MM-DD')
            this.set('isNotifySubscriptionClosure', _.size(_.get(this.patient, 'medicalHouseContracts', [])) && _.get(this.patient, 'medicalHouseContracts', []).find(mhs => _.get(mhs, 'contractId', null) && _.get(mhs, 'status', null) & (1 << 1) && _.get(mhs, 'startOfCoverage', null) && this.api.moment(now).isSameOrAfter(this.api.moment(_.get(mhs, 'startOfCoverage', null)).format('YYYY-MM-DD')) && !_.get(mhs, 'endOfCoverage', null) && !_.get(mhs, 'endOfContract', null)))
            this.set('isCancelSubscription', _.size(_.get(this.patient, 'medicalHouseContracts', [])) && _.get(this.patient, 'medicalHouseContracts', []).find(mhs => _.get(mhs, 'contractId', null) && _.get(mhs, 'status', null) & (1 << 1) && _.get(mhs, 'startOfCoverage', null) && this.api.moment(now).isBefore(this.api.moment(_.get(mhs, 'startOfCoverage', null)).format('YYYY-MM-DD')) && !_.get(mhs, 'endOfCoverage', null) && !_.get(mhs, 'endOfContract', null)))
            this.set('isNewSubscription', _.size(_.get(this.patient, 'medicalHouseContracts', [])) === 0 || _.size(_.get(this.patient, 'medicalHouseContracts', []).filter(mhs => (_.get(mhs, 'hrStatus', null) === 'En cours' && _.get(mhs, 'contractId', null)))) === 0)
           })
    }

    _isTechnicalInfo(subscriptionResultDetail) {
        return !!_.size(subscriptionResultDetail)
    }

    _canDisplayButton(displayTab, tab) {
        return displayTab && tab !== 0
    }

    _closeDialog() {
        this.shadowRoot.querySelector('#subscriptionDetailDialog') ? this.shadowRoot.querySelector('#subscriptionDetailDialog').close() : null
    }

    _sendSubscription() {
        this.shadowRoot.querySelector("#htPatSubscriptionSendSubscription")._sendSubscription()
    }

    _cancelSubscription() {
        this.shadowRoot.querySelector("#htPatSubscriptionCancelSubscription")._cancelSubscription()
    }

    _notifySubscriptionClosure() {
        this.shadowRoot.querySelector("#htPatSubscriptionNotifySubscriptionClosure")._notifySubscriptionClosure()
    }

    _displaySubscriptionResult(e) {
        if (_.get(e, 'detail.subscriptionResultDetail', null)) {
            this.set('subscriptionResultDetail', _.get(e, 'detail.subscriptionResultDetail', {}))
            this._initializeMedicalHouseContract()
            this.set('tabs', 0)
        }

    }

    _formatContractDate(date) {
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }

    _getFlatRateType(mhc) {
        const m = _.get(mhc, 'gp', false) ? 'M' : ""
        const k = _.get(mhc, 'kine', false) ? 'K' : ""
        const i = _.get(mhc, 'nurse', false) ? 'I' : ""

        return m + '' + k + '' + i
    }

    _getSubscriptionStatus(mhc) {
        return !!(_.get(mhc, 'status', null) & (1 << 3)) ? this.localize('mhm_stat_closed', 'Closed', this.language) + ' le ' + this._formatContractDate(_.get(mhc, 'endOfCoverage', null)) :
            !!(_.get(mhc, 'status', null) & (1 << 2)) ? this.localize('mhm_stat_cancelled', 'Cancelled', this.language) :
                !!(_.get(mhc, 'status', null) & (1 << 1)) ? this.localize('mhm_stat_ongoing', 'On going', this.language) :
                    this.localize('mhm_stat_other', 'Manual encoding', this.language)
    }

    _getIconStatusClass(mhc) {
        return !!(_.get(mhc, 'status', null) & (1 << 3)) ? "subscription-status--orangeStatus" :
            !!(_.get(mhc, 'status', null) & (1 << 2)) ? "subscription-status--redStatus" :
                !!(_.get(mhc, 'status', null) & (1 << 1)) ? "subscription-status--greenStatus" :
                    "subscription-status--blueStatus"
    }


    _isCancelledSubscription(mhc) {
        return !!(_.get(mhc, 'status', null) & (1 << 2)) ? 'cancelled' : null
    }

    _getMedicalHouse(nihii) {
        return _.get(this, 'medicalHouseList.medicalHouseList', []).find(mh => _.get(mh, 'nihii', null) === nihii) ? _.get(_.get(this, 'medicalHouseList.medicalHouseList', []).find(mh => _.get(mh, 'nihii', null) === nihii), 'name', null) + ' (' + this.api.formatInamiNumber(nihii) + ')' : this.api.formatInamiNumber(nihii)
    }

    _localizeSignatureType(signatureType) {
        return this.localize('mhm-' + signatureType, signatureType, this.language)
    }

    _isClosure(mhc) {
        return !!(_.get(mhc, 'status', null) & (1 << 3))
    }

    _getClosureType(mhc) {
        return this.localize('mhm-' + _.get(_.get(this, 'subscriptionClosureJustificationList', []).find(scj => _.parseInt(_.get(scj, 'code', null)) === _.get(mhc, 'unsubscriptionReasonId', '')), 'closureType', ""), _.get(_.get(this, 'subscriptionClosureJustificationList', []).find(scj => _.parseInt(_.get(scj, 'code', null)) === _.get(mhc, 'unsubscriptionReasonId', '')), 'closureType', ""), this.language)
    }

    _getClosureReason(mhc) {
        return _.get(_.get(this, 'subscriptionClosureJustificationList', []).find(scj => _.parseInt(_.get(scj, 'code', null)) === _.get(mhc, 'unsubscriptionReasonId', '')), 'label.' + this.language, "")
    }

    _isMedicalHouseContractFromMda() {
        return !!_.get(this.mdaResult, 'formatedResponse.medicalHouse', 0)
    }

    _getReceiptsList(mhc) {
        return Object.entries(_.get(mhc, 'receipts', [])).map(([key, value]) => {
            return {id: value, descr: key}
        })
    }

    _download(e) {
        e.stopPropagation()
        e.preventDefault()

        const idAttachment = e.target.id
        let mhc = this.medicalHouseContracts.find(m => m.receiptsList.find(rc => rc.id === idAttachment))

        var a = document.createElement('a')

        this.api.receipt().getReceipt(idAttachment)
            .then(receipt => {
                const key = Object.keys(receipt.attachmentIds)[0]
                return this.api.receipt().getReceiptAttachment(receipt.id, receipt.attachmentIds[key])
            })
            .then(attach => {
                a.href = window.URL.createObjectURL(new Blob([new Uint8Array(attach)]))
                a.download = `${mhc.contractId}_${mhc.receiptsList.find(rc => rc.id === idAttachment).descr}_${+new Date()}.xml`
                a.click()
                return null
            })
            .finally(() => a.remove())
    }

    _isTrialPeriod(mhc) {
        const startOfContract = _.get(mhc, 'startOfContract', null)
        const startOfCoverage = _.get(mhc, 'startOfCoverage', null)
        const isTrialPeriod = startOfContract && startOfCoverage ? this.api.moment(this.api.moment(startOfContract).startOf("month").add(2, 'month').format('YYYY-MM-DD')).isBefore(this.api.moment(startOfCoverage).format('YYYY-MM-DD')) : null

        return isTrialPeriod ? this.localize('mhm-yes', 'Yes', this.language) : this.localize('mhm-no', 'No', this.language)
    }

    _localizeReceipts(descr) {
        return this.localize('mhm-' + descr, descr, this.language)
    }

    _getGenericErrorMessage(e) {
        return _.get(e, 'faultSource', null) + ' ' + _.get(e, 'faultCode', null)
    }


}

customElements.define(HtPatSubscriptionDetail.is, HtPatSubscriptionDetail)