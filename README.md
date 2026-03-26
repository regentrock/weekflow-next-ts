# WeekFlow - Gerenciador de Tarefas Semanais

Aplicação web moderna para gerenciamento de tarefas com foco em organização semanal, produtividade e experiência do usuário.

---

## Sobre o projeto

O **WeekFlow** é um gerenciador de tarefas que permite organizar atividades ao longo da semana de forma visual e intuitiva.

Diferente de listas tradicionais, o sistema utiliza uma estrutura baseada em dias da semana, permitindo ao usuário distribuir tarefas com clareza e manter controle sobre sua rotina.

O projeto foi desenvolvido com foco em usabilidade, componentização e manipulação de estados complexos em Next.

---

## Funcionalidades

* Criar, editar e excluir tarefas
* Organização por dias da semana
* Drag and drop entre cards para reorganizá-los entre si
* Marcar tarefas como concluídas
* Filtros de visualização
* Persistência de dados (localStorage)
* Interface responsiva
* Aplicação disponível para download, utilizando PWA
* Opções definidas pelo usuário entre: modo claro/escuro, e linguagens entre inglês/português

---

## Tecnologias utilizadas

* Next.js
* TypeScript
* CSS Modules
* Dnd-kit (drag and drop)
* Context API
* Git & GitHub
* PWA

---

## Como rodar o projeto

* acesse o seguinte link para visualizar o projeto:
https://weekflow-next-ts.vercel.app/

ou

1. Clone o repositório:

```bash id="f3k8s1"
git clone https://github.com/regentrock/weekflow
```

2. Acesse a pasta do projeto:

```bash id="x8d2la"
cd weekflow
```

3. Instale as dependências:

```bash id="p9s3mq"
npm install
```

4. Rode o projeto:

```bash id="j2k4vn"
npm run dev
```

5. Acesse no navegador:

```bash id="r7c1yb"
http://localhost:3000
```

---

## Arquitetura e decisões técnicas

* Uso de **Context API** para gerenciamento global de estado
* Separação de componentes para facilitar reutilização
* Implementação de **drag-and-drop com Dnd-kit** para melhor performance
* Persistência com **localStorage**, evitando necessidade de backend

---

## Autor

Desenvolvido por Ângelo David
🔗 https://github.com/regentrock

