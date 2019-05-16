//PAGE 1//
/////////

//stores input on FIRST page and then sends it to NEXT page
function storeInput() {
  var userInput = document.getElementById("input").value;

  if(userInput.split("\n")[0].trim().startsWith("[") && userInput.split("\n")[0].trim().endsWith("]")){
    localStorage.setItem('userInput', userInput);
    window.location.href = "notes.html";
  } else {
    document.getElementById("reminder").style.opacity = "0.5";
  }
}

function setExample(){
  document.getElementById("input").value = '[Causes of Water Pollution]\nWhat is water pollution?\n- Water pollution is any change in water quality that can harm living organisms; unfit for drinking, irrigation, recreation\n- Point sources discharge pollutants at specific locations\n-- Factories \n-- Sewage treatment plants\n-- Underground mines\n-- Oil tankers\n- Nonpoint sources are broad; diffused by rainfall and snowmelt washing pollutants from land to bodies of surface water\n-- Cropland\n-- Livestock feeds\n-- Parking lots\nWhat are the leading causes of water pollution?\n- 1) Agricultural activities are the leading cause of water pollution.\n-- eroded sediment from agricultural lands\n-- fertilizers and pesticides\n-- bacteria from livestock and food-processing wastes\n-- excess salts from the soils of irrigated cropland\n- 2) Industrial facilities\n-- emits a variety of harmful organic and inorganic material\n- 3) Mining\n-- disturbs land\n-- creates erosion and runoff\n- 4) Human-made materials\n-- plastics are improperly discarded\n[Major Pollutants]\nWhat are some examples of major pollutants?\n- Infectious agents (pathogens)\n-- Bacteria, viruses\n-- From human and animal waste\n-- Cause diseases\n- Plant nutrients\n-- Nitrates, phosphates\n-- From fertilizers, sewage\n-- Cause excessive growth (algae)\n- Organic / inorganic chemicals\n-- Gas, oil, plastics, pesticides / acids, bases, salts, metal\n-- From industry, households\n-- Causes toxins in aquatic systems\nWhat are indicators of water quality?\n- Presence of various infectious agents\n-- certain strains of coliform bacteria, E. coli\n-- safe drinking: 1/2 cup of water should contain no colonies of E. coli\n- Level of dissolved oxygen (DO)\n-- depleted DO correlates to reduced water quality\n- Indicator species\n[Streams and Lakes]\nHow can streams and lakes recover?\n- Flowing streams and lakes can recover rapidly from moderate levels of degradable, oxygen-demanding wastes\n-- dilution\n-- bacterial biodegradation\n- Does not work when overloaded, or when their flow is reduced by drought, damming, water diversion.\n- Also does not eliminate slowly degradable or nondegradable pollutants.\nWhat are some success stories for stream cleanup in developed countries?\n- Cuyahoga River, United States\n-- caught fire several times; photographed in 1969\n-- enacted laws to limit industrial waste discharge, upgraded sewage treatment\n-- nowadays is cleaner, not flammable, used by boaters\n- Thames River, Great Britain\n-- river was a flowing, smelly sewer in 1950s\n-- experienced 50 years of recovery efforts by taxpayers and private industry\n-- nowadays hosts commercial fishing, 20x more fish species\nWhat is the issue with water pollution in less developed countries?\n- Less-developed countries discharge 80-90% of their untreated sewage directly into rivers, streams, and lakes\n-- half of major rivers are heavily polluted\n-- waste and sewage pollute roughly 60% of water in India and China\nWhy are lakes and reservoirs more vulnerable to water pollution than streams and lakes?\n- 1) Stratified layers:\n-- Little vertical mixing; less dilution\n- 2) Low flow/no flow:\n-- flushing/changing of water takes 1 to 100 years in lakes and reservoirs\n-- streams take several days or weeks\nWhat is cultural eutrophication? How do you reduce it?\n- Cultural eutrophication is a process where human activities greatly accelerate the input of plant nutrients in a lake.\n-- For example, nitrate and phosphate from farmland, parking lots, sewage treatment plants, etc.\n-- Blooms, or dense growth, can deplete dissolved oxygen at top and bottom and kill aquatic animals who can’t move to safer waters\n-- About 85% of large lakes in the US experience cultural eutrophication\n- Cleanup is expensive and energy intensive.\n-- mechanically remove excess weeds\n-- control growth with chemicals/herbicides\n-- pump air into water to prevent oxygen depletion\n- Prevention is effective and cheap.\n-- upgrade waste treatment to remove nitrates and phosphates\n-- ban and limit phosphates in products (ex. household detergents)\nHow did cultural eutrophication affect the Gulf of Mexico?\n- Nitrate levels tripled and disrupted the nitrogen cycle & animal life in the Gulf of Mexico. Experienced severe oxygen depletion.\n- Dead zone initiates from sunlight, fertilizer/sewage, and lack of storms to diffuse DO.\n-- 1) Nitrates lead to blooms of phytoplankton (blue-green algae)\n-- 2) When algae die, decomposition takes up more DO\n-- 3) Disrupts food web, killing off non mobile species\n-- 4) When there are more storms in cooler weather, water mixes and distributes DO again\n- Contributed to by:\n-- Straightening Mississippi River into the Gulf\n-- Draining wetlands that naturally filter out sediment';
}

