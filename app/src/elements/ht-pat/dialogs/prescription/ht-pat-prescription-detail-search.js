import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../dynamic-form/dynamic-doc.js';
import '../../../collapse-button/collapse-button.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import * as models from 'icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatPrescriptionDetailSearch extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style">
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
            
        </style>
        
        <div class="search-container">
            <div class="search-container-search">
                 <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{drugsFilter}}"></dynamic-text-field>
            </div>
            
            <div class="search-container-result">
                <div class="">
                    <div class="table">
                        <div class="tr th">                 
                            <div class="td fg01">[[localize('','',language)]]</div>    
                            <div class="td fg2">[[localize('','Name',language)]]</div>
                            <div class="td fg05">[[localize('','ATC',language)]]</div>
                            <div class="td fg05">[[localize('','Type',language)]]</div>
                            <div class="td fg05">[[localize('','IV',language)]]</div>
                            <div class="td fg05">[[localize('','Del',language)]]</div>
                            <div class="td fg05">[[localize('','Cat',language)]]</div>
                            <div class="td fg05">[[localize('','Pat',language)]]</div>
                            <div class="td fg05">[[localize('','Pub',language)]]</div>
                            <div class="td fg1">[[localize('','Start',language)]]</div>
                            <div class="td fg1">[[localize('','End',language)]]</div> 
                        </div>
                        <template is="dom-repeat" items="[[searchResult]]" as="[[]]">
                            <div class="td fg01"></div>    
                            <div class="td fg2"></div>
                            <div class="td fg05"></div>
                            <div class="td fg05"></div>
                            <div class="td fg05"></div>
                            <div class="td fg05"></div>
                            <div class="td fg05"></div>
                            <div class="td fg05"></div>
                            <div class="td fg05"></div>
                            <div class="td fg1"></div>
                            <div class="td fg1"></div> 
                        </template>
                    </div>
                </div>             
            </div>
        </div>

`;
    }

    static get is() {
        return 'ht-pat-prescription-detail-search';
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
            contacts: {
                type: Array,
                value: () => []
            },
            patient: {
                type: Object,
                value: ()  => {}
            },
            currentContact: {
                type: Object,
                value: () => {}
            },
            searchResult: {
                type: Array,
                value: () => []
            },
            drugsFilter:{
                type: String,
                value: null
            }
        };
    }

    static get observers() {
        return ['_drugsFilterChanged(drugsFilter)'];
    }

    ready() {
        super.ready();
    }

    _reset(){
        this.set('searchResult', [])
    }

    _drugsFilterChanged(drugsFilter){
        if(_.size(drugsFilter) > 1){
            this.api.bedrugs().getMedecinePackages(this.drugsFilter, this.language).then()
        }
    }

}
customElements.define(HtPatPrescriptionDetailSearch.is, HtPatPrescriptionDetailSearch);
