//Node Packages
//We will be prompting
var inquirer = require("inquirer");
//We will be working with mySql
var mysql = require("mysql");

//First
//List a Set of Menu Options
inquirer.prompt([
    {
        type: 'list',
        name: 'option',
        message: 'Please select from the list.',
        choices:['View Products for Sale', 'View Low Inventory', 'Add to Inventory', 'Add New Product']
    }
]).then(function(userSelection){
    console.log(userSelection.option)
});


//View Products for Sales
//List every available item
//Item, ID, Name, Price, Qty

//View Low Inventory
//List items with inventory count lower than 5

//Add to Inventory
//Display prompt let manager manager add to inv

//Add New Product
