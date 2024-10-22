module.exports = {
    apps: [
      {
        name: 'socket-app',
        script: './server.js',
        instances: 'max',  // Utilize o número máximo de CPUs disponíveis
        exec_mode: 'cluster',  // Executa em modo cluster
        env: {
          NODE_ENV: 'production',
        },
      },
    ],
  };
  