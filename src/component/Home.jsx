import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [brokerageData, setBrokerageData] = useState([]);

    const addAccount = () => {
        console.log("Add Account")
    }

    useEffect(() => {
        getData();
    }, [])

    const getData = async () => {
        setLoading(true);
        const apiUrl = `http://localhost:8000/brokerage`;
        const req = await fetch(apiUrl);
        const res = await req.json();
        setBrokerageData(res);
        setLoading(false);
    }
 
    return (
        <div>
            <button onClick={addAccount}>Add Account</button>
            <DataTable brokerageData={brokerageData}/>
        </div>
    )
}

export default Home;