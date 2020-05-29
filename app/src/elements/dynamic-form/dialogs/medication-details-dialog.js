import '../../../styles/scrollbar-style.js';
import '../../../styles/dropdown-style.js';
import '../../../styles/dialog-style.js';
import '../../../styles/paper-input-style.js';
import '../../../styles/dropdown-style.js';
import '../ht-regimen.js';
import '../ht-regimen-item.js';
import './medication-details.js';

import _ from 'lodash/lodash'
import moment from 'moment/src/moment'

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../tk-localizer";
class MedicationDetailsDialog extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="scrollbar-style dropdown-style dialog-style">
            paper-dialog {
                position: absolute;
                width: 80%;
                height: 80%;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
                max-height: 780px !important;
                max-width: 1280px !important;
                display: flex;
                flex-direction: column;
            }

            .content{
                flex-grow: 1
            }

            #medication-detail .save-line {
                height: 20px;
            }

            .modal-title{
                justify-content: flex-start;
            }

            .modal-title iron-icon {
                margin-right: 8px;
            }

            .medication-line > span {
                padding: 0 4px;
                overflow: hidden;
                text-overflow: ellipsis;
                max-width: 90%;
                white-space: nowrap;
            }

            paper-input {
                --paper-input-container-focus-color: var(--app-primary-color);
            }

            paper-input.center {
                text-align: center;
            }

            #filter {
                width: 50%;
            }

            .dropdown-priority {
                cursor: pointer;
            }

            .regimen-lines {
                border-top: 1px solid var(--app-background-color-dark);
                margin-bottom: auto;
                padding: 0 12px;
            }
            .force-left {
                left: 12px;
            }
            .force-right {
                right: 12px;
            }

            .posology-btn {
                left: 100%;
                transform: translateX(-100%);
                padding-right: 3px;
            }

            .marginRight10 {
                margin-right: 10px;
            }

            iron-input#medicNameInput {
                text-overflow: ellipsis;
                overflow: hidden;
                white-space: nowrap;
            }


            #numberByFrequency {
                text-align: right;
                padding-right: 4px;
            }

            paper-input-container {
                --paper-input-container-focus-color: var(--app-primary-color);
                --paper-input-container-label: {
                    color: var(--app-text-color);
                    opacity: 1;
                };
                --paper-input-container-underline-disabled: {
                    border-bottom: 1px solid var(--app-text-color);

                };
                --paper-input-container-color: var(--app-text-color);
            }


            .comment {
                width: 100%;
            }

            .custom-time {
                width: 100%;
                display: flex;
                flex-direction: row;
                justify-content: space-between;
            }

            .custom-time > div {
                display: flex;
            }

            .custom-time-add {
                height: 20px;
                width: 20px;
                background: var(--app-secondary-color);
                border-radius: 50%;
                padding: 1px;
                margin-right: 4px;
            }

            .add-box {
                position: absolute;
                display: flex;
                flex-direction: column;
                padding: 8px;
                background: white; /*var(--app-background-color-dark);*/
                border-radius: 4px;
                box-shadow: var(--app-shadow-elevation-1);
                transform: translateY(8px);
                z-index: 1;
            }
            .add-box h2 {
                text-align: center;
            }
            .add-box .one-line {
                display: flex;
                flex-direction: row;
                width: 100%;
            }
            .add-box .one-line > * {
                flex: 1;
            }

            .regimen-add .one-line {
                display: flex;
            }
            .regimen-add .one-line.fields { flex:1; }

            .add-first-regimen {
                width: 216px;
                margin: 0 auto;
                cursor: pointer;
            }

            .regimen-line .add-first-regimen {
                margin: initial;
            }

            * .btn-dropdown-container {
                box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                position: absolute;
                background: white;
                z-index: 10;
                width: 216px;
            }

            .add-first-regimen .btn-dropdown-container paper-item {
                text-transform: capitalize;
                height: 28px;
                padding: 0 8px;
            }

            .add-first-regimen .btn-dropdown-container paper-item:hover {
                background: var(--app-background-color-dark);
            }

            #selectedMedicationTable {
                border: none;
                height: 200px;
            }

            *.capitalize {
                text-transform: capitalize;
            }

            paper-tabs {
                /* background: var(--app-secondary-color);
                --paper-tabs-selection-bar-color: var(--app-text-color-disabled); */
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
                --paper-tabs_-_color: var(--app-text-color);
                margin-top: 0;
                flex-shrink: 0;
                padding: 0;
            }

            paper-tab{
                --paper-tab-ink: var(--app-secondary-color);
            }

            #main-table {
                position: relative;
            }

            paper-tab span{
                text-overflow: ellipsis;
                overflow: hidden;
                padding-right: 12px;
                display: block;
                max-width: calc(100% - 34px);
            }

            #custom paper-input-container{
                padding: 0;
                margin: 0 8px;
                --paper-input-container-input: {
                    border: none;
                    outline: 0;
                };
                max-width: 64px;
            }

            .rotate-icon {
                transform: rotate(-225deg);
            }

            .timeOfDay:hover {
                cursor: pointer;
                background: var(--app-background-color-dark);
            }

            #custom paper-input-container input{
                border: none;
                font-size: 1em;
                max-width: 48px;
            }

            #custom paper-input-container input:focus{
                outline: 0;
            }
            .container {
                flex-grow: 1;
                display: flex;
                flex-direction: column;
                align-self: flex-start;
                width: 100%;
                padding: 0 16px;
            }

        </style>

        <paper-dialog id="medication-details-dialog" always-on-top="true" no-cancel-on-outside-click="true">
            <h2 class="modal-title"><iron-icon icon="vaadin:pill"></iron-icon>[[_title(isPrescription)]]</h2>
            <div class="content container">
                <medication-details id="medication-details" api="[[api]]" i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" medication="[[medicationDetail]]" content="[[medicationContent]]">
                </medication-details>
            </div>
            <div class="buttons">
                <paper-button dialog-confirm="" autofocus="" on-tap="cancel" class="button">[[localize('can','Cancel',language)]]</paper-button>
                <template is="dom-if" if="[[!isPrescription]]">
                    <paper-button dialog-confirm="" autofocus="" on-tap="endAndClose" class="button button--other">[[localize('clo2','End',language)]]</paper-button>
                    <paper-button dialog-confirm="" autofocus="" on-tap="EOLAndClose" class="button button--other">[[localize('del','Delete',language)]]</paper-button>
                </template>
                <paper-button dialog-confirm="" autofocus="" on-tap="saveAndClose" class="button button--save">[[localize('save','Save',language)]]</paper-button>
            </div>
        </paper-dialog>
