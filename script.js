const { createApp } = Vue;

createApp({
  data() {
    return {
      output: [],
      forecast: [],
      location:[],
      message: '',
      input: 'kathmandu',
      showSuccessAlert: false,
      datetime: new Date(),
    };
  },
  methods: {
    getDayOfWeek(dateString) {
      const dateObj = new Date(dateString);
      const dayName = dateObj.toLocaleString('en-US', { weekday: 'short' });
      return dayName;
    },
    calculate(){
      if (this.input==''){
        return
      }
      axios
      .get(
        
        `http://api.weatherapi.com/v1/forecast.json?key=placeyourkey&q=${this.input}&days=5&aqi=yes&alerts=no` // place your key
      )
      .then((response) => {
        this.output = response.data.current;
        this.forecast = response.data.forecast.forecastday;
        this.location=response.data.location;
        this.showSuccessAlert = true;
      })
      .catch((error) => {
        this.input="Not a valid address"
      });

    }
  },
  mounted() {
    axios
      .get(
        
        'http://api.weatherapi.com/v1/forecast.json?key=f68d88e9bd714cc2a4e40406233103&q=auto:ip&days=5&aqi=yes&alerts=no'
      )
      .then((response) => {
        this.output = response.data.current;
        this.forecast = response.data.forecast.forecastday;
        this.location=response.data.location;
        this.showSuccessAlert = true;
      })
      .catch((error) => {
        console.log(error);
      });
  },
  beforeUnmount() {},
  computed: {
    forecaste(){
      return this.forecast.slice(1,5)
    },
    dayOfWeek() {
      const daysOfWeek = ['Sunday', 'Monday', 'Tueday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
      return daysOfWeek[this.datetime.getDay()];
    },
    dateOfYear() {
      const monthsOfYear = [
        'Jan',
        'Feb',
        'Mar',
        'Apr',
        'May',
        'Jun',
        'Jul',
        'Aug',
        'Sep',
        'Oct',
        'Nov',
        'Dec',
      ];
      return (
        this.datetime.getDate() +
        ' ' +
        monthsOfYear[this.datetime.getMonth()] +
        ' ' +
        this.datetime.getFullYear()
      );
    },
    monthofyear() {
      const monthsOfYear = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      return monthsOfYear[this.datetime.getMonth()];
    },
    dateofyear() {
      return this.datetime.getDate();
    },
    
    year() {
      return this.datetime.getFullYear();
    },
    
  },
}).mount('#app');
