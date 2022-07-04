<template>
  <div id="cpr-loc">
    <span id="csc">Made with ❤ in 长沙</span>
    <a id="coordinates"
       href="https://map.baidu.com/search/%E9%95%BF%E6%B2%99%E5%B8%82/@12573169,3258221.75,12z?querytype=s&da_src=shareurl&wd=%E9%95%BF%E6%B2%99&c=187&src=0&pn=0&sug=0&l=12&b=(12562218.84,2528135.51;12685098.84,2587527.51)&from=webmap&biz_forward=%7B%22scaler%22:1,%22styles%22:%22pl%22%7D&device_ratio=1">28
      °11′49〃N,112 °58′42〃E
    </a>
  </div>
  <div id="cpr-content" style="text-align: center;">2022&copy; Copyright&nbsp;Zuma-Cai&nbsp;祖玛菜&nbsp;&nbsp;&nbsp;
  </div>
  <div id="cpr-author">
    <a target="_blank" class="author-item" href="https://gitee.com/crinal-fan">@crinal-fan</a>&nbsp;&nbsp;&nbsp;
    <a target="_blank" class="author-item" href="https://gitee.com/csu_lwj_gitee">@csu_lwj_gitee</a>&nbsp;&nbsp;&nbsp;
    <a target="_blank" class="author-item" href="https://gitee.com/wjh32300756">@wjh</a>&nbsp;&nbsp;&nbsp;
    <a target="_blank" class="author-item" href="https://gitee.com/hixs">@Hixs</a>&nbsp;&nbsp;&nbsp;
    <a target="_blank" class="author-item" href="https://gitee.com/Kwanhooo">@Kwanhooo</a>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer"
}
</script>

<style scoped>
#cpr-loc {
  text-align: center;
}

#csc {
  margin-left: 160px;
  font-family: 'Segoe UI Emoji', emoji;
  font-size: 15px;
}

#coordinates {
  font-size: 10px;
  text-align: center;
  color: #007BFF;
  font-style: italic;
  font-weight: normal;
  padding-left: 10px;
}

#cpr-content {
  text-align: center;
  font-family: var(--font-family-sans-serif);
  font-size: 10px;
  font-style: italic;
  margin-top: 5px;
}

#cpr-author {
  text-align: center;
  font-family: var(--font-family-sans-serif);
  color: #007BFF;
  font-style: italic;
  font-weight: bold;
}

.author-item {
  color: dimgray;
  font-size: 5px;
}
</style>