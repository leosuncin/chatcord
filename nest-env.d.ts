declare namespace NodeJS {
  export interface ProcessEnv {
    readonly NODE_ENV: 'development' | 'test' | 'production';
    readonly PORT: string;
    readonly MONGODB_URI: string;
    readonly APP_SECRET: string;
  }
}
