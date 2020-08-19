import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import '../../../../styles/paper-tabs-style';
import '../../../../styles/shared-styles';
import '../../../../styles/buttons-style';
import '../../../../styles/atc-styles';


import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionDetailCnkInfo extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles spinner-style">
            .cnk-info-container{
                height: calc(100% - 20px);
                width: auto;
                border: 1px solid var(--app-background-color-dark);
                margin: 5px;
            }
            
            .cnk-info-title{
                height: 30px;
                padding: 5px;
                background: var(--app-background-color-dark);
                box-sizing: border-box;
            }
            
            .cnk-info-container-content{
                 height: calc(100% - 30px);
            }
        </style>
        
         <div class="cnk-info-container">
            <div class="cnk-info-title">
                <span class="bold">[[localize('presc-cheap-drug', 'Cheaper drugs for', language)]]: </span> [[selectedParentDrugForCheaper.label]]
                <paper-icon-button id="" class="button button--other btn-close" icon="icons:close" on-tap="_closeCnkInfoView"></paper-icon-button>
            </div>
            <div class="cnk-info-container-content">
                  
            </div>
         </div>
                    
`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-cnk-info';
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
            hcp:{
                type: Object,
                value: () => {}
            },
            language: {
                type: String,
                value: null
            },
            isLoading:{
                type: Boolean,
                value: false
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }

    _closeCnkInfoView(){
        this.dispatchEvent(new CustomEvent('close-cnk-info-view', {
            bubbles: true,
            composed: true
        }))
    }
}
customElements.define(HtPatPrescriptionDetailCnkInfo.is, HtPatPrescriptionDetailCnkInfo);
