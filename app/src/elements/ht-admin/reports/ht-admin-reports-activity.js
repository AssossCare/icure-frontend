import {TkLocalizerMixin} from "../../tk-localizer";
import {html, PolymerElement} from "@polymer/polymer";

import _ from 'lodash/lodash';
import moment from 'moment/src/moment';
import * as models from "icc-api";

class HtAdminReportsActivity extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="shared-styles dialog-style buttons-style paper-tabs-style">
                :host {
                    display: block;
                }
            
                :host *:focus{
                    outline:0!important;
                }
                
                .activity-panel{
                    width: 100%;
                    height: 100%;
                    grid-column-gap: 24px;
                    grid-row-gap: 24px;
                    padding: 0 24px;
                    box-sizing: border-box;
                    background: white;
                }
                
                #processDialog{
                    height: 300px;
                    width: 600px
                }
                
                .processDialogContent{
                    padding: 5px;
                    text-align: center;
                }
                
                .table{
                    height: auto;
                    width: 98%;
                    padding: 1%;
                }
    
                .tr{
                    height: auto;
                    width: 100%;
                    display: flex;
                }
                
                .w90{
                    width: 90%;
                }
                
                .w5{
                    width: 5%;
                }
                
                .center{
                    text-align: center;
                }
    
                .left{
                    text-align: left;
                }
                
                ht-spinner {
                    height: 42px;
                    width: 42px;
                    display: block;
                    position: absolute;
                    top: 75%;
                    left: 50%;
                    transform: translate(-50%,-50%);
                }
                
                #yearOfActivity{
                    padding: 5px;
                }
                
                .request{
                    display: flex;
                }
                
                .btn-container{
                    margin: 18px;
                }
            </style>
            <div class="activity-panel">
                <h4 class="section-title">[[localize('report', 'Report', language)]] - [[localize('activity', 'Activity', language)]]</h4>
                <div class="request">
                    <div class="rashYear">
                        <vaadin-combo-box id="yearOfActivity" filtered-items="[[availableYearForReport]]" item-label-path="label" item-value-path="id" label="[[localize('which-year', 'For which year do you want to generate the report ?', language)]]" selected-item="{{chosenDate}}"></vaadin-combo-box>
                    </div>
                    <div class="btn-container">
                        <paper-button class="button button--save" on-tap="_generateReport"><iron-icon icon="vaadin:download" class="btn-icon"></iron-icon> [[localize('gen-rep','Generate report',language)]]</paper-button>
                    </div>
                </div>
                <div class="report">
                    <vaadin-grid class="report-list" overflow="bottom" id="report-list" items="[[report]]">
                        <vaadin-grid-column width="50%">
                            <template class="header">
                                <div class="list-right">[[localize('title','title',language)]]</div>
                            </template>
                            <template>
                                [[item.title]]
                            </template>
                        </vaadin-grid-column width="50%">
                        <vaadin-grid-column>
                            <template class="header">
                                <div class="list-right">[[localize('infos','informations',language)]]</div>
                            </template>
                            <template>
                                [[item.info]]
                            </template>
                        </vaadin-grid-column>
                    </vaadin-grid>
                </div>
            </div>
            
            
            <paper-dialog id="processDialog">
                <h2 class="modal-title">[[localize('rash-proc', 'Process request', language)]]</h2>
                <div class="content">
                    <div class="processDialogContent">
                        [[localize('rash-proc-mess', 'This process can take a few minutes, please wait a moment', language)]]
                           <div class="table">
                               <template is="dom-repeat" items="[[processStep]]">
                                   <div class="tr">
                                       <div class="td w90 left">
                                           [[item]]
                                       </div>
                                       <div class="td w5 center">
                                           <iron-icon icon="vaadin:check-circle" class="process-icon"></iron-icon>
                                       </div>
                                   </div>
                               </template>
                           </div>
                        <ht-spinner active="[[isLoading]]"></ht-spinner>
                    </div>
                </div>
                <div class="buttons">
                </div>
            </paper-dialog>
            `;
    }
    static get is() {
        return 'ht-admin-reports-activity'
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
            report: {
                type: Array,
                value: () => []
            },
            processStep:{
                type: Array,
                value: () => []
            },
            chosenDate: {
                type: String,
                value: ""
            },
            availableYearForReport:{
                type: Array,
                value : ()=>[]
            }
        }
    }

    static get observers() {
        return [];
    }

    constructor() {
        super()
    }

    ready() {
        super.ready()
        this.set("chosenDate",moment().format("YYYY"))

        let numberOfYear = this.chosenDate - 2019
        while(numberOfYear>=0){
            const date = moment().subtract(numberOfYear--, 'year').format("YYYY")
            this.push('availableYearForReport',{
                label:date,
                id:date
            })
        }
    }

    _generateReport(){
        this.$['processDialog'].open()
        this.set('isLoading', true)
        this.set("processStep",[])
        this.push('processStep',"lancement du rapport")

        Promise.all([
            this.api.getRowsUsingPagination((key,docId) => this.api.patient().listPatientsByHcPartyWithUser(this.user, this.user.healthcarePartyId, null, key && JSON.stringify(key), docId, 1000)
                .then(pl => {
                    return {
                        rows:pl.rows,
                        nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                        nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                        done: !pl.nextKeyPair
                    }
                }))//,
            //todo @julien this request doesn't properly work. Problems with your db and with another we don't have good response
            /*this.api.getRowsUsingPagination((key,docId) => this.api.contact().filterByWithUser(this.user,key && JSON.stringify(key), docId, 1000, new models.FilterChain({ filter: {'$type': 'ContactByHcPartyTagCodeDateFilter', healthcarePartyId : this.user.healthcarePartyId, startOfContactOpeningDate : _.parseInt(this.chosenDate+"0101000001"), endOfContactOpeningDate : _.parseInt(this.chosenDate+"1231235959")} }))
                .then(pl => {
                    return {
                        rows:pl.rows,
                        nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                        nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                        done: !pl.nextKeyPair
                    }
                }))*/
        ])
            .then(([patients/*,contacts*/]) => {
                const totalPat = patients.length
                this.push('processStep',"obtention des "+totalPat+" patients")
                let forfaitCpt          = 0
                let notForfaitCpt       = 0
                let consultCpt          = 0
                let eConsultCpt         = 0
                let mhConsultCpt        = 0
                let houseConsultCpt     = 0
                let telConsultCpt       = 0
                let otherConsultCpt     = 0
                let subJanvCpt          = 0
                let subDecemCpt         = 0
                let subForfaitCpt       = 0
                let notSubJanvCpt       = 0
                let notSubDecemCpt      = 0
                let yearOldMoy          = []
                let errorMessages       = []
                let prom = Promise.resolve()
                this.push('processStep',"0"+this.localize('act_pat_trait'," patient(s) traité(s) sur ")+totalPat)
                this.push('processStep',"")
                let patCpt =0;
                patients.map(pat =>{
                    const mhcs = _.get(pat,"medicalHouseContracts",false)

                    mhcs.find(mhc =>  this.api.moment(_.get(mhc,"startOfCoverage","22000101")).isSameOrBefore(moment("01/01/"+this.chosenDate,"DD/MM/YYYY"),"day") && this.api.moment(_.get(mhc,"endOfCoverage","22000101")).isSameOrAfter(moment("01/01/"+this.chosenDate,"DD/MM/YYYY"),"day")) ?
                        subJanvCpt++ : notSubJanvCpt++

                    mhcs.find(mhc =>  this.api.moment(_.get(mhc,"startOfCoverage","22000101")).isSameOrBefore(moment("31/12/"+this.chosenDate,"DD/MM/YYYY"),"day") && this.api.moment(_.get(mhc,"endOfCoverage","22000101")).isSameOrAfter(moment("31/12/"+this.chosenDate,"DD/MM/YYYY"),"day")) ?
                        subDecemCpt++ : notSubDecemCpt++

                    _.get(pat,"dateOfBirth",false) && yearOldMoy.push(moment("31/12/"+this.chosenDate,"DD/MM/YYYY").diff(this.api.moment(pat.dateOfBirth),'years'))

                    prom = prom.then( data => this.api.contact().findBy(this.user.healthcarePartyId, pat)
                        .then(ctcs => {

                            patCpt++
                            const totalCtc = ctcs.length
                            this.set("processStep.3","obtention des "+totalCtc+" contacts de "+pat.firstName+" "+pat.lastName)
                            let hasConsult = false
                            ctcs.map(ctc =>{
                                if(this.api.moment(_.get(ctc,"openingDate","19700101")).isBetween(moment("01/01/"+this.chosenDate,"DD/MM/YYYY"),moment("31/12/"+this.chosenDate,"DD/MM/YYYY"))){
                                    hasConsult=true
                                    consultCpt++
                                    const tag = _.get(ctc,"tags",[]).find(tag => tag.type==="BE-CONTACT-TYPE") || {code: "1",
                                        disabled: false,
                                        id: "BE-CONTACT-TYPE|1|1",
                                        type: "BE-CONTACT-TYPE",
                                        version: "1"}
                                    tag.code==="1" ? mhConsultCpt++ :
                                        tag.code==="6" || tag.code==="2" ? houseConsultCpt++:
                                            tag.code==="7"? eConsultCpt++ :
                                                tag.code==="27" || tag.code==="3" ? telConsultCpt++ : otherConsultCpt++

                                }
                            })


                            const mhc = mhcs.find(mhc => this.api.moment(_.get(mhc,"startOfCoverage","22000101")).isSameOrBefore(moment("31/12/"+this.chosenDate,"DD/MM/YYYY"),"day") && this.api.moment(_.get(mhc,"endOfCoverage","22000101")).isSameOrAfter(moment("01/01/"+this.chosenDate,"DD/MM/YYYY"),"day"))
                            if(mhc){
                                subForfaitCpt++
                            }
                            if(hasConsult && mhc ){
                                forfaitCpt++
                            }else if(hasConsult){
                                notForfaitCpt++
                            }
                            this.set("processStep.2",patCpt+this.localize('act_pat_trait'," patient(s) traité(s) sur ")+totalPat)
                            return "done"
                        })
                        .catch(err =>{
                            patCpt++
                            this.set("processStep.3",this.localize("act_err_ctc","erreur durant l'obtention des contacts")+": "+pat.firstName+" "+pat.lastName)

                            errorMessages.push({
                                //title : pat.id,
                                title : pat.firstName+" "+pat.lastName,
                                info : this.localize("act_err_ctc","act_err_ctc")
                            })

                            this.set("processStep.2",patCpt+" patient(s) traité(s) sur "+totalPat)
                            return "not done"
                        }))
                })

                prom.finally(()=>{
                    this.set("report",[
                        {title: this.localize("act_rep_forfaitCpt","act_rep_forfaitCpt"), info: forfaitCpt},
                        {title: this.localize("act_rep_notForfaitCpt","act_rep_notForfaitCpt"), info: notForfaitCpt},
                        {title: this.localize("act_rep_consultCpt","act_rep_consultCpt"), info: consultCpt},
                        {title: this.localize("act_rep_eConsultCpt","act_rep_eConsultCpt"), info: eConsultCpt},
                        {title: this.localize("act_rep_mhConsultCpt","act_rep_mhConsultCpt"), info: mhConsultCpt},
                        {title: this.localize("act_rep_houseConsultCpt","act_rep_houseConsultCpt"), info: houseConsultCpt},
                        {title: this.localize("act_rep_telConsultCpt","act_rep_telConsultCpt"), info: telConsultCpt},
                        {title: this.localize("act_rep_otherConsultCpt","act_rep_otherConsultCpt"), info: otherConsultCpt},
                        {title: this.localize("act_rep_subJanvCpt","act_rep_subJanvCpt"), info: subJanvCpt},
                        {title: this.localize("act_rep_subDecemCpt","act_rep_subDecemCpt"), info: subDecemCpt},
                        {title: this.localize("act_rep_subForfaitCpt","act_rep_subForfaitCpt"), info: subForfaitCpt},
                        {title: this.localize("act_rep_notSubJanvCpt","act_rep_notSubJanvCpt"), info: notSubJanvCpt},
                        {title: this.localize("act_rep_notSubDecemCpt","act_rep_notSubDecemCpt"), info: notSubDecemCpt},
                        {title: this.localize("act_rep_yearOldMoy","act_rep_yearOldMoy"), info: _.round(_.mean(yearOldMoy),2)}
                    ].concat(errorMessages))
                    this.set('isLoading', false)
                    this.$['processDialog'].close()
                })
            })
    }
}
customElements.define(HtAdminReportsActivity.is, HtAdminReportsActivity)
