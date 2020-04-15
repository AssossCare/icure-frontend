import '../../../dynamic-form/dynamic-link.js';
import '../../../dynamic-form/dynamic-pills.js';
import '../../../ht-spinner/ht-spinner.js';
import '../../../../styles/dialog-style.js';
import '../../../../styles/scrollbar-style.js';
import * as models from '@taktik/icc-api-legacy/dist/icc-api/model/models';
import moment from 'moment/src/moment';

import {PolymerElement, html} from '@polymer/polymer';
import {TkLocalizerMixin} from "../../../tk-localizer";
class HtPatHubMedicationSchemeView extends TkLocalizerMixin(PolymerElement) {
  static get template() {
    return html`
        <style include="dialog-style atc-styles scrollbar-style">
            paper-dialog {
                width: 90%;
                height: 80%;
            }

            paper-tabs {
                width: 50%;
                max-width: 400px;
                --paper-tabs-selection-bar-color: var(--app-secondary-color);
                /* margin: 0 auto; */
            }

            paper-tab {
                --paper-tab-ink: var(--app-secondary-color);
            }

            .present, .patient {
                height: 100%;
                overflow-y: auto;
                margin-top: 0;
                box-sizing: border-box;
            }

            .table-container {
                margin-bottom: 24px;
            }

            .header {
                background: linear-gradient(to right, var(--app-secondary-color), var(--app-secondary-color-dark));
                color: var(--app-text-color);
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                height: 40px;
                width: 100%;
                padding: 0 12px;
                box-sizing: border-box;
            }

            .header h3 {
                font-size: 14;
                font-weight: 400;
                margin: 0;
            }

            .header iron-icon {
                height: 20px;
                width: 20px;
                margin-right: 4px;
            }

            .table-header {
                width: 100%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                border-bottom: 1px solid var(--app-background-color-dark);
                font-size: 11px;
                color: var(--app-text-color-disabled);
                height: 28px;
            }

            .col {
                height: 100%;
                padding: 0 4px;
                box-sizing: border-box;
                display: flex;
                flex-flow: row wrap;
                justify-content: center;
                align-items: center;
            }

            .col--med {
                width: 30%;
                justify-content: flex-start;
            }

            .med--name {
                font-weight: 500;
                margin-right: 4px;
            }

            .col--photo {
                max-width: 56px;
                min-width: 56px;
                text-align: center;
                flex-grow: 1;
            }

            .col--bef, .col--dur, .col--aft {
                max-width: 56px;
                min-width: 56px;
                text-align: center;
                flex-grow: 1;
            }

            .col--noMoment{
                max-width: 168px;
                min-width: 168px;
                text-align: center;
                flex-grow: 1;
            }

            .dur-pill {
                background: var(--app-secondary-color);
                color: var(--app-text-color);
                font-weight: 500;
                border-radius: 50%;
                padding: 4px;
                display: block;
                height: 12px;
                width: 12px;
                line-height: 1.1;
                text-align: center;
            }

            .col--ed, .col--freq {
                text-align: center;
                width: 12%;
            }

            .col--com {
                width: 40%;
                justify-content: flex-start;
            }

            .table-row {
                width: 100%;
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                align-items: center;
                font-size: 12px;
                color: var(--app-text-color);
                height: 40px;
            }

            .table-row:nth-child(even) {
                background: var(--app-background-color-light);
            }

            .table-row .col:not(:last-child) {
                border-right: 1px solid var(--app-background-color-dark);
            }

            .general-infos {
                display: flex;
                flex-flow: row wrap;
                justify-content: flex-start;
                align-items: center;
                margin-bottom: 24px;
                background: var(--app-background-color-dark);
                padding: 12px;
                border-radius: 4px;
            }

            .infos-block {
                font-size: 14px;
                font-weight: 400;
                color: var(--app-text-color);
                margin-right: 24px;
            }

            .infos-block > div:first-child{
                margin-bottom: 8px;
            }

            .infos-block span {
                background: var(--app-background-color-light);
                border-radius: 12px;
                font-weight: 500;
                padding: 1px 8px;
                margin-right: 8px;
            }

            /* PRESENT */

            .table {
                display: flex;
                flex-flow: column nowrap;
                font-size: .8rem;
                line-height: 1.5;
                flex: 1 1 auto;
                min-width: 900px;
            }

            .table div{
                box-sizing: border-box;
            }

            .th {
                display: none;
                font-weight: 700;
                background-color: var(--app-background-color- );
            }

            .th:first-child {
                border-top: 1px solid var(--app-background-color-dark);
            }


            .th > .td {
                white-space: nowrap;
                text-overflow: ellipsis;
                justify-content: center;
            }

            .th .td {
                color: var(--app-text-color);
            }

            .th .td:first-child, .tr.category .td:first-child{
                width: 24px;
                max-width: 24px;
                box-sizing: border-box;
                border-right: none;
            }

            .tr {
                position: relative;
                width: 100%;
                display: flex;
                flex-flow: row nowrap;
                color: var(--app-text-color);
                z-index: 1;
                height: 24px;
            }

            .tr:not(.th):not(.category)::after {
                display: block;
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                height: 100%;
                width: 100%;
                z-index: 0;
            }

            .tr:not(.td):nth-child(odd)::after {
                opacity: 0.6;
                transition: all .24s cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .tr:not(.td):nth-child(even)::after {
                opacity: 0.8;
                transition: all .24s cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .tr:not(.td):hover::after {
                opacity: 1;
            }

            .tr.old {
                color: var(--app-text-color-disabled)!important;
            }
            .tr.old::after {
                background: var(--app-background-color-light)!important;
            }

            .tr:not(.category) {
                color: black;
            }

            .odd {
                background-color: var(--app-background-color);
            }

            .td {
                position: relative;
                display: flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: center;
                flex-grow: 1;
                flex-basis: 0;
                padding: 6px;
                overflow: hidden;
                min-width: 0px;
                z-index: 2;
                word-break: break-word;
                white-space: nowrap;
                border-right: 1px solid var(--app-background-color-dark);
                font-size: 13px;
            }

            .td span{
                text-overflow: ellipsis;
                width: 100%;
                overflow: hidden;
                text-align: center;
            }

            .td span.left{
                text-align: left;
            }

            .td-input{
                position: relative
            }

            .td iron-input > input{
                position: absolute;
                top: 0;
                left: 0;
                right: 0;
                bottom: 0;
                text-align: center;
                width: 100%;
                color: #fff;
                background-color: transparent;
                border: none;
                height: 100%;
                outline: 0;
                transition: all .24s cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .td iron-input > input:focus{
                animation: .24s ease-in forwards inputShadows;
            }

            .td iron-input > input:hover{
                background-color: rgba(0, 0, 0, .2);
                box-shadow: var(--app-shadow-elevation-1);
            }
            
            @keyframes inputShadows{
                from{ box-shadow: inset 0 0 0 rgba(0, 0, 0, .2); }
                to{ box-shadow: inset 0 0 50px rgba(0, 0, 0, .2); }
            }

            .td:first-child {
                border-left: 1px solid var(--app-background-color-dark);
            }

            .td--comments, .td--medicine, .td--category {
                justify-content: flex-start;
            }

            .td--category iron-icon {
                height: 14px;
                width: 14px;
                margin-right: 4px;
            }

            .th .td, .tr:last-of-type .td {
                border-bottom: 1px solid var(--app-background-color-dark);
            }

            .span-2 {
                padding: 6px 13px; /* 13px because we had the padding of the missings .td padding + their borders */
            }

            .span-3 {
                padding: 6px 19px; /* 19px because we had the padding of the missings .td padding + their borders */
            }

            .span-4 {
                padding: 6px 26px; /* 26px because we had the padding of the missings .td padding + their borders */
            }

            .span-5 {
                padding: 6px 31px; /* 31px because we had the padding of the missings .td padding + their borders */
            }

            .table .category {
                border-bottom: 1px solid #d0d0d0;
            }

            .reimbursed{
                width: 24px;
                max-width: 24px;
                box-sizing: border-box;
                padding: 0;
                border-right: none!important;
            }

            .reimbursed .reimbursed-status {
                height: 14px;
                width: 14px;
                padding: 2px;
                border-radius: 50%;
                box-shadow: 0 0 0 rgba(0, 0, 0, .2);
                transition: all .24s cubic-bezier(0.075, 0.82, 0.165, 1);
                z-index: 3;
            }

            .add-period-btn {
                height: 16px;
                width: 16px;
                padding: 0;
                color: var(--app-text-color);
                transition: all .24s cubic-bezier(0.075, 0.82, 0.165, 1);
            }

            .add-period-btn:hover {
                height: 18px;
                width: 18px;
                color: var(--app-secondary-color);
            }


            /* HISTORY */

            .history{
                margin-top: 24px;
            }

            .timeline-header{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                background: var(--app-background-color-light);
                border: 1px solid var(--app-background-color-dark);
            }

            .timeline div {
                box-sizing: border-box;
            }

            .years-container{
                max-width: calc(24px * 36 + 2px);
                width: calc(24px * 36 + 2px); /* 3 years + borders */
                overflow-x: auto;
                overflow-y: hidden;
                flex-grow: 1;
                display: flex;
                flex-flow: row nowrap;
                justify-content: flex-start;
                align-items: center;
                border-left: 1px solid var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
                position: relative;
            }

            .year-block{
                height: 48px;
                min-width: calc(24px * 12 + 3px); /* 3 borders */
                text-align: center;
                display:flex;
                flex-flow: row wrap;
                justify-content: space-between;
                align-items: center;
            }

            .year-block:not(:last-child){
                border-right: 1px solid var(--app-background-color-dark);
            }

            .year-block.current{
                font-weight: 500;
            }

            .year{
                width: 100%;
                height: 50%;
                border-bottom: 1px solid var(--app-background-color-dark);
            }

            .quarter{
                height: 50%;
                width: calc(24px * 3);
            }

            .quarter:not(:last-child){
                border-right: 1px solid var(--app-background-color-dark);
            }

            .futur-block{
                min-width: calc(24px * 4);
                width: calc(24px * 4);
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                justify-content: center;
            }

            .btn-left, .btn-right{
                display: flex;
                flex-flow: row wrap;
                align-items: center;
                height: 48px;
                width: 10%;
                flex-grow: 1;
            }

            .btn-left{
                justify-content: flex-end;
            }

            .btn-right{
                justify-content: flex-start;
            }

            .medication-category{
                display:flex;
                flex-flow: row nowrap;
                align-items: center;
                justify-content: space-between;
                color: var(--app-text-color);
                font-size: 10px;
                border-bottom: 1px solid var(--app-background-color-dark);
            }

            .medication-category span:first-child{
                width: 10%;
                flex-grow: 1;
                padding-left: 8px;
                display:block;
                height: 100%;
                box-sizing: border-box;
            }

            .medication-category span:nth-child(2){
                max-width: calc(24px * 36 + 2px);
                width: calc(24px * 36 + 2px);
                display:block;
                height: 20px;
                box-sizing: border-box;
                border-left: 1px solid var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
            }

            .medication-category span:last-child{
                width: 10%;
                flex-grow: 1;
                display:block;
                height: 100%;
                box-sizing: border-box;
            }

            .medication-line{
                display: flex;
                flex-flow: row nowrap;
                justify-content: space-between;
                width: 100%;
                align-items: center;
                height: 24px;
            }

            .medication-line:nth-child(even){
                background: #FAFAFA;
            }

            .medication-line .type{
                width: 10%;
                height: 100%;
                text-align: left;
                flex-grow: 1;
                padding-left: 8px;
            }

            .medication-line .extra-info{
                width: 10%;
                flex-grow: 1;
                padding: 0 8px;
                overflow: hidden;
                text-overflow: ellipsis;
                white-space: nowrap;
                height: 100%;
            }

            .medication-line .line-container{
                max-width: calc(24px * 36 + 2px);
                width: calc(24px * 36 + 2px);
                overflow: hidden;
                height: 24px;
                border-left: 1px solid var(--app-background-color-dark);
                border-right: 1px solid var(--app-background-color-dark);
            }

            .medication-line .line{
                display: flex;
                box-sizing: unset;
                position: absolute;
                color: #fff;
                border-radius: 2px;
                top: 0;
                left: 0;
                height: 100%;
                flex-flow: row wrap;
                align-items: center;
                justify-content: space-between;
                margin: 1px 0;
            }

            .medication-line .line::after{
                position: absolute;
                height: 100%;
                width: 100%;
                display: block;
                content:'';
                z-index: 0;
            }

            .medication-line .line.over{
                opacity: 0.6;
            }

            .line-total-width{
                position: relative;
                height: 100%;
            }

            .medication-line .line .name{
                text-align: left;
                margin-left: 4px;
                margin-bottom: 4px;
                z-index: 1;
                max-width: 100%;
                overflow: hidden;
                text-overflow: ellipsis;
                padding-right: 4px;
            }

            .medication-line .line .until{
                text-align: right;
                margin-right: 4px;
                margin-bottom: 4px;
                z-index: 1;
            }

            .medication-line .reimbursement-line{
                display: block;
                position: absolute;
                width: 100%;
                background: var(--app-status-color-ok);
                height: 4px;
                bottom: 0;
                transition: all .12s cubic-bezier(0.075, 0.82, 0.165, 1);
                cursor: pointer;
                overflow: visible;
            }

            .medication-line .reimbursement-line:hover{
                height: 6px;
            }

            paper-tooltip{
                --paper-tooltip: {
                    position: fixed;
                    z-index: 900;
                    width: auto;
                    left: 50%;
                    top: calc(10% + 24px);
                    transform: translate(-50%, -50%);
                    box-sizing: border-box;
                }
            }

            .medIcon{
                height: 28px;
                width: 28px;
            }

            .content{
                padding: 0;
            }

            .chronicIcon{
                height: 12px;
                width: 12px;
            }

            .suspensionIcon{
                height: 12px;
                width: 12px;
                color: var(--app-status-color-pending)
            }

            .compoundIcon{
                height: 12px;
                width: 12px;
                color: #2882ff;
            }

            .substanceIcon{
                height: 12px;
                width: 12px;
                color: #c62ac4;
            }

            .legend-chronicIcon{
                height: 18px;
                width: 18px;
            }

            .legend-suspensionIcon{
                height: 18px;
                width: 18px;
                color: var(--app-status-color-pending)
            }

            .oneShotIcon{
                height: 12px;
                width: 12px;
                color: #c60b44;
            }

            .legend-oneShotIcon{
                height: 18px;
                width: 18px;
                color: #c60b44;
            }

            .legend-compoundIcon{
                height: 14px;
                width: 14px;
                color: #2882ff;
            }

            .legend-substanceIcon{
                height: 14px;
                width: 14px;
                color: #c62ac4;
            }

            .legend-line{
                margin-right: 8px;
                font-size: var(--font-size-normal);
            }

            #legend {
                background: var(--app-background-color);
                border-radius: 4px;
                padding: 4px;
                width: 100%;
                box-sizing: border-box;
                margin-bottom: 12px;
            }

            .bold{
                font-weight: bold;
            }

            paper-tooltip{
                --paper-tooltip-delay-in:100;
                display: inline-block;
                position: absolute;
            }

            #medicationDetailDialog{
                height: 500px;
                width: 900px;
            }

            .modal-title{
                background:  var(--app-background-color-dark);
                margin-top: 0;
                padding-left: 24px;
            }

            .buttons{
                position: absolute;
                right: 0;
                bottom: 0;
            }

            .medicationDetailDialogContent{
                height: 400px;
                width: auto;
                overflow: auto;
            }

            .medication-detail-line{
                display: flex;
            }


            .flex{
                display: flex;
            }

            .pointer{
                cursor: pointer;
            }

            .suspension-info{
                margin-top: 5px;
            }

            .morningIcon{
                height: 18px;
                width: 18px;
            }

            .moonIcon{
                height: 12px;
                width: 12px;
            }

            .posologyBlock{
                padding: 4px;
            }


            .regimen-container{
                margin-bottom: 12px;
            }

            .headerMasterTitle{
                font-size: var(--font-size-large);
                background: var(--app-background-color-dark);
                padding: 0 12px;
                box-sizing: border-box;
            }

            .headerLabel{
                font-weight: bold;
            }

            .headerInfo{
                height: auto;
                width: 100%;
                box-sizing: border-box;
                padding: 4px;
                border: 1px solid var(--app-background-color-dark);
            }

            .contentMedDia{
                height: 100%;
                position: relative;
                background: white;
                margin: 0;
            }


        </style>

        <div class="content">
            <div id="legend">
                <span class="legend-line bold">[[localize('legend', 'Legend', language)]]: </span>
                <span class="legend-line"><iron-icon class="legend-chronicIcon" icon="icons:alarm-on"></iron-icon> [[localize('hub-chron-med', 'Chronic medication', language)]]</span>
                <span class="legend-line"><iron-icon class="legend-oneShotIcon" icon="vaadin:thumbs-up-o"></iron-icon> [[localize('hub-one-shot', 'One shot', language)]]</span>
                <span class="legend-line"><iron-icon class="legend-suspensionIcon" icon="icons:warning"></iron-icon> [[localize('hub-sus-med', 'Suspended medication', language)]]</span>
                <span class="legend-line"><iron-icon class="legend-compoundIcon" icon="vaadin:flask"></iron-icon> [[localize('hub-med-mag', 'Compound prescription', language)]]</span>
                <span class="legend-line"><iron-icon class="legend-substanceIcon" icon="vaadin:pill"></iron-icon> [[localize('hub-med-dci', 'DCI prescription', language)]]</span>
            </div>
            <div class="present">
                <div class="table">
                    <div class="tr th">
                        <div class="td reimbursed">

                        </div>
                        <div class="td span-5" style="flex-grow: 5;">

                        </div>
                        <div class="td span-3" style="flex-grow: 3;">

                        </div>
                        <div class="td" style="flex-grow: 1;">

                        </div>
                        <div class="td span-3" style="flex-grow: 3;">
                            <span>[[localize('mom_break','Breakfast',language)]]</span>
                        </div>
                        <div class="td" style="flex-grow: 1;">

                        </div>
                        <div class="td span-3" style="flex-grow: 3;">
                            <span>[[localize('mom_lunch','Lunch',language)]]</span>
                        </div>
                        <div class="td" style="flex-grow: 1;">

                        </div>
                        <div class="td span-3" style="flex-grow: 3;">
                            <span>[[localize('mom_dinner','Dinner',language)]]</span>
                        </div>
                        <div class="td" style="flex-grow: 1;">

                        </div>
                        <template is="dom-repeat" items="[[currentMedicationScheme.times]]" as="timeSlot">
                            <div class="td"></div>
                        </template>
                        <div class="td span-4" style="flex-grow: 4;">

                        </div>
                        <div class="td span-4" style="flex-grow: 4;">

                        </div>
                    </div>
                    <div class="tr th">
                        <div class="td reimbursed">

                        </div>
                        <div class="td td--medicine span-5" style="flex-grow: 5; justify-content: flex-start">
                            <span class="left">[[localize('medic','Medicine',language)]]</span>
                        </div>
                        <div class="td span-3" style="flex-grow: 3;">
                            <span>[[localize('freq','Frequency',language)]]</span>
                        </div>
                        <div class="td bf-bef">
                            <span><iron-icon icon="vaadin:morning" class="morningIcon"></iron-icon></span>
                        </div>
                        <div class="td bf-bef">
                            <span>[[localize('mom_before_short','Be',language)]]</span>
                        </div>
                        <div class="td bf-dur">
                            <span>[[localize('mom_during_short','Du',language)]]</span>
                        </div>
                        <div class="td bf-aft">
                            <span>[[localize('mom_after_short','Af',language)]]</span>
                        </div>
                        <div class="td bf-bef">
                            <span>10h</span>
                        </div>
                        <div class="td lu-bef">
                            <span>[[localize('mom_before_short','Be',language)]]</span>
                        </div>
                        <div class="td lu-dur">
                            <span>[[localize('mom_during_short','Du',language)]]</span>
                        </div>
                        <div class="td lu-aft">
                            <span>[[localize('mom_after_short','Af',language)]]</span>
                        </div>
                        <div class="td bf-bef">
                            <span>16h</span>
                        </div>
                        <div class="td di-bef">
                            <span>[[localize('mom_before_short','Be',language)]]</span>
                        </div>
                        <div class="td di-dur">
                            <span>[[localize('mom_during_short','Du',language)]]</span>
                        </div>
                        <div class="td di-aft">
                            <span>[[localize('mom_after_short','Af',language)]]</span>
                        </div>
                        <div class="td bf-bef">
                            <span><iron-icon icon="vaadin:moon-o" class="moonIcon"></iron-icon></span>
                        </div>
                        <template is="dom-repeat" items="[[currentMedicationScheme.times]]" as="timeSlot">
                            <div class="td">
                                <span>[[_getTimeDesc(timeSlot)]]</span>
                            </div>
                        </template>
                        <div class="td span-2" style="flex-grow: 2;">
                            <span>[[localize('start-date-short','Start',language)]]</span>
                        </div>
                        <div class="td span-2" style="flex-grow: 2;">
                            <span>[[localize('endDate-short','End',language)]]</span>
                        </div>
                        <div class="td td-comments span-4" style="flex-grow: 4; justify-content: space-between;">
                            <span class="left">[[localize('com','Comments',language)]]</span>
                        </div>
                    </div>
                    <!-- END HEADER -->
                    <!-- START BODY -->

                    <template is="dom-repeat" items="[[currentMedicationScheme.msElems]]" as="medicationsWithPosology">
                        <div class\$="tr [[_medicationClass(medicationsWithPosology)]] pointer" data-medication\$="[[medicationsWithPosology]]" on-tap="_showMedication">
                            <div class="td reimbursed">
                                <template is="dom-if" if="[[_isChronic(medicationsWithPosology)]]">
                                    <iron-icon class="chronicIcon" icon="icons:alarm-on"></iron-icon>
                                </template>
                                <template is="dom-if" if="[[_isOneShot(medicationsWithPosology)]]">
                                    <iron-icon class="oneShotIcon" icon="vaadin:thumbs-up-o"></iron-icon>
                                </template>
                                <template is="dom-if" if="[[_isSuspensions(medicationsWithPosology)]]">
                                    <iron-icon class="suspensionIcon" title="[[_getReasonOfSuspension(medicationsWithPosology)]]" icon="icons:warning"></iron-icon>
                                </template>
                                <template is="dom-if" if="[[_isCompoundPrescription(medicationsWithPosology.compoundprescription)]]">
                                    <iron-icon class="compoundIcon" icon="vaadin:flask"></iron-icon>
                                </template>
                                <template is="dom-if" if="[[_isSubstancePrescription(medicationsWithPosology.substanceproduct)]]">
                                    <iron-icon class="substanceIcon" icon="vaadin:pill"></iron-icon>
                                </template>
                            </div>
                            <div class="td td--medicine span-5" style="flex-grow: 5;">
                                <span class="left" title="[[_getMedicationName(medicationsWithPosology)]]">[[_getMedicationName(medicationsWithPosology)]]</span>
                            </div>
                            <div class="td span-3" style="flex-grow: 3;" title="[[_getPosology(medicationsWithPosology)]] [[_getDayInfo(medicationsWithPosology.regimen.0)]]"><span>[[_getPosology(medicationsWithPosology)]] [[_getDayInfo(medicationsWithPosology.regimen.0)]]</span></div>
                            <template is="dom-repeat" items="" as="regimen">
                                <div class="td td-input bf-bef">
                                    <span></span>
                                </div>
                            </template>
                            <div class="td td-input di-aft">[[_getRegimen(medicationsWithPosology.regimen.0, 0)]]</div>
                            <div class="td td-input bf-bef">[[_getRegimen(medicationsWithPosology.regimen.0, 1)]]</div>
                            <div class="td td-input bf-dur">[[_getRegimen(medicationsWithPosology.regimen.0, 2)]]</div>
                            <div class="td td-input bf-aft">[[_getRegimen(medicationsWithPosology.regimen.0, 3)]]</div>
                            <template is="dom-repeat" items="" as="regimen">
                                <div class="td td-input bf-bef">
                                    <span></span>
                                </div>
                            </template>
                            <div class="td td-input di-aft">[[_getRegimen(medicationsWithPosology.regimen.0, 4)]]</div>
                            <div class="td td-input lu-bef">[[_getRegimen(medicationsWithPosology.regimen.0, 5)]]</div>
                            <div class="td td-input lu-dur">[[_getRegimen(medicationsWithPosology.regimen.0, 6)]]</div>
                            <div class="td td-input lu-aft">[[_getRegimen(medicationsWithPosology.regimen.0, 7)]]</div>
                            <div class="td td-input di-aft">[[_getRegimen(medicationsWithPosology.regimen.0, 8)]]</div>
                            <template is="dom-repeat" items="" as="regimen">
                                <div class="td td-input bf-bef">
                                    <span></span>
                                </div>
                            </template>
                            <div class="td td-input di-bef">[[_getRegimen(medicationsWithPosology.regimen.0, 9)]]</div>
                            <div class="td td-input di-dur">[[_getRegimen(medicationsWithPosology.regimen.0, 10)]]</div>
                            <div class="td td-input di-aft">[[_getRegimen(medicationsWithPosology.regimen.0, 11)]]</div>
                            <div class="td td-input di-aft">[[_getRegimen(medicationsWithPosology.regimen.0, 12)]]</div>
                            <template is="dom-repeat" items="" as="regimen">
                                <div class="td td-input bf-bef">
                                    <span></span>
                                </div>
                            </template>
                            <template is="dom-repeat" items="[[currentMedicationScheme.times]]" as="timeSlot">
                                <div class="td td-input">
                                    <span>[[_getRegimen(medicationsWithPosology.regimen.0, timeSlot)]]</span>
                                </div>
                            </template>
                            <div class="td span-2" style="flex-grow: 2;" title="[[_getDateFromHub(medicationsWithPosology.beginmoment)]]"><span>[[_getDateFromHub(medicationsWithPosology.beginmoment)]]</span></div>
                            <div class="td span-2" style="flex-grow: 2;" title="[[_getDateFromHub(medicationsWithPosology.endmoment)]]"><span>[[_getDateFromHub(medicationsWithPosology.endmoment)]]</span></div>
                            <div class="td td--comments span-4" style="flex-grow: 4;" title="[[_getComment(medicationsWithPosology)]]"><span class="left">[[_getComment(medicationsWithPosology)]]</span></div>
                        </div>
                        <template is="dom-repeat" items="[[_getOtherRegimen(medicationsWithPosology.regimen)]]" as="reg">
                            <div class\$="tr [[_medicationClass(reg)]] pointer" data-medication\$="[[medicationsWithPosology]]" on-tap="_showMedication">
                                <div class="td reimbursed">

                                </div>
                                <div class="td td--medicine span-5" style="flex-grow: 5;">
                                    <span class="left"></span>
                                </div>
<!--                                <div class="td span-2" style="flex-grow: 2;"><span></span></div>-->
                                <div class="td span-3" style="flex-grow: 3;" title="[[_getDayInfo(reg)]]"><span>[[_getDayInfo(reg)]]</span></div>
                                <template is="dom-repeat" items="" as="regimen">
                                    <div class="td td-input bf-bef">
                                        <span></span>
                                    </div>
                                </template>
                                <div class="td td-input di-aft">[[_getRegimen(reg, 0)]]</div>
                                <div class="td td-input bf-bef">[[_getRegimen(reg, 1)]]</div>
                                <div class="td td-input bf-dur">[[_getRegimen(reg, 2)]]</div>
                                <div class="td td-input bf-aft">[[_getRegimen(reg, 3)]]</div>
                                <template is="dom-repeat" items="" as="regimen">
                                    <div class="td td-input bf-bef">
                                        <span></span>
                                    </div>
                                </template>
                                <div class="td td-input di-aft">[[_getRegimen(reg, 4)]]</div>
                                <div class="td td-input lu-bef">[[_getRegimen(reg, 5)]]</div>
                                <div class="td td-input lu-dur">[[_getRegimen(reg, 6)]]</div>
                                <div class="td td-input lu-aft">[[_getRegimen(reg, 7)]]</div>
                                <div class="td td-input di-aft">[[_getRegimen(reg, 8)]]</div>
                                <template is="dom-repeat" items="" as="regimen">
                                    <div class="td td-input bf-bef">
                                        <span></span>
                                    </div>
                                </template>
                                <div class="td td-input di-bef">[[_getRegimen(reg, 9)]]</div>
                                <div class="td td-input di-dur">[[_getRegimen(reg, 10)]]</div>
                                <div class="td td-input di-aft">[[_getRegimen(reg, 11)]]</div>
                                <div class="td td-input di-aft">[[_getRegimen(reg, 12)]]</div>
                                <template is="dom-repeat" items="" as="regimen">
                                    <div class="td td-input bf-bef">
                                        <span></span>
                                    </div>
                                </template>
                                <template is="dom-repeat" items="[[currentMedicationScheme.times]]" as="timeSlot">
                                    <div class="td td-input">
                                        <span>[[_getRegimen(reg, timeSlot)]]</span>
                                    </div>
                                </template>
                                <div class="td span-2" style="flex-grow: 2;"><span></span></div>
                                <div class="td span-2" style="flex-grow: 2;"><span></span></div>
                                <div class="td td--comments span-4" style="flex-grow: 4;"><span class="left"></span></div>
                            </div>
                        </template>
<!--                        <template is="dom-repeat" items="[[_getOtherRegimen(medicationsWithPosology.regimenWeekDay)]]" as="reg">-->
<!--                            <div class\$="tr [[_medicationClass(reg)]] pointer" data-medication\$=[[medicationsWithPosology]] on-tap="_showMedication">-->
<!--                                <div class="td reimbursed">-->

<!--                                </div>-->
<!--                                <div class="td td&#45;&#45;medicine span-5" style="flex-grow: 5;">-->
<!--                                    <span class="left"></span>-->
<!--                                </div>-->
<!--                                <div class="td span-2" style="flex-grow: 2;"><span>[[_getDayInfo(reg)]]</span></div>-->
<!--                                <template is="dom-repeat" items="" as="regimen">-->
<!--                                    <div class="td td-input bf-bef">-->
<!--                                        <span></span>-->
<!--                                    </div>-->
<!--                                </template>-->
<!--                                <div class="td td-input di-aft">[[_getRegimen(reg, 0)]]</div>-->
<!--                                <div class="td td-input bf-bef">[[_getRegimen(reg, 1)]]</div>-->
<!--                                <div class="td td-input bf-dur">[[_getRegimen(reg, 2)]]</div>-->
<!--                                <div class="td td-input bf-aft">[[_getRegimen(reg, 3)]]</div>-->
<!--                                <template is="dom-repeat" items="" as="regimen">-->
<!--                                    <div class="td td-input bf-bef">-->
<!--                                        <span></span>-->
<!--                                    </div>-->
<!--                                </template>-->
<!--                                <div class="td td-input di-aft">[[_getRegimen(reg, 4)]]</div>-->
<!--                                <div class="td td-input lu-bef">[[_getRegimen(reg, 5)]]</div>-->
<!--                                <div class="td td-input lu-dur">[[_getRegimen(reg, 6)]]</div>-->
<!--                                <div class="td td-input lu-aft">[[_getRegimen(reg, 7)]]</div>-->
<!--                                <div class="td td-input di-aft">[[_getRegimen(reg, 8)]]</div>-->
<!--                                <template is="dom-repeat" items="" as="regimen">-->
<!--                                    <div class="td td-input bf-bef">-->
<!--                                        <span></span>-->
<!--                                    </div>-->
<!--                                </template>-->
<!--                                <div class="td td-input di-bef">[[_getRegimen(reg, 9)]]</div>-->
<!--                                <div class="td td-input di-dur">[[_getRegimen(reg, 10)]]</div>-->
<!--                                <div class="td td-input di-aft">[[_getRegimen(reg, 11)]]</div>-->
<!--                                <div class="td td-input di-aft">[[_getRegimen(reg, 12)]]</div>-->
<!--                                <template is="dom-repeat" items="" as="regimen">-->
<!--                                    <div class="td td-input bf-bef">-->
<!--                                        <span></span>-->
<!--                                    </div>-->
<!--                                </template>-->
<!--                                <template is="dom-repeat" items="[[currentMedicationScheme.times]]" as="timeSlot">-->
<!--                                    <div class="td td-input">-->
<!--                                        <span>[[_getRegimen(reg, timeSlot)]]</span>-->
<!--                                    </div>-->
<!--                                </template>-->
<!--                                <div class="td span-2" style="flex-grow: 2;"><span></span></div>-->
<!--                                <div class="td span-2" style="flex-grow: 2;"><span></span></div>-->
<!--                                <div class="td td&#45;&#45;comments span-4" style="flex-grow: 4;"><span class="left"></span></div>-->
<!--                            </div>-->
<!--                        </template>-->
                    </template>
                </div>
                <!-- END BODY -->
                <!-- END TABLE -->
            </div>


        </div>

        <paper-dialog id="medicationDetailDialog" on-iron-overlay-closed="_closeMedicationDetailDialog">
            <div class="contentMedDia">
                <div class="modal-title">
                    [[_getMedicationName(selectedMedication)]]
                    <template is="dom-if" if="[[_isChronic(selectedMedication)]]">
                        <div>
                            <iron-icon class="legend-chronicIcon" icon="icons:alarm-on"></iron-icon> [[localize('hub-chron-med', 'Chronic medication', language)]]
                        </div>
                    </template>
                    <template is="dom-if" if="[[_isOneShot(selectedMedication)]]">
                        <div>
                            <iron-icon class="oneShotIcon" icon="vaadin:thumbs-up-o"></iron-icon> [[localize('hub-one-shot', 'One shot', language)]]
                        </div>
                    </template>
                    <template is="dom-if" if="[[_isSuspensions(selectedMedication)]]">
                        <div>
                            <iron-icon class="legend-suspensionIcon" icon="icons:warning"></iron-icon> [[localize('hub-sus-med', 'Suspended medication', language)]]
                        </div>
                    </template>
                    <template is="dom-if" if="[[_isCompoundPrescription(selectedMedication.compoundprescription)]]">
                        <div>
                            <iron-icon class="legend-compoundIcon" icon="vaadin:flask"></iron-icon> [[localize('hub-med-mag', 'Compound prescription', language)]]
                        </div>
                    </template>
                    <template is="dom-if" if="[[_isSubstancePrescription(selectedMedication.substanceproduct)]]">
                        <div>
                            <iron-icon class="legend-substanceIcon" icon="vaadin:pill"></iron-icon> [[localize('hub-med-dci', 'DCI prescription', language)]]
                        </div>
                    </template>
                </div>
                <div class="medicationDetailDialogContent">

                    <div class="regimen-container">
                        <div class="headerMasterTitle headerLabel">[[localize('hub-med-trt-date', 'Treatment date', language)]]</div>
                        <div class="headerInfo">
                            [[_getDateFromHub(selectedMedication.beginmoment)]] au [[_getDateFromHub(selectedMedication.endmoment)]]
                        </div>
                    </div>

                    <template is="dom-if" if="[[selectedMedication.usePresent]]">
                        <div class="regimen-container">
                            <div class="headerMasterTitle headerLabel">[[localize('hub-med-use', 'Medication use', language)]]</div>
                            <div class="headerInfo">
                                [[_getMedicationUse(selectedMedication.useTexts)]]
                            </div>
                        </div>
                    </template>

                    <template is="dom-if" if="[[_isCompoundPrescription(selectedMedication.compoundprescription)]]">
                        <div class="regimen-container">
                            <div class="headerMasterTitle headerLabel">[[localize('des', 'Description', language)]]</div>
                            <div class="headerInfo">
                                <template is="dom-repeat" items="[[selectedMedication.compoundprescription.magistraltext]]" as="magistralText">
                                    <div>
                                        [[magistralText.value]]
                                    </div>
                                </template>
                                <template is="dom-repeat" items="[[selectedMedication.compoundprescription.mixedContent]]" as="content">
                                    <div>
                                        [[content]]
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>

                    <template is="dom-if" if="[[selectedMedication.regimen]]">
                        <div class="regimen-container">
                            <div class="headerMasterTitle headerLabel">[[localize('pos', 'Posology', language)]]</div>
                            <div class="headerInfo">
                                <template is="dom-repeat" items="[[selectedMedication.regimen]]" as="regimens">
                                    <div>
                                        <template is="dom-repeat" items="[[regimens]]" as="reg">
                                            [[_getRegimenAsText(reg)]]
                                        </template>
                                    </div>
                                </template>
                            </div>
                        </div>
                    </template>

                    <template is="dom-if" if="[[_isSuspensions(selectedMedication)]]">
                        <template is="dom-repeat" items="[[selectedMedication.suspensions]]" as="sus">
                            <div class="regimen-container">
                                <div class="headerMasterTitle headerLabel">[[localize('Suspension','Suspension',language)]] [[_getDateFromHub(sus.beginmoment)]] au [[_getDateFromHub(sus.endmoment)]]</div>
                                <div class="headerInfo">
                                    <div>
                                        [[_getReasonOfSuspensionForDialog(sus)]]
                                    </div>
                                </div>
                            </div>
                        </template>
                    </template>

                    <template is="dom-if" if="[[_getComment(selectedMedication)]]">
                        <div class="regimen-container">
                            <div class="headerMasterTitle headerLabel">[[localize('com','Comment',language)]]</div>
                            <div class="headerInfo">
                                [[_getComment(selectedMedication)]]
                            </div>
                        </div>
                    </template>

                </div>
                <div class="buttons">
                    <paper-button class="button" on-tap="_closeMedicationDetailDialog">[[localize('clo','Close',language)]]</paper-button>
                </div>
            
        

    </div></paper-dialog>
`;
  }

