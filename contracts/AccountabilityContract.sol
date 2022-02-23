// SPDX-License-Identifier: MIT

contract AccountabilityContractFactory {
    mapping(uint => AccountabilityContract) public accountabilityContracts;
    uint public numberOfAccountabilityContracts;

    function createAccountabilityContract(string memory _name, string memory _description, address _failureRecipient) public {
        accountabilityContracts[numberOfAccountabilityContracts++] = new AccountabilityContract(msg.sender, _name, _description, _failureRecipient);
    }
}

contract AccountabilityContract {
    address public creator;
    string public name;
    string public description;
    address public failureRecipient;

    
    constructor(address _creator, string memory _name, string memory _description, address _failureRecipient) {
        creator = _creator;
        name = _name;
        description = _description;
        failureRecipient = _failureRecipient;
    }

}
