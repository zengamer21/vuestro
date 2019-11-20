<template>
  <div class="vuestro-map">
    <div ref="theMap" class="vuestro-map-inner"></div>
    <div v-if="layers.length == 0" class="vuestro-map-token-missing">No layers defined</div>
    <div class="vuestro-map-view-info">
      <vuestro-pill color="var(--vuestro-info)">
        <template #title>Center</template>
        <template #value>{{ view.center[0] }}, {{ view.center[1] }}</template>
      </vuestro-pill>
      <vuestro-pill color="var(--vuestro-indigo)">
        <template #title>Zoom</template>
        <template #value>{{ map && map.getZoom() }}</template>
      </vuestro-pill>
      <vuestro-pill color="var(--vuestro-primary)">
        <template #title>Markers</template>
        <template #value>{{ data.length }}</template>
      </vuestro-pill>
    </div>
  </div>
</template>

<script>

/* global _, L */
require('leaflet/dist/leaflet.css');
require('leaflet/dist/leaflet.js');
delete L.Icon.Default.prototype._getIconUrl;

// fix up leaflet marker icons
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

/* markercluster plugin */
require('leaflet.markercluster/dist/MarkerCluster.css');
require('leaflet.markercluster/dist/MarkerCluster.Default.css');
require('leaflet.markercluster/dist/leaflet.markercluster.js');

export default {
  name: 'VuestroMap',
  props: {
    data: { type: Array, default: () => [] },
    options: { type: Object, default: () => ({}) },
  },
  data() {
    return {
      dataTitleKey: 'title',
      dataCoordinateKey: 'coords',
      map: null,
      layers: [],
      view: {
        center: [0, 0],
        zoom: 17,
      },
    };
  },
  watch: {
    data(newVal) {
      this.refresh();
    },
  },
  beforeMount() {
    _.merge(this, this.options);
  },
  mounted() {
    // if no layers, add a fail-safe
    if (this.layers.length === 0) {
      this.layers.push({
        title: 'OpenStreetMap',
        type: 'TileLayer',
        url: 'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
      });
    }

    if (this.layers.length > 0) {
      this.refresh();
    }
  },
  methods: {
    refresh() {
      let baseMaps = [];
      let overlayMaps = [];
      for (let l of this.layers) {
        if (l.title && l.type) { // check required params
          switch (l.type) {
            case 'TileLayer':
              if (l.url) {
                baseMaps.push(L.tileLayer(l.url, l.options || {}));
              } else {
                console.warn('VuestroMap missing url from TileLayer');
              }
              break;
            case 'ImageOverlay':
              if (l.url && l.bounds) {
                overlayMaps.push(L.imageOverlay(l.url, l.bounds, l.options || {}));
              } else {
                console.warn('VuestroMap missing url and bounds on ImageOverlay layer');
              }
              break;
            case 'PolyLine':
              if (l.latlngs) {
                overlayMaps.push(L.polyline(l.latlngs, l.options || {}));
              } else {
                console.warn('VuestroMap missing latlngs array for PolyLine layer');
              }
              break;
            case 'Polygon':
              if (l.latlngs) {
                overlayMaps.push(L.polygon(l.latlngs, l.options || {}));
              } else {
                console.warn('VuestroMap missing latlngs for Polygon layer');
              }
              break;
            case 'Rectangle':
              if (l.bounds) {
                overlayMaps.push(L.rectangle(l.bounds, l.options || {}));
              } else {
                console.warn('VuestroMap missing bounds array for Rectangle layer');
              }
              break;
            case 'Circle':
              if (l.latlng && l.radius) {
                overlayMaps.push(L.circle(l.latlng, l.radius, l.options || {}));
              } else {
                console.warn('VuestroMap missing latlng and radius for Circle layer');
              }
              break;
            case 'Marker':
              if (l.latlng) {
                let icon = L.divIcon({
                  iconSize: [20, 40],
                  iconAnchor: [10, 35],
                  className: 'vuestro-map-marker',
                  html: `<svg viewBox="0 0 289 512" version="1.1" style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2;"><g transform="matrix(1,0,0,1,-442.225,-95.7423)"><path d="M586.374,95.742C665.931,95.742 730.522,160.333 730.522,239.891C730.522,361.821 586.374,607.562 586.374,607.562C586.374,607.562 442.225,361.937 442.225,239.891C442.225,160.333 506.816,95.742 586.374,95.742ZM586.374,164.092C628.208,164.092 662.173,198.056 662.173,239.891C662.173,281.726 628.208,315.69 586.374,315.69C544.539,315.69 510.575,281.726 510.575,239.891C510.575,198.056 544.539,164.092 586.374,164.092Z" style="fill: ${l.color || 'var(--vuestro-purple)'}"/></g></svg>`
                });

                overlayMaps.push(L.marker(l.latlng, {
                  icon,
                  ...l.options
                }));
              } else {
                console.warn('VuestroMap missing latlng Marker layer');
              }
              break;
            case 'Tooltip':
              if (l.latlng && l.content) {
                overlayMaps.push(L.tooltip({
                  direction: 'top',
                  offset: [0, -35],
                  ...l.options,
                }).setLatLng(l.latlng).setContent(l.content));
              } else {
                console.warn('VuestroMap missing latlng and content from Tooltip layer');
              }
              break;
          }
        }
      }

      // process data array as clustered markers with tooltips
      if (this.data && this.data.length > 0) {
        var markers = L.markerClusterGroup();
        for (let d of this.data) {
          if (d[this.dataTitleKey] && d[this.dataCoordinateKey]) {
            markers.addLayer(L.marker(d[this.dataCoordinateKey]).bindPopup(d[this.dataTitleKey]).openPopup());
          }
          overlayMaps.push(markers);
        }
      }
      
      if (this.map) {
        this.map.remove();
      }

      this.map = L.map(this.$refs.theMap, {
        layers: [...baseMaps, ...overlayMaps],
      }).setView(this.view.center, this.view.zoom, this.view.options || {});
      L.control.scale().addTo(this.map);
      this.map.on('move', () => {
        // update map center data from leaflet
        let center = this.map.getCenter();
        this.$set(this.view.center, 0, center.lat);
        this.$set(this.view.center, 1, center.lng);
      });
    },
  },
};

</script>

<style scoped>

.vuestro-map {
  position: relative;
  width: 100%;
  height: 100%;
  flex-grow: 1;
  overflow: hidden;
}

.vuestro-map-inner {
  width: 100%;
  height: 100%;
}

.vuestro-map-token-missing {
  width: 100%;
  padding: 20px;
  background-color: var(--vuestro-danger);
  color: var(--vuestro-text-color-inverse);
}

.vuestro-map >>> .leaflet-bar {
  border: none;
}
.vuestro-map >>> .leaflet-bar > a {
  border-radius: 0;
  border: 1px solid var(--vuestro-outline);
}

.vuestro-map-view-info {
  position: absolute;
  top: 2px;
  right: 5px;
  z-index: 1000;
  display: flex;
}

</style>