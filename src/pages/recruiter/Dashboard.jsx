import React, { useState,useEffect } from 'react'
import Banner from '../../components/recruiter/Banner'
import CandidatesCategories from '../../components/recruiter/CandidatesCategories'
import SuggestedCandidates from '../../components/recruiter/SuggestedCandidates'
import axios from 'axios'

const Dashboard = () => {
  const [dashboardData, setDashboardData] = useState()
  // const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCandidates = async () => {
      try {
        const response = await axios.get(
          'https://fillin-admin.cyberxinfosolution.com/api/dashboard',
          {
            params: { search: 'Dental Assistant' },
            headers: {
              'Accept': 'application/json',
              'Content-Type': 'application/json',
            },
            data: {
              experiance_level: ['4 Years'],
            },
          }
        );
console.log("response.data.data",response.data.data);

        if (response.data?.data) {
          setDashboardData(response.data.data);
        }
      } catch (error) {
        console.error('Error fetching candidates:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCandidates();
  }, []);



  return (
    <div><Banner/>
    <CandidatesCategories cardData={dashboardData?.specialization}/>
    <SuggestedCandidates/>
    </div>
  )
}

export default Dashboard

