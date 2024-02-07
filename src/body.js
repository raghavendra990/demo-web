import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import fetcher  from './utils/fetch'
import apiMapper from "./utils/apiMapper";
import common  from "./utils/common";
import config from "./utils/config";

const Body =() => {
    const navigate = useNavigate();
    const [ item, setItem] = useState({});
  
    const getItems = async ()=>{
        const resp = await fetcher.get(apiMapper.PROFILE_API , config.host, common.getHeaders());
        if ([200, 201].includes(resp?.status)) {
            const userData = resp.data || [];
            setItem(userData)
        }
    }
 
    useEffect( ()=>{
        const token = localStorage.getItem('Authorization');
        if (!token){
          navigate('/register');
        }
        getItems()
    }, [])


    return <>
        {localStorage.getItem('Authorization') ? <div className="container">
            <div className="row">
                    
               
            </div>
            <table className="table table-bordered mt-2">
            <thead>
              <tr>
                <th>First Name</th>
                <th className="text-center">
                  Last Name
                </th>
                <th className="text-center">
                  Phone
                </th>
                <th className="text-center">
                  DOB
                </th>
              
              </tr>
            </thead>
            <tbody>
              {Object.keys(item).length > 0 &&  <tr key={1}>
                <td>{item?.firstname}</td>
                <td>{item?.lastname}</td>
                <td>{item?.phone_number}</td>
                <td>{item?.dob}</td>                
              </tr>}
             
            </tbody>
          </table>
        </div> : <div className="conatiner text-center mt-5">
              <h1>Please Login/Signup to access this page</h1>
            </div>}
        
    </>
}
export default Body;