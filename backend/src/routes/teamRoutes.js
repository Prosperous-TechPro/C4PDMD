/**

* =====================================================
* TEAM ROUTES
* =====================================================
  */

const express = require("express");

const router = express.Router();

const {
getAllTeamMembers,
getTeamMemberById,
createTeamMember,
updateTeamMember,
deleteTeamMember,
} = require("../controllers/teamControllers");

const authorize = require("../middleware/roleMiddleware");
const authenticate = require("../middleware/authMiddleware");

/**

* GET ALL TEAM MEMBERS
  */
  router.get("/", getAllTeamMembers);

/**

* GET TEAM MEMBER BY ID
  */
  router.get("/:id", getTeamMemberById);

/**

* CREATE TEAM MEMBER
  */
  router.post("/", authenticate, authorize("Admin"), createTeamMember);

/**

* UPDATE TEAM MEMBER
  */
  router.put("/:id", authenticate, authorize("Admin"), updateTeamMember);

/**

* DELETE TEAM MEMBER
  */
  router.delete("/:id", authenticate, authorize("Admin"), deleteTeamMember);

module.exports = router;
