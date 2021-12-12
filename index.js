const express = require("express");
const path = require("path");
const port = 8001;

const db = require("./config/mongoose");
const Contact = require("./models/contact"); 

const app = express();

// set engine for view 
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
//middleware
app.use(express.urlencoded());

//middleware for css styling
app.use(express.static("assets"));

//middleware 1
// app.use((req, res, next) => {
//   console.log("middleware one called");
//   next();
// });

//middleware 2
// app.use((req, res, next) => {
//   console.log("middleware two called");
//   next();
// })

//temporarly created before database been created
// var contactList = [
//   {
//     name: "Arpan",
//     phone: "9822446403",
//   },
//   {
//     name: "Saurabh",
//     phone: "9822446804",
//   },
//   {
//     name: "Shonny",
//     phone: "9758472947",
//   },
// ];

app.get("/", (req, res) => {
  Contact.find({ }, function (err, contacts) {
    if (err) {
      console.log("Error in fetching contacts from db");
      return;
    }
    return res.render("home", {
      title: "Contact List",
      contact_list: contacts,
    });
  });
});

app.get("/practice", (req, res) => {
  return res.render("practice", { title: "I am practice..." });
});

app.post("/create-contact", function (req, res) {
  // contactList.push({
  //   name: req.body.name,
  //   phone: req.body.phone
  // });
  // contactList.push(req.body);
  // now we are going to push in database
  Contact.create(
    {
      name: req.body.name,
      phone: req.body.phone,
    },
    function (err, newContact) {
      if (err) {
        console.log("error in creating contact!");
        return;
      }
      console.log("********", newContact);
      return res.redirect("back");
    }
  );
});

// for deleting the contact
app.get("/delete-contact", function (req, res) {
  // console.log(req.params);
  //  console.log(req.query);

  // get the id from parameters in url
  let id = req.query.id;

  // find the contact in the database using id and delete

  Contact.findByIdAndDelete(id, function (err) {
    if (err) {
      console.log("Error in deleting contact object from database");
      return;
    }
  });

  return res.redirect("back");
});

app.listen(port, function (error) {
  if (error) {
    console.log("Error in running server:", err);
  }
  console.log("Yup! Express server running on port:", port);
});
