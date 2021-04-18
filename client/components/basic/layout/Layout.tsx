import React from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "../../../styles/basics/layout/layout.module.scss";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';
import Head from "next/head";

const Layout:React.FC = ({children}) => {
    return (<>
        <Head>
            <title>hype.</title>
            <meta name="description" content="hype. is an open platform where readers find dynamic thinking, and where expert and undiscovered voices can share their writing on any topic."/>
            <meta name="robots" content="index, follow"/>
            <meta name="keywords" content="Blog, articles, writers"/>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
            <link href="/favicon.ico" rel="shortcut icon" />
        </Head>
        <div className={styles.layout}>
            <Header/>
            <ReactNotification />
            <div className={styles.content}>
                {children}
            </div>
            <Footer/>
        </div>
    </>
    );
};

export default Layout;
