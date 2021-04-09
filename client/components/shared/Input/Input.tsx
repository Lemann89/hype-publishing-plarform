import React from 'react';
import {classNames} from "../../../utils/className";

export enum InputTypes {
    Number = "number",
    Text = "text",
    Checkbox = "checkbox",
    Radio = "radio",
    File = "file",
    Password = "password",
}

interface Props {
    label?: string,
    placeholder?: string,
    type: InputTypes,
    className?: string,
    onChange?: () => void,
    register?: any,
    name?: string,
    textarea?: boolean,
}

const Input: React.FC<Props> = props => {
    const {label, onChange, className, placeholder, type, register, name, textarea, ...rest} = props;

    return (
        <div className={classNames(['input', className, `input--${type}`])}>
            <label className='input__label'>
                {label}
                {
                    textarea ? (<textarea
                        ref={register}
                        name={name}
                        className='input__element input__element--textarea'
                        placeholder={placeholder}
                        onChange={onChange}
                        {...rest}
                    >
                    </textarea>) :
                        (<input
                            ref={register}
                            name={name}
                            className={classNames(['input__element'])}
                            placeholder={placeholder}
                            type={type}
                            onChange={onChange}
                            {...rest}
                        />)
                }
            </label>
        </div>
    );
};

export default Input;
