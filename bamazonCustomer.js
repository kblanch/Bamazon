var mysql = require('mysql');
var inquirer = require('inquirer');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazondb'
});

var idList = [];
var id;
var qty;

connection.connect(function(error){
    listProducts();
   
});

function listProducts(){
    var query = connection.query( 
        'SELECT * FROM products',
        function(error, response) {
            response.forEach(function(element) {
                console.log(element.item_id + ' | ' + element.product_name + ' | ' + element.price + '\n');
                idList.push(element.item_id);
        });
        //console.log(idList);
        promptId();
        }
    );
}

function promptId(){
    inquirer.prompt([
        {
            type: 'text',
            name: 'productId',
            message: 'What is the id of the product you would like to purchase?'
        }
    ]).then(function(userInput){
        if(!userInput){
            console.log('No Answer was given');
        }else if(idList.indexOf(parseInt(userInput.productId,10)) === -1){
            console.log('That is not a valid id.');
            promptId();
        }else{
            //console.log(userInput.productId);
            id = parseInt(userInput.productId,10);
            promptQty();
        }
    });
}

function promptQty(){
    inquirer.prompt([
        {
            type: 'text',
            name: 'quantity',
            message: 'How many units would you like to buy?'
        }
    ]).then(function(userInput){
        if(!userInput){
            console.log('No Answer was given');
        }else if(userInput.quantity != parseInt(userInput.quantity,10) ){
            console.log('That is not an integer.')
            promptQty();
        }
        else{
            //console.log(userInput.quantity);
            qty = parseInt(userInput.quantity, 10);
            checkStock(id, qty);
        }
    });
}

function checkStock(i, q){
    //console.log(i);
    //console.log(q);
    var query = connection.query( 
        'SELECT  stock_qty FROM products WHERE ?',
        [
            {
                item_id: i
            }
        ],
        function(error, response) {
            if(parseInt(response[0].stock_qty,10) < q){
                console.log('Insufficient Quantity!');
            }
            else{
                //console.log('hello');
                //console.log(response);
                //console.log(parseInt(response[0].stock_qty,10));
                processOrder(i,parseInt(response[0].stock_qty,10) - q);
            }

        }
    ); 
}

function processOrder(i, nq){
    //console.log('Process Order');
    //console.log(i);
    //console.log(nq);
     var query = connection.query( 
        'UPDATE products SET ? WHERE ?',
        [
            {
                stock_qty: nq
            },
            {
                item_id: i
            }
        ],
        function(error, response) {
            if(error){
                throw error;
            }
            else{
                calculateOrderTotal();
                console.log('The order has been processed.');
            }

        }
    ); 
}

function calculateOrderTotal(){
    var query = connection.query( 
        'SELECT  price FROM products WHERE ?',
        [
            {
                item_id: id
            }
        ],
        function(error, response) {
            if(error){
                throw error;
            }
            else{
                console.log('Order Total: ' + response[0].price * qty);
            }

        }
    ); 
}