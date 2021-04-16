//SPDX-License-Identifier: MIT 
pragma solidity ^0.7.0;

contract math {
    
    function add(uint x, uint y) external pure returns(uint){
        return x + y;
    }
    
    function substract( uint x , uint y ) internal pure returns (uint) {
        return x - y;
    }
}

contract SimpleStorage is math {
    
    // Variables
    
    uint256 public num;
    string  public message;
    bytes12 public messageHex;
    address public owner;
    
    //Events
    
    event SetNum(uint numSet);
    event SetMessage(string messageSet);
    event SetMessageHex(bytes12 messageHexSet);
    
    //Modifiers
    
     modifier onlyOwner () {
        require(msg.sender == owner, "You are not the owner!");
        _;
    }
    
    //Constructor
    
    constructor (uint256 _num){
        owner = msg.sender;
        num = _num;
    }
    
    //Methods
    
    function setNum (uint _num) public onlyOwner  {
        num = _num;
        emit SetNum(_num);
    }
    
    function setMessage(string memory _message) public{
        message = _message;
        emit SetMessage(_message);
    }
    
    function setMessageHex(bytes12  _message) public{
        messageHex = _message;
        emit SetMessageHex(_message);
    }
    
    function substractNum (uint x) public view returns (uint ){
        return substract(num, x );
    }
    
}