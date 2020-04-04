import React, {Component} from 'react';
import CommonTransfer from "../../assets/common_transfer"
import { Form, Input, Button, Breadcrumb , Cascader} from 'antd';
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

class InfoProducer extends Component {
    state = { 
        web3: null, 
        accounts: null, 
        contract: null,
        transferid:'',
        transfername:''
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
        await contract.methods.newUser(this.state.transferid,this.state.transfername,1).send({from:accounts[0]});
    }

    render() {
        return (
            <CommonTransfer>
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
                    <Form.Item label="公司名称">
                    <Cascader style={{minWidth:300}} onChange={(val)=>{this.handleChange('transfername',val[1])}}
                                  options={
                                      [
                                          {
                                              value: 'sz',
                                              label: '深圳',
                                              children: [{value: '顺丰速运有限公司', label: '顺丰速运有限公司',}],
                                          },
                                          {
                                              value: 'sh',
                                              label: '上海',
                                              children: [{value: '圆通速递有限公司', label: '圆通速递有限公司',},
                                                  {value: '中通快递股份有限公司', label: '中通快递股份有限公司',},
                                                  {value: ' 申通快递有限公司', label: ' 申通快递有限公司',}],


                                          },
                                          {
                                              value: 'zj',
                                              label: '浙江',
                                              children: [{value: '菜鸟裹裹', label: '菜鸟裹裹',}],
                                          },

                                      ]
                                  }
                        />
                    </Form.Item>

                    <Form.Item
                        label="公司注册号"
                        name="producernumber"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your producernumber!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('transferid',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>
            </CommonTransfer>
        );
    }
}

export default InfoProducer;
