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

import './ht-pat-subscription-send-recovery'

import moment from 'moment/src/moment';
import {TkLocalizerMixin} from "../../../tk-localizer";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatSubscriptionRecovery extends TkLocalizerMixin(PolymerElement) {

    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">
            #subscriptionRecoveryDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .subscriptionRecoveryDialog{
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
                height: 90px;
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

        </style>

        <paper-dialog id="subscriptionRecoveryDialog">
            <div class="subscriptionRecoveryDialog">
                <div class="subscription-content">
                    <div class="subscription-view">
                        <paper-tabs selected="{{tabs}}">
                            <paper-tab>
                                <iron-icon class="tabIcon" icon="icons:note-add"></iron-icon> [[localize('mhm-send-recovery','Envoyer reprise',language)]]
                            </paper-tab>
                            <template is="dom-if" if="[[_isTechnicalInfo(subscriptionResultDetail, subscriptionResultDetail.*)]]" restamp="true">
                                <paper-tab>
                                    <iron-icon class="tabIcon" icon="vaadin:tools"></iron-icon> [[localize('mhm-technical-info','Technical info',language)]]
                                </paper-tab>
                            </template>
                        </paper-tabs>
                        <iron-pages selected="[[tabs]]">
                            <page>
                                <div class="page-content">
                                    <ht-pat-subscription-send-recovery id="htPatSubscriptionSendRecovery" api="[[api]]" i18n="[[i18n]]" user="[[user]]" patient="[[patient]]" language="[[language]]" resources="[[resources]]" current-contact="[[currentContact]]" hcp="[[hcp]]" patient-insurance-parent="[[patientInsuranceParent]]" on-recovery-status="_recoveryStatus"></ht-pat-subscription-send-recovery>
                                </div>
                            </page>
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
                    <template is="dom-if" if="[[canRecovery]]">
                        <paper-button class="button button--save" on-tap="_sendRecovery"><iron-icon icon="icons:note-add" class="mr5 smallIcon" ></iron-icon> [[localize('mhm-send-recovery','Lancer reprise',language)]]</paper-button>
                    </template>
                    <template is="dom-if" if="[[canDownload]]">
                        <paper-button class="button button--save" on-tap="_getLogReport"><iron-icon icon="icons:note-add" class="mr5 smallIcon" ></iron-icon> [[localize('mhm-recovery-log','Télécharger log',language)]]</paper-button>
                    </template>
                    <paper-button class="button button--other" on-tap="_closeDialog"><iron-icon icon="icons:close" class="mr5 smallIcon" ></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                </div>
            </div>
        </paper-dialog>
        `
    }

    static get is() {
        return 'ht-pat-subscription-recovery';
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
            subscriptionResultDetail:{
                type: Object,
                value: () => {}
            },
            patientInsuranceParent:{
                type: Object,
                value: () => {}
            },
            medicalHouseList:{
                type: Array,
                value: function () {
                    return require('../mda/rsrc/listOfMedicalHouse.json');
                }
            },
            subscriptionClosureJustificationList:{
                type: Array,
                value: function () {
                    return require('./rsrc/listOfSubscriptionClosureJustification.json');
                }
            },
            subscriptionClosureTypeList:{
                type: Array,
                value: [
                    {code: "patientdecision", label: {fr: "Patient", nl: "Patiënt", en: "Patient"}},
                    {code: "healthcarepartydecision", label: {fr: "Maison médicale", nl: "Medisch huis", en: "Medical house"}}
                ]
            },
            medicalHouseContracts:{
                type: Object,
                value: () => {}
            },
            canRecovery:{
                type: Boolean,
                value: false
            },
            canDownload:{
                type: Boolean,
                value: false
            },
            recoveryStatus:{
                type: Object,
                value: {}
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return ['_handleRecoveryStatus(recoveryStatus)'];
    }

    ready() {
        super.ready();
    }

    _reset(){
        this.set('canRecovery', false)
        this.set('canDownload', false)
        this.set('recoveryStatus', {})
    }

    _openDialog(){
        this._reset()
        this.shadowRoot.querySelector("#htPatSubscriptionSendRecovery")._initialize();
        // const insuranceId = _.get(_.get(this.patient, 'insurabilities', []).find(ass => _.get(ass, 'startDate', null) && !_.get(ass, 'endDate', null)), 'insuranceId', null)
        // this.api.hcparty().getHealthcareParty(_.get(this.user, 'healthcarePartyId', null))
        //     .then(hcp => this.set('hcp', hcp))
        //     .then(() => ( insuranceId ? this.api.insurance().getInsurance(insuranceId) : Promise.resolve({})))
        //     .then(ins => this.set('patientInsuranceParent', ins))
        //     .finally(() => {
        //         this.set('tabs', 0)
        //         this._initializeMedicalHouseContract()
        this.$['subscriptionRecoveryDialog'].open()
        //     })
    }



    _isTechnicalInfo(subscriptionResultDetail){
        return !!_.size(subscriptionResultDetail)
    }

    _canDisplayButton(displayTab, tab){
        return displayTab && tab !== 0
    }

    _closeDialog(){
        this.$['subscriptionRecoveryDialog'].close()
    }

    _sendRecovery(){
        this.shadowRoot.querySelector("#htPatSubscriptionSendRecovery")._sendRecovery()
    }

    _getLogReport(){
        this.shadowRoot.querySelector("#htPatSubscriptionSendRecovery")._getLogReport()
    }

    _displaySubscriptionResult(e){
        if(_.get(e, 'detail.subscriptionResultDetail', null)){
            this.set('subscriptionResultDetail', _.get(e, 'detail.subscriptionResultDetail', {}))
            this._initializeMedicalHouseContract()
            this.set('tabs', 0)
        }

    }

    _formatContractDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }

    _getFlatRateType(mhc){
        const m = _.get(mhc, 'gp', false) ? 'M' : ""
        const k = _.get(mhc, 'kine', false) ? 'K' : ""
        const i = _.get(mhc, 'nurse', false) ? 'I' : ""

        return m+''+k+''+i
    }

    _getSubscriptionStatus(mhc){
        return !!(_.get(mhc, 'status', null) & (1 << 3)) ? this.localize('mhm_stat_closed','Closed',this.language):
            !!(_.get(mhc, 'status', null) & (1 << 2)) ? this.localize('mhm_stat_cancelled','Cancelled',this.language):
                !!(_.get(mhc, 'status', null) & (1 << 1)) ?  this.localize('mhm_stat_ongoing','On going',this.language):
                    this.localize('mhm_stat_other','Manual encoding',this.language)
    }

    _getIconStatusClass(mhc){
        return !!(_.get(mhc, 'status', null) & (1 << 3)) ? "subscription-status--orangeStatus" :
            !!(_.get(mhc, 'status', null) & (1 << 2)) ? "subscription-status--redStatus":
                !!(_.get(mhc, 'status', null) & (1 << 1)) ?  "subscription-status--greenStatus":
                    "subscription-status--blueStatus"
    }

    _getMedicalHouse(nihii){
        return _.get(this, 'medicalHouseList.medicalHouseList', []).find(mh => _.get(mh, 'nihii', null) === nihii) ? _.get(_.get(this, 'medicalHouseList.medicalHouseList', []).find(mh => _.get(mh, 'nihii', null) === nihii), 'name', null)+' ('+this.api.formatInamiNumber(nihii)+')' : this.api.formatInamiNumber(nihii)
    }

    _localizeSignatureType(signatureType){
        return this.localize('mhm-'+signatureType, signatureType, this.language)
    }

    _isClosure(mhc){
        return !!(_.get(mhc, 'status', null) & (1 << 3))
    }

    _getClosureType(){
        return null
    }

    _getClosureReason(){
        return null
    }

    _recoveryStatus(e){
        console.log("eventje",e)
        if(_.get(e, 'detail.statusDetail', null)){
            this.set('recoveryStatus', _.get(e, 'detail.statusDetail', {}))
            console.log("_recoveryStatusChanged",  _.get(e, 'detail.statusDetail', {}))


        }
    }

    _handleRecoveryStatus(){
        console.log("handling observer", this.recoveryStatus)
        this.set("canRecovery", (!this.recoveryStatus.isRunning && !this.recoveryStatus.isLoading && this.recoveryStatus.hasTodo && !this.recoveryStatus.hasRunned))
        this.set("canDownload", (this.recoveryStatus.hasRunned))
        console.log("canRecovery", this.canRecovery, (!this.recoveryStatus.isRunning && !this.recoveryStatus.isLoading && this.recoveryStatus.hasTodo), "canDownload", this.canDownload)
    }


}

customElements.define(HtPatSubscriptionRecovery.is, HtPatSubscriptionRecovery);
