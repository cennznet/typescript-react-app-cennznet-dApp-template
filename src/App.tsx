import logo from './logo.svg';
import './App.css';
import {Api, ApiRx} from '@cennznet/api';
import React, { useState, useEffect } from 'react';

function App() {
    const [api, setApi] = useState<Api>();
    const [apiRx, setApiRx] = useState<ApiRx>();
    const [chainName, setChainName] = useState<string>("");
    const [blockNum, setBlockNum] = useState<string>("");
    const mainnetEndpoint = 'wss://cennznet.unfrastructure.io/public/ws';

    useEffect( () => {
        const createAPI = async () => {
            const api = await Api.create({provider: mainnetEndpoint});
            setApi(api)
        };
        const createAPIRx = async () => {
            const apiRx = await ApiRx.create({  provider: mainnetEndpoint});
            const apiRxProm = await apiRx.toPromise()
            setApiRx(apiRxProm)
        };
        createAPI();
        createAPIRx();
    },[]);

    useEffect( () => {
        if(apiRx){
            apiRx.rpc.chain.subscribeNewHeads().subscribe(header => {
                setBlockNum(header.number.toString())
            });
        }
    },[apiRx])

    useEffect( () => {
        const getChainName = async (api: Api) => {
            const systemChain = (await api.rpc.system.chain()).toString();
            setChainName(systemChain)
        };
        if(api) getChainName(api);
    },[api]);

    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>Create React App Cennznet dApp Template</p>
        <p>{chainName ? `Connected to: ${chainName}`: null}</p>
        <p>{blockNum ? `Current Block Number is: ${blockNum}`: null }</p>
      </header>
    </div>
  );
}

export default App;
