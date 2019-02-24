<template>
  <div class="container">
    <NotificationBar
      v-for="(notification,index) in notifications"
      :key="index"
      :item="notification"
    ></NotificationBar>
  </div>
</template>

<script>
import NotificationBar from "./NotificationBar.vue";

export default {
  components: {
    NotificationBar
  },
  computed: {
    notifications() {
      return this.$store.getters["notification/notifications"];
    }
  }
};
</script>
 
<style scoped>
.container {
  position: fixed;
  bottom: 10px;
  right: 10px;
  width: 380px;
}
</style>
