// SPDX-License-Identifier: MIT

contract AccountabilityContractFactory {
  mapping(address => User) public users;
  uint public numberOfUsers;

    struct User {
    uint createdContracts;
    mapping(address => AccountabilityContract) openAccountabilityContracts;
    address[] openAccounabilityContractAddresses;
    uint numberOfOpenAccounabilityContractAddresses;
    mapping(uint => AccountabilityContract) closedAccountabilityContracts;
    address[] closedAccounabilityContractAddresses;
    uint numberOfClosedAccountabilityContractAddresses;
    }

    function createAccountabilityContract(address _referee, string memory _name, string memory _description, address _failureRecipient) public payable {
        if(users[msg.sender].createdContracts == 0){
            numberOfUsers++;
        }
        AccountabilityContract newContract = (new AccountabilityContract).value(msg.value)(msg.sender, _referee, _name, _description, _failureRecipient, msg.value);
        users[msg.sender].openAccountabilityContracts[address(newContract)] = newContract;
        users[msg.sender].createdContracts++;
        users[msg.sender].openAccounabilityContractAddresses.push(address(newContract));
    }

    function getNumberOfOpenAccountabilityContracts(address user) public view returns (uint){
        return users[user].openAccounabilityContractAddresses.length;
    }

    function getOpenAccountabilityContractAddresses(address user) public view returns (address[] memory){
        return users[user].openAccounabilityContractAddresses;
    }

    function getOpenAccountabilityContract(address user, address contractAddress) public view returns (AccountabilityContract){
        return users[user].openAccountabilityContracts[contractAddress];
    }

    function getNumberOfClosedAccountabilityContracts(address user) public view returns (uint){
        return users[user].closedAccounabilityContractAddresses.length;
    }

    function getClosedAccountabilityContractAddresses(address user) public view returns (address[] memory){
        return users[user].closedAccounabilityContractAddresses;
    }

    function getClosedAccountabilityContract(address user, uint index) public view returns (AccountabilityContract){
        return users[user].closedAccountabilityContracts[index];
    }

    function failOpenAccountabilityContract(address user, uint openAccountabilityContractAddressIndex) public {
      address openAccountabilityContract = users[user].openAccounabilityContractAddresses[openAccountabilityContractAddressIndex];
      users[user].closedAccountabilityContracts[users[user].numberOfClosedAccountabilityContractAddresses++] = users[user].openAccountabilityContracts[openAccountabilityContract].failContract();
      moveOpenContractToClosedContracts(user, openAccountabilityContractAddressIndex);
      delete users[user].openAccountabilityContracts[openAccountabilityContract];
    }

    function completeOpenAccountabilityContract(address user, uint openAccountabilityContractAddressIndex) public {
      address openAccountabilityContract = users[user].openAccounabilityContractAddresses[openAccountabilityContractAddressIndex];
      users[user].closedAccountabilityContracts[users[user].numberOfClosedAccountabilityContractAddresses++] = users[user].openAccountabilityContracts[openAccountabilityContract].completeContract();
      moveOpenContractToClosedContracts(user, openAccountabilityContractAddressIndex);
      delete users[user].openAccountabilityContracts[openAccountabilityContract];
    }

    function moveOpenContractToClosedContracts(address user, uint openContractIndex) private {
        uint openContractAddressesLength = users[user].openAccounabilityContractAddresses.length;
        require(openContractIndex < openContractAddressesLength, "Open contract index out of bounds");
        for (uint i = openContractIndex; i<openContractAddressesLength-1; i++){
            users[user].openAccounabilityContractAddresses[i] = users[user].openAccounabilityContractAddresses[i+1];
        }
        [users[user].closedAccounabilityContractAddresses[users[user].numberOfClosedAccountabilityContractAddresses++] = users[user].openAccounabilityContractAddresses[users[user].openAccounabilityContractAddresses.length-1]];
        delete users[user].openAccounabilityContractAddresses[users[user].openAccounabilityContractAddresses.length-1];
    }
}

contract AccountabilityContract {
    enum Status{ OPEN, SUCCESS, FAILURE }
    address public creator;
    address public referee;
    string public name;
    string public description;
    address  public failureRecipient;
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

    function failContract() public payable returns (AccountabilityContract) {
        require(tx.origin == referee);
        require(status == Status.OPEN);
        failureRecipient.transfer(address(this).balance);
        status = Status.FAILURE;
        return this;
    } 

    function completeContract() public payable returns (AccountabilityContract) {
        require(tx.origin == referee);
        require(status == Status.OPEN);
        creator.transfer(address(this).balance);
        status = Status.SUCCESS;
        return this;
    }
}
