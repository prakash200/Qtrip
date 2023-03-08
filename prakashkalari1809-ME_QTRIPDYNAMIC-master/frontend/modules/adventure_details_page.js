import config from "../conf/index.js";

//Implementation to extract adventure ID from query params
function getAdventureIdFromURL(search) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Get the Adventure Id from the URL
  // Place holder for functionality to work in the Stubs
  let id = search.split("=")[1];
  return id;
}
//Implementation of fetch call with a paramterized input based on adventure ID
async function fetchAdventureDetails(adventureId) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Fetch the details of the adventure by making an API call
  try{
    let promise = await fetch(config.backendEndpoint+"/adventures/detail?adventure="+adventureId);
    let data = await(promise.json());
    return data;
  }catch{
    return null;
  }
  

  // Place holder for functionality to work in the Stubs
  
}

//Implementation of DOM manipulation to add adventure details to DOM
function addAdventureDetailsToDOM(adventure) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the details of the adventure to the HTML DOM
  
  document.getElementById("adventure-name").textContent = adventure.name;
  //console.log()
  let advName=document.getElementById("adventure-name");  
  let advSubtitle=document.getElementById("adventure-subtitle");  
  let advImages=document.getElementById("photo-gallery"); 
  let advContent=document.getElementById("adventure-content"); 
  advName.textContent=adventure.name;  
  advSubtitle.textContent=adventure.subtitle;  
  advContent.textContent=adventure.content;  
  for(let i=0; i<adventure.images.length; i++){   
      let newChild=document.createElement("div");     
      newChild.innerHTML=     `<img src=${adventure.images[i]} class="activity-card-image">`;     
  advImages.appendChild(newChild); }
  
}

//Implementation of bootstrap gallery component
function addBootstrapPhotoGallery(images) {
  // TODO: MODULE_ADVENTURE_DETAILS
  // 1. Add the bootstrap carousel to show the Adventure images
  let HTML = `
  <div id="carouselExampleIndicators" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-indicators" id="carousel-indicators">
  </div>
  <div class="carousel-inner" id="carousel-inner">
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
  `
  document.getElementById("photo-gallery").innerHTML = HTML;
  for(let image=0;image<images.length;image++){
    let button = document.createElement("button");
    button.setAttribute("data-bs-target","#carouselExampleIndicators");
    button.setAttribute("data-bs-slide-to",image);
    button.setAttribute("aria-current", true);
    button.setAttribute("aria-label","Slide "+(image+1));
    if (image==0){
      button.setAttribute("class" , "active")
    }
    // console.log(document.getElementById("carousel-indicators"))
    document.getElementById("carousel-indicators").append(button);
    let divElement = document.createElement("div");
    if (image==0){
      divElement.className="carousel-item active";
    }else{
      divElement.className="carousel-item";
    }
    let imgElement = document.createElement("img");
    imgElement.src=images[image];
    imgElement.className="activity-card-image d-block w-100"
    // imgElement.style.objectFit="cover";
    imgElement.alt="adventure images"
    divElement.append(imgElement)
    document.getElementById("carousel-inner").append(divElement)
  }

  

}

//Implementation of conditional rendering of DOM based on availability
function conditionalRenderingOfReservationPanel(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If the adventure is already reserved, display the sold-out message.
  
  // document.getElementById("reservation-panel-sold-out").style.display = "block";
  if (adventure.available){
    document.getElementById("reservation-panel-sold-out").style.display = "none";
    document.getElementById("reservation-panel-available").style.display = "block";
    document.getElementById("reservation-person-cost").textContent = adventure.costPerHead;
    
    
  }else{
    document.getElementById("reservation-panel-available").style.display = "none"
    document.getElementById("reservation-panel-sold-out").style.display = "block";
  }

}

//Implementation of reservation cost calculation based on persons
function calculateReservationCostAndUpdateDOM(adventure, persons) {
  // TODO: MODULE_RESERVATIONS
  // 1. Calculate the cost based on number of persons and update the reservation-cost field
  document.getElementById("reservation-cost").textContent = persons*(adventure.costPerHead)

}

//Implementation of reservation form submission
function captureFormSubmit(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. Capture the query details and make a POST API call using fetch() to make the reservation
  // 2. If the reservation is successful, show an alert with "Success!" and refresh the page. If the reservation fails, just show an alert with "Failed!".
  // console.log(adventure)
  document.getElementById("myForm").addEventListener("submit",formData)
  function formData(event) {
    event.preventDefault();
    // console.log(event.target.person)
    // console.log(adventure.id)
    let name = event.target.elements.name.value
    let date = event.target.elements.date.value
    let person = event.target.elements.person.value
    let id = adventure.id
    let data = {
      name : name,
      date : date,
      person : person,
      adventure : id
    }

    const options = {
      method: 'POST',
      headers: {
      'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
      };

      fetch(config.backendEndpoint+"/reservations/new", options)
      .then(data => {
        if (!data.ok){
          throw Error(data.status);
        }
        alert("Success!");
      }).catch(e => {
      alert("Failure");
      });
    
  }
  



}

//Implementation of success banner after reservation
function showBannerIfAlreadyReserved(adventure) {
  // TODO: MODULE_RESERVATIONS
  // 1. If user has already reserved this adventure, show the reserved-banner, else don't
  if (adventure.reserved){
    document.getElementById("reserved-banner").style.display = "block";
  }else{
    document.getElementById("reserved-banner").style.display = "none";
  }

}

export {
  getAdventureIdFromURL,
  fetchAdventureDetails,
  addAdventureDetailsToDOM,
  addBootstrapPhotoGallery,
  conditionalRenderingOfReservationPanel,
  captureFormSubmit,
  calculateReservationCostAndUpdateDOM,
  showBannerIfAlreadyReserved,
};