`;
  }

  static get is() {
      return 'medication-details-dialog'
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          medications: {
              type: Array,
              value: []
          },
          medicPriority: {
              type: Number,
              value: 0,
              observer: "_changeMedicPriority"
          },
          openAddDropDown: {
              type: Boolean,
              value: false
          },
          openAddColDropDown: {
              type: Boolean,
              value: false
          },
          medicationMustBeCreated:{
              type: Boolean,
              value: false
          },
          medicationDetail: {
              type: Object,
              value: () => {}
          },
          substitution: {
              type: Number,
              value: 0
          },
          duration: {
              type: Number,
              value: 0
          },
          renewal: {
              type: Number,
              value: 0
          },

          isPrescription: {
              type: Boolean,
              value: false
          },

          allergies: {
              type: Array,
              value: () => []
          }
      }
  }

  static get observers() {
      return [];
  }

  constructor() {
      super()
  }

  ready() {
      super.ready();
  }

  extractContentWithIdFromMedicationService(m, isNew, isPres) {
      const content = this.api.contact().preferredContent(m, this.language)  || (m.content[this.language] = {medicationValue: {regimen: []},});
      return {
          id: m.id,
          codes: m.codes,
          medicationValue: content.medicationValue,
          isNew: isNew || false,
          isPrescription: m.isPrescription || isPres || false,
          isMedication: m.tags && m.tags.length && m.tags.some(tag => tag.type === "CD-ITEM" && tag.code === "medication") || false
      };
  }

  _title() {
      return this.isPrescription ? this.localize("prescription", "Prescription"): this.localize("medication", "Médication");
  }

  _getCompoundPrescriptionFields(compoundPrescription) {
      if (!compoundPrescription) return {title: "", formula: ""};
      const fields = compoundPrescription.split(/\r\n/);
      return {title: fields.length > 1 ? fields[0] : "", formula: fields.length > 1 ? fields[1] : fields.length > 0 ? fields[0] : ""};
  }

  open(action, service, medicationContent, boxes) {
      this.set("saveAction",action)
      this.api.helement().findBy(this.user.healthcarePartyId, this.patient)
          .then(hes => {
              const allergies = hes.filter(he => he.tags.some(tag => tag.type === "CD-ITEM" && (tag.code === "allergy" || tag.code === "adr")))
                  .map(he => {
                      const atcCode = he.codes.find(code => code.type === "CD-ATC");
                      return {
                          atcCode: atcCode && atcCode.code || "",
                          cnk: (he.codes.find(code => code.type === "CD-DRUG-CNK") || {code: ""}).code,
                          type: (he.tags.find(tag => tag.code === "allergy" || tag.code === "adr") || {code: ""}).code,
                          descr: he.descr
                      }
                  })
                  .filter(allergy => allergy.atcCode && allergy.type);
              this.set("allergies", allergies);
          })
          .then(() => this.$['medication-details'].init())
          .catch(err => console.log(err))
          .finally(() => {
              const preferredContent = this.api.contact().preferredContent(service, this.language);
              if (!medicationContent || !medicationContent.isNew) {
                  // do not set a default date if not defined, for the user to see when a medication has no date
                  const start = (preferredContent && preferredContent.medicationValue && preferredContent.medicationValue.beginMoment)
                      || (service.valueDate)
                      || (service.openingDate);
                  const end = (preferredContent && preferredContent.medicationValue && preferredContent.medicationValue.endMoment)
                      || (service.closingDate);
                  medicationContent = this.extractContentWithIdFromMedicationService(service, false, medicationContent.isPrescription);
                  medicationContent.beginMomentAsString = start && this.api.moment(start).format('YYYY-MM-DD') || null;
                  medicationContent.endMomentAsString = end && this.api.moment(end).format('YYYY-MM-DD') || null;
              } else { // new medication, should set a default start date
                  medicationContent.beginMomentAsString = this.api.moment(Date.now()).format("YYYY-MM-DD");
              }

              const id = (service.codes.find(c => ["CD-INNCLUSTER", "CD-VMPGROUP", "CD-DRUG-CNK"].includes(c.type)) || {code: ""}).code;
              const type = service.codes.some(c => c.type === "CD-INNCLUSTER" || c.type === "CD-VMPGROUP") && "substance" || service.codes.some(c => c.type === "CD-DRUG-CNK") && "medicine" || "compound";
              const medicationValue = preferredContent.medicationValue;
              const compoundFields = this._getCompoundPrescriptionFields(medicationValue.compoundPrescription);
              const intendedName = _.get(medicationValue, "medicinalProduct.intendedname", _.get(medicationValue, "substanceProduct.intendedname", compoundFields.formula));
              const atcCodes = service.codes.filter(c => c.type === "CD-ATC").map(code => code.code) || [];
              const allergies = this.allergies.filter(allergy => (allergy.cnk && (id === allergy.cnk)) || (atcCodes && atcCodes.some(atcCode => atcCode === allergy.atcCode) || ""));
              this.set('medicationContent', medicationContent);
              this.set('isPrescription', medicationContent.isPrescription);
              this.set('medicationDetail', {
                  id: id,
                  type: type,
                  unit: _.get(medicationContent, "medicationValue.regimen[0].administratedQuantity.unit", this.localize("uni", "Unités")),
                  intendedName: intendedName,
                  compoundTitle: compoundFields.title,
                  atcCodes: atcCodes,
                  allergies: allergies,
                  boxes: boxes || 1,
                  newMedication: service,
                  options: {
                      createMedication: this.medicationContent.createMedication,
                      isPrescription: this.medicationContent.isPrescription,
                      isNew: this.medicationContent.isNew
                  }
              });
              this.set('medicationMustBeCreated', false);
              this.set('openAddDropDown', false);
              this.$['medication-details-dialog'].open();
          });
  }

  openList(list) {
      //todo julien comprendre a quoi sert cette fonction
      // ------------------if we want to create an array even when we have only one medication selected
      // list && list.length > 0 ? this.set('medications', _.clone(list)) : (list.newMedication && this.set('medications',[list])) || this.set('medications', [])
      // ----------------------------------------------------------------------------------------------
      list && list.length > 0 ? this.set('medications', _.clone(list)) : this.set('medications', [])
      if (this.medications.length) {
          this.open(this.medications[0], this.extractContentWithIdFromMedicationService(this.medications[0].newMedication, true, this.medications[0].options.isPrescription), this.medications[0].boxes);
          this.set('selectedMedication',0)
      }
  }

  cancel() {
      this.close()
  }

  EOLAndClose(){
      const today = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"))
      this.set("medicationContent.medicationValue.endOfLife", today)
      this.save()
      this.close()
  }

  endAndClose(){
      const yesterday = parseInt(moment().subtract(1, 'days').format("YYYYMMDD"))
      this.set("medicationContent.medicationValue.endMoment", yesterday)
      this.save()
      this.close()
  }

  saveAndClose() {
      this.save();
      this.close();
  }

  close() {
      this.set("medicationContent", null);
  }

  save() {
      this._valueChanged()
  }

  _valueChanged() {
      this.saveAction(this.medicationDetail)
  }

  _medicationName(svc) {
      return this.api.contact().medication().medicationNameToString(this.api.contact().preferredContent(svc, this.language).medicationValue) || ''
  }
}

customElements.define(MedicationDetailsDialog.is, MedicationDetailsDialog)
