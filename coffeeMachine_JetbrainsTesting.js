// stock = { "money": 550, "water": 1400, "milk": 540, "beans": 120, cups: "9" };
// let recipe = getRecipe("1")
// let coffeeCups = canMakeCalculator(stock, recipe);
// if (coffeeCups > 0) {
//     reduceAmonutFromStock(stock, recipe)
// }

let input = require('sync-input');
//let stock, coffeeDemand = listQunats()
stock = { "money": 550, "water": 400, "milk": 540, "beans": 120, cups: 9 };
let actionRequest = "init"
do {
    let actionRequest = askAction()
    takeAction(actionRequest, stock)
} while (actionRequest != "exit")


function reduceAmonutFromStock(stock, recipe) {
    for (const item in recipe) {
        stock[item] -= recipe[item];
    }
    stock["cups"] -= 1;
}

function takeMoney(stock) {
    console.log(`I gave you $${stock.money}`);
    stock.money = 0;
}

function fillMachine(stock) {
    let fill = listQunats();
    for (const item in fill) {
        stock[item] += fill[item];
    }
}

function buyCoffee(stock) {

    let user_input = input("What do you want to buy? 1 - espresso, 2 - latte, 3 - cappuccino,  back - to main menu:\n");
    if (user_input == "back") { return; }

    recipe = getRecipe(user_input)

    let coffeeCups = canMakeCalculator(stock, recipe);
    if (coffeeCups > 0) {
        console.log("I have enough resources, making you a coffee!")
        reduceAmonutFromStock(stock, recipe)
    }
    else {
        missing_indredient = inspectShorteges(stock, recipe)
        console.log(`Sorry, not enough ${missing_indredient}!`)
    }
}

function inspectShorteges(stock, recipe) {
    let missing_indredient;
    if (stock.water < recipe.water) {
        missing_indredient = "water"
    }
    else if (stock.milk < recipe.milk) {
        missing_indredient = "milk"
    }
    else if (stock.beans < recipe.beans) {
        missing_indredient = "beans"
    }
    else {
        missing_indredient = "cups"
    }
    return missing_indredient;
}
function takeAction(actionRequest, stock) {
    if (actionRequest == "buy") {
        buyCoffee(stock)
    }
    else if (actionRequest == "fill") {
        fillMachine(stock) //fillMachine()
    }
    else if (actionRequest == "take") {
        takeMoney(stock)
    }
    else if (actionRequest == "remaining") {
        printAmounts(stock)
    }
}

function askAction() {
    console.log("Write action (buy, fill, take, remaining, exit):\n");
    let actionRequest = input();
    return actionRequest;
}

// let coffeeDemand = 2
// let recipe = getRecipe("espresso")
// // let neededAmounts = calculateAmountsForReqCups(coffeeDemandReq, recipe);
// let amountCanMake = canMakeCalculator(stock, recipe)

// if (amountCanMake > coffeeDemand) {
//     let leftOver = (amountCanMake - coffeeDemand);

//     console.log(`Yes, I can make that amount of coffee (and even ${leftOver} more than that)`)
// }
// else if (amountCanMake == coffeeDemand) {
//     console.log("Yes, I can make that amount of coffee")
// }
// else if (amountCanMake < coffeeDemand) { console.log(`No, I can make only ${amountCanMake} cups of coffee`) }

// Functions:

// Calculate amnounts
function canMakeCalculator(stock, recipe) {
    let waterLimit = Math.floor(stock.water / recipe.water);
    let canMake;
    canMake = Math.floor(stock.water / recipe.water);
    let y;
    for (const item in recipe) {
        y = Math.floor(stock[item] / Math.abs(recipe[item]));
        if (item != "coffeeCups") {
            canMake = Math.min(waterLimit, y, canMake);
        }
    }
    return canMake;
}

// List the qunatities

function listQunats() {
    let waterReq = Number(input("Write how many ml of water you want to add:\n"));
    let milkReq = Number(input("Write how many ml of milk  you want to add:\n"));
    let beansReq = Number(input("Write how many grams of coffee beans you want to add:\n"));
    let cups = Number(input("Write how many disposable coffee cups you want to add:\n"));
    return { "water": waterReq, "milk": milkReq, "beans": beansReq, "cups": cups };
}


function printAmounts(stock) {
    console.log("The coffee machine has:")
    console.log(`${stock.water} ml of water`);
    console.log(`${stock.milk} ml of milk`);
    console.log(`${stock.beans} g of coffee beans`);
    console.log(`${stock.cups} disposable cups`);
    console.log(`${stock.money} of money`);
}

// create Recipe!
function getRecipe(product_id) {
    product_id_lib = { "1": "espresso", "2": "latte", "3": "cappuccino" }
    let recipe_lib = {
        "espresso": { "water": 250, "milk": 0, "beans": 16, "money": -4 },
        "latte": { "water": 350, "milk": 75, "beans": 20, "money": -7 },
        "cappuccino": { "water": 200, "milk": 100, "beans": 12, "money": -6 },
    }

    let recipe = recipe_lib[product_id_lib[product_id]]
    return recipe;
}

function calculateAmountsForReqCups(coffeeCups, recipe) {
    let waterTot;
    let milkTot;
    let beansTot;
    waterTot = recipe.water * coffeeCups;
    milkTot = recipe.milk * coffeeCups;
    beansTot = recipe.beans * coffeeCups;
    return { "water": waterTot, "milk": milkTot, "beans": beansTot, "coffeeCups": coffeeCups };

}
// function takeOrder(coffeeCups){
//   console.log("Write how many cups of coffee you will need:");
//   // let coffeeCups = require('sync-input');
//   // coffeeCups = Number(coffeeCups)
//   return coffeeCups;

// }
/* 
console.log("Starting to make a coffee");
console.log("Grinding coffee beans");
console.log("Boiling water");
console.log("Mixing boiled water with crushed coffee beans")
console.log("Pouring coffee into the cup")
console.log("Pouring some milk into the cup")
console.log("Coffee is ready!") 
*/