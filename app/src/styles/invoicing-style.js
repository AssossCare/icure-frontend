const $_documentContainer = document.createElement('template')

$_documentContainer.innerHTML = `<dom-module id="invoincing-style">
	<template>
		<style is="custom-style">
			
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
                height: 40px;
                width: auto;
            }
            
            .panel-content{
                height: calc(100% - 120px);
                width: auto;
            }
            
            .panel-button{
                height: 40px;
                width: auto;             
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
                    padding: 4px 6px;
                    line-height: 0.8;
                    text-align: center;
                    height: 10px;
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
            
            .tr{
                display: flex;
                height: 22px;
                cursor: pointer;
                border-bottom: 1px solid lightgray;   
                padding: 4px;                
            }
            
            .td{
                overflow: hidden;
                text-overflow: ellipsis;
            }
            
            .w5{
                width: 5%;
            }
            
            .w10{
                width: 10%;
            }
            
            .w20{
                width: 20%;
            }
            
            .center{
                text-align: center;
            }
            
            .right{
                text-align: right;
            }
            
            .status{
              display: block;
              margin-left: auto;
              margin-right: auto;
            }

		</style>
	</template>
</dom-module>`

document.head.appendChild($_documentContainer.content)
