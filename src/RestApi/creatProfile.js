import axios from 'axios';
import { baseuri } from '../baseuri/baseuri';
import Cookies from "js-cookie"; // Import Cookies

export const createDoctorProfile = async (profileData) => {
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


export const updateDoctorProfile = async (userId,profileData) => {
  const token = Cookies.get("token"); 
console.log("update",userId);
console.log("profileData",profileData);


  try {
    const response = await axios.put(`${baseuri}/api/doctor/updateprofile/${userId}`, profileData, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });
    console.log("API response:", response);  // Log the full response for debugging

    if (response.status === 200) {
      return response.data; // Successfully updated
    } else {
      throw new Error(response.data.message || "Failed to update profile");
    }
  } catch (error) {
    console.error("Error updating doctor profile:", error);
    return null;
  }
};

export const getDoctorProfile = async (userId) => {
  const token = Cookies.get("token");

  console.log("getuserId", userId);

  try {
    const response = await axios.get(`${baseuri}/api/doctor/getprofile/${userId}`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    // Axios automatically parses the response data
    const data = response.data; // This gives you the profile data

    if (response.status === 200) {
      return data; // Profile data
    } else {
      throw new Error(data.message || 'Failed to fetch profile');
    }
  } catch (error) {
    console.error('Error fetching doctor profile:', error);
    return null;
  }
};
