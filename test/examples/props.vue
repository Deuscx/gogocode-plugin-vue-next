<script lang="ts">
import { defineComponent, defineProps } from 'vue'
export default defineComponent({
  name: 'Test',
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
  setup() {
    return {
      props: '1',
    }
  },
})
</script>
