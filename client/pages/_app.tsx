import '../styles/globals.scss';
import '../styles/main.scss';
import Layout from "../components/basic/layout/Layout";
import {wrapper} from "../store";
import App, {AppContext, AppInitialProps, AppProps} from "next/app";
import cookies from "next-cookies";
import {AuthActionsTypes} from "../types/auth";

class MyApp extends App<AppInitialProps> {


    public static getInitialProps = async ({Component, ctx}: AppContext) => {

        const token = cookies(ctx).token;

        if(token) {
            ctx.store.dispatch({type: AuthActionsTypes.IS_AUTHORIZED, payload: true})
        }

        return {
            pageProps: {
                // Call page-level getInitialProps
                ...(Component.getInitialProps ? await Component.getInitialProps(ctx) : {}),
                // Some custom thing for all pages
                pathname: ctx.pathname,
            },
        };

    };

    public render() {
        const {Component, pageProps} = this.props;

        return (
            <Layout {...pageProps}>
                <Component {...pageProps} />
            </Layout>
        )
    };
}

export default wrapper.withRedux(MyApp);
