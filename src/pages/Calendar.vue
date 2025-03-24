<template>
  <div class="my-calendar w-full min-h-screen bg-gray-50 p-4">
    <DatePicker
        :attributes="events"
        expanded
        class="w-full"
    >
      <template #day-content="{ day, attributes }">
        <div class="flex flex-col items-center gap-1">
          <div class="text-sm font-medium mb-2">{{ day.day }}</div>
          <div v-for="attr in filteredAttributes(day, attributes)" :key="attr.key"
               class="text-xs text-blue-600 whitespace-nowrap w-full bg-blue-200 h-6" :class="attr.styles">
            {{ attr.customData?.description }}
          </div>
        </div>
      </template>
    </DatePicker>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue';
import {DatePicker} from 'v-calendar';
import 'v-calendar/style.css';
import dayjs from 'dayjs';
import {getRequest} from "@/services/httpServices.ts";
import {EventSchema} from "@/types/event.ts";
import {z} from "zod";
import {transformEvents} from "@/ultilities/calendarHelpers.ts";

const loadingEvents = ref(false)

const events = ref<any[]>([])

// Sample events with descriptions
// const events = ref([
//   {
//     key: 'event-1',
//     dates: [
//       [new Date(2025, 2, 7), new Date(2025, 2, 9)],
//     ],
//     customData: { description: 'User 1: Vacation' },
//   },
//   {
//     key: 'event-2',
//     dates: [dayjs().toDate()],
//     customData: { description: 'User 2: Vacation' },
//   },
//   {
//     key: 'event-3',
//     dates: [dayjs().add(3, 'day').toDate()],
//     customData: { description: 'User 3 Sick leave' },
//   },
//   {
//     key: 'event-4',
//     dates: [dayjs().toDate()],
//     customData: { description: 'User 2: Vacation' },
//   },
// ]);

const filteredAttributes = (day: any, attributes: any) => {
  const attributesWithDesc: any[] = attributes.map((attr: any) => {
    console.log(attributes)
    if (Array.isArray(attr.dates)) {
      const firstDay = Array.isArray(attr.dates[0]) ? attr.dates[0][0] : attr.dates[0];
      const lastDay = Array.isArray(attr.dates[attr.dates.length-1]) ? attr.dates[attr.dates.length-1][attr.dates[attr.dates.length-1].length - 1] : attr.dates[0];

      let styles = dayjs(day.date).isSame(firstDay, 'day') ? 'rounded-l-lg' : ''
      styles += dayjs(day.date).isSame(lastDay, 'day') ? ' rounded-r-lg' : ''
      return {
        ...attr,
        highlight: false,
        customData: {
          ...attr.customData,
          description: dayjs(day.date).isSame(firstDay, 'day') ? attr.customData?.description : null,
        },
        styles: styles,
      };
    }

    return attr;
  })
  return attributesWithDesc.filter((item: any) => {
    return item.key !== 'select-drag'
  })
};

const fetchEvents = async () => {
  try {
    loadingEvents.value = true
    const response = await getRequest('requests')
    events.value = transformEvents(z.array(EventSchema).parse(response.data))
  } catch (err) {
    console.error('Failed to fetch events:', err)
  } finally {
    loadingEvents.value = false
  }
}

onMounted(() => {
  fetchEvents()
})

</script>

<style scoped>
.my-calendar :deep(.vc-container) {
  width: 100% !important;
  max-width: 100% !important;
}

.my-calendar :deep(.vc-pane-container) {
  width: 100% !important;
  max-width: 100% !important;
}

.my-calendar :deep(.vc-week) {
  margin-bottom: 6rem;
}
</style>