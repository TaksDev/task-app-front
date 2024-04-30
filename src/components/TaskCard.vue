<script setup lang="ts">
import { defineProps } from "vue";
import useTaskStore from "../store/TaskStore";
import { useForm } from "../composables/Tasks.composable";
import { Task } from "../interfaces/Task.interface";

const store = useTaskStore();
const { deleteTask } = useForm();

// Define las props del componente
defineProps<{
  task: Task;
}>();

const deleteTaskData = async (id: string) => {
  await deleteTask(id);
  store.updateTaskList();
};

const updateTaksData = (task: Task) => {
  store.updateCurrentTask(task);
};
</script>
<template>
  <div
    class="flex h-full w-full items-start justify-between rounded-md border-[1px] border-[transparent] dark:hover:border-white/20 bg-slate-400 px-3 py-[20px] transition-all duration-150 hover:border-gray-200 dark:!bg-navy-800 dark:hover:!bg-navy-700"
  >
    <div class="flex items-center gap-3">
      <div class="flex flex-col">
        <h5 class="text-lg font-bold text-navy-700 dark:text-white">
          {{ task.title }}
        </h5>
        <p class="mt-1 text-sm font-normal text-gray-600">
          {{ task.description }}
        </p>
      </div>
    </div>
    <div
      class="mt-3 flex items-center justify-center text-navy-700 dark:text-white"
    >
      <div class="mr-4" @click="updateTaksData(task)">
        <svg
          v-if="task.done"
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 14L9 19L20 8M6 8.88889L9.07692 12L16 5"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
        <svg
          v-else
          width="20px"
          height="20px"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 12.6111L8.92308 17.5L20 6.5"
            stroke="#000000"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          ></path>
        </svg>
      </div>
      <div @click="deleteTaskData(task._id)">
        <svg
          width="20px"
          height="20px"
          viewBox="0 -0.5 21 21"
          version="1.1"
          fill="#000000"
        >
          <g
            id="Page-1"
            stroke="none"
            stroke-width="1"
            fill="none"
            fill-rule="evenodd"
          >
            <g
              id="Dribbble-Light-Preview"
              transform="translate(-179.000000, -360.000000)"
              fill="#000000"
            >
              <g id="icons" transform="translate(56.000000, 160.000000)">
                <path
                  d="M130.35,216 L132.45,216 L132.45,208 L130.35,208 L130.35,216 Z M134.55,216 L136.65,216 L136.65,208 L134.55,208 L134.55,216 Z M128.25,218 L138.75,218 L138.75,206 L128.25,206 L128.25,218 Z M130.35,204 L136.65,204 L136.65,202 L130.35,202 L130.35,204 Z M138.75,204 L138.75,200 L128.25,200 L128.25,204 L123,204 L123,206 L126.15,206 L126.15,220 L140.85,220 L140.85,206 L144,206 L144,204 L138.75,204 Z"
                  id="delete-[#1487]"
                ></path>
              </g>
            </g>
          </g>
        </svg>
      </div>
    </div>
  </div>
</template>
