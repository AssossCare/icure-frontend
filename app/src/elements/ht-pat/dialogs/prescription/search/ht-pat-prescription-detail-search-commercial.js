import '../../../../dynamic-form/dynamic-link.js';
import '../../../../dynamic-form/dynamic-pills.js';
import '../../../../ht-spinner/ht-spinner.js';
import '../../../../icons/medication-icons';
import '../../../../icons/icure-icons';
import '../../../../dynamic-form/dynamic-doc.js';
import '../../../../collapse-button/collapse-button.js';
import '../../../../../styles/dialog-style.js';
import '../../../../../styles/scrollbar-style.js';
import '../../../../../styles/paper-tabs-style';
import '../../../../../styles/shared-styles';
import '../../../../../styles/buttons-style';
import '../../../../../styles/atc-styles';
import './ht-pat-prescription-detail-search-commercial-result'

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
        <style include="dialog-style scrollbar-style buttons-style shared-styles paper-tabs-style atc-styles spinner-style">

        </style>
        
        <ht-pat-prescription-detail-search-commercial-result
            id="htPatPrescriptionDetailSearchCommercialResult"
            api="[[api]]"
            i18n="[[i18n]]" 
            user="[[user]]" 
            patient="[[patient]]" 
            language="[[language]]" 
            resources="[[resources]]"
            hcp="[[hcp]]"               
            sam-version="[[samVersion]]"  
            search-result="[[searchResult.commercialName]]"
            origin="[[origin]]"       
        ></ht-pat-prescription-detail-search-commercial-result>
                     
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
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            samVersion:{
                type: Object,
                value: () => {}
            },
            origin:{
                type: String,
                value: "commercialSearch"
            }
        };
    }

    static get observers() {
        return [];
    }

    ready() {
        super.ready();
    }
}
customElements.define(HtPatPrescriptionDetailSearchCommercial.is, HtPatPrescriptionDetailSearchCommercial);
