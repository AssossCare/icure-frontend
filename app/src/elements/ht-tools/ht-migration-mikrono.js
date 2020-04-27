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

class HtMigrationMikrono extends TkLocalizerMixin(mixinBehaviors([IronResizableBehavior], PolymerElement))  {
    static get template() {
        return html`
        <style include="dialog-style scrollbar-style">

            #mikronoMigrationDialog{
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

            .mikronoMigrationDialog{
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
        
        <paper-dialog id="mikronoMigrationDialog" opened="{{opened}}">
            <div class="content mikronoMigrationDialog">
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
                       <paper-button on-tap="migrateUsersToMikrono" class="button" >Users</paper-button>
                       <paper-button on-tap="migrateTypesToMikrono" class="button" >Types</paper-button>
                       <paper-button on-tap="migrateFieldsToMikrono" class="button" >Appointments</paper-button>
                        <!-- content here -->
                    </div>
                </div>
                <div class="mig-menu-view">
                    <!-- content here -->
                    <template is="dom-if" if="[[userMigration]]">
                        <paper-button on-tap="startMigrateUsersToMikrono" class="button" >Users</paper-button>
                        <template is="dom-repeat" items="[[migratedUsers]]">
                            <div>[[item.Name]]: [[item.Status]]</div>
                        </template>
                    </template>
                    <template is="dom-if" if="[[typeMigration]]">
                        <paper-button on-tap="startMigrateTypesToMikrono" class="button" >Types</paper-button>
                        <template is="dom-repeat" items="[[migratedTypes]]">
                            <div>[[item.name]]: migrated</div>
                        </template>          
                    </template>
                    <template is="dom-if" if="[[fieldMigration]]">
                      <paper-button on-tap="startMigrateFieldsToMikrono" class="button" >Fields</paper-button>
                        <template is="dom-repeat" items="[[migratedFields]]">
                            <div>[[item.name]]: migrated</div>
                        </template>
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
        return 'ht-migration-mikrono';
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
            userMigration:{
                type: Boolean,
                value: false
            },
            typeMigration:{
                type: Boolean,
                value: false
            },
            fieldMigration:{
                type: Boolean,
                value: false
            },
            migratedUsers:{
                type: Array,
                value: function () {
                    return [];
                }
            },
            migratedTypes:{
                type: Array,
                value: function () {
                    return [];
                }
            },
            migratedFields:{
                type: Array,
                value: function () {
                    return [];
                }
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
        this.$.mikronoMigrationDialog.open();
    }

    migrateUsersToMikrono(){
        this.set('userMigration', true);
        this.set('typeMigration', false);
        this.set('fieldMigration', false);
    }

    migrateTypesToMikrono(){
        this.set('userMigration', false);
        this.set('typeMigration', true);
        this.set('fieldMigration', false);
    }

    migrateFieldsToMikrono(){
        this.set('userMigration', false);
        this.set('typeMigration', false);
        this.set('fieldMigration', true);
    }

    startMigrateUsersToMikrono() {
        //let userlist = [this.user];
        this.set("migratedUsers", [])
        this.api.user().listUsers().then(users => {
            const listOfUsers = users.rows
            //const listOfActivesUsersWithAgenda = listOfUsers && listOfUsers.filter(u => u && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url") && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user") && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password") && u.status && u.status === "ACTIVE" && u.id !== this.user.id) || []
            //return listOfActivesUsersWithAgenda
            return listOfUsers && listOfUsers.filter(u => u && u.login.includes('@')) || []
        }).then(userlist => {
            //userlist = [this.user]
            let arTmp = []
            userlist.forEach(usr => {
                arTmp.push({Name : usr.name, Status:"---"})
            })
            this.set("migratedUsers", arTmp)
            console.log("startMigrateUsersToMikrono", userlist)
            return this.createMikronoAgendaForEachUser(userlist).then(resList => {
                this.set("migratedUsers", resList)
                console.log("user after creation", resList);
                this.api.user().getUser(this.user.id).then(user => console.log("user after load", user));
            })
        })
    }

    setAlltoAllUsers(){
        //TODO: implement
        //display all agenda's to all users
    }

    startMigrateTypesToMikrono(){
        this.set("migratedTypes", [])
        return this.migrateAllAppointmentTypesToMikrono().catch((e) => console.log(e)).then(resList => {
            Promise.all(resList).then(res => {
                this.set("migratedTypes", res)
            })
        })
    }

    startMigrateFieldsToMikrono(){
        this.set("migratedFields", [])
        let tmp = []
        this.getAppTypes().then(appTypes => {
            this.api.user().listUsers().then(users => {
                const listOfUsers = users.rows
                return listOfUsers && listOfUsers.filter(u => u && u.login.includes('@')) || []
                // const lst = ['a@a.a',
                //     'b@b.b']
                // return listOfUsers && listOfUsers.filter(u => u && u.login.includes('@') && lst.includes(u.login)) || []
            }).then(userlist => {
                //userlist = [this.user];
                let lsDates = []
                const dStart = moment().subtract(90, 'days')
                const dEnd =  moment().add(12, 'months')
                let dCur = moment().subtract(90, 'days')
                while(dEnd.isAfter(dCur)){
                    lsDates.push(dCur.clone())
                    dCur = dCur.add(1,'days')
                }
                console.log("lsDates", lsDates);

                let prom = Promise.resolve([])
                _.map(lsDates, cDat => {
                    const startDat = cDat.format('YYYYMMDD000000')
                    const endDat = cDat.add(1, 'day').format('YYYYMMDD000000')
                    console.log("processing : ", startDat)
                    prom = prom
                        .then(promiseCarrier => this.migrateAppointmentsForEachUser(userlist, startDat, endDat, appTypes)
                        .then(x => _.concat(promiseCarrier,x))
                        .catch(() => _.concat(promiseCarrier,null)))
                })
                prom.then(resList =>{
                    Promise.all(resList).then(res => console.log(res))
                })
            })
        })
    }

    migrateAppointmentTypesToMikrono() {
        console.log("start migrateAllAppointmentTypesToMikrono");
        return this.migrateAllAppointmentTypesToMikrono().catch((e) => console.log(e)).then(() => {
        })
    }

    createMikronoAgendaForEachUser(userlist) {
        console.log("userlist: ", userlist)
        //userlist = userlist.slice(0,3);
        return Promise.all(userlist.map(user => {
            console.log("start creating mikrono agenda for user", user)
            return this.api.hcparty().getHealthcareParty(user.healthcarePartyId).then(hcp => {
                const applicationTokens = user.applicationTokens
                const mikronoUrl = user && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url") && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url").typedValue.stringValue || null
                const mikronoUser = user && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user") && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user").typedValue.stringValue || null
                const mikronoPassword = user && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password") && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password").typedValue.stringValue || null

                if (mikronoUrl && mikronoUser && mikronoPassword && applicationTokens && applicationTokens.MIKRONO) {
                    console.log("Agenda already exists", user, hcp)
                    return {Name: user.name, Status: "Agenda already exists"}
                } else {
                    const addresses = hcp && hcp.addresses || null
                    const workAddresses = addresses.find(adr => adr.addressType === "work") || null
                    const telecoms = workAddresses && workAddresses.telecoms
                    const workMobile = telecoms && telecoms.find(tel => tel.telecomType === "mobile" || tel.telecomType === "phone") || null
                    const workEmail = telecoms && telecoms.find(tel => tel.telecomType === "email") || null

                    if (workMobile && workMobile.telecomNumber !== "" && workEmail && workEmail.telecomNumber !== "") {
                        return this.api.bemikrono().register(user.id, {}).then(user => this.api.register(user, 'user')).then(userRes => {
                            if (userRes) {
                                this.api.user().getUser(user.id).then(u => {
                                    this.set('user', u)
                                    const applicationTokens = u.applicationTokens
                                    const mikronoUrl = u && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url") && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url").typedValue.stringValue || null
                                    const mikronoUser = u && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user") && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user").typedValue.stringValue || null
                                    const mikronoPassword = u && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password") && u.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password").typedValue.stringValue || null

                                    if (mikronoUrl && mikronoUser && mikronoPassword && applicationTokens && applicationTokens.MIKRONO) {
                                        console.log("Agenda created successfully", u, hcp)
                                        return {Name: user.name, Status: "Agenda created successfully"};
                                    } else {
                                        console.log("mikronoError", {
                                            user: u,
                                            errorMsg: "no token found despite having registered user",
                                            addresses: false,
                                            workAddresses: false,
                                            workMobile: false,
                                            workEmail: false,
                                            token: applicationTokens.MIKRONO ? true : false,
                                            error: true
                                        })
                                        return {Name: user.name, Status: "no token found despite having registered user"}
                                    }
                                });
                            } else {
                                console.log("mikronoError", {
                                    user: user,
                                    errorMsg: "error when registering user",
                                    addresses: addresses ? true : false,
                                    workAddresses: workAddresses ? true : false,
                                    workMobile: workMobile ? true : false,
                                    workEmail: workEmail ? true : false,
                                    token: applicationTokens.MIKRONO ? true : false,
                                    error: true
                                });
                                return {Name: user.name, Status: "error when registering user"}
                            }

                        })
                    } else {
                        console.log("mikronoError", {
                            user: user,
                            errorMsg: "no telecom",
                            addresses: addresses ? true : false,
                            workAddresses: workAddresses ? true : false,
                            workMobile: workMobile ? true : false,
                            workEmail: workEmail ? true : false,
                            token: applicationTokens.MIKRONO ? true : false,
                            error: true
                        });
                        return {Name: user.name, Status: "no telecom"}
                    }
                }
            })
        }))
    }

    migrateAllAppointmentTypesToMikrono() {
        const applicationTokens = _.get(this.user, "applicationTokens", "" )
        const mikronoUrl = this.user && this.user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url") && this.user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url").typedValue.stringValue || null
        const mikronoUser = this.user && this.user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user") && this.user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user").typedValue.stringValue || null
        const mikronoPassword = this.user && this.user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password") && this.user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password").typedValue.stringValue || null

        if(mikronoUrl && mikronoUser && mikronoPassword && applicationTokens && applicationTokens.MIKRONO){
            return this.api.calendaritemtype().getCalendarItemTypes().then(types => {
                //filter out the types that already have a mikronoId
                types = types.filter(type => !type.mikronoId);
                return types.map(item => {
                    return {
                        name: item.name,
                        color: item.color,
                        durationInMinutes: item.duration,
                        externalRef: item.id, // l'id topaz du CalendarItemType
                        //mikronoId; // renvoyé par mikrono
                        otherInfos: item.otherInfos,
                        subjectByLanguage: item.subjectByLanguage, // nom des types de rdv en plusieurs langues (fr, nl, ..)
                        originalObject: _.merge(item, {wasMigrated: true})
                    }
                })
            }).then(apps => {
                //apps = apps.slice(0,3);
                console.log("appointmentTypes to be send to mikrono: ", apps);
                if(apps && apps.length !== 0){
                    let prom = Promise.resolve([])
                    //apps = [apps[0]] //TODO remove
                    _.chunk(apps, 100).forEach(chunkOfAppointments => {
                        console.log("send chunk of appointmentTypes: ", chunkOfAppointments);
                        prom = prom.then(prevResults => this.api.bemikrono().createAppointmentTypes(chunkOfAppointments).then(appsResult => {
                            console.log("received appointmentTypes from mikrono: ", appsResult);
                            return appsResult.map(res => {
                                const appTyp = chunkOfAppointments.find(app => app.externalRef === res.externalRef);
                                let oobj = _.get(appTyp, "originalObject")
                                oobj.mikronoId = res.mikronoId;
                                console.log("modifying CalendarItemType:", oobj)
                                return this.api.calendaritemtype().modifyCalendarItemType( oobj )
                                    .then(itemType => {
                                        console.log("migrated itemType", itemType)
                                        /*this.push("migrationItems", { status: "", item: "Migration terminée"})*/
                                        return itemType;
                                    })
                            })
                        }).then(res => {
                            console.log("created 100 AppointmentTypes", res)
                            return prevResults.concat(res)
                        }))
                    })
                    prom = prom.then(results => {
                        console.log("created AppointmentTypes", results)
                        return Promise.resolve(results)
                    }).catch((e)=>{
                        console.log("error when creating AppointmentTypes", e)
                        return Promise.resolve([{Name: "", Status:"created AppointmentTypes: nothing to create!"}])
                    })
                    return prom
                }else{
                    console.log("created AppointmentTypes: nothing to create!")
                    return Promise.resolve([{Name: "", Status:"created AppointmentTypes: nothing to create!"}])
                }
            }).catch((e)=>{
                console.log("error when creating AppointmentTypes", e)
                return Promise.resolve([{Name: "", Status:"error when creating AppointmentTypes"}])
            })
        } else {
            console.log("Can't create AppointmentTypes: not a mikrono user", this.user)
            return Promise.resolve([{Name: "", Status:"Can't create AppointmentTypes: not a mikrono user"}])
        }
    }

    migrateAppointmentsForEachUser(userList, dFrom, dTo, mikronoTypeIdByTopazTypeId) {
        //1. get parentHcpId
        //2. get AppointmentTypes
        //3. get calendarItems of parentHcp (there are no other)
        //4. get UserList
        //5. get filter items and send to mikrono
        //6. modify changed calendarItems
        let curHcp
        //let mikronoTypeIdByTopazTypeId
        let allApps
        let mergedApps
        let resultApps
        return this.api.hcparty().getCurrentHealthcareParty()
            .then(hcp => {
                curHcp = hcp
                return this.getCalendarItems(curHcp.parentId, dFrom, dTo)
            })
            .then(apps => {
                allApps = apps
                return this.mergeCalendarItems(allApps, mikronoTypeIdByTopazTypeId, userList)
            })
            .then(apps => {
                mergedApps = apps
                return this.sendToMikrono(mergedApps)
            })
    }

    getAppTypes(){
        return this.api.calendaritemtype().getCalendarItemTypes().then(apptypes => {
            return apptypes.reduce((dict, apptype) => {
                dict[apptype.id] = apptype.mikronoId
                return dict
            }, {})
        })
    }

    getCalendarItems(hcpId, dFrom, dTo){
        return this.api.calendaritem().getCalendarItemsByPeriodAndHcPartyId(dFrom, dTo, hcpId)
    }

    mergeCalendarItems(apps, mikronoTypeIdByTopazTypeId, userList){
        let mergedApps = []
        userList.forEach(user => {
            let items = apps.filter(calItem => calItem.responsible === user.healthcarePartyId)
            if(items.length > 0 ){
                console.log("has items", items)
            }
            //items = items.filter(item => item.patientId && parseInt(_.get(item, "startTime", 0)) && parseInt(_.get(item, "endTime", 0)) && !_.get(item, "wasMigrated", false)).map(item => ({
            items = items.filter(item => item.patientId && parseInt(_.get(item, "startTime", 0)) && parseInt(_.get(item, "endTime", 0))).map(item => ({
                ownerRef: user.id,
                externalId: item.id,
                name: "ci_" + item.id,
                comments: _.trim(_.get(item, "details", "")) || null,
                customerId: item.patientId,
                title: _.trim(_.get(item, "title", "")) || null,
                startTime: (parseInt(_.get(item, "startTime", 0)) ? moment(_.trim(_.get(item, "startTime", "")), "YYYYMMDDHHmmss").format("YYYY-MM-DDTHH:mm:ss") + "Z" : null),
                endTime: (parseInt(_.get(item, "startTime", 0)) ? moment(_.trim(_.get(item, "endTime", "")), "YYYYMMDDHHmmss").format("YYYY-MM-DDTHH:mm:ss") + "Z" : null),
                type: mikronoTypeIdByTopazTypeId[item.calendarItemTypeId],
                appointmentTypeId: mikronoTypeIdByTopazTypeId[item.calendarItemTypeId],
                status: item.meetingTags.map(mt => mt.code).slice(-1)[0], // get last code to mark canceled appointments
                originalObject: _.merge(item, {wasMigrated: true})
            }))
            mergedApps = mergedApps.concat(items)
        })
        if(mergedApps.length > 0 ) {
            console.log("mergedApps", mergedApps)
        }
        return Promise.resolve(mergedApps)
    }

    sendToMikrono(apps){
        if(apps.length > 0) {
            return this.api.bemikrono().createAppointments(apps).then(appRes => {
                console.log("appRes", appRes);
                return apps.map(app => {
                    return this.api.calendaritem().modifyCalendarItem(_.get(app, "originalObject")).then(() => {
                        console.log("migrated item", app);
                        return app
                    })
                })
            })
        } else {
            return Promise.resolve([])
        }
    }

    migrateAppointmentsForEachUser_OLD_(userlist, dFrom, dTo) {

        return Promise.all(userlist.map(user => {
            const applicationTokens = _.get(user, "applicationTokens", "" )
            const mikronoUrl = user && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url") && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url").typedValue.stringValue || null
            const mikronoUser = user && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user") && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user").typedValue.stringValue || null
            const mikronoPassword = user && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password") && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password").typedValue.stringValue || null

            if(mikronoUrl && mikronoUser && mikronoPassword && applicationTokens && applicationTokens.MIKRONO){
                console.log("migrationItems", {status: "", item: "Récupération de vos rendez-vous en cours..."})

                return this.api.hcparty().getCurrentHealthcareParty().then(hcp => {
                    return this.api.calendaritemtype().getCalendarItemTypes().then(apptypes => {
                        let mikronoTypeIdByTopazTypeId = apptypes.reduce((dict, apptype) => {
                            dict[apptype.id] = apptype.mikronoId
                            return dict
                        }, {})
                        console.log("mikronoTypeIdByTopazTypeId", mikronoTypeIdByTopazTypeId);
                        return Promise.all([this.api.calendaritem().getCalendarItemsByPeriodAndHcPartyId(dFrom, dTo, user.healthcarePartyId)].concat(
                            hcp.parentId ? [this.api.calendaritem().getCalendarItemsByPeriodAndHcPartyId(dFrom, dTo, hcp.parentId)] : []
                        )).then(([a, b]) => {
                            const items = a.concat(b.filter(calItem => calItem.responsible === hcp.id))
                            //this.push("migrationItems", {status: "", item: "Traitement de vos rendez-vous en cours..."})
                            return items.filter(item => item.patientId && parseInt(_.get(item, "startTime", 0)) && parseInt(_.get(item, "endTime", 0)) && !_.get(item, "wasMigrated", false)).map(item => ({
                                ownerRef: user.id,
                                externalId: item.id,
                                name: "ci_" + item.id,
                                comments: _.trim(_.get(item, "details", "")) || null,
                                customerId: item.patientId,
                                title: _.trim(_.get(item, "title", "")) || null,
                                startTime: (parseInt(_.get(item, "startTime", 0)) ? moment(_.trim(_.get(item, "startTime", "")), "YYYYMMDDHHmmss").format("YYYY-MM-DDTHH:mm:ss") + "Z" : null),
                                endTime: (parseInt(_.get(item, "startTime", 0)) ? moment(_.trim(_.get(item, "endTime", "")), "YYYYMMDDHHmmss").format("YYYY-MM-DDTHH:mm:ss") + "Z" : null),
                                type: mikronoTypeIdByTopazTypeId[item.calendarItemTypeId],
                                appointmentTypeId: mikronoTypeIdByTopazTypeId[item.calendarItemTypeId],
                                status: item.meetingTags.map(mt => mt.code).slice(-1)[0], // get last code to mark canceled appointments
                                originalObject: _.merge(item, {wasMigrated: true})
                            }))
                        })
                    })
                }).then(apps => {
                    //apps = apps.slice(0,3);
                    console.log("migrationItems", apps, {status: "", item: "Migration de vos rendez-vous en cours..."})
                    if(apps && apps.length !== 0){
                        let prom = Promise.resolve([])
                        _.chunk(apps, 100).forEach(chunkOfAppointments => {
                            prom = prom.then(prevResults => this.api.bemikrono().createAppointments(chunkOfAppointments).then(appRes => {
                                console.log("appRes", appRes);
                                return chunkOfAppointments.map(app => {
                                    return this.api.calendaritem().modifyCalendarItem(_.get(app, "originalObject")).then(() => {
                                        console.log("migrated item", app);
                                        return app
                                    })
                                })
                            }).then(res => {
                                console.log("migrationItems", {status: "", item: "100 rendez-vous (de plus) migrés..."})
                                return prevResults.concat(res)
                            }))
                        })
                        prom = prom.then(results => {
                            console.log("Appointment migration done for user", user)
                            return Promise.resolve(results);
                        }).catch((e)=>{
                            console.log("error migrating appointments for user", e, user)
                            return Promise.resolve([{Name: user.id, Status:"created Appointments: error!"}])
                        })
                        return prom
                    }else{
                        console.log("Appointment migration done for user: nothing to migrate", user)
                        return Promise.resolve([{Name: user.id, Status:"created Appointments: nothing to create!"}])
                    }
                }).catch((e)=>{
                    console.log("error migrating appointments for user", e, user)
                    return Promise.resolve({Name: user.id, Status:"created Appointments: nothing to create!"});
                })
            } else {
                console.log("Can't create AppointmentTypes: not a mikrono user", this.user)
                return Promise.resolve([{Name: "", Status:"Can't create Appointments: not a mikrono user"}])
            }
        }))
    }

    migrateAppointmentsForEachUser_OLD(userlist) {

        return Promise.all(userlist.map(user => {
            const applicationTokens = _.get(user, "applicationTokens", "" )
            const mikronoUrl = user && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url") && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.url").typedValue.stringValue || null
            const mikronoUser = user && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user") && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.user").typedValue.stringValue || null
            const mikronoPassword = user && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password") && user.properties.find(p => p.type.identifier === "org.taktik.icure.be.plugins.mikrono.password").typedValue.stringValue || null

            if(mikronoUrl && mikronoUser && mikronoPassword && applicationTokens && applicationTokens.MIKRONO){
                console.log("migrationItems", {status: "", item: "Récupération de vos rendez-vous en cours..."})

                return this.api.hcparty().getCurrentHealthcareParty().then(hcp => {
                    return this.api.calendaritemtype().getCalendarItemTypes().then(apptypes => {
                        let mikronoTypeIdByTopazTypeId = apptypes.reduce((dict, apptype) => {
                            dict[apptype.id] = apptype.mikronoId
                            return dict
                        }, {})
                        console.log("mikronoTypeIdByTopazTypeId", mikronoTypeIdByTopazTypeId);
                        return Promise.all([this.api.calendaritem().getCalendarItemsByPeriodAndHcPartyId(moment().subtract(90, 'days').format('YYYYMMDDHHmmss'), moment().add(12, 'months').format('YYYYMMDDHHmmss'), user.healthcarePartyId)].concat(
                            hcp.parentId ? [this.api.calendaritem().getCalendarItemsByPeriodAndHcPartyId(moment().subtract(90, 'days').format('YYYYMMDDHHmmss'), moment().add(12, 'months').format('YYYYMMDDHHmmss'), hcp.parentId)] : []
                        )).then(([a, b]) => {
                            const items = a.concat(b.filter(calItem => calItem.responsible === hcp.id))
                            //this.push("migrationItems", {status: "", item: "Traitement de vos rendez-vous en cours..."})
                            return items.filter(item => item.patientId && parseInt(_.get(item, "startTime", 0)) && parseInt(_.get(item, "endTime", 0)) && !_.get(item, "wasMigrated", false)).map(item => ({
                                ownerRef: user.id,
                                externalId: item.id,
                                name: "ci_" + item.id,
                                comments: _.trim(_.get(item, "details", "")) || null,
                                customerId: item.patientId,
                                title: _.trim(_.get(item, "title", "")) || null,
                                startTime: (parseInt(_.get(item, "startTime", 0)) ? moment(_.trim(_.get(item, "startTime", "")), "YYYYMMDDHHmmss").format("YYYY-MM-DDTHH:mm:ss") + "Z" : null),
                                endTime: (parseInt(_.get(item, "startTime", 0)) ? moment(_.trim(_.get(item, "endTime", "")), "YYYYMMDDHHmmss").format("YYYY-MM-DDTHH:mm:ss") + "Z" : null),
                                type: mikronoTypeIdByTopazTypeId[item.calendarItemTypeId],
                                appointmentTypeId: mikronoTypeIdByTopazTypeId[item.calendarItemTypeId],
                                status: item.meetingTags.map(mt => mt.code).slice(-1)[0], // get last code to mark canceled appointments
                                originalObject: _.merge(item, {wasMigrated: true})
                            }))
                        })
                    })
                }).then(apps => {
                    //apps = apps.slice(0,3);
                    console.log("migrationItems", apps, {status: "", item: "Migration de vos rendez-vous en cours..."})
                    if(apps && apps.length !== 0){
                        let prom = Promise.resolve([])
                        _.chunk(apps, 100).forEach(chunkOfAppointments => {
                            prom = prom.then(prevResults => this.api.bemikrono().createAppointments(chunkOfAppointments).then(appRes => {
                                console.log("appRes", appRes);
                                return chunkOfAppointments.map(app => {
                                    return this.api.calendaritem().modifyCalendarItem(_.get(app, "originalObject")).then(() => {
                                        console.log("migrated item", app);
                                        return app
                                    })
                                })
                            }).then(res => {
                                console.log("migrationItems", {status: "", item: "100 rendez-vous (de plus) migrés..."})
                                return prevResults.concat(res)
                            }))
                        })
                        prom = prom.then(results => {
                            console.log("Appointment migration done for user", user)
                            return Promise.resolve(results);
                        }).catch((e)=>{
                            console.log("error migrating appointments for user", e, user)
                            return Promise.resolve([{Name: user.id, Status:"created Appointments: error!"}])
                        })
                        return prom
                    }else{
                        console.log("Appointment migration done for user: nothing to migrate", user)
                        return Promise.resolve([{Name: user.id, Status:"created Appointments: nothing to create!"}])
                    }
                }).catch((e)=>{
                    console.log("error migrating appointments for user", e, user)
                    return Promise.resolve({Name: user.id, Status:"created Appointments: nothing to create!"});
                })
            } else {
                console.log("Can't create AppointmentTypes: not a mikrono user", this.user)
                return Promise.resolve([{Name: "", Status:"Can't create Appointments: not a mikrono user"}])
            }
        }))
    }
}

customElements.define(HtMigrationMikrono.is, HtMigrationMikrono);
