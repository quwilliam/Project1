import { ethers } from "/node_modules/ethers/dist/ethers.min.js";
import * as SmartContractABI from "./SmartContractABICode.js";

let ratio = "1170x540";

const SMART_CONTRACT_ADDRESS = "0xAb1F46f45c178488533724A6625517c9138E033e";
const PROVIDER = new ethers.JsonRpcProvider('http://localhost:7545');
// const PROVIDER = new ethers.BrowserProvider(window.ethereum);

// let  provider = ethers.getDefaultProvider()

var dumy_adress = "0xdb8BFcB4066Ea5993b327360711db87aE8Db1a10";
var SIGNER = dumy_adress;
SIGNER = await PROVIDER.getSigner();


 async function InitContract()
    { 
        const SMART_CONTRACT_INTERFACE = new ethers.Contract(SMART_CONTRACT_ADDRESS,SmartContractABI.SMART_CONTRACT_ABI_CODE,PROVIDER);
        //const SMART_CONTRACT_INTERFACE = new ethers.Contract(SMART_CONTRACT_ADDRESS,SmartContractABI.SMART_CONTRACT_ABI_CODE,SIGNER);
        return SMART_CONTRACT_INTERFACE;
    }

// const SIGNERS =  new PROVIDER.getSigners();
const SMART_CONTRACT_INTERFACE = await InitContract();


 console.log(" SMART CONTRACT",SmartContractABI.SMART_CONTRACT_ABI_CODE);
 console.log( "CONTRACT METHODS", SMART_CONTRACT_INTERFACE);

 ////------------------------------------------------------------------------------------------------------------------///////
 ////------------------------------------------------------------------------------------------------------------------///////
////------------------------------------------------------------------------------------------------------------------///////

async function SmartContractBalanceRequest( _Wallet_Address)
    {
        let  balance = await PROVIDER.getBalance(_Wallet_Address);

      //  console.log(" SMART CONTRACT RETURNED BALANCE ",balance);
        return ethers.formatEther(balance);   
    }
window.SmartContractBalanceRequest = SmartContractBalanceRequest;


async function SmartContractGetCurrentBlockNumber()
{
  return await PROVIDER.getBlockNumber();
}
window.SmartContractGetCurrentBlockNumber = SmartContractGetCurrentBlockNumber;


async function SmartContractGetCurrentTimestamp()
{
  let current_block_number = await PROVIDER.getBlockNumber();
  let current_timestamp = await ((await PROVIDER.getBlock(current_block_number)).timestamp);

  return current_timestamp;
}
window.SmartContractGetCurrentTimestamp = SmartContractGetCurrentTimestamp;


async function SmartContractRequestWallets()
{

 
  let AccountsAddresses = await PROVIDER.listAccounts();
  let List_Addresses = [];
  for(let i=0;i< AccountsAddresses.length;i++)
  {
    List_Addresses[i] = AccountsAddresses[i].address;
  }

  return List_Addresses;
}
window.SmartContractRequestWallets = SmartContractRequestWallets;


async function SmartContractBalanceOfID( _Wallet_Address , _Character_ID)
{
 // console.log("SMART CONTRACT IS OWNER OF NFT ID ",_Wallet_Address,_Character_ID);
  let BalanceOf_ID = await SMART_CONTRACT_INTERFACE.connect(SIGNER).balanceOf(_Wallet_Address,_Character_ID);
//  console.log("SMART CONTRACT IS OWNER OF NFT ID ",_Wallet_Address,_Character_ID,BalanceOf_ID);
  return BalanceOf_ID;
}
window.SmartContractBalanceOfID = SmartContractBalanceOfID;




async function SmartContractMintCharacter()
{
  let Character_Status_Returned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).MintCharacter();
 
  console.log("SMART CONTRACT CHARACTER MINT RETURNED ",Character_Status_Returned);
  const receipt = await Character_Status_Returned.wait(10);
  console.log(" TRANSACT CONFIRMED ",receipt.transactionHash);
  return Character_Status_Returned;
}
window.SmartContractMintCharacter = SmartContractMintCharacter;



async function SmartContractGetCharacterStatus( Character_ID)
{
  let Character_Status_Returned = await SMART_CONTRACT_INTERFACE.CharacterStatus(Character_ID);
 // console.log("SMART CONTRACT CHARACTER STATUS RETURNED ",Character_Status_Returned);
  return Character_Status_Returned;
}
window.SmartContractGetCharacterStatus = SmartContractGetCharacterStatus;




async function SmartContractSendTrainCharacter(Character_ID)
{
  let Character_Status_Returned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).StartTrainCharacter(Character_ID);
  console.log("SMART CONTRACT CHARACTER START TRAIN RETURNED ",Character_Status_Returned);
  return Character_Status_Returned;
}
window.SmartContractSendTrainCharacter = SmartContractSendTrainCharacter;


async function SmartContractCallbackTrainCharacter(Character_ID)
{
  let Character_Status_Returned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).EndTrainCharacter(Character_ID);
  console.log("SMART CONTRACT CHARACTER END TRAIN RETURNED ",Character_Status_Returned);
  return Character_Status_Returned;
}
window.SmartContractCallbackTrainCharacter = SmartContractCallbackTrainCharacter;



async function SmartContractGetQuestAvailable(QuestLevel)
{
  let Quest_Status_Returned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).GetQuestAvailable(QuestLevel);
 // console.log("SMART CONTRACT QUEST RETURNED ",Quest_Status_Returned);
  return Quest_Status_Returned;
}
window.SmartContractGetQuestAvailable = SmartContractGetQuestAvailable;


