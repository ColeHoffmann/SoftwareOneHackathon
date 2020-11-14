

//This will be the scripts that will take values from the api. 

//Potential Data Sources to use:
//Crime: https://crime-data-explorer.fr.cloud.gov/api
//Weather/Climate Data: https://www.ncdc.noaa.gov/
//Disaster Data: https://www.fema.gov/about/openfema/data-sets
//Climate Change Data: https://github.com/KKulma/climate-change-data#apis
//Flood: http://nationalflooddata.com/flood/floodapi/
//Environment Data: https://www.epa.gov/enviro/envirofacts-data-service-api
//Various: https://rapidapi.com/
//Various: https://www.data.gov/
const method = "GET";
var crimeKey = "XxOvncSyx9ZQTH8O2ENMuKTr5pXB2Pfdf3zvGEld" 
var state;
var county; 
var OPI; 
var Long;
var Lat; 

//Fuction to set state and county
function getCountyState(){
    var x = document.getElementById("frm1");
    county = x.elements[0].value;
    state = x.elements[1].value;
    console.log(county + state);
}
//This is the first and initiral API call, it will allow us to get all the data for our counties and departments from our initial HTML forms. 
var StateDataURL = "https://api.usa.gov/crime/fbi/sapi/api/agencies/byStateAbbr/" + state + "//?API_KEY=" + crimeKey
console.log(StateDataURL)

//Json data after the call 
var stateJsonData;

var request = new XMLHttpRequest(); 
request.open(method, StateDataURL, true);

request.onload = function(){ 
    console.log(request.status)
    if (request.status >= 200 && request.status < 400){ 
        stateJsonData = JSON.parse(this.response)
        console.log(stateJsonData)
    }
}

request.send()

console.log(stateJsonData)

//get /api/summarized/agencies/{ori}/offenses/{since}/{until} Agency level SRS Crime Data Endpoint

