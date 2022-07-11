<template>
  <el-header>
    <div class="headerSearch" style="text-align:center;margin-top:30px">
      <input class="headerSearchInput" type="text" v-model="searchFoodName" placeholder="在这里搜索食物！"
             style="width:300px"/>
      <el-button @click="viewOneFood()" circle>🔍</el-button>
      <el-button @click="addDialogInit()" circle>➕</el-button>
    </div>
  </el-header>
  <el-main>
    <el-table :data="tableData" height="600" style="width: 100%">
      <el-table-column prop="id" label="食物编号" width="180"/>
      <el-table-column prop="name" label="食物" width="180"/>
      <el-table-column prop="type" label="类型"/>
      <el-table-column>
        <template #default="scope">
          <el-button key="plain" type="" @click="dialogShow(scope.row)" text>查看详情</el-button>
          <el-button key="plain" type="error" @click="deleteFood(scope.row)" text>删除菜品</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-main>

  <el-dialog
      v-model="dialogVisible"
      title="Tips"
      width="30%"
  >
    <span>
      <el-image :src="food.img" style="width:100px; height:100px">
      </el-image>
    </span>
    <el-form ref="form" :model="food" label-width="80px">
      <el-form-item label="食物编号">
        <el-input v-model="food.id" :placeholder="food.id"></el-input>
      </el-form-item>
      <el-form-item label="食物名称">
        <el-input v-model="food.name" :placeholder="food.name"></el-input>
      </el-form-item>
      <el-form-item label="食物价格">
        <el-input v-model="food.price" :placeholder="food.price">￥</el-input>
      </el-form-item>
      <el-form-item label="食物类型">
        <el-select v-model="food.type" :placeholder="food.type">
          <el-option label="主食" value="主食"></el-option>
          <el-option label="炒菜" value="炒菜"></el-option>
          <el-option label="锅仔" value="锅仔"></el-option>
          <el-option label="水果" value="水果"></el-option>
          <el-option label="特色菜" value="特色菜"></el-option>
          <el-option label="饮品" value="饮品"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="food.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="modifyFood()">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
  <el-dialog
      v-model="addDialogVisible"
      title="Tips"
      width="30%"
  >
    <input type="file" name="image" accept="image/*" @change='onImgSelectChanged()' id="img-selector"
           ref="inputer">
    <img alt="头像" class="NullSvgWrapper" :src="getDisplayUrl()" v-if="isShowPreview"/>
    <el-form ref="form" :model="food" label-width="80px">
      <el-form-item label="食物编号">
        <el-input v-model="food.id" :placeholder="food.id"></el-input>
      </el-form-item>
      <el-form-item label="食物名称">
        <el-input v-model="food.name" :placeholder="food.name"></el-input>
      </el-form-item>
      <el-form-item label="食物价格">
        <el-input v-model="food.price" :placeholder="food.price">￥</el-input>
      </el-form-item>
      <el-form-item label="食物类型">
        <el-select v-model="food.type" :placeholder="food.type">
          <el-option label="主食" value="主食"></el-option>
          <el-option label="炒菜" value="炒菜"></el-option>
          <el-option label="锅仔" value="锅仔"></el-option>
          <el-option label="水果" value="水果"></el-option>
          <el-option label="特色菜" value="特色菜"></el-option>
          <el-option label="饮品" value="饮品"></el-option>
          <el-option label="其他" value="其他"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="描述">
        <el-input type="textarea" v-model="food.text"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="addFood()">提交</el-button>
        <el-button>取消</el-button>
      </el-form-item>
    </el-form>
  </el-dialog>
</template>

<script>
import axios from "axios";
import * as vm from "vm";

