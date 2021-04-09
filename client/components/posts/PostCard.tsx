import React from 'react';
import styles from '../../styles/posts/postCard.module.scss';
import {classNames} from '../../utils/className';
import Button, {ButtonTypes, HtmlTypes} from "../shared/Button/Button";
import {useRouter} from "next/router";

interface Props {
    wide?: boolean,
    post: any,
}

const PostCard: React.FC<Props> = ({wide, post}) => {

    const {img, title, articlePreview, _id} = post;

    const router = useRouter();

    return (
        <div className={classNames([styles.post, wide && styles.widePost])}>
            <div className={classNames([styles.imgWrapper, wide && styles.wideImgWrapper])}>
                <img src={img} className={styles.img} alt="post image"/>
            </div>
            <div className={styles.descriptionWrapper}>
                <h3 className={classNames([styles.title, wide && styles.wideTitle])}>
                    {title}
                </h3>
                <div className={classNames([styles.description, wide && styles.wideDescription])}>
                    {articlePreview}
                </div>
                <div className={styles.postBtnWrapper}>
                    {
                        !wide && <Button
                            htmlType={HtmlTypes.A}
                            className={styles.postBtn}
                            onClick={() => {router.push(`/posts/${_id}`);}}
                            type={ButtonTypes.Primary}>Learn More</Button>
                    }
                </div>
            </div>
        </div>
    );
};

export default PostCard;
