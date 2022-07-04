<template>
  <el-row style="top:0;bottom: 0;height: 100%;" class="fadeInDown">
    <el-col :span="8" style="top:0;padding-bottom: 40px;height: auto;" class="fadeIn first">
      <!--      <el-row :span="24" style="top:0;padding-bottom: 40px;height: auto;">-->
      <other-boards></other-boards>
      <!--      </el-row>-->
    </el-col>
    <el-col :span="8" style="top:0;padding-bottom: 40px;height: auto;" class="fadeIn second">
      <CallingCenter></CallingCenter>
    </el-col>
    <el-col :span="8" style="top:0;padding-bottom: 40px;height: auto;" class="fadeIn third">
      <NoticeBoard></NoticeBoard>
    </el-col>
  </el-row>
</template>

<script>
import NoticeBoard from "@/components/waiter/NoticeCenter";
import CallingCenter from "@/components/waiter/CallingCenter";
import OtherBoards from "@/components/waiter/OtherBoards";

export default {
  name: "dash-board",
  components: {OtherBoards, CallingCenter, NoticeBoard},
}
</script>

<style scoped>
.fadeInDown {
  -webkit-animation-name: fadeInDown;
  animation-name: fadeInDown;
  -webkit-animation-duration: 1s;
  animation-duration: 1s;
  -webkit-animation-fill-mode: both;
  animation-fill-mode: both;
}

@-webkit-keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@keyframes fadeInDown {
  0% {
    opacity: 0;
    -webkit-transform: translate3d(0, -100%, 0);
    transform: translate3d(0, -100%, 0);
  }
  100% {
    opacity: 1;
    -webkit-transform: none;
    transform: none;
  }
}

@-webkit-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@-moz-keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.fadeIn {
  opacity: 0;
  -webkit-animation: fadeIn ease-in 1;
  -moz-animation: fadeIn ease-in 1;
  animation: fadeIn ease-in 1;

  -webkit-animation-fill-mode: forwards;
  -moz-animation-fill-mode: forwards;
  animation-fill-mode: forwards;

  -webkit-animation-duration: 0.5s;
  -moz-animation-duration: 0.5s;
  animation-duration: 0.5s;
}


.fadeIn.first {
  -webkit-animation-delay: 0.4s;
  -moz-animation-delay: 0.4s;
  animation-delay: 0.4s;
}

.fadeIn.second {
  -webkit-animation-delay: 0.6s;
  -moz-animation-delay: 0.6s;
  animation-delay: 0.6s;
}

.fadeIn.third {
  -webkit-animation-delay: 0.8s;
  -moz-animation-delay: 0.8s;
  animation-delay: 0.8s;
}

.fadeIn.fourth {
  -webkit-animation-delay: 1s;
  -moz-animation-delay: 1s;
  animation-delay: 1s;
}
</style>