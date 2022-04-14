// Entity Base use case
const EntityBase = require("./EntityBase");

console.log(
    new EntityBase({
        name: "Mac",
        gender: "male",
    }).name
);

console.log(
    new EntityBase({
        name: "Jane da Silva",
        gender: "female",
    }).name
);

// Employee and Manager use cases

const assert = require("assert");
const Util = require("./util");
const Employee = require("./employee");
const Manager = require("./manager");

const GENDER = {
    male: "male",
    female: "female",
};

// Context example
{
    const employee = new Employee({
        name: "Jane da Silva",
        gender: GENDER.female,
    });

    assert.deepStrictEqual(employee.name, "Ms. Jane da Silva");
    assert.throws(() => employee.birthYear, {
        message: "You must define age first!",
    });
}

// Employee example

const CURRENT_YEAR = 2021;
Date.prototype.getFullYear = () => CURRENT_YEAR;

{
    const employee = new Employee({
        name: "Pele da Silva",
        age: 20,
        gender: GENDER.male,
    });

    assert.deepStrictEqual(employee.name, "Mr. Pele da Silva");
    assert.deepStrictEqual(employee.age, undefined);
    assert.deepStrictEqual(employee.gender, undefined);
    assert.deepStrictEqual(employee.grossPay, Util.formatCurrency(5000.4));
    assert.deepStrictEqual(employee.netPay, Util.formatCurrency(4000.32));

    const expectedBirthYear = 2001;
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear);

    // If not have "set" can't change the value of "birthYear" 😘
    employee.birthYear = new Date().getFullYear() - 80;
    assert.deepStrictEqual(employee.birthYear, expectedBirthYear);

    // "age" has defined "set", so we can change the value  🤪
    employee.age = 42;
    assert.deepStrictEqual(employee.birthYear, 1979);

    console.log("\n----- Employee -----");
    console.log("employee.name", employee.name);
    console.log("employee.age", employee.age);
    console.log("employee.gender", employee.gender);
    console.log("employee.grossPay", employee.grossPay);
    console.log("employee.netPay", employee.netPay);
}

// Manager example

{
    const manager = new Manager({
        name: "Jane Doe",
        age: 18,
        gender: GENDER.female,
    });

    assert.deepStrictEqual(manager.name, "Ms. Jane Doe");
    assert.deepStrictEqual(manager.age, undefined);
    assert.deepStrictEqual(manager.gender, undefined);
    assert.deepStrictEqual(manager.birthYear, 2003);
    assert.deepStrictEqual(manager.grossPay, Util.formatCurrency(5000.4));
    assert.deepStrictEqual(manager.bonuses, Util.formatCurrency(2000));
    assert.deepStrictEqual(manager.netPay, Util.formatCurrency(6000.32));

    console.log("\n----- Manager -----");
    console.log("manager.name", manager.name);
    console.log("manager.age", manager.age);
    console.log("manager.gender", manager.gender);
    console.log("manager.birthYear", manager.birthYear);
    console.log("manager.grossPay", manager.grossPay);
    console.log("manager.bonuses", manager.bonuses);
    console.log("manager.netPay", manager.netPay);
}
