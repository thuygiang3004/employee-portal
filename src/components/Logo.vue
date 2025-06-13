<template>
  <svg width="100%" height="30" viewBox="0 0 50 50" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Vehiklian Logo">
    <g transform="translate(5,5) scale(2)">
      <circle :fill="iconColor" cx="10" cy="10" r="10"/>
      <circle fill="white" cx="10" cy="8" r="3"/>
      <rect fill="white" x="8" y="11" width="4" height="6" rx="2"/>
    </g>
  </svg>
</template>

<script setup lang="ts">
defineProps({
  iconColor: {
    type: String,
    default: 'rgb(226, 103, 0)'
  },
})
</script>
