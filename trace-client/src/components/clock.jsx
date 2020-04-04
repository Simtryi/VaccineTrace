import React from "react"
import moment from 'moment'

class Clock extends React.Component{
    constructor(props){
        super(props);
        this.state={date:moment().format("HH:mm:ss")};
    }
    componentDidMount() {
        setInterval(()=>{
            this.setState({date:moment().format("HH:mm:ss") });
        },1000);
    }

    render(){
        return <span style={{color:'white',display:this.props.display,fontSize:20}}>{this.state.date}</span>
    }
}



export default Clock;



