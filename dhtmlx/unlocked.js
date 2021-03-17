import { RenderTimer, FPS, Scroller } from '../util/util.js';
import { DEFINE_COLUMNS } from '../util/consts.js';
import ColumnsGenerator from './util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const columns = ColumnsGenerator.getDefinedColumns(DEFINE_COLUMNS);
    const json = DataGenerator.getDefinedData(DEFINE_COLUMNS);

    RenderTimer.start({
        callback() {
            new dhx.Grid('container', {
                headerSort : false,

                columns,

                rowHeight: 43,
                data : json,
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element: document.querySelector('.dhx_grid-body'),
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
