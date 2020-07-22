import '../../../dynamic-form/ckmeans-grouping.js';
import '../../../../styles/vaadin-icure-theme.js';
import '../../../../styles/spinner-style.js';
import '../../../../styles/scrollbar-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/dialog-style';
import '../../../ht-spinner/ht-spinner.js';

//TODO import "@polymer/iron-collapse-button/iron-collapse-button"
import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-tooltip/paper-tooltip"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"
import "@vaadin/vaadin-grid/vaadin-grid-column-group"
import "@vaadin/vaadin-grid/vaadin-grid-sorter"
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle"
import '@vaadin/vaadin-accordion/vaadin-accordion'
import '@vaadin/vaadin-details/vaadin-details'

import '../../../dynamic-form/dynamic-link'
import '../../../dynamic-form/dynamic-pills'
import '../../../dynamic-form/dynamic-doc'

import moment from 'moment/src/moment';
import _ from 'lodash/lodash';
import * as models from '@taktik/icc-api/dist/icc-api/model/models'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../../tk-localizer";
class HtPatEformDialog extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style notification-style">

            .btn-dropdown-container paper-button{
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                text-transform: capitalize;
                height: 28px;
                padding: 0 12px 0 8px;
                font-weight: 400;
                font-size: var(--font-size-normal);
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                flex-grow: 1;
                border-radius: 0;
                margin: 0;
            }

            .btn-dropdown-container paper-icon-button:hover{
                background: var(--app-background-color-dark);
            }

            .btn-dropdown-container paper-button iron-icon{
                color: var(--app-secondary-color);
                height: 20px;
                width: 20px;
                margin-right: 4px;
                box-sizing: border-box;
            }

            .w50{
                width: 50%;
                padding: 4px;
            }

            .w100{
                width: 98%;
                padding: 4px;
            }

            .ko{
                color: var(--app-status-color-nok)
            }

            .ok{
                color: var(--app-status-color-ok)
            }

            .p4{
                padding: 4px;
            }


            .menu-item {
                @apply --padding-menu-item;
                height: 24px;
                min-height: 24px;
                font-size: var(--font-size-normal);
                text-transform: inherit;
                justify-content: space-between;
                cursor: pointer;
                @apply --transition;
            }

            .sublist .menu-item {
                font-size: var(--font-size-normal);
                min-height:20px;
                height:20px;
            }

            .menu-item:hover{
                background: var(--app-dark-color-faded);
                @apply --transition;
            }

            .menu-item .iron-selected{
                background:var(--app-primary-color);

            }

            .one-line-menu {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 400;
                padding-left:0;
            }

            collapse-button[opened] .menu-item-icon{
                transform: scaleY(-1);
            }

            .sublist-document{
                background:var(--app-light-color);
                margin:0 0 0 0px;
                padding:0;
            }

            .table-line-menu {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                width: 100%;
            }

            .table-line-menu-top{
                padding-left: var(--padding-menu-item_-_padding-left);
                padding-right: var(--padding-menu-item_-_padding-right);
                box-sizing: border-box;
            }

            .table-line-menu div:not(:last-child){
                border-right: 1px solid var(--app-background-color-dark);
                height: 20px;
                line-height: 20px;
            }

            .one-line-menu {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 400;
                padding-left:0;
            }

            .menu-item paper-icon-button.menu-item-icon--add, .list-info paper-icon-button.menu-item-icon {
                padding: 0px;
                height: 18px;
                width: 18px;
                border-radius: 3px;
                background: var(--app-secondary-color);
                color: var(--app-text-color-light);
                margin-right: 8px;
            }

            .w10{
                width: 9%;
            }
            .w20{
                width: 19%;
            }
            .w30{
                width: 29%;
            }
            .w40{
                width: 39%;
            }
            .w50{
                width: 49%;
            }
            .w60{
                width: 59%;
            }
            .w70{
                width: 69%;
            }
            .w80{
                width: 79%;
            }
            .w90{
                width: 89%;
            }
            .w100{
                width: 99%;
            }
            .m4{
                margin: 4px;
            }
            .p4{
                padding: 4px;
            }
            .mw30{
                min-width: 29%;
            }

            .docDetailDialog{
                display: flex;
                height: 100%;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .doc-menu-list{
                height: 100%;
                width: 30%;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                overflow: auto;
                position: relative;
            }

            .doc-menu-view{
                height: 100%;
                width: 70%;
                position: relative;
                background: white;
            }

            .table-line-menu .date{
                width: 14%;
                padding-right: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
            }


            .table-line-menu .name{
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                padding-left: 4px;
                padding-right: 4px;
                width: 84%
            }

            .table-line-menu .dateTit{
                width: 14%;
                padding-right: 10px;
            }


            .table-line-menu .nameTit{
                padding-left:4px;
                padding-right:4px;
                width: 84%;
            }

            iron-pages{
                height: calc(100% - 50px);
            }

            .doc-preview{
                height: calc(100% - 5px);
                width: auto;
                margin: 1%;
                overflow: auto;
            }

            .doc-container{
                height: 49%;
            }

            .doc-container-title{
                background-color: var(--app-background-color-dark);
                font-size: var(--font-size-normal);
                font-weight: bold;
                padding: 2px;
            }

            .doc-container-list{
                height: 100%;
                overflow: auto;
                background-color: white;
            }

            .doc-submenu-container{
                height: calc(100% - 20px);
            }


        </style>

        <div class="docDetailDialog">
            <div class="doc-menu-list">
                <div class="doc-submenu-container">
                    <ht-spinner active="[[isLoading]]"></ht-spinner>
                    <div class="doc-container">
                        <div class="doc-container-title">
                            [[localize('care-path-linked-doc', 'Linked document', language)]]
                        </div>
                        <div class="doc-container-list">
                            <paper-listbox id="" class="menu-content sublist-document" selectable="paper-item"  toggle-shift>
                                <div class="table-line-menu table-line-menu-top">
                                    <div class="dateTit">[[localize('dat','Date',language)]]</div>
                                    <div class="nameTit">[[localize('name','Name',language)]]</div>
                                </div>
                                <template is="dom-repeat" items="[[linkedDocumentList]]" as="doc" id="linkedDocList">
                                    <collapse-button>
                                        <paper-item slot="sublist-collapse-item" id$="[[doc.id]]" data-item$="[[doc]]" aria-selected="[[selected]]" class$="menu-trigger menu-item [[isIronSelected(selected)]]" on-tap="_showDocument">
                                            <div id="subMenu-linked-doc" class="table-line-menu">
                                                <div class="date">[[_formatDate(doc.created)]]</div>
                                                <div class="name">[[doc.name]]</div>
                                            </div>
                                        </paper-item>
                                    </collapse-button>
                                </template>
                            </paper-listbox>
                        </div>
                    </div>
                    <div class="doc-container">
                        <div class="doc-container-title">
                            [[localize('care-path-avai-doc', 'Available document', language)]]
                        </div>
                        <div class="doc-container-list">
                            <paper-listbox id="" class="menu-content sublist-document" selectable="paper-item"  toggle-shift>
                                <div class="table-line-menu table-line-menu-top">
                                    <div class="dateTit">[[localize('dat','Date',language)]]</div>
                                    <div class="nameTit">[[localize('name','Name',language)]]</div>
                                </div>
                                <template is="dom-repeat" items="[[unlinkedDocumentList]]" as="doc" id="availableDocList">
                                    <collapse-button>
                                        <paper-item slot="sublist-collapse-item" id$="[[doc.id]]" data-item$="[[doc]]" aria-selected="[[selected]]" class$="menu-trigger menu-item [[isIronSelected(selected)]]" on-tap="_showDocument">
                                            <div id="subMenu-doc-to-link" class="table-line-menu">
                                                <div class="date">[[_formatDate(doc.created)]]</div>
                                                <div class="name">[[doc.name]]</div>
                                            </div>
                                        </paper-item>
                                    </collapse-button>
                                </template>
                            </paper-listbox>
                        </div>
                    </div>
                </div>
                <ht-spinner active="[[isLoading]]"></ht-spinner>
            </div>
            <div class="doc-menu-view">
                <template is="dom-if" if="[[_isSelectedDocument(selectedDocument, selectedDocument.*)]]">
                    <div class="doc-preview">
                        <dynamic-doc
                                id="document-preview-[[selectedDocument.id]]"
                                api="[[api]]"
                                i18n="[[i18n]]"
                                user="[[user]]"
                                document-id="[[selectedDocument.id]]"
                                title="[[selectedDocument.name]]"
                                language="[[language]]"
                                preview="true"
                                downloadable="true"
                                fullwidth="true"
                                force-no-assignation="true"
                                force-no-document-header="true"
                                additional-css-class="tripTyque"
                        ></dynamic-doc>
                    </div>
                </template>
            </div>
        </div>

 
`;
    }

    static get is() {
        return 'ht-pat-eform-dialog';
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
                type: Object,
                value: () => {
                }
            },
            currentContact: {
                type: Object,
                value: () => {
                }
            },
            isLoading: {
                type: Boolean,
                value: false
            },
            hcp: {
                type: Object,
                value: () => {
                }
            },
            contacts:{
                type: Array,
                value: () => []
            },
            selectedDocument:{
                type: Object,
                value: () => {}
            },
            availableDocumentList:{
                type: Array,
                value: () => []
            },
            linkedDocumentList:{
                type: Array,
                value: () => []
            },
            unlinkedDocumentList:{
                type: Array,
                value: () => []
            }

        };
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    static get observers() {
        return [];
    }

    _formatDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }

    _showDocument(e){
        if(_.get(e, 'currentTarget.dataset.item', null)){
            this.set("selectedDocument", JSON.parse(_.get(e, 'currentTarget.dataset.item', null)))
            this.dispatchEvent(new CustomEvent('selected-document', {detail: {documentId: _.get(this, "selectedDocument.id", null)}, composed: true, bubbles: true}))
        }
    }

    _isSelectedDocument(){
        return !_.isEmpty(_.get(this, "selectedDocument", {}))
    }

    _refreshLinkedAndAvailableDocuments() {
        this.set('selectedDocument', {})
        this._getUnLinkedDocument()
        this._getLinkedDocument()
        return setTimeout(() => {
            this.shadowRoot.querySelector('#linkedDocList') && this.shadowRoot.querySelector('#linkedDocList').render()
            this.shadowRoot.querySelector('#availableDocList') && this.shadowRoot.querySelector('#availableDocList').render()
        }, 100)
    }

    _getUnLinkedDocument(){
        this.set('unlinkedDocumentList', _.get(this, 'availableDocumentList', []).filter(doc => !_.get(doc, 'uploadedDocumentId', null)))
    }

    _getLinkedDocument(){
        this.set('linkedDocumentList', _.get(this, 'availableDocumentList', []).filter(doc => _.get(doc, 'uploadedDocumentId', null)))
    }


}

customElements.define(HtPatEformDialog.is, HtPatEformDialog);
