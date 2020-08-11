import '../../../dynamic-form/ckmeans-grouping.js'
import '../../../../styles/vaadin-icure-theme.js'
import '../../../../styles/spinner-style.js'
import '../../../../styles/scrollbar-style'
import '../../../../styles/shared-styles'
import '../../../../styles/buttons-style'
import '../../../../styles/dialog-style'
import '../../../../styles/invoicing-style';
import '../../../ht-spinner/ht-spinner.js'
import '../../../ht-pat/dialogs/medicalhouse/ht-pat-flatrate-utils.js';

import "@polymer/iron-icon/iron-icon"
import "@polymer/paper-button/paper-button"
import "@polymer/paper-dialog/paper-dialog"
import "@polymer/paper-input/paper-input"
import "@polymer/paper-input/paper-textarea"
import "@polymer/paper-tabs/paper-tabs"
import "@polymer/paper-tooltip/paper-tooltip"
import "@vaadin/vaadin-grid/vaadin-grid"
import "@vaadin/vaadin-grid/vaadin-grid-column"
import "@vaadin/vaadin-grid/vaadin-grid-column-group"
import "@vaadin/vaadin-grid/vaadin-grid-sorter"
import "@vaadin/vaadin-grid/vaadin-grid-tree-toggle"
import '@vaadin/vaadin-accordion/vaadin-accordion'
import '@vaadin/vaadin-details/vaadin-details'
import "@vaadin/vaadin-combo-box/vaadin-combo-box"
import "@vaadin/vaadin-date-picker/vaadin-date-picker"

import moment from 'moment/src/moment'
import _ from 'lodash/lodash'
import * as models from '@taktik/icc-api/dist/icc-api/model/models';

import {PolymerElement, html} from '@polymer/polymer'
import {TkLocalizerMixin} from "../../../tk-localizer"
import promiseLimit from "promise-limit"
import * as retry from "@taktik/icc-api/dist/icc-x-api/utils/net-utils"
import * as fhcmodels from 'fhc-api/dist/model/models'
import jsZip from "jszip/dist/jszip.js";
const md5 = require('md5')



class HtMsgFlatrateMda extends TkLocalizerMixin(PolymerElement) {

