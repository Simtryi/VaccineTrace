import React, {Component} from 'react';
import background from "../../components/img/1.jpg"
import "../../components/css/login.css"
import { Form, Input, Button } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import {login} from '../../redux/actions'

const bodyStyle={
    textAlign:'center',
    background:'url('+background+')',
    width:window.screen.width,
    height:window.screen.height,
    backgroundRepeat:'no-repeat',
    backgroundAttachment:'fixed',
    backgroundSize:'100% 100%',
};



class Login extends Component {
    state = {
        username:'',
        password:'',
        type:'',
        display:'none'
    };

    // 处理表格的输入数据
    handleChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }

    // 处理登录
    handleLogin=()=>{
        this.props.login(this.state);
    }


    render() {
        const {msg,type,to} = this.props.user;
        if(to){
            if(type===1){
                return <Redirect to="/produce" />;
            }
            else if(type===2){
                return <Redirect to="/transfer" />;
            }
            else if(type===3){
                return <Redirect to="/trace" />;
            }
        }
        return (

            <div className="body" style={bodyStyle}>
                <div className="form">


                <p className="title">疫苗防伪追溯系统</p>

                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                    }}

                >
                    {/*登录*/}
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Username!',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"
                               onChange={(val)=>{this.handleChange('username',val.target.value)}}
                        />
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Password!',
                            },
                        ]}
                    >
                        <Input
                            prefix={<LockOutlined className="site-form-item-icon" />}
                            type="password"
                            placeholder="Password"
                            onChange={(val)=>{this.handleChange('password',val.target.value)}}
                        />

                    </Form.Item>

                    <Form.Item>
                        <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleLogin}>
                            Log in
                        </Button>
                        <p style={{color:'white',float:'left'}}>Or</p><Link to='/register' style={{float:'left',marginLeft:5,color:'#1890ff',cursor:'pointer'}}>register now!</Link>
                    </Form.Item>
                    {msg?<div
                        style={{
                            position:'absolute',
                            left:'50%',
                            top:'22%',
                            transform:'translate(-50%,0%)',
                            color:'red',
                            fontSize:20,
                        }}
                    >{msg}</div>:null}

                </Form>



                </div>
            </div>
        );
    }
}

export default connect(
    state=>({user:state.user}),
    {login}
)(Login);