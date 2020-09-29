import './dynamic-link.js';
import '../../styles/paper-input-style.js';
import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../tk-localizer";
class DynamicCheckbox extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
		<style include="paper-input-style">
			:host {
				flex-grow: var(--dynamic-field-width, 25);
				min-width: calc(var(--dynamic-field-width-percent, '25%') - 12px);
				margin: 0 6px;
				padding: 12px 0 4px 0;
				position: relative;
				box-sizing: border-box;
			}

			dynamic-link {
				position: absolute;
				right: -20px;
				bottom: 0;
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
				text-align: left;
				font-style: italic;
				font-size:11px;
				height:22px;
				border-bottom: 1px dotted var(--app-secondary-color-dark);
				white-space: nowrap;
				text-overflow: ellipsis
			}

			.modified-after-out {
				color: var(--app-secondary-color-dark);
				text-align: left;
				font-style: italic;
				border-bottom: 1px dotted var(--app-secondary-color-dark);
				font-size:11px;
				height:22px;
				white-space: nowrap;
				text-overflow: ellipsis
			}

			input{
				border:none;
				width: 100%;
				outline: 0;
				background:none;
				font-size: var(--font-size-normal);
				height: 22px;
				line-height: var(--font-size-normal);
				padding: 0;
			}

			iron-icon {
				width: 22px;
			}

			label {
				height:21px;
				position: absolute;
				top: -2px;
				right: 0;
				width: 100%;
				display:flex;
				flex-direction: row;
				justify-content: flex-end;
				align-items:center;
			}
			paper-checkbox{
				--paper-checkbox-unchecked-color: var(--app-text-color);
				--paper-checkbox-label-color: var(--app-text-color);
				--paper-checkbox-checked-color: var(--app-secondary-color);
				--paper-checkbox-checked-ink-color: var(--app-secondary-color-dark);
				--paper-checkbox-vertical-align: bottom;
				--paper-checkbox-size: 16px;
			}
			.label-container{
				display:flex;
				flex-direction:column;
				justify-content: flex-end;
				height: 22px;
			}
			.label-span{
				font-size: var(--font-size-normal);
			}
		</style>
		<template is="dom-if" if="[[readOnly]]">
			<paper-checkbox class="styled" disabled checked="[[booleanValue]]">
				<div class="label-container">
						<label>
							<template is="dom-if" if="[[wasModified]]">
								<span class="subtitle modified-before-out"><iron-icon class="modified-icon" icon="schedule"></iron-icon> [[lastModified]] </span>
							</template>
							<template is="dom-if" if="[[isModifiedAfter]]">
								<span class="subtitle modified-after-out">[[localize('obs_val','obsolete value',language)]]<iron-icon class="modified-icon" icon="report-problem"></iron-icon></span>
							</template>
						</label>
					<span class="label-span">[[localize(label,label,language)]]</span>
				</div>
			</paper-checkbox>
		</template>
		<template is="dom-if" if="[[!readOnly]]">
			<paper-checkbox class="styled" checked="{{booleanValue}}">
				<div class="label-container">
					<label>
						<template is="dom-if" if="[[wasModified]]">
							<span class="subtitle modified-before-out"><iron-icon class="modified-icon" icon="schedule"></iron-icon> [[lastModified]] </span>
						</template>
						<template is="dom-if" if="[[isModifiedAfter]]">
							<span class="subtitle modified-after-out">[[localize('obs_val','obsolete value',language)]]<iron-icon class="modified-icon" icon="report-problem"></iron-icon></span>
						</template>
					</label>
					<span class="label-span">[[localize(label,label,language)]]</span>
					<dynamic-link i18n="[[i18n]]" language="[[language]]" resources="[[resources]]" linkables="[[linkables]]" represented-object="[[key]]" api="[[api]]"></dynamic-link>
				</div>
			</paper-checkbox>
		</template>
`;
  }

  static get is() {
      return 'dynamic-checkbox';
	}

  static get properties() {
      return {
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
          value: {
              type: String,
              observer: '_valueChanged'
          },
          booleanValue: {
              type: Boolean,
              observer: '_booleanValueChanged'
          },
          input: {
              type: String
          },
          width: {
              type: Number,
              value: 48,
              observer: '_widthChanged'
          },
          linkables: {
              type: Array
          },
          group: {
              type: String,
              value: ""
          }
      };
	}

  constructor() {
      super();
	}

  _widthChanged(width) {
      this.updateStyles({ '--dynamic-field-width': width, '--dynamic-field-width-percent': '' + width + '%' });
	}

  checkUncheck(e) {
      const boolValue = this.value && this.value !== 'false' && this.value !== 'no' && this.value !== '0';
      this.set('value', '' + !boolValue);
      this.dispatchEvent(new CustomEvent('field-changed', { detail: { context: this.context, value: this.value } }));
	}

  _checkedUncheckedIcon(value) {
      const boolValue = this.value && this.value !== 'false' && this.value !== 'no' && this.value !== '0';
      return boolValue ? 'icons:check-box' : 'icons:check-box-outline-blank';
	}

  _booleanValueChanged() {
      const stringValue = '' + this.booleanValue;
      if (this.value !== stringValue) {
          this.set('value', stringValue);
          stringValue==="true" && this.group!=="" && this.dispatchEvent(new CustomEvent('checked', { detail: { context: this.context,group: this.group, name: this.key } }));
          this.dispatchEvent(new CustomEvent('field-changed', { detail: { context: this.context, value: this.value } }));
      }
	}

  _valueChanged() {
      const booleanValue = this.value && this.value !== 'false' && this.value !== 'no' && this.value !== '0';
      if (this.booleanValue !== booleanValue) {
          this.set('booleanValue', booleanValue);
      }
	}
}

customElements.define(DynamicCheckbox.is, DynamicCheckbox);
