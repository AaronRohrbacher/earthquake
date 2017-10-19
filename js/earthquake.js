export class TremorTron {

  constructor(search, startDate, endDate, sort) {
    this.search = search;
    this.startDate = startDate;
    this.endDate = endDate;
    this.sort = sort;
  }

  callApiSearch(search) {
    return new Promise(function(resolve, reject) {
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
  }

  callApiQuake(lat, lng, startDate, endDate, sort) {
  return new Promise(function(resolve, reject) {
    let request = new XMLHttpRequest();
    let url = `https://earthquake.usgs.gov/fdsnws/event/1/query?format=geojson&longitude=${lng}&latitude=${lat}&maxradius=.5&starttime=${startDate}&endtime=${endDate}&orderby=${sort}`;
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
  }
}
