<template>
  <div class="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
    <div class="max-w-md mx-auto">
      <div class="bg-white py-8 px-6 shadow rounded-lg sm:px-10">
        <h2 class="mb-6 text-2xl font-bold text-gray-900">New Leave Request</h2>

        <form @submit.prevent="handleSubmit" class="space-y-6">
          <div>
            <label for="from" class="block text-sm font-medium text-gray-700">From</label>
            <input
                type="date"
                id="from"
                v-model="formData.from"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
          </div>

          <div>
            <label for="to" class="block text-sm font-medium text-gray-700">To</label>
            <input
                type="date"
                id="to"
                v-model="formData.to"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
          </div>

          <div>
            <label for="reason" class="block text-sm font-medium text-gray-700">Reason</label>
            <textarea
                id="reason"
                v-model="formData.reason"
                rows="3"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                placeholder="Please provide a reason for your leave request..."
            ></textarea>
          </div>

          <div>
            <label for="manager" class="block text-sm font-medium text-gray-700">Manager</label>
            <select
                id="manager"
                v-model="formData.managerId"
                required
                class="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="">Select a manager</option>
              <option
                  v-for="manager in managers"
                  :key="manager.id"
                  :value="manager.id"
              >
                {{ manager.first_name }} {{ manager.last_name }}
              </option>
            </select>
          </div>

          <div class="flex items-center justify-end space-x-4">
            <button
                type="button"
                class="py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Cancel
            </button>
            <button
                type="submit"
                class="py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Submit Request
            </button>
          </div>

          <p v-if="error" class="mt-2 text-sm text-red-600">{{ error }}</p>
          <p v-if="message" class="mt-2 text-sm text-green-900">{{ message }}</p>
        </form>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {onMounted, ref} from 'vue'
import axios from 'axios'
import {z} from 'zod'
import {type Manager, ManagerSchema} from '../types/manager'
import {useRouter} from "vue-router";

const router = useRouter()

const error = ref('');
const message = ref('');
const isSubmitting = ref(false)
const managers = ref<Manager[]>([])
const loadingManagers = ref(false)

const formData = ref({
  from: '',
  to: '',
  reason: '',
  managerId: '',
})

const fetchManagers = async () => {
  try {
    loadingManagers.value = true
    const token = JSON.parse(localStorage.getItem('token') ?? '')
    const response = await axios.get('http://127.0.0.1:8000/api/managers', {
      headers: {Authorization: `Bearer ${token}`},
    })
    managers.value = z.array(ManagerSchema).parse(response.data)
  } catch (err) {
    console.error('Failed to fetch managers:', err)
  } finally {
    loadingManagers.value = false
  }
}

onMounted(() => {
  fetchManagers()
})

const handleSubmit = async () => {
  isSubmitting.value = true
  const token = JSON.parse(localStorage.getItem('token') ?? '')
  const response = await axios.post('http://127.0.0.1:8000/api/requests/create', {...formData.value}, {
    headers: {Authorization: `Bearer ${token}`},
  })

  if (response.status == 201) {
    formData.value = {
      from: '',
      to: '',
      reason: '',
      managerId: '',
    }
    message.value = response.data.message
    // TODO: Update to go to dashboard
    router.push('/')
  }
}
</script>

<style scoped>
</style> 