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

import moment from 'moment/src/moment'
import {TkLocalizerMixin} from "../../../tk-localizer"
import {PolymerElement, html} from '@polymer/polymer'

class HtPatSubscriptionTechnicalInfo extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">

            .p4{
                padding: 4px;
            }

            .mtm2{
                margin-top: -2px;
            }

            .w40{
                width: 40%;
            }

            .m5{
                margin: 5px;
            }

            .w100{
                width: 98%;
            }
        </style>

        <div>

            <dynamic-text-field class="w100 p4 mtm2 mw0" label="[[localize('', 'inputReference', language)]]" value="[[subscriptionResultDetail.commonOutput.inputReference]]"></dynamic-text-field>
            <dynamic-text-field class="w100 p4 mtm2 mw0" label="[[localize('', 'nipreference', language)]]" value="[[subscriptionResultDetail.commonOutput.nipreference]]"></dynamic-text-field>
            <dynamic-text-field class="w100 p4 mtm2 mw0" label="[[localize('', 'outputReference', language)]]" value="[[subscriptionResultDetail.commonOutput.outputReference]]"></dynamic-text-field>
            <div>
                <vaadin-text-area class="textarea-style w100" id="CommentTextArea" label="[[localize('','soapRequest',language)]]" value="[[subscriptionResultDetail.mycarenetConversation.soapRequest]]"></vaadin-text-area>
            </div>
            <div>
                <vaadin-text-area class="textarea-style w100" id="CommentTextArea" label="[[localize('','transactionRequest',language)]]" value="[[subscriptionResultDetail.mycarenetConversation.transactionRequest]]"></vaadin-text-area>
            </div>
            <div>
                <vaadin-text-area class="textarea-style w100" id="CommentTextArea" label="[[localize('','soapResponse',language)]]" value="[[subscriptionResultDetail.mycarenetConversation.soapResponse]]"></vaadin-text-area>
            </div>
            <div>
                <vaadin-text-area class="textarea-style w100" id="CommentTextArea" label="[[localize('','transactionResponse',language)]]" value="[[subscriptionResultDetail.mycarenetConversation.transactionResponse]]"></vaadin-text-area>
            </div>
        </div>

        `
    }

    static get is() {
        return 'ht-pat-subscription-technical-info'
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
            subscriptionResultDetail:{
                type: Object,
                value: () => {}
            }
        }
    }

    constructor() {
        super()
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }


}

customElements.define(HtPatSubscriptionTechnicalInfo.is, HtPatSubscriptionTechnicalInfo)
