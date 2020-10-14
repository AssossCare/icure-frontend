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
                         ></ht-pat-invoice-invoice-list>
                    </div>
                    <div class="invoice-detail-container">
                        <ht-pat-invoice-invoice-detail id="htPatInvoiceInvoiceDetail" api="[[api]]" i18n="[[i18n]]" user="[[user]]" patient="[[patient]]" language="[[language]]" resources="[[resources]]" current-contact="[[currentContact]]"></ht-pat-invoice-invoice-detail>
                    </div>
                </div>
                <div class="buttons">
                
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
            supervisor:{
                type: Object,
                value: () => {}
            },
            listOfInvoice: {
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
        this.set('supervisor', {})
        this.set('listOfInvoice', [])
        this.set('selectedInvoice', {})
    }

    _openDialog(){
        this._reset()
        this.api.hcparty().getHealthcareParty(_.get(this, 'user.healthcarePartyId')).then(hcp => {
            this.set('hcp', hcp)
            return _.get(hcp, 'supervisorId') ? this.api.hcparty().getHealthcareParty(hcp.supervisorId) : Promise.resolve({})
        }).then(supervisor => {
            this.set('supervisor', supervisor)
            return this._refreshInvoiceList()
        }).then(listOfInvoice =>
            this.set("listOfInvoice", listOfInvoice)
        ).finally(() => {

            this.shadowRoot.querySelector("#invoiceDetailDialog").open()
        })
    }

    _refreshInvoiceList(){
        this.set('listOfInvoice', [])
        return this.api.invoice().findBy(_.get(this, 'user.healthcarePartyId', null), _.get(this, 'patient', null))
    }

    _isDoctorAssistant(nihii) {
        return (!!nihii && nihii.length === 11 && nihii.startsWith("1") && (nihii.endsWith("005") || nihii.endsWith("006")))
    }

}
customElements.define(HtPatInvoiceDetail.is, HtPatInvoiceDetail);
