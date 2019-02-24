<template>
  <div>
    <h1>Opps!</h1>
    <h3>The {{resource}} is not found.</h3>
    <router-link :to="{name:'Dashboard'}">Go to Dashboard Page</router-link>
  </div>
</template>

<script>
export default {
  props: {
    resource: {
      type: String,
      required: true
    }
  }
};
</script>

