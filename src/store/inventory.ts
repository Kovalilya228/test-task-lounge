import { defineStore } from 'pinia'
import type { InventoryItem, Item } from '@/types/inventory'
import { ref, computed } from 'vue'

export const useInventoryStore = defineStore(
    'inventory',
    () => {
        const items = ref<Item[]>([
            {
                id: '1',
                name: 'Футболка',
                weight: 1,
                image: 'https://www.shutterstock.com/shutterstock/photos/2675875683/display_1500/stock-photo-black-t-shirt-short-sleeve-mockup-2675875683.jpg',
              },
              {
                id: '2',
                name: 'Пистолет',
                weight: 3,
                image: 'https://www.shutterstock.com/shutterstock/photos/2579639335/display_1500/stock-photo-modern-semi-automatic-pistol-isolate-on-a-white-background-armament-for-the-army-and-police-short-2579639335.jpg',
              },
              {
                id: '3',
                name: 'Ключи от машины',
                weight: 0.3,
                image: 'https://www.shutterstock.com/shutterstock/photos/2699923539/display_1500/stock-vector-car-key-remote-icon-sign-vector-2699923539.jpg',
              },
              {
                id: '4',
                name: 'Футболка 2',
                weight: 2,
                image: 'https://www.shutterstock.com/shutterstock/photos/2675875683/display_1500/stock-photo-black-t-shirt-short-sleeve-mockup-2675875683.jpg',
              },
              {
                id: '5',
                name: 'Пистолет 2',
                weight: 1,
                image: 'https://www.shutterstock.com/shutterstock/photos/2579639335/display_1500/stock-photo-modern-semi-automatic-pistol-isolate-on-a-white-background-armament-for-the-army-and-police-short-2579639335.jpg',
              },
              {
                id: '6',
                name: 'Ключи от машины 2',
                weight: 0.7,
                image: 'https://www.shutterstock.com/shutterstock/photos/2699923539/display_1500/stock-vector-car-key-remote-icon-sign-vector-2699923539.jpg',
              },
        ])

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