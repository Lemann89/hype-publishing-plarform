import Hero from "../components/basic/hero/Hero";
import {GetServerSideProps} from "next";
import {postService} from "../services/post";
import styles from "../styles/posts/postCards.module.scss";
import Container from "../components/basic/container/Container";
import PostCard from "../components/posts/PostCard";
import React from "react";
import Button, {ButtonTypes, HtmlTypes} from "../components/shared/Button/Button";
import Link from "next/link";

export default function Home({posts}) {

    console.log(posts);

    return (
        <div>
            <Hero/>
            <div className={styles.posts}>
                <Container>
                    <div className={styles.wrapper}>
                        {
                            posts.map(post =>
                                <PostCard
                                    post={post}
                                    key={post._id}/>
                            )
                        }
                    </div>
                    <Link href="/posts">
                        <Button
                            type={ButtonTypes.Primary}
                            htmlType={HtmlTypes.A}
                        >
                            See All
                        </Button>
                    </Link>
                </Container>
            </div>
        </div>
    );
}

export const getServerSideProps: GetServerSideProps = async () => {
    const postServ = new postService();

    const posts = await postServ.getByQuantity(4);

    return {
        props: {posts}
    };
};
