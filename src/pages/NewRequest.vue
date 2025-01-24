<template>
    <form @submit.prevent="handleSubmit">
      <div class="form-group">
        <label for="from">From:</label>
        <input type="date" id="from" v-model="formData.from" required>
      </div>
  
      <div class="form-group">
        <label for="to">To:</label>
        <input type="date" id="to" v-model="formData.to" required>
      </div>
  
      <div class="form-group">
        <label for="reason">Reason:</label>
        <textarea id="reason" v-model="formData.reason" rows="3" required></textarea>
      </div>
  
      <div class="form-group">
        <label for="manager">Manager:</label>
        <select id="manager" v-model="formData.manager" required>
          <option value="">Select a manager</option>
          <option value="john">John Smith</option>
          <option value="jane">Jane Doe</option>
          <option value="bob">Bob Wilson</option>
        </select>
      </div>
  
      <button type="submit">Submit</button>
  
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </template>
  
  <script setup lang="ts">
  import { reactive } from 'vue'
  import { useUser } from '../composables/useUser'
  
  const { setUser, error } = useUser()
  
  const formData = reactive({
    from: '',
    to: '',
    reason: '',
    manager: ''
  })
  
  const handleSubmit = () => {
    setUser({
      id: Math.random(),
      ...formData
    })
  }
  </script>
  
  <style scoped>
  .form-group {
    margin-bottom: 1rem;
  }
  
  .error {
    color: red;
  }
  </style> 