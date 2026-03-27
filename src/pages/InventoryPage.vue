<script setup lang="ts">
import InventoryList from '@/components/Inventory/InventoryList.vue'
</script>

<template>
  <div class="page">
    <h1 class="title">
        Your inventory
    </h1>
    <InventoryList/>
  </div>

  
</template>

<style scoped>
.page {
  max-width: 800px;
  margin: 20px auto;
  padding: 16px;
  font-family: Arial, sans-serif;
}

.title {
  font-size: 24px;
  margin-bottom: 16px;
  text-align: center;
}
</style>