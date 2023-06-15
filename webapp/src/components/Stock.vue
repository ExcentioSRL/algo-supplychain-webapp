<!-- The tuple that represent a stock in the table -->
<template>
<main id="stock">
    <h4 class="uuid">{{ stock?.uuid }}</h4>
    <h4 class="producer">{{ stock?.producer }}</h4>
    <h4 class="status">{{ stock?.status }}</h4>
    <button @click="generateQRCode">Genera QR-Code</button>
</main>
</template>

<script lang="ts">
import { StockClass, Status} from "@/types/stock"
export default{
    name: "Stock",
    props: {
        stock: {
            type: StockClass,
            required: true,
        },
        odd: {
            type: Boolean,
            required: true,
        }
    },
    data(){
        return{
            color_status: this.stock?.status == Status.owned ? "blue" : "red",
            color_background: this.odd == false ? "#BDC9C5" : "white"
        }
    },
    methods:{
        generateQRCode(){
            //todo
        }
    }
}
</script>

<style lang="scss" scoped>
#stock{
    align-items: center;
    padding: 2rem;
    display: flex;
    flex-direction: row;
    background-color: v-bind(color_background);
    border-bottom: 1px solid #a6b1ad;
    //width: 150%;
    h4{
        color: black;
        position: absolute;
        font-weight: 500;
        padding-top: 0.25rem;
    }
    .uuid{
       left: 22.5%; 
    }
    .producer{
        left: 40%;
    }
    .status{
        color: v-bind(color_status);
        left: 62.5%;
    }
    button{
        background-color: green;
        color: white;
        border-radius: 5px;
        padding: 0.75rem;
        position: absolute;
        align-self: center;
        right: 10%;
    }
}
</style>