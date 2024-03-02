import React from 'react';
import { Button } from 'antd';
import './AppButtons.scss';

export default function AppButtons(props: any) {
    const {
        buttonType,
        text,
        onClick,
        htmlType,
        form,
        disabled,
        block,
        children,
        value,
        id,
        fontSize,
        width

    } = props;

    const getClassName = (buttonType: any) => {
        let className;
        switch (buttonType) {
            case "red-btn":
                className = 'red-btn'; break;
            case "add-blue-btn":
                className = 'add-blue-btn'; break;
            case "grey-btn":
                className = 'grey-btn'; break;
            case "cancel-btn":
                className = 'cancel-btn'; break;
            case "cancel-btn-red":
                className = 'cancel-btn-red'; break;


            default:
                break;
        }
        return className;
    }
    return (
        <div className="app-buttons-container"
            style={
                width &&
                { width: width }
            }
        >
            <Button

                className={getClassName(buttonType)}
                onClick={onClick}
                htmlType={htmlType}
                form={form}
                disabled={disabled}
                block={block}
                value={value}
                id={id}
                style={{ fontSize: ` ${fontSize}px !important` }}
            >
                {children}
                {text}
            </Button>

        </div>
    );
}

