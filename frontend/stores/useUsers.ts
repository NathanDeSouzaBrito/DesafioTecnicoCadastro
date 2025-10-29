import { defineStore } from "pinia";
import api from "@/services/api";

// Nomeado como `useUsers` para combinar com os imports nos componentes
export const useUsers = defineStore("users", {
  state: () => ({
    users: [] as any[],
  }),

  getters: {
    // getter compatível com templates que usam `store.list`
    list: (state) => state.users,
  },

  actions: {
    async fetchUsers() {
      try {
        const response = await api.get("/users");
        this.users = response.data;
      } catch (error) {
        console.error("Erro ao buscar usuários:", error);
      }
    },

    async createUser(userData: any) {
      try {
        const response = await api.post("/users", userData);
        this.users.push(response.data);
        alert("Usuário cadastrado com sucesso!");
      } catch (error: any) {
        console.error("Erro ao criar usuário:", error?.response ?? error);
        alert("Erro ao cadastrar usuário!");
      }
    },

    // Mantém o nome original, mas também adiciona aliases para compatibilidade
    async deleteUser(id: number | string) {
      try {
        const numericId = Number(id);
        await api.delete(`/users/${numericId}`);
        this.users = this.users.filter((u) => u.id !== numericId);
      } catch (error) {
        console.error("Erro ao excluir usuário:", error);
      }
    },

    async update(id: number | string, userData: any) {
      try {
        const numericId = Number(id);
        const response = await api.put(`/users/${numericId}`, userData);
        // substituir o usuário localmente
        this.users = this.users.map((u) =>
          u.id === numericId ? response.data : u
        );
      } catch (error) {
        console.error("Erro ao atualizar usuário:", error);
      }
    },

    // Alias compatível com componentes que chamam `store.add` ou `store.remove`
    add(userData: any) {
      return this.createUser(userData);
    },

    remove(id: number | string) {
      return this.deleteUser(id);
    },
  },
});