    static get template() {

        return html`
        
        <style include="shared-styles spinner-style scrollbar-style buttons-style dialog-style vaadin-icure-theme invoicing-style">
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
                margin-top:10px;
                position:relative;
            }
            
            .assurability--redStatus{
                color: var(--app-status-color-nok);
                height: 8px;
                width: 8px;
            }

            .assurability--greenStatus{
                color: var(--app-status-color-ok);
                height: 8px;
                width: 8px;
            }
            
            .invoice-status {
                border-radius: 20px;
                padding: 1px 12px 1px 8px;
                font-size: 12px;
                display: block;
                width: auto;
                max-width: fit-content;
                white-space: nowrap;
                text-overflow: ellipsis;
                overflow: hidden;
            }

            .invoice-status--orangeStatus{
                background: #fcdf354d;
            }
            
            .statusIcon{
                height: 8px;
                width: 8px;
                background: transparent !important
            }
            .statusIcon.invoice-status--orangeStatus {
                color: var(--app-status-color-pending);
            }
            
            .statusIcon.invoice-status--orangeStatus,
            .statusIcon.invoice-status--greenStatus,
            .statusIcon.invoice-status--redStatus,
            .statusIcon.invoice-status--purpleStatus {
                background: transparent !important;
            }
            
            *.txtcolor--orangeStatus {
                color: var(--app-status-color-pending);
            }
            
            .batchNumber{
                color: var(--app-text-color-light);
                border-radius: 25px;
                min-height: 0;
                margin-left: 8px;
                font-size: .6em;
                display: inline-block;
                line-height: 0.8;
                text-align: center;
                height: 10px;
                padding: 5px;
                margin-top: 2px;
            }
            
            .batchPending{background-color: var(--paper-orange-400);}
            .batchToBeCorrected{background-color: var(--paper-red-400);}
            .batchProcessed{background-color: var(--paper-blue-400);}
            .batchRejected{background-color: var(--paper-red-400);}
            .batchAccepted{background-color: var(--paper-green-400);}
            .batchArchived{background-color: var(--paper-purple-300);}
                      
            .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
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
                flex-grow: 0;
            }
            
            .fg02{
                flex-grow: 0.2;
            }
            
            .fg05{
                flex-grow: 0.5;
            }
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }  
            
            .fg4{
                flex-grow: 4.2;
            }
                       
            .status{
                display: block;
                margin-left: auto;
                margin-right: auto;
            }
            
            .info-icon{
                height: 14px;
                width: 14px;
            }
            
            .searchField{
                display: block;
            }
            
            .button{
                display: inline-flex!important;
                align-items: center!important;
            }
            
            .title{
                display:flex;
                padding: 5px;
            }
                        
            .modalDialog{
                height: 350px;
                width: 600px;
            }

             .modalDialogContent{
                  height: calc(100% - 69px);
                  width: auto;
                  margin: 0;
                  background-color: white;
                  position: relative;
                  padding: 10px;
             }
             
             #checkBeforeSendingDialog{
                    height: 500px;
                    width: 800px;
             }

             .unsentInvoice{
                 height: 250px;
                 width: auto;
             }

             previousCheck{
                 height: 100px;
                 width: auto;
             }

             .errorBeforeSendInvoice{
                 color: var(--app-status-color-nok);
                 font-weight: bold;
             }

             #patientsWithoutAssurabilityGrid{
                 max-height: 200px;
                 overflow: auto;
             }
             
             .sendingSpinner{
                height: 100px!important;
                width: 100px!important;
                margin: auto;
             }
             
             .prossessList{
                height: calc(100% - 100px);
                width: auto;
                padding: 4px;
             }
             
             .content-container{
                padding: 4px;
                width: auto;
             }
             
             .previousCheckContainer{
             
             }
             
             .listOfUnsentInvoiceContainer{
             
             }
             
             .tr-group{
                background-color: #f4f4f6;
                font-weight: bold;
                }
                
                
                
                    .modal-title {
                        justify-content: flex-start;
                    }
    
                    .modal-title iron-icon{
                        margin-right: 8px;
                    }
    
                    .invoice-panel{
                        height: 100%;
                        width: 100%;
                        padding: 0 20px;
                        box-sizing: border-box;
                        position:relative;
                    }
    
                    .oa-col{
                        min-width: 25px;
                    }
    
                    .bold {
                        font-weight: 700!important;
                    }
    
                    .underlined {
                        text-decoration:underline!important;
                    }
    
                    .textDecorationNone {
                        text-decoration:none!important;
                    }
    
                    .ref-col{
                        min-width: 75px;
                    }
    
                    .invoice-col{
                        min-width: 40px;
                    }
    
                    .month-col{
                        min-width: 40px;
                    }
    
                    .invoiceDate-col{
                        min-width: 50px;
                    }
    
                    .invAmount-col{
                        min-width: 50px;
                    }
    
                    .accAmount-col{
                        min-width: 50px;
                    }
    
                    .refAmount-col{
                        min-width: 50px;
                    }
    
                    .stat-col{
                        min-width: 50px;
                    }
    
                    .reject-col{
                        min-width: 100px;
                    }
    
                    .payRef-col{
                        min-width: 50px;
                    }
    
                    .payDate-col{
                        min-width: 40px;
                    }
    
                    .payTot-col{
                        min-width: 40px;
                    }
    
                    .payBank-col{
                        min-width: 50px;
                    }
    
                    .payPaid-col{
                        min-width: 50px;
                    }
    
                    .facture-title {
                        padding: 15px;
                        font-size: 25px;
                        text-transform: capitalize;
                        margin: 0;
                        color: #212121;
                        height: 25px;
                        line-height: 25px;
                    }
    
    
                    @media screen and (max-width:1025px){
                        .invoice-panel {
                            left: 0;
                            width: 100%;
                        }
                    }
   
                    .invoice-status {
                        border-radius: 20px;
                        padding: 1px 12px 1px 8px;
                        font-size: 12px;
                        display: block;
                        width: auto;
                        max-width: fit-content;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        overflow: hidden;
                    }
    
                    .invoice-status--orangeStatus{
                        background: #fcdf354d;
                    }
    
                    .invoice-status--greenStatus{
                        background: #07f8804d;
                    }
    
                    .invoice-status--blueStatus {
                        background: #84c8ff;
                    }
    
                    .invoice-status--redStatus{
                        background: #ff4d4d4d;
                    }
    
                    .statusIcon{
                        height: 8px;
                        width: 8px;
                    }
                    .statusIcon.invoice-status--orangeStatus {
                        color: var(--app-status-color-pending);
                    }
                    .statusIcon.invoice-status--greenStatus {
                        color: var(--app-status-color-ok);
                    }
                    .statusIcon.invoice-status--blueStatus {
                        color: var(--paper-blue-400);
                    }
                    .statusIcon.invoice-status--redStatus {
                        color: var(--app-status-color-nok);
                    }
                    .statusIcon.invoice-status--orangeStatus,
                    .statusIcon.invoice-status--greenStatus,
                    .statusIcon.invoice-status--redStatus {
                        background: transparent !important;
                    }
                    .invoice-status--purpleStatus {
                        background: #e1b6e6;
                    }
    
                    *.txtcolor--orangeStatus {
                        color: var(--paper-amber-800);
                    }
                    *.txtcolor--greenStatus {
                        color: #36a201;
                    }
                    *.txtcolor--blueStatus {
                        color: var(--paper-blue-400);
                    }
                    *.txtcolor--redStatus {
                        color: var(--app-status-color-nok);
                    }
                    *.txtcolor--purpleStatus {
                        color: var(--paper-purple-300)
                    }
                    #pendingDetailDialog{
                        height: calc(100vh - 40px);
                        width: calc(85% - 40px);
                        z-index: 1100;
                        position: fixed;
                        top: 64px;
                    }
    
                    #pendingGridDetail{
                        height: calc(100% - 185px);
                        padding: 0;
                        width: 100%;
                    }
    
                    .batch-status {
                        font-size: 18px;
                        text-transform: capitalize;
                        padding-top: 5px;
                        display: flex;
                        flex-flow: row wrap;
                        align-items: center;
                        justify-content: flex-start;
                    }
    
                    .unlockBtn {
                        height: 12px;
                        width: 12px;
                    }
    
                    .hidden {
                        display: none;
                    }
    
                    #messagesGridContainer,#messagesGridContainer2, #messagesGridContainer3, #messagesGridContainer4 {
                        overflow-y: auto;
                    }
    
                    .invoiceContainer{
                        overflow-x: hidden;
                        overflow-y: hidden;
                        height: calc(100vh - 145px);
                        box-shadow: var(--app-shadow-elevation-1);
                    }
                    
                    .invoiceContainer.mdaResults {
                        height: calc(100vh - 426px);
                    }
                    
                    .invoiceSubContainerBig {
                        height: 100%;
                    }
    
                    .invoiceSubContainerMiddle {
                        height: calc(100%);
                        transition: all .5s ease;
                    }
                    .invoiceSubContainerMiddle vaadin-grid {
                        /*height: 100%;*/
                    }
                    .invoiceSubContainerMiddle.half {
                        height: 49%;
                    }
    
                    .invoiceDetailContainer,
                    .toBeCorrectedDetailContainerC{
                        height: 50%;
                        opacity: 0;
                        transition: all .75s ease-out;
                        overflow-y: auto;
                    }
                    .invoiceDetailContainer.open,
                    .toBeCorrectedDetailContainerC.open {
                        opacity: 1;
                        width: 100%;
                        height: 46%;
                        margin-top:4%
                    }
    
                    tr.hidden {
                        display: none !important;
                    }
    
                    .mb0 {
                        margin-bottom: 0;
                    }
                    .mb30 {
                        margin-bottom: 30px;
                    }
    
                    #pendingDetailDialog {
                        max-height: 80vh;
                    }
    
                    .helpdeskIcon {
                        height: 12px;
                        width: 12px;
                        cursor: pointer;
                        opacity: 0.7;
                        transition: all .24s cubic-bezier(0.075, 0.82, 0.165, 1);
                    }
    
                    .helpdeskIcon:hover{
                        transform: scale(1.05);
                        opacity: 1;
                    }
    
                    iron-collapse-button #trigger{
                        height: 45px;
                        background: var(--app-background-color-dark);
                        display: initial;
                    }
    
                    #invoiceCollapser {
                        display: block;
                        background: white;
                        height: calc(100% - 75px);
                        overflow-y: auto;
                    }
    
                    h3.header {
                        margin: 0 auto
                    }
                    #collapse-grid .recipient-col {
                        background: grey;
                    }
    
                    .rejectionReason-col {
                        overflow: hidden;
                        white-space: nowrap;
                        text-overflow: ellipsis;
                        max-width: 100%;
                    }
    
                    .containScroll {
                        overflow: auto;
                        height: 100%;
                    }
    
                    .scrollBox {
                        width: 100%;
                        overflow: hidden;
                        height: 100%;
                    }
                    .scrollBox > #messagesGrid, .scrollBox > #messagesGrid2, .scrollBox > #messagesGrid3 {
                        width: 100%;
                        height: 100%;
                    }
    
                    .flex-header{
                        width: 100%;
                        display: flex;
                        flex-flow: row nowrap;
                        justify-content: flex-start;
                        align-items: center;
                        height: 48px;
                    }
    
                    iron-collapse-button:hover{
                        background: var(--app-background-color-dark);
                    }
    
                    .flex-header span{
                        display:block;
                        font-size: 12px;
                        font-weight: 400;
                        padding: 4px 12px;
                        box-sizing:border-box;
                        cursor: pointer;
                        color: rgb(115,115,115);
                    }
    
                    .flex-header span.center{
                        text-align: center;
                    }
    
                    #invoiceGrid .footer{
                        background: red;
                    }
    
                    #invoiceAndBatchesGridDetail {
                        height: calc(100% - 100px);
                    }
    
                    .invoicesToBeCorrectedGrid {
                        height: 100%;
                    }
    
                    #helpdeskInfoDialog{
                        position: fixed;
                        width: 50%;
                        left: 50%;
                        top: 50%;
                        transform: translate(-50%, -50%);
                        max-width: none !important;
                        max-height: none !important;
                        overflow-y: auto;
                    }
    
                    /*.modal-title {*/
                    /*    background: var(--app-background-color-dark);*/
                    /*    margin-top: 0;*/
                    /*    padding: 16px 24px;*/
                    /*}*/
    
                    .modal-content{
                        display: flex;
                        flex-flow: row wrap;
                        align-items: center;
                        justify-content: flex-start;
                    }
    
                    .colorAppSecondaryColorDark {
                        color:var(--app-secondary-color-dark)
                    }
    
                    .modal-input{
                        margin: 0 12px;
                        flex-grow: 1;
                    }
    
                    paper-input{
                        --paper-input-container-focus-color: var(--app-primary-color);
                    }
    
                    .button--accepted {
                        --paper-button-ink-color: var(--app-status-color-ok);
                        background-color: var(--app-status-color-ok);
                        color: var(--app-text-color-light);
                    }
    
                    .button--partially-accepted {
                        --paper-button-ink-color: var(--app-status-color-pending);
                        background-color: var(--app-status-color-pending);
                        color: var(--app-text-color-light);
                    }
    
                    .button--rejected {
                        --paper-button-ink-color: var(--app-status-color-nok);
                        background-color: var(--app-status-color-nok);
                        color: var(--app-text-color-light);
                    }
    
                    .batchNumber{
                        color: var(--app-text-color-light);
                        border-radius: 25px;
                        min-height: 0;
                        margin-left: 8px;
                        font-size: .6em;
                        display: inline-block;
                        padding: 4px 6px;
                        line-height: 0.8;
                        text-align: center;
                        height: 10px;
                        margin-right: 5px;
                    }
                    .batchPending{background-color: var(--paper-orange-400);}
                    .batchToBeCorrected{background-color: var(--paper-red-400);}
                    .batchProcessed{background-color: var(--paper-blue-400);}
                    .batchRejected, .batchRed{background-color: var(--paper-red-400);}
                    .batchAccepted{background-color: var(--paper-green-400);}
                    .batchArchived{background-color: var(--paper-purple-300);}
                    .batchToBeSend{background-color: var(--paper-orange-400);}
                    .batchGreen {background-color: var(--paper-green-400);}
    
                    ht-spinner {
                        margin-top:10px;
                        margin-bottom:10px;
                        height:42px;
                        width:42px;
                    }
    
                    .tool-btn{
                        margin: 0;
                        box-sizing: border-box;
                        --paper-button-ink-color: var(--app-secondary-color-dark);
                        display: inline-block;
                        text-align: center;
                        --paper-button: {
                            background: var(--app-secondary-color);
                            color: var(--app-text-color);
                            width: auto;
                            margin: 0 auto;
                            font-size: 13px;
                            font-weight: 700;
                            padding:10px;
                        };
                    }
    
                    .grid-btn-small {
                        margin: 0;
                        padding:2px 10px;
                        box-sizing: border-box;
                        --paper-button-ink-color: var(--app-secondary-color-dark);
                        display: inline-block;
                        text-align: center;
                        --paper-button: {
                            background: var(--app-secondary-color);
                            color: var(--app-text-color);
                            width: auto;
                            margin: 0 auto;
                            font-size: 12px;
                            font-weight: 400;
                            padding:10px;
                        };
                    }
    
                    .grid-btn-small.noBg {
                        --paper-button-ink-color: var(--app-secondary-color-dark);
                        --paper-button: {
                            background: none;
                        };
                    }
    
                    .noPad {
                        padding:0
                    }
    
                    .grid-btn-small iron-icon {
                        max-width:20px;
                    }
    
                    .tool-btn-previous-month {
                        color:#ffffff;
                        --paper-button: {
                            background: var(--app-text-color);
                            font-weight: 400;
                        };
                    }
    
                    #rightPanel {
                        position: absolute;
                        right: -350px;
                        width:300px;
                        top: 0px;
                        background: rgba(255,255,255,1);
                        border-left:1px solid #dddddd;
                        box-shadow:0px 0px 3px 0px #dddddd;
                        height: 100%;
                        z-index: 5;
                        transition: all 400ms ease;
                        -moz-transition: all 400ms ease;
                        -webkit-transition: all 400ms ease;
                        -o-transition: all 400ms ease;
                        -ms-transition: all 400ms ease;
                    }
    
                    #rightPanel.opened {
                        right:0;
                    }
    
                    .header {
                        padding: 10px;
                        color: #ffffff;
                        text-transform: uppercase;
                        margin: 0;
                        font-weight: 700;
                        background-color: #777777;
                        cursor: pointer;
                    }
    
                    #rightPanel label {
                        margin:0;
                        padding:0;
                    }
    
                    #rightPanel .pullRightIcon {
                        margin:0;
                        padding:0;
                        min-width:1px;
                        float:right;
                    }
    
                    #rightPanel .body {
                        padding: 10px;
                    }
    
                    #rightPanel .body h4 {
                        text-transform: uppercase;
                        margin-bottom: 20px;
                        border-bottom: 1px solid #000000;
                        font-weight: 700;
                        margin-top:12px;
                        padding-bottom:2px;
                    }
    
                    #rightPanelToggleContainer {
                        position:absolute;
                        right:20px;
                        top:10px;
                    }
    
                    #rightPanelToggleContainer .header {
                        margin:0;
                        color:#000000;
                        background-color: initial;
                        padding:0;
                    }
    
                    .w30px {
                        width:30px
                    }
    
                    .h30px {
                        height:30px
                    }
    
                    .w20px {
                        width:20px
                    }
    
                    .h20px {
                        height:20px
                    }
    
                    .p-35px {
                        padding:35px;
                    }
    
                    .p-10px {
                        padding:10px;
                    }
    
                    .p-15px {
                        padding:15px;
                    }
    
                    .p-r-15px {
                        padding-right:15px;
                    }
    
                    .p-l-15px {
                        padding-left:15px;
                    }
    
                    .datePicker {
                        width:95%;
                    }
    
                    .m-t-40 {
                        margin-top:40px;
                    }
    
                    .m-t-50 {
                        margin-top:50px!important;
                    }
    
                    .m-t-20 {
                        margin-top:20px!important;
                    }
    
                    .m-t-25 {
                        margin-top:25px!important;
                    }
    
                    .w-100-pc {
                        width:100%;
                    }
    
                    .fr {
                        float:right
                    }
    
                    .m-t-20 {
                        margin-top:20px;
                    }
    
                    @media screen and (max-width: 1024px) {
                        .hideOnMobile {display: none;opacity: 0;}
                    }
    
                    .warningMessage {
                        margin-top: 20px;
                        margin-bottom: 30px;
                    }
    
                    .warningMessageBody {
                        padding:20px 35px;
                        color:#7E0000;
                        background-color: rgba(255, 0, 0, 0.15);
                        font-weight: 700;
                        border:1px dashed #7e0000;
                        text-transform: uppercase;
                        text-align: center;
                    }
    
                    #loadingContainer, #loadingContainerSmall {
                        position:absolute;
                        width: 100%;
                        height: 100%;
                        top: 0;left: 0;
                        background-color: rgba(0,0,0,.3);
                        z-index: 10;
                        text-align: center;
                    }
    
                    #loadingContentContainer, #loadingContentContainerSmall {
                        position:relative;
                        width: 400px;
                        min-height: 200px;
                        background-color: #ffffff;
                        padding:20px;
                        border:3px solid var(--app-secondary-color);
                        margin:40px auto 0 auto;
                        text-align: center;
                    }
    
                    #loadingContentContainerSmall {
                        width: 80px;
                        padding:10px;
                        border:1px solid var(--app-secondary-color);
                        min-height: 1px;
                    }
    
                    #loadingContent {
                        text-align: left;
                    }
    
                    .loadingIcon {
                        margin-right:5px;
                    }
    
                    .loadingIcon.done {
                        color: var(--paper-green-400);
                    }
    
                    .f-s-1em {
                        font-size:1em;
                    }
    
                    .f-s-08em {
                        font-size:.8em;
                    }
    
                    #exportRangeNotification {
                        font-style:italic;
                        margin-top:10px;
                        color:#555555;
                    }
    
                    #exportRangeNotification span {
                        font-weight: 700;
                    }
    
                    .centerCenter {
                        text-align:center;
                        text-align:center;
                    }
    
                    .bordered {
                        border:1px solid #888888;
                    }
    
                    .textRed {
                        color:#A80000;
                    }
    
                    .textAlignCenter {
                        text-align: center;
                    }
    
                    .onlyIfRejectRate {
                        font-weight: 400;
                        color: #ffb7b7;
                        display:block;
                    }
    
                    .exportMonthPicker {
                        border:1px solid var(--app-secondary-color);
                        padding:0px 0 10px 0;
                        margin:40px auto;
                        max-width:520px;
                        -webkit-box-shadow: 2px 2px 5px 0 rgba(0,0,0,0.2);
                        box-shadow: 2px 2px 5px 0 rgba(0,0,0,0.2);
                    }
    
                    vaadin-combo-box {
                        margin:10px 30px 0 30px;
                        width:130px;
                    }
    
                    .exportMonthPickerTitle {
                        text-transform: uppercase;
                        margin-bottom:20px;
                        padding:10px 0 13px 0;
                        border-bottom:1px solid var(--app-secondary-color);
                        background-color:rgba(255, 80, 0, .2);
                        font-weight: 700;
                    }
    
                    .invoicesGridContainer{
                        margin-top:20px;
                        height: auto;
                        overflow-y: hidden;
                        overflow-x: hidden;
                        box-shadow: var(--app-shadow-elevation-1);
                    }
    
                    .alignRight{
                        float: right;
                        margin-right: 1%;
                    }
    
                    #invoiceDetailHeader {
                        padding:0 10px;
                        min-height:40px;
                    }
    
                    #invoiceDetailHeader h4 {
                        margin:0;
                        padding-top:20px;
                    }
    
                    .actionButtonsRight {
                        float:right;
                        display:flex;
                    }
    
                    .actionButtonsRight iron-icon {
                        max-width:20px;
                        margin-right: 10px;
                    }
    
                    .modalDialog{
                        /*height: 350px;*/
                        /*width: 600px;*/
                    }
    
                    .modalDialogContent{
                        height: 250px;
                        width: auto;
                        margin: 10px;
                    }
    
                    .mr5 {margin-right:5px}
                    .smallIcon { width:16px; height:16px; }
                    .displayNone {
                        display:none!important
                    }
    
                    #largeButton {
                        padding:20px 20px 40px 20px
                    }
    
                    .batchNumberInput {
                        width:50%;
                        margin:0 auto;
                    }                
                
                    
                    #mdaOasContainer {}
                    
                    #mdaOaHeaders {
                        display:flex;
                        justify-content: space-around;
                        background-color: #dddddd;
                        border: 1px solid #666;
                        border-left: 0;
                        border-right: 0;
                        font-weight: 500;
                    }
                                    
                    #mdaOaHeaders > div {
                        padding: 5px 0 5px 0;
                        border-right: 1px solid #666;
                        text-align:center;
                    }
                    
                    .mdaOaContainer {
                        display:flex;
                        justify-content: space-around;
                    }
                    
                    .mdaOaContainer:nth-child(odd) {
                        background-color:#f5f5f5;
                    }                
                    
                    .mdaOaContainer > div {
                        text-align:center;
                        font-size:.9em;
                        border-bottom:1px solid #ddd;
                        padding:5px 0;
                    }
                    
                    .mdaOaContainerCol1 { width:80px; text-transform: uppercase; font-weight:500; }
                    .mdaOaContainerCol2 { width:140px; }
                    .mdaOaContainerCol3 { width:190px; }
                    .mdaOaContainerCol4 { width:210px; }
                    .mdaOaContainerCol5 { flex-grow:1; }
                    .mdaOaContainerCol6 { width:100px; border-right:0!important; }
                    
                    .statusBullet {
                        display:inline-block;
                        width:14px;
                        height:14px;
                        border-radius: 8px;
                        margin-top:3px;
                    }
                    
                    .statusBullet.green {background-color:#66bb6a;/*var(--paper-green-400)*/}
                    .statusBullet.orange {background-color: var(--paper-orange-400);}
                    .statusBullet.red {background-color:#ef5350; /*var(--paper-red-400)*/}
                    
                    #mdaResponseCheckCtas {
                        display:flex;
                        justify-content: space-evenly;
                    }
                    
                    #mdaResponseCheckCtaCountdown {
                        display:flex;
                    }
                    
                    #mdaResponseCheckCtaCountdownText {
                        font-size:.9em;
                        font-style:italic;
                        margin:3px 10px 0 0;
                        font-weight: 700;
                    }
                    
                    .buttonCompact {
                        max-width: 45px;
                        min-width: 0;
                        margin: 0 auto;
                    }
                    
                    #mdaProgressRootLineHeader {
                        margin: 0px auto 20px auto;
                        max-width: 90%;
                        width:940px;
                        position:relative;
                        font-size:1.3em;
                        text-align:center;
                        border: 1px solid #999;
                        background-color: #eee;
                        padding: 5px 0;
                        text-transform: uppercase;
                    }
                    
                    #mdaProgressRootLine {
                        display:flex;
                        justify-content: space-evenly;
                        margin: 0px auto 0 auto;
                        max-width: 90%;
                        width:940px;
                        position:relative;
                    }
                    
                    .rootLineItem {
                        text-align:center;
                        color:var(--app-background-color-darker);
                        width:25%;
                        z-index:2;
                    }
                    
                    .rootLineItem span {
                        display:inline-block;
                        text-align:center;
                        height:30px; 
                        width:30px;
                        border-radius:30px;
                        background-color:#eeeeee;
                        font-size:1.1em;
                        font-weight:500;
                        line-height:30px;
                        border:1px solid #ccc;
                    }
                    
                    .rootLineItem.active {
                        color:var(--app-primary-color-dark);
                    }
                    
                    .rootLineItem.active.done {
                        color:var(--app-primary-color-light);
                    }
                    
                    .rootLineItem.active span {
                        background-color:var(--paper-green-400);
                        color:var(--app-primary-color-dark);
                        border:1px solid #0d3c0f;
                    }  
                      
                    .rootLineItem.active.done span {
                        color:#ffffff;
                        border:1px solid #ccc;
                    }
                    
                    .rootLineItem p {
                        margin:5px 0 0 0;
                        font-size:.9em;
                        font-style:italic;
                    }
                    
                    #mdaProgressRootLineBg {
                        position: absolute;
                        background: #e6e5e5;
                        height: 3px;
                        width: 75%;
                        left: 12%;
                        top: 16px;
                        z-index: 1;
                        background: -moz-linear-gradient(left,  #66bb6a 0%, #e6e5e5 25%);
                        background: -webkit-linear-gradient(left,  #66bb6a 0%,#e6e5e5 25%);
                        background: linear-gradient(to right,  #66bb6a 0%,#e6e5e5 25%);
                    }
                    
                    #mdaProgressRootLineBg.step2 {
                        background: -moz-linear-gradient(left,  #66bb6a 33%, #e6e5e5 50%);
                        background: -webkit-linear-gradient(left,  #66bb6a 33%,#e6e5e5 50%);
                        background: linear-gradient(to right,  #66bb6a 33%,#e6e5e5 50%);
                    }
                                        
                    #mdaProgressRootLineBg.step3 {
                        background: -moz-linear-gradient(left,  #66bb6a 66%, #e6e5e5 75%);
                        background: -webkit-linear-gradient(left,  #66bb6a 66%,#e6e5e5 75%);
                        background: linear-gradient(to right,  #66bb6a 66%,#e6e5e5 75%);
                    }
                                                            
                    #mdaProgressRootLineBg.step4 {
                        background: -moz-linear-gradient(left,  #66bb6a 66%, #e6e5e5 100%);
                        background: -webkit-linear-gradient(left,  #66bb6a 66%,#e6e5e5 100%);
                        background: linear-gradient(to right,  #66bb6a 66%,#e6e5e5 100%);
                    }
                                                                                
                    #mdaProgressRootLineBg.step5 {
                        background: #e6e5e5;
                    }
                    
                    .pageTitle {
                        font-size: 18px;
                        padding-top: 5px;
                        display: flex;
                        flex-flow: row wrap;
                        align-items: center;
                        justify-content: flex-start;
                    }
                    
                    .mdaGridContainer {
                        overflow-y:auto;
                        height:100%;
                    }
                    
                    .mdaBatchNumber {
                        min-width: 40px;
                        height: 26px;
                        line-height: 26px;
                        font-size: 1em;
                        border-radius: 15px;
                        padding: 0 10px;                    
                    }
                    
                    .mdaTabs {
                        box-shadow:var(--app-shadow-elevation-1);
                        background-color:#f5f5f5;
                        margin-top:30px;                    
                    }
                    
                    paper-tab {
                        font-size:1.1em;
                    }
                    
                    paper-tab.dialogTab.iron-selected {
                        background-color:#dddddd;
                    }
                    
                    #mdaSearchEngine {
                        box-shadow:var(--app-shadow-elevation-1);
                        padding:0 10px 10px 10px;                                        
                    }  
                                      
                    #mdaRequestSearchEngineInput {
                        box-shadow:var(--app-shadow-elevation-1);
                        padding:0 10px 10px 10px;
                        margin-top:20px;
                    }
                    
                    #mdaStep4BottomButtons {
                        position: fixed;
                        bottom: 30px;
                        display: flex;
                        justify-content: flex-end;
                    }      
                    
            paper-menu-button {
                padding:0;
            }

            paper-menu-button paper-listbox {
                padding:0!important;
            }

            paper-menu-button paper-listbox paper-item {
                padding:0 8px!important;
                font-size: var(--font-size-normal);
            }   
            
            .container-mdaResponse{
                height: calc(100% - 320px);
                width: 100%;
                margin-top:10px;
            }  
            
            .container-mdaResponse-patientList{
                height: calc(100% - 8px);
                width: 100%;
                overflow: auto;
            }
            
             .table{         
                width: auto;
                height: 100%;
                overflow: auto;
                font-size: var(--font-size-normal);
            }
            
            .tr{
                display: flex;
                height: 22px;               
                border-bottom: 1px solid var(--app-background-color-dark);   
                padding: 4px;                
            }
            
            .th{
                height: auto!important;
                font-weight: bold;
                vertical-align: middle;
            }
            
            .tr-item{
                /*cursor: pointer;*/
            }
            
            .td{
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;                           
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
            
            .fg1{
                flex-grow: 1;
            }
            
            .fg2{
                flex-grow: 2;
            }   
            
            .fg3{
                flex-grow: 3;
            }
            
            .panel-button{
                height: 32px;
                width: auto; 
                padding: 4px; 
                display: flex;
                justify-content: flex-end!important;      
            }
            
            .button{
               display: inline-flex!important;
               align-items: center!important;
            }
            
               .statusIcon.invoice-status--orangeStatus {
                    color: var(--app-status-color-pending);
                }
                .statusIcon.invoice-status--greenStatus {
                    color: var(--app-status-color-ok);
                }
                .statusIcon.invoice-status--blueStatus {
                    color: var(--paper-blue-400);
                }
                .statusIcon.invoice-status--redStatus {
                    color: var(--app-status-color-nok);
                }
                .statusIcon.invoice-status--purpleStatus {
                    color: var(--paper-purple-300);
                }
                .statusIcon.invoice-status--orangeStatus,
                .statusIcon.invoice-status--greenStatus,
                .statusIcon.invoice-status--redStatus,
                .statusIcon.invoice-status--purpleStatus {
                    background: transparent !important;
                }

                *.txtcolor--orangeStatus {
                    color: var(--app-status-color-pending);
                }
                *.txtcolor--greenStatus {
                    color: var(--app-status-color-ok);
                }
                *.txtcolor--blueStatus {
                    color: var(--paper-blue-400);
                }
                *.txtcolor--redStatus {
                    color: var(--app-status-color-nok);
                }
                *.txtcolor--purpleStatus {
                    color: var(--paper-purple-300)
                }
                
                .mda-status--orangeStatus{
                    background: #fcdf354d;
                }
                .mda-status--greenStatus{
                    background: #07f8804d;
                }
                .mda-status--blueStatus {
                    background: #84c8ff;
                }
                .mda-status--redStatus{
                    background: #ff4d4d4d;
                }
                .mda-status--purpleStatus {
                    background: #e1b6e6;
                }
                
                .mda-status {
                    border-radius: 20px;
                    padding: 1px 12px 1px 8px;
                    font-size: 12px;
                    display: block;
                    width: auto;
                    max-width: fit-content;
                    white-space: nowrap;
                    text-overflow: ellipsis;
                    overflow: hidden;
                }
                
                .button-left {
                    position:absolute;
                    top:0;
                    left:0
                }
                
                .mda-summery{
                    height: 40px;
                    width: auto;
                }

        </style>
        
        
        
        <template is="dom-if" if="[[_isLoading]]">
            <div id="loadingContainer">
                <div id="loadingContentContainer">
                    <div style="max-width:80px; margin:0 auto"><ht-spinner class="spinner" alt="Loading..." active></ht-spinner></div>
                    <div id="loadingContent"><p><iron-icon icon="arrow-forward" class="loadingIcon"></iron-icon> [[localize("mhListing.spinner.step_1", language)]]</p></div>
                </div>
            </div>
        </template>
        <template is="dom-if" if="[[_isLoadingSmall]]">
            <div id="loadingContainerSmall">
                <div id="loadingContentContainerSmall">
                    <ht-spinner class="spinner" alt="Loading..." active></ht-spinner>
                    <!--                        <p><iron-icon icon="arrow-forward" class="loadingIcon"></iron-icon> [[localize("pleaseWait", language)]]</p>-->
                </div>
            </div>
        </template>
        
        
        
        <!-- MDA rootline -->
        <template is="dom-if" if="[[_isIn(eInvoicingStep, 'placeMdaRequests\\\\,mdaCheckForResponses\\\\,mdaLastCallResults\\\\,mdaLastCallResultsDetails\\\\,mdaDoInvoicing')]]">
            <div id="mdaProgressRootLineHeader">[[localize("mda","Données du Membre",language)]] - [[_e_getCurrentMonthHr()]] [[_e_getCurrentYear()]]</div>
            <div id="mdaProgressRootLine">
                <div class$="rootLineItem [[_e_isDone(eInvoicingStep, 'placeMdaRequests')]] [[_e_returnValueIfEquals(eInvoicingStep, 'placeMdaRequests', 'active')]]" id="mdaRootLineStep1"><span>1</span><p>[[localize("memberDataRequest","Request sending",language)]]</p></div>
                <div class$="rootLineItem [[_e_isDone(eInvoicingStep, 'mdaCheckForResponses')]] [[_e_returnValueIfEquals(eInvoicingStep, 'mdaCheckForResponses', 'active')]]" id="mdaRootLineStep2"><span>2</span><p>[[localize("requestStatus","Request status",language)]]</p></div>
                <!--<div class$="rootLineItem [[_e_isDone(eInvoicingStep, 'mdaLastCallResults')]] [[_e_returnValueIfEquals(eInvoicingStep, 'mdaLastCallResults', 'active')]]" id="mdaRootLineStep3"><span>3</span><p>[[localize("memberDataResults","Résultats Member Data",language)]]</p></div>-->
                <div class$="rootLineItem [[_e_isDone(eInvoicingStep, 'mdaLastCallResultsDetails')]] [[_e_returnValueIfEquals(eInvoicingStep, 'mdaLastCallResultsDetails', 'active')]]" id="mdaRootLineStep4"><span>3</span><p>[[localize("requestResults","Request results",language)]]</p></div>
                <div class$="rootLineItem [[_e_isDone(eInvoicingStep, 'mdaDoInvoicing')]] [[_e_returnValueIfEquals(eInvoicingStep, 'mdaDoInvoicing', 'active')]]" id="mdaRootLineStep5"><span>4</span><p>[[localize("invoicesCreation","Invoices creation",language)]]</p></div>
                <div id="mdaProgressRootLineBg" class$="step[[_e_getRootLineStep(eInvoicingStep)]]"></div>
            </div>
        </template>



        <!-- MDA place request -->
        <template is="dom-if" if="[[_isEqual(eInvoicingStep, 'placeMdaRequests')]]">
            <div class="textAlignCenter mt70">
                <div class="exportMonthPicker pb20">
                    <div class="exportMonthPickerTitle"><iron-icon icon="icons:verified-user" style="max-width:20px; max-height:20px;"></iron-icon> [[localize('checkMdaData','Vérifier les données du membre',language)]]</div>
                    <p class="mt30 mb10">[[localize('checkMdaData3','Pour la facturation du forfait électronique',language)]]<br /><b>[[_e_getCurrentMonthHr()]] [[_e_getCurrentYear()]]</b></p>
                    <paper-button class="button button--save f-s-1em bordered mt20 pt40 pb40" id="largeButton" on-tap="_e_placeMdaRequests"><iron-icon icon="icons:verified-user" class="w30px h30px"></iron-icon> [[localize('checkMdaData2','Vérifier les données',language)]]</paper-button>
                </div>
            </div>
        </template>
        
        
        
        <!-- MDA pending requests -->
        <template is="dom-if" if="[[_isEqual(eInvoicingStep, 'mdaCheckForResponses')]]" restamp="true">
        
            <div id="mdaRequestSearchEngine"><paper-input label="[[localize('searchPatients','Search for a patient',language)]]" autofocus on-value-changed="_e_mdaRequestSearchForPat" id="mdaRequestSearchEngineInput"><iron-icon icon="accessibility" slot="prefix" style="margin-right:5px"></iron-icon></paper-input></div>
            <div class="mda-summery">
                 <div class="tr tr-group"> 
                    <div class="td fg1">[[localize('mda-sum-pat', 'Total of patient', language)]]: [[_getTotalOfMda(mdaRequestsGridData, 'tot')]]</div>
                    <div class="td fg1">[[localize('mda-sum-resp', 'Total of response', language)]]: [[_getTotalOfMda(mdaRequestsGridData, 'resp')]]</div>
                    <div class="td fg1">[[localize('mda-sum-pend', 'Total of pending', language)]]: [[_getTotalOfMda(mdaRequestsGridData, 'pend')]]</div>
                    <div class="td fg1"></div>
                </div>
            </div>
            <div class="container-mdaResponse">
                <div class="container-mdaResponse-patientList">
                    <div class="tr tr-group">                                    
                         <div class="td fg2">[[localize('mda-async-pat-name', 'Name', language)]]</div>
                         <div class="td fg1">[[localize('ssinPatVerboseShort', 'National registration number', language)]]</div>
                         <div class="td fg1">[[localize('mda-async-io', 'IO', language)]]</div>
                         <div class="td fg1">[[localize('regNrWithMut', 'Io membership', language)]]</div>
                         <!--<div class="td fg1">[[localize('mda-async-verified-period', 'Verified period', language)]]</div>-->
                         <div class="td fg1">[[localize('mda-async-status', 'Status', language)]]</div>
                         <div class="td fg2">[[localize('mda-async-comment', 'Comment', language)]]</div>
                     </div>
                      <template is="dom-repeat" items="[[mdaRequestsGridData]]" as="pat">
                         <div class="tr tr-item" id="[[pat.patientId]]">
                             <div class="td fg2">[[pat.nameHr]]</div>
                             <div class="td fg1">[[_formatSsin(pat.patientSsin)]]</div>
                             <div class="td fg1">[[pat.parentInsuranceCode]]</div>
                             <div class="td fg1">[[pat.patientIdentificationNumber]]</div>
                              <!--<div class="td fg1">[[_formatDate(pat.startDate)]] => [[_formatDate(pat.endDate)]]</div>-->
                             <div class="td fg1"><span class$="mda-status [[_e_getRequestIconStatusClass(pat)]]"><iron-icon icon="vaadin:circle" class$="statusIcon [[_e_getRequestIconStatusClass(pat)]]"></iron-icon> [[_e_getRequestStatusLabel(pat)]]</span></div>
                             <div class="td fg2">[[pat.requestErrorMessage]]</div>
                          </div>
                      </template>
                </div>
               <div class="panel-button">
                   
                   <paper-menu-button class="button-left" horizontal-align="left" dynamic-align="true" vertical-offset="26">
                        <paper-button class="button button--other" slot="dropdown-trigger" alt="menu"><iron-icon icon="icons:info-outline"></iron-icon> [[localize("mh_eInvoicing.technicalDetails","Technical details",language)]]</paper-button>
                        <paper-listbox slot="dropdown-content">
                            <paper-item on-tap="_triggerDownloadCalls" data-request-type="request">[[localize("mh_eInvoicing.downloadRequest","Download request",language)]]</paper-item>
                            <paper-item on-tap="_triggerDownloadCalls" data-request-type="responses">[[localize("mh_eInvoicing.downloadResponses","Download responses",language)]]</paper-item>
                        </paper-listbox>
                    </paper-menu-button>
               
                    <!--Last call for responses > X ago, allow to call again-->
                    <template is="dom-if" if="[[_e_allowForMdaResponsesCheck(mdaRequestsData.lastCheckedSecondsAgo)]]" restamp="true" id="domIfTriggerRefresh1">
                       <paper-button class="button button--save" on-tap="_e_checkForMdaResponses"><iron-icon icon="icons:verified-user"></iron-icon> [[localize('checkMdaData4','Récupérer les données du Membre',language)]]</paper-button>
                    </template>
                        
                    <!--Last call for responses < X ago, do not let call again-->
                    <template is="dom-if" if="[[!_e_allowForMdaResponsesCheck(mdaRequestsData.lastCheckedSecondsAgo)]]" restamp="true" id="domIfTriggerRefresh2">
                       <div id="mdaResponseCheckCtaCountdown">
                          <div id="mdaResponseCheckCtaCountdownText"><iron-icon icon="image:timer" class="mr5"></iron-icon> [[localize('checkMdaData5','Délai avant la prochaine vérification',language)]]: [[mdaRequestsData.timeToWaitBeforeNextCallHr]]</div>
                          <paper-button class="button button--other" on-tap=""><iron-icon icon="icons:block"></iron-icon> [[localize('checkMdaData4','Récupérer les données du Membre',language)]]</paper-button>
                       </div>
                    </template>
                        
                    <!-- Bypass response (only if got checked 1+ times && waiting for next check -->
                    <!-- 20200701 - Do not let user bypass anymore / platform should always answer (even if it won't answer for 1+ pat, it will say so / no facets) -->
<!--                    <template is="dom-if" if="[[mdaRequestsData.everGotChecked]]">-->
<!--                       <template is="dom-if" if="[[!_e_allowForMdaResponsesCheck(mdaRequestsData.lastCheckedSecondsAgo)]]" restamp="true" id="domIfTriggerRefresh3">-->
<!--                          <paper-button class="button button&#45;&#45;save" on-tap="_e_bypassMdaResponses"><iron-icon icon="icons:warning"></iron-icon> [[localize('checkMdaData6','Outrepasser le délai',language)]]</paper-button>-->
<!--                       </template>-->
<!--                    </template>-->
                              
                </div>
            </div>
            
            <!--<div class="textAlignCenter">
                <div class="exportMonthPicker pb20" style="width:90%;max-width:940px;">
                
                    <div class="exportMonthPickerTitle"><iron-icon icon="icons:verified-user" style="max-width:20px; max-height:20px;"></iron-icon> [[localize('checkMdaData','Vérifier les données patient (Member data)',language)]]</div>
                    <p class="mt30 mb30">[[localize('checkMdaData3','Pour la facturation du forfait électronique',language)]] <b>[[_e_getCurrentMonthHr()]] [[_e_getCurrentYear()]]</b></p>
                    
                    <div id="mdaOasContainer">
                        <div id="mdaOaHeaders">                  
                            <div class="mdaOaContainerCol2">[[localize("pat","Patients",language)]] ([[_e_getTotalPatsInAllMessages(mdaRequestsData.messages)]])</div>
                            <div class="mdaOaContainerCol3">[[localize("askedOn","Demandé le", language)]]</div>
                            <div class="mdaOaContainerCol4">[[localize("lastCheckedOn","Dernière vérification le", language)]]</div>
                            <div class="mdaOaContainerCol5">[[localize("answeredOn","Répondu le", language)]]</div>
                            <div class="mdaOaContainerCol6">[[localize("inv_stat","Status", language)]]</div>
                        </div>                            
                        <template is="dom-repeat" items="[[mdaRequestsData.messages]]" as="item" id="domRepeatMdaRequests">
                            <div class="mdaOaContainer">                           
                                <div class="mdaOaContainerCol2">[[item.metas.totalPats]]</div>
                                <div class="mdaOaContainerCol3">[[item.metas.requestDateHr]]</div>
                                <div class="mdaOaContainerCol4">[[item.metas.responseLastCheckDateHr]]</div>
                                <div class="mdaOaContainerCol5">
                                    <template is="dom-if" if="[[item.metas.responseDateHr]]" restamp="true">
                                        <paper-menu-button class="mr5" horizontal-align="left" dynamic-align="true" vertical-offset="26">
                                            <paper-icon-button id="dl-master" class="button&#45;&#45;icon-btn" icon="icons:info-outline" slot="dropdown-trigger" alt="menu"></paper-icon-button>
                                            <paper-listbox slot="dropdown-content">
                                                <paper-item data-oa$="[[item.metas.oa]]" data-download-type="soapRequest" on-tap="_triggerDownloadRequest">[[localize("mh_eInvoicing.soapRequest","soapRequest",language)]]</paper-item>
                                                <paper-item data-oa$="[[item.metas.oa]]" data-download-type="soapResponse" on-tap="_triggerDownloadRequest">[[localize("mh_eInvoicing.soapResponse","soapResponse",language)]]</paper-item>
                                                <paper-item data-oa$="[[item.metas.oa]]" data-download-type="transactionRequest" on-tap="_triggerDownloadRequest">[[localize("mh_eInvoicing.transactionRequest","transactionRequest",language)]]</paper-item>
                                                <paper-item data-oa$="[[item.metas.oa]]" data-download-type="transactionResponse" on-tap="_triggerDownloadRequest">[[localize("mh_eInvoicing.transactionResponse","transactionResponse",language)]]</paper-item>
                                            </paper-listbox>
                                        </paper-menu-button> 
                                    </template>
                                    [[item.metas.responseDateHr]]                                   
                                </div>
                                <div class="mdaOaContainerCol6">
                                    <template is="dom-if" if="[[item.metas.responseMessageId]]"><span class="statusBullet green"></span></template>
                                    <template is="dom-if" if="[[!item.metas.responseMessageId]]"><span class="statusBullet red"></span></template>
                                </div>
                            </div>
                        </template>
                    </div>
                    
                    <div id="mdaResponseCheckCtas">
                        
                        &lt;!&ndash; Last call for responses > X hours ago, allow to call again &ndash;&gt;
                        <template is="dom-if" if="[[_e_allowForMdaResponsesCheck(mdaRequestsData.lastCheckedSecondsAgo)]]" restamp="true" id="domIfTriggerRefresh1">
                            <paper-button class="button button&#45;&#45;save tool-btn f-s-1em bordered mt40 mb15 pt40 pb40" id="largeButton" on-tap="_e_checkForMdaResponses"><iron-icon icon="icons:verified-user" class="w30px h30px"></iron-icon> [[localize('checkMdaData4','Récupérer les réponses auprès des OA',language)]]</paper-button>
                        </template>
                        
                        &lt;!&ndash; Last call for responses < X hours ago, do not let call again &ndash;&gt;
                        <template is="dom-if" if="[[!_e_allowForMdaResponsesCheck(mdaRequestsData.lastCheckedSecondsAgo)]]" restamp="true" id="domIfTriggerRefresh2">
                            <div id="mdaResponseCheckCtaCountdown">
                                <div id="mdaResponseCheckCtaCountdownText">[[localize('checkMdaData5','Délai avant la prochaine vérification',language)]]: [[mdaRequestsData.timeToWaitBeforeNextCallHr]]</div>
                                <paper-button class="button button&#45;&#45;other tool-btn f-s-1em bordered mt40 mb15 pt40 pb40" id="largeButton" on-tap=""><iron-icon icon="icons:block" class="w30px h30px"></iron-icon> [[localize('checkMdaData4','Récupérer les réponses auprès des OA',language)]]</paper-button>
                            </div>
                        </template>
                        
                        &lt;!&ndash; Bypass response (only if got checked 1+ times && waiting for next check &ndash;&gt;
                        <template is="dom-if" if="[[mdaRequestsData.everGotChecked]]">
                            <template is="dom-if" if="[[!_e_allowForMdaResponsesCheck(mdaRequestsData.lastCheckedSecondsAgo)]]" restamp="true" id="domIfTriggerRefresh3">
                                <paper-button class="button button&#45;&#45;save tool-btn f-s-1em bordered mt40 mb15 pt40 pb40" id="largeButton" on-tap="_e_bypassMdaResponses"><iron-icon icon="icons:warning" class="w30px h30px"></iron-icon> [[localize('checkMdaData6','Outrepasser le délai',language)]]</paper-button>
                            </template>                            
                        </template>
                        
                    </div>                            
                    
                </div>
            </div>-->
            
        </template>
        
        
        
        <!-- Not used anymore -->
        <!-- MDA responses = last call's results -->
        <template is="dom-if" if="[[_isEqual(eInvoicingStep, 'mdaLastCallResults')]]">
            <div class="textAlignCenter">
                <div class="exportMonthPicker pb20" style="width:90%;max-width:940px;">
                    <div class="exportMonthPickerTitle"><iron-icon icon="icons:verified-user" style="max-width:20px; max-height:20px;"></iron-icon> Member Data: [[localize('checkMdaData7','Résultat des vérifications auprès des OA',language)]]</div>
                    <p class="mt30 mb30">[[localize('checkMdaData3','Pour la facturation du forfait électronique',language)]] <b>[[_e_getCurrentMonthHr()]] [[_e_getCurrentYear()]]</b></p>
                    <div id="mdaOasContainer">
                        <div id="mdaOaHeaders">
                            <div class="mdaOaContainerCol1">[[localize("inv_oa","OA",language)]]</div>
                            <div class="mdaOaContainerCol5">[[localize("answeredOn","Réponse obtenue le", language)]]</div>
                            <div class="mdaOaContainerCol2">[[localize("pat","Patients", language)]] ([[_e_getTotalPatsInAllMessages(mdaResponsesData.messages)]])</div>
                            <div class="mdaOaContainerCol3">[[localize("validPats","Patients en ordre", language)]] ([[_e_getTotalPatsWithValidInsurabilityInAllMessages(mdaResponsesData.messages)]])</div>
                            <div class="mdaOaContainerCol6">[[localize("details","Détails", language)]]</div>
                        </div>                            
                        <template is="dom-repeat" items="[[mdaResponsesData.messages]]" as="item" id="domRepeatMdaRequestsResults">
                            <div class="mdaOaContainer">
                                <div class="mdaOaContainerCol1">[[item.metas.oa]]</div>
                                <div class="mdaOaContainerCol5">
                                    <template is="dom-if" if="[[item.metas.responseDateHr]]" restamp="true">
                                        <paper-menu-button class="mr5" horizontal-align="left" dynamic-align="true" vertical-offset="26">
                                            <paper-icon-button id="dl-master" class="button--icon-btn" icon="icons:info-outline" slot="dropdown-trigger" alt="menu"></paper-icon-button>
                                            <paper-listbox slot="dropdown-content">
                                                <paper-item data-oa$="[[item.metas.oa]]" data-request-type="response" data-download-type="soapRequest" on-tap="_triggerDownloadRequest">[[localize("mh_eInvoicing.soapRequest","soapRequest",language)]]</paper-item>
                                                <paper-item data-oa$="[[item.metas.oa]]" data-request-type="response" data-download-type="soapResponse" on-tap="_triggerDownloadRequest">[[localize("mh_eInvoicing.soapResponse","soapResponse",language)]]</paper-item>
                                                <paper-item data-oa$="[[item.metas.oa]]" data-request-type="response" data-download-type="transactionRequest" on-tap="_triggerDownloadRequest">[[localize("mh_eInvoicing.transactionRequest","transactionRequest",language)]]</paper-item>
                                                <paper-item data-oa$="[[item.metas.oa]]" data-request-type="response" data-download-type="transactionResponse" on-tap="_triggerDownloadRequest">[[localize("mh_eInvoicing.transactionResponse","transactionResponse",language)]]</paper-item>
                                            </paper-listbox>
                                        </paper-menu-button> 
                                    </template>
                                    [[item.metas.responseDateHr]]
                                </div>
                                <div class="mdaOaContainerCol2 fw500 darkGreen">[[item.metas.totalPats]]</div>
                                <div class$="mdaOaContainerCol3 fw500 [[_e_redOrGreenIfEquals(item.metas.totalPats,item.metas.totalPatsWithValidInsurability)]]">[[item.metas.totalPatsWithValidInsurability]]</div>
                                <div class="mdaOaContainerCol6"><paper-button class="button button--other buttonCompact"on-tap="_e_gotoMdaLastCallResultsDetails"><iron-icon icon="icons:zoom-in" class="w30px h30px"></iron-icon></paper-button></div>
                            </div>
                        </template>
                    </div>                          
                </div>
            </div>
        </template>
        
        
        
        <!-- MDA responses = last call's results details -->
        <template is="dom-if" if="[[_isEqual(eInvoicingStep, 'mdaLastCallResultsDetails')]]">
            
            <paper-tabs selected="[[mdaActiveTab]]" attr-for-selected="name" on-selected-changed="_e_mdaActiveTabChanged" class="mdaTabs">
                <paper-tab class="dialogTab" name="invalidPatients"><span class="batchNumber mdaBatchNumber batchRed">[[mdaTotalInvalidPatients]]</span>[[localize('mh_eInvoicing.nonInvoicablePatients','Patients non-facturables',language)]]</paper-tab>
                <paper-tab class="dialogTab" name="validPatients"><span class="batchNumber mdaBatchNumber batchGreen">[[mdaTotalValidPatients]]</span>[[localize('mh_eInvoicing.invoicablePatients','Patients facturables',language)]]</paper-tab>
            </paper-tabs>
            
            <div id="mdaSearchEngine"><paper-input label="[[localize('searchPatients','Search for a patient',language)]]" autofocus on-value-changed="_e_mdaResponseSearchForPat" id="mdaSearchEngineInput"><iron-icon icon="accessibility" slot="prefix" style="margin-right:5px"></iron-icon></paper-input></div>
            
            <div class="invoicesGridContainer mt0">
                <div class="invoiceContainer mdaResults">
                    <div class="mdaGridContainer">
                        <div class="scrollBox">
                            <vaadin-grid id="mdaResultsDetailsGrid" items="[[mdaResultsGridData]]" class="invoicesToBeCorrectedGrid">
                                
                                <vaadin-grid-column flex-grow="0" width="90px">
                                    <template class="header"><vaadin-grid-sorter path="oa">[[localize('OA','OA',language)]]</vaadin-grid-sorter></template>
                                    <template>[[item.oa]]</template>
                                </vaadin-grid-column>
                                
                                <!--
                                <vaadin-grid-column flex-grow="0" width="140px">
                                    <template class="header"><vaadin-grid-sorter path="verifiedMonthHr">[[localize('verifiedMonth','Verified month',language)]]</vaadin-grid-sorter></template>
                                    <template>[[item.verifiedMonthHr]]</template>
                                </vaadin-grid-column>
                                -->
                                
                                <vaadin-grid-column flex-grow="1">
                                    <template class="header"><vaadin-grid-sorter path="nameHr">[[localize('name','Name',language)]]</vaadin-grid-sorter></template>
                                    <template>[[item.nameHr]]</template>
                                </vaadin-grid-column>
                                
                                <vaadin-grid-column flex-grow="0" width="150px">
                                    <template class="header"><vaadin-grid-sorter path="ssinHr">[[localize('ssin','SSIN',language)]]</vaadin-grid-sorter></template>
                                    <template>[[item.ssinHr]]</template>
                                </vaadin-grid-column>
                                
                                <vaadin-grid-column flex-grow="0" width="160px">
                                    <template class="header"><vaadin-grid-sorter path="patientInsurabilityStatusHr">[[localize('mh_eInvoicing.invoicable','Invoicable',language)]]</vaadin-grid-sorter></template>
                                    <template>
                                        <template is="dom-if" restamp="true" if="[[_isEqual(item.patientInsurabilityStatus,'yes')]]"><span class="statusBullet green"></span></template>
                                        <template is="dom-if" restamp="true" if="[[_isEqual(item.patientInsurabilityStatus,'notVerified')]]"><span class="statusBullet orange"></span></template>
                                        <template is="dom-if" restamp="true" if="[[_isEqual(item.patientInsurabilityStatus,'no')]]"><span class="statusBullet red"></span></template>
                                        &nbsp; [[item.patientInsurabilityStatusHr]]
                                    </template>
                                </vaadin-grid-column>
                                
                                <vaadin-grid-column flex-grow="1">
                                    <template class="header"><vaadin-grid-sorter path="message">[[localize('msg','Message',language)]]</vaadin-grid-sorter></template>
                                    <template>[[item.message]]</template>
                                </vaadin-grid-column>
                                
                                <vaadin-grid-column flex-grow="0" width="320px">
                                    <template>
                                        
                                        <template is="dom-if" restamp="true" if="[[_isEqual(item.patientHasValidInsurabilityBoolean,'false')]]">
                                            <template is="dom-if" restamp="true" if="[[_canFlagAsValid(item)]]">
                                                <paper-button class="button button--other displayInlineFlex" on-tap="_e_mdaFlagPatAs" data-oa$="[[item.oa]]" data-reconcile-key$="[[item.reconcileKey]]" data-action="valid"><iron-icon icon="check-circle"></iron-icon> [[localize("flagAsValid","Flag as valid",language)]]</paper-button>
                                            </template>
                                        </template>
                                        
                                        <!--<template is="dom-if" restamp="true" if="[[_isEqual(item.patientHasValidInsurabilityBoolean,'true')]]">-->
                                            <template is="dom-if" restamp="true" if="[[_isEqual(item.patientForcedAsValid,'true')]]">
                                                <paper-button class="button button--other displayInlineFlex" on-tap="_e_mdaFlagPatAs" data-oa$="[[item.oa]]" data-reconcile-key$="[[item.reconcileKey]]" data-action="invalid"><iron-icon icon="highlight-off"></iron-icon> [[localize("flagAsInValid","Flag as invalid",language)]]</paper-button>
                                            </template>
                                        <!--</template>-->
                                        
                                    </template>
                                </vaadin-grid-column>
                            </vaadin-grid>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="panel-button"><paper-button class="button button--save" on-tap="_e_step4SaveChangesAndGoToStep5"><iron-icon icon="icons:save"></iron-icon> [[localize("saveChangesAndGoToNextStep","Save changes and go to next step",language)]]</paper-button></div>
            
        </template>



        <!-- Medical Houses - Flatrate E-Invoicing -->
        <paper-dialog class="modalDialog" id="mdaRequestsSent" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="icons:verified-user"></iron-icon> Member Data</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="">[[localize('mh_eInvoicing.mda.text1','Merci, votre demande de vérification des données patient est en cours de traitement.',language)]]</p>
                <p class="fw700">[[localize('mh_eInvoicing.mda.text2',"Vous pourrez en consulter les résultats d'ici quatre heure.",language)]]</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other " on-tap="_e_closeMdaRequestsSentDialog"><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>
        


        <!-- Medical Houses - Flatrate MDA calls didn't take place yet (this month) -->
        <paper-dialog class="modalDialog" id="routeGotRewritten" no-cancel-on-outside-click no-cancel-on-esc-key>
            <h2 class="modal-title"><iron-icon icon="vaadin:euro"></iron-icon> [[localize('fac_fla_rat','Facturation au forfait',language)]]</h2>
            <div class="content textaligncenter pt20 pb70 pl20 pr20">
                <p class="">[[localize('mh_eInvoicing.mdaMustRun.text1',"La vérification des données du membre (MDA) n'as pas encore été invoquée ce mois-ci.",language)]]</p>
                <p class="fw700">[[localize('mh_eInvoicing.mdaMustRun.text2',"Veuillez s'il vous plait suivre les instructions à l'écran afin d'y procéder.",language)]]</p>
            </div>
            <div class="buttons">
                <paper-button class="button button--other" dialog-dismiss><iron-icon icon="icons:close"></iron-icon> [[localize('clo','Close',language)]]</paper-button>
            </div>
        </paper-dialog>          
        
        
        
        <ht-pat-flatrate-utils id="flatrateUtils" api="[[api]]" user="[[user]]" language="[[language]]" patient="[[patient]]" i18n="[[i18n]]" i18n="[[i18n]]" resources="[[resources]]" no-print></ht-pat-flatrate-utils>
        
`

    }

