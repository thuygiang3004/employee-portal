<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp" />
  </div>
</template>

<script setup lang="ts">
import { ScheduleXCalendar } from '@schedule-x/vue'
import {
  createCalendar,
  createViewMonthGrid,
} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import dayjs from "dayjs";

const calendarApp = createCalendar({
  selectedDate: dayjs().format('YYYY-MM-DD'),
  views: [
    createViewMonthGrid(),
  ],
  events: [
    {
      id: 1,
      title: 'Event 1',
      start: dayjs().format('YYYY-MM-DD'),
      end: dayjs().add(3, 'day').format('YYYY-MM-DD'),
    },
    {
      id: 2,
      title: 'Event 2',
      start: dayjs().add(1, 'day').format('YYYY-MM-DD'),
      end: dayjs().add(5, 'day').format('YYYY-MM-DD'),
    },
  ],
})
</script>


<style>
.sx-vue-calendar-wrapper {
  width: 1400px;
  max-width: 100vw;
  height: 900px;
  max-height: 90vh;
}
</style>