<template>
<main id="home">
  <Header pageName="Homepage" @search_data="handleSearch" @stock_data="handleReceivedData"/>
  <div v-if="searchedStocks.length === 0">
    <HomepageData :stocks="homepageStocks" :key="key_2"/>
  </div>
  <div v-else>
    <HomepageSearchData :stocks="searchedStocks" :key="key_1"/>
  </div>
</main>
</template>

<script lang="ts" setup>
import { searchStocksSocket } from '@/api_calls/socket';
import Header from '@/components/Header.vue';
import HomepageData from '@/components/HomepageData.vue';
import HomepageSearchData from '@/components/HomepageSearchData.vue';
import type { Stock } from '@/types/stock';
import { ref, type Ref } from 'vue';

let homepageStocks : Ref<Stock[]> = ref([])
let searchedStocks : Ref<Stock[]> = ref([])
let key_1: number = 0
let key_2 : number = 0

function handleReceivedData(data: Stock[]){
  homepageStocks.value = data
  console.log("hompage Stocks: "+ homepageStocks.value.length)
  key_2++;
}
function handleSearch(data : Stock[]){
  searchedStocks.value = data
  key_1++;
}

</script>

<style lang="scss" scoped>
#home{
  min-height: 100%;
  width: 100%;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  
}
</style>