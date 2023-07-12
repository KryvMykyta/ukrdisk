declare namespace NodeJS {
  export interface ProcessEnv {
    PGHOST: string;
    PGDATABASE: string;
    PGUSER: string;
    PGPASSWORD: string;
    ENDPOINT_ID: string;
    CONN_URL: string;
    BOT_TOKEN: string;
    MAIL_USER: string;
    MAIL_PASS: string;
    MAIL_SERVICE: string;
  }
}
