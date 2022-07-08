<template>
  <div id="mobile-frame">
    <router-view></router-view>
    <div id="mobile-nav-bar">
      <div class="item">
        <a class="active" @click.prevent="handleClickNav('/m/home')">
          <svg t="1657100621387" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="7870" width="200" height="200">
            <path
                d="M947.2 416L576 102.4c-35.2-30.4-88-30.4-123.2 0L76.8 416c-8 6.4-12.8 14.4-12.8 25.6 0 17.6 14.4 32 32 32 8 0 16-3.2 20.8-8l11.2-9.6v356.8c0 72 54.4 131.2 123.2 131.2h521.6c67.2 0 123.2-59.2 123.2-131.2V456l9.6 8c6.4 4.8 12.8 8 22.4 8 17.6 0 32-14.4 32-32 0-8-4.8-17.6-12.8-24zM448 880V656c0-17.6 14.4-32 32-32h64c17.6 0 32 14.4 32 32v224h-128z m384-67.2c0 36.8-27.2 67.2-60.8 67.2H640V656c0-52.8-43.2-96-96-96h-64c-52.8 0-96 43.2-96 96v224h-131.2c-33.6 0-60.8-30.4-60.8-67.2V403.2L492.8 152c11.2-9.6 28.8-9.6 41.6 0L832 401.6v411.2z"
                fill="#000000" p-id="7871"></path>
          </svg>
          <span>主页</span>
        </a>
      </div>
      <div class="item">
        <a @click.prevent="handleClickNav('/m/cart')">
          <svg t="1657100656412" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="9667" width="200" height="200">
            <path
                d="M846.35916 725.259058l-491.37117 0c-13.794168 0-26.936489-12.44545-28.705785-27.183106l-51.509141-362.723162-29.127388-168.117952c-5.294586-43.370787-43.400462-77.285201-86.785575-77.285201l-38.540781 0c-15.869433 0-28.77844 12.910031-28.77844 28.77844s12.910031 28.77844 28.77844 28.77844l38.540781 0c14.302751 0 27.966958 12.851703 29.851888 28.053939l29.184693 168.726819 51.305503 361.272114c5.250584 43.313481 42.921555 77.226872 85.784782 77.226872l491.37117 0c15.869433 0 28.77844-12.910031 28.77844-28.77844C875.138624 738.168066 862.228593 725.259058 846.35916 725.259058z"
                p-id="9668" fill="#000000"></path>
            <path
                d="M914.563542 207.269647c-15.143908-17.145495-36.001959-26.574239-58.688657-26.574239L332.084351 180.695409c-15.869433 0-28.77844 12.910031-28.77844 28.77844s12.910031 28.77844 28.77844 28.77844l523.790534 0c6.179746 0 11.43033 2.407839 15.607466 7.136537 6.208399 7.020904 9.370415 18.538215 8.064676 29.358655l-47.664579 272.730545c-1.769296 14.534018-15.637142 26.51591-30.896684 26.602891l-410.28541 30.258141c-7.658424 0.551562-14.620999 4.03285-19.640316 9.863648-5.033643 5.802146-7.484462 13.229303-6.919597 20.887726 1.087774 14.969946 13.678534 26.689872 28.662807 26.689872 0.681522 0 1.407046-0.028653 2.118244-0.086981l408.153864-30.17116c42.935881 0 80.534198-33.217543 85.697801-75.601862l47.694255-272.730545C939.919023 254.586302 931.941328 226.88131 914.563542 207.269647z"
                p-id="9669" fill="#000000"></path>
            <path
                d="M362.821399 934.049339c32.536021 0 59.022255-26.487258 59.022255-59.007929 0-32.550347-26.487258-59.037605-59.022255-59.037605s-59.022255 26.487258-59.022255 59.037605C303.798121 907.563104 330.285379 934.049339 362.821399 934.049339z"
                p-id="9670" fill="#000000"></path>
            <path
                d="M786.364765 934.049339c32.521694 0 59.007929-26.487258 59.007929-59.007929 0-32.550347-26.487258-59.037605-59.007929-59.037605-32.550347 0-59.036581 26.487258-59.036581 59.037605C727.328183 907.563104 753.814418 934.049339 786.364765 934.049339z"
                p-id="9671" fill="#000000"></path>
          </svg>
          <span>购物车</span>
        </a>
      </div>
      <div class="item">
        <a @click.prevent="handleClickNav('/m/order')">
          <svg t="1657113128054" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="4866" width="200" height="200">
            <path
                d="M821.333333 256a32 32 0 0 1 64 0v565.333333c0 64.8-52.533333 117.333333-117.333333 117.333334H256c-64.8 0-117.333333-52.533333-117.333333-117.333334V202.666667c0-64.8 52.533333-117.333333 117.333333-117.333334h597.333333a32 32 0 0 1 0 64H256a53.333333 53.333333 0 0 0-53.333333 53.333334v618.666666a53.333333 53.333333 0 0 0 53.333333 53.333334h512a53.333333 53.333333 0 0 0 53.333333-53.333334V256zM341.333333 437.333333a32 32 0 0 1 0-64h341.333334a32 32 0 0 1 0 64H341.333333z m0 170.666667a32 32 0 0 1 0-64h213.333334a32 32 0 0 1 0 64H341.333333z"
                p-id="4867" fill="#000000"></path>
          </svg>
          <span>订单</span>
        </a>
      </div>

      <div class="item">
        <a @click.prevent="handleClickNav('/m/me')">
          <svg t="1657113064773" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg"
               p-id="3093" width="200" height="200">
            <path
                d="M159.973123 928.016126c-10.664875 0-20.985721-5.332437-27.178229-14.965228-9.460776-14.965228-4.988409-34.74685 9.976818-44.207626 5.504452-3.440282 136.579204-85.491013 240.647741-90.651436l0.516042 0L383.935495 760.302369c-120.409877-49.884092-199.708382-175.626407-199.708382-320.462288 0-189.55955 145.867966-343.856207 325.278683-343.856207s325.278683 154.124643 325.278683 343.856207c0 144.663867-75.858223 267.137914-195.064001 318.398119l0 20.297665c104.756593 9.460776 234.799261 86.695112 240.475727 89.96338 15.137242 9.116748 20.125651 28.726356 11.008903 43.863598-9.116748 15.137242-28.726356 20.125651-43.863598 11.008903-1.204099-0.688056-126.258357-74.826138-214.157568-81.362674l-25.458088 0c-17.717453 0-31.994625-14.277171-31.994625-31.994625l0-73.966068c0-13.589115 8.600706-25.802117 21.673778-30.274483 105.44465-36.294977 173.390223-140.707542 173.390223-266.277843C770.967243 285.543423 653.825634 159.973123 509.67781 159.973123c-144.147825 0-261.289434 125.570301-261.289434 279.866958 0 125.742315 71.385856 233.251134 177.518562 267.653956 13.245087 4.300353 22.18982 16.513355 22.18982 30.446498l0 72.245926c0 17.717453-14.277171 31.994625-31.994625 31.994625l-30.96254 0c-85.835041 4.300353-206.760961 79.986561-207.96506 80.846632C171.842096 926.295985 165.821603 928.016126 159.973123 928.016126z"
                p-id="3094" fill="#000000"></path>
          </svg>
          <span>我的</span>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
