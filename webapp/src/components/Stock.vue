<!-- The tuple that represent a stock in the table -->
<template>
<div id="stock">
    <h4 class="uuid">{{ stock?.id }}</h4>
    <h4 class="producer">{{ stock?.producer }}</h4>
    <h4 class="status">{{ stock?.status }}</h4>
    <h4 class="requester">{{ stock?.requester }}</h4>
    <button v-if="stock.status === Status.requested_by" @click="approveRequest(stock)">Handle request</button>
    <button v-else-if="stock.status === Status.owned" @click="generateQRCode">Generate QR-Code</button>
    <button v-else @click="cancelRequest(stock)">Cancel request</button>
</div>
</template>

<script lang="ts" setup>
import { StockClass, Status, StockStyle} from "@/types/stock";

const emit = defineEmits(['approveRequest'])
const props = defineProps({
    stock: {
        type: StockClass,
        required: true,
    },
    odd: {
        type: Boolean,
        required: true,
    },
    styling: {
        type: StockStyle,
        required: true,
    },
    key: {
        type: Number,
        required: true
    }
})

const color_background = props.odd === true ? "white" : "#c9d4e2"
const color_button =  props.styling?.color_button
const color_writing =  props.styling?.color_writing


function approveRequest(stock : StockClass){
    return emit('approveRequest', stock);
    /*
    todo: rimuove la stock dalla pagina
    */
}

function cancelRequest(stock: StockClass){

}

function generateQRCode() {
    //todo
    if (props.stock?.status === Status.owned) {
        console.log("stock:")
        console.log("uuid:" + props.stock?.id)
        console.log("producer:" + props.stock?.producer)
        console.log("status:" + props.stock?.status)
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
    .status{
        color: v-bind(color_writing);
        left: 55%;
        /*
        @media(max-width:1450px){
          left: 60%;
        }
         */
    }
    .requester{
        left: 70%;
        /*
        @media(max-width:1450px){
          left: 75%;
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
        cursor: pointer;
    }
}
</style>