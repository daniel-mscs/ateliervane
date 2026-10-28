# Atelier Vane — Portfólio Institucional Editável

Portfólio editorial com **painel administrativo em tempo real**: o dono do site atualiza bio, métricas, projetos e trajetória profissional direto pela interface, sem mexer no código.

🔗 **Demo:** [daniel-mscs.github.io/ateliervane](https://daniel-mscs.github.io/ateliervane/)

## ✨ Funcionalidades

- **Efeito de nuvem multicor no cursor** — renderizado em Canvas, com física de mola (interpolação elástica) e camadas de cor em modo `screen`. Intensidade, raio e resposta ajustáveis pelo painel.
- **Painel de edição ao vivo**
  - Bio, cargo, headline, citação, links sociais, foto de capa e métricas
  - Projetos: criar, editar, excluir, reordenar e escolher o tamanho no Bento Grid (destaque largo ou compacto)
  - Trajetória profissional: adicionar, editar e remover experiências
- **Persistência local** — tudo salvo automaticamente no `localStorage`
- **Portabilidade** — exportar e importar os dados em JSON, ou restaurar o conteúdo original
- **Layout responsivo** com Tailwind CSS

## 🛠️ Stack

- React 19 + TypeScript
- Vite
- Tailwind CSS 4
- Motion (animações)
- Lucide React (ícones)

## 📁 Estrutura

```text
src/
├── components/
│   ├── editor/     → Painel administrativo (bio, projetos, experiências)
│   ├── layout/     → Navbar e Footer
│   ├── modals/     → Lightbox de projetos
│   ├── sections/   → Hero, Bento Grid, Bio & Experiência
│   └── ui/         → Componentes reutilizáveis (efeito do cursor, imagens)
├── context/        → Estado global do portfólio (Context API)
├── data/           → Dados mockados iniciais
├── schemas/        → Validação dos formulários
└── types/          → Tipagens TypeScript
```

## 🚀 Como rodar

```bash
git clone https://github.com/daniel-mscs/ateliervane.git
cd ateliervane
npm install
npm run dev
```

Acesse http://localhost:3000.

## 🗺️ Próximos passos

- [ ] Migrar a validação para **Zod** + **React Hook Form** (a camada de validação já está desacoplada pra isso)
- [ ] Back-end para persistir os dados fora do navegador
- [ ] Autenticação no painel administrativo

## 🤖 Sobre o projeto

Desenvolvido durante a **Imersão de IA em Engenharia de Software da Alura**, usando o **Google AI Studio** como copiloto. O foco foi definir a arquitetura e os requisitos (componentização, tipagem forte, estrutura pronta para evoluir) e revisar o código gerado.

## 👤 Autor

**Daniel Alves**
[Portfólio](https://daniel-alvesdev.com.br) · [LinkedIn](https://www.linkedin.com/in/daniel-mscs) · [GitHub](https://github.com/daniel-mscs)
