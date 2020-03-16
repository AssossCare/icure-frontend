/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../../styles/buttons-style.js';

import '../../../styles/dialog-style.js';
import '../../../styles/paper-tabs-style.js';
import '../../../styles/paper-input-style.js';

import "@polymer/iron-icon/iron-icon"
import "@polymer/iron-pages/iron-pages"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-fab/paper-fab"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-tabs/paper-tabs"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"
import "@vaadin/vaadin-upload/vaadin-upload"

import _ from 'lodash/lodash';
import CodeMirror from 'codemirror/src/codemirror';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtAdminManagementForms extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles buttons-style dialog-style paper-tabs-style paper-input-style">
            :host {
                display: block;
                height: 100%;
            }

            :host *:focus{
                outline:0!important;
            }

            .panel-title {
                margin-bottom: 0;
            }

            .forms-panel {
                height: 100%;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                position:relative;

                display: flex;
                flex-direction: column;
            }

            .forms-panel .panel-content {
                padding: 0 12px;
                overflow: hidden;
                border-bottom: 1px solid var(--app-background-color-dark);
                box-sizing: border-box;
                overflow-y: auto;
            }

            .grid {
                min-height: 0;
            }

            .grids-section {
                display: flex;
                flex-direction: column;
                flex: 1;
            }

            .content{
                padding: 0 12px;
            }

            vaadin-upload {
                margin: 16px 0;
                min-height: 280px;
                min-height: 0;
                background: var(--app-background-color);
                --vaadin-upload-buttons-primary: {
                    height: 28px;
                };
                --vaadin-upload-button-add: {
                    border: 1px solid var(--app-secondary-color);
                    color: var(--app-secondary-color);
                    background: transparent;
                    font-weight: 500;
                    font-size: var(--font-size-normal);
                    height: 28px;
                    padding: 0 12px;
                    text-transform: capitalize;
                    background: transparent;
                    box-sizing: border-box;
                    border-radius: 3px;
                };
                --vaadin-upload-file-progress: {
                    --paper-progress-active-color: var(--app-secondary-color);
                };
                --vaadin-upload-file-commands: {
                    color: var(--app-primary-color);
                };
                --vaadin-upload-file-meta: {
                    min-height: 36px;
                };

            }

            #formInformationDialog{
                height: 500px;
                width: 900px;
            }

            .marginRight10 {
                margin-right:10px;
            }

            #formData{
                width: 100%;
                height: 385px;
            }

            .line {
                display: flex;
            }
            .line.p8 {
                padding: 0 8px;
                box-sizing: border-box;
            }
            .line.p16 {
                padding: 0 16px;
                box-sizing: border-box;
            }
            .line > * {
                flex-grow: 1;
            }
            .line > *.no-grow {
                flex-grow: 0;
            }
            .line > *.w50 {
                width: 50px;
            }
            .line > *.w100 {
                width: 100px;
            }
            .line > *.w150 {
                width: 150px;
            }
            .line > *.grow-3 {
                flex-grow: 3;
            }

            .line span.lang {
                padding-top: 20px;
                width: 80px !important;
            }

            /* BASICS */

            .CodeMirror {
                /* Set height, width, borders, and global font properties here */
                font-family: monospace;
                height: 300px;
                color: black;
                direction: ltr;
            }

            /* PADDING */

            .CodeMirror-lines {
                padding: 4px 0; /* Vertical padding around content */
            }
            .CodeMirror pre {
                padding: 0 4px; /* Horizontal padding of content */
            }

            .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
                background-color: white; /* The little square between H and V scrollbars */
            }

            /* GUTTER */

            .CodeMirror-gutters {
                border-right: 1px solid #ddd;
                background-color: #f7f7f7;
                white-space: nowrap;
            }
            .CodeMirror-linenumbers {}
            .CodeMirror-linenumber {
                padding: 0 3px 0 5px;
                min-width: 20px;
                text-align: right;
                color: #999;
                white-space: nowrap;
            }

            .CodeMirror-guttermarker { color: black; }
            .CodeMirror-guttermarker-subtle { color: #999; }

            /* CURSOR */

            .CodeMirror-cursor {
                border-left: 1px solid black;
                border-right: none;
                width: 0;
            }
            /* Shown when moving in bi-directional text */
            .CodeMirror div.CodeMirror-secondarycursor {
                border-left: 1px solid silver;
            }
            .cm-fat-cursor .CodeMirror-cursor {
                width: auto;
                border: 0 !important;
                background: #7e7;
            }
            .cm-fat-cursor div.CodeMirror-cursors {
                z-index: 1;
            }
            .cm-fat-cursor-mark {
                background-color: rgba(20, 255, 20, 0.5);
                -webkit-animation: blink 1.06s steps(1) infinite;
                -moz-animation: blink 1.06s steps(1) infinite;
                animation: blink 1.06s steps(1) infinite;
            }
            .cm-animate-fat-cursor {
                width: auto;
                border: 0;
                -webkit-animation: blink 1.06s steps(1) infinite;
                -moz-animation: blink 1.06s steps(1) infinite;
                animation: blink 1.06s steps(1) infinite;
                background-color: #7e7;
            }
            @-moz-keyframes blink {
                0% {}
                50% { background-color: transparent; }
                100% {}
            }
            @-webkit-keyframes blink {
                0% {}
                50% { background-color: transparent; }
                100% {}
            }
            @keyframes blink {
                0% {}
                50% { background-color: transparent; }
                100% {}
            }

            /* Can style cursor different in overwrite (non-insert) mode */
            .CodeMirror-overwrite .CodeMirror-cursor {}

            .cm-tab { display: inline-block; text-decoration: inherit; }

            .CodeMirror-rulers {
                position: absolute;
                left: 0; right: 0; top: -50px; bottom: -20px;
                overflow: hidden;
            }
            .CodeMirror-ruler {
                border-left: 1px solid #ccc;
                top: 0; bottom: 0;
                position: absolute;
            }

            /* DEFAULT THEME */

            .cm-s-default .cm-header {color: blue;}
            .cm-s-default .cm-quote {color: #090;}
            .cm-negative {color: #d44;}
            .cm-positive {color: #292;}
            .cm-header, .cm-strong {font-weight: bold;}
            .cm-em {font-style: italic;}
            .cm-link {text-decoration: underline;}
            .cm-strikethrough {text-decoration: line-through;}

            .cm-s-default .cm-keyword {color: #708;}
            .cm-s-default .cm-atom {color: #219;}
            .cm-s-default .cm-number {color: #164;}
            .cm-s-default .cm-def {color: #00f;}
            .cm-s-default .cm-variable,
            .cm-s-default .cm-punctuation,
            .cm-s-default .cm-property,
            .cm-s-default .cm-operator {}
            .cm-s-default .cm-variable-2 {color: #05a;}
            .cm-s-default .cm-variable-3, .cm-s-default .cm-type {color: #085;}
            .cm-s-default .cm-comment {color: #a50;}
            .cm-s-default .cm-string {color: #a11;}
            .cm-s-default .cm-string-2 {color: #f50;}
            .cm-s-default .cm-meta {color: #555;}
            .cm-s-default .cm-qualifier {color: #555;}
            .cm-s-default .cm-builtin {color: #30a;}
            .cm-s-default .cm-bracket {color: #997;}
            .cm-s-default .cm-tag {color: #170;}
            .cm-s-default .cm-attribute {color: #00c;}
            .cm-s-default .cm-hr {color: #999;}
            .cm-s-default .cm-link {color: #00c;}

            .cm-s-default .cm-error {color: #f00;}
            .cm-invalidchar {color: #f00;}

            .CodeMirror-composing { border-bottom: 2px solid; }

            /* Default styles for common addons */

            div.CodeMirror span.CodeMirror-matchingbracket {color: #0b0;}
            div.CodeMirror span.CodeMirror-nonmatchingbracket {color: #a22;}
            .CodeMirror-matchingtag { background: rgba(255, 150, 0, .3); }
            .CodeMirror-activeline-background {background: #e8f2ff;}

            /* STOP */

            /* The rest of this file contains styles related to the mechanics of
               the editor. You probably shouldn't touch them. */

            .CodeMirror {
                position: relative;
                overflow: hidden;
                background: white;
            }

            .CodeMirror-scroll {
                overflow: scroll !important; /* Things will break if this is overridden */
                /* 30px is the magic margin used to hide the element's real scrollbars */
                /* See overflow: hidden in .CodeMirror */
                margin-bottom: -30px; margin-right: -30px;
                padding-bottom: 30px;
                height: 100%;
                outline: none; /* Prevent dragging from highlighting the element */
                position: relative;
            }
            .CodeMirror-sizer {
                position: relative;
                border-right: 30px solid transparent;
            }

            /* The fake, visible scrollbars. Used to force redraw during scrolling
               before actual scrolling happens, thus preventing shaking and
               flickering artifacts. */
            .CodeMirror-vscrollbar, .CodeMirror-hscrollbar, .CodeMirror-scrollbar-filler, .CodeMirror-gutter-filler {
                position: absolute;
                z-index: 6;
                display: none;
            }
            .CodeMirror-vscrollbar {
                right: 0; top: 0;
                overflow-x: hidden;
                overflow-y: scroll;
            }
            .CodeMirror-hscrollbar {
                bottom: 0; left: 0;
                overflow-y: hidden;
                overflow-x: scroll;
            }
            .CodeMirror-scrollbar-filler {
                right: 0; bottom: 0;
            }
            .CodeMirror-gutter-filler {
                left: 0; bottom: 0;
            }

            .CodeMirror-gutters {
                position: absolute; left: 0; top: 0;
                min-height: 100%;
                z-index: 3;
            }
            .CodeMirror-gutter {
                white-space: normal;
                height: 100%;
                display: inline-block;
                vertical-align: top;
                margin-bottom: -30px;
            }
            .CodeMirror-gutter-wrapper {
                position: absolute;
                z-index: 4;
                background: none !important;
                border: none !important;
            }
            .CodeMirror-gutter-background {
                position: absolute;
                top: 0; bottom: 0;
                z-index: 4;
            }
            .CodeMirror-gutter-elt {
                position: absolute;
                cursor: default;
                z-index: 4;
            }
            .CodeMirror-gutter-wrapper ::selection { background-color: transparent }
            .CodeMirror-gutter-wrapper ::-moz-selection { background-color: transparent }

            .CodeMirror-lines {
                cursor: text;
                min-height: 1px; /* prevents collapsing before first draw */
            }
            .CodeMirror pre {
                /* Reset some styles that the rest of the page might have set */
                -moz-border-radius: 0; -webkit-border-radius: 0; border-radius: 0;
                border-width: 0;
                background: transparent;
                font-family: inherit;
                font-size: inherit;
                margin: 0;
                white-space: pre;
                word-wrap: normal;
                line-height: inherit;
                color: inherit;
                z-index: 2;
                position: relative;
                overflow: visible;
                -webkit-tap-highlight-color: transparent;
                -webkit-font-variant-ligatures: contextual;
                font-variant-ligatures: contextual;
            }
            .CodeMirror-wrap pre {
                word-wrap: break-word;
                white-space: pre-wrap;
                word-break: normal;
            }

            .CodeMirror-linebackground {
                position: absolute;
                left: 0; right: 0; top: 0; bottom: 0;
                z-index: 0;
            }

            .CodeMirror-linewidget {
                position: relative;
                z-index: 2;
                padding: 0.1px; /* Force widget margins to stay inside of the container */
            }

            .CodeMirror-widget {}

            .CodeMirror-rtl pre { direction: rtl; }

            .CodeMirror-code {
                outline: none;
            }

            /* Force content-box sizing for the elements where we expect it */
            .CodeMirror-scroll,
            .CodeMirror-sizer,
            .CodeMirror-gutter,
            .CodeMirror-gutters,
            .CodeMirror-linenumber {
                -moz-box-sizing: content-box;
                box-sizing: content-box;
            }

            .CodeMirror-measure {
                position: absolute;
                width: 100%;
                height: 0;
                overflow: hidden;
                visibility: hidden;
            }

            .CodeMirror-cursor {
                position: absolute;
                pointer-events: none;
            }
            .CodeMirror-measure pre { position: static; }

            div.CodeMirror-cursors {
                visibility: hidden;
                position: relative;
                z-index: 3;
            }
            div.CodeMirror-dragcursors {
                visibility: visible;
            }

            .CodeMirror-focused div.CodeMirror-cursors {
                visibility: visible;
            }

            .CodeMirror-selected { background: #d9d9d9; }
            .CodeMirror-focused .CodeMirror-selected { background: #d7d4f0; }
            .CodeMirror-crosshair { cursor: crosshair; }
            .CodeMirror-line::selection, .CodeMirror-line > span::selection, .CodeMirror-line > span > span::selection { background: #d7d4f0; }
            .CodeMirror-line::-moz-selection, .CodeMirror-line > span::-moz-selection, .CodeMirror-line > span > span::-moz-selection { background: #d7d4f0; }

            .cm-searching {
                background-color: #ffa;
                background-color: rgba(255, 255, 0, .4);
            }

            /* Used to force a border model for a node */
            .cm-force-border { padding-right: .1px; }

            @media print {
                /* Hide the cursor when printing */
                .CodeMirror div.CodeMirror-cursors {
                    visibility: hidden;
                }
            }

            /* See issue #2901 */
            .cm-tab-wrap-hack:after { content: ''; }

            /* Help users use markselection to safely style text background */
            span.CodeMirror-selectedtext { background: none; }

        </style>

        <div class="forms-panel">
            <h4 class="panel-title">[[localize('man_forms', 'Management - Forms', language)]]</h4>

            <div id="activesFormsListDiv" class="grids-section">
                <h4>[[localize('list_act_forms', 'List of actives forms', language)]]</h4>
                <vaadin-grid id="activeUsersList" class="material grid" items="[[listOfActivesForms]]" active-item="{{selectedForm}}">
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('Id','Id',language)]]
                        </template>
                        <template>
                            <div>[[item.id]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('formGroupName','Group name',language)]]
                        </template>
                        <template>
                            <div>[[item.group.name]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('formName','Form name',language)]]
                        </template>
                        <template>
                            <div>[[item.name]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('specialityFormName','Speciality',language)]]
                        </template>
                        <template>
                            <div>[[item.specialty.code]]</div>
                        </template>
                    </vaadin-grid-column>
                </vaadin-grid>
            </div>


            <div id="inactivesFormsListDiv" class="grids-section">
                <h4>[[localize('list_inact_forms', 'List of inactives forms', language)]]</h4>
                <vaadin-grid id="activeUsersList" class="material grid" items="[[listOfInactivesForms]]" active-item="{{selectedForm}}">
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('Id','Id',language)]]
                        </template>
                        <template>
                            <div>[[item.id]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('formGroupName','Group name',language)]]
                        </template>
                        <template>
                            <div>[[item.group.name]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('formName','Form name',language)]]
                        </template>
                        <template>
                            <div>[[item.name]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            [[localize('specialityFormName','Speciality',language)]]
                        </template>
                        <template>
                            <div>[[item.specialty.code]]</div>
                        </template>
                    </vaadin-grid-column>
                </vaadin-grid>
            </div>
        </div>

        <paper-dialog id="formInformationDialog">
            <h2 class="modal-title">
                <paper-tabs selected="{{tabs}}">
                    <paper-tab id="tab-formInformation" class="form-tab"><iron-icon icon="vaadin:form" class="marginRight10"></iron-icon><span class="nomobile">[[localize('form_info','Form informations',language)]]</span></paper-tab>
                    <paper-tab id="tab-jsonForm" class="form-tab"><iron-icon icon="vaadin:code" class="marginRight10"></iron-icon><span class="nomobile">[[localize('form_code','Form code',language)]]</span></paper-tab>
                </paper-tabs>
            </h2>
            <div class="content">
                <iron-pages selected="[[tabs]]" class="content panel-content">
                    <page>
                        <div class="line">
                            <paper-input label="Id" value="{{selectedFormData.id}}" readonly=""></paper-input>
                        </div>
                        <div class="line">
                            <paper-input label="[[localize('formGroupName','Group name',language)]]" value="{{selectedFormData.group.name}}" readonly=""></paper-input>
                            <paper-input label="[[localize('formName','Form name',language)]]" value="{{selectedFormData.name}}" readonly=""></paper-input>
                        </div>
                        <div class="line">
                            <paper-input label="[[localize('specialityFormName','Speciality',language)]]" value="{{selectedFormData.specialty.code}}" readonly=""></paper-input>
                            <paper-input label="[[localize('status','Status',language)]]" value="{{selectedFormData.disabled}}" readonly=""></paper-input>
                        </div>
                    </page>
                    <page>
                        <textarea id="formData">[[selectedFormData.formDataAsString]]</textarea>
                    </page>
                </iron-pages>
            </div>
            <div class="buttons">
                <paper-button class="button" dialog-dismiss="">[[localize('can','Cancel',language)]]</paper-button>
                <paper-button class="button button--other" on-tap="_download"><iron-icon icon="file-download"></iron-icon>[[localize('download','Download',language)]]</paper-button>
                <paper-button class="button button--other" on-tap="_upload"><iron-icon icon="file-upload"></iron-icon>[[localize('upload','Upload',language)]]</paper-button>
            </div>
        </paper-dialog>


        <paper-dialog id="upload-dialog">
            <h2 class="modal-title">[[localize('upl_fil','Upload files',language)]]<span class="extra-info">(PDF, images and videos)</span></h2>
            <!--<paper-fab class="close-button-icon" icon="icons:close" dialog-dismiss></paper-fab>-->
            <div class="content">
                <vaadin-upload id="vaadin-upload" files="{{files}}" target\$="[[api.host]]/form/template/[[selectedForm.id]]/attachment/multipart" method="PUT" form-data-name="attachment" on-upload-request="_fileRequest" on-upload-success="_fileUpload"></vaadin-upload>
            </div>
            <div class="buttons">
                <paper-button class="button" dialog-dismiss="">[[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-admin-management-forms'
  }

  static get properties() {
      return {
          api: {
              type: Object,
              noReset: true
          },
          user: {
              type: Object,
              noReset: true
          },
          selectedForm:{
              type: Object,
              value: () => {}
          },
          listOfInactivesForms:{
              type: Array,
              value: () => []
          },
          listOfActivesForms:{
              type: Array,
              value: () => []
          },
          tabs: {
              type: Number,
              value: 0
          },
          selectedFormData:{
              type: Object,
              value: () => {}
          }

      }
  }

  static get observers() {
      return ['_initFormsDataProvider(user)', '_selectedFormChanged(selectedForm)', '_initCodeMirror(tabs)'];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  _initFormsDataProvider(){
      this.api.form().findFormTemplatesBySpeciality('deptgeneralpractice').then(forms => {
          this.set('listOfActivesForms', _.orderBy(forms.filter(f => f.disabled !== "true"), 'group.name'))
          this.set('listOfInactivesForms', _.orderBy(forms.filter(f => f.disabled === "true"), 'group.name'))
      })
  }

  _selectedFormChanged(){
      if(this.selectedForm && this.selectedForm.id){
          this.api.form().getFormTemplate(this.selectedForm.id)
              .then(form => this.set('selectedFormData', _.assign(form, {formDataAsString: JSON.stringify(form.layout)})))
              .finally(() => {
                  this.$['formInformationDialog'].open()
                  this.set('tabs',tab>0?tab:0)
              })

      }
  }

  _download(e) {
      const array = this.api.crypto().utils.utf82ua(JSON.stringify(this.selectedFormData.layout, null, 2))

      this.api.triggerFileDownload(array.buffer.slice(0, array.length), "application/json", `${this.selectedFormData.group.name}/${this.selectedFormData.name}`)
  }

  _upload() {
      const vaadinUpload = this.root.querySelector('#vaadin-upload');
      vaadinUpload.set('i18n.addFiles.many', this.localize('upl_fil','Upload file',this.language))
      vaadinUpload.set('i18n.dropFiles.many', this.localize('uplabel','Drop files here...',this.language))
      this.root.querySelector('#upload-dialog').open();
  }

  _fileRequest(e) {
      e.detail.xhr.setRequestHeader('Authorization', this.api.authorizationHeader());
  }

  _fileUpload() {
      setTimeout(() => this.root.querySelector('#upload-dialog').close(), 5000);
  }

  _initCodeMirror(tabs) {
      if (tabs === 1) {
          let mirror = CodeMirror.fromTextArea(this.$['formData'], {
              mode: 'javascript',
              json: true,
              readOnly: true,
              inputStyle: 'textarea',
              lineNumbers: true
          })
      }
  }
}

customElements.define(HtAdminManagementForms.is, HtAdminManagementForms)
