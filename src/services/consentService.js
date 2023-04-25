import axios from 'axios';

// The API endpoint where login data is sent to

const requesturl = `http://localhost:9090/generateconsent`

const requestConsent = async (consent) => {
 
  const response = await axios.post(`${requesturl}`,consent)
  
  return response.data
}

const requesturl1 = `http://localhost:9090/gettransfereddata`

const requestTransferdData = async (consent) => {
 
  const response = await axios.post(`${requesturl1}`,consent)
  
  return response.data
}

// Export the method as an object so that it can be accessible outside this file as a service
const exportObject = { requestConsent,requestTransferdData }
export default exportObject