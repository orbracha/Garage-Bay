export default{
    calcDistance
}
function calcDistance(userCoords, itemCoords) {
    var R = 6371;
    var dLat = _deg2rad(itemCoords.lat - userCoords.lat); // deg2rad below
    var dLon = _deg2rad(itemCoords.lng - userCoords.lng);
    var a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(_deg2rad(userCoords.lat)) *
        Math.cos(_deg2rad(userCoords.lng)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c; // Distance in km
    return d.toFixed(2);
  }
  function _deg2rad(deg) {
    return deg * (Math.PI / 180);
  }