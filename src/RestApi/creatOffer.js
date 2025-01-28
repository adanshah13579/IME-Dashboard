import axios from 'axios';
import { baseuri } from '../baseuri/baseuri';

export const createOffer = async (offerData) => {
  try {
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTZhZmVjNzdiM2JkYWE2ODdhMDkxMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3OTcxNjYwLCJleHAiOjE3Mzg1NzY0NjB9.BjJ_ii6kX2fMPNlrEoHITmU6gpRHLASQLikTONGRxfk'
    const response = await axios.post(`${baseuri}/api/offer/creat-offer`, offerData, 
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, // Add the token here
            },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating offer:", error);
    throw new Error('Failed to create offer');
  }
};


export const getAllOffers = async () => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTZhZmVjNzdiM2JkYWE2ODdhMDkxMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3OTcxNjYwLCJleHAiOjE3Mzg1NzY0NjB9.BjJ_ii6kX2fMPNlrEoHITmU6gpRHLASQLikTONGRxfk';
      const response = await axios.get(
        `${baseuri}/api/offer/get-all-offers`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, // Add the token here
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching all offers:", error);
      throw new Error('Failed to fetch all offers');
    }
  };




export const getOffer = async (offerId) => {
    try {
      const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3OTZhZmVjNzdiM2JkYWE2ODdhMDkxMSIsInJvbGUiOiJ1c2VyIiwiaWF0IjoxNzM3OTcxNjYwLCJleHAiOjE3Mzg1NzY0NjB9.BjJ_ii6kX2fMPNlrEoHITmU6gpRHLASQLikTONGRxfk';
      const response = await axios.get(
        `${baseuri}/api/offer/get-offer/${offerId}`,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`, 
          },
        }
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching offer:", error);
      throw new Error('Failed to fetch offer');
    }
  };