    static get is() {
        return 'ht-msg-flatrate-mda'
    }

    static get properties() {
        return {
            api: {
                type: Object,
                value: () => {
                }
            },
            user: {
                type: Object,
                value: () => {
                }
            },
            hcp: {
                type: Object,
                value: () => {
                }
            },
            i18n: {
                type: Object,
                value: () => {}
            },
            language: {
                type: Object,
                value: () => {}
            },
            resources: {
                type: Object,
                value: () => {}
            },
            _isLoading: {
                type: Boolean,
                value: false,
                observer: '_loadingStatusChanged'
            },
            _isLoadingSmall: {
                type: Boolean,
                value: false
            },
            _loadingMessages: {
                type: Array,
                value: () => []
            },
            oaData: {
                type: Array,
                value: () => []
            },
            archiveListingMessages:{
                type:Object,
                value: {}
            },
            downloadFileName: {
                type: String,
                value: ""
            },
            reportCurrentDateMomentObject: {
                type: Object,
                value: moment()
            },
            flatRateInvoicingDataObject: {
                type: Object,
                value: null
            },
            isMessagesLoaded:{
                type: Boolean,
                value: false,
            },
            _isLoadingMessages:{
                type: Boolean,
                value: false,
            },
            invoiceMessageStatuses: {
                type:Object,
                value: () => ({
                    archived:               { status:(1 << 21), menuSection: "j20_archive", llKey:'inv_arch' },
                    error:                  { status:(1 << 17), menuSection: "j20_toBeCorrected", llKey:'inv_err' },
                    partiallyAccepted:      { status:(1 << 16), menuSection: "j20_partiallyAccepted", llKey:'inv_par_acc' },
                    fullyAccepted:          { status:(1 << 15), menuSection: "j20_accept", llKey:'inv_full_acc' },
                    rejected:               { status:(1 << 12), menuSection: "j20_reject", llKey:'inv_rej' },
                    treated:                { status:(1 << 11), menuSection: "", llKey:'inv_tre' },
                    acceptedForTreatment:   { status:(1 << 10), menuSection: "", llKey:'inv_acc_tre' },
                    successfullySentToOA:   { status:(1 << 9),  menuSection: "", llKey:'inv_succ_tra_oa' },
                    pending:                { status:(1 << 8),  menuSection: "j20_process", llKey:'inv_pen' },
                    reset:                  { menuSection: "j20_reset", llKey:'del' }
                })
            },
            cachedDataTTL: {
                type: Number,
                value: 300000
            },
            messagesCachedData: {
                type: Object,
                value: () => ({
                    cachedTstamp: 0,
                    roughData: [],
                    dataByStatus: {},
                    countByStatus: {
                        archived: 0,
                        error: 0,
                        partiallyAccepted: 0,
                        fullyAccepted: 0,
                        rejected: 0,
                        treated: 0,
                        acceptedForTreatment: 0,
                        successfullySentToOA: 0,
                        pending: 0,
                        reset: 0
                    }
                })
            },
            messageDetailsData: {
                type: Object,
                value: null
            },
            messagesGridData: {
                type: Array,
                value: () => []
            },
            messagesGridDataReset: {
                type: Array,
                value: () => []
            },
            flagInvoiceAsLostId: {
                type: String,
                value: ""
            },
            batchExportTstamp: {
                type: String,
                value: ""
            },
            flatRateCheckList: {
                type: Array,
                value: () => []
            },
            tabs: {
                type: Number,
                value: 0
            },
            batchNumber: {
                type: String,
                value: ""
            },
            overrideBatchNumber:{
                type: Boolean,
                value: false
            },
            eInvoicingStep: {
                type: String,
                value: ""
            },
            mdaRequestsData: {
                type: Object,
                value:()=>{}
            },
            minimumSecondsBetweenMdaResponseChecks: {
                type: Number,
                value: 3600
            },
            mdaResultsGridData: {
                type: Array,
                value:()=>[]
            },
            rawMdaResultsGridData: {
                type: Array,
                value:()=>[]
            },
            mdaActiveTab: {
                type: String,
                value:"invalidPatients"
            },
            mdaTotalValidPatients: {
                type:Number,
                value:0
            },
            mdaTotalInvalidPatients: {
                type:Number,
                value:0
            },
            medicalHouseList:{
                type: Array,
                value: () => require('../../../ht-pat/dialogs/mda/rsrc/listOfMedicalHouse.json')
            },
        }
    }

    constructor() {
        super();
    }

    ready() {
        super.ready();
    }

    static get observers() {
        return []
    }

