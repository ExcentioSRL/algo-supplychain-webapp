<template>
<main id="home">
  <Header pageName="Homepage" />
  <div class="sortButtons">
     <button class="sortID" @click="sortStocks('uuid')">
        <h2>ID</h2>
        <span class="material-icons">{{ icon[0] }}</span>
      </button>
      <button class="sortName" @click="sortStocks('producer')">
        <h2>Name</h2>
        <span class="material-icons">{{ icon[1] }}</span>
      </button>
      <button class="sortStatus" @click="sortStocks('status')">
        <h2>Status</h2>
        <span class="material-icons">{{ icon[2] }}</span>
      </button>
  </div>
  <div class="allStocks">
    <div class="stocks" v-for="stock in stocks">
       <Stock :stock=stock :odd=isElementOdd(stocks,stock) />
    </div>
  </div>
</main>
</template>

<script lang="ts">
import Header from '@/components/Header.vue';
import Stock from '@/components/Stock.vue';
import {StockClass,Status} from "@/types/stock";
export default{
  name:"Home",
  components: {Header, Stock},
  methods:{
    isElementOdd(stocks : StockClass[], stock: StockClass) : boolean{
      return stocks.indexOf(stock) % 2 === 0;
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
    sortStocks(whichCliked : string){
      if(whichCliked === this.whichSort){
        if(whichCliked === "uuid"){
          this.changeArrowIcon(0,this.icon[0])
        }else if(whichCliked === "producer"){
          this.changeArrowIcon(1, this.icon[1])
        }else{
          this.changeArrowIcon(2, this.icon[2])
        }
        this.stocks.reverse();
      }else{
        if(whichCliked === "uuid"){
          this.stocks.sort(this.compareUuid);
          this.stocks.reverse();
          this.whichSort = whichCliked;
          this.changeArrowIcon(0, this.icon[0])
        }else if(whichCliked === "producer"){
          this.stocks.sort(this.compareName);
          this.stocks.reverse();
          this.whichSort = whichCliked;
          this.changeArrowIcon(1, this.icon[1])
        }else{
          this.stocks.sort(this.compareStatus);
          this.stocks.reverse();
          this.whichSort = whichCliked;
          this.changeArrowIcon(2,this.icon[2])
        } 
      }
    },
    changeArrowIcon(whichIcon: number,currentIcon : string){
      if (this.icon[whichIcon] === "arrow_drop_up") {
        this.icon[whichIcon] = "arrow_drop_down"
      } else {
        this.icon[whichIcon] = "arrow_drop_up"
      }
    }
  },
  data(){
    return {
      stocks: [
        new StockClass(1,"Azienda1 S.r.l", Status.owned),
        new StockClass(982, "Azienda8 S.r.l", Status.requested),
        new StockClass(33, "Azienda5 S.r.l", Status.owned),
        new StockClass(25, "Azienda1 S.r.l", Status.owned),
        new StockClass(2, "Azienda3 S.r.l", Status.requested)
      ],
      icon: ["arrow_drop_up","arrow_drop_up","arrow_drop_up"],
      whichSort: ""
    }
  }
}
</script>

<style lang="scss" scoped>
#home{
  height: 100%;
  min-width: 100%;
  display: flex;
  flex-direction: column;
  .sortButtons{
    margin-left: 2rem;
    display: flex;
    flex-direction: row;
    width: 232%;
    height: 5%;
    .sortID{
      display: flex;
      flex-direction: row;
      position: absolute;
      left: 22%;
      span{

      }
      h4{

      }
    }
    .sortName{
      display: flex;
      flex-direction: row;
      position: absolute;
      left: 40%;
    }
    .sortStatus{
      display: flex;
      flex-direction: row;
      position: absolute;
      left: 62%;
    }
  }
  .allStocks{
      border: 1px solid #6e757e;
      margin-left: 2rem;
      height: auto;
      width: 232%;
      display: flex;
      flex-direction: column;
      border-radius: 0.5rem;
      overflow: hidden;
      .stocks{
        //width: 150%;
      }
  }
}
</style>