  static get is() {
      return 'ht-pat-hub-medication-scheme-view';
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
          patient:{
              type: Object
          },
          language: {
              type: String
          },
          currentMedicationScheme:{
              type: Object,
              value: () => {}
          },
          periodicity:{
              type: Object,
              value: [
                  {code : 'D', label: {fr:'/jour', en: '', nl: '/dag'}},
                  {code : 'DA', label: {fr:'/8 jours', en: '', nl: '/8 dagen'}},
                  {code : 'DD', label: {fr:'/3 jours', en: '', nl: '/3 dagen'}},
                  {code : 'DE', label: {fr:'/11 jours', en: '', nl: '/11 dagen'}},
                  {code : 'DN', label: {fr:'/9 jours', en: '', nl: '/9 dagen'}},
                  {code : 'DQ', label: {fr:'/5 jours', en: '', nl: '/5 dagen'}},
                  {code : 'DT', label: {fr:'/2 jours', en: '', nl: '/2 dagen'}},
                  {code : 'DV', label: {fr:'/4 jours', en: '', nl: '/4 dagen'}},
                  {code : 'DW', label: {fr:'/12 jours', en: '', nl: '/12 dagen'}},
                  {code : 'DX', label: {fr:'/10 jours', en: '', nl: '/10 dagen'}},
                  {code : 'DZ', label: {fr:'/6 jours', en: '', nl: '/6 dagen'}},
                  {code : 'J', label: {fr:'/an', en: '', nl: '/jaar'}},
                  {code : 'JD', label: {fr:'/3 ans', en: '', nl: '/3 jaar'}},
                  {code : 'JH2', label: {fr:'/6 mois', en: '', nl: '/6 maand'}},
                  {code : 'JQ', label: {fr:'/5 ans', en: '', nl: '/5 jaar'}},
                  {code : 'JT', label: {fr:'/2 ans', en: '', nl: '/2 jaar'}},
                  {code : 'JV', label: {fr:'/4 ans', en: '', nl: '/4 jaar'}},
                  {code : 'JZ', label: {fr:'/6 ans', en: '', nl: '/6 jaar'}},
                  {code : 'M', label: {fr:'/mois', en: '', nl: '/maand'}},
                  {code : 'MA', label: {fr:'/8 mois', en: '', nl: '/8 maand'}},
                  {code : 'MC', label: {fr:'/18 mois', en: '', nl: '/18 maand'}},
                  {code : 'MD', label: {fr:'/3 mois', en: '', nl: '/3 maand'}},
                  {code : 'ME', label: {fr:'/11 mois', en: '', nl: '/11 maand'}},
                  {code : 'MN', label: {fr:'/9 mois', en: '', nl: '/9 maand'}},
                  {code : 'MQ', label: {fr:'/5 mois', en: '', nl: '/5 maand'}},
                  {code : 'MS', label: {fr:'/7 mois', en: '', nl: '/7 maand'}},
                  {code : 'MT', label: {fr:'/2 mois', en: '', nl: '/2 maand'}},
                  {code : 'MV', label: {fr:'/4 mois', en: '', nl: '/4 maand'}},
                  {code : 'MX', label: {fr:'/10 mois', en: '', nl: '/10 maand'}},
                  {code : 'MZ2', label: {fr:'/6 mois', en: '', nl: '/6 maand'}},
                  {code : 'O1', label: {fr:'Tout les 2 jours', en: '', nl: '/elke 2 dagen'}},
                  {code : 'ondemand', label: {fr:'Sur demande', en: '', nl: 'Op vraag'}},
                  {code : 'U', label: {fr:'/heure', en: '', nl: '/u'}},
                  {code : 'UA', label: {fr:'/8 heures', en: '', nl: '/8 u'}},
                  {code : 'UD', label: {fr:'/3 heures', en: '', nl: '/3 u'}},
                  {code : 'UE', label: {fr:'/11 heures', en: '', nl: '/11 u'}},
                  {code : 'UH', label: {fr:'/demi-heure', en: '', nl: '/30 min'}},
                  {code : 'UN', label: {fr:'/9 heures', en: '', nl: '/9 u'}},
                  {code : 'UQ', label: {fr:'/5 heures', en: '', nl: '/5 u'}},
                  {code : 'US', label: {fr:'/7 heures', en: '', nl: '/7 u'}},
                  {code : 'UT', label: {fr:'/2 heures', en: '', nl: '/2 u'}},
                  {code : 'UV', label: {fr:'/4 heures', en: '', nl: '/4 u'}},
                  {code : 'UW', label: {fr:'/12 heures', en: '', nl: '/12 u'}},
                  {code : 'UX', label: {fr:'/10 heures', en: '', nl: '/10 u'}},
                  {code : 'UZ', label: {fr:'/6 heures', en: '', nl: '/6 u'}},
                  {code : 'W', label: {fr:'/semaine', en: '', nl: '/week'}},
                  {code : 'WA', label: {fr:'/8 semaines', en: '', nl: '/8 weken'}},
                  {code : 'WD', label: {fr:'/3 semaines', en: '', nl: '/3 weken'}},
                  {code : 'WE', label: {fr:'/11 semaines', en: '', nl: '/11 weken'}},
                  {code : 'WN', label: {fr:'/9 semaines', en: '', nl: '/9 weken'}},
                  {code : 'WP', label: {fr:'/24 semaines', en: '', nl: '/24 weken'}},
                  {code : 'WQ', label: {fr:'/5 semaines', en: '', nl: '/5 weken'}},
                  {code : 'WS', label: {fr:'/7 semaines', en: '', nl: '/7 weken'}},
                  {code : 'WT', label: {fr:'/2 semaines', en: '', nl: '/2 weken'}},
                  {code : 'WV', label: {fr:'/4 semaines', en: '', nl: '/4 weken'}},
                  {code : 'WW', label: {fr:'/12 semaines', en: '', nl: '/12 weken'}},
                  {code : 'WX', label: {fr:'/10 semaines', en: '', nl: '/10 weken'}},
                  {code : 'WZ', label: {fr:'/6 semaines', en: '', nl: '/6 weken'}}
              ]
          },
          selectedMedication: {
              type: Object,
              value: () => {}
          },
          administrationUnit:{
              type: Object,
              value : [
                  {code: "00001", label: {fr: "x 5 ml", en: '', nl: ''}},
                  {code: "00002", label: {fr: "amp.", en: '', nl: ''}},
                  {code: "00003", label: {fr: "applic.", en: '', nl: ''}},
                  {code: "00004", label: {fr: "caps.", en: '', nl: ''}},
                  {code: "00005", label: {fr: "compr.", en: '', nl: ''}},
                  {code: "00006", label: {fr: "dose", en: '', nl: ''}},
                  {code: "00007", label: {fr: "gouttes", en: '', nl: ''}},
                  {code: "00008", label: {fr: "flac.", en: '', nl: ''}},
                  {code: "00009", label: {fr: "implant", en: '', nl: ''}},
                  {code: "00010", label: {fr: "perfusion", en: '', nl: ''}},
                  {code: "00011", label: {fr: "inhalation", en: '', nl: ''}},
                  {code: "00012", label: {fr: "insert", en: '', nl: ''}},
                  {code: "00013", label: {fr: "gommes à mâcher", en: '', nl: ''}},
                  {code: "00014", label: {fr: "compresse(s)", en: '', nl: ''}},
                  {code: "00015", label: {fr: "lavement", en: '', nl: ''}},
                  {code: "00016", label: {fr: "ml", en: '', nl: ''}},
                  {code: "00017", label: {fr: "ov.", en: '', nl: ''}},
                  {code: "00018", label: {fr: "perle(s)", en: '', nl: ''}},
                  {code: "00019", label: {fr: "pastille", en: '', nl: ''}},
                  {code: "00020", label: {fr: "patch", en: '', nl: ''}},
                  {code: "00021", label: {fr: "patr.", en: '', nl: ''}},
                  {code: "00022", label: {fr: "stylo", en: '', nl: ''}},
                  {code: "00023", label: {fr: "puff(s)", en: '', nl: ''}},
                  {code: "00024", label: {fr: "éponge", en: '', nl: ''}},
                  {code: "00025", label: {fr: "stylo", en: '', nl: ''}},
                  {code: "00026", label: {fr: "suppo", en: '', nl: ''}},
                  {code: "00027", label: {fr: "tube", en: '', nl: ''}},
                  {code: "00028", label: {fr: "mèche", en: '', nl: ''}},
                  {code: "00029", label: {fr: "sac", en: '', nl: ''}},
                  {code: "00030", label: {fr: "sachets(s)", en: '', nl: ''}},
                  {code: "cm", label: {fr: "centimètre", en: '', nl: ''}},
                  {code: "dropsperminute", label: {fr: "goutes par minute", en: '', nl: ''}},
                  {code: "gm", label: {fr: "gramme", en: '', nl: ''}},
                  {code: "internationalunits", label: {fr: "unités internationales", en: '', nl: ''}},
                  {code: "mck/h", label: {fr: "microgramme par heure", en: '', nl: ''}},
                  {code: "mck/kg/minute", label: {fr: "microgramme par kilogramme par minute", en: '', nl: ''}},
                  {code: "measure", label: {fr: "mesure", en: '', nl: ''}},
                  {code: "mg", label: {fr: "milligramme", en: '', nl: ''}},
                  {code: "mg/h", label: {fr: "milligramme par heure", en: '', nl: ''}},
                  {code: "mg/ml", label: {fr: "milligramme par millimètre", en: '', nl: ''}},
                  {code: "ml/h", label: {fr: "millilitre par heure", en: '', nl: ''}},
                  {code: "tbl", label: {fr: "cuillère à soupe", en: '', nl: ''}},
                  {code: "tsp", label: {fr: "cuillère à café", en: '', nl: ''}},
                  {code: "unt/h", label: {fr: "unités par heure", en: '', nl: ''}}
              ]
          }
      }
  }

  static get observers() {
      return ['dataProvider(currentMedicationScheme.*)'];
  }

  ready() {
      super.ready();
  }

  dataProvider(){
      this.set('selectedMedication', {})
      console.log(this.currentMedicationScheme)
  }

  _getMedicationName(medication){
      return medication && medication.medicinalproduct && medication.medicinalproduct.intendedname ? medication && medication.medicinalproduct && medication.medicinalproduct.intendedname :
          medication && medication.substanceproduct && medication.substanceproduct.intendedname ? medication.substanceproduct.intendedname  :
              medication && medication.compoundprescription !== null ? "Magistrale" : null


  }

  _getPosology(medication){
      const period = medication && medication.frequency && medication.frequency.periodicity && medication.frequency.periodicity.cd && medication.frequency.periodicity.cd.value || null
      const periodicity = this.periodicity.find(p => p.code === period) || null
      return periodicity && periodicity.label && periodicity.label[this.language] ? periodicity.label[this.language] : null
  }

  _convertHubDateAsString(timestamp){
      return timestamp && timestamp.millis ? this.api.moment(timestamp.millis).format("DD/MM/YYYY") : "//";
  }

  _getDateFromHub(date){
      return date && date.date ? this._convertHubDateAsString(date.date) : null
  }

  _getComment(medication){
      return medication && medication.posology && medication.posology.text && medication.posology.text.value || null
  }

  _isChronic(medication){
      return medication && medication.temporality && medication.temporality.cd && medication.temporality.cd.value === "CHRONIC" ? true : false
  }

  _isOneShot(medication){
      return medication && medication.temporality && medication.temporality.cd && medication.temporality.cd.value === "ONESHOT" ? true : false
  }

  _getRegimen(regimen, period){

      const concernPeriod = period === 0 ? "morning" :
          period === 1 ? "beforebreakfast" :
          period === 2 ? "duringbreakfast" :
          period === 3 ? "afterbreakfast" :
          period === 4 ? "betweenbreakfastandlunch" :
          period === 5 ? "beforelunch" :
          period === 6 ? "duringlunch" :
          period === 7 ? "afterlunch" :
          period === 8 ? "betweenlunchanddinner" :
          period === 9 ? "beforedinner" :
          period === 10 ? "duringdinner" :
          period === 11 ? "afterdinner" :
          period === 12 ? "evening" :
          period >= 19700101000000 ? period.toString() : null

     if(period >= 100) console.log("Concerned period = ", concernPeriod)
     return regimen && regimen.filter(r => period == 12 ? _.toLower(r.dayTime) === 'evening' || _.toLower(r.dayTime) === 'night' || _.toLower(r.dayTime) === 'thehourofsleep'  : _.toLower(r.dayTime) === concernPeriod).reduce((tot, r) => tot + Number(r.quantity), 0) || null
  }

  _getOtherRegimen(regimen){
      return _.drop(regimen)
  }

  _getRegimenAsText(regimen){
      const administrationInfo = this.administrationUnit.find(adm => adm.code === regimen.administrationUnit) || null
      const adminUnit = administrationInfo && administrationInfo.label && administrationInfo.label[this.language] ? administrationInfo.label[this.language] : administrationInfo.label["fr"]

      return this._getDayFreqDesc(regimen) + regimen.quantity+" "+adminUnit+" "+ this._getDayTimeDesc(regimen.dayTime)
  }

  _getDayFreqDesc(regimen){
      return regimen.dayNumber ? (this.localize("daynr", "Day #", this.language) + regimen.dayNumber + ":") :
          (regimen.weekDay ? ((regimen.weekNumber ? (this.localize("weeknr", "Week #", this.language) + regimen.weekNumber + ":") : "") + this.localize(regimen.weekDay, regimen.weekDay, this.language) + ":") : (""));
  }

  _getDayTimeDesc(dayTime){

      return !isNaN(dayTime) ? this._getTimeDesc(dayTime) : this.localize('ms_'+_.toLower(dayTime), _.toLower(dayTime), this.language);
  }

  _isSuspensions(medication){
      return medication && medication.suspended === true ? true : false
  }

  _getReasonOfSuspension(medication){
      return _.flatten(medication && medication.suspensions && medication.suspensions.map(s => s && s.reasonTexts && s.reasonTexts.map(r => r && r.value))).join(',') || null
  }

  _getReasonOfSuspensionForDialog(suspension){
      return _.flatten(suspension && suspension.reasonTexts && suspension.reasonTexts.map(r => r.value)).join(',') || null
  }

  _getMedicationUse(useTexts){
      return useTexts && useTexts.map(u => u.value).join(',') || null
  }

  _isCompoundPrescription(compoundPrescription){
      return compoundPrescription && compoundPrescription !== null ? true : false
  }

  _isSubstancePrescription(substanceProduct){
      return substanceProduct && substanceProduct !== null ? true : false
  }

  _getDayInfo(regimen){
      //return regimen.dayNumber ? (this.localize("daynr", "Day #", this.language) + regimen.dayNumber + ":") :
      //    (regimen.weekday ? ((regimen.weekNumber ? (this.localize("weeknr", "Week #", this.language) + regimen.weekNumber + ":") : "") + this.localize(regimen.weekday, regimen.weekday, this.language) + ":") : (""));

      return regimen && regimen.find(r => r.dayNumber) && regimen.find(r => r.dayNumber).dayNumber ? (this.localize("daynr", "Day # ", this.language) + regimen.find(r => r.dayNumber).dayNumber) :
          regimen && regimen.find(r => r.weekNumber) && regimen.find(r => r.weekNumber).weekNumber ? (this.localize("weeknr", "Week # ", this.language) + regimen.find(r => r.weekNumber).weekNumber) :
              regimen && regimen.find(r => r.weekDay) && regimen.find(r => r.weekDay).weekDay ? (this.localize(regimen.find(r => r.weekDay).weekDay, regimen.find(r => r.weekDay).weekDay, this.language)): ""
  }

  _getTimeDesc(time){
      return  time && time.toString().length >= 14 ? time.toString().substr(8,2) + ":" + time.toString().substr(10,2) : "";
  }


  _showMedication(e){
      this.set('selectedMedication', {})
      if(e.currentTarget.dataset.medication){
          this.set('selectedMedication', JSON.parse(e.currentTarget.dataset.medication))
          this.$['medicationDetailDialog'].open()
      }
  }

  _closeMedicationDetailDialog(){
      this.set('selectedMedication', {})
      this.$['medicationDetailDialog'].close()
  }

  _medicationClass(m) {
      return (m.idKmehr%2 == 0) ? 'even' : 'odd'
  }
}
customElements.define(HtPatHubMedicationSchemeView.is, HtPatHubMedicationSchemeView);
