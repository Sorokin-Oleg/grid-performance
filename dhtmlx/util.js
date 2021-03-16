import BaseColumnsGenerator from "../util/columnGenerator.js";

class ColumnsGenerator extends BaseColumnsGenerator {
    getColumnData(count) {
        const def = typeof count === "undefined";
        return {
            id: { id : def ? 'id' : 'id' + count, header : [{ text : 'id' }], width : 100 },
            firstName: { id : def ? 'firstName' : 'firstName' + count, header : [{ text : 'firstName' }], width : 130 },
            surname: { id : def ? 'surname': 'surename' + count, header : [{ text : 'surname' }], width : 130 },
            city: { id : def ? 'city': 'city' + count, header : [{ text : 'city' }], width : 150 },
            age: { id : def ? 'age' : 'age' + count, header : [{ text : 'age' }], width : 100 },
            color: {
                id : def ? 'color' : 'color' + count,
                header : [{ text: 'color' }],
                width : 120,
                template : value => `<div style="width:100%;height:100%;background-color: ${value}">${value}</div>`,
                htmlEnable: true,
            },
            score: {
                id : def ? 'score' : 'score' + count, 
                header : [{ text : 'score' }],
                width : 120,
                template(value) {
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
                htmlEnable: true,
            },
            start: {
                id : def ? 'start': 'start' + count,
                header : [{ text : 'start' }],
                width : 120,
                type : 'date',
                format: "%Y-%m-%d"
            },
            done: {
                id : def ? 'done' : 'done' + count,
                header : [{ text : 'done' }],
                width : 90,
                template : value => value ? 'Yes' : 'No',
            },
            rating: { id : def ? 'rating' : 'rating' + count, header : [{ text : 'rating' }], width : 90 },
        }
    }
}

export default new ColumnsGenerator();
