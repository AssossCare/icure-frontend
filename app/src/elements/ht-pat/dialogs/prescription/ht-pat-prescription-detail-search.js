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


import * as models from 'icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
class HtPatPrescriptionDetailSearch extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
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
                height: 14px;
                width: 14px;
            }
            
        </style>
        
        <div class="search-container">
            <div class="search-container-search">
                 <dynamic-text-field label="[[localize('filter','Filter',language)]]" class="ml1 searchField" value="{{drugsFilter}}"></dynamic-text-field>
            </div>
            <div class="search-container-result">
                <paper-tabs selected="{{tabs}}">
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="icons:alarm-on"></iron-icon> [[localize('','Chronic',language)]] [[_getDrugsCount(searchResult.chronic, searchResult.chronic.*)]]
                    </paper-tab> 
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:time-backward"></iron-icon> [[localize('','History',language)]] [[_getDrugsCount(searchResult.history, searchResult.history.*)]]
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:copyright"></iron-icon> [[localize('','Commercial name',language)]] [[_getDrugsCount(searchResult.commercialName, searchResult.commercialName.*)]]
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:pill"></iron-icon> [[localize('','Molecule',language)]] [[_getDrugsCount(searchResult.molecule, searchResult.molecule.*)]]
                    </paper-tab>
                     <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:flask"></iron-icon> [[localize('','Compound',language)]] [[_getDrugsCount(searchResult.compound, searchResult.compound.*)]]
                    </paper-tab>
                </paper-tabs>
                <iron-pages selected="[[tabs]]">
                    <page>
                        <div class="page-content">
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
                                <template is="dom-repeat" items="[[searchResult.chronic]]" as="drug">
                                    <div class="tr tr-item" id="[[drug.id]]" on-tap="">
                                        <div class="td fg01"><iron-icon class="addIcon" icon="icons:add"></iron-icon></div>    
                                        <div class="td fg2">[[drug.label]]</div>
                                        <div class="td fg05">
                                            <iron-icon icon="vaadin:circle" class$="[[_getAtcColor(drug.atcCat)]] atcIcon" id="[[drug.id]]"></iron-icon>
                                        </div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05">[[drug.chapt4]]</div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05">[[drug.publicPrice]]</div>
                                        <div class="td fg05">[[drug.publicPrice]]</div>
                                        <div class="td fg1">[[_formatDate(drug.startDate)]]</div>
                                        <div class="td fg1">[[_formatDate(drug.endDate)]]</div> 
                                    </div>
                                </template>
                            </div>                   
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
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
                                <template is="dom-repeat" items="[[searchResult.history]]" as="drug">
                                    <div class="tr tr-item" id="[[drug.id]]" on-tap="">
                                        <div class="td fg01"><iron-icon class="addIcon" icon="icons:add"></iron-icon></div>    
                                        <div class="td fg2">[[drug.label]]</div>
                                        <div class="td fg05">
                                            <iron-icon icon="vaadin:circle" class$="[[_getAtcColor(drug.atcCat)]] atcIcon" id="[[drug.id]]"></iron-icon>
                                        </div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05">[[drug.chapt4]]</div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05">[[drug.publicPrice]]</div>
                                        <div class="td fg05">[[drug.publicPrice]]</div>
                                        <div class="td fg1">[[_formatDate(drug.startDate)]]</div>
                                        <div class="td fg1">[[_formatDate(drug.endDate)]]</div> 
                                    </div>
                                </template>
                            </div>                   
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
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
                                <template is="dom-repeat" items="[[searchResult.commercialName]]" as="drug">
                                    <div class="tr tr-item" id="[[drug.id]]" on-tap="">
                                        <div class="td fg01"><iron-icon class="addIcon" icon="icons:add"></iron-icon></div>    
                                        <div class="td fg2">[[drug.label]]</div>
                                        <div class="td fg05">
                                            <iron-icon icon="vaadin:circle" class$="[[_getAtcColor(drug.atcCat)]] atcIcon" id="[[drug.id]]"></iron-icon>
                                        </div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05">[[drug.chapt4]]</div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05">[[drug.publicPrice]]</div>
                                        <div class="td fg05">[[drug.publicPrice]]</div>
                                        <div class="td fg1">[[_formatDate(drug.startDate)]]</div>
                                        <div class="td fg1">[[_formatDate(drug.endDate)]]</div> 
                                    </div>
                                </template>
                            </div>                   
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
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
                                <template is="dom-repeat" items="[[searchResult.molecule]]" as="drug">
                                    <div class="tr tr-item" id="[[drug.id]]" on-tap="">
                                        <div class="td fg01"><iron-icon class="addIcon" icon="icons:add"></iron-icon></div>    
                                        <div class="td fg2">[[drug.label]]</div>
                                        <div class="td fg05">
                                            <iron-icon icon="vaadin:circle" class$="[[_getAtcColor(drug.atcCat)]] atcIcon" id="[[drug.id]]"></iron-icon>
                                        </div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05">[[drug.chapt4]]</div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05">[[drug.publicPrice]]</div>
                                        <div class="td fg05">[[drug.publicPrice]]</div>
                                        <div class="td fg1">[[_formatDate(drug.startDate)]]</div>
                                        <div class="td fg1">[[_formatDate(drug.endDate)]]</div> 
                                    </div>
                                </template>
                            </div>                   
                       </div>
                    </page>
                    <page>
                        <div class="page-content">
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
                                <template is="dom-repeat" items="[[searchResult.compound]]" as="drug">
                                    <div class="tr tr-item" id="[[drug.id]]" on-tap="">
                                        <div class="td fg01"><iron-icon class="addIcon" icon="icons:add"></iron-icon></div>    
                                        <div class="td fg2">[[drug.title]]</div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg05"></div>
                                        <div class="td fg1"></div>
                                        <div class="td fg1"></div> 
                                    </div>
                                </template>
                            </div>                   
                       </div>
                    </page>
                </iron-pages>
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
                type: Object,
                value: {
                    compound: [],
                    commercialName: [],
                    history: [],
                    molecule: [],
                    chronic: []
                }
            },
            drugsFilter:{
                type: String,
                value: null
            },
            tabs:{
                type: Number,
                value: 0
            },
            listOfCompound: {
                type: Array,
                value: () => []
            },
            listOfPrescription: {
                type: Array,
                value: () => []
            }
        };
    }

    static get observers() {
        return ['_drugsFilterChanged(drugsFilter)', '_initializeDataProvider(api, user, listOfCompound, listOfPrescription, listOfCompound.*, listOfPrescription.*)'];
    }

    ready() {
        super.ready();
    }

    _initializeDataProvider(){
        this._reset()
    }

    _reset(){
        this.set('searchResult', {
            compound: _.get(this, 'listOfCompound', []),
            commercialName: [],
            history: _.orderBy(_.get(this, 'listOfPrescription', []), ['startDate'], ['desc']),
            molecule: [],
            chronic: []
        })
    }

    _drugsFilterChanged(drugsFilter){
        if(_.size(drugsFilter) > 1){
            Promise.all([
               this.api.besamv2().findPaginatedVmpsByLabel(this.language, drugsFilter),
               this.api.besamv2().findPaginatedVmpGroupsByLabel(this.language, drugsFilter),
               this.api.besamv2().findPaginatedAmpsByLabel(this.language, drugsFilter)
           ]).then(([vmps, vmpGroups, amps]) => {
               const now = moment().valueOf();
               this.set("searchResult.commercialName", _.orderBy(_.get(amps, 'rows', []).map(amp => {
                   return {
                       endDate: null,
                       startDate: null,
                       publicPrice: null,
                       chapt4: null,
                       atc: _.get(_.head(_.get(amp, 'ampps', []).map(ampp => _.get(ampp, 'atcs', []).find(atc => _.get(atc, 'code', null)))), 'code', null),
                       label: _.head(_.get(amp, 'ampps', []).map(ampp => _.get(ampp, 'prescriptionName.'+this.language, null) || _.get(_.get(ampp, 'dmpps', []).find(dmpp => _.get(dmpp, 'deliveryEnvironment', null) === "P"), 'prescriptionName.'+this.language, null) || _.get(ampp, 'abbreviatedName.'+this.language))) || "",
                       delivery: null,
                       cat: null,
                       narcotic: null,
                       reinPharmaVigi: null,
                       pharmaVigi: null,
                       severeRenalInsu: null,
                       moderateRenalInsu: null,
                       atcCat: _.get(_.head(_.get(amp, 'ampps', []).map(ampp => _.get(ampp, 'atcs', []).find(atc => _.get(atc, 'code', null)))), 'code', null) ? _.get(_.head(_.get(amp, 'ampps', []).map(ampp => _.get(ampp, 'atcs', []).find(atc => _.get(atc, 'code', null)))), 'code', null).substring(0, 1) : null,
                       id: _.get(amp, 'id', null),
                       status:  _.get(amp, 'status', null)
                   }
               }).filter(amp => _.get(amp, 'label', null) && _.get(amp, 'status', null) === "AUTHORIZED"), ["label"], ["asc"]))

                this.set("searchResult.molecule", _.orderBy(_.get(vmpGroups, 'rows', []).map(vmpGroup => {
                    return {
                        endDate: null,
                        startDate: null,
                        publicPrice: null,
                        chapt4: null,
                        atc: null,
                        label: _.get(vmpGroup, 'name.'+this.language, null),
                        delivery: null,
                        cat: null,
                        narcotic: null,
                        reinPharmaVigi: null,
                        pharmaVigi: null,
                        severeRenalInsu: null,
                        moderateRenalInsu: null,
                        atcCat: null,
                        id: _.get(vmpGroup, 'id', null),
                        status: null
                    }
                }).filter(vmpGroup => _.get(vmpGroup, 'label', null)), ["label"], ["asc"]))
            })
        }else{
            this.set('searchResult', {
                compound: _.get(this, 'listOfCompound', []),
                commercialName: [],
                history: _.orderBy(_.get(this, 'listOfPrescription', []), ['startDate'], ['desc']),
                molecule: [],
                chronic: []
            })
        }
    }

    _localizeDrugName(name){
        return _.get(name, this.language, null)
    }

    _getDrugsCount(drugsList){
        return _.size(drugsList)
    }

    _formatDate(date){
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }

    _getAtc(cat) {
        return cat ? this.localize('atc-' + cat, '') : null
    }

    _getAtcColor(cat){
        return cat ? "ATC--"+_.toUpper(cat) : null
    }
}
customElements.define(HtPatPrescriptionDetailSearch.is, HtPatPrescriptionDetailSearch);
