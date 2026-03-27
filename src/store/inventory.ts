import { defineStore } from 'pinia'
import type { InventoryItem, Item } from '@/types/inventory'
import { ref, computed } from 'vue'
import { getMockItems } from '@/data/items'

export const useInventoryStore = defineStore(
    'inventory',
    () => {
        const items = ref<Item[]>(getMockItems())

        const inventory = ref<InventoryItem[]>([])

        const inventoryMap = computed(() => {
            const map = new Map<string, InventoryItem>()
            for (const i of inventory.value) map.set(i.id, i)
            return map
        })

        const itemsMap = computed(() => {
            const map = new Map<string, Item>()
            for (const i of items.value) map.set(i.id, i)
            return map
        })

        const totalCount = computed(() => {
            return inventory.value.reduce((sum, item) => sum += item.quantity, 0)
        })

        const totalWeight = computed(() => {
            return inventory.value.reduce((sum, invItem) => {
                const item = itemsMap.value.get(invItem.id)
                if (!item) return sum
                return sum += invItem.quantity * item.weight
            }, 0)
        })

        function getQuantity(id: string) {
            return inventoryMap.value.get(id)?.quantity ?? 0
        }

        function increment(id: string) {
            const existing = inventoryMap.value.get(id)
            if (existing) {
                existing.quantity++
            } else {
                inventory.value.push({id, quantity: 1})
            }
        }

        function removeItem(id: string) {
            inventory.value = inventory.value.filter(item => item.id !== id)
        }

        function decrement(id: string) {
            const existing = inventoryMap.value.get(id)
            if (!existing) return
            if (existing.quantity <= 1) {
                inventory.value = inventory.value.filter(item => item.id !== id)
            } else {
                existing.quantity --
            }
        }

        return {
            items,
            inventory,
            totalCount,
            totalWeight,
            getQuantity,
            removeItem,
            increment,
            decrement
        }
},
{
    persist: true,
})