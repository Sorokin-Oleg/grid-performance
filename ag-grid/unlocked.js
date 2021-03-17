import { RenderTimer, FPS, Scroller } from '../util/util.js';
import { DEFINE_COLUMNS } from '../util/consts.js';
import ColumnsGenerator from './util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const columnDefs = ColumnsGenerator.getDefinedColumns(DEFINE_COLUMNS);
    const json = DataGenerator.getDefinedData(DEFINE_COLUMNS);

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
