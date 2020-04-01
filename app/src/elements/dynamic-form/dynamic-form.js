import '../ht-spinner/ht-spinner.js';
import './dynamic-number-field.js';
import './dynamic-number-slider.js';
import './dynamic-token-field.js';
import './dynamic-text-field.js';
import './dynamic-text-area.js';
import './dynamic-measure-field.js';
import './dynamic-popup-menu.js';
import './dynamic-date-field.js';
import './dynamic-sub-form.js';
import './dynamic-checkbox.js';
import './dynamic-medication-field.js';
import './dynamic-subcontact-type-selector.js';
import '../../styles/icpc-styles.js';
import '../../styles/dialog-style.js';
import '../../styles/shared-styles.js'
import '../../styles/buttons-style.js';
import '../../elements/collapse-button/collapse-button.js'
import '../../styles/scrollbar-style.js'
import './ckmeans-grouping.js';
import '@vaadin/vaadin-combo-box/vaadin-combo-box';
import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class DynamicForm extends TkLocalizerMixin(PolymerElement) {

    static get template() {
        return html`
         <style include="icpc-styles dialog-style buttons-style shared-styles scrollbar-style">
                ht-spinner.center {
                    position: absolute;
                    left: calc(50% - 14px);
                    top: calc(50% - 14px);
                }
            
                paper-card.subform-card {
                    min-height: 16px;
                    padding: 0 0 8px 0;
                    box-shadow: none;
                    margin: 0;
                    width: 100%;
                    background: transparent;
                }
            
                paper-card {
                    position: relative;
                }
            
                .pat-details-card > .card-content {
                    padding: 16px 16px 32px !important;
                }
            
                .pat-details-card {
                    width: calc(100% - 48px);
                    margin: 0 24px 24px;
                }
            
                .horizontal {
                    display: flex;
                    flex-direction: row;
                    flex-wrap: wrap;
                    flex-basis: 100%;
                }
            
                .edit-print-pat-details-btn {
                    position: absolute;
                    left: 50%;
                    transform: translate(-50%, 0);
                    bottom: -20px;
                }
            
                .reports-list-container {
                    position: absolute;
                    bottom: 20px;
                    right: calc(50% - 4px);
                    background-color: var(--app-background-color-light);
                    opacity: .8;
                    padding: 8px 0;
                    border-radius: 2px;
                    max-width: 253px;
                }
            
                .reports-list-container paper-fab-speed-dial-action {
                    --paper-fab-speed-dial-action-label-background: transparent;
                    --paper-fab-iron-icon: {
                        transform: scale(0.8);
                    };
                    --paper-fab: {
                        background: var(--app-primary-color-dark);
                    }
                }
            
                .justified {
                    justify-content: space-between;
                }
                
                #general-info{
                    border: 1px solid var(--app-background-color-dark);
                }
            
                .form-title {
                    color: var(--app-text-color-light);
                    border-radius: 3px 3px 0 0;
                    background: var(--app-primary-color-dark);
                    font-size: 12px;
                    margin: 0;
                    padding: 2px 4px 2px 12px;
                    display: flex;
                    flex-flow: row nowrap;
                    text-align: left;
                    justify-content: space-between;
                    align-items: center;
                    box-sizing: border-box;
                    border: 1px solid var(--app-primary-color-dark);
                    position: sticky;
                    top: 0;
                    z-index: 2;
                }
            
                .form-title > span {
                    flex-grow: 1;
                    min-width: 100px;
                }
            
                .form-title > div {
                    flex-grow: 0;
                    min-width: 48px;
                }
            
                .form-title-bar-btn {
                    height: 20px;
                    width: 20px;
                    padding: 2px;
                }
            
                .form-title-bar-btn paper-listbox {
                    padding: 0;
                }
            
                .form-title-bar-btn paper-listbox paper-item {
                    padding: 0 8px;
                    font-size: var(--font-size-normal);
                }
            
                .form-title-bar-btn paper-listbox paper-item iron-icon {
                    height: 12px;
                    width: 12px;
                    padding: 0;
                    margin-right: 4px;
                }
            
                .colour-code {
                    font-size: 12px;
                    white-space: nowrap;
                }
            
                .colour-code span {
                    content: '';
                    display: inline-block;
                    height: 6px;
                    width: 6px;
                    border-radius: 3px;
                    margin-right: 3px;
                    margin-bottom: 1px;
                }
            
                ht-spinner {
                    --ht-spinner-layer-1-color: var(--app-secondary-color);
                    --ht-spinner-layer-2-color: var(--app-primary-color-light);
                    --ht-spinner-layer-3-color: var(--app-secondary-color-dark);
                    --ht-spinner-layer-4-color: var(--app-primary-color-dark);
                }
            
                #printSubForm {
                    --paper-fab: {
                        background: var(--app-secondary-color);
                    };
                }
            
                .tKLabelSeparator {
                    width: 100%;
                    font-size: 12px;
                    margin-top: 1%;
                    padding: 4px;
                }
            
                #delete-confirmation-dialog {
                    height: 160px;
                    width: 300px;
                    position: absolute;
                    top: 50%;
                    left: 50%;
                    margin: 0;
                    transform: translate(-50%, -50%);
                }
            
                #delete-confirmation-dialog .content {
                    padding: 0 12px;
                }
            
                .printSubFormStyle {
                    float: right;
                    right: 4px;
                    top: 2px;
                }
            
                .msoap-container .section {
                @apply --flex-rnw-s-sa;
                width: 100%;
                border-bottom: 1px solid var(--app-background-color-darker);
            }

            /* .section:nth-child(even) .section--label {
                background: var(--app-background-color-darker)!important;
            } */

            .msoap-container .section .section--label {
                background: var(--app-background-color-dark);
                min-width: 48px;
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: center;
                padding: 12px 0;
            }

            .msoap-container .section .section--label .btn {
                display: inline-flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: center;
                background: #fff;
                color: var(--app-secondary-color);
                width: 24px;
                height: 24px;
                padding: 4px;
                min-width: 0;
                min-height: 0;
                box-sizing: border-box;
                font-weight: bold;
                border-radius: 50%;
                font-size: var(--font-size-normal);
                text-align: center;
                line-height: 1;
                position: relative;
                transition: all .24s cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .msoap-container .section .section--label .btn:hover {
                background: var(--app-secondary-color);
            }

            .msoap-container .section .section--label .btn > *{
                transition: all .24s cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .msoap-container .section .section--label .btn:hover span{
                opacity: 0;
            }

            .msoap-container .section .section--label .btn iron-icon {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, 20%);
                color: var(--app-text-color-light);
                height: 16px;
                width: 16px;
                padding: 0;
                opacity: 0;
                transition-delay: .08s;
            }

            .msoap-container .section .section--label .btn:hover iron-icon {
                transform: translate(-50%, -50%);
                opacity: 1;
            }

            .msoap-container .section .section--form {
                flex-grow: 1;
                display: inline-flex;
                flex-flow: row wrap;
                align-items: center;
                padding: 8px;
            }

            .msoap-container .section .section--form h4 {
                @apply --flex-rw-c-sa;
                font-size: var(--font-size-large);
                margin: 0 6px;
                width: auto;
                padding: 4px 0;
                color: var(--app-primary-color);
                font-weight: 500;
                width: 100%;
                border-bottom: 1px solid rgba(0,0,0,0.14);
                text-align: left;
            }

            .msoap-container .section .section--form h4:not(:first-child){
                margin: 8px 6px;
            }

            .msoap-container .section .section--form h4 paper-menu-button{
                padding: 0;
            }

            .msoap-container .section .section--form h4 span {
                display: block;
                flex-grow: 1;
                text-align: left;
            }

            .links-container {
                @apply --flex-rw-c-fs;
            }

            .links-container > .link {
                height: 8px;
                width: 8px;
                background: #00C852;
                margin: 0 4px 0 0;
                border-radius: 50%;
                transform-origin: center center;
                cursor: pointer;
                @apply --transition;
            }

            .links-container > .link:hover {
                transform: scale(1.2);
            }

            .menu-button {
                --paper-menu-button-dropdown: {
                    transform-origin: top right;
                    height: 500px;
                }
            }

            .menu-button paper-listbox {
                overflow-x: hidden;
            }

            .menu-button paper-listbox collapse-button > .sublist {
                overflow-y: auto;
                max-height: calc(20px * 5);
            }

            .menu-button paper-listbox collapse-button > .sublist > paper-listbox {
                overflow: hidden;
            }

            .menu-button paper-listbox collapse-button > .sublist > paper-listbox > paper-item {
                background: var(--app-background-color-dark);
                height: 20px;
                padding: 0 0 0 8px;
                user-select: none;
                @apply --flex-rnw-c-fs;
            }

            .menu-button paper-listbox collapse-button > .sublist > paper-listbox > paper-item:hover {
                background: var(--app-background-color-darker);
            }

            .menu-button paper-listbox collapse-button > .sublist > paper-listbox > paper-item > span {
                font-size: 12px;
                padding-right: 8px;
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
                line-height: 1;
                height: auto;
            }

            .menu-button paper-listbox collapse-button > paper-item > iron-icon:last-child {
                height: 18px;
                width: 18px;
                padding: 0;
                color: var(--app-text-color);
            }

            collapse-button[opened] > paper-item > iron-icon:last-child {
                transform: scale(-1);
            }

            [hidden] {
                display:none!important;
            }

            .msoap-container dynamic-medication-field, .msoap-container dynamic-sub-form {
                margin-top: 12px;
            }
            
            </style>
            
            <ckmeans-grouping id="ckmeans-grouping"></ckmeans-grouping>
            <ckmeans-grouping id="ckmeans-flow-grouping" max-distance="8"></ckmeans-grouping>
            
            <paper-card elevation="0" class$="{{_patCardClass(isSubForm)}}">
                <template is="dom-if" if="[[showTitle]]">
                    <div class="form-title">
                        <span>[[displayedTitle]]</span>
                        <slot name="titlebar"></slot>
                        <template is="dom-if" if="[[!readOnly]]">
                            <paper-menu-button class="menu-button" horizontal-align="right" dynamic-align="true" vertical-offset="26">
                                <paper-icon-button  class="form-title-bar-btn" icon="icons:more-vert" slot="dropdown-trigger" alt="menu"></paper-icon-button>
                                <paper-listbox slot="dropdown-content">
                                    <collapse-button>
                                        <paper-item slot="sublist-collapse-item" id="linkhe"><iron-icon icon="icons:link"></iron-icon><span>[[localize('link_he','Link Health Element',language)]]</span><iron-icon icon="hardware:keyboard-arrow-down"></iron-icon></paper-item>
                                        <div class="sublist" multi toggle-shift>
                                            <paper-listbox>
                                                <template is="dom-repeat" items="[[linkableHealthElements]]" as="he">
                                                     <template is="dom-if" if="[[he.id]]">
                                                        <paper-item id="[[he.id]]" class="link" on-tap="_linkForm">
                                                            <label class$="colour-code [[he.colour]]">
                                                                <span></span>
                                                            </label><span>[[he.descr]]</span></paper-item>
                                                    </template>
                                                    <template is="dom-if" if="[[!he.id]]">
                                                        <paper-item id="[[he.idService]]" class="link" on-tap="_linkForm">
                                                            <label class$="colour-code [[he.colour]]">
                                                                <span></span>
                                                            </label><span>[[he.descr]]</span>
                                                        </paper-item>
                                                    </template>
                                                </template>
                                            </paper-listbox>
                                        </div>
                                    </collapse-button>
                                    <template is="dom-repeat" items="[[_toArray(sections)]]" as="section">
                                        <paper-button on-tap="_hideShowSection" data-section$="[[section.key]]" hidden$="{{section.value}}">Add [[section.key]]</paper-button>
                                    </template>
                                    <template is="dom-if" if="[[_none(showEdit,noPrint)]]">
                                        <template is="dom-if" if="[[_shouldDisplayPrintSubFormIcon(isSubForm, template)]]">
                                            <paper-button  on-tap="printSubForm" id="printSubForm"><iron-icon icon="print"></iron-icon>[[localize('print','Print',language)]]</paper-button>
                                        </template>
                                    </template>
                                    <paper-button id="delform" on-tap="_deleteConfirmation"><iron-icon icon="icons:delete"></iron-icon><span>[[localize('del_form','Delete form',language)]]</span></paper-button>
                                </paper-listbox>
                            </paper-menu-button>
                        </template>
                    </div>
                </template>
                <template is="dom-if" if="[[!dataProvider]]">
                    <ht-spinner class="center" active></ht-spinner>
                </template>
            
                <form id="general-info" is="iron-form">
                    <div class="msoap-container">
                    <template is="dom-repeat" items="[[template.sections]]" as="section">
                        <template is="dom-repeat" items="[[section.formColumns]]" as="column">
                            <div class$="section section--[[column.columns]]">
                                <div class="section--label">
                                    <paper-button class="btn" on-tap="_hideShowSection">
                                        <span>[[column.columns]]</span>
                                        <iron-icon icon="close"></iron-icon>
                                    </paper-button>
                                </div>
                                <div class="section--form">
                                <template id="layoutitems-repeat" is="dom-repeat"
                                          items="[[_sortedGroupedFormDataList(column.formDataList)]]" as="layoutItem">
                                    <template is="dom-if" if="[[_shouldDisplay(layoutItem, readOnly, compact)]]">
                                        <template is="dom-if" if="[[_isTextField(layoutItem)]]">
                                            <dynamic-text-field id="[[_sanitizeId(layoutItem.name)]]" label="[[layoutItem.label]]"
                                                                key="[[layoutItem.name]]"
                                                                was-modified="[[_wasModified(layoutItem)]]"
                                                                is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                                i18n="[[i18n]]" language="[[language]]" resources="[[resources]]"
                                                                linkables="[[linkableHealthElements]]"
                                                                last-modified="[[_lastModified(layoutItem)]]"
                                                                pattern="[[layoutItem.editor.pattern]]"
                                                                value="[[_value(layoutItem,dataMap.*)]]" api="[[api]]"
                                                                width="[[layoutItem.editor.flow]]" on-field-changed="_valueChanged"
                                                                read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                                disabled="[[disabled]]"></dynamic-text-field>
                                        </template>
                                        <template is="dom-if" if="[[_isTextArea(layoutItem)]]">
                                            <dynamic-text-area id="[[_sanitizeId(layoutItem.name)]]" label="[[layoutItem.label]]"
                                                               key="[[layoutItem.name]]" was-modified="[[_wasModified(layoutItem)]]"
                                                               is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                               i18n="[[i18n]]" language="[[language]]" resources="[[resources]]"
                                                               linkables="[[linkableHealthElements]]"
                                                               last-modified="[[_lastModified(layoutItem)]]"
                                                               value="[[_value(layoutItem,dataMap.*)]]" api="[[api]]"
                                                               width="[[layoutItem.editor.flow]]" on-field-changed="_valueChanged"
                                                               read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                               disabled="[[disabled]]"></dynamic-text-area>
                                        </template>
                                        <template is="dom-if" if="[[_isCheckboxField(layoutItem)]]">
                                            <dynamic-checkbox id="[[_sanitizeId(layoutItem.name)]]" label="[[layoutItem.label]]"
                                                              key="[[layoutItem.name]]" was-modified="[[_wasModified(layoutItem)]]"
                                                              is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                              i18n="[[i18n]]" language="[[language]]" resources="[[resources]]"
                                                              linkables="[[linkableHealthElements]]"
                                                              last-modified="[[_lastModified(layoutItem)]]"
                                                              value="[[_value(layoutItem,dataMap.*)]]" api="[[api]]"
                                                              width="[[layoutItem.editor.flow]]"
                                                              group="[[layoutItem.editor.groupRadio]]" on-checked="_callRadioGroup"
                                                              on-field-changed="_valueChanged"
                                                              read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                              disabled="[[disabled]]"></dynamic-checkbox>
                                        </template>
                                        <template is="dom-if" if="[[_isNumberField(layoutItem)]]">
                                            <dynamic-number-field id="[[_sanitizeId(layoutItem.name)]]" api="[[api]]"
                                                                  label="[[layoutItem.label]]" key="[[layoutItem.name]]"
                                                                  was-modified="[[_wasModified(layoutItem)]]"
                                                                  is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                                  i18n="[[i18n]]" language="[[language]]" resources="[[resources]]"
                                                                  linkables="[[linkableHealthElements]]"
                                                                  last-modified="[[_lastModified(layoutItem)]]"
                                                                  value="[[_value(layoutItem,dataMap.*)]]"
                                                                  width="[[layoutItem.editor.flow]]"
                                                                  on-field-changed="_valueChanged"
                                                                  read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                                  disabled="[[disabled]]"></dynamic-number-field>
                                        </template>
                                        <template is="dom-if" if="[[_isNumberSlider(layoutItem)]]">
                                            <dynamic-number-slider id="[[_sanitizeId(layoutItem.name)]]" api="[[api]]"
                                                                   label="[[layoutItem.label]]" key="[[layoutItem.name]]"
                                                                   was-modified="[[_wasModified(layoutItem)]]"
                                                                   is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                                   i18n="[[i18n]]" language="[[language]]" resources="[[resources]]"
                                                                   linkables="[[linkableHealthElements]]"
                                                                   last-modified="[[_lastModified(layoutItem)]]"
                                                                   value="[[_value(layoutItem,dataMap.*)]]"
                                                                   width="[[layoutItem.editor.flow]]"
                                                                   on-field-changed="_valueChanged"
                                                                   read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                                   disabled="[[disabled]]"></dynamic-number-slider>
                                        </template>
                                        <template is="dom-if" if="[[_isMeasureField(layoutItem)]]">
                                            <dynamic-measure-field id="[[_sanitizeId(layoutItem.name)]]" api="[[api]]"
                                                                   label="[[layoutItem.label]]" key="[[layoutItem.name]]"
                                                                   was-modified="[[_wasModified(layoutItem)]]"
                                                                   is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                                   i18n="[[i18n]]" language="[[language]]" resources="[[resources]]"
                                                                   linkables="[[linkableHealthElements]]"
                                                                   last-modified="[[_lastModified(layoutItem)]]"
                                                                   value-with-unit="[[_value(layoutItem,dataMap.*)]]"
                                                                   width="[[layoutItem.editor.flow]]"
                                                                   on-field-changed="_valueChanged"
                                                                   read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                                   disabled="[[disabled]]"></dynamic-measure-field>
                                        </template>
                                        <template is="dom-if" if="[[_isPopupMenu(layoutItem)]]">
                                            <dynamic-popup-menu id="[[_sanitizeId(layoutItem.name)]]" api="[[api]]"
                                                                label="[[layoutItem.label]]" key="[[layoutItem.name]]"
                                                                was-modified="[[_wasModified(layoutItem)]]"
                                                                is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                                i18n="[[i18n]]" language="[[language]]" resources="[[resources]]"
                                                                data-source="[[_popupDataSource(layoutItem, layoutItem.editor.menuOptions)]]"
                                                                linkables="[[linkableHealthElements]]"
                                                                last-modified="[[_lastModified(layoutItem)]]"
                                                                value="[[_value(layoutItem,dataMap.*)]]"
                                                                width="[[layoutItem.editor.flow]]"
                                                                options="[[layoutItem.editor.menuOptions]]"
                                                                on-field-changed="_valueChanged"
                                                                read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                                display-all-always="[[layoutItem.editor.displayAllAlways]]"
                                                                is-free-text="[[layoutItem.editor.isFreeText]]"></dynamic-popup-menu>
                                        </template>
                                        <template is="dom-if" if="[[_isDateField(layoutItem)]]">
                                            <dynamic-date-field id="[[_sanitizeId(layoutItem.name)]]" api="[[api]]"
                                                                label="[[layoutItem.label]]" key="[[layoutItem.name]]"
                                                                was-modified="[[_wasModified(layoutItem)]]"
                                                                is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                                linkables="[[linkableHealthElements]]" i18n="[[i18n]]"
                                                                language="[[language]]" resources="[[resources]]"
                                                                last-modified="[[_lastModified(layoutItem)]]"
                                                                value="[[_value(layoutItem,dataMap.*)]]"
                                                                width="[[layoutItem.editor.flow]]"
                                                                full-date-mode="[[layoutItem.editor.fullDateMode]]"
                                                                on-field-changed="_valueChanged"
                                                                read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                                disabled="[[disabled]]"></dynamic-date-field>
                                        </template>
                                        <template is="dom-if" if="[[_isValueDateField(layoutItem)]]">
                                            <dynamic-date-field id="[[_sanitizeId(layoutItem.name)]]" api="[[api]]"
                                                                label="[[layoutItem.label]]" key="[[layoutItem.name]]"
                                                                was-modified="[[_wasModified(layoutItem)]]"
                                                                is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                                linkables="[[linkableHealthElements]]" i18n="[[i18n]]"
                                                                language="[[language]]" resources="[[resources]]"
                                                                last-modified="[[_lastModified(layoutItem)]]"
                                                                value="[[_valueDate(layoutItem,dataMap.*)]]"
                                                                width="[[layoutItem.editor.flow]]"
                                                                full-date-mode="[[layoutItem.editor.fullDateMode]]"
                                                                on-field-changed="_valueDateChangedWithBooleanSet"
                                                                read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                                disabled="[[disabled]]"></dynamic-date-field>
                                        </template>
                                        <template is="dom-if" if="[[_isTokenField(layoutItem)]]">
                                            <dynamic-token-field id="[[_sanitizeId(layoutItem.name)]]" label="[[layoutItem.label]]"
                                                                 key="[[layoutItem.name]]" api="[[api]]"
                                                                 was-modified="[[_wasModified(layoutItem)]]"
                                                                 is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                                 i18n="[[i18n]]" language="[[language]]" resources="[[resources]]"
                                                                 data-source="[[_tokenDataSource(layoutItem, layoutItem.codeTypes)]]"
                                                                 last-modified="[[_lastModified(layoutItem)]]"
                                                                 linkables="[[linkableHealthElements]]"
                                                                 value="[[_valueContainers(layoutItem,dataMap.*)]]"
                                                                 width="[[layoutItem.editor.flow]]"
                                                                 on-field-changed="_valueContainersChanged"
                                                                 read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                                 disabled="[[disabled]]"></dynamic-token-field>
                                        </template>
                                        <template is="dom-if" if="[[_isMedicationField(layoutItem)]]">
                                            <dynamic-medication-field id="[[_sanitizeId(layoutItem.name)]]"
                                                                      label="[[layoutItem.label]]" key="[[layoutItem.name]]"
                                                                      api="[[api]]" was-modified="[[_wasModified(layoutItem)]]"
                                                                      is-modified-after="[[_isModifiedAfter(layoutItem)]]"
                                                                      i18n="[[i18n]]" language="[[language]]"
                                                                      resources="[[resources]]"
                                                                      linkables="[[linkableHealthElements]]"
                                                                      last-modified="[[_lastModified(layoutItem)]]"
                                                                      value="[[_valueContainers(layoutItem,dataMap.*)]]"
                                                                      width="[[layoutItem.editor.flow]]"
                                                                      on-field-changed="_valueContainersChanged"
                                                                      read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                                      disabled="[[disabled]]"
                                                                      create-treatment="[[_hasTreatmentCdItem(layoutItem.tags)]]"></dynamic-medication-field>
                                        </template>
                                        <template is="dom-if" if="[[_isSubForm(layoutItem)]]">
                                            <dynamic-sub-form id="sf_[[_sanitizeId(layoutItem.name)]]" label="[[layoutItem.label]]"
                                                              key="[[layoutItem.name]]" layout-item="[[layoutItem]]" api="[[api]]"
                                                              user="[[user]]"
                                                              i18n="[[i18n]]" language="[[language]]" resources="[[resources]]"
                                                              sub-contexts="[[_subForms(layoutItem,dataMap.*)]]"
                                                              on-delete-subform="_deleteSubForm" on-add-subform="_addSubForm"
                                                              read-only="[[_isReadOnly(layoutItem,readOnly)]]"
                                                              disabled="[[disabled]]" no-print="[[noPrint]]"
                                                              parent-form-dp="[[dataProvider]]"></dynamic-sub-form>
                                        </template>
                                        <template is="dom-if" if="[[_isLabel(layoutItem)]]">
                                            <div class="tKLabelSeparator">[[localize(layoutItem.label,layoutItem.label,language)]]
                                            </div>
                                        </template>
                                    </template>
                                </template>
                            </template>
                        </template>
                    </div>
                </form>
                <template is="dom-if" if="[[showEdit]]">
                    <paper-icon-button class="button--icon-btn edit-print-pat-details-btn" icon="create"
                                       on-tap="editForm"></paper-icon-button>
                </template>
                <template is="dom-if" if="[[_none(showEdit,noPrint)]]">
                    <template is="dom-if" if="[[_shouldDisplayPrintSubFormIcon(isSubForm, template)]]">
                        <paper-icon-button icon="print" on-tap="printSubForm" id="printSubForm"
                                           class="button--icon-btn add-button printSubFormStyle"></paper-icon-button>
                        <paper-tooltip position="bottom" for="printSubForm">[[localize('print','Print',language)]]</paper-tooltip>
                    </template>
                </template>
            
            
                <template is="dom-if" if="[[_shouldDisplayEMediattest(template.guid)]]">
                    <paper-icon-button icon="mail" on-tap="_eMediattest" id="_eMediattest"
                                       class="button--icon-btn add-button printSubFormStyle eMediattestSubFormStyle"></paper-icon-button>
                    <paper-tooltip position="bottom" for="_eMediattest">[[localize('medexSubformTooltip','Send certificate via
                        eMediAtt / Medex',language)]]
                    </paper-tooltip>
                </template>
            
            
                <paper-dialog id="delete-confirmation-dialog">
                    <h2 class="modal-title">Delete form</h2>
                    <div class="content">
                        <p>Are you sure you want to delete this form ?</p>
                    </div>
                    <div class="buttons">
                        <paper-button dialog-confirm autofocus on-tap="cancel" class="button">Cancel</paper-button>
                        <paper-button dialog-confirm class="button button--save" on-tap="_deleteForm">Delete</paper-button>
                    </div>
                </paper-dialog>
            
            </paper-card>
    `;
    }

    static get is() {
				return 'dynamic-form';
    }

    static get properties() {
				return {
            api: {
                type: Object
            },
            user: {
                type: Object
            },
            template: {
                type: Object,
                observer: '_templateChanged'
            },
            reports: {
                type: Array
            },
            readOnly: {
                type: Boolean,
                value: false
            },
            compact: {
                type: Boolean,
                value: false
            },
            dataProvider: {
                type: Object
            },
            dataMap: {
                type: Object,
                value: null
            },
            isSubForm: {
                type: Boolean,
                value: false
            },
            showTitle: {
                type: Boolean,
                value: false
            },
            noPrint: {
                type: Boolean,
                value: false
            },
            title: {
                type: String,
                value: null
            },
            displayedTitle: {
                type: String,
                computed: "_displayedTitle(title, showTitle, dataProvider)"
            },
            showEdit: {
                type: String,
                computed: "_showEdit(isSubForm, readOnly)"
            },
            healthElements: {
                type: Array
            },
            linkableHealthElements: {
                type: Array
            },
            reportsListDisplayed: {
                type: Boolean,
                value: false
            },
            subcontactType: {
                type: Array,
                value: () => []
            },
            closed: {
                type: Boolean
            },
             parentFormDp: {
                type: Object,
                value: () => {}
            }
				};
    }

    static get observers() {
        return [];
    }

    constructor() {
				super();
    }

    _shouldDisplayTypes(readOnly, typesList) {
				return !readOnly && typesList && typesList.length
    }

    _showEdit() {
				return this.readOnly && !this.isSubForm;
    }

    _sanitizeId( id ) {
				return id.replace(/[\.#]/gi, '-')
    }

    notify(path) {
				try{
            if (!this.template) {
                return;
            }
            let pathParts = path.split('.');

            let composedNameLength = 1
            const layoutItem = _.flatten(_.flatten(this.template.sections.map(s => s.formColumns.map(c => c.formDataList)))).find(fdl => {

                const nameParts = fdl.name.split('.')
                const pathPartsForName = pathParts.slice(0,nameParts.length)

                return nameParts.filter( (n, idx) => n === pathPartsForName[idx] ).length === nameParts.length && (composedNameLength = nameParts.length)

            });

            const joinedId = pathParts.slice(0,composedNameLength).join('-')
            const item = this.shadowRoot.querySelector('#sf_' + joinedId);

            if (item) {
                if (pathParts.length > 1) {
                    item.subContexts = this._subForms(layoutItem);
                    item.notify && item.notify(pathParts.slice(composedNameLength).join('.'));
                } else {
                    item.notify && item.notify();
                }
            } else {
                this.notifyPath('dataMap.'+joinedId)
            }
        } catch (e) {
            return 0;
        }
    }
    _hideShowSection(e) {
        const section = e.target.getAttribute('data-section') ? e.target.getAttribute('data-section') : e.target.parentElement.getAttribute('data-section')

        this.dispatchEvent(new CustomEvent('hide-show-section', {detail: {formId: this.formId, sectionToHide: section}, bubbles: true, composed: true}))
        console.log(this.sections)
        if(this.formId === e.detail.formId) this.set(`sections.${e.detail.sectionToHide}`, !this.sections[e.detail.sectionToHide])

    }

    _toArray(obj) {
        return _.map(obj, function(value, key) {
            return {
                key: key,
                value: value
            };
        });
    }

    _hasTreatmentCdItem(tags) {
        return tags && tags.some(t => (t.type === 'CD-ITEM' && t.code ==='treatment') || (t.type === 'ICURE' && t.code ==='PRESC'))
    }

    _displayedTitle() {
				return this.title && this.dataProvider ? this.title+" "+this.dataProvider.subContactTitle() : "Loading ...";
    }

    _linkForm(e) {
        const he = this.healthElements.find(he => he.id === e.target.id || he.idService === e.target.id);
        this.dispatchEvent(new CustomEvent('link-form', {detail: {healthElement: he}, composed: true, bubbles: true}));
    }

    _deleteForm() {
        this.dispatchEvent(new CustomEvent('delete-form', {composed: true, bubbles: true}));
        // const card = this.root.querySelector('.pat-details-card')
        // if (card) {card.style.display = 'none'} // prevent user to click delete twice
    }

    _deleteConfirmation() {
				this.$['delete-confirmation-dialog'].open();
    }


    _patCardClass(isSubForm) {
				return !isSubForm ? "pat-details-card" : "pat-details-card subform-card";
    }

    _value(layoutItem) {
				if (!this.dataProvider) {
            return null;
				}
				return this._isCheckboxField(layoutItem) ? '' + !!this._rawValue(layoutItem) : this._rawValue(layoutItem);
    }

    _status(layoutItem){
        if (!this.dataProvider) {
            return null;
        }

    }

    _isReadOnly(layoutItem){
				return this.readOnly || (layoutItem.editor && layoutItem.editor.readOnly)
    }

    _rawValue(layoutItem) {
				if (!this.dataProvider) {
            return null;
				}
				return this._isDateField(layoutItem) ? this.dataProvider.getDateValue(layoutItem.name) : this._isMeasureField(layoutItem) ? this.dataProvider.getMeasureValue(layoutItem.name) : this._isCheckboxField(layoutItem) ? this.dataProvider.getBooleanValue(layoutItem.name) : this._isNumberField(layoutItem) ? this.dataProvider.getNumberValue(layoutItem.name) : this._isNumberSlider(layoutItem) ? this.dataProvider.getNumberValue(layoutItem.name) : this.dataProvider.getStringValue(layoutItem.name);
    }

    _shouldDisplay(layoutItem, readOnly, compact) {
        return this.dataProvider ?
            (!readOnly && !compact
                || (this._isSubForm(layoutItem) && this.dataProvider.hasSubForms(layoutItem.name))
                || (this._isMedicationField(layoutItem) || this._isTokenField(layoutItem)) && this.dataProvider.getValueContainers(layoutItem.name).length
                || this._isMeasureField(layoutItem) && this.dataProvider.getMeasureValue(layoutItem.name).value
                || this._rawValue(layoutItem)):
            ( !readOnly && !compact
                || this._isSubForm(layoutItem)
                || this._rawValue(layoutItem) )
    }

    _valueContainers(layoutItem) {
				if (!this.dataProvider) {
            return null;
				}
				return this.dataProvider.getValueContainers(layoutItem.name) || [];
    }

    _valueDate(layoutItem) {
				if (!this.dataProvider) {
            return null;
				}
				return this.dataProvider.getValueDateOfValue(layoutItem.name);
    }

    _subForms(layoutItem) {
				if (!this.dataProvider) {
            return null;
				}
				return this.dataProvider.getSubForms(layoutItem.name);
    }

    _templateChanged(change) {
				if (!this.template || !this.template.sections) {
            return;
				}
				this.layoutItemPerName = _.flatten(this.template.sections.map(s => _.flatten(s.formColumns.map(c => c.formDataList)))).reduce((acc, val) => {
            acc[this._sanitizeId(val.name)] = val;
            return acc;
				}, {});
    }

    _valueChanged(event) {
				if (!this.dataProvider) {
            return;
				}

				const change = event.detail;
				if (!this.layoutItemPerName || !event.target.id) {
            return;
				}
				const layoutItem = this.layoutItemPerName[event.target.id];
				if (this.dataProvider) {
            this._isDateField(layoutItem) ? this.dataProvider.setDateValue(layoutItem.name, change.value) :
                    this._isMeasureField(layoutItem) ? this.dataProvider.setMeasureValue(layoutItem.name, typeof change.value === "object" ? change.value : { value: change.value, unit: change.unit }) :
                            this._isCheckboxField(layoutItem) ? this.dataProvider.setBooleanValue(layoutItem.name, change.value && change.value !== 'false') :
                                    this._isNumberField(layoutItem) ? this.dataProvider.setNumberValue(layoutItem.name, change.value) :
                                            this._isNumberSlider(layoutItem) ? this.dataProvider.setNumberValue(layoutItem.name, change.value) :
                                                    this.dataProvider.setStringValue(layoutItem.name, change.value);
				}
    }

    _valueContainersChanged(event) {
        if (!this.dataProvider) {
            return;
        }
        const change = event.detail;
        if (!this.layoutItemPerName || !event.target.id) {
            return;
        }
        const layoutItem = this.layoutItemPerName[event.target.id];
        if (layoutItem) {
            this._isTokenField(layoutItem) ? this.dataProvider.setValueContainers(layoutItem.name, change.value) : this._isMedicationField(layoutItem) ? this.dataProvider.setValueContainers(layoutItem.name, change.value) : null;
        }
    }

    _valueDateChanged(event) {
        if (!this.dataProvider) {
            return;
        }
        const change = event.detail;
        if (!this.layoutItemPerName || !event.target.id) {
            return;
        }
        const layoutItem = this.layoutItemPerName[event.target.id];
        if (layoutItem) {
            this.dataProvider.setValueDateOfValue(layoutItem.name, change.value);
        }
    }

    _valueDateChangedWithBooleanSet(event) {
        if (!this.dataProvider) {
            return;
        }
        const change = event.detail;
        if (!this.layoutItemPerName || !event.target.id) {
            return;
        }
        const layoutItem = this.layoutItemPerName[event.target.id];
        if (layoutItem) {
            this.dataProvider.setValueDateOfValue(layoutItem.name, change.value, true);
        }
    }

    _unit(layoutItem, dataMap) {
        if (!this.dataProvider) {
            return null;
        }
        return this._isMeasureField(layoutItem) ? (() => {
            const v = this.dataProvider.getMeasureValue(layoutItem.name); return v && v.unit;
        })() : null;
    }

    width(layoutItem) {
				return layoutItem;
    }

    _sortedGroupedFormDataList(formDataList) {
        const widthsStruct = formDataList.reduce((acc, i) => {
            acc.widths[i.name] = i.editor.left + i.editor.width; acc.maxWidth = Math.max(acc.widths[i.name], acc.maxWidth); return acc
        }, { widths: {}, maxWidth: 32 })

        //Cluster lines
        const sortedList = _.sortBy(formDataList, fd => fd.editor.top)
        const clusters = this.shadowRoot.querySelector('#ckmeans-grouping').cluster(sortedList.map(fd => fd.editor.top)).clusters

        const formDataClusters = sortedList.reduce((cs, fd) => cs[_.findIndex(clusters, c => c.includes(fd.editor.top))].push(fd) && cs, new Array(clusters.length).fill(null).map(() => [])).map(c => _.sortBy(c, [x => x.editor.left + x.editor.width]))

        //Cluster columns
        const rightClustering = this.shadowRoot.querySelector('#ckmeans-flow-grouping').cluster(_.sortBy(formDataList.map(fd => fd.editor.left + fd.editor.width)))
        //Round centroids
        rightClustering.centroids = rightClustering.centroids.map(c => Math.round(c / 24) * 24)

        _.flatten(formDataClusters).forEach(c => {
            c.editor.right = rightClustering.centroids[_.findIndex(rightClustering.clusters, cc => cc.includes(c.editor.left + c.editor.width))]
        });

        formDataClusters.forEach(line => {
            const width = line.reduce((acc,c) => { c.editor.flow = c.editor.right - acc; return c.editor.right }, 0)
            line.forEach(c => c.editor.flow = c.editor.flow * 100 / width)
        })

        return _.flatten(formDataClusters);
    }

    _isTextArea(layoutItem) {
        return layoutItem.editor.key === 'StringEditor' && layoutItem.editor.multiline === true || layoutItem.editor.key === 'StyledStringEditor' ;
    }

    _isTextField(layoutItem) {
        return layoutItem.editor.key === 'StringEditor' && layoutItem.editor.multiline === false;
    }

    _isPopupMenu(layoutItem) {
        return layoutItem.editor.key === 'PopupMenuEditor';
    }

    _isNumberField(layoutItem) {
        return layoutItem.editor.key === 'NumberEditor';
    }

    _isNumberSlider(layoutItem) {
        return layoutItem.editor.key === 'IntegerSliderEditor';
    }

    _isDateField(layoutItem) {
        return layoutItem.editor.key === 'DateTimeEditor';
    }

    _isValueDateField(layoutItem) {
        return layoutItem.editor.key === 'CheckBoxEditor' && layoutItem.editor.displayValueDate;
    }

    _isCheckboxField(layoutItem) {
        return layoutItem.editor.key === 'CheckBoxEditor' && !layoutItem.editor.displayValueDate;
    }

    _isMeasureField(layoutItem) {
        return layoutItem.editor.key === 'MeasureEditor';
    }

    _isTokenField(layoutItem) {
        return layoutItem.editor.key === 'TokenFieldEditor';
    }

    _isMedicationField(layoutItem) {
        return layoutItem.editor.key === 'MedicationTableEditor';
    }

    _isLabel(layoutItem){
        return layoutItem.editor.key === 'Label';
    }

    _isSubForm(layoutItem) {
        return layoutItem.subForm === true;
    }

    _isModifiedAfter(layoutItem) {
        return this.dataProvider && this.dataProvider.isModifiedAfter && this.dataProvider.isModifiedAfter(layoutItem.name) || false;
    }

    _wasModified(layoutItem) {
        return this.dataProvider && this.dataProvider.wasModified && this.dataProvider.wasModified(layoutItem.name) || false;
    }

    _lastModified(layoutItem) {
				return this.dataProvider && this.dataProvider.latestModification && this.dataProvider.latestModification(layoutItem.name) || "0";
    }

    loadDataMap() {
        console.log("Form ready");
    }

    editForm() {
        this.dataProvider.editForm && this.dataProvider.editForm();
    }

    _deleteSubForm(e, detail) {
        e.stopPropagation();
        const layoutItem = this.shadowRoot.querySelector('#layoutitems-repeat').itemForElement(e.target);
        this.dataProvider.deleteSubForm && this.dataProvider.deleteSubForm(layoutItem.name, detail.id, detail.index);
    }

    _addSubForm(e, detail) {
        e.stopPropagation();
        const layoutItem = this.shadowRoot.querySelector('#layoutitems-repeat').itemForElement(e.target);
        this.dataProvider.addSubForm && this.dataProvider.addSubForm(layoutItem.name, detail.guid);
    }

    _tokenDataSource(d) {
        return d && { filter: (text, uuid) => this.dataProvider && this.dataProvider.filter && this.dataProvider.filter(d.editor.dataSource || d.codeTypes && { source: "codes", types: d.codeTypes }, text, uuid) || Promise.resolve([]) } || null;
    }

    _popupDataSource(d, options) {
        const ds = d.editor.dataSource || d.codeTypes && { source: "codes", types: d.codeTypes }
        const uuid = this.api.crypto().randomUuid()
        return d && (d.codeTypes && d.codeTypes.length || d.editor.dataSource) ? { filter: text => this.dataProvider && this.dataProvider.filter && this.dataProvider.filter(ds, text, uuid, null) || Promise.resolve([]), get: id => this.dataProvider && this.dataProvider.filter && this.dataProvider.filter(ds, null, uuid, id) || Promise.resolve(null), isProvided : ()=>true } : null;
    }

    toggleReportsList() {
        this.reportsListDisplayed = !this.reportsListDisplayed
    }

    newReport() {
        this.dispatchEvent(new CustomEvent('new-report', {detail: {dataProvider: this.dataProvider}, composed: true, bubbles: true}));
    }

    printSubForm() {
        this.dispatchEvent(new CustomEvent('print-subform', {detail: {dataProvider: this.dataProvider}, composed: true, bubbles: true}));
    }

    _none(a,b) {
        return !a && !b
    }

    _linkToSubcontactType(e){
        if(e.detail){
            this.dispatchEvent(new CustomEvent('subcontact-type-change', {detail: { type: e.detail, formId: this.dataProvider.getId()}}));
        }
    }

    _shouldDisplayPrintSubFormIcon(isSubForm, template) {
        return template && ["FFFFFFFF-FFFF-FFFF-FFFF-INCAPACITY00","AEFED10A-9A72-4B40-981B-1D79ADB05516","64DAB551-B007-4B5C-BD64-F886301F5326","B4F2B274-10FF-4018-BC48-3ED3CADCED57","ebab275a-c0e7-4f4f-9cc6-2620deb55d33"].includes(template.guid) &&
            _.get(template, "sections", false) && Array.isArray(template.sections) && template.sections.length &&
            _.size(_.head(_.filter( _.get(template, "sections[0].formColumns[0].formDataList", {}), {type:"TKAction"})))
    }

    _getReportTrad(reportName){
        return reportName && reportName === "Report" ? this.localize('out-doc', 'Outgoing document', this.language) : reportName
    }

    _callRadioGroup(e) {
				this.dataProvider && this.dataProvider.radioButtonChecked && this.dataProvider.radioButtonChecked(e.detail.group, e.detail.name);
    }

    _isExcluded(he){
				return _.get(he, 'tags', []).find(t => t.type === "CD-CERTAINTY" && t.code === "excluded") ? "exclude" : null
    }

    _shouldDisplayEMediattest(templateGuid) {
        // For incapacity subform -> allow to send via eMediattest / Medex
        return _.trim(templateGuid) === "FFFFFFFF-FFFF-FFFF-FFFF-INCAPACITY00"
    }

    _eMediattest(e) {
        this.dispatchEvent(new CustomEvent("send-sub-form-via-emediattest", { composed: true, bubbles: true, detail: { parentFormDp:this.parentFormDp, subFormDp:this.dataProvider } }))
    }

}

customElements.define(DynamicForm.is, DynamicForm);
