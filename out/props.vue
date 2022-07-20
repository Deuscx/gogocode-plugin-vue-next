
<script setup lang="ts">
import { defineProps } from 'vue'
const props = defineProps({
  width: {
    type: Number,
    default: 446,
  },
  title: {
    type: String,
    default: '',
  },
})
</script>
