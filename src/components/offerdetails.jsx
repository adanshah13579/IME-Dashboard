// import React, { useState } from "react";
// import {
//   Box,
//   Typography,
//   Avatar,
//   Card,
//   CardContent,
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
// } from "@mui/material";
// import axios from "axios";
// import { baseuri } from "../baseuri/baseuri";
// import Cookies from "js-cookie";


// const OfferCard = ({ offerDetails, offerId, senderType, time, avatar, selectedUserId }) => {
//   if (!offerDetails) return null;

//   const { name, profession, price, schedule, description } = offerDetails;
//   const [status, setStatus] = useState("");
//   const [modalOpen, setModalOpen] = useState(false);
//   const [actionType, setActionType] = useState("");

//   console.log("ofeer and user",offerId,selectedUserId);
  

//   const handleOpenModal = (type) => {
//     setActionType(type);
//     setModalOpen(true);
//   };

//   const handleCloseModal = () => {
//     setModalOpen(false);
//   };

//   const handleConfirmAction = async () => {
//     if (actionType === "accept") {
//       const token = Cookies.get("authToken"); 
//       try {
//         await axios.put(`${baseuri}/api/offer/accept-offer`, {
//           offerId,
//           userId: selectedUserId, 
//         },{
//           headers: {
//             Authorization: `Bearer ${token}`, 
//           },
//         });
//         setStatus("Accepted");
//       } catch (error) {
//         console.error("Error accepting offer:", error);
//       }
//     } else {
//       setStatus("Rejected");
//     }
//     handleCloseModal();
//   };

//   const isDoctor = senderType === "doctor"; 

//   return (
//     <Box
//       sx={{
//         display: "flex",
//         alignItems: "flex-start",
//         gap: 1.5,
//         mb: 2,
//         backgroundColor: "white",
//         flexDirection: isDoctor ? "row-reverse" : "row",
//         justifyContent: isDoctor ? "flex-end" : "flex-start",
//       }}
//     >
//       <Avatar src={avatar} alt={senderType} sx={{ width: 25, height: 25 }} />
//       <Box sx={{ flex: 1, display: "flex", flexDirection: "column", alignItems: isDoctor ? "flex-end" : "flex-start" }}>
//         <Typography sx={{ fontSize: { xs: 10, sm: 12 }, fontWeight: "bold", color: "black", display: "flex", alignItems: "center", gap: 1 }}>
         
//           <Typography sx={{ fontSize: { xs: 10, sm: 12 }, color: "black" }}>{time || "Unknown Time"}</Typography>
//           {senderType || "Unknown User"}
//         </Typography>

//         <Card sx={{ marginTop: "10px", padding: "15px", boxShadow: 3, borderRadius: "8px", backgroundColor: "#f9f9f9", maxWidth: "350px", width: "100%", alignSelf: isDoctor ? "flex-end" : "flex-start" }}>
//           <CardContent>
//             <Typography variant="h6" sx={{ fontWeight: "bold", fontSize: "16px", color: "#333" }}>{name}</Typography>
//             <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px", fontWeight: 500 }}>Profession: <strong>{profession}</strong></Typography>
//             <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>Price: <strong>${price}</strong></Typography>
//             <Typography variant="body2" color="textSecondary" sx={{ marginTop: "5px" }}>Schedule: <strong>{schedule}</strong></Typography>
//             <Typography variant="body2" color="textSecondary" sx={{ marginTop: "10px", color: "#555" }}>Description: {description}</Typography>

//             {status ? (
//               <Typography sx={{ marginTop: "10px", fontWeight: "bold", color: status === "Accepted" ? "green" : "red" }}>
//                 {status}
//               </Typography>
//             ) : (
//               !isDoctor && ( 
//                 <Box sx={{ marginTop: "15px", display: "flex", justifyContent: "space-between" }}>
//                   <Button variant="contained" color="primary" sx={{ textTransform: "none", borderRadius: "20px", padding: "8px 15px", boxShadow: 2 }} onClick={() => handleOpenModal("accept")}>
//                     Accept
//                   </Button>
//                   <Button variant="outlined" color="error" sx={{ textTransform: "none", borderRadius: "20px", padding: "8px 15px", boxShadow: 2 }} onClick={() => handleOpenModal("reject")}>
//                     Reject
//                   </Button>
//                 </Box>
//               )
//             )}
//           </CardContent>
//         </Card>
//       </Box>

//       {/* Confirmation Modal */}
//       <Dialog open={modalOpen} onClose={handleCloseModal}>
//         <DialogTitle>Confirm Action</DialogTitle>
//         <DialogContent>
//           <Typography>Are you sure you want to {actionType} this offer?</Typography>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCloseModal} color="secondary">Cancel</Button>
//           <Button onClick={handleConfirmAction} color={actionType === "accept" ? "primary" : "error"}>{actionType === "accept" ? "Accept" : "Reject"}</Button>
//         </DialogActions>
//       </Dialog>
//     </Box>
//   );
// };

// export default OfferCard;
