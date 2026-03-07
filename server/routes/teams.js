import express from "express";
import {
    addTeam, getTeam, deleteTeam, updateTeam, addTeamProject,
    inviteTeamMember, verifyInvitationTeam, getTeamMembers,
    removeMember, updateMembers, addPoll, votePoll, deletePoll,
    addAnnouncement, deleteAnnouncement,
    addMeetingNote, deleteMeetingNote,
    addResource, deleteResource,
    getTeamAnalytics
} from "../controllers/teams.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { localVariables } from "../middleware/auth.js";

const router = express.Router();

//create a Team
router.post("/", verifyToken, addTeam);
//get all Teams
router.get("/:id", verifyToken, getTeam)
//delete a Team
router.delete("/:id", verifyToken, deleteTeam)
//update a Team
router.patch("/:id", verifyToken, updateTeam)
//update a team member
router.patch("/member/:id", verifyToken, updateMembers)
//remove a team member
router.patch("/member/remove/:id", verifyToken, removeMember)
//add a team project
router.post("/addProject/:id", verifyToken, addTeamProject)
//invite a team member
router.post("/invite/:id", verifyToken, localVariables, inviteTeamMember)
//verify a invite
router.get("/invite/:code", verifyInvitationTeam)
//get team members
router.get("/members/:id", verifyToken, getTeamMembers)
//add poll
router.post("/:id/polls", verifyToken, addPoll);
//vote poll
router.patch("/:id/polls/vote", verifyToken, votePoll);
//delete poll
router.patch("/:id/polls/delete", verifyToken, deletePoll);
//analytics
router.get("/:id/analytics", verifyToken, getTeamAnalytics);
//announcements
router.post("/:id/announcements", verifyToken, addAnnouncement);
router.patch("/:id/announcements/delete", verifyToken, deleteAnnouncement);
//meeting notes
router.post("/:id/meeting-notes", verifyToken, addMeetingNote);
router.patch("/:id/meeting-notes/delete", verifyToken, deleteMeetingNote);
//resources
router.post("/:id/resources", verifyToken, addResource);
router.patch("/:id/resources/delete", verifyToken, deleteResource);

export default router;