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

import "./efact/ht-pat-invoice-efact"
import "./eattest/ht-pat-invoice-eattest"


class HtPatInvoiceInvoiceDetail extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">

          .invoice-detail-header{
            height: 60px;
            width: 100%;
            background: var(--app-background-color-dark);
            display: flex;
          }

        </style>
        
        <div class="invoice-detail-content">
            <div class="invoice-detail-header">
                <div>
                    <vaadin-combo-box class="w33 p4 mw0 w400" label="[[localize('', '', language)]]" selected-item="{{}}"  filtered-items="[[]]" item-label-path="label.fr" >
                        <template>[[_getLabel(item.label)]]</template>
                    </vaadin-combo-box>
                </div>
                <div>
                    <vaadin-date-picker id="datePickerCreation" i18n="[[i18n]]" attr-for-value="value" can-be-fuzzy label="[[localize('dat_of_bir','Date of birth',language)]]"  value="{{dateAsString}}"></vaadin-date-picker>
                </div>
                <div>
                    N°
                </div>
            </div>
        </div>

       
`;
    }

    static get is() {
        return 'ht-pat-invoice-invoice-detail';
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
            listOfSendMedium:{
                type: Array,
                value: () => []
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }


}
customElements.define(HtPatInvoiceInvoiceDetail.is, HtPatInvoiceInvoiceDetail);
