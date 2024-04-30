import { defineStore } from "pinia";
import { useForm } from "../composables/Tasks.composable";
import { Task } from "../interfaces/Task.interface";

// Define el store
const useTaskStore = defineStore("taskStore", {
  // Define el estado inicial
  state: () => ({
    tasks: [] as Task[], // Inicializa tasks como una matriz vacía de Task
    currentTask: null as Task | null, // Tarea actual
  }),

  // Define los getters para acceder al estado
  getters: {
    allTasks: (state) => {
      return state.tasks;
    },
  },

  // Define las acciones para actualizar el estado
  actions: {
    async updateTaskList() {
      // Obtén el método de useForm
      const { getTasks } = useForm();
      // Invoca getTasks y actualiza el estado con los datos obtenidos
      this.tasks = await getTasks();
    },
    updateCurrentTask(task: Task): void {
      this.currentTask = task;
    },
  },
});

export default useTaskStore;
