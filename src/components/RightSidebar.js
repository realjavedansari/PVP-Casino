import React, { useState } from 'react';

function RightSidebar() {

  return (

    <div className='sidebar-right'>
      <a href="#" id="sideClose">

      </a>
      <div>
        <div className="gprofile">
          <img src="../img/profile-img.jpg" alt="Profile" className="rounded-circle" />
          <div>
            <h3>Seevi kargwal</h3>
            <span>0x3e4...7B7aD2</span>
          </div>
        </div>

        <ul className="sidebar-nav" id="sidebar-nav">
          <li className="nav-item">
            <a className="nav-link b collapsed" data-bs-target="#myaccount" data-bs-toggle="collapse" href="#">
              <span>My account</span><i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="myaccount" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <a href="#">
                  <span>Lorem ipsum</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Lorem ipsum</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Lorem ipsum</span>
                </a>
              </li>
            </ul>
          </li>
          <li className="nav-item">
            <a className="nav-link b collapsed" data-bs-target="#myactivity" data-bs-toggle="collapse" href="#">
              <span>My activity</span><i className="bi bi-chevron-down ms-auto"></i>
            </a>
            <ul id="myactivity" className="nav-content collapse " data-bs-parent="#sidebar-nav">
              <li>
                <a href="#">
                  <span>Lorem ipsum</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Lorem ipsum</span>
                </a>
              </li>
              <li>
                <a href="#">
                  <span>Lorem ipsum</span>
                </a>
              </li>
            </ul>
          </li>
        </ul>

        <div className="gchart px-4 py-3">
          <img src="../img/chart-1.png" alt="" className="img-fluid py-4" />
          <a href="#" className="big-yllw-btn2" data-bs-toggle="modal" data-bs-target="#manageFunds">
            Manage funds
          </a>
        </div>
        <hr />

        <div className="show-low p-4">
          <div className="sl-check">
            <input type="checkbox" className="css-checkbox" id="checkbox1" defaultChecked={true} />
            <label htmlFor="checkbox1" name="checkbox1_lbl" className="css-label lite-green-check">Show low balance:</label>
          </div>
          <ul>
            <li>
              <div className="sl-coin">
                <img src="../img/bitcoin.png" alt="" />
                <strong>BTC</strong>
              </div>
              <div className="sl-balance">
                <strong>0</strong>
                <a href="#">
                  <img src="../img/add-circle.svg" alt="" />
                </a>
                <a href="#">
                  <img src="../img/arrowRightPlain.svg" alt="" />
                </a>
              </div>
            </li>
            <li>
              <div className="sl-coin">
                <img src="../img/ethereum.png" alt="" />
                <strong>ETH</strong>
              </div>
              <div className="sl-balance">
                <strong>0</strong>
                <a href="#">
                  <img src="../img/add-circle.svg" alt="" />
                </a>
                <a href="#">
                  <img src="../img/arrowRightPlain.svg" alt="" />
                </a>
              </div>
            </li>
            <li>
              <div className="sl-coin">
                <img src="../img/solana.png" alt="" />
                <strong>SOL</strong>
              </div>
              <div className="sl-balance">
                <strong>0</strong>
                <a href="#">
                  <img src="../img/add-circle.svg" alt="" />
                </a>
                <a href="#">
                  <img src="../img/arrowRightPlain.svg" alt="" />
                </a>
              </div>
            </li>
            <li>
              <div className="sl-coin">
                <img src="../img/ripple.png" alt="" />
                <strong>SRP</strong>
              </div>
              <div className="sl-balance">
                <strong className="ps-2">0</strong>
                <a href="#">
                  <img src="../img/add-circle.svg" alt="" />
                </a>
                <a href="#">
                  <img src="../img/arrowRightPlain.svg" alt="" />
                </a>
              </div>
            </li>
          </ul>
        </div>

        <a href="#" className="disconnect-link">
          <img src="../img/logout-icon.svg" alt="" />
          <span>Disconnect</span>
        </a>
      </div>
    </div>
  );
}

export default RightSidebar;
