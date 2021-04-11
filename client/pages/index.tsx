import Hero from "../components/basic/hero/Hero";
import {GetServerSideProps} from "next";
import {PostService} from "../services/post";
import styles from "../styles/posts/postCards.module.scss";
import Container from "../components/basic/container/Container";
import PostCard from "../components/posts/PostCard";
import React from "react";
import Button, {ButtonTypes, HtmlTypes} from "../components/shared/Button/Button";
import Link from "next/link";

export default function Home({posts}) {

    return (
        <div>
            <Hero/>
            <div className={styles.posts}>
                <Container>
                    <h2 className={styles.postsTitle}>
                        Last posts
                    </h2>
                    <div className={styles.wrapper}>
                        {
                            posts.map(post =>
                                <PostCard
                                    post={post}
                                    key={post._id}/>
                            )
                        }
                    </div>
                    <div className={styles.postsBtn}>
                        <Link href="/posts">
                            <Button
                                type={ButtonTypes.Primary}
                                htmlType={HtmlTypes.A}
                            >
                                See More
                            </Button>
                        </Link>
                    </div>
                </Container>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const postService = new PostService();

    const posts = await postService.getByQuantity(4);

    return {
        props: {posts}
    };
};
