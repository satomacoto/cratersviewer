$(function(){
  if(typeof(device) === 'undefined') {
    window.addEventListener('load', initialize)
    //document.addEventListener('deviceready', initialize)
  }else{
    initialize();
  }
});

var map;
var lat_to_show ,lng_to_show;

function updateMap() {
  var latlng = new google.maps.LatLng(lat_to_show, lng_to_show);
  var opts = {
    zoom: 3,
    center: latlng,
    mapTypeId: google.maps.MapTypeId.ROADMAP
  };
  map = new google.maps.Map(document.getElementById("map_canvas"), opts);
}

function initialize(){
  $('#map_page').bind('pageshow', function() {
    updateMap();
  });

  lat_to_show = 0;
  lng_to_show = 0;
  updateMap();

  $('#map_canvas').css('height', $(document).height()-50);
  $('#map_canvas').css('width', $(document).width());

  $('#backbutton').click(function(e) {
    $.mobile.changePage("#list_page", {transition: "flip"});
  });

  //$.getJSON("http://craters.heroku.com/api/crater_list?sphere_id=1&offset=10&count=10", function(data) {
  $.getJSON("jcc.txt", function(data) {
    $.each(data, function(i, val) {
      if(i>10){return;}
      var lat = this.Latitude;
      lat = parseInt(lat.slice(0, lat.length - 1));
      var lng = this.Longitude;
      lng = parseInt(lng.slice(0, lng.length - 1));
      if (this.imageurl == "no image") return;
      //var div = $("<div/>").attr("class", "item").append($("<img>").attr("class", "photo").attr("src", this.imageurl));
      var div = $("<li/>").append($("<a>").attr("href", this.imageurl).append($("<img>").attr("class", "photo").attr("alt", this.Name).attr("src", this.imageurl)));
      div.click(function() {
        lat_to_show = lat;
        lng_to_show = lng;
        $.mobile.changePage("#map_page", {transition: "flip"});
      });

      $container = $('#Gallery');
      //$container = $('#container');
      //div.append($("<div/>").attr("class", "note").html(this.name));
      $container.append(div);
    });
    Code.PhotoSwipe.attach( window.document.querySelectorAll('#Gallery a'), { } );
    /*
    $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector : '.item',
        columnWidth : 240
      });
    });
*/    
  });
}

