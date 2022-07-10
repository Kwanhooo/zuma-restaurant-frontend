<template>
  <div id="mobile-order">
    <el-tabs tab-position="top" type="border-card" id="mobile-order-tabs">
      <el-tab-pane label="进行中" class="mobile-order-pane">
        <template #label>
        <span class="custom-tabs-label">
          <span>🏃‍ 进行中</span>
        </span>
        </template>
        <OnGoingOrder></OnGoingOrder>
      </el-tab-pane>
      <el-tab-pane label="历史订单">
        <template #label>
        <span class="custom-tabs-label">
          <span>⏰ 历史订单</span>
        </span>
        </template>
        <CustomerHistoryOrder></CustomerHistoryOrder>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import OnGoingOrder from "@/components/mobile/OnGoingOrder";
import CustomerHistoryOrder from "@/components/mobile/CustomerHistoryOrder";

export default {
  components: {
    CustomerHistoryOrder,
    OnGoingOrder,
  },

  name: "riderMain",
  data() {
    return {};
  },
  methods: {
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
    }
  }
}
</script>

<style scoped>

.mobile-order-pane {
  padding: 0;
  height: calc(100vh - 180px);
}

#mobile-order {
  height: 100%;

  padding: 0 10px;
  background: white;
  border-radius: 20px 20px 20px 20px;
  box-shadow: 0 1px 15px rgba(0, 0, 0, 0.2);
  margin: 4px 6px 10px 6px;
  width: auto;
}

#mobile-order-tabs {
  border-radius: 20px 20px 20px 20px;
  margin-top: 0.3rem;
  height: calc(100vh - 7.1rem);
}
</style>