    _loadingStatusChanged() {
        if(!this._isLoading) this._resetLoadingMessage();
    }

    _setLoadingMessage( messageData ) {
        if( messageData.updateLastMessage ) { this._loadingMessages.pop(); }
        this._loadingMessages.push( messageData );
        let loadingContentTarget = this.shadowRoot.querySelectorAll('#loadingContent')[0];
        if(loadingContentTarget) { loadingContentTarget.innerHTML = ''; _.each(this._loadingMessages, (v)=>{ loadingContentTarget.innerHTML += "<p><iron-icon icon='"+v.icon+"' class='"+(v.done?"loadingIcon done":"loadingIcon")+"'></iron-icon>" + v.message + "</p>"; }); }
    }

    _resetLoadingMessage() {
        this._loadingMessages = [];
    }

    _showWarningMessageEarlyInvoicingListing() {
        return parseInt(moment().date()) > 5;
    }

    _showWarningMessageEarlyInvoicingDownload() {
        return parseInt(moment().date()) > 8;
    }

    _startOfPreviousMonth() {
        return moment().subtract(1, 'month').startOf('month').format('DD/MM/YYYY')
    }

    _endOfPreviousMonth() {
        return moment().subtract(1, 'month').endOf('month').format('DD/MM/YYYY')
    }

    _closeDialogs() {
        this.set("_bodyOverlay", false);
        _.map( this.shadowRoot.querySelectorAll('.modalDialog'), i=> i && typeof i.close === "function" && i.close() )
    }

    _isEqual(a,b) {
        b = typeof a !== "boolean" ? b : b === "true"
        return a === b
    }

    _isNotEqual(a,b) {
        b = typeof a !== "boolean" ? b : b === "true"
        return a !== b
    }

    _isIn(needle,haystack) {
        return !!( _.trim(haystack).split(",").indexOf(needle) > -1 );
    }

    _canFlagAsValid(item){
        return _.get(item, "requestErrorMessage", "").toLowerCase().includes("no_facet") ||  !_.get(item, "patientMatchedWithMdaResponse", false)
    }

    _getInsurancesData() {

        this.api.insurance().getInsurances(new models.ListOfIdsDto({ids : _.compact(_.chain(this.flatRateAllPatients).map((i)=>{return (i && !!_.get(i,"finalInsurability",false)) ? _.get(i,"finalInsurability.insuranceId",false) : false }).uniq().value())}))
            .then((ins) => {
                this.oaData = _
                    .chain(ins)
                    .map((i)=>{ i.finalName = (i && i.name && i.name[this.language]) ? i.name[this.language] : i.name[(this.language==='fr' ? 'nl' : 'fr')]; return i; })
                    .sortBy((i)=>{ return _.get(i,"code",""); })
                    .value();
                this._generateJ3FileAndDownload();
            })
            .catch((e)=>{
                console.log('_getInsurancesData',e)
                this.set('_isLoading', false );
            });

    }

    _getInsurancesDataByPatientsList(inputPatientsList) {
        return new Promise(resolve => {
            this.api.insurance().getInsurances(new models.ListOfIdsDto({ids : _.chain(inputPatientsList).map(i=> i.insurabilities.map(ins => _.trim(_.get(ins, "insuranceId")))).flattenDeep().uniq().compact().value()}))
                .then(insurancesData => resolve(
                    _
                        .chain(insurancesData)
                        .map((i)=>{ i.finalName = (i && i.name && i.name[this.language]) ? i.name[this.language] : i.name[(this.language==='fr' ? 'nl' : 'fr')]; return i; })
                        .sortBy((i)=>{ return i.code; })
                        .value()
                ))
        })
    }

    _getInsurancesDataByIds(insurancesIds) {
        return new Promise(resolve => {
            this.api.insurance().getInsurances(new models.ListOfIdsDto({ids : insurancesIds}))
                .then(insurancesData => resolve(
                    _
                        .chain(insurancesData)
                        .map((i)=>{ i.finalName = (i && i.name && i.name[this.language]) ? i.name[this.language] : i.name[(this.language==='fr' ? 'nl' : 'fr')]; return i; })
                        .sortBy((i)=>{ return i.code; })
                        .value()
                ))
        })
    }

    _getInsurancesDataByCode(insurancesCode) {
        return new Promise(resolve => {
            this.api.insurance().listInsurancesByCode(insurancesCode)
                .then(insurancesData => resolve(
                    _
                        .chain(insurancesData)
                        .map((i)=>{ i.finalName = (i && i.name && i.name[this.language]) ? i.name[this.language] : i.name[(this.language==='fr' ? 'nl' : 'fr')]; return i; })
                        .sortBy((i)=>{ return i.code; })
                        .value()
                ))
        })
    }

    _getInsurancesDataByCodes(insurancesCodes) {

        let prom = Promise.resolve([])

        return !_.size(insurancesCodes) ?
            Promise.resolve() :
            Promise.resolve()
                .then(() => {
                    _.map(_.uniq(_.compact(insurancesCodes)), insurancesCode => { prom = prom.then(promisesCarrier => this._getInsurancesDataByCode(_.trim(insurancesCode)).then(ins => _.concat(promisesCarrier, ins)).catch(()=>_.concat(promisesCarrier, null))) })
                    return prom
                })
                .catch(()=>null)

    }

    _getIOsDataByInsurancesList(inputInsurancesList) {

        return new Promise(resolve => {
            this.api.insurance().getInsurances(new models.ListOfIdsDto({ids : _.chain(inputInsurancesList).map(i=>_.trim(_.get(i, "parent"))).uniq().compact().value()}))
                .then(insurancesData => resolve(
                    _
                        .chain(insurancesData)
                        .map((i)=>{ i.finalName = (i && i.name && i.name[this.language]) ? i.name[this.language] : i.name[(this.language==='fr' ? 'nl' : 'fr')]; return i; })
                        .sortBy((i)=>{ return i.code; })
                        .value()
                ))
        })
    }

    _getExportMonthsList() {
        let toReturn = [];
        for(let i=1; i<=12; i++) toReturn.push({id: i, label: this.localize('month_'+i,this.language) })
        return toReturn
    }

    _getExportYearsList() {
        let toReturn = [];
        for(let i=(parseInt(moment().format('YYYY'))+1); i>=(parseInt(moment().format('YYYY'))-2); i--) toReturn.push({id: i, label: i })
        return toReturn
    }

    _getExportCurrentMonth() {
        return parseInt(moment().format('MM'))
    }

    _getExportCurrentYear() {
        return parseInt(moment().format('YYYY'))
    }

    _sleep(time) {
        return new Promise((resolve) => setTimeout(resolve, time));
    }

    getChangeParentCode306(code){
        return code === "306" ? "300" : code;
    }

    cleanNumericalString(str){
        return str.replace(/[^\d]/g, '');
    }

    _getStatusHr(status) {

        return !!(status & (1 << 22)) ? "errorsInPreliminaryControl" :
            !!(status & (1 << 21)) ? "archived" :
                !!(status & (1 << 18)) ? "analyzed" :
                    !!(status & (1 << 17)) ? "error" :
                        !!(status & (1 << 16)) ? "partiallyAccepted" :
                            !!(status & (1 << 15)) ? "fullyAccepted" :
                                !!(status & (1 << 12)) ? "rejected" :
                                    !!(status & (1 << 11)) ? "treated" :
                                        !!(status & (1 << 10)) ? "acceptedForTreatment" :
                                            !!(status & (1 << 9))  ? "successfullySentToOA" :
                                                !!(status & (1 << 8))  ? "pending" :
                                                    !!(status & (1 << 7))  ? "sent" :
                                                        !!(status & (1 << 6))  ? "efact" :
                                                            ""

    }

    openRewriteRouteDialog() {

        return this.shadowRoot.getElementById("routeGotRewritten") && this.shadowRoot.getElementById("routeGotRewritten").open()

    }

    _formatDate(date) {
        return date ? this.api.moment(date).format('DD/MM/YYYY') : null
    }

    _formatSsin(input) {

        return this.api.formatSsinNumber(_.trim(input))

    }










    // ---------------------------- e-Invoicing ----------------------------

    _e_getCurrentMonthHr() {

        return this.localize('month_' + moment().format('M'),this.language)

    }

    _e_getCurrentYear() {

        return moment().format('YYYY');

    }

    _e_redOrGreenIfEquals(a,b) {

        return a===b ? "darkGreen" : "darkRed"

    }

    _e_returnValueIfEquals(a,b,c) {

        return a===b ? c : ""

    }

    _e_mdaCheckForResponsesCountDown() {

        const secondsToWaitBeforeNextCall = parseInt(_.get(this,"mdaRequestsData.nextRequestDate").diff(moment(),"seconds"))||0
        const hmsDurationsToWait = [
            _.trim(parseInt(moment.duration(secondsToWaitBeforeNextCall,"seconds").hours())),
            _.trim(parseInt(moment.duration(secondsToWaitBeforeNextCall,"seconds").minutes())),
            _.trim(parseInt(moment.duration(secondsToWaitBeforeNextCall,"seconds").seconds()))
        ]

        // Stop calling us back when reached zero && trigger interface updates
        if(!parseInt(secondsToWaitBeforeNextCall)||parseInt(secondsToWaitBeforeNextCall)<0) {

            this.set("mdaRequestsData.timeToWaitBeforeNextCallHr","00:00:00")
            this.set("mdaRequestsData.lastCheckedSecondsAgo",(parseInt(_.get(this,"minimumSecondsBetweenMdaResponseChecks",86400))||86400) + 1)

            this.shadowRoot.getElementById("domIfTriggerRefresh1") && this.shadowRoot.getElementById("domIfTriggerRefresh1").render()
            this.shadowRoot.getElementById("domIfTriggerRefresh2") && this.shadowRoot.getElementById("domIfTriggerRefresh2").render()
            this.shadowRoot.getElementById("domIfTriggerRefresh3") && this.shadowRoot.getElementById("domIfTriggerRefresh3").render()

            // Trigger call for responses
            // return _.get(this,"mdaRequestsData.everGotChecked",false) && !this._e_allowForMdaResponsesCheck(_.get(this,"mdaRequestsData.lastCheckedSecondsAgo")) ? this._e_checkForMdaResponses() : null

        }

        this.set("mdaRequestsData.timeToWaitBeforeNextCallHr",(hmsDurationsToWait[0].length===1?"0":"") + hmsDurationsToWait[0]  + ":" + (hmsDurationsToWait[1].length===1?"0":"") + hmsDurationsToWait[1] + ":" + (hmsDurationsToWait[2].length===1?"0":"") + hmsDurationsToWait[2])

        setTimeout(()=>this._e_mdaCheckForResponsesCountDown(),1000)

    }

    _e_closeMdaRequestsSentDialog() {
        this._closeDialogs()
        this._e_loadDataAndGetStep()
    }

    _e_allowForMdaResponsesCheck(elapsedSecondsSinceLastCall) {

        return (parseFloat(elapsedSecondsSinceLastCall)||0) > (parseFloat(this.minimumSecondsBetweenMdaResponseChecks)||86400)

    }

    _e_mdaActiveTabChanged(e) {

        return this._e_gotoMdaTabAndRefreshGrid(_.trim(_.get(e,"detail.value","invalidPatients")))

    }

    _e_gotoMdaTabAndRefreshGrid(tabToGoFor="") {

        const promResolve = Promise.resolve()

        return promResolve
            .then(() => {
                this.set("_isLoading",true)
                this._setLoadingMessage({ message:this.localize('please_wait',this.language), icon:"watch-later", updateLastMessage: true, done:true})
            })
            .then(() => ({
                patientsWithValidIns: _.filter(_.get(this,"rawMdaResultsGridData",[]), it => _.get(it,"patientHasValidInsurabilityBoolean",false)),
                patientsWithInvalidIns: _.filter(_.get(this,"rawMdaResultsGridData",[]), it => !_.get(it,"patientHasValidInsurabilityBoolean",false))
            }))
            .then(({patientsWithValidIns,patientsWithInvalidIns}) => {
                this.set("mdaTotalValidPatients", _.size(patientsWithValidIns))
                this.set("mdaTotalInvalidPatients", _.size(patientsWithInvalidIns))
                this.set("mdaActiveTab", _.trim(tabToGoFor) ? _.trim(tabToGoFor) : !_.size(patientsWithInvalidIns) ? "validPatients" : "invalidPatients")
                this.set("mdaResultsGridData", this.mdaActiveTab==="validPatients" ? patientsWithValidIns : patientsWithInvalidIns)
                this.shadowRoot.querySelector('#mdaResultsDetailsGrid') && this.shadowRoot.querySelector('#mdaResultsDetailsGrid').clearCache()
            })
            .finally(() => this.set("_isLoading",false))

    }

    _e_mdaResponseSearchForPat(e) {

        const promResolve = Promise.resolve()
        const normalizedKeyword = _.trim(_.get(e,"detail.value","")).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"")
        const dataToSearchOn = _.filter(_.get(this,"rawMdaResultsGridData",[]), it => _.trim(_.get(this,"mdaActiveTab","invalidPatients")) === "invalidPatients" ? !_.get(it,"patientHasValidInsurabilityBoolean",false) : _.get(it,"patientHasValidInsurabilityBoolean",false))

