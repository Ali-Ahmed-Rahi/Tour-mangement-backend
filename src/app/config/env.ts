import dotenv from 'dotenv'

dotenv.config()

interface EnvConfig {
  PORT: string,
  DB_URI: string,
  NODE_ENV: "development" | "production"
}


const loadEnvVariables = () : EnvConfig => {
  const requiredEnvVariables:string[]=["PORT","DB_URI","NODE_ENV"];
  
  requiredEnvVariables.forEach(key=>{
    if (!process.env[key]) {
      throw new Error(`Missing require environment variables ${key}`)
    }
  })
  return {
    PORT: process.env.PORT as string,
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    DB_URI: process.env.DB_URI!,
    NODE_ENV: process.env.NODE_ENV as "development" | "production"

  }
}

  export const envVars =loadEnvVariables()