<template>
  <div class="DetailSettingWrapper">
    <div class="DetailSettingTopBar">
      <div class="DetailGoBack" @click.prevent="goBack()">
        <svg t="1657522982030" class="GoBackIcon" viewBox="0 0 1024 1024" version="1.1"
             xmlns="http://www.w3.org/2000/svg" p-id="2262" width="200" height="200">
          <path
              d="M624.788992 204.047974 585.205965 164.464026 219.560038 530.185011 585.205965 895.864013 624.788992 856.280986 298.663014 530.16105Z"
              p-id="2263" fill="#18abce"></path>
        </svg>
      </div>
      <div class="DetailSettingTitle">头像设定</div>
    </div>
    <div class="DetailSettingContent">
      <div class="AvatarImageWrapper">
        <img alt="头像" class="AvatarImage"
             :src="currentAvatarUrl"/>
      </div>
      <div class="AvatarOperationWrapper">
        <div class="AvatarOperationTitle">
          <span>🖼️选择新头像</span>
        </div>
        <div class="AvatarOperation">
          <button class="AvatarSelectBtn" @click.prevent="activateFileSelector()">选择图片</button>
          <input type="file" name="image" accept="image/*" @change='onImgSelectChanged()' id="img-selector"
                 ref="inputer">
        </div>
        <div class="AvatarOperationTitle" style="margin-top: 1rem">
          <span>🤺 预览</span>
          <img alt="头像" class="NullSvgWrapper" :src="getDisplayUrl()" v-if="isShowPreview"/>
          <div class="NullSvgWrapper" v-if="!isShowPreview">
            <svg t="1657514709643" class="NullSvg" viewBox="0 0 1024 1024" version="1.1"
                 xmlns="http://www.w3.org/2000/svg"
                 p-id="2751" width="200" height="200">
              <path
                  d="M948.27 720.11L825.59 607a36 36 0 0 0-48.81 52.93l55 50.68H612.34a36 36 0 0 0 0 72h219.39l-55 50.68a36 36 0 0 0 48.81 52.93L948.27 773a36 36 0 0 0 0-52.93z"
                  p-id="2752"></path>
              <path
                  d="M888 128H136a72 72 0 0 0-72 72v624a72 72 0 0 0 72 72h312.09a36 36 0 0 0 36-36 36 36 0 0 0-36-36H136V200h752v312.13a36 36 0 0 0 36 36 36 36 0 0 0 36-36V200a72 72 0 0 0-72-72z"
                  p-id="2753" data-spm-anchor-id="a313x.7781069.0.i1"></path>
              <path
                  d="M192.83 328.28h60.61l56.95 129.57H312V328.28h38.92v181.3h-54.6l-62.73-137.93H232v137.93h-39.17zM390.33 449.49V328.28H430v116.77c0 21.95 7.58 33.18 36.31 33.18 29.78 0 36.58-13.06 36.58-33.18V328.28h39.44v121.21c0 44.67-27.69 62.7-76.28 62.7-48.82 0-75.72-14.89-75.72-62.7zM693.62 475.09v34.49H581.81v-181.3h39.71v146.81zM831.55 475.09v34.49h-111.8v-181.3h39.7v146.81z"
                  p-id="2754" data-spm-anchor-id="a313x.7781069.0.i2" class="selected"></path>
            </svg>
          </div>
        </div>
        <div class="AvatarOperationTitle">
          <span>🔗 上传</span>
        </div>
        <div class="AvatarOperation">
          <button id="AvatarUploadBtn" @click.prevent="uploadNewAvatar()">确认并上传</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "AvatarSetting",
  data() {
    return {
      currentAvatarUrl: "",
      newAvatarFile: null,
      newAvatarUrl: '',
      isShowPreview: false,
    }
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    getCurrentAvatar() {
      axios.get('/customer/getAvatar?userId='+sessionStorage.getItem('userId')).then(res => {
        if (res.data.status === 0) {
          this.currentAvatarUrl = res.data.data;
        } else {
          this.$message.error(res.data.msg);
        }
      }).catch(() => {
        this.$message.error('网络错误，获取头像失败');
      });
    },
    activateFileSelector() {
      document.querySelector('#img-selector').click();
    },
    onImgSelectChanged() {
      let inputDOM = this.$refs.inputer;
      this.newAvatarFile = inputDOM.files[0];
      this.imgPreview();
    },
    getDisplayUrl() {
      if (this.newAvatarUrl !== '') {
        this.isShowPreview = true;
        return this.newAvatarUrl;
      } else {
        this.isShowPreview = false;
        document.querySelector('#AvatarUploadBtn').disabled = true;
      }
    },
    imgPreview() {
      let vm = this;
      // 看支持不支持FileReader
      if (!this.newAvatarFile || !window.FileReader) return;

      if (/^image/.test(this.newAvatarFile.type)) {
        // 创建一个reader
        var reader = new FileReader();
        // 将图片将转成 base64 格式
        reader.readAsDataURL(this.newAvatarFile);
        // 读取成功后的回调
        reader.onloadend = function () {
          vm.newAvatarUrl = this.result;
          vm.getDisplayUrl();
        }
      }
    },
    resetToBegin() {
      this.newAvatarFile = null;
      this.newAvatarUrl = '';
      this.isShowPreview = false;
    },
    uploadNewAvatar() {
      let vm = this;
      if (this.newAvatarFile === null) {
        vm.$message({
          message: '请先选择图片!',
          type: 'warning'
        });
        return;
      }
      let dataToSend = new FormData();
      dataToSend.append('image', this.newAvatarFile);
      axios.post('/customer/updateAvatar?userId='+sessionStorage.getItem('userId'), dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status === 0) {
          vm.$message({
            message: '上传成功',
            type: 'success'
          });
          window.location.reload();
          this.getCurrentAvatar();
          this.resetToBegin();
        } else {
          vm.$message({
            message: '上传失败，请稍后再试',
            type: 'error'
          });
        }
      });
    }
  },
  created() {
    this.getCurrentAvatar();
  }
}
</script>

