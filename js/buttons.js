const toggle_landingSites = document.getElementById('toggle_landingSites');
let landingSitesVisible = false;
const toggle_moonquakes = document.getElementById('toggle_moonquakes');
let moonquakesVisible = false;
const toggle_light = document.getElementById('toggle_light');
let lightVisible=true;
const toggle_topographic = document.getElementById('toggle_topographic');
let topographicVisible=false;
const toggle_Geological = document.getElementById('toggle_Geologicalmap');
let GeologicalVisible=false;
const toggle_temperature= document.getElementById('toggle_temperaturemap');
let temperatureVisible=false;

const colorScale = d3.scaleOrdinal(['orangered', 'mediumblue', 'darkgreen', 'yellow']);
const labelsTopOrientation = new Set(['Apollo 12', 'Luna 2', 'Luna 20', 'Luna 21', 'Luna 24', 'LCROSS Probe']); // avoid label collisions

//Funciones que vienen de moon.js. En version futura se deberia llamar a dichas funciones en lugar de colocarlas aca.
function ambientLightOn() {
    const directionalLight = moon.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
        if (directionalLight) {
            directionalLight.intensity=0;
        }
        const ambientLight = moon.scene().children.find(obj3d => obj3d.type === 'AmbientLight');
        if (ambientLight) {
            ambientLight.intensity=3.14;
        }
        if(!toggle_light.checked){
            toggle_light.checked=true;
        }
      

        
}

function ambientLightOFF() {
    const ambientLight = moon.scene().children.find(obj3d => obj3d.type === 'AmbientLight');
        if (ambientLight) {
            ambientLight.intensity=0;
        }
        const directionalLight = moon.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
        if (directionalLight) {
            directionalLight.intensity=2;
        }
        if(toggle_light.checked){
            toggle_light.checked=false;
        }
        
        
}
//Fin





function toggleTopographic() {
    topographicVisible = !topographicVisible;
    if (topographicVisible) {
        //!Check Is not a texture
        cargar_textura('/resources/lunar_topographic_map.png');

        //Toggle everything else false
        toggle_Geological.checked=false;
        GeologicalVisible=false;
        toggle_temperature.checked=false;
        temperatureVisible=false;

        ambientLightOn();

        // Obtén el elemento por su ID
        var miElemento = document.getElementById("Information");
        miElemento.innerHTML = '<iframe src="/topografich_info.html" frameborder="0" width="400" height="550"> </iframe>';
        // Agrego contenido al recuadro de info
        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".scene-nav-infoo");
        // Cambia el estilo del elemento
        miElemento.style.display = "block";
    } else {
        //!Check Add transition
        loadTexture();
        ambientLightOFF();

        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".scene-nav-infoo");
        // Cambia el estilo del elemento
        miElemento.style.display = "none";
        // Obtén el elemento por su ID
        var miElemento = document.getElementById("Information");
        miElemento.innerHTML = "";
    }
}

function toggleGeological() {
    if (!GeologicalVisible) {
        cargar_textura('/resources/lunar_unifiedGeologicMap.png');
        ambientLightOn();

        //Toggle everything else false
        toggle_topographic.checked=false;
        topographicVisible=false;
        toggle_temperature.checked=false;
        temperatureVisible=false;

        // Obtén el elemento por su ID
        var miElemento = document.getElementById("Information");
        miElemento.innerHTML = '<iframe src="/Geologic_SCALE.html" frameborder="0" width="400" height="550"> </iframe>';
        // Agrego contenido al recuadro de info
        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".scene-nav-infoo");
        // Cambia el estilo del elemento
        miElemento.style.display = "block";

    } else {
        //!Check Add transition
        loadTexture();
        ambientLightOFF();
        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".scene-nav-infoo");
        // Cambia el estilo del elemento
        miElemento.style.display = "none";
        // Obtén el elemento por su ID
        var miElemento = document.getElementById("Information");
        miElemento.innerHTML = "";
    }
    GeologicalVisible = !GeologicalVisible;
}

