import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "./Login.scss"
import InputWithHead from './inputWithHead';
import { Form, Input, message } from 'antd';
import AppButtons from './AppButtons';
import { useNavigate } from 'react-router';
import { useMediaQuery } from '@react-hook/media-query';


export default function Login(props: any) {
    const [form]: any = Form.useForm();
    const fullScreenView = useMediaQuery('only screen and (min-width: 600px)')
    const navigate = useNavigate()
    const [loginInputs, setLoginInputs] = useState<any>({
        email: null,
        password: null
    })

    const loginContentView = () => {
        try {
            return (
                <div
                    className='login-content'
                >
                    <div
                        className={fullScreenView ? 'login-inner' : 'login-inner-responsive'}
                    >
                        <div
                            className='field-title'
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                fontWeight: 'bolder',
                                color: 'black'
                            }}
                        >
                            Welcome

                        </div>
                        <div
                            style={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                        >
                            (credential - abc@gmail.com,
                            123456)
                        </div>
                        <div>
                            <div
                                className='field-title'
                            >
                                Email
                            </div>
                            <div>
                                <Form.Item
                                    name="email-form"
                                    rules={[
                                        {
                                            type: 'email',
                                            message: 'Please enter Valid email',
                                        },
                                        {
                                            required: true,
                                            message: 'Please enter a email'
                                        }
                                    ]}
                                >
                                    <InputWithHead
                                        onChange={(e: any) => setLoginInputs({ ...loginInputs, email: e.target.value })}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div>
                            <div
                                className='field-title'
                            >
                                Password
                            </div>
                            <div>
                                <Form.Item
                                    name="password"
                                    rules={[
                                        { required: true, message: 'Please enter a password' }
                                    ]}
                                >
                                    <Input.Password
                                        className='input-field-border-bottom'
                                        onChange={(e: any) => setLoginInputs({ ...loginInputs, password: e.target.value })}
                                    />
                                </Form.Item>
                            </div>
                        </div>
                        <div
                            style={{
                                marginTop: '45px'
                            }}
                        >
                            <AppButtons
                                buttonType={"add-blue-btn"}
                                text={"Login"}
                                htmlType='submit'
                                block={true}
                            />
                        </div>
                    </div>

                </div>
            )

        } catch (error) {
            console.log("Error in loginContentView :: ", error);


        }
    }

    const gotoListing = () => {
        if ((loginInputs?.email == 'abc@gmail.com') && (loginInputs?.password == '123456')) {
            navigate('/listing')
        } else {
            message.error("Invalid email or password")
        }

    }

    return (
        <div
            className='login-container'
        >
            <Form
                id="form"
                form={form}
                autoComplete="off"
                noValidate
                onFinish={() => gotoListing()}
            >

                {loginContentView()}
            </Form>
        </div>
    );
}