<style scoped>
.DetailSettingWrapper {
  height: 100%;

  padding: 0 0;
  background: #e7ecf8;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
  margin: 4px 6px 10px 6px;
  width: auto;
}

.DetailSettingTopBar {
  height: 60px;
  border-radius: 20px 20px 0 0;

  background: white;
  display: flex;
}

.DetailGoBack {
  flex-shrink: 0;
}

.GoBackIcon {
  width: 35px;
  height: 35px;
  margin: 13px 15px;
  fill: #18abce;
}

.DetailSettingTitle {
  font-weight: bolder;
  font-size: 22px;
  margin-left: calc(50vw - 44px - 35px - 30px - 5px);
  margin-top: calc(30px - 11px - 5px);
}

.DetailSettingContent {
  height: calc(100% - 70px);
  margin: 5px 5px;
}

.AvatarImageWrapper {
  margin-top: 0.5rem;
  background: white;
  border-radius: 20px;
  height: 10rem;
}

.AvatarImage {
  width: 9rem;
  height: 9rem;
  border-radius: 4.5rem;
  margin: 0.5rem calc(50vw - 4.5rem - 0.5rem);
  object-fit: cover;
}

.AvatarOperationWrapper {
  background: white;
  height: calc(100% - 2rem - 10rem - 0.6rem);
  border-radius: 20px;
  margin-top: 0.5rem;
  padding: 0.9rem 0.8rem;
}

.AvatarOperationTitle {
  font-family: 黑体, system-ui;
  font-size: 1.3rem;
  font-weight: bold;
}

.AvatarOperation {
  margin-top: 0.6rem;
}

.AvatarSelectBtn {
  transition-duration: 0.4s;
  background-color: #E9FCF1;
  color: #34C471;
  margin-left: calc(50vw - 5px - 15px - 30%);
  width: 60%;
  height: 3rem;
  border: 3px;
  border-radius: 30px;
  font-size: 13px;
}

.AvatarSelectBtn:hover {
  background-color: #34C471;
  color: #E9FCF1;
}

#img-selector {
  display: none;
}

input::-webkit-file-upload-button {

}

.NewAvatarImage {
  width: 9rem;
  height: 9rem;
  border-radius: 4.5rem;
  margin: 0.5rem calc(50vw - 4.5rem - 0.5rem);
  object-fit: cover;
}

.NullSvgWrapper {
  width: 7rem;
  height: 7rem;
  border-radius: 3.5rem;
  margin: 0.5rem calc(50vw - 3.5rem - 0.5rem);
  background: rgba(192, 180, 180, 0.89);
}

.NullSvg {
  width: 4rem;
  height: 4rem;
  margin-left: 1.5rem;
  margin-top: 1.5rem;
}

#AvatarUploadBtn {
  transition-duration: 0.4s;
  background-color: #FFF4EA;
  color: #FF9465;
  margin-left: calc(50vw - 5px - 15px - 30%);
  width: 60%;
  height: 3rem;
  border: 3px;
  border-radius: 30px;
  font-size: 13px;
}

#AvatarUploadBtn:hover {
  background-color: #FF9465;
  color: #FFF4EA;
}
</style>