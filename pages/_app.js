import { ApolloProvider } from "@apollo/client"
import client from "../apollo/apollo-client"
import Head from "next/head"
import { createGlobalStyle } from "styled-components"
import "../styles/font.css"
import reset from "../styles/reset"
import global from "../styles/global"
import Header from "../components/Header"
import { AnimateSharedLayout } from "framer-motion"

const GlobalStyle = createGlobalStyle`
  ${reset}
  ${global}
`
function MyApp({ Component, pageProps }) {
  return (
    <ApolloProvider client={client}>
      <GlobalStyle />
      <Head>
        <title>Wildish & Co – Table Tennis Scoreboard</title>
      </Head>
      <AnimateSharedLayout>
        <Header />
        <main className="yellow" style={{ height: "calc(100vh - 100px)" }}>
          <Component {...pageProps} />
        </main>
      </AnimateSharedLayout>
    </ApolloProvider>
  )
}

export default MyApp
