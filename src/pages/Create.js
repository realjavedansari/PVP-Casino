import React, { useState } from 'react';
import Header from '../components/Header'
import Sidebar from '../components/sidebar'

const Create = () => {
    const [isChecked1, setIsChecked1] = useState(false);
    const [isChecked2, setIsChecked2] = useState(false);
    
    const handleCheckboxChange1 = () => {
      setIsChecked1(!isChecked1);
    };
    
    const handleCheckboxChange2 = () => {
      setIsChecked2(!isChecked2);
    };
    return (
        <div>
        <Header />
        <Sidebar />
        
        <main id="main" className="main">
        <div className="row">
        <div className="col-md-12 col-lg-8 col-xl-7">
        <h2 className="pg-heading">Create a Rocket Man Game</h2>
        <div className="mb-4">
        <div className="progress">
        <div className="progress-bar w-75" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        </div>
        <div className="card blck-card brdr-radius-16 p-24 cg-form">
        <div className="form-group mb-3">
        <input type="text" placeholder="Custom Title" className="form-control" />
        <small>Leave blank to leave for default</small>
        </div>
        <div className="row">
        <div className="col-md-7">
        <div className="from-group mb-3">
        <label htmlFor="">Upload Rocket</label>
        <div className="dropzone dropzone-single dz-clickable" data-toggle="dropzone" data-dropzone-url="http://">
        <div className="dz-default dz-message">
        <div className="upload-doc"></div>
        <input type="file" />
        </div>
        </div>
        <small>Leave blank to leave for default</small>
        </div>
        </div>
        <div className="col-md-5">
        <div className="form-group mb-3">
        <label htmlFor="">Preview</label>
        <div className="upl-pic">
        <img src="../img/upload-1.png" alt="" className="img-fluid" />
        </div>
        </div>
        </div>
        </div>
        </div>
        <div className="card blck-card brdr-radius-16 p-24 cg-form">
        <div className="row">
        <div className="col-md-6">
        <div className="from-group mb-3">
        <label htmlFor="">Your Bet amount* (BankRoll)</label>
        <div className="pt-4">
        <div className="nw progress">
        <div className="progress-bar" role="progressbar" style={{ width: '25%' }} aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
        </div>
        </div>
        </div>
        <div className="col-md-6">
        <div className="form-group mb-3">
        <label htmlFor="">Your Bet amount* (BankRoll)</label>
        <input type="text" placeholder="Enter your bet amount" className="form-control" />
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-6">
        <div className="from-group mb-3">
        <label htmlFor="">Set Payouts</label>
        <input type="text" placeholder="Custom Title" className="form-control" />
        </div>
        </div>
        <div className="col-md-6">
        <div className="form-group mb-3">
        <label htmlFor="">&nbsp;</label>
        <input type="text" placeholder="Custom Title" className="form-control" />
        </div>
        </div>
        </div>
        <div className="sl-check mb-0">
        <input type="checkbox" className="css-checkbox" id="checkbox01"   checked={isChecked1}
        onChange={handleCheckboxChange1} />
        <label htmlFor="checkbox01" name="checkbox1_lbl" className="css-label lite-green-check">
        <small style={{ color: '#fff' }}>Re-stake (When Upper Payout is reached only)</small>
        </label>
        </div>
        </div>
        <div className="card blck-card brdr-radius-16 p-24 cg-form">
        <div className="row">
        <span className="mb-3">Privacy</span>
        <div className="col-md-6">
        <div className="from-group mb-3">
        <label htmlFor="">Set Payouts</label>
        <input type="text" placeholder="Lower" className="form-control" />
        </div>
        </div>
        <div className="col-md-6">
        <div className="form-group mb-3">
        <label htmlFor="">&nbsp;</label>
        <input type="text" placeholder="Upper" className="form-control" />
        </div>
        </div>
        </div>
        <div className="sl-check mb-0">
        <input type="checkbox" className="css-checkbox" id="checkbox02"   checked={isChecked2}
        onChange={handleCheckboxChange2} />
        <label htmlFor="checkbox02" name="checkbox1_lbl" className="css-label lite-green-check">
        <small style={{ color: '#fff' }}>Re-stake (When Upper Payout is reached only)</small>
        </label>
        </div>
        </div>
        <div className="card blck-card brdr-radius-16 p-24 cg-form">
        <div className="row">
        <span className="mb-3">Set Payouts</span>
        <div className="col-md-6 mb-4">
        <div className="radio-check">
        <div>
        <input name="cssCheckbox" id="demo_opt_1" type="radio" className="css-checkbox" />
        <label htmlFor="demo_opt_1">Option 1</label>
        </div>
        <div className="ms-4">
        <input name="cssCheckbox" id="demo_opt_2" type="radio" className="css-checkbox" defaultChecked />
        <label htmlFor="demo_opt_2">Option 2</label>
        </div>
        </div>
        </div>
        </div>
        <div className="row">
        <div className="col-md-6">
        <div className="from-group mb-3">
        <label htmlFor="">Password</label>
        <input type="password" placeholder="password" className="form-control" />
        </div>
        </div>
        </div>
        </div>
        </div>
        <div className="col-md-12 col-lg-4 col-xl-3">
        <a href="#" className="big-yllw-btn2 d-flex w-100 mb-4">
        <img src="../img/left-arrow-blck.svg" alt="" className="me-2" /> Go back to Games
        </a>
        <div className="card blck-card brdr-radius-16 px-0">
        <div className="d-flex align-items-center justify-content-between px-16">
        <h2 className="pg-heading mb-0">Place Bet</h2>
        <a href="#" className="edit-btn">
        <img src="../img/edit-icon.svg" alt="" />
        <span className="ms-2">Edit</span>
        </a>
        </div>
        <hr />
        <div className="casion-mode px-16">
        <div className="d-flex justify-content-between align-items-center">
        <div className="form-check form-switch">
        <input className="form-check-input" type="checkbox" id="flexSwitchCheckDefault" />
        <label className="form-check-label" htmlFor="flexSwitchCheckDefault">
        <small>Casino mode</small>
        </label>
        </div>
        <div>
        <img src="../img/ylw-dail.svg" alt="" />
        </div>
        </div>
        </div>
        <hr />
        <div className="coin-list px-16">
        <ul>
        <li>
        <div>
        <img src="../img/bitcoin.svg" alt="" />
        <span>Bankroll</span>
        </div>
        <span>$3,033</span>
        </li>
        <li>
        <div>
        <img src="../img/bitcoin.svg" alt="" />
        <span>Your Return</span>
        </div>
        <span>$4,000</span>
        </li>
        <li>
        <div>
        <img src="../img/bitcoin.svg" alt="" />
        <span>Payout Profite</span>
        </div>
        <span className="green-text">+$967</span>
        </li>
        <li>
        <div>
        <img src="../img/bitcoin.svg" alt="" />
        <span>Re-staking?</span>
        </div>
        <span>Yes</span>
        </li>
        <li>
        <div>
        <img src="../img/bitcoin.svg" alt="" />
        <span>Win Rate</span>
        </div>
        <span>96%</span>
        </li>
        <li>
        <div>
        <img src="../img/bitcoin.svg" alt="" />
        <span>Conditions</span>
        </div>
        <span>Private</span>
        </li>
        <li>
        <div>
        <img src="../img/bitcoin.svg" alt="" />
        <span>Risk</span>
        </div>
        <span>Good</span>
        </li>
        </ul>
        </div>
        <hr />
        <div className="px-16 cg-form">
        <div className="from-group mb-3">
        <label htmlFor="">Set Currency</label>
        <select name="" id="" className="form-control">
        <option value="">Lorem ipsum</option>
        <option value="">Lorem ipsum</option>
        <option value="">Lorem ipsum</option>
        <option value="">Lorem ipsum</option>
        </select>
        </div>
        <a href="#" className="big-yllw-btn2 d-flex w-100">
        Submit Game
        </a>
        </div>
        </div>
        </div>
        </div>
        </main>
        
        </div>
        )
    }
    
    export default Create
    