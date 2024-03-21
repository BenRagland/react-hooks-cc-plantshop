import React,{useState} from "react";
import NewPlantForm from "./NewPlantForm";
import PlantList from "./PlantList";
import Search from "./Search";

function PlantPage() {
  // States
  const [plantListState, setPlantListState] = useState([])
  const [filterList, setFilterList] = useState([])


  // Update PlantList List after Fetch PUT
  function updatePlantState(newPlantObj){
    setPlantListState(prev => [...prev, newPlantObj])
  }

  function handleSearch(phrase){
    const newFilterList = plantListState.filter((obj, i)=>{
      if (obj.name.toLowerCase().includes(phrase.toLowerCase())  ){
        return true
      }
    })
    setFilterList(newFilterList)
  }


  return (
    <main>
      <NewPlantForm  updatePlantState={updatePlantState}/>
      <Search handleSearch={handleSearch}/>
      {filterList.length !== 0 ?  <PlantList plantList={filterList} setPlantList={setPlantListState}  />  :
      <PlantList  plantList={plantListState} setPlantList={setPlantListState} /> 
      }
      
    </main>
  );
}

export default PlantPage;
