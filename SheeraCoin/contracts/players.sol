pragma solidity 0.4.*;

contract Players{
    struct player{
        uint id;
        string name;
        address owner;
    }
    mapping(uint=>player) public players;
    
    function addPlayer(uint _id,string _name) public{
        players[_id] = player(_id,_name,msg.sender);
    }
    
    function searchPlayer(uint _id) public returns (string,address){
        return (players[_id].name,players[_id].owner);
    }
    modifier verifyOwner(address _owner){
        require(msg.sender == _owner);
        _;
    }
    
    function transferPlayer(uint _id,address _receiver) verifyOwner(players[_id].owner) public{
        players[_id].owner = _receiver;
    }
}