const express = require("express");
const cors = require("cors");
const app = express();
const mysql = require("mysql2");
app.use(cors());
app.use(express.json());
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "Mysqlproject123+",
  database: "todo",
});
db.connect((err) => {
  if (err) {
    console.log("error connecting to database");
    return;
  }
  console.log("connected to database");
});
//default router
app.get('/', (req, res) => {
  console.log("This is a default router");
  db.query("select * from todoItems", (err, result) => {
    if (err) {
      console.log("error in fetching data from database",err);
      return;
    }
    console.log("fetched data from database :", result);
    res.send(result);
  });
});
// CRUD Operations
// C -create post method
// R -read get method
// U -put method
// D -delete delete method
app.post("/add-item", (req, res) => {
  console.log(req.body);
  db.query(
    `insert into todoItems(itemDescription) values('${req.body.text}')`,
    (err, results) => {
      if (err) {
        console.log("error in adding item to database");
        return;
      }
      console.log("item added successfully");
    }
  );
  res.send("item added sucessfully");
});

app.put('/edit-item', (req, res) => {
  console.log("line 53: ", req.body);
  db.query(
    `update todoItems set itemDescription = "${req.body.itemDescription}" where ID=${req.body.ID};`,
    (err, results) => {
      if (err) {
        console.log("error in adding item to database",err);
        return;
      }
      console.log("item added successfully");
    }
  );
  res.send("success");
});
app.delete('/del-item',(req,res)=>{
  console.log("line 67 :",req.body)
  db.query(`delete from todoItems where id=${req.body.ID};`,(err,results)=>{
    if (err)
  {
    console.log("error while deleting item");
    return
  }
  console.log("item deleted successfully")
  })
  res.send("deletion successful")
})
app.listen(3000, () => {
  console.log("server working oon port 3000");
});
