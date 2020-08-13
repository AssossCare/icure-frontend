const $_documentContainer = document.createElement('template');

$_documentContainer.innerHTML = `<dom-module id="shared-styles">
	<template>
		<style is="custom-style">
			:host {
				--padding-32: {
					padding: 32px;
				};

				--padding-16: {
					padding: 16px;
				};

				--padding-right-left-32:{
					padding-right: 32px;
					padding-left: 32px;
				};
				--padding-right-left-24: {
					padding-right: 24px;
					padding-left: 24px;
				};
				--padding-right-left-16:{
					padding-right: 16px;
					padding-left: 16px;
				};

				--padding-right-left-8: {
					padding-right: 8px;
					padding-left: 8px;
				};
				--padding-left-8: {
					padding-left: 8px;
				};
				--padding-left-16: {
					padding-left: 16px;
				};

				--padding-menu-item: {
					padding-left: 12px;
                	padding-right: 4px;
				};

				--transition: {
					transition: all 0.28s cubic-bezier(0.4, 0, 0.2, 1);
				};

				--text-shadow: {
					text-shadow:0 1px 1px rgba(0,0,0,0.4);
				};
				
				--flex-rw-c-sa: {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    justify-content: space-around;
                };

                --flex-rnw-c-sa: {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: space-around;
                };

                --flex-rw-s-sa: {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: stretch;
                    justify-content: space-around;
                };

                --flex-rnw-s-sa: {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: stretch;
                    justify-content: space-around;
                };

                --flex-rw-c-fs: {
                    display: flex;
                    flex-flow: row wrap;
                    align-items: center;
                    justify-content: flex-start;
                };

                --flex-rnw-c-fs: {
                    display: flex;
                    flex-flow: row nowrap;
                    align-items: center;
                    justify-content: flex-start;
                };
                
                --flex-rrnw-c-fs: {
                    display: flex;
                    flex-flow: row-reverse nowrap;
                    align-items: center;
                    justify-content: flex-start;
                };

				--form-font-size: 14px;
                --font-size-normal: 13px;
                --font-size-large: 14px;
                --font-size-small: 11px;
			}

			::selection{
				background: var(--app-secondary-color);
			}

			::-moz-selection{
				background: var(--app-secondary-color);
			}

			*:focus{
				outline: 0!important;
			}


			.page-title {
				@apply --paper-font-display2;
			}

			@media (max-width: 600px) {
				.page-title {
					font-size: 24px!important;
				}
			}
			.scrollable {
				box-sizing: border-box;
				height: 100%;
				padding: 10px 0;
				overflow-y: auto;
			}
			paper-listbox {
				background: #fff;
			}
			iron-pages {
				height:100%;
				padding: 0;
				margin: 0;
			}
			section {
				height:100%;
				padding: 0;
				margin: 0;
			}
			menu-bar paper-button {
				padding: 0;
			}
			menu-bar a {
				color: #fff;
				text-decoration: none;
				height: 48px;
				display: block;
				vertical-align: middle;
				padding: 15px;
				box-sizing: border-box;
			}

			.view {height: 100%;}
			.tree {
				width: 30%;
				min-width: 300px;
				padding-right: 20px;
				height: 100%;
			}
			paper-material {margin:0; height:calc(100% - 30px); background: #fcfcfc;}
			.assets>paper-material, .network>paper-material, .settings>paper-material {
				width: calc(100% - 30px);
			}
			.assets>paper-material paper-material {
				height:auto;
				margin: 10px;
				width: calc(100% - 30px);
				box-sizing: border-box;
				padding: 5px;
			}
			device-list .logo img {
				width: 120px;
			}

			.tree paper-listbox {background: transparent;}
			.channels {
				height: 100%;
			}


			.menu-tree paper-item {
				@apply --shadow-elevation-4dp;
				width: 180px;
				margin: 10px;
			}
			.menu-tree .menu-content {
				padding: 0 0 0 20px;
			}
			.side {
				/*padding-left: 10px;
				box-sizing: border-box;*/
				background: #f6F6F6;
			}

			paper-material.side {height: 100%;padding: 0px 5px 0px 5px;width:100%;margin:0;box-sizing: border-box;}
			.side paper-material{height: auto;padding: 0px 5px 0px 5px;margin:10px 15px 10px 5px;width: 96%;}
			.side paper-toolbar {background: #fff;color:#555;}

			.media {
				width: 120px;
				height: 90px;
				position: relative;
				@apply --shadow-elevation-4dp;
				margin: 5px;
				background: #555;
				color:#ddd;
				border: 3px solid transparent;
				font-size: .8em;
			}


			.media .logo{
				width: 100%;
				height: 70px;
				position: relative;
				border-bottom: 1px solid rgba(220,220,220,0.5);
			}
			.media img {
				position: absolute;
				top:50%;
				left:50%;
				transform: translate(-50%, -50%);
				max-width: 90%;
				max-height: 90%;
			}
			.media .name {
				text-align:center;
				padding-top: 2px;
				font-size: .9em;
			}
			.media.iron-selected, .media.selected {
				border: 3px solid #12c6fc;
				border-radius: 3px;
			}

			.sortable-ghost {
				opacity: .2;
			}
			.inherited #menu {
				opacity: 0.6;
			}

			#selectChannelDialog {
				width: 70%;
				height: 80%;
			}




			.circle {
				display: inline-block;

				width: 64px;
				height: 64px;

				text-align: center;

				color: #555;
				border-radius: 50%;
				background: #ddd;

				font-size: 30px;
				line-height: 64px;
			}

			h1 {
				margin: 16px 0;

				color: #212121;

				font-size: 22px;
			}

			.modal-button {
				--paper-button-ink-color: var(--app-secondary-color-dark);
				color: var(--app-text-color);
				font-weight: 400;
				font-size: var(--font-size-normal);
				height: 28px;
				min-width: 100px;
				padding: 0 12px;
				text-transform: capitalize;
				background: var(--app-background-color-dark);
				margin: 0 4px;
            }

			.modal-button--save {
				box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
				background: var(--app-secondary-color);
				color: var(--app-primary-color-dark);
				font-weight: 700;
            }

            .loadingIcon {
                margin-right:5px;
                margin-top:-4px;
            }

            .loadingIcon.done {
                color: var(--app-secondary-color);
            }

            .cursorPointer{
                cursor:pointer;
            }

            #loadingContainer {
                position:absolute;
                width: 100%;
                height: 100%;
                top: 0;left: 0;
                background-color: rgba(0,0,0,.2);
                z-index: 10;
                margin:0;
            }

            #loadingContentContainer {
                position:relative;
                width: 400px;
                background-color: #ffffff;
                padding:20px;
                border:3px solid var(--app-secondary-color);
                margin:40px auto 0 auto;
                text-align: center;
            }

			.m0auto { margin:0 auto }

			.mminus1 { margin:-1px }
			.mminus2 { margin:-2px }
			.mminus3 { margin:-3px }
			.mminus4 { margin:-4px }
			.mminus5 { margin:-5px }

			.m0 { margin:0px !important; }
			.m1 { margin:1px !important; }
			.m2 { margin:2px !important; }
			.m3 { margin:3px !important; }
			.m4 { margin:4px !important; }
			.m5 { margin:5px !important; }
			.m6 { margin:6px !important; }
			.m7 { margin:7px !important; }
			.m8 { margin:8px !important; }
			.m9 { margin:9px !important; }
			.m10 { margin:10px !important; }
			.m15 { margin:15px !important; }
			.m20 { margin:20px !important; }
			.m25 { margin:25px !important; }
			.m30 { margin:30px !important; }
			.m35 { margin:35px !important; }
			.m40 { margin:40px !important; }
			.m45 { margin:45px !important; }
			.m50 { margin:50px !important; }

			.mtminus1 { margin-top:-1px !important; }
			.mtminus2 { margin-top:-2px !important; }
			.mtminus3 { margin-top:-3px !important; }
			.mtminus4 { margin-top:-4px !important; }
			.mtminus5 { margin-top:-5px !important; }

			.mt0 { margin-top:0px !important; }
			.mt1 { margin-top:1px !important; }
			.mt2 { margin-top:2px !important; }
			.mt3 { margin-top:3px !important; }
			.mt4 { margin-top:4px !important; }
			.mt5 { margin-top:5px !important; }
			.mt6 { margin-top:6px !important; }
			.mt7 { margin-top:7px !important; }
			.mt8 { margin-top:8px !important; }
			.mt9 { margin-top:9px !important; }
			.mt10 { margin-top:10px !important; }
			.mt15 { margin-top:15px !important; }
			.mt20 { margin-top:20px !important; }
			.mt25 { margin-top:25px !important; }
			.mt30 { margin-top:30px !important; }
			.mt35 { margin-top:35px !important; }
			.mt40 { margin-top:40px !important; }
			.mt45 { margin-top:45px !important; }
			.mt50 { margin-top:50px !important; }
			.mt60 { margin-top:60px !important; }
			.mt70 { margin-top:70px !important; }
			.mt80 { margin-top:80px !important; }
			.mt90 { margin-top:90px !important; }
			.mt100 { margin-top:100px !important; }

			.mrminus1 { margin-right:-1px !important; }
			.mrminus2 { margin-right:-2px !important; }
			.mrminus3 { margin-right:-3px !important; }
			.mrminus4 { margin-right:-4px !important; }
			.mrminus5 { margin-right:-5px !important; }

			.mr0 { margin-right:0px !important; }
			.mr1 { margin-right:1px !important; }
			.mr2 { margin-right:2px !important; }
			.mr3 { margin-right:3px !important; }
			.mr4 { margin-right:4px !important; }
			.mr5 { margin-right:5px !important; }
			.mr6 { margin-right:6px !important; }
			.mr7 { margin-right:7px !important; }
			.mr8 { margin-right:8px !important; }
			.mr9 { margin-right:9px !important; }
			.mr10 { margin-right:10px !important; }
			.mr15 { margin-right:15px !important; }
			.mr20 { margin-right:20px !important; }
			.mr25 { margin-right:25px !important; }
			.mr30 { margin-right:30px !important; }
			.mr35 { margin-right:35px !important; }
			.mr40 { margin-right:40px !important; }
			.mr45 { margin-right:45px !important; }
			.mr50 { margin-right:50px !important; }

			.mbminus1 { margin-bottom:-1px !important; }
			.mbminus2 { margin-bottom:-2px !important; }
			.mbminus3 { margin-bottom:-3px !important; }
			.mbminus4 { margin-bottom:-4px !important; }
			.mbminus5 { margin-bottom:-5px !important; }

			.mb0 { margin-bottom:0px !important; }
			.mb1 { margin-bottom:1px !important; }
			.mb2 { margin-bottom:2px !important; }
			.mb3 { margin-bottom:3px !important; }
			.mb4 { margin-bottom:4px !important; }
			.mb5 { margin-bottom:5px !important; }
			.mb6 { margin-bottom:6px !important; }
			.mb7 { margin-bottom:7px !important; }
			.mb8 { margin-bottom:8px !important; }
			.mb9 { margin-bottom:9px !important; }
			.mb10 { margin-bottom:10px !important; }
			.mb15 { margin-bottom:15px !important; }
			.mb20 { margin-bottom:20px !important; }
			.mb25 { margin-bottom:25px !important; }
			.mb30 { margin-bottom:30px !important; }
			.mb35 { margin-bottom:35px !important; }
			.mb40 { margin-bottom:40px !important; }
			.mb45 { margin-bottom:45px !important; }
			.mb50 { margin-bottom:50px !important; }

			.mlminus1 { margin-left:-1px !important; }
			.mlminus2 { margin-left:-2px !important; }
			.mlminus3 { margin-left:-3px !important; }
			.mlminus4 { margin-left:-4px !important; }
			.mlminus5 { margin-left:-5px !important; }

			.ml0 { margin-left:0px !important; }
			.ml1 { margin-left:1px !important; }
			.ml2 { margin-left:2px !important; }
			.ml3 { margin-left:3px !important; }
			.ml4 { margin-left:4px !important; }
			.ml5 { margin-left:5px !important; }
			.ml6 { margin-left:6px !important; }
			.ml7 { margin-left:7px !important; }
			.ml8 { margin-left:8px !important; }
			.ml9 { margin-left:9px !important; }
			.ml10 { margin-left:10px !important; }
			.ml15 { margin-left:15px !important; }
			.ml20 { margin-left:20px !important; }
			.ml25 { margin-left:25px !important; }
			.ml30 { margin-left:30px !important; }
			.ml35 { margin-left:35px !important; }
			.ml40 { margin-left:40px !important; }
			.ml45 { margin-left:45px !important; }
			.ml50 { margin-left:50px !important; }

			.p0 { padding:0px !important; }
			.p1 { padding:1px !important; }
			.p2 { padding:2px !important; }
			.p3 { padding:3px !important; }
			.p4 { padding:4px !important; }
			.p5 { padding:5px !important; }
			.p6 { padding:6px !important; }
			.p7 { padding:7px !important; }
			.p8 { padding:8px !important; }
			.p9 { padding:9px !important; }
			.p10 { padding:10px !important; }
			.p15 { padding:15px !important; }
			.p20 { padding:20px !important; }
			.p25 { padding:25px !important; }
			.p30 { padding:30px !important; }
			.p35 { padding:35px !important; }
			.p40 { padding:40px !important; }
			.p45 { padding:45px !important; }
			.p50 { padding:50px !important; }

			.pt0 { padding-top:0px !important; }
			.pt1 { padding-top:1px !important; }
			.pt2 { padding-top:2px !important; }
			.pt3 { padding-top:3px !important; }
			.pt4 { padding-top:4px !important; }
			.pt5 { padding-top:5px !important; }
			.pt6 { padding-top:6px !important; }
			.pt7 { padding-top:7px !important; }
			.pt8 { padding-top:8px !important; }
			.pt9 { padding-top:9px !important; }
			.pt10 { padding-top:10px !important; }
			.pt15 { padding-top:15px !important; }
			.pt20 { padding-top:20px !important; }
			.pt25 { padding-top:25px !important; }
			.pt30 { padding-top:30px !important; }
			.pt35 { padding-top:35px !important; }
			.pt40 { padding-top:40px !important; }
			.pt45 { padding-top:45px !important; }
			.pt50 { padding-top:50px !important; }
			.pt60 { padding-top:60px !important; }
			.pt70 { padding-top:70px !important; }
			.pt80 { padding-top:80px !important; }
			.pt90 { padding-top:90px !important; }
			.pt100 { padding-top:100px !important; }

			.pr0 { padding-right:0px !important; }
			.pr1 { padding-right:1px !important; }
			.pr2 { padding-right:2px !important; }
			.pr3 { padding-right:3px !important; }
			.pr4 { padding-right:4px !important; }
			.pr5 { padding-right:5px !important; }
			.pr6 { padding-right:6px !important; }
			.pr7 { padding-right:7px !important; }
			.pr8 { padding-right:8px !important; }
			.pr9 { padding-right:9px !important; }
			.pr10 { padding-right:10px !important; }
			.pr15 { padding-right:15px !important; }
			.pr20 { padding-right:20px !important; }
			.pr25 { padding-right:25px !important; }
			.pr30 { padding-right:30px !important; }
			.pr35 { padding-right:35px !important; }
			.pr40 { padding-right:40px !important; }
			.pr45 { padding-right:45px !important; }
			.pr50 { padding-right:50px !important; }

			.pb0 { padding-bottom:0px !important; }
			.pb1 { padding-bottom:1px !important; }
			.pb2 { padding-bottom:2px !important; }
			.pb3 { padding-bottom:3px !important; }
			.pb4 { padding-bottom:4px !important; }
			.pb5 { padding-bottom:5px !important; }
			.pb6 { padding-bottom:6px !important; }
			.pb7 { padding-bottom:7px !important; }
			.pb8 { padding-bottom:8px !important; }
			.pb9 { padding-bottom:9px !important; }
			.pb10 { padding-bottom:10px !important; }
			.pb15 { padding-bottom:15px !important; }
			.pb20 { padding-bottom:20px !important; }
			.pb25 { padding-bottom:25px !important; }
			.pb30 { padding-bottom:30px !important; }
			.pb35 { padding-bottom:35px !important; }
			.pb40 { padding-bottom:40px !important; }
			.pb45 { padding-bottom:45px !important; }
			.pb50 { padding-bottom:50px !important; }
			.pb60 { padding-bottom:60px !important; }
			.pb70 { padding-bottom:70px !important; }
			.pb80 { padding-bottom:80px !important; }
			.pb90 { padding-bottom:90px !important; }
			.pb100 { padding-bottom:100px !important; }

			.pl0 { padding-left:0px !important; }
			.pl1 { padding-left:1px !important; }
			.pl2 { padding-left:2px !important; }
			.pl3 { padding-left:3px !important; }
			.pl4 { padding-left:4px !important; }
			.pl5 { padding-left:5px !important; }
			.pl6 { padding-left:6px !important; }
			.pl7 { padding-left:7px !important; }
			.pl8 { padding-left:8px !important; }
			.pl9 { padding-left:9px !important; }
			.pl10 { padding-left:10px !important; }
			.pl15 { padding-left:15px !important; }
			.pl20 { padding-left:20px !important; }
			.pl25 { padding-left:25px !important; }
			.pl30 { padding-left:30px !important; }
			.pl35 { padding-left:35px !important; }
			.pl40 { padding-left:40px !important; }
			.pl45 { padding-left:45px !important; }
			.pl50 { padding-left:50px !important; }

			.fspoint1em { font-size:.1em; }
			.fspoint2em { font-size:.2em; }
			.fspoint3em { font-size:.3em; }
			.fspoint4em { font-size:.4em; }
			.fspoint5em { font-size:.5em; }
			.fspoint6em { font-size:.6em; }
			.fspoint7em { font-size:.7em; }
			.fspoint8em { font-size:.8em; }
			.fspoint9em { font-size:.9em; }

			.fs1em { font-size:1em; }
			.fs11em { font-size:1.1em; }
			.fs12em { font-size:1.2em; }
			.fs13em { font-size:1.3em; }
			.fs14em { font-size:1.4em; }
			.fs15em { font-size:1.5em; }
			.fs16em { font-size:1.6em; }
			.fs17em { font-size:1.7em; }
			.fs18em { font-size:1.8em; }
			.fs19em { font-size:1.9em; }
			.fs2em { font-size:2em; }

			.fsNormal { font-size:var(--font-size-normal); }

			.clear { clear: both; }
			.clearl { clear: left; }
			.clearr { clear: right; }

			.cursorpointer{ cursor:pointer; }

			.textaligncenter { text-align: center; }
			.textalignleft { text-align: left; }
			.textalignright { text-align: right; }

			.fw100 {font-weight:100!important;}
			.fw200 {font-weight:200!important;}
			.fw300 {font-weight:300!important;}
			.fw400 {font-weight:400!important;}
			.fw500 {font-weight:500!important;}
			.fw600 {font-weight:600!important;}
			.fw700 {font-weight:700!important;}
			.fw800 {font-weight:800!important;}
			.fw900 {font-weight:900!important;}

			.displayblock {display:block}
			.displayinlineblock {display:inline-block}
			.displaynone {display:none}
			.displayFlex {display: flex}

			.fontstyleitalic {font-style:italic;}
			.fontstylenormal {font-style:normal;}

			.uppercase { text-transform: uppercase; }

			.bt0 {border-top:0!important;}
			.br0 {border-right:0!important;}
			.bb0 {border-bottom:0!important;}
			.bl0 {border-left:0!important;}

			.fr {float:right}
			.fl {float:left}
			.flnone {float:none}
			.fl50 { float:left; width: calc(50% - 10px); }
			.fr50 { float:right; width: calc(50% - 10px) }

			@media screen and (max-width:960px) {
				.fl50 { float: none; width: 100% }
				.fr50 { float: none; width: 100% }
			}

			.w10pc { width:10%!important; }
			.w20pc { width:20%!important; }
			.w30pc { width:30%!important; }
			.w40pc { width:40%!important; }
			.w50pc { width:50%!important; }
			.w60pc { width:60%!important; }
			.w70pc { width:70%!important; }
			.w80pc { width:80%!important; }
			.w90pc { width:90%!important; }
			.w100pc { width:100%!important; }

			.minw0 { min-width:0px!important; }
			.minw1 { min-width:1px!important; }
			.minw2 { min-width:2px!important; }
			.minw3 { min-width:3px!important; }
			.minw4 { min-width:4px!important; }
			.minw5 { min-width:5px!important; }
			.minw6 { min-width:6px!important; }
			.minw7 { min-width:7px!important; }
			.minw8 { min-width:8px!important; }
			.minw9 { min-width:9px!important; }
			.minw10 { min-width:10px!important; }
			.minw15 { min-width:15px!important; }
			.minw20 { min-width:20px!important; }
			.minw25 { min-width:25px!important; }
			.minw30 { min-width:30px!important; }
			.minw35 { min-width:35px!important; }
			.minw40 { min-width:40px!important; }
			.minw45 { min-width:45px!important; }
			.minw50 { min-width:50px!important; }
			.minw55 { min-width:55px!important; }
			.minw60 { min-width:60px!important; }
			.minw65 { min-width:65px!important; }
			.minw70 { min-width:70px!important; }
			.minw75 { min-width:75px!important; }
			.minw80 { min-width:80px!important; }
			.minw85 { min-width:85px!important; }
			.minw90 { min-width:90px!important; }
			.minw95 { min-width:95px!important; }
			.minw100 { min-width:100px!important; }

			.mw0 { max-width:0px!important; }
			.mw1 { max-width:1px!important; }
			.mw2 { max-width:2px!important; }
			.mw3 { max-width:3px!important; }
			.mw4 { max-width:4px!important; }
			.mw5 { max-width:5px!important; }
			.mw6 { max-width:6px!important; }
			.mw7 { max-width:7px!important; }
			.mw8 { max-width:8px!important; }
			.mw9 { max-width:9px!important; }
			.mw10 { max-width:10px!important; }
			.mw15 { max-width:15px!important; }
			.mw20 { max-width:20px!important; }
			.mw25 { max-width:25px!important; }
			.mw30 { max-width:30px!important; }
			.mw35 { max-width:35px!important; }
			.mw40 { max-width:40px!important; }
			.mw45 { max-width:45px!important; }
			.mw50 { max-width:50px!important; }
			.mw55 { max-width:55px!important; }
			.mw60 { max-width:60px!important; }
			.mw65 { max-width:65px!important; }
			.mw70 { max-width:70px!important; }
			.mw75 { max-width:75px!important; }
			.mw80 { max-width:80px!important; }
			.mw85 { max-width:85px!important; }
			.mw90 { max-width:90px!important; }
			.mw95 { max-width:95px!important; }
			.mw100 { max-width:100px!important; }
			
			.mw0pc { max-width:0%!important; }
			.mw1pc { max-width:1%!important; }
			.mw2pc { max-width:2%!important; }
			.mw3pc { max-width:3%!important; }
			.mw4pc { max-width:4%!important; }
			.mw5pc { max-width:5%!important; }
			.mw6pc { max-width:6%!important; }
			.mw7pc { max-width:7%!important; }
			.mw8pc { max-width:8%!important; }
			.mw9pc { max-width:9%!important; }
			.mw10pc { max-width:10%!important; }
			.mw15pc { max-width:15%!important; }
			.mw20pc { max-width:20%!important; }
			.mw25pc { max-width:25%!important; }
			.mw30pc { max-width:30%!important; }
			.mw35pc { max-width:35%!important; }
			.mw40pc { max-width:40%!important; }
			.mw45pc { max-width:45%!important; }
			.mw50pc { max-width:50%!important; }
			.mw55pc { max-width:55%!important; }
			.mw60pc { max-width:60%!important; }
			.mw65pc { max-width:65%!important; }
			.mw70pc { max-width:70%!important; }
			.mw75pc { max-width:75%!important; }
			.mw80pc { max-width:80%!important; }
			.mw85pc { max-width:85%!important; }
			.mw90pc { max-width:90%!important; }
			.mw95pc { max-width:95%!important; }
			.mw100pc { max-width:100%!important; }

			.mh0 { max-height:0px!important; }
			.mh1 { max-height:1px!important; }
			.mh2 { max-height:2px!important; }
			.mh3 { max-height:3px!important; }
			.mh4 { max-height:4px!important; }
			.mh5 { max-height:5px!important; }
			.mh6 { max-height:6px!important; }
			.mh7 { max-height:7px!important; }
			.mh8 { max-height:8px!important; }
			.mh9 { max-height:9px!important; }
			.mh10 { max-height:10px!important; }
			.mh15 { max-height:15px!important; }
			.mh20 { max-height:20px!important; }
			.mh25 { max-height:25px!important; }
			.mh30 { max-height:30px!important; }
			.mh35 { max-height:35px!important; }
			.mh40 { max-height:40px!important; }
			.mh45 { max-height:45px!important; }
			.mh50 { max-height:50px!important; }
			.mh55 { max-height:55px!important; }
			.mh60 { max-height:60px!important; }
			.mh65 { max-height:65px!important; }
			.mh70 { max-height:70px!important; }
			.mh75 { max-height:75px!important; }
			.mh80 { max-height:80px!important; }
			.mh85 { max-height:85px!important; }
			.mh90 { max-height:90px!important; }
			.mh95 { max-height:95px!important; }
			.mh100 { max-height:100px!important; }
			
			.mh0pc { max-height:0%!important; }
			.mh1pc { max-height:1%!important; }
			.mh2pc { max-height:2%!important; }
			.mh3pc { max-height:3%!important; }
			.mh4pc { max-height:4%!important; }
			.mh5pc { max-height:5%!important; }
			.mh6pc { max-height:6%!important; }
			.mh7pc { max-height:7%!important; }
			.mh8pc { max-height:8%!important; }
			.mh9pc { max-height:9%!important; }
			.mh10pc { max-height:10%!important; }
			.mh15pc { max-height:15%!important; }
			.mh20pc { max-height:20%!important; }
			.mh25pc { max-height:25%!important; }
			.mh30pc { max-height:30%!important; }
			.mh35pc { max-height:35%!important; }
			.mh40pc { max-height:40%!important; }
			.mh45pc { max-height:45%!important; }
			.mh50pc { max-height:50%!important; }
			.mh55pc { max-height:55%!important; }
			.mh60pc { max-height:60%!important; }
			.mh65pc { max-height:65%!important; }
			.mh70pc { max-height:70%!important; }
			.mh75pc { max-height:75%!important; }
			.mh80pc { max-height:80%!important; }
			.mh85pc { max-height:85%!important; }
			.mh90pc { max-height:90%!important; }
			.mh95pc { max-height:95%!important; }
			.mh100pc { max-height:100%!important; }			

			.borderSolid { border-style: solid; }
			.borderDashed { border-style: dashed; }
			.borderDotted { border-style: dotted; }

			.borderW1px { border-width: 1px; }
			.borderW2px { border-width: 2px; }
			.borderW3px { border-width: 3px; }
			.borderW4px { border-width: 4px; }
			.borderW5px { border-width: 5px; }

			.borderColorAppPrimary { border-color: var(--app-primary-color) }
			.borderColorAppPrimaryDark { border-color: var(--app-primary-color-dark) }
			.borderColorAppPrimaryLight { border-color: var(--app-primary-color-light) }
			.borderColorAppBackground { border-color: var(--app-background-color) }
			.borderColorAppBackgroundDarker { border-color: var(--app-background-color-darker) }
			.borderColorAppBackgroundLight { border-color: var(--app-background-color-light) }

			.rot90 {transform: rotate(90deg); transition: all .5s ease-out;}
			.rot180 {transform: rotate(180deg);transition: all .5s ease-out;}
			.rot270 {transform: rotate(270deg);transition: all .5s ease-out;}

			@media screen and (max-width: 640px) {
				.hideOnMobile {
					display: none;
				}
			}

            .darkRed { color:#a00000!important; }
            .darkGreen { color:#41671e!important; }
            .darkBlue { color:var(--dark-primary-color)!important; }
            .materialSecondaryTextColor { color:var(--material-secondary-text-color)!important; }

            .batchNumber{
                padding: 1px 5px;
                font-size: 11px;
                color: var(--app-text-color-light);
                border-radius: 10px;
                min-height: 0;
                display: block;
                line-height: 16px;
                height: 15px;
            }

            .orangeBg { background-color: var(--paper-orange-400); }
            .orangeBg { background-color: var(--paper-red-400); }
            .blueBg { background-color: var(--paper-blue-400); }
            .greenBg { background-color: var(--paper-green-400); }
            .purpleBg { background-color: var(--paper-purple-300); }

			.modal-button.disabled {
				opacity: 0.3;
			}

			.singleDocumentContainer {
				border:1px solid var(--app-primary-color);
				margin-bottom:20px;
				box-shadow: var(--shadow-elevation-2dp_-_box-shadow);
			}

			.singleDocumentContainer.selected {
				border:1px solid #136d10;
			}

			.singleDocumentContainer .header {
				background-color: var(--app-primary-color);
				color:#ffffff;
			}

			.singleDocumentContainer.selected .header {
				background-color: #136d10;
			}

			.documentsList .singleDocumentContainer paper-button {
				min-width:0;
			}

			.linkedObjectTag {
				background: rgba(0,0,0,.1);
				color: var(--exm-token-input-badge-text-color,--text-primary-color);
				height: 24px;
				min-height: 1px;
				font-size: 12px;
				min-width: initial;
				padding: 0;
				margin: 5px 10px 10px 0;
				border-radius: 5px;
				overflow: hidden;
				float:left;
			}

			.tagtype{
				background: var(--app-secondary-color);
				color: var(--app-text-color);
				display: flex;
				height: 100%;
				flex-flow: row wrap;
				padding: 0 4px;
				box-sizing: border-box;
				align-items: center;
				margin-right: 8px;
			}

			.deleteTag{
				height: 22px;
				width: 22px;
				margin: 0 4px 0 8px;
				padding: 2px;
			}

			.successLabel, .failedLabel, .warningLabel {
				display: flex;
				position: fixed;
				top: 50vh;
				right: 0;
				transform: translate(100vw,-50%);
				z-index: 999;
				padding: 16px;
				border-radius: 4px 0 0 4px;
				transition: 1s ease-in;
				flex-flow: row wrap;
				align-items: center;
				justify-content: flex-start;
				background: rgba(0,0 ,0,.42);
				color: var(--app-text-color-light);
				box-shadow: 0 9px 12px 1px rgba(0,0,0,.14),
				0 3px 16px 2px rgba(0,0,0,.12),
				0 5px 6px 0 rgba(0,0,0,.2);
			}

			.successLabel iron-icon, .failedLabel iron-icon, .warningLabel iron-icon {
				color: white;
				border-radius: 50%;
				padding: 2px;
				margin-right: 8px;
				box-sizing: border-box;
			}
			.successLabel iron-icon{
				background: var(--app-status-color-ok);
			}
			.failedLabel iron-icon{
				background: var(--app-status-color-nok);
			}
			.warningLabel iron-icon{
				background: var(--app-status-color-pending);
			}

			.displayNotification {
				animation: animationKeyFrames 7.5s cubic-bezier(0.075, 0.82, 0.165, 1);
			}

			@keyframes animationKeyFrames {
				0% {transform: translate(100vw,-50%);}
				10% {transform: translate(0,-50%);}
				88% {transform: translate(0,-50%);}
				100% {transform: translate(100vw,-50%);}
			}

			.addIcon{
				background-color: var(--app-secondary-color);
				border-radius: 50%;
			}

			.transition {
				transition: all .5s ease-out;
			}

			.horizontalToggleCollapse {
				border:1px solid var(--app-background-color-darker);
			}

			.toggleCollapseHeader {
				background-color: var(--app-background-color);
				font-weight: 700;
				padding:10px;
			}

			.toggleCollapseBody {
				padding:10px 10px 6px 30px;
				overflow:hidden;
				height:auto;
				border-top: 1px solid var(--app-background-color-darker)
			}

			.toggleCollapseBody.collapsed {
				height:0;
				padding:0;
				margin:0;
				transition: all .5s ease-out;
				border:0;
			}
			
			.valignCenter {
                display: flex;
                align-items: center;
                justify-content: center;
                height: 100%;
                flex-direction: column;
            }
            
            .displayInline {display:inline;}
            .displayBlock {display:block;}
            .displayInlineBlock {display:inline-block;}
            .displayFlex {display:flex;}
            .displayInlineFlex {display:inline-flex;}
            .displayInherit {display:inherit;}


		</style>
	</template>
</dom-module>`;

document.head.appendChild($_documentContainer.content);

/* shared styles for all elements and index.html */
/*
  FIXME(polymer-modulizer): the above comments were extracted
  from HTML and may be out of place here. Review them and
  then delete this comment!
*/
;
