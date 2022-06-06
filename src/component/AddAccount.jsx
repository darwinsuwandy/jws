import React from 'react';
import './AddAccount.css';

const AddAccount = ({closeModal, regionData, groupData}) => {
  return (
    <div className="modal-background">
        <div className="modal-container">
            <div>
                <div onClick={closeModal}>X</div>
            </div>
            <div>Form</div>
            <form>
                <div>
                    <label>Brokerage Group</label>
                    <select>
                    {
                        groupData && 
                            groupData.map((item) => 
                                <option>
                                    {
                                        item.name
                                    }
                                </option>
                            )
                    }
                    </select>
                </div>
                <div>
                    <label>Brokerage Name</label>
                    <input type="text"></input>
                </div>
                <div>
                    <label>Region</label>
                    <select>
                    {
                        regionData && 
                            regionData.map((item) => 
                                <option>
                                    {
                                        item.name
                                    }
                                </option>
                            )
                    }
                    </select>
                </div>
                <div>
                    <label>Type</label>
                    <button>Active</button>
                    <button>New</button>
                    <button>Dormant</button>
                </div>
            </form>
            
        </div>
    </div>
  )
}

export default AddAccount;