
import config from "../conf/index.js";

//Implementation to extract city from query params
function getCityFromURL(search) {
  // TODO: MODULE_ADVENTURES
  // 1. Extract the city id from the URL's Query Param and return it
  let city_id = search.split("=");
  return (city_id[1]);
}

//Implementation of fetch call with a paramterized input based on city
async function fetchAdventures(city) {
  // TODO: MODULE_ADVENTURES
  // 1. Fetch adventures using the Backend API and return the data
  try{
    let result = await fetch(config.backendEndpoint+"/adventures?city="+city);
    let data = await result.json()
    return data;
  }catch{
    return null;
  }
}

//Implementation of DOM manipulation to add adventures for the given city from list of adventures
function addAdventureToDOM(adventures) {
  // TODO: MODULE_ADVENTURES
  // 1. Populate the Adventure Cards and insert those details into the DOM
  document.getElementById("data").innerHTML=""
  for (let cards=0;cards<adventures.length;cards++){
    let element = document.createElement("div");
    element.className = "col-6 col-lg-3 mb-2";
    let innerHtml = `
    <a href="detail/?adventure=${adventures[cards]["id"]}" id=${adventures[cards]["id"]}>
      <div class="activity-card d-lg-flex" >
        <img src=${adventures[cards]["image"]}  alt="Resort Image" >
        <p class="category-banner">${adventures[cards]["category"]}<p>
        <div class="d-flex justify-content-between w-100 p-2 pb-0">
          <p class="card-title">${adventures[cards]["name"]}</p>
          <p class="card-text">&#8377;${adventures[cards]["costPerHead"]}</p>
        </div>
        <div class="d-flex justify-content-between w-100 p-2 pb-0">
          <p class="card-title">Duration</p>
          <p class="card-text">${adventures[cards]["duration"]} Hours</p>
        </div>
        
      </div>
    </a>
    `
    element.innerHTML = innerHtml;

    // document.getElementById("data").append(element);
    
    document.getElementById("data").append(element);
  }
  
  
  





}

//Implementation of filtering by duration which takes in a list of adventures, the lower bound and upper bound of duration and returns a filtered list of adventures.
function filterByDuration(list, low, high) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on Duration and return filtered list
  list = list.filter((adventure)=>{
     return adventure.duration>=low && adventure.duration<=high;
  }

  )
  return list;
}

//Implementation of filtering by category which takes in a list of adventures, list of categories to be filtered upon and returns a filtered list of adventures.
function filterByCategory(list, categoryList) {
  // TODO: MODULE_FILTERS
  // 1. Filter adventures based on their Category and return filtered list
  
  list = list.filter((adventure)=>{
    if (categoryList.includes(adventure.category)){
      return adventure;
    }
     
  })
  return list;
}

// filters object looks like this filters = { duration: "", category: [] };

//Implementation of combined filter function that covers the following cases :
// 1. Filter by duration only
// 2. Filter by category only
// 3. Filter by duration and category together

function filterFunction(list, filters) {
  // TODO: MODULE_FILTERS
  // 1. Handle the 3 cases detailed in the comments above and return the filtered list of adventures
  // 2. Depending on which filters are needed, invoke the filterByDuration() and/or filterByCategory() methods
  saveFiltersToLocalStorage(filters);
  let duration = filters['duration'];
  let range=[]
  if (duration.includes("-")){
    range = duration.split("-");
    list = filterByDuration(list,range[0],range[1]);
  }else if (duration.includes("+")){
    list = filterByDuration(list,12,99);
  }
  let categoryList = filters['category'];
  if (categoryList.length>0){
    list = filterByCategory(list, categoryList);
  }
  
  
  
  // Place holder for functionality to work in the Stubs
  return list;
}

//Implementation of localStorage API to save filters to local storage. This should get called everytime an onChange() happens in either of filter dropdowns
function saveFiltersToLocalStorage(filters) {
  // TODO: MODULE_FILTERS
  // 1. Store the filters as a String to localStorage
  window.localStorage.setItem('filters', JSON.stringify(filters));
  return true;
}

//Implementation of localStorage API to get filters from local storage. This should get called whenever the DOM is loaded.
function getFiltersFromLocalStorage() {
  // TODO: MODULE_FILTERS
  // 1. Get the filters from localStorage and return String read as an object

  

  // Place holder for functionality to work in the Stubs
  return JSON.parse(window.localStorage.getItem('filters'));
}

//Implementation of DOM manipulation to add the following filters to DOM :
// 1. Update duration filter with correct value
// 2. Update the category pills on the DOM

function generateFilterPillsAndUpdateDOM(filters) {
  // TODO: MODULE_FILTERS
  // 1. Use the filters given as input, update the Duration Filter value and Generate Category Pills
  
  
  for(let filter=0;filter<filters["category"].length;filter++){
    let element = document.createElement("p")
    element.className = "category-filter";
    element.innerText = filters["category"][filter];
    document.getElementById("category-list").append(element);
  };
  

}
export {
  getCityFromURL,
  fetchAdventures,
  addAdventureToDOM,
  filterByDuration,
  filterByCategory,
  filterFunction,
  saveFiltersToLocalStorage,
  getFiltersFromLocalStorage,
  generateFilterPillsAndUpdateDOM,
};
