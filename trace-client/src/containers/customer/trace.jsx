import React, {Component} from 'react';
import CommonCustomer from "../../assets/common_customer"
import { Input, Breadcrumb , Descriptions , Timeline } from 'antd';
import TraceContract from '../../build/Trace';
import getWeb3 from "../../utils/getWeb3";

const { Search } = Input;

class Trace extends Component {
    state={
        web3: null, 
        accounts: null, 
        contract: null,
        show:'none',
        searchid:'',
        producername:'',
        producetime:'',
        produceaddress:'',
        retailernames:null,
        retailertimes:null,
        retaileraddress:null,
        vaccinebatch:'',
        selltime:'',
        selladdress:'',
        vaccinename:'',
    }

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

    // 处理溯源
    handleTrace=async()=>{
        const {contract} = this.state;
        const result = await contract.methods.getVaccineRecords(this.state.searchid).call();
        const producername = result[2];
        const producetime = result[3];
        const produceaddress = result[4];
        const retailernames = result[5];
        const retailertimes = result[6];
        const retaileraddress = result[7];
        const vaccinebatch = result[8];
        const selltime = result[9];
        const selladdress = result[10];
        const vaccinename = result[11];
        this.setState({
            show:this.state.show==='none'?'block':'none',
            producername,
            producetime,
            produceaddress,
            retailernames,
            retailertimes,
            retaileraddress,
            vaccinebatch,
            selltime,
            selladdress,
            vaccinename,
        })
    }

    render() {
        const list = this.state.retaileraddress===null?null:this.state.retailernames.map((val,index)=>{
            return <Timeline.Item>
            运输时间：{this.state.retailertimes[index]}<br/>
            运输地址：{this.state.retaileraddress[index]}<br/>
            运输商：{val}
        </Timeline.Item>
        });
        return (
            <CommonCustomer>
                <Breadcrumb>
                    <Breadcrumb.Item>生产管理</Breadcrumb.Item>
                    <Breadcrumb.Item>疫苗溯源</Breadcrumb.Item>
                </Breadcrumb>

                <Search placeholder="input vaccine id"
                        style={{width:500,marginTop:20}}
                        onChange={(val)=>{this.handleChange('searchid',val.target.value)}}
                        onSearch={this.handleTrace}
                        enterButton />

                <Descriptions bordered size='middle' style={{
                    height:200,
                    width:500,
                    position:'absolute',
                    left:'16.5%',
                    top:'26%',
                    display:this.state.show
                }}>
                    <Descriptions.Item label="疫苗名称">{this.state.vaccinename}</Descriptions.Item><br/>
                    <Descriptions.Item label="生产地址">{this.state.produceaddress}</Descriptions.Item>
                    <Descriptions.Item label="生产日期">{this.state.producetime}</Descriptions.Item><br/>
                    <Descriptions.Item label="生产批次">{this.state.vaccinebatch}</Descriptions.Item>
                    <Descriptions.Item label="生产商">{this.state.producername}</Descriptions.Item>
                </Descriptions>
                

                <Timeline mode="alternate" style={{
                    height:600,
                    width:600,
                    position:'absolute',
                    left:'55%',
                    top:'26%',
                    display:this.state.show
                }}>
                    <Timeline.Item>
                        生产时间：{this.state.producetime}<br/>
                        生产地址：{this.state.produceaddress}<br/>
                        生产商：{this.state.producername}
                    </Timeline.Item>
                    {list}
                    <Timeline.Item color="green">
                        销售时间：{this.state.producetime}<br/>
                        销售地址：{this.state.produceaddress}<br/>
                    </Timeline.Item>
                </Timeline>
            </CommonCustomer>
        );
    }
}

export default Trace;