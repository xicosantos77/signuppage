
const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
app.use(bodyParser.urlencoded({extended: true}))
app.use(express.static("public"));

mailchimp.setConfig({
  apiKey: "040ab8245ae8ec8407b8afef64aaec38-us14",
});

app.get("/", function(req, res){
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res){
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.email);

  const listId = "c55d6f97af";
  const subscribingUser = {
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email
  };

  async function run() {
      try {
          const response = await mailchimp.lists.addListMember(listId, {
            email_address: subscribingUser.email,
            status: "subscribed",
            merge_fields: {
              FNAME: subscribingUser.firstName,
              LNAME: subscribingUser.lastName
            }
          });

          console.log(
            `Successfully added contact as an audience member. The contact's id is ${response.id}.`
          );

          res.sendFile(__dirname + "/success.html");
      } catch (e) {
          res.sendFile(__dirname + "/failure.html");
      }
  }

  run();
})

app.post("/failure", function(req, res) {
  res.redirect("/");
})

app.listen(3000, function () {
  console.log("Server is running on port 3000")
});

/*
const express = require('express');
const bodyParser = require('body-parser');
const mailchimp = require('@mailchimp/mailchimp_marketing');

const app = express();
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

mailchimp.setConfig({
  apiKey: "040ab8245ae8ec8407b8afef64aaec38-us14"
  //server: "us14"
});

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
})

app.post("/", function(req, res) {
  console.log(req.body.firstName);
  console.log(req.body.lastName);
  console.log(req.body.email);

  const listId = "c55d6f97af";
  const subscribingUser = {
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    email: req.body.email
  };

  async function run() {
    const response = await mailchimp.lists.addListMember(listId, {
      email_address: subscribingUser.email,
      status: "subscribed",
      merge_fields: {
        FNAME: subscribingUser.firstName,
        LNAME: subscribingUser.lastName
      }
    });

    console.log(
      `Successfully added contact as an audience member. The contact's id is ${response.id}.`
    );

    res.sendFile(__dirname + "/success.html");
  } catch (e) {
    res.sendFile(__dirname + "/failure.html");
  }

  run();
})

app.listen(3000, function() {
  console.log("Server is running on port 3000")
});

// API KEY : 040ab8245ae8ec8407b8afef64aaec38-us14
// ID : c55d6f97af


const express = require ("express");
const bodyParser = require ("body-parser");
const request = require ("request");
const https = require ("https");

const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: true}));  //boiler plate ends here

app.get("/", function(req, res) {
  res.sendFile(__dirname + "/signup.html");
});

app.post("/", function(req, res){

  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const data = {
    members: [
      {
        email_address: email
        status: "subscribed"
        merge_fields: {
          FNAME: firstName;
          LNAME: lastName;
        }
      }
    ]
  }

  const jsonData = JSON.stringify(data);

  const url = "https://us14.api.mailchimp.com/3.0/lists/c55d6f97af";
  const options = {
    method: "POST";
    auth: "francisco:f3fc2008f6c78bcb822d1b056ce4388d-us14";
  }

  const request = https.request(url, options, function(response){
    response.on("data", function(data){
      console.log(JSON.parse(data));
    });
  });

  request.write(jsonData);
  request.end();

  console.log(firstName, lastName, email);

});

app.listen(3000, function(){
  console.log("Server is running on port 3000.");
});
*/
