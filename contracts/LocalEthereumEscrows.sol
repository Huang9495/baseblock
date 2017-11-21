pragma solidity ^0.4.18;
contract LocalEthereumEscrows {
    // The address of the arbitrator
    // In the first version, this is always localethereum staff.
    address public arbitrator;
    address public owner;
    address public relayer;

    uint32 public requestCancellationMinimumTime;
    uint256 public feesAvailableForWithdraw;

    uint8 constant ACTION_SELLER_CANNOT_CANCEL = 0x01; // Called when marking as paid or calling a dispute as the buyer
    uint8 constant ACTION_BUYER_CANCEL = 0x02;
    uint8 constant ACTION_SELLER_CANCEL = 0x03;
    uint8 constant ACTION_SELLER_REQUEST_CANCEL = 0x04;
    uint8 constant ACTION_RELEASE = 0x05;
    uint8 constant ACTION_DISPUTE = 0x06;

    event Created(bytes32 _tradeHash);
    event SellerCancelDisabled(bytes32 _tradeHash);
    event SellerRequestedCancel(bytes32 _tradeHash);
    event CancelledBySeller(bytes32 _tradeHash);
    event CancelledByBuyer(bytes32 _tradeHash);
    event Released(bytes32 _tradeHash);
    event DisputeResolved(bytes32 _tradeHash);

    modifier onlyOwner() {
        require(msg.sender == owner);
        _;
    }

    modifier onlyArbitrator() {
        require(msg.sender == arbitrator);
        _;
    }

    function LocalEthereumEscrows() public {
        /**
         * Initialize the contract.
         */
        owner = msg.sender;
        arbitrator = msg.sender;
        relayer = msg.sender;
        requestCancellationMinimumTime = 2 hours; // TODO
    }

    function setArbitrator(address _newArbitrator) onlyOwner external {
        /**
         * Set the arbitrator to a new address. Only the owner can call this.
         * @param address _newArbitrator
         */
        arbitrator = _newArbitrator;
    }

    function setOwner(address _newOwner) onlyOwner external {
        /**
         * Change the owner to a new address. Only the owner can call this.
         * @param address _newOwner
         */
        owner = _newOwner;
    }

    function setRelayer(address _newRelayer) onlyOwner external {
        /**
         * Change the relayer to a new address. Only the owner can call this.
         * @param address _newRelayer
         */
        relayer = _newRelayer;
    }

    function setRequestCancellationMinimumTime(uint32 _newRequestCancellationMinimumTime) onlyOwner external {
        /**
         * Change the requestCancellationMinimumTime. Only the owner can call this.
         * @param uint32 _newRequestCancellationMinimumTime
         */
        requestCancellationMinimumTime = _newRequestCancellationMinimumTime;
    }

}                        