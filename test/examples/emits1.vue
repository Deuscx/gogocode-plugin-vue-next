<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  props: ['text'],
  emits: ['accepted'],
  setup(_, { emit }) {
    function accept() {
      emit('accepted')
    }
    return {
      accept,
    }
  },
})
</script>

<template>
  <div>
    <p>{{ text }}</p>
    <button @click="$emit('accepted')">
      OK
    </button>
  </div>
</template>
