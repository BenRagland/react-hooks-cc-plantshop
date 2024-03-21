import React,{useEffect,useState} from "react";
import PlantCard from "./PlantCard";

function PlantList({plantList,setPlantList}) {
  
  // set Initial Plant List onn first render  
  useEffect(()=>{
    fetch('http://localhost:6001/plants')
    .then(res => {
      if (res.ok){
        return res.json()
      }else{
        throw new Error("server issue")
      }
    })
    .then(data =>{
      setPlantList(data)
    })
    .catch((e)=>{
      console.log("Error Message:--->",e)
    })
  },[])


  return (
    <ul className="cards">
      {plantList.map(({name,image,price,id}, i)=>{
     
        return( 
          <PlantCard 
            key={id}
            plantName={name} 
            plantImage={image}
            plantPrice={price}
          />
          
        )
      })}
    </ul>
  );
}

export default PlantList;
