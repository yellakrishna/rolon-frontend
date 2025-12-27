import React, { useContext } from 'react';
import './ExploreMenu.css';
import { StoreContext } from "../../Context/StoreContext.jsx";
import { Link } from 'react-router-dom';

const ExploreMenu = ({ category, setCategory }) => {
  const { menu_list } = useContext(StoreContext);

  return (
    <div className="explore-menu" id="explore-menu">
      <h1>Mechanical Seal Installation Guide</h1>
<p className="explore-menu-text">
  Ensure reliable and leak-free operation of your machinery with our expert mechanical seal installation procedures. 
  Follow step-by-step guidelines, best practices, and safety tips to achieve optimal performance and long-lasting seal integrity.
</p>

      <div className="both-flex">
        <div className="explore-menu-list">
          {menu_list.map((item, index) => {
            const isActive = category === item.menu_name;
            return (
              <Link
                key={index}
                to={`/category/${item.menu_name}`}
                className="explore-menu-list-item-link"
              >
                <div
                  className={`explore-menu-list-item ${isActive ? 'active-item' : ''}`}
                  onClick={() => setCategory(item.menu_name)}
                >
                  <img
                    src={item.menu_image}
                    // alt={item.menu_name}
                    className={isActive ? 'active' : ''}
                  />
                  {/* <p>{item.menu_name}</p> */}
                </div>
              </Link>
            );
          })}
        </div>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
