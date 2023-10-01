import { useState } from "react";
import "./sidebar.css"
import { Link } from "react-router-dom";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
function SidebarItem({ item ,isChecked}) {

 
  const location = useLocation();
  const isActive = location.pathname === item.path ;
  let isParent = false
   isParent = item.childrens?.some(item => item.path === location.pathname);
const linkClass = `sidebarHeader sidebar-item ${isActive ? "active" : ""} `;
  const [open, setOpen] = useState(false);
  const myArrey = ['User board', "Messages","Evaluate","User panel","History","Company board"]
  let a
  if (!isChecked && !myArrey.includes(item.title)) {
    a='gray'
  }
   if (item.childrens) {
     return (
        
        <div
          className={
            open
              ? "sidebarHeader sidebar-item open"
              : "sidebarHeader sidebar-item"
          }
        >
          <button
           
            className={isParent ? "sidebar-title parent open" : "sidebar-title"}
            onClick={() => setOpen(!open)}
          >
            <span className={a}>{item.title}</span>
            <i className="fa-solid fa-chevron-right toggle-btn"></i>
          </button>

          <div className="sidebar-content">
            {item.childrens.map((child, index) => (
              <SidebarItem name={a} key={index} item={child} isChecked={isChecked} />
            ))}
          </div>
        </div>
      );
   } else {
     return (
       <a href={item.path || "#"} className={linkClass} id='atag'>
         <div className="sidebar-title">
           <span className={a}>{item.title}</span>
         </div>
       </a>
     );
    }
  
}

export default SidebarItem