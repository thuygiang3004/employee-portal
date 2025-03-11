<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-2xl mx-auto bg-white p-6 shadow rounded-lg">
      <h2 class="mb-6 text-2xl font-bold text-gray-900">Select a Date</h2>

      <DatePicker v-model="date" :attributes="events" is-expanded>
        <template #day-content="{ day, attributes }">
          <div class="relative">
            <span>{{ day.day }}</span>
            <div v-for="attr in attributes" :key="attr.key" class="text-xs text-center mt-1 text-blue-600">
              {{ attr.customData?.description }}
            </div>
          </div>
        </template>
      </DatePicker>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { DatePicker } from 'v-calendar';
import 'v-calendar/style.css';
import dayjs from 'dayjs';

const date = ref(new Date());

// Sample events with descriptions
const events = ref([
  {
    key: 'event-1',
    highlight: {
      color: 'blue',
      fillMode: 'solid',
    },
    dates: [dayjs().toDate()],
    customData: { description: 'Meeting' },
  },
  {
    key: 'event-2',
    highlight: {
      color: 'red',
      fillMode: 'outline',
    },
    dates: [dayjs().add(3, 'day').toDate()],
    customData: { description: 'Project Deadline' },
  }
]);

</script>

<style scoped>
</style>
