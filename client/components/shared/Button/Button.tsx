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


interface Props {
    onClick?: () => void,
    disabled?: boolean,
    children?: string,
    type: ButtonTypes,
    htmlType?: HtmlTypes,
    className?: string,
    isSubmit?: boolean
}

const Button: React.FC<Props> = React.forwardRef((props, ref) => {
    const {onClick, disabled, children, type, className, htmlType, isSubmit = false, ...rest} = props;

    if (htmlType === HtmlTypes.A) {
        return (
            <a
                className={classNames(['btn', className, type])}
                onClick={onClick}
                {...rest}
            >
                {children}
            </a>);
    }

    return (
        <button
            type={isSubmit ? 'submit' : 'button'}
            className={classNames(['btn', className, type])}
            onClick={!disabled ? onClick : () => {
            }}
            disabled={disabled}
            {...rest}
        >
            <span className="btn__content">{children}</span>
        </button>
    );
});

export default Button;
