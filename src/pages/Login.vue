<template>
  <div class="flex min-h-screen items-center justify-center bg-gray-100">
    <div class="w-full max-w-md bg-white p-6 rounded-2xl shadow-md">
      <h2 class="text-2xl font-semibold text-center text-gray-700">Log In</h2>

      <form @submit.prevent="onSubmit" class="mt-6">
        <!-- Email Input -->
        <div class="mb-4">
          <label for="email" class="block text-gray-600">Email</label>
          <input
              id="email"
              type="email"
              v-model="form.email"
              class="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your email"
          />
          <p v-if="errors.email" class="text-red-500 text-sm mt-1">
            {{ errors.email }}
          </p>
        </div>

        <!-- Password Input -->
        <div class="mb-4">
          <label for="password" class="block text-gray-600">Password</label>
          <input
              id="password"
              type="password"
              v-model="form.password"
              class="w-full p-2 mt-1 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              placeholder="Enter your password"
          />
          <p v-if="errors.password" class="text-red-500 text-sm mt-1">
            {{ errors.password }}
          </p>
        </div>

        <!-- Login Button -->
        <button
            type="submit"
            :disabled="isSubmitting"
            class="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400"
        >
          <span v-if="!isSubmitting">Log In</span>
          <span v-else>Logging in...</span>
        </button>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-center mt-3">
          {{ errorMessage }}
        </p>
      </form>
    </div>
  </div>
</template>

<script setup lang="ts">
import {ref} from "vue";
import axios from "axios";
import {z} from "zod";
import {useRouter} from "vue-router";

const router = useRouter();

// Define form state
const form = ref({
  email: "",
  password: "",
});

// Define validation schema with Zod
const schema = z.object({
  email: z.string().email("Invalid email format").min(1, "Email is required"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

// Form submission state
const isSubmitting = ref(false);
const errorMessage = ref<string | null>(null);
const errors = ref<{ email?: string; password?: string }>({});

// Handle form submission
const onSubmit = async () => {
  errors.value = {}; // Clear previous errors
  errorMessage.value = null;

  // Validate input
  const result = schema.safeParse(form.value);
  if (!result.success) {
    // Extract and display validation errors
    errors.value = result.error.flatten().fieldErrors as { email?: string; password?: string };
    return;
  }

  isSubmitting.value = true;
  try {
    const response = await axios.post('http://127.0.0.1:8000/api/users/login', form.value);
    localStorage.setItem('email', response.data.email)
    localStorage.setItem('token', response.data.token)
    localStorage.setItem('userName', response.data.name)

    router.push('/new-request')
  } catch (error: any) {
    console.log(error)
    errorMessage.value = error.response?.data?.message || "Login failed. Please try again.";
  } finally {
    isSubmitting.value = false;
  }
};
</script>
