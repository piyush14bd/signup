const bodyParser = require("body-parser");
const request = require("request");
const express = require("express");
const https = require("https");
const app = express();

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
    res.sendFile(__dirname + "/signup.html");
})

app.post("/", function (req, res) {
    const firstName = req.body.fname;
    const lastName = req.body.lname;
    const email = req.body.email;
    console.log(firstName, lastName, email);


    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: firstName,
                    LNAME: lastName
                }
            }
        ]
    };
    const jsonData = JSON.stringify(data);
    const url = "https://us18.api.mailchimp.com/3.0/lists/9e5df5ca1d";
    const options = {
        method: "POST",
        auth: "Piyush1:ef063f509d76c90ab2e538981faced66-us18"
    }
    const request = https.request(url, options, function (response) {
        if (response.statusCode === 200){
            res.sendFile(__dirname + "/success.html");
        }
        else{
            res.sendFile(__dirname + "/failure.html");
        }

        response.on("data", function (data) {
            console.log(JSON.parse(data));
        })

    });

    request.write(jsonData);
    request.end();
});


app.post("/failure", function(req, res){
    res.redirect("/");
});

app.listen(process.env.PORT || 8080, function () {
    console.log("server is running on port 8080")

});

// ef063f509d76c90ab2e538981faced66-us18

//  9e5df5ca1d