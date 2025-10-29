import { defineStore } from "pinia";
import api from "@/services/api";

export type User = {
  id: number;
  name: string;
  email: string;
  password?: string;
  cpf?: string;
  birthDate?: string;
  avatarUrl?: string | null;
};

export const useUsers = defineStore("users", {
  state: () => ({
    users: [] as User[],
  }),

  getters: {
    list: (s) => s.users,
  },

  actions: {
    async fetchUsers(): Promise<void> {
      try {
        const { data } = await api.get<User[]>("/users");
        this.users = data;
      } catch (err) {
        console.error("fetchUsers:", err);
      }
    },

    async createUser(userData: Partial<User>): Promise<void> {
      try {
        const { data } = await api.post<User>("/users", userData);
        this.users.push(data);
        alert("Usuário cadastrado com sucesso!");
      } catch (err: any) {
        console.error("createUser:", err?.response ?? err);
        alert("Erro ao cadastrar usuário!");
      }
    },

    async deleteUser(id: number | string): Promise<void> {
      try {
        const nid = Number(id);
        await api.delete(`/users/${nid}`);
        this.users = this.users.filter((u) => u.id !== nid);
      } catch (err) {
        console.error("deleteUser:", err);
      }
    },

    async update(id: number | string, userData: Partial<User>): Promise<void> {
      try {
        const nid = Number(id);
        const { data } = await api.put<User>(`/users/${nid}`, userData);
        this.users = this.users.map((u) => (u.id === nid ? data : u));
      } catch (err) {
        console.error("update:", err);
      }
    },

    add(userData: Partial<User>) {
      return this.createUser(userData);
    },

    remove(id: number | string) {
      return this.deleteUser(id);
    },
  },
});
