// === Variables related to global

let refugeeMap = document.getElementById("refugee-map");

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
let objectContemp = document.getElementById("contemp");

// Convert object into array. Really necessary to loop through?
let entries = Object.entries(meritObjects);
console.log(entries);

// ###### ALLE FUNKTIONEN  ##########

function lifeSpan() {
  let lifeSpan = parseInt(clickedObject.death) - parseInt(clickedObject.birth);
  let sorryMessage = "Sorry, no date available";

  if (isNaN(lifeSpan)) {
    objectAge.innerText = sorryMessage;
  } else {
    objectAge.innerText = lifeSpan + " years";
  }
}

renderModal = (clickedObject) => {
  // TODO: innerHTML in textContent ändern

  objectPray.innerHTML = clickedObject.prayer;
  objectMantra.innerHTML = clickedObject.mantra;
  objectWork.innerHTML = clickedObject.work;

  objectDisciple.innerHTML = clickedObject.disciple;
  objectTeacher.innerHTML = clickedObject.teacher;
};

function findContemporary(clickedObject) {
  let allContemps = [];
  meritObjects.forEach((meritObject) => {
    if (
      clickedObject.birth <= meritObject.birth &&
      clickedObject.death > meritObject.birth
    ) {
      allContemps.push(meritObject.firstName);
    } else if (
      clickedObject.birth > meritObject.birth &&
      clickedObject.death < meritObject.death
    ) {
      allContemps.push(meritObject.firstName);
    }

    // Without this condiction, the name of the clicked person would be listed in the array of contemporaries.
    if (allContemps.includes(clickedObject.firstName)) {
      allContemps.splice(allContemps.indexOf(clickedObject.firstName), 1);
    }
  });
  objectContemp.innerHTML = `<strong>${allContemps}</strong>`;
}

function renderNewModal() {
  objectName.innerHTML = clickedObject.firstName;

  objectBirth.innerHTML = clickedObject.birth;
  objectDeath.innerHTML = clickedObject.death;
  objectBio.innerHTML = clickedObject.bio;
  objectAka.innerHTML = clickedObject.aka;
  objectTeachings.innerHTML = clickedObject.teachings;
  objectLineage.innerHTML = clickedObject.lineage;

  let imgPath = clickedObject.img;
  document.getElementById("objectImg").src = imgPath;

  findContemporary(clickedObject);
  lifeSpan();
}

const allContemps = [];

areaClickHandler = (event) => {
  event.preventDefault();
  allContemps.length = 0;
  const area = event.target;
  const chosenObject = area.title; //The name of element clicked on

  meritObjects.forEach((entry) => {
    const contemp = document.querySelector(".custom-title");
  });
  // This part retrieves the coords data from HTML area
  const elementCoords = area.coords;

  for (let e of entries) {
    chosenObject === e[1].firstName ? (clickedObject = e[1]) : false;
  }

  // Add coords to Object (They are needed to place the modal near clicked object)
  clickedObject.coords = elementCoords;

  renderNewModal();
};

pageClickHandler = (event) => {
  var el = event.target;
  if (el.nodeName === "AREA" && el.classList.contains("open")) {
    areaClickHandler(event);
  }
};

refugeeMap.addEventListener("click", pageClickHandler);
