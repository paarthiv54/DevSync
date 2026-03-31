import React, { useEffect, useState } from "react";
import styled, { keyframes } from "styled-components";
import SearchIcon from "@mui/icons-material/Search";
import { useSelector } from "react-redux";
import AccountCircleOutlinedIcon from "@mui/icons-material/AccountCircleOutlined";
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import MenuIcon from "@mui/icons-material/Menu";
import { IconButton } from "@mui/material";
import { Forum, NotificationsRounded } from "@mui/icons-material";
import Badge from "@mui/material/Badge";
import { useDispatch } from "react-redux";
import Avatar from "@mui/material/Avatar";
import AccountDialog from "./AccountDialog";
import UserAvatar from "./UserAvatar";
import NotificationDialog from "./NotificationDialog";
import { useNavigate, Link } from "react-router-dom";
import { Folder, Assignment } from "@mui/icons-material";

// ─── Styles ───────────────────────────────────────────────────────────────────

const Container = styled.div`
  position: sticky;
  top: 0;
  height: 60px;
  z-index: 99;
  background: ${({ theme }) => theme.bgLighter};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  display: flex;
  align-items: center;
  padding: 0 20px;
  gap: 12px;
  backdrop-filter: blur(12px);

  @media screen and (max-width: 480px) {
    padding: 0 8px;
  }
`;

const MenuBtn = styled(IconButton)`
  color: ${({ theme }) => theme.textSoft} !important;
  width: 36px !important;
  height: 36px !important;
  border-radius: 10px !important;

  &:hover {
    background: ${({ theme }) => theme.itemHover} !important;
    color: ${({ theme }) => theme.text} !important;
  }
`;

const SearchContainer = styled.div`
  flex: 1;
  max-width: 460px;
  margin: 0 auto;
  position: relative;
`;

const SearchInput = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  background: ${({ theme }) => theme.bg};
  border: 1.5px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  padding: 0 14px;
  height: 38px;
  transition: all 0.25s ease;

  &:focus-within {
    border-color: ${({ theme }) => theme.primary};
    box-shadow: 0 0 0 3px ${({ theme }) => theme.primary + "20"};
    background: ${({ theme }) => theme.bgLighter};
  }

  input {
    flex: 1;
    border: none;
    background: transparent;
    color: ${({ theme }) => theme.text};
    font-size: 14px;
    font-family: inherit;
    outline: none;

    &::placeholder {
      color: ${({ theme }) => theme.textMuted || theme.textSoft};
      font-size: 13px;
    }
  }

  svg {
    color: ${({ theme }) => theme.textMuted || theme.textSoft};
    font-size: 18px;
  }
`;

const DropdownContainer = styled.div`
  position: absolute;
  top: 50px;
  left: 0;
  right: 0;
  background: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.border};
  border-radius: 12px;
  overflow: hidden;
  box-shadow: 0 16px 40px rgba(0,0,0,0.4);
  z-index: 100;
  max-height: 480px;
  overflow-y: auto;
  
  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${({ theme }) => theme.primary + '50'}; border-radius: 4px; }
`;

const SectionTitleSearch = styled.div`
  padding: 10px 16px;
  font-size: 11px;
  font-weight: 700;
  color: ${({ theme }) => theme.textSoft};
  text-transform: uppercase;
  background: ${({ theme }) => theme.bg};
  border-bottom: 1px solid ${({ theme }) => theme.border};
  border-top: 1px solid ${({ theme }) => theme.border};
  &:first-child { border-top: none; }
`;

const ResultItem = styled.div`
  padding: 12px 16px;
  display: flex;
  align-items: center;
  gap: 12px;
  cursor: pointer;
  transition: all 0.2s;
  text-decoration: none;
  color: ${({ theme }) => theme.text};
  border-bottom: 1px solid ${({ theme }) => theme.border + "50"};
  
  &:last-child { border-bottom: none; }
  
  &:hover {
    background: ${({ theme }) => theme.itemHover};
  }

  .title { font-size: 14px; font-weight: 500; }
  .desc { font-size: 12px; color: ${({ theme }) => theme.textSoft}; margin-top: 2px; }
`;

const UserActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  margin-left: auto;
`;

const IconBtn = styled.div`
  width: 36px;
  height: 36px;
  border-radius: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  color: ${({ theme }) => theme.textSoft};
  transition: all 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.itemHover};
    color: ${({ theme }) => theme.text};
  }

  .MuiSvgIcon-root {
    font-size: 20px;
  }
`;

