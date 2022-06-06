import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import AddAccount from './AddAccount';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [brokerageData, setBrokerageData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [openAddAccModal, setOpenAddAccModal] = useState(false);

    useEffect(() => {
        getData();
        getGroupData();
        getRegionData();
    }, [])

    const getData = async () => {
        setLoading(true);
        const apiUrl = `http://localhost:8000/brokerage`;
        const req = await fetch(apiUrl);
        const res = await req.json();
        setBrokerageData(res);
        setLoading(false);
    }

    const getGroupData = async () => {
        const apiUrl = `http://localhost:8000/group`;
        const req = await fetch(apiUrl);
        const res = await req.json();
        setGroupData(res);
    }
 
    const getRegionData = async () => {
        const apiUrl = `http://localhost:8000/region`;
        const req = await fetch(apiUrl);
        const res = await req.json();
        setRegionData(res);
    }

    return (
        <div>
            <button onClick={() => setOpenAddAccModal(true)}>Add Account</button>
            {
                openAddAccModal && 
                    <AddAccount closeModal={() => setOpenAddAccModal(false)} 
                            regionData={regionData}
                            groupData={groupData}
                    />
            }
            <DataTable brokerageData={brokerageData}/>
            {
                regionData && 
                    regionData.map((item) => 
                        <div>
                            {
                                item.name
                            }
                        </div>
                    )
            }
            {
                groupData && 
                    groupData.map((item) => 
                        <div>
                            {
                                item.name
                            }
                        </div>
                    )
            }
        </div>
    )
}

export default Home;