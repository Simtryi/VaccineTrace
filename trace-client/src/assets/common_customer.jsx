import React from 'react';
import '../components/css/common.css';
import {Link} from "react-router-dom"
import { Layout, Menu } from 'antd';
import {
    MenuUnfoldOutlined,
    MenuFoldOutlined,
    ClockCircleOutlined,
    SearchOutlined,
    UserOutlined,
} from '@ant-design/icons';
import Clock from "../components/clock";

const { Header, Sider, Content , Footer } = Layout;
const { SubMenu } = Menu;

class CommonCustomer extends React.Component {
    state = {
        collapsed: false,
        show:'block',
        show2:'none'
    };

    toggle = () => {
        this.setState({
            collapsed: !this.state.collapsed,
            show:this.state.show==='block'?'none':'block',
            show2:this.state.show2==='block'?'none':'block'
        });
    };

    render() {
        return (

            <Layout>
                <Sider trigger={null} collapsible collapsed={this.state.collapsed} >
                    <div className="logo" style={{textAlign:'center',padding:5}}>
                        <ClockCircleOutlined style={{color:'white',display:this.state.show2}}/>
                        <Clock style={{float:'left'}}display={this.state.show}/>
                    </div>
                    <Menu theme="dark" mode="inline" defaultSelectedKeys={['trace']} >
                        <Menu.Item key="trace">
                            <SearchOutlined />
                            <span><Link to="/trace" style={{color:'rgba(255,255,255,.65)'}}>疫苗追溯</Link></span>
                        </Menu.Item>
                        <SubMenu
                            key="account"
                            title={
                                <span>
                                <UserOutlined />
                                <span>账户管理</span>
                            </span>
                            }

                        >
                            <Menu.Item key="infoCustomer"><Link to='/infoCustomer' style={{color:'rgba(255,255,255,.65)'}}>完善信息</Link></Menu.Item>
                            <Menu.Item key="updatePassword"><Link to='/accountCustomer' style={{color:'rgba(255,255,255,.65)'}}>密码修改</Link></Menu.Item>
                        </SubMenu>
                    </Menu>
                </Sider>
                <Layout className="site-layout">
                    <Header className="site-layout-background" style={{ padding: 0,textAlign:"center"}}>
                        {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: 'trigger',
                            onClick: this.toggle,
                        })}
                        <span>疫苗防伪追溯系统</span>
                    </Header>

                    <Content
                        className="site-layout-background"
                        style={{
                            margin: '24px 16px',
                            padding: 24,
                            minHeight: 630,
                        }}
                    >
                        {this.props.children}
                    </Content>

                    <Footer style={{ textAlign: 'center' }}>Ant Design ©2018 Created by Ant UED</Footer>
                </Layout>
            </Layout>

        );
    }
}

export default CommonCustomer;
