<template>
<main id="home">
  <Header pageName="Homepage" />
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
    }
  },
  data(){
    return {
      stocks: [
        new StockClass(1,"Azienda1 S.r.l", Status.owned),
        new StockClass(982, "Azienda8 S.r.l", Status.requested),
        new StockClass(33, "Azienda2 S.r.l", Status.owned),
        new StockClass(25, "Azienda1 S.r.l", Status.owned),
        new StockClass(2, "Azienda3 S.r.l", Status.requested)
      ]
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