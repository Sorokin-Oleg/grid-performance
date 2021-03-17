import { Grid } from './js/grid.module.js';
import { RenderTimer, FPS, Scroller } from '../util/util.js';
import { DEFINE_COLUMNS } from '../util/consts.js';
import ColumnsGenerator from './util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const columns = ColumnsGenerator.getDefinedColumns(DEFINE_COLUMNS);
    const json = DataGenerator.getDefinedData(DEFINE_COLUMNS);

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
