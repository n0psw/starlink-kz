import fs from 'fs';
import https from 'https';
import * as d3 from 'd3-geo';

const getJSON = (url) => new Promise((resolve, reject) => {
  https.get(url, (res) => {
    let body = '';
    res.on('data', chunk => body += chunk);
    res.on('end', () => resolve(JSON.parse(body)));
  }).on('error', reject);
});

async function main() {
  const geojson = await getJSON('https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson');
  console.log("Properties of first feature:", geojson.features[0].properties);
  const targets = geojson.features.filter(f => f.properties.ISO_A3 === 'KGZ' || f.properties.ISO_A3 === 'TJK' || f.properties.ISO_A3 === 'UZB' || f.properties.ADMIN === 'Kyrgyzstan' || f.properties.ADMIN === 'Tajikistan' || f.properties.ADMIN === 'Uzbekistan');
  
  const width = 900;
  const height = 450;
  
  targets.forEach(feature => {
    const id = feature.properties.ISO_A3;
    const projection = d3.geoMercator().fitSize([width, height], feature);
    const pathGenerator = d3.geoPath().projection(projection);
    
    const svgPath = pathGenerator(feature);
    
    fs.writeFileSync(`path_${id}.txt`, svgPath);
    
    const cities = [];
    if (id === 'KGZ') {
      cities.push({ id: 'bishkek', nameRu: 'Бишкек', lng: 74.59, lat: 42.87, isWarehouse: true });
      cities.push({ id: 'osh', nameRu: 'Ош', lng: 72.8, lat: 40.51, isWarehouse: true });
      cities.push({ id: 'jalal-abad', nameRu: 'Жалал-Абад', lng: 73.0, lat: 40.93, isWarehouse: true });
    } else if (id === 'TJK') {
      cities.push({ id: 'dushanbe', nameRu: 'Душанбе', lng: 68.78, lat: 38.56, isWarehouse: true });
      cities.push({ id: 'khujand', nameRu: 'Худжанд', lng: 69.62, lat: 40.28, isWarehouse: true });
      cities.push({ id: 'bokhtar', nameRu: 'Бохтар', lng: 68.78, lat: 37.83, isWarehouse: true });
    } else if (id === 'UZB') {
      cities.push({ id: 'tashkent', nameRu: 'Ташкент', lng: 69.24, lat: 41.29, isWarehouse: true });
      cities.push({ id: 'samarkand', nameRu: 'Самарканд', lng: 66.97, lat: 39.62, isWarehouse: true });
      cities.push({ id: 'bukhara', nameRu: 'Бухара', lng: 64.42, lat: 39.77, isWarehouse: true });
    }

    const projectedCities = cities.map(c => {
      const [x, y] = projection([c.lng, c.lat]);
      return { ...c, x: parseFloat(x.toFixed(1)), y: parseFloat(y.toFixed(1)) };
    });
    
    fs.writeFileSync(`cities_${id}.json`, JSON.stringify(projectedCities, null, 2));
  });
  console.log("Found targets:", targets.map(t => t.properties.ADMIN || t.properties.ISO_A3));
}
main();
