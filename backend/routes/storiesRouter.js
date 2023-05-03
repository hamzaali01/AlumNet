const express = require("express");

const { createStories, getStoryById, updateStories, getAllStories, getStories, deleteStories } = require('../controllers/storiesController');
const checkAuth = require("../middleware/check-auth");
const { authPermission } = require("../middleware/check-permission");
const { validateStories } = require("../middleware/validation");

const router = express.Router();


router.use(checkAuth);

router.get("/", authPermission("getStories"), getAllStories)
router.get("/:sid", authPermission("getStories"), getStoryById)
router.get("/alumni/:ERP", authPermission("getStories"), getStories)

router.post("/", authPermission("createStories"), validateStories, createStories)
router.patch("/:sid", authPermission("updateStories"), validateStories, updateStories)
router.delete("/:sid", authPermission("deleteStories"), deleteStories)


module.exports = router;