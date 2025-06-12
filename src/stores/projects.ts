import { defineStore } from "pinia";
import { ref, computed, watch } from "vue";
import { v4 as uuidv4 } from "uuid";

interface Project {
  id: string;
  name: string;
  tasks: Task[];
  completada?: Date;
}

interface Task {
  id: string;
  name: string;
  completed: boolean;
}

export const useProjectsStore = defineStore("projects", () => {

  const projects = ref<Project[]>([
    {
      id: uuidv4(),
      name: "Project 1",
      tasks: [],
    },
    {
      id: uuidv4(),
      name: "Project 2",
      tasks: [
        {
          id: uuidv4(),
          name: "Task 1",
        },
      ],
    },
  ]);

  const LOCAL_STORAGE_KEY = "projects-data";

  // Cargar desde localStorage si existe
  const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (storedData) {
    try {
      projects.value = JSON.parse(storedData);
    } catch (error) {
      console.error("Error al cargar datos desde localStorage", error);
    }
  }

  watch(
    projects,
    (newProjects) => {
      localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(newProjects));
    },
    { deep: true }
  );

  const selectedProjectId = ref<string | null>(null);

  const selectedProject = computed(() => {
    return projects.value.find((p) => p.id === selectedProjectId.value) || null;
  });

  function addProject(name: string) {
    projects.value.push({
      id: uuidv4(),
      name: name,
      tasks: [],
    });
  }

  function addTaskToProject(projectId: string, taskName: string) {
    const project = projects.value.find((p) => p.id === projectId);
    if (project) {
      project.tasks.push({
        id: uuidv4(),
        name: taskName,
        completed: false,
      });
    }
  }

  function getProjectProgress(projectId: string): number {
    const project = projects.value.find((p) => p.id === projectId);
    if (!project || project.tasks.length === 0) return 0;

    const completedCount = project.tasks.filter((t) => t.completed).length;
    return Math.round((completedCount / project.tasks.length) * 100);
  }

  function selectProject(projectId: string) {
    selectedProjectId.value = projectId;
  }

  return {
    projects,
    addProject,
    addTaskToProject,
    selectedProjectId,
    selectedProject,
    selectProject,
    getProjectProgress,
  };
});
