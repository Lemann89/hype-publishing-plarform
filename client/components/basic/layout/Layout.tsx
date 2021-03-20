import React from 'react';
import Header from "../header/Header";
import Footer from "../footer/Footer";
import styles from "../../../styles/basics/layout/layout.module.scss";

const Layout: React.FC = ({children}) => {
    return (
        <div className={styles.layout}>
            <Header/>
            <div className={styles.content}>
                {children}
            </div>
            <Footer/>
        </div>
    );
};

export default Layout;
