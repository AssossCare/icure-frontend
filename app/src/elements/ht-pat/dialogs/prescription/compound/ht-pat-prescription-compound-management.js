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

import './ht-pat-prescription-compound-codified'
import './ht-pat-prescription-compound-free-text'


import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {TkLocalizerMixin} from "../../../../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';
import _ from "lodash"
class HtPatPrescriptionCompoundManagement extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement)) {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles spinner-style">         
            iron-pages{
                height: calc(100% - 50px);
                overflow: auto;
            }

            ht-spinner{
                height: 100px;
                width: 100px;
            }
            
            .compound-title{
                height: 30px;
                padding: 5px;
                background: var(--app-background-color-dark);
                box-sizing: border-box;
            }
            
          
            .compoundContainer{
               height: calc(100% - 30px);
            }
            
            .bold{
               font-weight: bold;
            }
            
            .btn-close{
                float: right;
                margin-top: -4px;
                margin-right: -4px;
            }
            
            .compound-container{
                height: calc(100% - 20px);
                width: auto;
                border: 1px solid var(--app-background-color-dark);
                margin: 5px;
            }
            
            .compound-management-container{
                height: calc(100% - 35px);
                margin-top: 5px;
            }
            
        </style>
        
        <div class="compound-container">
           <div class="compound-title">
                <span class="bold">[[localize('presc-comp-mana', 'Compound management', language)]]</span>
                <paper-icon-button id="" class="button button--other btn-close" icon="icons:close" on-tap="_closeCompoundManagementView"></paper-icon-button>
            </div>
            <div class="compound-management-container">
                <paper-tabs selected="{{tabs}}">
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:edit"></iron-icon> [[localize('presc-comp-free','Free text',language)]]
                    </paper-tab> 
                    <paper-tab>
                        <iron-icon class="tabIcon" icon="vaadin:list-ul"></iron-icon> [[localize('presc-comp-codified','Codified',language)]]
                    </paper-tab>
                </paper-tabs>
                <iron-pages selected="[[tabs]]">
                    <page>
                        <ht-pat-prescription-compound-free-text
                            id="htPatPrescriptionCompoundFreeText"
                            api="[[api]]"
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]"
                            hcp="[[hcp]]"               
                            sam-version="[[samVersion]]" 
                            atc-class-list="[[atcClassList]]"
                            selected-compound="[[selectedCompound]]"
                        ></ht-pat-prescription-compound-free-text>
                    </page>
                    <page>
                        <ht-pat-prescription-compound-codified
                            id="htPatPrescriptionCompoundCodified"
                            api="[[api]]"
                            i18n="[[i18n]]" 
                            user="[[user]]" 
                            patient="[[patient]]" 
                            language="[[language]]" 
                            resources="[[resources]]"
                            hcp="[[hcp]]"               
                            sam-version="[[samVersion]]" 
                            substances-list="[[substancesList]]"
                            is-loading="[[isLoading]]"
                            filtered-substance-list="[[filteredSubstanceList]]"
                            atc-class-list="[[atcClassList]]"
                            selected-compound="[[selectedCompound]]"
                        ></ht-pat-prescription-compound-codified>
                    </page>
                </iron-pages>
            </div>
        </div>
        
              
`;
    }

    static get is() {
        return 'ht-pat-prescription-compound-management';
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
            tabs:{
               type: Number,
               value: 0
            },
            atcClassList:{
                type: Array,
                value: () => [
                    {id: "A", label: {fr: "Système digestif et métabolisme", nl: "Digestive system and metabolism", en: "Digestive system and metabolism"}},
                    {id: "B", label: {fr: "Sang et organes hématopoiétiques", nl: "Blood and hematopoietic organs", en: "Blood and hematopoietic organs"}},
                    {id: "C", label: {fr: "Système cardio-vasculaire", nl: "Cardiovascular system", en: "Cardiovascular system"}},
                    {id: "D", label: {fr: "Dermatologie", nl: "Dermatology", en: "Dermatology"}},
                    {id: "G", label: {fr: "Système génito-urinaire et hormones sexuelles", nl: "Genitourinary system and sex hormones", en: "Genitourinary system and sex hormones"}},
                    {id: "H", label: {fr: "Hormones systémiques, à l'exclusion des hormones sexuelles et des insulines", nl: "Systemic hormones, excluding sex hormones and insulins", en: "Systemic hormones, excluding sex hormones and insulins"}},
                    {id: "J", label: {fr: "Anti-infectieux (usage systémique)", nl: "Anti-infectives (systemic use)", en: "Anti-infectives (systemic use)"}},
                    {id: "L", label: {fr: "Antinéoplasiques et agents immunomodulants", nl: "Antineoplastic and immunomodulating agents", en: "Antineoplastic and immunomodulating agents"}},
                    {id: "M", label: {fr: "Système musculo-squelettique", nl: "Musculoskeletal system", en: "Musculoskeletal system"}},
                    {id: "N", label: {fr: "Système nerveux", nl: "The nervous system", en: "The nervous system"}},
                    {id: "P", label: {fr: "Antiparasitaires, insecticides et répulsifs", nl: "Pest control, insecticides and repellents", en: "Pest control, insecticides and repellents"}},
                    {id: "R", label: {fr: "Système respiratoire", nl: "Respiratory system", en: "Respiratory system"}},
                    {id: "S", label: {fr: "Organes sensoriels", nl: "Sensory organs", en: "Sensory organs"}},
                    {id: "V", label: {fr: "Divers", nl: "Various", en: "Various"}},
                ]
            },
            selectedCompound: {
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

    _reset(){
        this.set('selectedCompound', {})
        this.set('substancesList', [])
        this.set('filteredSubstanceList', [])
        this.set('isLoading', false)
    }

    _initializeData(drugId, product){
        let prom = Promise.resolve()

        prom.then(() => {
            this._reset()
            this.set('isLoading', true)
        })
            .then(() => !_.isEmpty(product) ? this.set('selectedCompound', _.assign(product, {
                codifiedFormula: []
            })) : this.set('selectedCompound', {
                label: null,
                description: null,
                formula: null,
                codifiedFormula: [],
                author: null,
                id: null,
                drugType: 'compound',
                atcClass: null,
            }))
            .then(() => this.api.besamv2().listSubstances())
            .then(substances => {
                this.set('substancesList', _.sortBy(substances.map(sub => {
                    return {
                        code: _.get(sub, 'code', null),
                        label: _.get(sub, 'name.'+this.language, null),
                        standartSubstances: _.get(sub, 'standartSubstances', []),
                        normalizedSearchTerms: _.map(_.uniq(_.compact(_.flatten(_.concat([_.trim(_.get(sub, 'name.'+this.language, ""))])))), i =>  _.trim(i).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, "")).join(" ")
                    }
                }), ['label'], ['asc']))
            }).finally(() => {
                this.set('filteredSubstanceList', _.sortBy(_.get(this, 'substancesList', []), ['label'], ['asc']))
                this.set('isLoading', false)
            })
    }

    _closeCompoundManagementView(){
        this.dispatchEvent(new CustomEvent('close-compound-management-view', {
            bubbles: true,
            composed: true
        }))
    }


}
customElements.define(HtPatPrescriptionCompoundManagement.is, HtPatPrescriptionCompoundManagement);
