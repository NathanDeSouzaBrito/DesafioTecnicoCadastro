<script setup lang="ts">
import UserForm from "@/components/UserForm.vue";
import { useUsers } from "@/stores/useUsers";
import { computed } from "vue";
import { useRoute, useRouter } from "vue-router";

const store = useUsers();
const route = useRoute();
const router = useRouter();

const user = computed(() =>
  store.list.find((u) => u.id === Number(route.params.id))
);

if (!user.value) router.push("/users");

// Handle form submission
const handleSubmit = (data: any) => {
  store.update(String(route.params.id), { ...data, avatarUrl: data.avatar });
  router.push("/users");
};
</script>

<template>
  <UserForm
    v-if="user"
    :model-value="user"
    submit-label="SALVAR"
    @submit="handleSubmit"
  />
</template>
