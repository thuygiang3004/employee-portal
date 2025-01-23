<template>
  <form @submit.prevent="handleSubmit">
    <div class="form-group">
      <label for="name">Name:</label>
      <input 
        id="name"
        v-model="formData.name"
        type="text"
        required
      />
    </div>

    <div class="form-group">
      <label for="email">Email:</label>
      <input
        id="email"
        v-model="formData.email"
        type="email"
        required
      />
    </div>

    <div class="form-group">
      <label for="age">Age:</label>
      <input
        id="age"
        v-model.number="formData.age"
        type="number"
        required
      />
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
  name: '',
  email: '',
  age: 0
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