export default {
  name: "ViewFood",
  data() {
    return {
      isShowPreview:false,
      newAvatarFile:null,
      addDialogVisible: false,
      dialogVisible: false,
      searchFoodName: "",
      food: {
        id: "",
        text: "",
        price: "",
        img: "",
        name: "",
        type: "",
        like: "",
        dislike: "",
      },
      tableData: [
        {
          id: "10001",
          text: "老八秘制 嗨嗨嗨",
          price: "30",
          img: "",
          name: "大榴莲",
          type: "水果",
          like: "114514",
          dislike: "666",
        }
      ],
      options: [
        {
          value: '主食',
          label: '主食',
        },
        {
          value: '特色菜',
          label: '特色菜',
        },
        {
          value: '炒菜',
          label: '炒菜',
        },
        {
          value: '锅仔',
          label: '锅仔',
        },
        {
          value: '凉菜',
          label: '凉菜',
        },
        {
          value: '饮品',
          label: '饮品',
        },
        {
          value: '水果',
          label: '水果',
        },
        {
          value: '其他',
          label: '其他',
        }
      ],
      uploadImg: [],
    }
  },
  methods: {
    dialogShow(row) {
      this.dialogVisible = true;
      // eslint-disable-next-line no-unused-vars
      let food;
      this.tableData.forEach(function (item, index, arr) {
        if (item.id === row.id) {
          food = arr.at(index);
          console.log(index);
        }
      });
      this.food = food;

    },
    modifyFood() {
      JSON.stringify()
      axios({
        method: 'POST',
        url: '/front/modifyFood',
        dataType: 'json',
        data: {
          id: this.food.id,
          text: this.food.text,
          price: this.food.price,
          img: this.food.img,
          name: this.food.name,
          type: this.food.type,
          like: this.food.like,
          dislike: this.food.dislike,
        }
      })
          .then((res) => {
            if (res.status === 0) {
              this.dialogVisible = false;
              let id = this.id;
              let food = this.food;
              this.tableData.forEach(function (item, index, arr) {
                if (id === item.id) {
                  arr[index] = food;
                }
              })
            } else {
              console.log(res.data.msg);
            }
          })
    },
    viewOneFood() {
      axios({
        method: 'POST',
        url: '/front/viewOneFood?name=' + this.searchFoodName,
      })
          .then((res) => {
            if (res.data.status === 0) {
              this.tableData = res.data.data;
            } else {
              this.$alert(res.data.msg, '错误信息');
            }
          })
    },
    deleteFood(row) {
      axios({
        method: 'POST',
        url: '/front/deleteFood?name=' + row.name,
      })
          .then((res) => {
            if (res.status === 0) {
              this.tableData.forEach(function (item, index, arr) {
                if (item.name === row.name) {
                  arr.splice(index, 1);
                }
              })
            } else {
              this.$alert(res.data.msg, '错误信息');
            }
          })
    },
    addFood() {
      JSON.stringify()
      axios({
        method: 'POST',
        url: '/front/addFood',
        dataType: 'json',
        data: {
          id: this.food.id,
          text: this.food.text,
          price: this.food.price,
          img: this.food.img,
          name: this.food.name,
          type: this.food.type,
          like: this.food.like,
          dislike: this.food.dislike,
        }
      })
          .then((res) => {
            if (res.data.status === 0) {
              this.tableData.push(this.food);
            } else {
              this.$alert(res.data.msg, '错误信息');
            }
          })
      let dataToSend = new FormData();
      dataToSend.append('image', this.newAvatarFile);
      axios.post('/front/addFoodImg?foodName='+this.food.name, dataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      }).then(function (response) {
        if (response.data.status === 0) {
          vm.$message({
            message: '上传成功',
            type: 'success'
          });
          this.addDialogVisible = false;
        } else {
          vm.$message({
            message: '上传失败，请稍后再试',
            type: 'error'
          });
        }
        // eslint-disable-next-line no-unused-vars
      })
    },
    addDialogInit() {
      this.addDialogVisible = true;
      this.food.id = "";
      this.food.name = "";
      this.food.price = "";
      this.food.text = "";
      this.food.type = "";
      this.food.img = "";
      this.food.like = "";
      this.food.dislike = "";
      this.uploadImg = [];
    },
    getPicture(e) {
      //预览图片
      let src = window.URL.createObjectURL(e.target.files[0]);
      this.uploadImg.push(src);

      //将图片文件转化成base64格式图片
      var reader = new FileReader();
      reader.onload = (e) => {
        this.food.img = e.target.result // 就是从本地读取的图片的base64格式,将它上传给服务器即可
        //使用axios的post方法上传即可
      }
      reader.readAsDataURL(e.target.files[0])
    },
    callFile() {
      //点击添加图片按钮，触发type:"file"的input标签
      let fileDom = document.querySelector("#file")
      fileDom.click()
    },
    onImgSelectChanged(){
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
  },
  created() {
    axios({
      method: 'POST',
      url: '/front/viewFood'
    })
        .then((res) => {
          if (res.data.status === 0) {
            this.tableData = res.data.data;
          }
        })
  }
}
</script>

<style scoped>
.headerSearchInput {
  background-color: #f6f6f6;
  color: #0d0d0d;
  padding: 15px 32px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 5px;
  width: 85%;
  border: 2px solid #f6f6f6;
  -webkit-transition: all 0.5s ease-in-out;
  -moz-transition: all 0.5s ease-in-out;
  -ms-transition: all 0.5s ease-in-out;
  -o-transition: all 0.5s ease-in-out;
  transition: all 0.5s ease-in-out;
  -webkit-border-radius: 5px 5px 5px 5px;
  border-radius: 5px 5px 5px 5px;
}

.imgAdd {
  display: none;
}

.img {
  width: 70px;
  height: 70px;
}
</style>