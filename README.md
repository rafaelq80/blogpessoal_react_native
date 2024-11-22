# 🚧 Projeto Blog Pessoal - Mobile (Expo Router)

<br />

<div align="center">
    <img src="https://i.imgur.com/EGUUELt.png" title="source: imgur.com" width="60%"/> 
    <p>+</p>
    <img src="https://ik.imagekit.io/vzr6ryejm/react_native/logo-wordmark-light_v2.png?updatedAt=1719817353728" title="source: imgur.com" width="25%"/> 
</div>


<br /><br />

## 1. Descrição

O Projeto Blog Pessoal é um **aplicativo mobile** (app Android e IOS), desenvolvido em **React Native** e **Expo**, com o objetivo de consumir  a API Blog Pessoal, desenvolvida em **Nest JS**. A aplicação permite o gerenciamento das **Postagens**, dos **Temas** das postagens e dos **Usuários**.

### 1.1. Principais Funcionalidades

- **CRUD das Postagens**: Gerenciamento das postagens.
- **CRUD dos Temas**: Gerenciamento dos temas das postagens.
- **CRUD dos Usuários**: Gerenciamento dos usuários.

------

## 2. Tecnologias

| Item                         | Descrição                 |
| ---------------------------- | ------------------------- |
| **Servidor**                 | Node JS                   |
| **Linguagem de programação** | TypeScript                |
| **Biblioteca**               | React Native 0.76         |
| **Build**                    | Expo 52                   |
| **Estilização**              | Tailwind + Nativewind 4.0 |

------

## 3. Outras Bibliotecas

| Item                              | Descrição                       |
| --------------------------------- | ------------------------------- |
| **Expo Vector Icons**             | Ícones                          |
| **Expo Router**                   | Rotas e Navegação (Stack e Tab) |
| **Axios**                         | Consumo da API                  |
| **React Native Element Dropdown** | Select input                    |
| **Sonner Toastify React Native**  | Alerts                          |
| **Expo Cam**                      | Câmera                          |
| **Expo Gallery**                  | Galeria de fotos                |

------

## 4. Pré-requisitos

Antes de iniciar, certifique-se de ter as seguintes ferramentas instaladas:

- [Node.js](https://nodejs.org/)
- [yarn](https://yarnpkg.com/)
- [Expo](https://docs.expo.dev/tutorial/create-your-first-app/)
- Backend da API NestJS rodando ([Repositório da API](https://github.com/rafaelq80/blogpessoal_nest_2024))
- [Android Studio](https://developer.android.com/studio?hl=pt-br)
- Emulador do Android Studio ou [Memu](https://www.memuplay.com/)

------

## 5. Instalação - Ambiente Local

### 5.1. Instalação do Expo

```bash
npm install expo-cli@latest
```

### 5.2. Clonando o repositório

```bash
git clone https://github.com/usuario/blogpessoal_react_native.git
cd blogpessoal_react_native
```

### 5.3. Instalando as dependências

Utilize o comando abaixo para instalar todas as bibliotecas através do npx:

```bash
npx expo install
```

### 5.4. Configuração do ambiente

A URL da API NestJS deve estar apontando para o endereço abaixo:

```bash
http://ip_computador:4000
```

### 5.4. Executando o projeto

Inicie o app com o npm:

```bash
npm run android
```

Abra o app no Emulador de sua preferência ou no seu celular (Android ou IOS), apontando para o QR-Code que será exibido no Terminal

> [!TIP]
>
> Para executar o app no seu celular, visite a loja de aplicativos do seu aparelho e instale o **Expo Go**.

> [!WARNING]
>
> No Ambiente Windows, só é possível gerar o app na versão Android. Para gerar o app na versão IOS é necessário utilizar uma máquina virtual ou um computador da Apple executando o MAC OS.

---

## 6. Estrutura do Projeto

```plaintext
src/
├── /app                  # Telas e a Navegação do app
├── /assets               # Splash e Ícone do app
├── /components           # Componentes reutilizáveis
├── /models               # Modelos de dados do aplicativo
├── /services             # Chamadas de API e serviços
├── /stores               # Estado Global do app
├── /styles               # Arquivos de estilização nativa
├── /utils                # Funções utilitárias
├── /validations          # Validações dos campos dos Formulários
├── App.tsx               # Ponto de entrada do aplicativo
└── package.json          # Dependências e configurações do projeto

```

------

## 7. Implementações Futuras

- [x] Implementar o cadastro do usuário com foto via Câmera e Galeria

------

## 8. Referências sobre React Native

- <a href="https://reactnative.dev/" target="_blank">Site Oficial - React Native</a>
- <a href="https://reactnative.dev/docs/environment-setup" target="_blank">Documentação Oficial - React Native</a>
- <a href="https://expo.dev/" target="_blank">Site Oficial - Expo</a>
- <a href="https://docs.expo.dev/" target="_blank">Documentação Oficial - Expo</a>
