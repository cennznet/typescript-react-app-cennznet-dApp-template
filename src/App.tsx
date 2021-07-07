import logo from './logo.svg';
import './App.css';
import {Api as ApiPromise} from '@cennznet/api';
import React, { useState, useEffect } from 'react';

function App() {
    const [api, setApi] = useState<ApiPromise>();
    useEffect(() => {
        const createAPI = async () => {
            const mainnetEndpoint = 'wss://cennznet.unfrastructure.io/public/ws';
            const api = await new ApiPromise({provider: mainnetEndpoint});
            setApi(api)
        };
        createAPI();
    },[]);
    
    return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
         Create React App Cennznet dApp Template
        </p>
      </header>
    </div>
  );
}

export default App;
