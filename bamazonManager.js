//Node Packages
//We will be prompting
var inquirer = require("inquirer");
//We will be working with mySql
var mysql = require("mysql");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazondb'
});

connection.connect(function(error){
});

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
    var query = connection.query( 
        'SELECT  * FROM products',
        function(error, response) {
            if(error){
                throw error;
            }
            else{
                //console.log(response);
                response.forEach(function(element) {
                    console.log(element.item_id + ' | ' + element.product_name + ' | ' + element.price + ' | ' + element.stock_qty + '\n');    
                });
            }
        }
    ); 
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