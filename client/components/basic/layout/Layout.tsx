import React from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "../../../styles/basics/layout/layout.module.scss";
import ReactNotification from 'react-notifications-component';
import 'react-notifications-component/dist/theme.css';
import 'animate.css/animate.min.css';

const Layout = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <ReactNotification />
            <div className={styles.content}>
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
