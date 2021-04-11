import React from 'react';
import Container from '../../components/basic/container/Container';
import styles from '../../styles/posts/postCards.module.scss';
import {wrapper} from "../../store";
import PostCard from "../../components/posts/PostCard";
import {useRouter} from 'next/router';
import {PostService} from "../../services/post";
import {useMediaQuery} from "../../hooks/useMediaQuery";

const Index = ({posts}) => {
    const router = useRouter();
    const isMobile = useMediaQuery(768);

    return (
        <div className={styles.posts}>
            <Container>
                {
                    posts.map(post => {
                        return (
                            <div className={styles.post} onClick={() => {router.push(`/posts/${post._id}`);}} key={post._id}>
                                <PostCard wide={!isMobile} post={post}/>
                            </div>
                        );
                    })
                }
            </Container>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async () => {
    const postService = new PostService();

    const posts = await postService.getAll();

    return {
        props: {posts}
    };

});

export default Index;
