//Node Packages
//We will be prompting
var inquirer = require("inquirer");
//We will be working with mySql
var mysql = require("mysql");

var table = require("console.table");

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazondb'
});

connection.connect(function(error){
    tableView();
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
    var query = connection.query( 
        'SELECT  * FROM products WHERE stock_qty < 5',
        function(error, response) {
            if(error){
                throw error;
            }
            else if(response.length < 1){
                console.log('All inventory is at or above 5');
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

//Add to Inventory
//Display prompt let manager manager add to inv
function addInventory(){
    console.log("Add Inventory");
    //listProducts();
    inquirer.prompt([
        {
            type: 'text',
            name: 'id',
            message: 'What is the id of the product you would like to adjust?'
        },
        {
            type: 'text',
            name: 'newQty',
            message: 'What is the new stock quantity?'
        }
    ]).then(function(userInput){
        var query = connection.query(
            'UPDATE products SET ? WHERE ?',
            [
                {
                    stock_qty:  userInput.newQty
                },
                {
                    item_id: userInput.id
                }
            ],
            function(error, response){
                if(error){
                    throw error;
                }
                else{
                    console.log('The Stock has been updated.');
                }
            }
        );
    });
}

//Add New Product
function addProduct(){
    console.log("Add Product");
    inquirer.prompt([
        {
            type: 'text',
            name: 'product',
            message: 'What is the name of the product?'
        },
        {
            type: 'text',
            name: 'department',
            message: 'What is the department?'
        },
        {
            type: 'text',
            name: 'price',
            message: 'Please, enter the price.'            
        },
        {
            type: 'text',
            name: 'qty',
            message: 'What is the current stock quantity?'
        }        
    ]).then(function(userInput){
        var query = connection.query(
            'INSERT INTO products SET ?, ?, ?, ?',
            [
                {
                    product_name: userInput.product
                },
                {
                    department_name: userInput.department
                },
                {
                    price: userInput.price
                },
                {
                    stock_qty: userInput.qty
                }

            ],
            function(error,response){
                if(error){
                    throw error;
                }else{
                    console.log('Product has been added');
                }
            }
        )
    });
}


//List Products
function listProducts(){
    var query = connection.query( 
        'SELECT * FROM products',
        function(error, response) {
            var idList = [];
            response.forEach(function(element) {
                console.log(element.item_id + ' | ' + element.product_name + ' | ' + element.price + '\n');
                idList.push(element.item_id);
        });
        console.log(idList);
        }
    );
}

function tableView(){
    var query = connection.query( 
        'SELECT * FROM products',
        function(error, response) {
            var idList = [];
            response.forEach(function(element) {
                var item = {
                    item_id: element.item_id,
                    product_name: element.product_name,
                    price: element.price
                }
                
                idList.push(item);
            });
                console.table(idList);
        }
    );
    

}