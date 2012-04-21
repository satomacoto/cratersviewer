$(function(){
  //$.getJSON("http://craters.heroku.com/api/crater_list?sphere_id=1&offset=10&count=10", function(data) {
  $.getJSON("jcc.txt", function(data) {
    $.each(data, function(i, val) {
      var lat = this.Latitude;
      lat = parseInt(lat.slice(0, lat.length - 1));
      var lng = this.Longitude;
      lng = parseInt(lng.slice(0, lng.length - 1));
      if (this.imageurl == "no image") return;
      var div = $("<div/>").attr("class", "item").append($("<img>").attr("class", "photo").attr("src", this.imageurl));
      div.click(function(e) {
        e.preventDefault();
        $("#basic-modal-content").remove();
        var basic = $("<div id='basic-modal-content'/>");
        var map_canvas = $("<div/>")
          .attr("id", "map_canvas")
          .css("width", "400px")
          .css("height", "400px");
        var close = $("<a href='#' class='simplemodal-close'>close</a>");    
        $(basic).append(map_canvas).append(close);
        $(document.body).append(basic);
        
        var latlng = new google.maps.LatLng(lat,lng);
        var opts = {
          zoom: 3,
          center: latlng,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        var map = new google.maps.Map(document.getElementById("map_canvas"), opts);
        $("#basic-modal-content").modal({persist: true, onShow: function (dialog) {
        }, onClose: function (dialog) {
          //$('#basic-modal-content').unbind().remove();
        }});
      });

      $container = $('#container');
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
