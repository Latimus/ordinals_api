const express = require("express");
const ordController = require("../controllers/ordController");
const router = express.Router();
router.use(express.urlencoded({ extended: false }));
router.use(express.json());


router.post("/create/inscribe", ordController.inscribe);
router.post("/create/sendInscription", ordController.sendInscription);
router.post("/create/paymentAddress", ordController.inscriptionPaymentAddress);
router.post("/create/collection_wallet", ordController.collectionWallet);
router.post("/create/mint", ordController.mint);
router.post("/create/getMultipleReceiveAddr", ordController.getMultipleReceiveAddr);
router.post("/create/broadcastTransaction", ordController.broadcastTransaction);
router.post("/create/getLatestBlock", ordController.getLatestBlock);

module.exports = router;