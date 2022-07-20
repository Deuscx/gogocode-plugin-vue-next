<script lang="ts">
import { defineComponent, reactive, ref } from "vue"
import Hello from 'hello.vue'
export default defineComponent({
  name: 'Test',
  components: {
    Hello,
  },
  props: {
    width: {
      type: Number,
      default: 446,
    },
    title: {
      type: String,
      default: '',
    },
  },
  emits: ['accepted'],
  setup(props, context) {
    const a = ref(1)
    const b = reactive([])

    function fn() {
      return 1
    }

    function accept() {
      context.emit('accepted')
    }

    return {
      accept,
      a,
      b,
      fn,
      props: '1',
    }
  },
})
</script>
