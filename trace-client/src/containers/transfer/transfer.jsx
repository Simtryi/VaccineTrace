import React, {Component} from 'react';
import CommonTransfer from "../../assets/common_transfer"
import { Form, Input, Button, Breadcrumb , Tabs } from 'antd';
import moment from 'moment'
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
const { TabPane } = Tabs;


class Transfer extends Component {
    state = { 
        web3: null, 
        accounts: null, 
        contract: null,
        vaccineid:'',
        retaileraddress:'',
        selladdress:''
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

    // 处理运输
    handleTransfer=async()=>{
        const {accounts,contract} = this.state;
        const timestamp = moment().format("YYYY-MM-DD HH:mm:ss")
        await contract.methods.retailerInnerTransfer(this.state.vaccineid,timestamp,this.state.retaileraddress).send({from:accounts[0]});
    }

    // 处理销售
    handleSell=async()=>{
        const {accounts,contract} = this.state;
        const timestamp = moment().format("YYYY-MM-DD HH:mm:ss")
        await contract.methods.fromRetailerToCustomer(this.state.vaccineid,timestamp,this.state.selladdress).send({from:accounts[0]});
    }

    render() {
        return (
            <CommonTransfer>
                <Breadcrumb>
                    <Breadcrumb.Item>运输管理</Breadcrumb.Item>
                    <Breadcrumb.Item>疫苗运输</Breadcrumb.Item>
                </Breadcrumb>

                <Tabs defaultActiveKey="1" >
                    <TabPane tab="运输" key="1">
                    <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    style={{float:'left',marginTop:100}}
                >
                    <Form.Item
                        label="疫苗ID"
                        name="vaccineid"
                        rules={[
                            {
                                required: true,
                                message: 'Please input vaccineid!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('vaccineid',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item
                        label="运输地址"
                        name="vaccineaddress"
                        rules={[
                            {
                                required: true,
                                message: 'Please input vaccineaddress!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('retaileraddress',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleTransfer}>
                            Transfer
                        </Button>
                    </Form.Item>
                </Form>
                    </TabPane>

                    <TabPane tab="销售" key="2">
                    <Form
                    {...layout}
                    name="basic"
                    initialValues={{
                        remember: true,
                    }}
                    style={{float:'left',marginTop:100}}
                >
                    <Form.Item
                        label="疫苗ID"
                        name="vaccineid"
                        rules={[
                            {
                                required: true,
                                message: 'Please input vaccineid!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('vaccineid',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item
                        label="销售地址"
                        name="vaccineaddress"
                        rules={[
                            {
                                required: true,
                                message: 'Please input vaccineaddress!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('selladdress',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSell}>
                            Sell
                        </Button>
                    </Form.Item>
                </Form>
                    </TabPane>
                
                </Tabs>
            </CommonTransfer>
        );
    }
}

export default Transfer;