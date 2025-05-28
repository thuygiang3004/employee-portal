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
    <div
        class="ml-auto mr-4 rounded-md px-3 py-2 text-sm underline cursor-pointer font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
        @click="handleLogout"
    >
      Log out
    </div>
  </div>

</template>

<script setup lang="ts">
import Logo from "@/components/Logo.vue";
import {postRequest} from "@/services/httpServices.js";
import {useRouter} from "vue-router";

const router = useRouter();
const handleLogout = async () => {
  try {
    await postRequest('users/logout')
    localStorage.removeItem('email')
    localStorage.removeItem('token')
    localStorage.removeItem('userName')

    router.push('/login')
  } catch (error: any) {
    console.log(error)
  }
}
</script>