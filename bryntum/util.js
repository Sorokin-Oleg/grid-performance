import BaseColumnsGenerator from "../util/columnGenerator.js";

class ColumnsGenerator extends BaseColumnsGenerator {
    getColumnData(count) {
        const def = typeof count === "undefined";
        return {
            id: { field : def ? 'id' : 'id' + count, text : 'Id', width : 100 },
            firstName: { field : def ? 'firstName' : 'firstName' + count, text : 'First name', width : 130 },
            surname: { field : def ? 'surname' : 'surname' + count, text : 'Surname', width : 130 },
            city: { field : def ? 'city' : 'city' + count, text : 'City', width : 150 },
            age:  { field : def ? 'age' : 'age' + count, text : 'Age', width : 100 },
            color: {
                field    : def ? 'color': 'color' + count,
                text     : 'Color',
                width    : 120,
                renderer : ({ value, cellElement }) => cellElement.style.backgroundColor = value
            },
            score: {
                field      : def ? 'score' : 'score' + count,
                text       : 'Score',
                width      : 120,
                htmlEncode : false,
                renderer({ value }) {
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
                }
            },
            start: { field : def ? 'start' : 'start' + count, text : 'Start', width : 120, type : 'date', format : 'YYYY-MM-DD' },
            done: { field : def ? 'done' : 'done' + count, text : 'Done', width : 90, renderer : ({ value }) => value ? 'Yes' : 'No' },
            rating: { field : def ? 'rating' : 'rating' + count, text : 'Rating', width : 90 },
        }
    }
}

export default new ColumnsGenerator();
