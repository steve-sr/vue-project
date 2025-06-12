<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <b>Projects App</b>
  </header>

  <RouterView />
</template>

<style scoped>
@import url("https://fonts.googleapis.com/css2?family=Roboto&display=swap");

* {
  font-family: "Roboto", sans-serif;
}

header {
  padding: 20px 10px;
  text-align: left;
  font-size: 1.2rem;
  color: #2361e7;
  background-color: #191e24;
}
</style>