function toggleTemperature() {
    if (!temperatureVisible) {
        cargar_textura('/resources/lunar_max_temperature.png');
        ambientLightOn();

        //Toggle everything else false
        toggle_topographic.checked=false;
        topographicVisible=false;
        toggle_Geological.checked=false;
        GeologicalVisible=false;

        // Obtén el elemento por su ID
        var miElemento = document.getElementById("Information");
        miElemento.innerHTML = '<iframe src="temperature_max_info.html" width="500" frameborder="0">';
        // Agrego contenido al recuadro de info
        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".scene-nav-infoo");
        // Cambia el estilo del elemento
        miElemento.style.display = "block";

    } else {
        //!Check Add transition
        loadTexture();
        ambientLightOFF();

        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".scene-nav-infoo");
        // Cambia el estilo del elemento
        miElemento.style.display = "none";
        // Obtén el elemento por su ID
        var miElemento = document.getElementById("Information");
        miElemento.innerHTML = "";
    }
    temperatureVisible = !temperatureVisible;
}

function updateLandingSites(){
    const labeLandingSites = moonContainer.querySelectorAll(".landingSite-container");
    labeLandingSites.forEach(function(landingSite) {
        id_landingSite=landingSite.getAttribute('data-info');
        let landingSiteInfo = landingSitesData.find(item => item.id ===parseInt(id_landingSite));
        if (dateSelected >= landingSiteInfo.date) {
            landingSite.style.display = "block"; 
            landingSite.addEventListener('mouseover', function() {
                const landingSiteExtraInfo = landingSite.querySelectorAll('.landingSite-info');
                landingSiteExtraInfo.forEach(function(element) {
                    element.style.display = 'block';
                });
            });
            // Add mouseout event listener
            landingSite.addEventListener('mouseout', function() {
                const landingSiteExtraInfo = landingSite.querySelectorAll('.landingSite-info');
                landingSiteExtraInfo.forEach(function(element) {
                    element.style.display = 'none';
                });
            }); 
        }
        else{
            landingSite.style.display = "none"; 
        }

    });
}

function toggleLandingSites() {
    landingSitesVisible = !landingSitesVisible;
    if (landingSitesVisible) {
        toggle_landingSites.classList.add('on');
        updateLandingSites();
    } else {
        const labeLandingSites = moonContainer.querySelectorAll(".landingSite-container");
        labeLandingSites.forEach(function(landingSite) {
            landingSite.style.display = "none"; 
        });
        toggle_landingSites.classList.remove('on');
    }

}

function toggleMoonquakes() {
    moonquakesVisible = !moonquakesVisible;
    if (moonquakesVisible) {
        toggle_moonquakes.classList.add('on');
        const moonquakeParents = moonContainer.querySelectorAll(".moonquake-parent");
        moonquakeParents.forEach(function(parent) {
            parent.style.display = "block";
            parent.addEventListener('mouseover', function() {
                const moonquakeElement = parent.querySelector('.moonquake-element');
                const exclamation = parent.querySelector('.exclamation');
        
                moonquakeElement.style.display = 'block';
                exclamation.style.display = 'none';
            });
            parent.addEventListener('click', function() {
                let infoStr = parent.getAttribute('data-info');
                const infoJson = JSON.parse(infoStr.replace(/\/-!/g, ' '));
                var miElemento = document.getElementById("Information");
                miElemento.innerHTML = '<iframe src="/Informacion.html?Titulo='+infoJson.name+'-'+infoJson.mission+'&Texto='+infoJson.Info+'&image='+infoJson.Image+'" frameborder="0" width="400" height="550"> </iframe>';
                // Agrego contenido al recuadro de info
                // Obtén el elemento por su ID
                var miElemento = document.querySelector(".scene-nav-infoo");
                // Cambia el estilo del elemento
                miElemento.style.display = "block";
            });
            // Add mouseout event listener
            parent.addEventListener('mouseout', function() {
                const moonquakeElement = parent.querySelector('.moonquake-element');
                const exclamation = parent.querySelector('.exclamation');
        
                moonquakeElement.style.display = 'none';
                exclamation.style.display = 'block';
            }); 
        });
        const exlamationsMark = moonContainer.querySelectorAll(".exclamation");
        exlamationsMark.forEach(function(exclamation) {
            exclamation.style.display = "block"; 
        });
        moon.ringMaxRadius(2);
        moon.ringsData(moonquakesData);
    } else {
        toggle_moonquakes.classList.remove('on');
        const moonquakeElements = document.querySelectorAll('.moonquake-element, .exclamation');
        moonquakeElements.forEach(el => el.style.display = "none");
        moon.ringMaxRadius(0);
        // var miElemento = document.querySelector(".scene-nav-infoo");
        // // Cambia el estilo del elemento
        // miElemento.style.display = "none";
        
    }
}

