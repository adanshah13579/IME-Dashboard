import axios from 'axios';
import { baseuri } from '../baseuri/baseuri';
import Cookies from "js-cookie"; // Import Cookies

export const doctorCreateProfile = async (profileData) => {
  console.log("profileData", profileData);

  try {
    // Get token from cookies
    const token = Cookies.get("token");
    console.log(token);
    

    const response = await axios.post(`${baseuri}/api/doctor/create-profile`, profileData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      
    });

    return response.data; 
  } catch (error) {
    console.error("Error creating doctor profile:", error);
    throw new Error("Failed to create doctor profile");
  }
};



export const editDoctorProfile = async (doctorId, updatedData) => {

console.log(doctorId);
  const token = Cookies.get("token");

    try {
      const response = await axios.put(`${baseuri}/api/doctor/edit-profile/${doctorrId}`, updatedData, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`, 
        },
        
      });
  
      return response.data;
    } catch (error) {
      console.error("Error updating doctor profile:", error);
      throw new Error('Failed to update doctor profile');
    }
  };

 export const getDoctorProfile = async (userId) => {
  const token = Cookies.get("token");

    try {
      const response = await axios.get(`${baseuri}/api/doctor/getprofile/${userId}`,{ headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`, 
      },
      });
      const data = await response.json();
      
      if (response.ok) {
        return data; // Profile data
      } else {
        throw new Error(data.message || 'Failed to fetch profile');
      }
    } catch (error) {
      console.error('Error fetching doctor profile:', error);
      return null;
    }
  };
  
  
