//Node Packages
//We will be prompting
var inquirer = require("inquirer");
//We will be working with mySql
var mysql = require("mysql");

//First
//List a Set of Menu Options (Use Inquirer)
inquirer.prompt([
    {
        type: 'list',
        name: 'option',
        message: 'Please select from the list.',
        choices:['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }
]).then(function(userSelection){
    switch(userSelection.option){
        case "View Products for Sale":
            viewProducts();
            break;
        case "View Low Inventory":
            viewLowInventory();
            break;
        case "Add to Inventory":
            addInventory();
            break;
        case "Add New Product":
            addProduct();
            break;
        default:
            console.log('Error');
            break;
    }
});


//View Products for Sales
//List every available item
//Item, ID, Name, Price, Qty
function viewProducts(){
    console.log('View Products');
}


//View Low Inventory
//List items with inventory count lower than 5
function viewLowInventory(){
    console.log("View Low Inv");
}

//Add to Inventory
//Display prompt let manager manager add to inv
function addInventory(){
    console.log("Add Inventory");
}

//Add New Product
function addProduct(){
    console.log("Add Product");
}