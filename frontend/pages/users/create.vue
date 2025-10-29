<script setup lang="ts">
import { useUsers } from "@/stores/useUsers";
import { useRouter } from "vue-router";
const store = useUsers();
const router = useRouter();

// Recebe o payload emitido pelo UserForm
const handleSubmit = async (payload: any) => {
  await store.createUser(payload);
  router.push("/users");
};
</script>

<template>
  <UserForm @submit="handleSubmit" submit-label="CADASTRAR" />
</template>
