import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatCarePathListDialog extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
  static get template() {
    return html`
        <style include="dialog-style scrollbar-style buttons-style">

            #care-path-list{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .content{
                height: 100%;
            }

            .buttons{
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 0;
            }

            #care-path-list-grid{
                margin: 1%;
                height: calc(100% - 55px);
            }

        </style>

        <paper-dialog id="care-path-list">
            <h2 class="modal-title">
                [[localize('care-path-list', 'Care path list', language)]] (U99 - Insuffisance rénale chronique / T90 - Diabète type II)
            </h2>
            <div class="content">
                <vaadin-grid id="care-path-list-grid" class="material grid" items="[[carePathList]]" active-item="{{selectedCarePath}}">
                    <vaadin-grid-column>
                        <template class="header">
                            <vaadin-grid-sorter path="">[[localize('care-path-type','Type',language)]]</vaadin-grid-sorter>
                        </template>
                        <template>
                            <div>[[item.name]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            <vaadin-grid-sorter path="">[[localize('care-path-he','Health element',language)]]</vaadin-grid-sorter>
                        </template>
                        <template>
                            <div>[[_getHealthElement(item.linkedHealthElement)]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            <vaadin-grid-sorter path="">[[localize('care-path-start-date','Start date',language)]]</vaadin-grid-sorter>
                        </template>
                        <template>
                            <div>[[_formatDate(item.openingDate)]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            <vaadin-grid-sorter path="">[[localize('care-path-end-date','End date',language)]]</vaadin-grid-sorter>
                        </template>
                        <template>
                            <div>[[_formatDate(item.closingDate)]]</div>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            <vaadin-grid-sorter path="">[[localize('care-path-team','Team',language)]]</vaadin-grid-sorter>
                        </template>
                        <template>
                            <template is="dom-repeat" items="[[item.team]]" as="hcp">
                                <div>[[hcp.firstName]] [[hcp.lastName]]</div>
                            </template>
                        </template>
                    </vaadin-grid-column>
                    <vaadin-grid-column>
                        <template class="header">
                            <vaadin-grid-sorter path="">[[localize('care-path-status','Status',language)]]</vaadin-grid-sorter>
                        </template>
                        <template>
                            <div>[[_getStatus(item.status)]]</div>
                        </template>
                    </vaadin-grid-column>
                </vaadin-grid>
            </div>
            <div class="buttons">
                <paper-button class="button" on-tap="_closeDialogs"><iron-icon icon="icons:close" class="mr5 smallIcon"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
                <paper-button class="button button--save" on-tap="_openCarePathDetailDialog"><iron-icon icon="vaadin:plus" class="mr5 smallIcon"></iron-icon> [[localize('care-path-create','Create care path',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-care-path-list-dialog';
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
          language: {
              type: String
          },
          selectedCarePath:{
              type: Object,
              value: () => {}
          },
          carePathList:{
              type: Array,
              value: () => []
          }
      };
  }

  static get observers(){
      return ['_selectedCarePathChanged(selectedCarePath)'];
  }

  ready(){
      super.ready();
  }

  open(){
      const activeEh = _.cloneDeep(this.activeHealthElements)
      let prom = Promise.resolve()

      activeEh.filter(he => he.id && he.codes.find(c => c.type === "BE-THESAURUS" && (c.code === "10119104" || c.code === "10025768")) && _.size(he.plansOfAction)).map(he => _.get(he, 'plansOfAction', []).map(p => {
          prom = prom.then(cp => (_.size(_.compact(_.get(p, 'careTeamMemberships', []).map(ctms => _.get(_.get(he, "careTeam", []).find(ct => _.get(ct, 'id', null) === _.get(ctms, 'careTeamMemberId', "")), 'healthcarePartyId', null)))) ? this.api.hcparty().getHealthcareParties(_.compact(_.get(p, 'careTeamMemberships', []).map(ctms => _.get(_.get(he, "careTeam", []).find(ct => _.get(ct, 'id', null) === _.get(ctms, 'careTeamMemberId', "")), 'healthcarePartyId', null))).join(',')) : Promise.resolve([]))
              .then(hcps => _.concat(cp, _.merge(p, {linkedHealthElement: he, team: hcps}))))
      }))

      prom.then(cp => {
          this.set('carePathList', _.compact(cp))
          this.$["care-path-list"].open()
      })
  }

  _closeDialogs(){
      this.$["care-path-list"].close()
  }

  _openCarePathDetailDialog(){
      this._closeDialogs()
      this.dispatchEvent(new CustomEvent('open-care-path-detail-dialog', {detail: {}, bubbles: true, composed: true}))
  }

  _selectedCarePathChanged(){
      if(!_.isEmpty(_.get(this.selectedCarePath, 'id', {}))){
          this._closeDialogs()
          this.dispatchEvent(new CustomEvent('open-care-path-detail-dialog', {detail: {selectedCarePathInfo: {carePathId: _.get(this.selectedCarePath, 'id', ""), linkedHeId: _.get(this.selectedCarePath, 'linkedHealthElement.id', "")}}, bubbles: true, composed: true}))
      }
  }

  _formatDate(date){
      return date ? this.api.moment(date).format('DD/MM/YYYY') : null
  }

  _getHealthElement(he){
      return _.get(_.get(he, 'codes', []).find(c => c.type === "ICPC"), 'code', '')+" "+_.get(he, 'descr', "")
  }

  _getStatus(status){
      return (status & 1 << 2) === 0 ? 'En cours' : ""
  }
}
customElements.define(HtPatCarePathListDialog.is, HtPatCarePathListDialog);
