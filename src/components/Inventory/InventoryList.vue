<script setup lang="ts">
import { useVirtualizer } from '@tanstack/vue-virtual'
import { computed, onBeforeUnmount, onMounted, ref } from 'vue'

import { useInventoryStore } from '@/store/inventory'
import InventoryItem from '@/components/Inventory/InventoryItem.vue'
import InventorySummary from './InventorySummary.vue'

const { items, getQuantity } = useInventoryStore()

const scrollParentRef = ref<HTMLElement | null>(null)
const isMobile = ref(false)

const updateIsMobile = () => {
    isMobile.value = window.matchMedia('(max-width: 430px)').matches
}

onMounted(() => {
    updateIsMobile()
    window.addEventListener('resize', updateIsMobile, { passive: true })
})

onBeforeUnmount(() => {
    window.removeEventListener('resize', updateIsMobile)
})

const rowVirtualizer = useVirtualizer(
    computed(() => ({
        count: items.length,
        getScrollElement: () => scrollParentRef.value,
        estimateSize: () => (isMobile.value ? 320 : 220),
        overscan: 6,
        lanes: isMobile.value ? 2 : 1,
        getItemKey: (index) => items[index]?.id ?? index,
    })),
)

const virtualItems = computed(() => rowVirtualizer.value.getVirtualItems())
const totalSize = computed(() => rowVirtualizer.value.getTotalSize())

const measureElement = (el: unknown) =>
    rowVirtualizer.value.measureElement(el as HTMLElement | null)
</script>

<template>
    <div class="list" ref="scrollParentRef">
        <div class="listInner" :style="{ height: `${totalSize}px` }">
            <div
                v-for="virtualRow in virtualItems"
                :key="String(virtualRow.key)"
                class="virtualRow"
                :data-index="virtualRow.index"
                :style="{
                    transform: `translateY(${virtualRow.start}px)`,
                    left: isMobile ? `${virtualRow.lane * 50}%` : '0%',
                    width: isMobile ? '50%' : '100%',
                }"
                :ref="measureElement"
            >
                <InventoryItem
                    v-memo="[
                        items[virtualRow.index].id,
                        getQuantity(items[virtualRow.index].id),
                    ]"
                    :item="items[virtualRow.index]"
                />
            </div>
        </div>
    </div>

    <div class="summary">
        <InventorySummary />
    </div>
</template>

<style scoped>
.list {
  max-height: 70vh;
  overflow-y: auto;
  width: 100%;
  position: relative;
}

.listInner {
  width: 100%;
  position: relative;
}

.virtualRow {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  justify-content: center;
  /* делаем расстояние частью измеряемого размера */
  padding-bottom: 12px;
  box-sizing: border-box;
}

@media (max-width: 430px) {
  .virtualRow {
    justify-content: stretch;
    padding: 6px;
  }
}
</style>