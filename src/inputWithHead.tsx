import { Input } from 'antd';
import React from 'react';

export default function inputWithHead(props: any) {
    const {
        placeholder,
        onBlur,
        onChange,
        type,
        value,
        maxLength,
        id,
        auto_complete,
        disabled,
        suffix,
        onPressEnter,
        bordered,
        className,
        autofocus,
    } = props;
    return (
        <Input
            autoComplete={auto_complete}
            id={id}
            className={className}
            placeholder={placeholder}
            maxLength={maxLength}
            onBlur={onBlur}
            onChange={onChange}
            type={type}
            value={value}
            disabled={disabled}
            onPressEnter={onPressEnter}
            suffix={suffix}
            bordered={bordered}
            autoFocus={autofocus}
        />
    );
}

