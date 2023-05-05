<template>
  <div>
    <div
      id="menu"
      style="
        position: absolute;
        top: 20px;
        left: 100px;
        z-index: 2;
        padding: 5px;
        background-color: white;
        text-align: left;
      "
    >
      <div>
        <router-link to="/home"> home </router-link>
        <router-link to="/"> map </router-link>
        <router-link to="/about"> about </router-link>
      </div>
      <a-button
        type="primary"
        style="display: none"
        class="btn"
        @click="showCoord2Pile = !showCoord2Pile"
        >坐标->桩号</a-button
      >
      <a-button
        type="primary"
        class="btn"
        @click="showPile2Coord = !showPile2Coord"
        >桩号->坐标</a-button
      >
      <a-button type="primary" class="btn">桩号区间线路</a-button>
      <a-button type="primary" class="btn">沿线设施查询</a-button>
    </div>

    <!-- 坐标转桩号 -->
    <div
      id="coord2Pile"
      style="
        position: absolute;
        top: 100px;
        left: 100px;
        z-index: 2;
        padding: 5px;
        background-color: white;
        text-align: left;
      "
      v-show="showCoord2Pile"
    >
      当前坐标：<br />
      <label>x:</label>
      <a-input
        id="x"
        placeholder="经度"
        v-bind:value="this.nowPoint.x"
        class="input"
        style="width: 150px"
      >
      </a-input
      ><br />
      <label>y:</label>
      <a-input
        placeholder="纬度"
        id="y"
        v-bind:value="this.nowPoint.y"
        class="input"
        style="width: 150px"
      >
      </a-input>
      <a-button type="primary" @click="getUserAccount">查询</a-button><br />
      <label>{{ msg }}</label>
    </div>

    <!-- 桩号转坐标 -->
    <div
      id="pile2Coord"
      style="
        position: absolute;
        top: 100px;
        left: 100px;
        z-index: 2;
        padding: 5px;
        background-color: white;
        text-align: left;
        width: 300px;
      "
      v-show="showPile2Coord"
    >
      <a-input
        id="lxbm"
        placeholder="道路编码或名称"
        v-bind:value="this.lxbm"
        class="input"
        style="width: 150px"
      >
      </a-input>
      <a-button type="primary" @click="getpile2Coord">查询</a-button><br />
      <label>{{ msg }}</label>
    </div>

    <!-- 桩号间道路查询 -->
    <div
      id="pileInnerRoad"
      style="
        position: absolute;
        top: 100px;
        left: 100px;
        z-index: 2;
        padding: 5px;
        background-color: white;
        text-align: left;
        width: 300px;
      "
      v-show="showPileInnerRoad"
    >
      <a-input
        id="lxbm"
        placeholder="道路编码或名称"
        v-bind:value="this.pile"
        class="input"
        style="width: 150px"
      >
      </a-input>
      <a-input
        id="startPile"
        placeholder="起始桩号"
        v-bind:value="this.startPile"
        class="input"
        style="width: 150px"
      >
      </a-input>
      <a-input
        id="endPile"
        placeholder="终止桩号"
        v-bind:value="this.endPile"
        class="input"
        style="width: 150px"
      >
      </a-input>
      <a-button type="primary">查询</a-button><br />
      <label>{{ msg }}</label>
    </div>
   

    <div id="map"></div>
  </div>
</template>

<script>
import "leaflet/dist/leaflet.css";
// 引入Leaflet对象 挂载到Vue上，便于全局使用，也可以单独页面中单独引用
import * as L from "leaflet";
import "leaflet.pm";
import "leaflet.pm/dist/leaflet.pm.css";
import axios from "axios";
import CryptoJS from "crypto-js";


// axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;
// axios.defaults.headers.post["Content-Type"] =
//   "application/x-www-form-urlencoded";
/* leaflet icon */
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default {
  name: "leaflet",
  data() {
    return {
      uploadImg: [],
      map: "",
      nowPoint: {
        x: 0,
        y: 0,
      },
      pile: "",
      showCoord2Pile: false,
      showPile2Coord: false,
      startPile: 1102,
      endPile: 1135,
      showPileInnerRoad: false,
      lxbm: "G20",
      src: "../assets/16362.png",
    };
  },
  props: {
    msg: String,
  },
  mounted() {
    this.initmap();
  },
  computed: {

  },
  methods: {
    initmap() {
      this.map = L.map("map", {
        center: [34.33705411400004, 108.95373925550007], // 地图中心
        zoom: 9, //缩放比列
        zoomControl: true, //禁用 + - 按钮
        doubleClickZoom: true, // 禁用双击放大
        attributionControl: false, // 移除右下角leaflet标识
      });

      L.tileLayer(
        "https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoiZ2d5eXNpIiwiYSI6ImNqaTVwbzVyeTBtN3Yzd28zY3hrNXphM3MifQ.EkXqUIpefUT9B37aWuzjsA",
        {
          attribution: "mbx",
          maxZoom: 18,
          id: "mapbox/streets-v11",
          tileSize: 512,
          zoomOffset: -1,
          accessToken: "your.mapbox.access.token",
        }
      ).addTo(this.map);
      //添加绘制按钮
      this.map.pm.addControls({
        position: "topleft",
        drawPolygon: true, // 添加绘制多边形
        drawMarker: true, //添加按钮以绘制标记
        drawCircleMarker: false, //添加按钮以绘制圆形标记
        drawPolyline: true, //添加按钮绘制线条
        drawRectangle: false, //添加按钮绘制矩形
        drawCircle: false, //  添加按钮绘制圆圈
        editMode: true, //  添加按钮编辑多边形
        dragMode: true, //   添加按钮拖动多边形
        cutPolygon: false, // 添加一个按钮以删除图层里面的部分内容
        removalMode: true, // 清除图层
      });
      // 设置绘制后的线条颜色等
      this.map.pm.setPathOptions({
        color: "orange",
        fillColor: "green",
        fillOpacity: 0.4,
      });
      //设置显示语言
      this.map.pm.setLang("zh");
      this.getlatLngs();

      this.encryptDo();
    },
   
    // 获取绘制的坐标
    getlatLngs() {
      // debugger;
      //pm:drawstart 开始第一个点的时候调用
      //pm:drawend  禁止绘制时调用
      //pm:create  创建完成时调用
      this.map.on("pm:drawstart", (e) => {
        console.log(e, "first");
      });
      this.map.on("pm:drawend", (e) => {
        console.log(e, "禁止绘制");
      });
      this.map.on("pm:create", (e) => {
        console.log(e, "绘制完成时调用");
        if (e.shape === "Marker") {
          console.log(e.layer._latlng, "绘制坐标");
          this.nowPoint.x = e.layer._latlng.lng;
          this.nowPoint.y = e.layer._latlng.lat;
          //alert("纬度:" + e.layer._latlng.lat + ",纬度:" + e.layer._latlng.lng);
        } else {
          console.log(e.layer._latlngs[0], "绘制坐标");
        }
        e.layer.pm.enable({
          allowSelfIntersection: false,
          preventMarkerRemoval: false, // 禁止右键删除点
        });
        e.layer.on("pm:edit", (e) => {
          console.log(e, "拖动");
          //console.log(e.target._latlngs[0], "拖动后的坐标");
        });
        e.layer.on("pm:vertexadded", (e) => {
          console.log(e, "添加顶点");
        });
        e.layer.on("pm:cut", (e) => {
          console.log(e, "切割");
        });
      });
    },

    //获得用户信息的请求
    getUserAccount() {
      //创建实例时设置配置的默认值
      const httpHandler = axios.create({
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        }, //即将被发送的自定义请求头
        withCredentials: false, //表示跨域请求时是否需要使用凭证
      });
      let uri =
        "http://10.61.120.110:8080/YouMapServer/rest/service/?f=json&callback=p";

      uri =
        "https://shaanxi.tianditu.gov.cn/vectormap/YouMapServer/rest/service/geocode20210805/GeocodingServer2/address?keyword=陕西省渭南市富平县南社乡亭子村富平县南社刘强粮食收购点&score=80&outFields=&returnScore=true&interpolation=false&returnGeotext=false&f=json&token=H9NV_jjCU8k6oYS7LRCGiye9ZxhCrHuD0FJh5SrPnCnw718hAdD-VZVDWFoMAOZD89Ihd39v4_ncc1z5FmUOYmwrVv1N_aQiMMOWOg5qBE4*";
      httpHandler
        .get(uri)
        .then((result) => {
          console.log(result);
          this.msg = result;
        })
        .catch((error) => {
          console.error(error);
        });
    },

    getpile2Coord() {
      const httpHandler = axios.create({
        headers: {
          "Content-Type": "application/json;charset=utf-8",
        }, //即将被发送的自定义请求头
        withCredentials: false, //表示跨域请求时是否需要使用凭证
      });
      let uri =
        "http://10.61.120.110:8080/YouMapServer/rest/service/qg20211126/GeocodingServer2/reverse?centerAt=107%2C33&radius=1000&outFields=&type=&returnGeotext=true&f=json";
      httpHandler
        .get(uri)
        .then((result) => {
          console.log(result);
          this.msg = result.data.pois[0];
          L.marker([result.data.pois[0].Y, result.data.pois[0].X])
            .addTo(this.map)
            .bindPopup(result.data.pois[0].WKT)
            .openPopup();
          this.map.setView([result.data.pois[0].Y, result.data.pois[0].X], 13);
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="less">
#map {
  position: absolute;
  width: 100%;
  height: calc(100vh);
  z-index: 1;
  left: 0;
  top: 0;
}
.btn {
  margin: 5px;
}
/* 可以设置不同的进入和离开动画 */
/* 设置持续时间和动画函数 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active, 2.1.8 版本以下 */ {
  opacity: 0;
}
.uploadFile {
  display: flex;
  position: relative;
  height: 120px;
  line-height: 120px;
  padding: 10px 0;
  border-bottom: 1px solid rgb(235, 235, 235);
  overflow: hidden;
  z-index: 2;
}
.uploadFile ul {
  display: flex;
}
.uploadFile ul li {
  margin-right: 10px;
}
.uploadFile .addPic img {
  height: 100px;
  width: 100px;
}
.uploadFile button {
  height: 100px;
  width: 100px;
  font-size: 50px;
  border: 1px dashed rgb(182, 182, 182);
  color: rgb(182, 182, 182);
  background-color: rgb(243, 243, 243);
}
</style>
