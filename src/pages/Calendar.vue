<template>
  <DatePicker v-model="date"/>
</template>

<script setup lang="ts">
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import {ref} from "vue";

const date = ref(new Date())
</script>
