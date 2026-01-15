import React from 'react'
import Service from '../components/Services/Service'
import CreateService from '../components/Services/CreateService.jsx'

function ServicePage() {
  return (
    <div className="flex-1 min-h-[calc(100vh-5rem-9rem)] px-6 md:px-16 py-8">
            <CreateService />
            <Service />
    </div>
  )
}

export default ServicePage
