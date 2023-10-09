const toggle_landingSites = document.getElementById('toggle_landingSites');
let landingSitesVisible = false;
const toggle_moonquakes = document.getElementById('toggle_moonquakes');
let moonquakesVisible = false;
const toggle_topographic = document.getElementById('toggle_topographic');
let topographicVisible=false;
const toggle_light = document.getElementById('toggle_light');
let lightVisible=true;
const toggle_Geological = document.getElementById('toggle_Geologicalmap');
let GeologicalVisible=true;

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
}
//Fin

function toggleLandingSites() {
    landingSitesVisible = !landingSitesVisible;
    if (landingSitesVisible) {
        toggle_landingSites.classList.add('on');
        
        fetch('../moon_landings.json').then(res => res.json()).then(data => {
            moon.labelText(d => (d.label + '-'+d.program))
              .labelSize(2)
              .labelDotRadius(1)
              .labelAltitude(0.01)
              .labelColor(d => colorScale(d.agency))
              .labelResolution(2);
            moon.labelsData(data);
          });
    } else {
        toggle_landingSites.classList.remove('on');
        moon.labelsData([]);
    }

}

function toggleTopographic() {
    topographicVisible = !topographicVisible;
    if (topographicVisible) {
        //!Check Is not a texture
        cargar_textura('/resources/lunar_topographic_map.jpg');
        //moon.globeImageUrl('/resources/lunar_topographic_map.jpg');
        //ambientLightOn();
    } else {
        //!Check Add transition
        loadTexture();
        //ambientLightOFF();
    }
}

function toggleMoonquakes() {
    moonquakesVisible = !moonquakesVisible;
    if (moonquakesVisible) {
        toggle_moonquakes.classList.add('on');
        fetch('../moonquakes.json').then(res => res.json()).then(data => {
            
            moon.labelText('name')
              .labelSize(1.7)
              .labelDotRadius(0.8)
              .labelAltitude(0.01)
              .labelColor(d => '#f9f9f9')
              .labelResolution(2)
              .onclick = () => {
                var miElemento = document.getElementById("Information");
                miElemento.innerHTML = '<iframe src="/Informacion.html?Titulo='+d.name+'-'+d.mission+'&Texto='+d.Info+'&image='+d.Image+'" frameborder="0" width="400" height="550"> </iframe>';
                // Agrego contenido al recuadro de info
                // Obtén el elemento por su ID
                var miElemento = document.querySelector(".scene-nav-infoo");
                // Cambia el estilo del elemento
                miElemento.style.display = "block";
            
                console.info(d);
            };
            moon.labelsData(data);
          });
    } else {
        toggle_moonquakes.classList.remove('on');
        moon.labelsData([]);
    }
}



function togglelight() {
    lightVisible = !lightVisible;
    if (!lightVisible) {
        //!Check Is not a texture
        ambientLightOn();
    } else {
        //!Check Add transition
        ambientLightOFF();
    }
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

function toggleGeological() {
    GeologicalVisible = !GeologicalVisible;
    if (!GeologicalVisible) {
        // Obtén el elemento por su ID
        var miElemento = document.getElementById("Information");
        miElemento.innerHTML = '<iframe src="/Geologic_SCALE.html" frameborder="0" width="400" height="550"> </iframe>';
        // Agrego contenido al recuadro de info
        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".scene-nav-infoo");
        // Cambia el estilo del elemento
        miElemento.style.display = "block";
        cargar_textura('/resources/lunar_unifiedGeologicMap.png');
        //ambientLightOn();
    } else {
        //!Check Add transition
        loadTexture();
        //ambientLightOFF();
        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".scene-nav-infoo");
        // Cambia el estilo del elemento
        miElemento.style.display = "none";
        // Obtén el elemento por su ID
        var miElemento = document.getElementById("Information");
        miElemento.innerHTML = "";
    }
}

//Listen for toggles buttons 
toggle_landingSites.addEventListener('click', toggleLandingSites);
toggle_moonquakes.addEventListener('click', toggleMoonquakes);
toggle_topographic.addEventListener('click', toggleTopographic);
toggle_light.addEventListener('click', togglelight);
toggle_Geological.addEventListener('click', toggleGeological);