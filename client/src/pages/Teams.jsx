import React, { useEffect } from "react";
import { Fragment, useState, useRef } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import { Add, Delete, Edit, PersonAdd, DeleteOutline, OpenInNew, Announcement, Notes, Link as LinkIcon, BarChart, History } from "@mui/icons-material";
import { data, tools, members, ideas, tagColors } from "../data/data";
import Card from "../components/Card";
import MemberCard from "../components/MemberCard";
import { CircularProgress, IconButton, Avatar, LinearProgress } from "@mui/material";
import ToolsCard from "../components/ToolsCard";
import IdeaCard from "../components/IdeaCard";
import axios from "axios";
import { useSelector } from "react-redux";
import { openSnackbar } from "../redux/snackbarSlice";
import { useDispatch } from "react-redux";
import InviteMembers from "../components/InviteMembers";
import { getTeams, getTeamAnalytics, addAnnouncement, deleteAnnouncement, addMeetingNote, deleteMeetingNote, addResource, deleteResource } from "../api/index";
import AddNewProject from "../components/AddNewProject";
import UpdateTeam from "../components/UpdateTeam";
import DeletePopup from "../components/DeletePopup";
import CreatePoll from "../components/CreatePoll";
import PollCard from "../components/PollCard";
import { format } from "timeago.js";

// ─── Styled Components ───────────────────────────────────────────────────────

const Container = styled.div`
  padding: 14px 14px;
  @media screen and (max-width: 480px) { padding: 10px 4px; }
`;
const Header = styled.div``;
const Column = styled.div`
  display: flex; flex-direction: row; margin: 12px 0px;
  @media screen and (max-width: 480px) { margin: 6px 0px; flex-direction: column; }
`;
const Flex = styled.div`display: flex; flex-direction: row; align-items: center; gap: 10px;`;
const Title = styled.div`
  width: 100%; font-size: 30px; font-weight: 500; color: ${({ theme }) => theme.text};
  margin-top: 6px; flex: 7; line-height: 1.5; overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;
  @media screen and (max-width: 480px) { font-size: 24px; }
`;
const Desc = styled.div`
  font-size: 13px; font-weight: 400; color: ${({ theme }) => theme.soft2};
  margin-top: 6px; flex: 7; line-height: 1.5; overflow: hidden; text-overflow: ellipsis;
  display: -webkit-box; -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;
`;
const Members = styled.div`display: flex; flex-direction: row; align-items: center; margin: 8px 0px 0px 0px;`;
const AvatarGroup = styled.div`display: flex; align-items: center; margin-right: 12px;`;
const InviteButton = styled.button`
  padding: 6px 14px; background-color: transparent; border: 1px solid ${({ theme }) => theme.primary};
  color: ${({ theme }) => theme.primary}; border-radius: 10px; font-weight: 500; cursor: pointer;
  display: flex; align-items: center; gap: 5px; font-size: 13px; transition: all 0.3s ease; margin: 0px 16px;
  &:hover { background-color: ${({ theme }) => theme.primary}; color: ${({ theme }) => theme.text}; }
`;
const Hr = styled.hr`margin: 18px 0px; border: 0.5px solid ${({ theme }) => theme.soft + "99"};`;
const Body = styled.div`
  display: flex; flex-direction: row; justify-content: start;
  gap: 20px;
  @media screen and (max-width: 1000px) { flex-direction: column; gap: 10px; }
`;
const Work = styled.div`flex: 4;`;
const ItemWrapper = styled.div`
  width: 100%; height: 100%; padding: 4px 8px; text-align: left; margin: 2px;
  font-size: 16px; font-weight: 500; color: ${({ theme }) => theme.text};
  @media screen and (max-width: 480px) { width: 95%; }
`;
const Top = styled.div`
  display: flex; flex-direction: row; justify-content: space-between;
  align-items: center; height: 30px; margin-bottom: 4px;
`;
const Text = styled.div`
  font-size: 16px; font-weight: 500; color: ${({ theme }) => theme.text};
  display: flex; align-items: center; gap: 8px;
`;
const Span = styled.span`color: ${({ theme }) => theme.soft2}; font-weight: 400; margin-left: 8px;`;
const Wrapper = styled.div`
  padding: 12px 0px; display: grid; grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
`;
const AddNewButton = styled.div`
  padding: 5px; background-color: transparent; display: flex; align-items: center;
  justify-content: center; border-radius: 10px;
  background-color: ${({ theme }) => theme.primary + "33"}; color: ${({ theme }) => theme.primary}; cursor: pointer;
`;
const HrHor = styled.div`border: 0.5px solid ${({ theme }) => theme.soft + "99"};`;
const IcoBtn = styled(IconButton)`color: ${({ theme }) => theme.textSoft} !important;`;
const Extra = styled.div`flex: 2;`;
const SubCards = styled.div`
  padding: 10px 12px 18px 12px; text-align: left; margin: 12px 0px; border-radius: 10px;
  background-color: ${({ theme }) => theme.card + "99"}; color: ${({ theme }) => theme.text};
  box-shadow: 0 0 16px 0 rgba(0, 0, 0, 0.09);
`;
const SubCardTop = styled.div`
  display: flex; flex-direction: row; justify-content: space-between; align-items: center;
  padding: 3px 4px; color: ${({ theme }) => theme.text};
`;
const SubCardsTitle = styled.div`
  font-size: 18px; font-weight: 500; color: ${({ theme }) => theme.text}; line-height: 1.5;
  overflow: hidden; text-overflow: ellipsis; display: -webkit-box;
  -webkit-line-clamp: 2; line-clamp: 2; -webkit-box-orient: vertical;
`;
const Tools = styled.div`display: flex; flex-direction: row; align-items: center; gap: 8px; flex-wrap: wrap; padding: 8px 8px;`;

