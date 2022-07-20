
<script setup lang="ts">
import { reactive,ref,defineProps,defineEmits } from 'vue'
import Hello from 'hello.vue'
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
const emit = defineEmit(['accepted'])
const a = ref(1)
const b = reactive([])

function fn() {
  return 1
}

function accept() {
  emit('accepted')
}
</script>
