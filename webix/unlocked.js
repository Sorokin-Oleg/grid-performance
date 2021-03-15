import { RenderTimer, FPS, Scroller } from '../util/util.js';
import ColumnsGenerator from './util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const columns = ColumnsGenerator.getDefaultColumns();
    const response = await fetch('../util/10000.json');
    // const response = await fetch('../util/100000.json');
    const json = await response.json();
    // const json = DataGenerator.generateData();

    RenderTimer.start({
        callback() {
            const grid = webix.ui({
                scheme:{
                    $init: obj => obj.start = new Date(obj.start)
                },
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
