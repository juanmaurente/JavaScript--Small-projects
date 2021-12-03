class Storage {
    constructor() {
      this.city;
      this.locationId;
      this.defaultCity = 'Sydney';
    }
  
    getLocationData() {
      if(localStorage.getItem('city') === null) {
        this.city = this.defaultCity;
      } else {
        this.city = localStorage.getItem('city');
      }
  
      return {
        city: this.city,
      }
    }
  
    setLocationData(city, locationId) {
      localStorage.setItem('city', city);
      localStorage.setItem('locationId', locationId)
    }
  }