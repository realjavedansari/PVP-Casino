
import React, {useState} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sidebar';
import ClosetGame from '../components/Closet';

const Closet = () => {

  
  return (
    <div>
      <Header />
    <Sidebar />
    <main id="main" className="main">
    <div className="row">
    <div className="col-md-8">
    <div className="mb-4">
    
   {/* <img src='../img/crash-game-1.png' alt="" className="img-fluid w-100" /> */}
   <ClosetGame />
    
    </div>
    
    <div className="crs-game-p">
    <ul className="nav nav-pills mb-3" id="pills-tab" role="tablist">
    <li className="nav-item" role="presentation">
    <a href="#" className="nav-link active" id="pills-players-tab" data-bs-toggle="pill" data-bs-target="#pills-players" role="tab" aria-controls="pills-players" aria-selected="true">Players</a>
    </li>
    <li className="nav-item" role="presentation">
    <a href="#" className="nav-link" id="pills-comments-tab" data-bs-toggle="pill" data-bs-target="#pills-comments" role="tab" aria-controls="pills-comments" aria-selected="false">Comments</a>
    </li>
    <li className="nav-item" role="presentation">
    <a href="#" className="nav-link" id="pills-history-tab" data-bs-toggle="pill" data-bs-target="#pills-history" role="tab" aria-controls="pills-history" aria-selected="false">History</a>
    </li>
    <li className="nav-item" role="presentation">
    <a href="#" className="nav-link" id="pills-embed-tab" data-bs-toggle="pill" data-bs-target="#pills-embed" role="tab" aria-controls="pills-embed" aria-selected="false">Embed</a>
    </li>
    </ul>
    <div className="tab-content" id="pills-tabContent">
    <div className="tab-pane fade show active" id="pills-players" role="tabpanel" aria-labelledby="pills-players-tab">
    <div className="table-responsive sc-table">
    <table className="table table-borderless">
    <thead>
    <tr>
    <th scope="col">Player</th>
    <th scope="col">Cash Out</th>
    <th scope="col">Amount</th>
    <th scope="col">Profit</th>
    </tr>
    </thead>
    <tbody>
    <tr>
    <td>
    <img src="../img/profile-img.jpg" alt="" className="usr-pic" />
    <strong>Ronald Jones</strong>
    </td>
    <td>bang</td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong>2000.<small>000</small></strong>
    </td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong className="red-text">30000.<small>0000</small></strong>
    </td>
    </tr>
    <tr>
    <td>
    <img src="../img/profile-img.jpg" alt="" className="usr-pic" />
    <strong>Ronald Jones</strong>
    </td>
    <td>bang</td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong>2000.<small>000</small></strong>
    </td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong className="red-text">30000.<small>0000</small></strong>
    </td>
    </tr>
    <tr>
    <td>
    <img src="../img/profile-img.jpg" alt="" className="usr-pic" />
    <strong>Ronald Jones</strong>
    </td>
    <td>bang</td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong>2000.<small>000</small></strong>
    </td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong className="red-text">30000.<small>0000</small></strong>
    </td>
    </tr>
    <tr>
    <td>
    <img src="../img/profile-img.jpg" alt="" className="usr-pic" />
    <strong>Ronald Jones</strong>
    </td>
    <td>bang</td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong>2000.<small>000</small></strong>
    </td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong className="red-text">30000.<small>0000</small></strong>
    </td>
    </tr>
    <tr>
    <td>
    <img src="../img/profile-img.jpg" alt="" className="usr-pic" />
    <strong>Ronald Jones</strong>
    </td>
    <td>bang</td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong>2000.<small>000</small></strong>
    </td>
    <td>
    <img src="../img/solana.png" alt="" className="usr-pic" />
    <strong className="red-text">30000.<small>0000</small></strong>
    </td>
    </tr>
    </tbody>
    </table>
    </div>
    </div>
    <div className="tab-pane fade" id="pills-comments" role="tabpanel" aria-labelledby="pills-comments-tab">Comments</div>
    <div className="tab-pane fade" id="pills-history" role="tabpanel" aria-labelledby="pills-history-tab">History</div>
    <div className="tab-pane fade" id="pills-embed" role="tabpanel" aria-labelledby="pills-embed-tab">Embed</div>
    </div>
    </div>
    </div>
    <div className="col-md-4">
    <div className="user-cash">
    <div className="uc-head mb-2">
    <img src="../img/xrp-coin.svg" alt="" className="me-2" />
    <span className="me-2">XRP</span>
    <img src="../img/green-right-tick.svg" alt="" />
    </div>
    <h2 className="mb-3">Closet</h2>
    <div className="creater-time mb-3">
    <div className="ct-text">
    <img src="../img/profile-img.jpg" alt="" className="rounded-circle user-pic me-2" />
    <p>
    <small>Creator</small>
    <span>Khalnayak</span>
    </p>
    </div>
    <div className="ct-text">
    <p>
    <small>Created</small>
    <span>7 days ago</span>
    </p>
    </div>
    </div>
    <div className="bnk-roll d-flex mb-4 ligh-blck-card brdr-radius-16">
    <p>
    <small>Bankroll</small>
    <span>
    <img src="../img/solana.png" alt="" />
    <strong>29,239,92.90</strong>
    </span>
    </p>
    <p>
    <small>Bet</small>
    <span>
    <img src="../img/coins-icon.svg" alt="" />
    <strong>4555</strong>
    </span>
    </p>
    <p>
    <small>Type</small>
    <span>
    <img src="../img/cube-icon.svg" alt="" />
    <strong>Casino</strong>
    </span>                
    </p>
    </div>
    <div className="bet-amnt ligh-blck-card brdr-radius-16">
    <div className="form-group mb-4">
    <label htmlFor="bet-amount">Bet Amount</label>
    <div className="bet-amnt-inpt-row">
    <div className="bair-input">
    <input
    type="number"
    className="form-control"
    />
    <a href='#'>
    <img src="../img/white-close-circle.svg" alt="" />
    </a>
    </div>
    <a href="#" className="small-bet-box">
    AI
    </a>
    <a href="#" className="small-bet-box">
    AP
    </a>
    </div>
    </div>
    <button
          type="button"
          className="big-yllw-btn2 d-block w-100"
          
        >
          Bet
        </button>
    </div>
    </div>
    </div>
    </div>
    </main>
    </div>
  )
}

export default Closet
