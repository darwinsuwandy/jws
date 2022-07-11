import React, { useState, useEffect } from 'react';
import './AddAccount.css';
import TextField from '@mui/material/TextField';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
    field: {
        height: 2,
        fontSize: "10px"
    }
})

const AddAccount = ({closeModal, brokerageData, setBrokerageData, regionData, groupData, isEdit, editId}) => {
    const [loading, setLoading] = useState(false);
    const [editData, setEditData] = useState([]);
    let lastArr = brokerageData[brokerageData.length - 1]

    const classes = useStyles();
    const [obj1, setObj1] = useState({
            "id": lastArr.id + 1,
            "name": "",
            "type": "Active",
            "region": regionData[0].name,
            "group": groupData[0].name
        });

    const handleInputChange = (e) => {
        setObj1(prevState => ({
            ...prevState, [e.target.name]: e.target.value
        }));
    }

    const testing = () => {
        console.log(editData);
        console.log(obj1);
        
    }

    useEffect(() => {
        console.log(isEdit);
        console.log(editId);
        const filteredData = brokerageData.filter((item) => item.id === editId)
        if (isEdit) {
            setEditData(filteredData);
            setObj1(prevState => ({
                ...prevState, "name": filteredData.map((item, i) => item.name)
                            , "type": filteredData.map((item, i) => item.type)
                            , "region": filteredData.map((item, i) => item.region)
                            , "group": filteredData.map((item, i) => item.group)
            }));
            // setObj1(prevState => ({...prevState, ...filteredData}));
        }
    },[])

    const submitData = async (e) => {
        //e.preventDefault();
        if (obj1.name === "") {
            alert("Please fill in all required information");
        } else {
            setLoading(true);
            const requestOptions = {
                method: "POST",
                headers: {
                "Content-Type": "application/json",
                },
                body: JSON.stringify(obj1),
            };
    
            const apiUrl = `http://localhost:8000/brokerage`;
            const req = await fetch(apiUrl, requestOptions);
            const res = await req.json();
    
            setBrokerageData([...brokerageData, res]);
            setLoading(false);
            closeModal();
        }
    }
  
    return (
    <div className="modal-background">
        <div className="modal-container">
            <div>
                <div onClick={closeModal}>X</div>
            </div>
            <div>Form</div>
            <form autoComplete="off">
                <div>
                    <label>Brokerage Group</label>
                    {/* <select name="group" onChange={(e) => handleInputChange(e)} value={obj1.group}>
                    {
                        groupData && 
                            groupData.map((item, idx) => {
                                return (
                                    <option key={idx} value={item.name}>{item.name}</option>

                                )}
                            )
                    }
                    </select> */}
                    <TextField
                        variant="outlined"
                        select
                        name="group"
                        value={obj1.group}
                        onChange={(e) => handleInputChange(e)}
                        size="small"
                        >
                        {groupData && 
                            groupData.map((group, idx) => {
                                return (
                                    <MenuItem key={idx} value={group.name}>{group.name}</MenuItem>

                                )}
                            )}
                    </TextField>
                </div>
                <div>
                    <label>Brokerage Name</label>
                    {/* <input type="text" name="name" onChange={(e) => handleInputChange(e)} value={obj1.name}/> */}
                    <div className="TextField-without-border-radius">
                        <TextField 
                            variant="outlined"
                            // InputProps={{ classes: { input: classes.field } }}
                            placeholder="Enter brokerage name"
                            name="name" 
                            onChange={(e) => handleInputChange(e)} 
                            value={obj1.name}
                            size="small"
                            sx={{ borderRadius: 0 }}
                        />
                    </div>
                </div>
                <div>
                    <label>Region</label>
                    {/* <select name="region" onChange={(e) => handleInputChange(e)} value={obj1.region}>
                    {
                        regionData && 
                            regionData.map((item, idx) => 
                                <option key={idx} value={item.name}>{item.name}</option>
                            )
                    }
                    </select> */}
                    <TextField
                        id="outlined-select-region"
                        select
                        name="region"
                        value={obj1.region}
                        onChange={(e) => handleInputChange(e)}
                        size="small"
                        >
                        {regionData && 
                            regionData.map((region, idx) => {
                                return (
                                    <MenuItem key={idx} value={region.name}>{region.name}</MenuItem>

                                )}
                            )}
                    </TextField>
                </div>
                <div>
                    <label>Type</label>
                    <button type="button" className="type-btn" name="type" value="Active" onClick={(e) => handleInputChange(e)}>Active</button>
                    <button type="button" className="type-btn" name="type" value="New" onClick={(e) => handleInputChange(e)}>New</button>
                    <button type="button" className="type-btn" name="type" value="Dormant" onClick={(e) => handleInputChange(e)}>Dormant</button>
                </div>
                <button type="button" onClick={submitData}>Submit</button>
            </form>
            <button onClick={testing}>Console Log</button>
            { editData && editData.map((item, idx) => <div>{item.name}</div>) }
        </div>
    </div>
  )
}

export default AddAccount;