<template>
  <div class="wish-panel">
    <DraftTable />
    <WishList />
  </div>
</template>

<script>
  import DraftTable from '@/components/DraftTable.vue'
  import WishList from '@/components/WishList.vue'

  export default {
    name:'Wish',
    components: {
      DraftTable,
      WishList
    }
  }
</script>
