import React, { useState } from 'react'
import { toast } from 'react-toastify'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const URL = "https://dummyjson.com"

function Create(props) {
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    description: ''
  })
  const navigate = useNavigate() // used for redirection path inside logics to home page

  const readValue = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value })
  }

  const submitHandler = async (e) => {
    e.preventDefault();
          try {
            console.log('new product =', product)
                  await axios.post(`${URL}/products/add`, product)
                    .then(res => {
                      toast.success("New Product added successfully")

                      navigate(`/`)
                    }).catch(err => toast.error(err.message))
              } catch (err) {
                toast.error(err.message)
              }
            }

  return (
    <div className="container">
      <div className="row">
        <div className='col-md-12 text-center'>
          <h3 className='display-3 text-success'>Create</h3>
        </div>
      </div>
      <div className="row">
        <div className='col-md-6 offset-md-3'>
          <form autoComplete='off' onSubmit={submitHandler}>
            <div className='form-group mt-2'>
              <label htmlFor="title">Title</label>
              <input type='text' name='title' value={product.title} onChange={readValue} id='title' className='form-control' required />
            </div>
            <div className='form-group mt-2'>
              <label htmlFor="price">Price</label>
              <input type='number' name='price' value={product.price} onChange={readValue} id='price' className='form-control' required />
            </div>
            <div className='form-group mt-2'>
              <label htmlFor="description">Description</label>
              <textarea name='description' value={product.description} onChange={readValue} id='description' cols='30' rows='5'
                className='form-control' required></textarea>
            </div>
            <div className='form-group mt-2'>
              <input type='submit' value='Create Product' className='btn btn-outline-success' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}
export default Create