<template>
<main id="home">
  <Header pageName="Homepage" @search="handleSearch"/>
  <div v-if="searchInput === ''">
    <HomepageData/>
  </div>
  <div v-else>
    <HomepageSearchData :stocks="searchedStocks" :searchInput="searchInput.valueOf" :key="key"/>
  </div>
</main>
</template>

<script lang="ts" setup>
import { searchStocks } from '@/api_calls/stocks';
import Header from '@/components/Header.vue';
import HomepageData from '@/components/HomepageData.vue';
import HomepageSearchData from '@/components/HomepageSearchData.vue';
import type { StockClass } from '@/types/stock';
import { ref, type Ref } from 'vue';

let searchedStocks : StockClass[] = []
let searchInput : Ref<String> = ref("")
let key : number = 0

async function handleSearch(data : String){
  searchInput.value = data
  console.log("qui! " + searchInput.value)
  /*await searchStocks(searchInput).then(response => {
    searchedStocks = response.data
  }) */
  
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