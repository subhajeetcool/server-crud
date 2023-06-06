import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const URL = "https://dummyjson.com"


function Update(props) {
  const [product, setProduct] = useState({
    title: '',
    price: 0,
    description: ''
  })

  const navigate = useNavigate() // used for redirection path inside logics to home page

  const params = useParams()
  console.log('params =', params)


  const getSingleProduct = async () => {
    await axios.get(`${URL}/products/${params.id}`)
      .then(res => {
        console.log('single =', res.data)
        setProduct(res.data)
      }).catch(err => toast.error(err.message))
  }


  useEffect(() => {
    getSingleProduct()
  }, [])

  const readValue = (e) => {
    const { name, value } = e.target;
    setProduct({ ...product, [name]: value })
  }

  const submitHandler = async (e) => {
      e.preventDefault();
        try {
              console.log('new product =', product)
              await axios.patch(`${URL}/products/${params.id}`, product)
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
          <h3 className='display-3 text-success'>Update</h3>
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
              <input type='submit' value='Update Product' className='btn btn-outline-success' />
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default Update
