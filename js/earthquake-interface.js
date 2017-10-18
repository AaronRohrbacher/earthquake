
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
  //
  // promise.then(function(response) {
  //   let body = JSON.parse(response);
  //   $('#earthquake').text(body.features[0].properties.place);
  //   }, function(error) {
  //   $('#showErrors').text(`There was an error processing your request: ${error.message}`);
  // });
  //
  // let promise2 = new Promise(function(resolve, reject) {
  //   let request = new XMLHttpRequest();
  //   let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&starttime=2017-10-11`;
  //   request.onload = function() {
  //     if (this.status === 200) {
  //       resolve(request.response);
  //     } else {
  //       reject(Error(request.statusText));
  //     }
  //   }
  //   request.open("GET", url, true);
  //   request.send();
  // });
  //
  // $('#earthquake').text(body.features[0].properties.place);
  promise1.then(function(response) {
    let body = JSON.parse(response);
    $('#earthquake').text(body.results[0].geometry.location.lat);
    console.log(body.results[0].geometry.location.lat);
    }, function(error) {
    $('#showErrors').text(`There was an error processing your request: ${error.message}`);
    });
  });
});
