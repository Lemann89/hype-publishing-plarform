import React, {useEffect, useRef, useState} from 'react';
import Container from '../../components/basic/container/Container';
import {wrapper} from '../../store';
import cookies from "next-cookies";
import styles from '../../styles/profile/profile.module.scss';
import {useForm} from "react-hook-form";
import Button, {ButtonTypes} from "../../components/shared/Button/Button";
import Input, {InputTypes} from '../../components/shared/Input/Input';
import {UserService} from "../../services/user";
import {toast, ToastTypes} from "../../utils/toast/toast";
import PostCard from '../../components/posts/PostCard';
import {getImagePreview} from "../../utils/files/getImagePreview";
import {useRouter} from "next/router";

const Index = ({token, user}) => {

    const initialUserInfoState = {
        name: '',
        description: '',
        img: ''
    };

    const userService = new UserService();

    const [avatarPreview, setAvatarPreview] = useState(null);
    const [isEditProfile, setIsEditProfile] = useState(false);
    const [userInfo, setUserInfo] = useState(initialUserInfoState);
    const {posts} = user;
    const {register, handleSubmit, watch, reset} = useForm();
    const router = useRouter();
    const { id: isNonSelfProfile } = router.query;

    useEffect(() => {
        reset({
            ...userInfo
        });
    }, [userInfo]);

    useEffect(() => {
        setUserInfo({
            name: user.name,
            description: user.description,
            img: user.img
        });
    }, [user]);

    const avatar = useRef({});
    avatar.current = watch("avatar", "");

    const onUserUpdated = (userData) => {
        setIsEditProfile(false);

        setUserInfo({
            ...userInfo,
            name: userData.name,
            description: userData.description
        });

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
                    {userInfo.name}
                </h3>
                <p className={styles.user__description}>
                    {userInfo.description}
                </p>
                {
                    !isNonSelfProfile && <Button
                        className={styles.user__btnEdit}
                        type={ButtonTypes.Primary}
                        onClick={() => {
                            setIsEditProfile(true);
                        }}
                    >
                        Edit
                    </Button>
                }
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
                            setIsEditProfile(false);
                        }}
                    >
                        Cancel
                    </Button>
                </div>
            </>
        );
    };

    const withoutPosts = () => {
        return (
            <>
                <h3 className={styles.posts__title}>
                    You does not have any posts yet 🤷
                </h3>
            </>
        );
    };

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
        );
    };

    return (
        <Container profile>
            <div className={styles.wrapper}>
                <div className={styles.user}>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <div className={styles.user__img}>
                            <img src={avatarPreview ? avatarPreview : userInfo.img} alt=""/>
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
    const id = ctx.query.id;
    let user;

    console.log('id ', id);

    if (id) {
        user = await userService.getById(id);
    } else {
        user = await userService.get(token);
    }

    return {
        props: {
            token,
            user,
        }
    };
});

export default Index;
