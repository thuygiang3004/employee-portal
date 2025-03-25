<template>
  <div>
    <ScheduleXCalendar :calendar-app="calendarApp">
      <template #dateGridEvent="{ calendarEvent }">
        <div :style="eventStyles">
          {{ calendarEvent.title }}
        </div>
      </template>
    </ScheduleXCalendar>
  </div>
</template>

<script setup lang="ts">
import {ScheduleXCalendar} from '@schedule-x/vue'
import {createCalendar, createViewMonthGrid} from '@schedule-x/calendar'
import '@schedule-x/theme-default/dist/index.css'
import {getRequest} from "@/services/httpServices.ts";
import {transformEventsForScheduleX} from "@/ultilities/calendarHelpers.ts";
import {z} from "zod";
import {EventSchema} from "@/types/event.ts";
import {onMounted, ref} from "vue";
import {createEventsServicePlugin} from '@schedule-x/events-service'
import {createCalendarControlsPlugin} from '@schedule-x/calendar-controls'

const eventsServicePlugin = createEventsServicePlugin();
const calendarControls = createCalendarControlsPlugin()

const calendarApp = createCalendar({
      views: [
        createViewMonthGrid(),
      ],
      events: [],
    },
    [eventsServicePlugin, calendarControls],
)

calendarControls.setFirstDayOfWeek(0)

const eventStyles = {
  width: '100%',
  height: '100%',
  backgroundColor: 'white',
  border: '2px solid black',
  borderRadius: '4px',
  padding: '0 4px',
}

const loadingEvents = ref(false)

const fetchEvents = async () => {
  try {
    loadingEvents.value = true
    const response = await getRequest('requests')
    eventsServicePlugin.set(transformEventsForScheduleX(z.array(EventSchema).parse(response.data)))
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

<style>
.sx-vue-calendar-wrapper {
  width: 1400px;
  max-width: 100vw;
  height: 900px;
  max-height: 90vh;
}
</style>