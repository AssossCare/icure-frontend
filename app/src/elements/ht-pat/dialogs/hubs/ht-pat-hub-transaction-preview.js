import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import './ht-pat-hub-medication-scheme-view.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/paper-tabs-style.js';
import '../../../../styles/table-style.js';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';
import moment from 'moment/src/moment';
import {Base64} from 'js-base64';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatHubTransactionPreview extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="scrollbar-style dialog-style paper-tabs-style table-style">

            #dialog .hub-cons {
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: flex-start;
                width: 100%;
                box-sizing: border-box;
            }

            #dialog paper-button.action {
                --paper-button-ink-color: var(--app-secondary-color-dark);
                font-weight: 400;
                font-size: 12px;
                height: 32px;
                padding: 10px 1.2em;
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                background: var(--app-secondary-color);
                color: var(--app-primary-color-dark);
                justify-self: flex-end;
            }
            #dialog .hub-cons paper-button.action[disabled] {
                background-color: var(--app-secondary-color-dark);
                color: var(--app-text-color-disabled);
                box-shadow: none;
            }

            #dialog .hub-cons .buttons {
                right: 24px;
                position: absolute;
            }

            #dialog .hub-cons vaadin-date-picker {
                margin-right: 8px;
            }

            #dialog a {
                text-decoration: none;
                color:	var(--app-secondary-color);
            }

            #dialog{
                min-height: 800px;
                min-width: 1024px;
            }

            #dialog .hub-doc {
                overflow: auto ;
                max-height: 500px;
            }

            .links {
                position: absolute;
                right: 0;
            }

            .pills {
                float: right;
            }

            dynamic-link {
                float: right;
                top:4px;
            }

            vaadin-combo-box {
                width: 100%;
            }

            vaadin-text-area {
                width: 100%;
            }

            .containerHubCons {
                height: 58px;
                display: flex;
            }

            #par-search {
                flex: 1;
            }

            #dialog .hub-info{
                margin-top:0;
                display:flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            #dialog .hub-info div{
                margin-right: 24px;
            }

            #dialog .hub-info div p{
                margin: 8px 0;
            }

            #dialog .hub-info div b{
                margin-right: 8px;
            }

            .modal-title{
                background:  var(--app-background-color-dark);
                margin-top: 0;
                padding: 16px 24px;
            }

            .tab-selector {
                height: 48px;
                background: var(--app-secondary-color);
            }

            .end-buttons {
                display: flex;
                position: absolute;
                right: 0;
                bottom: 0;
            }

            .modal-button--save {
                background: var(--app-secondary-color);
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
            }

            ht-spinner {
                position: relative;
                height: 42px;
                width: 42px;
            }

            #kmehr_slot {
                overflow-y: scroll;
                height: 90%;
            }

            #titleInfo {
                margin-bottom: 12px;
                font-size: var(--font-size-large);
                font-weight: bold;
            }

            .headerInfo {
                height: auto;
                width: 100%;
                box-sizing: border-box;
            }

            #blockInfo {
                height: auto;
                width: 100%;
                box-sizing: border-box;
            }

            .headerInfoLine {
                width: 100%;
                padding: 4px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .headerInfoField {
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                align-content: stretch;
                width: calc(100% / 4);
                padding: 0 8px;
                box-sizing: border-box;
            }

            .headerLabel {
                font-weight: bold;
            }

            .hub-doc-container {
                margin-bottom: 12px;
            }

            .headerMasterTitle {
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
                border-radius: 4px 4px 0 0;
            }

            .headerMasterTitle:not(:first-child) {
                margin-top: 24px;
            }

            .blockInfo {
                height: auto;
                width: 100%;
                box-sizing: border-box;
            }

            .vaadinStyle {
                height: auto;
                border: none;
            }

            .doNotDisplay {
                display: none;
            }

            iron-pages {
                height: calc(100% - 48px);
                width: auto;
                overflow: auto;
                position: relative;
                padding: 12px;
                box-sizing: border-box;
            }

            .modal-title {
                background: var(--app-background-color-dark);
                margin-top: 0;
                padding: 16px 24px;
            }

            .modal-button {
                --paper-button-ink-color: var(--app-secondary-color);
                background-color: var(--app-secondary-color);
                color: var(--app-text-color);
                font-weight: 700;
                font-size: 14px;
                height: 40px;
                min-width: 100px;
                padding: 10px 1.2em;
            }

            .selectedDocumentToImportContent {
                height: 260px;
                width: auto;
                margin: 12px;
            }

            .buttons {
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 8px 16px;
            }

            #importHubDocumentDialog {
                height: 400px;
                width: 650px;
            }

            .pat-details-card > .card-content {
                padding: 16px 16px 32px !important;
            }

            .pat-details-card {
                margin: 0 32px 32px;
                padding: 0 8px 8px;
                overflow: hidden;
                width: calc(100% - 64px);
            }

            .pat-details-card.fullWidth {
                margin: 0 0 32px 0;
                width: 100%;
            }

            .pat-details-card hr {
                border: 1px solid var(--app-background-color-darker)
            }

            .form-title {
                color: var(--app-primary-color);
                border-top: 2px solid var(--app-background-color-dark);
                border-radius: 2px 2px 0 0;
                background: var(--app-background-color-dark);
                font-size: 12px;
                margin: 0 0 8px -8px;
                padding: 2px 4px 2px 20px;
                display: flex;
                flex-flow: row nowrap;
                width: calc(100% - 8px);
                text-align: left;
                justify-content: space-between;
                align-items: center;
            }

            .form-title > span {
                flex-grow: 1;
                min-width: 100px;
            }

            .form-title > div {
                flex-grow: 0;
                min-width: 20px;
            }

            .full-height {
                height: 100%;
            }

            .tabIcon {
                padding-right: 10px;
            }

            .tel-line {
                display: flex;
                align-items: center;
            }

            .tel-line iron-icon {
                color: var(--app-text-color-disabled);
                height: 16px;
                width: 16px;
                margin-right: 4px;
            }

            .chronicIcon {
                height: 12px;
                width: 12px;
            }

            .oneShotIcon {
                height: 12px;
                width: 12px;
                color: #c60b44;
            }

            .legend-oneShotIcon {
                height: 18px;
                width: 18px;
                color: #c60b44;
            }

            .legend-compoundIcon {
                height: 14px;
                width: 14px;
                color: #2882ff;
            }

            .legend-substanceIcon {
                height: 14px;
                width: 14px;
                color: #c62ac4;
            }

            .legend-line {
                margin-right: 8px;
                font-size: var(--font-size-normal);
            }

            #legend {
                background: var(--app-background-color);
                border-radius: 4px;
                padding: 4px;
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 12px;
            }

            .vaadin-temporality {
                width: 30px !important;
            }

            .modal-button {
                --paper-button-ink-color: var(--app-secondary-color);
                background-color: var(--app-secondary-color);
                color: var(--app-text-color);
                font-weight: 700;
                font-size: 14px;
                height: 40px;
                min-width: 100px;
                padding: 10px 1.2em;
                text-transform: capitalize;
            }

            #loadingContainer, #loadingContainerSmall {
                position: absolute;
                width: 100%;
                height: 100%;
                top: 0;
                left: 0;
                background-color: rgba(0, 0, 0, .3);
                z-index: 10;
                text-align: center;
            }

            .grid-btn-small {
                margin: 0;
                padding: 2px 10px;
                box-sizing: border-box;
                --paper-button-ink-color: var(--app-secondary-color-dark);
                display: inline-block;
                text-align: center;
                --paper-button: {
                    background: var(--app-secondary-color);
                    color: var(--app-text-color);
                    width: auto;
                    margin: 0 auto;
                    font-size: 12px;
                    font-weight: 400;
                    padding: 10px;
                };
            }

            .grid-btn-small.noBg {
                --paper-button-ink-color: var(--app-secondary-color-dark);
                --paper-button: {
                    background: none;
                };
            }

            .grid-btn-small iron-icon {
                max-width: 20px;
            }

            .switch {
                position: relative;
                display: inline-block;
                width: 40px;
                height: 23px;
            }

            .switch input {
                opacity: 0;
                width: 0;
                height: 0;
            }

            .slider {
                position: absolute;
                cursor: pointer;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                background-color: #ccc;
                -webkit-transition: .4s;
                transition: .4s;
            }

            .slider:before {
                position: absolute;
                content: "";
                height: 19px;
                width: 19px;
                left: 2px;
                bottom: 2px;
                background-color: white;
                -webkit-transition: .4s;
                transition: .4s;
            }

            input[checked="true"] + .slider {
                background-color: #2196F3;
            }

            input:focus + .slider {
                box-shadow: 0 0 1px #2196F3;
            }

            input[checked="true"] + .slider:before {
                -webkit-transform: translateX(17px);
                -ms-transform: translateX(17px);
                transform: translateX(17px);
            }

            /* Rounded sliders */
            .slider.round {
                border-radius: 23px;
            }

            .slider.round:before {
                border-radius: 50%;
            }


            paper-toggle-button.status{
                   --paper-toggle-button-checked-bar-color:  var(--paper-green-500);
                   --paper-toggle-button-checked-button-color:  var(--paper-green-500);
                   --paper-toggle-button-checked-ink-color: var(--paper-green-500);
                   --paper-toggle-button-unchecked-bar-color:  var(--paper-red-900);
                   --paper-toggle-button-unchecked-button-color:  var(--paper-red-900);
                   --paper-toggle-button-unchecked-ink-color: var(--paper-red-900);
            }

            .griddiv{
                height: 100%;
            }

            vaadin-checkbox.selectedcol{
                height: 20%;
            }

            .mdc-data-table {
                border-radius: 0 0 4px 4px;
                overflow: hidden;
                width: 100%;
            }

            .mdc-data-table__table {
                max-width: 100%;
                width: 100%;
            }

            ht-spinner{
                position: absolute;
                display:block;
                width: 42px;
                height: 42px;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }

            paper-checkbox {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                --paper-checkbox-unchecked-color: var(--app-text-color);
				--paper-checkbox-checked-color: var(--app-secondary-color);
				--paper-checkbox-checked-ink-color: var(--app-secondary-color-dark);
				--paper-checkbox-vertical-align: bottom;
				--paper-checkbox-size: 16px;
                --paper-checkbox-label: {
                    display:none
                };
            }

            .relative {
                position: relative;
            }

        </style>

        <paper-tabs selected="{{tabs}}">
            <paper-tab id="tabViewer">
                <iron-icon class="tabIcon" icon="vaadin:male"></iron-icon>
                [[localize('tra_vwr','Viewer',language)]]
            </paper-tab>
            <paper-tab id="tabUnmatched">
                <iron-icon class="tabIcon" icon="icons:cloud-download"></iron-icon>
                [[localize('sumehr_unmatched','Unmatched', language)]]
            </paper-tab>
            <paper-tab id="tabJSON">[[localize('json_vwr','JSON View',language)]]</paper-tab>
        </paper-tabs>
        <iron-pages selected="[[tabs]]">
            <page> <!-- viewer -->
                <ht-spinner active="[[isLoading]]"></ht-spinner>
                <div id="titleInfo">[[_localizeTransactionType(transInfo)]]</div>
                <template is="dom-if" if="[[!newSumehr]]"><ht-spinner active="[[true]]"></ht-spinner></template>
                <template is="dom-if" if="[[newSumehr]]">
                    <div class="hub-doc">
                        <div class="blockInfo">
                            <div class="hub-doc-container">
                                <template is="dom-if" if="[[_hasItems(newSumehr.healthElements, 'healthElements')]]">
                                    <div class="headerMasterTitle headerLabel">[[localize("healthcareelements","Healthcare Elements")]]</div>
                                    <div class="mdc-data-table">
                                        <table class="mdc-data-table__table" aria-label="[[localize('healthcareelements','Healthcare Elements')]]">
                                            <thead>
                                                <tr class="mdc-data-table__header-row">
                                                    <th class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader" scope="col">
                                                        <div class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected">
                                                            <input type="checkbox" class="mdc-checkbox__native-control" aria-label="Checkbox for header row selection" data-list-name\$="[['healthElements']]" checked="[[_selectAllhealthElements]]" on-tap="selectAllhealthElementsChanged">
                                                            <div class="mdc-checkbox__background">
                                                            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                                                <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                                                            </svg>
                                                            <div class="mdc-checkbox__mixedmark"></div>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:200px;">[[localize('hub_itemtype','Type',language)]]</th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col">[[localize('hub_code','Code',language)]]</th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col">[[localize('hub_titl','Title',language)]]</th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:150px;">[[localize('hub_sta_dat','Start date',language)]]</th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:150px;">[[localize('hub_end_dat','End date',language)]]</th>
                                                    <template is="dom-if" if="[[hubSumehr]]">
                                                            <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:150px;">[[localize('exist-on-hub','Hub ?',language)]]</th>
                                                    </template>
                                                    <th class="mdc-data-table__header-cell mdc-data-table__header-cell--center" role="columnheader" scope="col">[[localize('confidential',"Confidential",language)]]</th>
                                                </tr>
                                            </thead>
                                            <tbody class="mdc-data-table__content">
                                                <template id="tblHealthElements" is="dom-repeat" items="[[newSumehr.healthElements]]">
                                                    <tr class="mdc-data-table__row">
                                                        <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                                                            <div class="mdc-checkbox mdc-data-table__row-checkbox">
                                                                <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u0" checked="[[item.selectedForExport]]" on-tap="toggleSelectedForExportHealthElement" data-item-data\$="[[item]]">
                                                                <div class="mdc-checkbox__background">
                                                                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                                                        <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                                                                    </svg>
                                                                    <div class="mdc-checkbox__mixedmark"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="mdc-data-table__cell" style="width:200px;">[[_localizedItemTypeFromTags(item, language)]]</td>
                                                        <td class="mdc-data-table__cell" id="codes_[[item.id]]">
                                                            [[_baseCode2(item)]]
                                                            <paper-tooltip position="right">[[_allCodes2(item)]]</paper-tooltip>
                                                        </td>
                                                        <td class="mdc-data-table__cell" id="title_[[item.id]]">
                                                            [[item.descr]]
                                                            <paper-tooltip position="right">[[item.descr]]</paper-tooltip>
                                                        </td>
                                                        <td class="mdc-data-table__cell" style="width:150px;">[[_formatDate(item.openingDate)]]</td>
                                                        <td class="mdc-data-table__cell" style="width:150px;">[[_formatDate(item.closingDate)]]</td>
                                                        <template is="dom-if" if="[[hubSumehr]]">
                                                            <td class="mdc-data-table__cell" style="width:150px;">[[_hasMatchOnHub(item)]]</td>
                                                        </template>
                                                        <td class="mdc-data-table__cell relative">
                                                            <paper-checkbox on-tap="_toggleConfidentiality" data-item-data\$="[[item]]" checked="[[_isConfidential(item)]]"></paper-checkbox>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                        </table>       
                                    </div>
                                </template>
                                <template is="dom-if" if="[[!_hasItems(newSumehr.healthElements, 'healthElements')]]">
                                    <div class="headerMasterTitle headerLabel">[[localize("healthcareelements","Healthcare Elements")]]</div>
                                    [[localize("hub_no_items_of_type_present", "No elements", language)]]
                                </template>
                                <template is="dom-if" if="[[_hasItems(newSumehr.services, 'services')]]">
                                    <div class="headerMasterTitle headerLabel">[[localize("svcs","Services")]]</div>
                                    <div class="mdc-data-table">
                                        <table class="mdc-data-table__table" aria-label="[[localize('svcs','Services')]]">
                                            <thead>
                                                <tr class="mdc-data-table__header-row">
                                                    <th class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader" scope="col">
                                                        <div class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected">
                                                            <input type="checkbox" class="mdc-checkbox__native-control" aria-label="Checkbox for header row selection" on-tap="selectAllservicesChanged" checked="[[_selectAllservices]]">
                                                            <div class="mdc-checkbox__background">
                                                            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                                                <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                                                            </svg>
                                                            <div class="mdc-checkbox__mixedmark"></div>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:200px;">[[localize('hub_itemtype','Type',language)]]</th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col">[[localize('hub_code','Code',language)]]</th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col">[[localize('hub_titl','Title',language)]]</th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:150px;">[[localize('hub_sta_dat','Start date',language)]]</th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:150px;">[[localize('hub_end_dat','End date',language)]]</th>
                                                    <template is="dom-if" if="[[hubSumehr]]">
                                                            <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:150px;">[[localize('exist-on-hub','Hub ?',language)]]</th>
                                                    </template>
                                                    <th class="mdc-data-table__header-cell mdc-data-table__header-cell--center" role="columnheader" scope="col">[[localize('confidential',"Confidential",language)]]</th>
                                                </tr>
                                            </thead>
                                            <tbody class="mdc-data-table__content">
                                                <template is="dom-repeat" items="[[newSumehr.services]]">
                                                    <tr class="mdc-data-table__row">
                                                        <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                                                            <div class="mdc-checkbox mdc-data-table__row-checkbox">
                                                                <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u0" checked="[[item.selectedForExport]]" on-tap="toggleSelectedForExportService" data-item-data\$="[[item]]">
                                                                <div class="mdc-checkbox__background">
                                                                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                                                        <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                                                                    </svg>
                                                                    <div class="mdc-checkbox__mixedmark"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="mdc-data-table__cell" style="width:200px;">
                                                            [[_localizedItemTypeFromTags(item, language)]]
                                                            <template is="dom-if" if="[[_itemTypeFromTagsMissing(item)]]">
                                                                PROBLEMS!!!
                                                            </template>
                                                        </td>
                                                        <td class="mdc-data-table__cell" id="codes2_[[item.id]]">
                                                            [[_baseCode2(item)]]
                                                            <paper-tooltip position="right">[[_allCodes2(item)]]</paper-tooltip>
                                                        </td>
                                                        <td class="mdc-data-table__cell" id="title2_[[item.id]]">
                                                            [[getServiceTitle(item)]]
                                                            <paper-tooltip position="left">[[getServiceTitle(item)]]</paper-tooltip>
                                                        </td>
                                                        <td class="mdc-data-table__cell" style="width:150px;">[[getMedicationStartDate(item)]]</td>
                                                        <td class="mdc-data-table__cell" style="width:150px;">[[getMedicationEndDate(item)]]</td>
                                                        <template is="dom-if" if="[[hubSumehr]]">
                                                            <td class="mdc-data-table__cell" style="width:150px;">[[_hasMatchOnHub(item)]]</td>
                                                        </template>
                                                        <td class="mdc-data-table__cell relative">
                                                            <paper-checkbox on-tap="_toggleConfidentiality" data-item-data\$="[[item]]" checked="[[_isConfidential(item)]]"></paper-checkbox>
                                                        </td>
                                                    </tr>
                                                </template>
                                            </tbody>
                                        </table>
                                    </div>
                                </template>
                                <template is="dom-if" if="[[!_hasItems(newSumehr.services, 'services')]]">
                                    <div class="headerMasterTitle headerLabel">[[localize("svcs","Services")]]</div>
                                    [[localize("hub_no_items_of_type_present", "No elements", language)]]
                                </template>
                                <template is="dom-if" if="[[_hasItems(newSumehr.partnerships, 'partnerships')]]">
                                    <div class="headerMasterTitle headerLabel">[[_getTraduction('partnerships')]]</div>
                                    <div class="mdc-data-table">
                                        <table class="mdc-data-table__table" aria-label="[[localize('svcs','Services')]]">
                                            <thead>
                                                <tr class="mdc-data-table__header-row">
                                                    <th class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader" scope="col">
                                                        <div class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected">
                                                            <input type="checkbox" class="mdc-checkbox__native-control" aria-label="Checkbox for header row selection" on-tap="selectAllpartnershipsChanged" checked="[[_selectAllpartnerships]]">
                                                            <div class="mdc-checkbox__background">
                                                            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                                                <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                                                            </svg>
                                                            <div class="mdc-checkbox__mixedmark"></div>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col">[[localize('hub_titl','Title',language)]]</th>
                                                    <template is="dom-if" if="[[hubSumehr]]">
                                                        <th class="mdc-data-table__header-cell" role="columnheader" scope="col">[[localize('exist-on-hub','Hub ?',language)]]</th>
                                                    </template>
                                                </tr>
                                            </thead>
                                            <tbody class="mdc-data-table__content">
                                                <template is="dom-repeat" items="[[newSumehr.partnerships]]">
                                                    <tr class="mdc-data-table__row">
                                                        <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                                                            <div class="mdc-checkbox mdc-data-table__row-checkbox">
                                                                <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u0" checked="[[item.selectedForExport]]" on-tap="toggleSelectedForExportPartnership" data-item-data\$="[[item]]">
                                                                <div class="mdc-checkbox__background">
                                                                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                                                        <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                                                                    </svg>
                                                                    <div class="mdc-checkbox__mixedmark"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="mdc-data-table__cell">[[getItemDesc(item)]]</td>
                                                        <template is="dom-if" if="[[hubSumehr]]">
                                                            <td class="mdc-data-table__cell">[[_hasMatchOnHub(item)]]</td>
                                                        </template>                                                            
                                                    </tr>
                                                </template>
                                            </tbody>
                                        </table>
                                    </div>
                                </template>
                                <template is="dom-if" if="[[_hasItems(newSumehr.patientHealthcareParties, 'patientHealthcareParties')]]">
                                    <div class="headerMasterTitle headerLabel">[[_getTraduction('adm_h_t')]]</div>
                                    <div class="mdc-data-table">
                                        <table class="mdc-data-table__table" aria-label="[[localize('svcs','Services')]]">
                                            <thead>
                                                <tr class="mdc-data-table__header-row">
                                                    <th class="mdc-data-table__header-cell mdc-data-table__header-cell--checkbox" role="columnheader" scope="col">
                                                        <div class="mdc-checkbox mdc-data-table__header-row-checkbox mdc-checkbox--selected">
                                                            <input type="checkbox" class="mdc-checkbox__native-control" aria-label="Checkbox for header row selection" on-tap="selectAllpatientHealthcarePartiesChanged" checked="[[_selectAllpatientHealthcareParties]]">
                                                            <div class="mdc-checkbox__background">
                                                            <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                                                <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                                                            </svg>
                                                            <div class="mdc-checkbox__mixedmark"></div>
                                                            </div>
                                                        </div>
                                                    </th>
                                                    <th class="mdc-data-table__header-cell" role="columnheader" scope="col">[[localize('hub_titl','Title',language)]]</th>
                                                    <template is="dom-if" if="[[hubSumehr]]">
                                                        <th class="mdc-data-table__header-cell" role="columnheader" scope="col">[[localize('exist-on-hub','Hub ?',language)]]</th>
                                                    </template>
                                                </tr>
                                            </thead>
                                            <tbody class="mdc-data-table__content">
                                                <template is="dom-repeat" items="[[newSumehr.patientHealthcareParties]]">
                                                    <tr class="mdc-data-table__row">
                                                        <td class="mdc-data-table__cell mdc-data-table__cell--checkbox">
                                                            <div class="mdc-checkbox mdc-data-table__row-checkbox">
                                                                <input type="checkbox" class="mdc-checkbox__native-control" aria-labelledby="u0" checked="[[item.selectedForExport]]" on-tap="toggleSelectedForExportPatientHealthcareParty" data-item-data\$="[[item]]">
                                                                <div class="mdc-checkbox__background">
                                                                    <svg class="mdc-checkbox__checkmark" viewBox="0 0 24 24">
                                                                        <path class="mdc-checkbox__checkmark-path" fill="none" d="M1.73,12.91 8.1,19.28 22.79,4.59"></path>
                                                                    </svg>
                                                                    <div class="mdc-checkbox__mixedmark"></div>
                                                                </div>
                                                            </div>
                                                        </td>
                                                        <td class="mdc-data-table__cell">[[getItemDesc(item)]]</td>
                                                        <template is="dom-if" if="[[hubSumehr]]">
                                                            <td class="mdc-data-table__cell">[[_hasMatchOnHub(item)]]</td>
                                                        </template>
                                                    </tr>
                                                </template>
                                            </tbody>
                                        </table>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </div>
                </template>
            </page>
            <page>  <!-- unmatched -->
                <div class="pageContent">
                    <div id="titleInfo">
                        [[_localizeTransactionType(transInfo)]]
                        <ht-spinner active="[[isLoading]]"></ht-spinner>
                    </div>
                    <template is="dom-if" if="[[!newSumehr]]"><ht-spinner active="[[true]]"></ht-spinner></template>
                    <template is="dom-if" if="[[newSumehr]]">
                        <div class="hub-doc">
                            <div class="blockInfo">
                                <div class="hub-doc-container">
                                    <template is="dom-if" if="[[_hasItems(unMatched, 'unmatched')]]">
                                        <div class="headerMasterTitle headerLabel">[[localize('sumehr_unmatched','Unmatched', language)]]</div>
                                        <table class="mdc-data-table__table" aria-label="[[localize('svcs','Services')]]">
                                                <thead>
                                                    <tr class="mdc-data-table__header-row">
                                                        <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:150px;">[[localize('hub_id','Id',language)]]</th>
                                                        <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:250px;">[[localize('type','Type',language)]]</th>
                                                        <th class="mdc-data-table__header-cell" role="columnheader" scope="col">[[localize('contents','Content',language)]]</th>
                                                        <th class="mdc-data-table__header-cell" role="columnheader" scope="col" style="width:150px; text-align:center">[[localize('import','Import',language)]]</th>
                                                    </tr>
                                                </thead>
                                                <tbody class="mdc-data-table__content">
                                                    <template is="dom-repeat" items="[[unMatched]]">
                                                        <tr class="mdc-data-table__row">
                                                            <td class="mdc-data-table__cell" style="width:150px;">[[_itemId(item)]]</td>
                                                            <td class="mdc-data-table__cell" style="width:250px;">[[_itemTypeFromCds(item)]]</td>
                                                            <td class="mdc-data-table__cell">[[_contentDesc(item)]]</td>
                                                            <td class="mdc-data-table__cell" style="width:150px; text-align:center">
                                                                <paper-icon-button icon="icons:cloud-download" on-tap="_importItemFromHub" data-item\$="[[item]]" class="button--icon-btn" id="importFileOnHub"></paper-icon-button>
                                                            </td>
                                                        </tr>
                                                    </template>
                                                </tbody>
                                            </table>
                                    </template>

                                </div>
                            </div>
                        </div>
                    </template>
                </div>
            </page>
            <page>  <!-- json -->
                <div class="pageContent">
                    <div class="hub-cons"> <!-- Notification input -->
                        <div>
                            <iron-autogrow-textarea class="paper-input-input" slot="input" id="transactionText" value="[[getJSON(newSumehr)]]"></iron-autogrow-textarea>
                        </div>

                    </div>
                </div>
            </page>
        </iron-pages>
