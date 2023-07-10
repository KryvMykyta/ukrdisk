declare namespace NodeJS {
  export interface ProcessEnv {
    PGHOST:string,
    PGDATABASE:string,
    PGUSER:string,
    PGPASSWORD:string,
    ENDPOINT_ID:string,
    CONN_URL:string,
  }
}
