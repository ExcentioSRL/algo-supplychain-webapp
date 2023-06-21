<!-- The tuple that represent a stock in the table -->
<template>
<div id="stock">
    <h4 class="uuid">{{ stock?.uuid }}</h4>
    <h4 class="producer">{{ stock?.producer }}</h4>
    <h4 class="status">{{ stock?.status }}</h4>
    <h4 class="requester">{{ stock?.requester }}</h4>
    <button v-if="stock.status === requested_by" @click="approveRequest(stock)">Handle request</button>
    <button v-else @click="generateQRCode">Generate QR-Code</button>
</div>
</template>

<script lang="ts">
import { StockClass, Status, StockStyle} from "@/types/stock";
export default{
    name: "Stock",
    emits: ['approveRequest'],
    props: {
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
    },
    data(){
        return {
            color_background: this.odd === true ? "white" : "#c9d4e2",
            color_button : this.styling?.color_button,
            color_writing : this.styling?.color_writing,
            clickable_button : this.styling?.clickable_button,

            requested_by : Status.requested_by
        }
    },
    methods:{
        generateQRCode(){
            //todo
            if(this.stock?.status === Status.owned){
                console.log("stock:")
                console.log("uuid:" + this.stock?.uuid)
                console.log("producer:" + this.stock?.producer)
                console.log("status:" + this.stock?.status)
            }
        },
        approveRequest(stock : StockClass){
            return this.$emit('approveRequest',stock);
            /*
            todo: rimuove la stock dalla pagina
            */
        }
    },
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
    h4{
        color: black;
        position: absolute;
        font-weight: 500;
        padding-top: 0.25rem;
    }
    .uuid{
       left: 20%; 
       @media(max-width:1450px){
          left: 25%;
       }

    }
    .producer{
        left: 35%;
        @media(max-width:1450px){
          left: 40%;
        }
    }
    .status{
        color: v-bind(color_writing);
        left: 55%;
        @media(max-width:1450px){
          left: 60%;
        }
    }
    .requester{
        left: 70%;
        @media(max-width:1450px){
          left: 75%;
        }
    }

    button{
    background-color: v-bind(color_button);
    color: white;
    border-radius: 5px;
    padding: 0.75rem;
    width: 10rem;
    position: absolute;
    left: 86%;
    cursor: v-bind(clickable_button);
    @media(min-width: 1150px) and (max-width: 1450px){
        left: 90%;
    }
    @media(max-width: 1150px){
    }
    }
}
</style>