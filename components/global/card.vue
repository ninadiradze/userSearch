<template>
  <div class="card border-solid-light p-5 border-radius-s">
    <p class="card-title f-bold f-size-16 f-color-blue mb-2">{{ data.full_name }}</p>
    <div v-if="data.stargazers_count" class="flex justify-between f-medium f-size-14 f-color-persian-green">
      <span>stargazers</span>
      <span>{{ data.stargazers_count }}</span>
    </div>
    <div v-if="data.watchers_count" class="flex justify-between f-medium f-size-14 f-color-persian-green">
      <span>watchers</span>
      <span>{{ data.watchers_count }}</span>
    </div>
    <div v-if="data.forks_count" class="flex justify-between f-medium f-size-14 f-color-persian-green">
      <span>forks</span>
      <span>{{ data.forks_count }}</span>
    </div>
    <div v-if="data.open_issues_count" class="flex justify-between f-medium f-size-14 f-color-persian-green">
      <span>open_issues_count</span>
      <span>{{ data.open_issues_count }}</span>
    </div>
    <div v-if="data.language" class="flex justify-between f-medium f-size-14 f-color-persian-green">
      <span>language</span>
      <span>{{ data.language }}</span>
    </div>
    <div v-if="data.license" class="flex justify-between f-medium f-size-14 f-color-persian-green">
      <span>license</span>
      <span>{{ data.license.name }}</span>
    </div>
    <div v-if="data.updated_at" class="flex justify-between f-medium f-size-14 f-color-persian-green">
      <span>license</span>
      <span>{{ updatedDate }}</span>
    </div>
    <div class="f-medium f-size-14 f-color-persian-green w-100 mt-1">
      <span class="mb-1">languages</span>
      <template v-if="languages">
        <div v-for="item in languages" class="flex justify-between items-center w-100 mt-1">
          <div class="card-img mr-1">
            <img :src="`https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${item.name}/${item.name}-original.svg`" />
          </div>
          <div class="w-100 card-range">
            <div :class="`w-${languagePersent(item)}, bg-${item.color}`" class="bg-color-slate card-range__inner"></div>
          </div>
          <span class="ml-1">{{ languagePersent(item) }}%</span>
        </div>
      </template>
    </div>
  </div>
</template>
<script>
import moment from 'moment';
const colors = ['persian-green', 'blue', 'palatinate-purple', 'satin-sheen-gold', 'apple-green', 'french-mauve'];
export default {
  name:'Card',
  props: {
    data: {
      type: Object,
      required: true,
      default: () => {
        return {};
      }
    },
  },
  watch: {
    data: {
      immediate: true,
      handler(val) {
        if(val && val.languages_url) {
          this.getlanguages(val.languages_url);
        }
      }
    }
  },
  computed:{
    languagesSum(){
      return this.languages.reduce((sum, current) => sum + current.value, 0);
    },
    updatedDate() {
      return moment(this.data.updated_at).format('M MMM YYYY HH:mm:ss');
    }
  },
  data(){
    return {
      languages: []
    };
  },
  methods:{
    generateLanguages(val){
      if(val) {
        Object.keys(val).forEach((key) => {
          const color = colors[Math.floor(Math.random()*colors.length)]
          this.languages.push({name:key.toLowerCase(), value: val[key], color: color});
        });
      }
    },
    getlanguages(val){
      this.$axios.get(val).then(({ data }) => {
        this.generateLanguages(data);
        // this.languages = data;
      });
    },
    languagePersent(val) {
      return Math.round(val.value / this.languagesSum *100);
    }
  }
}
</script>
<style lang="scss">
.card {
  &-title {
    overflow-wrap: break-word;
  }

  &-range {
    height: 10px;

   &__inner {
     height: 100%;
     border-radius: 20px;
   }
  }

  &-img {
    width: 35px;
    height: auto;
    border-radius: 10px;

    img {
      object-fit: cover;
    }
  }
}
</style>
