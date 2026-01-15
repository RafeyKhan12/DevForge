import React from 'react'
import CreateProject from '../components/Project/CreateProject'
import Projects from '../components/Project/Project'
import { useSelector } from 'react-redux';

function ProjectPage() {
  return (
    <div className="flex-1 min-h-[calc(100vh-5rem-9rem)] px-6 md:px-16 py-8">
      <CreateProject />
      <Projects />
    </div>
  )
}

export default ProjectPage