// ─── New Feature Styled Components ──────────────────────────────────────────

const AnnouncementCard = styled.div`
  background: ${({ theme, pinned }) => pinned ? theme.primary + "18" : theme.bg};
  border: 1px solid ${({ theme, pinned }) => pinned ? theme.primary + "60" : theme.soft + "40"};
  border-radius: 10px; padding: 12px 14px; margin-bottom: 8px;
  display: flex; justify-content: space-between; align-items: flex-start;
`;
const AnnouncementTitle = styled.div`font-size: 14px; font-weight: 600; color: ${({ theme }) => theme.text};`;
const AnnouncementDesc = styled.div`font-size: 12px; color: ${({ theme }) => theme.textSoft || theme.soft2}; margin-top: 4px;`;
const AnnouncementMeta = styled.div`font-size: 10px; color: ${({ theme }) => theme.soft2}; margin-top: 6px;`;

const NoteCard = styled.div`
  background: ${({ theme }) => theme.bg}; border: 1px solid ${({ theme }) => theme.soft + "40"};
  border-left: 3px solid ${({ theme }) => theme.primary}; border-radius: 8px;
  padding: 12px 14px; margin-bottom: 8px; display: flex; justify-content: space-between; align-items: flex-start;
`;
const NoteTitle = styled.div`font-size: 14px; font-weight: 600; color: ${({ theme }) => theme.text};`;
const NoteContent = styled.div`font-size: 12px; color: ${({ theme }) => theme.textSoft || theme.soft2}; margin-top: 4px; white-space: pre-wrap;`;
const NoteMeta = styled.div`font-size: 10px; color: ${({ theme }) => theme.soft2}; margin-top: 6px;`;

const ResourceCard = styled.a`
  display: flex; align-items: center; justify-content: space-between;
  background: ${({ theme }) => theme.bg}; border: 1px solid ${({ theme }) => theme.soft + "40"};
  border-radius: 8px; padding: 10px 14px; margin-bottom: 8px; text-decoration: none;
  transition: border-color 0.2s;
  &:hover { border-color: ${({ theme }) => theme.primary + "80"}; }
`;
const ResourceTitle = styled.div`font-size: 13px; font-weight: 600; color: ${({ theme }) => theme.text};`;
const ResourceCategory = styled.span`
  font-size: 10px; padding: 2px 8px; border-radius: 20px;
  background: ${({ theme }) => theme.primary + "25"}; color: ${({ theme }) => theme.primary};
  margin-left: 8px;
`;

