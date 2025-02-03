import axios from "axios";
import Cookies from "js-cookie";
import { baseuri } from "../baseuri/baseuri";

export const createOffer = async (offerData) => {
  try {
    const token = Cookies.get("token");
    const response = await axios.post(`${baseuri}/api/offer/creat-offer`, offerData, 
        {
            headers: {
              'Content-Type': 'application/json',
              Authorization: `Bearer ${token}`, 
            },
    });
    return response.data;
  } catch (error) {
    console.error("Error creating offer:", error);
    throw new Error('Failed to create offer');
  }
};

export const getDoctorOffers = async () => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No authentication token found");

    const response = await axios.get(`${baseuri}/api/offer/doctor-offers`, {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.data.offers || [];
  } catch (error) {
    console.error("Error fetching doctor's offers:", error);
    return [];
  }
};

export const updateOfferStatus = async (offerId, status) => {
  try {
    const token = Cookies.get("token");
    if (!token) throw new Error("No authentication token found");
console.log("offerid",offerId);

    const response = await axios.put(
      `${baseuri}/api/offer/update-status`,
      { _id: offerId, status },
      { headers: { Authorization: `Bearer ${token}` } }
    );

    return response.data.success;
  } catch (error) {
    console.error("Error updating offer status:", error);
    return false;
  }
};



export const getOfferr = async (offerId) => {
    try {
      const token = Cookies.get("token");

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

