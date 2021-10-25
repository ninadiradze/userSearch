export const inputBasic = {
  props: {
    isNumber: {
      type: Boolean,
      default: false
    },
    title: {
      type: String,
      default: ''
    },
    placeholderText: {
      type: String,
      default: ''
    },
    name: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    }
},
  data() {
  return {
    input: ''
    };
  },
  watch: {
    input(to) {
      this.$emit('input', to);
    },
    value: {
      immediate: true,
        handler(to) {
        this.input = to;
      }
    }
  },
  methods: {
  /**
  * Clear input value
  */
  clearInput() {
    this.$emit('input', (this.input = ''));
  },
  }
};
