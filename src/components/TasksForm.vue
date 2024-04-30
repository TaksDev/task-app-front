<script lang="ts" setup>
import { ref, watch } from "vue";
import { useForm } from "../composables/Tasks.composable";
import useTaskStore from "../store/TaskStore";

const { formData, saveTask, updateTask } = useForm();
const taskStore = useTaskStore();
const update = ref(true);
const _id = ref("");

const submitForm = () => {
  saveTask();
  limpiarFormulario();
};

const submitUpdated = async () => {
  const response = await updateTask(_id.value);
  if (response) {
    update.value = true;
    limpiarFormulario();
  }
};
watch(
  () => taskStore.currentTask,
  (newValue) => {
    formData.value.title = newValue?.title ?? "";
    formData.value.description = newValue?.description ?? "";
    formData.value.done = newValue?.done ?? false;
    update.value = false;
    _id.value = newValue?._id ?? "";
  }
);

// Función para limpiar el formulario
function limpiarFormulario() {
  formData.value.title = "";
  formData.value.description = "";
  formData.value.done = false;
}
</script>

<template>
  <div>
    <form
      action="#"
      method="POST"
      @submit.prevent="update ? submitForm() : submitUpdated()"
    >
      <div class="mb-4">
        <label for="name" class="block text-white text-sm font-bold mb-2"
          >Titulo</label
        >
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Escriba el titulo"
          required
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          v-model="formData.title"
          :disabled="!update"
        />
      </div>

      <div class="mb-4">
        <label for="message" class="block text-white text-sm font-bold mb-2"
          >Descripción</label
        >
        <textarea
          id="message"
          name="message"
          rows="{4}"
          placeholder="Escriba la descrpción"
          class="w-full px-3 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          v-model="formData.description"
        ></textarea>
      </div>

      <div class="inline-flex items-center mb-4">
        <label
          class="relative -ml-2.5 flex cursor-pointer items-center rounded-full p-3"
          for="checkbox"
          data-ripple-dark="true"
        >
          <input
            type="checkbox"
            class="before:content[''] peer relative h-5 w-5 cursor-pointer appearance-none rounded-md border border-blue-gray-200 transition-all before:absolute before:top-2/4 before:left-2/4 before:block before:h-12 before:w-12 before:-translate-y-2/4 before:-translate-x-2/4 before:rounded-full before:bg-blue-gray-500 before:opacity-0 before:transition-opacity checked:border-pink-500 checked:bg-pink-500 checked:before:bg-pink-500 hover:before:opacity-10"
            id="checkbox"
            v-model="formData.done"
          />
          <span
            class="pointer-events-none absolute top-2/4 left-2/4 -translate-y-2/4 -translate-x-2/4 text-white opacity-0 transition-opacity peer-checked:opacity-100"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              class="h-3.5 w-3.5"
              viewBox="0 0 20 20"
              fill="currentColor"
              stroke="currentColor"
              stroke-width="1"
            >
              <path
                fill-rule="evenodd"
                d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                clip-rule="evenodd"
              ></path>
            </svg>
          </span>
        </label>
        <label
          class="mt-px cursor-pointer select-none font-light text-gray-700"
          for="checkbox"
        >
          <p
            class="flex items-center font-sans text-sm font-normal leading-normal text-white antialiased"
          >
            Done
          </p>
        </label>
      </div>

      <button
        class="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none"
      >
        Save
      </button>
    </form>
  </div>
</template>
