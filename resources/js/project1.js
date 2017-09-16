console.log("javascript has loaded!!!");
var mainDiv=null;
var headerDiv=null;
var firstDiv=null;
var secondDiv=null;
var thirdDiv=null;
var resultDiv=null;

const db_name="userDb" // DB name
var db = null; //global DB object
var idbSupported = false; //Boolean to check if browser supports indexedDB
var username = null;

//An object to store user's choices
var user = {
  name : null,
  value1 : null,
  value2 : null,
  value3 : null
};

//JSON data of first select option
var firstSelectOptions = {
  England : "ENG",
  Spain : "SPA",
  Germany : "GER"
};

//JSON data of second select option
var secondSelectOptions = {
  "Premier League" : {
    name : "Premier League",
    country : "ENG",
    id : 426,
    teams : "https://api.football-data.org/v1/competitions/426/teams",
    leagueTable : "https://api.football-data.org/v1/competitions/426/leagueTable",
    logo : "../SoccerClubSearch/resources/images/Premier_League_Logo.svg"
  },
  "EFL Championship" : {
    name : "EFL Championship",
    country : "ENG",
    id : 427,
    teams : "https://api.football-data.org/v1/competitions/427/teams",
    leagueTable : "https://api.football-data.org/v1/competitions/427/leagueTable",
    logo : "../SoccerClubSearch/resources/images/English_Football_League_Logo.svg"
  },
  "La Liga" : {
    name : "La Liga",
    country : "SPA",
    id : 436,
    teams : "https://api.football-data.org/v1/competitions/436/teams",
    leagueTable : "https://api.football-data.org/v1/competitions/436/leagueTable",
    logo : "../SoccerClubSearch/resources/images/LaLiga.svg"
  },
  "Segunda Division" : {
    name : "Segunda Division",
    country : "SPA",
    id : 437,
    teams : "https://api.football-data.org/v1/competitions/437/teams",
    leagueTable : "https://api.football-data.org/v1/competitions/437/leagueTable",
    logo : "../SoccerClubSearch/resources/images/Liga_Adelante.svg"
  },
  "Bundesliga" : {
    name : "Bundesliga",
    country : "GER",
    id : 430,
    teams : "https://api.football-data.org/v1/competitions/430/teams",
    leagueTable : "https://api.football-data.org/v1/competitions/430/leagueTable",
    logo : "../SoccerClubSearch/resources/images/Bundesliga_logo.svg"
  },
  "Bundesliga 2" : {
    name : "Bundesliga 2",
    country : "GER",
    id : 431,
    teams : "https://api.football-data.org/v1/competitions/431/teams",
    leagueTable : "https://api.football-data.org/v1/competitions/431/leagueTable",
    logo : "../SoccerClubSearch/resources/images/2._Bundesliga_logo.svg"
  }
};

window.onload = function(){
  createDB();
};

