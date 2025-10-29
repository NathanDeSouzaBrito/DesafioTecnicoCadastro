<script setup lang="ts">
import { ref, watch } from "vue";
import { useRouter } from "vue-router";

const props = defineProps<{ submitLabel?: string; modelValue?: any }>();
const emit = defineEmits<{ (e: "submit", payload: any): void }>();

const router = useRouter();

// Voltar à página anterior
const goBack = () => router.back();

// Form state
const user = ref({
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  cpf: "",
  birthDate: "",
  avatar: "" as string | null,
});

// Se receber `modelValue` (edição), inicializa o form com esses valores
watch(
  () => props.modelValue,
  (v) => {
    if (v) {
      user.value = {
        name: v.name || "",
        email: v.email || "",
        password: "",
        confirmPassword: "",
        cpf: v.cpf || "",
        birthDate: v.birthDate || "",
        avatar: v.avatarUrl || v.avatar || "",
      };
    }
  },
  { immediate: true }
);

// Update image when selecting a new file
const handleFile = (e: Event) => {
  const file = (e.target as HTMLInputElement).files?.[0];
  if (!file) return;
  const reader = new FileReader();
  reader.onload = () => (user.value.avatar = reader.result as string);
  reader.readAsDataURL(file);
};

// Handle form submission: emite os dados para o pai
const handleSubmit = (e: Event) => {
  e.preventDefault();
  if (user.value.password !== user.value.confirmPassword) {
    alert("As senhas são diferentes");
    return;
  }
  emit("submit", {
    name: user.value.name,
    email: user.value.email,
    password: user.value.password,
    cpf: user.value.cpf,
    birthDate: user.value.birthDate,
    avatarUrl: user.value.avatar ?? undefined,
  });
};

// CPF input masking
const maskCpf = (e: Event) => {
  let value = (e.target as HTMLInputElement).value;
  value = value.replace(/\D/g, "");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d)/, "$1.$2");
  value = value.replace(/(\d{3})(\d{1,2})$/, "$1-$2");
  user.value.cpf = value;
};
</script>

<template>
  <div class="container">
    <form class="form" @submit="handleSubmit">
      <div class="form-left">
        <div class="field">
          <label>Nome</label>
          <input type="text" v-model="user.name" required />
        </div>

        <div class="field">
          <label>Email</label>
          <input type="email" v-model="user.email" required />
        </div>

        <div class="field">
          <label>Senha</label>
          <input type="password" v-model="user.password" required />
        </div>

        <div class="field">
          <label>Confirmar senha</label>
          <input type="password" v-model="user.confirmPassword" required />
        </div>

        <div class="field">
          <label>CPF</label>
          <input
            type="text"
            v-model="user.cpf"
            @input="maskCpf"
            maxlength="14"
            placeholder="000.000.000-00"
            required
          />
        </div>

        <div class="field">
          <label>Data de Nasc.</label>
          <input type="date" v-model="user.birthDate" required />
        </div>
      </div>

      <div class="image-area">
        <label class="image-picker" for="avatar">
          <template v-if="user.avatar">
            <img :src="user.avatar" alt="avatar" />
          </template>
          <template v-else>
            <div class="plus">+</div>
            <small>Escolha a imagem do seu usuário</small>
          </template>
        </label>
        <input
          id="avatar"
          type="file"
          accept="image/*"
          @change="handleFile"
          hidden
        />
      </div>

      <div class="buttons">
        <button type="button" class="btn back" @click="goBack">Voltar</button>
        <button type="submit" class="btn submit">
          {{ submitLabel || "CADASTRAR" }}
        </button>
      </div>
    </form>
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
  justify-content: center;
  align-items: center;
}

.header div {
  display: flex;
  align-items: center;
}

.form {
  display: grid;
  grid-template-columns: 1fr 1fr 220px;
  gap: 1rem;
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1.5rem;
  max-width: 900px;
  margin: 0 auto;
  font-family: system-ui, sans-serif;
  align-items: start;
}

.image-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  height: 100%;
  padding-top: 0.5rem;
}

.image-picker {
  width: 180px;
  height: 180px;
  border: 1px dashed #aaa;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  overflow: hidden;
  text-align: center;
  background-color: #fff;
}

.form-left {
  grid-column: span 2;
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.field {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

label {
  font-size: 0.9rem;
  color: #222;
}

input {
  border: 1px solid #ccc;
  border-radius: 6px;
  padding: 8px;
  outline: none;
}

input:focus {
  border-color: #3b82f6;
}

.image-area {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
}

.image-picker img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.plus {
  font-size: 32px;
  color: #3b82f6;
  line-height: 1;
}

.buttons {
  grid-column: 1 / -1;
  display: flex;
  justify-content: center;
  gap: 1rem;
  margin-top: 1rem;
}

.btn {
  padding: 0.6rem 1.5rem;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  color: #fff;
  font-weight: 500;
}

.btn.submit {
  background: #3b82f6;
}

.btn.submit:hover {
  background: #2563eb;
}

.btn.back {
  background: #6b7280;
}

.btn.back:hover {
  background: #4b5563;
}

small {
  font-size: 0.75rem;
  color: #666;
}

.btn {
  grid-column: 1 / -1;
  margin: 1rem auto 0;
  padding: 0.6rem 1.5rem;
  border: none;
  background: #3b82f6;
  color: white;
  border-radius: 6px;
  cursor: pointer;
}

@media (max-width: 780px) {
  .form {
    grid-template-columns: 1fr;
  }

  .form-left {
    grid-template-columns: 1fr;
  }

  .image-area {
    margin-top: 1rem;
  }

  .image-picker {
    width: 130px;
    height: 130px;
  }

  input {
    width: auto;
  }

  .buttons {
    flex-direction: column-reverse;
  }
}

@media (max-width: 400px) {
  .image-picker {
    width: 100px;
    height: 100px;
  }

  input {
    width: 130px;
  }
}
</style>
