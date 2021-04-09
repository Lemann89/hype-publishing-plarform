import React from 'react';
import {classNames} from "../../../utils/className";

interface Props {
    children: any,
    profile?: boolean,
    post?: boolean
}

const Container: React.FC<Props> = ({children, profile, post}) => {
    return (
        <div
            className={classNames(['container', profile && 'container--profile', post && 'container--post'])}>
            {children}
        </div>
    );
};

export default Container;
