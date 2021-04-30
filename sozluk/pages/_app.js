import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import Header from '../components/header'


function MyApp({ Component, pageProps }) {
  return (
    <>
      <Header />
      <Component {...pageProps} />
    </>
  )
}

export default MyApp
