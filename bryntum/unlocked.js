import { Grid } from './js/grid.module.js';
import { RenderTimer, FPS, Scroller } from '../util/util.js';
import ColumnsGenerator from './util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const defineColumns = { firstName: 20, surname: 10, city: 10, age: 10, color: 20, score: 10, done: 10, rating: 10 };
    // const defineColumns = { firstName: 50, surname: 50, city: 50, age: 100, color: 100, score: 50, done: 50, rating: 50 };
    const columns = ColumnsGenerator.getDefinedColumns(defineColumns);
    const json = DataGenerator.getDefinedData(defineColumns);

    RenderTimer.start({
        callback() {
            const grid = new Grid({
                appendTo : 'container',
                // Bryntum Grid has many features enabled by default, turn them off to match others
                features : {
                    cellEdit      : false,
                    columnPicker  : false,
                    columnReorder : false,
                    columnResize  : false,
                    contextMenu   : false,
                    group         : false,
                    sort          : false
                },

                columns,

                rowHeight: 43,
                store : {
                    useRawData : true,
                    data       : json
                }
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element : grid.bodyContainer,
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
