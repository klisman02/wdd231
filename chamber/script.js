// Toggle Menu
const menuToggle = document.querySelector("#menu-toggle");
const menu = document.querySelector("#menu");

menuToggle.addEventListener("click", () => {
  menu.classList.toggle("show");
});

// Functionality to hide the hero section
const heroSection = document.querySelector('.hero-section');
const joinLaterBtn = document.getElementById('join-later-btn');

if (joinLaterBtn) {
    joinLaterBtn.addEventListener('click', () => {
        heroSection.style.display = 'none';
    });
}

// Toggle Grid/List View
const directory = document.querySelector("#directory");
if (directory) {
  const gridBtn = document.querySelector("#grid-btn");
  const listBtn = document.querySelector("#list-btn");
  
  gridBtn.addEventListener("click", () => {
    directory.classList.add("grid");
    directory.classList.remove("list");
  });
  
  listBtn.addEventListener("click", () => {
    directory.classList.add("list");
    directory.classList.remove("grid");
  });
}

// Fetch Members JSON (for the directory)
async function getMembers() {
  const response = await fetch("./members.json");
  const data = await response.json();
  displayMembers(data.members);
}

function displayMembers(members) {
  members.forEach(member => {
    const card = document.createElement("div");
    card.classList.add("card");
    
    card.innerHTML = `
      <img src="images/${member.image}" alt="${member.name} logo">
      <h2>${member.name}</h2>
      <p>${member.address}</p>
      <p>${member.phone}</p>
      <a href="${member.website}" target="_blank">Visit Website</a>
      <p>Membership Level: ${member.membership}</p>
    `;
    
    directory.appendChild(card);
  });
}

if (directory) {
  getMembers();
}

// Functions for the Home Page
const weatherApiKey = 'ec7f00951b22dcf9ea36089755070e0c';
const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=San Miguel,SV&units=imperial&appid=${weatherApiKey}`;
const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?q=San Miguel,SV&units=imperial&appid=${weatherApiKey}`;
const membersUrl = './members.json';

// Fetch and display current weather and forecast
async function fetchWeather() {
  try {
    const response = await fetch(weatherUrl);
    const data = await response.json();
    document.getElementById('current-temp').textContent = Math.round(data.main.temp);
    document.getElementById('weather-description').textContent = capitalizeFirstLetter(data.weather[0].description);
    
    // Fetch and display 3-day forecast
    const forecastResponse = await fetch(forecastUrl);
    const forecastData = await forecastResponse.json();
    const forecastContainer = document.getElementById('forecast-container');
    const upcomingDays = forecastData.list.filter(item => item.dt_txt.includes('12:00:00')).slice(0, 3);
    
    upcomingDays.forEach(day => {
      const date = new Date(day.dt * 1000);
      const dayName = date.toLocaleDateString('en-US', { weekday: 'short' });
      
      const forecastCard = document.createElement('div');
      forecastCard.classList.add('forecast-card');
      forecastCard.innerHTML = `
        <p>${dayName}</p>
        <p>${Math.round(day.main.temp)}°F</p>
        <p>${capitalizeFirstLetter(day.weather[0].description)}</p>
      `;
      forecastContainer.appendChild(forecastCard);
    });
    
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}

// Fetch and display member spotlights
async function fetchSpotlights() {
  try {
    const response = await fetch(membersUrl);
    const data = await response.json();
    
    const qualifiedMembers = data.members.filter(member => 
      member.membership === 'Gold' || member.membership === 'Silver'
    );
    
    // Shuffle and select 2 or 3 members
    const shuffledMembers = qualifiedMembers.sort(() => 0.5 - Math.random());
    const selectedMembers = shuffledMembers.slice(0, 3);
    
    const spotlightGrid = document.getElementById('spotlight-grid');
    
    selectedMembers.forEach(member => {
      const card = document.createElement('div');
      card.classList.add('card'); 
      card.innerHTML = `
        <h3>${member.name}</h3>
        <img src="images/${member.image}" alt="${member.name} Logo">
        <p>${member.address}</p>
        <p>${member.phone}</p>
        <p><a href="${member.website}" target="_blank">Visit Website</a></p>
      `;
      spotlightGrid.appendChild(card);
    });
    
  } catch (error) {
    console.error('Error fetching member data:', error);
  }
}

// Capitalize the first letter of strings
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

// Initialize functions if elements exist on the page
if (document.querySelector('.weather-section')) {
  fetchWeather();
}
if (document.querySelector('.spotlights-section')) {
  fetchSpotlights();
}

// Footer Info
const yearElement = document.querySelector("#year");
if (yearElement) {
    yearElement.textContent = new Date().getFullYear();
}
// Do this for lastModified and currentDate as well
document.querySelector("#year").textContent = new Date().getFullYear();
document.querySelector("#lastModified").textContent = document.lastModified;
document.querySelector("#currentDate").textContent = new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });