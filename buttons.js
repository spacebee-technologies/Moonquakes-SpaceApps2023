const toggle_landingSites = document.getElementById('toggle_landingSites');
    let landingSitesVisible = false;
    const toggle_moonquakes = document.getElementById('toggle_moonquakes');
    let moonquakesVisible = false;
    const toggle_topographic = document.getElementById('toggle_topographic');
    let topographicVisible=false;




const colorScale = d3.scaleOrdinal(['orangered', 'mediumblue', 'darkgreen', 'yellow']);
const labelsTopOrientation = new Set(['Apollo 12', 'Luna 2', 'Luna 20', 'Luna 21', 'Luna 24', 'LCROSS Probe']); // avoid label collisions
  
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
        moon.globeImageUrl('/resources/lunar_topographic_map.jpg');
    } else {
        //!Check Add transition
        loadTexture();
        
    }
       

}

function toggleMoonquakes() {
    moonquakesVisible = !moonquakesVisible;
    if (moonquakesVisible) {
        toggle_moonquakes.classList.add('on');


        moon.htmlElementsData(moonquakesData);
        moon.htmlElement(d => {
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
        el.onclick = () => console.info(d);
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
        
    }
}

//Listen for toggles buttons 
toggle_landingSites.addEventListener('click', toggleLandingSites);
toggle_moonquakes.addEventListener('click', toggleMoonquakes);
toggle_topographic.addEventListener('click', toggleTopographic);