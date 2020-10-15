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

import "./ht-pat-invoice-invoice-list"
import "./ht-pat-invoice-invoice-detail"

import moment from 'moment/src/moment';
import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"


class HtPatInvoiceDetail extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">
           #invoiceDetailDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
           }
           
           .invoiceDetailDialog{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
           }
           
           .invoice-content{
                display: flex;
                width: 100%;
                position: relative;
                height: 100%;
                background-color: white;
            }
            
            .buttons{
                height: 45px;
            }
            
            .invoice-list-container{
                width: 25%;
                height: 100%;
            }
            
            .invoice-detail-container{
                width: 75%;
                height: 100%;
            }


        </style>

        <paper-dialog id="invoiceDetailDialog">
           <div class="invoiceDetailDialog">
                <div class="invoice-content">
                    <div class="invoice-list-container">
                        <ht-pat-invoice-invoice-list 
                            id="htPatInvoiceInvoiceList" 
                            api="[[api]]" 
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]" 
                            current-contact="[[currentContact]]" 
                            selected-invoice="[[selectedInvoice]]"
                            list-of-invoice="[[listOfInvoice]]"
                            supervisor="[[supervisor]]"
                            hcp="[[hcp]]"   
                            list-of-send-medium="[[listOfSendMedium]]"
                         ></ht-pat-invoice-invoice-list>
                    </div>
                    <div class="invoice-detail-container">
                        <ht-pat-invoice-invoice-detail 
                            id="htPatInvoiceInvoiceDetail" 
                            api="[[api]]" 
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]" 
                            current-contact="[[currentContact]]
                            list-of-send-medium="[[listOfSendMedium]]"
                        "></ht-pat-invoice-invoice-detail>
                    </div>
                </div>
                <div class="buttons">
                     <paper-button class="button button--other" on-tap="_closeDialog">[[localize('clo','close',language)]]</paper-button>
                </div>
           </div>
        </paper-dialog>
