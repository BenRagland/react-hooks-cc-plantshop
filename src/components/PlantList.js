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

  function deleteState(id){
    const afterDelList = plantList.filter((plant, i)=>{
      if(plant.id !== id){
        return true
      }
    })

    setPlantList(afterDelList)
  }

  

  return (
    <ul className="cards">
      {plantList.map(({name,image,price,id}, i)=>{
     
        return( 
          <PlantCard 
            
            key={id}
            id={id}
            plantName={name} 
            plantImage={image}
            plantPrice={price}

            deleteState={deleteState}
          />
          
        )
      })}
    </ul>
  );
}

export default PlantList;