const AvatarWrap = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 4px 10px 4px 4px;
  border-radius: 40px;
  cursor: pointer;
  transition: all 0.2s ease;
  border: 1.5px solid transparent;

  &:hover {
    background: ${({ theme }) => theme.itemHover};
    border-color: ${({ theme }) => theme.border};
  }
`;

const UserName = styled.span`
  font-size: 13px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};

  @media (max-width: 768px) {
    display: none;
  }
`;

const OnlineDot = styled.div`
  width: 8px;
  height: 8px;
  border-radius: 50%;
  background: #00E5A0;
  border: 2px solid ${({ theme }) => theme.bgLighter};
  position: absolute;
  bottom: 1px;
  right: 1px;
`;

const AvatarWrapper = styled.div`
  position: relative;
`;

const SignInButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 18px;
  border-radius: 12px;
  background: ${({ theme }) => theme.gradientPrimary || "linear-gradient(135deg, #7C4DFF, #9C6FFF)"};
  color: white;
  border: none;
  cursor: pointer;
  font-size: 14px;
  font-weight: 600;
  font-family: inherit;
  transition: all 0.25s ease;

  &:hover {
    transform: translateY(-1px);
    box-shadow: 0 6px 20px ${({ theme }) => theme.primary + "50"};
  }
`;

const StyledBadge = styled(Badge)`
  .MuiBadge-badge {
    background: ${({ theme }) => theme.primary} !important;
    color: white !important;
    font-size: 10px !important;
    min-width: 16px !important;
    height: 16px !important;
  }
`;

// ─── Component ────────────────────────────────────────────────────────────────

import { getUsers, notifications, clearNotifications, getProjects, userTasks, searchUsers } from "../api/index";
import { openSnackbar } from "../redux/snackbarSlice";
import { logout } from "../redux/userSlice";

