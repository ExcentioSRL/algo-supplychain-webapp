<template>
<main id="home">
  <Header pageName="Homepage" />
  <div class="sortButtons">
     <button class="sortID" @click="sortStocks('uuid')">
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
      <div class="listChooser">
        <input type="checkbox" id="stocks"  v-model="isSelected[0]" @click="changeShowedList(0)">
        <label for="stocks">Your Stocks</label>
        <input type="checkbox" id="selfRequests" v-model="isSelected[1]" @click="changeShowedList(1)">
        <label for="selfRequests">Your Requests</label>
        <input type="checkbox" id="othersRequests" v-model="isSelected[2]" @click="changeShowedList(2)">
        <label for="othersRequests">Others Requests</label>
      </div>
  </div>
  <div class="allStocks">
    <div class="stocks" v-for="stock in showedStocksList">
       <Stock :stock=stock :odd=isElementOdd(showedStocksList,stock) :styling="createStockStyle(stock)" :key="key_stock" @approveRequest="removeStockFromStocks(stock)"/>
    </div>
  </div>
</main>
</template>

<script lang="ts" setup>
import { getMyRequests, getOthersRequests } from '@/api_calls/requests';
import Header from '@/components/Header.vue';
import Stock from '@/components/Stock.vue';
import type { StockRequest } from '@/types/request';
import {StockClass,Status,StockStyle} from "@/types/stock";
import { onBeforeMount, onMounted, onUnmounted, ref } from "vue";
import {compareName, compareStatus, compareUuid, compareRequesters} from "@/utils/compare"
import { useDataStore } from "@/stores/store"

//data
let showedStocksList = [new StockClass(0, "", Status.owned)]
let savedStocksList= [
  new StockClass(1, "Azienda1 S.r.l", Status.owned),
  new StockClass(982, "Azienda8 S.r.l", Status.requested_by, "Azienda3 S.r.l"),
  new StockClass(33, "Azienda5 S.r.l", Status.requested),
  new StockClass(25, "Azienda1 S.r.l", Status.owned),
  new StockClass(2, "Azienda3 S.r.l", Status.requested_by, "Azienda1 S.r.l"),
  new StockClass(3, "Azienda2 S.r.l", Status.requested_by, "Azienda3 S.r.l")
]
let icon = ref(["arrow_drop_up", "arrow_drop_up", "arrow_drop_up", "arrow_drop_up"])
let whichSort = ref("")
let key_stock = ref(0)
let isSelected = ref([true,true,true])
let interval: any = null
const store = useDataStore();


//functions
function sortStocks(whichCliked: string) {
  if (whichCliked === whichSort.value) {
    if (whichCliked === "uuid") {
      changeArrowIcon(0)
      showedStocksList.reverse()
    } else if (whichCliked === "producer") {
      changeArrowIcon(1)
      showedStocksList.reverse()
    } else if (whichCliked === "status") {
      changeArrowIcon(2)
      showedStocksList.reverse()
    } else {
      changeArrowIcon(3)
      let stocks1: StockClass[];
      let stock2: StockClass[];
      stocks1 = showedStocksList.filter((stock) => stock.requester !== undefined);
      stocks1.reverse();
      stock2 = showedStocksList.filter((stock) => stock.requester === undefined);
      showedStocksList = stocks1.concat(stock2);
    }
  } else {
    if (whichCliked === "uuid") {
      showedStocksList.sort(compareUuid);
      showedStocksList.reverse();
      changeArrowIcon(0)
    } else if (whichCliked === "producer") {
      showedStocksList.sort(compareName);
      showedStocksList.reverse();
      changeArrowIcon(1)
    } else if (whichCliked === "status") {
      showedStocksList.sort(compareStatus);
      showedStocksList.reverse();
      changeArrowIcon(2)
    } else {
      showedStocksList.sort(compareRequesters);
      changeArrowIcon(3)
    }
    whichSort.value = whichCliked;
  }
  key_stock.value++;
}

function isElementOdd(stocks: StockClass[], stock: StockClass): boolean {
  return stocks.indexOf(stock) % 2 === 0;
}

function changeShowedList(whichClicked : number) {
  let newList: StockClass[];
  newList = [];
  isSelected.value[whichClicked] = !isSelected.value[whichClicked]
  console.log("QUI0: " + isSelected.value[0])
  if (isSelected.value[0] === true) {
    newList = newList.concat(savedStocksList.filter((stock) => stock.status === Status.owned));
  }
  if (isSelected.value[1] === true) {
    newList = newList.concat(savedStocksList.filter((stock) => stock.status === Status.requested));
  }
  if (isSelected.value[2] === true) {
    newList = newList.concat(savedStocksList.filter((stock) => stock.status === Status.requested_by));
  }
  showedStocksList = newList
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
  savedStocksList.splice(savedStocksList.indexOf(stock), 1);
  key_stock.value++;
}

function createStockStyle(stock: StockClass): StockStyle {
  if (stock.status === Status.owned) {
    return new StockStyle('blue', 'green', 'pointer')
  } else if (stock.status === Status.requested) {
    return new StockStyle('red', 'grey', 'default')
  } else {
    return new StockStyle('#0CA6F5', '#F9A603', 'pointer')
  }
}

function getAllStocks(){
  let myStocks: StockClass[];
  myStocks = [];

  let myRequests: StockRequest[];
  getMyRequests(store.data.pIva).then(response => {
    myRequests = response.data
  })
  let othersRequests: StockRequest[];
  getOthersRequests(store.data.pIva).then(response => {
    othersRequests = response.data
  })
  //chiamata asincrona per le mie stock
  //chiamata per tutte quelle stock che ho richiesto
  //le due chiamata sopra vanno unite
  return myStocks;

}


//lifecicle hooks
onBeforeMount(() => {
  /*
  interval = setInterval(() => {
    let newStocks : StockClass[] = getAllStocks();
    if(savedStocksList.value !== newStocks){
      savedStocksList.value = newStocks
      showedStocksList.value = savedStocksList.value;
    }
  },5000) //chiamata ogni 5 secondi
  */
  showedStocksList = savedStocksList
})
onUnmounted(() => {
  clearInterval(interval);
})
</script>

<style lang="scss" scoped>
#home{
  height: 100%;
  min-width: 60%;
  display: flex;
  flex-direction: column;
  .sortButtons{
    margin-left: 2rem;
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 5%;
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

    .listChooser{
      position: absolute;
      right: 1%;
      align-items: center ;
      @media(max-width: 1450px){
        display: flex;
        flex-direction: column;
      }
      label{
        padding-right: 1rem;
        color: black;
      }
    }
  }
  .allStocks{
    border: 1px solid #6e757e;
    margin-left: 2rem;
    width: 132%;
    display: flex;
    flex-direction: column;
    border-radius: 0.5rem;
    overflow: hidden;
    @media(max-width: 1450px) {
      margin-left: 1rem;
    }
  }
}
</style>