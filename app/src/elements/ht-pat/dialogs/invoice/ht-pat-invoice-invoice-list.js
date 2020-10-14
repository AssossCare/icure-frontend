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


import moment from 'moment/src/moment';
import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';


class HtPatInvoiceInvoiceList extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">
          .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .tr-item{
                cursor: pointer;
            }
            
            .th{
                height: auto!important;
                font-weight: bold;
                vertical-align: middle;
            }
            
            .tr{
                display: flex;
                height: 22px;            
                border-bottom: 1px solid var(--app-background-color-dark);   
                padding: 4px;                
            }
            
            .td{
               position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                flex-grow: 1;
                flex-basis: 0;
                padding: 6px;
                overflow: hidden;
                min-width: 0px;
                z-index: 2;
                word-break: break-word;
                white-space: nowrap;               
                font-size: 13px;
                text-overflow: ellipsis;
            }

            .fg0{
                flex-grow: 0.2;
            }
            
            .fg05{
            flex-grow: 0.5;
            }
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }  
            
            .fg5{
                flex-grow: 4.6;
            }
            
            .invoice-list-content{
               height: 100%;
               background: var(--app-background-color-dark);
            }
            
            .patient-info-container{
                height: 60px;
                display: flex;
            }
            
            .invoice-list{
                height: calc(100% - 100px);
                overflow: auto;
            }
            
            .invoice-container{
                margin: 1%;
                height: 80px;
                width: 98%;
                border: 1px solid gray;
            }
            
            .invoice-title{
                font-size: 8px;
            }
            
            .invoice-nmcl{
            
            }
            
            .invoice-info{
            
            }
            
            .invoice-info-line{
            
            }
            
            .patient-info-picture{
            
            }
            
            .patient-info-picture{
                height: 52px;
                width: 52px;
                min-width: 52px;
                border-radius:50%;
                overflow: hidden;
            }

            .patient-info-picture img{
                width:100%;
                margin:50%;
                transform: translate(-50%,-50%);
            }
            
            .patient-info{
                padding-left: 12px;
                display:flex;
                flex-direction:column;
                align-items: flex-start;
                justify-content: center;
            }
            .patient-name{
                font-weight:700;
                line-height:14px;
                font-size: var(--font-size-large);
            }
            .patient-birthdate{
                font-size: var(--font-size-normal);
                line-height: 1;
            }
            
             .searchField{
                display: block;
            }
            
            .panel-search{
                height: 45px;
                width: auto;
            }
            
        </style>
        
        <div class="invoice-list-content">
            <div class="patient-info-container">
                <div class="patient-info-picture">
                    <img src\$="[[picture(patient,patient.picture)]]">
                </div>
                <div class="patient-info">
                    <div class="patient-name">
                        [[_getGender(patient.gender)]] [[patient.firstName]] [[patient.lastName]] [[orphans]]
                    </div>
                    <div class="patient-birthdate">
                        [[_timeFormat(patient.dateOfBirth)]] [[_ageFormat(patient.dateOfBirth)]] [[patient.profession]]
                    </div>
                </div>
            </div>
            <div class="invoice-search">
                <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{filter}}"></dynamic-text-field>
            </div>
            <div class="invoice-list">
                <template is="dom-repeat" items="[[listOfInvoice]]" as="invoice">
                    <div class="invoice-container">
                        <div class="invoice-title">
                            N° [[invoice.invoiceReference]] Date: [[invoice.invoiceDate]]
                        </div>
                        <div class="invoice-nmcl">
                            
                        </div>
                        <div class="invoice-info">
                            <div class="invoice-info-line">
                            
                            </div>
                            <div class="invoice-info-line">
                            
                            </div>
                        </div>
                    </div>
                </template>
            </div>
        </div>

       
`;
    }

    static get is() {
        return 'ht-pat-invoice-invoice-list';
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
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }

    picture(pat) {
        if (!pat) {
            return require('../../../../../images/male-placeholder.png')
        }
        return pat.picture ? 'data:image/png;base64,' + pat.picture : (pat.gender && pat.gender.substr(0, 1).toLowerCase() === 'f') ? require('../../../../../images/female-placeholder.png') : require('../../../../../images/male-placeholder.png')
    }

    _timeFormat(date) {
        return date ? this.api.formatedMoment(date) : ''
    }

    _ageFormat(date) {
        return date ? this.api.getCurrentAgeFromBirthDate(date, (e, s) => this.localize(e, s, this.language)) : ''
    }

    _getGender(gender) {
       return gender === "male" ? "M." : gender === "female" ? "Mme" : ""
    }



}
customElements.define(HtPatInvoiceInvoiceList.is, HtPatInvoiceInvoiceList);
