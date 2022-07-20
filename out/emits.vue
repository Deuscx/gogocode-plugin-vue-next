
<template>
    <div>
      <p>{{ text }}</p>
      <button @click="$emit('accepted')">
        OK
      </button>
    </div>
</template>

<script setup lang="ts">
import { defineEmits } from 'vue'
const emit = defineEmit(['accepted'])
function accept() {
  emit('accepted')
}
</script>
