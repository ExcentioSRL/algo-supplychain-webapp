<template>
    <div id="stock">
        <h4 class="uuid">{{ stock?.id }}</h4>
        <h4 class="producer">{{ stock?.producer }}</h4>
        <h4 class="owner">{{ stock?.owner }}</h4>
        <h4 class="status">{{ stock?.status }}</h4>
        <button @click="addRequest(stock)">Create request</button>
    </div>
</template>

<script lang="ts" setup>
import { createRequest } from '@/api_calls/requests';
import { useDataStore } from '@/stores/store';
import { Status, StockClass } from '@/types/stock';

//const emit = defineEmits(['approveRequest'])
const props = defineProps({
    stock: {
        type: StockClass,
        required: true,
    },
    odd: {
        type: Boolean,
        required: true,
    },
    key: {
        type: Number,
        required: true
    }
})

const store = useDataStore();

const color_background = props.odd === true ? "white" : "#c9d4e2"
const color_button = props.stock.status === Status.owned ? "green" : "grey"
const clickbable_button = props.stock.status === Status.owned ? "pointer" : "default"

function addRequest(stock : StockClass){
    if(stock.status === Status.owned){
        createRequest(stock.id,stock.owner!,store.data.pIva)
    }
}
</script>

<style lang="scss" scoped>
#stock{
    align-items: center;
    min-width: 100%;
    padding: 2rem;
    display: flex;
    flex-direction: row;
    background-color: v-bind(color_background);
    border-bottom: 1px solid #a6b1ad;
    h4{
        color: black;
        position: absolute;
        font-weight: 500;
        padding-top: 0.25rem;
    }
    .uuid{
       left: 20%; 
       /*
       @media(max-width:1450px){
          left: 25%;
       } 
       */
    }
    .producer{
        left: 35%;
        /*
        @media(max-width:1450px){
          left: 40%;
        }
         */
    }
    .owner{
        left: 55%;
    }
    .status{
        color: v-bind(color_button);
        left: 70%;
        /*
        @media(max-width:1450px){
          left: 60%;
        }
         */
    }

    button{
        background-color: v-bind(color_button);
        color: white;
        border-radius: 5px;
        padding: 0.75rem;
        width: 10rem;
        position: absolute;
        left: 86%;
        cursor: v-bind(clickbable_button);
    }
}
</style>