function togglelight() {
    if (lightVisible) {
        //!Check Is not a texture
        // if (toggle_light.checked){}
            ambientLightOn();
    } else {
        //!Check Add transition
        // if (!toggle_light.checked){}
            ambientLightOFF();

    }
    lightVisible = !lightVisible;
}

function cargar_textura(ruta){
    var miElemento = document.getElementById("cargando");
    miElemento.style.display = "block";
    const loader = new THREE.TextureLoader();
    // load a resource
    const texture = loader.load(
        // resource URL
        ruta,
        // onLoad callback
        function ( texture ) {
            var miElemento = document.getElementById("cargando");
            miElemento.style.display = "none";
        },
        // onProgress callback currently not supported
        undefined,
        // onError callback
        function ( err ) {
            console.error( 'An error happened.' );
        }
    );
    moon.globeMaterial(new THREE.MeshStandardMaterial({ map: texture }));
}


//Listen for toggles buttons 
toggle_landingSites.addEventListener('click', toggleLandingSites);
toggle_moonquakes.addEventListener('click', toggleMoonquakes);
toggle_topographic.addEventListener('click', toggleTopographic);
toggle_light.addEventListener('click', togglelight);
toggle_Geological.addEventListener('click', toggleGeological);
toggle_temperature.addEventListener('click', toggleTemperature);

const sliderYear = document.getElementById("rangeYear");
const sliderMonth = document.getElementById("rangeMonth");
const sliderDay = document.getElementById("rangeDay");

const valueYear = document.getElementById("valueYear");
const valueMonth = document.getElementById("valueMonth");
const valueDay = document.getElementById("valueDay");

function updateMaxDayValue() {
  let selectedMonth = parseInt(sliderMonth.value, 10);
  let selectedYear = parseInt(sliderYear.value, 10) + 1960;
  let maxDay;
  // Calculate the maximum day based on the selected month
  if ([4, 6, 9, 11].includes(selectedMonth)) {
    // Months with 30 days
    maxDay = 30;
  } else if (selectedMonth === 2) {
    // February (assuming non-leap year)
    maxDay = (selectedYear % 4 === 0 && (selectedYear % 100 !== 0 || selectedYear % 400 === 0)) ? 29 : 28; // Check for leap year
  } else {
    // Months with 31 days
    maxDay = 31;
  }
  if (parseInt(sliderDay.value, 10) > maxDay) {
    sliderDay.value = maxDay.toString(); // Set the day value to the new maximum
    valueDay.textContent=maxDay.toString();
  }
  sliderDay.max = maxDay.toString();

  // Check if the current day value is greater than the new maximum

}

let dateSelected;
// Function to update the displayed date and background color
function updateSliders() {
  let year = parseInt(sliderYear.value, 10) + 1960;
  let month = parseInt(sliderMonth.value, 10).toString().padStart(2, '0');
  let day = parseInt(sliderDay.value, 10).toString().padStart(2, '0');

  valueYear.textContent = year;
  valueMonth.textContent = month;
  valueDay.textContent = day;


  dateSelected = `${year}-${month}-${day}`;
  // Calculate the progress as a percentage for each slider
  let progressYear = ((year - 1960) / (sliderYear.max - sliderYear.min)) * 100;
  let progressMonth = ((month - 1) / (sliderMonth.max - sliderMonth.min)) * 100;
  let progressDay = ((day - 1) / (sliderDay.max - sliderDay.min)) * 100;

  // Set the background color with linear gradients for each slider
  sliderYear.style.background = `linear-gradient(to right, rgb(99, 99, 238) ${progressYear}%, #ccc ${progressYear}%)`;
  sliderMonth.style.background = `linear-gradient(to right, rgb(99, 99, 238) ${progressMonth}%, #ccc ${progressMonth}%)`;
  sliderDay.style.background = `linear-gradient(to right, rgb(99, 99, 238) ${progressDay}%, #ccc ${progressDay}%)`;

  if(landingSitesVisible){
    updateLandingSites();
  }
}


// Add event listeners to each slider
sliderYear.addEventListener("input", () => {
  updateSliders();
  updateMaxDayValue(); // Update the maximum day value when the year changes
});

sliderMonth.addEventListener("input", () => {
  updateSliders();
  updateMaxDayValue(); // Update the maximum day value when the month changes
});

sliderDay.addEventListener("input", () => {
  updateSliders();
});

// Call the function initially to set the initial displayed date and background color
updateSliders();