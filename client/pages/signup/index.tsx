import React from 'react';
import {useForm} from "react-hook-form";
import styles from '../../styles/sign/sign.module.scss';
import Input, {InputTypes} from "../../components/shared/Input/Input";
import Button, {ButtonTypes} from "../../components/shared/Button/Button";
import Image from 'next/image';
import Container from "../../components/basic/container/Container";


const Index = props => {
    const {register, handleSubmit, watch, errors} = useForm();

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <>
            <div className={styles.lineRight}>
                <Image src='/lines-right.png' width={397} height={404}/>
            </div>
            <div className={styles.lineLeft}>
                <Image src='/lines-left.png' width={449} height={404}/>
            </div>
            {/*<img src="/GrumpyCat.jpg" alt="GrumpyCat"/>*/}
            <div className={styles.sign}>
                <div className={styles.container}>
                    <h1 className={styles.title}>
                        Sign Up
                    </h1>
                    <form onSubmit={handleSubmit(onSubmit)} className={styles.form}>
                        <Input type={InputTypes.Text} register={register} name="email" label="Email" className={styles.input}/>
                        <Input type={InputTypes.Password} register={register} name="password" label="Password" className={styles.input}/>
                        <Input type={InputTypes.Password} register={register} name="confirm" label="Repeat Password" className={styles.input}/>
                        <Input type={InputTypes.Text} register={register} name="fullname" label="Full name" className={styles.input}/>
                        <Button type={ButtonTypes.Primary} isSubmit={true}>Sign Up</Button>
                    </form>
                </div>
            </div>
        </>
    );
};

export default Index;
