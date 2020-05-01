import _ from 'lodash/lodash';
import moment from 'moment/src/moment'
import {TkLocalizerMixin} from "../tk-localizer";
import {mixinBehaviors} from "@polymer/polymer/lib/legacy/class";
import {IronResizableBehavior} from "@polymer/iron-resizable-behavior";
import {PolymerElement, html} from '@polymer/polymer';

import '../ht-spinner/ht-spinner.js';
import '../../styles/dialog-style.js';
import '../../styles/scrollbar-style.js';
import '../../styles/paper-tabs-style.js';
import '../../styles/shared-styles.js';
import '../../styles/app-theme-tz.js';

class HtMigrationDataFix extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement))  {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style">

            #migrationDialog{
                height: calc(98% - 12vh);
                width: 98%;
                max-height: calc(100% - 64px - 48px - 20px); /* 100% - header - margin - footer*/
                min-height: 400px;
                min-width: 800px;
                top: 64px;
            }

            .title{
                height: 30px;
                width: auto;
                font-size: 20px;
            }

            .content{
                display: flex;
                height: calc(98% - 140px);
                width: auto;
                margin: 1%;
            }

            .hubDocumentsList{
                display: flex;
                height: 100%;
                width: 50%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
            }

            .hubDocumentsList2{
                height: 100%;
                width: 30%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
                margin-right: 1%;
                overflow: auto;
            }

            .hubDocumentViewer{
                display: flex;
                height: 100%;
                width: 70%;
                border: 1px solid #c5c5c5;
                border-top: 4px solid var(--app-secondary-color-dark);
            }

            #transaction-list{
                height: 100%;
                width: 100%;
                max-height: 100%;
                overflow: auto;
            }

            #htPatHubTransactionViewer{
                height: 98%;
                width: 100%;
                max-height: 100%;
            }

            .sublist{
                background:var(--app-light-color);
                margin:0 0 0 -30px;
                padding:0;
                border-radius:0 0 2px 2px;
            }

            collapse-buton{
                --iron-collapse: {
                    padding-left: 0px !important;
                };

            }

            ht-spinner {
                height: 42px;
                width: 42px;
                display: block;
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%,-50%);
            }

            .documentListContent{
                margin: 1%;
                width: auto;
            }

            .modal-title {
                background: var(--app-background-color-dark);
                margin-top: 0;
                padding: 16px 24px;
            }

            .buttons{
                position: absolute;
                right: 0;
                bottom: 0;
                margin: 0;
            }


            .menu-item {
                @apply --padding-menu-item;
                height: 24px;
                min-height: 24px;
                font-size: var(--font-size-normal);
                text-transform: inherit;
                justify-content: space-between;
                cursor: pointer;
                @apply --transition;
            }

            .sublist .menu-item {
                font-size: var(--font-size-normal);
                min-height:20px;
                height:20px;
            }

            .menu-item:hover{
                background: var(--app-dark-color-faded);
                @apply --transition;
            }

            .menu-item .iron-selected{
                background:var(--app-primary-color);

            }

            .list-title {
                flex-basis: calc(100% - 72px);
                font-weight: bold;
            }

            .one-line-menu {
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                font-weight: 400;
                padding-left:0;
            }

            .migrationDialog{
                display: flex;
                height: calc(100% - 45px);;
                width: auto;
                margin: 0;
                padding: 0;
            }

            .mig-menu-list{
                height: 100%;
                width: 30%;
                background-color: var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                overflow: auto;
                position: relative;
            }

            .mig-menu-view{
                height: 100%;
                width: 70%;
                position: relative;
                background: white;
            }

            .mig-menu-list-header{
                height: 48px;
                width: 100%;
                border-bottom: 1px solid var(--app-background-color-darker);
                background-color: var(--app-background-color-dark);
                padding: 0 12px;
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                box-sizing: border-box;
            }

            .mig-menu-list-header-img{
                height: 40px;
                width: 40px;
                background-color: transparent;
                margin: 4px;
                float: left;
            }

            .mig-menu-list-header-info{
                margin-left: 12px;
                display: flex;
                /*align-items: center;*/
            }

            .mig-menu-list-header-img img{
                width: 100%;
                height: 100%;
            }

            .mig-name{
                font-size: var(--font-size-large);
                font-weight: 700;
            }

            .menu-item-icon{
                height: 20px;
                width: 20px;
                padding: 0px;
            }

            collapse-button[opened] .menu-item-icon{
                transform: scaleY(-1);
            }

            .bold {
                font-weight: bold;
            }

            .sublist{
                background:var(--app-light-color);
                margin:0 0 0 -30px;
                padding:0;
            }

            .table-line-menu {
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                height: 100%;
                width: 100%;
            }
            
            .table-line-menu-top{
                padding-left: var(--padding-menu-item_-_padding-left);
                padding-right: var(--padding-menu-item_-_padding-right);
                box-sizing: border-box;
            }

            .table-line-menu div:not(:last-child){
                border-right: 1px solid var(--app-background-color-dark);
                height: 20px;
                line-height: 20px;
            }

            .table-line-menu .date{
               width: 14%;
                padding-right: 4px;
                overflow: hidden;
                text-overflow: ellipsis;
            }

            .table-line-menu .type{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 35%;
            }

            .table-line-menu .auth{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 45%
            }

            .table-line-menu .pat{
                width: 4%;
                padding-right: 4px;
                padding-left: 4px;
            }

            .table-line-menu .dateTit{
                width: 14%;
                padding-right: 10px;
            }

            .table-line-menu .typeTit{
                overflow: hidden;
                text-overflow: ellipsis;
                padding-left: 4px;
                padding-right: 4px;
                width: 35%;
                white-space: nowrap;
            }

            .table-line-menu .authTit{
                padding-left:4px;
                padding-right:4px;
                width: 45%;
            }

            .table-line-menu .patTit{
                width: 4%;
                padding-left: 4px;
                padding-right: 4px;
                text-align: center;
            }

            .never::after{
                background-color: var(--app-status-color-nok)
            }

            .yes::after{
                background-color: var(--app-status-color-ok)
            }

            .no::after{
                background-color: var(--app-status-color-pending)
            }

            .pat-access{
                height: 16px;
                width: 16px;
                position: relative;
                color: var(--app-text-color);
            }

            .pat-access::after{
                position: absolute;
                display: block;
                content: '';
                right: -5px;
                top: 50%;
                transform: translateY(-50%);
                height: 6px;
                width: 6px;
                border-radius: 50%;
            }

            .hub{
                text-transform: uppercase;
            }

            /*When no h2 on dialog:*/
            .content{
                max-height: calc(100% - 45px);
            }

            .sumehr-form-container {
                position:relative;
            }

            .sumehr-forms-container{
                text-align: right;
                position: absolute;
                margin-top: 8px;
                top: -70px;
                left: -44px;
                background-color: var(--app-background-color);
                opacity: 1;
                border-radius: 2px;
                z-index: 200;
                height: auto !important;
                box-shadow: var(--app-shadow-elevation-2);
                display: flex;
                flex-flow: column nowrap;
                align-items: stretch;
                border-radius: 3px;
                overflow: hidden;
                padding: 0;
            }

            .sumehr-forms-container paper-button{
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                text-transform: capitalize;
                height: 28px;
                padding: 0 12px 0 8px;
                font-weight: 400;
                font-size: var(--font-size-normal);
                text-align: left;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
                flex-grow: 1;
                border-radius: 0;
                margin: 0;
            }
            .sumehr-forms-container paper-button:hover{
                background: var(--app-background-color-dark);
            }

            .sumehr-forms-container paper-button iron-icon{
                color: var(--app-secondary-color);
                height: 20px;
                width: 20px;
                margin-right: 4px;
                box-sizing: border-box;
            }

            .close-add-forms-btn, .close-sumehr-forms-btn{
                background: var(--app-secondary-color-dark) !important;
            }

            .no-mobile {
                display: none;
            }

            .search-line{
                display: flex;
            }

            .w50{
                width: 49%;
            }

            .ml1{
                margin-left: 1%;
            }

        </style>
        
        <paper-dialog id="migrationDialog" opened="{{opened}}">
            <div class="content migrationDialog">
                <div class="mig-menu-list">
                    <div class="mig-menu-list-header">
                        <div class="mig-menu-list-header-img">
                            <!-- icon here -->
                        </div>
                        <div class="mig-menu-list-header-info">
                            <div class="mig-name">
                                <span class="hub">Pricare Agenda to Mikrono</span>
                            </div>
                        </div>
                    </div>
                    <div class="hub-submenu-container">
                        <ht-spinner active="[[isLoading]]"></ht-spinner>
                       <paper-button on-tap="doPatientTelFix" class="button" >Patient tel fix</paper-button>
                    </div>
                </div>
                <div class="mig-menu-view">
                    <!-- content here -->
                    <template is="dom-if" if="[[patientTelFix]]">
                        <paper-button on-tap="startPatientTelFix" class="button" >Fix patients</paper-button>
                        <div>Processing [[posPat]] of [[numPats]]</div>
                    </template>                
                </div>
            </div>
            <div class="buttons">
				<paper-button class="button" dialog-dismiss="">[[localize('clo','Close',language)]]</paper-button>
			</div>
        </paper-dialog>
        `;
    }

    static get is() {
        return 'ht-migration-data-fix';
    }

    static get properties() {
        return {
            api: {
                type: Object,
                noReset: true
            },
            user: {
                type: Object,
                noReset: true
            },
            hcp: {
                type : Object
            },
            patientTelFix:{
                type: Boolean,
                value: false
            },
            numPats:{
                type: Number,
                value: 0
            },
            posPat:{
                type: Number,
                value:0
            }
        };
    }

    static get observers() {
        return [];
    }

    reset() {
        const props = HtHcp.properties
        Object.keys(props).forEach(k => { if (!props[k].noReset) { this.set(k, (typeof props[k].value === 'function' ? props[k].value() : (props[k].value || null))) }})
    }

    ready() {
        super.ready()
    }

    open(){
        this.$.migrationDialog.open();
    }

    doPatientTelFix(){
        this.set('patientTelFix', true);
    }
    
    startPatientTelFix() {
        //1. get patients
        let iPos = 0
        this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(response =>{
            this.set("hcp",response);
            let hcpId = this.hcp.parentId ? this.hcp.parentId : this.hcp.id;
            this.getPatientsByHcp(hcpId).then(myPatients => {
                console.log("# patients", myPatients.length)
                this.set("numPats", myPatients.length)
                let prom = Promise.resolve([])
                _.map(myPatients, pat => {

                    prom = prom
                        .then(promiseCarrier => this.api.patient().getPatientWithUser(this.user, pat.id).then(pat =>{
                            console.log("before", pat.addresses);
                            const telcoBefore = pat.addresses.map(addr => addr.telecoms).flat().length
                            let isMobile = false
                            //2.1 remove empty telecoms
                            //2.2 set mobile telecom to mobile (detect gsm numbers)
                            pat.addresses.forEach(addr => {
                                addr.telecoms = addr.telecoms.filter(tc => !!tc.telecomNumber && tc.telecomNumber !=="")
                                addr.telecoms.filter(tc => tc && tc.telecomType && tc.telecomType === "phone").forEach(tc => {
                                    isMobile = this.isMobileNumber(tc.telecomNumber)
                                    tc.telecomType = this.isMobileNumber(tc.telecomNumber) ? "mobile" : tc.telecomType
                                })
                            })
                            console.log("after", pat.addresses);
                            const telcoAfter = pat.addresses.map(addr => addr.telecoms).flat().length
                            iPos++;
                            console.log("patient n°", iPos)
                            this.set("posPat", iPos)
                            if(telcoAfter < telcoBefore || isMobile) {
                                this.api.patient().modifyPatientWithUser(this.user, pat).then(patient => this.api.register(patient, 'patient'))
                            }
                        })
                            .then(x => _.concat(promiseCarrier,x))
                            .catch(() => _.concat(promiseCarrier,null)))
                })
                prom.then(resList =>{
                    Promise.all(resList).then(res => console.log(res))
                })
                //2. per patient:
                // myPatients.map(pat => {
                //     this.api.patient().getPatientWithUser(this.user, pat.id).then(pat =>{
                //         console.log("before", pat.addresses);
                //         //2.1 remove empty telecoms
                //         //2.2 set mobile telecom to mobile (detect gsm numbers)
                //         pat.addresses.forEach(addr => {
                //             addr.telecoms = addr.telecoms.filter(tc => !!tc.telecomNumber && tc.telecomNumber !=="")
                //             addr.telecoms.filter(tc => tc && tc.telecomType && tc.telecomType === "phone").forEach(tc => {
                //                 tc.telecomType = this.isMobileNumber(tc.telecomNumber) ? "mobile" : tc.telecomType
                //             })
                //         })
                //         console.log("after", pat.addresses);
                //         this.api.patient().modifyPatientWithUser(this.user, pat).then(patient => this.api.register(patient, 'patient'))
                //     })
                // })
            })
        })
    }

    isMobileNumber(tcNumber){
        const clean = tcNumber.replace("/", "").replace("-", "").replace(" ", "").replace(".", "").replace("(", "").replace(")", "").replace("+32", "0")
        // 04xxaabbcc
        // length = 10
        // startswith = 04
        return clean.length === 10 && clean.startsWith("04");
    }

    getPatientsByHcp( hcpId ) {

        return this.api.getRowsUsingPagination(
            (key,docId) =>
                this.api.patient().listPatientsByHcPartyWithUser(this.user, hcpId, null, key && JSON.stringify(key), docId, 1000)
                    .then(pl => {
                        pl.rows = _
                            .chain(pl.rows)
                            .value()
                            .map((i) => {
                                i.ssin = _.trim(_.get(i,"ssin","")).replace(/[^\d]/gmi,"")
                                i.lastName = (_.get(i,"lastName","")).toUpperCase()
                                i.firstName = (_.get(i,"firstName","")).toUpperCase()
                                i.dateOfBirth = (!!_.trim(_.get(i,"dateOfBirth",""))?moment(_.trim(_.get(i,"dateOfBirth",0)), "YYYYMMDD").format('DD/MM/YYYY'):"")
                                return i
                            })
                        ;
                        return {
                            rows:pl.rows,
                            nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                            nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                            done: !pl.nextKeyPair
                        }
                    })
                    .catch(()=>{ return Promise.resolve(); })
        )||[];

    }
}

customElements.define(HtMigrationDataFix.is, HtMigrationDataFix);
