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
class HtPatPrescriptionDetailSearchCompound extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles spinner-style">
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
               height: 12px;
               width: 12px;
               cursor: pointer;
               color: white;
               padding: 2px;
            }
            
            .modifyIcon{
               background-color: var(--app-secondary-color);
               height: 10px;
               width: 10px;
               cursor: pointer;
               color: white;
               padding: 4px;
               border-radius: 50%;
            }
            
             .atcIcon{
                height: 8px;
                width: 8px;
            }
            
            ht-spinner{
                height: 100px;
                width: 100px;
            }
            
        </style>
        
        <template is="dom-if" if="[[isLoading]]" restamp="true">
            <ht-spinner active="[[isLoading]]"></ht-spinner>
        </template>
        <template is="dom-if" if="[[!isLoading]]" restamp="true">
            <div class="table">
                <div class="tr th">                 
                    <div class="td fg01"></div>    
                    <div class="td fg01"></div>    
                    <div class="td fg05">[[localize('atc-categ','Category',language)]]</div>
                    <div class="td fg1">[[localize('presc-sear-name','Name',language)]]</div>
                    <div class="td fg2">[[localize('presc-sear-formula','Formula',language)]]</div>
                </div>
                <template is="dom-repeat" items="[[searchResult.compound]]" as="drug">
                    <div class="tr tr-item">
                        <div class="td fg01"><iron-icon class="addIcon" icon="icons:add" data-id$="[[drug.id]]" data-type="compound" on-tap="_openPosologyView"></iron-icon></div>    
                        <div class="td fg01"><iron-icon class="modifyIcon" icon="vaadin:pencil" data-id$="[[drug.id]]" data-type="compound" on-tap="_openCompoundManagementView"></iron-icon></div>  
                        <div class="td fg05">[[_getAtcClass(drug.atcClass)]]</div>
                        <div class="td fg1">[[drug.label]]</div>
                        <div class="td fg2">[[drug.formula]]</div>
                    </div>
                </template>
            </div>  
        </template>                 
       
`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-search-compound';
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
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            samVersion:{
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

        const drugId = _.trim(_.get(e, 'currentTarget.dataset.id'))
        const dataType = _.trim(_.get(e, 'currentTarget.dataset.type'))

        return !drugId || !dataType ? null : this.dispatchEvent(new CustomEvent('open-posology-view', {
            bubbles: true,
            composed: true,
            detail: {
                id: drugId,
                type: dataType,
                bypassPosologyView: false,
                product: _.get(this, 'searchResult.compound', []).find(h => _.get(h, 'id', null) === drugId)
            }
        }))

    }

    _formatDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }

    _getAtcColor(cat){
        return cat ? "ATC--"+_.toUpper(cat) : null
    }

    _openCompoundManagementView(e){
        const drugId = _.trim(_.get(e, 'currentTarget.dataset.id'))
        const dataType = _.trim(_.get(e, 'currentTarget.dataset.type'))

        return !drugId || !dataType ? null : this.dispatchEvent(new CustomEvent('open-compound-management-view', {
            bubbles: true,
            composed: true,
            detail: {
                id: drugId,
                type: dataType,
                bypassPosologyView: false,
                product: _.get(this, 'searchResult.compound', []).find(h => _.get(h, 'id', null) === drugId)
            }
        }))
    }

    _getAtcClass(atcClass){
        return this.localize('atc_'+atcClass, atcClass, this.language)
    }

}
customElements.define(HtPatPrescriptionDetailSearchCompound.is, HtPatPrescriptionDetailSearchCompound);