const Navbar = ({ menuOpen, setMenuOpen }) => {
  const [SignUpOpen, setSignUpOpen] = useState(false);
  const [SignInOpen, setSignInOpen] = useState(false);
  const [verifyEmail, setVerifyEmail] = useState(false);
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  const [users, setUsers] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [allTasks, setAllTasks] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchedUsers, setSearchedUsers] = useState([]);
  const token = localStorage.getItem("token");
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);
  const [searchFocused, setSearchFocused] = useState(false);

  useEffect(() => {
    if (token) {
      getUsers(token).then((res) => setUsers(res.data)).catch((err) => {
        if (err.response?.status === 401) dispatch(logout());
      });
      getProjects(token).then((res) => setAllProjects(res.data)).catch(console.error);
      userTasks(token).then((res) => setAllTasks(res.data)).catch(console.error);
    }
  }, [dispatch, token]);

  // Live fetch users based on search query
  useEffect(() => {
    if (searchQuery.trim().length > 0) {
      const delayDebounceFn = setTimeout(() => {
        searchUsers(searchQuery, token)
          .then((res) => {
            setSearchedUsers(Array.isArray(res.data) ? res.data : []);
          })
          .catch(err => console.error(err));
      }, 300);
      return () => clearTimeout(delayDebounceFn);
    } else {
      setSearchedUsers([]);
    }
  }, [searchQuery, token]);

  const getNotifications = async () => {
    try {
      notifications(token).then((res) => {
        setNotification(res.data);
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getNotifications();
  }, []);

  const handleClearNotifications = async () => {
    try {
      await clearNotifications(token);
      setNotification([]);
      dispatch(openSnackbar({ message: "Notifications cleared", severity: "success" }));
    } catch (error) {
      dispatch(openSnackbar({ message: "Failed to clear notifications", severity: "error" }));
    }
  };

  useEffect(() => {
    if (!currentUser && !SignUpOpen) {
      setSignInOpen(true);
      setSignUpOpen(false);
    } else if (!currentUser && SignUpOpen) {
      setSignInOpen(false);
      setSignUpOpen(true);
    }
    if (currentUser && !currentUser.verified) {
      setVerifyEmail(true);
    } else {
      setVerifyEmail(false);
    }
  }, [currentUser, SignInOpen, SignUpOpen, setVerifyEmail, users]);

  // Account dialog
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const id = open ? "simple-popover" : undefined;
  const handleClick = (event) => setAnchorEl(event.currentTarget);
  const handleClose = () => setAnchorEl(null);

  // Notification dialog
  const [anchorEl2, setAnchorEl2] = useState(null);
  const open2 = Boolean(anchorEl2);
  const id2 = open2 ? "simple-popover" : undefined;
  const notificationClick = (event) => setAnchorEl2(event.currentTarget);
  const notificationClose = () => setAnchorEl2(null);

  return (
    <>
      <Container>
        <MenuBtn onClick={() => setMenuOpen(!menuOpen)} size="small">
          <MenuIcon style={{ fontSize: 20 }} />
        </MenuBtn>

        <SearchContainer>
          <SearchInput>
            <SearchIcon />
            <input
              placeholder="Search projects, tasks, people..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              onFocus={() => setSearchFocused(true)}
              onBlur={() => setTimeout(() => setSearchFocused(false), 200)}
            />
          </SearchInput>

          {searchFocused && searchQuery && (
            <DropdownContainer>
              {(() => {
                const q = searchQuery.toLowerCase();
                const filteredProjects = Array.isArray(allProjects) ? allProjects.filter(p => p.title?.toLowerCase().includes(q)) : [];
                const filteredUsers = searchedUsers;
                const filteredTasks = Array.isArray(allTasks) ? allTasks.filter(t => t.text?.toLowerCase().includes(q) || t.desc?.toLowerCase().includes(q)) : [];

                if (filteredProjects.length === 0 && filteredUsers.length === 0 && filteredTasks.length === 0) {
                  return (
                    <div style={{ padding: '24px', textAlign: 'center', fontSize: 13, color: '#999' }}>
                      No results found for "{searchQuery}"
                    </div>
                  );
                }

                return (
                  <>
                    {filteredProjects.length > 0 && (
                      <>
                        <SectionTitleSearch>Projects</SectionTitleSearch>
                        {filteredProjects.slice(0, 4).map(p => (
                          <ResultItem as={Link} to={`/projects/${p._id}`} key={p._id}>
                            <Folder style={{ color: '#7C4DFF', fontSize: 20 }} />
                            <div>
                              <div className="title">{p.title}</div>
                              {p.desc && <div className="desc">{p.desc.replace(/<[^>]+>/g, '').slice(0, 40)}...</div>}
                            </div>
                          </ResultItem>
                        ))}
                      </>
                    )}
                    {filteredTasks.length > 0 && (
                      <>
                        <SectionTitleSearch>Tasks</SectionTitleSearch>
                        {filteredTasks.slice(0, 4).map(t => (
                          <ResultItem key={t._id}>
                            <Assignment style={{ color: '#00E5A0', fontSize: 20 }} />
                            <div>
                              <div className="title">{t.text}</div>
                              <div className="desc">{t.status || 'Pending'}</div>
                            </div>
                          </ResultItem>
                        ))}
                      </>
                    )}
                    {filteredUsers.length > 0 && (
                      <>
                        <SectionTitleSearch>People</SectionTitleSearch>
                        {filteredUsers.slice(0, 4).map(u => (
                          <ResultItem key={u._id}>
                            <Avatar src={u.img} sx={{ width: 28, height: 28, fontSize: 12 }}>{u.name?.[0]}</Avatar>
                            <div>
                              <div className="title">{u.name}</div>
                              <div className="desc">{u.email}</div>
                            </div>
                          </ResultItem>
                        ))}
                      </>
                    )}
                  </>
                );
              })()}
            </DropdownContainer>
          )}
        </SearchContainer>

        <UserActions>
          {currentUser ? (
            <>
              <IconBtn onClick={() => navigate('/chats')}>
                <Forum style={{ fontSize: 20 }} />
              </IconBtn>

              <IconBtn onClick={notificationClick}>
                <StyledBadge badgeContent={notification.length} max={99}>
                  <NotificationsRounded style={{ fontSize: 20 }} />
                </StyledBadge>
              </IconBtn>

              <AvatarWrap onClick={handleClick}>
                <AvatarWrapper>
                  <UserAvatar
                    user={currentUser}
                    sx={{ width: 32, height: 32 }}
                  />
                  <OnlineDot />
                </AvatarWrapper>
                <UserName>{currentUser.name?.split(' ')[0]}</UserName>
              </AvatarWrap>
            </>
          ) : (
            <SignInButton onClick={() => setSignInOpen(true)}>
              <AccountCircleOutlinedIcon style={{ fontSize: 18 }} />
              Sign In
            </SignInButton>
          )}
        </UserActions>
      </Container>

      {currentUser && (
        <AccountDialog
          open={open}
          anchorEl={anchorEl}
          id={id}
          handleClose={handleClose}
          currentUser={currentUser}
        />
      )}
      {currentUser && (
        <NotificationDialog
          open={open2}
          anchorEl={anchorEl2}
          id={id2}
          handleClose={notificationClose}
          currentUser={currentUser}
          notification={notification}
          handleClearNotifications={handleClearNotifications}
        />
      )}
    </>
  );
};

export default Navbar;
