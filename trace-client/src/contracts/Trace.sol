pragma solidity ^0.4.24;
pragma experimental ABIEncoderV2;
                                         
contract Trace {
    enum Actor{Producer,Retailer,Customer}
    enum Phase{Producer,Retailer,Customer}
    
    struct User{
        uint id;
        string name;
        Actor actor;
    }
    struct Vaccine{
        uint vaccine_id;
        string vaccine_name;
        string vaccine_batch;
        string[] timestamps;
        string produce_time;
        string produce_address;
        string sell_time;
        string sell_address;
        string producer_name;
        string[] retailer_address;
        string[] retailer_name;
        bool isBinding;
        address owner;
    }
    
    mapping(address=>User) producerMap;
    mapping(address=>User) retailerMap;
    mapping(address=>User) customerMap;
    mapping(uint=>Vaccine) vaccineMap;
    mapping(address=>bool) whiteList;
    address owner;
    
    constructor() public{
        owner = msg.sender;
        whiteList[owner] = true;
    }
    
    function addWhiteList(address addr) public{
        whiteList[addr] = true;
    }
    
    function newUser(uint _id,string _name,Actor _actor) public returns(bool,string){
        User user;
        if(_actor == Actor.Producer){
            user = producerMap[msg.sender];
        }else if(_actor == Actor.Retailer){
            user = retailerMap[msg.sender];
        }else if(_actor == Actor.Customer){
            user = customerMap[msg.sender];
        }else{
            return (false,"the actor is not belong");
        }
        
        if(user.id!=0){
            return (false,'this id has been occupied');
        }
        user.id = _id;
        user.name = _name;
        user.actor = _actor;
        return (true,'Success');
    }
    
     // this interface just for producer
    function newVaccine(uint vaccineId, string vaccineName,string vaccineAddress,
    string timestamp,string vaccineBatch) public returns(bool,string){
        Vaccine vaccine = vaccineMap[vaccineId];
        if(vaccine.vaccine_id != 0){
            return (false,"The vaccineID already exist!");
        }
        User user = producerMap[msg.sender];
        if(user.id == 0) {
            return (false,"The producer don't exist!");
        }
        vaccine.vaccine_id = vaccineId;
        vaccine.vaccine_name = vaccineName;
        vaccine.vaccine_batch = vaccineBatch;
        vaccine.produce_address = vaccineAddress;
        vaccine.produce_time = timestamp;
        vaccine.producer_name = user.name;
       
        return (true,"Success,produce a new vaccine");
    }
    
    // this interface just for retailer
    function retailerInnerTransfer(uint vaccineId,string timestamp,string retailerAddress) public returns(bool, string){
        Vaccine vaccine = vaccineMap[vaccineId];
        if(vaccine.vaccine_id == 0){
             return (false,"The vaccineID don't exist!");
        }
        User user = retailerMap[msg.sender];
        if(user.id == 0) {
            return (false,"The retailer don't exist!");
        }
        vaccine.timestamps.push(timestamp);
        vaccine.retailer_name.push(user.name);
        vaccine.retailer_address.push(retailerAddress);
        return (true,"Success");
    }
    
    function fromRetailerToCustomer(uint vaccineId,string timestamp,string sellAddress) public returns(bool, string){
        Vaccine vaccine = vaccineMap[vaccineId];
        if(vaccine.vaccine_id == 0){
            return (false,"The vaccineID don't exist!");
        }
        vaccine.sell_time = timestamp;
        vaccine.sell_address = sellAddress;
        return (true,"Success,Has been sold");
    }
    
    // just for get vaccine message
    function getVaccineRecords(uint vaccineId) public view returns(bool,string,
    string producerName,string produceTime, string produceAddress,string[] retailerNames,string[] retailerTimes
    , string[] retailerAddress,string vaccineBatch,string sellTime,string sellAddress,string vaccineName){
        Vaccine vaccine = vaccineMap[vaccineId];
        if(vaccine.vaccine_id == 0){
            return (false,"The commodityID is not exist",producerName, produceTime, produceAddress,
            retailerNames, retailerTimes,retailerAddress,vaccineBatch,sellTime,sellAddress,vaccineName);
        }
        return (true,"success",vaccine.producer_name,vaccine.produce_time,vaccine.produce_address,
        vaccine.retailer_name,vaccine.timestamps,vaccine.retailer_address,vaccine.vaccine_batch,
        vaccine.sell_time,vaccine.sell_address,vaccine.vaccine_name);
       
    }
    
    // // just for Supervision organization
    // function getVaccineRecordsByWhiteList(uint vaccineId) returns(bool,string,
    // string producerName,uint produceTime, string[] retailerNames,uint[] retailerTimes
    // , string customerName,uint sellTime){
    //     if(!whiteList[msg.sender]){
    //         return (false,"you has no access",producerName, produceTime, retailerNames, retailerTimes, customerName,sellTime);
    //     }
    //     Vaccine vaccine = vaccineMap[vaccineId];
    //     if(vaccine.vaccine_id == 0){
    //         return (false,"The commodityID is not exist",producerName, produceTime, retailerNames, retailerTimes,customerName,sellTime);
    //     }
    //     return (true,"success",vaccine.producer_name,vaccine.produce_time,vaccine.retailer_name,vaccine.timestamps,vaccine.customer_name,vaccine.sell_time);
       
    // }
    
    // function getVaccine(uint vaccineId,Actor _actor)  returns(bool,string,
    // string producerName,uint produceTime,string[] retailerNames,uint[] retailerTimes
    // , string customerName,uint sellTime){
    //     Vaccine vaccine = vaccineMap[vaccineId];
    //     if(vaccine.vaccine_id == 0){
    //         return (false,"The vaccineID is not exist",producerName,produceTime,
    //         retailerNames,retailerTimes,customerName,sellTime);
    //     }
    //     User user;
    //     if(_actor == Actor.Producer){
    //         user = producerMap[msg.sender];
    //     }else if(_actor == Actor.Retailer){
    //         user = retailerMap[msg.sender];
    //     }else if(_actor == Actor.Customer){
    //         user = customerMap[msg.sender];
    //     }else{
    //         return (false,"the actor is not belong",producerName,produceTime,
    //         retailerNames,retailerTimes,customerName,sellTime);
    //     }
    //     if(vaccine.isBinding){
    //         if(vaccine.owner != msg.sender){
    //             return (false,"warning,this vaccine has been bound",producerName,produceTime,
    //         retailerNames,retailerTimes,customerName,sellTime);
    //         }else{
    //             (false,"has already bind",vaccine.producer_name,vaccine.retailer_name,vaccine.customer_name);
               
    //         }
    //     }
    //     if(vaccine.sell_time > 0 ) {
    //         vaccine.isBinding = true;
    //         vaccine.owner = msg.sender;
    //         vaccine.customer_name = user.name;
    //     }
    //     return (true,"success",vaccine.producer_name,vaccine.produce_time,vaccine.retailer_name,vaccine.timestamps,vaccine.customer_name,vaccine.sell_time);
    // }
}
    
    
