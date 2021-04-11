import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/basic/container/Container';
import {NextThunkDispatch, wrapper} from '../../store';
import cookies from "next-cookies";
import {getUserProfile, setUserInfo} from "../../store/actions/userActions";
import {useTypedSelector} from "../../hooks/useTypedSelector";
import styles from '../../styles/profile/profile.module.scss';
import {useForm} from "react-hook-form";
import Button, {ButtonTypes} from "../../components/shared/Button/Button";
import Input, {InputTypes} from '../../components/shared/Input/Input';
import {useDispatch} from "react-redux";
import {UserService} from "../../services/user";
import {toast, ToastTypes} from "../../utils/toast/toast";
import PostCard from '../../components/posts/PostCard';
import {getImagePreview} from "../../utils/files/getImagePreview";


const Index = ({token, posts}) => {
    const userService = new UserService();

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isEditProfile, setIsEditProfile] = useState(false);

    const dispatch = useDispatch();

    const user = useTypedSelector(state => state.user);

    const {info} = user;

    const {register, handleSubmit, watch, reset} = useForm();


    useEffect(() => {
        reset({
            name: info.name,
            description: info.description
        });
    }, [info]);

    const avatar = useRef({});
    avatar.current = watch("avatar", "");

    const onUserUpdated = (userData) => {
        setIsEditProfile(false);

        const newUserInfo = {...info, ...userData};
        delete newUserInfo.avatar;

        dispatch(setUserInfo(newUserInfo));

        toast(ToastTypes.SUCCESS, "Success", "Profile was updated");
    };

    const onSubmit = (data) => {

        const formData = new FormData();

        if (data.avatar.length) {
            formData.append('image', data.avatar[0]);
        }

        formData.append('name', data.name);
        formData.append('description', data.description);

        userService.update(formData, token, {
            success: () => {
                onUserUpdated(data);
            }
        });
    };

    const onImageSelected = async () => {
        setAvatarPreview(await getImagePreview(avatar.current[0]));
    };

    const profile = () => {
        return (
            <>
                <h3 className={styles.user__name}>
                    {info.name}
                </h3>
                <p className={styles.user__description}>
                    {info.description}
                </p>
                <Button
                    className={styles.user__btnEdit}
                    type={ButtonTypes.Primary}
                    onClick={() => {
                        setIsEditProfile(true);
                    }}
                >
                    Edit
                </Button>
            </>
        );
    };

    const editableProfile = () => {
        return (
            <>
                <Input
                    label="Upload Photo"
                    className={styles.user__input}
                    register={register}
                    type={InputTypes.File}
                    name="avatar"
                    onChange={onImageSelected}/>
                <Input
                    className={styles.user__input}
                    label="Name"
                    type={InputTypes.Text}
                    name="name"
                    register={register}
                />
                <Input
                    className={styles.user__input}
                    label="Bio"
                    type={InputTypes.Text}
                    name="description"
                    register={register}
                    textarea
                />
                <div className={styles.user__actions}>
                    <Button
                        className={styles.user__btnSave}
                        type={ButtonTypes.Primary}
                        isSubmit={true}
                    >
                        Save
                    </Button>
                    <Button
                        className={styles.user__btnUndo}
                        type={ButtonTypes.Primary}
                        onClick={() => {
                            setIsEditProfile(false)
                        }}
                    >
                        Undo
                    </Button>
                </div>
            </>
        );
    };

    const withoutPosts = () => {
        return (
            <>
                <h3 className={styles.posts__title}>
                    You don't have any posts yet 🤷
                </h3>
            </>
        )
    }

    const withPosts = () => {
        return (
            <>
                <h3 className={styles.posts__title}>
                    Posts
                </h3>
                <div className={styles.posts__wrapper}>
                    {
                        posts.map(post =>
                            <div className={styles.post} key={post._id}>
                                <PostCard post={post}/>
                            </div>
                        )
                    }
                </div>
            </>
        )
    }

    return (
        <Container profile>
            <div className={styles.wrapper}>
                <div className={styles.user}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.user__img}>
                            <img src={avatarPreview ? avatarPreview : info.img} alt=""/>
                        </div>
                        {isEditProfile ? editableProfile() : profile()}
                    </form>
                </div>
                <div className={styles.posts}>
                    {posts.length ? withPosts() : withoutPosts()}
                </div>
            </div>
        </Container>);
};

export const getServerSideProps = wrapper.getServerSideProps(async (ctx) => {
    const userService = new UserService();

    const token = cookies(ctx).token;

    const dispatch = ctx.store.dispatch as NextThunkDispatch;
    await dispatch(await getUserProfile(token));

    const posts = await userService.getPosts(token);

    return {
        props: {
            token,
            posts,
        }
    };
});

export default Index;