//PAGE 2//
/////////

//generates notes from input
function printInput() {
  var userInput = localStorage.getItem('userInput');

  var result = document.getElementById("result");
  var tabs = document.getElementById("tabs");

  //organizes text into array of lines
  var lines = userInput.split("\n");
  //stores titles so none are repeated
  var titles = [];

  //generates text
  for (var i = 0; i < lines.length; i++) {
    if (lines[i].startsWith("[") && lines[i].endsWith("]")) {
      var title = lines[i].substring(1, lines[i].length - 1);

      titles.push(title);

      //rename if there are already instances of the same name
      title += repeatTitleCount(title, titles);

      //Creates NEW TAB
      var tab = document.createElement('div');
      result.appendChild(tab);
      tab.setAttribute("id", title);
      tab.setAttribute("class", "tabcontent");

      //Creates NEW TAB button
      var button = document.createElement("button");
      tabs.appendChild(button);
      button.setAttribute("id", "button"+title);
      button.setAttribute("class", "tablinks");
      button.setAttribute("onclick", "openTab(event,'" + title + "')");
      button.innerHTML = title;

      addNotesButton();

    } else if (lines[i].startsWith("-") == false && lines[i] != "") {
      //Creates NEW SECTION
      var node = document.createElement('div');
      result.lastChild.appendChild(node);
      node.setAttribute("class", "section");
      node.setAttribute("contenteditable", "true");
      node.setAttribute("oninput", "updateNode()");

      //Adds CONTENT
      var text = document.createElement("H3");
      text.innerText = lines[i];
      node.appendChild(text);
    } else if (lines[i].startsWith("-") && lines[i].startsWith("--") == false) {
      //Creates NEW BODY TEXT
      var text = document.createElement("P");
      text.innerText = lines[i].substr(1).trim();
      result.lastChild.lastChild.appendChild(text);
    } else if (lines[i].startsWith("--")) {
      //Creates NEW LIST
      var text = document.createElement("LI");
      text.innerText = lines[i].substr(2).trim();
      result.lastChild.lastChild.appendChild(text);
    }
  }

  //makes plus button
  addPlusButton();
  openTab(event, titles[0]);
}

//deletes if empty
function updateNode(){
  var input = document.activeElement.innerHTML;
  if(input.replace(/(\r\n. |\n. |\r)/gm,"") == ""){
      document.activeElement.remove();
  }
}

//plus button for tab buttons
function addPlusButton(){
  var plusButton = document.createElement("button");
  tabs.appendChild(plusButton);
  plusButton.setAttribute("class", "tablinks");
  plusButton.setAttribute("id", "plusButton");
  plusButton.setAttribute("onclick", "addNewTab()");
  plusButton.innerHTML = "+";
}

