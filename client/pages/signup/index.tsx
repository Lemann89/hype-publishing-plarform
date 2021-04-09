import React, {useRef} from 'react';
import {useForm} from "react-hook-form";
import styles from '../../styles/sign/sign.module.scss';
import Input, {InputTypes} from "../../components/shared/Input/Input";
import Button, {ButtonTypes} from "../../components/shared/Button/Button";
import Lines from "../../components/lines/Lines";
import {useDispatch} from "react-redux";
import {login, signup} from "../../services/auth";
import {setIsAuthorized} from "../../store/actions/authActions";
import {useRouter} from "next/router";
import { mailRegex } from '../../utils/regexes';


const Index = () => {
    const {register, handleSubmit, errors, watch} = useForm();
    const password = useRef({});
    password.current = watch("password", "");

    const dispatch = useDispatch();
    const router = useRouter();

    const onLoginSuccess = (token) => {
        document.cookie = `token=${token}`;
        dispatch(setIsAuthorized(true));
        router.push('/posts');
    };

    const onSubmit = (data) => {
        delete data.repeatedPassword;
        signup(data, {
            success: () => {
                delete data.name;
                login(data, {
                    success: (res) => {
                        onLoginSuccess(res.token);
                    }
                });
            }
        });
    };

    return (
        <>
            <Lines/>
            <div className={styles.sign}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Sign Up
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Input
                            type={InputTypes.Text}
                            name="email"
                            label="Email"
                            register={register({required: true, pattern: mailRegex})}
                            className={styles.input}/>
                        {errors.email &&
                        (<span className="form__error-message">
                            Please enter a valid email address
                        </span>)
                        }
                        <Input
                            type={InputTypes.Password}
                            name="password"
                            label="Password"
                            register={register({required: true, minLength: 6})}
                            className={styles.input}/>
                        {errors.password &&
                        (<span className="form__error-message">
                            Weak password
                        </span>)
                        }
                        <Input
                            type={InputTypes.Password}
                            name="repeatedPassword"
                            label="Repeat Password"
                            register={register({
                                required: "This field is required",
                                validate: value =>
                                    value === password.current || "The passwords do not match"
                            })}
                            className={styles.input}/>
                        {errors.repeatedPassword &&
                        (<span className="form__error-message">
                            {errors.repeatedPassword.message}
                        </span>)
                        }
                        <Input
                            type={InputTypes.Text}
                            name="name"
                            label="Full name"
                            register={register({required: "This field is required"})}
                            className={styles.input}/>
                        {errors.name &&
                        (<span className="form__error-message">
                            {errors.name.message}
                        </span>)
                        }
                        <Button type={ButtonTypes.Primary} isSubmit={true} className={styles.btn}>Sign Up</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Index;
