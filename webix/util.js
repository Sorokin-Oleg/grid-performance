import BaseColumnsGenerator from "../util/columnGenerator.js";

class ColumnsGenerator extends BaseColumnsGenerator {
    dateFormat = webix.Date.dateToStr("%Y-%m-%d");

    getColumnData(count) {
        const def = typeof count === "undefined";
        return {
            id: { id : def ? "id" : "id" + count, header : "id", width : 100 },
            firstName: { id : def ? 'firstName' : "firstName" + count, header : "firstName", width : 130 },
            surname: { id : def ? 'surname' : 'surname' + count, header : 'Surname', width : 130 },
            city: { id : def ? 'city' : 'city' + count, header : 'City', width : 150 },
            age: { id : def ? 'age' : 'age' + count, header : 'Age', width : 100 },
            color: {
                id        : def ? 'color' : 'color' + count,
                header    : 'Color',
                css       : "no_padding_box",
                width     : 120,
                template  : obj => `<div style="background-color:${def ? obj.color : obj[`color` + count]}">${def ? obj.color : obj[`color` + count]}</div>`
            },
            score: {
                id         : def ? 'score' : 'score' + count,
                header     : 'Score',
                width      : 120,
                css        : "relative_box",
                template   : obj => `
                    <div style="
                        width : ${def ? obj.score : obj[`score` + count] / 10}%; 
                        background-color: blue; 
                        height : 3px;
                        position: absolute;
                        top: 0;
                        left :0;
                        "></div>${def ? obj.score : obj[`score` + count]}`
            },
            start: { id : def ? 'start' : 'start' + count, header : 'Start', width : 120, format: this.dateFormat },
            done: { id : def ? 'done' : 'done' + count, header : 'Done', width : 90, template : obj => def ? obj.done : obj[`done` + count] ? 'Yes' : 'No' },
            rating: { id : def ? 'rating' : 'rating' + count, header : 'Rating', width : 90 },
        }
    }
}

export default new ColumnsGenerator();
