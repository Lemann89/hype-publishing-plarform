import React from 'react';
import styles from '../../../styles/basics/header/header.module.scss';
import Button, {ButtonTypes, HtmlTypes} from "../../shared/Button/Button";
import Icon, {IconSizes} from "../../shared/Icon/Icon";
import {Icons} from "../../shared/Icon/icons";
import Link from 'next/link';
import Container from "../container/Container";
import {useTypedSelector} from "../../../hooks/useTypedSelector";
import {useDispatch} from "react-redux";
import {setIsAuthorized} from "../../../store/actions/authActions";

const Header: React.FC = () => {
    const {isAuthorized} = useTypedSelector(state => state.auth);

    const dispatch = useDispatch();

    const logout = () => {
        document.cookie = 'token=;';
        dispatch(setIsAuthorized(false));
    };

    const unAuthorizedActions = () => {
        return (
            <>
                <Link href="/signin">
                    <Button htmlType={HtmlTypes.A} type={ButtonTypes.Empty} className={styles.listItem}>
                        Sign In
                    </Button>
                </Link>
                <Link href="/signup">
                    <Button htmlType={HtmlTypes.A} type={ButtonTypes.Primary} className={styles.listItem}>
                        Sign Up
                    </Button>
                </Link>
            </>);
    };

    const authorizedActions = () => {
        return (
            <>
                <Link href="/profile">
                    <Button htmlType={HtmlTypes.A} type={ButtonTypes.Empty} className={styles.listItem}>
                        Profile
                    </Button>
                </Link>
                <Link href="/write">
                    <Button htmlType={HtmlTypes.A} type={ButtonTypes.Primary} className={styles.listItem}>
                        Write
                    </Button>
                </Link>
                <Button type={ButtonTypes.Primary} className={styles.listItem} onClick={logout}>
                        Log Out
                </Button>
            </>);
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
                        <Link href="/search">
                            <a className={styles.listItem}>
                                <Icon type={Icons.Search} size={IconSizes.Default}/>
                            </a>
                        </Link>
                        {isAuthorized ? authorizedActions() : unAuthorizedActions()}
                    </div>
                </div>
            </Container>
        </header>
    );
};

export default Header;
