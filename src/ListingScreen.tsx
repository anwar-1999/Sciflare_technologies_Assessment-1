import axios from 'axios';
import "./ListingScreen.scss"
import React, {
    useEffect,
    useState
} from 'react';
import {
    Drawer,
    Dropdown,
    Form,
    Menu,
    Modal,
    Table
} from 'antd';
import AppButtons from './AppButtons';
import InputWithHead from './inputWithHead';
import { useNavigate } from 'react-router';
import { useMediaQuery } from '@react-hook/media-query';
import {
    MenuOutlined,
    MoreOutlined
} from '@ant-design/icons';

export default function ListingScreen(props: any) {

    const [userData, SetUserData] = useState<any>({
        allData: null,
        items: null
    })
    const [isDelete, setIsDelete] = useState<any>(false)
    const [isLogout, setisLogout] = useState<any>(false)
    const fullScreenView = useMediaQuery('only screen and (min-width: 600px)')
    const [isEdit, setIsEdit] = useState<any>(false)
    const [isEditRecord, setIsEditRecord] = useState<any>()
    const [form]: any = Form.useForm();
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [open, setOpen] = useState(false);
    const navigate = useNavigate()
    const [isSuccess, SetIsSuccess] = useState<any>({
        add: false,
        delete: false,
        edit: false
    })
    const [userDetails, SetUserDetails] = useState<any>({
        email: null,
        name: null,
        age: null,
    })
    const menuView = (record: any) => {
        try {
            return (
                <div>
                    <Menu>
                        <Menu.Item>
                            <div className="edit-option-text"
                                onClick={() => editFunc(record)}
                            >
                                Edit</div>
                        </Menu.Item>
                        <Menu.Item>
                            <div className="edit-option-text"
                                onClick={() => deleteFunc(record)}
                            >
                                Delete</div>
                        </Menu.Item>

                    </Menu>
                </div>
            )
        } catch (error) {
            console.log("Error In menuView", error)
        }
    }

    const columns: any = [
        {
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            align: 'center'
        },
        {
            title: 'Email',
            dataIndex: 'email',
            key: 'email',
            align: 'center'
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            align: 'center'
        },
        {
            title: 'Action',
            dataIndex: '',
            align: 'center',
            render: (item: any, record: any) => {
                return (
                    <div
                        className='edit-delete'
                    >{fullScreenView ?
                        <>
                            <div
                                style={{ marginRight: '10px' }}
                            >

                                <AppButtons
                                    buttonType={"grey-btn"}
                                    text={"Edit"}
                                    block={true}
                                    onClick={() => editFunc(record)}

                                />
                            </div>
                            <div>
                                <AppButtons
                                    buttonType={"red-btn"}
                                    text={"Delete"}
                                    block={true}
                                    onClick={() => deleteFunc(record)}
                                />
                            </div>
                        </>
                        :
                        <>
                            <Dropdown overlay={
                                menuView(record)}
                                placement="bottomRight" className="moreIcon-svg mid-center" arrow>
                                <MoreOutlined rev={undefined} />
                            </Dropdown>
                        </>
                        }
                    </div>
                );
            }

        },
    ];

    useEffect(() => {
        getAllData()
    }, [])

    useEffect(() => {
        if (isSuccess?.add == true) {
            getAllData()
            SetIsSuccess({ ...isSuccess, add: false })
            setIsModalOpen(false);
            setIsDelete(false)
        } else if (isSuccess?.delete == true) {
            getAllData()
            SetIsSuccess({ ...isSuccess, delete: false })
            setIsModalOpen(false);
            setIsDelete(false)
        } else if (isSuccess?.edit == true) {
            getAllData()
            SetIsSuccess({ ...isSuccess, edit: false })
            setIsModalOpen(false);
            setIsEdit(false)
        }
    }, [isSuccess])

    const getAllData = async () => {
        try {
            const response: any = await axios.get(`https://crudcrud.com/api/e25b25d8b5ec4985a7e38620bac426f5/users`);
            SetUserData({ ...userData, allData: response?.data })
            return response?.data;
        } catch (error) {
            console.error('Error in getAllData:', error);
            throw error;
        }
    };

    const addData = async (obj: any) => {
        try {
            const response = await axios.post('https://crudcrud.com/api/e25b25d8b5ec4985a7e38620bac426f5/users', obj);
            SetIsSuccess({ ...isSuccess, add: true })
            return response.data;
        } catch (error) {
            console.error('Error adding data:', error);
            throw error;
        }
    };

    const deleteData = async (_id: any) => {
        try {
            const response = await axios.delete(`https://crudcrud.com/api/e25b25d8b5ec4985a7e38620bac426f5/users/${_id}`);
            SetIsSuccess({ ...isSuccess, delete: true })
            return response.data;
        } catch (error) {
            console.error('Error deleting data:', error);
            throw error;
        }
    };

    const update = async (_id: any) => {
        try {
            const response = await axios.put(`https://crudcrud.com/api/e25b25d8b5ec4985a7e38620bac426f5/users/${_id}`, userDetails);
            SetIsSuccess({ ...isSuccess, edit: true })
            return response.data;
        } catch (error) {
            console.error('Error update data:', error);
            throw error;
        }
    };

    const deleteFunc = (record: any) => {
        setIsDelete(true)
        setIsModalOpen(true)
        SetUserData({ ...userData, items: record })
    }

    const prepopulate = (value: any) => {
        form.setFieldsValue({
            ['name-form']: value && value?.name,
            ['email-form']: value && value?.email,
            ['age-form']: value && value?.age,
        })
        SetUserDetails(
            {
                ...userDetails,
                email: value?.email,
                name: value?.name,
                age: value?.age
            })
    }

    const editFunc = (record: any) => {
        setIsEdit(true)
        prepopulate(record)
        setIsEditRecord(record)
        setIsModalOpen(true)

    }

    const logoutFunc = () => {
        setisLogout(true)
        setIsModalOpen(true)
        setOpen(false)
    }
    const contentVeiw = () => {
        return (
            <div
                className='list-content-view'
            >
                <div
                    className='top-bar'
                >
                    <div
                        style={{
                            color: 'white',
                            fontFamily: 'cursive',
                            fontSize: '15px'
                        }}
                    >
                        Users
                    </div>
                    {fullScreenView ?
                        <div
                            className='add-logout'
                        >

                            <div
                                style={{ marginRight: '10px' }}
                            >
                                <AppButtons
                                    buttonType={"add-blue-btn"}
                                    text={"Add"}
                                    block={true}
                                    onClick={() => showModal()}
                                />
                            </div>
                            <div>
                                <AppButtons
                                    buttonType={"red-btn"}
                                    text={"Logout"}
                                    block={true}
                                    onClick={() => logoutFunc()}
                                />
                            </div>
                        </div>
                        :
                        <span
                            style={{ color: 'white' }}
                            onClick={() => { setOpen(true) }}
                        > <MenuOutlined rev={undefined} /></span>
                    }
                </div>
                <div
                    className='table-container'
                >
                    <Table
                        dataSource={userData?.allData}
                        columns={columns}
                        pagination={false}
                    />
                </div>
            </div>
        )
    }

    const showModal = () => {
        setIsModalOpen(true);
        form.resetFields();
    };

    const handleOk = () => {
        setIsModalOpen(false);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setIsDelete(false);
        setisLogout(false)
    };

    const onChangeInput = (e: any, key: any) => {
        SetUserDetails({ ...userDetails, [key]: e })
    }

    const onSave = () => {
        if (isEdit == true) {
            update(isEditRecord?._id)
        } else {
            addData(userDetails)
        }

    }

    const modalView = () => {
        try {
            return (
                <Modal
                    open={isModalOpen}
                    onOk={handleOk}
                    onCancel={handleCancel}
                    footer={null}
                    width={fullScreenView ? "50%" : "90%"}
                    className='ConfirmationUserPopUp'

                >{ isLogout ?
                    <div>
                    <div>
                        <div
                            style={
                                    {
                                        color: 'black',
                                        fontFamily: 'sans-serif',
                                        fontSize: '18px',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center'
                                    }
                                 
                            }
                        >
                            Are you Sure, Do you want Logout ?
                        </div>

                    </div>
                    <div
                        style={{
                            display: 'flex',
                            justifyContent: 'center',
                            marginTop: '20px',
                            alignItems: 'center'
                        }}
                    >
                        <div
                            style={{ marginRight: '10px' }}
                        >
                            <AppButtons
                                buttonType={"cancel-btn"}
                                text={"Cancel"}
                                block={true}
                                onClick={() => { setIsModalOpen(false); setIsEdit(false); setIsDelete(false);setisLogout(false) }}
                            />
                        </div>
                        <div>
                            <AppButtons
                                buttonType={"red-btn"}
                                text={"Logout"}
                                block={true}
                                onClick={() =>{ navigate(-1);setisLogout(false)}}
                            />
                        </div>
                    </div>
                </div>
                    :
                    <>
                    {isDelete ?
                        <div>
                            <div>
                                <div
                                    style={
                                        fullScreenView ?
                                            {
                                                color: 'black',
                                                fontFamily: 'sans-serif',
                                                fontSize: '18px',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center'
                                            }
                                            :
                                            {
                                                color: 'black',
                                                fontFamily: 'sans-serif',
                                                fontSize: '16px',
                                            }
                                    }
                                >
                                    Are you Sure, Do you want delete <span
                                        style={{
                                            fontFamily: 'sans-serif',
                                            fontWeight: 'bold',
                                            marginLeft: '5px',
                                            marginRight: '5px'
                                        }}
                                    >{userData?.items?.name}</span> ?
                                </div>

                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    marginTop: '20px',
                                    alignItems: 'center'
                                }}
                            >
                                <div
                                    style={{ marginRight: '10px' }}
                                >
                                    <AppButtons
                                        buttonType={"cancel-btn"}
                                        text={"Cancel"}
                                        block={true}
                                        onClick={() => { setIsModalOpen(false); setIsEdit(false); setIsDelete(false);setisLogout(false) }}
                                    />
                                </div>
                                <div>
                                    <AppButtons
                                        buttonType={"red-btn"}
                                        text={"Delete"}
                                        block={true}
                                        onClick={() => deleteData(userData?.items?._id)}
                                    />
                                </div>
                            </div>
                        </div>
                        :
                        <Form
                            id="form"
                            form={form}
                            autoComplete="off"
                            noValidate
                            onFinish={() => onSave()}
                        >
                            <div
                                className='add-edit-container'
                            >
                                <div>
                                    <div
                                        className='field-title'
                                    >
                                        Name
                                    </div>
                                    <div>
                                        <Form.Item
                                            name="name-form"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'Please enter a name'
                                                },
                                                { pattern: /^[a-zA-Z]+$/, message: "Space,digits and Special Characters are not allowed" },

                                            ]}
                                        >
                                            <InputWithHead
                                                onChange={(e: any) => onChangeInput(e?.target?.value, "name")}
                                            />
                                        </Form.Item>
                                    </div>
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
                                                onChange={(e: any) => onChangeInput(e?.target?.value, "email")}
                                            />
                                        </Form.Item>
                                    </div>

                                </div>
                                <div>
                                    <div
                                        className='field-title'
                                    >
                                        Age
                                    </div>
                                    <div>
                                        <Form.Item
                                            name="age-form"
                                            rules={[

                                                {
                                                    required: true,
                                                    message: 'Please enter a age'
                                                }
                                            ]}
                                        >
                                            <InputWithHead
                                                type='number'
                                                onChange={(e: any) => onChangeInput(e?.target?.value, "age")}

                                            />
                                        </Form.Item>
                                    </div>
                                </div>
                                <div
                                    style={
                                        fullScreenView ?
                                            {
                                                display: 'flex',
                                                justifyContent: 'center',
                                                marginTop: '20px',
                                                alignItems: 'center'
                                            }
                                            :
                                            {
                                                justifyContent: 'center',
                                                marginTop: '20px',
                                                alignItems: 'center'
                                            }

                                    }
                                >
                                    <div
                                        style={
                                            fullScreenView ?
                                                { marginRight: '10px' }
                                                :
                                                {}
                                        }
                                    >
                                        <AppButtons
                                            buttonType={"cancel-btn-red"}
                                            text={"Cancel"}
                                            block={true}
                                            onClick={() => { setIsModalOpen(false); setIsEdit(false) ;setisLogout(false)}}
                                        />
                                    </div>
                                    <div
                                        style={
                                            fullScreenView ?
                                                {

                                                }
                                                :
                                                { marginTop: '10px' }
                                        }
                                    >
                                        <AppButtons
                                            buttonType={"add-blue-btn"}
                                            text={"Submit"}
                                            htmlType='submit'
                                            block={true}
                                        />
                                    </div>
                                </div>
                            </div>
                        </Form>
                    }
                    </>
                }
                  

                </Modal >
            )

        } catch (error) {
            console.log("Error in modalView :: ", error);

        }
    }

    const onClose = () => {
        setOpen(false);
    };
    const addModule = () => {
        setOpen(false)
        showModal()
    }
    const drawerView = () => {
        try {
            return (
                <>
                    <Drawer
                        placement="right"
                        closable={false}
                        onClose={onClose}
                        open={open}
                        width={"25%"}
                    >
                        <div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'darkgrey',
                                    color: 'white',
                                    fontWeight: 500
                                }}
                                onClick={() => addModule()}

                            >
                                Add
                            </div>
                            <div
                                style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    background: 'darkgrey',
                                    color: 'white',
                                    fontWeight: 500
                                }}
                                onClick={() => logoutFunc()}
                            >
                                Logout

                            </div>
                        </div>
                    </Drawer>
                </>
            )

        } catch (error) {
            console.log("Error in ");

        }
    }

    return (
        <div
            className='listing-screen-container'
        >
            {contentVeiw()}
            {modalView()}
            {drawerView()}
        </div>
    );
}

