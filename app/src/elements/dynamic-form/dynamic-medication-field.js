import './dynamic-link.js';
import '../../styles/buttons-style.js';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class DynamicMedicationField extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
		<style include="buttons-style">

			:host {
				display: block;
				flex-grow: var(--dynamic-field-width, 100);
				min-width: calc(var(--dynamic-field-width-percent, '100%') - 12px);
				font-size: var(--font-size-normal);
				margin: 0;
				position: relative;
			}

			.subform-container{
				border: 1px solid rgba(0,0,0,.1);
				margin: 0 6px 12px;
				padding: 6px;
			}

			dynamic-link {
				position: absolute;
				right: 0;
				top: 4px;
			}

			.modified-icon {
				width: 18px;
			}

			.modified-previous-value {
				color: var(--app-text-color-disabled);
				text-decoration: line-through;
				font-style: italic;
			}

			.modified-before-out {
				color: var(--app-secondary-color-dark);
				text-align: right;
				float: right;
				font-style: italic;
				border-bottom: 1px dotted var(--app-secondary-color-dark);
			}

			.modified-after-out {
				color: var(--app-secondary-color-dark);
				text-align: right;
				float: right;
				font-style: italic;
				border-bottom: 1px dotted var(--app-secondary-color-dark);
			}

			paper-dropdown-menu, paper-listbox{
				width: 250px;
			}

			.tokens paper-button iron-icon {
				height: 16px;
				width: 16px;
			}

			paper-input {
				--paper-input-container-focus-color: var(--app-primary-color);
				--paper-input-container-label: {
					color:var(--app-text-color);
					opacity:1;
				};
			}

			paper-tabs {
				--paper-tabs-selection-bar-color: var(--app-secondary-color);
			}

			paper-tab {
				--paper-tab-ink: var(--app-secondary-color);
			}

			paper-tab.iron-selected {
				font-weight: bold;
			}

			paper-tab.iron-selected > iron-icon {
				color: var(--app-secondary-color);
			}

			input {
				font: inherit;
				outline: 0;
				box-shadow: none;
				border: none;
				width: auto;
				max-width: 100%;
				min-width: 1.8em;
				font-size: var(--font-size-normal);
			}

			ul {
				padding-left: 0;
				border: 1px solid rgba(0,0,0,.1);
				margin-top: 0;
				margin-bottom: 6px;
			}

			ul li {
				list-style: none;
			}

			.action-buttons paper-icon-button {
				padding: 2px;
				margin-left: 4px;
			}

			iron-selector > * {
				padding: 16px 16px;
			}

			label {
				color: var(--app-primary-color);
				background: rgba(0,0,0,.1);
				font-size: 12px;
				margin: 12px 0 0 6px;
				padding: 2px 4px;
				display: inline-block;
				max-width: 256px;
				text-align: center;
			}

			paper-dialog {
				min-height: 480px;
				min-width: 600px;
				max-height: unset!important;
				width: 80%;
				top: 50%;
				transform: translateY(-50%);
			}

			vaadin-grid {
				--vaadin-grid-body-row-hover-cell: {
					background-color: var(--app-primary-color);
					color: white;
				};
				--vaadin-grid-body-row-selected-cell: {
					background-color: var(--app-primary-color);
					color: white;
				};
			}

			.medication-line {
				margin: 4px 0;
				height: 24px;
				line-height: 24px;
				font-size: var(--font-size-normal);
				width: 100%;
				min-width: initial;
				display:flex;
				flex-direction: row;
				justify-content: space-between;
				flex-wrap: nowrap;
				padding-left: 4px;
				border-top: 1px solid rgba(0,0,0,.1);
				box-sizing: border-box;
			}
			.medication-line:first-child {
				border-top: none;
			}

			.medication-line > .action-buttons {
				padding-right: 4px;
			}

			.medication-line > span {
				text-overflow: ellipsis;
				overflow: hidden;
				white-space: nowrap;
                flex: 1;
			}

			.medication-line paper-icon-button {
				height: 24px;
				width: 24px;
				border-radius: 50%;
				padding: 2px;
				box-sizing: border-box;
				--paper-icon-button-hover: {
					background: var(--app-background-color-dark);
				};
			}

			.buttons{
				display: flex;
				flex-flow: row wrap;
				justify-content: space-between;
				align-items: center;
			}

			.printSubForm {
				--paper-icon-button-ink-color: var(--app-secondary-color-dark);
				--paper-icon-button: {
					background: var(--app-secondary-color);
					color: var(--app-text-color);
					box-shadow: var(--app-shadow-elevation-1);
					border-radius: 50%;
					height: 28px;
					width: 28px;
					box-sizing: border-box;
					padding: 4px;
				};
				--paper-icon-button-hover: {
					box-shadow: var(--app-shadow-elevation-2);
					background: var(--app-secondary-color);
				};
			}

			.add-medication{
				--paper-button-ink-color: var(--app-secondary-color-dark);
                font-size: var(--font-size-normal);
                height: 28px;
                min-width: 100px;
                padding: 0 12px 0 6px;
                text-transform: capitalize;
				box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
                background: var(--app-secondary-color);
                color: var(--app-primary-color-dark);
                font-weight: 700;
				margin: 0;
			}

			.add-medication:hover{
				box-shadow: var(--app-shadow-elevation-2);
			}

		</style>

		<label hidden\$="[[!label]]" aria-hidden="true">
			<span>[[localize(label,label,language)]]</span>
		</label>
		<dynamic-link i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" linkables="[[linkables]]" represented-object="[[key]]" api="[[api]]"></dynamic-link>

		<template is="dom-if" if="[[wasModified]]">
			<span class="modified-before-out">[[localize('mod','modified',language)]] [[lastModified]] <iron-icon class="modified-icon" icon="schedule"></iron-icon></span>
		</template>
		<template is="dom-if" if="[[isModifiedAfter]]">
			<span class="modified-after-out">[[localize('obs_val','obsolete value',language)]]<iron-icon class="modified-icon" icon="report-problem"></iron-icon></span>
		</template>

		<div class="subform-container">
			<ul>
				<template is="dom-repeat" items="[[_localizedValue(value, value.*, refresher)]]" as="lv">
					<li id="[[lv.id]]" class="medication-line"><span class="medication-text">[[lv.stringValue]]</span>
						<template is="dom-if" if="[[!isReadOnlyOrAlreadyPrescribed(lv)]]">
							<div class="action-buttons"><paper-icon-button icon="create" on-tap="editMedication"></paper-icon-button><paper-icon-button icon="clear" on-tap="clearMedication"></paper-icon-button></div>
						</template>
					</li>
				</template>
			</ul>
			<div class="buttons">
				<template is="dom-if" if="[[!isReadOnlyOrMedication()]]">
					<paper-button class="button button--other" on-tap="addMedication"><iron-icon icon="add"></iron-icon>[[localize('add_pre_dru','Add prescription drug',language)]]</paper-button>
				</template>
