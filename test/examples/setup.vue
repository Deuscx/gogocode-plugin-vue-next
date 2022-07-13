<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'

export default defineComponent({
  name: 'Test',
  setup() {
    const a = ref(1)
    const b = reactive([])

    function fn() {
      return 1
    }
    return {
      a, b, fn,
    }
  },
})
</script>
