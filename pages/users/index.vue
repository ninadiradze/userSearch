<template>
  <div class="users-page__container container">
    <h2 class="f-family-bold f-size-24">SearCh User Name</h2>
    <InputText v-model="userName" title="Fill User Name" placeholder-text="Fill user name" type="text" />
    <div class="flex justify-between items-center mt-3">
      <div class="w-50">
        <InputText v-model="paginationData.per_page" placeholder-text="10" type="number" />
      </div>
      <p>User Repos Items Number</p>
    </div>

    <h2 class="f-family-bold f-size-24 mt-3">User Repos List</h2>
    <div class="users-page__container--user-repos mt-2 p-2">
      <div class="users-page__container--user-repos__header w-100 grid grid-cols-4 gap-4">
        <div>ID</div>
        <div>Avatar</div>
        <div>Name</div>
        <div>Type</div>
      </div>
        <userItem v-for="(item,key) in slicedUsersList" :key="key" :data="item" />
    </div>
    <div class="flex justify-center mt-3">
      <VuePagination :data="paginationData" @pagination-change-page="onPaginationChange($event)" :show-disabled="true" :limit="2" class="f-size-16 f-regular f-color-slate">
      </VuePagination>
    </div>
  </div>
</template>
<script>
import { mapState } from 'vuex';
import VuePagination from 'laravel-vue-pagination';
import debounce from 'lodash/debounce';
import { FETCH_USERS, FETCH_USER } from '@/actionTypes';
import InputText from '@/components/form-components/InputText.vue';
import userItem from '@/components/global/userItem.vue';

export default {
  name:'users',
  components: { InputText, VuePagination, userItem },
  data(){
    return {
      usersList: [],
      slicedUsersList: [],
      userName: '',
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
  computed: {
    ...mapState({
      // usersList: state => state.config.users,
      user: state => state.config.user
    })
  },
  watch:{
    'paginationData.per_page': {
      immediate: true,
      handler(val) {
        this.paginationData.per_page =  val < 1 ? 10 : val;
      }
    }
  },
  methods:{
    onPaginationChange(val){
      this.paginationData.current_page = val;
      const start = Number((val-1)*this.paginationData.per_page);
      const end = Number(this.paginationData.per_page * val);
      this.slicedUsersList = this.usersList.slice(start,end);
    },
    fetchUser(val){
      this.usersList = [];
      this.$store.dispatch(`config/${FETCH_USER}`,val)
        .then(({ data }) => {
        if(typeof data === 'object' && !Array.isArray(data) && data !== null){
          this.usersList.push(data);
        } else if(Array.isArray(data) && data !== null) {
          this.usersList = data;
        }
        this.paginationData.total = this.usersList.length;
        this.paginationData.last_page = this.usersList.length / this.paginationData.per_page;
        this.onPaginationChange(this.paginationData.current_page);
      });
    },
    fetchUsers(){
      if(this.paginationData.per_page > 0){
        this.$store.dispatch(`config/${FETCH_USERS}`)
          .then(({ data }) => {
            this.usersList = data? data: [];
            this.paginationData.total = this.usersList.length;
            this.paginationData.last_page = this.usersList.length / this.paginationData.per_page;
            this.onPaginationChange(this.paginationData.current_page);
          });
      }
    }
  },
  mounted() {
    if(!this.usersList.length){
      this.fetchUsers();
    }
    // ['userName', 'paginationData.per_page'].forEach((key) => {
    //   this.$watch(key, debounce(this.fetchUsers.bind(this), 1000));
    // });
    this.$watch('paginationData.per_page', debounce(this.fetchUsers.bind(this), 1000));
    this.$watch('userName', debounce(this.fetchUser.bind(this), 1000));
  }
}
</script>
<style lang="scss">
.avatar-img {
  width: 50px;
  height: 50px;
  object-fit: cover;
}
</style>
