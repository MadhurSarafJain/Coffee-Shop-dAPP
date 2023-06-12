import abi from "./contract/Coffee.json";
import {useState,useEffect} from "react";
import {ethers} from "ethers";
import Buy from "./components/Buy";
import Memos from "./components/Memos";
import coffee from "./coffee.png";
import './App.css';

function App() {
  const [state,setState]=useState({
    provider: null,
    signer: null,
    contract: null,
  });
  const [account, setAccount] = useState("None");
  useEffect(()=>{
    const connectWallet=async()=>{
      const contractAddress = "0xd7646b0195fba64e254277feda376c410963ef88";
      const contractABI = abi.abi;
      try{
        const {ethereum}=window;

        if(ethereum){
          const account= await ethereum.request({method:"eth_requestAccounts",});

          window.ethereum.on("chainChanged", () => {
            window.location.reload();
          });

          window.ethereum.on("accountsChanged", () => {
            window.location.reload();
          });

        
        const provider = new ethers.providers.Web3Provider(ethereum);
        const signer = provider.getSigner();
        const contract =new ethers.Contract(contractAddress,contractABI,signer);
        setAccount(account);
        setState({provider,signer,contract});
        }else{
          alert("Please Install Metamask to Pay");
        }
      }catch(error){
        console.log(error);
      }
    };
    connectWallet();
  },[]);
  //console.log(state);
  // return <div className="App">
  //   <Buy state={state}></Buy>
  //   <Memos state={state}></Memos>
  // </div>;
  return (
    <div style={{ backgroundColor: "#EFEFEF", height: "100%" }}>
      <img src={coffee} className="img-fluid" alt=".." width="100%" />
      <p
        class="text-muted lead "
        style={{ marginTop: "10px", marginLeft: "5px" }}
      >
        <small>Connected Account - {account}</small>
      </p>
      <div className="container">
        <Buy state={state} />
        <Memos state={state} />
      </div>
    </div>
  );
  
}

export default App;
