var mysql = require('mysql');

var connection = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'root',
    database: 'bamazondb'
});

connection.connect(function(error){
    createProduct();
});

function createProduct(){
    var query = connection.query( 
        'insert into products set ?',
        {
            product_name: 'shake weight',
            department_name: 'fitness',
            price: 19.99,
            stock_qty: 999
        },
        function(error, response) {
            console.log(response.affectedRows + ' products inserted');
        }
    );
}