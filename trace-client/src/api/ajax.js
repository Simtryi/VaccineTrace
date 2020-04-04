import axios from 'axios'
export default function ajax (url = '' ,data = {} ,type = 'GET'){
    if(type === 'GET'){
        let dataStr = ''
        Object.keys(data).forEach(key => {
            dataStr += key + '=' +data[key] + '&'
        })
        if(dataStr){
            dataStr = dataStr.subString(0,dataStr.length-1)
        }

        return axios.get(url + '?' +dataStr);
    }
    else{
        return axios.post(url,data);
    }
}