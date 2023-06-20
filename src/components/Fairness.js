import React, { useState } from 'react';

const FairnessButton = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [activeTab, setActiveTab] = useState('deposit');

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <button className='fairness' onClick={openModal}>Fairness</button>

      {modalOpen && (
        <div className="modal1">
      <div className="modal-content1">
        <span className="close1" onClick={closeModal}>
          &times;
        </span>
        <ul className="seed" id="myTab" role="tablist">
          <li className="seed-item" role="presentation">
            <button
              className='seed'
              onClick={() => handleTabClick('deposit')}
              type="button"
              role="tab"
              aria-controls="deposit"
              
            >
              Seed
            </button>
          </li>
          <li className="verify" role="presentation">
            <button
              className='verify'
              onClick={() => handleTabClick('withdraw')}
              type="button"
              role="tab"
              aria-controls="withdraw"
              
            >
              Verify
            </button>
          </li>
        </ul>
        <div className="seed-content">
          <div
            className={`seed-pane fade ${activeTab === 'deposit' ? 'show active' : ''}`}
            id="deposit"
            role="tabpanel"
            aria-labelledby="deposit-tab"
          >
            <input type="text" className="form-control" placeholder="Enter seed" />
          </div>
          <div
            className={`verify-pane fade ${activeTab === 'withdraw' ? 'show active' : ''}`}
            id="withdraw"
            role="tabpanel"
            aria-labelledby="withdraw-tab"
          >
            <select className="form-control">
              <option value="option1">Crash</option>
              <option value="option2">Closet</option>
              <option value="option3">DIC-tator</option>
            </select>
            <input type="text" className="form-control" placeholder="Enter input 1" />
            <input type="text" className="form-control" placeholder="Enter input 2" />
          </div>
        </div>
      </div>
    </div>
      )}
    </div>
  );
};

export default FairnessButton;
