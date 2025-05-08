<template>
  <div class="bg-gray-800 flex text text-gray-200 py-4">
    <RouterLink to="/" class="w-16">
      <Logo class="w-16"/>
    </RouterLink>
    <div class="space-x-4">
      <RouterLink to="/requests"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        Requests
      </RouterLink>
      <RouterLink to="/calendar-x"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        Calendar
      </RouterLink>
      <RouterLink to="/new-request"
                  class="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white">
        Create New Request
      </RouterLink>
    </div>
  </div>

</template>

<script setup>
import Logo from "@/components/Logo.vue";
</script>