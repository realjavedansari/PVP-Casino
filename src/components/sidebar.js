import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useEffect } from 'react';
import '../App.css';
import { FaChevronDown, FaDotCircle } from "react-icons/fa";
import {Link} from 'react-router-dom'

const Sidebar = () => {
  useEffect(() => {
    "use strict";
    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
      el = el.trim();
      if (all) {
        return [...document.querySelectorAll(el)];
      } else {
        return document.querySelector(el);
      }
    };

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
      if (all) {
        select(el, all).forEach((e) => e.addEventListener(type, listener));
      } else {
        select(el, all).addEventListener(type, listener);
      }
    };

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
      el.addEventListener('scroll', listener);
    };

    // Function to attach event listeners to the sidebar toggle and search bar toggle
    const attachSidebarEventListeners = () => {
      /**
       * Sidebar toggle
       */
      if (select('.toggle-sidebar-btn')) {
        on('click', '.toggle-sidebar-btn', function (e) {
          select('body').classList.toggle('toggle-sidebar');
        });
      }

      /*
       * Search bar toggle
       */
      if (select('.search-bar-toggle')) {
        on('click', '.search-bar-toggle', function (e) {
          select('.search-bar').classList.toggle('search-bar-show');
        });
      }
    };

    // Attach event listeners when the component mounts
    attachSidebarEventListeners();

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true);
    const navbarlinksActive = () => {
      let position = window.scrollY + 200;
      navbarlinks.forEach((navbarlink) => {
        if (!navbarlink.hash) return;
        let section = select(navbarlink.hash);
        if (!section) return;
        if (
          position >= section.offsetTop &&
          position <= section.offsetTop + section.offsetHeight
        ) {
          navbarlink.classList.add('active');
        } else {
          navbarlink.classList.remove('active');
        }
      });
    };
    window.addEventListener('load', navbarlinksActive);
    onscroll(document, navbarlinksActive);

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header');
    if (selectHeader) {
      const headerScrolled = () => {
        if (window.scrollY > 100) {
          selectHeader.classList.add('header-scrolled');
        } else {
          selectHeader.classList.remove('header-scrolled');
        }
      };
      window.addEventListener('load', headerScrolled);
      onscroll(document, headerScrolled);
    }
  }, []);
    
return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-heading">Games</li>
        <li className="nav-item">
          <a className="nav-link b collapsed" data-bs-target="#components-nav" data-bs-toggle="collapse" href="#">
            <img src="../img/play-icon.svg" alt="Icon" />
            <span>Play</span>
            <FaChevronDown className="ms-auto" />
          </a>
          <ul id="components-nav" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
              <a href="components-alerts.html">
                <span>For You</span>
              </a>
            </li>
            <li>
              <a href="components-accordion.html">
                <span>Following</span>
              </a>
            </li>
            <li>
              <a href="components-badges.html">
                <span>Leader Boards</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-item">
          <Link className="nav-link b collapsed" to="/creategame">
            <img src="../img/create-icon.svg" alt="Icon" />
            <span>Create</span>
          </Link>
        </li>
        <hr />
        <li className="nav-heading">Foundation</li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="users-profile.html">
            <img src="../img/support-icon.svg" alt="Icon" />
            <span>Support</span>
          </a>
        </li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="pages-faq.html">
            <img src="../img/documentation-icon.svg" alt="Icon" />
            <span>Documentation</span>
          </a>
        </li>
      </ul>

      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-heading">LANGUAGE</li>
        <li className="nav-item">
          <a className="nav-link collapsed" data-bs-target="#components-nav2" data-bs-toggle="collapse" href="#">
            <img src="../img/language-icon.svg" alt="Icon" />
            <span>English</span>
            <FaChevronDown className="ms-auto" />

          </a>
          <ul id="components-nav2" className="nav-content collapse" data-bs-parent="#sidebar-nav">
            <li>
              <a href="components-alerts.html">
                <FaDotCircle />
                <span>For You</span>
              </a>
            </li>
            <li>
              <a href="components-accordion.html">
              <FaDotCircle />
                <span>Following</span>
              </a>
            </li>
            <li>
              <a href="components-badges.html">
              <FaDotCircle />
                <span>Leader Boards</span>
              </a>
            </li>
          </ul>
        </li>
        <li className="nav-heading">Dark Mode</li>
        <li className="nav-item">
          <a className="nav-link collapsed" href="users-profile.html">
            <img src="../img/support-icon.svg" alt="Icon" />
            <span>Support</span>
          </a>
        </li>
        <li className="nav-footer">
          <p>Powered By PVP.Casino</p>
        </li>
      </ul>
    </aside>
    
  );
};

export default Sidebar;
