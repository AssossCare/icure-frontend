import '../../../../dynamic-form/dynamic-link.js';
import '../../../../dynamic-form/dynamic-pills.js';
import '../../../../ht-spinner/ht-spinner.js';
import '../../../../dynamic-form/dynamic-doc.js';
import '../../../../collapse-button/collapse-button.js';
import '../../../../../styles/dialog-style.js';
import '../../../../../styles/scrollbar-style.js';
import '../../../../../styles/paper-tabs-style';
import '../../../../../styles/shared-styles';
import '../../../../../styles/buttons-style';
import '../../../../../styles/atc-styles';


import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionDetailSearchCommercial extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles">
            .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .tr-item{
                cursor: pointer;
            }
            
            .th{
                height: auto!important;
                font-weight: bold;
                vertical-align: middle;
            }
            
            .tr{
                display: flex;
                height: 22px;            
                border-bottom: 1px solid var(--app-background-color-dark);   
                padding: 4px;                
            }
            
            .td{
               position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                flex-grow: 1;
                flex-basis: 0;
                padding: 6px;
                overflow: hidden;
                min-width: 0px;
                z-index: 2;
                word-break: break-word;
                white-space: nowrap;               
                font-size: 13px;
                text-overflow: ellipsis;
            }

            .fg0{
                flex-grow: 0.2;
            }
            
            .fg05{
                flex-grow: 0.5;
            }
            
            .fg01{
                flex-grow: 0.1;
            }
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }  
            
            .fg5{
                flex-grow: 4.6;
            }
            
            .search-container{
                height: 100%;
            }
            
            .search-container-search{
                margin-left: 1%;
                margin-right: 1%;
                height: 45px;
                width: auto;
            }
            
            .search-container-result{
                margin-left: 1%;
                margin-right: 1%;
                margin-top: 1%;
                height: calc(100% - 80px);
                border: 1px solid var(--app-background-color-dark);
            }
            
            .tabIcon{
                height: 14px;
                width: 14px;
                margin-right: 6px;
            }
            
            iron-pages{
                height: calc(100% - 50px);
                overflow: auto;
            }
            
            .page-content{
            
            }
            
            .addIcon{
                background-color: var(--app-secondary-color);
                height: 14px;
                width: 14px;
                cursor: pointer;
                color: white;
            }
            
             .atcIcon{
                height: 8px;
                width: 8px;
            }
            
            .icon-code {
                width: 12px;
                height: 12px;
                color: var(--app-primary-color-dark);
            }
            
            .colour-code span{
                content: '';
                display: inline-block;
                height: 8px;
                width: 8px;
                border-radius: 50%;
                vertical-align: middle;
                background-color: transparent;
                margin-left: 2px;
            }
            
        </style>
        
         <div class="table">
            <div class="tr th">                 
                <div class="td fg01">[[localize('','',language)]]</div>    
                <div class="td fg2">[[localize('presc-sear-name','Name',language)]]</div>
                <div class="td fg05">[[localize('presc-sear-atc','ATC',language)]]</div>
                <div class="td fg05">[[localize('presc-sear-type','Type',language)]]</div>
                <div class="td fg05">[[localize('presc-sear-iv','IV',language)]]</div>
                <div class="td fg05">[[localize('presc-sear-del','Del',language)]]</div>
                <div class="td fg05">[[localize('presc-sear-cat','Cat',language)]]</div>
                <div class="td fg05">[[localize('presc-sear-pat','Pat',language)]]</div>
                <div class="td fg05">[[localize('presc-sear-pub','Pub',language)]]</div>
            </div>
            <template is="dom-repeat" items="[[searchResult.commercialName]]" as="drug">
                <div class="tr tr-item" id="[[drug.id]]" on-tap="">
                    <div class="td fg01"><iron-icon class="addIcon" icon="icons:add" id="[[drug.id]]" data-type="commercial" on-tap="_openPosologyView"></iron-icon></div>    
                    <div class="td fg2">[[drug.label]]</div>
                    <div class="td fg05">
                        <template is="dom-if" if="[[_hasIcon(drug)]]">
                            <iron-icon class$="icon-code [[_getStyle('ATC', drug.atcCat)]]" icon="[[_getIcon(drug)]]"></iron-icon>
                        </template>
                        <template is="dom-if" if="[[_hasColor(drug)]]">
                            <label class$="colour-code [[_getStyle('ATC', drug.atcCat, 'span')]]"><span></span></label>
                        </template>
                        <paper-tooltip z-index="1000" id="tt_[[drug.atcCat]]_[[drug.id]]" for="[[drug.atcCat]]_[[drug.id]]">[[_atcTooltip(drug.atcCat)]]</paper-tooltip>
                    </div>
                    <div class="td fg05">
                        <div class="icon-type-group">
                            <iron-icon icon="medication-svg-icons:[[drug.compProhibIcon]]" class="table-icon"></iron-icon>
                            <iron-icon icon="medication-svg-icons:[[drug.narcoticIcon]]" class="table-icon"></iron-icon>
                            <iron-icon icon="medication-svg-icons:[[drug.reinfPharmaVigiIcon]]" class="table-icon"></iron-icon>                  
                        </div>
                    </div>
                    <div class="td fg05">[[drug.chapt4]]</div>
                    <div class="td fg05"></div>  
                    <div class="td fg05"></div>
                    <div class="td fg05">[[drug.patientPrice]]</div>
                    <div class="td fg05">[[drug.publicPrice]]</div> 
                </div>
            </template>
        </div>                      
`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-search-commercial';
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
            searchResult:{
                type: Object,
                value: () => {}
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }

    _openPosologyView(e){
        if(_.get(e, 'currentTarget.id', null) && _.get(e, 'currentTarget.dataset.type', null)){
            this.dispatchEvent(new CustomEvent('open-posology-view', {bubbles: true, composed: true, detail: {id: _.get(e, 'currentTarget.id', null), type: _.get(e, 'currentTarget.dataset.type', null)}}))
        }
    }

    _formatDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }
    _getAtcColor(cat){
        return cat ? "ATC--"+_.toUpper(cat) : null
    }

    _getIcon(item) {
        return item.allergyType === "allergy" ? "image:filter-vintage" : (item.allergyType === "adr" ? "vaadin:pill" : "");
    }

    _getStyle(prefix, cat, el = "span") {
        return cat ? prefix + '--' + cat.toUpperCase() + (el ? (' ' + el) : '') : null
    }

    _hasIcon(item) {
        return !!item.allergyType
    }

    _hasColor(item) {
        return !item.allergyType
    }

    _atcTooltip(cat) {
        return cat ? this.localize('atc-' + cat, '') : null
    }
}
customElements.define(HtPatPrescriptionDetailSearchCommercial.is, HtPatPrescriptionDetailSearchCommercial);
