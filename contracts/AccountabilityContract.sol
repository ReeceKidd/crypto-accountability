// SPDX-License-Identifier: MIT

contract AccountabilityContractFactory {
    mapping(uint => AccountabilityContract) public accountabilityContracts;
    uint public numberOfAccountabilityContracts;

    function createAccountabilityContract(address _referee, string memory _name, string memory _description, address _failureRecipient) public payable {
        accountabilityContracts[numberOfAccountabilityContracts++] = (new AccountabilityContract).value(msg.value)(msg.sender, _referee, _name, _description, _failureRecipient, msg.value);
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

    constructor(address _creator, address _referee, string memory _name, string memory _description, address _failureRecipient, uint _amount) public payable {
        creator = _creator;
        referee = _referee;
        name = _name;
        description = _description;
        failureRecipient = _failureRecipient;
        amount = _amount;
        status = Status.OPEN;
    }

    function failContract() public payable {
        require(msg.sender == referee);
        failureRecipient.transfer(address(this).balance);
        status = Status.FAILURE;
    } 

    function completeContract() public payable {
        require(msg.sender == referee);
        creator.transfer(address(this).balance);
        status = Status.SUCCESS;
    }
}