<!--				<template is="dom-if" if="[[!isReadOnlyOrMedication()]]">-->
<!--					<paper-button class="add-medication" on-tap="addMedicationProto"><iron-icon icon="add"></iron-icon>[[localize('add_pre_dru','Add prescription drug',language)]]</paper-button>-->
<!--				</template>-->
				<template is="dom-if" if="[[createTreatment]]">
					<paper-icon-button class="button--icon-btn" icon="print" on-tap="openPrintDialog">[[localize('pri_pre','Print',language)]]</paper-icon-button>
				</template>
			</div>
		</div>
`;
  }

  static get is() {
      return 'dynamic-medication-field';
  }

  static get properties() {
      return {
          api: {
              type: Object
          },
          wasModified: {
              type: Boolean
          },
          isModifiedAfter: {
              type: Boolean
          },
          readOnly: {
              type: Boolean,
              value: false
          },
          lastModified: {
              type: String
          },
          label: {
              type: String
          },
          context: {
              type: String
          },
          createTreatment: {
              type: Boolean,
              value: true
          },
          value: {
              type: Array,
              notify: true,
              value: function () {
                  return [];
              }
          },
          localizedValue: {
              type: Array,
              value: function () {
                  return [];
              }
          },
          refresher: {
              type: Number,
              value: 0
          },
          width: {
              type: Number,
              value: 48,
              observer: '_widthChanged'
          }
      }
  }

  static get observers() {
      return [];
  }

  constructor() {
      super();
	}

  ready() {
      super.ready();
  }

  _widthChanged(width) {
      this.updateStyles({ '--dynamic-field-width': width, '--dynamic-field-width-percent': '' + width + '%' });
	}

    /*_getNewsMedications(value){
    return this._localizedValue(value.filter(v =>!(this.api.contact().preferredContent({content: v.content},this.language) || {medicationValue: {endMoment : true}}).medicationValue.endMoment))
}
_hasEndDate(value){
    //return this._localizedValue(value.filter(v =>(this.api.moment((this.api.contact().preferredContent({content: v.content},this.language) || {medicationValue: {endMoment : "19000101"}}).medicationValue.endMoment).isSame(moment(),"day")))).length
    return this._localizedValue(value.filter(v =>(this.api.contact().preferredContent({content: v.content},this.language) || {medicationValue: {endMoment : "19000101"}}).medicationValue.endMoment)).length
}
_getCloseMedication(value){
    return this._localizedValue(value.filter(v =>(this.api.contact().preferredContent({content: v.content},this.language) || {medicationValue: {endMoment : "19000101"}}).medicationValue.endMoment))
}*/

    //what is this
    isReadOnlyOrAlreadyPrescribed(val) {
        const idx = this.value.findIndex(s => s.id === val.id)
        return this.readOnly || this._isDrugAlreadyPrescribed(this.value[idx]) || !this.createTreatment
    }//too
    _isDrugAlreadyPrescribed(s) {
        return s && s.tags && s.tags.find(t => (t.type === 'CD-ITEM' && t.code === 'treatment') || (t.type === 'ICURE' && t.code === 'PRESC')) && !s.endOfLife && s.tags.find(t => t.type === 'CD-LIFECYCLE' && ['ordered', 'completed', 'delivered'].includes(t.code)) && this.api.contact().medicationValue(s, this.language)
    }

    _localizedValue(value) {
        return value && _.compact(_.sortBy(value, 'index').map(v => v && v.content && this.localizedMedicationValueWithId(v.id, v.content, this.language))) || [];
    }

    localizedMedicationValueWithId(id, e, lng) {
        if (!e) {
            return null;
        }
        return { id: id, stringValue: this.api.contact().medication().medicationToString((this.api.contact().preferredContent({content: e},this.language) || {}).medicationValue || "", this.language.toLowerCase() || 'fr') };
    }

    //what is this
    isReadOnlyOrMedication(val) { // disable edition of medication (but keep prescription editable) because not working for the moment
        return this.readOnly || !this.createTreatment
    }

    /**data manager partie*/

    // no need


    clearMedication(el) {
        const id = el.target.parentElement.parentElement.id;
        this.splice('value', this.value.findIndex(s => s.id === id), 1);
        this.dispatchEvent(new CustomEvent('field-changed', { detail: {medications : this.value}, bubbles: true, composed: true} ))
    }

    editMedication(el) {
        const id = el.target.parentElement.parentElement.id;
        const item = this.value.find(s => s.id === id);
        if (item) {
            this.dispatchEvent(new CustomEvent('call-medication-dialog', { detail: {isNew : false, service : _.cloneDeep(item),content : this.extractContentWithIdFromMedicationService(item, false, this.createTreatment), onSave : this._medicationChanged.bind(this)}, bubbles: true, composed: true} ))
        }
    }

    addMedication() {
        this.dispatchEvent(new CustomEvent('call-medication-dialog', { detail: {isNew: true, service : null, onSave : this._createMedication.bind(this)}, bubbles: true, composed: true} ))
    }

    /**Print partie @todo change event*/

    openPrintDialog() {
        this.dispatchEvent(new CustomEvent("open-prescription-dialog", {composed: true, bubbles: true}))
    }

    /** save partie*/

    _createMedication(newMedications) {
        this.push('value', ..._.flatMap(newMedications, m => _.times(m.boxes || 1, () => _.omit(m.newMedication, ['id']))));
        this.dispatchEvent(new CustomEvent('field-changed', { detail: {medications : this.value}, bubbles: true, composed: true} ))
    }

    _medicationChanged(medication) {
        console.log(medication);
        const idx = this.value.findIndex(m => m.id === medication.newMedication.id)
        this.set("value."+idx,medication.newMedication)
        this.dispatchEvent(new CustomEvent('field-changed', {
            detail: {
                context: this.context,
                medications: this.value
            }
        }))
    }

    //edit
    extractContentWithIdFromMedicationService(m, isNew, isPrescription) {
        console.log('extractContentWithIdFromMedicationService',m,isNew)
        return {
            id: m.id,
            codes: m.codes,
            medicationValue: (this.api.contact().preferredContent(m, this.language) || (m.content[this.language] = { medicationValue: { regimen: [] } })).medicationValue,
            isNew: isNew || false,
            isPrescription: isPrescription || m.isPrescription || false
        };
    }

    /**useless things*/
    _displayMedicationDetails(e) {
        this.set('previouslySavedValue', _.cloneDeep(this.value))
        this.dispatchEvent(new CustomEvent('medication-detail', { detail: {service: e.detail.medication, onValueChanged: this._valueChanged.bind(this)}, bubbles: true, composed: true} ))
    }
}

customElements.define(DynamicMedicationField.is, DynamicMedicationField);
