import React from 'react';
import {useForm} from "react-hook-form";
import styles from '../../styles/sign/sign.module.scss';
import Input, {InputTypes} from "../../components/shared/Input/Input";
import Button, {ButtonTypes} from "../../components/shared/Button/Button";
import Lines from "../../components/lines/Lines";
import {useDispatch} from "react-redux";
import {setIsAuthorized} from "../../store/actions/authActions";
import {ILogin} from "../../types/auth";
import {useRouter} from "next/router";
import {login} from "../../services/auth";
import { mailRegex } from '../../utils/regexes';

const Index = () => {
    const {register, handleSubmit, errors} = useForm();

    const dispatch = useDispatch();
    const router = useRouter();

    const onLoginSuccess = (token) => {
        document.cookie = `token=${token}`;
        dispatch(setIsAuthorized(true));
        router.push('/posts');
    };

    const onSubmit = (data: ILogin) => {
        login(data, {
            success: (res) => {onLoginSuccess(res.token);},
            error: (err) => {
                console.log(err);}
        });
    };

    return (
        <>
            <Lines/>
            <div className={styles.sign}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Sign In
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Input type={InputTypes.Text}
                            register={register({required: true, pattern: mailRegex})}
                            name="email"
                            label="Email"
                            className={styles.input}/>
                        {errors.email && (<span className="form__error-message">
                            Please enter a valid email address
                        </span>)}
                        <Input
                            type={InputTypes.Password}
                            register={register({required: true, minLength: 6})}
                            name="password"
                            label="Password"
                            className={styles.input}/>
                        {errors.password && (<span className="form__error-message">
                            Weak password
                        </span>)}
                        <Button type={ButtonTypes.Primary} isSubmit={true} className={styles.btn}>Sign In</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Index;
