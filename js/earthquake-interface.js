import { TremorTron } from './../js/earthquake.js';

$(document).ready(function() {
  $('.input').submit(function(event) {
    $('#earthquake').text("")
    event.preventDefault();

    let search = $('#search').val();
    let startDate = $('#startDate').val();
    let endDate = $('#endDate').val();
    let sort = $('#sort').val();
    let javi = new TremorTron;
    let searchQuery = javi.callApiSearch(search);

    searchQuery.then(function(response) {
      let body = JSON.parse(response);
      let lat = body.results[0].geometry.location.lat;
      let lng = body.results[0].geometry.location.lng;
      let quakeQuery = javi.callApiQuake(lat, lng, startDate, endDate, sort);
      $('#earthquake').append("EARTHQUAKETRON LOADING<img src = 'img/loading.gif'>")

      quakeQuery.then(function(response) {
        $('#earthquake').text('')
        let body = JSON.parse(response);
        if (body.features.length > 0) {
        body.features.forEach(function(earthquake) {
          $('#earthquake').append(`<tr><td>${earthquake.properties.place}</td><td>${new Date(earthquake.properties.time)}</td><td>${earthquake.properties.mag}</td><td>${earthquake.properties.tsunami}</td><td>${earthquake.properties.alert}</td><td>${earthquake.properties.felt}</td></tr> `)
        });
      } else {
        $('#earthquake').text("Tain't no dirt movin'");
      }
        }, function(error) {
        $('#showErrors').text(`Go to hell: ${error.message}`);
      });
      }, function(error) {
      $('#showErrors').text(`Hell won't take you: ${error.message}`);
    });
  });
});
