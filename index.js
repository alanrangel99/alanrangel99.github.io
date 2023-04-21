var map = L.map('map').setView([51.505, -0.09], 13);


L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '',
  maxZoom: 18,
}).addTo(map);

  var polygons = [
    L.polygon([
      [19.3281979, -99.193614],
      [19.3281979, -99.1928635],
      [19.3281979, -99.193614]
    ]),
    L.polygon([
      [19.4763783, -99.0796847],
      [19.3637525, -98.9931547],
      [18.9318634, -99.3229668]
    ]),
    L.polygon([
      [19.4311768, -99.2062547],
      [19.4311768, -99.2062547],
      [19.4345443, -99.1794696]
    ])
  ];
  
  for (var i = 0; i < polygons.length; i++) {
    polygons[i].addTo(map);
  }
  
  function alarma(){
    var audio = document.createElement("audio"); 
      audio.src = "alarma.wav";
      audio.autoplay = true;
      audio.load();
  }
  
  var marker = null;

  function onLocationFound(e) {
    var radius = e.accuracy / 2;
    
    if (marker) {
      marker.setLatLng(e.latlng);
    } else {
      marker = L.marker(e.latlng).addTo(map);
    }
    
    for (var i = 0; i < polygons.length; i++) {
      if (polygons[i].getBounds().contains(marker.getLatLng())) {
        console.log('El rastreador GPS está dentro de la geocerca ' + (i + 1));
        break;
      }else{
        console.log('El rastreador GPS está fuera de la geocerca '+ (i + 1));
        var popup = L.popup()
      .setLatLng(e.latlng)
      .setContent("El rastreador GPS está fuera de la geocerca "+ (i + 1))
      .openOn(map);
          alarma();
      }
    }
  }
  
  function onLocationError(e) {
    console.log(e.message);
  }
  
  map.on('locationfound', onLocationFound);
  map.on('locationerror', onLocationError);
  
  map.locate({setView: true, maxZoom: 16, watch: true});
  

  