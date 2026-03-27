<script setup lang="ts">
import type { Item } from '@/types/inventory'
import { useInventoryStore } from '@/store/inventory'
import { computed } from 'vue';

const props = defineProps<{
    item: Item
}>()

const {
    increment,
    decrement,
    getQuantity,
    removeItem,
} = useInventoryStore()

const quantity = computed(() => getQuantity(props.item.id))

</script>

<template>
    <div class="item">
        <img :src="item.image" class="image" alt="item image">
        <div class="right">
            <div class="info">
                <div class="name">{{ item.name }}</div>
                <div class="meta">
                    Вес: {{ Math.round(item.weight * quantity * 10) / 10 }} | Количество: {{ quantity }}
                </div>
            </div>

            <div class="actions" v-if="quantity > 0">
                <button class="minus" @click="decrement(item.id)">-</button>
                <button class="plus" @click="increment(item.id)">+</button>
                <button class="delete" @click="removeItem(item.id)">Удалить</button>
            </div>
            <div v-else>
                <button class="add" @click="increment(item.id)">Добавить</button>
            </div>
        </div>
        
    </div>
</template>

<style scoped>
.item {
    display: flex;
    gap: 10px;
    max-width: 100%;
    @media (max-width: 430px) {
        .image {
            max-width: 36vw;
            max-height: 150px;
            align-self: center;
        }
        flex-direction: column;
        height: 100%;
        border: 1px solid black;
        padding: 5px;
        box-sizing: border-box;
        border-radius: 6px;
        .name {
            min-height: 36px;
        }
        .info {
            margin-bottom: 10px;
        }
        button {
            padding: 6px 8px;
        }
        .meta {
            min-height: 36px;
        }
    }
}
.right {
    display: flex;
    flex-direction: column;
    justify-content: space-around;
}
.name {
    margin-bottom: 10px;
}
.image {
    width: 200px;
    height: 150px;
    object-fit: contain;
}
.actions {
    display: flex;
    gap: 10px;
}
button {
    background-color: unset;
    border: 1px solid grey;
    border-radius: 7px;
    padding: 2px 6px;
    cursor: pointer;
}
button.minus {
    background-color: pink;
}
button.plus {
    background-color: lightgreen;
}
button.delete {
    background-color: red;
    color: white;
}
button.add {
    background-color: orange;
    color: white;
}
</style>