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
        moon.labelText('label')
        .labelSize(1.7)
        .labelDotRadius(0.4)
        .labelDotOrientation(d => labelsTopOrientation.has(d.label) ? 'top' : 'bottom')
        .labelColor(d => colorScale(d.agency))
        .labelLabel(d => `
            <div><b>${d.label}</b></div>
            <div>${d.agency} - ${d.program} Program</div>
            <div>Landing on <i>${new Date(d.date).toLocaleDateString()}</i></div>
        `)
        .onLabelClick(d => window.open(d.url, '_blank'));
        moon.labelsData(landingSitesData);
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
        ambientLightOn();
    } else {
        //!Check Add transition
        loadTexture();
        ambientLightOFF();
    }
}

function toggleMoonquakes() {
    moonquakesVisible = !moonquakesVisible;
    if (moonquakesVisible) {
        toggle_moonquakes.classList.add('on');
        moon.htmlElementsData(moonquakesData);
        moon.htmlElement(d => {
        // Obtén el elemento por su ID
        const el = document.createElement('div');
        el.innerHTML = `
            <div class="moonquake-parent">
                <i class="fas fa-exclamation exclamation"></i>
                <div class="moonquake-element hover-effect">
                    <p style="font-size: 10pt; text-align: center;">
                        <b>${d.name}</b><br>
                        ${d.mission}
                        <br>
                    </p>
                </div>
            </div>
        `;
        el.style['pointer-events'] = 'auto';
        el.style.cursor = 'pointer';
        // Add the onmouseover event handler
        el.onmouseover = () => {
            el.querySelector('.moonquake-element').style.display = 'block';
            el.querySelector('.exclamation').style.display = 'none';
        };

        // Add the onmouseout event handler
        el.onmouseout = () => {
            el.querySelector('.moonquake-element').style.display = 'none';
            el.querySelector('.exclamation').style.display = 'block';
        };
        el.onclick = () => {
            var miElemento = document.getElementById("Information");
            miElemento.innerHTML = '<iframe src="/Informacion.html?Titulo='+d.name+'-'+d.mission+'&Texto='+d.Info+'&image='+d.Image+'" frameborder="0" width="400" height="550"> </iframe>';
            // Agrego contenido al recuadro de info
            // Obtén el elemento por su ID
            var miElemento = document.querySelector(".scene-nav-infoo");
            // Cambia el estilo del elemento
            miElemento.style.display = "block";
        
            console.info(d);
        }
        return el;
        });
        
       
        moon.ringMaxRadius(2);
        moon.ringsData(moonquakesData);
    } else {
        toggle_moonquakes.classList.remove('on');
        moon.htmlElementsData([]);
        const moonquakeElements = document.querySelectorAll('.moonquake-element, .exclamation');
        moonquakeElements.forEach(el => el.remove());
        moon.ringMaxRadius(0);
        // Obtén el elemento por su ID
        var miElemento = document.querySelector(".scene-nav-infoo");
        // Cambia el estilo del elemento
        miElemento.style.display = "none";
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
        ambientLightOn();
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

//Listen for toggles buttons 
toggle_landingSites.addEventListener('click', toggleLandingSites);
toggle_moonquakes.addEventListener('click', toggleMoonquakes);
toggle_topographic.addEventListener('click', toggleTopographic);
toggle_light.addEventListener('click', togglelight);
toggle_Geological.addEventListener('click', toggleGeological);