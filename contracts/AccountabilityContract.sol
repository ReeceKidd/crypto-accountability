// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

contract AccountabilityContractFactory {
  mapping(address => User) public users;
  address[] public userAddresses;
  uint public numberOfUsers;
  address[] public accountabilityContractAddresses;
  uint public numberOfAccountabilityContracts;
  uint public totalEthInContracts;
  mapping(address => Referee) public referees;
  uint public numberOfReferees;
  address[] public refereeAddresses;

    struct User {
    uint createdContracts;
    address[] openAccountabilityContractAddresses;
    address[] closedAccountabilityContractAddresses;
    }

    struct Referee {
    uint managedContracts;
    address[] openAccountabilityContractAddresses;
    address[] closedAccountabilityContractAddresses;
    address[] approvalRequestsAddresses;
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
        numberOfAccountabilityContracts++;
        accountabilityContractAddresses.push(address(newContract));
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

    function getApprovalRequests(address referee) public view returns (address[] memory){
        return referees[referee].approvalRequestsAddresses;
    }

    function failOpenAccountabilityContract(address contractAddress) public {
      AccountabilityContract accountabilityContract = AccountabilityContract(contractAddress);
      accountabilityContract.failContract();
      moveOpenContractToClosedContractsForUser(accountabilityContract.creator(),contractAddress);
      moveOpenContractToClosedContractsForReferee(accountabilityContract.referee(), contractAddress);
    }

    function completeOpenAccountabilityContract(address contractAddress) public {
      AccountabilityContract accountabilityContract = AccountabilityContract(contractAddress);
      accountabilityContract.completeContract();
      moveOpenContractToClosedContractsForUser(accountabilityContract.creator(), contractAddress);
      moveOpenContractToClosedContractsForReferee(accountabilityContract.referee(), contractAddress);
    }

    function requestApproval(address contractAddress) public {
        AccountabilityContract accountabilityContract = AccountabilityContract(contractAddress);
        require(accountabilityContract.status() == AccountabilityContract.Status.OPEN, "Contract status must be open");
        require(tx.origin == accountabilityContract.creator(), "Only creator of contract can request completion");
        require(accountabilityContract.creator() != accountabilityContract.referee(), "Cannot request approval when creator is referee");
        AccountabilityContractApprovalRequest newApprovalRequest = new AccountabilityContractApprovalRequest(contractAddress);
        referees[accountabilityContract.referee()].approvalRequestsAddresses.push(address(newApprovalRequest));
        accountabilityContract.setStatusToAwaitingApproval();
    }

    function approveRequest(address approvalRequestAddress) public {
        AccountabilityContractApprovalRequest approvalRequest = AccountabilityContractApprovalRequest(approvalRequestAddress);
        AccountabilityContract accountabilityContract = AccountabilityContract(approvalRequest.accountabilityContractAddress());
        approvalRequest.approveRequest();
        completeOpenAccountabilityContract(address(accountabilityContract));
        deleteApprovalRequestForReferee(accountabilityContract.referee(), approvalRequestAddress);
    }

    function rejectRequest(address approvalRequestAddress) public {
        AccountabilityContractApprovalRequest approvalRequest = AccountabilityContractApprovalRequest(approvalRequestAddress);
        AccountabilityContract accountabilityContract = AccountabilityContract(approvalRequest.accountabilityContractAddress());
        approvalRequest.rejectRequest();
        deleteApprovalRequestForReferee(accountabilityContract.referee(), approvalRequestAddress);
        accountabilityContract.setStatusToOpen();
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

    function deleteApprovalRequestForReferee(address referee, address approvalRequestAddress) private {
        uint contractIndex;
        for (uint i = 0; i<=referees[referee].approvalRequestsAddresses.length-1; i++){
            if(referees[referee].approvalRequestsAddresses[i] == approvalRequestAddress){
                contractIndex = i;
                break;
            }
        }
        for (uint i = contractIndex; i<referees[referee].approvalRequestsAddresses.length-1; i++){
            referees[referee].approvalRequestsAddresses[i] = referees[referee].approvalRequestsAddresses[i+1];
        }
        referees[referee].approvalRequestsAddresses.pop();

    }

    function getUserAddresses(uint startIndex, uint endIndex) public view returns (address[] memory) {
       require(startIndex >= 0, "Start index cannot be negative");
       require(endIndex <= userAddresses.length, "End index exceeds user addresses length");
       address[] memory slicedUserAddresses = new address[](endIndex-startIndex);
       for(uint i=startIndex; i<endIndex; i++){
            slicedUserAddresses[i] = userAddresses[i];
        }
        return slicedUserAddresses;
    }

    function getAccountabilityContractAddresses(uint startIndex, uint endIndex) public view returns (address[] memory) {
       require(startIndex >= 0, "Start index cannot be negative");
       require(endIndex <= accountabilityContractAddresses.length, "End index exceeds user addresses length");
       address[] memory slicedAccountabilityContractAddresses = new address[](endIndex-startIndex);
       for(uint i=startIndex; i<endIndex; i++){
            slicedAccountabilityContractAddresses[i] = accountabilityContractAddresses[i];
        }
        return slicedAccountabilityContractAddresses;
    }
}

contract AccountabilityContractApprovalRequest {
    address public creator;
    address public referee;
    address public accountabilityContractAddress;
    enum Status{ OPEN, APPROVED, DENIED }
    Status public status;
    
    constructor(address _accountabilityContractAddress) {
        AccountabilityContract accountabilityContract = AccountabilityContract(_accountabilityContractAddress);
        creator = accountabilityContract.creator();
        referee = accountabilityContract.referee();
        accountabilityContractAddress = _accountabilityContractAddress;
        status = Status.OPEN;
    }

    function approveRequest() public  returns (AccountabilityContractApprovalRequest) {
        require(tx.origin == referee, "Only referee can approve approval request");
        status = Status.APPROVED;
        return this;
    } 

    function rejectRequest() public returns (AccountabilityContractApprovalRequest) {
        require(tx.origin == referee, "Only referee can reject approval request");
        status = Status.DENIED;
        return this;
    } 
}

contract AccountabilityContract {
    enum Status{ OPEN, AWAITING_APPROVAL, SUCCESS, FAILURE }
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

    function setStatusToOpen()  public {
        require(status == Status.AWAITING_APPROVAL, "Contract status must be awaiting approval");
        require(tx.origin == referee, "Only referee can set status to open");
        status = Status.OPEN;
    } 

    function setStatusToAwaitingApproval()  public {
        require(status == Status.OPEN, "Contract status must be open");
        require(tx.origin == creator, "Only creator can change approval status");
        status = Status.AWAITING_APPROVAL;
    } 

    function failContract() public payable {
        require(status == Status.OPEN || status == Status.AWAITING_APPROVAL, "Contract status must be open or awaiting approval");
        require(tx.origin == referee || tx.origin == creator, "Only referee or creator can fail contract");
        payable(failureRecipient).transfer(address(this).balance);
        status = Status.FAILURE;
    } 

    function completeContract() public payable {
        require(status == Status.OPEN || status == Status.AWAITING_APPROVAL, "Contract status must be open or awaiting approval");
        require(tx.origin == referee, "Only referee can complete a contract");
        payable(creator).transfer(address(this).balance);
        status = Status.SUCCESS;
    }
}
