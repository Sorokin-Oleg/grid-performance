import ColumnsGenerator from './util.js';
import { RenderTimer, FPS, Scroller } from '../util/util.js';
import DataGenerator from '../util/dataGenerator.js';

async function init() {
    const columns = ColumnsGenerator.getDefaultColumns();
    const response = await fetch('../util/10000.json');
    // const response = await fetch('../util/100000.json');
    const json = await response.json();
    // const json = DataGenerator.generateData();

    RenderTimer.start({
        sync : false,
        callback() {
            $("#container").dxDataGrid({
                dataSource: json,
                showBorders: true,
                scrolling: {
                    mode: 'virtual'
                    // rowRenderingMode : 'virtual' // This mode does not render row contents while scrolling, not comparable to the others
                },
                sorting: {
                    mode: "none"
                },

                columns,

                onRowPrepared: function(e) {
                    e.rowElement.css({ height: 43});
                },
                onContentReady() {
                    if (RenderTimer.running) {
                        RenderTimer.stop();
                    }
                }
            });

            setTimeout(() => {
                FPS.start();
                Scroller.scroll({
                    element: document.querySelector('.dx-scrollable-container'),
                    callback() {
                        FPS.stop();
                    }
                });
            }, 500);
        }
    });
}

init();
