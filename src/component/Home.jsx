import React, { useEffect, useState } from 'react';
import DataTable from './DataTable';
import AddAccount from './AddAccount';

const Home = () => {
    const [loading, setLoading] = useState(false);
    const [brokerageData, setBrokerageData] = useState([]);
    const [groupData, setGroupData] = useState([]);
    const [regionData, setRegionData] = useState([]);
    const [openAddAccModal, setOpenAddAccModal] = useState(false);
    const [isEdit, setIsEdit] = useState(false);
    const [editId, setEditId] = useState(0);

    useEffect(() => {
        getData();
        getGroupData();
        getRegionData();
    }, [])

    useEffect(() => {
        getData();
    }, brokerageData)

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

    const handleAddAccBtn = () => {
        setOpenAddAccModal(true);
        setIsEdit(false);
    }

    return (
        <div>
            <button onClick={handleAddAccBtn}>Add Account</button>
            {
                openAddAccModal && 
                    <AddAccount closeModal={() => setOpenAddAccModal(false)} 
                            brokerageData={brokerageData}
                            setBrokerageData={setBrokerageData}
                            regionData={regionData}
                            groupData={groupData}
                            isEdit={isEdit}
                            editId={editId}
                    />
            }
            <DataTable brokerageData={brokerageData}
                    setBrokerageData={setBrokerageData}
                    setOpenAddAccModal={setOpenAddAccModal}
                    setIsEdit={setIsEdit}
                    setEditId={setEditId}
            />
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