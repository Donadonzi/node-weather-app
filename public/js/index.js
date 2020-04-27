
const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const errorElement = document.getElementById('errorMsg');
const locationElement = document.getElementById('location');
const forecastElement = document.getElementById('forecast');
const iconElement = document.getElementById('weather-icon');


weatherForm.addEventListener('submit', (e) => {

	e.preventDefault();

	errorElement.textContent = '';
	locationElement.textContent = 'Loading...';
	forecastElement.textContent = '';
	iconElement.innerHTML = '';

	const location = search.value;
	// Must modify the url so that it works when deployed on heroku
	// fetch(`http://localhost:3000/weather?address=${location}`).then((response) => {

	fetch(`/weather?address=${location}`).then((response) => {
		response.json().then((data) => {
			if (data.error) {
				iconElement.style.visibility = 'hidden';
				locationElement.textContent = '';
				return errorElement.textContent = data.error;
			}
			errorElement.textContent = '';
			locationElement.textContent = data.location;
			forecastElement.textContent = data.forecast;
			iconElement.style.visibility = 'visible';
			console.log(data.iconURL);
			iconElement.setAttribute('src', data.iconURL);
		});
	});
});