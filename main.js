// 緯度経度を設定する
function setLatLng(lat, lng){
var pos = new google.maps.LatLng(lat, lng);
map.setCenter(pos);
}

var map;

function initialize() {
    var latlng = new google.maps.LatLng(35.539001,134.228468);
    var opts = {
	zoom: 10,
	center: latlng,
	mapTypeId: google.maps.MapTypeId.ROADMAP
    };
    map = new google.maps.Map(document.getElementById("map_canvas"), opts);
}

$(function(){
  initialize();
  var $container = $('#container');
  $.getJSON("jcc.txt", function(data) {
    $.each(data, function(i, val) {
      if (this.imageurl == "no image") return;
      var div = $("<div/>").attr("class", "item").append($("<img>").attr("class", "photo").attr("src", this.imageurl));
      var lat = this.Latitude;
      lat = parseInt(lat.slice(0, lat.length - 1));
      var lng = this.Longitude;
      lng = parseInt(lng.slice(0, lng.length - 1));
      div.click(function() {
        $("#basic-modal-content").modal();
        setLatLng(lat, lng);
      });
      //div.append($("<div/>").attr("class", "note").html(this.name));
      $container.append(div);
    });
    $container.imagesLoaded(function(){
      $container.masonry({
        itemSelector : '.item',
        columnWidth : 240
      });
    });
    
    // filter and crop
//    $(".photo").MyThumbnail({
//      thumbWidth:200,
//      thumbHeight:200,
//      backgroundColor:"#ccc",
//      imageDivClass:"myPic"
//    });    
  });
});
