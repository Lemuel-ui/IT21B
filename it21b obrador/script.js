class Person {
    #name;
    #age;
    #occupation;

    constructor(name, age, occupation) {
        this.#name = name;
        this.#age = age;
        this.#occupation = occupation;
    }

    getDetails() {
        return {
            name: this.#name,
            age: this.#age,
            occupation: this.#occupation
        };
    }
}

class Student extends Person {
    #major;

    constructor(name, age, occupation, major) {
        super(name, age, occupation);
        this.#major = major;
    }

    getDetails() {
        const personDetails = super.getDetails();
        return {
            ...personDetails,
            major: this.#major
        };
    }
}

const student = new Student("Wayne Barb", 19, "Student", "Computer Science");

const studentInfoDiv = document.getElementById("student-info");
const { name, age, occupation, major } = student.getDetails();
studentInfoDiv.innerHTML = `
    <p><strong>Name:</strong> ${name}</p>
    <p><strong>Age:</strong> ${age}</p>
    <p><strong>Occupation:</strong> ${occupation}</p>
    <p><strong>Major:</strong> ${major}</p>
`;
