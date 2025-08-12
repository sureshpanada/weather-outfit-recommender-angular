# weather-outfit-recommender-angular
Angular implementation of weather-based outfit recommender challenge.

## How to Clone and Run Locally

1. **Clone the repository:**
	```sh
	git clone https://github.com/sureshpanada/weather-outfit-recommender-angular.git
	cd weather-outfit-recommender-angular
	```

2. **Install dependencies:**
	```sh
	npm install
	```

3. **Set up OpenWeatherMap API key:**
	- Add your API key to `src/environments/environment.ts` as `openWeatherApiKey`.

4. **Run the app locally:**
	```sh
	npm start
	```
	- The app will be available at `http://localhost:4200`.

5. **Run tests:**
	```sh
	npm test
	```

## Features

- City search input with auto-suggest and debounce
- Fetches weather data from OpenWeatherMap API
- Displays temperature, condition, wind speed, and humidity
- Outfit recommendation based on weather and temperature
- Offline cache for weather data with expiry
- Search history (last 5 cities, persistent via localStorage)
- Responsive design for mobile devices
- Theme toggle (light/dark)
- Card animations for weather and outfit suggestions
- Graceful error handling and loader states
- Unit tests for service and all components

## Can be improved according to me 

- Better Css can be used.
- can used interceptors when making API calls and handle loader state there
- could have used signals from angular newer versions (stable now)
