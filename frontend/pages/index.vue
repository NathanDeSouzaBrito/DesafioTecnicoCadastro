<script setup lang="ts">
const router = useRouter();

onMounted(() => {
  router.push("/users");
});
</script>

<template>
  <div
    style="
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    "
  >
    <p>Carregando...</p>
  </div>
</template>
