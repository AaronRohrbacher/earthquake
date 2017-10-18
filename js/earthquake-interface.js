
$(document).ready(function() {
  $('.input').submit(function(event) {
    event.preventDefault();
    let search = $('#search').val();

    let promise1 = new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://maps.googleapis.com/maps/api/geocode/json?address=${search}&key=AIzaSyBb-6lyykgnZhSEv_FdW6BWi_7BjznhOmw`;
    request.onload = function() {
      if (this.status === 200) {
        resolve(request.response);
      } else {
        reject(Error(request.statusText));
      }
    }
    request.open("GET", url, true);
    request.send();
  });

  promise1.then(function(response) {
    let body = JSON.parse(response);
    let lat = body.results[0].geometry.location.lat;
    let lng = body.results[0].geometry.location.lng;

    let promise2 = new Promise(function(resolve, reject) {
      let request = new XMLHttpRequest();
      let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&longitude=${lng}&latitude=${lat}&maxradius=.5`;
      request.onload = function() {
        if (this.status === 200) {
          resolve(request.response);
        } else {
          reject(Error(request.statusText));
        }
      }
      request.open("GET", url, true);
      request.send();
    });

    promise2.then(function(response) {
      let body = JSON.parse(response);
      if (body.features.length > 0) {
      body.features.forEach(function(earthquake) {
        $('#earthquake').append(`<tr><td>${earthquake.properties.place}</td><td>${new Date(earthquake.properties.time)}</td><td>${earthquake.properties.mag}</td><td>${earthquake.properties.tsunami}</td></tr> `)
      });
    } else {
      $('#earthquake').text("Tain't no dirt movin'")

    }
      }, function(error) {
      $('#showErrors').text(`Go to hell: ${error.message}`);
    });

  }, function(error) {
    $('#showErrors').text(`Hell won't take you: ${error.message}`);
  });

  // $('#earthquake').text(body.features[0].properties.place);

  });
});
