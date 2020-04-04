import React, {Component} from 'react';
import CommonProducer from "../../assets/common_producer"
import { Form, Input, Button, Breadcrumb , Cascader , } from 'antd';
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


class Produce extends Component {
    state = { 
        web3: null, 
        accounts: null, 
        contract: null,
        vaccineid:'',
        vaccinename:'',
        vaccineaddress:'',
        vaccinebatch:''
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

    

    // 处理生产
    handleProduce=async()=>{
        const {accounts,contract} = this.state;
        const timestamp = moment().format("YYYY-MM-DD HH:mm:ss")
        await contract.methods.newVaccine(this.state.vaccineid,this.state.vaccinename,this.state.vaccineaddress,timestamp,this.state.vaccinebatch).send({from:accounts[0]});
    }

    render() {
        
        return (
            <CommonProducer>
                <Breadcrumb>
                    <Breadcrumb.Item>生产管理</Breadcrumb.Item>
                    <Breadcrumb.Item>疫苗生产</Breadcrumb.Item>
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

                    <Form.Item label="疫苗名称">
                        <Cascader style={{minWidth:300}} onChange={(val)=>{this.handleChange('vaccinename',val[0])}}
                                  options={
                                      [
                                          {
                                              value: '流感病毒裂解疫苗',
                                              label: '流感病毒裂解疫苗',
                                          },
                                          {
                                              value: '吸附无细胞百白破联合疫苗',
                                              label: '吸附无细胞百白破联合疫苗',
                                          },
                                          {
                                              value: '脊髓灰质炎减毒活疫苗糖丸',
                                              label: '脊髓灰质炎减毒活疫苗糖丸',
                                          },
                                          {
                                              value: '冻干静注人免疫球蛋白',
                                              label: '冻干静注人免疫球蛋白',
                                          },
                                          {
                                              value: '破伤风人免疫球蛋白',
                                              label: '破伤风人免疫球蛋白',
                                          },
                                      ]
                                  }
                        />
                    </Form.Item>

                    <Form.Item
                        label="生产地址"
                        name="vaccineaddress"
                        rules={[
                            {
                                required: true,
                                message: 'Please input vaccineaddress!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('vaccineaddress',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item
                        label="疫苗批次"
                        name="vaccinebatch"
                        rules={[
                            {
                                required: true,
                                message: 'Please input vaccinebatch!',
                            },
                        ]}
                    >
                        <Input style={{minWidth:300}}
                               onChange={(val)=>{this.handleChange('vaccinebatch',val.target.value)}}/>
                    </Form.Item>

                    <Form.Item {...tailLayout}>
                        <Button type="primary" htmlType="submit" onClick={this.handleProduce}>
                            Produce
                        </Button>
                    </Form.Item>
                </Form>
            </CommonProducer>
        );
    }
}

export default Produce;