import React from 'react';
import {classNames} from "../../../utils/className";

export enum InputTypes {
    Number = "number",
    Text = "text",
    Checkbox = "checkbox",
    Radio = "radio",
    Password = "password",
}

interface Props {
    label?: string,
    placeholder?: string,
    type: InputTypes,
    className?: string,
    onChange?: () => {},
    register?: any,
    name?: string,
}

const Input: React.FC<Props> = props => {
    const {label, onChange, className, placeholder, type, register, name, ...rest} = props;

    return (
        <div className={classNames(['input', className])}>
            <label className='input__label'>
                {label}
                <input
                    ref={register}
                    name={name}
                    className='input__element'
                    placeholder={placeholder}
                    type={type}
                    onChange={onChange}
                    {...rest}
                />
            </label>
        </div>
    );
};

export default Input;
