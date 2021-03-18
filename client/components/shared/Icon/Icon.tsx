import React from 'react';
import icons, {Icons} from "./icons";
import {insertClassName} from "../../../utils/className";

export enum IconSizes {
    Default = '',
    XS = ' icon--xs',
    SM = ' icon--sm',
    MD = ' icon--md',
    LG = ' icon--lg',
    XL = ' icon--xl',
    XXL = ' icon--xxl'
}

interface IProps {
    type: Icons,
    size?: IconSizes,
    className?: string,
    onClick?: () => {},
}

const Icon: React.FC<IProps> = props => {
    const {type, className, onClick, size} = props;

    const {markup, viewbox} = icons.get(type);

    return (
        <svg
            className={`icon${insertClassName(className, className)}${size}`}
            viewBox={viewbox}
            aria-labelledby="title"
            onClick={onClick}
        >
            {markup}
        </svg>
    );
};

export default Icon;
