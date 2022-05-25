

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab

function add_border_cities(city_country){
    border_cities_num=$('#border_cities_'+city_country).val();
    if(border_cities_num!=0 && border_cities_num!=''){
        $('#danger_alert').addClass('d-none');
    $('#control_btns').removeClass('d-none');
    $('#add_border_cities_btn'+city_country).remove();
    for(var i=0;i<border_cities_num; i++){
        $('#the_city_'+city_country).append(
        `
      City Name (${i}):
      <p><input placeholder="city name..." oninput="this.className = ''"></p>
      Distance:
      <p><input type="number" min="0" placeholder="city name..." 
      oninput="validity.valid||(value='');this.className = ''">
      </p>`
        );
    }
}else{
        $('#danger_alert').removeClass('d-none');
}
}

function set_map_form(){
    cities_number= $('#cities_number').val();
    $('#set_map_div').addClass('d-none');
    $('#steps_div').removeClass('d-none');
    $('#control_btns').removeClass('d-none');
    for(var i=0;i<cities_number; i++){
        $('#cities').append(
        `<div id="the_city${i}}" class="tab">
      City Name:
      <p><input placeholder="city name..." oninput="this.className = ''"></p>
      Distance:
      <p><input type="number" min="0" placeholder="city name..." 
      oninput="validity.valid||(value='');this.className = ''">
      </p>
      border cities number :
      <p><input type="number" id="border_cities_${i}" min="1" placeholder="..." 
      oninput="validity.valid||(value='');this.className = '';">
      </p>
      <button type="button" id="add_border_cities_btn${i}"  onclick="add_border_cities(${i})">add border cities</button>
    </div>`
        );
        $('#steps_div').append('<span class="step"></span>');
    }

}

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  x[n].style.display = "block";
  // ... and fix the Previous/Next buttons:
  if (n == 0) {
    document.getElementById("prevBtn").style.display = "none";
  } else {
    document.getElementById("prevBtn").style.display = "inline";
  }
  if (n == (x.length - 1)) {
    document.getElementById("nextBtn").innerHTML = "Submit";
  } else {
    document.getElementById("nextBtn").innerHTML = "Next";
  }
  // ... and run a function that displays the correct step indicator:
  fixStepIndicator(n)
}

function nextPrev(n) {
    $('#danger_alert').addClass('d-none');
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length) {
    //...the form gets submitted:
    // document.getElementById("regForm").submit();
    set_map_form();
    showTab(currentTab);
    document.getElementById("nextBtn").innerHTML = "Next";
    $('#control_btns').addClass('d-none');
    return false;
  }
  // Otherwise, display the correct tab:
  showTab(currentTab);
}

function validateForm() {
  // This function deals with validation of the form fields
  var x, y, i, valid = true;
  x = document.getElementsByClassName("tab");
  y = x[currentTab].getElementsByTagName("input");
  // A loop that checks every input field in the current tab:
  for (i = 0; i < y.length; i++) {
    // If a field is empty...
    if (y[i].value == "") {
      // add an "invalid" class to the field:
      y[i].className += " invalid";
      // and set the current valid status to false:
      valid = false;
    }
  }
  // If the valid status is true, mark the step as finished and valid:
  if (valid) {
    document.getElementsByClassName("step")[currentTab].className += " finish";
  }
  return valid; // return the valid status
}

function fixStepIndicator(n) {
  // This function removes the "active" class of all steps...
  var i, x = document.getElementsByClassName("step");
  for (i = 0; i < x.length; i++) {
    x[i].className = x[i].className.replace(" active", "");
  }
  //... and adds the "active" class to the current step:
  x[n].className += " active";
}

// ****************************************************



MyMap = {'Arad':{'Zerind':75,'Timisoara':118,'Sibiu':140},
         'Zerind':{'Oradea':71,'Arad':75},
         'Oradea':{'Sibiu':151},
         'Sibiu':{'Rimniciu Vilcea':80,'Fagaras':99,'Arad':140},
         'Fagaras':{'Sibiu':99,'Bucharest':211},
         'Rimniciu Vilcea':{'Pitesti':97,'Craiova':146,'Sibiu':80},
         'Timisoara':{'Lugoj':111,'Arad':118},
         'Lugoj':{'Mehadia':70},
         'Mehadia':{'Lugoj':70,'Dorbeta':75},
         'Dorbeta':{'Mehadia':75,'Craiova':120},
         'Pitesti':{'Craiova':138,'Bucharest':101},
         'Craiova':{'Pitesti':138,'Dorbeta':120,'Rimniciu Vilcea':146},
         'Bucharest':{'Giurgiu':90,'Urziceni':85,'Fagaras':211,'Pitesti':101},
         'Giurgiu': {'Bucharest':90},
         'Urziceni':{'Vaslui':142,'Hirsova':98,'Bucharest':85},
         'Vaslui':{'Lasi':92,'Urziceni':142},
         'Lasi':{'Neamt':87,'Vaslui':92},
         'Neamt':{'Lasi':87},
         'Hirsova':{'Eforie':86,'Urziceni':98},
         'Eforie':{'Hirsova':86}
         }

         source='Arad';
         destination='Bucharest';

        //  $.ajax({
        //      type: 'POST',
        //      url: "test_graph/",
        //      ataType: "json",
        //      data:{
        //          "MyMap": JSON.stringify(MyMap),
        //          "source": JSON.stringify(source),
        //          "destination": JSON.stringify(destination),
        //     },
        //       success: function(result){
        //           console.log(result);
        //   }});