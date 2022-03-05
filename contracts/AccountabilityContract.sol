// SPDX-License-Identifier: MIT

contract AccountabilityContractFactory {
  mapping(address => User) public users;
  uint public numberOfUsers;

    struct User {
    mapping(uint => AccountabilityContract) openAccountabilityContracts;
    uint numberOfOpenAccountabilityContracts;
    mapping(uint => AccountabilityContract) closedAccountabilityContracts;
    uint numberOfClosedAccountabilityContracts;
    }

    function createAccountabilityContract(address _referee, string memory _name, string memory _description, address _failureRecipient) public payable {
        if(users[msg.sender].numberOfOpenAccountabilityContracts == 0){
            numberOfUsers++;
        }
        users[msg.sender].openAccountabilityContracts[users[msg.sender].numberOfOpenAccountabilityContracts++] = (new AccountabilityContract).value(msg.value)(msg.sender, _referee, _name, _description, _failureRecipient, msg.value);
    }

    function getNumberOfOpenAccountabilityContracts(address user) public view returns (uint){
        return users[user].numberOfOpenAccountabilityContracts;
    }

    function getOpenAccountabilityContract(address user, uint index) public view returns (AccountabilityContract){
        return users[user].openAccountabilityContracts[index];
    }

      function getNumberOfClosedAccountabilityContracts(address user) public view returns (uint){
        return users[user].numberOfClosedAccountabilityContracts;
    }

    function getClosedAccountabilityContract(address user, uint index) public view returns (AccountabilityContract){
        return users[user].closedAccountabilityContracts[index];
    }

    function failOpenAccountabilityContract(address user, uint index) public {
      users[user].numberOfOpenAccountabilityContracts--;
      users[user].closedAccountabilityContracts[users[user].numberOfClosedAccountabilityContracts++] = users[user].openAccountabilityContracts[index].failContract();
      delete users[user].openAccountabilityContracts[index];
    }

    function completeOpenAccountabilityContract(address user, uint index) public {
      users[user].numberOfOpenAccountabilityContracts--;
      users[user].closedAccountabilityContracts[users[user].numberOfClosedAccountabilityContracts++] = users[user].openAccountabilityContracts[index].completeContract(user);
      delete users[user].openAccountabilityContracts[index];
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

    // Fix this so only the accountability contract factory can call it

    function failContract() public payable returns (AccountabilityContract) {
        require(msg.sender == referee);
        failureRecipient.transfer(address(this).balance);
        status = Status.FAILURE;
        return this;
    } 

    function completeContract(address sender) public payable returns (AccountabilityContract) {
        require(sender == referee);
        creator.transfer(address(this).balance);
        status = Status.SUCCESS;
        return this;
    }
}
