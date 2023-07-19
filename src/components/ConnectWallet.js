import React from 'react'
import {Link} from 'react-router-dom'

const ConnectWallet = () => {
    return (
        <main id="main" className="main">
        <div className="filters">
        <div className="filter-tabs">
        <div className="ft-row">
        <img src="../img/filter-icon.svg" alt="" className="mx-2" />
        <ul className="nav nav-tabs" id="myTab" role="tablist">
        <li className="nav-item" role="presentation">
        <a
        href="#"
        className="nav-link active"
        id="forYou-tab"
        data-bs-toggle="tab"
        data-bs-target="#forYou"
        type="button"
        role="tab"
        aria-controls="forYou"
        aria-selected="true"
        >
        For you
        </a>
        </li>
        <li className="nav-item" role="presentation">
        <a
        href="#"
        className="nav-link"
        id="profile-tab"
        data-bs-toggle="tab"
        data-bs-target="#profile"
        type="button"
        role="tab"
        aria-controls="profile"
        aria-selected="false"
        >
        Following
        </a>
        </li>
        <li className="nav-item" role="presentation">
        <a
        href="#"
        className="nav-link"
        id="contact-tab"
        data-bs-toggle="tab"
        data-bs-target="#contact"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false"
        >
        Leaderboards
        </a>
        </li>
        </ul>
        </div>
        <div className="tab-content" id="myTabContent">
        <div className="tab-pane fade show active" id="forYou" role="tabpanel" aria-labelledby="forYou-tab">
        <section className="section">
        <div className="row search-row">
        <div className="col-xl-3 col-lg-3 col-md-3 mb-3">
        <div className="online-concept">
        <img src="../img/green-dot.svg" alt="" />
        <div className="ms-3">
        <p>4,096 Live Games</p>
        <span>20 Seconds ago</span>
        </div>
        </div>
        </div>
        <div className="col-xl-6 col-lg-6 col-md-5 mb-3">
        <div className="fsearch">
        <img src="../img/search-icon.svg" alt="" />
        <input type="text" className="form-control" />
        </div>
        </div>
        <div className="col-xl-3 col-lg-3 col-md-4 mb-3">
        <div className="sort-cate">
        <img src="../img/category-icon.svg" alt="" />
        <select name="" id="" className="form-control ms-3">
        <option>Bankroll : Low to High</option>
        <option>Bankroll : Low to High</option>
        <option>Bankroll : Low to High</option>
        <option>Bankroll : Low to High</option>
        </select>
        </div>
        </div>
        </div>
        <div className="row gx-3 gx-lg-4">
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/crash.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <Link to="/crash" className="small-yllow-brdr-btn">Join</Link>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/closet.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <Link to="/closet" className="small-yllow-brdr-btn">Join</Link>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/dictator.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <Link to="/dictator" className="small-yllow-brdr-btn">Join</Link>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        <div className="col-xxl-2 col-lg-3 col-md-4">
        <div className="card info-card sales-card">
        <div className="card-body p-0">
        <div className="gname-date">
        <span>RM-28</span>
        <small>12 Mins ago</small>
        </div>
        <div className="game-fame">
        <div className="pc-price">
        <img src="../img/p-simble.svg" alt="" />
        <span>232 / $43</span>
        </div>
        <img src="../img/frame.png" alt="Game Fame" className="img-fluid" />
        </div>
        <div className="guser-btn">
        <div className="guser">
        <img src="../img/profile-img.jpg" alt="User" className="guser-img" />
        <span>Madelyn</span>
        </div>
        <a href="#" className="small-yllow-brdr-btn">Join</a>
        </div>
        </div>
        </div>
        </div>
        </div>
        </section>
        </div>
        <div className="tab-pane fade" id="profile" role="tabpanel" aria-labelledby="profile-tab">
        2nd Tab
        </div>
        <div className="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">
        3rd Tab
        </div>
        </div>
        </div>
        </div>
        </main>
        )
    }
    
    export default ConnectWallet
    