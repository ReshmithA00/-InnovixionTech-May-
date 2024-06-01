const express = require('express')
const bodyParser = require('body-parser')
const mysql = require("mysql");
const server = express();
server.use(bodyParser.json());
const cors = require('cors')

server.use(cors())

// DataBase Connection statements
const db = mysql.createConnection({
    host: "localhost",
    user:"root",
    password: "",
    database :"information"
})

// Checking if database is connected 
db.connect(function (error)
    {
        if(error)
        {
            console.log("Error Failed to connect!!!!!!!");
        }
        else
        {
            console.log("Succesfully to Database    !!! ");
        }

    });

    // establishing Port to server ?? port 8080
server.listen(8080,function check(error){
    if(error){console.log("Error ...........!!!");}
    else{console.log("Started!!... !!!!!!!!!");}
});

// Adding a contact to database( post request )
server.post("/api/contacts/add",(req,res)=>{
    let details = 
    {
        name : req.body.name,
        phonenumber : req.body.phonenumber,
        address : req.body.address,
    };
    let add_sql = "INSERT INTO contacts SET ?" ;
    db.query(add_sql,details,(error) =>{
        if(error)
        {
            res.send({status:false, message : "Contact Creation Failed"});
        }
        else
        {
            res.send({status:true , message: "Contact Created Successfully!!!"});
        }
    });
});

// Viewing Data from  DataBase ( get request)
server.get("/api/contacts", (req,res)=>
    {
        var fetch_sql = "SELECT * FROM contacts";
        db.query(fetch_sql, function (error, result) 
        {
            if(error)
            {
                console.log("Error Connnecting to DB");
            }
            else
            {
                res.send({status : true , data: result});
            }
        });
    });

// Search The Contacts from database
server.get("/api/contacts/:id",(req,res)=>
    {
        var contactid = req.params.id;
        var find_sql = "SELECT * FROM contacts WHERE id ="+ contactid;
        db.query(find_sql, function(error,result)
        {
            if(error)
            {
                console.log("Error Connecting TO DataBase ** !!");
            }
            else
            {
                res.send({ status: true , data : result});
            }
        });
    });


    // Update the Contacts 
    server.put("/api/contacts/update/:id",(req,res) =>
        {
            var update_sql = "UPDATE contacts SET name ='" + req.body.name +
            "',phonenumber='"+ req.body.phonenumber +
            "',address='"+req.body.address + 
            "' WHERE id =" +req.params.id;
            
            db.query( update_sql ,(error,result)=>
                {
                    if(error)
                    {
                        res.send({ status :false , message : "Contact Update Failed!!!!"});
                    }
                    else
                    {
                        res.send({ status: true , message : "Student Updated Successfully"});
                    }
                });
        });

    // Deleting Contacts from DataBase
    server.delete("/api/contacts/delete/:id", (req,res)=>
        {
            let del_sql = "DELETE FROM contacts WHERE id=" + req.params.id+"";
            db.query(del_sql, (error)=>
                {
                    if(error)
                    {
                    res.send({status: false,message:"DELETING Contact FAILED!!"});
                    }
                    else
                    {
                        res.send({status : true, message : " DELETED the Contact Successfully"});
                    }
            });
        });    