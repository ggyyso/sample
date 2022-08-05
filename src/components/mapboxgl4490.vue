<template>

  <div id="map"></div>

</template>

<script>
const mapboxglcgcs = require("@cgcs2000/mapbox-gl"); //引入组件
var geojsn = require("../data/gz_2010_us_040_00_5m.json");
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
          geojson: {
            type: "geojson",
            data: geojsn,
          },
          youmap: {
            tiles: [
              "https://osm.oslandia.io/data/v3/${z}/${x}/${y}.pbf",
            ],
            type: "vector",
            zoomOffset: -1,
          },
          temp: {
            tiles: [
              // "http://localhost:8081/mvt/temp/{z}/{x}/{y}.mvt",
              //  "http://localhost:8085/YouMapServer/rest/service/tile4326/VectorTileServer/tile/{z}/{x}/{y}"
               'http://10.61.120.110:8080/YouMapServer/rest/service/sxww2021Geo/VectorTileServer'
            ],
            type: "vector",
            zoomOffset: -1,
          },
          tianditu: {
            type: "raster",
            tiles: [
              //"https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              "http://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&tk=d325e8daad1e0b4cddafa461072c3b75&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}"
            ],
            tileSize: 256,
            zoomOffset: 0,
          },
           tiandituLable: {
            type: "raster",
            tiles: [
              //"https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              "http://t0.tianditu.gov.cn/cva_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=cva&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&tk=d325e8daad1e0b4cddafa461072c3b75&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}"
            ],
            tileSize: 256,
            zoomOffset: 0,
          },
            gonglu: {
            type: "raster",
            tiles: [
              //"https://wi.maptiles.arcgis.com/arcgis/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
              // "http://t0.tianditu.gov.cn/vec_c/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0&LAYER=vec&STYLE=default&TILEMATRIXSET=c&FORMAT=tiles&tk=d325e8daad1e0b4cddafa461072c3b75&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}",
              
              // "http://124.115.223.53:7080/YouMapServer/rest/service/geoImg/TileServer/tile/{z}/{y}/{x}"
              "http://210.74.129.80:6080/arcgis/rest/services/shaanxi0101_c/MapServer/tile/{z}/{y}/{x}"
            ],
            tileSize: 256,
            zoomOffset: 0,
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
            id: "cva_c",
            source: "tiandituLable",
            type: "raster",
          },
          {
            id: "gonglu",
            source: "gonglu",
            type: "raster",
          },
           {
            paint: {
              "fill-outline-color": "rgba(0, 221, 255, 1)",
              "fill-color": "#053890",
              "fill-opacity": 0.5,
            },
            id: "country",
            source: "youmap",
            "source-layer": "oiip:World_Seas",
            type: "fill",
          },
          // {
          //   maxzoom: 22,
          //   paint: {
          //     "line-color": "rgba(255, 0, 67, 1)",
          //   },
          //   id: "guodao",
          //   source: "youmap2",
          //   "source-layer": "gonglu",
          //   type: "line",
          //   minzoom: 0,
          // },
          //  {
          //   paint: {
          //     "fill-outline-color": "rgba(0, 221, 255, 1)",
          //     "fill-color": "#053890",
          //     "fill-opacity": 0.5,
          //   },
          //   id: "country",
          //   source: "youmap",
          //   "source-layer": "ne_10m_admin_0_countries",
          //   type: "fill",
          // },
          {
            id: "usa",
            source: "geojson",
            type: "fill",
            paint: {
              "fill-outline-color": "rgba(255, 50, 10, 1)",
              "fill-color": "rgba(255, 50, 10, 0)",
              "fill-opacity": 0.5,
            },
          },
          {
            id: "China",
            source: "temp",
            "source-layer": "China",
            type: "fill",
            paint: {
              "fill-outline-color": "rgba(100, 50, 255, 1)",
              "fill-color": "#05A8a0",
              "fill-opacity": 0.5,
            },
          },
          {
            id: "river",
            source: "temp",
            "source-layer": "river",
            type: "line",
            paint: {
              "line-width": 2,
              "line-color": "rgba(250, 150, 100, 1)",
            },
          },
          // {
          //   id: "city",
          //   source: "youmap2",
          //   "source-layer": "city",
          //   type: "symbol",
          //   layout: {
          //     "text-field": "{name}",
          //     "text-size": ["interpolate", ["linear"], ["zoom"], 3, 10, 8, 30],
          //   },
          //   maxzoom: 22,
          //   paint: {
          //     "text-halo-color": "rgba(100, 100, 50, 1)",
          //     "text-color": "rgba(250, 220, 100, 1)",
          //     "text-halo-width": 1,
          //   },
          // },
          // {
          //   id: "riverLabel",
          //   source: "youmap2",
          //   "source-layer": "river",
          //   type: "symbol",
          //   layout: {
          //     "text-field": "{name}",
          //     "text-size": ["interpolate", ["linear"], ["zoom"], 3, 10, 8, 30],
          //     "symbol-placement": "line",
          //     "text-ignore-placement": true,
          //     "text-allow-overlap": true,
          //   },
          //   maxzoom: 22,
          //   paint: {
          //     "text-halo-color": "rgba(0, 100, 150, 1)",
          //     "text-color": "rgba(200, 220, 240, 1)",
          //     "text-halo-width": 1,
          //   },
          // },
        ],
        zoom: 10.97,
        glyphs:
          "http://124.115.170.134:8080/YouMapServer/rest/service/xianMap/VectorTileServer/fonts/{fontstack}/{range}.pbf",
        version: 8,
      };
      mapboxglcgcs.accessToken =
        "pk.eyJ1IjoiZ2d5eXNpIiwiYSI6ImNqaTVwbzVyeTBtN3Yzd28zY3hrNXphM3MifQ.EkXqUIpefUT9B37aWuzjsA"; //这里请换成自己的token
      var map = new mapboxglcgcs.Map({
        container: "map", // container id 绑定的组件的id
        // style: "http://10.61.120.110:8080/YouMapServer/rest/service/hanzhong/VectorTileServer/styles/default.json", //地图样式，可以使用官网预定义的样式,也可以自定义
        // style: 'http://10.61.120.110:8080/YouMapServer/rest/service/sxww2021Geo/VectorTileServer/styles/default.json',
        style: style1,
        center: [106.95373925550007, 33.33705411400004], // 初始坐标系，这个是南京建邺附近
        zoom: 6, // starting zoom 地图初始的拉伸比例
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

         map.addSource(
        'gz',{
            'type':'raster',
            'tiles':['http://210.74.129.80:6080/arcgis/rest/services/BINGTUANFW/MapServer/export?dpi=96&transparent=true&format=png8&layers=&bbox={bbox-epsg-4490}&f=image&bboxSR=4490&imageSR=4490'],          
            'tileSize':256
        });
    map.addLayer({
        'id':'gz-r',
        'type':'raster',
        'source':'gz'
    });   


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
