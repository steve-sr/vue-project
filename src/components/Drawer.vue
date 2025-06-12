<template>
  <div class="w-80 min-h-screen bg-base-200 p-4">
    <ul class="menu text-base-content">
      <li class="menu-title">
        <span class="text-lg text-white">Proyectos</span>
        <span class="text-sm opacity-50">
          {{ projects.length === 0 ? 'No hay proyectos' : '' }}
        </span>
      </li>

      <!-- Iterar sobre proyectos -->
      <li v-for="project in projects" :key="project.id">
        <template v-if="project.tasks.length > 0">
          <details>
            <!-- Click para seleccionar el proyecto -->
            <summary @click="projectsStore.selectProject(project.id)">
              {{ project.name }}
            </summary>
            <ul>
              <li v-for="task in project.tasks" :key="task.id">
                <a>{{ task.name }}</a>
              </li>
            </ul>
          </details>
        </template>
        <template v-else>
          <!-- Por si el proyecto no tiene tareas -->
          <a @click="projectsStore.selectProject(project.id)">
            {{ project.name }}
          </a>
        </template>
      </li>
    </ul>
  </div>
</template>

<script setup>
import { useProjectsStore } from '@/stores/projects';
const projectsStore = useProjectsStore();
const { projects } = projectsStore;
</script>
