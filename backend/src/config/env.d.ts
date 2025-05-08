declare namespace NodeJS {
  interface ProcessEnv {
    MONGO_USER: string;
    MONGO_PASSWORD: string;
    MONGO_HOST: string;
    MONGO_PORT: string;
    MONGO_DB: string;
    NODE_ENV: 'development' | 'production';
  }
}