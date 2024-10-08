// Flower with four properties
class Flower {
    constructor(name, color, bloomSeason, isFragrant) {
        this.name = name;
        this.color = color;
        this.bloomSeason = bloomSeason;
        this.isFragrant = isFragrant;
    }

    // display blooming
    bloom() {
        console.log(`The ${this.name} blooms in ${this.bloomSeason}.`);
    }

    // display fragrance
    fragrance() {
        if (this.isFragrant) {
            console.log(`The ${this.name} is fragrant.`);
        } else {
            console.log(`The ${this.name} is not fragrant.`);
        }
    }

    // display color
    colorDisplay() {
        console.log(`The ${this.name} has a beautiful ${this.color} color.`);
    }
}

// Flower class
const rose = new Flower("Rose", "red", "Spring", true);

// Flower class
rose.bloom();
rose.fragrance();
rose.colorDisplay();