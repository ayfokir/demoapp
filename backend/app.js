const express = require( 'express' );
const mysql2 = require( 'mysql2' );
const cors = require( 'cors' );
const bodyparser = require( 'body-parser' );
const app = express();


app.use(cors())  
app.use( express.json() );// be json melke format adergo yazegagal
const config = {
  host: "localhost",
  user: "root",
  password: "Ayfo@19!",
  database: "demoapp",

}
const connection = mysql2.createConnection(config);
connection.connect(function (err) {
  if ( err ) throw err
 console.log("connected")
  // console.log("Connected!");
});

app.post("/add-employee", (req, res) => {
  const { first_name, last_name, password, email } = req.body;
  console.log("below is body")
  console.log( req.body );
  let sql = `INSERT INTO employee_test (first_name, last_name, email, password) VALUES (?,?,?,?)`;

  connection.query( sql, [ first_name, last_name, email, password ], ( err, result ) =>
  {  
    if ( err )  
    {
      console.log(err.message)
      res.status(500).json({message : "database connection error"})
    }
    console.log("i record inserted")
    console.log(result)
    const response = { 
      status: "success",
      message : "Employee asdded successfully"
    }
    res.status( 200 ).json( { response } );  
  });
} )

app.post( "/login", ( req, res ) =>
{
  console.log( req.body )
  const { email, password } = req.body;
  const sql = `SELECT * FROM employee_test WHERE email = (?) AND password = (?)`;
  connection.query( sql, [ email, password ], ( err, row, fields ) =>
  {
    if ( err ) throw err;
    console.log( row )  
    if ( row.length > 0 )
    {
      const response = {
        status: "Success",
        message: "login Successful"
      }
      res.status(200).json({response})
    }
    else
    {
      const response = {
        status: "failur",
        message: "login Failed"
      }
      res.status(404).json(response)
    }
  })
})

let port = 4000;
app.listen( port, () =>
{
    console.log( `listen on port https://localhost: ${ port }` );
} )

