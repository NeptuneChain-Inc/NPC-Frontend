// import { ref, set, get } from "firebase/database";
// import { db } from "../apis/firebase";
// import CryptoJS from "crypto-js";
// import { createClient } from "@livepeer/sdk";
// import { LIVEPEER_API_KEY } from "../apis/livepeer";
// import { jwsSecret } from "../apis/keys";

// const SECRET_KEY = jwsSecret;

// async function createLivepeerClient() {
//   return await createClient({
//     apiKey: LIVEPEER_API_KEY,
//   });
// }

// // Generate Token
// function generateToken(verifierID) {
//   const hash = CryptoJS.SHA256(verifierID + SECRET_KEY);
//   return hash.toString(CryptoJS.enc.Hex);
// }

// // Verify Token
// function verifyToken(token, verifierID) {
//   const regeneratedToken = CryptoJS.SHA256(verifierID + SECRET_KEY).toString(CryptoJS.enc.Hex);
//   return regeneratedToken === token;
// }

// // Create Livepeer Stream
// async function createLivepeerStream() {
//   try {
//     const client = await createLivepeerClient();
//     const stream = await client.createStream({
//       name: "new_stream",
//     });
//     return stream;
//   } catch (error) {
//     console.error("Error creating Livepeer stream:", error);
//     throw error;
//   }
// }

// // Retrieve Streams
// async function getStreams(token, verifierID) {
//   if (!verifyToken(token, verifierID)) throw new Error("Invalid token");

//   const streamsRef = ref(db, "streams");
//   const snapshot = await get(streamsRef);
//   return snapshot.val();
// }

// // Verify Farm Process
// async function verifyFarmProcess(streamId, token, verifierID) {
//   if (!verifyToken(token, verifierID)) throw new Error("Invalid token");

//   const newStream = await createLivepeerStream();
//   if (!newStream) throw new Error("Could not create Livepeer stream");

//   const verificationRef = ref(db, `verified/${streamId}`);
//   await set(verificationRef, { verifierID, livepeerStreamId: newStream.id });

//   const auditRecord = {
//     streamId,
//     action: "verified",
//     timestamp: new Date().toISOString(),
//     livepeerStreamId: newStream.id,
//   };

//   const auditRef = ref(db, `auditRecords/${verifierID}`);
//   await set(auditRef, auditRecord);
// }

// // Calculate Payment
// function calculatePayment(saleAmount) {
//   const buyerFee = saleAmount * 0.25;
//   return buyerFee * 0.01;
// }

// // Test Function
// export const testFunction = async () => {
//   const verifierID = "verifier123";
//   const token = generateToken(verifierID);
//   try {
//     console.log(await getStreams(token, verifierID));
//     await verifyFarmProcess("stream123", token, verifierID);
//     console.log("Payment:", calculatePayment(100));
//   } catch (error) {
//     console.error(error);
//   }
// };
