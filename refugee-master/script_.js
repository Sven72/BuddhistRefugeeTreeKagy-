// === Variables related to basic modal
let modal = document.getElementById("modal");
let close = document.getElementById("close");
let open = document.getElementById("open");
let modalContent = document.getElementsByClassName("modal-content");

// === Variables related to contemporary modal
let closeContemp = document.getElementById("close--contemp");
let contempModal = document.getElementsByClassName(
  "modal-container--contemp"
)[0];
let displayContemp = document.getElementById("allContemp");

// ==== Variables related to autocomplete =================

// Code to construct autocomplete search module:
// #1: Define variables
// #2: Find search module -> use this from dropdown

// ===== Window on click, wenn modals / markers offen, close.

let markerPlacement = document.getElementById("marker");

// THE LINEAGE MASTER SEARCH MODULE
// Initiate array to collect all names of merit objects in alphabetical order. To select them via VALUE of "searchLineageMaster"

let alphabeticalMaster = [];

meritObjects.forEach(element => {
  alphabeticalMaster.push(element.firstName);
  alphabeticalMaster = alphabeticalMaster.sort();
});

// Attach Names to select button
let lineagMasterSearch = document.getElementById("searchLineageMaster");

alphabeticalMaster.forEach((e, i) => {
  let options = new Option(e, i);
  lineagMasterSearch.add(options, undefined);
});

// End of Placing all Lineage Masters into select field ////

let placeMarker = (searchedMasterCoord, searchedMasterName) => {
  let searchedMasterCoordArr = searchedMasterCoord.split(",");
  // MarkerPlacement
  const searchMasterCoordX = parseInt(searchedMasterCoordArr[0]);
  const searchMasterCoordY = parseInt(searchedMasterCoordArr[1]);
  markerPlacement.style.left = searchMasterCoordX - 15 + "px";
  markerPlacement.style.top = searchMasterCoordY + 90 + "px";
  marker.innerHTML = `<p>${searchedMasterName}</p>`;
};

// ====== Drop Down Menu: Search for object =====
lineagMasterSearch.addEventListener("click", e => {
  marker.classList.add("marker-container");
  // marker.style.visibility = "visible";
  let index = lineagMasterSearch.value;
  let searchedMasterName = alphabeticalMaster[index];
  findCoordsOfMaster(searchedMasterName);
});

let findCoordsOfMaster = searchedMasterName => {
  // Array with all Maters from DOM
  let allMasters = document.querySelectorAll("area");

  allMasters.forEach((e, i) => {
    if (searchedMasterName == allMasters[i].alt) {
      searchedMasterCoord = allMasters[i].coords;
    }
  });
  placeMarker(searchedMasterCoord, searchedMasterName);
};

// END: LINEAGE MASTER SEARCH MODULE

// Variables to place content inside the modal
let objectName = document.getElementById("objectName");
let objectAka = document.getElementById("objectAka");
let objectBirth = document.getElementById("objectBirth");
let objectDeath = document.getElementById("objectDeath");
let objectLineage = document.getElementById("objectLineage");
let objectBio = document.getElementById("objectBio");
let modalElement = document.getElementById("modalElement");
let objectAge = document.getElementById("objectAge");
let objectPray = document.getElementById("objectPray");
let objectMantra = document.getElementById("objectMantra");
let objectWork = document.getElementById("objectWork");
let objectTeachings = document.getElementById("objectTeachings");
let objectDisciple = document.getElementById("objectDisciple");
let objectTeacher = document.getElementById("objectTeacher");

// Convert object into array. Really necessary to loop through?
let entries = Object.entries(meritObjects);

// Function which dynamically put information from element clicked on and renders it on DOM.

