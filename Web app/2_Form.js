/*Javascript file connected to the form page and property pages*/
/*Adding JqueryUI to the form*/
$(document).ready(function(){

  $("#propertyType").selectmenu();
  
  $("#dates").selectmenu();

  $("#dates").css({"padding-left":"30px"});

  $("#areasLocation").selectmenu();

  $("#areasLocation").css({"margin-left":"90px"});

  $("#min").selectmenu();

  $("#max").selectmenu();

  $("#bedrooms" ).spinner({
    min:1,
    max:10
  });
  
  $("#search").button();
  $("#reset").button();
  $("#favourites").button();
  $("#clearFavourites").button();


  $( "#slider-range" ).slider({
    range: true,
    min: 500,
    max: 5000,
    values: [ 2000, 3200 ],
    slide: function( event, ui ) {
      $( "#amount" ).val( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
    }
  });
  $( "#amount" ).val( "$" + $( "#slider-range" ).slider( "values", 0 ) +
    " - $" + $( "#slider-range" ).slider( "values", 1 ) );

  $("#slider-range").css({"width":"80%"});

  $( "#datepicker-8" ).datepicker({
               prevText:"click for previous months",
               nextText:"click for next months",
               showOtherMonths:true,
               selectOtherMonths: false
            });
            $( "#datepicker-9" ).datepicker({
               prevText:"click for previous months",
               nextText:"click for next months",
               showOtherMonths:true,
               selectOtherMonths: true
            });
  
  /*Adding funcionality to the search button to display properties */          
  $("#search").on("click",function(){
    var propertyTypes = $("#propertyType").val();
    var locationArea = $("#areasLocation").val();
    var minimumPrice = $("#slider-range").slider("option", "values")[0];
		var maximumPrice = $("#slider-range").slider("option", "values")[1];
    var bedroomNumber = $("#bedrooms").val();


    var output="<ul>";
    for(var i in data.properties){
      if((propertyTypes == data.properties[i].type)|| (propertyTypes == "Anytype"))
      if((locationArea == data.properties[i].location) || (locationArea == "Anylocation"))
      if (( data.properties[i].price >= minimumPrice && data.properties[i].price <= maximumPrice ))
      if(bedroomNumber == data.properties[i].bedrooms)
        {
          {
            {
              {
          
        output += "<h2><li>" + data.properties[i].type + "<br>"+ "$" + data.properties[i].price +"</li></h2>" + "<img src=" + data.properties[i].picture + " width = 600 height = 300>" + "<p>" + data.properties[i].description + "</p>" + "<p>"+"Location"+"</p>"+"<h4>" + data.properties[i].location + "</h4>" +"<button><a href='" + data.properties[i].url + "'>Visit Page</a></button>";
      }  } } }
    }
    output += "</ul>";
    document.getElementById("search-results-holder").innerHTML = output;

  });
  
  //add properties to the favourite list
  $("#add-to-favourites").on("click",function(){
    try {
      $(this).attr('disabled', true);
      
      var addPropertiesID = $(this).closest("p").attr("id");
      var FavouriteProperties=JSON.parse(localStorage.getItem("favProperties"));
          if(FavouriteProperties == null) {
             FavouriteProperties = [];
      }
      if(FavouriteProperties != null) {
        for ( var j = 0; j < FavouriteProperties.length; j++) {
            
            if ( addPropertiesID == FavouriteProperties[j]) {
                alert("This property is already in your favourites list."); 
                FavouriteProperties = [];
              }
          }
      }
      FavouriteProperties.push(addPropertiesID);
      localStorage.setItem("favProperties", JSON.stringify(FavouriteProperties));

    }
    catch(e){
      if (e==QUOTA_EXCEEDED_ERR) {
        console.log("Error: The local storage limit has been exceeded.");
      }
      else {
        console.log("Error: Saving to local storage.");
      }
    }
  
  });
  
  //remove properties from the favourite list
  $("#remove-from-favourites").on("click",function(){
    $(this).attr('disabled', true);
                
            var removePropertiesID = $(this).closest("p").attr("id");                
            FavouriteProperties=JSON.parse(localStorage.getItem("favProperties"));

            if(FavouriteProperties != null) {
              for ( var j = 0; j < FavouriteProperties.length; j++) { 
                               
                  if ( removePropertiesID == FavouriteProperties[j]) {                      
                      alert("This property has been removed.");                      
                      delete FavouriteProperties[j];                      
                      localStorage.setItem("favProperties", JSON.stringify(FavouriteProperties));                      
                      FavouriteProperties[j] = [];
                    }
                }
            }
            if(FavouriteProperties == null) {
              alert("You don't have any favorites.");
            }
  });
  
  //view the favourite list
  $( ".view-favourites-btn" ).on("click", function(){
            
    console.log("Data restoring from local storage from arrays");    
    FavouriteProperties=JSON.parse(localStorage.getItem("favProperties"));
    
    var output = "<ul>";
    
    if (FavouriteProperties != null) {
        
        for (var i = 0; i < data.properties.length; i++) {
            for (j = 0; j < FavouriteProperties.length; j++) {              
                if (data.properties[i].id == FavouriteProperties[j]) {
                    
                    output+="<h4><li>" + data.properties[i].type +"<br>"+ "</li></h4>"+ "<h5><li>"+ "$"+ data.properties[i].price + "<br>" + data.properties[i].location + "</h5></li>" +
                    "<img src=" + data.properties[i].picture + " width = 300 height = 150>" +"<li><button><a href=' " +data.properties[i].url + "'>Visit page</a></button></li>";
                }
            }
        }
    }
    output+="</ul>";
    
    document.getElementById( "favourites-holder" ).innerHTML = output;

  });

//clear the favourite list
$( ".clear-favourites-btn" ).on("click", function(){
            
  $("#favourites-holder").remove();
  
  FavouriteShoes=JSON.parse(localStorage.getItem("favProperties"));
  
  localStorage.clear();
  
  });
            
});





