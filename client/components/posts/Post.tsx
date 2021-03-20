import React from 'react';
import styles from '../../styles/posts/post.module.scss';
import Image from 'next/image';
import Button, {ButtonTypes, HtmlTypes} from "../shared/Button/Button";

const Post = () => {
    return (
        <div className={styles.post}>
            <div className={styles.imgWrapper}>
                <img src="/GrumpyCat.jpg" className={styles.img} alt="post image"/>
            </div>
            <h3 className={styles.title}>
                Talking to the Moon
            </h3>
            <p className={styles.description}>
                It was criticized for it overwhelming It was criticized for it overwhelming It  was criticized for it
                overwhelming It w for it overwhelming It  was criticized for it overwhelming It was criticized for it
                overwhelming production. Brazil, on April 12, 2011
            </p>
            <div className={styles.postBtnWrapper}>
                <Button htmlType={HtmlTypes.Button} className={styles.postBtn} type={ButtonTypes.Primary}>Learn More</Button>
            </div>
        </div>
    );
};

export default Post;
