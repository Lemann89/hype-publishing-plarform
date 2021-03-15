import React from 'react';
import styles from '../styles/header/header.module.scss'
import Button, {ButtonTypes} from "./ui/Button";

const Header: React.FC = () => {
    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.content}>
                    <div className={styles.logo}>
                        <span>hype.</span>
                    </div>
                    <div className={styles.right}>
                        <Button type={ButtonTypes.Empty} className={styles.item}>
                            Sign In
                        </Button>
                        <Button type={ButtonTypes.Primary} className={styles.item}>
                            Sign Up
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
