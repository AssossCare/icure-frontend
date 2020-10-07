import {TkLocalizerMixin} from "../../tk-localizer";
import {html, PolymerElement} from "@polymer/polymer";

import _ from 'lodash/lodash';
import moment from 'moment/src/moment';
import * as models from '@taktik/icc-api/dist/icc-api/model/models';
import XLSX from "xlsx";

class HtAdminReportsFlatrate extends TkLocalizerMixin(PolymerElement) {
    static get template() {
        return html`
            <style include="shared-styles dialog-style buttons-style paper-tabs-style">
               .panel{
                    margin: 5px;
                    height: calc(100% - 20px);
                    width: auto;
                }
    
                .panel-title{
                    height: 40px;
                    width: auto;
                }
    
                .panel-search{
                    height: 45px;
                    width: auto;
                    display: flex;
                }
    
                .panel-content{
                    height: calc(100% - 125px);
                    width: auto;
                }
    
                .panel-button{
                    height: 32px;
                    width: auto;
                    padding: 4px;
                    display: flex;
                    justify-content: flex-end!important;
                }
    
                .panel-content-block{
                    height: 50px;
                    width: auto;
                    margin: 5px;
                    padding: 5px;
                    display: flex;
                }
    
                .btn-container{
                    width: 100px;
                }
    
                .button{
                    display: inline-flex!important;
                    align-items: center!important;
                }
    
                #processDialog{
                    height: 300px;
                    width: 600px
                }
    
                #requestInfoDialog{
                    height: 400px;
                    width: 700px;
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
    
                .processDialogContent{
                    padding: 5px;
                    text-align: center;
                }
    
                .process-icon{
                    height: 14px;
                    width: 14px;
                    padding: 0px;
                    color: var(--app-status-color-ok);
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
    
                .td .info{
                    width: 5%;
                }
    
                .td .title{
                    width: 65%;
                }
    
                .td .result{
                    width: 28%;
                }
    
                .w5{
                    width: 5%;
                }
    
                .w65{
                    width: 65%;
                }
    
                .w30{
                    width: 28%;
                    text-align: right;
                }
    
                .w90{
                    width: 90%;
                }
            </style>
  
        <div class="panel">
            <div class="panel-title">
                <div class="title">
                    [[localize('rash-report', 'Report', language)]] - [[localize('rep-flatrate-title', 'Report about flatrate', language)]]
                </div>
            </div>
            <div class="panel-content">
                <div class="panel-content-block">
                    <div>
                        [[localize('rep-flatrate-pat-with', 'List of patient with flatrate', language)]]
                    </div>
                    <div class="btn-container">
                        <paper-button on-tap="_generateListWithContract"  class="button button--save">[[localize('rep-gen','Generate',language)]]</paper-button>
                    </div>
                </div>
                <div class="panel-content-block">
                    <div>
                        [[localize('rep-flatrate-pat-without', 'List of patient without flarate', language)]]
                    </div>
                    <div class="btn-container">
                        <paper-button on-tap="_generateListWithoutContract" class="button button--save">[[localize('rep-gen','Generate',language)]]</paper-button>
                    </div>
                </div>
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
                <div>&nbsp;</div>
            </div>
        </paper-dialog>
            `;
    }
    static get is() {
        return 'ht-admin-reports-flatrate'
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value: () => {}
            },
            user: {
                type: Object,
                value: () => {}
            },
            hcp:{
                type: Object,
                value: () => {}
            },
            isLoading:{
                type: Boolean,
                value: false
            },
            patientList:{
                type: Array,
                value: () => []
            },
            selectedYear:{
                type: Object,
                value: () => {}
            },
            availableYearForReport:{
                type: Array,
                value: () => []
            },
            processStep:{
                type: Array,
                value: () => []
            }
        }
    }

    static get observers() {
        return ['_initializeDataProvider(api, user)'];
    }

    constructor() {
        super()
    }

    ready() {
        super.ready()
    }

    _reset(){
        const currentYear = this.api.moment(new Date).format("YYYY")

        this.set('availableYearForReport', [
            {label: currentYear, id: currentYear}
        ])
        this.set('selectedYear', _.get(this, 'availableYearForReport', []).find(ay => _.get(ay, 'id', null) === parseInt(this.api.moment(new Date()).format('YYYY')) -1))
        this.set('hcp', {})
        this.set('patientList', [])
        this.set('processStep', [])
    }

    _generateListWithContract(){
        this._reset()
        this.$['processDialog'].open()
        this.set("isLoading", true)
        this.push('processStep',  this.localize('mh_eInvoicing.mda.step_2', 'Collecting patient', this.language))
        this._initializeDataForListOfContract().then(patients => {
            this.push('processStep',  this.localize('', 'Vérification des contracts', this.language))
            this.set('patientList', patients.rows)
            const listOfActivePatient = _.get(this, 'patientList', []).filter(pat => _.get(pat, 'active', false) === true)
            const listOfPatientWithFlatRateContract = this._getPatientWithFlatrateContract(listOfActivePatient)
            this._generatePatientContractStatusReport(listOfPatientWithFlatRateContract, "withContract")
        })
    }

    _generateListWithoutContract(){
        this._reset()
        this.set("isLoading", true)
        this.push('processStep',  this.localize('mh_eInvoicing.mda.step_2', 'Collecting patient', this.language))
        this._initializeDataForListOfContract().then(patients => {
            this.push('processStep',  this.localize('', 'Vérification des contracts', this.language))
            this.set('patientList', patients.rows)
            const listOfActivePatient = _.get(this, 'patientList', []).filter(pat => _.get(pat, 'active', false) === true)
            const listOfPAtientWithoutFlatRateContract = this._getPatientWithoutFlatrateContract(listOfActivePatient)
            this._generatePatientContractStatusReport(listOfPAtientWithoutFlatRateContract, "withoutContract")
        })
    }

    _getPatientWithFlatrateContract(listOfActivePatient){
        const startOfYear = parseInt(_.get(this, 'selectedYear.id', null)+"0101")
        return listOfActivePatient.filter(pat => (_.get(pat, 'active', false) === true) &&  _.size(_.get(pat, "medicalHouseContracts", [])) &&
            _.some(_.get(pat, "medicalHouseContracts", []), mhc => mhc &&
                (mhc.kine || mhc.gp || mhc.nurse) &&
                _.trim(_.get(mhc,"startOfContract") &&
                    _.get(mhc,"startOfContract") < (startOfYear+(1e4)) &&
                    (!_.get(mhc,"startOfCoverage") || (_.get(mhc,"startOfCoverage") && _.get(mhc,"startOfCoverage") < (startOfYear+(1e4))) ) &&
                    (!_.get(mhc,"endOfContract") || _.get(mhc,"endOfContract") > (startOfYear + 1130)) &&
                    (!_.get(mhc,"endOfCoverage") || _.get(mhc,"endOfCoverage") > (startOfYear + 1130)))))

    }

    _getPatientWithoutFlatrateContract(listOfActivePatient){
        const startOfYear = parseInt(_.get(this, 'selectedYear.id', null)+"0101")
        return listOfActivePatient.filter(pat => (_.get(pat, 'active', false) === true) &&  !_.size(_.get(pat, "medicalHouseContracts", [])) ||
            !_.some(_.get(pat, "medicalHouseContracts", []), mhc => mhc &&
                (mhc.kine || mhc.gp || mhc.nurse) &&
                _.trim(_.get(mhc,"startOfContract") &&
                    _.get(mhc,"startOfContract") < (startOfYear+(1e4)) &&
                    (!_.get(mhc,"startOfCoverage") || (_.get(mhc,"startOfCoverage") && _.get(mhc,"startOfCoverage") < (startOfYear+(1e4))) ) &&
                    (!_.get(mhc,"endOfContract") || _.get(mhc,"endOfContract") > (startOfYear + 1130)) &&
                    (!_.get(mhc,"endOfCoverage") || _.get(mhc,"endOfCoverage") > (startOfYear + 1130)))))
    }


    _initializeDataForListOfContract() {
        return this.api.hcparty().getHealthcareParty(this.user.healthcarePartyId).then(hcp => {
            this.set('hcp', hcp)
            const filter = {
                $type: "PatientByHcPartyNameContainsFuzzyFilter",
                healthcarePartyId: _.get(hcp, 'parentId', null) ? _.get(hcp, 'parentId', null) : _.get(hcp, 'id', null),
                searchString: ""
            };

            return this.api.patient().filterByWithUser(this.user, null, null, 30000, 0, null, true, {filter: filter})

        })
    }

    _generatePatientContractStatusReport(listOfPatient, type){
        this.push('processStep',  this.localize('', 'Génération du rapport', this.language))
        let data = [
            [
                this.localize('inv_mut','Mutual',this.language),
                this.localize('inv_pat','Patient',this.language),
                this.localize('inv_niss','Inss',this.language),
                this.localize('gender','Gender',this.language)
            ]
        ]

        listOfPatient.map(pat => {
            data.push([
                _.get(pat, 'insuranceCode', ''),
                _.get(pat, 'lastName', '')+' '+_.get(pat, 'firstName', ''),
                _.get(pat, 'ssin', ''),
                this.localize(_.get(pat, 'gender', ''), _.get(pat, 'gender', ''), this.language)
            ])
        })

        this.set("isLoading", false)
        this.$['processDialog'].close()

        this.generateXlsFile(
            data,
            type === "withContract" ? "patientWithCtc"+moment().format("YYYYMMDD-HHmmss")+ ".xls" : "patientWithoutCtc"+moment().format("YYYYMMDD-HHmmss")+ ".xls",
            type === "withContract" ? "Patient with contract" : "Patient without contract",
            "Topaz"
        )

    }

    generateXlsFile(data, filename, title, author){

        // Create xls work book and assign properties
        const xlsWorkBook = {SheetNames: [], Sheets: {}}
        xlsWorkBook.Props = {Title: title, Author: author}

        // Create sheet based on json data collection
        var xlsWorkSheet = XLSX.utils.json_to_sheet(data)

        // Link sheet to workbook
        XLSX.utils.book_append_sheet(xlsWorkBook, xlsWorkSheet, title)

        // Virtual data output
        var xlsWorkBookOutput = new Buffer(XLSX.write(xlsWorkBook, {bookType: 'xls', type: 'buffer'}))

        // Put output to virtual "file"
        var fileBlob = new Blob([xlsWorkBookOutput], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"})

        // Create download link and append to page's body
        var downloadLink = document.createElement("a")
        document.body.appendChild(downloadLink)
        downloadLink.style = "display: none"

        // Create url
        var urlObject = window.URL.createObjectURL(fileBlob)

        // Link to url
        downloadLink.href = urlObject
        downloadLink.download = filename

        // Trigger download and drop object
        downloadLink.click()
        window.URL.revokeObjectURL(urlObject)

        // Free mem
        fileBlob = false
        xlsWorkBookOutput = false
    }
}
customElements.define(HtAdminReportsFlatrate.is, HtAdminReportsFlatrate)
