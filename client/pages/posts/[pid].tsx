import React from 'react';
import Container from "../../components/basic/container/Container";
import styles from "../../styles/posts/post.module.scss";
import Button, {ButtonTypes} from "../../components/shared/Button/Button";
import {GetServerSideProps} from 'next';
import {postService} from "../../services/post";

const Post = ({post}) => {

    const {title, img, tags, articleMarkup, author} = post;

    return (
        <div className={styles.post}>
            <Container post>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <div className={styles.post__info}>
                    <div className={styles.author__img}>
                        <img src="https://thispersondoesnotexist.com/image" alt="guy"/>
                    </div>
                    <span className={styles.author__name}>
                        {author.name}
                    </span>
                    <span className={styles.post__infoItem}>
                        Feb 23, 2017
                    </span>
                    <span className={styles.post__infoItem}>
                        ·
                    </span>
                    <span className={styles.post__infoItem}>
                        4 min read
                    </span>
                </div>
                <div className={styles.post__img}>
                    <img src={img} alt="image"/>
                </div>
                <div className={styles.post__content} dangerouslySetInnerHTML={{__html: articleMarkup}}>
                </div>
                <div className={styles.post__tags}>
                    {
                        tags.map((tag) => {
                            return (
                                <Button type={ButtonTypes.Outline} className={styles.post__tag} key={`${tag}#${Math.random()}`}>
                                    {tag}
                                </Button>
                            );
                        })
                    }
                </div>
            </Container>
        </div>
    );
};

export const getServerSideProps: GetServerSideProps = async ({params}) => {
    const postServ = new postService();

    const post = await postServ.getById(params.pid);

    return {
        props: {post}
    };
};

export default Post;
