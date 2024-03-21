import React,{useState} from "react";

function PlantCard({plantName,plantImage,plantPrice,id,deleteState}) {
  const [inStock, setInStock] = useState(true)


  function handleToggle(){
    setInStock(prev => !prev)
  }

  function handleDel(){
    const delData ={
      method:"DELETE",
      headers:{"Content-Type":"application/json"}
    }
    fetch(`http://localhost:6001/plants/${id}`,delData)
    .then(res => {
      if (res.ok){
        return res.json()
      }else{
        throw new Error("server issue")
      }
    })
    .then(data => {
      deleteState(id) 
    })

  }

  return (
    <li className="card" data-testid="plant-item">
      {/* handle image or stock pic */}
      {
        plantImage ? <img src={plantImage} alt={plantName} /> :
        <img src={"https://via.placeholder.com/400"} alt={plantName} />
      }

      {/* Name and Details */}
      <h4>{plantName ? plantName : "Missing Name"}</h4>
      <p>Price: {plantPrice}</p>
      {inStock ? (
        <button onClick={handleToggle} className="primary">In Stock</button>
      ) : (
        <button onClick={handleToggle}>Out of Stock</button>
      )}\
      <button onClick={handleDel} id="delete-btn">delete</button>
    </li>
  );
}

export default PlantCard;
