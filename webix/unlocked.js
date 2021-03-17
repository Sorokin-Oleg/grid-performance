import { RenderTimer, FPS, Scroller } from '../util/util.js';
import { DEFINE_COLUMNS } from '../util/consts.js';
import ColumnsGenerator from './util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const columns = ColumnsGenerator.getDefinedColumns(DEFINE_COLUMNS);
    const json = DataGenerator.getDefinedData(DEFINE_COLUMNS);

    RenderTimer.start({
        callback() {
            const grid = webix.ui({
                // scheme:{
                //     $init: obj => obj.start = new Date(obj.start)
                // },
                view:"datatable", container:"container",
                columns,
                rowHeight: 43,
                data: json,
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element : grid.$view.querySelector(".webix_ss_vscroll"),
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
