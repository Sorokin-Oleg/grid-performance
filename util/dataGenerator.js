import { ROWS_COUNT } from './consts.js';

class DataGenerator {
    get FIRST_NAMES() {
        return [
            "Don", "Doug", "Barbara", "James", "Jane", "Mary", "Jenny", "Karen", "Adam", "Melissa", "Linda", "Daniel", "Lisa", "Mike", "John", "David",
        ];
    }

    get SURNAMES() {
        return [
            "Taylor", "McGregor", "Ewans", "Anderson", "Davis", "Brown", "Jones", "Miller", "Johnson", "Williams", "Thomas", "More", "Jackson", "Smith", "Adams", "Wilson", "Scott",
        ];
    }

    get CITIES() {
        return [
            "Moscow", "Washington", "San Francisco", "Barcelona", "Paris", "Stockholm", "Dubai", "New York",
        ];
    }

    get COLORS() {
        return [
            "Purple", "Orange", "Teal", "Blue", "Pink", "Green", "Red", "Black", "Yellow",
        ];
    }

    getRandomInt(min, max) {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    getRandomLabel(labels) {
        return labels[this.getRandomInt(0, labels.length - 1)];
    }

    getRandomDate() {
        const getYear = () => `${this.getRandomInt(2000, 2025)}`;
        const getMonth = () => `0${this.getRandomInt(1, 9)}`;
        const getDate = () => `${this.getRandomInt(0, 2)}${this.getRandomInt(1, 9)}`;
        return `${getYear()}-${getMonth()}-${getDate()}T23:00:00.000Z`
    }

    getItem(id) {
        return {
            id: id,
            firstName: this.getRandomLabel(this.FIRST_NAMES),
            surname: this.getRandomLabel(this.SURNAMES),
            city: this.getRandomLabel(this.CITIES),
            age: this.getRandomInt(1, 100),
            color: this.getRandomLabel(this.COLORS),
            score: this.getRandomInt(0, 1000),
            start: this.getRandomDate(),
            done: true,
            rating: this.getRandomInt(0, 10),
        };
    }

    generateData(count) {
        const len = count ? count + 1 : ROWS_COUNT + 1;
        const data = [];

        for (let i = 1; i < len; i ++) {
            data.push(this.getItem(i))
        }

        return data;
    }
}

export default new DataGenerator();
