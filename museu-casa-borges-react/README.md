# Museu Casa Borges

Aplicação Next.js do Museu Casa Borges com foco em conteúdo institucional, acervo, biblioteca digital, exposições e futuras rotinas administrativas centralizadas.

## Desenvolvimento

Execute o projeto com:

```bash
npm run dev -- --port 8080
```

A aplicação ficará disponível em `http://localhost:8080`.

## Estrutura inicial do CMS administrativo

O projeto agora possui uma fundação para um backoffice central em `/admin`, desenhado para evoluir como um CMS modular.

### Objetivos

- Centralizar a gestão de conteúdo do site em um único painel
- Separar o domínio por módulos, sem criar uma tabela genérica para tudo
- Usar DTOs como fronteira estável entre interface, serviços e persistência
- Preparar a troca de dados estáticos por Prisma e storage sem reescrever a camada visual

### Módulos previstos

- Acervo
- Biblioteca
- Exposições
- Galerias
- Páginas institucionais
- Equipe
- Configurações globais

### Estrutura técnica

- `src/app/admin` concentra as rotas do painel
- `src/features/admin/dto` contém os contratos DTO do backoffice
- `src/features/admin/config` mantém o registry dos módulos e das coleções
- `src/features/admin/server` expõe serviços preparados para futura integração com Prisma
- `src/features/admin/components` concentra os componentes visuais do painel
- `src/features/admin/auth` concentra DTOs, serviços e componentes de autenticação

### Princípios da implementação

- O painel administrativo não depende diretamente do schema Prisma
- Os contratos DTO definem o formato de entrada e saída esperado pela UI
- Arquivos binários devem ir para storage; o banco deve guardar metadados e referências
- Cada módulo evolui separadamente, mas compartilha navegação, layout e padrões editoriais

### Login administrativo

- A rota `/admin/login` valida credenciais no servidor
- As rotas do painel são protegidas por verificação server-side no layout administrativo
- A sessão é persistida em cookie `HttpOnly`
- O login agora usa usuários persistidos no banco pela tabela `admin_users`

#### Variáveis recomendadas

```env
ADMIN_SESSION_SECRET=defina-um-secret-forte
ADMIN_SESSION_DURATION_HOURS=12
ADMIN_BOOTSTRAP_NAME=Administrador Museu Casa Borges
ADMIN_BOOTSTRAP_EMAIL=admin@seudominio.com
ADMIN_BOOTSTRAP_PASSWORD=defina-uma-senha-forte
```

#### Bootstrap inicial

- Sincronize o schema com o banco:

```bash
npm run prisma:push
```

- Crie ou atualize o primeiro usuário admin:

```bash
npm run admin:bootstrap
```

#### Fallback local de desenvolvimento

- Em ambiente não produtivo, o bootstrap usa por padrão:
- E-mail: `admin@museucasaborges.local`
- Senha: `admin123`

## Próximos passos recomendados

- Implementar serviços reais com Prisma por módulo
- Criar fluxo de upload com storage
- Substituir dados estáticos da UI pública por leitura via banco
- Adicionar formulários e ações administrativas para publicação, edição e exclusão
