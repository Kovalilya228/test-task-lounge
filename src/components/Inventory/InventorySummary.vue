<script setup lang="ts">
import { useInventoryStore } from '@/store/inventory'
import { storeToRefs } from 'pinia'
import { computed } from 'vue'
const { totalCount, totalWeight } = storeToRefs(useInventoryStore())

const round1 = (n: number) => Math.round(n * 10) / 10
const formattedTotalWeight = computed(() => round1(totalWeight.value))
</script>

<template>
    <div class="summary">
        <div class="row">
            <span>Всего предметов:</span>
            <span>{{ totalCount }}</span>
        </div>

        <div class="row">
            <span>Общий вес:</span>
            <span>{{ formattedTotalWeight }}</span>
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