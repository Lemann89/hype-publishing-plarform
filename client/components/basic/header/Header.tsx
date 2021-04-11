import React, {useState} from 'react';
import styles from '../../../styles/basics/header/header.module.scss';
import Button, {ButtonTypes, HtmlTypes} from "../../shared/Button/Button";
import Link from 'next/link';
import Container from "../container/Container";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {setIsAuthorized} from "../../../store/actions/authActions";
import {useRouter} from "next/router";
import {BurgerButton} from "../../shared/BurgerButton/BurgerButton";
import {classNames} from '../../../utils/className';
import {useMediaQuery} from "../../../hooks/useMediaQuery";

const Header: React.FC = () => {
    const {isAuthorized} = useTypedSelector(state => state.auth);

    const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
    const router = useRouter();
    const dispatch = useDispatch();
    const isMobile = useMediaQuery(768);

    const logout = () => {
        document.cookie = 'token=;';
        dispatch(setIsAuthorized(false));
        setIsMobileNavOpen(false);
        router.push('/signin');
    };

    const unAuthorizedActions = () => {
        return (
            <>
                <Link href="/signin">
                    <Button
                        htmlType={HtmlTypes.A}
                        type={ButtonTypes.Empty}
                        className={styles.listItem}
                        onClick={() => {setIsMobileNavOpen(false);}}
                    >
                        Sign In
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button
                        htmlType={HtmlTypes.A}
                        type={ButtonTypes.Primary}
                        className={styles.listItem}
                        onClick={() => {setIsMobileNavOpen(false);}}
                    >
                        Sign Up
                    </Button>
                </Link>
            </>);
    };

    const authorizedActions = () => {
        return (
            <>
                <Link href="/profile">
                    <Button
                        htmlType={HtmlTypes.A}
                        type={ButtonTypes.Empty}
                        className={styles.listItem}
                        onClick={() => {setIsMobileNavOpen(false);}}
                    >
                        Profile
                    </Button>
                </Link>
                <Link href="/write">
                    <Button
                        htmlType={HtmlTypes.A}
                        type={ButtonTypes.Primary}
                        className={styles.listItem}
                        onClick={() => {setIsMobileNavOpen(false);}}
                    >
                        Write
                    </Button>
                </Link>
                <Button
                    type={ButtonTypes.Primary}
                    className={styles.listItem}
                    onClick={logout}
                >
                    Log Out
                </Button>
            </>);
    };

    const detectIsAuthorized = () => isAuthorized ? authorizedActions() : unAuthorizedActions();

    const mobileActions = () => {
        return (
            <>
                <BurgerButton onClick={() => {
                    setIsMobileNavOpen(!isMobileNavOpen);
                }}
                isActive={isMobileNavOpen}
                />
                {isMobileNavOpen && (
                    <div className={styles.slideMenu}>
                        <div className={styles.slideMenuOverlay} onClick={() => {setIsMobileNavOpen(false);}}>
                        </div>
                        <div className={styles.slideMenuInner}>
                            <div className={classNames([styles.slideMenuBody, 'slide__menu-body'])}>
                                {detectIsAuthorized()}
                            </div>
                        </div>
                    </div>
                )}
            </>
        );
    };

    return (
        <header className={styles.header}>
            <Container>
                <div className={styles.content}>
                    <Link href="/">
                        <a className={styles.logo}>
                            <span>hype.</span>
                        </a>
                    </Link>
                    <div className={styles.right}>
                        {
                            isMobile ? mobileActions() : detectIsAuthorized()
                        }
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
