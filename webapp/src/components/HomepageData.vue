<template>
    <div class="filters">
        <button class="all" @click="changeShowedList(0)">
          <h3>All</h3>
          <h3>{{ ntotal }}</h3>
        </button>
        <button class="stocks" @click="changeShowedList(1)">
          <h3>My Stocks</h3>
          <h3>{{ nstocks }}</h3>
        </button>
        <button class="my-requests" @click="changeShowedList(2)">
          <h3>My Requests</h3>
          <h3>{{ nmyrequests }}</h3>
        </button>
        <button class="others-requests" @click="changeShowedList(3)">
          <h3>Others Requests</h3>
          <h3>{{ nothersrequests }}</h3>
        </button>
      </div>
      <div class="sortButtons">
         <button class="sortID" @click="sortStocks('id')">
            <h2>ID</h2>
            <span class="material-icons">{{ icon[0] }}</span>
          </button>
          <button class="sortName" @click="sortStocks('producer')">
            <h2>Producer</h2>
            <span class="material-icons">{{ icon[1] }}</span>
          </button>
          <button class="sortStatus" @click="sortStocks('status')">
            <h2>Status</h2>
            <span class="material-icons">{{ icon[2] }}</span>
          </button>
          <button class="sortRequester" @click="sortStocks('requester')">
            <h2>Requester</h2>
            <span class="material-icons">{{ icon[3] }}</span>
          </button>
          <form class="search"> 
            <input class="searchInput" v-model="searchBarInput" type="text" id="query" name="q" placeholder="Search..."  @input="searchMyStocks">
            <span class="material-icons">search</span>
          </form>
        </div>
      <div class="allStocks">
        <div class="stocks" v-for="stock in showedStocksList">
           <Stock :stock=stock :odd="isElementOdd(showedStocksList, stock)" :color="createStockStyle(stock)" :key="key_stock" @approveRequest="removeStockFromStocks(stock)"/>
        </div>
      </div>
</template>

<script lang="ts" setup>
import { getStocks } from "@/api_calls/stocks";
import Stock from '@/components/StockHomepage.vue';
import { StockClass, Status } from "@/types/stock";
import { onBeforeMount, onUnmounted, ref } from "vue";
import { compareProducer, compareStatus, compareUuid, compareRequester } from "@/utils/compare"
import { useDataStore } from "@/stores/store"
//data
let showedStocksList = ref<StockClass[]>([])
let savedStocksList = ref<StockClass[]>([
    new StockClass(1, "Azienda1 S.r.l", Status.owned),
    new StockClass(982, "Azienda8 S.r.l", Status.requested_by, "Azienda3 S.r.l"),
    new StockClass(33, "Azienda5 S.r.l", Status.requested),
    new StockClass(25, "Azienda1 S.r.l", Status.owned),
    new StockClass(2, "Azienda3 S.r.l", Status.requested_by, "Azienda1 S.r.l"),
    new StockClass(3, "Azienda2 S.r.l", Status.requested_by, "Azienda3 S.r.l")
])
let searchBarInput = ref("");

let icon = ref(["arrow_drop_up", "arrow_drop_up", "arrow_drop_up", "arrow_drop_up"])
let whichSort = ref("")
let key_stock = ref(0)
let isSelected = ref([true, false, false, false])

let ntotal = ref(savedStocksList.value.length)
let nstocks = ref(savedStocksList.value.filter((stock) => stock.status === Status.owned).length)
let nmyrequests = ref(savedStocksList.value.filter((stock) => stock.status === Status.requested).length)
let nothersrequests = ref(savedStocksList.value.filter((stock) => stock.status === Status.requested_by).length)

let interval: any = null
const store = useDataStore();

//functions
function selectFilterColor(n: number) {
    return isSelected.value[n] ? "#3b5998" : "grey"
}

function searchMyStocks() {
    showedStocksList.value = showedStocksList.value.filter((stock) => {
        console.log("QUIII " + searchBarInput.value)
        if (searchBarInput.value === "") {
            return savedStocksList
        }
        return stock.id.toString().includes(searchBarInput.value) ||
            stock.producer.includes(searchBarInput.value) ||
            stock.status.includes(searchBarInput.value) ||
            stock.requester?.includes(searchBarInput.value)
    })
    updateNumbersInFilters()
    key_stock.value++;
}

function updateNumbersInFilters() {
    ntotal = ref(showedStocksList.value.length)
    nstocks = ref(showedStocksList.value.filter((stock) => stock.status === Status.owned).length)
    nmyrequests = ref(showedStocksList.value.filter((stock) => stock.status === Status.requested).length)
    nothersrequests = ref(showedStocksList.value.filter((stock) => stock.status === Status.requested_by).length)
}

function sortStocks(whichCliked: string) {
    if (whichCliked === whichSort.value) {
        if (whichCliked === "id") {
            changeArrowIcon(0)
            showedStocksList.value.reverse()
        } else if (whichCliked === "producer") {
            changeArrowIcon(1)
            showedStocksList.value.reverse()
        } else if (whichCliked === "status") {
            changeArrowIcon(2)
            showedStocksList.value.reverse()
        } else {
            changeArrowIcon(3)
            let stocks1: StockClass[];
            let stock2: StockClass[];
            stocks1 = showedStocksList.value.filter((stock) => stock.requester !== undefined);
            stocks1.reverse();
            stock2 = showedStocksList.value.filter((stock) => stock.requester === undefined);
            showedStocksList.value = stocks1.concat(stock2);
        }
    } else {
        if (whichCliked === "id") {
            showedStocksList.value.sort(compareUuid);
            showedStocksList.value.reverse();
            changeArrowIcon(0)
        } else if (whichCliked === "producer") {
            showedStocksList.value.sort(compareProducer);
            showedStocksList.value.reverse();
            changeArrowIcon(1)
        } else if (whichCliked === "status") {
            showedStocksList.value.sort(compareStatus);
            showedStocksList.value.reverse();
            changeArrowIcon(2)
        } else {
            showedStocksList.value.sort(compareRequester);
            changeArrowIcon(3)
        }
        whichSort.value = whichCliked;
    }

    key_stock.value++;
}