        return !_.size(dataToSearchOn) ? promResolve : promResolve
            .then(() => {
                this.set("_isLoading",true)
                this._setLoadingMessage({ message:this.localize('please_wait',this.language), icon:"watch-later", updateLastMessage: true, done:true})
            })
            .then(() => {
                this.set("mdaResultsGridData", _.filter(dataToSearchOn, it => !_.trim(normalizedKeyword) || _.trim(_.get(it,"normalizedSearchTerms")).indexOf(normalizedKeyword) > -1))
                this.shadowRoot.querySelector('#mdaResultsDetailsGrid') && this.shadowRoot.querySelector('#mdaResultsDetailsGrid').clearCache()
            })
            .finally(() => this.set("_isLoading",false))

    }

    _getInvoicesToResendFromPreviousExports(exportedDate) {

        // Check for existing exports - did it run already? - do we have anything to run again for this month?
        //     1. Get existing messages of month we're trying to export
        //     2. No message found -> allow to run. Only of status fullyAccepted / pending -> don't allow to run again. If some of status archived / error / partiallyAccepted / rejected -> allow to run again (after checking invoicingCode booleans).
        //     3. Take & resolve invoiceIds
        //     4. Only keep (old) invoices with a correctiveInvoiceId
        //     5. Resolve corrective invoices & drop already sent ones
        //     6. Filter inv.invoicingCodes based on all bool false but "pending" === true (when BOTH pending & resent are true -> invoice will appear under "Invoices to be corrected" / customer has to flag as being corrected)
        //     7. One+ record found? Export may run again
        return this.api.getRowsUsingPagination(
            (key,docId) =>
                this.api.message().findMessagesByTransportGuid('MH:FLATRATE:INVOICING-FLATFILE', null, key, docId, 1000)
                    .then(pl => { return {
                        rows:_.filter(pl.rows, it => {
                            it.evaluatedStatus = this._getStatusHr(_.get(it,"status",0))
                            return it &&
                                _.get(it,'fromHealthcarePartyId',false)===this.user.healthcarePartyId &&
                                _.get(it, "recipients", []).indexOf(this.user.healthcarePartyId) > -1 &&
                                parseInt(_.get(it,"metas.batchExportTstamp",0)) &&
                                parseInt(_.size(_.get(it,"invoiceIds",[]))) &&
                                (parseInt(_.get(it,"metas.exportedDate","")) === parseInt(exportedDate) || parseInt(_.get(it,"metas.exportedDate","")) < parseInt(exportedDate)) // Either current month Or before, NEVER take resent invoices "in the future"
                        }),
                        nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                        nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                        done: !pl.nextKeyPair
                    }})
                    .catch(()=>{ return Promise.resolve(); })
        ).then(foundMessages=> {

            // Export already ran this month - any message at all?
            if(_.size(_.get(this,"flatRateInvoicingDataObject",{}))) this.flatRateInvoicingDataObject.exportAlreadyRanThisMonth = !!parseInt(_.size(_.filter(foundMessages, m => _.trim(_.get(m,"metas.exportedDate",0)) === _.trim(exportedDate))));

            // Invoices / no invoices to resend
            return !parseInt(_.size(foundMessages)) ? [] :

                // All are pending or fully accepted, nothing to resend
                !parseInt( _.size(_.filter(foundMessages, msg => { return ["archived","error","partiallyAccepted","rejected"].indexOf(msg.evaluatedStatus) > -1 }))) ? [] :

                    this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: _.compact(_.uniq(_.flatMap(_.map(_.filter(foundMessages, msg => { return ["archived","error","partiallyAccepted","rejected"].indexOf(msg.evaluatedStatus) > -1 }), "invoiceIds"))))}))
                        .then(invoicesToBeCorrected => !parseInt(_.size(invoicesToBeCorrected)) ? [] :
                            this.api.invoice().getInvoices(new models.ListOfIdsDto({ids: _.compact(_.uniq(_.map(_.filter(invoicesToBeCorrected, _.trim("correctiveInvoiceId")), "correctiveInvoiceId")))}))
                                .then(correctiveInvoices => !parseInt(_.size(correctiveInvoices)) ? [] :
                                    _.compact(
                                        _.filter(correctiveInvoices, i => !_.trim(_.get(i, "sentDate", ""))).map(inv => {
                                            // Make sure I have to take it into account (all false but the pending bool)
                                            const invoicingCodes = _.get(inv, "invoicingCodes", []);
                                            return !parseInt(_.size(invoicingCodes)) ? false :
                                                _.every(invoicingCodes, ic => {
                                                    return _.get(ic,"accepted",false)===false
                                                        && _.get(ic,"archived",false)===false
                                                        && _.get(ic,"canceled",false)===false
                                                        && _.get(ic,"resent",false)===false
                                                        && _.get(ic,"lost",false)===false
                                                        && _.get(ic,"pending",false)===true
                                                }) ? inv : false
                                        })
                                    )
                                ).catch(e => { console.log("Could not getInvoices (corrective ones) by ", _.compact(_.uniq(_.map(_.filter(invoicesToBeCorrected, _.trim("correctiveInvoiceId")), "correctiveInvoiceId")))); console.log(e); return false; })
                        ).catch(e => { console.log("Could not getInvoices (to be corrected) by ", _.compact(_.uniq(_.flatMap(_.map(foundMessages, "invoiceIds"))))); console.log(e); return false; })
        })

    }

    _getInvoicesToAddFromTimeline(exportedDate) {

        const flatRateUtil = this.$.flatrateUtils;

        // Go for any invoice(s) to be added in the batch (could be manually created using PAT's timeline (timeline && pat-flatrate-utils)
        // For performance purposes, such invoices could be found by scanning for messages with transportGuid "MH:FLATRATE:INVOICE-TO-ADD" (current or previous month allowed, never in the future), then go for the invoiceIds
        return flatRateUtil.getInvoicesToAddFromTimelineByMaxExportDate(parseInt(exportedDate))
            .then(invoicesToAdd => _.map(invoicesToAdd, inv => {
                // Make sure I have to take it into account (all false but the pending bool)
                const invoicingCodes = _.get(inv, "invoicingCodes", []);
                return !parseInt(_.size(invoicingCodes)) ? false :
                    _.every(invoicingCodes, ic => {
                        return _.get(ic,"accepted",false)===false
                            && _.get(ic,"archived",false)===false
                            && _.get(ic,"canceled",false)===false
                            && _.get(ic,"resent",false)===false
                            && _.get(ic,"lost",false)===false
                            && _.get(ic,"pending",false)===true
                    }) ? inv : false
            }))

    }

    _getFlatRateType(nihii) {

        const m = _.size(nihii) === 11 && _.trim(nihii).substr(8, 1) === "1" ? "M" : ""
        const k = _.size(nihii) === 11 && _.trim(nihii).substr(9, 1) === "1" ? "K" : ""
        const i = _.size(nihii) === 11 && _.trim(nihii).substr(10, 1) === "1" ? "I" : ""

        return m + k + i

    }

    _e_mdaRequestSearchForPat(e) {

        const promResolve = Promise.resolve()
        const normalizedKeyword = _.trim(_.get(e,"detail.value","")).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,"")
        const dataToSearchOn = _.get(this,"mdaRequestsData.message.attachment.request",[])

        return !_.size(dataToSearchOn) ? promResolve : promResolve
            .then(() => {
                this.set("_isLoading",true)
                this._setLoadingMessage({ message:this.localize('please_wait',this.language), icon:"watch-later", updateLastMessage: true, done:true})
            })
            .then(() =>  this.set("mdaRequestsGridData", _.filter(dataToSearchOn, it => !_.trim(normalizedKeyword) || _.trim(_.get(it,"normalizedSearchTerms")).indexOf(normalizedKeyword) > -1)) )
            .finally(() => this.set("_isLoading",false))

    }

    _e_getRequestIconStatusClass(pat) {

        return _.get(pat,"requestErrorMessage",false) ? "invoice-status--redStatus" : _.get(pat,"patientMatchedWithMdaResponse",false) ? "invoice-status--greenStatus" : "invoice-status--orangeStatus"

    }

    _e_getRequestStatusLabel(pat) {

        return _.get(pat,"requestErrorMessage",false) ? this.localize("errorInResponse", "Error in response",this.language) : _.get(pat,"patientMatchedWithMdaResponse",false) ? this.localize("responseObtained", "Response obtained",this.language) : this.localize("inv_acc_tre", "Accepted for treatment",this.language)

    }

    _triggerDownloadCalls(e) {

        let zipArchive = new jsZip();
        const promResolve = Promise.resolve()

        const requestType = _.trim(_.get(_.find(_.get(e,"path",[]), nodePath=> !!_.trim(_.get(nodePath,"dataset.requestType",""))), "dataset.requestType"))
        const downloadFileName = moment().format("YYYYMMDD-HHmmss") + "-technicalDetails-" + requestType + ".zip"

        return promResolve
            .then(() => (this.set("_isLoading",true)||true) && this._setLoadingMessage({ message:this.localize('please_wait',this.language), icon:"watch-later", updateLastMessage: true, done:true}))
            .then(() => requestType === "request" ?
                _.map(
                    _.fromPairs([
                        ["soapRequest.xml", _.trim(_.get(this,"mdaRequestsData.message.attachment.response.mycarenetConversation.soapRequest"))],
                        ["soapResponse.xml", _.trim(_.get(this,"mdaRequestsData.message.attachment.response.mycarenetConversation.soapResponse"))],
                        ["transactionRequest.xml", _.trim(_.get(this,"mdaRequestsData.message.attachment.response.mycarenetConversation.transactionRequest"))],
                        ["transactionResponse.xml", _.trim(_.get(this,"mdaRequestsData.message.attachment.response.mycarenetConversation.transactionResponse"))],
                        ["tack.json", _.trim(JSON.stringify(_.get(this,"mdaRequestsData.message.attachment.response.tack")))]
                    ]),
                    (v,k) => zipArchive.file(k, v)
                ) :
                _.map(_.get(this,"mdaResponsesData.messages",[]), responseMessage => _.map(
                    _.fromPairs([
                        ["soapRequest.xml", _.trim(_.get(responseMessage,"attachment.mycarenetConversation.soapRequest"))],
                        ["soapResponse.xml", _.trim(_.get(responseMessage,"attachment.mycarenetConversation.soapResponse"))],
                        ["transactionRequest.xml", _.trim(_.get(responseMessage,"attachment.mycarenetConversation.transactionRequest"))],
                        ["transactionResponse.xml", _.trim(_.get(responseMessage,"attachment.mycarenetConversation.transactionResponse"))],
                        ["memberDataMessageList.json", _.trim(JSON.stringify(_.get(responseMessage,"attachment.memberDataMessageList",[])))],
                        ["acks.json", _.trim(JSON.stringify(_.get(responseMessage,"attachment.acks")))],
                        ["genericErrors.json", _.trim(JSON.stringify(_.get(responseMessage,"attachment.genericErrors")))],
                    ]),
                    (v,k) => zipArchive
                        .folder(_.trim(_.get(responseMessage,"metas.requestDate")).substr(0,8) + "-" + _.trim(_.get(responseMessage,"metas.requestDate")).substr(8,8))
                        .file(k, v)
                ))
            )
            .then(() => zipArchive.generateAsync({ type:"arraybuffer", mimeType: "application/zip", compression: "DEFLATE", compressionOptions: { level: 9 }}))
            .then(zipFile => !zipFile ? null : this.api.triggerFileDownload(zipFile, "application/zip", downloadFileName))
            .finally(() => this.set("_isLoading",false))

    }

    _e_getTotalPatsWithValidInsurabilityInAllMessages(messages) {

        return _
            .chain(messages)
            .map(it => parseInt(_.get(it,"metas.totalPatsWithValidInsurability",0))||0)
            .compact()
            .sum()
            .value()

    }

    _e_getTotalPatsInAllMessages(messages) {

        return _
            .chain(messages)
            .map(it => parseInt(_.get(it,"metas.totalPats",0))||0)
            .compact()
            .sum()
            .value()

    }

    _e_missingMdaRequestsResponses() {

        // const requestsOriginalMessages = _.get(this,"mdaRequestsData.originalMessages");
        // return !_.size(requestsOriginalMessages) ||
        //     _.some(requestsOriginalMessages, it => !_.trim(_.get(it,"metas.responseMessageId")) && !parseInt(_.get(it,"metas.overriddenByUserDate"))) ||
        //     (_.some(requestsOriginalMessages, it => _.trim(_.get(it,"metas.responseMessageId"))) && !_.size(_.get(this,"mdaResponsesData.originalMessages")))

        const requestsOriginalMessage = _.get(this,"mdaRequestsData.originalMessage");
        return !_.size(requestsOriginalMessage) ||
            (!_.trim(_.get(requestsOriginalMessage,"metas.responseMessageIds")) && !parseInt(_.get(requestsOriginalMessage,"metas.overriddenByUserDate"))) ||
            (_.trim(_.get(requestsOriginalMessage,"metas.responseMessageIds")) && !_.size(_.get(this,"mdaResponsesData.originalMessage")))

    }

    _e_isDone(a,b) {

        // Steps:
        //     placeMdaRequests
        //     mdaCheckForResponses
        //     mdaLastCallResults
        //     mdaLastCallResultsDetails
        //     mdaDoInvoicing

        return b==="placeMdaRequests" && b!==a ? "active done" :
            b==="mdaCheckForResponses" && ["mdaLastCallResults","mdaLastCallResultsDetails","mdaDoInvoicing"].indexOf(a)>-1 ? "active done" :
            b==="mdaLastCallResults" && ["mdaLastCallResults","mdaLastCallResultsDetails","mdaDoInvoicing"].indexOf(a)>-1 && a===b ? "active" :
            b==="mdaLastCallResults" && ["mdaLastCallResults","mdaLastCallResultsDetails","mdaDoInvoicing"].indexOf(a)>-1 ? "active done" :
            b==="mdaLastCallResultsDetails" && ["mdaDoInvoicing"].indexOf(a)>-1 ? "active done" :
            ""

    }

    _e_getRootLineStep(a) {

        // Steps:
        //     placeMdaRequests
        //     mdaCheckForResponses
        //     mdaLastCallResults
        //     mdaLastCallResultsDetails
        //     mdaDoInvoicing

        return a==="placeMdaRequests" ? 1 :
            a==="mdaCheckForResponses" ? 2 :
            a==="mdaLastCallResults" ? 3 :
            a==="mdaLastCallResultsDetails" ? 4 :
            a==="mdaDoInvoicing" ? 5 :
            ""

    }

    _e_mdaFlagPatAs(e) {

        const promResolve = Promise.resolve()
        const dataset = _.get(_.find(_.get(e,"path",[]), it => _.trim(_.get(it,"nodeName"))==="PAPER-BUTTON"),"dataset",{})
        const action = _.trim(_.get(dataset,"action"))
        const reconcileKey = _.trim(_.head(_.trim(_.get(dataset,"reconcileKey")).split("_")))

        // return !oa || !action || !reconcileKey ? promResolve : promResolve
        return !action || !reconcileKey ? promResolve : promResolve
            .then(() => this.set('_isLoading', true ))
            .then(() => this._setLoadingMessage({ message:this.localize('please_wait',this.language), icon:"watch-later", updateLastMessage: true, done:true}))
            .then(() => _.assign(_.find(_.get(this,"mdaRequestsData.message.attachment.request",[]), it => _.trim(_.head(_.trim(_.get(it,"reconcileKey")).split("_"))) === reconcileKey), {patientForcedAsValid:action==="valid"}))
            .then(() => this._e_gotoMdaLastCallResultsDetails(null,_.get(this,"mdaActiveTab", "invalidPatients")))
            .finally(() => this.set("_isLoading",false))

    }

    _getTotalOfMda(mdaRequestsGridData, type) {
        return type === "tot" ? _.size(mdaRequestsGridData) :
            type === "resp" ? _.size(mdaRequestsGridData.filter(req => _.get(req, 'patientMatchedWithMdaResponse', false) === true)) :
                type === "pend" ? _.size(mdaRequestsGridData) - _.size(mdaRequestsGridData.filter(req => _.get(req, 'patientMatchedWithMdaResponse', false) === true)) : null
    }










    // ---------------------------- e-Invoicing - qry methods ----------------------------

    _e_getPatAndInsOutOfInvoicesToResend(invoicesToResend) {

        return Promise.all(invoicesToResend.map(inv => this.api.crypto().extractCryptedFKs(inv, this.user.healthcarePartyId).then(ids => [inv, ids.extractedKeys[0]]).catch(e=>{console.log(e); console.log("Could not extractCryptedFKs for invoices to resend");})))
            .then(invAndIdsPat => this.api.patient().getPatientsWithUser(this.user,new models.ListOfIdsDto({ids: _.uniq(invAndIdsPat.map(x => x[1]))})).then(pats => invAndIdsPat.map(it => [it[0], pats.find(p => p.id === it[1])])).catch(e=>{console.log(e); console.log("Could not get getPatientsWithUser for invoices to resend");}))
            .then(invoicesAndPatient => _
                .chain(invoicesAndPatient)
                .map(invAndPat => {
                    let tempPat = _.cloneDeep(invAndPat[1]);
                    const momentInvoiceDate = moment(_.trim(_.get(invAndPat,"[0].invoiceDate",0)),"YYYYMMDD")
                    tempPat.invoiceToBeResent = _.get(_.cloneDeep(invAndPat),"[0]",{});
                    tempPat.ssin = _.trim(_.get(tempPat,"ssin","")).replace(/[^\d]/gmi,"");
                    tempPat.lastName = (_.get(tempPat,"lastName","")).toUpperCase()
                    tempPat.firstName = (_.get(tempPat,"firstName","")).toUpperCase()
                    tempPat.dateOfBirth = (!!_.trim(_.get(tempPat,"dateOfBirth",""))?moment(_.trim(_.get(tempPat,"dateOfBirth",0)), "YYYYMMDD").format('DD/MM/YYYY'):"")
                    tempPat.finalInsurability = _.find(tempPat.insurabilities,ins =>_.size(ins) &&
                        _.trim(_.get( ins, "insuranceId", "" )) &&
                        _.trim(_.get(ins, "parameters.tc1", "")).length === 3 &&
                        _.trim(_.get(ins, "parameters.tc2", "")).length === 3 &&
                        ( _.trim(_.get(ins, "parameters.tc1", "")) + _.trim(_.get(ins, "parameters.tc2", "")) !== "000000" ) &&
                        (moment(_.get(ins, "startDate"+"", 0), 'YYYYMMDD').isBefore(momentInvoiceDate) || moment(_.get(ins, "startDate"+"", 0), 'YYYYMMDD').isSame(momentInvoiceDate) || !parseInt(_.get(ins, "startDate", 0))) &&
                        (moment(_.get(ins, "endDate"+"", 0), 'YYYYMMDD').isAfter(momentInvoiceDate) || moment(_.get(ins, "endDate"+"", 0), 'YYYYMMDD').isSame(momentInvoiceDate) || !parseInt(_.get(ins, "endDate", 0)))
                    )
                    // Make sure patient has a valid INS ("finalInsurability" corresponds to invoice date) for that invoice, otherwise drop (invoice can't be resent when it has nos valid insurance to related to)
                    return !_.trim(_.get(tempPat,"finalInsurability.insuranceId")) ? false : tempPat
                })
                .compact()
                .value()
            )

    }

    _e_getPatients(exportedDate) {

        const momentExportedDate = moment(_.trim(exportedDate),"YYYYMMDD")

        return this.api.getRowsUsingPagination(
            (key,docId) => this.api.patient().listPatientsByHcPartyWithUser(this.user, this.user.healthcarePartyId, null, key && JSON.stringify(key), docId, 1000)
                .then(pl => {
                    pl.rows = _
                        .chain(pl.rows)
                        .filter(it => _.get(it,"active", true) &&

                            // 20200601 - Not for electronic invoicing anymore
                            // _.trim(_.get(it,"dateOfBirth", "")) &&

                            // 20200601 - Not for electronic invoicing anymore
                            // _.size(_.get(it,"insurabilities", [])) &&

                            _.some(_.get(it, "medicalHouseContracts",[]), mhc => _.trim(_.get(mhc,"hcpId")) === _.trim(this.user.healthcarePartyId) && _.trim(_.get(mhc,"contractId"))) &&
                            // Either alive or died "this" month -> still take into account if so
                            (!parseInt(_.get(it, "dateOfDeath", 0)) || (parseInt(_.get(it, "dateOfDeath", 0)) && moment( _.get(it, "dateOfDeath", 0), 'YYYYMMDD').startOf('month').add(1,"month").isAfter(momentExportedDate.startOf('month')))) &&
                            _.size(_.get(it, "medicalHouseContracts", []))
                        )
                        .map(it => {
                            it.ssin = _.trim(_.get(it,"ssin","")).replace(/[^\d]/gmi,"")
                            it.lastName = (_.get(it,"lastName",""))
                            it.firstName = (_.get(it,"firstName",""))
                            it.dateOfBirth = (!!_.trim(_.get(it,"dateOfBirth",""))?moment(_.trim(_.get(it,"dateOfBirth",0)), "YYYYMMDD").format('DD/MM/YYYY'):"")
                            it.finalInsurability = _.find(it.insurabilities, ins => _.size(ins) &&
                                _.trim(_.get( ins, "insuranceId", "" )) &&
                                _.trim(_.get(ins, "parameters.tc1", "")).length === 3 &&
                                _.trim(_.get(ins, "parameters.tc2", "")).length === 3 &&
                                ( _.trim(_.get(ins, "parameters.tc1", "")) + _.trim(_.get(ins, "parameters.tc2", "")) !== "000000" ) &&
                                (moment(_.get(ins, "startDate"+"", 0), 'YYYYMMDD').isBefore(momentExportedDate, 'date') ||  moment(_.get(ins, "startDate"+"", 0), 'YYYYMMDD').isSame(momentExportedDate, 'date') || !parseInt(_.get(ins, "startDate", 0))) &&
                                (moment(_.get(ins, "endDate"+"", 0), 'YYYYMMDD').isAfter(momentExportedDate, 'date') || moment(_.get(ins, "endDate"+"", 0), 'YYYYMMDD').isSame(momentExportedDate, 'date') || !parseInt(_.get(ins, "endDate", 0)))
                            )
                            it.latestInsurability = _
                                .chain(it.insurabilities)
                                .filter(ins => _.size(ins) &&
                                    _.trim(_.get( ins, "insuranceId", "" )) &&
                                    _.trim(_.get(ins, "parameters.tc1", "")).length === 3 &&
                                    _.trim(_.get(ins, "parameters.tc2", "")).length === 3 &&
                                    ( _.trim(_.get(ins, "parameters.tc1", "")) + _.trim(_.get(ins, "parameters.tc2", "")) !== "000000" )
                                )
                                .orderBy(["startDate"],["desc"])
                                .head()
                                .value()
                            it.insurancePersonType = !_.trim(_.get(it,"finalInsurability.titularyId","")) ? "T" : (momentExportedDate.diff(moment(_.get(it,"dateOfBirth"+"","0")+"", "DD/MM/YYYY"), 'years') < 18) ? "E" : "C"
                            it.titularyId = _.trim(_.get(it,"finalInsurability.titularyId",""))
                            it.finalMedicalHouseContracts = _
                                .chain(_.get(it, "medicalHouseContracts", []))
                                .filter(mhc => mhc &&
                                    (mhc.kine || mhc.gp || mhc.nurse) &&
                                    _.trim(_.get(mhc,"hcpId", null)) === _.trim(this.user.healthcarePartyId) &&
                                    _.trim(_.get(mhc,"contractId")) &&
                                    // 20200601 - Not for electronic invoicing anymore
                                    // _.get(mhc,"startOfContract") &&
                                    !_.get(mhc,"forcedSuspension", false) &&

                                    // Has to begin in the past
                                    // 20200601 - Not for electronic invoicing anymore
                                    // moment(_.trim(_.get(mhc,"startOfContract")), "YYYYMMDD").startOf('month').isBefore(momentExportedDate) &&

                                    // Either end of contract is in the future or is not set
                                    // 20200601 - Not for electronic invoicing anymore
                                    // (moment(_.trim(_.get(mhc,"endOfContract","0")), "YYYYMMDD").endOf('month').isAfter(momentExportedDate) || !parseInt(_.get(mhc,"endOfContract",0))) &&
                                    (moment(_.trim(_.get(mhc,"endOfCoverage","0")), "YYYYMMDD").endOf('month').isAfter(momentExportedDate) || !parseInt(_.get(mhc,"endOfCoverage",0))) &&

                                    // Either start of coverage is before this month AND set OR Start of coverage isn't set and start of contract is two month in the past (start of coverage = start of contract + 1 month when no trial period)
                                    // 20200601 - Not for electronic invoicing anymore --> just check on startOfCoverage
                                    // (
                                    //     (parseInt(_.get(mhc,"startOfCoverage",0)) && moment(_.trim(_.get(mhc, "startOfCoverage", "0")), "YYYYMMDD").endOf('month').isBefore(momentExportedDate)) ||
                                    //     (!parseInt(_.get(mhc,"startOfCoverage",0)) && moment(_.trim(_.get(_.cloneDeep(mhc), "startOfContract", 0)), "YYYYMMDD").startOf('month').add(1, 'months').isBefore(momentExportedDate))
                                    // ) &&

                                    // 1. My "startOfCoverage" is 20200531 -> can I be invoiced in JUNE 2020 ? ==> Yes
                                    // 2. My "startOfCoverage" is 20200601 -> can I be invoiced in JUNE 2020 ? ==> Yes
                                    // 3. My "startOfCoverage" is 20200602 -> can I be invoiced in JUNE 2020 ? ==> No
                                    (moment(_.trim(_.get(mhc, "startOfCoverage", "0")), "YYYYMMDD").startOf('month').isBefore(momentExportedDate) || _.trim(exportedDate) === _.trim(_.get(mhc, "startOfCoverage", "0"))) &&

                                    // Either no startOfSuspension (we ignore suspensions that only have endOfSuspension as they are incomplete data)
                                    // OR the exportDate is before startOfSuspension
                                    // OR the exportDate is after endOfSuspension
                                    (
                                        (parseInt(_.get(mhc,"startOfSuspension",-1)) < 0) ||
                                        (parseInt(_.get(mhc,"startOfSuspension",0)) && moment(_.trim(_.get(mhc, "startOfSuspension", "0")), "YYYYMMDD").isAfter(momentExportedDate)) ||
                                        (parseInt(_.get(mhc,"endOfSuspension",0)) && moment(_.trim(_.get(mhc, "endOfSuspension", 0)), "YYYYMMDD").isBefore(momentExportedDate))
                                    )
                                )
                                .orderBy(["startOfCoverage"],["desc"])
                                .head()
                                .value()

                            // Make sure it exists or set to default = startOfContract + 1 month
                            // 20200601 - Not for electronic invoicing anymore
                            // _.assign(it.finalMedicalHouseContracts, {startOfCoverage: (parseInt(_.trim(_.get(it,"finalMedicalHouseContracts.startOfCoverage")))||0) ? parseInt(_.trim(_.get(it,"finalMedicalHouseContracts.startOfCoverage"))) : parseInt(moment(_.trim(_.get(_.cloneDeep(it), "finalMedicalHouseContracts.startOfContract")), "YYYYMMDD").startOf('month').add(1, 'months').format("YYYYMMDD")) })

                            // If no valid INS could be found matching export dates, take the most recent INS ID
                            if(!_.trim(_.get(it,"finalInsurability.insuranceId"))) _.merge(it,{finalInsurability:{insuranceId:_.get(it, "latestInsurability.insuranceId")}})

                            // MUST have an insurance id (valid or expired) and a MHC that belongs to me
                            return !_.trim(_.get(it,"finalInsurability.insuranceId")) || !_.trim(_.get(it,"finalMedicalHouseContracts.hcpId",null)) ? false : it
                        })
                        .compact()
                        .value()
                    return {rows:pl.rows, nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey, nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId, done: !pl.nextKeyPair}
                })
                .catch(() => Promise.resolve([]))
        )
            .then(pats => _.orderBy(pats,["lastName","firstName"],["asc","asc"]))
            .catch(() => Promise.resolve([]))

    }

    _e_getPatientsEligibleForExport(exportedDate) {

        const promResolve = Promise.resolve();

        return promResolve

            // 1 - Get invoices to add from previous exports ("rejected" then flagged as "corrected" invoices)
            .then(() => this._getInvoicesToResendFromPreviousExports(exportedDate))

            // 2 - Get invoices to add from timeline
            .then(invoicesToResendFromPreviousExports => this._getInvoicesToAddFromTimeline(exportedDate).then(invoicesToAddFromTimeline => _.concat((invoicesToAddFromTimeline||[]),(invoicesToResendFromPreviousExports||[]))))

            // 3 - If any invoices (either corrected or from timeline) -> get pat it is linked to
            .then(invoicesToResend => !_.size(invoicesToResend) ? Promise.resolve([]) : this._e_getPatAndInsOutOfInvoicesToResend(invoicesToResend))

            // 4 - Get all patients
            .then(patsToResend => {
                return this._e_getPatients(exportedDate).then(myPatients => _
                    .chain(_.concat((myPatients||[]),(patsToResend||[])))
                    .map(it => { return {
                        patientId: _.trim(_.get(it,"id")),
                        patientSsin: _.trim(_.get(it,"ssin")).replace(/[^\d]/gmi,""),
                        nameHr: _.trim(_.get(it,"lastName","")) + " " + _.trim(_.get(it,"firstName","")),
                        insuranceId: _.trim(_.get(it, "finalInsurability.insuranceId")),
                        patientIdentificationNumber: _.trim(_.get(it, "finalInsurability.identificationNumber")),
                        startDate: parseInt(moment(_.trim((parseInt(_.get(it, "invoiceToBeResent.invoiceDate",0))||0) ? parseInt(_.get(it, "invoiceToBeResent.invoiceDate",0)) : parseInt(exportedDate)),"YYYYMMDD").subtract(1, 'months').format("YYYYMMDD")), // Always one month before
                        reconcileKey: _.trim(_.get(it,"id")) + "_" + this.api.crypto().randomUuid()
                    }})
                    .map(it => _.assign(it, {endDate: parseInt(moment(_.get(_.cloneDeep(it),"startDate"),"YYYYMMDD").add(1, 'months').format("YYYYMMDD"))}))
                    .filter(it => (_.trim(it.patientSsin) && this.api.patient().isValidSsin(_.trim(it.patientSsin))) || _.trim(it.patientIdentificationNumber))
                    .orderBy(["patientSsin","patientId", "startDate"], ["asc","asc","desc"])
                    .value()
                )
            })

    }

    _e_getAsyncMemberDataResponse_v1(oa, mdaInputReference) {

        const promResolve = Promise.resolve();

        return promResolve
            .then(()=>this._sleep(500)) // Pretend call happened for the moment
            .then(() => _
                .chain(this.mdaRequestsData.message)
                .cloneDeep()
                .map(it => {return {
                    oa:_.get(it,"metas.oa"),
                    mdaInputReference: this.api.crypto().randomUuid(), // This should come from OA = the RESPONSE inputReference
                    patients: _.map(_.get(it,"attachment.request"), pats => _.omit(pats,["patientId","insuranceCode","nameHr"])).map(pat => {pat.mdaResponsePatientHasValidInsAndMhc=!!(Math.floor(Math.random() * 10)%2); return pat;})
                }})
                .find(it => it.oa === _.trim(oa))
                .value()
            )
            .catch(()=>null)

    }

    _e_getAsyncMemberDataRequest(requestedData) {

        const promResolve = Promise.resolve();

        return !_.size(requestedData) ? promResolve : this.api.fhc().MemberDataController().sendMemberDataRequestAsyncUsingPOST(
            _.trim(_.get(this,"api.tokenIdMH")),
            _.trim(_.get(this,"api.keystoreId")),
            _.trim(_.get(this,"api.credentials.ehpassword")),
            _.trim(_.get(this,"hcp.nihii")),
            _.trim(_.get(this,"hcp.name")) ? _.trim(_.get(this,"hcp.name")) : _.trim(_.get(this,"hcp.lastName")),
            {members:_.compact(_.map(requestedData, it => _.merge({},{
                    hospitalized:false,
                    ssin: _.get(it,"patientSsin", null) ? _.trim(_.get(it,"patientSsin", null)) : null,
                    io: _.trim(_.get(it,"patientSsin", null)) ? null : _.trim(_.get(it,"parentInsuranceCode")),
                    ioMembership: _.trim(_.get(it,"patientSsin", null)) ? null : _.trim(_.get(it,"patientIdentificationNumber", null)),
                    uniqId: _.trim(_.get(it, 'reconcileKey'))
                })))},
            "medicalhouse",
            moment().startOf("month").subtract(24, 'months').valueOf(),
            moment().startOf("month").endOf("month").valueOf(),
            false,
            "information"
        )
            .then(mdaResponse => !_.get(mdaResponse, "result",false) || !_.trim(_.get(mdaResponse, "tack.reference")) ? null : _.assign({}, {
                message: mdaResponse,
                mdaInputReference: _.trim(_.get(mdaResponse, "tack.reference")),
            }))
            .catch(e=>null)

    }

    _e_placeMdaRequests() {

        const promResolve = Promise.resolve()
        const flatRateUtil = this.$.flatrateUtils
        const exportedDate = _.trim(moment().format("YYYYMM") + "01")

        return promResolve
            .then(() => {
                this.set('_isLoading', true )
                this.api.setPreventLogging()
                this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
                this._setLoadingMessage({ message:this.localize('mh_eInvoicing.mda.step_2',this.language), icon:"arrow-forward"})
            })

            // 1 - Get invoices to add from previous exports ("rejected" then flagged as "corrected" invoices)
            // 2 - Get invoices to add from timeline
            // 3 - If any invoices (either corrected or from timeline) -> get pat it is linked to
            // 4 - Get all patients of mine
            // .then(() => this._e_getPatientsEligibleForExport(exportedDate))

            // Get all patients of mine, valid for MDA request
            // 1. Has to be active
            // 2. Has to be alive (not deceased before exportedDate)
            // 3. 1+ mhc.contractId (expired or not)
            // 4. Either a valid SSIN [OR] 1+ ins.IndetificationNumber && insuranceId (expired or not, most recent if 1+)
            .then(() => flatRateUtil.getPatientsEligibleForMdaRequestByExportedDate(exportedDate))

            // 5 - Hack for INS 306 -> has to be seen as a child of 300
            .then(pats => this._getInsurancesDataByCode(300).then(ins300 => [pats,_.head(ins300)]))

            // 6 - Resolve insurances
            .then(([pats,ins300]) => {
                this._setLoadingMessage({ message:this.localize('mh_eInvoicing.mda.step_2_done',this.language), icon:"check-circle", updateLastMessage: true, done:true})
                this._setLoadingMessage({ message:this.localize('mh_eInvoicing.mda.step_3',this.language), icon:"arrow-forward"})
                return this._getInsurancesDataByIds(_.uniq(_.compact(_.map(pats, "insuranceId")))).then(insurances => _.map(pats, it => _.assign(it, {
                    parentInsuranceId: _.trim(_.get(_.find(insurances, {id:it.insuranceId}),"code")) === "306" ? _.get(ins300, "id") : _.trim(_.get(_.find(insurances, {id:it.insuranceId}),"parent")),
                    insuranceCode: _.trim(_.get(_.find(insurances, {id:it.insuranceId}),"code"))
                })))
            })

            // 7 - Resolve OAs
            .then(pats => this._getInsurancesDataByIds(_.uniq(_.map(pats, "parentInsuranceId"))).then(insurances => _.map(pats, it => _.assign(it, {parentInsuranceCode:_.trim(_.get(_.find(insurances, {id:it.parentInsuranceId}),"code"))}))))

            // 8 - Save MDA request
            .then(pats => !_.size(pats) ? promResolve : promResolve.then(() => {

                this._setLoadingMessage({ message:this.localize('mh_eInvoicing.mda.step_3_done',this.language), icon:"check-circle", updateLastMessage: true, done:true})
                this._setLoadingMessage({ message:this.localize('mh_eInvoicing.mda.step_4',this.language), icon:"arrow-forward"})

                return this.api.message().newInstance(this.user)
                    .then(newMessageInstance => retry.retry(() => (this.api.message().createMessage(_.merge(newMessageInstance, {
                        transportGuid: "MH:FLATRATE-MDA-REQUEST:" + exportedDate,
                        recipientsType: "org.taktik.icure.entities.HealthcareParty",
                        recipients: [this.user.healthcarePartyId],
                        toAddresses: [this.user.healthcarePartyId],
                        metas: {
                            requestDate: moment().format("YYYYMMDDHHmmss"),
                            requestedDate: exportedDate,
                            mdaInputReference: "",
                            responseMessageIds: "",
                            responseDate: "",
                            responseLastCheckDate: "",
                            totalPats: _.size(pats),
                            overriddenByUserDate: 0
                        },
                        status: _.get(this,"invoiceMessageStatuses.pending.status",(1 << 8)),
                        subject: "MH:FLATRATE-MDA-REQUEST:" + exportedDate
                    }))), 4, 1000, 1.5))
                    .then(createdMessage => this.api.document().newInstance(this.user, createdMessage, {documentType: 'report', mainUti: this.api.document().uti("application/javascript"), name: _.trim(_.get(createdMessage,"subject"))+".json"}).then(newDocumentInstance=>([createdMessage,newDocumentInstance])))
                    .then(([createdMessage,newDocumentInstance]) => retry.retry(() => (this.api.document().createDocument(newDocumentInstance).then(createdDocument=>([createdMessage,createdDocument]))), 4, 1000, 1.5))
                    .then(([createdMessage,createdDocument]) => this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId,createdDocument.id,_.size(_.get(createdDocument,"encryptionKeys",{})) ? createdDocument.encryptionKeys : _.get(createdDocument,"delegations",{})).then(({extractedKeys})=>([createdMessage,createdDocument,extractedKeys])))
                    .then(([createdMessage,createdDocument,edKeys]) => retry.retry(() => (this.api.document().setDocumentAttachment(createdDocument.id,(edKeys||[]).join(','), this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.utf82ua(JSON.stringify({request:pats})))).then(()=>_.merge(createdMessage,{documentId:_.trim(_.get(createdDocument,"id")), edKeys:edKeys, attachmentContent:{request:pats}}))), 4, 1000, 1.5))
                    .then(createdMessage => this._sleep(200).then(()=>[pats,createdMessage])) // Cool down

            }))

            // 9 - Make MDA request
            .then(([pats,createdMessage]) => {

                this._setLoadingMessage({ message:this.localize('mh_eInvoicing.mda.step_4_done',this.language), icon:"check-circle", updateLastMessage: true, done:true})
                this._setLoadingMessage({ message:this.localize('mh_eInvoicing.mda.step_5',this.language), icon:"arrow-forward"})

                const successStatus = parseInt(parseInt(createdMessage.status||_.get(this,"invoiceMessageStatuses.pending.status",(1 << 8))) | parseInt(_.get(this,"invoiceMessageStatuses.successfullySentToOA.status",(1 << 9))))

                return this._e_getAsyncMemberDataRequest(pats)
                    .then(mdaResponse => !_.trim(_.get(mdaResponse,"mdaInputReference")) || !_.get(mdaResponse,"message.result") ? [null,createdMessage] : retry.retry(() => (this.api.message().modifyMessage(_.merge(createdMessage, {status:successStatus,metas:{mdaInputReference:_.get(mdaResponse,"mdaInputReference")}})).then(modifiedMessage => [_.get(mdaResponse,"message"),modifiedMessage])), 4, 1000, 1.5))
                    .then(([mdaResponse,modifiedMessage]) => this._sleep(200).then(()=>[mdaResponse,modifiedMessage])) // Cool down
                    .then(([mdaResponse,modifiedMessage]) => !mdaResponse || !modifiedMessage ? modifiedMessage : retry.retry(() => (this.api.document().setDocumentAttachment(_.trim(_.get(createdMessage,"documentId")),_.get(createdMessage,"edKeys",[]).join(','), this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.utf82ua(JSON.stringify(_.merge(_.get(createdMessage,"attachmentContent", {}), {response:mdaResponse}))))).then(()=>modifiedMessage)), 4, 1000, 1.5))
                    .catch(e=> (console.log("ERROR with _e_placeMdaRequests",e)||true) && createdMessage)

            })

            // Confirm & goto mda responses
            .then(() => this.shadowRoot.getElementById("mdaRequestsSent") && this.shadowRoot.getElementById("mdaRequestsSent").open())
            .finally(() => this.set("_isLoading",false))

    }

    _e_getAsyncMemberDataResponse_v2() {

        // Todo: delete this (hardcoded message ID) in case pilot.mycarenet.be goes down
        // 9530cd70-0e80-4263-b212-3878956cf8ff
        // return this.api.document().getDocument("9530cd70-0e80-4263-b212-3878956cf8ff")
        //     .then(document => this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, _.get(document,"id"), _.size(_.get(document,"encryptionKeys")) ? document.encryptionKeys : _.get(document,"delegations")).then(({extractedKeys})=>([document,extractedKeys])))
        //     .then(([document,edKeys]) => this.api.document().getDocumentAttachment(_.get(document,"id"), _.get(document,"attachmentId"), (edKeys||[]).join(',')))
        //     .then(attachment => JSON.parse(attachment))

        return this.api.fhc().MemberDataController().getMemberDataMessageAsyncUsingPOST(
            _.trim(_.get(this,"api.tokenIdMH")),
            _.trim(_.get(this,"api.keystoreId")),
            _.trim(_.get(this,"api.credentials.ehpassword")),
            _.trim(_.get(this,"hcp.nihii")),
            _.trim(_.get(this,"hcp.name")) ? _.trim(_.get(this,"hcp.name")) : _.trim(_.get(this,"hcp.lastName")),
            []
        )
            .then(mdaResponse => _.size(_.get(mdaResponse,"genericErrors",null)) || !_.size(_.get(mdaResponse,"memberDataMessageList")) || !_.size(_.get(mdaResponse,"mycarenetConversation")) ? null : mdaResponse)
            .catch(e=>console.log("[ERROR] getMemberDataMessageAsyncUsingPOST", e))

    }

    _e_confirmMdaMessagesByReferences(messageReferences) {

        const promResolve = Promise.resolve()

        // return promResolve.then(() => console.log("[ACTIVATE FOR PROD] _e_confirmMdaMessagesByReferences", messageReferences))

        return this.api.fhc().MemberDataController().confirmMemberDataMessagesAsyncUsingPOST(
            _.trim(_.get(this,"api.tokenIdMH")),
            _.trim(_.get(this,"api.keystoreId")),
            _.trim(_.get(this,"api.credentials.ehpassword")),
            _.trim(_.get(this,"hcp.nihii")),
            _.trim(_.get(this,"hcp.name")) ? _.trim(_.get(this,"hcp.name")) : _.trim(_.get(this,"hcp.lastName")),
            messageReferences
        )

            .catch(e => console.log("[ERROR] confirmMemberDataMessagesAsyncUsingPOST", e))

    }

    _e_saveMdaResponse(mdaResponse) {

        const exportedDate = _.trim(moment().format("YYYYMM") + "01")

        return this.api.message().newInstance(this.user)
            .then(newMessageInstance => retry.retry(() => (this.api.message().createMessage(_.merge(newMessageInstance, {
                transportGuid: "MH:FLATRATE-MDA-RESPONSE:" + exportedDate,
                recipientsType: "org.taktik.icure.entities.HealthcareParty",
                recipients: [this.user.healthcarePartyId],
                toAddresses: [this.user.healthcarePartyId],
                metas: {
                    requestDate: moment().format("YYYYMMDDHHmmss"),
                    requestedDate: exportedDate,
                    mdaInputReferences: _.map(_.get(mdaResponse,"memberDataMessageList",[]), "reference").join(","),
                    totalMessages: _.size(_.get(mdaResponse,"memberDataMessageList")),
                },
                status: _.get(this,"invoiceMessageStatuses.treated.status",(1 << 11)),
                subject: "MH:FLATRATE-MDA-RESPONSE:" + exportedDate
            }))), 4, 1000, 1.5))
            .then(createdMessage => this.api.document().newInstance(this.user, createdMessage, {documentType: 'report', mainUti: this.api.document().uti("application/javascript"), name: _.trim(_.get(createdMessage,"subject"))+".json"}).then(newDocumentInstance => [createdMessage,newDocumentInstance]))
            .then(([createdMessage,newDocumentInstance]) => retry.retry(() => (this.api.document().createDocument(newDocumentInstance).then(createdDocument => [createdMessage,createdDocument])), 4, 1000, 1.5))
            .then(([createdMessage,createdDocument]) => this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId,createdDocument.id,_.size(_.get(createdDocument,"encryptionKeys",{})) ? createdDocument.encryptionKeys : _.get(createdDocument,"delegations",{})).then(({extractedKeys})=>[createdMessage,createdDocument,extractedKeys]))
            .then(([createdMessage,createdDocument,edKeys]) => retry.retry(() => (this.api.document().setDocumentAttachment(createdDocument.id,(edKeys||[]).join(','), this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.utf82ua(JSON.stringify(mdaResponse)))).then(() => createdMessage)), 4, 1000, 1.5))
            .catch(e=>console.log("[ERROR] _e_saveMdaResponse", e))

    }

    _e_checkForMdaResponses() {

        let currentMh = null

        const promResolve = Promise.resolve()
        const exportedDate = _.trim(moment().format("YYYYMM") + "01")
        const exportedDateEndOfMonth = _.trim(moment().endOf("month").format("YYYYMMDD"))

        return promResolve

            // 1 - Init
            .then(() => {
                this.set('_isLoading', true )
                this.api.setPreventLogging()
                this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
                this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_9",this.language), icon:"arrow-forward"})
            })

            // 2 - Get current HCP (MH)
            .then(() => this.api.hcparty().getCurrentHealthcareParty().then(hcp => currentMh = hcp).catch(e=>console.log("[ERROR] getting current HCP",e)))

            // 3 - Get MDA responses, if any
            .then(() => this._e_getAsyncMemberDataResponse_v2())

            // 4 - Save MDA responses, if any
            .then(mdaResponse => {
                this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_9_done",this.language), icon:"check-circle", updateLastMessage: true, done:true})
                this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_10",this.language), icon:"arrow-forward"})
                return !_.size(mdaResponse) ? null : this._e_saveMdaResponse(mdaResponse).then(responseMessage => [mdaResponse, responseMessage])
            })

            // 5 - Confirm MDA responses back, using MDA references
            .then(([mdaResponse, responseMessage]) => {

                this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_10_done",this.language), icon:"check-circle", updateLastMessage: true, done:true})
                this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_11",this.language), icon:"arrow-forward"})

                // All patient ids WE sent (our reconcile key is: topazPatientId + "_" + uuid)
                const requestTopazPatientIds = _.uniq(_.compact(_.map(_.get(this,"mdaRequestsData.message.attachment.request",[]), it => _.trim(_.head(_.trim(_.get(it,"reconcileKey")).split("_"))) )))

                // Is at least one patient ours: drop leading underscore, if any (inResponseTo is "_" + our reconcileKey) and take first part (topazPatientId)
                const mdaMessageIdsToConfirm = _.uniq(_.compact(_.map(_.get(mdaResponse,"memberDataMessageList",[]), responseMessage => {
                    const mdaResponseReferenceId = _.trim(_.get(responseMessage,"reference"))
                    return _.some(_.get(responseMessage,"memberDataResponse",[]), it => requestTopazPatientIds.indexOf(_.trim(_.head(_.compact(_.trim(_.get(it,"inResponseTo")).split("_"))))) > -1) ? mdaResponseReferenceId : false
                })))

                return !_.size(mdaResponse) ? [null, responseMessage] : this._e_confirmMdaMessagesByReferences(mdaMessageIdsToConfirm).then(() => [mdaResponse, responseMessage])

            })

            // 6 - Format MDA Answer
            .then(([mdaResponse, responseMessage]) => !_.size(mdaResponse) ? [null, responseMessage] : promResolve.then(() => {
                this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_11_done",this.language), icon:"check-circle", updateLastMessage: true, done:true})
                this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_12",this.language), icon:"arrow-forward"})
                const mdaErrorFormattedResponses = _
                    .chain(_.get(mdaResponse,"memberDataMessageList",[]))
                    .filter(it => !_.size(_.get(it,"errors")) && _.size(_.get(it,"memberDataResponse")) && _.size(_.get(it,"reference")))
                    .map(it => _.get(it, "memberDataResponse",[]))
                    .flatten()
                    .filter(it => _.trim(_.get(it,"responseId")) && _.trim(_.get(it,"inResponseTo")) && _.trim(_.get(it,"issuer")) && _.trim(_.get(it,"issuer")).split(":").pop().toLowerCase() === "aa") // issuer "urn:be:cin:nippin:aa" is no OA / it's an error
                    .map(it => {

                        const isError = !!_.size(_.get(it,"errors"))
                        const errorsData = !isError ? null : _.map(_.get(it,"errors"), error => _.merge({}, { faultCode: _.trim(_.get(error,"faultCode")), faultSource: _.trim(_.get(error,"faultSource")), message: _.trim(_.get(error,"message.value")), detail: _.map(_.get(error,"details.details"), detail => (!_.trim(_.get(detail,"detailCode")) ? "" : "["+ _.trim(_.get(detail,"detailCode")) +"] ") + _.trim(_.get(detail,"message.value"))).join(" - ") }))
                        const allInsurabilities = _.chain(_.get(it,"assertions",[])).filter(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:period").value()
                        const allPayments = _.chain(_.get(it,"assertions",[])).filter(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:payment").value()
                        const allMhc = _.chain(_.get(it,"assertions",[])).filter(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:medicalHouse").value()
                        const topazId = _.trim(_.get(_.trim(_.get(it,"inResponseTo")).split("_"), "[1]"))

                        const mdaFormattedResponse = _.merge({},{
                            oa: _.trim(_.get(it,"issuer")).split(":").pop(),
                            mdaInputReference: _.trim(_.get(it,"responseId")) ? _.trim(_.get(it,"responseId")) : _.trim(_.get(it,"inResponseTo")),
                            reconcileKey: _.trim(_.compact(_.trim(_.get(it,"inResponseTo")).split("_")).join("_")),
                            patient: {
                                topazId: topazId
                            },
                            insurabilities: [],
                            mhcs: [],
                            isError: isError,
                            errorsData: errorsData,
                            // assertions: _.get(it,"assertions")
                        })
                        return _.merge(mdaFormattedResponse, {
                            patient: {
                            },
                            uniqueKey: md5(JSON.stringify({
                                oa: _.trim(_.get(mdaFormattedResponse,"oa")),
                                patient: _.get(mdaFormattedResponse,"patient"),
                                insCode: _.trim(_.get(mdaFormattedResponse,"insurabilities[0].code")),
                                identificationNumber: _.trim(_.get(mdaFormattedResponse,"insurabilities[0].identificationNumber")),
                                topazId: topazId
                            }))
                        })

                    })
                    .filter(it => _.trim(_.get(it,"patient.topazId")))
                    .reduce((acc,it) => (!(acc[_.get(it,"uniqueKey")]) ? (acc[_.get(it,"uniqueKey")]=it) : _.get(acc[_.get(it,"uniqueKey")], "insurabilities").push(_.get(it,"insurabilities")) && _.get(acc[_.get(it,"uniqueKey")], "mhcs").push(_.get(it,"mhcs")) ) && acc, {})
                    .map(it => _.omit(it, ["uniqueKey"]))
                    .map(it => _.assign(it, { insurabilities: _.chain(_.get(it,"insurabilities",[])).flatten().uniqWith(_.isEqual).value(), mhcs: _.chain(_.get(it,"mhcs",[])).flatten().uniqWith(_.isEqual).value() }))
                    .value()

                // console.log("mdaErrorFormattedResponses", JSON.stringify(mdaErrorFormattedResponses))

                return  [_
                    .chain(_.get(mdaResponse,"memberDataMessageList",[]))
                    .filter(it => !_.size(_.get(it,"errors")) && _.size(_.get(it,"memberDataResponse")) && _.size(_.get(it,"reference")))
                    .map(it => _.get(it, "memberDataResponse",[]))
                    .flatten()
                    .filter(it => _.trim(_.get(it,"responseId")) && _.trim(_.get(it,"inResponseTo")) && _.trim(_.get(it,"issuer")) && _.trim(_.get(it,"issuer")).split(":").pop().toLowerCase() !== "aa") // issuer "urn:be:cin:nippin:aa" is no OA / it's an error
                    .map(it => {

                        const isError = !!_.size(_.get(it,"errors"))
                        const errorsData = !isError ? null : _.map(_.get(it,"errors"), error => _.merge({}, { faultCode: _.trim(_.get(error,"faultCode")), faultSource: _.trim(_.get(error,"faultSource")), message: _.trim(_.get(error,"message.value")), detail: _.map(_.get(error,"details.details"), detail => (!_.trim(_.get(detail,"detailCode")) ? "" : "["+ _.trim(_.get(detail,"detailCode")) +"] ") + _.trim(_.get(detail,"message.value"))).join(" - ") }))
                        const allInsurabilities = _.chain(_.get(it,"assertions",[])).filter(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:period").value()
                        const allPayments = _.chain(_.get(it,"assertions",[])).filter(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:payment").value()
                        const allMhc = _.chain(_.get(it,"assertions",[])).filter(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:medicalHouse").value()
                        const topazId = _.trim(_.get(_.trim(_.get(it,"inResponseTo")).split("_"), "[1]"))

                        const mdaFormattedResponse = _.merge({},{
                            oa: _.trim(_.get(it,"issuer")).split(":").pop(),
                            mdaInputReference: _.trim(_.get(it,"responseId")) ? _.trim(_.get(it,"responseId")) : _.trim(_.get(it,"inResponseTo")),
                            reconcileKey: _.trim(_.compact(_.trim(_.get(it,"inResponseTo")).split("_")).join("_")),
                            patient: _.merge({},{
                                firstName: _.chain(_.get(it,"assertions",[])).find(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:patientData").get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:careReceiver:firstName"}).get("attributeValues").join(" ").trim().value(),
                                lastName: _.chain(_.get(it,"assertions",[])).find(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:patientData").get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:careReceiver:name"}).get("attributeValues").join(" ").trim().value(),
                                ssin: _.chain(_.get(it,"assertions",[])).find(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:patientData").get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:fgov:person:ssin"}).get("attributeValues[0]").trim().value().replace(/[^\d]/gmi,""),
                                gender: _.chain(_.get(it,"assertions",[])).find(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:patientData").get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:careReceiver:gender"}).get("attributeValues[0]").trim().value(),
                                dateOfBirth: _.chain(_.get(it,"assertions",[])).find(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:patientData").get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:careReceiver:birthDate"}).get("attributeValues[0]").trim().value(),
                                dateOfDeath: _.chain(_.get(it,"assertions",[])).find(assertion => _.trim(_.get(assertion, "advice.assertionType")) === "urn:be:cin:nippin:insurability:patientData").get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:careReceiver:deceasedDate"}).get("attributeValues[0]").trim().value(),
                                topazId: topazId
                            }),
                            insurabilities: (_.map(allInsurabilities, (insurability,index) => _.merge({}, {
                                identificationNumber: _.chain(insurability).get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:careReceiver:registrationNumber"}).get("attributeValues[0]").trim().value(),
                                code: _.chain(insurability).get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:careReceiver:mutuality"}).get("attributeValues[0]").trim().value(),
                                tc1: _.chain(insurability).get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:cb1"}).get("attributeValues[0]").trim().value(),
                                tc2: _.chain(insurability).get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:cb2"}).get("attributeValues[0]").trim().value(),
                                startDate: _.chain(insurability).get("subject.subjectConfirmations").find({method: "urn:be:cin:nippin:memberIdentification"}).get("subjectConfirmationData.notBefore").trim().value(),
                                endDate: _.chain(insurability).get("subject.subjectConfirmations").find({method: "urn:be:cin:nippin:memberIdentification"}).get("subjectConfirmationData.notOnOrAfter").trim().value(),
                                paymentapproval: _.chain(allPayments[index]).get("statementsAndAuthnStatementsAndAuthzDecisionStatements[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:payment:byIO"}).get("attributeValues[0]",false).value()
                            }))||[]).map(ins => _.merge(ins, {
                                preferentialstatus: !!((parseInt(_.get(ins,"tc1"))||0)%2),
                                startDate: (parseInt(_.get(ins,"startDate"))||0) ? moment((parseInt(_.get(ins,"startDate"))||0)).format("YYYYMMDD") : null,
                                // Either not set or set to the end of this (exported) month => don't take into account. If not, take into account
                                endDate: (!(parseInt(_.get(ins,"endDate"))||0) || _.trim(moment((parseInt(_.get(ins,"endDate"))||0)).endOf("month").format("YYYYMMDD")) === exportedDateEndOfMonth) ? null : _.trim(moment((parseInt(_.get(ins,"endDate"))||0)).format("YYYYMMDD"))
                            })),
                            mhcs: (_.map(allMhc, (mhc,index) => _.merge({}, {
                                startOfCoverage: _.chain(mhc).get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:medicalHouse:start"}).get("attributeValues[0]").trim().value(),
                                endOfCoverage: _.chain(mhc).get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:medicalHouse:end"}).get("attributeValues[0]").trim().value(),
                                mmNihii: _.chain(mhc).get("statementsAndAuthnStatementsAndAuthzDecisionStatements.[0].attributesAndEncryptedAttributes").find({name:"urn:be:cin:nippin:medicalHouse:nihii11"}).get("attributeValues[0]").trim().value(),
                                // Not required, only take coverage dates into account
                                // startDate: _.chain(mhc).get("subject.subjectConfirmations").find({method: "urn:be:cin:nippin:memberIdentification"}).get("subjectConfirmationData.notBefore").trim().value(),
                                // endDate: _.chain(mhc).get("subject.subjectConfirmations").find({method: "urn:be:cin:nippin:memberIdentification"}).get("subjectConfirmationData.notOnOrAfter").trim().value(),
                            }))||[]).map(mhc => _.merge(mhc, {
                                startOfCoverage: (parseInt(_.get(mhc,"startOfCoverage"))||0) ? moment((parseInt(_.get(mhc,"startOfCoverage"))||0)).format("YYYYMMDD") : null,
                                // Either not set or set to the end of this (exported) month => don't take into account. If not, take into account
                                endOfCoverage: (!(parseInt(_.get(mhc,"endOfCoverage"))||0) || _.trim(moment((parseInt(_.get(mhc,"endOfCoverage"))||0)).endOf("month").format("YYYYMMDD")) === exportedDateEndOfMonth) ? null : _.trim(moment((parseInt(_.get(mhc,"endOfCoverage"))||0)).format("YYYYMMDD"))
                                // Not required, only take coverage dates into account
                                // startDate: (parseInt(_.get(mhc,"startDate"))||0) ? moment((parseInt(_.get(mhc,"startDate"))||0)).format("YYYYMMDD") : null,
                                // endDate: (parseInt(_.get(mhc,"endDate"))||0) ? moment((parseInt(_.get(mhc,"endDate"))||0)).subtract(1, 'day').format("YYYYMMDD") : null
                            })),
                            isError: isError,
                            errorsData: errorsData,
                            // assertions: _.get(it,"assertions")
                        })

                        return _.merge(mdaFormattedResponse, {
                            patient: {
                                dateOfBirth: (parseInt(_.get(mdaFormattedResponse,"patient.dateOfBirth"))||0) ? moment((parseInt(_.get(mdaFormattedResponse,"patient.dateOfBirth"))||0)).format("YYYYMMDD") : null,
                                dateOfDeath: (parseInt(_.get(mdaFormattedResponse,"patient.dateOfDeath"))||0) ? moment((parseInt(_.get(mdaFormattedResponse,"patient.dateOfDeath"))||0)).format("YYYYMMDD") : null
                            },
                            uniqueKey: md5(JSON.stringify({
                                oa: _.trim(_.get(mdaFormattedResponse,"oa")),
                                patient: _.get(mdaFormattedResponse,"patient"),
                                insCode: _.trim(_.get(mdaFormattedResponse,"insurabilities[0].code")),
                                identificationNumber: _.trim(_.get(mdaFormattedResponse,"insurabilities[0].identificationNumber")),
                                topazId: topazId
                            }))
                        })

                    })
                    .filter(it => _.trim(_.get(it,"patient.topazId")))
                    .reduce((acc,it) => (!(acc[_.get(it,"uniqueKey")]) ? (acc[_.get(it,"uniqueKey")]=it) : _.get(acc[_.get(it,"uniqueKey")], "insurabilities").push(_.get(it,"insurabilities")) && _.get(acc[_.get(it,"uniqueKey")], "mhcs").push(_.get(it,"mhcs")) ) && acc, {})
                    .map(it => _.omit(it, ["uniqueKey"]))
                    .map(it => _.assign(it, { insurabilities: _.chain(_.get(it,"insurabilities",[])).flatten().uniqWith(_.isEqual).value(), mhcs: _.chain(_.get(it,"mhcs",[])).flatten().uniqWith(_.isEqual).value() }))
                    .value(), mdaErrorFormattedResponses, responseMessage]
            }))

            // Pre 7 - join the formatted responses
            .then(([mdaFormattedResponse, mdaErrorFormattedResponses,responseMessage]) => {
                const mdaFormattedResponseWithErrors = _.concat(mdaFormattedResponse, mdaErrorFormattedResponses)
                return [mdaFormattedResponseWithErrors,responseMessage]
            })

            // 7 - Update patients' insurabilities and Medical House contracts
            .then(([mdaFormattedResponse,responseMessage]) => !_.size(mdaFormattedResponse) ? [null,responseMessage] : promResolve.then(() => {

                // console.log("mdaFormattedResponse", JSON.stringify(mdaFormattedResponse))
                // console.log("responseMessage", JSON.stringify(responseMessage))

                this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_12_done",this.language), icon:"check-circle", updateLastMessage: true, done:true})
                this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_13",this.language), icon:"arrow-forward"})
                return this._e_updatePatientInsurabilitiesAndMhcs(mdaFormattedResponse).then(mdaFormattedResponse => [mdaFormattedResponse,responseMessage])
                // Group by OA: _.reduce(mdaFormattedResponse, (acc,it) => (acc[_.get(it,"oa")]||(acc[_.get(it,"oa")]=[])).push(it) && acc, {})
            }))

            // 8 - Reconcile MDA requests with MDA responses
            .then(([mdaFormattedResponse,responseMessage]) => !_.size(mdaFormattedResponse) ?

                // No / invalid answer from mda / OA -> simply update meta "responseLastCheckDate" of request message
                retry.retry(() => (this.api.message().modifyMessage(_.omit(_.merge(_.get(this,"mdaRequestsData.originalMessage",{}), {metas:{responseLastCheckDate: moment().format("YYYYMMDDHHmmss")}}), ["metas.requestDateHr","metas.responseDateHr","metas.responseLastCheckDateHr"]))), 4, 1000, 1.5)
                    .then(modifiedMessage => modifiedMessage && this.api.register(modifiedMessage, 'message'))
                    .catch(e => console.log("[ERROR] _e_checkForMdaResponses", e)) :

                promResolve
                    .then(() => this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_13_done",this.language), icon:"check-circle", updateLastMessage: true, done:true}))
                    .then(() => this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_14",this.language), icon:"arrow-forward"}))
                    .then(() => _.map(_.get(this,"mdaRequestsData.message.attachment.request",[]), requestedPat => {

                        const responseMatchingPat = _.find(mdaFormattedResponse, it => _.trim(_.get(_.trim(_.get(it,"reconcileKey")).split("_"), "[0]")) === _.trim(_.get(_.trim(_.get(requestedPat,"reconcileKey")).split("_"), "[0]")) )
                        const patientIsAlreadyValid = _.get(requestedPat,"mdaResponsePatientHasValidInsAndMhc",false)
                        const patientIsAlreadyMatched = _.get(requestedPat,"patientMatchedWithMdaResponse",false)

                        return _.merge({}, requestedPat, patientIsAlreadyMatched && patientIsAlreadyValid ? { requestErrorMessage:"" } :
                            patientIsAlreadyMatched && !responseMatchingPat ? {} :
                                {
                                    patientMatchedWithMdaResponse: !!_.size(responseMatchingPat),
                                    mdaResponsePatientHasValidInsAndMhc: !!_.size(responseMatchingPat) && !_.get(responseMatchingPat,"isError",false) && !_.get(responseMatchingPat,"isErrorMdaRequest",false),
                                    requestErrorMessage: _.get(responseMatchingPat,"isErrorMdaRequest",false) ? _.trim(_.get(responseMatchingPat,"errorsData[0].detail")) ? _.trim(_.get(responseMatchingPat,"errorsData[0].detail")) : _.trim(_.get(responseMatchingPat,"errorsData[0].message")) : "",
                                    responseErrorMessage: !_.get(responseMatchingPat,"isErrorMdaRequest",false) && _.get(responseMatchingPat,"isError",false) ? _.map(_.get(responseMatchingPat, "errorsData",[]), errorMessage => _.trim(_.get(errorMessage,"message"))).join(" ; ") : "",
                                    patientSsin: _.trim(_.get(requestedPat,"patientSsin")) ? requestedPat.patientSsin : _.trim(_.get(responseMatchingPat,"patient.")),
                                    patientIdentificationNumber: _.trim(_.get(requestedPat,"patientIdentificationNumber")) ? requestedPat.patientIdentificationNumber : _.trim(_.chain(responseMatchingPat).get("insurabilities").filter("identificationNumber").orderBy(["startDate"],["desc"]).head().get("identificationNumber").value()),
                                    parentInsuranceCode: _.trim(_.get(requestedPat,"parentInsuranceCode")) ? _.trim(_.get(requestedPat,"parentInsuranceCode")) : _.trim(_.get(responseMatchingPat,"oa"))
                                }
                        )

                    }))
                    .then(requestedDataMatchedWithResponseData => {

                        const requestMessage = _.get(this,"mdaRequestsData.message",{})
                        const originalRequestMessage  = _.get(this,"mdaRequestsData.originalMessage",{})
                        const responseMessageIds = _.compact(_.trim(_.get(originalRequestMessage,"metas.responseMessageIds")).split(","))
                        responseMessageIds.push(_.trim(_.get(responseMessage,"id")))

                        return retry.retry(() => (this.api.message().modifyMessage(_.omit(_.merge(originalRequestMessage, {
                            status: parseInt(parseInt(_.get(originalRequestMessage,"status",0) || _.get(this,"invoiceMessageStatuses.successfullySentToOA.status",(1 << 9))) | parseInt(_.get(this,"invoiceMessageStatuses.treated.status",(1 << 11)))),
                            metas: {
                                responseMessageIds:  _.compact(responseMessageIds).join(","),
                                responseDate: moment().format("YYYYMMDDHHmmss"),
                                responseLastCheckDate: moment().format("YYYYMMDDHHmmss")
                            }
                        }), ["metas.requestDateHr","metas.responseDateHr","metas.responseLastCheckDateHr"]))), 4, 1000, 1.5)
                            .then(modifiedMessage => !_.size(modifiedMessage) ? null : retry.retry(() => (this.api.document().setDocumentAttachment(_.trim(_.get(requestMessage,"document.id")),_.get(requestMessage,"edKeys",[]).join(','), this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.utf82ua(JSON.stringify( _.assign(_.get(this,"mdaRequestsData.message.attachment",{}), {request:requestedDataMatchedWithResponseData}))))).then(() => modifiedMessage)), 4, 1000, 1.5))

                    })

            )
            .then(requestMessages=>this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_14_done",this.language), icon:"check-circle", updateLastMessage: true, done:true}))
            .catch(e=>console.log("[ERROR] _e_checkForMdaResponses", e))
            .finally(() => (this.set("_isLoading",false)||true) && this._e_loadDataAndGetStep())

    }

    _e_bypassMdaResponses() {

        const promResolve = Promise.resolve();

        return promResolve
            .then(() => {
                this.set('_isLoading', true )
                this.api.setPreventLogging()
                this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
                this._setLoadingMessage({ message:this.localize('please_wait',this.language), icon:"watch-later", done:true})
            })
            .then(() => !_.size(_.get(this,"mdaRequestsData.originalMessage")) ? promResolve : retry.retry(() => (this.api.message().modifyMessage(_.omit(_.merge(_.get(this,"mdaRequestsData.originalMessage"), {metas:{overriddenByUserDate:moment().format("YYYYMMDDHHmmss")}}),["metas.requestDateHr","metas.responseDateHr","metas.responseLastCheckDateHr"]))), 4, 1000, 1.5)
                .then(modifiedMessage => this.api.register(modifiedMessage, 'message'))
                .catch(e=>console.log("[ERROR] _e_bypassMdaResponses",e))
            )
            .catch(e=>console.log("[ERROR] _e_bypassMdaResponses",e))
            .finally(() => (this.set("_isLoading",false)||true) && this._e_loadDataAndGetStep())

    }

    _e_gotoMdaLastCallResultsDetails(e, tabToGoFor="invalidPatients") {

        const promResolve = Promise.resolve()

        // return this._e_missingMdaRequestsResponses() && e instanceof Event ? this._e_loadDataAndGetStep() : (this._e_missingMdaRequestsResponses() && !(e instanceof Event) ? this._e_loadDataAndGetStep() : promResolve)
        return promResolve
            .then(() => {
                this.set("_isLoading",true)
                this._setLoadingMessage({ message:this.localize('please_wait',this.language), icon:"watch-later", updateLastMessage: true, done:true})
            })

            // .then(() =>  this.set("rawMdaResultsGridData", _
            //     .chain(_.get(this,"mdaRequestsData.message",[]))
            //     .map(requestMessage => _.map(_.get(requestMessage,"attachment.request"), pat => {
            //         const responseMessagePatients = _.get(_.find(_.get(this,"mdaResponsesData.messages"), it => _.trim(_.get(it,"metas.requestMessageId")) === _.trim(requestMessage.id)), "attachment.patients", [])
            //         const responseMatchingPat = _.find(responseMessagePatients, {reconcileKey:_.trim(_.get(pat,"reconcileKey"))})
            //         return _.merge({},pat,{
            //             oa: _.trim(_.get(requestMessage,"metas.oa")),
            //             verifiedMonthHr: moment(_.trim(_.get(pat,"startDate")),"YYYYMMDD").format("MM/YYYY"),
            //             ssinHr: this.api.formatSsinNumber(_.trim(_.get(pat,"patientSsin"))),
            //             message: _.trim(_.get(responseMatchingPat,"responseErrorMessage")),
            //             patientMatchedWithMdaResponse: _.get(responseMatchingPat,"patientMatchedWithMdaResponse",false),
            //             mdaResponsePatientHasValidInsAndMhc: _.get(responseMatchingPat,"mdaResponsePatientHasValidInsAndMhc",false),
            //             patientInsurabilityStatus: !_.get(responseMatchingPat,"patientMatchedWithMdaResponse",false) ? "notVerified" : _.get(responseMatchingPat,"mdaResponsePatientHasValidInsAndMhc",false) ? "yes" : "no",
            //             patientHasValidInsurabilityBoolean: _.get(pat,"patientForcedAsValid",false) ? true : !_.get(responseMatchingPat,"patientMatchedWithMdaResponse",false) ? false : _.get(responseMatchingPat,"mdaResponsePatientHasValidInsAndMhc",false),
            //             patientForcedAsValid: _.get(pat,"patientForcedAsValid",false)
            //         })
            //     }).map(pat => _.assign(pat, {
            //         patientInsurabilityStatusHr: _.upperFirst(this.localize(pat.patientInsurabilityStatus,this.language).toLowerCase()),
            //         normalizedSearchTerms: _
            //             .chain(pat)
            //             .pick(["patientId","patientSsin","ssinHr","nameHr","patientIdentificationNumber","insuranceCode","oa","message", "responseErrorMessage"])
            //             .flatMap()
            //             .compact()
            //             .map(it => _.trim(it).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))
            //             .value()
            //             .join(" ")
            //     })))
            //     .flatten()
            //     .orderBy(["patientForcedAsValid","nameHr", "startDate"],["desc","asc", "desc"]) // Inside lodash, "true" gets a higher order than / comes after "false"
            //     .value()
            // ))

            .then(() =>  this.set("rawMdaResultsGridData", _
                .chain(_.get(this,"mdaRequestsData.message.attachment.request",[]))
                .map(pat => {
                    return _.merge({},pat,{
                        oa: _.trim(_.get(pat,"parentInsuranceCode")),
                        ssinHr: this.api.formatSsinNumber(_.trim(_.get(pat,"patientSsin"))),
                        message: _.trim(_.get(pat,"responseErrorMessage")) ? _.trim(_.get(pat,"responseErrorMessage")) : this._getFriendlyMessage(_.trim(_.get(pat,"requestErrorMessage"))),
                        patientMatchedWithMdaResponse: _.get(pat,"patientMatchedWithMdaResponse",false),
                        mdaResponsePatientHasValidInsAndMhc: _.get(pat,"mdaResponsePatientHasValidInsAndMhc",false),
                        patientInsurabilityStatus: !_.get(pat,"patientMatchedWithMdaResponse",false) ? "notVerified" : _.get(pat,"mdaResponsePatientHasValidInsAndMhc",false) ? "yes" : "no",
                        patientHasValidInsurabilityBoolean: _.get(pat,"patientForcedAsValid",false) ? true : !_.get(pat,"patientMatchedWithMdaResponse",false) ? false : _.get(pat,"mdaResponsePatientHasValidInsAndMhc",false),
                        patientForcedAsValid: _.get(pat,"patientForcedAsValid",false)
                    })
                }).map(pat => _.assign(pat, {
                    patientInsurabilityStatusHr: _.upperFirst(this.localize(pat.patientInsurabilityStatus,this.language).toLowerCase()),
                    normalizedSearchTerms: _
                        .chain(pat)
                        .pick(["patientId","patientSsin","ssinHr","nameHr","patientIdentificationNumber","insuranceCode","oa","message", "responseErrorMessage"])
                        .flatMap()
                        .compact()
                        .map(it => _.trim(it).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g,""))
                        .value()
                        .join(" ")
                }))
                // .flatten()
                .orderBy(["patientForcedAsValid","nameHr", "startDate"],["desc","asc", "desc"]) // Inside lodash, "true" gets a higher order than / comes after "false"
                .value()
            ))
            .then(()=>this._e_gotoMdaTabAndRefreshGrid(e instanceof Event ? "invalidPatients" : tabToGoFor||"invalidPatients"))
            .finally(() => {
                this.set("eInvoicingStep","mdaLastCallResultsDetails")
                this.set("_isLoading",false)
            })

    }

    _getFriendlyMessage(msg){
        return _.trim(msg).toLowerCase().includes("no_facet") ? this.localize("mda_no_facet", "No response", this.language) : msg
    }

    _e_step4SaveChangesAndGoToStep5() {

        const promResolve = Promise.resolve()

        return promResolve
            .then(() => {
                this.set('_isLoading', true )
                this.api.setPreventLogging()
                this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
                this._setLoadingMessage({ message:this.localize('please_wait',this.language), icon:"watch-later", updateLastMessage: true, done:true})
            })
            .then(() => {

                const originalMessage = _.get(this,"mdaRequestsData.originalMessage")
                const gridDynamicMessage = _.get(this,"mdaRequestsData.message")
                const attachmentToUpdate = _.get(gridDynamicMessage,"attachment")

                return !_.size(originalMessage) || !_.size(gridDynamicMessage) || !_.size(attachmentToUpdate) ? promResolve : promResolve
                    .then(() => this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_15", "Sauvegarde des changements", this.language), icon:"arrow-forward"})||true)
                    .then(() => retry.retry(() => (this.api.message().modifyMessage(_.omit(_.merge(originalMessage, {metas:{ step5Validated: true }}), ["metas.requestDateHr","metas.responseDateHr","metas.responseLastCheckDateHr"]))), 4, 1000, 1.5))
                    .then(modifiedMessage => !modifiedMessage ? null : retry.retry(() => (this.api.document().setDocumentAttachment(_.trim(_.get(gridDynamicMessage,"document.id")),(_.get(gridDynamicMessage,"edKeys")||[]).join(','), this.api.crypto().utils.ua2ArrayBuffer(this.api.crypto().utils.utf82ua(JSON.stringify(attachmentToUpdate))))), 4, 1000, 1.5))
                    .then(() => this._setLoadingMessage({ message:this.localize('mh_eInvoicing.mda.step_15_done',this.language), icon:"check-circle", updateLastMessage: true, done:true}))
                    .catch(e=> (console.log("[ERROR] _e_step4SaveChangesAndGoToStep5",e)||true) && this._setLoadingMessage({ message:this.localize('mh_eInvoicing.mda.step_15_done',this.language), icon:"check-circle", updateLastMessage: true, done:true}))

            })
            .then(() => (this.set('_isLoading',false)||true) && this.dispatchEvent(new CustomEvent('do-route', { bubbles: true, composed: true, detail: { forceRefreshMdaRequestsStatus: true, selection : { item : "eflatrateInvocingMenuItem", status: "toBeSend" }}})))

    }

    _e_updatePatientInsurabilitiesAndMhcs(mdaFormattedResponse) {

        const promResolve = Promise.resolve()

        let patientCounter = 1
        let prom = Promise.resolve([])
        let insurancesData = []
        const totalPatients = _.size(mdaFormattedResponse)
        const exportedDate = _.trim(moment().format("YYYYMM") + "01")
        const insuranceCodes = _.chain(mdaFormattedResponse).map(it => _.map(_.get(it,"insurabilities",[]), ins => _.trim(_.get(ins,"code",null)))).flatten().compact().uniq().value()

        return this.api.hcparty().getCurrentHealthcareParty()
            .then(currentMh => this._getInsurancesDataByCodes(insuranceCodes).then(insurances=>[currentMh,insurances]))
            .then(([currentMh,insurances]) => {

                insurancesData = insurances
                const currentMhNihii = _.trim(_.get(currentMh,"nihii"))
                const endOfPreviousMonthYYYYMMDD = parseInt(moment().endOf("month").subtract(1, "month").format("YYYYMMDD"))

                _.compact(_.map(mdaFormattedResponse, mdaPatient => {

                    const patientId = _.trim(_.get(mdaPatient,"patient.topazId"))
                    const requestMatchingPat = _.find(_.get(this,"mdaRequestsData.message.attachment.request",[]), it => _.trim(_.get(_.trim(_.get(it,"reconcileKey")).split("_"),"[0]")) === _.trim(_.get(_.trim(_.get(mdaPatient,"reconcileKey")).split("_"),"[0]")))

                    prom = prom.then(promisesCarrier => !patientId || (_.get(requestMatchingPat,"patientMatchedWithMdaResponse",false) && _.get(requestMatchingPat,"mdaResponsePatientHasValidInsAndMhc",false)) ? promisesCarrier : this.api.patient().getPatientWithUser(_.get(this,"user"), patientId)
                        .then(topazPatient => !_.size(topazPatient) || !_.size(mdaPatient) ? (patientCounter++ && null) : promResolve.then(() => {



                            this._setLoadingMessage({ message:this.localize("mh_eInvoicing.mda.step_13",this.language) + " " + patientCounter + "/" + totalPatients, icon:"arrow-forward", updateLastMessage: true, })

                            // Is it an error with the MDA call ? (flag as such for the "request status" screen / step2)
                            if(_.get(mdaPatient,"isError",false) || _.size(_.get(mdaPatient,"errorsData[0]"))) { patientCounter++; _.assign(mdaPatient, {isErrorMdaRequest:true}); return null; }



                            const originalTopazPatient = _.cloneDeep(topazPatient)
                            const mdaMhcs = _.get(mdaPatient,"mhcs",[])
                            const mdaInsurabilities = _.get(mdaPatient,"insurabilities",[])
                            const mostRecentMhcThatIsNotMine = _.find(_.orderBy(mdaMhcs, ["startOfCoverage"], ["desc"]), it => _.trim(_.get(it,"mmNihii")).substr(0,8) !== currentMhNihii.substr(0,8) && (!_.trim(_.get(it,"endOfCoverage")) || _.trim(_.get(it,"endOfCoverage")) >= exportedDate ))
                            const otherMedicalHouseContractBelongsTo = _.find(_.get(this,"medicalHouseList.medicalHouseList",[]), mhIt => _.trim(_.get(mhIt,"nihii")).substr(0,8) === _.trim(_.get(mostRecentMhcThatIsNotMine,"mmNihii")).substr(0,8))



                            // Update Medical House contracts
                            _.assign(topazPatient, {medicalHouseContracts:

                                // There isn't any contracts
                                    !_.size(mdaMhcs) ? ((_.assign(mdaPatient, {isError:true, errorsData: [{message: this.localize("patientHasNoMhc", "patientHasNoMhc", this.language)}]}))||true) && _.map(_.get(topazPatient,"medicalHouseContracts",[]), mhc => ((_.get(mhc,"status",0) & (1<<2)) || (_.get(mhc,"status",0) & (1<<3))) ? mhc :  _.merge(mhc, { endOfContract: endOfPreviousMonthYYYYMMDD, endOfCoverage:endOfPreviousMonthYYYYMMDD, status: (1 << 3) })) :

                                        // None of the contract belongs to me
                                        !_.size(_.filter(mdaMhcs, it => _.trim(_.get(it,"mmNihii")).substr(0,8) === currentMhNihii.substr(0,8))) ?

                                            ((_.assign(mdaPatient, {isError:true, errorsData: [{message:
                                                        this.localize("patientIsNowInMhc", "patientIsNowInMhc", this.language) + ": " +
                                                        (!_.size(otherMedicalHouseContractBelongsTo) ?
                                                                this.api.formatInamiNumber(_.trim(_.get(mostRecentMhcThatIsNotMine,"mmNihii"))) + " ("+this.localize("nihiiVerbose",this.language)+")" :
                                                                _.trim(_.get(otherMedicalHouseContractBelongsTo, "name")) + " ("+
                                                                _.trim(_.get(otherMedicalHouseContractBelongsTo, "address.street")) + " - " +
                                                                _.trim(_.get(otherMedicalHouseContractBelongsTo, "address.zip")) + " " +
                                                                _.trim(_.get(otherMedicalHouseContractBelongsTo, "address.city")) + ") - Tel: " +
                                                                _.trim(_.get(otherMedicalHouseContractBelongsTo, "address.telecom.phone"))
                                                        )}]}))||true) && _.map(_.get(topazPatient,"medicalHouseContracts",[]), mhc => /* ((_.get(mhc,"status",0) & (1<<2)) || (_.get(mhc,"status",0) & (1<<3))) ? mhc : */ _.merge(mhc, { endOfContract: endOfPreviousMonthYYYYMMDD, endOfCoverage:endOfPreviousMonthYYYYMMDD, status: (1 << 3) })) :

                                            // None of my contracts is valid anymore
                                            !_.some(mdaMhcs, it => _.trim(_.get(it,"startOfCoverage")) <= exportedDate && (!_.trim(_.get(it,"endOfCoverage")) || _.trim(_.get(it,"endOfCoverage")) >= exportedDate)) ? ((_.assign(mdaPatient, {isError:true, errorsData: [{message: this.localize("patientHasNoOnGoingMhc", "patientHasNoOnGoingMhc", this.language)}]}))||true) && _.map(_.get(topazPatient,"medicalHouseContracts",[]), mhc => ((_.get(mhc,"status",0) & (1<<2)) || (_.get(mhc,"status",0) & (1<<3))) ? mhc : _.merge(mhc, { endOfContract: endOfPreviousMonthYYYYMMDD, endOfCoverage:endOfPreviousMonthYYYYMMDD, status: (1 << 3) })) :

                                                // Any other scenario: patient's MHC are valid / don't update anything
                                                _.get(topazPatient,"medicalHouseContracts",[])

                            })



                            // Update gender, ssin && dateOfDeath
                            if(_.trim(_.get(mdaPatient,"patient.ssin"))) _.assign(topazPatient, {ssin:_.trim(_.get(mdaPatient,"patient.ssin"))})
                            if(["male","female"].indexOf(_.trim(_.get(mdaPatient,"patient.gender")).toLowerCase()) > -1) _.assign(topazPatient, {gender:_.trim(_.get(mdaPatient,"patient.gender")).toLowerCase()})
                            if((parseInt(_.get(mdaPatient,"patient.dateOfDeath"))||0)) _.assign(topazPatient, {dateOfDeath:parseInt(_.get(mdaPatient,"patient.dateOfDeath"))})



                            // Update insurances - none valid / all expired
                            if(!_.some(mdaInsurabilities, it => _.trim(_.get(it,"startDate")) <= exportedDate && (!_.trim(_.get(it,"endDate")) || _.trim(_.get(it,"endDate")) >= exportedDate))) _.assign(mdaPatient, {isError:true, errorsData: [{message: this.localize("patientHasNoValidIns", "patientHasNoValidIns", this.language)}]})

                            // Update insurances
                            _.assign(topazPatient, {insurabilities:

                                // There isn't any mdaInsurability
                                    !_.size(mdaInsurabilities) ? ((_.assign(mdaPatient, {isError:true, errorsData: [{message: this.localize("patientHasNoIns", "patientHasNoIns", this.language)}]}))||true) && [] :

                                        _
                                            .chain(mdaInsurabilities)
                                            .map(ins => _.merge({},{
                                                "parameters": {
                                                    "tc1": _.trim(_.get(ins,"tc1")),
                                                    "tc2": _.trim(_.get(ins,"tc2")),
                                                    "preferentialstatus": !!_.get(ins,"preferentialstatus",false),
                                                    "paymentapproval": !!_.get(ins,"paymentapproval",false),
                                                    "mdaInputReference": exportedDate + "@" + _.trim(_.get(mdaPatient,"mdaInputReference")),
                                                },
                                                "ambulatory": true,
                                                "dental": false,
                                                "identificationNumber": _.trim(_.get(ins,"identificationNumber")),
                                                "insuranceId": _.trim(_.get(_.find(insurancesData, it => _.trim(_.get(ins,"code")) && _.trim(_.get(it,"code")).split(",").indexOf(_.trim(_.get(ins,"code"))) > -1), "id")),
                                                "startDate": (parseInt(_.get(ins,"startDate",null))||0) ? parseInt(_.get(ins,"startDate",null)) : null,
                                                "endDate": (parseInt(_.get(ins,"endDate",null))||0) ? parseInt(_.get(ins,"endDate",null)) : null
                                            }))
                                            .filter(it => _.trim(_.get(it,"insuranceId")))
                                            .compact()
                                            .value()

                            })



                            // Only return patients we should update
                            return patientCounter++ && _.isEqual(originalTopazPatient, topazPatient) ? null : topazPatient



                        }))
                        .then(patientToUpdate => !patientToUpdate ? promResolve : this.api.patient().modifyPatientWithUser(_.get(this,"user",{}), patientToUpdate))
                        .then(updatedPatient => _.concat(promisesCarrier, updatedPatient))
                        .catch(() => _.concat(promisesCarrier, null))
                    )
                        .catch(e => console.log("[ERROR] _e_updatePatientInsurabilitiesAndMhcs", e))

                }))

                return prom

            })
            .then(updatedPatients => mdaFormattedResponse)
            .catch(e => (console.log("ERROR _e_updatePatientInsurabilitiesAndMhcs", e)||true) && mdaFormattedResponse)

    }

    _e_loadDataAndGetStep() {

        let eInvoicingStep = "placeMdaRequests"
        const promResolve = Promise.resolve()
        const exportedDate = _.trim(moment().format("YYYYMM") + "01")

        return promResolve
            .then(() => {
                this.set('_isLoading', true)
                this.api.setPreventLogging()
                this.dispatchEvent(new CustomEvent('idle', {bubbles: true, composed: true}))
                this._setLoadingMessage({ message: this.localize('please_wait', this.language), icon: "watch-later", updateLastMessage: true, done: true })
            })
            .then(() => this.api.getRowsUsingPagination((key, docId) => this.api.message().findMessagesByTransportGuid('MH:FLATRATE-MDA-REQUEST:' + exportedDate, null, key, docId, 1000)
                .then(pl => {
                    return {
                        rows: _.filter(pl.rows, it => it && _.get(it, 'fromHealthcarePartyId', false) === this.user.healthcarePartyId && _.get(it, "recipients", []).indexOf(this.user.healthcarePartyId) > -1),
                        nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                        nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                        done: !pl.nextKeyPair
                    }
                })
                .catch(() => promResolve)
            ))
            .then(requestMessages => _.head(requestMessages))
            .then(mdaRequestMessage => !_.size(mdaRequestMessage) ? promResolve : promResolve.then(() => {
                this._setLoadingMessage({ message: this.localize('mh_eInvoicing.mda.step_7', this.language), icon: "arrow-forward" })
                return retry.retry(() => (this.api.document().findByMessage(this.user.healthcarePartyId, mdaRequestMessage).then(document => _.head(document))), 4, 1000, 1.5)
                    .then(document => !(_.size(_.get(document, "encryptionKeys")) || _.size(_.get(document, "delegations"))) ? ([document, []]) : this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, _.get(document, "id"), _.size(_.get(document, "encryptionKeys")) ? document.encryptionKeys : _.get(document, "delegations")).then(({extractedKeys}) => ([document, extractedKeys])))
                    .then(([document, edKeys]) => retry.retry(() => (this.api.document().getDocumentAttachment(_.get(document, "id"), _.get(document, "attachmentId"), (edKeys || []).join(','))), 4, 1000, 1.5).then(attachment => ([document, edKeys, attachment])).catch(() => ([document, edKeys, null])))
                    .then(([document, edKeys, attachment]) => _.merge(mdaRequestMessage, {
                        document: document,
                        edKeys: edKeys,
                        attachment: JSON.parse(attachment) || {}
                    }))
                    .catch(() => mdaRequestMessage)
            }))
            .then(mdaRequestMessage => {

                // 001 - Did not invoke "MDA request" yet (this month)
                if (!_.size(mdaRequestMessage)) throw new Error("dontGoAnyFurther");

                const originalMessage = _.omit(mdaRequestMessage, ["evaluatedStatus", "document", "edKeys", "attachment"])
                const missingAtLeastOneAnswer = _.some(_.get(mdaRequestMessage, "attachment.request", []), it => !_.get(it, "patientMatchedWithMdaResponse", false))
                const latestCheck = _.trim(_.get(mdaRequestMessage, "metas.responseLastCheckDate"))
                const mostRecentRequestDate = (parseInt(_.get(mdaRequestMessage, "metas.requestDate", 0)) || 0)
                const mostRecentCheckOrRequestDate = moment(_.trim(latestCheck ? latestCheck : mostRecentRequestDate), "YYYYMMDDHHmmss")
                const nextRequestDate = _.clone(mostRecentCheckOrRequestDate).add((parseInt(_.get(this, "minimumSecondsBetweenMdaResponseChecks", 86400)) || 86400), 'seconds')

                // Assign search terms
                _.map(_.get(mdaRequestMessage, "attachment.request", []), it => _.merge(it, {
                    normalizedSearchTerms: _
                        .chain(it)
                        .pick(["patientId", "patientSsin", "nameHr", "patientIdentificationNumber", "insuranceCode", "parentInsuranceCode", "startDate", "requestErrorMessage"])
                        .flatMap()
                        .compact()
                        .map(itt => _.trim(itt).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, ""))
                        .value()
                        .join(" ")
                }))

                this.set("mdaRequestsData", {
                    originalMessage: originalMessage,
                    message: _.merge(mdaRequestMessage, {
                        metas: {
                            requestDateHr: moment(_.trim(_.get(mdaRequestMessage, "metas.requestDate")), "YYYYMMDDHHmmss").format("DD/MM/YYYY - HH:mm:ss"),
                            responseDateHr: !_.trim(_.get(mdaRequestMessage, "metas.responseDate")) ? "" : moment(_.trim(_.get(mdaRequestMessage, "metas.responseDate")), "YYYYMMDDHHmmss").format("DD/MM/YYYY - HH:mm:ss"),
                            responseLastCheckDateHr: !_.trim(_.get(mdaRequestMessage, "metas.responseLastCheckDate")) ? "" : moment(_.trim(_.get(mdaRequestMessage, "metas.responseLastCheckDate")), "YYYYMMDDHHmmss").format("DD/MM/YYYY - HH:mm:ss")
                        }
                    }),
                    mdaRequestsGridData: _.get(mdaRequestMessage, "attachment.request", []),
                    nextRequestDate: nextRequestDate,
                    everGotChecked: !!latestCheck,
                    lastCheckedSecondsAgo: moment().diff(mostRecentCheckOrRequestDate, "seconds", true),
                })

                // Trigger grid refresh
                this.set("mdaRequestsGridData", _.get(this, "mdaRequestsData.message.attachment.request", []))

                // 002 - Do we have any pending responses to wait for ? (Either not all patients we sent in request were matched in response(s) (or response(s) not obtained yet) AND user did not override / bypass the response checks)
                eInvoicingStep = missingAtLeastOneAnswer && !(parseInt(_.get(mdaRequestMessage,"metas.overriddenByUserDate",0))||0) ? "mdaCheckForResponses" : "mdaLastCallResultsDetails"
                eInvoicingStep === "mdaCheckForResponses" && this._e_mdaCheckForResponsesCountDown()

                return (this._setLoadingMessage({ message: this.localize('mh_eInvoicing.mda.step_7_done', this.language), icon: "check-circle", updateLastMessage: true, done: true }) || true) && this._setLoadingMessage({ message: this.localize('mh_eInvoicing.mda.step_8', this.language), icon: "arrow-forward" })

            })

            // 003 - Get responses no matter what (if any yet)
            .then(() => this.api.getRowsUsingPagination((key, docId) => this.api.message().findMessagesByTransportGuid("MH:FLATRATE-MDA-RESPONSE:" + exportedDate, null, key, docId, 1000)
                .then(pl => {
                    return {
                        rows: _.filter(pl.rows, it => it && _.get(it, 'fromHealthcarePartyId', false) === this.user.healthcarePartyId && _.get(it, "recipients", []).indexOf(this.user.healthcarePartyId) > -1 ),
                        nextKey: pl.nextKeyPair && pl.nextKeyPair.startKey,
                        nextDocId: pl.nextKeyPair && pl.nextKeyPair.startKeyDocId,
                        done: !pl.nextKeyPair
                    }
                }))
            )

            // 004 - Get attachment of each response(s)
            .then(mdaResponseMessages => !_.size(mdaResponseMessages) ? promResolve : promResolve.then(() => {
                let prom = Promise.resolve([])
                _.map(mdaResponseMessages, mdaResponseMessage => {
                    prom = prom
                        .then(promisesCarrier => (this._setLoadingMessage({ message: this.localize('mh_eInvoicing.mda.step_8', this.language), icon: "arrow-forward", updateLastMessage: true}) || true) && promisesCarrier)
                        .then(promisesCarrier =>
                            retry.retry(() => (this.api.document().findByMessage(this.user.healthcarePartyId, mdaResponseMessage).then(document => _.head(document))), 4, 1000, 1.5)
                                .then(document => !(_.size(_.get(document, "encryptionKeys")) || _.size(_.get(document, "delegations"))) ? ([document, []]) : this.api.crypto().extractKeysFromDelegationsForHcpHierarchy(this.user.healthcarePartyId, _.get(document, "id"), _.size(_.get(document, "encryptionKeys")) ? document.encryptionKeys : _.get(document, "delegations")).then(({extractedKeys}) => ([document, extractedKeys])))
                                .then(([document, edKeys]) => retry.retry(() => (this.api.document().getDocumentAttachment(_.get(document, "id"), _.get(document, "attachmentId"), (edKeys || []).join(','))), 4, 1000, 1.5).then(attachment => ([document, edKeys, attachment])).catch(() => ([document, edKeys, null])))
                                .then(([document, edKeys, attachment]) => _.merge(mdaResponseMessage, { document: document, edKeys: edKeys, attachment: JSON.parse(attachment) || {} }))
                                .then(messageAndAttachment => this._sleep(200).then(()=>messageAndAttachment)) // Cool down
                                .then(messageAndAttachment => _.concat(promisesCarrier, messageAndAttachment))
                                .catch(() => _.concat(promisesCarrier, mdaResponseMessage))
                        )
                })
                return prom
            }))

            .then(mdaResponseMessages => (this.set("mdaResponsesData", !_.size(mdaResponseMessages) ? {} : {
                    originalMessages: _.chain((mdaResponseMessages || [])).cloneDeep().map(it => _.omit(it, ["document", "edKeys", "attachment"])).value(),
                    messages: _.map(mdaResponseMessages || [], it => _.merge(it, {metas: {responseDateHr: !_.trim(_.get(it, "metas.responseDate")) ? "" : moment(_.trim(_.get(it, "metas.responseDate")), "YYYYMMDDHHmmss").format("DD/MM/YYYY - HH:mm:ss")}}))
                }) || true) && this._setLoadingMessage({ message: this.localize('mh_eInvoicing.mda.step_8_done', this.language), icon: "check-circle", updateLastMessage: true, done: true})
            )
            .then(() => {

                // 005 - Do we have any pending responses to wait for ? (Either not all patients we sent in request were matched in response(s) (or response(s) not obtained yet) AND user did not override / bypass the response checks)
                if (eInvoicingStep === "mdaCheckForResponses") throw new Error("dontGoAnyFurther");

                // 006 - We got so far, ie: go to response(s) status / patient corrections

            })

            .catch(() => {})
            .finally(() => {
                this.set("_isLoading", false)
                this.set("eInvoicingStep", eInvoicingStep)
                eInvoicingStep === "mdaLastCallResultsDetails" ? this._e_gotoMdaLastCallResultsDetails() : null
                this.shadowRoot.getElementById("domRepeatMdaRequests") && this.shadowRoot.getElementById("domRepeatMdaRequests").render()
                setTimeout(() => {
                    this.shadowRoot.getElementById("domIfTriggerRefresh1") && this.shadowRoot.getElementById("domIfTriggerRefresh1").render()
                    this.shadowRoot.getElementById("domIfTriggerRefresh2") && this.shadowRoot.getElementById("domIfTriggerRefresh2").render()
                    this.shadowRoot.getElementById("domIfTriggerRefresh3") && this.shadowRoot.getElementById("domIfTriggerRefresh3").render()
                }, 300)
            });

    }

}

customElements.define(HtMsgFlatrateMda.is, HtMsgFlatrateMda)





// Todo for prod: confirm TACK confirmMemberDataAcksAsyncUsingPOST(xFHCTokenId: string, xFHCKeystoreId: string, xFHCPassPhrase: string, hcpNihii: string, hcpName: string, mdaAcksHashes: Array<string>): Promise<boolean | any>;