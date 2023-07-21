<!-- The tuple that represent a stock in the table -->
<template>
<div id="stock">
    <h4 class="uuid">{{ stock?.id }}</h4>
    <h4 class="producer">{{ stock?.producer }}</h4>
    <h4 class="owner">{{ stock.owner }}</h4>
    <h4 class="status">{{ stock?.status }}</h4>
    <h4 class="requester">{{ stock?.request?.requester }}</h4>
    <div class="action-buttons">
        <button class="generate-qr" @click="generateQRCode"><i class="material-icons">qr_code</i></button>
        <button class="approve-req-change-ownership" @click="approveRequestOrApproveChangeOwnership"><i class="material-icons">done</i></button>
        <button class="cancel-req" @click="cancelRequest"><i class="material-icons">close</i></button>
        <button class="delete-stock" @click="removeStock"><i class="material-icons">delete</i></button>
    </div>
</div>
</template>

<script lang="ts" setup> 
import { approveRequestSocket, changeStockOwnerSocket, deleteRequestSocket, generateQRSocket } from "@/api_calls/socket";
import { changeOwner, deleteStock } from "@/api_calls/stocks";
import { Stock, Status} from "@/types/stock";
import { useDataStore } from "@/stores/store";


const emit = defineEmits<{
    (event: 'updated_stock_list', stocks: Stock[]): void
}>()
const props = defineProps({
    stock: {
        type: Stock,
        required: true,
    },
    odd: {
        type: Boolean,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    key: {
        type: Number,
        required: true
    }
})

const color_background = props.odd === true ? "white" : "#c9d4e2"

const generate_qr_color = props.stock.status === Status.owned || props.stock.status === Status.requested_by? "black" : "grey"
const generate_qr_clickable =  props.stock.status === Status.owned || props.stock.status === Status.requested_by ? "pointer" : "default"

const delete_stock_color =  props.stock.status === Status.owned || props.stock.status === Status.requested_by ? "#8b0000" : "grey"
const delete_stock_clickable = props.stock.status === Status.owned  || props.stock.status === Status.requested_by ? "pointer" : "default"

const cancel_or_deny_req_color = ( props.stock.status === Status.requested && props.stock.request?.isApproved === false ) || props.stock.status === Status.requested_by ? "red" : "grey" 
const cancel_or_deny_req_clickable = (props.stock.status === Status.requested && props.stock.request?.isApproved === false) || props.stock.status === Status.requested_by ? "pointer" : "default"

const approve_req_color = props.stock.status === Status.requested_by || (props.stock.status === Status.requested && props.stock.request?.isApproved === true) ? "green" : "grey"
const approve_req_clickable = props.stock.status === Status.requested_by || (props.stock.status === Status.requested && props.stock.request?.isApproved === true) ? "pointer" : "default"

const store = useDataStore()

function removeStock(){
    deleteStock(props.stock.id)
    if(props.stock.status === Status.requested_by){
       deleteRequestSocket(props.stock.id).then(response => {
            return emit('updated_stock_list', response)
        }) 
    }
}

async function approveRequestOrApproveChangeOwnership(){
    if(props.stock.status === Status.requested_by){
        approveRequestSocket(props.stock.id).then(response => {
            return emit('updated_stock_list', response);
        })
    }else{
        await changeOwner(props.stock.id).then(res => {
            console.log("CIAO!")
            changeStockOwnerSocket(props.stock.id).then(response => {
                console.log("QUI: " + response.length)
                return emit('updated_stock_list', response);
            })
        })
        
    }
    
}

function cancelRequest(){
    deleteRequestSocket(props.stock.id).then(response => {
        return emit('updated_stock_list',response)
    })
}

function generateQRCode() {
    generateQRSocket().then(response => {
        //it returns the list of owners until that moment
    })
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
       left: 19%; 
       /*
       @media(max-width:1450px){
          left: 25%;
       } 
       */
    }
    .producer{
        left: 30%;
        /*
        @media(max-width:1450px){
          left: 40%;
        }
         */
    }
    .owner{
        
        left: 45%;
        /*
        @media(max-width:1450px){
          left: 60%;
        }
         */
    }
    .status{
        color: v-bind(color);
        left: 60%;
    }
    .requester{
        left: 75%;
        /*
        @media(max-width:1450px){
          left: 75%;
        }
        */
    }
    .action-buttons{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        width: 10rem;
        position: absolute;
        left: 85%;
        .generate-qr{
            color: v-bind(generate_qr_color);
            cursor: v-bind(generate_qr_clickable);
        }
        .approve-req-change-ownership{
            color: v-bind(approve_req_color);
            cursor: v-bind(approve_req_clickable);
        }
        .cancel-req{
            color: v-bind(cancel_or_deny_req_color);
            cursor: v-bind(cancel_or_deny_req_clickable);
        }
        .delete-stock{
            color: v-bind(delete_stock_color);
            cursor: v-bind(delete_stock_clickable);
        }
        
       /* button{
        background-color: v-bind(color);
        color: white;
        border-radius: 5px;
        padding: 0.75rem;
        width: 10rem;
        position: absolute;
        left: 87%;
        cursor: pointer;
        } */
    }
    
}
</style>