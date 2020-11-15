
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

//city STATE ONE
var state1;
var city1; 
var ORI1; 
var long1;
var lat1; 
var stateJsonData1;


//CITY STATE TWO 
var state2; 
var city2; 
var ORI2; 
var long2; 
var lat2; 
var stateJsonData2; 



//Fuction to set state and county
function getCountyState(){
    var x = document.getElementById("frm1");
    
    city1 = x.elements[0].value;
    state1 = x.elements[1].value;
    city2 = x.elements[2].value;
    state2 = x.elements[3].value;
    console.log(city1 + state1);
  
    //This is the first and initiral API call, it will allow us to get all the data for our counties and departments from our initial HTML forms. 
    var StateDataURL = "https://api.usa.gov/crime/fbi/sapi/api/agencies/byStateAbbr/" + state1 + "//?API_KEY=" + crimeKey
    console.log(StateDataURL)


    var request = new XMLHttpRequest(); 
    request.open(method, StateDataURL, false);
    request.onload = function(){ 
        console.log(request.status)
        if (request.status >= 200 && request.status < 400){ 
            stateJsonData1 = JSON.parse(this.response)
            console.log(stateJsonData1)
        }
    }

    var StateDataUrl2 = "https://api.usa.gov/crime/fbi/sapi/api/agencies/byStateAbbr/" + state2 + "//?API_KEY=" + crimeKey
    console.log(StateDataUrl2)

    var requestState2 = new XMLHttpRequest();
    requestState2.open(method, StateDataUrl2, false);
    requestState2.onload = function(){ 
        console.log(requestState2.status)
        if (requestState2.status >= 200 && requestState2.status < 400){ 
            stateJsonData2 = JSON.parse(this.response)
            console.log(stateJsonData1)
        }
    }
    request.send()
    requestState2.send(); 


    console.log(stateJsonData1)
    //addOri()
    addORI1();
    addORI2(); 
    console.log("AFTER ORI ORI1")
    console.log("Longitude : " + long1 + ". Latitude : " + lat1)
    console.log("AFTER ORI ORI2")
    console.log("Longitude : " + long2 + ". Latitude : " + lat2)
    console.log(robberys(ORI1))
    //display
    displayResult(city1, state1, ORI1, city2, state2, ORI2);
    }

function addORI1(){ 

    var cityArray = stateJsonData1.results; 

    cityArray.forEach(element => {
        if( (element.agency_name.toString().toLowerCase()).includes(city1.toString().toLowerCase())) {
            ORI1 = element.ori
            long1 = element.longitude; 
            lat1 = element.latitude; 
            console.log("ORI : " + ORI1  + "Long :" + long1 + "lat : " + lat1)
        }
    });
    
}


function addORI2(){ 

    var cityArray = stateJsonData2.results; 

    cityArray.forEach(element => {
        if( (element.agency_name.toString().toLowerCase()).includes(city2.toString().toLowerCase())) {
            ORI2 = element.ori
            long2 = element.longitude; 
            lat2 = element.latitude; 
            console.log("ORI : " + ORI1  + "Long :" + long1 + "lat : " + lat1)
        }
    });
    
}

//This will return the robberys from 
function robberys(ORI){
    var robberyCallURL = "https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/"+ORI+"/robbery/2019/2019?API_KEY=" +crimeKey
    

    console.log(robberyCallURL)

    var robRequest = new XMLHttpRequest();
    robRequest.open(method, robberyCallURL, false);

    var robberyData;
    robRequest.onload = function(){ 
        if (robRequest.status >= 200 && robRequest.status < 400){ 
                 robberyData = JSON.parse(this.response)
                console.log(robberyData.results[0].actual)
                return robberyData.results[0].actual
                         
        }
    }
    
     robRequest.send(); 
}




//This will return the property-crime from 
function propertyCrime(ORI){
    var propertyCallURL = "https://api.usa.gov/crime/fbi/sapi/api/summarized/agencies/"+ORI+"/property-crime/2019/2019?API_KEY=" +crimeKey
    

    console.log(propertyCallURL)

    var propertyRequest = new XMLHttpRequest();
    propertyRequest.open(method, propertyCallURL, false);

    var propertyData;
    propertyRequest.onload = function(){ 
        if (propertyRequest.status >= 200 && propertyRequest.status < 400){ 
                 propertyData = JSON.parse(this.response)
                console.log("Property Crime" + propertyData.results[0].actual)
                return propertyData.results[0].actual
                         
        }
    }
    
    propertyRequest.send(); 
}

function displayResult(city1, state1, ORI1, city2, state2, ORI2){
    var outputHTML = "<div class=\"compareGrid\">";
    
    //#region Header Row 
    outputHTML += "<div class=\"oldCity\">" + city1.toLowerCase() + ", " + state1.toLowerCase() + "</div>";
    outputHTML += "<div class=\"newCity\">" + city2.toLowerCase() + ", " + state2.toLowerCase() + "</div>";
    //#endregion

    //#region Robberies
    outputHTML += "<div class=\"category\">robberies</div>"
    outputHTML += "<div class=\"data\">" + robberys(ORI1) + "</div>"
    outputHTML += "<div class=\"category\">robberies</div>"
    outputHTML += "<div class=\"data\">" + robberys(ORI2) + "</div>"

    outputHTML += "</div>"

    document.getElementById("result").innerHTML = outputHTML;
}