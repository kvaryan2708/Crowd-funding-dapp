/*This is the smart contract of a CrowdFunding DApp that I have made.
  It contains manager as the person that deployed the contract and the following major functions:-
  1)register()-> for the registration of a person that want to donate.
  2)Find(address r,uint password)-> To check how much you have donated.
  3)SendEth()->to send etherum to manager
  4)createRequest()->to create a request by manager stating the amount of money required for a particular purpose
  5)viewD,viewM,viewS()-> to find the description,money required and status of request created by manager
  6)voting()-> Used by donators to vote for a particular request to ensure proper use of their money
  7)Withdraw()->Used my manager to withdraw the money of a particular request if the votes given for this request is in majority
  It also contains Request class to store data of a request and map 'requests' for storing different Request
  It contains maps naming data,passcode and candidates for storing the money contributed by a given address,
  passwords associated with different registerd accounts and if a account has registerd or not respectively.
  */

//SPDX-License-Identifier:MIT
pragma solidity >=0.5.0 <0.9.0;

contract CrowdFund{
    address public manager;
    uint public balance=0;
   uint  total=0;
    uint  pass=335566;
   
   struct Request{
    string description;
    uint num;
    string status;
    bool completed;
    mapping(address=>uint) voted;
    uint votes;
    
 
}

mapping(uint=>Request) public requests;
uint number=0;
function createRequest(string memory d,uint x,uint p) public {
 require(p==pass);
number++;
Request storage newdata=requests[number];

newdata.description=d;newdata.num=x;newdata.status="Not Completed";newdata.completed=false;
newdata.votes=0;

}

function viewD(uint id) public view returns(string memory){
    return requests[id].description;
}
function viewM(uint id) public view returns(uint){
    return requests[id].num;
}
function viewS(uint id) public view returns(string memory){
    return requests[id].status;
}


    mapping(address=>uint) public data;
    mapping (address=>uint) public passcode;
    mapping(address=>uint) public candidates;

    constructor() public  {
        manager=msg.sender;
    }

    

    function voting(uint no,address a,uint p) public {
        require(data[a]!=0);
        require(passcode[a]==p);
        require(no <=number);
        require(requests[no].voted[a]==0);
        requests[no].voted[a]=1;
        requests[no].votes++;
    }

    function register(address a,uint b) public{
        require(candidates[a]==0);
        candidates[a]=1;
        passcode[a]=b;
    }

function SendEth(address payable x) public payable{
    require(x==manager);
   
    x.transfer(msg.value);
    if(data[msg.sender]==0)total++;
    data[msg.sender]+=msg.value;
    balance+=msg.value;
   

}

function Withdraw(uint id,address payable x,uint password) public payable{
    require(password==pass,"Incorrect Password");
    require((requests[id].votes)*2>total);
    require(requests[id].completed==false);
    require(msg.value==requests[id].num);
    x.transfer(msg.value);
    balance-=msg.value;
  requests[id].status="Completed";
    requests[id].completed=true;
}
function ManagerAddress() public view returns(address){
    return manager;
}

function getBalance() public view returns(uint){
    return balance;
}


function Find(address  r,uint p) public view  returns(uint){
require(passcode[r]==p);
return data[r]; 
    
}
    
}