function isElementOdd(stocks: StockClass[], stock: StockClass): boolean {
    return stocks.indexOf(stock) % 2 === 0;
}

function changeShowedList(whichClicked: number) {
    switch (whichClicked) {
        case 0: {
            showedStocksList.value = savedStocksList.value
            isSelected.value[0] = true
            isSelected.value[1] = false
            isSelected.value[2] = false
            isSelected.value[3] = false
        }
            break;
        case 1: {
            showedStocksList.value = savedStocksList.value.filter((stock) => stock.status === Status.owned)
            isSelected.value[0] = false
            isSelected.value[1] = true
            isSelected.value[2] = false
            isSelected.value[3] = false
        }
            break;
        case 2: {
            showedStocksList.value = savedStocksList.value.filter((stock) => stock.status === Status.requested)
            isSelected.value[0] = false
            isSelected.value[1] = false
            isSelected.value[2] = true
            isSelected.value[3] = false
        }
            break;
        case 3: {
            showedStocksList.value = savedStocksList.value.filter((stock) => stock.status === Status.requested_by)
            isSelected.value[0] = false
            isSelected.value[1] = false
            isSelected.value[2] = false
            isSelected.value[3] = true
        }
            break;
    }
    key_stock.value++;
}

function changeArrowIcon(whichIcon: number) {
    if (icon.value[whichIcon] === "arrow_drop_up") {
        icon.value[whichIcon] = "arrow_drop_down"
    } else {
        icon.value[whichIcon] = "arrow_drop_up"
    }
}

function removeStockFromStocks(stock: StockClass) {
    savedStocksList.value.splice(savedStocksList.value.indexOf(stock), 1);
    key_stock.value++;
}

function createStockStyle(stock: StockClass): string {
    if (stock.status === Status.owned) {
        return 'green'
    } else if (stock.status === Status.requested) {
        return 'red'
    } else {
        return '#409fff'
    }
}

async function getAllStocks() {
    let myStocks: StockClass[] = savedStocksList.value;
    if (store.data.wallet !== "") {
        await getStocks().then(response => {
            myStocks = response.data
        })
    }
    return myStocks;
}


//lifecicle hooks
onBeforeMount(async () => {
    let newStocks: StockClass[] = await getAllStocks();
    interval = setInterval(async () => {
        newStocks = await getAllStocks();
        savedStocksList.value = newStocks
        showedStocksList.value = savedStocksList.value;
        updateNumbersInFilters()
        key_stock.value++;
    }, 5000) //chiamata ogni 5 secondi
    showedStocksList.value = savedStocksList.value
})
onUnmounted(() => {
    clearInterval(interval);
})
</script>

<style lang="scss" scoped>
.filters{
    display: flex;
    flex-direction: row;
    border-bottom: 2px solid #a6b1ad;
    margin-bottom: 2.5rem;
    margin-left: 2rem;
    width: 55%;
    
    h3{
      margin-left: 0.5rem;
      &+h3{
        background-color: #d9e4e0;
        padding: 5px;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 50%;
        width: 25px;
        height: 25px;
      } 
    }
    button{
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-bottom: 1rem;
      margin-left: 5rem;
    }
    .all{
      margin-left: 1rem;
      color: v-bind(selectFilterColor(0));
     
    }
    .stocks{
      color: v-bind(selectFilterColor(1));
    }
    .my-requests{
      color: v-bind(selectFilterColor(2));
    }
    .others-requests{
      color: v-bind(selectFilterColor(3));
    }
  }
  span{
    color: #3b5998;
  }
  .sortButtons{
    margin-left: 2rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 5%;
    align-items: center;
    margin-bottom: 1rem;

    .sortID{
      display: flex;
      flex-direction: row;
      position: absolute;
      left: 19.5%;
    }
    .sortName{
      display: flex;
      flex-direction: row;
      position: absolute;
      left: 35%;
    }
    .sortStatus{
      display: flex;
      flex-direction: row;
      position: absolute;
      left: 55%;
    }

    .sortRequester{
      display: flex;
      flex-direction: row;
      position: absolute;
      left: 70%;
    }
    .search{
      display: flex;
      flex-direction: row;
      position: absolute;
      left: 84.7%;
      align-items: center;
      background-color: #3b5998;
      padding: 0.5rem;
      border-radius: 0.25rem;
      .searchInput{
        border:none;
        background: none;
        outline:none;
        color: white;
        &::placeholder{
          color: #bebebe;
        }
      }
      span{
        color: white;
      }
    }
  }
  .allStocks{
    border: 1px solid #6e757e;
    margin-left: 2rem;
    width: 94%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    overflow: hidden;
    @media(max-width: 1450px) {
      margin-left: 1rem;
    }
  }
</style>