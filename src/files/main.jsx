import React from 'react'
import ReactDOM from 'react-dom/client'
import InterviewPrepDashboard from './InterviewPrepDashboard.jsx'
import { BranchProvider } from './BranchContext.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BranchProvider>
      <InterviewPrepDashboard />
    </BranchProvider>
  </React.StrictMode>,
)
