<template>

  <div id="map"></div>

</template>

<script>
import { Map, View, Feature, Overlay } from "ol";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import XYZ from "ol/source/XYZ";
import { ZoomSlider, MousePosition } from "ol/control";
import { VectorTile as VectorTileLayer } from "ol/layer";
import {
  Vector as VectorSource,
  VectorTile as VectorTileSource,
  TileDebug,
} from "ol/source";
import { Circle as CircleStyle, Fill, Stroke, Style } from "ol/style";
import { GeoJSON, MVT } from "ol/format";
import Projection from "ol/proj/Projection";
import * as olProj from "ol/proj";
import { createStringXY } from "ol/coordinate";
import { createXYZ } from "ol/tilegrid";

export default {
  name: "olmvt",
  props: {
    msg: String,
  },
  mounted() {
    this.initmap();
  },

  methods: {
    initmap() {
      let country = new Style({
        stroke: new Stroke({
          color: "rgba(164, 162, 174)",
          width: 2,
        }),
        fill: new Fill({
          color: "rgba(233, 229, 216)",
        }),
      });

      let vector4326 = new VectorTileLayer({
        // 矢量切片的数据源
        source: new VectorTileSource({
          projection: "EPSG:4326",
          format: new MVT({
            idProperty: "iso_a3",
          }),
          tileGrid: createXYZ({
            extent: olProj.get("EPSG:4326").getExtent(),
            maxZoom: 22,
          }),
          // 矢量切片服务地址
          tileUrlFunction: function (tileCoord) {
            //   console.log(tileCoord);
            //   console.log(createStringXY(6));
            var url =
              "https://ahocevar.com/geoserver/gwc/service/tms/1.0.0/" +
              "ne:ne_10m_admin_0_countries@EPSG%3A4326@pbf/" +
              (tileCoord[0] - 1) +
              "/" +
              tileCoord[1] +
              "/" +
              (Math.pow(2, tileCoord[0] - 1) - 1 - tileCoord[2]) +
              ".pbf";
              url="http://localhost:8081/mvt/temp/" + (tileCoord[0] - 1) +
              "/" +
              tileCoord[1] +
              "/" +
              (Math.pow(2, tileCoord[0] - 1) - 1 - tileCoord[2]) +
              ".mvt";
            return url;
          },
        }),
        style: country,
      });
      let map = new Map({
        target: "map",
        layers: [
          vector4326,
          // 加载瓦片网格图层
          new TileLayer({
            //瓦片网格数据源
            source: new TileDebug({
              //获取瓦片网格信息
              //投影
              projection: "EPSG:4326",
              tileGrid: vector4326.getSource().getTileGrid(),
            }),
          }),
        ],
        controls: [
          new MousePosition({
           
            coordinateFormat: createStringXY(6), // 鼠标位置
          }),
        ],
        view: new View({
          projection: "EPSG:4326", // pbf4326格式需要使用4326坐标系
          center: [114.1564839, 24.61548857],
          zoom: 0,
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
  position: absolute;
  top: 0;
  bottom: 0;
  width: 100%;
  left: 0;
}
</style>
