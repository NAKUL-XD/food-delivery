import React from 'react'
import './ExploreMenu.css'
import { menu_list } from '../../assets/assets'

const ExploreMenu = ({category , setCategory}) => {
  return (
    <div className='explore-menu' id='explore-menu'>
      <h1>Explore Our Menu</h1>

      <p className='explore-menu-text'>Explore our delicious menu and choose from a variety of mouthwatering dishes! From savory appetizers to hearty mains and delectable desserts, we have something for everyone. Savor the flavors and enjoy a delightful dining experience with us!</p>
      <div className="explore-menu-list">
        {menu_list.map((item, index) => (
          <div onClick={()=>setCategory((prev)=>(prev===item.menu_name?"All":item.menu_name))}   className="explore-menu-list-item" key={index}>
            <img className={category===item.menu_name?"active":""} src={item.menu_image} alt="" />
            <p>{item.menu_name}</p>
          </div>
        ))}

      </div>
    </div>
  )
}

export default ExploreMenu
