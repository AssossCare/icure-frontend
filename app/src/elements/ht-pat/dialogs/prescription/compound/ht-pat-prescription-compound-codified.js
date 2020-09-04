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
class HtPatPrescriptionCompoundCodified extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
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
            
            ht-spinner{
                height: 100px;
                width: 100px;
            }
            
            .bold{
                font-weight: bold;
            }
            
            .compound-codified-container{
                height: calc(100% - 10px);
                width: auto;
                margin: 5px;
                display: flex;
            }
            
            .compound-management{
                height: 100%;
                width: 80%;
                border: 1px solid var(--app-background-color-dark);
            }
            
            .substance-search-container{
                height: 100%;
                margin-right: 5px;
                width: 20%;
                border: 1px solid var(--app-background-color-dark);
            }
            
            .addIcon{
               background-color: var(--app-secondary-color);
               height: 14px;
               width: 14px;
               cursor: pointer;
               color: white;
            }
            
            .w100{
                width: 100%;
            }
            
            .mtm6{
                margin-top: -6px;
            }
            
            .substance-search-container-search{
                height: 60px;
                width: auto;
                margin-left: 4px;
                margin-right: 4px;
            }
            
            .noH{
                height: auto!important;
            }
            
            .substance-search-container-result{
                height: calc(100% - 60px);
            }
            
            .headerInfoLine{
                width: 100%;
                padding: 4px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: flex-start;
            }

            .headerInfoField{
                display: flex;
                flex-direction: row;
                flex-wrap: wrap;
                align-items: center;
                align-content: stretch;
                width: calc(100% / 4);
                padding: 0 8px;
                box-sizing: border-box;
            }

            .headerLabel{
                font-weight: bold;
            }
            
            .headerMasterTitle{
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
            }
            
            .compound-management-substance{
            
            }
            
            .compound-management-info{
            
            }
            
        </style>
     
        <div class="compound-codified-container">
            <div class="substance-search-container">
                <div class="substance-search-container-search">
                    <dynamic-text-field label="[[localize('filter', 'Filter', language)]]" value="{{substanceFilter}}"></dynamic-text-field>
                </div>
                <div class="substance-search-container-result">
                    <div class="table">
                        <div class="tr th">
                            <div class="td fg01"></div>
                            <div class="td fg1">[[localize('presc-comp-name', 'Name', language)]]</div>
                        </div>
                         <template is="dom-if" if="[[isLoading]]" restamp="true">
                            <ht-spinner active="[[isLoading]]"></ht-spinner>
                        </template>
                        <template is="dom-if" if="[[!isLoading]]" restamp="true">
                            <template is="dom-repeat" items="[[filteredSubstanceList]]" as="substance">
                                <div class="tr tr-item">
                                    <div class="td fg01"><iron-icon class="addIcon" icon="icons:add" data-id$="[[substance.code]]" on-tap="_addSubstanceToCompound"></iron-icon></div>    
                                    <div class="td fg1">[[_getSubstanceName(substance)]]</div>
                                </div>
                            </template>
                        </template>
                    </div>
                </div>
            </div>
            <div class="compound-management">
                <div class="compound-management-info">
                    <div class="table">
                        <div class="tr noH">
                            <div class="td fg1">
                                <vaadin-combo-box class="w100 mtm6" label="[[localize('presc-comp-class', 'Class', language)]]" filter="{{atcClassFilter}}" selected-item="{{selectedAtcClass}}" filtered-items="[[atcClassList]]" item-label-path="label.[[language]]">
                                   <template>[[_getLabel(item.label)]]</template>
                                </vaadin-combo-box>
                            </div>
                            <div class="td fg2">
                                <dynamic-text-field label="[[localize('presc-comp-name', 'Name', language)]]*" value="{{selectedCompound.label}}"></dynamic-text-field>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="compound-management-substance">
                    <div class="headerMasterTitle headerLabel">
                        [[localize('presc-comp-compound', 'Compound', language)]]
                    </div>
                    <div class="table">
                        <div class="tr th">
                           <div class="td fg01"></div>
                           <div class="td fg2">[[localize('presc-comp-name', 'Name', language)]]</div>
                           <div class="td fg1">[[localize('presc-comp-qt', 'Quantity', language)]]</div>
                        </div> 
                        <template is="dom-repeat" items="[[selectedCompound.codifiedFormula]]" as="sub">
                             <div class="tr noH">
                               <div class="td fg01">
                                   <iron-icon class="addIcon" icon="vaadin:close-circle-o" data-id$="[[sub.code]]" on-tap="_removeSubstanceFromCompound"></iron-icon>
                               </div>
                               <div class="td fg2">[[sub.label]]</div>
                               <div class="td fg1">
                                  <dynamic-text-field label="[[localize('presc-comp-qt', 'Quantity', language)]]*" value=""></dynamic-text-field>
                               </div>
                            </div> 
                        </template>
                    </div>
                </div>
            </div>
        </div>