const ActivityItem = styled.div`
  display: flex; align-items: flex-start; gap: 10px; padding: 8px 0;
  border-bottom: 1px solid ${({ theme }) => theme.soft + "20"};
  &:last-child { border-bottom: none; }
`;
const ActivityDot = styled.div`
  width: 8px; height: 8px; border-radius: 50%; background: ${({ theme }) => theme.primary};
  margin-top: 5px; flex-shrink: 0;
`;
const ActivityMsg = styled.div`font-size: 12px; color: ${({ theme }) => theme.textSoft || theme.soft2};`;
const ActivityTime = styled.div`font-size: 10px; color: ${({ theme }) => theme.soft2}; margin-top: 2px;`;

const StatBar = styled.div`
  display: flex; align-items: center; gap: 10px; margin-bottom: 10px;
`;
const StatLabel = styled.div`font-size: 12px; color: ${({ theme }) => theme.textSoft || theme.soft2}; min-width: 90px;`;
const StatValue = styled.div`font-size: 12px; font-weight: 600; color: ${({ theme }) => theme.text}; min-width: 30px; text-align: right;`;

const AnalyticsStat = styled.div`
  display: flex; flex-direction: column; align-items: center; justify-content: center;
  padding: 12px; border-radius: 10px; background: ${({ theme }) => theme.bg};
  border: 1px solid ${({ theme }) => theme.soft + "30"};
`;
const AnalyticsStatValue = styled.div`font-size: 24px; font-weight: 700; color: ${({ theme }) => theme.primary};`;
const AnalyticsStatLabel = styled.div`font-size: 11px; color: ${({ theme }) => theme.soft2}; text-align: center; margin-top: 2px;`;

const InputBox = styled.div`
  display: flex; flex-direction: column; gap: 8px; margin-top: 10px;
  padding: 12px; background: ${({ theme }) => theme.bg}; border-radius: 8px;
  border: 1px solid ${({ theme }) => theme.soft + "40"};
`;
const StyledInput = styled.input`
  background: transparent; border: none; border-bottom: 1px solid ${({ theme }) => theme.soft + "60"};
  color: ${({ theme }) => theme.text}; font-size: 13px; padding: 6px 4px; outline: none; width: 100%;
  &::placeholder { color: ${({ theme }) => theme.soft2}; }
`;
const StyledTextarea = styled.textarea`
  background: transparent; border: 1px solid ${({ theme }) => theme.soft + "40"};
  border-radius: 6px; color: ${({ theme }) => theme.text}; font-size: 13px;
  padding: 8px; outline: none; width: 100%; resize: vertical; font-family: inherit;
  &::placeholder { color: ${({ theme }) => theme.soft2}; }
`;
const SubmitBtn = styled.button`
  background: ${({ theme }) => theme.primary}; color: white; border: none;
  border-radius: 8px; padding: 7px 16px; font-size: 13px; font-weight: 600;
  cursor: pointer; align-self: flex-end; transition: opacity 0.2s;
  &:hover { opacity: 0.85; } &:disabled { opacity: 0.5; cursor: not-allowed; }
`;
const LeaderBadge = styled.span`
  font-size: 10px; padding: 2px 8px; border-radius: 20px;
  background: ${({ theme }) => theme.primary + "25"}; color: ${({ theme }) => theme.primary};
  font-weight: 700;
`;

// ─── Main Component ──────────────────────────────────────────────────────────

