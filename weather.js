let temperatureDescription = document.querySelector('.temperature-description');
let temperatureDegree = document.querySelector('.temperature-degree');
let temperatureTime = document.querySelector('.location-timezone');


function position(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(function(where){
            let long = where.coords.longitude;
            let lat = where.coords.latitude;
            
            const proxy = 'https://cors-anywhere.herokuapp.com/';
            const api = `${proxy}https://api.darksky.net/forecast/afb5848808634dab151bf88c2c1eaa54/${lat},${long}`;
            
            fetch(api).then(response =>{
                return response.json();
            }).then(data =>{
                const {temperature, summary,icon}= data.currently;
                //it is the efficient way to set the variable at one go. Things above mean 
                //"const temperature = data.currently.temperature" " const cummary = data.currently.summary"
                temperatureDegree.textContent = temperature;
                temperatureDescription.textContent = summary;
                temperatureTime.textContent = data.timezone;
            
            });
        });
    }
    function setIcons(icon,iconID){
        const skycons = new skycons({color:"white"});
        const currentIcon = icon.replace(/-/g,"_").toUpperCase(); // "/-/g" = about every "-", replace them wtih "_" 
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    }
}

window.addEventListener('load', position);