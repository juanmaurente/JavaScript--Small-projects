const storage = new Storage();

const weatherLocation = storage.getLocationData(); 

const weather = new Weather(weatherLocation.city);

const ui = new UI();



weather.getCity()
.then(data => {
    console.log(data);
}).then (data => {
    console.log(data);
})
    //
.catch(err => console.log(err));

weather.getWeather()
.then(data => {
    console.log(data);
}).then (data => {
    console.log(data);
})
    //
.catch(err => console.log(err));