const Teams = () => {
  const { id } = useParams();
  const [item, setItems] = useState([]);
  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [invitePopup, setInvitePopup] = useState(false);
  const { currentUser } = useSelector((state) => state.user);
  const [newProject, setNewProject] = useState(false);
  const [user, setUser] = useState(JSON.parse(localStorage.getItem('user')));
  const [openCreatePoll, setOpenCreatePoll] = useState(false);
  const [openUpdate, setOpenUpdate] = useState({ state: false, type: "all", data: item });
  const [openDelete, setOpenDelete] = useState({ state: false, type: "Team", name: item.name, id: id });
  const token = localStorage.getItem("token");
  const dispatch = useDispatch();

  // Analytics state
  const [analytics, setAnalytics] = useState(null);
  const [analyticsLoading, setAnalyticsLoading] = useState(false);

  // Form states
  const [announcementForm, setAnnouncementForm] = useState({ show: false, title: "", desc: "", pinned: false });
  const [noteForm, setNoteForm] = useState({ show: false, title: "", content: "" });
  const [resourceForm, setResourceForm] = useState({ show: false, title: "", url: "", category: "General" });
  const [submitting, setSubmitting] = useState(false);

  const getTeamDetails = async () => {
    await getTeams(id, token)
      .then((res) => { setItems(res.data); setProjects(res.data.projects); })
      .then(() => { setLoading(false); })
      .catch((err) => {
        dispatch(openSnackbar({ message: err.response?.data?.message || err.message, severity: "error" }));
        setLoading(false);
      });
  };

  const fetchAnalytics = async () => {
    setAnalyticsLoading(true);
    try {
      const res = await getTeamAnalytics(id, token);
      setAnalytics(res.data);
    } catch (err) {
      console.log("Analytics error:", err);
    } finally {
      setAnalyticsLoading(false);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
    getTeamDetails();
    fetchAnalytics();
    setUser(JSON.parse(localStorage.getItem('user')));
  }, [id, currentUser, newProject, openUpdate, openDelete, openCreatePoll]);

  // ─── Announcement handlers ───
  const handleAddAnnouncement = async () => {
    if (!announcementForm.title.trim()) return;
    setSubmitting(true);
    try {
      await addAnnouncement(id, { title: announcementForm.title, desc: announcementForm.desc, pinned: announcementForm.pinned }, token);
      setAnnouncementForm({ show: false, title: "", desc: "", pinned: false });
      dispatch(openSnackbar({ message: "Announcement posted!", type: "success" }));
      getTeamDetails();
    } catch (err) {
      dispatch(openSnackbar({ message: err.response?.data?.message || "Error", type: "error" }));
    } finally { setSubmitting(false); }
  };

  const handleDeleteAnnouncement = async (announcementId) => {
    try {
      await deleteAnnouncement(id, announcementId, token);
      dispatch(openSnackbar({ message: "Announcement deleted", type: "success" }));
      getTeamDetails();
    } catch (err) {
      dispatch(openSnackbar({ message: err.response?.data?.message || "Error", type: "error" }));
    }
  };

  // ─── Meeting Notes handlers ───
  const handleAddNote = async () => {
    if (!noteForm.title.trim()) return;
    setSubmitting(true);
    try {
      await addMeetingNote(id, { title: noteForm.title, content: noteForm.content }, token);
      setNoteForm({ show: false, title: "", content: "" });
      dispatch(openSnackbar({ message: "Meeting note added!", type: "success" }));
      getTeamDetails();
    } catch (err) {
      dispatch(openSnackbar({ message: err.response?.data?.message || "Error", type: "error" }));
    } finally { setSubmitting(false); }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      await deleteMeetingNote(id, noteId, token);
      dispatch(openSnackbar({ message: "Note deleted", type: "success" }));
      getTeamDetails();
    } catch (err) {
      dispatch(openSnackbar({ message: err.response?.data?.message || "Error", type: "error" }));
    }
  };

  // ─── Resources handlers ───
  const handleAddResource = async () => {
    if (!resourceForm.title.trim() || !resourceForm.url.trim()) return;
    setSubmitting(true);
    try {
      await addResource(id, { title: resourceForm.title, url: resourceForm.url, category: resourceForm.category }, token);
      setResourceForm({ show: false, title: "", url: "", category: "General" });
      dispatch(openSnackbar({ message: "Resource added!", type: "success" }));
      getTeamDetails();
    } catch (err) {
      dispatch(openSnackbar({ message: err.response?.data?.message || "Error", type: "error" }));
    } finally { setSubmitting(false); }
  };

  const handleDeleteResource = async (resourceId) => {
    try {
      await deleteResource(id, resourceId, token);
      dispatch(openSnackbar({ message: "Resource deleted", type: "success" }));
      getTeamDetails();
    } catch (err) {
      dispatch(openSnackbar({ message: err.response?.data?.message || "Error", type: "error" }));
    }
  };

  const sortedAnnouncements = item.announcements ? [...(item.announcements)].reverse().sort((a, b) => b.pinned - a.pinned) : [];
  const sortedNotes = item.meetingNotes ? [...(item.meetingNotes)].reverse() : [];
  const sortedResources = item.resources ? [...(item.resources)].reverse() : [];
  const sortedActivity = item.activity ? [...(item.activity)].reverse().slice(0, 10) : [];

  // Leaderboard from analytics
  const leaderboard = analytics?.memberStats ? [...analytics.memberStats].sort((a, b) => b.completed - a.completed) : [];

  return (
    <Container>
      {newProject && <AddNewProject setNewProject={setNewProject} teamId={id} teamProject={true} />}
      {openCreatePoll && <CreatePoll setOpenCreatePoll={setOpenCreatePoll} teamId={id} onPollCreated={() => getTeamDetails()} />}
      {openUpdate.state && <UpdateTeam openUpdate={openUpdate} setOpenUpdate={setOpenUpdate} type={openUpdate.type} />}
      {openDelete.state && <DeletePopup openDelete={openDelete} setOpenDelete={setOpenDelete} type={openDelete.type} />}
      {loading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', margin: '12px 0px', height: '300px' }}>
          <CircularProgress />
        </div>
      ) : (
        <>
          <Header>
            <Flex>
              {item.img !== "" && <Avatar sx={{ width: "50px", height: "50px" }} src={item.img} />}
              <div><Title>{item.name}</Title><Desc>{item.desc}</Desc></div>
            </Flex>
            <Members>
              <AvatarGroup>
                {item.members.map((member) => (
                  <Avatar alt={member.id._id} sx={{ width: "38px", height: "38px", marginRight: "-12px" }} src={member.id.img}>
                    {member.id.name.charAt(0)}
                  </Avatar>
                ))}
              </AvatarGroup>
              <InviteButton onClick={() => setInvitePopup(true)}>
                <PersonAdd sx={{ fontSize: "16px" }} /> Invite
              </InviteButton>
            </Members>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'flex-end' }}>
              <IcoBtn onClick={() => setOpenUpdate({ state: true, type: 'all', data: item })}><Edit sx={{ fontSize: "20px" }} /></IcoBtn>
              <IcoBtn onClick={() => setOpenDelete({ state: true, type: 'Team', name: item.name, id: item._id, token: token })}><Delete sx={{ fontSize: "20px" }} /></IcoBtn>
            </div>
            <Hr />
            {invitePopup && <InviteMembers setInvitePopup={setInvitePopup} id={id} teamInvite={true} />}
          </Header>

          {/* ─── ANNOUNCEMENTS BANNER ─── */}
          {sortedAnnouncements.length > 0 && (
            <div style={{ marginBottom: '12px' }}>
              {sortedAnnouncements.filter(a => a.pinned).map(a => (
                <div key={a._id} style={{ background: 'linear-gradient(90deg, #854CE611, #854CE622)', border: '1px solid #854CE660', borderRadius: '10px', padding: '10px 16px', marginBottom: '6px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                    <span style={{ fontSize: '11px', color: '#854CE6', fontWeight: 700, marginRight: '8px' }}>📌 PINNED</span>
                    <span style={{ fontSize: '14px', fontWeight: 600 }}>{a.title}</span>
                    {a.desc && <p style={{ fontSize: '12px', color: '#888', margin: '4px 0 0' }}>{a.desc}</p>}
                  </div>
                </div>
              ))}
            </div>
          )}

          <Body>
            <Work>
              <Text style={{ fontSize: "20px" }}>Projects</Text>
              <Column>
                <ItemWrapper>
                  <Top>
                    <Text>🔆️ Working <Span>({projects.filter(item => item.status == "Working").length})</Span></Text>
                    <AddNewButton onClick={() => setNewProject(true)}><Add /></AddNewButton>
                  </Top>
                  <Wrapper>
                    {projects.filter(item => item.status == "Working").map((item, idx) => (
                      <Card key={idx} item={item} index={idx} status="Working" tagColor={tagColors[3]} />
                    ))}
                  </Wrapper>
                </ItemWrapper>
                <ItemWrapper>
                  <Top>
                    <Text>📝 Completed <Span>({projects.filter(item => item.status == "Completed").length})</Span></Text>
                  </Top>
                  <Wrapper>
                    {projects.filter(item => item.status == "Completed").map((item, idx) => (
                      <Card key={idx} item={item} index={idx} status="Completed" tagColor={tagColors[3]} />
                    ))}
                  </Wrapper>
                </ItemWrapper>
              </Column>
            </Work>
            <HrHor />
            <Extra>

              {/* ─── POLLS ─── */}
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>Active Polls</SubCardsTitle>
                  <IcoBtn onClick={() => setOpenCreatePoll(true)}><Add sx={{ fontSize: "20px" }} /></IcoBtn>
                </SubCardTop>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '10px' }}>
                  {item.polls && item.polls.length > 0 ? (
                    item.polls.slice().reverse().map((poll) => (
                      <PollCard key={poll._id} poll={poll} teamId={id} currentUserId={currentUser._id} onVote={() => getTeamDetails()} />
                    ))
                  ) : (
                    <div style={{ padding: '10px', textAlign: 'center', color: '#888', fontSize: '14px' }}>No polls created yet.</div>
                  )}
                </div>
              </SubCards>

              {/* ─── ANNOUNCEMENTS ─── */}
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>📢 Announcements</SubCardsTitle>
                  <IcoBtn onClick={() => setAnnouncementForm(f => ({ ...f, show: !f.show }))}><Add sx={{ fontSize: "20px" }} /></IcoBtn>
                </SubCardTop>
                {announcementForm.show && (
                  <InputBox>
                    <StyledInput placeholder="Title*" value={announcementForm.title} onChange={e => setAnnouncementForm(f => ({ ...f, title: e.target.value }))} />
                    <StyledInput placeholder="Description (optional)" value={announcementForm.desc} onChange={e => setAnnouncementForm(f => ({ ...f, desc: e.target.value }))} />
                    <label style={{ fontSize: '12px', display: 'flex', alignItems: 'center', gap: '6px', color: '#888', cursor: 'pointer' }}>
                      <input type="checkbox" checked={announcementForm.pinned} onChange={e => setAnnouncementForm(f => ({ ...f, pinned: e.target.checked }))} />
                      Pin this announcement
                    </label>
                    <SubmitBtn onClick={handleAddAnnouncement} disabled={submitting}>
                      {submitting ? <CircularProgress size={14} color="inherit" /> : "Post"}
                    </SubmitBtn>
                  </InputBox>
                )}
                <div style={{ marginTop: '10px' }}>
                  {sortedAnnouncements.length > 0 ? sortedAnnouncements.map(a => (
                    <AnnouncementCard key={a._id} pinned={a.pinned}>
                      <div style={{ flex: 1 }}>
                        <AnnouncementTitle>{a.pinned ? "📌 " : ""}{a.title}</AnnouncementTitle>
                        {a.desc && <AnnouncementDesc>{a.desc}</AnnouncementDesc>}
                        <AnnouncementMeta>By {a.createdByName} • {format(a.createdAt)}</AnnouncementMeta>
                      </div>
                      <IcoBtn size="small" onClick={() => handleDeleteAnnouncement(a._id)} style={{ padding: '2px', opacity: 0.5 }}>
                        <DeleteOutline sx={{ fontSize: 16 }} />
                      </IcoBtn>
                    </AnnouncementCard>
                  )) : (
                    <div style={{ padding: '10px', textAlign: 'center', color: '#888', fontSize: '14px' }}>No announcements yet.</div>
                  )}
                </div>
              </SubCards>

              {/* ─── MEETING NOTES ─── */}
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>📝 Meeting Notes</SubCardsTitle>
                  <IcoBtn onClick={() => setNoteForm(f => ({ ...f, show: !f.show }))}><Add sx={{ fontSize: "20px" }} /></IcoBtn>
                </SubCardTop>
                {noteForm.show && (
                  <InputBox>
                    <StyledInput placeholder="Note title*" value={noteForm.title} onChange={e => setNoteForm(f => ({ ...f, title: e.target.value }))} />
                    <StyledTextarea rows={4} placeholder="Write meeting notes..." value={noteForm.content} onChange={e => setNoteForm(f => ({ ...f, content: e.target.value }))} />
                    <SubmitBtn onClick={handleAddNote} disabled={submitting}>
                      {submitting ? <CircularProgress size={14} color="inherit" /> : "Save Note"}
                    </SubmitBtn>
                  </InputBox>
                )}
                <div style={{ marginTop: '10px' }}>
                  {sortedNotes.length > 0 ? sortedNotes.map(note => (
                    <NoteCard key={note._id}>
                      <div style={{ flex: 1 }}>
                        <NoteTitle>{note.title}</NoteTitle>
                        {note.content && <NoteContent>{note.content}</NoteContent>}
                        <NoteMeta>By {note.createdByName} • {format(note.createdAt)}</NoteMeta>
                      </div>
                      <IcoBtn size="small" onClick={() => handleDeleteNote(note._id)} style={{ padding: '2px', opacity: 0.5 }}>
                        <DeleteOutline sx={{ fontSize: 16 }} />
                      </IcoBtn>
                    </NoteCard>
                  )) : (
                    <div style={{ padding: '10px', textAlign: 'center', color: '#888', fontSize: '14px' }}>No meeting notes yet.</div>
                  )}
                </div>
              </SubCards>

              {/* ─── RESOURCES ─── */}
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>🔗 Team Resources</SubCardsTitle>
                  <IcoBtn onClick={() => setResourceForm(f => ({ ...f, show: !f.show }))}><Add sx={{ fontSize: "20px" }} /></IcoBtn>
                </SubCardTop>
                {resourceForm.show && (
                  <InputBox>
                    <StyledInput placeholder="Title*" value={resourceForm.title} onChange={e => setResourceForm(f => ({ ...f, title: e.target.value }))} />
                    <StyledInput placeholder="URL* (https://...)" value={resourceForm.url} onChange={e => setResourceForm(f => ({ ...f, url: e.target.value }))} />
                    <StyledInput placeholder="Category (e.g. Design, Docs, API)" value={resourceForm.category} onChange={e => setResourceForm(f => ({ ...f, category: e.target.value }))} />
                    <SubmitBtn onClick={handleAddResource} disabled={submitting}>
                      {submitting ? <CircularProgress size={14} color="inherit" /> : "Add Resource"}
                    </SubmitBtn>
                  </InputBox>
                )}
                <div style={{ marginTop: '10px' }}>
                  {sortedResources.length > 0 ? sortedResources.map(r => (
                    <div key={r._id} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <ResourceCard href={r.url} target="_blank" rel="noopener noreferrer" style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <ResourceTitle>{r.title}</ResourceTitle>
                          <ResourceCategory>{r.category}</ResourceCategory>
                        </div>
                        <OpenInNew sx={{ fontSize: 14, opacity: 0.5 }} />
                      </ResourceCard>
                      <IcoBtn size="small" onClick={() => handleDeleteResource(r._id)} style={{ padding: '2px', opacity: 0.5 }}>
                        <DeleteOutline sx={{ fontSize: 16 }} />
                      </IcoBtn>
                    </div>
                  )) : (
                    <div style={{ padding: '10px', textAlign: 'center', color: '#888', fontSize: '14px' }}>No resources added yet.</div>
                  )}
                </div>
              </SubCards>

              {/* ─── ANALYTICS ─── */}
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>📊 Team Analytics</SubCardsTitle>
                  <IcoBtn onClick={fetchAnalytics}><BarChart sx={{ fontSize: "20px" }} /></IcoBtn>
                </SubCardTop>
                {analyticsLoading ? (
                  <div style={{ display: 'flex', justifyContent: 'center', padding: '20px' }}><CircularProgress size={24} /></div>
                ) : analytics ? (
                  <>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '8px', margin: '12px 0' }}>
                      <AnalyticsStat>
                        <AnalyticsStatValue>{analytics.totalTasks}</AnalyticsStatValue>
                        <AnalyticsStatLabel>Total Tasks</AnalyticsStatLabel>
                      </AnalyticsStat>
                      <AnalyticsStat>
                        <AnalyticsStatValue>{analytics.completedTasks}</AnalyticsStatValue>
                        <AnalyticsStatLabel>Completed</AnalyticsStatLabel>
                      </AnalyticsStat>
                      <AnalyticsStat>
                        <AnalyticsStatValue>{analytics.projectStats?.total || 0}</AnalyticsStatValue>
                        <AnalyticsStatLabel>Projects</AnalyticsStatLabel>
                      </AnalyticsStat>
                    </div>
                    {analytics.totalTasks > 0 && (
                      <div style={{ marginBottom: '12px' }}>
                        <div style={{ fontSize: '11px', color: '#888', marginBottom: '4px' }}>
                          Overall Progress: {Math.round((analytics.completedTasks / analytics.totalTasks) * 100)}%
                        </div>
                        <LinearProgress variant="determinate" value={Math.round((analytics.completedTasks / analytics.totalTasks) * 100)} sx={{ borderRadius: '4px', backgroundColor: '#44446620', '& .MuiLinearProgress-bar': { backgroundColor: '#854CE6' } }} />
                      </div>
                    )}
                  </>
                ) : (
                  <div style={{ padding: '10px', textAlign: 'center', color: '#888', fontSize: '14px' }}>Click refresh to load analytics.</div>
                )}
              </SubCards>

              {/* ─── LEADERBOARD ─── */}
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>🏆 Leaderboard</SubCardsTitle>
                </SubCardTop>
                <div style={{ marginTop: '10px' }}>
                  {leaderboard.length > 0 ? leaderboard.map((m, idx) => (
                    <StatBar key={m.id}>
                      <span style={{ fontSize: '16px', minWidth: '24px' }}>{idx === 0 ? "🥇" : idx === 1 ? "🥈" : idx === 2 ? "🥉" : `${idx + 1}.`}</span>
                      <Avatar src={m.img} sx={{ width: 28, height: 28, fontSize: 13 }}>{m.name?.[0]}</Avatar>
                      <StatLabel style={{ minWidth: '80px', flex: 1 }}>{m.name}</StatLabel>
                      <div style={{ flex: 2 }}>
                        <LinearProgress
                          variant="determinate"
                          value={leaderboard[0].assigned > 0 ? Math.round((m.completed / leaderboard[0].assigned) * 100) : 0}
                          sx={{ borderRadius: '4px', backgroundColor: '#44446620', '& .MuiLinearProgress-bar': { backgroundColor: '#854CE6' } }}
                        />
                      </div>
                      <StatValue>{m.completed}/{m.assigned}</StatValue>
                    </StatBar>
                  )) : (
                    <div style={{ padding: '10px', textAlign: 'center', color: '#888', fontSize: '14px' }}>No task data yet.</div>
                  )}
                </div>
              </SubCards>

              {/* ─── ACTIVITY FEED ─── */}
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>⚡ Activity Feed</SubCardsTitle>
                </SubCardTop>
                <div style={{ marginTop: '10px' }}>
                  {sortedActivity.length > 0 ? sortedActivity.map((act, idx) => (
                    <ActivityItem key={idx}>
                      <ActivityDot />
                      <div>
                        <ActivityMsg>{act.message}</ActivityMsg>
                        <ActivityTime>{format(act.createdAt)}</ActivityTime>
                      </div>
                    </ActivityItem>
                  )) : (
                    <div style={{ padding: '10px', textAlign: 'center', color: '#888', fontSize: '14px' }}>No activity yet.</div>
                  )}
                </div>
              </SubCards>

              {/* ─── MEMBERS ─── */}
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>Members</SubCardsTitle>
                  <IcoBtn onClick={() => setOpenUpdate({ state: true, type: 'member', data: item })}><Edit sx={{ fontSize: "16px" }} /></IcoBtn>
                </SubCardTop>
                {item.members.map((member) => (<MemberCard member={member} />))}
              </SubCards>

              {/* ─── TOOLS ─── */}
              <SubCards>
                <SubCardTop>
                  <SubCardsTitle>Tools</SubCardsTitle>
                  <IcoBtn onClick={() => setOpenUpdate({ state: true, type: 'tool', data: item })}><Edit sx={{ fontSize: "16px" }} /></IcoBtn>
                </SubCardTop>
                <Tools>
                  {item.tools.map((tool) => (<ToolsCard tool={tool} />))}
                </Tools>
              </SubCards>

            </Extra>
          </Body>
        </>
      )}
    </Container>
  );
};

export default Teams;
