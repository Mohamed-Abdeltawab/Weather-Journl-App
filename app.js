// Personal API Key for OpenWeatherMap API
const apiKey = 'ff843c285fd6f9bad231473e94277647&units=imperial';

// Event listener to add function to existing HTML DOM element
const button = document.getElementById('generate');
button.addEventListener('click', action);

/* Function called by event listener */
function action() {
    let ZipCode = document.getElementById('zip').value;
    let feelings = document.getElementById('feelings').value;
    GetWeather(ZipCode)
        .then(function(data) {
            postData('/addUserInfo', { City: data.name, temp: data.temp, feeling: feelings });
            updateUI();
        })
};
/* Function to GET Web API Data*/
const GetWeather = async(zipCode) => {
    const BaseUrl = `http://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}`;
    const result = await fetch(BaseUrl);

    try {
        const data = await result.json();

        let temperature = data.main.temp;
        let cityName = data.name;
        let newData = { name: data.name, temp: data.main.temp };
        console.log(newData);
        return newData;
    } catch (exception) {
        console.log(`an error has been occured => ${exception}`);
        alert("Please enter the right zip code again!!");
    }
};

//create a new date 
let d = new Date();
let newDate = d.getMonth() + 1 + '.' + d.getDate() + '.' + d.getFullYear();

/* Function to POST data */
const postData = async(url = '', data = {}) => {

    const response = await fetch(url, {
        method: 'POST', // *GET, POST, PUT, DELETE, etc.
        credentials: 'same-origin', // include, *same-origin, omit
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), // body data type must match "Content-Type" header        
    });

    try {
        const newData = await response.json();

        return newData;
    } catch (error) {
        console.log("error", error);
        // appropriately handle the error
    }
};

// link between the previous functions.
const updateUI = async() => {
    const request = await fetch('/all')
    try {
        const allData = await request.json();


        document.getElementById('date').innerHTML = "Date : " + newDate;
        document.getElementById('temp').innerHTML = "Temperature : " + allData.temp + "°C";
        document.getElementById('content').innerHTML = "Your Feelings are : " + allData.feeling;
    } catch (error) {
        console.log(`error : ${error}`)
    }
};