import React, {useState} from 'react';
import Header from '../components/Header';
import Sidebar from '../components/sidebar';

const AdminPage = () => {
  return (
    <div>
      <Header />
    <Sidebar />

    <main id="main" className="main">
        <div className="filters">
        <div className="filter-tabs">
        <div className="ft-row">
        <img src="../img/PVP-Casino-Logo.svg" alt="" className="mx-2" />
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
        Dashboard
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
        Payment Transaction
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
        Deposits
        </a>
        </li>
        <li className="nav-item" role="presentation">
        <a
        href="#"
        className="nav-link"
        id="contact-tab"
        data-bs-toggle="tab"
        data-bs-target="#kyc"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false"
        >
        KYC
        </a>
        </li>
        <li className="nav-item" role="presentation">
        <a
        href="#"
        className="nav-link"
        id="contact-tab"
        data-bs-toggle="tab"
        data-bs-target="#players"
        type="button"
        role="tab"
        aria-controls="contact"
        aria-selected="false"
        >
        Players
        </a>
        </li>
        </ul>
        </div>
        </div>
        </div>
        </main>
    </div>
  )
}
export default AdminPage;