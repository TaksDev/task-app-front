<script setup lang="ts">
import TaskForm from "../components/TasksForm.vue";
import TaskList from "../components/TasksList.vue";
</script>
<template>
  <div class="bg-zinc-700">
    <div class="min-h-screen flex items-center justify-center">
      <div class="bg-gray-950 p-8 rounded-lg shadow-lg max-w-md w-full">
        <h1 class="text-3xl font-bold text-center text-white">Tasks App</h1>
        <TaskForm />
        <TaskList />
      </div>
    </div>
  </div>
</template>
