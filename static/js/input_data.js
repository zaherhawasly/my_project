

var currentTab = 0; // Current tab is set to be the first tab (0)
showTab(currentTab); // Display the current tab
var my_map={};
var my_citiies={};
var my_citiies_array=[];

function add_border_cities(city_country){
    border_cities_num=$('#border_cities_'+city_country).val();
    if(border_cities_num!=0 && border_cities_num!='' && $('#the_city_name'+currentTab).val()!=''){
        $('#the_city_name'+currentTab).attr('disabled', 'disabled');
    $('border_cities_'+city_country).attr('disabled', 'disabled');
        $('#danger_alert').addClass('d-none');
    $('#control_btns').removeClass('d-none');
    $('#add_border_cities_btn'+city_country).remove();
    for(var i=0;i<border_cities_num; i++){
        $('#the_city'+city_country).append(
        `
      Border City Name (${i+1}):
      <p><input name="${$('#the_city_name'+currentTab).val()}" placeholder="city name..." oninput="this.className = ''"></p>
      Distance:
      <p><input name="Distance${$('#the_city_name'+currentTab).val()}" 
      type="number" min="0" placeholder="city name..." 
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
    for(var i=1;i<=cities_number; i++){
        $('#cities').append(
        `<div id="the_city${i}" class="tab">
      City Name:
      <p><input id="the_city_name${i}" placeholder="city name..." oninput="this.className = ''"></p>
      Distance:
      <p><input id="the_city_dist${i}" type="number" min="0" placeholder="city name..." 
      oninput="validity.valid||(value='');this.className = ''">
      </p>
      border cities number (not zero) :
      <p><input type="number" id="border_cities_${i}" min="1" placeholder="..." 
      oninput="validity.valid||(value='');this.className = '';">
      </p>
      <button type="button" id="add_border_cities_btn${i}"  onclick="add_border_cities(${i})">add border cities number</button>
    </div>`
        );
        $('#steps_div').append('<span class="step"></span>');
    }

}

function showTab(n) {
  // This function will display the specified tab of the form ...
  var x = document.getElementsByClassName("tab");
  if(currentTab!=$('.step').length)
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
    $('#danger_alert').addClass('d-none');// hide alert box
  // This function will figure out which tab to display
  var x = document.getElementsByClassName("tab");
  // Exit the function if any field in the current tab is invalid:
  if (n == 1 && !validateForm()) return false;
  // Hide the current tab:
  x[currentTab].style.display = "none";
  // Increase or decrease the current tab by 1:
  currentTab = currentTab + n;
  // if you have reached the end of the form... :
  if (currentTab >= x.length && currentTab==1) {
    //...the form gets submitted:
    // document.getElementById("regForm").submit();
    set_map_form();
    showTab(currentTab);
    document.getElementById("nextBtn").innerHTML = "Next";
    $('#control_btns').addClass('d-none');
    return false;
  }

  //create graph
  if(currentTab!=1){
  boarder_cities=$(`[name=${$('#the_city_name'+(currentTab-1)).val()}]`);
  city_name=$('#the_city_name'+(currentTab-1)).val();
  city_distance=$('#the_city_dist'+(currentTab-1)).val();
  boarder_cities_distance=$(`[name=Distance${$('#the_city_name'+(currentTab-1)).val()}]`);
//   boarder_cities=document.getElementsByName(`[name=${$('#the_city_name'+(currentTab-1)).val()}]`);
  console.log(boarder_cities);
  console.log(boarder_cities_distance);
  console.log(city_name);
  boarder_cities.each((element,value) => {
    border_city=boarder_cities[element].value;
    border_city_dist=boarder_cities_distance[element].value;
    //   Graph.$('#the_city_name'+(currentTab-1)).val();
    if(my_map[city_name]==undefined)
    my_map[city_name]={};
    my_map[city_name][border_city]=border_city_dist;
    my_citiies[city_name]=city_distance;
    my_citiies_array.push(city_name);
    console.log(my_map);
    console.log(my_citiies);
    
    
  });
}
//check current Tab is not the last tab
if(currentTab!=$('.step').length)
// if  true  show next  btn 
  $('#control_btns').addClass('d-none');
  else{
      // if  false  show submit  btn and select Source city
    $('#control_btns').addClass('d-none');
      $('#nextBtn').removeAttr('onclick');
      $('#nextBtn').attr('onclick','get_best_road()');
      $('#cities').prepend(`
      <div>
      Source City Name:
      <p>
      <select class="form-control" onchange="enter_dist(this.value)" 
      id="source_city"">
      <option  disabled selected>select Source City Name...</option>
      </select>
      </p>
      <div id="dest_div">
      </div>
      </div>
      `);
      my_citiies_array.forEach((city)=>{
          $('#source_city').append(`<option>${city}</option>`);

      })
  }
  // Otherwise, display the correct tab:
  if(currentTab!=$('.step').length)
  showTab(currentTab);
}

// fire on Source city enter to select destination city
function enter_dist(source_city){
    $('#dest_div').html(`
    Destination City Name:
    <select onchange="send_map()"
    class="form-control" id="dest_city" placeholder="Destination City Name...">
    <option  disabled selected>select Destenation City Name...</option>
      </select>
    `)
    my_citiies_array.forEach((city)=>{
        if(city!=source_city)
        $('#dest_city').append(`<option>${city}</option>`);

    })
}

// fire on submit
function send_map(){
    source=$('#source_city').val();
    destination=$('#dest_city').val();
     $.ajax({
             type: 'POST',
             url: "test_graph/",
             ataType: "json",
             data:{
                 "MyMap": JSON.stringify(my_map),
                 "source": JSON.stringify(source),
                 "destination": JSON.stringify(destination),
            },
              success: function(result){
                console.log('straight_line');
                console.log(my_citiies);
                console.log('******************');
                console.log('******************');
                console.log(result[0]);
                console.log(result[1]);
                console.log(result[2]);
                console.log('******************');
                console.log(result);


          }});
}

function get_best_road(){
    console.log('send ajax')
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