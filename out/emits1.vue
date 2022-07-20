<script setup lang="ts">
import { defineEmits } from 'vue'
const emit = defineEmits(['accepted'])
function accept() {
  emit('accepted')
}
</script>

<template>
  <div>
    <p>{{ text }}</p>
    <button @click="$emit('accepted')">
      OK
    </button>
  </div>
</template>
