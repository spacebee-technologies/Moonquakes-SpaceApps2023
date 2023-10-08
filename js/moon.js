function updateGlobeSize() {
    // Function to update the globe size and projection on resize
    const elem = document.getElementById('moonContainer');
    moon
        .width(elem.clientWidth)
        .height(elem.clientHeight);
}


//Load data to variables

function loadMoonquakesData() {
    fetch('./moonquakes.json')
        .then((response) => response.json())
        .then((data) => {
            moonquakesData = data;
            i=0;
            moonquakesData.forEach((moonquake) => {
                moonquake.type = 'moonquake'; 
                moonquake.id=i;
                i=i+1;
        });
            console.log("Moonquakes sites loaded");
        })
        .catch((error) => {
            console.error('Error loading moonquakes  data:', error);
        });
}

function loadLandingSitesData() {
fetch('./moon_landings.json')
    .then((response) => response.json())
    .then((data) => {
        landingSitesData = data;
        // Add a new JSON call item to each object
        i=0;
        landingSitesData.forEach((landingSite) => {
            landingSite.type = 'landingSite';
            landingSite.id=i;
            i=i+1;
        });
        console.log("Landing sites loaded with new items");
    })
    .catch((error) => {
        console.error('Error loading landing site data:', error);
    });
}


function loadData(){
    loadLandingSitesData();
    loadMoonquakesData();
    setTimeout(() => {
        const data = [landingSitesData, moonquakesData];
        const dataFlatten = [].concat(...data);
        moon.htmlElement(d => {
        const el = document.createElement('div');
        if(d.type=='landingSite'){
            el.innerHTML = `
            <div class="landingSite-container" data-info=${d.id} ;>
                <div  display: inline-block; text-align: center;">
                    <b>${d.label}</b>
                    <div class="landingSite-info">${d.agency} - ${d.program} Program</div>
                    <div class="landingSite-info">Landing on <i>${d.date}</i></div>
                </div>
            </div>

            `;

            el.style['pointer-events'] = 'auto';
            el.style.cursor = 'pointer';
        }
        if(d.type=='moonquake'){
            el.innerHTML = `
            <div class="moonquake-parent"  data-info=${d.id}>
             <div  display: inline-block; text-align: center;">
                    <i class="fas fa-exclamation exclamation" style="color: #ff4013;"></i>
                    <div class="moonquake-element hover-effect">
                        <p style="font-size: 10pt; text-align: center;">
                            <b>${d.name}</b><br>
                            ${d.mission}
                            ${d.date}
                            <br>
                        </p>
                    </div>
                </div>
            </div>
            `;
            el.style['pointer-events'] = 'auto';
            el.style.cursor = 'pointer';
        }        
        return el;
    });
    
        moon.htmlElementsData(dataFlatten);
    }, 500);
    
    }

    
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
function dayCycle(orbitSpeed) {
    setTimeout(() => {
        // Wait for the scene to be populated (asynchronously)
        ambientLightOFF();
    }, 500);

    // Create an orbit path
    const orbitRadius = 5; // Adjust the radius of the orbit path as needed
    const orbitSegments = 64; // Adjust the number of segments for a smoother appearance
    const orbitGeometry = new THREE.CircleGeometry(orbitRadius, orbitSegments);
    const orbitMaterial = new THREE.LineBasicMaterial({ color: 0xffffff });
    const orbit = new THREE.Line(orbitGeometry, orbitMaterial);
    orbit.rotation.x = Math.PI / 2; // Rotate the orbit path to be horizontal
    moon.scene().add(orbit);

    // Define a function to make the directional light orbit
    function orbitDirectionalLight() {
        const directionalLight = moon.scene().children.find(obj3d => obj3d.type === 'DirectionalLight');
        if (directionalLight) {
        // Adjust the orbit speed as needed
        const orbitSpeed = 0.00005;

        // Update the position of the directional light to follow the orbit path
        const currentTime = Date.now();
        const angle = (currentTime * orbitSpeed) % (Math.PI * 2); // Calculate the angle based on time
        const x = orbitRadius * Math.cos(angle);
        const z = orbitRadius * Math.sin(angle);
        directionalLight.position.set(x, 1, z);
        }

        // Request the next animation frame
        requestAnimationFrame(orbitDirectionalLight);
    }

    // Call the orbitDirectionalLight function to start the orbit animation
    orbitDirectionalLight();
}

function loadTexture(){
    const textureLoader = new THREE.TextureLoader();
    const texture = textureLoader.load('/resources/lunar_surface_4k.png'); // Adjust the path as needed
    //const texture = textureLoader.load('/resources/Moon/moon_2k.jpg'); // Adjust the path as needed
    // Listen for the resize event and update the globe size
    moon.globeMaterial(new THREE.MeshStandardMaterial({ map: texture }));      
}

const moonContainer = document.getElementById('moonContainer');
const moon = Globe()
    //.globeImageUrl('/resources/lunar_surface_4k.png')
    .bumpImageUrl('/resources/lunar_height_map_16.png')
    .backgroundImageUrl('//unpkg.com/three-globe/example/img/night-sky.png')
    //.backgroundImageUrl('/resources/stars_b.png')
    .showGraticules(false)
    .showAtmosphere(false) // moon has no atmosphere
    (moonContainer);



//Load data to variables

let landingSitesData=[];
let moonquakesData=[];
const data=[];
loadData();
// Call the setupScene function to initialize your scene
dayCycle();
//Load Texture
loadTexture();
// Listen for the resize event and update the globe size