//Utility method to remove all child elements of a parent element
function removeAllChildElements(parent){
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

//first select listener
function firstSelectListener(event){
  console.log("firstSelectListener called!");
  removeAllChildElements(secondDiv);
  removeAllChildElements(thirdDiv);
  removeAllChildElements(resultDiv);
  // element firing the event --> event.srcElement
  var element = event.target || event.srcElement;
  console.log(element==this);
  var selectedValue = element.options[element.selectedIndex].value;

  console.log(selectedValue);
  buildHTMLForSecondSelect(selectedValue);
}

function buildHTMLForSecondSelect(selectedValue){
  console.log("buildHTMLForSecondSelect called!");
  var div1 = document.createElement("div");
  var countryFlag = document.createElement("img");
  countryFlag.src = "../SoccerClubSearch/resources/images/"+selectedValue+".svg";
  console.log(countryFlag.src);
  countryFlag.alt = "Country Flag";
  countryFlag.setAttribute("style","height:60px;width:100px");
  countryFlag.setAttribute("class","img-responsive");
  div1.appendChild(countryFlag);
  var div2 = document.createElement("div");
  var secondSelect = document.createElement("select");
  secondSelect.setAttribute("id","select2");
  secondSelect.setAttribute("class","form-control");
  secondSelect.options[0] = new Option("Select League",null);
  secondSelect.options[0].disabled=true;
  for(var index in secondSelectOptions){
    console.log(index);
    console.log(secondSelectOptions[index].country);
    if (selectedValue==secondSelectOptions[index].country) {
        secondSelect.options[secondSelect.options.length] = new Option(index,JSON.stringify(secondSelectOptions[index]));
    }
  }
  secondSelect.addEventListener("change",secondSelectListener);
  div2.appendChild(secondSelect);
  secondDiv.appendChild(document.createElement("br"));
  secondDiv.appendChild(div1);
  secondDiv.appendChild(document.createElement("br"));
  secondDiv.appendChild(div2);
}

//second select listener
function secondSelectListener(event){
  console.log("secondSelectListener called!");
  removeAllChildElements(thirdDiv);
  removeAllChildElements(resultDiv);
  var element = event.target || event.srcElement;
  console.log(element);
  var selectedValue =JSON.parse(element.options[element.selectedIndex].value);
  console.log(selectedValue);
  buildHTMLForThirdSelect(selectedValue);
}

function buildHTMLForThirdSelect(selectedValue){
  console.log("buildHTMLForThirdSelect called!");
  var div1 = document.createElement("div");
  var leagueLogo = document.createElement("img");
  leagueLogo.src = selectedValue.logo;
  console.log(leagueLogo.src);
  leagueLogo.alt = "League logo";
  leagueLogo.setAttribute("style","max-height:100px;max-width:175px");
  leagueLogo.setAttribute("class","img-responsive");
  div1.appendChild(leagueLogo);
  var div2 = document.createElement("div");
  var teamsURL = selectedValue.teams;
  // sending an ajax call to football-data.org API
  var xhttp = new XMLHttpRequest();
  xhttp.open("GET", teamsURL, false);
  // xhttp.setRequestHeader("Content-type", "application/json");
  xhttp.setRequestHeader("X-Auth-Token", "2362aaeb90294d89b8288b65d3bb80e9"); //Key required for authentication purpose
  xhttp.send();
  var response = JSON.parse(xhttp.responseText);
  console.log(response);
  var teams = response.teams;
  var thirdSelect = document.createElement("select");
  thirdSelect.setAttribute("id","select3");
  thirdSelect.setAttribute("class","form-control");
  thirdSelect.options[0] = new Option("Select Team",null);
  thirdSelect.options[0].disabled=true;
  for(var i in teams){
    thirdSelect.options[thirdSelect.options.length] = new Option(teams[i].name,JSON.stringify(teams[i]));
  }
  thirdSelect.addEventListener("change",thirdSelectListener);
  div2.appendChild(thirdSelect);
  thirdDiv.appendChild(document.createElement("br"));
  thirdDiv.appendChild(div1);
  thirdDiv.appendChild(document.createElement("br"));
  thirdDiv.appendChild(div2);
}

//third select listener
function thirdSelectListener(event){
  console.log("thirdSelectListener called!");
  removeAllChildElements(resultDiv);
  var element = event.target || event.srcElement;
  console.log(element);
  var selectedValue =JSON.parse(element.options[element.selectedIndex].value);
  buildHTMLForResult(selectedValue);
}

function buildHTMLForResult(team){
  console.log("buildHTMLForResult called!!");
  var teamsCrestURL = team.crestUrl;

  if(teamsCrestURL==null || teamsCrestURL==""){
    teamsCrestURL = "../SoccerClubSearch/resources/images/default-team-logo.png"
  }
  var crest = document.createElement("img");
  crest.src = teamsCrestURL;
  crest.alt = "Team logo";
  crest.setAttribute("style","max-height:100px;max-width:100px");
  crest.setAttribute("class","img-responsive");
  thirdDiv.appendChild(document.createElement("br"));
  resultDiv.appendChild(crest);
  var favBtn = document.createElement("button");
  favBtn.setAttribute("id","favBtn");
  favBtn.setAttribute("type","button");
  favBtn.setAttribute("onclick","saveUser();");
  if(team==user.value3){
    favBtn.innerText="Bookmarked!";
    favBtn.setAttribute("class","btn btn-success");
    favBtn.disabled=true;
  }else{
    favBtn.innerText="Bookmark";
    favBtn.setAttribute("class","btn btn-default");
  }
  resultDiv.appendChild(document.createElement("br"));
  resultDiv.appendChild(favBtn);
}

//method to open db connection and initialize store objects
function createDB(){
  console.log("createDB called!");
  if("indexedDB" in window) {
        idbSupported = true;
    }

    if(idbSupported) {
        var openRequest = indexedDB.open(db_name,1);
        openRequest.onupgradeneeded = function(e) {
            console.log("Upgrading...");
            var thisDB = e.target.result;
            if(!thisDB.objectStoreNames.contains("users")) {
                var objectStore = thisDB.createObjectStore("users", { keyPath:"name" });
                // objectStore.createIndex("name","name", {unique:true});
            }
        }
        openRequest.onsuccess = function(e) {
            console.log("Success!");
            db = e.target.result;
            createUserInfoForm();
        }
        openRequest.onerror = function(e) {
            console.log("Error");
            console.dir(e);
        }
    }else {
      alert("IndexedDB is not supported in your browser!");
      // throw "No IDB support!";
    }
}

//method to save users preferences
function saveUser(name){
  console.log("saveUser called");
  var transaction = db.transaction(["users"],"readwrite");
  var store = transaction.objectStore("users");

  //create user object with all his selections
  var firstSelect = document.getElementById("select1");
  var secondSelect = document.getElementById("select2");
  var thirdSelect = document.getElementById("select3")
  var selectedValue1 =firstSelect.options[firstSelect.selectedIndex].value;
  var selectedValue2 =JSON.parse(secondSelect.options[secondSelect.selectedIndex].value);
  var selectedValue3 =JSON.parse(thirdSelect.options[thirdSelect.selectedIndex].value);

  user.name = username;
  user.value1 = selectedValue1;
  user.value2 = selectedValue2;
  user.value3 = selectedValue3;

  var request = store.put(user);

  request.onerror = function(e) {
     console.log("Error",e.target.error.name);
   }

  request.onsuccess = function(e) {
       console.log("User info saved successfully!");
       var favBtn = document.getElementById("favBtn");
       favBtn.innerText="Bookmarked!";
       favBtn.setAttribute("class","btn btn-success");
       favBtn.disabled=true;
   }
}

//method to dynamically create the sign in page
function createUserInfoForm(){
  console.log("createUserInfoForm called!")
  mainDiv = mainDiv || document.getElementById("main");
  removeAllChildElements(mainDiv);
  headerDiv = document.createElement("div");
  var header = document.createElement("h1");
  header.innerText = "What's your favorite soccer club?";
  headerDiv.appendChild(header);
  var userInfoDiv = document.createElement("div");
  userInfoDiv.setAttribute("id","userInfoDiv")
  var input = document.createElement("input");
  input.setAttribute("id","name");
  input.setAttribute("type","text");
  var inputLabel = document.createElement("label");
  inputLabel.setAttribute("for","name");
  inputLabel.innerText = "Sign in using your name: ";
  var enterBtn = document.createElement("button");
  enterBtn.setAttribute("id","enterBtn");
  enterBtn.setAttribute("type","button");
  enterBtn.setAttribute("onclick","submitUserInfo();");
  enterBtn.setAttribute("class","btn btn-primary");
  enterBtn.setAttribute("style","margin-left:5px;");
  enterBtn.innerText="Enter";
  userInfoDiv.appendChild(inputLabel);
  userInfoDiv.appendChild(input);
  userInfoDiv.appendChild(enterBtn);
  mainDiv.appendChild(headerDiv);
  mainDiv.appendChild(userInfoDiv);
}

//listener to handle user sign in
function submitUserInfo(){
  console.log("submitUserInfo called!!");
  var textFieldValue = document.getElementById("name").value;
  if(textFieldValue==null || ""==textFieldValue.trim()){
    alert("Please enter your name!");
    return;
  }
  console.log("name :"+textFieldValue);
  username = textFieldValue;
  var transaction = db.transaction(["users"],"readonly");
  var store = transaction.objectStore("users");
  // var index = store.index("name");
  var request = store.get(username);
  request.onsuccess = function(e) {
      console.log("query executed successfully!");
      var result = e.target.result;
      createMainPage();
      if(result){
        console.log("record found!");
        populateMainPage(result);
      }else{
        console.log("record not found!");
      }
  }
}

//method to create the main page of the application dynamically
function createMainPage(){
    console.log("createMainPage called!!");
    mainDiv = mainDiv || document.getElementById("main");
    removeAllChildElements(mainDiv);
    console.log(main);
    headerDiv = document.createElement("div");
    headerDiv.setAttribute("class","row");
    var div1 = document.createElement("div");
    div1.setAttribute("class","col-md-9");
    var headerEle = document.createElement("h1");
    headerEle.innerText="What's your favorite soccer club?";
    div1.appendChild(headerEle);
    var div2 = document.createElement("div");
    div2.setAttribute("class","col-md-1");
    var logoutBtn = document.createElement("button");
    logoutBtn.setAttribute("id","logout");
    logoutBtn.setAttribute("type","button");
    logoutBtn.setAttribute("onclick","createUserInfoForm();");
    logoutBtn.setAttribute("class","btn btn-danger");
    logoutBtn.setAttribute("style","float : left; margin-top:13px;");
    logoutBtn.innerText="Log out!";
    div2.appendChild(logoutBtn);
    var div3 = document.createElement("div");
    div3.setAttribute("class","col-md-2");
    var p = document.createElement("p");
    p.setAttribute("class","text-primary");
    p.innerText="Hi "+username;
    p.setAttribute("style","float : right; padding-top:20px;");
    div3.appendChild(p);
    headerDiv.appendChild(div1);
    headerDiv.appendChild(div3);
    headerDiv.appendChild(div2);
    headerDiv.appendChild(document.createElement("br"));
    firstDiv = document.createElement("div");
    firstDiv.setAttribute("id","div1");
    // firstDiv.setAttribute("class","row");
    var firstSelect = document.createElement("select");
    firstSelect.setAttribute("id","select1");
    firstSelect.setAttribute("class","form-control");
    firstSelect.options[0] = new Option("Select Country",null);
    firstSelect.options[0].disabled=true;
    for(var index in firstSelectOptions){
      console.log(index);
      firstSelect.options[firstSelect.options.length] = new Option(index,firstSelectOptions[index]);
    }
    firstSelect.addEventListener("change",firstSelectListener);
    secondDiv = document.createElement("div");
    secondDiv.setAttribute("id","div2");
    // secondDiv.setAttribute("class","row");
    thirdDiv = document.createElement("div");
    thirdDiv.setAttribute("id","div3");
    // thirdDiv.setAttribute("class","row");
    resultDiv = document.createElement("div");
    resultDiv.setAttribute("id","result");
    // resultDiv.setAttribute("class","row");
    firstDiv.appendChild(firstSelect);

    mainDiv.appendChild(headerDiv);
    mainDiv.appendChild(firstDiv);
    mainDiv.appendChild(secondDiv);
    mainDiv.appendChild(thirdDiv);
    mainDiv.appendChild(resultDiv);
}

//method to populate the page using data fetched from indexedDB
function populateMainPage(userObj){
  console.log("populateMainPage called!!");
  user = userObj;
  document.getElementById("select1").value=user.value1;
  buildHTMLForSecondSelect(user.value1);
  document.getElementById("select2").value=JSON.stringify(user.value2);
  buildHTMLForThirdSelect(user.value2);
  document.getElementById("select3").value=JSON.stringify(user.value3);
  buildHTMLForResult(user.value3)
}