renderModal = clickedObject => {
  modal.classList.add("show-modal");
  // Place modal near clicked element
  const modalPlacement = document.getElementById("modal");
  let objCoords = clickedObject.coords.split(",");
  const coordX = parseInt(objCoords[0]);
  const coordY = parseInt(objCoords[1]);
  const coordM = parseInt(objCoords[2]);
  // Depending on where clicked object is situated place modal left or right of object for readability reasons
  coordX > 500
    ? (modalPlacement.style.left = coordX - 400 + "px")
    : (modalPlacement.style.left = coordX + "px");

  // As in horizontals axis (above) place modal on y-axis depending on where clicked object is situated
  modalPlacement.style.top = coordY + "px";
  objectName.innerHTML = clickedObject.firstName;
  objectAka.innerText = clickedObject.aka;
  objectBirth.innerText = clickedObject.birth;
  objectDeath.innerText = clickedObject.death;
  objectLineage.innerText = clickedObject.lineage;
  objectBio.innerHTML = clickedObject.bio;
  objectPray.innerText = clickedObject.prayer;
  objectMantra.innerText = clickedObject.mantra;
  objectWork.innerText = clickedObject.work;
  objectTeachings.innerText = clickedObject.teachings;
  objectDisciple.innerText = clickedObject.disciple;
  objectTeacher.innerHTML = clickedObject.teacher;

  // Subroutine "Lifespan"
  let lifeSpan = parseInt(clickedObject.death) - parseInt(clickedObject.birth);
  let sorryMessage = "Sorry, no date available";

  if (isNaN(lifeSpan)) {
    objectAge.innerText = sorryMessage;
  } else {
    objectAge.innerText = lifeSpan + " years";
  }

  // Clickpath for clicked element
  let imgPath = clickedObject.img;

  document.getElementById("objectImg").src = imgPath;
};

let closeModal = () => {
  modal.classList.remove("show-modal");
};

// ===== Renders Modal for Contemporaries ======
// =============================================

let closeModelContemp = () => {
  displayContemp.innerHTML = "";
  contempModal.style.display = "none";
};

displayContemp.addEventListener("click", () => {
  closeModelContemp();
});
closeContemp.addEventListener("click", () => {
  closeModelContemp();
});

// Render contemporary modal container
let renderModalContemp = contemporaries => {
  contempModal.style.display = "Block";
  if (contemporaries.length > 0) {
    for (e in contemporaries) {
      displayContemp.innerHTML +=
        "<span>" + contemporaries[e] + "<span>" + "<br>";
      if (
        contemporaries[e]
          .split(" ")
          .includes(clickedObject.firstName.split(" ")[0])
      ) {
        displayContemp.childNodes[e].classList.add("test");
      }
    }
  } else if (contemporaries.length == 0) {
    displayContemp.innerHTML += "SORRY SORRY SORRY";
  }
};

// ==================================================
// ========== Subroutine "Contemporaries" ===========

let btnContemporary = document.getElementById("contemporary");

let searchContemporary = () => {
  let contemporaries = [];
  meritObjects.forEach(e => {
    // All cases in which target is born AFTER contemporaries birth
    if (
      parseInt(clickedObject.birth) >= parseInt(e.birth) &&
      parseInt(clickedObject.death) <= parseInt(e.death)
    ) {
      contemporaries.push(
        e.firstName + " " + parseInt(e.birth) + "-" + parseInt(e.death)
      );
    }
    // All cases in which target is born BEFORE contemporaries birth
    else if (
      parseInt(clickedObject.birth) <= parseInt(e.birth) &&
      parseInt(clickedObject.death) >= parseInt(e.birth)
    ) {
      contemporaries.push(
        e.firstName + " " + parseInt(e.birth) + "-" + parseInt(e.death)
      );
    }
  });
  renderModalContemp(contemporaries);
};

// ==== Close modal & modalContemp depending on click target

modal.addEventListener("click", e => {
  if (e.target.classList.contains("btn-contemporary")) {
    searchContemporary();
  } else if (e.target.classList.contains("myContemp")) {
    closeModelContemp();
  } else {
    // Ist das nicht sehr verschachtelt?
    if ((contempModal.style.display = "block")) {
      closeModelContemp();
    }
    closeModal();
  }
});

areaClickHandler = event => {
  event.preventDefault();
  const area = event.target;
  const chosenObject = area.title; //The name of element clicked on.

  // This part retrieves the coords data from HTML area
  const elementCoords = area.coords;

  for (let e of entries) {
    chosenObject === e[1].firstName ? (clickedObject = e[1]) : false;
  }

  // Add coords to Object (They are needed to place the modal near clicked object)
  clickedObject.coords = elementCoords;

  // Calling renderModal function where specific information is dynamically put into modal and modal gets rendered in the DOM.
  renderModal(clickedObject);
};

pageClickHandler = event => {
  var el = event.target;
  if (el.nodeName === "AREA" && el.classList.contains("open")) {
    areaClickHandler(event);
  }
};
document.addEventListener("click", pageClickHandler);
