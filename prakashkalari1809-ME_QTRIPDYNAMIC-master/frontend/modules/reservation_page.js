import config from "../conf/index.js";

//Implementation of fetch call to fetch all reservations
async function fetchReservations() {
  // TODO: MODULE_RESERVATIONS
  // 1. Fetch Reservations by invoking the REST API and return them

  try{
    let result = await fetch(config.backendEndpoint+"/reservations/");
    let data = await result.json()
    console.log(data);
    return data;
  }catch{
    return null;
  }


  // Place holder for functionality to work in the Stubs
  return null;
}

//Function to add reservations to the table. Also; in case of no reservations, display the no-reservation-banner, else hide it.
function addReservationToTable(reservations) {
  // TODO: MODULE_RESERVATIONS
  // 1. Add the Reservations to the HTML DOM so that they show up in the table

  //Conditionally render the no-reservation-banner and reservation-table-parent
  if (reservations.length>0){
    document.getElementById("no-reservation-banner").style.display = "none";
    document.getElementById("reservation-table-parent").style.display = "block";
    for(let rows=0;rows<reservations.length;rows++){

      let tr = document.createElement("tr")

      let date = new Date(reservations[rows]["date"]);
      let finaldate = date.toLocaleDateString("en-IN");

      let booktime = new Date(reservations[rows]["time"])
      booktime = booktime.toLocaleString("en-IN",
      {
        dateStyle:"long",
        timeStyle: "medium",
        hour12:true
      }
      )
      booktime = booktime.replace(" at ",", ")
      let info=`
        <th>${reservations[rows]["id"]}</th>
        <th>${reservations[rows]["name"]}</th>
        <th>${reservations[rows]["adventureName"]}</th>
        <th>${reservations[rows]["person"]}</th>
        <th>${finaldate}</th>
        <th>${reservations[rows]["price"]}</th>
        <th>${booktime}</th>
        <th id="${reservations[rows]["id"]}"><a href= "../detail/?adventure=${reservations[rows]["adventure"]}"><button  type = "button" class="reservation-visit-button">Visit Adventure</button></a></th>
      `
      

      tr.innerHTML = info;


      document.getElementById("reservation-table").append(tr)
    }
  }else{
    document.getElementById("reservation-table-parent").style.display = "none";
    document.getElementById("no-reservation-banner").style.display = "block";
  }
  /*
    Iterating over reservations, adding it to table (into div with class "reservation-table") and link it correctly to respective adventure
    The last column of the table should have a "Visit Adventure" button with id=<reservation-id>, class=reservation-visit-button and should link to respective adventure page

    Note:
    1. The date of adventure booking should appear in the format D/MM/YYYY (en-IN format) Example:  4/11/2020 denotes 4th November, 2020
    2. The booking time should appear in a format like 4 November 2020, 9:32:31 pm
  */

}

export { fetchReservations, addReservationToTable };
