## Invoicer
### easy invoice generator
- TODO: backend server to store invoices locally
- TODO: styling xD


- this is meant for people who generate invoices to the same company with the same value
- create `.env.local` file and add your values 
```
  VITE_FROM_COMPANY: string
  VITE_FROM_NAME: string
  VITE_FROM_COUNTRY: string
  VITE_FROM_EMAIL: string
  VITE_TO_COMPANY: string
  VITE_TO_NAME: string
  VITE_TO_COUNTRY: string
  VITE_TO_EMAIL: string
  VITE_VALUE: number
```
- `pnpm run dev` to run application