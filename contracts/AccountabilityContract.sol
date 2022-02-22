// SPDX-License-Identifier: MIT

contract AccountabilityContractFactory {
    mapping(uint => AccountabilityContract) public accountabilityContracts;
    uint public numberOfAccountabilityContracts;

    function createAccountabilityContract(string memory _name) public {
        accountabilityContracts[numberOfAccountabilityContracts++] = new AccountabilityContract(_name);
    }
}

contract AccountabilityContract {
    string public name;
    
    constructor(string memory _name) {
        name = _name;
    }

}
