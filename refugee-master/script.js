$(function () {
  $('[data-toggle="popover"]').popover();
});

$(".popover-dismiss").popover({
  trigger: "focus",
});

// === Variables related to global

let refugeeMap = document.getElementById("refugee-map");

// === Variables related to contemporary modal
let closeContemp = document.getElementById("close--contemp");
let contempModal = document.getElementsByClassName(
  "modal-container--contemp"
)[0];
// let displayContemp = document.getElementById("allContemp");

// ===== Window on click, wenn modals / markers offen, close.

// the marker is a red dot which marks the refugee object

let markerPlacement = document.getElementById("marker");

// THE LINEAGE MASTER SEARCH MODULE
// Initiate array to collect all names of merit objects in alphabetical order. To select them via VALUE of "searchLineageMaster"
let marker = document.getElementById("marker");
let alphabeticalMaster = [];

meritObjects.forEach((element) => {
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

let placeMarker = (searchedMasterCoord) => {
  let searchedMasterCoordArr = searchedMasterCoord.split(",");
  // MarkerPlacement
  const searchMasterCoordX = parseInt(searchedMasterCoordArr[0]);
  const searchMasterCoordY = parseInt(searchedMasterCoordArr[1]);
  markerPlacement.style.left = searchMasterCoordX - 15 + "px";
  markerPlacement.style.top = searchMasterCoordY + 90 + "px";
};

// ====== Drop Down Menu: Search for object =====
lineagMasterSearch.addEventListener("click", (e) => {
  marker.style.visibility = "visible";
  let index = lineagMasterSearch.value;
  let searchedMasterName = alphabeticalMaster[index];

  // Array with all Maters from DOM
  let allMasters = document.querySelectorAll("area");

  allMasters.forEach((e, i) => {
    if (searchedMasterName == allMasters[i].alt) {
      searchedMasterCoord = allMasters[i].coords;
    }
  });
  placeMarker(searchedMasterCoord);
});

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

renderModal = (clickedObject) => {
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

// ===== Renders Modal for Contemporaries ======
// =============================================

let searchContemporary = () => {
  let contemporaries = [];

  meritObjects.forEach((e) => {
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

// const contempus = document.getElementById("contemporary");
// contempus.addEventListener("click", searchContemporary());

// ==== Close modal & modalContemp depending on click target

areaClickHandler = (event) => {
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

pageClickHandler = (event) => {
  var el = event.target;
  if (el.nodeName === "AREA" && el.classList.contains("open")) {
    areaClickHandler(event);
  }
};

refugeeMap.addEventListener("click", pageClickHandler);
