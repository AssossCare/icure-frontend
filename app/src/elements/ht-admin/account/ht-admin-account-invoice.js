/**
@license
Copyright (c) 2016 The Polymer Project Authors. All rights reserved.
This code may only be used under the BSD style license found at http://polymer.github.io/LICENSE.txt
The complete set of authors may be found at http://polymer.github.io/AUTHORS.txt
The complete set of contributors may be found at http://polymer.github.io/CONTRIBUTORS.txt
Code distributed by Google as part of the polymer project is also
subject to an additional IP rights grant found at http://polymer.github.io/PATENTS.txt
*/
import '../../../styles/dialog-style.js';

import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-input/paper-input"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"

import _ from 'lodash/lodash';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class HtAdminAccountInvoice extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="shared-styles dialog-style">
            :host {
                display: block;
            }

            :host *:focus{
                outline:0!important;
            }

            .invoice-panel{
                height: 100%;
                width: 100%;
                padding: 0 20px;
                box-sizing: border-box;
                position:relative;
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

            .marginRight10 {
                margin-right:10px;
            }

            @media screen and (max-width: 1024px) {
                .nomobile {
                    display: none;
                }
                .onlymobile {
                    display: block;
                }
            }

            paper-tabs {
                background: var(--app-background-color);
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
                --paper-tabs: {
                    color: var(--app-text-color);
                };
            }

            paper-tab {
                --paper-tab-ink: var(--app-text-color);
            }

            paper-tab.iron-selected {
                font-weight: bold;
            }

            paper-tab.iron-selected iron-icon{
                opacity: 1;
            }

            paper-tab iron-icon{
                opacity: 0.5;
                color: var(--app-text-color);
            }

            :host {
                width: 100%!important;
            }

            paper-input{
                margin: 0 16px;
                --paper-input-container-focus-color: var(--app-primary-color);
                font-size:var(--form-font-size);
            }

            iron-icon{
                margin-right: 8px;
            }

            .textAlignCenter { text-align: center; }

            .hidden, .fii_hidden { display:none }

            #addDisplayedAgendaDialog{
                height: 400px;
                width: 800px;
            }

            .pencilIcon{
                height: 14px;
                width: 14px;
            }

            .btnDiv{
                text-align: right;
            }

            .buttons{
                display: flex;
                flex-grow: 1;
                box-sizing: border-box;
                justify-content: flex-end;
                padding-top: 16px;
            }

            .modalDialog{
                height: 300px;
                width: 600px;
            }

            .modalDialogContent{
                width: auto;
                position: relative;
            }

            .m-t-50 {
                margin-top:50px!important;
            }

            .textAlignCenter {
                text-align: center;
            }

            .bold {
                font-weight: 700!important;
            }

            .error{
                color: var(--app-error-color-dark)
            }

        </style>

        <div class="invoice-panel">
            <h4>[[localize('my_pro', 'My profil', language)]] - [[localize('acc_invoice_info', 'invoice information', language)]]</h4>
            <div class="efactContainer" id="efactContainer">
                <h4>[[localize('list_of_bat_num', 'List of batch number', language)]]</h4>
                <div>
                    <vaadin-grid id="batchList" class="material" items="[[listOfBatchReference]]">
                        <vaadin-grid-column>
                            <template class="header">
                                [[localize('Oa','Oa',language)]]
                            </template>
                            <template>
                                <div>[[item.oa]]</div>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column>
                            <template class="header">
                                [[localize('nxt-bat-num','Next batch number',language)]]
                            </template>
                            <template>
                                <div>[[item.batchReference]]</div>
                            </template>
                        </vaadin-grid-column>
                        <vaadin-grid-column>
                            <template class="header">
                            </template>
                            <template>
                                <div class="btnDiv">
                                    <iron-icon icon="vaadin:pencil" class="pencilIcon" on-tap="_modifyBatchNumber" data-item\$="[[item]]"></iron-icon>
                                </div>
                            </template>
                        </vaadin-grid-column>
                    </vaadin-grid>
                </div>
            </div>
        </div>

        <paper-dialog class="modalDialog" id="modifyInvoiceReference" no-cancel-on-outside-click="" no-cancel-on-esc-key="">
            <h2 class="modal-title"><span><iron-icon icon="icons:create"></iron-icon> [[localize('mod-bat-ref','Modify batch reference',language)]]</span></h2>
            <div class="content modalDialogContent">
                <h3 class="textAlignCenter"></h3>
                <p class="textAlignCenter m-t-50 bold">
                    <paper-input type="number" id="nxtInvoiceRef" label="[[localize('nxt-bat-num','Next batch number',language)]]" value="{{selectedNextInvoiceRef}}"></paper-input>
                </p>
                <p><span class="error">[[batchReferenceError]]</span></p>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeDialogs"><iron-icon icon="icons:close" class="mr5 smallIcon"></iron-icon> [[localize('can','Cancel',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_confirmNewNumber"><iron-icon icon="check-circle" class="mr5 smallIcon"></iron-icon> [[localize('confirm','Confirm',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-admin-account-invoice'
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
          listOfBatchReference: {
              type: Array,
              value: () => []
          },
          selectedNextInvoiceRef:{
              type: Number,
              value: 0
          },
          selectedBatchReference:{
              type: Object,
              value: () => {}
          },
          batchReferenceError:{
              type: String,
              value: ""
          }
      }
  }

  static get observers() {
      return ["_dataProvider(user)"];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready()
  }

  _modifyBatchNumber(e){
      e.stopPropagation()
      if(e.target.dataset && e.target.dataset.item){
          const selectedItem = JSON.parse(e.target.dataset.item)
          this.$["modifyInvoiceReference"].open()
          this.set('selectedNextInvoiceRef', selectedItem.batchReference)
          this.set('selectedBatchReference', selectedItem)
          this.set('batchReferenceError', "")
      }
  }

  _dataProvider(){
      this.set('selectedNextInvoiceRef', 0)
      this.set('selectedBatchReference', null)
      this.set('batchReferenceError', "")

      const listOfOa = [100, 200, 300, 400, 500, 600, 900]

      let prom = Promise.resolve()

      listOfOa.map(oa =>
          prom = prom.then(batchReferences => this.api.invoice().getNextInvoiceReference('efact:'+this.user.healthcarePartyId+':'+oa+':', this.api.entityRef())
              .then(ref => _.concat(batchReferences, {batchReference: ref, oa: oa, prefix: 'efact:'+this.user.healthcarePartyId+':'+oa+':'}))
          )
      )

      prom.then(batchReferences => this.set("listOfBatchReference", _.compact(batchReferences)))
  }

  _closeDialogs(){
      this.$["modifyInvoiceReference"].close()
      this.set('selectedNextInvoiceRef', 0)
      this.set('selectedBatchReference', null)
  }

  _confirmNewNumber(){
      this.set('batchReferenceError', "")
      if(this.selectedNextInvoiceRef && this.selectedBatchReference.batchReference){
          if(this.selectedNextInvoiceRef >= this.selectedBatchReference.batchReference){

              this.api.entityRef().createEntityReference(new models.EntityReference({
                  id: this.selectedBatchReference.prefix + _.padStart("" + (this.selectedNextInvoiceRef % 1000000000), 9, "0"),
                  docId: this.api.crypto().randomUuid()
              })).then(nxtRef => {
                  this.$["modifyInvoiceReference"].close()
                  this._dataProvider()
              })

          }else{
              this.set('batchReferenceError', this.localize("err-bat-num", "Error: batch number can't be lower than the previous", this.language))
          }
      }

  }
}

customElements.define(HtAdminAccountInvoice.is, HtAdminAccountInvoice)
