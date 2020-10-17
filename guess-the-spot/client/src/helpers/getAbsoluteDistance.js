function getAbsoluteDistance(lat1, lon1, lat2, lon2, units) {
  var p = 0.017453292519943295;    // Math.PI / 180
  var c = Math.cos;
  var a = 0.5 - c((lat2 - lat1) * p)/2 + 
          c(lat1 * p) * c(lat2 * p) * 
          (1 - c((lon2 - lon1) * p))/2;

  const kmAnswer = (12742 * Math.asin(Math.sqrt(a)));
  const mileAnswer = (kmAnswer * 0.621371192);

  if (units === 'km') { return kmAnswer*1000}; //answer in meters for circle radius
  if (units === 'miles') { return mileAnswer*1609.344}; // answer in meters for circle radius

}

module.exports = getAbsoluteDistance