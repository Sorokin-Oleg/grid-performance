import { RenderTimer, FPS, Scroller } from '../../util/util.js';
import { getNeededJsonData } from '../../util/getNeededJsonData.js';

async function init() {
    const json = await getNeededJsonData();

    RenderTimer.start({
        callback() {
            new dhx.Grid('container', {
                headerSort : false,
                columns : [
                    { id : 'id', header : [{ text : 'Id' }], width : 100 },
                    { id : 'firstName', header : [{ text : 'First name' }], width : 130 },
                    { id : 'surname', header : [{ text : 'Surname' }], width : 130 },
                    { id : 'city', header : [{ text : 'City' }], width : 150 },
                    { id : 'age', header : [{ text : 'Age' }], width : 100 },
                    {
                        id        : 'color',
                        header    : [{ text : 'Color' }],
                        width     : 120,
                        template  : value => `<div style="width:100%;height:100%;background-color: ${value}">${value}</div>`,
                        htmlEnable: true,
                    },
                    {
                        id         : 'score', 
                        header     : [{ text : 'Score' }], 
                        width      : 120,
                        template   : (value) => {
                            return `
                                <div style="
                                    width : ${value / 10}%;
                                    background-color: blue;
                                    height : 3px;
                                    position: absolute;
                                    top: 0;
                                    left :0;
                                    "></div>
                                ${value}
                            `;
                        },
                        htmlEnable : true,
                    },
                    {
                        id     : 'start',
                        header : [{ text : 'Start' }],
                        width  : 120,
                        type   : 'date',
                        format : "%Y-%m-%d"
                    },
                    {
                        id       : 'done',
                        header   : [{ text : 'Done' }],
                        width    : 90,
                        template : value => value ? 'Yes' : 'No'
                    },
                    { id : 'rating', header : [{ text : 'Rating' }], width : 90 }
                ],
                leftSplit : 3,
                rowHeight : 43,
                data : json
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
