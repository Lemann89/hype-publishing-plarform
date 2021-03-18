import React from 'react';
import Post from "./Post";
import styles from '../../styles/posts/posts.module.scss';

const Posts = props => {
    return (
        <div className={styles.posts}>
            <div className="container">
                <div className={styles.wrapper}>
                    <Post/>
                    <Post/>
                    <Post/>
                    <Post/>
                </div>
            </div>
        </div>
    );
};

export default Posts;