`;
    }

    static get is() {
        return 'ht-pat-prescription-compound-codified';
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
            },
            samVersion:{
                type: Object,
                value: () => {}
            },
            substancesList: {
                type: Array,
                value: () => []
            },
            filteredSubstanceList:{
                type: Array,
                value: () => []
            },
            atcClassList: {
                type: Array,
                value: () => []
            },
            selectedCompound: {
                type: Object,
                value: () => {}
            },
            selectedAtcClass:{
                type: Object,
                value: () => {}
            },
            substanceFilter:{
                type: String,
                value: null
            }
        };
    }

    static get observers() {
        return ['_selectedAtcClassChanged(selectedAtcClass)', '_substanceFilterChanged(substanceFilter)'];
    }

    ready() {
        super.ready();
    }

    _reset(){
        this.set('substanceFilter', null)
        this.set('filteredSubstanceList', _.sortBy(_.get(this, 'substancesList', []), ['label'], ['asc']))
    }

    _getSubstanceName(substance){
        return _.get(substance, 'label', null)
    }

    _substanceFilterChanged(){
        if(_.get(this, 'substanceFilter', '')){
            const keywordsString = _.trim(_.get(this,"substanceFilter","")).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")
            const keywordsArray = _.compact(_.uniq(_.map(keywordsString.split(" "), i=>_.trim(i))))

            setTimeout(() => {
                if(parseInt(_.get(keywordsString,"length",0)) > 2) {
                    const substanceResults =  _.chain(_.get(this, "substancesList", []))
                        .chain(_.get(this, "filter", []))
                        .filter(i => _.size(keywordsArray) === _.size(_.compact(_.map(keywordsArray, keyword => _.trim(_.get(i, "normalizedSearchTerms", "")).indexOf(keyword) > -1))))
                        .compact()
                        .uniq()
                        .orderBy(['label'], ['asc'])
                        .value()
                    this.set('filteredSubstanceList', _.sortBy(substanceResults, ['label'], ['asc']))
                }else{
                    this.set('filteredSubstanceList', _.sortBy(_.get(this, 'substancesList', []), ['label'], ['asc']))
                }
            }, 100)
        }else{
            this.set('filteredSubstanceList', _.sortBy(_.get(this, 'substancesList', []), ['label'], ['asc']))
        }
    }

    _addSubstanceToCompound(e){
        if(_.get(e, 'currentTarget.dataset.id', null)){
            this.push('selectedCompound.codifiedFormula', _.get(this, 'substancesList', []).find(sub => _.get(sub, 'code', null) === _.get(e, 'currentTarget.dataset.id', null)))
        }
    }

    _removeSubstanceFromCompound(e){
        if(_.get(e, 'currentTarget.dataset.id', null)){
            let form = _.get(this, 'selectedCompound.codifiedFormula', [])
            _.remove(form, co => _.get(co, 'code', '') === _.get(e, 'currentTarget.dataset.id', null))
            this.set('selectedCompound.codifiedFormula', form)
        }
    }

}
customElements.define(HtPatPrescriptionCompoundCodified.is, HtPatPrescriptionCompoundCodified);
