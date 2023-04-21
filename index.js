var map = L.map('map').setView([51.505, -0.09], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '',
  maxZoom: 18,
}).addTo(map);



  /*var geojson = L.geoJSON(polygon.toGeoJSON(), {
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.2,
      color: "#ff0000",
      weight: 2
    }
  }).addTo(map);

  geojson.on("mouseover", function(e) {
    alert("Estás dentro de la geocerca");

  });
  
  geojson.on("mouseout", function(e) {
    alert("Estás fuera de la geocerca");
  });*/
  var polygon = L.polygon([
    [19.4612635, -99.1394819],
    [19.4588689,-99.1331606],
    [19.6228157, -99.179828]
  ]).addTo(map);
  var geojson = L.geoJSON(polygon.toGeoJSON(), {
    style: {
      fillColor: "#ff0000",
      fillOpacity: 0.2,
      color: "#ff0000",
      weight: 2
    }
  }).addTo(map);
  function onLocationFound(e) {
    var marker = L.marker(e.latlng).addTo(map);
    if (polygon.getBounds().contains(marker.getLatLng())) {
      console.log('El rastreador GPS está dentro de la geocerca');
     
    } else {
      console.log('El rastreador GPS está fuera de la geocerca');
      var popup = L.popup()
    .setLatLng(e.latlng)
    .setContent("El rastrador GPS está fuera de la geocerca")
    .openOn(map);
        alarma();
    }
  }
  
  function alarma(){
    var audio = document.createElement("audio"); 
      audio.src = "alarma.wav";
      audio.autoplay = true;
      audio.load();
  }
  function onLocationError(e) {
    console.log(e.message);
  }
  
  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);
  
  map.locate({setView: true, maxZoom: 16, watch: true});


  