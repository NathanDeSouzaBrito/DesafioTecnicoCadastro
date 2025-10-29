<script setup lang="ts">
import { onMounted } from "vue";
import { useUsers } from "@/stores/useUsers";
import { useRouter } from "vue-router";

const store = useUsers();
const router = useRouter();

// Navigate to user creation page
const goToCreate = () => {
  router.push("/users/create");
};

definePageMeta({
  layout: false,
});

// Loads users when the page is mounted
onMounted(() => {
  store.fetchUsers();
});

// Edit user
const editUser = (id: string | number) => {
  router.push(`/users/${id}`);
};

// Delete user
const deleteUser = (id: string | number) => {
  if (confirm("Deseja excluir este usuário?")) {
    store.remove(id);
  }
};

// Retorna iniciais simples para placeholder quando não há imagem
const getInitials = (name?: string) => {
  if (!name) return "?";
  const parts = name.trim().split(/\s+/).filter(Boolean);
  if (parts.length === 1) return (parts[0] ?? "").slice(0, 2).toUpperCase();
  const first = (parts[0] ?? "")[0] ?? "?";
  const last = parts[parts.length - 1]?.[0] ?? "?";
  return (first + last).toUpperCase();
};
</script>

<template>
  <div class="container">
    <h2>TELA DE LISTAGEM</h2>

    <div class="header">
      <p>Usuários cadastrados</p>
      <button class="btn" @click="goToCreate">Novo Cadastro</button>
    </div>

    <div v-if="store.list.length === 0" class="empty">
      Nenhum usuário cadastrado.
    </div>

    <div v-for="user in store.list" :key="user.id" class="card">
      <div class="info">
        <template v-if="user.avatarUrl">
          <img :src="user.avatarUrl" alt="foto" class="avatar" />
        </template>
        <template v-else>
          <div class="avatar placeholder">{{ getInitials(user.name) }}</div>
        </template>
        <div class="details">
          <strong>{{ user.name }}</strong>
          <small>{{ user.email }}</small>
        </div>
      </div>

      <div class="actions">
        <button class="btn edit" @click="editUser(user.id)">Editar</button>
        <button class="btn delete" @click="deleteUser(user.id)">Excluir</button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 900px;
  margin: 0 auto;
  padding: 2rem;
  font-family: system-ui, sans-serif;
}

h2 {
  text-align: center;
  margin-bottom: 1.5rem;
  font-size: 1.2rem;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.header p {
  font-weight: 500;
}

.btn {
  background: #3b82f6;
  color: #fff;
  border: none;
  border-radius: 6px;
  padding: 6px 14px;
  cursor: pointer;
}

.btn:hover {
  background: #2563eb;
}

.card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 12px 16px;
  margin-bottom: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.info {
  display: flex;
  align-items: center;
  gap: 10px;
}

.avatar {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
  border: 1px solid #ccc;
}

.avatar.placeholder {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background: linear-gradient(135deg, #e2e8f0, #f8fafc);
  color: #334155;
  font-weight: 600;
  font-size: 0.95rem;
  border: 1px solid #e2e8f0;
}

.details {
  display: flex;
  flex-direction: column;
  gap: 2px;
}

.actions {
  display: flex;
  gap: 8px;
}

.btn.edit {
  background: #6b7280;
}

.btn.delete {
  background: #ef4444;
}

.empty {
  text-align: center;
  color: #555;
  border: 1px solid #ddd;
  border-radius: 6px;
  padding: 1rem;
}
</style>
