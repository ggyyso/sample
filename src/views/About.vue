<template>
  <div class="about">
   <!-- <video-player  class="video-player-box"
                 ref="videoPlayer"
                 :options="playerOptions"
                 :playsinline="true"
                 customEventName="customstatechangedeventname"
 
                 @play="onPlayerPlay($event)"
                 @pause="onPlayerPause($event)"
                
                 @ready="playerReadied">
  </video-player> -->

  <div v-for="(item,i) in list" :key="i" style="margin-bottom: 30px">
      <video :id="'myVideo'+item.id" class="video-js">
        <source :src="item.src" type="video/mp4">
      </video>
    </div>
  </div>
</template>

<script>
import 'video.js/dist/video-js.css'

import { videoPlayer } from 'vue-video-player'
  // Similarly, you can also introduce the plugin resource pack you want to use within the component
  // import 'some-videojs-plugin'
  export default {
    components: {
    // videoPlayer
  },
    data() {
      return {
        playerOptions: {
          // videojs options
          muted: true,
          language: 'en',
          playbackRates: [0.7, 1.0, 1.5, 2.0],
          sources: [{
            type: "video/mp4",
            src: require('../../../../../../work/project/js_project/sample/src/video/2021924102156rec.mp4')//url地址
          }],
          poster: "/static/images/author.jpg",
        },
        list:[
              {
                  src:'https://vid.connatix.com/9abd853e-53a6-43d2-8f4e-ae4bbd0d8737/0.mp4',
                  id:0,
                  pic:"../assets/logo.png",
              },
              {
                  src:'http://img.yopoo.cn/banner_video.mp4',
                  id:1,
                  pic:"",
              },
              {
                  src:'http://img.yopoo.cn/banner_video.mp4 ',
                  id:2,
                  pic:"",
              }
          ]
      }
    },
    mounted() {
      console.log('this is current player instance object', this.player)
       this.initVideo();
    },
    computed: {
      // player() {
      //   return this.$refs.videoPlayer.player
      // }
    },
    methods: {
     // listen event
      onPlayerPlay(player) {
         console.log('player play!', player)
      },
      onPlayerPause(player) {
         console.log('player pause!', player)
      },
      // ...player event
 
      // or listen state event
      playerStateChanged(playerCurrentState) {
         console.log('player current update state', playerCurrentState)
      },
 
      // player is ready
      playerReadied(player) {
        console.log('the player is readied', player)
        // you can use it to do something...
        // player.[methods]
      },
       initVideo() {
            //初始化视频方法 循环列表获取每个视频的id
            this.list.map((item,i)=>{
                let myPlayer = this.$video('myVideo'+item.id, {
                    //确定播放器是否具有用户可以与之交互的控件。没有控件，启动视频播放的唯一方法是使用autoplay属性或通过Player API。
                    controls: true,
                    //自动播放属性,muted:静音播放
                    autoplay: false   ,
                    //建议浏览器是否应在<video>加载元素后立即开始下载视频数据。
                    preload: "auto",
                    //设置视频播放器的显示宽度（以像素为单位）
                    width: "800px",
                    //设置视频播放器的显示高度（以像素为单位）
                    height: "400px",
                    //封面图
                    poster:item.pic,
                    muted:false
                });
            })

        }
    }
  }
</script>
