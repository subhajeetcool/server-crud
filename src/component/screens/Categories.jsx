import React, { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { NavLink } from 'react-router-dom'

const URL = "https://dummyjson.com"

function Categories(props) {
    const [categories, setCategories] = useState([])

    const getCategories = async () => {
        await axios.get(`${URL}/products/categories`)
            .then(res => {
                console.log('categories =', res)
                setCategories(res.data)
            }).catch(err => toast.error(err.message))
    }


    useEffect(() => {
        getCategories()
    }, [])


    return (
        <div className="container">
            <div className="row">
                {
                    categories && categories.map((item, index) => {
                        return (
                            <div className='col-md-4' key={index}>
                                <div className="card mt-2 mb-2">
                                    <div className='card-body text-center'>
                                        <NavLink to={`/category/${item}/products`} className={'btn'}>
                                            <h5 className='text-success text-capitalize'>{item}
                                            </h5>
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        )
                    })
                }
            </div>
        </div>
    )
}
export default Categories