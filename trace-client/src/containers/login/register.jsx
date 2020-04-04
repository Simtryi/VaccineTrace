import React, {Component} from 'react';
import background from "../../components/img/1.jpg"
import "../../components/css/login.css"
import { Form, Input, Button, Radio } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import {connect} from 'react-redux'
import {Redirect,Link} from 'react-router-dom'
import {register} from '../../redux/actions'

const bodyStyle={
    textAlign:'center',
    background:'url('+background+')',
    width:window.screen.width,
    height:window.screen.height,
    backgroundRepeat:'no-repeat',
    backgroundAttachment:'fixed',
    backgroundSize:'100% 100%',
};



class Register extends Component {
    state = {
        username:'',
        password:'',
        repassword:'',
        type:'1'
    };

    // 处理表格的输入数据
    handleChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }

    // 处理注册
    handleRegister=()=>{
        this.props.register(this.state);
    }


    render() {
        const {msg,to} = this.props.user;
        if(to){
            return <Redirect to="/" />;
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
                        style={{marginTop:-10}}
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
                        <Form.Item
                            name="repassword"
                            rules={[
                                {
                                    required: true,
                                    message: 'Please input your Password Again!',
                                },
                            ]}
                        >
                            <Input
                                prefix={<LockOutlined className="site-form-item-icon" />}
                                type="password"
                                placeholder="Repassword"
                                onChange={(val)=>{this.handleChange('repassword',val.target.value)}}
                            />

                        </Form.Item>

                        <Form.Item>
                            <Radio.Group name="radiogroup" defaultValue={1} >
                                <Radio onChange={()=>{this.handleChange('type','1')}} value={1} style={{color:'white'}}>Producer</Radio>
                                <Radio onChange={()=>{this.handleChange('type','2')}} value={2} style={{color:'white'}}>Transfer</Radio>
                                <Radio onChange={()=>{this.handleChange('type','3')}} value={3} style={{color:'white'}}>Customer</Radio>
                            </Radio.Group>
                        </Form.Item>
                        <Form.Item>
                            <Button type="primary" htmlType="submit" className="login-form-button" onClick={this.handleRegister}>
                                Sign up
                            </Button>
                            <p style={{color:'white',float:'left'}}>Or</p><Link to='/'><p style={{float:'left',marginLeft:5,color:'#1890ff',cursor:'pointer'}} >have account!</p></Link>
                        </Form.Item>
                        {msg?
                            <div
                                style={{
                                    position:'absolute',
                                    left:'50%',
                                    top:'22%',
                                    transform:'translate(-50%,0%)',
                                    color:'red',
                                    fontSize:20,
                                    display:this.state.display
                                }}
                            >{msg}</div>
                            :null
                        }


                    </Form>



                </div>
            </div>
        );
    }
}

export default connect(
    state=>({user:state.user}),
    {register}
)(Register);