import config from "../conf/index.js";


async function init() {
  //Fetches list of all cities along with their images and description
  let cities = await fetchCities();
  //Updates the DOM with the cities
  cities.forEach((key) => {
    addCityToDOM(key.id, key.city, key.description, key.image);
  });
}

//Implementation of fetch call
async function fetchCities() {
  // TODO: MODULE_CITIES
  // 1. Fetch cities using the Backend API and return the data
  try{
    let result = await fetch(config.backendEndpoint+"/cities");
    let data = await result.json()
    return data;
  }catch{
    return null;
  }
  
  
}

//Implementation of DOM manipulation to add cities
function addCityToDOM(id, city, description, image) {
  // TODO: MODULE_CITIES
  // 1. Populate the City details and insert those details into the DOM
  

  
  let innerhtml = `
    <a href="pages/adventures/?city=${id}" id=${id}>
      <div class="tile">
        <img  src=${image} class="img-responsive" alt="city-image">
        <div class="tile-text">
          <p>${city}</p>
          <p >${description}</p>
        </div>
      </div>
    </a>`
  
  
  let element = document.createElement("div");
  element.className="col-12 col-sm-6 col-lg-3 mb-3"
  element.innerHTML = innerhtml
  document.getElementById("data").append(element);
  

}

export { init, fetchCities, addCityToDOM };

