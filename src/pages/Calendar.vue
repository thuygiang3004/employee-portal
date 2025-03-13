<template>
  <div class="my-calendar">
    <DatePicker v-model="date" :attributes="events" expanded>
      <template #day-content="{ day, attributes }">
        <div class="flex flex-col items-center">
          <span class="text-sm font-medium">{{ day.day }}</span>
          <span v-for="attr in filteredAttributes(day, attributes)" :key="attr.key"
                class="text-xs text-blue-600 whitespace-nowrap">
              {{ attr.customData?.description }}
            </span>
        </div>
      </template>
    </DatePicker>
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
      fillMode: 'light',
    },
    dates: [
      [new Date(2025, 2, 7), new Date(2025, 2, 9)],
    ],
    customData: { description: 'User 1: Vacation' },
  },
  {
    key: 'event-2',
    highlight: {
      color: 'blue',
      fillMode: 'solid',
    },
    dates: [dayjs().toDate()],
    customData: { description: 'User 2: Vacation' },
  },
  {
    key: 'event-3',
    highlight: {
      color: 'red',
      fillMode: 'outline',
    },
    dates: [dayjs().add(3, 'day').toDate()],
    customData: { description: 'User 3 Sick leave' },
  }
]);

const filteredAttributes = (day: any, attributes: any) => {
  return attributes.filter((attr: any) => {
    if (Array.isArray(attr.dates)) {
      const firstDay = Array.isArray(attr.dates[0]) ? attr.dates[0][0] : attr.dates[0];
      return dayjs(day.date).isSame(firstDay, 'day');
    }
    return true;
  });
};
</script>

<style scoped>
.my-calendar :deep(.vc-week) {
  margin-bottom: 6rem;
}
</style>