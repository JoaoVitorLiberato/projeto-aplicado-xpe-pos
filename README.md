# 🍣 Bangalô API v2

API RESTful desenvolvida para gerenciamento de restaurante (Bangalô Sushi), implementando Clean Architecture, princípios SOLID e padrões de design modernos.

## 📋 Índice

- [Tecnologias](#-tecnologias)
- [Arquitetura](#-arquitetura)
- [Princípios SOLID](#-princípios-solid)
- [Estrutura do Projeto](#-estrutura-do-projeto)
- [Instalação e Execução](#-instalação-e-execução)
- [Variáveis de Ambiente](#-variáveis-de-ambiente)
- [Docker](#-docker)
- [Padrões de Design](#-padrões-de-design)
- [Funcionalidades](#-funcionalidades)
- [Documentação da API](#-documentação-da-api)

## 🚀 Tecnologias

### Runtime e Framework
- **Bun** - Runtime JavaScript/TypeScript de alta performance
- **Elysia** - Framework web moderno e performático para Bun
- **TypeScript** - Linguagem de programação com tipagem estática

### Banco de Dados
- **PostgreSQL** - Banco de dados relacional
- **Sequelize** - ORM para Node.js/Bun
- **Redis** - Cache e pub/sub para notificações em tempo real

### Autenticação e Segurança
- **@elysiajs/jwt** - Autenticação JWT
- **argon2** - Hash de senhas seguro
- **crypto-js** - Criptografia adicional

### Armazenamento
- **AWS S3** (@aws-sdk/client-s3) - Armazenamento de arquivos na nuvem
- **Cloudflare R2** - Alternativa de storage (via adapters)

### Integrações
- **InfinitePay** - Gateway de pagamento
- **WebSocket** - Comunicação em tempo real
- **Axios** - Cliente HTTP para requisições externas

### Injeção de Dependência
- **tsyringe** - Container de injeção de dependência
- **reflect-metadata** - Suporte a metadados para decorators

### Documentação
- **@elysiajs/swagger** - Documentação automática da API

### DevOps
- **Docker** - Containerização
- **Docker Compose** - Orquestração de containers
- **Nginx** - Reverse proxy e load balancer

## 🏗️ Arquitetura

O projeto segue os princípios da **Clean Architecture**, organizando o código em camadas bem definidas com responsabilidades claras:

```
┌─────────────────────────────────────────────────────────┐
│                    Presentation Layer                    │
│  (Controllers, Routes, Middlewares, WebSocket)           │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                   Application Layer                      │
│  (Use Cases, Services, Contracts/Interfaces)             │
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                     Domain Layer                        │
│  (Entities, Value Objects, Ports, Factories, Validators)│
└──────────────────────┬──────────────────────────────────┘
                       │
┌──────────────────────▼──────────────────────────────────┐
│                Infrastructure Layer                     │
│  (Repositories, Adapters, Database, Redis, External APIs)│
└─────────────────────────────────────────────────────────┘
```

### Camadas da Arquitetura

#### 1. **Domain Layer** (`src/Domain/`)
Camada mais interna, contém as regras de negócio puras:
- **Entities**: Entidades de domínio (User, Product, Order, Category, etc.)
- **Ports**: Interfaces que definem contratos (Repositories, Gateways, WebSocket)
- **Factories**: Criação de objetos de domínio com validação
- **Validators**: Validação de dados de domínio (Email, Password, Name, etc.)

#### 2. **Application Layer** (`src/Application/`)
Camada de casos de uso e serviços de aplicação:
- **Usecases**: Orquestram a lógica de negócio
- **Services**: Serviços de aplicação que coordenam múltiplos use cases
- **Contracts**: Interfaces para comunicação entre camadas

#### 3. **Infrastructure Layer** (`src/Infrastructure/`)
Implementações concretas de adapters e infraestrutura:
- **Repositories**: Implementação de persistência de dados
- **Adapters**: Adaptadores para serviços externos (Gateways, Storage, Notifications)
- **Database**: Configuração e modelos do banco de dados
- **Redis**: Implementação de cache e pub/sub
- **Balancer**: Load balancer para múltiplas instâncias

#### 4. **Presentation Layer** (`src/Presentation/`)
Interface com o mundo externo:
- **Controllers**: Controladores HTTP que recebem requisições
- **Routes**: Definição de rotas da API
- **Middlewares**: Autenticação e validação de rotas
- **WebSocket**: Comunicação em tempo real

#### 5. **Shared Layer** (`src/Shared/`)
Código compartilhado entre camadas:
- **Containers**: Configuração de injeção de dependência (tsyringe)
- **Utils**: Utilitários gerais

## 🎯 Princípios SOLID

O projeto aplica rigorosamente os cinco princípios SOLID:

### 1. **Single Responsibility Principle (SRP)**
Cada classe tem uma única responsabilidade:
- `OrderUseCase`: Apenas orquestra operações de pedidos
- `OrderService`: Coordena múltiplos use cases relacionados a pedidos
- `OrderController`: Apenas recebe requisições HTTP e delega para services
- `OrderRepository`: Apenas gerencia persistência de pedidos

### 2. **Open/Closed Principle (OCP)**
O sistema é aberto para extensão, fechado para modificação:
- **Ports/Interfaces**: Permitem adicionar novas implementações sem modificar código existente
- **Adapters**: Novos gateways de pagamento podem ser adicionados implementando `IGatewayPort`
- **Repositories**: Novas implementações de persistência podem ser criadas implementando as interfaces

**Exemplo:**
```typescript
// Interface que permite extensão
interface IGatewayPort {
  create(order: Order): Promise<any>;
  validate(data: Gateway): Promise<any>;
}

// Implementação atual
class InfinitePayAdapter implements IGatewayPort { ... }

// Nova implementação pode ser adicionada sem modificar código existente
class StripeAdapter implements IGatewayPort { ... }
```

### 3. **Liskov Substitution Principle (LSP)**
Implementações podem ser substituídas sem quebrar o código:
- Qualquer implementação de `IOrderRepository` pode substituir `OrderRepository`
- Qualquer implementação de `IGatewayPort` pode substituir `InfinitePayAdapter`
- A injeção de dependência garante que as substituições funcionem corretamente

### 4. **Interface Segregation Principle (ISP)**
Interfaces específicas e focadas:
- `IOrderRepository`: Apenas métodos relacionados a pedidos
- `IProductRepository`: Apenas métodos relacionados a produtos
- `IGatewayPort`: Apenas métodos de gateway de pagamento
- Interfaces não forçam implementação de métodos não utilizados

### 5. **Dependency Inversion Principle (DIP)**
Dependências apontam para abstrações, não para implementações concretas:
- **Use Cases** dependem de interfaces (`IOrderRepository`), não de implementações
- **Services** dependem de interfaces, não de classes concretas
- **Injeção de Dependência** via `tsyringe` garante inversão de controle

**Exemplo:**
```typescript
@injectable()
export class OrderUseCase {
  constructor(
    @inject("IOrderRepository") private repository: IOrderRepository
  ) {}
  // Depende da interface, não da implementação concreta
}
```

## 📁 Estrutura do Projeto

```
restaurante-app/
├── src/
│   ├── Application/              # Camada de Aplicação
│   │   ├── Contracts/            # Interfaces/Contratos
│   │   ├── Services/             # Serviços de aplicação
│   │   └── Usecases/            # Casos de uso
│   │
│   ├── Domain/                   # Camada de Domínio
│   │   ├── Entities/            # Entidades de domínio
│   │   ├── Factory/             # Factories para criação de entidades
│   │   ├── Ports/               # Interfaces (Ports)
│   │   └── Validators/          # Validadores de domínio
│   │
│   ├── Infrastructure/          # Camada de Infraestrutura
│   │   ├── Adapters/           # Adaptadores externos/internos
│   │   │   ├── External/       # Adaptadores para serviços externos
│   │   │   └── Internal/       # Adaptadores internos (WebSocket, Gateways)
│   │   ├── Balancer/            # Load balancer
│   │   ├── Buckets/             # Storage (S3, Cloudflare)
│   │   ├── Database/            # Configuração e modelos do banco
│   │   ├── Redis/               # Implementação Redis
│   │   └── Repositories/        # Implementação de repositórios
│   │
│   ├── Presentation/            # Camada de Apresentação
│   │   └── Http/               # HTTP (Controllers, Routes, Middlewares)
│   │
│   ├── Shared/                  # Código compartilhado
│   │   ├── Containers/         # Configuração DI (tsyringe)
│   │   └── Utils/              # Utilitários
│   │
│   └── Server.ts                # Ponto de entrada da aplicação
│
├── cache/                       # Cache de dados (JSON)
├── nginx/                       # Configuração Nginx
├── tests/                       # Testes (se houver)
├── docker-compose.yaml          # Orquestração Docker
├── Dockerfile                   # Imagem Docker
├── package.json                 # Dependências
├── tsconfig.json                # Configuração TypeScript
└── README.md                    # Este arquivo
```

## 🛠️ Instalação e Execução

### Pré-requisitos
- [Bun](https://bun.sh/) instalado (versão mais recente)
- PostgreSQL em execução
- Redis em execução
- Docker e Docker Compose (opcional)

### Instalação Local

1. **Clone o repositório:**
```bash
git clone <repository-url>
cd restaurante-app
```

2. **Instale as dependências:**
```bash
bun install
```

3. **Configure as variáveis de ambiente:**
Crie um arquivo `.env` na raiz do projeto com as variáveis necessárias (veja seção [Variáveis de Ambiente](#-variáveis-de-ambiente))

4. **Execute o banco de dados:**
Certifique-se de que o PostgreSQL está rodando e que o banco de dados foi criado.

5. **Execute a aplicação:**
```bash
# Modo desenvolvimento (com watch)
bun run dev

# Modo produção (com load balancer)
bun run start
```

A aplicação estará disponível em `http://localhost:3000`

### Execução com Docker

1. **Construa e inicie os containers:**
```bash
docker-compose up -d
```

2. **Acesse a aplicação:**
- API: `http://localhost:3000`
- Nginx (proxy reverso): `http://localhost:8080`

## 🔐 Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
# Aplicação
APPLICATION_PORT=3000
APPLICATION_SECRET_KEY=your-secret-key-for-jwt
NODE_ENV=development

# Banco de Dados
APPLICATION_DB_INTEGRATION=postgresql://user:password@host:port/database
APPLICATION_DB_INTEGRATION_DIALECT=postgres

# Redis
APPLICAITON_REDIS_CHANNEL=order-notifications

# Storage (AWS S3)
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
AWS_REGION=us-east-1
AWS_BUCKET_NAME=your-bucket-name

# Gateway de Pagamento (InfinitePay)
INFINITE_PAY_CHECKOUT=https://checkout-url
INFINITE_PAY_API=https://api-url
INFINITE_PAY_HANDLE=your-handle

# CORS
# Configurado no código para development/production
```

## 🐳 Docker

### Estrutura Docker

O projeto utiliza Docker Compose com três serviços:

1. **app**: Aplicação principal (Bun + Elysia)
2. **redis**: Serviço Redis para cache e pub/sub
3. **nginx**: Reverse proxy e load balancer

### Load Balancer

O projeto implementa um load balancer customizado que:
- Detecta o número de CPUs disponíveis
- Cria múltiplas instâncias da aplicação (uma por CPU)
- Distribui carga automaticamente
- Utiliza `reusePort` do Elysia para compartilhamento de porta

**Arquivo:** `src/Infrastructure/Balancer/LoadingBalancer.infrastructure.balancer.ts`

## 🎨 Padrões de Design

### 1. **Repository Pattern**
Abstração da camada de persistência:
- Interfaces no Domain Layer (`IOrderRepository`, `IProductRepository`)
- Implementações no Infrastructure Layer (`OrderRepository`, `ProductRepository`)

### 2. **Factory Pattern**
Criação de objetos de domínio com validação:
- `UserFactory`, `ProductFactory`, `OrderFactory`
- Garantem que objetos são criados em estado válido

### 3. **Adapter Pattern**
Integração com serviços externos:
- `InfinitePayAdapter` implementa `IGatewayPort`
- `StorageBangaloAdapter` para AWS S3/Cloudflare R2
- `WebSocketAdapter` para comunicação em tempo real

### 4. **Dependency Injection (DI)**
Inversão de controle via `tsyringe`:
- Decorators `@injectable()` e `@inject()`
- Containers de registro em `src/Shared/Containers/`
- Resolução automática de dependências

### 5. **Observer Pattern**
Notificações em tempo real:
- Redis Pub/Sub para eventos
- WebSocket para broadcast
- `RedisSubscribe` e `RedisPublish` para comunicação

### 6. **Strategy Pattern**
Diferentes estratégias podem ser aplicadas:
- Gateways de pagamento (InfinitePay, potencialmente outros)
- Storage providers (S3, Cloudflare R2)

## ✨ Funcionalidades

### Módulos Principais

1. **Autenticação**
   - Login com JWT
   - Hash de senhas com Argon2
   - Middleware de autenticação

2. **Usuários**
   - CRUD completo
   - Upload de thumbnails
   - Validação de dados

3. **Produtos**
   - CRUD completo
   - Categorização
   - Sistema de preços (default e desconto)
   - Diferenças de preço por variação
   - Avaliações de clientes

4. **Categorias**
   - CRUD completo
   - Relacionamento com produtos

5. **Complementos**
   - CRUD completo
   - Preços e descrições

6. **Pedidos (Orders)**
   - Criação de pedidos
   - Gestão de status
   - Integração com gateway de pagamento
   - Notificações em tempo real via WebSocket
   - Analytics e rastreamento

7. **Carrinho (ItemsCart)**
   - Gerenciamento de itens
   - Cálculo de totais

8. **Gateway de Pagamento**
   - Integração com InfinitePay
   - Geração de links de pagamento
   - Validação de transações
   - Webhook handling

### Recursos Adicionais

- **WebSocket**: Notificações em tempo real para pedidos
- **Redis Pub/Sub**: Sistema de eventos distribuído
- **Swagger**: Documentação automática da API
- **CORS**: Configurado para desenvolvimento e produção
- **Load Balancing**: Distribuição de carga automática
- **Storage**: Upload de arquivos para AWS S3/Cloudflare R2

## 📚 Documentação da API

A documentação Swagger está disponível em:
```
http://localhost:3000/swagger
```

### Endpoints Principais

#### Autenticação
- `POST /authentication/login` - Login de usuário
- `POST /authentication/register` - Registro de usuário

#### Usuários
- `GET /users` - Listar usuários
- `GET /users/:id` - Buscar usuário por ID
- `POST /users` - Criar usuário
- `PATCH /users/:id` - Atualizar usuário
- `DELETE /users/:id` - Deletar usuário

#### Produtos
- `GET /products` - Listar produtos
- `GET /products/:id` - Buscar produto por ID
- `POST /products` - Criar produto
- `PATCH /products/:id` - Atualizar produto
- `DELETE /products/:id` - Deletar produto

#### Pedidos
- `GET /orders` - Listar pedidos
- `GET /orders/:id` - Buscar pedido por ID
- `GET /orders/phone/:phone` - Buscar pedidos por telefone
- `GET /orders/today` - Pedidos do dia
- `POST /orders` - Criar pedido
- `PATCH /orders/:id/status` - Atualizar status do pedido
- `DELETE /orders/:id` - Deletar pedido

#### Gateway
- `POST /gateway/create` - Criar link de pagamento

### Autenticação

A API utiliza JWT para autenticação. Inclua o token no header:
```
Authorization: Bearer <token>
```

Algumas rotas também requerem uma API key:
```
x-api-key: <api-key>
```

## 🔄 Fluxo de Dados

### Exemplo: Criação de Pedido

1. **Controller** (`OrderController.create`) recebe requisição HTTP
2. **Service** (`OrderService.create`) coordena a lógica
3. **UseCase** (`OrderUseCase.create`) orquestra operações
4. **Factory** (`OrderFactory.save`) valida e cria entidade
5. **Repository** (`OrderRepository.create`) persiste no banco
6. **Gateway** (`InfinitePayAdapter.create`) gera link de pagamento
7. **Redis Publish** envia evento de notificação
8. **WebSocket** faz broadcast para clientes conectados

## 🧪 Testes

```bash
# Executar testes (quando implementados)
bun test
```

## 📝 Convenções de Código

### Nomenclatura de Arquivos
- Padrão: `NomeClasse.camada.tipo.ts`
- Exemplo: `OrderController.presentation.http.controller.ts`

### Estrutura de Classes
- Decorators `@injectable()` para classes injetáveis
- Injeção via construtor com `@inject()`
- Interfaces para contratos entre camadas

### Validação
- Validators no Domain Layer
- Factories garantem objetos válidos
- Validação de entrada nos Controllers

## 🚀 Deploy

### Produção
1. Configure variáveis de ambiente de produção
2. Build da imagem Docker:
```bash
docker build -t bangalo-api .
```
3. Execute com Docker Compose:
```bash
docker-compose up -d
```

### Variáveis de Produção
- `NODE_ENV=production`
- CORS configurado para domínio de produção
- SSL/TLS configurado no Nginx

## 📄 Licença

Este projeto é privado e proprietário.

## 👥 Contribuição

Este é um projeto privado. Para contribuições, entre em contato com os mantenedores.

---

**Desenvolvido com ❤️ usando Clean Architecture e princípios SOLID**
