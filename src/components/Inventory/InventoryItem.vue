<script setup lang="ts">
import type { Item } from '@/types/inventory'
import { useInventoryStore } from '@/store/inventory'
import { computed, ref } from 'vue';

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

const imgFailed = ref(false)
const onImgError = () => {
    imgFailed.value = true
}

const roundFirstDigit = (n: number) => Math.round(n * 10) / 10
const totalItemWeight = computed(() => roundFirstDigit(props.item.weight * quantity.value))

</script>

<template>
    <div class="item">
        <div v-if="imgFailed" class="imageFallback" aria-hidden="true" />
        <img
            v-else
            :src="item.image"
            class="image"
            alt="item image"
            loading="lazy"
            decoding="async"
            @error="onImgError"
        >
        <div class="right">
            <div class="info">
                <div class="name">{{ item.name }}</div>
                <div class="meta">
                    <span class="metaRow">
                        <span class="metaLabel">Вес:</span>
                        <span class="metaValue">{{ totalItemWeight }}</span>
                    </span>
                    <span class="metaRow">
                        <span class="metaLabel">Количество:</span>
                        <span class="metaValue">{{ quantity }}</span>
                    </span>
                </div>
            </div>

            <div class="actions">
                <template v-if="quantity > 0">
                    <button class="minus" @click="decrement(item.id)">-</button>
                    <button class="plus" @click="increment(item.id)">+</button>
                    <button class="delete" @click="removeItem(item.id)">Удалить</button>
                </template>
                <template v-else>
                    <button class="add" @click="increment(item.id)">Добавить</button>
                </template>
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
        width: 100%;
        .image {
            max-width: 36vw;
            max-height: 150px;
            align-self: center;
        }
        .imageFallback {
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
        .actions {
            min-height: 44px;
        }
    }
}
.meta {
    display: flex;
    flex-direction: column;
    gap: 4px;
    min-height: 36px;
    min-width: 150px;
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
.imageFallback {
    width: 200px;
    height: 150px;
    border: 1px solid rgba(0, 0, 0, 0.15);
    border-radius: 8px;
    background: linear-gradient(135deg, rgba(0,0,0,0.04), rgba(0,0,0,0.08));
}
.meta {
    display: flex;
    align-items: baseline;
    white-space: nowrap;
}
.metaLabel {
    margin-right: 6px;
}
.metaValue {
    display: inline-block;
    text-align: right;
    font-variant-numeric: tabular-nums;
}
.metaValueQty {
    min-width: 2ch;
}
.metaValueWeight {
    min-width: 4ch;
}
.actions {
    display: flex;
    gap: 10px;
    min-height: 34px;
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