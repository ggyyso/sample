<template>

  <div id="map"></div>

</template>

<script>
import Map from "ol/Map";
import View from "ol/View";
import { ImageArcGISRest, OSM } from "ol/source";
import { Image as ImageLayer, Tile as TileLayer } from "ol/layer";

export default {
  name: "olDynamicLayer",
  props: {
    msg: String,
  },
  mounted() {
    this.initmap();
  },

  methods: {
    initmap() {
      const url =
         //"https://services.arcgisonline.com/arcgis/rest/services/USA_Topo_Maps/MapServer";
        "http://localhost:8085/YouMapServer/rest/service/China/MapServer/export/ol/MapServer";
      const layers = [
        new TileLayer({
          source: new OSM(),
        }),
        new ImageLayer({
          source: new ImageArcGISRest({
            ratio: 1,
            params: {},
            url: url,
          }),
        }),
      ];
      const map = new Map({
        layers: layers,
        target: "map",
        view: new View({
          center: [108, 35],
          zoom: 4,
        }),
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

#map {
  width: 100%;
  height: 100%;
}
</style>
