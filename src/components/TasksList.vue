<script setup lang="ts">
import { onMounted } from "vue";
import useTaskStore from "../store/TaskStore";
import TaskCard from "../components/TaskCard.vue";

// Obtenemos el estado del store
const store = useTaskStore();

// Disparamos la acción para actualizar la lista de tareas al montar el componente
onMounted(() => {
  store.updateTaskList();
});

onMounted(() => {
  store.updateTaskList();
});
</script>

<template>
  <div>
    <ul class="text-white overflow-auto max-h-80 mt-10">
      <li v-for="task in store.allTasks" :key="task._id">
        <div class="mt-5 mr-2">
          <TaskCard :task="task" />
        </div>
      </li>
    </ul>
  </div>
</template>

<style>
/* Estilo del contenedor que tiene scroll */
::-webkit-scrollbar {
  width: 12px; /* Ancho del scroll */
}

/* Estilo del "thumb" o barra de desplazamiento */
::-webkit-scrollbar-thumb {
  background-color: #888; /* Color de fondo del "thumb" */
  border-radius: 6px; /* Radio de borde del "thumb" */
}

/* Estilo del "thumb" cuando está en hover */
::-webkit-scrollbar-thumb:hover {
  background-color: #555; /* Cambio de color de fondo del "thumb" en hover */
}
</style>
