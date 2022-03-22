// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountabilityContractFactory {
  mapping(address => User) public users;
  uint public numberOfUsers;
  uint public numberOfContracts;
  uint public totalEthInContracts;
  address[] userAddresses;
  mapping(address => Referee) public referees;
  uint public numberOfReferees;
  address[] refereeAddresses;

    struct User {
    uint createdContracts;
    address[] openAccountabilityContractAddresses;
    address[] closedAccountabilityContractAddresses;
    }

    struct Referee {
    uint managedContracts;
    address[] openAccountabilityContractAddresses;
    address[] closedAccountabilityContractAddresses;
    }

    function createAccountabilityContract(address _referee, string memory _name, string memory _description, address payable _failureRecipient) public payable {
        if(users[msg.sender].createdContracts == 0){
            numberOfUsers++;
            userAddresses.push(msg.sender);
        }
        if(referees[_referee].managedContracts == 0){
            numberOfReferees++;
            refereeAddresses.push(_referee);
        }
        AccountabilityContract newContract = (new AccountabilityContract){value: msg.value}(msg.sender, _referee, _name, _description, _failureRecipient, msg.value);
        numberOfContracts++;
        totalEthInContracts+=msg.value;
        users[msg.sender].createdContracts++;
        users[msg.sender].openAccountabilityContractAddresses.push(address(newContract));
        referees[_referee].managedContracts++;
        referees[_referee].openAccountabilityContractAddresses.push(address(newContract));
    }

    function getOpenAccountabilityContractAddressesForUser(address user) public view returns (address[] memory){
        return users[user].openAccountabilityContractAddresses;
    }

    function getClosedAccountabilityContractAddressesForUser(address user) public view returns (address[] memory){
        return users[user].closedAccountabilityContractAddresses;
    }

    function getOpenAccountabilityContractAddressesForReferee(address referee) public view returns (address[] memory){
        return referees[referee].openAccountabilityContractAddresses;
    }

    function getClosedAccountabilityContractAddressesForReferee(address referee) public view returns (address[] memory){
        return referees[referee].closedAccountabilityContractAddresses;
    }

    function failOpenAccountabilityContract(address user, address contractAddress) public {
      AccountabilityContract accountabilityContract = AccountabilityContract(contractAddress);
      accountabilityContract.failContract();
      moveOpenContractToClosedContractsForUser(user,contractAddress);
      moveOpenContractToClosedContractsForReferee(accountabilityContract.referee(), contractAddress);
    }

    function completeOpenAccountabilityContract(address user, address contractAddress) public {
      AccountabilityContract accountabilityContract = AccountabilityContract(contractAddress);
      accountabilityContract.completeContract();
      moveOpenContractToClosedContractsForUser(user, contractAddress);
      moveOpenContractToClosedContractsForReferee(accountabilityContract.referee(), contractAddress);
    }

    function getContractIndexForUser(address user, address contractAddress) view private returns (uint){
        uint contractIndex;
        for (uint i = 0; i<=users[user].openAccountabilityContractAddresses.length-1; i++){
            if(users[user].openAccountabilityContractAddresses[i] == contractAddress){
                contractIndex = i;    
            }
        }
        return contractIndex;
    }

    function moveOpenContractToClosedContractsForUser(address user, address contractAddress) private {
        uint contractIndex = getContractIndexForUser(user, contractAddress);
        uint openContractAddressesLength = users[user].openAccountabilityContractAddresses.length;
        for (uint i = contractIndex; i<openContractAddressesLength-1; i++){
            users[user].openAccountabilityContractAddresses[i] = users[user].openAccountabilityContractAddresses[i+1];
        }
        users[user].closedAccountabilityContractAddresses.push(users[user].openAccountabilityContractAddresses[users[user].openAccountabilityContractAddresses.length-1]);
        users[user].openAccountabilityContractAddresses.pop();
    }

      function getContractIndexForReferee(address referee, address contractAddress) view private returns (uint){
        uint contractIndex;
        for (uint i = 0; i<=referees[referee].openAccountabilityContractAddresses.length-1; i++){
            if(referees[referee].openAccountabilityContractAddresses[i] == contractAddress){
                contractIndex = i;
            }
        }
        return contractIndex;
    }

     function moveOpenContractToClosedContractsForReferee(address referee, address contractAddress) private {
         uint contractIndex = getContractIndexForReferee(referee, contractAddress);
        for (uint i = contractIndex; i<referees[referee].openAccountabilityContractAddresses.length-1; i++){
            referees[referee].openAccountabilityContractAddresses[i] = referees[referee].openAccountabilityContractAddresses[i+1];
        }
        referees[referee].closedAccountabilityContractAddresses.push(referees[referee].openAccountabilityContractAddresses[referees[referee].openAccountabilityContractAddresses.length-1]);
        referees[referee].openAccountabilityContractAddresses.pop();
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
        require(status == Status.OPEN, "Contract status is not equal to open");
        _;
    }

    function failContract() public payable restricted returns (AccountabilityContract) {
        require(tx.origin == referee || tx.origin == creator, "Only referee or creator can fail contract");
        payable(failureRecipient).transfer(address(this).balance);
        status = Status.FAILURE;
        return this;
    } 

    function completeContract() public payable restricted returns (AccountabilityContract) {
        require(tx.origin == referee, "Only referee can complete a contract");
        payable(creator).transfer(address(this).balance);
        status = Status.SUCCESS;
        return this;
    }
}
