import React, { useState } from 'react'
import axios from "axios"


const AddCategory = () => {
  const [category, setCategory] = useState(
    {
      title: ""
    }
  );

  const handleCategory = async (e) => {
    e.preventDefault();
    console.log(category.title);
    try {
      const res = await axios.post("http://localhost:9000/user/v1/add/category", category,
        {
          headers:
            { Authorization: `Bearer ${localStorage.getItem("token")} ` }
        }
      );
      if (res) {
        console.log("got it");
      }
    } catch (error) {
      alert(error.response.data.message)
    }
  }

  return (
    <div className='d-flex container py-5 justify-content-center align-items-center h-full'>
      <div div className="row  align-items-center" >
        <h4>Add  Category</h4>
        <form onSubmit={handleCategory} >
          <div className="col-auto">
            <label for="inputPassword6" className="col-form-label ">
              Title
            </label>
            <input value={category.title} name='title' onChange={(e) => setCategory({ ...category, [e.target.name]: e.target.value })} type="text" id="inputPassword6" placeholder='enter title' className="form-control mb-3" aria-describedby="passwordHelpInline" />
            <button className='btn btn-primary'>Submit</button>
          </div>
        </form>


      </div  >

    </  div >
  )
}

export default AddCategory
