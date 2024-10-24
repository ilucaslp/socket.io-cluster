
# Socket.IO em PM2 Cluster Mode

Este repositório contém um exemplo de aplicação Socket.IO rodando em modo cluster usando PM2. A aplicação está configurada para rodar com balanceamento de carga através de sticky sessions, o que permite que cada cliente se conecte sempre ao mesmo worker, mesmo em modo cluster.

## Requisitos

- [Node.js](https://nodejs.org/) (>= 14.x)
- [PM2](https://pm2.keymetrics.io/) (>= 5.x)
- [Redis](https://redis.io/) (se estiver usando Redis como adaptador)

## Instalação

1. Clone este repositório:

   ```bash
   git clone https://github.com/ilucaslp/socket.io-cluster.git
   cd socket.io-cluster
   ```

2. Instale as dependências:

   ```bash
   npm install
   ```

3. (Opcional) Se estiver usando Redis, certifique-se de que o Redis está instalado e rodando:

   ```bash
   redis-server
   ```

## Executando com PM2 no modo cluster (Sem `ecosystem.config.js`)

Você pode rodar a aplicação em modo cluster diretamente da linha de comando sem a necessidade de um arquivo de configuração `ecosystem.config.js`.

### Comando para rodar:

```bash
pm2 start server.js -i max --watch
```

### Explicação:
- `server.js`: Arquivo principal da sua aplicação.
- `-i max`: Roda a aplicação com o número máximo de instâncias de acordo com o número de CPUs disponíveis.
- `--watch`: Monitora alterações no código e reinicia os workers automaticamente.

### Parar e remover a aplicação:

```bash
pm2 stop server
pm2 delete server
```

### Monitorar o estado dos workers:

```bash
pm2 list
```

## Executando com PM2 usando `ecosystem.config.js`

Se você preferir utilizar um arquivo de configuração, pode usar o `ecosystem.config.js`, que permite maior controle e flexibilidade sobre como o `pm2` gerencia sua aplicação.

### Passos:

1. Crie o arquivo `ecosystem.config.js` (já incluído neste repositório):

   ```javascript
   module.exports = {
     apps: [
       {
         name: 'socket-app',
         script: './server.js',
         instances: 'max',
         exec_mode: 'cluster',
         watch: true,
         env: {
           NODE_ENV: 'production',
         },
       },
     ],
   };
   ```

2. Inicie a aplicação com o arquivo `ecosystem.config.js`:

   ```bash
   pm2 start ecosystem.config.js
   ```

### Explicação:
- `name`: Nome da aplicação.
- `script`: Arquivo de entrada da sua aplicação.
- `instances`: Número de instâncias a serem rodadas (use `'max'` para utilizar todas as CPUs disponíveis).
- `exec_mode`: Configurado como `'cluster'` para rodar no modo cluster.
- `watch`: Monitora mudanças no código e reinicia automaticamente.

### Monitorar o estado dos workers:

```bash
pm2 list
```

### Parar e remover a aplicação:

```bash
pm2 stop socket-app
pm2 delete socket-app
```

## Monitoramento e Logs

PM2 oferece várias ferramentas para monitorar sua aplicação:

- Para ver os logs:

  ```bash
  pm2 logs
  ```

- Para ver métricas em tempo real:

  ```bash
  pm2 monit
  ```

## Considerações Finais

Utilizar o `pm2` no modo cluster é uma forma eficiente de escalar sua aplicação, utilizando o máximo de poder de processamento disponível. Se você está rodando a aplicação em um ambiente local ou de produção, o `pm2` oferece um gerenciamento simples e poderoso de processos, com suporte a reinicialização automática, balanceamento de carga e monitoramento de processos.

Se quiser adaptar para uma aplicação distribuída em múltiplos servidores, considere usar o Redis como adaptador para sincronizar eventos de `Socket.IO` entre diferentes instâncias.

