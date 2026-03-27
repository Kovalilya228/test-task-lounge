<script setup lang="ts">
import { useInventoryStore } from '@/store/inventory'
import InventoryItem from '@/components/Inventory/InventoryItem.vue'
import InventorySummary from './InventorySummary.vue'
const { items, getQuantity } = useInventoryStore()
</script>

<template>
    <div class="list">
        <InventoryItem 
        v-for="item in items"
        :key="item.id"
        :item="item"
        v-memo="[getQuantity(item.id)]"
        />
    </div>
    <div class="summary">
      <InventorySummary />
    </div>
</template>

<style scoped>
.list {
  display: flex;
  flex-direction: column;
  gap: 12px;
  align-items: center;
  max-height: 70vh;
  overflow-y: scroll;
  @media (max-width: 430px) {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
  }
}
</style>