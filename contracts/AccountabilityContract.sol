// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountabilityContractFactory {
  mapping(address => User) public users;
  uint public numberOfUsers;

    struct User {
    uint createdContracts;
    mapping(address => AccountabilityContract) openAccountabilityContracts;
    address[] openAccounabilityContractAddresses;
    mapping(uint => AccountabilityContract) closedAccountabilityContracts;
    address[] closedAccounabilityContractAddresses;
    }

    function createAccountabilityContract(address _referee, string memory _name, string memory _description, address payable _failureRecipient) public payable {
        if(users[msg.sender].createdContracts == 0){
            numberOfUsers++;
        }
        AccountabilityContract newContract = (new AccountabilityContract){value: msg.value}(msg.sender, _referee, _name, _description, _failureRecipient, msg.value);
        users[msg.sender].openAccountabilityContracts[address(newContract)] = newContract;
        users[msg.sender].createdContracts++;
        users[msg.sender].openAccounabilityContractAddresses.push(address(newContract));
    }

    function getOpenAccountabilityContractAddresses(address user) public view returns (address[] memory){
        return users[user].openAccounabilityContractAddresses;
    }

    function getOpenAccountabilityContract(address user, address contractAddress) public view returns (AccountabilityContract){
        return users[user].openAccountabilityContracts[contractAddress];
    }

    function getClosedAccountabilityContractAddresses(address user) public view returns (address[] memory){
        return users[user].closedAccounabilityContractAddresses;
    }

    function getClosedAccountabilityContract(address user, uint index) public view returns (AccountabilityContract){
        return users[user].closedAccountabilityContracts[index];
    }

    function failOpenAccountabilityContract(address user, uint index) public {
      address openAccountabilityContract = users[user].openAccounabilityContractAddresses[index];
      users[user].closedAccountabilityContracts[users[user].closedAccounabilityContractAddresses.length] = users[user].openAccountabilityContracts[openAccountabilityContract].failContract();
      moveOpenContractToClosedContracts(user, index);
      delete users[user].openAccountabilityContracts[openAccountabilityContract];
    }

    function completeOpenAccountabilityContract(address user, uint openAccountabilityContractAddressIndex) public {
      address openAccountabilityContract = users[user].openAccounabilityContractAddresses[openAccountabilityContractAddressIndex];
      users[user].closedAccountabilityContracts[users[user].closedAccounabilityContractAddresses.length] = users[user].openAccountabilityContracts[openAccountabilityContract].completeContract();
      moveOpenContractToClosedContracts(user, openAccountabilityContractAddressIndex);
      delete users[user].openAccountabilityContracts[openAccountabilityContract];
    }

    function moveOpenContractToClosedContracts(address user, uint openContractIndex) private {
        uint openContractAddressesLength = users[user].openAccounabilityContractAddresses.length;
        require(openContractIndex < openContractAddressesLength, "Open contract index out of bounds");
        for (uint i = openContractIndex; i<openContractAddressesLength-1; i++){
            users[user].openAccounabilityContractAddresses[i] = users[user].openAccounabilityContractAddresses[i+1];
        }
        users[user].closedAccounabilityContractAddresses.push(users[user].openAccounabilityContractAddresses[users[user].openAccounabilityContractAddresses.length-1]);
        users[user].openAccounabilityContractAddresses.pop();
  
    }
}

contract AccountabilityContract {
    enum Status{ OPEN, SUCCESS, FAILURE }
    address public creator;
    address public referee;
    string public name;
    string public description;
    address public failureRecipient;
    uint public amount;
    Status public status;

    constructor(address _creator, address _referee, string memory _name, string memory _description, address _failureRecipient, uint _amount) payable {
        creator = _creator;
        referee = _referee;
        name = _name;
        description = _description;
        failureRecipient = _failureRecipient;
        amount = _amount;
        status = Status.OPEN;
    }

    modifier restricted() {
        require(creator == msg.sender, "Function only available for the creator of the contract");
        require(tx.origin == referee, "Origin does not equal referee");
        require(status == Status.OPEN, "Contract status is not equal to open");
        _;
    }

    function failContract() public payable restricted returns (AccountabilityContract) {
        payable(failureRecipient).transfer(address(this).balance);
        status = Status.FAILURE;
        return this;
    } 

    function completeContract() public payable restricted returns (AccountabilityContract) {
        payable(creator).transfer(address(this).balance);
        status = Status.SUCCESS;
        return this;
    }
}
