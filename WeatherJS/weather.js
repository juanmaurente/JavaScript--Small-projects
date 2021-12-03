class Weather{
    constructor(city, locationId){
        
        this.city = city;
        this.locationId = locationId;

    }

    async getCity(city){
        const base = `http://dataservice.accuweather.com/locations/v1/cities/search`;
        const query = `?apikey=${this.apikey}&q=${this.city}`;

        const response = await fetch(base + query);
        const data = await response.json();
        locationId = data[0].Key;

        return this.locationId ;
    }

    async getWeather(locationId){
        const base = 'http://dataservice.accuweather.com/currentconditions/v1/'
        const query = `${this.locationId}?apikey=${this.apikey}`;

        const response = await fetch(base + query);
        const data = await response.json();

        return data[0];
    }

    changeLocation(city){
        this.city = city;
    }
}

 