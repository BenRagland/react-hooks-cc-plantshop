import React,{useState} from "react";

function PlantCard({plantName,plantImage,plantPrice,id,deleteState,editState}) {
  const [inStock, setInStock] = useState(true)
  const [editPrice, setEditPrice] = useState("")
  const [editMode, setEditMode] = useState(false)

  // In Stock or Out of Stock Toggle
  function handleToggle(){
    setInStock(prev => !prev)
  }

  // Delete Button Logic
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
      deleteState(id,editPrice) 
    })

  }

  // Edit Button Logic & Format new price number
  function handleEditSubmit(e){
    e.preventDefault()
    const editData ={
      method:"PATCH",
      headers:{"Content-Type":"application/json"},
      body:JSON.stringify({price: editPrice})
    }
    fetch(`http://localhost:6001/plants/${id}`,editData)
    .then(res => {
      if (res.ok){
        return res.json()
      }else{
        throw new Error("server issue")
      }
    })
    .then(data => {
      editState(id,(Number(editPrice).toFixed(2)))
      setEditMode(false)
      setEditPrice("")
    })
  }

  // Format Price for Display
  const formattedPrice = Number(plantPrice).toLocaleString('en-US', {
    style: 'decimal',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }) 

  return (
    <li className="card" data-testid="plant-item">
      {/* handle image or stock pic */}
      {
        plantImage ? <img src={plantImage} alt={plantName} /> :
        <img src={"https://via.placeholder.com/400"} alt={plantName} />
      }

      {/* Name */}
      <h4>{plantName ? plantName : "Missing Name"}</h4>

      {/* Price Display & display Number Formatting*/}
      
      {editMode ? 
        <>
          <input type="number" 
          placeholder={`Change price here - $${formattedPrice}` }
          value={editPrice}
          onChange={(e)=> setEditPrice(e.target.value)}/>
        </>
        : 
        <p>Price: $ {formattedPrice}</p>
      }

      {/* In Stock  */}
      {inStock ? (
        <button onClick={handleToggle} className="primary">In Stock</button>
      ) : (
        <button onClick={handleToggle}>Out of Stock</button>
      )}\


      {/* Del Button */}
        <button onClick={handleDel} id="delete-btn">Delete</button>
      

      {/* Edit Button */}
      {editMode ?
      <form onSubmit={handleEditSubmit}>
        <button style={{marginRight:"10px"}} onClick={(e) => setEditMode(!editMode)}>Edit</button>
        <button >Submit</button>
      </form> 
      :
      <button onClick={() =>setEditMode(!editMode)}>Edit</button>
    }
    </li>
  );
}

export default PlantCard;
