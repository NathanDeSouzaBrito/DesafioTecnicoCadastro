<template>
  <header class="header">
    <h2>TELA DE CADASTRO</h2>
    <svg
      class="icon"
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      viewBox="0 0 24 24"
      stroke-width="2"
      stroke="currentColor"
    >
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.087c1.543-.89 3.31.877 2.42 2.42a1.724 1.724 0 001.087 2.573c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.087 2.573c.89 1.543-.877 3.31-2.42 2.42a1.724 1.724 0 00-2.573 1.087c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.087c-1.543.89-3.31-.877-2.42-2.42a1.724 1.724 0 00-1.087-2.573c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.087-2.573c-.89-1.543.877-3.31 2.42-2.42a1.724 1.724 0 002.573-1.087z"
      />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
      />
    </svg>
  </header>

  <main class="content">
    <slot />
  </main>
</template>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  padding: 1rem 2rem;
  background: #fff;
  font-family: system-ui, sans-serif;
  margin-top: 50px;
}

.header h2 {
  margin: 0;
  font-size: 1rem;
  font-weight: 700;
}

.icon {
  position: absolute;
  right: 2rem;
  width: 20px;
  height: 20px;
  color: #111;
  cursor: pointer;
  transition: transform 0.2s ease, color 0.2s ease;
}

.icon:hover {
  transform: rotate(45deg);
  color: #3b82f6;
}

.content {
  padding: 2rem;
  max-width: 960px;
  margin: 0 auto;
}

@media (max-width: 700px) {
  h2 {
    position: relative;
    top: 50px;
  }
}
</style>
