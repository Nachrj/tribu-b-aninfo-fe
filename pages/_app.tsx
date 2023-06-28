import Layout from "@/components/layout"
import "@/styles/globals.css"
import type { AppProps } from "next/app"

export const PROJECT_URL = "https://aninfo-backend-proyectos.onrender.com"

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}
