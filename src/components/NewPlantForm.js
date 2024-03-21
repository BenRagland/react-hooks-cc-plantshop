import React,{useState,useEffect} from "react";

function NewPlantForm( {updatePlantState}) {
  const [plantForm, setPlantForm] = useState({
    name:"",
    image:"",
    price: ''
  })

  function handleChange(e){
    setPlantForm( prev => {
      return (
        {
          ...prev,
          [e.target.name]:e.target.value
        }
      )
    })
  }

  function handleSubmit(e){
    e.preventDefault()

    fetch('http://localhost:6001/plants',{
      method:"POST",
      headers:{ "Content-type":"application/json" },
      body: JSON.stringify(plantForm)
    })
    .then(res =>{
      if(res.ok){
        return res.json()
      }else{
        throw new Error("---server error---") 
      }
    })
    .then(data => {
      updatePlantState(data)
      setPlantForm({
        name:"",
        image:"",
        price: ''
      })
    } )
    .catch((err)=>{
      console.log(err)
    })
    
  }

  return (
    <div className="new-plant-form">
      <h2>New Plant</h2>
      <form onSubmit={handleSubmit}>
        <input type="text" onChange={handleChange} name="name" placeholder="Plant name" value={plantForm.name}/>
        <input type="text" onChange={handleChange} name="image" placeholder="Image URL" value={plantForm.image} />
        <input type="number" onChange={handleChange} name="price" step="0.01" placeholder="Price" value={plantForm.price} />
        <button type="submit">Add Plant</button>
      </form>
    </div>
  );
}

export default NewPlantForm;
