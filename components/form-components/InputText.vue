<template>
  <div class="custom-input input-container w-100 position-relative">
    <div class="custom-input-title f-medium f-size-14 f-color-slate">
      <div class="d-flex justify-content-between align-items-center mb-1">
        <slot name="label">
          {{ title }}
        </slot>
      </div>
    </div>
    <div class="p-relative">
      <input
        ref="inputField"
        :type="type"
        :placeholder="placeholderText"
        :value="value"
        @input="$emit('input', $event.target.value)"
        @blur="$emit('blur', $event)"
        class="border-radius-s f-regular f-size-14 w-100 bg-white custom-input-field"
      />
    </div>
  </div>
</template>

<script>
import { inputBasic } from '@/mixins/inputBasic';

export default {
  name: 'InputText',
  mixins: [inputBasic],
  props: {
    type: {
      type: String,
      required: false,
      default: () => {
        return 'text';
      }
    },
    focus: {
      type: Boolean,
      default: false
    },
    disabled: {
      type: Boolean,
      default() {
        return false;
      }
    }
  },
  watch: {
    focus: {
      immediate: true,
      deep: true,
      handler(val) {
        if (val && this.$refs.inputField) {
          this.$refs.inputField.focus();
        }
      }
    }
  }
};
</script>
