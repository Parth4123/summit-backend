// Importing necessary modules
import express from "express";
import summitCtrl from "./summit.controller.js";

// Creating a new router
const router = express.Router();

router.route("/register").post(summitCtrl.apiRegister);

router.route("/sport-details").post(summitCtrl.apiGetDetails);

router.route("/get_accomodation").get(summitCtrl.apiGetAccomodation);

export default router;