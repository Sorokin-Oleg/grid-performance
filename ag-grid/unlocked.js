import { RenderTimer, FPS, Scroller } from '../util/util.js';
import ColumnsGenerator from './util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const defineColumns = { firstName: 10, surname: 10, city: 10, age: 20, color: 20, score: 10, done: 10, rating: 10 };
    // const defineColumns = { firstName: 50, surname: 50, city: 50, age: 100, color: 100, score: 50, done: 50, rating: 50 };
    const columnDefs = ColumnsGenerator.getDefinedColumns(defineColumns);
    const json = DataGenerator.getDefinedData(defineColumns);

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
