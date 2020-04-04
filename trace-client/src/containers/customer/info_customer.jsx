import React, {Component} from 'react';
import CommonCustomer from "../../assets/common_producer"
import { Form, Input, Button, Breadcrumb } from 'antd';
import TraceContract from '../../build/Trace';
import getWeb3 from "../../utils/getWeb3";

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

class InfoCustomer extends Component {
    state = { 
        web3: null, 
        accounts: null, 
        contract: null,
        customerid:'',
        customername:''
    };

    componentDidMount = async () => {
        try {
          const web3 = await getWeb3();
          const accounts = await web3.eth.getAccounts();
          const contractaddress = '0x28B13cae7bFA7deaF1f6a36329bA9AbccE280e62';
          const instance = new web3.eth.Contract(
            TraceContract.abi,
            contractaddress,
          );

          this.setState({ 
            web3, 
            accounts, 
            contract: instance ,
          });
        } catch (error) {
          console.error(error);
        }
    };

    // 处理表格的输入数据
    handleChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }

    // 处理提交
    handleSubmit=async()=>{
        const {accounts,contract} = this.state;
        await contract.methods.newUser(this.state.customerid,this.state.customername,2).send({from:accounts[0]});
    }

    render() {
        return (
            <CommonCustomer>
                <Breadcrumb>
                    <Breadcrumb.Item>账户管理</Breadcrumb.Item>
                    <Breadcrumb.Item>完善信息</Breadcrumb.Item>
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
                        label="昵称"
                        name="customername"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your customername!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('customername',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item
                        label="手机号"
                        name="customernumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your producernumber!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('customerid',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </CommonCustomer>
        );
    }
}

export default InfoCustomer;
