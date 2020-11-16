projectData = {}; // empty js object to act as end point for all routes 

const express = require('express'); // express to run server and routes 

const app = express(); //instance of app

/*Dependecies*/
const bodyParser = require('body-parser');
/*middlware*/
app.use(bodyParser.urlencoded({ extended: false })); //configuring express to use body-parser as middleware
app.use(bodyParser.json());

const cors = require('cors'); //to give the allowance between the browser and server 
app.use(cors());

app.use(express.static('website')); //initialize the main project folder 

const port = "8888"; /*set up the server */
app.listen(port, () => {
    console.log("runing on the sever : " + port);
});
//get route.
app.get('/all', (req, res) => {
    res.send(projectData);
    console.log(projectData);
});

//post route .

app.post('/addUserInfo', information) //to send information 

function information(req, res) {
    projectData.city = req.body.City;
    projectData.temp = req.body.temp;
    projectData.feeling = req.body.feeling;

    res.send(projectData);
    console.log(projectData);
};