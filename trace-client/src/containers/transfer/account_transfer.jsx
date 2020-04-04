import React, {Component} from 'react';
import { Form, Input, Button, Breadcrumb} from 'antd';
import CommonTransfer from "../../assets/common_transfer"
import {update} from '../../redux/actions'
import {connect} from "react-redux";

const layout = {
    labelCol: {
        span: 9,
    },
    wrapperCol: {
        span: 15,
    },
};
const tailLayout = {
    wrapperCol: {
        offset: 9,
        span: 16,
    },
};

class AccountTransfer extends Component {
    state = {
        username:'',
        password:'',
        newpassword:'',
        repassword:'',
    };

    // 处理表格的输入数据
    handleChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }

    // 处理更新
    handleUpdate=()=>{
        this.props.update(this.state);
    }

    render() {
        const {msg} = this.props.user;

        return (
            <CommonTransfer>
                <Breadcrumb>
                    <Breadcrumb.Item>账户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>密码修改</Breadcrumb.Item>
                </Breadcrumb>
                <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    style={{float:'left',marginTop:100}}
                >
                    <Form.Item
                        label="Username"
                        name="username"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your username!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('username',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item
                        label="Oldpassword"
                        name="oldpassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Oldpassword!',
                            },
                        ]}
                    >
                        <Input.Password style={{minWidth:300}}
                                        onChange={(val)=>{this.handleChange('password',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item
                        label="Newpassword"
                        name="newpassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your Newpassword!',
                            },
                        ]}
                    >
                        <Input.Password style={{minWidth:300}}
                                        onChange={(val)=>{this.handleChange('newpassword',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item
                        label="Repassword"
                        name="repassword"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password Again!',
                            },
                        ]}
                    >
                        <Input.Password style={{minWidth:300}}
                                        onChange={(val)=>{this.handleChange('repassword',val.target.value)}}/>
                    </Form.Item>


                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleUpdate}>
                            Submit
                        </Button>
                    </Form.Item>

                    {msg?<div
                        style={{
                            position:'absolute',
                            left:'28%',
                            top:'22%',
                            color:'red',
                            fontSize:20,
                        }}
                    >{msg}</div>:null}
                </Form>
            </CommonTransfer>
        );
    }
}

export default connect(
    state=>({user:state.user}),
    {update}
)(AccountTransfer);