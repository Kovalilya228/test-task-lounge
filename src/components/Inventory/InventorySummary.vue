<script setup lang="ts">
import { useInventoryStore } from '@/store/inventory'
import { storeToRefs } from 'pinia'
const { totalCount, totalWeight } = storeToRefs(useInventoryStore())
</script>

<template>
    <div class="summary">
        <div class="row">
            <span>Всего предметов:</span>
            <span>{{ totalCount }}</span>
        </div>

        <div class="row">
            <span>Общий вес:</span>
            <span>{{ totalWeight }}</span>
        </div>
  </div>
</template>

<style scoped>
.summary {
  margin-top: 20px;
  padding: 12px;

  border-top: 1px solid #ddd;

  display: flex;
  flex-direction: column;
  gap: 8px;

  font-weight: 500;
}

.row {
  display: flex;
  justify-content: space-between;
}
</style>