import React, { useState, useEffect } from 'react';
import {Col, Row, Image, Input, Modal, Button, Form, Typography, Space, Badge, Popover,
        Cascader, Divider, Menu, List, Alert, Tag, Drawer } from 'antd';
import {
    UserOutlined, SearchOutlined, ShoppingCartOutlined, CloseCircleOutlined, UpOutlined,
    BellOutlined, LogoutOutlined, InboxOutlined, HistoryOutlined, DownOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import { useLocalStorage } from '../Hooks/LocalStorageHook';

const { Text } = Typography;
const { Search } = Input;

const HeaderSection = (props) => {

    const { data, navigate, setRouter, searchParams } = props;
    const { user, config } = data;
    const { is_login, carts } = user;
    const { app } = config;
    const { baseURL, adminPrefix } = app;
    const [searchKeywordHistory, setSearchKeywordHistory] = useLocalStorage('search-keyword', []);

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo:
     * @returns {Object}
     */
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [keySearch, setKeySearch] = useState({
        q: '',
        showResult: {
            start: 0,
            end: 3,
        },
        search_history_expand_button: {
            label: `Xem thêm`,
            is_expand: true,
            icon: <DownOutlined />
        },
    });

    const showModal = () => {
        console.log('show login')
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
    };

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param {Object} props
     * @returns
     */
    const AuthenticatedBox = (props) => {
        return (<>
            <Button type="text" style={{ color: '#fff' }} onClick={showModal} >
                Đăng nhập / Đăng ký
            </Button>
        </>)
    }

    /**
     * @author <hauvo1709@gmail.com>
     * @todo:
     * @param {Object} props
     * @returns
     */
    const AccountBox = (props) => {

        const { data, history } = props;
        const { user } = data;

        return (<>
            {/* <Dropdown menu={accountdropdown} placement="bottom" arrow>
                <>
                <Row justify='center' align='center' style={{justify: 'center', align: 'center'}}>
                        <Col span={24} style={{padding: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}><Text level={4}><span style={{color: '#FFFFFF'}}>Tài khoản</span></Text></Col>
                        <Col span={24} style={{padding: 0, display: 'flex', justifyContent: 'flex-start', alignItems: 'center'}}><Text keyboard level={3}><span style={{color: '#FFFFFF'}}>{ user.name ? user.name : '' }</span></Text></Col>
                </Row>
                <DownOutlined />
                </>
            </Dropdown> */}
            <Popover content={() => {
                return (<>
                <List itemLayout="horizontal"
                dataSource={[
                    {
                    key: '1',
                    label: (
                        <><Space align="center">
                            <InboxOutlined style={{ fontSize: '20px'}}/>
                            <Link to='/shopping/customer/orders?action=history&id=%23'>Đơn hàng của tôi</Link>
                        </Space></>
                    )
                    },{
                        key: '2',
                        label: (
                            <><Space align="center">
                                <BellOutlined style={{ fontSize: '20px'}}/>
                                <Link to='/shopping/customer/notification'>Thông báo của tôi</Link>
                            </Space></>
                        )
                    },{
                        key: '3',
                        label: (
                            <><Space align="center">
                                <UserOutlined  style={{ fontSize: '20px'}}/>
                                <Link to='/shopping/customer/account'>Tài khoản của tôi</Link>
                            </Space></>
                        )
                    },{
                        key: '4',
                        label: (
                            <><Space align="center">
                                <LogoutOutlined style={{ fontSize: '20px'}}/>
                                <Link to=''>Thoát tài khoản</Link>
                            </Space></>
                        )
                    }]}
                    renderItem={(item) => (
                        <List.Item>
                            <Button type="text" size={`middle`}>
                                {item.label}
                            </Button>
                        </List.Item>
                    )}
                /></>)
            }} title="" trigger="hover" placement="bottom">
                <><Row justify='center' align='center' style={{justify: 'center', align: 'center'}}>
                    <Col span={24} style={{padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Text level={4}><span style={{color: '#FFFFFF'}}>Tài khoản</span></Text>
                    </Col>
                    <Col span={24} style={{padding: 0, display: 'flex', justifyContent: 'center', alignItems: 'center'}}>
                        <Tag color="#87d068" style={{marginRight: 0}}>{ user.name ? user.name : '' }</Tag>
                    </Col>
                </Row></>
            </Popover>
        </>)
    }

    const searchPopular = [
        {id:1, name:'Bia Tiger bạc', url:'https://salt.tikicdn.com/cache/280x280/ts/product/45/e9/11/a61363ae49fc2cca3626fb70f2d0724c.jpg'},
        {id:2, name:'Rượu vang', url:'https://salt.tikicdn.com/cache/280x280/ts/product/17/7b/0c/84668ec248ed95d532f915afb913c108.jpg'},
        {id:3, name:'Chảo chống dính', url:'https://salt.tikicdn.com/cache/280x280/ts/product/48/49/a4/cdf90cf7e4555b82773bd07a1cff9ddc.jpg'},
        {id:4, name:'Sách từ vựng', url:'https://salt.tikicdn.com/cache/280x280/ts/product/95/86/73/5f76f984dd5640086e5060bac4148e59.jpg'},
        {id:5, name:'Máy massage', url:'https://salt.tikicdn.com/cache/280x280/ts/product/7a/ed/59/210ee12be5f63ff380768f68266eb7a0.jpg'},
        {id:6, name:'Đèn pin siêu sáng', url:'https://salt.tikicdn.com/cache/280x280/ts/product/c0/9f/3f/c6576e6a39f4b4ce3e9814cb8803e9cc.jpg'}

    ];
    const searchPopularCategory = [
        {id:1, name:'Bách hóa online', url:'https://image.voso.vn/users/vosoimage/images/0f53ee50010327a8f71eeead5d90900a?t%5B0%5D=maxSize%3Awidth%3D150%2Cheight%3D150&t%5B1%5D=compress%3Alevel%3D100&accessToken=e6ebd93f1d65ed458cd77dd62eb3e5e8a7921215c9405420c7f7c6a8b8ea363a'},
        {id:2, name:'Nhà cửa đời sống', url:'https://salt.tikicdn.com/cache/280x280/ts/product/17/7b/0c/84668ec248ed95d532f915afb913c108.jpg'},
        {id:3, name:'Sản đặc sản', url:'https://image.voso.vn/users/vosoimage/images/aa20579659ff44918fd9d708a094e30c?t%5B0%5D=maxSize%3Awidth%3D150%2Cheight%3D150&t%5B1%5D=compress%3Alevel%3D100&accessToken=f7e39e7695b6232c254ea72bf9205f6ecc682519b7b9397760b4de91b79b2c0a'},
        {id:4, name:'Thiết bị điện tử', url:'https://image.voso.vn/users/vosoimage/images/6d7cf6bb7b4916a126851cbb498c0845?t%5B0%5D=maxSize%3Awidth%3D150%2Cheight%3D150&t%5B1%5D=compress%3Alevel%3D100&accessToken=992bb0b04ffcd3f637781c55b4e85e4555fd905b12d76e48413f9c61a0e1c2c5'},
        {id:5, name:'Điện gia dụng', url:'https://image.voso.vn/users/vosoimage/images/6d7cf6bb7b4916a126851cbb498c0845?t%5B0%5D=maxSize%3Awidth%3D150%2Cheight%3D150&t%5B1%5D=compress%3Alevel%3D100&accessToken=992bb0b04ffcd3f637781c55b4e85e4555fd905b12d76e48413f9c61a0e1c2c5'},
        {id:6, name:'Thời trang nữ', url:'https://image.voso.vn/users/vosoimage/images/8399296911e4aceca8743c20a58de7b7?t%5B0%5D=maxSize%3Awidth%3D150%2Cheight%3D150&t%5B1%5D=compress%3Alevel%3D100&accessToken=247ec1fc59ff7964b263d9ff65229226750e9291adaea94f78a3e6a0e2237fd8'},
        {id:7, name:'Sức khỏe - Làm đẹp', url:'https://image.voso.vn/users/vosoimage/images/2dd47ec6a5f0d7c10c34d3e140ef70d0?t%5B0%5D=maxSize%3Awidth%3D150%2Cheight%3D150&t%5B1%5D=compress%3Alevel%3D100&accessToken=0690f46f348fce1191779ef644e48d694ccaf4c90e625fc25badd10c6ee8a272'},
        {id:8, name:'Mẹ và bé', url:'https://image.voso.vn/users/vosoimage/images/66921592c67ea8d4b8ad2d4c10a2497a?t%5B0%5D=maxSize%3Awidth%3D150%2Cheight%3D150&t%5B1%5D=compress%3Alevel%3D100&accessToken=7781915a3aa7cd0cbbd5fa8b4688a416f45130de5c15995a841dc4b929c2ad86'},

    ];

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo
     * @param {*} key
     * @return {void}
     */
    const clearHistoryKeySearch = (key = '') => {
        let existed = searchKeywordHistory.filter((item) => {
            if(item.title) {
                return item.title.toLowerCase() !== key.toLowerCase();
            }
        }) || [];
        setSearchKeywordHistory(existed);
    }

    /**
     * @author: <vanhau.vo@urekamedia.vn>
     * @todo
     * @param {*} key
     * @return {void}
     */
    const viewMoreHistoryKeySearch = (start = 0, end = 3) => {
        const { search_history_expand_button,  showResult } = keySearch;
        const { label, is_expand } = search_history_expand_button;
        if(is_expand) {
            setKeySearch({
                ...keySearch,
                showResult: {
                    ...showResult, start, end
                },
                search_history_expand_button: {
                    label: `Thu gọn`,
                    is_expand: false,
                    icon: <UpOutlined />,
                }
            });
        } else {
            setKeySearch({
                ...keySearch,
                showResult: {
                    ...showResult,
                    end: 3,
                },
                search_history_expand_button: {
                    label: `Xem thêm`,
                    is_expand: true,
                    icon: <DownOutlined />,
                }
            });
        }
    }

    /**
     * @author:
     * @todo
     * @param
     * @return
     */
    const SearchAutocomplete = () => {

        const menuSearchHistory = searchKeywordHistory.slice(keySearch.showResult.start, keySearch.showResult.end).map((item, index) => {
            return {
                label: <>
                    <div style={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>
                        <Link to={item.url ? item.url : ``}><HistoryOutlined /> {item.title ? item.title : ``}</Link>
                        <Button type="text" icon={<CloseCircleOutlined />} onClick={() => clearHistoryKeySearch(item.title)}/>
                    </div>
                </>,
                key: `item-${index}`,
            }
        });

        return (
            <><div className='dropdown-searchbar' >
                <Menu items={menuSearchHistory} />
                <Row justify="center" style={{ paddingBottom: 8, }}>
                    {
                        searchKeywordHistory.length <= 0 ?
                        <Alert message="Lịch sử tìm kiếm chưa có" type="info" showIcon style={{ width: '100%' }}/> :
                        searchKeywordHistory.length > 3 ?
                        <Button type="text" size='middle' onClick={() => viewMoreHistoryKeySearch(0, 10)} icon={keySearch.search_history_expand_button.icon}>
                            { keySearch.search_history_expand_button.label }
                        </Button> : <></>
                    }
                </Row>
                <Divider style={{ margin: 0, }} />
                <div style={{ padding: 8, }} >
                    <h5>Tìm kiếm phổ biến </h5>
                    <Row gutter={[8, 10]}>
                        {
                            searchPopular && searchPopular.map((item, index) => {
                                return (
                                    <Col span={8} key={index}>
                                        <Link style={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }} >
                                            <Image
                                                width={45}
                                                height={45}
                                                src={item.url}
                                                preview={false}
                                            />
                                            <span style={{ marginLeft: '5px' }}>{item.name}</span>
                                        </Link>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
                <Divider style={{ margin: 0, }} />
                <div style={{ padding: 8, }} >
                    <h5>Danh mục nổi bật </h5>
                    <Row gutter={[8, 16]}>
                        {
                            searchPopularCategory && searchPopularCategory.map((item, index)=>{
                                return (
                                    <Col span={6} key={index}>
                                        <Link to='' style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                            <Image
                                                width={60}
                                                height={60}
                                                src={item.url}
                                                preview={false}
                                            />
                                            <span>{item.name}</span>
                                        </Link>
                                    </Col>
                                )
                            })
                        }
                    </Row>
                </div>
            </div></>
        )
    };

    /**
     *
     * @param {*} inputValue
     * @param {*} path
     */
    const filterSearchbar = (inputValue, path) => {
        path.some((option) => option.label.toLowerCase().indexOf(inputValue.toLowerCase()) > -1)
    };

    /**
     *
     */
    const onChange = (value, selectedOptions) => {
        console.log(value, selectedOptions);
    };

    /**
     * @author <meimei@gmail.com>
     * @todo:
     * @param {Object} props
     * @returns
     */
    const [open, setOpen] = useState(false);
    const showDrawer = () => {
        setOpen(true);
    };
    const onClose = () => {
        setOpen(false);
    };

    /**
     * @author <hauvo1709@gmail.com>
     * @todo: Search products by key
     * @param {string} key
     * @return {void}
     */
    const handleSearchProducts = () => {
        setRouter({
            module: 'products',
            controller: 'search',
            action: 'view',
            q: keySearch.q ? keySearch.q : ``,
        }, navigate);
        /**
         *
         */
        let searchKeywordHistory_temp = searchKeywordHistory;
        let is_saved = searchKeywordHistory_temp.find((item) => {
            return item.title.toLowerCase() === keySearch.q.toLowerCase();
        });
        if(!is_saved) {
            searchKeywordHistory_temp.unshift({
                title: keySearch.q ? keySearch.q : ``,
                type: 'keyword',
                url: `/${adminPrefix}/products/search?action=view&id=&q=${keySearch.q ? keySearch.q : ''}`,
            });
            if(searchKeywordHistory_temp.length > 10) searchKeywordHistory_temp.pop();
            setSearchKeywordHistory(searchKeywordHistory_temp);
        }
    }

    useEffect(() => {
        if(searchParams.get('q')) {
            setKeySearch({
                ...keySearch,
                q: searchParams.get('q').trim()
            });
        }
    }, [props]);

    return (<>
        <header className='main_header_container'>
            <Row className='header_container' justify="center"  >
                <Col className='logo_container' span={2}>
                    <Link to="/shopping/home/home" > <Image preview={false} width={90} height={90} src="/images/msmall-icon.png" alt='icon' /></Link>
                </Col>
                <Col className='formSearch_container' span={16} >
                    <Cascader
                        dropdownRender={SearchAutocomplete}
                        onChange={onChange}
                        placeholder={keySearch.q ? keySearch.q.trim() : `Tìm sản phẩm, danh mục hay thương hiệu mong muốn ...`}
                        showSearch={{ filterSearchbar }}
                        suffixIcon={
                            <Button className='searchSubmit' icon={<SearchOutlined />} type="primary" onClick={() => handleSearchProducts()}>
                                Tìm Kiếm
                            </Button>
                        }
                        size="large"
                        onSearch={(value) => setKeySearch({...keySearch, q: value})}
                        style={{ width: '100%' }}
                        removeIcon={``}
                        expandIcon={<SearchOutlined />}
                    />
                </Col>
                <Col className='header_account_container' span={3}>
                    <Space
                        direction="horizontal"
                        size="small"
                        style={{display: 'flex',}}
                        align="end"
                    >
                        {/* <div> */}
                            <UserOutlined style={{ color: '#fff', fontSize: '32px' }} />
                            <div className='user_itemText'>
                                {is_login ? <AccountBox {...props}/> : <AuthenticatedBox {...props}/>}
                            </div>
                        {/* </div> */}
                    </Space>
                </Col>
                <Col className='header_cart_container' span={3}>
                    <Badge count={ carts.count || 0 } >
                        <ShoppingCartOutlined style={{ color: '#fff', fontSize: '32px' }} />
                    </Badge>
                    <div className='user_itemText'>
                        <Button type="text" style={{ color: '#fff' }} onClick={showDrawer} >
                            Giỏ Hàng
                        </Button>
                        <Drawer title="Giỏ hàng của bạn" placement="right" onClose={onClose} open={open}>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                            <p>Some contents...</p>
                        </Drawer>
                    </div>
                </Col>
            </Row>
        </header>

        <Modal className='login_popup_container'
            open={isModalOpen}
            footer={null}
            onCancel={handleCancel}
        >
            <Row className='login_popup' >
                <Col className='leftside' span={16} >
                    <h1>Welcome,</h1>
                    <p>Login / Signup </p>
                    <Form name="login_form"
                        labelCol={{ span: 8 }}
                        wrapperCol={{ span: 16, }}
                        initialValues={{ remember: true, }}
                        autoComplete="off"  >

                        <Form.Item label="Username" name="username"
                            rules={[{
                                required: true,
                                message: 'Please input your username!',
                            }]} >
                            <Input />
                        </Form.Item>

                        <Form.Item label="Password" name="password"
                            rules={[{
                                required: true,
                                message: 'Please input your password!',
                            }]}
                        >
                            <Input.Password />
                        </Form.Item>

                        <Form.Item wrapperCol={{ offset: 8, span: 16, }} >
                            <Button type="primary" htmlType="submit" style={{ width: '100%' }}>
                                Submit
                            </Button>
                        </Form.Item>

                    </Form>
                </Col>
                <Col className='rightside' span={8} >
                    <img src='https://salt.tikicdn.com/ts/upload/eb/f3/a3/25b2ccba8f33a5157f161b6a50f64a60.png' alt='login_img' />
                </Col>
            </Row>
        </Modal>
    </>)
}

export default HeaderSection;
