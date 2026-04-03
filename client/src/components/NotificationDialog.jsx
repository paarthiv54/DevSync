import { Avatar, Popover, CircularProgress } from "@mui/material";
import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { verifyTeamInvite, verifyProjectInvite, getUsers } from "../api";
import { updateUser } from "../redux/userSlice";
import { openSnackbar } from "../redux/snackbarSlice";

const Wrapper = styled.div`
  width: 100%;
  min-width: 320px;
  max-width: 420px;
  max-height: 500px;
  display: flex;
  flex-direction: column;
  position: relative;
  padding: 12px 0;
  background-color: ${({ theme }) => theme.bgLighter || theme.card};
  overflow-y: auto;

  &::-webkit-scrollbar { width: 4px; }
  &::-webkit-scrollbar-thumb { background: ${({ theme }) => theme.soft + '80'}; border-radius: 4px; }
`;

const HeadingGroup = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 16px 12px 16px;
  border-bottom: 1px solid ${({ theme }) => theme.soft + "40"};
`;

const Heading = styled.div`
  font-size: 18px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
`;

const ClearButton = styled.button`
  background: transparent;
  border: none;
  color: ${({ theme }) => theme.primary};
  font-size: 13px;
  font-weight: 500;
  cursor: pointer;
  &:hover { text-decoration: underline; }
`;

const Item = styled.div`
  display: flex;
  gap: 12px;
  padding: 14px 16px;
  transition: background 0.2s;
  &:hover { background: ${({ theme }) => theme.itemHover + "40"}; }
`;

const Details = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 6px;
`;

const Title = styled.div`
  font-size: 14px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  text-transform: capitalize;
`;

const Desc = styled.div`
  font-size: 12px;
  font-weight: 400;
  color: ${({ theme }) => theme.textSoft};
  line-height: 1.4;
`;

const ActionGroup = styled.div`
  display: flex;
  gap: 8px;
  margin-top: 4px;
`;

const JoinButton = styled.button`
  padding: 6px 16px;
  background: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 6px;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 6px;
  transition: opacity 0.2s;
  
  &:disabled { opacity: 0.6; cursor: not-allowed; }
  &:hover:not(:disabled) { opacity: 0.9; }
`;

const EmptyMessage = styled.div`
  padding: 40px 20px;
  text-align: center;
  color: ${({ theme }) => theme.textSoft};
  font-size: 14px;
  opacity: 0.7;
`;

const NotificationDialog = ({
  open,
  anchorEl,
  handleClose,
  currentUser,
  notification,
  handleClearNotifications,
}) => {
  const dispatch = useDispatch();
  const [loadingId, setLoadingId] = useState(null);
  const token = localStorage.getItem("token");

  const handleJoin = async (item) => {
    if (!item.data || !item.data.code) {
      dispatch(openSnackbar({ message: "Invalid invitation data", severity: "error" }));
      return;
    }

    setLoadingId(item._id);
    const { code, teamid, projectid, userid, access, role } = item.data;

    const apiCall = item.type === "team" 
      ? verifyTeamInvite(code, teamid, userid, access, role)
      : verifyProjectInvite(code, projectid, userid, access, role);

    apiCall
      .then(async (res) => {
        dispatch(openSnackbar({ message: res.data.Message || "Joined successfully!", severity: "success" }));
        
        // Refresh user data to update workspace list
        await getUsers(token).then((res) => {
          dispatch(updateUser(res.data));
        });

        setLoadingId(null);
        handleClose();
      })
      .catch((err) => {
        dispatch(openSnackbar({ message: err.response?.data?.message || "Action failed", severity: "error" }));
        setLoadingId(null);
      });
  };

  return (
    <Popover
      open={open}
      onClose={handleClose}
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      transformOrigin={{ vertical: "top", horizontal: "right" }}
      PaperProps={{
        sx: {
          borderRadius: "12px",
          marginTop: "8px",
          boxShadow: "0 8px 32px rgba(0,0,0,0.4)",
          border: "1px solid rgba(255,255,255,0.1)"
        }
      }}
    >
      <Wrapper>
        <HeadingGroup>
          <Heading>Notifications</Heading>
          {notification && notification.length > 0 && (
            <ClearButton onClick={handleClearNotifications}>Clear All</ClearButton>
          )}
        </HeadingGroup>

        {notification && notification.length > 0 ? (
          notification.map((item) => (
            <Item key={item._id}>
              <Avatar
                sx={{ width: 36, height: 36, fontSize: 14, bgcolor: (t) => t.primary + '20', color: (t) => t.primary }}
              >
                {item.type?.[0]?.toUpperCase() || 'N'}
              </Avatar>
              <Details>
                <Title>{item.type} Notification</Title>
                <Desc>{item.message}</Desc>
                
                {(item.type === "team" || item.type === "project") && item.data?.code && (
                  <ActionGroup>
                    <JoinButton 
                      disabled={loadingId === item._id} 
                      onClick={() => handleJoin(item)}
                    >
                      {loadingId === item._id ? (
                        <CircularProgress size={14} color="inherit" />
                      ) : "Accept Invitation"}
                    </JoinButton>
                  </ActionGroup>
                )}
              </Details>
            </Item>
          ))
        ) : (
          <EmptyMessage>You're all caught up!</EmptyMessage>
        )}
      </Wrapper>
    </Popover>
  );
};

export default NotificationDialog;
