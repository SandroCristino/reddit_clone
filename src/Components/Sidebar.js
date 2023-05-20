import React from 'react';
import '@fortawesome/fontawesome-free/css/all.min.css';
import '../Styles/Sidebar.css';

const Sidebar = () => {
  return (
    <div className="sidebar">
        <br />
        <p className='topic-btn'>
            <i class="bi bi-rss-fill mx-1"></i>
            Feeds
        </p>
        <button className="btn">
            <i class="bi bi-bullseye mx-1"></i>
            Popular
        </button>
        <hr />
        <br />
        <p className='topic-btn'>
            <i class="bi bi-filter-square-fill mx-1"></i>
            Topics
        </p>
        <button className="btn">
            <i class="bi bi-joystick mx-1"></i>
            Gaming
        </button>
        <button className="btn">
            <i class="bi bi-currency-bitcoin mx-1"></i>
            Crypto
        </button>
        <button className="btn">
            <i class="bi bi-tv-fill mx-1"></i>
            Television
        </button>

    </div>
  );
};

export default Sidebar;
