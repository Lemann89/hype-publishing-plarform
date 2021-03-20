import React from 'react';
import {useForm} from "react-hook-form";
import styles from '../../styles/sign/sign.module.scss';
import Input, {InputTypes} from "../../components/shared/Input/Input";
import Button, {ButtonTypes} from "../../components/shared/Button/Button";
import Image from "next/image";
import Container from "../../components/basic/container/Container";
import Lines from "../../components/lines/Lines";

const Index = props => {
    const {register, handleSubmit, watch, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data);
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
                        <Input type={InputTypes.Text} register={register} name="email" label="Email"
                            className={styles.input}/>
                        <Input type={InputTypes.Password} register={register} name="password" label="Password"
                            className={styles.input}/>
                        <Button type={ButtonTypes.Primary} isSubmit={true}>Sign In</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Index;
