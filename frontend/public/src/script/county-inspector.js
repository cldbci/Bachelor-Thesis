/* Get the county user clicked on */

const mapBig = document.querySelector('.map-bg .map');

if(mapBig)
{
    mapBig.addEventListener('click', (e) => {
        let selectedCounty = e.target.getAttribute('name');
        window.open("/county-stats?id=" + (1 + idCountiesList.indexOf(selectedCounty)));
    })
}


const mapSmall = document.querySelector('#surface1');
if(mapSmall)
{
    mapSmall.addEventListener('click', (e) => {
    let selectedCounty = e.target.parentNode.getAttribute('name');
    window.open("/county-stats?id=" + (1 + idCountiesList.indexOf(selectedCounty)));
    })
}

/* Display info when hovering on a county*/
if(document.querySelector("#county-details"))
{
  document.querySelector("#county-details").addEventListener('mousemove', (e) => {
    let infoBox = document.querySelector("#county-details .info-box");
    let pageHeight = document.querySelector("#county-details").offsetHeight;
    let pageWidth = document.querySelector("#county-details").offsetWidth;

    infoBox.style.top = (e.pageY - pageHeight - 30).toString() + "px";
    infoBox.style.left = (e.pageX - infoBox.offsetWidth / 2).toString() + "px";
  })
}

const setInfoBoxInfo = (countyName) => {
    let countyNameInfo = document.querySelector("#info-box-county-name");
    countyNameInfo.innerHTML = countyName;
}

document.querySelectorAll("#county-details .map-bg .map a").forEach(elem => {
    let infoBox = document.querySelector("#county-details .info-box");
    elem.addEventListener('mouseover', (e) => {
        let countyName = e.target.getAttribute("name");
        setInfoBoxInfo(countyName);
        infoBox.style.visibility = "visible";
    })
    elem.addEventListener('mouseleave', (e) => {
        infoBox.style.visibility = "hidden"; 
    })
})