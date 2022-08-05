<template>

  <div id="map"></div>

</template>

<script>
const mapboxgl = require("mapbox-gl"); //引入组件

export default {
  name: "cgcs",
  props: {
    msg: String,
  },
  mounted() {
    this.initmap();
  },

  methods: {
    initmap() {
      var style1 = {
        sources: {
          tianditu: {
            type: "raster",
            tiles: [
              //"https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              "http://t0.tianditu.gov.cn/vec_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&tk=d325e8daad1e0b4cddafa461072c3b75&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
            ],
            tileSize: 256,
            zoomOffset: 0,
          },
          tiandituLable: {
            type: "raster",
            tiles: [
              //"https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              "http://t0.tianditu.gov.cn/cva_w/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&tk=d325e8daad1e0b4cddafa461072c3b75&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
            ],
            tileSize: 256,
            zoomOffset: 0,
          },
          "raster-tiles": {
            type: "raster",
            tiles: [
              "http://t0.tianditu.gov.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}&tk=d325e8daad1e0b4cddafa461072c3b75",
            ],
          },
          "raster-tiles_label": {
            type: "raster",
            tiles: [
              "http://t0.tianditu.gov.cn/DataServer?T=cva_w&X={x}&Y={y}&L={z}&tk=d325e8daad1e0b4cddafa461072c3b75",
            ],
          },
        },

        center: [108.81647489193665, 34.283449427413956],
        name: "newc1a89",
        sprite:
          "http://124.115.170.134:8080/YouMapServer/rest/service/xianMap/VectorTileServer/newc1a89/sprites/sprite",
        layers: [
          {
            id: "vec_c",
            source: "raster-tiles",
            type: "raster",
          },
          {
            id: "cva_c",
            source: "raster-tiles_label",
            type: "raster",
          },
        ],
        zoom: 5,
        glyphs:
          "http://124.115.170.134:8080/YouMapServer/rest/service/xianMap/VectorTileServer/fonts/{fontstack}/{range}.pbf",
        version: 8,
      };
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZ2d5eXNpIiwiYSI6ImNqaTVwbzVyeTBtN3Yzd28zY3hrNXphM3MifQ.EkXqUIpefUT9B37aWuzjsA"; //这里请换成自己的token

      const v1 = new mapboxgl.LngLatBounds(
        new mapboxgl.LngLat(-73.9876, 40.7661),
        new mapboxgl.LngLat(-73.9397, 40.8002)
      );

      var map = new mapboxgl.Map({
        container: "map",
        style: style1,
        // center: [106.95373925550007, 33.33705411400004], // 初始坐标，这个是南京建邺附近
        // zoom: 6, // starting zoom 地图初始的拉伸比例
        bounds:v1,
        project: "Mercator",
        hash: true,
      });

      // The 'building' layer in the mapbox-streets vector source contains building-height
      // data from OpenStreetMap.
      map.on("load", function () {
        //on设置监听，以及触发时的回调，这是加载时的触发的生成3d地图的例子
        map.addSource("gz", {
          type: "raster",
          tiles: [
            "http://localhost:8085/YouMapServer/rest/service/China/MapServer/export?dpi=96&transparent=true&format=png&layers=&bbox={bbox-epsg-3857}&f=image&bboxSR=3857&imageSR=3857",
          ],
          tileSize: 256,
        });
        map.addLayer({
          id: "gz-r",
          type: "raster",
          source: "gz",
        });
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v2.6.0/mapbox-gl.css");
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
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  left: 0;
}
</style>
