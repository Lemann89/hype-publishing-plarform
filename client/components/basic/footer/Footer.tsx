import React from 'react';
import Container from "../container/Container";
import styles from "../../../styles/basics/footer/footer.module.scss";
import Link from "next/link";

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <Container>
                <div className={styles.content}>
                    <Link href="/">
                        <a className={styles.logo}>
                            <span>hype.</span>
                        </a>
                    </Link>
                    <span className={styles.author}>
                        ©{new Date().getFullYear()} by Vladislav Korotkov
                    </span>
                </div>

            </Container>
        </footer>
    );
};

export default Footer;
