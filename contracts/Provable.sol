// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;
import "provable-eth-api/contracts/solc-v0.8.x/provableAPI.sol";

contract Oracle is usingProvable {
    enum Process {
        Initial,
        Pending,
        Compleated
    }
    string public ETHUSD;
    Process process = Process.Initial;
    event LogConstructorInitiated(string nextStep);
    event LogPriceUpdated(string price);
    event LogNewProvableQuery(string description);

    constructor() payable {
        emit LogConstructorInitiated(
            "Constructor was initiated. Call 'updatePrice()' to send the Provable Query."
        );
    }

    function __callback(bytes32 myid, string memory result) public {
        if (msg.sender != provable_cbAddress()) revert();
        ETHUSD = result;
        emit LogPriceUpdated(result);
        process = Process.Compleated;
    }

    function updatePrice() public payable {
        process = Process.Pending;
        if (provable_getPrice("URL") > address(this).balance) {
            emit LogNewProvableQuery(
                "Provable query was NOT sent, please add some ETH to cover for the query fee"
            );
        } else {
            emit LogNewProvableQuery(
                "Provable query was sent, standing by for the answer.."
            );
            provable_query(
                "URL",
                "json(https://api.pro.coinbase.com/products/ETH-BTC/ticker).price"
            );
        }
    }

    function getState() external view returns (Process) {
        return process;
    }
}
