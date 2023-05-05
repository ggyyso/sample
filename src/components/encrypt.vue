<template>
  <div class="uploadFile">
    <!-- ul、li标签用于展示从本地添加的预览图片 -->
    <ul v-show="uploadImg.length != 0">
      <li v-for="(item, index) in uploadImg" :key="index" class="addPic">
        <img :src="item" />
      </li>
    </ul>
    <input
      type="file"
      id="file"
      accept="image/*"
      @change="getPicture($event)"
    />
    <button @click="callFile" v-show="showInputImg">+</button>
  </div>
</template>

<script>
import CryptoJS from "crypto-js";
export default {
  name: "encrypt",
  data() {
    return {
      uploadImg: [],
    };
  },
  props: {
    msg: String,
  },
  mounted() {
    this.encryptDo();
  },
  computed: {
    showInputImg() {
      return this.uploadImg.length < 3;
    },
  },
  methods: {
    encryptDo() {
      let en = this.encrypt("我爱中国");
      console.log(en);

      //  let src = window.URL.createObjectURL(img);
      // var base64 = this.imageToBase64(src);
      // console.log(base64);
    },

    getPicture(e) {
      //预览图片,文件转为blob
      let src = window.URL.createObjectURL(e.target.files[0]);
      // this.uploadImg.push(src);

      //将图片文件转化成base64格式图片
      var reader = new FileReader();
      reader.onload = (e) => {
        //e.target.result  就是从本地读取的图片的base64格式,将它上传给服务器即可
        console.log(e.target.result);
        //data:image/png;base64,
        let imgStr = e.target.result.substring(22);
        console.log(imgStr);
        console.log(this.decrypt(imgStr));
        // this.uploadImg.push("data:image/png;base64," + this.decrypt(imgStr));
      this.uploadImg.push( this.dataURItoBlob("data:image/png;base64," + this.decrypt(imgStr)));
        //使用axios的post方法上传即可
      };
      reader.readAsDataURL(e.target.files[0]);
    },

    callFile() {
      //点击添加图片按钮，触发type:"file"的input标签
      let fileDom = document.querySelector("#file");
      fileDom.click();
    },
    // 将base64图片转化成blob图片, base64Data base64图片地址
    dataURItoBlob(base64Data) {
      // console.log(base64Data, base64Data.length)
      let byteString = base64Data;
      if (base64Data.split(",")[0].indexOf("base64") >= 0) {
        byteString = atob(base64Data.split(",")[1]); // base64 解码
      } else {
        byteString = unescape(base64Data.split(",")[1]);
      }
      // 获取文件类型
      let mimeString = base64Data.split(",")[0].match(/:(.*?);/)[1]; // mime类型

      // ArrayBuffer 对象用来表示通用的、固定长度的原始二进制数据缓冲区
      // let arrayBuffer = new ArrayBuffer(byteString.length) // 创建缓冲数组
      // let uintArr = new Uint8Array(arrayBuffer) // 创建视图

      let uintArr = new Uint8Array(byteString.length); // 创建视图

      for (let i = 0; i < byteString.length; i++) {
        uintArr[i] = byteString.charCodeAt(i);
      }
      // 生成blob图片
      const blob = new Blob([uintArr], {
        type: mimeString,
      });
      console.log(uintArr, blob);
      // 使用 Blob 创建一个指向类型化数组的URL, URL.createObjectURL是new Blob文件的方法,可以生成一个普通的url,可以直接使用,比如用在img.src上
      return URL.createObjectURL(blob);
    },

    imageToBase64(file) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        console.log("file 转 base64结果：" + reader.result);
        this.iconBase64 = reader.result;
      };
      reader.onerror = function (error) {
        console.log("Error: ", error);
      };
      return reader.result;
    },

    //AES加密
    encrypt(word) {
      const key = CryptoJS.enc.Utf8.parse("qwertyuiqwertyui"); //16位
      const iv = CryptoJS.enc.Utf8.parse("1234567890000000"); //如果采用ECB，则需要启用偏移量iv
      let encrypted = "";
      if (typeof word == "string") {
        const srcs = CryptoJS.enc.Utf8.parse(word);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
          // iv: iv,
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });
      } else if (typeof word == "object") {
        //对象格式的转成json字符串
        const data = JSON.stringify(word);
        const srcs = CryptoJS.enc.Utf8.parse(data);
        encrypted = CryptoJS.AES.encrypt(srcs, key, {
          //iv: iv,
          mode: CryptoJS.mode.ECB,
          padding: CryptoJS.pad.Pkcs7,
        });
      }
      return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
    },
    // aes解密
    decrypt(word) {
      const key = CryptoJS.enc.Utf8.parse("qwertyuiqwertyui"); //16位
      const iv = CryptoJS.enc.Utf8.parse("1234567890000000"); //如果采用ECB，则需要启用偏移量iv
      const encryptedHexStr = CryptoJS.enc.Hex.parse(word);
      const decrypt = CryptoJS.AES.decrypt(word, key, {
        //iv: iv,
        mode: CryptoJS.mode.ECB,
        padding: CryptoJS.pad.Pkcs7,
      });
      const decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
      return decryptedStr.toString();
    },
    //二进制转为字符串
    binaryToStr(str) {
      var result = [];
      //
      //通过空格来分开二进制的字符
      var list = str.split(" ");
      for (var i = 0; i < list.length; i++) {
        var item = list[i];
        //转为asciicode 码
        var asciiCode = parseInt(item, 2);
        //转为文字
        var charValue = String.fromCharCode(asciiCode);
        //添加到集合中
        result.push(charValue);
      }
      //返回结果
      return result.join("");
    },
  },
};
</script>

<style scoped></style>
