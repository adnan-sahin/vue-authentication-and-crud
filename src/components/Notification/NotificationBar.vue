<template>
  <div>
    <!-- <transition name="fade">
      <div v-if="show" class="bar" :class="notificationClass">
        <span @click="clear" class="close">X</span>
        {{ item.id +" : " +item.message}}
      </div>
    </transition>-->
    <v-snackbar v-model="show" :bottom="true" :right="true">
      {{ item.id +" : " +item.message}}
      <v-btn :color="item.type" flat @click="clear">Close</v-btn>
    </v-snackbar>
  </div>
</template>

<script>
import { mapActions } from "vuex";
export default {
  props: {
    item: { type: Object, required: true }
  },
  data() {
    return {
      timeout: null,
      show: false
    };
  },
  computed: {
    notificationClass() {
      return `text-${this.item.type}-bar`;
    }
  },
  methods: {
    ...mapActions("notification", ["remove"]),
    clear() {
      this.remove(this.item);
    }
  },
  mounted() {
    this.show = true;
    this.timeout = setTimeout(() => {
      this.remove(this.item).then(() => {
        this.show = false;
      });
    }, 4000);
  },
  beforeDestroy() {
    clearTimeout(this.timeout);
  }
};
</script>

<style scoped>
.bar {
  padding: 15px;
  margin: 10px auto;
  color: white;
  text-align: center;
  font-size: 14px;
  box-shadow: 2px 2px 10px gray;
  font-family: inherit;
  background-color: #323232;
  color: white;
  border-radius: 4px;
}
.text-error-bar {
  background-color: #e53935;
}
.text-success-bar {
  background-color: #43a047;
}

.close {
  font-size: 14px;
  vertical-align: top;
  outline: none;
  color: white;
  display: inline-block;
  margin: -10px;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
  transition: opacity 0.5s;
}
.v-btn {
  outline: none;
}
</style>
