import React from 'react'
import Categories from './screens/Categories'

function Home() {
  return (
    <div className="container">
        <div className="row">
            <div className='col-md-12 text-center'>
                <h3 className='display-3 text-success'>Home</h3>
            </div>
        </div>
        <Categories/>
    </div>
  )
}
export default Home