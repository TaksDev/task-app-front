import { ref } from "vue";
import useTaskStore from "../store/TaskStore";
import axiosInstance from "../services/Axios";
import { showErrorAlert, showSuccessAlert } from "../services/AlertComposable";
import { Task } from "../interfaces/Task.interface";

export function useForm() {
  const { updateTaskList } = useTaskStore();
  const formData = ref({
    title: "",
    description: "",
    done: false,
  });

  const saveTask = async () => {
    await axiosInstance
      .post("/v1/tasks", formData.value)
      .then(function (response) {
        if (response.status === 201) {
          showSuccessAlert("La tarea se creo correctamente");
          updateTaskList();
        }
      })
      .catch(function (error) {
        // handle error
        if (error.response) {
          if (error.response.status === 409) {
            showErrorAlert(error.response.data.message);
            console.log(error.response.data);
          } else {
            showErrorAlert(error.response.data.message);
          }
        }
      });
  };
  const getTasks = async (): Promise<Task[]> => {
    try {
      const response = await axiosInstance.get("/v1/tasks");
      return response.data;
    } catch (error: any) {
      if (error.response) {
        showErrorAlert(error.response.data.message);
      } else {
        showErrorAlert("Error desconocido al obtener las tareas");
      }
      // Devuelve una matriz vacía en caso de error para mantener la consistencia del tipo de retorno
      return [];
    }
  };

  const deleteTask = async (id: string) => {
    try {
      // Realiza la petición DELETE al servidor con el ID de la tarea a eliminar
      const response = await axiosInstance.delete(`/v1/tasks/${id}`);
      // Verifica si la eliminación fue exitosa

      if (response.status === 200) {
        // La tarea se eliminó correctamente
        // Realiza cualquier acción adicional si es necesario
        showSuccessAlert("Tarea eliminada correctamente");
      } else {
        // Si la respuesta no es exitosa, muestra un mensaje de error
        showErrorAlert("Error al eliminar la tarea");
        // O muestra un mensaje de error utilizando una función showErrorAlert
        // showErrorAlert("Error al eliminar la tarea");
      }
    } catch (error: any) {
      // Si hay un error en la petición, muestra un mensaje de error
      if (error.response) {
        showErrorAlert(error.response.data.message);
      }
      // O muestra un mensaje de error utilizando una función showErrorAlert
      // showErrorAlert("Error al eliminar la tarea: " + error.message);
    }
  };

  const updateTask = async (id: string): Promise<boolean> => {
    try {
      const response = await axiosInstance.patch(
        `/v1/tasks/${id}`,
        formData.value
      );
      showSuccessAlert("La tarea se actualizó correctamente");
      updateTaskList();
      return true; // Devuelve true si la solicitud es exitosa
    } catch (error: any) {
      if (error.response) {
        if (error.response.status === 409) {
          showErrorAlert(error.response.data.message);
          console.log(error.response.data);
        } else {
          showErrorAlert(error.response.data.message);
        }
      }
      return false; // Devuelve false si hay un error
    }
  };

  return {
    formData,
    saveTask,
    getTasks,
    deleteTask,
    updateTask,
  };
}
