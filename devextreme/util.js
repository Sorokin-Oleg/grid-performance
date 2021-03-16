import BaseColumnsGenerator from "../util/columnGenerator.js";

class ColumnsGenerator extends BaseColumnsGenerator {
    getColumnData(count) {
        const def = typeof count === "undefined";
        return {
            id: { dataField : def ? 'id' : 'id' + count, caption : 'Id', width : 100 },
            firstName: { dataField : def ? 'firstName' : 'firstName' + count, caption : 'First name', width : 130 },
            surname: { dataField : def ? 'surname' : 'surname' + count, caption : 'Surname', width : 130 },
            city: { dataField : def ? 'city' : 'city' + count, caption : 'City', width : 150 },
            age: { dataField : def ? 'age' : 'age' + count, caption : 'Age', width : 100 },
            color: {
                dataField : def ? 'color' : 'color' + count,
                caption : 'Color',
                width : 120,
                cellTemplate : (element, info) => element.text(info.text).css('background-color', info.text)
            },
            score: {
                dataField : def ? 'score' : 'score' + count,
                caption : 'Score',
                width : 120,
                cellTemplate(element, info) {
                    element.append(`
                    <div style="
                        width : ${info.text / 10}%; 
                        background-color: blue; 
                        height : 3px;
                        position: absolute;
                        top: 0;
                        left :0;
                        "></div>
                    ${info.text}
                    `).css('position', 'relative');
                }
            },
            start: { dataField : def ? 'start' : 'start' + count, caption : 'Start', width : 120, dataType : 'date' },
            done: { dataField : def ? 'done' : 'done' + count, caption : 'Done', width : 90, dataType : 'text', customizeText : ({ value }) => value ? 'Yes' : 'No' },
            rating: { dataField : def ? 'rating' : 'rating' + count, caption : 'Rating', width : 90 },
        }
    }
}

export default new ColumnsGenerator();
