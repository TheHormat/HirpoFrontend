import React from 'react'
import SidebarItem from './SidebarItem';
import "./sidebar.css"
import items from "../../data/sidebar.json"
import items2 from "../../data/sidebar2.json"
import { useEffect } from 'react';
import { useState } from 'react';

function Sidebar() {
  console.log(items)
  const [isChecked,setIsChecked]=useState(false)
      const getData = async () => {
        const token = localStorage.getItem("access_token");
        const response = await fetch(
          "http://127.0.0.1:8000/wizard/CheckUserPermission/",
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log(response)
        if (response.status == 200 || response.status == 201) {
       setIsChecked(!isChecked)
        }
        else {
          console.log('notoke',response,s)
        }
      };
      useEffect(() => {
        getData();
      }, []);
  let myitems
  if (isChecked) {
     myitems = items?.items
  }
  else {
     myitems = items2?.items
  }
  

    return (
      <>
        {myitems?.map((item, index) => (
          <SidebarItem key={index} item={item} isChecked={isChecked}/>
        ))}
      </>
    );
}

export default Sidebar