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
    address public manager=0xd377254722D3274f66eB66c392925F6052335CcB;
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
    // require(x==manager);
   
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

 uint people=0;
    uint password=335566;

    struct MyAccount{
    string name;
    uint points;
    uint passcode;
    
    
    
    
 
}

mapping(address=>MyAccount) public records;
mapping(address=>uint ) public records3;

function Signup(string memory _name,address ad,uint _p) public{
    require(records3[ad]==0);
    MyAccount storage newdata=records[ad];
    newdata.name=_name;
    newdata.points=0;
    newdata.passcode=_p;
    if(records3[ad]==0)
    people++;

    records3[ad]=1;
}

function Profile_name(address ad,uint passs) public view returns(string memory){
    require(records[ad].passcode==passs);
    return records[ad].name;
}

function Profile_points(address ad,uint passs) public view returns(uint){
    require(records[ad].passcode==passs);
    return records[ad].points;
}

function Sendpoints(uint x,address ad,uint passs) public {
require(password==passs);
records[ad].points+=x;
}

struct Contri{
    string des;
    uint total;
    uint person;
    uint collected;
    uint client;
    string status;
}
struct Payees{
    string[]   names;
    uint totall;

}
mapping(uint=>Payees) public records2;

mapping(uint=>Contri) public records1;
uint contri_num=0;
function Contri_req(string memory _des,uint _total,uint passs) public {
    require(passs==password);
    contri_num++;
    Contri storage newdata=records1[contri_num];
    newdata.des=_des;
    newdata.total=_total;
    newdata.person=(_total/people)+1;
    newdata.collected=0;
    newdata.status="Not Competed";
    newdata.client=0;
    Payees storage payee=records2[contri_num];
    payee.totall=0;
}

function Pay(uint req_no,address ad,uint x) public {
   require(records[ad].passcode==x);
    require(records[ad].points>=records1[req_no].person);
    records[ad].points=(records[ad].points)-(records1[req_no].person);
    records1[req_no].collected+=(records1[req_no].person);
    if(records1[req_no].collected>=records1[req_no].total)records1[req_no].status="Completed";
    records2[req_no].totall++;
    (records2[req_no].names).push(records[ad].name);
    records1[req_no].client++;


}
function ViewPayee(uint num,uint val) public view returns(string memory){
    return (records2[num].names)[val-1];
}

function View_des(uint num) public view returns(string memory){
return records1[num].des;
}
function View_total(uint num) public view returns(uint){
return records1[num].total;
}
function View_person(uint num) public view returns(uint){
return records1[num].person;
}
function View_remaining(uint num) public view returns(uint){
return records1[num].collected;
}
function View_client(uint num) public view returns(uint){
return records1[num].client;
}
function View_status(uint num) public view returns(string memory){
return records1[num].status;
}
    
}