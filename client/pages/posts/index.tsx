import React, {useState} from 'react';
import Container from '../../components/basic/container/Container';
import styles from '../../styles/posts/posts.module.scss';
import {wrapper} from "../../store";
import PostCard from "../../components/posts/PostCard";
import {useRouter} from 'next/router';
import {PostService} from "../../services/post";
import {useMediaQuery} from "../../hooks/useMediaQuery";
import Input, {InputTypes} from "../../components/shared/Input/Input";

const Index = ({posts}) => {
    const router = useRouter();
    const isMobile = useMediaQuery(768);
    const [filteredPosts, setFilteredPosts] = useState(posts);

    const onSearchInputChange = (e) => {
        const search = e.target.value;
        if (!search.trim) {
            return;
        }
        const result = posts.filter((post) => post.title.toLowerCase().includes(search.toLowerCase()));
        setFilteredPosts(result);
    };

    return (
        <div className={styles.postsPage}>
            <Container>
                <div className={styles.wrapper}>
                    <div className={styles.posts}>
                        {
                            filteredPosts.length ? (
                                filteredPosts.map(post => {
                                    return (
                                        <div
                                            className={styles.post}
                                            onClick={() => {router.push(`/posts/${post._id}`);}}
                                            key={post._id}
                                        >
                                            <PostCard wide={!isMobile} post={post}/>
                                        </div>
                                    );
                                })
                            ) : (
                                <h3 className={styles.posts__title}>
                                    Nothing found 😔
                                </h3>
                            )

                        }
                    </div>
                    <div className={styles.search}>
                        <div className={styles.searchBlock}>
                            <Input
                                type={InputTypes.Text}
                                label="Search"
                                className="input--search"
                                onChange={onSearchInputChange}
                            />
                        </div>
                    </div>
                </div>
            </Container>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const postService = new PostService();
    const tag = ctx.query.tag;
    let posts;

    if (tag) {
        posts = await postService.getByTag(tag);
    } else {
        posts = await postService.getAll();
    }

    return {
        props: {posts}
    };

});

export default Index;
