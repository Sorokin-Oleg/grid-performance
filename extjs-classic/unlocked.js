import { RenderTimer, FPS, Scroller } from '../util/util.js';
import ColumnsGenerator from './util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const columns = ColumnsGenerator.getDefaultColumns();
    const response = await fetch('../util/10000.json');
    // const response = await fetch('../util/100000.json');
    const data = await response.json();
    // const data = DataGenerator.generateData();

    Ext.onReady(() => {
        RenderTimer.start({
            callback() {
                const grid = Ext.create('Ext.grid.Panel', {
                    store : {
                        fields : [{ name : 'start', type : 'date' }],
                        data
                    },

                    columns,

                    height : 1024,
                    rowHeight: 43,
                    renderTo : 'container',
                    bufferedRenderer : true
                });

                setTimeout(() => {
                    FPS.start();
                    Scroller.scroll({
                        scrollFn(scrollTop) {
                            grid.getScrollable().scrollTo(0, scrollTop, false);
                        },
                        callback() {
                            FPS.stop();
                        }

                    });
                }, 500);
            }
        });
    });
}

init();
