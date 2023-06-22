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
        <input type="checkbox" id="stocks"  v-model="isSelected[0]" @change="changeShowedList">
        <label for="stocks">Your Stocks</label>
        <input type="checkbox" id="selfRequests" v-model="isSelected[1]" @change="changeShowedList">
        <label for="selfRequests">Your Requests</label>
        <input type="checkbox" id="othersRequests" v-model="isSelected[2]" @change="changeShowedList">
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

<script lang="ts">
import { getMyRequests, getOthersRequests } from '@/api_calls/requests';
import Header from '@/components/Header.vue';
import Stock from '@/components/Stock.vue';
import { store } from '@/stores/store';
import type { StockRequest } from '@/types/request';
import {StockClass,Status,StockStyle} from "@/types/stock";
export default{
  name:"Home",
  components: {Header, Stock},
  methods:{
    changeShowedList(){
      let newList : StockClass[];
      newList = [];
      if(this.isSelected[0] === true){
        newList = newList.concat(this.savedStocksList.filter((stock) => stock.status === Status.owned));
      }
      if(this.isSelected[1] === true){
        newList = newList.concat(this.savedStocksList.filter((stock) => stock.status === Status.requested));
      }
      if(this.isSelected[2] === true){
        newList = newList.concat(this.savedStocksList.filter((stock) => stock.status === Status.requested_by));
      }
      this.showedStocksList = newList
      this.key_stock += 1;
    },
    isElementOdd(stocks : StockClass[], stock: StockClass) : boolean{
      return stocks.indexOf(stock) % 2 === 0;
    },
    createStockStyle(stock: StockClass) : StockStyle{
      if(stock.status === Status.owned){
        return new StockStyle('blue','green','pointer')
      }else if(stock.status === Status.requested){
        return new StockStyle('red','grey','default')
      }else{
        return new StockStyle('#0CA6F5','#F9A603', 'pointer')
      }
      
    },
    compareUuid(a: StockClass, b: StockClass): number{
      if (a.uuid < b.uuid) {
        return -1;
      }
      if (a.uuid > b.uuid) {
        return 1;
      }
      return 0;
    },
    compareName(a: StockClass, b: StockClass): number{
      if (a.producer < b.producer) {
        return -1;
      }
      if (a.producer > b.producer) {
        return 1;
      }

      if (a.uuid < b.uuid) {
        return -1;
      }
      if (a.uuid > b.uuid) {
        return 1;
      }
      return 0;
    },
    compareStatus(a: StockClass, b:StockClass): number{
      if (a.status < b.status) {
        return -1;
      }
      if (a.status > b.status) {
        return 1;
      }

      if (a.uuid < b.uuid) {
        return -1;
      }
      if (a.uuid > b.uuid) {
        return 1;
      }
      return 0;
    },
    compareRequesters(a: StockClass, b: StockClass) : number{
      if (a.requester !== undefined && b.requester === undefined) {
        return -1;
      }
      if (a.requester === undefined && b.requester !== undefined) {
        return 1;
      }
      if (a.requester !== undefined && b.requester !== undefined) {
        if (a.requester < b.requester) {
          return -1;
        }
        if (a.requester > b.requester) {
          return 1;
        }
      }
      return 0;
    },
    sortStocks(whichCliked : string){
      if(whichCliked === this.whichSort){
        if(whichCliked === "uuid"){
          this.changeArrowIcon(0)
          this.showedStocksList.reverse()
        }else if(whichCliked === "producer"){
          this.changeArrowIcon(1)
          this.showedStocksList.reverse()
        }else if(whichCliked === "status"){
          this.changeArrowIcon(2)
          this.showedStocksList.reverse()
        }else{
          this.changeArrowIcon(3)
          let stocks1 : StockClass[];
          let stock2 : StockClass[];
          stocks1 = this.showedStocksList.filter((stock) => stock.requester !== undefined);
          stocks1.reverse();
          stock2 = this.showedStocksList.filter((stock) => stock.requester === undefined);
          this.showedStocksList = stocks1.concat(stock2); 
        }
      }else{
        if(whichCliked === "uuid"){
          this.showedStocksList.sort(this.compareUuid);
          this.showedStocksList.reverse();
          this.whichSort = whichCliked;
          this.changeArrowIcon(0)
        }else if(whichCliked === "producer"){
          this.showedStocksList.sort(this.compareName);
          this.showedStocksList.reverse();
          this.whichSort = whichCliked;
          this.changeArrowIcon(1)
        }else if(whichCliked === "status"){
          this.showedStocksList.sort(this.compareStatus);
          this.showedStocksList.reverse();
          this.whichSort = whichCliked;
          this.changeArrowIcon(2)
        }else{
          this.showedStocksList.sort(this.compareRequesters);
          this.whichSort = whichCliked;
          this.changeArrowIcon(3)
        }
      }
      this.key_stock += 1;
    },
    changeArrowIcon(whichIcon: number){
      if (this.icon[whichIcon] === "arrow_drop_up") {
        this.icon[whichIcon] = "arrow_drop_down"
      } else {
        this.icon[whichIcon] = "arrow_drop_up"
      }
    },
    removeStockFromStocks(stock: StockClass){
      this.savedStocksList.splice(this.savedStocksList.indexOf(stock),1);
      this.key_stock += 1;
    },
    getAllStocks() {
      let myStocks: StockClass[];
      myStocks = [];
      
      let myRequests: StockRequest[];
      getMyRequests(store.pIva).then(response =>{
        myRequests = response.data
      })
      let othersRequests: StockRequest[];
      getOthersRequests(store.pIva).then(response => {
        othersRequests = response.data
      })
      //chiamata asincrona per le mie stock
      //chiamata per tutte quelle stock che ho richiesto
      //le due chiamata sopra vanno unite
      return myStocks;
      
    }
  },
  data(){
    return {
      showedStocksList: [new StockClass(0,"", Status.owned)],
      savedStocksList: [
        new StockClass(1,"Azienda1 S.r.l", Status.owned),
        new StockClass(982, "Azienda8 S.r.l", Status.requested_by, "Azienda3 S.r.l"),
        new StockClass(33, "Azienda5 S.r.l", Status.requested),
        new StockClass(25, "Azienda1 S.r.l", Status.owned),
        new StockClass(2, "Azienda3 S.r.l", Status.requested_by,"Azienda1 S.r.l"),
        new StockClass(3, "Azienda2 S.r.l", Status.requested_by, "Azienda3 S.r.l")
      ],
      icon: ["arrow_drop_up","arrow_drop_up","arrow_drop_up","arrow_drop_up"],
      whichSort: "",
      key_stock : 0, //needed to force the update of the CSS in Stock.vue,
      isSelected: [true,true,true]
    }
  },
  beforeMount() {
      //this.savedStocksList =  this.getAllStocks();
      this.showedStocksList = this.savedStocksList;
  },
}
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