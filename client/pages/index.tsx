import Header from "../components/basic/header/Header";
import Head from 'next/head';
import Hero from "../components/basic/hero/Hero";
import Posts from "../components/posts/Posts";

export default function Home() {
    return (
        <div>
            <Head>
                <title>hype.</title>
                <meta name="viewport" content="initial-scale=1.0, width=device-width"/>
            </Head>
            <Header/>
            <Hero/>
            <Posts/>
        </div>
    );
}
