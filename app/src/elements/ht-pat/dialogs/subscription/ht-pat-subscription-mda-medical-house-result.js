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

import moment from 'moment/src/moment';
import {TkLocalizerMixin} from "../../../tk-localizer";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatSubscriptionMdaMedicalHouseResult extends TkLocalizerMixin(PolymerElement) {

    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style paper-tabs-style notification-style">

            .mhm-sub-container{
                height: auto;
                width: auto;
                margin: 10px;
                border: 1px solid var(--app-background-color-dark);
            }

            .mhm-person-container{
                height: auto;
                width: auto;
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

            .headerLabel{
                font-weight: bold;
            }

        </style>

        <template is="dom-if" if="[[_isDataAvailable('urn:be:cin:nippin:medicalHouse', mdaResult, mdaResult.*)]]" restamp="true">
            <template is="dom-repeat" items="[[mdaResult.formatedResponse.medicalHouse]]" as="mmh">
                <div class="mhm-sub-container">
                    <div class="mhm-person-container">
                        <div class="headerMasterTitle headerLabel">[[localize('mhm-medicalHouse', 'Medical house result from MDA', language)]]</div>
                        <div class="headerInfoLine">
                            <div class="headerInfoLine">
                                <div class="headerInfoField">
                                    <span class="headerLabel">[[localize('mhm-nihii', 'Nihii', language)]]: &nbsp;</span> [[_formatNihiiNumber(mmh.medicalHouse.nihii)]]
                                </div>
                                <div class="headerInfoField fw2">
                                    <span class="headerLabel">[[localize('mhm-name', 'Name', language)]]: &nbsp;</span> [[mmh.medicalHouse.name]]
                                </div>
                            </div>
                            <div class="headerInfoLine">
                                <div class="headerInfoField">
                                    <span class="headerLabel">[[localize('mhm-type', 'Type', language)]]: &nbsp;</span> [[mmh.medicalHouse.type]]
                                </div>
                                <div class="headerInfoField">
                                    <span class="headerLabel">[[localize('mhm-startDate', 'Start date', language)]]: &nbsp;</span> [[_formatDate(mmh.medicalHouse.startDate)]]
                                </div>
                                <div class="headerInfoField">
                                    <span class="headerLabel">[[localize('mhm-endDate', 'End date', language)]]: &nbsp;</span> [[_formatDate(mmh.medicalHouse.endDate)]]
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </template>
        </template>
        `
    }

    static get is() {
        return 'ht-pat-subscription-mda-medical-house-result';
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
            }
        };
    }

    constructor() {
        super();
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }

    _isDataAvailable(type, mdaResult){
        return !!_.get(mdaResult, 'assertions', []).find(assertion => _.get(assertion, 'advice.assertionType', null) === type)
    }

    _isFacetExeption(type, mdaResult){
        return  !_.isEmpty(mdaResult) && _.get(mdaResult, "status.code2", null) === "urn:be:cin:nippin:SAML:status:PartialAnswer" && !_.isEmpty(_.flatten((_.get(mdaResult, "errors", []) || []).map(err => _.get(err, 'details.details', []))).filter(detail => _.get(detail, "detailCode", null) === "FACET_EXCEPTION").find(fe => _.toUpper(fe.detailSource) === _.toUpper(type)))
    }

    _isAssertion(mdaResult){
        return _.size(_.get(mdaResult, 'assertions', []))
    }

    _formatDate(date){
        return date ? moment(parseInt(date)).format("DD/MM/YYYY"): null
    }

    _formatNihiiNumber(nihii) {
        return nihii ? ("" + nihii).replace(/([0-9]{1})([0-9]{5})([0-9]{2})([0-9]{3})/, '$1-$2-$3-$4') : nihii
    }


}

customElements.define(HtPatSubscriptionMdaMedicalHouseResult.is, HtPatSubscriptionMdaMedicalHouseResult);
