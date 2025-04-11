<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-7xl mx-auto">
      <div class="bg-white shadow rounded-lg">
        <!-- Tabs -->
        <div class="border-b border-gray-200">
          <nav class="-mb-px flex">
            <button
                v-for="tab in tabs"
                :key="tab.name"
                @click="currentTab = tab.name"
                :class="[
                currentTab === tab.name
                  ? 'border-indigo-500 text-indigo-600'
                  : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300',
                'whitespace-nowrap py-4 px-6 border-b-2 font-medium text-sm'
              ]"
            >
              {{ tab.label }}
            </button>
          </nav>
        </div>

        <!-- Content -->
        <div class="p-6">
          <!-- Loading state -->
          <div v-if="loading" class="text-center py-4">
            <div class="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-600 mx-auto"></div>
          </div>

          <!-- Error state -->
          <div v-else-if="error" class="text-center py-4 text-red-600">
            {{ error }}
          </div>

          <!-- Requests list -->
          <div v-else class="space-y-4">
            <div v-if="currentRequests.length === 0" class="text-center py-4 text-gray-500">
              No requests found
            </div>
            <div v-else class="space-y-4">
              <div v-for="request in currentRequests" :key="request.id"
                   class="border rounded-lg p-4 hover:bg-gray-50">
                <div class="flex justify-between items-start">
                  <div>
                    <h3 class="text-lg font-medium text-gray-900">
                      {{ request.first_name }} {{ request.last_name }}
                    </h3>
                    <p class="text-sm text-gray-500">{{ request.email }}</p>
                  </div>
                  <span :class="[
                    'px-2 py-1 text-xs font-medium rounded-full',
                    request.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    request.status === 'approved' ? 'bg-green-100 text-green-800' :
                    'bg-red-100 text-red-800'
                  ]">
                    {{ request.status }}
                  </span>
                </div>
                <div class="mt-2 text-sm text-gray-600">
                  <p><span class="font-medium">From:</span> {{ formatDate(request.from) }}</p>
                  <p><span class="font-medium">To:</span> {{ formatDate(request.to) }}</p>
                  <p class="mt-2"><span class="font-medium">Reason:</span> {{ request.reason }}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {computed, onMounted, ref} from 'vue'
import {type Event} from '../types/event'
import {getRequest} from '@/services/httpServices'
import dayjs from 'dayjs'

const tabs = [
  {name: 'my-requests', label: 'My Requests'},
  {name: 'received-requests', label: 'Received Requests'},
]

const currentTab = ref('my-requests')
const loading = ref(true)
const error = ref('')
const myRequests = ref<Event[]>([])
const receivedRequests = ref<Event[]>([])

const currentRequests = computed(() => {
  return currentTab.value === 'my-requests' ? myRequests.value : receivedRequests.value
})

const formatDate = (dateString: string) => {
  return dayjs(dateString).format('MMM D, YYYY HH:mm')
}

const fetchRequests = async () => {
  try {
    loading.value = true
    error.value = ''

    const myRequestsResponse = await getRequest('requests?myRequests=1')
    const receivedRequestsResponse = await getRequest('requests?toMe=1')

    myRequests.value = myRequestsResponse.data
    receivedRequests.value = receivedRequestsResponse.data
  } catch (err) {
    console.error('Failed to fetch requests:', err)
    error.value = 'Failed to load requests. Please try again later.'
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchRequests()
})
</script>

<style scoped>
</style> 