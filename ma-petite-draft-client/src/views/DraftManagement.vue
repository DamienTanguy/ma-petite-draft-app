<template>
    <div class="flex-container">
        <!--<UserStatistics />-->
        <CreationDraft />
        <UserGameList />
    </div>
</template>

<script>

//import UserStatistics from '@/components/UserStatistics.vue'
import CreationDraft from '@/components/CreationDraft.vue'
import UserGameList from '@/components/UserGameList.vue'

export default {
  name: 'DraftManagement',
  components: {
    //UserStatistics,
    CreationDraft,
    UserGameList
  }
}

</script>

<style scoped lang="scss">

  .flex-container {
    display: flex;
    flex-direction: column;
    margin-right: 5px;
    margin-left: 5px;
  }

</style>