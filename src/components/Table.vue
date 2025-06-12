<template>
  <div class="overflow-x-auto w-full">
    <table class="table w-full">
      <thead>
        <tr>
          <th>#</th>
          <th>Nombre</th>
          <th>Completado</th>
        </tr>
      </thead>
      <tbody>
        <!-- Si NO hay proyecto seleccionado, mostrar lista de proyectos -->
        <template v-if="!projectsStore.selectedProject">
          <tr
            v-for="(project, index) in projectsStore.projects"
            :key="project.id"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ project.name }}</td>
            <td>
              <progress
                class="progress progress-success w-56"
                :value="projectsStore.getProjectProgress(project.id)"
                max="100"
              ></progress>
            </td>
          </tr>
        </template>

        <!-- Si HAY proyecto seleccionado, mostrar sus tareas -->
        <template v-else>
          <tr
            v-if="projectsStore.selectedProject.tasks.length > 0"
            v-for="(task, index) in projectsStore.selectedProject.tasks"
            :key="task.id"
          >
            <th>{{ index + 1 }}</th>
            <td>{{ task.name }}</td>
            <td>
              <input
                type="checkbox"
                v-model="task.completed"
                class="checkbox checkbox-accent"
              />
            </td>
          </tr>

          <tr v-else>
            <td colspan="3">Este proyecto no tiene tareas</td>
          </tr>
        </template>
      </tbody>
    </table>

    <!-- Formulario para agregar tareas -->
    <div v-if="projectsStore.selectedProject" class="m-4">
      <form @submit.prevent="handleAddTask" class="flex items-center gap-2">
        <input
          v-model="newTaskName"
          type="text"
          class="input mt-2 focus:outline-none"
          placeholder="Nueva tarea"
        />
        <button
          type="submit"
          class="btn btn-primary mt-2"
          :disabled="!newTaskName.trim()"
        >
          Agregar
        </button>
      </form>
    </div>

    <!-- Botón para volver a la lista de proyectos -->
    <div v-if="projectsStore.selectedProject" class="mt-4">
      <button @click="projectsStore.selectProject(null)" class="btn btn-sm m-2">
        ← Volver a la lista de proyectos
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useProjectsStore } from "@/stores/projects";

const projectsStore = useProjectsStore();

const newTaskName = ref("");

function handleAddTask() {
  const project = projectsStore.selectedProject;
  if (project && newTaskName.value.trim()) {
    projectsStore.addTaskToProject(project.id, newTaskName.value.trim());
    newTaskName.value = "";
  }
}
</script>
