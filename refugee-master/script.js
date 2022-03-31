// === Variables related to global

let refugeeMap = document.getElementById("refugee-map");

// TAB TEST

$("#myTab a").click(function (e) {
  e.preventDefault();
  $(this).tab("show");
});

$('#myTab a[href="#home"]').tab("show");
$('#myTab a[href="#profile"]').tab("show");
// $('#myTab a[href="#contact"]').tab("show");

// TAB ENDE
// THE LINEAGE MASTER SEARCH MODULE
// Initiate array to collect all names of merit objects in alphabetical order. To select them via VALUE of "searchLineageMaster"
let marker = document.getElementById("marker");
let lineageMasterAlphabeticalOrder = [];

meritObjects.forEach((object) => {
  lineageMasterAlphabeticalOrder.push(object.firstName);
  lineageMasterAlphabeticalOrder = lineageMasterAlphabeticalOrder.sort();
});

// Attach Names to select button
let lineagMasterSearch = document.getElementById("searchLineageMaster");

lineageMasterAlphabeticalOrder.forEach((e, i) => {
  let options = new Option(e, i);
  lineagMasterSearch.add(options, undefined);
});

// Variables to place content inside the modal
let objectName = document.getElementById("objectName");
let objectAka = document.getElementById("objectAka");
let objectBirth = document.getElementById("objectBirth");
let objectDeath = document.getElementById("objectDeath");
let objectLineage = document.getElementById("objectLineage");
let objectBio = document.getElementById("objectBio");
let objectAge = document.getElementById("objectAge");
let objectPray = document.getElementById("objectPray");
let objectMantra = document.getElementById("objectMantra");
let objectWork = document.getElementById("objectWork");
let objectTeachings = document.getElementById("objectTeachings");
let objectDisciple = document.getElementById("objectDisciple");
let objectTeacher = document.getElementById("objectTeacher");

// Convert object into array. Really necessary to loop through?
let entries = Object.entries(meritObjects);
console.log(entries);

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

  // TODO: innerHTML in textContent ändern
  modalPlacement.style.top = coordY + "px";
  objectName.innerHTML = clickedObject.firstName;
  objectAka.innerHTML = clickedObject.aka;
  objectBirth.innerHTML = clickedObject.birth;
  objectDeath.innerHTML = clickedObject.death;
  objectLineage.innerHTML = clickedObject.lineage;
  objectBio.innerHTML = clickedObject.bio;
  objectPray.innerHTML = clickedObject.prayer;
  objectMantra.innerHTML = clickedObject.mantra;
  objectWork.innerHTML = clickedObject.work;
  objectTeachings.innerHTML = clickedObject.teachings;
  objectDisciple.innerHTML = clickedObject.disciple;
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

// ########## Hier alle Funktionen ############

function findContemporary() {}

// ==== Close modal & modalContemp depending on click target

const allContemps = [];
areaClickHandler = (event) => {
  event.preventDefault();
  allContemps.length = 0;
  const area = event.target;
  const chosenObject = area.title; //The name of element clicked on

  // findContemporary(chosenObject);
  // TODO: Hier per filter loopen und nach Zeitgenossen suchen
  meritObjects.forEach((entry) => {
    const contemp = document.querySelector(".custom-title");

    if (entry.firstName == chosenObject) {
      meritObjects.filter((meritObject) => {
        if (
          entry.birth <= meritObject.birth &&
          entry.death > meritObject.birth
        ) {
          allContemps.push(meritObject.firstName);
        } else if (
          entry.birth > meritObject.birth &&
          entry.death < meritObject.death
        ) {
          allContemps.push(meritObject.firstName);
        }
      });
      contemp.innerHTML = `<p>${allContemps}</p>`;
    }
  });
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
