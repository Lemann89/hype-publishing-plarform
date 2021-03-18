import React from 'react';
import {classNames} from "../../../utils/className";

export enum ButtonTypes {
    Empty = 'btn--empty',
    Primary = 'btn--primary',
    Secondary = 'btn--secondary',
    Link = 'btn--link',
    Outline = 'btn--outline',
    PrimaryOutline = 'btn--primary-outline',
    SecondaryOutline = 'btn--secondary-outline'
}

export enum HtmlTypes {
    A,
    Button
}


interface IProps {
    onClick?: () => {},
    disabled?: boolean,
    children?: string,
    type: ButtonTypes,
    htmlType: HtmlTypes,
    className?: string
}


const Button: React.FC<IProps> = (props) => {
    const {onClick, disabled, children, type, className, htmlType} = props;

    if (htmlType === HtmlTypes.A) {
        return (<a
            className={classNames(['btn', className, type])}
            onClick={onClick}
        >
            {children}
        </a>);
    }

    return (
        <button
            className={classNames(['btn', className, type])}
            onClick={!disabled ? onClick : () => {
            }}
            disabled={disabled}
        >
            <span className="btn__content">{children}</span>
        </button>
    );
};

export default Button;
