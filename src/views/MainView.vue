<template>
  <main>
    <div class="flex">
      <Drawer />
      <Table />
    </div>

    <Button position="bottom-20 right-20" @click="showModalRight = true">
      +
    </Button>

    <!-- Usando el slot para pasar el formulario -->
    <Modal
      v-if="showModalRight"
      title="Nuevo Proyecto"
      @close="showModalRight = false"
    >
      <form @submit.prevent="createProject">
        <input
          v-model="projectName"
          type="text"
          placeholder="Texto aquí"
          class="input input-bordered w-full mb-4 mt-1 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <div class="flex justify-end space-x-3">
          <button type="submit" class="btn btn-primary px-4 py-2 rounded-lg">
            Agregar Proyecto
          </button>
          <button
            type="button"
            class="btn bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg"
            @click="showModalRight = false"
          >
            Cerrar
          </button>
        </div>
      </form>
    </Modal>
  </main>
</template>

<script setup>
import Table from "../components/Table.vue";
import Drawer from "../components/Drawer.vue";
import Button from "../components/Button.vue";
import Modal from "../components/Modal.vue";
import { ref } from "vue";
import { useProjectsStore } from "@/stores/projects";

const showModalRight = ref(false);
const projectName = ref("");
const projectsStore = useProjectsStore();

function createProject() {
  if (projectName.value.trim() === "") return;
  projectsStore.addProject(projectName.value);
  projectName.value = "";
  showModalRight.value = false;
}
</script>
