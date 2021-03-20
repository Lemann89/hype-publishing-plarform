import '../styles/globals.scss';
import '../styles/main.scss';

import Layout from "../components/basic/layout/Layout";

function MyApp({Component, pageProps}) {
    return (
        <Layout>
            <Component {...pageProps} />
        </Layout>
    );
}

export default MyApp;
