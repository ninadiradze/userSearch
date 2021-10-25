<template>
  <nuxt-link :to="`users/${data.login}/repo`">
    <div class="users-page__container--user-repos__item w-100 grid grid-cols-4 gap-4 border-solid-light border-radius-s mt-1 pl-1 pr-1">
      <div class="flex items-center">{{ key + 1 }}</div>
      <div>
        <div class="avatar-img">
          <img :src="data.avatar_url" class="border-radius-m" alt="avatarImg" />
        </div>
      </div>
      <div class="flex items-center">{{ data.login }}</div>
      <div class="flex items-center">{{ data.type }}</div>
    </div>
  </nuxt-link>
</template>
<script>
export default {
  name:'userItem',
  props: {
    data: {
      type: Object,
        required: true,
        default: () => {
          return {};
        }
    },
    key: {
      type: Number,
      required: true,
      default: () => {
        return 0;
      }
    }
  }
}
</script>
