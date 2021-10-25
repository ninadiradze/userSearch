<template>
  <div class="repos-page">
    <h2 class="f-family-bold f-size-24 mt-3">User Repos List</h2>
    <div class="repos-page__repos-container mt-2">
      <!--        <pre>{{ users }}</pre>-->
      <div v-if="slicedRepos.length" class="repos-page__repos-container__item w-100 grid grid-cols-3 gap-4">
        <card v-for="item in slicedRepos" :key="key" :data="item" />
      </div>
      <div class="flex justify-center mt-3">
          <VuePagination :data="paginationData" @pagination-change-page="onPaginationChange($event)" :show-disabled="true" :limit="2" class="f-size-16 f-regular f-color-slate">
          </VuePagination>
      </div>
    </div>
  </div>
</template>
<script>
import { FETCH_USER_REPO } from '@/actionTypes';
import VuePagination from 'laravel-vue-pagination';
import card from '@/components/global/card.vue';

export default {
  name:'userRepos',
  components: { card, VuePagination },
  data(){
    return {
      userRepos: [],
      slicedRepos: [],
      paginationData: {
        current_page: 1,
        from: 1,
        last_page: 1,
        per_page: 10,
        to: 0,
        total: 0
      },
    };
  },
  methods:{
    onPaginationChange(val){
      this.paginationData.current_page = val;
      const start = Number((val-1)*this.paginationData.per_page);
      const end = Number(this.paginationData.per_page * val);
      this.slicedRepos = this.userRepos.slice(start,end);
    },
    fetchRepos() {
      const queryParam = this.$route.params.id;
      // const params = {id: queryParam, params: `per_page=${this.paginationData.per_page}&page=${this.paginationData.current_page}`};
      const params = {id: queryParam};
      this.$store.dispatch(`config/${FETCH_USER_REPO}`, params)
        .then(({ data }) => {
          this.userRepos = data? data: [];
          this.paginationData.total = this.userRepos.length;
          this.paginationData.last_page = this.userRepos.length / this.paginationData.per_page;
          this.onPaginationChange(this.paginationData.current_page);
        });
    }
  },
  mounted() {
    this.fetchRepos();
  }
}
</script>

