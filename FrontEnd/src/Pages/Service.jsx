import React from 'react'
// import ServiceList from '../components/services/ServiceList'
import ServiceCard from '../Components/Services/ServiceCard'
import { services } from '../assets/data/services'
import ServiceList from '../Components/Services/ServiceList'
const Service = () => {
  return (
    <section>
      <div className="container">
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-[30px]'>
          {
            services.map((item, index) => <ServiceCard key={index} index={index} item={item} />)
          }
        </div>
      </div>

      {/* <ServiceList /> */}
    </section>
  )
}

export default Service