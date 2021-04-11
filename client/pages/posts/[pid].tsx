import React from 'react';
import Container from "../../components/basic/container/Container";
import styles from "../../styles/posts/post.module.scss";
import Button, {ButtonTypes, HtmlTypes} from "../../components/shared/Button/Button";
import {GetServerSideProps} from 'next';
import {PostService} from "../../services/post";
import {classNames} from '../../utils/className';
import {getFormattedDate} from '../../utils/dates/getFormattedDate';
import {useRouter} from "next/router";
import cookies from "next-cookies";
import Link from 'next/link';
import {toast, ToastTypes} from "../../utils/toast/toast";
const jwt = require('jsonwebtoken');

const Post = ({post, userId, token}) => {
    const postService = new PostService();

    const {title, img, tags, articleMarkup, author} = post;

    const router = useRouter();

    const isAuthor = author._id === userId;

    const onDeleteClick = () => {
        postService.delete(post._id, token, {
            success: (res) => {
                router.push('/posts');
                toast(ToastTypes.SUCCESS, 'Success', res.message);
            }
        });
    };

    return (
        <div className={styles.post}>
            <Container post>
                <h1 className={styles.title}>
                    {title}
                </h1>
                <div className={styles.post__infoWrapper}>
                    <div className={styles.post__info}>
                        <div className={styles.author__info}>
                            <div className={styles.author__img}>
                                <img src={author.img} alt="author"/>
                            </div>
                            <span className={styles.author__name}>
                                {author.name}
                            </span>
                        </div>
                        <span className={styles.post__infoItem}>
                            {getFormattedDate(post.date)}
                        </span>
                    </div>
                    {
                        isAuthor && (<div className={styles.post__actions}>
                            <Link href={{pathname: '/write', query: {id: post._id}}}>
                                <Button
                                    className={styles.post__actionBtn}
                                    type={ButtonTypes.Outline}
                                    htmlType={HtmlTypes.A}>
                                    Edit
                                </Button>
                            </Link>
                            <Button
                                onClick={onDeleteClick}
                                className={classNames([styles.post__actionBtn, styles.post__actionBtnDelete])}
                                type={ButtonTypes.Outline}>
                                Delete
                            </Button>
                        </div>)
                    }
                </div>
                <div className={styles.post__img}>
                    <img src={img} alt="image"/>
                </div>
                <div className={classNames([styles.post__content, 'post__content'])}
                    dangerouslySetInnerHTML={{__html: articleMarkup}}>
                </div>
                <div className={styles.post__tags}>
                    {
                        tags.map((tag) => {
                            return (
                                <Button type={ButtonTypes.Outline} className={styles.post__tag}
                                    key={`${tag}#${Math.random()}`}>
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

export const getServerSideProps: GetServerSideProps = async (ctx) => {
    const postService = new PostService();

    const token = cookies(ctx).token;

    let userId = null;

    if (token) {
        userId = jwt.decode(token).userId;
    }

    const post = await postService.getById(ctx.params.pid);

    return {
        props: {post, userId, token}
    };
};

export default Post;
