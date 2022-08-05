<template>

  <div id="map"></div>

</template>

<script>
const mapboxgl = require("mapbox-gl"); //引入组件

export default {
  name: "mapboxgl",
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
          youmap: {
            //tiles: ["http://localhost:8081/mvt/tile/{z}/{y}/{x}.mvt"],
            tiles:["http://10.61.120.110:8080/YouMapServer/rest/service/gonglu/VectorTileServer/tile/{z}/{y}/{x}"],
            type: "vector",
          },
          tianditu: {
            type: "raster",
            tiles: [
              "https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
            ],
            tileSize: 256,
            zoomOffset: -1,
          },
        },

        center: [108.81647489193665, 34.283449427413956],
        name: "newc1a89",
        sprite:
          "http://124.115.170.134:8080/YouMapServer/rest/service/xianMap/VectorTileServer/newc1a89/sprites/sprite",
        layers: [
          {
            id: "vec_c",
            source: "tianditu",
            type: "raster",
          },
          {
            maxzoom: 18,
            paint: {
              "line-width": 1,
              "line-opacity": 0.86,
              "line-blur": 3,
              "line-color": "rgba(12, 247, 255, 1)",
            },
            id: "river",
            source: "youmap",
            "source-layer": "river",
            type: "line",
            minzoom: 0,
          },
          {
            maxzoom: 18,
            paint: {
              "fill-outline-color": "rgba(0, 221, 255, 1)",
              "fill-color": "#053890",
              "fill-opacity": 1,
            },
            id: "China",
            source: "youmap",
            "source-layer": "China",
            type: "fill",
            minzoom: 0,
          },
        ],
        zoom: 10.97,
        glyphs:
          "http://124.115.170.134:8080/YouMapServer/rest/service/xianMap/VectorTileServer/fonts/{fontstack}/{range}.pbf",
        version: 8,
      };
      mapboxgl.accessToken =
        "pk.eyJ1IjoiZ2d5eXNpIiwiYSI6ImNqaTVwbzVyeTBtN3Yzd28zY3hrNXphM3MifQ.EkXqUIpefUT9B37aWuzjsA"; //这里请换成自己的token
      var map = new mapboxgl.Map({
        container: "map", // container id 绑定的组件的id
        // projection: {
        //   name: "lambertConformalConic",
        //   center: [110, 30],
        //   parallels: [55, 65],
        // },
        style: "http://10.61.120.110:8080/YouMapServer/rest/service/hanzhong/VectorTileServer/styles/default.json", //地图样式，可以使用官网预定义的样式,也可以自定义
        // style: 'mapbox://styles/mapbox/streets-v11',
        center: [106.95373925550007, 33.33705411400004], // 初始坐标系，这个是南京建邺附近
        zoom: 0, // starting zoom 地图初始的拉伸比例
        //pitch: 60, //地图的角度，不写默认是0，取值是0-60度，一般在3D中使用
        //bearing: -17.6, //地图的初始方向，值是北的逆时针度数，默认是0，即是正北
        antialias: true, //抗锯齿，通过false关闭提升性能
        hash: true,
        showTileBoundaries: true,
      });

      // The 'building' layer in the mapbox-streets vector source contains building-height
      // data from OpenStreetMap.
      map.on("load", function () {
        //on设置监听，以及触发时的回调，这是加载时的触发的生成3d地图的例子
        // Insert the layer beneath any symbol layer.
        var layers = map.getStyle().layers;

        var labelLayerId;
        for (var i = 0; i < layers.length; i++) {
          if (layers[i].type === "symbol" && layers[i].layout["text-field"]) {
            labelLayerId = layers[i].id;
            break;
          }
        }

        // map.addLayer(
        //   //在地图样式中添加一个Mapbox样式图层。(图层，layerid)
        //   {
        //     id: "3d-buildings",
        //     source: "composite",
        //     "source-layer": "building",
        //     filter: ["==", "extrude", "true"],
        //     type: "fill-extrusion",
        //     minzoom: 15,
        //     paint: {
        //       "fill-extrusion-color": "#aaa",

        //       // use an 'interpolate' expression to add a smooth transition effect to the
        //       // buildings as the user zooms in
        //       "fill-extrusion-height": [
        //         "interpolate",
        //         ["linear"],
        //         ["zoom"],
        //         15,
        //         0,
        //         15.05,
        //         ["get", "height"],
        //       ],
        //       "fill-extrusion-base": [
        //         "interpolate",
        //         ["linear"],
        //         ["zoom"],
        //         15,
        //         0,
        //         15.05,
        //         ["get", "min_height"],
        //       ],
        //       "fill-extrusion-opacity": 0.6,
        //     },
        //   },
        //   labelLayerId
        // );
      });
      //地图监听点击，触发回调
      map.on("click", function (e) {
        console.log("123");
      });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less" >
@import url("https://api.tiles.mapbox.com/mapbox-gl-js/v0.44.2/mapbox-gl.css");
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