async function SmartContractLevelup(_Character_ID,_Stat_To_Up)
{
  console.log("SMART CONTRACT LEVEL UP TO SEND",_Character_ID,_Stat_To_Up);
  let LevelUp_Status_Returned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).Levelup(_Character_ID,_Stat_To_Up);
  console.log("SMART CONTRACT QUEST RETURNED ",LevelUp_Status_Returned);
  return LevelUp_Status_Returned;
}
window.SmartContractLevelup = SmartContractLevelup;

////------------------------------------------------------------------------------------------------------------------///////
////------------------------------------------------------------------------------------------------------------------///////
////------------------------------------------------------------------------------------------------------------------///////


async function SmartContractGetCityTileValue( CityMap_Adress )
    {
    let CityMap_Adress_Value = await SMART_CONTRACT_INTERFACE.connect(SIGNER).GetCityTileValue( CityMap_Adress );
  //  console.log("SMART CONTRACT CITYTILE RETURNED ",CityMap_Adress_Value);
    return CityMap_Adress_Value;
    }
    window.SmartContractGetCityTileValue = SmartContractGetCityTileValue;



async function SmartContractGetOpponentsSpawn( CityMap_Adress )
{
  //  console.log(" GET OPPONENTS ADDDRESS "+CityMap_Adress);
  let Opponent_Value = await SMART_CONTRACT_INTERFACE.connect(SIGNER).GetOpponentsSpawn(  CityMap_Adress);
 //  console.log("SMART CONTRACT OPPONBENT VALUE RETURNED ",Opponent_Value);
return Opponent_Value;
}
window.SmartContractGetOpponentsSpawn = SmartContractGetOpponentsSpawn;


async function SmartContractGetDynamicEvent( CityMap_Adress )
{
  //  console.log(" GET OPPONENTS ADDDRESS "+CityMap_Adress);
  let Dynamic_Event_Value = await SMART_CONTRACT_INTERFACE.connect(SIGNER).GetDynamicEvent( CityMap_Adress);
 //  console.log("SMART CONTRACT DYNAMIC EVENT VALUE RETURNED ",Dynamic_Event_Value);
return Dynamic_Event_Value;
}
window.SmartContractGetDynamicEvent = SmartContractGetDynamicEvent;










async function SmartContractMoveTo( Location_Address, Character_ID)
{
    console.log(" SMART CONTRACT MOVE TO"+Location_Address+" ID "+Character_ID);
  
  let Character_MoveTo_Returned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).MoveTo(Location_Address, Character_ID);
   console.log("SMART CONTRACT CHARACTER MOVE TO RETURNED ",Character_MoveTo_Returned);
return Character_MoveTo_Returned;
}
window.SmartContractMoveTo = SmartContractMoveTo;


async function SmartContractSendCharacterList(  _Characters_List)
{
    console.log(" SMART CONTRACT CHARACTER LIST TO SEND "+_Characters_List);

  let Character_MoveTo_Returned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).SetBoardInit(_Characters_List);
 //  console.log("SMART CONTRACT CHARACTER MOVE TO RETURNED ",Character_MoveTo_Returned);
 // return Character_MoveTo_Returned;
}
window.SmartContractSendCharacterList = SmartContractSendCharacterList;




////------------------------------------------------------------------------------------------------------------------///////
////------------------------------------------------------------------------------------------------------------------///////
////------------------------------------------------------------------------------------------------------------------///////


async function SmartContractGetWalletRessources( )
    {
    let WalletRessources = await SMART_CONTRACT_INTERFACE.connect(SIGNER).WalletRessources(AccountsAddresses[0].address);
    return WalletRessources;
    }

window.SmartContractGetWalletRessources = SmartContractGetWalletRessources;


async function SmartContractSetWalletRessources( golds, reputation, ressources, army )
    {
    console.log("ENTER SMART CONTRACT SET WALLET RESSOURCES ",golds);
    SMART_CONTRACT_INTERFACE.connect(SIGNER).SetRessourcesWallet(golds,reputation,ressources,army);
    }

window.SmartContractSetWalletRessources = SmartContractSetWalletRessources;



async function SmartContractGetAddressFromName( _WordlMap_Name)
{
    let AddressFromNameReturned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).GetAddressFromName(_WordlMap_Name);
    console.log("SMART CONTRAT RETURN : ", AddressFromNameReturned);
    return AddressFromNameReturned;
    
}
window.SmartContractGetAddressFromName = SmartContractGetAddressFromName;




async function SmartContractGetWorldMapAddressTileValue( _WordlMapAddress)
{
    let WorldMapAddressTileValueReturned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).GetTileWordlMapAddress(_WordlMapAddress);
    return WorldMapAddressTileValueReturned;
}
window.SmartContractGetWorldMapAddressTileValue = SmartContractGetWorldMapAddressTileValue;


 async function SmartContractMintClass()
    {
        let mintClassReturned = await SMART_CONTRACT_INTERFACE.connect(SIGNER).mintClass();
        return " mint done!";
    }
window.SmartContractMintClass = SmartContractMintClass;






 async function gettimeblock2(){
    let  timeblock = await SMART_CONTRACT_INTERFACE.connect(SIGNER).gettimeblock();
    return timeblock;
  }
window.gettimeblock2 = gettimeblock2;







 const init = async() =>{
      
    web3.eth.getAccounts().then(function(allAccounts){
          for(let i=0;i<allAccounts.length;i++){
              
              account.innerHTML += allAccounts[i]+'<br />';
          }
        //  window.alert("testing",Testing.testStorage);
         
        return "done!";
    })
  }

  async function SmartContractGetAllAccounts(){
    let allAccounts = await web3.eth.getAccounts();
    return allAccounts;
  }

  async function SmartContractGetTimeblock(){
    
   // let timeblock = await Promise.resolve(SMART_CONTRACT_INTERFACE.gettimeblock().call());
    return timeblock;
  }
