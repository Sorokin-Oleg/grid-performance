import ColumnsGenerator from './util.js';
import { RenderTimer, FPS, Scroller } from '../util/util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const columnDefs = ColumnsGenerator.getDefaultColumns();
    const response = await fetch('../util/10000.json');
    // const response = await fetch('../util/100000.json');
    const json = await response.json();
    // const json = DataGenerator.generateData();

    RenderTimer.start({
        sync : false,
        callback() {
            new agGrid.Grid(document.getElementById('container'), {
                columnDefs,
                rowHeight: 43,
                rowData : json,

                onGridReady() {
                   RenderTimer.stop();
                }
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element : document.querySelector('.ag-body-viewport'),
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
