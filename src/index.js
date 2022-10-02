import L from "leaflet";

/*
var mymap = L.map("map").setView([61.05, 28.1], 14);

let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
  minZoom: -3,
  attribution: "© OpenStreetMap"
}).addTo(mymap);
*/

const fecthData = async () => {
  //const url = "./src/data.geojson";
  const url =
    "https://geo.stat.fi/geoserver/wfs?service=WFS&version=2.0.0&request=GetFeature&typeName=tilastointialueet:kunta4500k&outputFormat=json&srsName=EPSG:4326";

  const res = await fetch(url);
  const data = await res.json();
  console.log(data);

  addMap(data);
};

const addMap = (data) => {
  let map = L.map("map", {
    minZoom: -3
  });

  let geoJson = L.geoJSON(data, {
    onEachFeature: getFeature
  }).addTo(map);

  let osm = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
    maxZoom: 19,
    attribution: "© OpenStreetMap"
  }).addTo(map);

  map.fitBounds(geoJson.getBounds());
};

const getFeature = (feature, layer) => {
  if (!feature.properties.id) return;
  const id = feature.properties.id;
  layer.bindPopup();
};

fecthData();