`;
  }

  static get is() {
      return 'ht-pat-hub-transaction-preview';
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
          patient: {
              type: Object
          },
          language: {
              type: String
          },
          opened: {
              type: Boolean,
              value: false
          },
          tabs: {
              type: Number,
              value: 0
          },
          isLoading: {
              type: Boolean,
              value: false
          },
          transInfo: {
              type: Object,
              value: null
          },
          message: {
              type: Object,
              value: null
          },
          attachmentCount: {
              type: Number,
              value: 0
          },
          auditTrail: {
              type: Object,
              value: null
          },
          parent: {
              type: Object,
              value: null
          },
          selectedDocumentToBeImported: {
              type: Object,
              value: () => {
              }
          },
          currentContact: {
              type: Object
          },
          contacts: {
              type: Array
          },
          unMatched:{
              type: Array
          },
          newSumehr: {
              type: Object,
              value: null
          },
          hubSumehr: {
              type: Object,
              value: null
          },
          hubSumehrXml: {
              type: String,
              value: null
          },
          cdTransaction: {
              type: Object,
              value: () => [
                  {
                      type: 'contactreport', label: {en: 'Contact report', fr: 'Rapport de consultation'}
                  },
                  {
                      type: 'labresult', label: {en: 'Laboratory result', fr: 'Résultat de laboratoire'}
                  },
                  {
                      type: 'note', label: {en: "Note", fr: 'Note'}
                  },
                  {
                      type: 'report', label: {en: "Repport", fr: 'Rapport'}
                  },
                  {
                      type: 'diarynote', label: {en: "Diary note", fr: 'Note de journal'}
                  },
                  {
                      type: 'result', label: {en: "Result", fr: 'Résultat'}
                  }
              ]
          },
          currentMedicationScheme: {
              type: Object,
              value: null
          },
          isPreview: {
              type: Boolean,
              value: false
          },
          confidentialityItem: {
              type: Object,
              value: null
          },
          _bodyOverlay: {
              type: Boolean,
              value: false
          },
          _selectAllhealthElements:{
              type: Boolean,
              value: true
          },
          _selectAllservices:{
              type: Boolean,
              value: true
          },
          _selectAllpartnerships:{
              type: Boolean,
              value: true
          },
          _selectAllpatientHealthcareParties:{
              type: Boolean,
              value: true
          }
      };
  }

  static get observers() {
      return ['apiReady(api,user,opened)', 'sumehrChanged(newSumehr)'];
  }

  ready() {
      super.ready();
  }

  _isEqual(a, b) {
      return (a === b)
  }

  _yesOrNo(b) {
      return b ? this.localize('yes', 'yes', this.language) : this.localize('no', 'no', this.language)
  }

  isEven(n) {
      return n % 2 == 0;
  }

  apiReady() {
      if (!this.api || !this.user || !this.user.id || !this.opened) return;

      try {
      } catch (e) {
          console.log(e);
      }
  }

  attached() {
      super.attached();
      this.async(this.notifyResize, 1);
  }


  open(htPatHubDetail, newSumehr, hubSumehr, hubSumehrXml) {
      this.set('parent', htPatHubDetail)
      this.set('attachmentCount', 0);
      this.set('message', null);
      this.set('isLoading', true);
      this.set("unMatched", null)
      this.set('newSumehr', null);
      this.set('hubSumehr', null);
      this.set('hubSumehrXml', null);

      if(hubSumehr){
          this.shadowRoot.getElementById("tabUnmatched").classList.remove("doNotDisplay")
      }else{
          this.shadowRoot.getElementById("tabUnmatched").classList.add("doNotDisplay")
      }
      if(newSumehr) {
          newSumehr = this.removeIncompleteServices(newSumehr);
          newSumehr = this.removeEndedMedications(newSumehr);
          newSumehr = this.removeTreatedServices(newSumehr);
          newSumehr = this.removeUndefinedPatientWillOldFormat(newSumehr);
          newSumehr = this.removePatientWillFIXME(newSumehr);
          newSumehr = this.removeNotExportedPatientWill(newSumehr); //todo: change: translate the will to new format
          newSumehr = this.sortItems(newSumehr);
          newSumehr = this.insertTypeSeparators(newSumehr);
          newSumehr = this.removeIncompleteHealthElements(newSumehr);
          this.matchSumehrElements(newSumehr, hubSumehr);
          this.checkAll2('healthElements', newSumehr.healthElements);
          this.checkAll2('services', newSumehr.services);
          this.checkAll2('partnerships', newSumehr.partnerships);
          this.checkAll2('patientHealthcareParties', newSumehr.patientHealthcareParties);
          this.set('hubSumehrXml', hubSumehrXml); //used by the backend import
          this.set('newSumehr', newSumehr);
          this.set('hubSumehr', hubSumehr);
          this.set('isLoading', false);
      } else {

      }
  }

  removeEndedMedications(newSumehr){
      const now = moment();
      const endedMed = newSumehr.services.filter(svc => svc.content && (this._itemTypeFromTags(svc) === "medication" || this._isIcurePresc(svc)) && this.getMedicationEndMoment(svc) && this.getMedicationEndMoment(svc) < now);
      console.log("endedMedications", endedMed);
      newSumehr.services = newSumehr.services.filter(svc => !endedMed.map(isvc => isvc.id).includes(svc.id));
      return newSumehr;
  }

  getMedicationEndMoment(svc) {
      const med = svc.content ? this.api.contact().preferredContent(svc, this.language).medicationValue : null;
      return med && med.endMoment ? this.api.moment(med.endMoment) : null
  }

  removeIncompleteServices(newSumehr){
      //TODO: tags of medications are not always needed
      const svcNoCode = newSumehr.services.filter(svc => !svc.codes || svc.codes.length == 0);
      const svcNoCdItem = newSumehr.services.filter(svc => !svc.tags || svc.tags.length === 0 || svc.tags.filter(tag => tag.type === "CD-ITEM").length === 0);
      console.log("incompleteServices", svcNoCode, svcNoCdItem);
      //newSumehr.services = newSumehr.services.filter(svc => !svcNoCdItem.map(isvc => isvc.id).includes(svc.id));
      return newSumehr;
  }

  removeIncompleteHealthElements(newSumehr){
      //TODO: tags of medications are not always needed
      //const svcNoCode = newSumehr.healthElements.filter(svc => !svc.codes || svc.codes.length == 0);
      const svcNoCdItem = newSumehr.healthElements.filter(svc => !svc.tags || svc.tags.length === 0 || svc.tags.filter(tag => tag.type === "CD-ITEM").length === 0);
      console.log("incompleteServices", svcNoCdItem);
      newSumehr.healthElements = newSumehr.healthElements.filter(svc => !svcNoCdItem.map(isvc => isvc.id).includes(svc.id));
      return newSumehr;
  }

  removeTreatedServices(newSumehr){
      const servicesIdsWithHE = newSumehr.services.filter(svc => svc && svc.healthElementsIds && svc.healthElementsIds.length && svc.healthElementsIds.length > 0);
      const treatedServiceIds = newSumehr.healthElements.filter(he => he.idService).map(he => he.idService).concat(servicesIdsWithHE.map(svc => svc.id));
      console.log("treatedServiceIds", treatedServiceIds);
      newSumehr.services = newSumehr.services.filter(svc => !treatedServiceIds.includes(svc.id));
      return newSumehr;
  }

  removeUndefinedPatientWillOldFormat(newSumehr){
      const svcPW = newSumehr.services.filter(svc => svc && svc.codes && svc.codes.find(c => c.type === "CD-PATIENTWILL"));
      const svcUnd = svcPW.filter(svc => svc.content && svc.content.descr && svc.content.descr.stringValue && (svc.content.descr.stringValue === "authorize" || svc.content.descr.stringValue === "undefined" || svc.content.descr.stringValue === "﻿\r\n"));
      newSumehr.services = newSumehr.services.filter(svc => !svcUnd.map(isvc => isvc.id).includes(svc.id));
      return newSumehr;
  }

  removePatientWillFIXME(newSumehr){
      const svcPW = newSumehr.services.filter(svc => svc && svc.tags && svc.tags.find(c => c.code === "MS-FIXME-note"));
      newSumehr.services = newSumehr.services.filter(svc => !svcPW.map(isvc => isvc.id).includes(svc.id));
      return newSumehr;
  }

  removeNotExportedPatientWill(newSumehr){
      newSumehr.services = newSumehr.services.filter(svc => !this.api.contact().preferredContent(svc, this.language)
      || !this.api.contact().preferredContent(svc, this.language).stringValue
      || (!this.api.contact().preferredContent(svc, this.language).stringValue.includes('|noconsent')
          && !this.api.contact().preferredContent(svc, this.language).stringValue.includes('|notasked')));
      return newSumehr;
  }

  sortItems(newSumehr){
      //_itemTypeFromTags
      newSumehr.healthElements.forEach(itm => itm.resolvedType = this._itemTypeFromTags(itm));
      newSumehr.services.forEach(itm => itm.resolvedType = this._itemTypeFromTags(itm));
      newSumehr.healthElements = _.orderBy(newSumehr.healthElements, ['resolvedType'], ['asc']);
      newSumehr.services = _.orderBy(newSumehr.services, ['resolvedType'], ['asc']);
      return newSumehr;
  }

  insertTypeSeparators(newSumehr){
      // const hes = _.groupBy(newSumehr.healthElements, 'resolvedType');
      // const svs = _.groupBy(newSumehr.services, 'resolvedType');
      //
      // let prevType = newSumehr.healthElements[newSumehr.healthElements.length - 1].resolvedType;
      // for(let i = newSumehr.healthElements.length - 1; i >= 0; i--){
      //     const curType = newSumehr.healthElements[i].resolvedType;
      //     if(prevType !== curType){
      //         newSumehr.healthElements.splice(i + 1, 0, {separator:'true', type:prevType, resolvedType:"---" + prevType});
      //         prevType = curType;
      //     }
      // }
      // newSumehr.healthElements.splice(0, 0, {separator:'true', type:prevType, resolvedType:"---" + prevType});
      //
      // console.log("insertTypeSeparators", hes, svs);
      return newSumehr;
  }

  //find corresponding info between new generated sumehr and the version on the hub,
  matchSumehrElements(newSumehr, hubSumehr){
      if(newSumehr && hubSumehr) {
          let unMatched = [];
          let matched = [];
          console.log("newSumehrContent", JSON.stringify(newSumehr));
          //Set all ItemIds
          if(hubSumehr && hubSumehr.folders && hubSumehr.folders[0].transactions){
              //"[itemId]" OR "[headingId]/[itemId]"
              hubSumehr.folders[0].transactions[0].item.map(itm => itm.itemId = itm.ids.find(id => id.s === "ID_KMEHR") ? itm.ids.find(id => id.s === "ID_KMEHR").value : "0");
              hubSumehr.folders[0].transactions[0].heading.map(head =>
                  {
                      let headingId = head.ids.find(id => id.s === "ID_KMEHR") ? head.ids.find(id => id.s === "ID_KMEHR").value : "0";
                      head.item.map(itm => itm.itemId = headingId + "/" + (itm.ids.find(id => id.s === "ID_KMEHR") ? itm.ids.find(id => id.s === "ID_KMEHR").value : ""));
                  }
              )
          }
          //collect all items ( transaction.item[] and transaction.heading[].item[])
          const items = hubSumehr && hubSumehr.folders && hubSumehr.folders[0].transactions ? hubSumehr.folders[0].transactions[0].item.concat(_.flatMap(hubSumehr.folders[0].transactions[0].heading.map(h => h.item))).filter(item => !item.cds || (item.cds && !item.cds.find(cd => cd.nullFlavor && cd.nullFlavor === "NA"))) : [];

          console.log(items);
          items.forEach(it => {
              //1.has icure id ? [iCure-Person-Id, iCure-Item(transaction), *iCure-Service, iCure-Label, *iCure-HealthElement]
              const icureId = it.ids.find(id => id.sl === "iCure-HealthElement" || id.sl === "iCure-Service" || id.sl === "iCure-Person-Id");
              if(icureId){
                  //1.1  matches ?
                  const match = newSumehr.services.filter(svc => svc.id === icureId.value).concat(newSumehr.healthElements.filter(he => he.id === icureId.value));
                  if (match.length > 0){
                      console.log("icureid: match found : ", match);
                      matched.push({"hubItem":it,"newItem": match[0]});
                      match[0].match = it;
                  } else {
                      console.log("icureid: no match found for : ", icureId);
                      unMatched.push(it)
                  }
              } else {
                  console.log("no icureid");
                  let match = null;
                  newSumehr.services.forEach(newItem => {
                      if(this.codeMatch(newItem, it, "service") && this.typeMatch(newItem, it) && this.dateMatch(newItem, it)) {
                          match = {"hubItem":it,"newItem": newItem};
                          console.log("byvalue: match found : ", match);
                          newItem.match = it;
                      }
                  });
                  newSumehr.healthElements.forEach(newItem => {
                      if(this.codeMatch(newItem, it, "healthelement") && this.typeMatch(newItem, it) && this.dateMatch(newItem, it)) {
                          match = {"hubItem":it,"newItem": newItem};
                          console.log("byvalue: match found : ", match);
                          newItem.match = it;
                      }
                  });
                  newSumehr.partnerships.forEach(ps =>{
                      const pers = it.contents && it.contents.length > 0 && it.contents[0].person ? it.contents[0].person : null;
                      if(pers && this.personMatch(ps, pers)){
                          match = {"hubItem":it,"newItem": ps};
                          console.log("byvalue: person match found : ", match);
                          ps.match = it;
                      }
                  });
                  newSumehr.patientHealthcareParties.forEach(ph => {
                      const hcp = it.contents && it.contents.length > 0 && it.contents[0].hcparty ? it.contents[0].hcparty : null;
                      if(hcp && this.hcpMatch(ph, hcp)){
                          match = {"hubItem":it,"newItem": ph};
                          console.log("byvalue: hcp match found : ", match);
                          ph.match = it;
                      }
                  });
                  if(match){
                      matched.push(match)
                  }else{
                      if(it.ids && it.ids.length > 0){
                          console.log("byvalue: no match found : ", it);
                          unMatched.push(it);
                      } else{
                          console.log("byvalue: no match found ignored, no ids: ", it);
                      }
                  }
              }
          });
          console.log("matched:", matched);
          console.log("unmatched:", unMatched);
          this.set("unMatched", unMatched)
      }
      //note: when item has an icure id matching can be done on this first

      //matching
      // icureId ? match ? :
      //   he by code (icpc, icd, ...) and type (he, risk, ...) and startDate ?
      //     startDate: add tolerance (1 week ?, 1month ?)
      //                earliest wins/local wins
      //   medication by code (atc, cnk, ...) and startDate
      //      posology: merge ?
      //      startDAte: no tolerance ?

  }

  hcpMatch(newHcp, hubHcp){
      return hubHcp.ids.find(id => id.s === "ID_HCPARTY").value === newHcp.healthcareParty.nihii;
  }

  personMatch(newPerson, hubPerson){
      const newSsin = newPerson.patient.ssin;
      //TODO: find hubPerson ssin
      const hubSsin = "---";
      // const newName = newPerson.lastName + "/" + newPerson.firstName;
      // const hubName = hubPerson ? (hubPerson.firstNames && hubPerson.firstNames.length > 0 ? (hubPerson.firstNames.join(" ")) : "") + (hubPerson.familyname ? hubPerson.familyname : "") : "";
      const icureid = hubPerson.ids.find(id => id.sl === "iCure-Person-Id");
      if(icureid){
          if(icureid.value === newPerson.partnerId) console.log("person match by icureid", icureid.value);
          return icureid.value === newPerson.partnerId;
      }else{
          return newSsin === hubSsin;
      }
  }

  codeMatch(newItem, hubItem, type){
      let matches = [];
      const heCodeTypesMap = [{new:"ICPC", hub:"ICPC"},{new:"ICD", hub:"ICD"},{new:"BE-THESAURUS", hub:"CD_CLINICAL"},
          {new: "CD-DRUG-CNK", hub:"CD_DRUG_CNK"}, {new: "CD-ATC", hub:"CD_ATC"}, {new: "CD-INNCLUSTER", hub:"CD_INNCLUSTER"}] //TODO: CD-CLINICAL or CD_CLINICAL ???
      //const medCodeTypes = ["CD-DRUG-CNK", "CD-ATC", "CD-INNCLUSTER"]; //TODO: missing: magistral/compound prescription
      if(type ==="healthelement" || type==="service"){
          //hub: item.contents[].cds[].s => .value
          //new: item.codes[].type => .code
          heCodeTypesMap.forEach(ct => {
              const newValue = newItem.codes.find(c => c.type === ct.new) ? newItem.codes.find(c => c.type === ct.new).code : null
              let tmp = hubItem.contents.find(c => c.cds.find(cd => cd.s === ct.hub));
              let hubValue = tmp ? (tmp.cds.find(cd => cd.s === ct.hub).value) : null;
              if(!tmp && newValue) {
                  tmp = hubItem.contents.find(cont => cont.medicinalproduct && cont.medicinalproduct.intendedcds.find(cd => cd.s === ct.hub));
                  hubValue = tmp ? (tmp.medicinalproduct.intendedcds.find(cd => cd.s === ct.hub).value) : null;
              }
              if(!tmp && newValue) {
                  tmp = hubItem.contents.find(cont => cont.substanceproduct && cont.substanceproduct.intendedcd.s === ct.hub);
                  hubValue = tmp ? tmp.substanceproduct.intendedcd.value : null;
              }
              //if(tmp) console.log("hubValue:", hubValue, ct.hub);
              if(newValue && hubValue && (newValue === hubValue)) {
                  //console.log("matched on : ", ct.hub, newValue);
                  matches.push(true)
              } else {
                  matches.push(false);
              }
          })
      } else if (type === "hcp"){

      } else if (type === "partnership"){

      }
      //console.log("matches", matches, "result",  !!matches.find(m => m));
      return !!matches.find(m => m);
  }

  typeMatch(newItem, hubItem){
      //TODO: match by type (optional)
      return true;
  }

  dateMatch(newItem, hubItem){
      //TODO: match by date (optional)
      return true;
  }

  sumehrChanged(sumehr) {
      if(sumehr) {
          this.checkAll2('healthElements', this.newSumehr.healthElements);
          this.checkAll2('services', this.newSumehr.services);
          this.checkAll2('partnerships', this.newSumehr.partnerships);
          this.checkAll2('patientHealthcareParties', this.newSumehr.patientHealthcareParties);
      } else {

      }
  }

  toggleSelectedForExportHealthElement(e){
      const tmpItem = JSON.parse(_.get(e, "target.dataset.itemData", "{}"));
      //console.log("toggleSelectedForExport", tmpItem);
      //item.selectedForExport = !item.selectedForExport;
      const item = this.newSumehr.healthElements.find(he => he.id === tmpItem.id);
      if(item){
          item.selectedForExport = !item.selectedForExport;
      }
      console.log(this.newSumehr.healthElements.map(he => he.selectedForExport));
  }

  toggleSelectedForExportService(e){
      const tmpItem = JSON.parse(_.get(e, "target.dataset.itemData", "{}"));
      //console.log("toggleSelectedForExport", tmpItem);
      //item.selectedForExport = !item.selectedForExport;
      const item = this.newSumehr.services.find(he => he.id === tmpItem.id);
      if(item){
          item.selectedForExport = !item.selectedForExport;
      }
      console.log(this.newSumehr.services.map(he => he.selectedForExport));
  }

  toggleSelectedForExportPartnership(e){
      const tmpItem = JSON.parse(_.get(e, "target.dataset.itemData", "{}"));
      //console.log("toggleSelectedForExport", tmpItem);
      //item.selectedForExport = !item.selectedForExport;
      const item = this.newSumehr.partnerships.find(he => he.partnerId === tmpItem.partnerId);
      if(item){
          item.selectedForExport = !item.selectedForExport;
      }
      console.log(this.newSumehr.partnerships.map(he => he.selectedForExport));
  }

  toggleSelectedForExportPatientHealthcareParty(e){
      const tmpItem = JSON.parse(_.get(e, "target.dataset.itemData", "{}"));
      //console.log("toggleSelectedForExport", tmpItem);
      //item.selectedForExport = !item.selectedForExport;
      const item = this.newSumehr.patientHealthcareParties.find(he => he.healthcarePartyId === tmpItem.healthcarePartyId);
      if(item){
          item.selectedForExport = !item.selectedForExport;
      }
      console.log(this.newSumehr.patientHealthcareParties.map(he => he.selectedForExport));
  }

  selectAllhealthElementsChanged(e){
      console.log('selectAllhealthElementsChanged');
      if(this.newSumehr && this.newSumehr.healthElements) {
          this._toggleSelectAll('healthElements', this.newSumehr.healthElements);
          console.log(this.newSumehr.healthElements.map(he => he.selectedForExport));
          //this.shadowRoot.querySelector('#tblHealthElements').render();
      }
  }

  selectAllservicesChanged(e){
      console.log('selectAllservicesChanged');
      if(this.newSumehr && this.newSumehr.services) {
          this._toggleSelectAll('services', this.newSumehr.services);
          console.log(this.newSumehr.services.map(svc => svc.selectedForExport));
          //this.shadowRoot.querySelector('#tblHealthElements').render();
      }
  }

  selectAllpartnershipsChanged(e){
      console.log('selectAllpartnershipsChanged');
      if(this.newSumehr && this.newSumehr.partnerships) {
          this._toggleSelectAll('partnerships', this.newSumehr.partnerships);
          console.log(this.newSumehr.partnerships.map(svc => svc.selectedForExport));
          //this.shadowRoot.querySelector('#tblHealthElements').render();
      }
  }

  selectAllpatientHealthcarePartiesChanged(e){
      console.log('selectAllpatientHealthcarePartiesChanged');
      if(this.newSumehr && this.newSumehr.patientHealthcareParties) {
          this._toggleSelectAll('patientHealthcareParties', this.newSumehr.patientHealthcareParties);
          console.log(this.newSumehr.patientHealthcareParties.map(svc => svc.selectedForExport));
          //this.shadowRoot.querySelector('#tblHealthElements').render();
      }
  }

  _toggleSelectAll(listName, list){
      const allSelected = this.get('_selectAll' + listName) === true;
      this.checkAll2(listName, list, !allSelected);
      this.set('_selectAll' + listName, !allSelected);
  }

  checkAll2(listName, list, value = true){
      return list && list.length ? list.forEach((itm, index) =>  {
          this.set('newSumehr.' + listName + '.' + index + '.selectedForExport', value)
      }) : list;
  }

  getItemsToExclude() {
      let unSelectedHe  = this.newSumehr.healthElements.filter(it => !it.selectedForExport);
      let unSelectedSvc = this.newSumehr.services.filter(it => !it.selectedForExport);
      let unSelectedPar = this.newSumehr.partnerships.filter(it => !it.selectedForExport);
      let unSelectedHcp = this.newSumehr.patientHealthcareParties.filter(it => !it.selectedForExport);

      unSelectedPar.map(par => par.id = par.partnerId);
      unSelectedHcp.map(hcp => hcp.id = hcp.healthcarePartyId);

      return unSelectedHe.concat(unSelectedSvc).concat(unSelectedPar).concat(unSelectedHcp);
  }

  getIdsToExclude() {
      return this.getItemsToExclude() ? this.getItemsToExclude().map(item => item.id) : [];
  }

  getJSON(obj) {
      return JSON.stringify(obj);
  }

  _hasItems(arr, lg){
      console.log("hasItems", lg, arr);
      return arr && arr.length;
  }

  _hasItemsByType(services, type){
      const arr = this._getItemsByType(services, type)
      console.log("_hasItemsByType", type, arr);
      return arr && arr.length;
  }

  _hasItemsNotByType(services, type){
      const arr = this._getItemsNotByType(services, type)
      console.log("_hasItemsNotByType", type, arr);
      return arr && arr.length;
  }

  _getItemsByType(services, type) {
      return services && services.length ? services.filter(svc => svc.tags.find(tag => tag.code === type)) : [];
  }

  _getItemsNotByType(services, type) {
      return services && services.length ? services.filter(svc => svc.tags.find(tag => tag.code !== type)) : [];
  }

  _transactionId(tr) {
      if (tr && tr.ids) {
          const id = tr.ids.find(id => id.s === "LOCAL");
          if (id) {
              return (id.sl ? id.sl : "") + "/" + (id.value ? id.value : "");
          } else {
              return "--";
          }
      } else {
          return "";
      }
  }

  _transactionDate(tr) {
      if (tr && tr.date) {
          var d = new Date(0);
          d.setUTCMilliseconds(tr.date);
          return d.toDateString();
      } else {
          return "";
      }
  }

  dateFormat(date) {
      if (date && date.date && date.date.millis) {
          let d = new Date(0);
          d.setUTCMilliseconds(date.date.millis);
          return d.toDateString();
      } else {
          return ""
      }
  }

  fromYYYYMMDDHHmmss(num) {
      if (num) {
          const str = num.toString()
          const year = str.substring(0, 4);
          const month = str.substring(4, 6);
          const day = str.substring(6, 8);
          const hour = str.substring(8, 10);
          const minute = str.substring(10, 12);
          const second = str.substring(12, 14);
          return day + "/" + month + "/" + year + " (" + hour + ":" + minute + ")"
      } else {
          return null
      }
  }

  _transactionAuthor(tr) {
      if (tr) {
          var authorRes = "--";
          const author = tr.author.hcparties.find(hcp => hcp.familyname);
          if (author) {
              authorRes = author.familyname + ' ' + author.firstname;
          }
          const dept = tr.author.hcparties.find(hcp => hcp.cds.find(cd => cd.s === "CD-HCPARTY"))
          if (dept) {
              const cd = dept.cds.find(cd => cd.s === "CD-HCPARTY")
              authorRes += "/" + cd.value;
          }
          return authorRes;
      } else {
          return "";
      }
  }

  _transactionType(tr) {
      if (tr) {
          const cdTransType = tr.cds.find(cd => cd.s === "CD-TRANSACTION");
          if (cdTransType) {
              return cdTransType.value;
          } else {
              return "--";
          }
      } else {
          return "";
      }
  }

  _localizeTransactionType(tr) {
      if (tr) {
          const cdTransType = tr.cds.find(cd => cd.s === "CD-TRANSACTION");
          if (cdTransType) {
              return this.localize("cd-transaction-" + cdTransType.value, cdTransType.value, this.language);
          }

      }
  }

  close() {
      this.$.dialog.close();
  }

  _getHcpInfo(hcps) {
      let hcpInfo = []

      if (hcps) {
          hcps.map(hcp => {
              hcp && hcp.cds && hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY") && hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY").value !== "hub" ?
                  hcpInfo.push({
                      name: hcp.name || null,
                      firstName: hcp.firstname || null,
                      familyName: hcp.familyname || null,
                      inss: hcp && hcp.ids && hcp.ids.find(id => id && id.s === 'INSS') && hcp.ids.find(id => id && id.s === 'INSS') ? hcp.ids.find(id => id && id.s === 'INSS').value : null,
                      nihii: hcp && hcp.ids && hcp.ids.find(id => id && id.s === 'ID_HCPARTY') && hcp.ids.find(id => id && id.s === 'ID_HCPARTY').value ? hcp.ids.find(id => id && id.s === 'ID_HCPARTY').value : null,
                      type: hcp && hcp.cds && hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY") && hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY").value ? hcp.cds.find(cd => cd && cd.s === "CD_HCPARTY").value : null,
                      addresses: this._getAdresses(hcp.addresses) || [],
                      telecoms: this._getTelecoms(hcp.telecoms) || []
                  }) : null
          })
      }

      return hcpInfo
  }

  _getPersonInfo(person) {
      let personInfo = {}

      person ?
          personInfo = {
              inss: person.ids && person.ids.find(id => id.s === "INSS") && person.ids.find(id => id.s === "INSS").value ? person.ids.find(id => id.s === "INSS").value : null,
              firstName: person.firstnames.join(' ') || null,
              familyName: person.familyname || null,
              birthdate: person.birthdate || null,
              deathdate: person.deathdate || null,
              sex: person.sex && person.sex.value || null,
              addresses: this._getAdresses(person.addresses) || [],
              telecoms: this._getTelecoms(person.telecoms) || [],
              type: person && person.cds && person.cds.find(cd => cd && cd.s === "CD_HCPARTY") && person.cds.find(cd => cd && cd.s === "CD_HCPARTY").value ? person.cds.find(cd => cd && cd.s === "CD_HCPARTY").value : null,
          }
          : null

      return personInfo

  }


  _getAdresses(addresses) {
      let addressesInfo = []
      addresses.map(adr => addressesInfo.push({
              addressType: adr && adr.cds && adr.cds.find(cd => cd.s === "CD_ADDRESS") && adr.cds.find(cd => cd.s === "CD_ADDRESS").value ? adr.cds.find(cd => cd.s === "CD_ADDRESS").value : null,
              country: adr && adr.country && adr.country.cd && adr.country.cd.s && adr.country.cd.s === "CD_FED_COUNTRY" && adr.country.cd.value ? adr.country.cd.value : null,
              zip: adr.zip || null,
              nis: adr.nis || null,
              city: adr.city || null,
              district: adr.district || null,
              street: adr.street || null,
              houseNumber: adr.housenumber || null,
              postboxNumber: adr.postboxnumber || null
          })
      )

      return addressesInfo
  }

  _getTelecoms(telecoms) {
      let telecomInfo = []
      telecoms.map(tel => telecomInfo.push({
          addressType: tel && tel.cds && tel.cds.find(cd => cd.s === "CD_ADDRESS") && tel.cds.find(cd => cd.s === "CD_ADDRESS").value ? tel.cds.find(cd => cd.s === "CD_ADDRESS").value : null,
          telecomType: tel && tel.cds && tel.cds.find(cd => cd.s === "CD_TELECOM") && tel.cds.find(cd => cd.s === "CD_TELECOM").value ? tel.cds.find(cd => cd.s === "CD_TELECOM").value : null,
          telecomNumber: tel.telecomnumber
      }))

      return telecomInfo
  }

  _getContentCds(cds) {
      let cdsInfo = []
      cds ? cds.map(cd => {
          cdsInfo.push({s: cd.s, value: cd.value})
      }) : null
      return cdsInfo
  }

  _getContentTexts(texts) {
      let textInfo = []
      texts ? texts.map(txt => {
          textInfo.push({txtValue: txt.value, lang: txt.l})
      }) : null
      return textInfo
  }

  _getTraduction(type) {
      return this.localize(type, type, this.language)
  }


  getMedicationTitle(contents) {
      const med = contents ? _.flatMap(contents)[0].medicationValue : null;
      let title = med && med.medicinalProduct ? med.medicinalProduct.intendedname : (med && med.substanceProduct ? med.substanceProduct.intendedname : (med && med.compoundPrescription ? med.compoundPrescription : "/"))
      if(!title || title === ""){
          title = "get title form content";
      }
      return title
  }

  getServiceTitle(item) {
      if(this._itemTypeFromTags(item) === "medication") {
          return this.getMedicationTitle(item.content);
      } else if(this._itemTypeFromTags(item) === "patientwill"){
          return this.getPatientWillType(item);
      } else {
          const tmp = item.content ? _.flatMap(item.content)[0] : null;
          return tmp && tmp.stringValue ? tmp.stringValue : (this.getMedicationTitle(item.content));
      }
  }

  getPatientWillType(svc){
      console.log("getPatientWillType", this.api.contact().preferredContent(svc, this.language), svc);
      const cnt = this.api.contact().preferredContent(svc, this.language).stringValue;
      let resp = cnt.split("|") && cnt.split("|").length && cnt.split("|").length > 1 ? cnt.split("|")[1] : ""
      resp = resp.includes('hos') ? this.localize('cd-patientwill-hos-' + resp, resp, this.language)
          : (resp.includes('dnr') ? this.localize('cd-patientwill-res-' + resp, resp, this.language)
              : this.localize("patientwilldialog_" + resp, resp, this.language));
      return resp ? resp : "";
  }

  isMedication(item){
      return this._itemTypeFromTags(item) === "medication";
  }

  _formatDate(date){
      return date ? this.api.formatedMoment(date).substring(0, 10) : "";
  }

  getMedicationStartDate(svc) {
      const med = svc.content ? _.flatMap(svc.content)[0].medicationValue : null;
      return this._formatDate(med && med.beginMoment ? med.beginMoment : (svc.openingDate ? svc.openingDate : svc.valueDate));
  }

  getMedicationEndDate(svc) {
      const med = svc.content ? _.flatMap(svc.content)[0].medicationValue : null;
      return this._formatDate(med && med.endMoment ? med.endMoment : "")
  }

  getRegimen(contents) {
      return _.flatMap(contents)[0] && _.flatMap(contents)[0].medicationValue && _.flatMap(contents)[0].medicationValue.regimen ? _.flatMap(contents)[0].medicationValue.regimen : [];
  }

  _getTitle(contents, type) {
      return type === "medication" || type === "vaccine" ? _.compact(_.flatten(contents.map(ct => ct.medicinalproduct))).map(med => med.intendedname).join(',') || null : _.flatten(contents.map(ct => ct.texts.map(txt => txt.txtValue))).join(',') || null
  }

  _getCode(contents, type) {
      let codeList = []
      contents.map(ct => ct.cds.map(cd => {
          codeList.push({
              value: cd.value,
              code: cd.s === "CD_CLINICAL" ? "Ibui: " :
                  cd.s === "CD_ATC" ? "Atc: " :
                      cd.s === "CD_VACCINEINDICATION" ? "" :
                          cd.s === "ICD" ? "Icd: " :
                              cd.s === "ICPC" ? "Icpc: " :
                                  cd.s === "CD_PATIENTWILL" ? "" :
                                      cd.s + ": "
          })
      }))

      return codeList
  }

  _ifTableView(type) {
      return type === "gmdmanager" || type === "contactperson" || type === "contacthcparty" || type === "patientwill" ? false : true
  }

  _isSumehrType(transInfo) {
      return this._transactionType(transInfo) === "sumehr" ? true : false
  }

  _isHcp(type) {
      return type === "gmdmanager" || type === "contacthcparty" ? true : false
  }

  _isPerson(type) {
      return type === "contactperson" ? true : false
  }

  _isAuthor(hcp) {
      return hcp && hcp.length > 0 ? true : false
  }

  _isRedactor(hcp) {
      return hcp && hcp.length > 0 ? true : false
  }

  _isMedicationView(docType) {
      return docType && docType.desc && docType.desc === "medicationscheme" ? true : false
  }

  _localizeHcpType(type) {
      return this.localize("cd-hcp-" + type, type, this.language)
  }

  _isPatientWill(transactionType) {
      return transactionType === "patientwill" ? true : false
  }

  _isVaccineData(transactionType) {
      return transactionType === "vaccine" ? true : false
  }

  _isMedicationData(transactionType) {
      return transactionType === "medication" ? true : false
  }

  _isOtherData(transactionType) {
      return transactionType !== "medication" && transactionType !== "vaccine" ? true : false
  }

  _getPatientWill(cds) {
      return cds.s === "CD_PATIENTWILL" ? this.localize('cd-patientwill-' + cds.value, cds.value, this.language) :
          cds.s === "CD_PATIENTWILL_HOS" ? this.localize('cd-patientwill-hos-' + cds.value, cds.value, this.language) :
              cds.s === "CD_PATIENTWILL_RES" ? this.localize('cd-patientwill-res-' + cds.value, cds.value, this.language) :
                  cds.value
  }

  _getPosology(item) {
      if (item && item.posology) {
          //const posology = item.posology || null

      }
  }

  _getDayTimeDesc(dayTime) {

      return !isNaN(dayTime) ? this._getTimeDesc(dayTime) : this.localize('ms_' + _.toLower(dayTime), _.toLower(dayTime), this.language);
  }

  _getTimeDesc(time) {
      return time && time.toString().length >= 14 ? time.toString().substr(8, 2) + ":" + time.toString().substr(10, 2) : "";
  }

  _isChronic(temporality) {
      return temporality && temporality === "CHRONIC" ? true : false
  }

  _isOneShot(temporality) {
      return temporality && temporality === "ONESHOT" ? true : false
  }

  _localizeVaccine(value) {
      return value && this.localize("cd-vaccine-indication-" + value, value, this.language)
  }

  _itemTypes(items) {
      const tgs = items ? _.uniq(_.flatMap(items.map(itm => itm.tags.filter(tag => tag.type === "CD-ITEM").map(tag => tag.code)))) : [];
      console.log("itemTypes", tgs);
      return tgs;
  }

  _localizedItemTypeFromTags(item, language){
      return this.localize(this._itemTypeFromTags(item), this._itemTypeFromTags(item), language)
  }

  _itemTypeFromTags(item){
      return item && item.tags && item.tags.find(tag => tag.type === "CD-ITEM") ? item.tags.find(tag => tag.type === "CD-ITEM").code : "";
  }

  _isIcurePresc(item){
      return item && item.tags && item.tags.find(tag => tag.type === "ICURE" && tag.code === "PRESC") ? true : false;
  }

  _itemTypeFromTagsMissing(item){
      return this._itemTypeFromTags(item) ? false : true;
  }

  _itemTypeFromCds(item){
      return item.cds && item.cds.find(cd => cd.s === "CD_ITEM") ? item.cds.find(cd => cd.s === "CD_ITEM").value : "";
  }

  _beginDate(item){
      return ""
  }

  _endDate(item){
      return ""
  }

  _lifecycle(item){

  }

  _contentDesc(item){
      let txt = "";
      const type = this._itemTypeFromCds(item);
      switch(type){
          case "contacthcparty":
          case "gmdmanager":
              //nihii, type, name
              txt = item.contents[0].hcparty.ids.find(id => id.s === "ID_HCPARTY").value
                  + " " + item.contents[0].hcparty.cds.find(cd => cd.s === "CD_HCPARTY").value
                  + " " + item.contents[0].hcparty.name;
              break;
          case "contactperson":
              txt = item.contents[0].person.firstnames.join(" ")
              + " " + item.contents[0].person.familyname;
              break;
          case "healthcareelement":
          case "problem": {
              //content.text, content.cds, begindate, lifecycle
              //nullFlavor="NA" : no problem exists
              const na = !!item.cds.find(cd => cd.s === "CD-ITEM" && cd.nullFlavor === "NA");
              txt = _.flatMap(item.contents.map(cnt => cnt.cds.map(cd => cd.s + " " + cd.value))).join();
              txt += _.flatMap(item.contents.map(cnt => cnt.texts.map(t => t.value))).join();
              break;
              }
          case "patientwill":
              //text, cds: CD_PATIENTWILL, value-> ntbr (deprecated),bloodtransfusionrefusal,intubationrefusal,euthanasiarequest,vaccinationrefusal,organdonationconsent,datareuseforclinicalresearchconsent,datareuseforclinicaltrialsconsent,clinicaltrialparticipationconsent,omissionofmedicaldata
              //      cds: CD_PATIENTWILL_HOS, value-> map to hos0-2
              //      cds: CD-PATIENTWILL-RES, value-> map to dnr0-3
              txt = _.flatMap(item.contents.map(cnt => cnt.cds.find(cd => cd.s === "CD_PATIENTWILL") ? cnt.cds.find(cd => cd.s === "CD_PATIENTWILL").value : null).map(val => val ? this.localize("cd-patientwill-" + val, val, this.language) : null)).join();
              txt += _.flatMap(item.contents.map(cnt => cnt.cds.find(cd => cd.s === "CD_PATIENTWILL_HOS") ? cnt.cds.find(cd => cd.s === "CD_PATIENTWILL_HOS").value : null).map(val => val ? this.localize("cd-patientwill-hos-" + val, val, this.language) : null)).join();
              txt += _.flatMap(item.contents.map(cnt => cnt.cds.find(cd => cd.s === "CD_PATIENTWILL_RES") ? cnt.cds.find(cd => cd.s === "CD_PATIENTWILL_RES").value : null).map(val => val ? this.localize("cd-patientwill-res-" + val, val, this.language) : null)).join();
              //language :
              //cd-patientwill-x
              //cd-patientwill-hos-hosx
              //cd-patientwill-res-dnry
              break;
          case "adr":
          case "allergy":
          case "treatment":
          case "risk":
          case "socialrisk":{
              //contents[].texts contents[].cds, beginmoment
              //nullFlavor="NA" : no ... exists (+mifecycle = inactive)
              const na = !!item.cds.find(cd => cd.s === "CD-ITEM" && cd.nullFlavor === "NA");
              txt =  _.flatMap(item.contents.map(cnt => cnt.cds.map(cd => cd.s + " " + cd.value))).join();
              txt += _.flatMap(item.contents.map(cnt => cnt.texts.map(t => t.value))).join();
              break;
          }
          case "medication":
              //content.text, content.cds
              //content.(medicinalproduct | substanceproduct| coumpoundprescription)
              //beginmoment, endmoment, lifecycle
              txt =  _.flatMap(item.contents.map(cnt => cnt.cds.map(cd => cd.s + " " + cd.value))).join();
              txt += _.flatMap(item.contents.map(cnt => this._medicationDesc(cnt))).join();
              txt += _.flatMap(item.contents.map(cnt => cnt.texts.map(t => t.value))).join();
              break;
          case "vaccine":
              //text, cds, beginmoment, lifecycle
              //[content (medicinalproduct | substanceproduct)]
              txt =  _.flatMap(item.contents.map(cnt => cnt.cds.map(cd => cd.s + " " + cd.value))).join();
              txt += _.flatMap(item.contents.map(cnt => this._medicationDesc(cnt))).join();
              txt += _.flatMap(item.contents.map(cnt => cnt.texts.map(t => t.value))).join();
              break;
      }
      return txt;
  }

  _medicationDesc(content){
      return content.substanceproduct ? (content.substanceproduct.intendedname) : (content.medicinalproduct ? (content.medicinalproduct.intendedname) : (content.compoundprescription ? content.compoundprescription.magistraltext : ""));
  }

  getItemDesc(item){
      return item.patient ? (item.patient.firstName + " " + item.patient.lastName) : (item.healthcareParty ? (this.getPatHcpDesc(item)) : "");
  }

  getPatHcpDesc(item){
      console.log("getPatHcpDesc", item);
      return _.trim(item.type) + " " + (item.referral ? "GMD " : "")
          + (item.healthcareParty.name ? item.healthcareParty.name : (item.healthcareParty.firstName + " " + item.healthcareParty.lastName))
          + (item.referralPeriods && item.referralPeriods.length && item.referralPeriods.length > 0 && item.referralPeriods[0].formattedStartDate ? ("|->" + item.referralPeriods[0].formattedStartDate) : "");
  }

  _CDType(item) {
      const tg = item.tags ? item.tags.find(t => t.type === "CD-ITEM") : null;
      return tg ? tg.code : "";
  }

  // _baseCode(item) {
  //     console.log("_baseCode", item.codes);
  //     return item.codes && item.codes[0] && item.codes[0].id ? item.codes[0].id : "";
  // }

  _allCodes(item) {
      return item && item.codes ? item.codes.map(code => code.code).join(): "";
  }

  _baseCode(item){

  }

  _baseCode2(item) {
      console.log("_baseCode2", item.codes, item);
      const icpc = item ? this.getCodeByType(item, ['ICPC','ICPC2']) : "";
      const icd = item ? this.getCodeByType(item, ['ICD']) : "";
      const atc = item ? this.getCodeByType(item, ['CD-ATC']) : "";
      const thes = item ? this.getCodeByType(item, ['BE-THESAURUS-SURGICAL-PROCEDURES']) : "";
      var will = item ? this.getCodeByType(item, ['CD-PATIENT-WILL', 'CD-PATIENT-WILL-HOS', 'CD-PATIENT-WILL-RES']) : "";
      will = will ? this.localize("cd-patientwill-" + will, will, this.language) : "";
      let codes = icpc ? icpc : (icd ? icd : (atc ? atc : (will ? will : (thes ? "BE-THESAURUS-SURGICAL-PROCEDURES|" + thes : this._allCodes2(item)))));
      if(!codes || codes === ""){
          codes = "--";
          if(this._itemTypeFromTags(item) === "medication" || this._itemTypeFromTags(item) === "treatment"){
              const med = this.api.contact().preferredContent(item, this.language).medicationValue;
              const cds = med && med.medicinalProduct ? med.medicinalProduct.intendedcds : (med && med.substanceProduct ? [] : (med && med.compoundPrescription ? [] : []));
              const atc = this.getCdsByType(cds, ['CD-ATC'])
              const cnk = this.getCdsByType(cds, ['CD-DRUG-CNK'])
              codes = atc ? "ATC " + atc : cnk ? "CNK " + cnk : "--";
          }
      }
      return codes
  }

  getCodeByType(he, types) {
      const icpc = he.codes && he.codes.find(t=> types.includes(t.type)); //t.type==='ICPC' || t.type==='ICPC2')
      return icpc && ((icpc.code || icpc.id.split('|')[1]))
  }

  getCdsByType(cds, types){
      const cdf = cds.find(c => types.includes(c.type));
      return cdf && ((cdf.code || cdf.id.split('|')[1]))
  }


  _allCodes2(item) {
      return item && item.codes ? item.codes.map(code => code.type + " " + code.code).join() : "";
  }

  _itemId(item){
      return item.ids[0] ? item.ids[0].value : "";
  }

  _hasMatchOnHub(item){
      return item.match ? this.localize('present', 'true', this.language) : this.localize('not-present', 'false', this.language);
  }

  _isConfidential(item) {
      const tg = item.tags ? item.tags.find(t => t.type === "org.taktik.icure.entities.embed.Confidentiality" && t.code && t.code === "secret") : null;
      return !!tg;
  }

  _getChecked(item) {
      return this._isConfidential(item) ? "checked" : ""
  }

  _toggleConfidentiality(e) {
      console.log(e);
      this.confidentialityItem = JSON.parse(_.get(e, "target.dataset.itemData", ""));
      console.log('itemData', this.confidentialityItem);
      const gridId = e.srcElement.parentElement.parentElement.id;
      this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp => {
              if (this.confidentialityItem.healthElementId) {
                  //healthelement
                  this.api.helementicc.getHealthElement(this.confidentialityItem.id).then(he => this.api.helementicc.decrypt(hcp.id, [he])).then(hes => {
                      console.log(hes);
                      let he = hes[0];
                      const tg = he.tags.find(tag => tag.type === "org.taktik.icure.entities.embed.Confidentiality" && tag.code === "secret");
                      console.log("tg", tg)
                      if (tg) {
                          _.remove(he.tags, t => t == tg)
                          console.log("secret removed");
                      } else {
                          he.tags.push({
                              "code": "secret",
                              "type": "org.taktik.icure.entities.embed.Confidentiality",
                              "version": "1",
                              "id": "org.taktik.icure.entities.embed.Confidentiality|secret|1"
                          });
                          console.log("secret applied");
                      }
                      let heTmp = this.newSumehr.healthElements.find(s => s.id === he.id);
                      heTmp.tags = he.tags;
                      //this.shadowRoot.querySelector('#' + gridId).clearCache();
                      this._sendHEChanged(he);
                  });
              } else {
                  //service
                  this.api.contacticc.getContactWithUser(this.user, this.confidentialityItem.contactId).then(ctc => {
                          console.log(ctc);
                          this.api.contacticc.decrypt(hcp.id, [ctc]).then(ctcsTmp => {
                              console.log(ctcsTmp);
                              let svc = ctcsTmp[0].services.find(svc => svc.id === this.confidentialityItem.id);
                              const tg = svc.tags.find(tag => tag.type === "org.taktik.icure.entities.embed.Confidentiality" && tag.code === "secret");
                              if (tg) {
                                  _.remove(svc.tags, t => t == tg)
                                  console.log("secret removed");
                              } else {
                                  svc.tags.push({
                                      "code": "secret",
                                      "type": "org.taktik.icure.entities.embed.Confidentiality",
                                      "version": "1",
                                      "id": "org.taktik.icure.entities.embed.Confidentiality|secret|1"
                                  });
                                  console.log("secret applied");
                              }
                              let svcTmp = this.newSumehr.services.find(s => s.id === svc.id);
                              svcTmp.tags = svc.tags;
                              // if (this.$['med-list']) this.$['med-list'].clearCache();
                              //if (this.$['svc-list']) this.$['svc-list'].clearCache();
                              //this.shadowRoot.querySelector('#' + gridId).clearCache();
                              //this.set("newSumehr.services", );
                              this._sendServiceChanged(svc);
                          })
                      }
                  )
              }
          }
      ).catch(e => {
          console.log(e)
      })
  }

  _sendHEChanged(he) {
      this.dispatchEvent(new CustomEvent('healthelement-changed', {
          detail: {healthelement: he},
          bubbles: true,
          composed: true
      }))
  }

  _sendServiceChanged(svc) {
      this.dispatchEvent(new CustomEvent('service-changed', {
          detail: {service: svc},
          bubbles: true,
          composed: true
      }))
  }

  _importItemFromHub(e){
      if(e.target && e.target.dataset && e.target.dataset.item){
          //hubSumehrXml is used by the backend import
          this.dispatchEvent(new CustomEvent('import-hub-sumehr-item', { composed: true, bubbles: true, detail: { item: e.target.dataset.item, sumehrXml: this.hubSumehrXml} }))
      }
  }

  _closeDialogs() {
      this.set("_bodyOverlay", false);
      _.map(this.shadowRoot.querySelectorAll('.modalDialog'), i => i && typeof i.close === "function" && i.close())
  }
}

customElements.define(HtPatHubTransactionPreview.is, HtPatHubTransactionPreview);
