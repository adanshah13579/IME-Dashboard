import axios from 'axios';
import { baseuri } from '../baseuri/baseuri';

export const doctorCreateProfile = async (profileData) => {
  console.log("profileData", profileData);

  try {
    const response = await axios.post(`${baseuri}/api/doctor/create-profile`, profileData, {
      headers: {
        'Content-Type': 'application/json',  // Set the header to 'application/json'
      },
    });

    return response.data; 
  } catch (error) {
    console.error("Error creating doctor profile:", error);
    throw new Error('Failed to create doctor profile');
  }
};


export const doctorEditProfile = async (doctorId, updatedData) => {
    console.log("Updated Profile Data:", updatedData);
  
    try {
      const response = await axios.put(`${baseuri}/api/doctor/edit-profile/${doctorId}`, updatedData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });
  
      return response.data;
    } catch (error) {
      console.error("Error updating doctor profile:", error);
      throw new Error('Failed to update doctor profile');
    }
  };
  
