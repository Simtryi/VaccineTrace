import React, {Component} from 'react';
import CommonProducer from "../../assets/common_producer"
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
        producerid:'',
        producername:''
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
    
    //   runExample = async () => {
    //     const { accounts, contract } = this.state;
    
    //     // Stores a given value, 5 by default.
    //     await contract.methods.set(6).send({ from: accounts[0] });
    
    //     // Get the value from the contract to prove it worked.
    //     const response = await contract.methods.get().call();
    
    //     // Update state with the result.
    //     this.setState({ storageValue: response });
    //   };
    

    // 处理表格的输入数据
    handleChange = (name,val)=>{
        this.setState({
            [name]:val
        })
    }

    // 处理提交
    handleSubmit=async()=>{
        const {accounts,contract} = this.state;
        await contract.methods.newUser(this.state.producerid,this.state.producername,0).send({from:accounts[0]});
    }

    render() {
        return (
            <CommonProducer>
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
                        <Cascader style={{minWidth:300}} onChange={(val)=>{this.handleChange('producername',val[1])}}
                            options={
                                [
                                    {
                                        value: 'sh',
                                        label: '上海',
                                        children: [{value: '上海生物制品研究所有限责任公司', label: '上海生物制品研究所有限责任公司',},
                                            {value: '上海泽润生物科技有限公司', label: '上海泽润生物科技有限公司',}],
                                    },
                                    {
                                        value: 'zj',
                                        label: '浙江',
                                        children: [{value: '浙江天元生物药业有限公司', label: '浙江天元生物药业有限公司',},
                                            {value: '浙江卫信生物药业有限公司', label: '浙江卫信生物药业有限公司',}],
                                    },
                                    {
                                        value: 'yn',
                                        label: '云南',
                                        children: [{value: '玉溪沃森生物技术有限公司', label: '玉溪沃森生物技术有限公司',},
                                            {value: '中国医学科学院医学生物学研究所', label: '中国医学科学院医学生物学研究所',}],
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
                               onChange={(val)=>{this.handleChange('producerid',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleSubmit}>
                            Submit
                        </Button>
                    </Form.Item>
                </Form>

            </CommonProducer>
        );
    }
}

export default InfoProducer;