`;
    }

    static get is() {
        return 'ht-pat-invoice-detail';
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
            currentContact:{
                type: Object,
                value: () => {}
            },
            hcp: {
                type: Object,
                value: () => {
                }
            },
            supervisorHcp:{
                type: Object,
                value: () => {}
            },
            supervisorUser:{
                type: Object,
                value: () => {}
            },
            listOfInvoice: {
                type: Array,
                value: () => []
            },
            filteredListOfInvoice:{
                type: Array,
                value: () => []
            },
            selectedInvoice: {
                type: Object,
                value: () => {}
            },
            listOfCareProvider:{
                type: Array,
                value: function () {
                    return require('./rsrc/listOfCareProvider.json');
                }
            },
            listOfSendMedium:{
                type: Array,
                value: function () {
                    return require('./rsrc/listOfSentMedium.json');
                }
            },
            currentInsurability:{
                type: Object,
                value: () => {}
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }

    _reset(){
        this.set('hcp', {})
        this.set('supervisorHcp', {})
        this.set('supervisorUser', {})
        this.set('listOfInvoice', [])
        this.set('filteredListOfInvoice', [])
        this.set('selectedInvoice', {})
        this.set('currentInsurability', {})
    }

    _openDialog(){
        this._reset()
        this.api.hcparty().getHealthcareParty(_.get(this, 'user.healthcarePartyId')).then(hcp => {
            this.set('hcp', hcp)
            return _.get(hcp, 'supervisorId') ? Promise.all([this.api.hcparty().getHealthcareParty(hcp.supervisorId), this._getUserFromHcpId(_.get(hcp, 'supervisorId', null))]) : Promise.resolve([{},{}])
        }).then(([supervisorHcp, supervisorUser]) => {
            this.set('supervisorHcp', supervisorHcp)
            this.set('supervisorUser', supervisorUser)
            return this._getPatientLastInsurance()
        }).then(() =>
            this._refreshInvoiceList()
        ).then(listOfInvoice => {
            listOfInvoice.push(this._createNewInvoice())
            this.set("listOfInvoice", _.orderBy(listOfInvoice, ['invoiceDate'], ['desc']))
            this.set("filteredlistOfInvoice", _.orderBy(listOfInvoice, ['invoiceDate'], ['desc']))
            this.set('selectedInvoice', _.get(this, 'listOfInvoice', []).find(inv => !_.get(inv, 'id', null)))
        }).finally(() => {
            this.shadowRoot.querySelector("#invoiceDetailDialog") ? this.shadowRoot.querySelector("#invoiceDetailDialog").open() : null
        })
    }

    _getUserFromHcpId(hcpId){
        return this.api.user().findByHcpartyId(hcpId)
            .then(listOfHcp =>
                _.size(listOfHcp) ? this.api.user().getUser(_.head(listOfHcp)) : Promise.resolve({}))
    }

    _getPatientLastInsurance(){
        const currentInsurance = _.chain(_.get(this, 'patient.insurabilities', []))
            .filter(ins => _.get(ins, "startDate", 0) && parseInt(_.get(ins, "startDate", 0)) <= moment().format("YYYYMMDD") && !parseInt(_.get(ins, "endDate", 0)) && _.get(ins, "insuranceId", 0))
            .orderBy(["startDate"], ["desc"])
            .head()
            .value() || null

        ;(_.get(currentInsurance, 'insuranceId', null) ? this.api.insurance().getInsurance(_.get(currentInsurance, 'insuranceId', null)) : Promise.resolve({}))
            .then(ins => {
                this.set('currentInsurability', _.merge(currentInsurance, {
                    insuranceInfo: ins,
                    isBim: _.parseInt(_.get(currentInsurance, 'parameters.tc1', null)) % 2 !== 0 && _.parseInt(_.get(currentInsurance, 'parameters.tc2', null)) % 2 !== 0,
                    isAssured: !!ins
                }))
            })

    }

    _createNewInvoice(){
        const newInvoice = {
            invoiceDate: this.api.moment(new Date).format("YYYYMMDD"),
            thirdPartyPaymentJustification: _.get(this, 'currentInsurability.isBim', false) ? "3" : "0",
            invoiceType: _.get(this, 'currentInsurability.isBim', false) ? "mutualfund" : "patient",
            sentMediumType: _.get(this, 'currentInsurability.isBim', false) ? "efact" : "eattest",
            invoicePeriod: 0,
            longDelayJustification: false,
            invoiceReference: null,
            gnotionNihii: null,
            internshipNihii: this._isDoctorAssistant(_.get(this, 'hcp.nihii', null)) === false ? null : _.get(this, 'hcp.nihii', null),
            encounterLocationNorm: 0,
            encounterLocationName: null,
            encounterLocationNihii: null,
            creditNote: false,
            careProviderType: this._isDoctorAssistant(_.get(this, 'hcp.nihii', null)) === false ? "persphysician" : "trainee",
            invoicingCodes: []
        }

        return newInvoice
    }

    _refreshInvoiceList(){
        this.set('listOfInvoice', [])
        this.set('filteredListOfInvoice', [])
        return this.api.invoice().findBy(_.get(this, 'user.healthcarePartyId', null), _.get(this, 'patient', null)).then(listOfInvoice =>
            Promise.resolve(listOfInvoice.map(inv => _.merge(inv, {
                normalizedSearchTerms: _.map(_.uniq(_.compact(_.flatten(_.concat([_.get(inv, _.trim('invoiceDate'), null) ? this.api.moment(_.get(inv, _.trim('invoiceDate'), "")).format('DD/MM/YYYY') : _.get(inv, _.trim('invoiceDate'), ""), _.get(inv, _.trim('invoiceReference'), ""), _.trim(_.get(inv, 'sentMediumType', "")).toString()])))), i =>  _.trim(i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")).join(" ")
            })))
        )
    }

    _isDoctorAssistant(nihii) {
        return (!!nihii && nihii.length === 11 && nihii.startsWith("1") && (nihii.endsWith("005") || nihii.endsWith("006")))
    }

    _isSpecialist(nihii) {
        return !!(nihii && _.startsWith(nihii, "1", 0) && _.size(nihii) === 11 && (nihii.substr(_.size(nihii) - 3) >= 10))
    }

    _closeDialog(){
        this.shadowRoot.querySelector("#invoiceDetailDialog") ? this.shadowRoot.querySelector("#invoiceDetailDialog").close() : null
    }

}
customElements.define(HtPatInvoiceDetail.is, HtPatInvoiceDetail);
