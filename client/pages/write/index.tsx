import React, {useEffect, useRef, useState} from 'react';
import styles from "../../styles/write/write.module.scss";
import Container from "../../components/basic/container/Container";
import Input, {InputTypes} from "../../components/shared/Input/Input";
import {classNames} from "../../utils/className";
import Button, {ButtonTypes} from "../../components/shared/Button/Button";
import {useForm} from "react-hook-form";
import {getImagePreview} from "../../utils/files/getImagePreview";
import {wrapper} from "../../store";
import cookies from "next-cookies";
import {PostService} from "../../services/post";
import {useRouter} from "next/router";
import {toast, ToastTypes} from "../../utils/toast/toast";

const ReactQuill = typeof window === 'object' ? require('react-quill') : () => false;

const Index = ({token, post}) => {
    const postService = new PostService();

    const [articleMarkup, setArticleMarkup] = useState('');
    const [imagePreview, setImagePreview] = useState(null);

    const {register, handleSubmit, watch, reset, errors} = useForm();

    const router = useRouter();

    const isEdit = !!post;

    useEffect(() => {
        if (isEdit) {
            reset({
                title: post?.title,
            });
            setImagePreview(post?.img);
            setArticleMarkup(post?.articleMarkup);
        }
    }, [post]);

    const image = useRef({});
    image.current = watch("image", "");

    const quillModules = {
        toolbar: [
            [{'header': [1, 2, false]}],
            ['bold', 'italic', 'underline', 'strike'],
            [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
            ['link', 'image'],
            ['clean']
        ],
    };

    const quillFormats = [
        'header',
        'bold', 'italic', 'underline', 'strike',
        'list', 'bullet', 'indent',
        'link', 'image'
    ];

    const onSubmit = (data) => {
        const formData = new FormData();

        if (data.image?.length) {
            formData.append('image', data.image[0]);
        }

        formData.append('title', data.title);
        formData.append('articleMarkup', articleMarkup);
        formData.append('tags', '["JavaScript", "React"]');

        if (isEdit) {
            postService.update(router.query.id, formData, token, {
                success: (res) => {
                    router.push(`posts/${res._id}`);
                    toast(ToastTypes.SUCCESS, 'Success', res.message);
                }
            });
        } else {
            if (articleMarkup.length) {
                postService.create(formData, token, {
                    success: (res) => {
                        router.push(`posts/${res._id}`);
                        toast(ToastTypes.SUCCESS, 'Success', res.message);
                    }
                });
                return;
            }
            toast(ToastTypes.DANGER, 'Error', 'Please write a story');
        }
    };

    const onImageSelected = async () => {
        setImagePreview(await getImagePreview(image.current[0]));
    };

    return (
        <div className={classNames([styles.write, 'write'])}>
            <Container post>
                <h1 className={styles.title}>
                    {
                        isEdit ? 'Edit a post' : 'Write a post'
                    }
                </h1>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Input
                        className={styles.input}
                        type={InputTypes.Text}
                        label="Title"
                        register={register({required: true})}
                        name="title"
                    />
                    {errors.title && (<span className="form__error-message">
                            This field is required
                    </span>)}
                    <div className={styles.imgBlock}>
                        <span className={styles.label}>Photo</span>
                        <div className={styles.img}>
                            <img src={imagePreview ? imagePreview : '/no-image.svg'} alt="cat"/>
                        </div>
                        <Input
                            type={InputTypes.File}
                            label="Choose a photo"
                            className={styles.input}
                            register={register({required: !isEdit})}
                            name="image"
                            onChange={onImageSelected}
                        />
                        {errors.image && (<span className="form__error-message">
                            Please choose an image
                        </span>)}
                    </div>

                    <div className={styles.editor}>
                        <span className={styles.label}>Article</span>
                        <ReactQuill
                            className={styles.quill}
                            value={articleMarkup}
                            modules={quillModules}
                            format={quillFormats}
                            onChange={(markup) => {
                                setArticleMarkup(markup);
                            }}
                        />
                    </div>
                    <Button
                        className={styles.submitBtn}
                        isSubmit={true}
                        type={ButtonTypes.Primary}
                    >
                        Send
                    </Button>
                </form>
            </Container>
        </div>
    );
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const postService = new PostService();

    const token = cookies(ctx).token;

    const postId = ctx.query.id;
    let post = null;

    if (postId) {
        post = await postService.getById(ctx.query.id);
    }

    return {
        props: {token, post}
    };
});

export default Index;