//plus buttons for new note sections/headers
function addNotesButton(){
  var button = document.createElement('button');
  result.lastChild.appendChild(button);
  button.setAttribute("id", "plusButton");
  button.setAttribute("onclick", "addNotes()");
  button.innerHTML = "+";
}

//add new notes section
function addNotes(){
  var title = localStorage.getItem('activeTab');
  addDefaultText(title, false);
}

//goes through all titles and checks repeats
function repeatTitleCount(title, titles){
  var count = 0;
  titles.forEach(function(i) {if (i == title) count++;});
  if (count > 1) return "(" + count.toString() + ")";
  else return "";
}

//updates tab button title whenever in-note title is edited
function updateTitle(){
  var title = localStorage.getItem('activeTab').replace(/(\r\n. |\n. |\r)/gm,"");
  if(title != null){
    document.getElementById("button"+title).innerHTML=document.getElementById("title").innerHTML;
  }

  if (document.getElementById("title").innerHTML.trim() == ""){
    //var answer = prompt("Type DELETE if you want to delete this page.");
    if(answer.toLowerCase() == "delete"){
      document.getElementById("button"+title).remove();
      document.getElementById(title).remove();
    }else{
      document.getElementById("title").innerHTML = "-";
      document.getElementById("button"+title).innerHTML = "-";
    }
  }
}

var newPages = [];

//adds new tab button & page
function addNewTab(){
  document.getElementById("plusButton").remove();

  title = "New Page";
  newPages.push(title);

  title += repeatTitleCount(title, newPages);

  //Creates NEW TAB
  var tab = document.createElement('div');
  result.appendChild(tab);
  tab.setAttribute("id", title);
  tab.setAttribute("class", "tabcontent");

  //Creates NEW TAB button
  var button = document.createElement("button");
  tabs.appendChild(button);
  button.setAttribute("id", "button"+title);
  button.setAttribute("class", "tablinks");
  button.setAttribute("onclick", "openTab(event,'" + title + "')");
  button.innerHTML = title;

  //add DEFAULT text
  //adds plus button at bottom
  addPlusButton();
  addDefaultText(title, true);
}

function addDefaultText(title, newTab){
  var node = document.createElement('div');
  if(newTab==true) addNotesButton();

  //DIV AND HEADER//
  document.getElementById(title).appendChild(node);
  node.setAttribute("class", "section");
  node.setAttribute("contenteditable", "true");
  node.setAttribute("id", "editor");
  node.setAttribute("oninput", "updateNode()");

  var text = document.createElement("H3");
  text.innerText = "Header";
  node.appendChild(text);

  //PARAGRAPH//
  var text = document.createElement("P");
  text.innerText = "Paragraph";
  document.getElementById(title).lastChild.appendChild(text);

  //LIST//
  var text = document.createElement("LI");
  text.innerText = "List1";
  document.getElementById(title).lastChild.appendChild(text);
  var text = document.createElement("LI");
  text.innerText = "List2";
  document.getElementById(title).lastChild.appendChild(text);

  //PARAGRAPH2//
  var text = document.createElement("P");
  text.innerText = "Paragraph";
  document.getElementById(title).lastChild.appendChild(text);
}

//opens each page & handles visibility
function openTab(evt, name) {
  var i, tabcontent, tablinks;
  localStorage.setItem('activeTab', name);

  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  document.getElementById(name).style.display = "block";
  evt.currentTarget.className += " active";

  document.getElementById("title").innerHTML = document.getElementById("button"+name).innerHTML;
}

function returnHome(){
  var answer = prompt("Type HOME if you want to delete your current notes and return to the main screen.");
  if(answer.toLowerCase() == "home"){
    window.location.href = "index.html";
  }
}

//info popup//
function openInfo(){
  document.getElementById("overlay").style.display = "block";
  document.getElementById("info").style.display = "block";
}

function closeInfo(){
  document.getElementById("overlay").style.display = "none";
  document.getElementById("info").style.display = "none";
}
