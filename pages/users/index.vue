<template>
  <div class="users-page__container container">
    <InputText title="User Name" placeholder-text="Fill user name" type="text" />
<!--    <pre>{{ user }}</pre>-->
  </div>
</template>
<script>
import { mapState } from 'vuex';
import { FETCH_USER } from '@/actionTypes';
import InputText from '@/components/form-components/InputText.vue';

export default {
  name:'users',
  components: { InputText },
  data(){
    return {
      list: []
    };
  },
  computed: {
    ...mapState({
      usersList: state => state.config.users,
      user: state => state.config.user
    })
  },
  mounted() {
    // if(!this.usersList.length){
    //   this.$store.dispatch(`config/${FETCH_USERS}`);
    // }

    if(!this.user){
      this.$store.dispatch(`config/${FETCH_USER}`,'mojombo');
    }
  }
}
</script>