window.onload = function () {
  // 阻止双击放大
  var lastTouchEnd = 0;
  document.addEventListener('touchstart', function (event) {
    if (event.touches.length > 1) {
      event.preventDefault();
    }
  });
  document.addEventListener('touchend', function (event) {
    var now = (new Date()).getTime();
    if (now - lastTouchEnd <= 300) {
      event.preventDefault();
    }
    lastTouchEnd = now;
  }, false);

  // 阻止双指放大
  document.addEventListener('gesturestart', function (event) {
    event.preventDefault();
  });

  const navigationOptions = [
    {
      name: '主页',
      color: '#5B37B7'
    },
    {
      name: '购物车',
      color: '#C9379D'
    },
    {
      name: '订单',
      color: '#E6A919'
    },
    {
      name: '我的',
      color: '#1892A6'
    }
  ];

  const links = document.querySelectorAll('div a');

  function handleClick(e) {
    e.preventDefault();
    links.forEach(link => {
      if (link.classList.contains('active')) {
        link.classList.remove('active');
      }
    });

    const name = this.textContent.trim().toLowerCase();
    const {color} = navigationOptions.find(item => item.name === name);

    const style = window.getComputedStyle(this);
    const hoverColor = style.getPropertyValue('--hover-c');
    if (color !== hoverColor) {
      this.style.setProperty('--hover-bg', `${color}20`);
      this.style.setProperty('--hover-c', color);
    }

    this.classList.add('active');
  }


  links.forEach(link => link.addEventListener('click', handleClick));
};

export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Mobile",
  data() {
    return {};
  },
  methods: {
    handleClickNav(to) {
      if (to !== this.$route.path) {
        this.$router.push(to);
      }
    }
  },
  mounted() {
    this.$router.push('/m/home');
  }
}
</script>

<style scoped>
/*@import url("https://fonts.googleapis.com/css?family=Open+Sans:700");*/

#mobile-frame {
  display: flex;
  flex-direction: column;
  width: 100vw;
  height: 100vh;
  /*background: #f3f6fd;*/
  overflow-y: hidden;
}


#mobile-nav-bar {
  flex-shrink: 0;
  width: 100%;
  display: flex;
  background: #ffffff;
  padding: 1rem 1.4rem;
  /*border-radius: 0 0 30px 30px;*/
  box-shadow: 0 1px 15px rgba(243, 246, 253, 0.1);
}

.item {
  left: 0;
  top: 0;
  right: 0;
  bottom: 0;
  margin: auto;
}


* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}


body {
  background: #5b37b7;
  color: #010101;

  min-height: 100vh;
  display: grid;
  place-items: center;
  font-family: "Open Sans", sans-serif;

  transition: background 0.2s ease-out;
}


a {
  color: inherit;
  text-decoration: none;
  margin: 0 0.2rem;

  display: flex;
  align-items: center;
  padding: 0.75rem 0.9rem;
  border-radius: 30px;

  position: relative;

  --hover-bg: #5b37b720;
  --hover-c: #5b37b7;
}


a svg {
  margin-right: -2.5rem;
  width: 28px;
  height: 28px;
  pointer-events: none;
  transition: margin 0.2s ease-out;
}


a span {
  /*font-size: 5px;*/
  opacity: 0;
  visibility: hidden;
  font-size: 0.9rem;
  margin-left: 0.9rem;
}


a:before {
  position: absolute;
  content: "";
  top: 50%;
  left: 0;
  width: 70px;
  height: 70px;
  border-radius: 50%;
  transform: translate(0%, -50%) scale(0);
  visibility: visible;
  opacity: 1;
}


a.active {
  background: var(--hover-bg);
  color: var(--hover-c);
}


a.active:before {
  background: var(--hover-c);
  opacity: 0;
  visibility: hidden;
  transform: translate(0%, -50%) scale(2);

  transition: all 0.4s ease-out;
}


a.active svg {
  margin-right: 0;
}


a.active span {
  visibility: visible;
  opacity: 1;
  transition: all 0.2s ease-out;
}

</style>