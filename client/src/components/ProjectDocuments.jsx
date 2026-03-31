import React, { useState } from 'react';
import styled from 'styled-components';
import { useDispatch, useSelector } from 'react-redux';
import {
  Add,
  InsertDriveFile,
  PictureAsPdf,
  Description,
  Link as LinkIcon,
  DeleteOutline,
  Slideshow
} from '@mui/icons-material';
import { Modal, IconButton, CircularProgress } from '@mui/material';
import { openSnackbar } from '../redux/snackbarSlice';
import { addProjectDocument, deleteProjectDocument, uploadFile } from '../api';
const Container = styled.div`
  padding: 20px 0px;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 24px;
`;

const Title = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0;
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 8px 16px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  transition: opacity 0.2s;

  &:hover {
    opacity: 0.9;
  }
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 60px 20px;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 12px;
  border: 1px dashed ${({ theme }) => theme.soft2};
  color: ${({ theme }) => theme.textSoft};
  text-align: center;
`;

const DocumentGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
  gap: 20px;
`;

const DocCard = styled.a`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 12px;
  padding: 16px;
  text-decoration: none;
  color: inherit;
  transition: transform 0.2s, box-shadow 0.2s;
  position: relative;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
    border-color: ${({ theme }) => theme.primary + '80'};
  }
`;

const DocHeader = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 12px;
  margin-bottom: 12px;
`;

const IconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 8px;
  background-color: ${({ theme, format }) => {
    if (format === 'PDF') return '#ef444420';
    if (format === 'Google Doc') return '#3b82f620';
    if (format === 'PPT') return '#f59e0b20';
    return theme.primary + '20';
  }};
  color: ${({ theme, format }) => {
    if (format === 'PDF') return '#ef4444';
    if (format === 'Google Doc') return '#3b82f6';
    if (format === 'PPT') return '#f59e0b';
    return theme.primary;
  }};
`;

const DocInfo = styled.div`
  flex: 1;
  min-width: 0;
`;

const DocName = styled.h3`
  font-size: 16px;
  font-weight: 500;
  color: ${({ theme }) => theme.text};
  margin: 0 0 4px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

const DocDate = styled.div`
  font-size: 12px;
  color: ${({ theme }) => theme.textSoft};
`;

const DeleteBtn = styled(IconButton)`
  position: absolute !important;
  top: 8px;
  right: 8px;
  color: ${({ theme }) => theme.textSoft} !important;
  opacity: 0;
  transition: opacity 0.2s !important;

  ${DocCard}:hover & {
    opacity: 1;
  }

  &:hover {
    color: #ef4444 !important;
    background-color: #ef444420 !important;
  }
`;

const Backdrop = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.7);
  backdrop-filter: blur(8px);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Dialog = styled.div`
  background: ${({ theme }) => theme.bgLighter};
  border: 1px solid ${({ theme }) => theme.soft + '80'};
  border-radius: 16px;
  padding: 32px;
  width: 90%;
  max-width: 400px;
  text-align: center;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.4);
`;

const DialogTitle = styled.h3`
  color: ${({ theme }) => theme.text};
  margin-bottom: 12px;
  font-size: 20px;
  font-weight: 600;
`;

const DialogText = styled.p`
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 24px;
  font-size: 14px;
  line-height: 1.5;
`;

const DialogActions = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
`;

const CancelBtn = styled.button`
  padding: 10px 24px;
  background: transparent;
  color: ${({ theme }) => theme.textSoft};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: ${({ theme }) => theme.soft + '40'};
  }
`;

const DeleteConfirmBtn = styled.button`
  padding: 10px 24px;
  background: #ef4444;
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:hover {
    background: #dc2626;
  }
`;

// Modal Styles
const ModalContainer = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 400px;
  background-color: ${({ theme }) => theme.bgLighter};
  border-radius: 12px;
  padding: 24px;
  outline: none;
  box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);

  @media (max-width: 450px) {
    width: 90%;
  }
`;

const ModalTitle = styled.h2`
  font-size: 20px;
  font-weight: 600;
  color: ${({ theme }) => theme.text};
  margin: 0 0 20px 0;
`;

const FormGroup = styled.div`
  margin-bottom: 20px;
`;

const Label = styled.label`
  display: block;
  font-size: 14px;
  font-weight: 500;
  color: ${({ theme }) => theme.textSoft};
  margin-bottom: 8px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.bgDark};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Select = styled.select`
  width: 100%;
  padding: 10px 14px;
  background-color: ${({ theme }) => theme.bgDark};
  border: 1px solid ${({ theme }) => theme.soft};
  border-radius: 8px;
  color: ${({ theme }) => theme.text};
  font-size: 14px;
  outline: none;

  &:focus {
    border-color: ${({ theme }) => theme.primary};
  }
`;

const ModalActions = styled.div`
  display: flex;
  justify-content: flex-end;
  gap: 12px;
  margin-top: 24px;
`;

const SubmitButton = styled.button`
  padding: 8px 20px;
  background-color: ${({ theme }) => theme.primary};
  color: white;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:disabled {
    background-color: ${({ theme }) => theme.soft};
    cursor: not-allowed;
  }
`;

const getValidUrl = (url) => {
  if (!url) return '#';
  const trimmed = url.trim();
  if (trimmed.toLowerCase().startsWith('http://') || trimmed.toLowerCase().startsWith('https://')) {
    return trimmed;
  }
  return `https://${trimmed}`;
};

const ProjectDocuments = ({ project, setProject }) => {
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    format: 'Link',
    link: ''
  });

  const [file, setFile] = useState(null);
  const [uploadPercent, setUploadPercent] = useState(0);
  const [confirmDelete, setConfirmDelete] = useState({ open: false, docId: null });

  const { currentUser } = useSelector((state) => state.user);

  const currentUserAccess = project?.members?.find(
    (m) => m.id?._id === currentUser?._id || m.id === currentUser?._id
  )?.access;

  // Note: Assuming Owner, Admin, Editor can add/delete.
  const canManage = ["Owner", "Admin", "Editor"].includes(currentUserAccess);

  const getFormatIcon = (format, link = '') => {
    const url = link.toLowerCase();
    if (format === 'PDF' || url.includes('.pdf')) return <PictureAsPdf />;
    if (format === 'PPT' || url.includes('.ppt') || url.includes('.pptx')) return <Slideshow />;
    
    switch (format) {
      case 'File Upload':
        return <InsertDriveFile />;
      case 'Google Doc':
        return <Description />;
      default:
        return <LinkIcon />;
    }
  };

  const handleAdd = async (e) => {
    e.preventDefault();
    if (!formData.name) {
      dispatch(openSnackbar({ message: "Name is required.", type: "error" }));
      return;
    }

    if (formData.format === 'File Upload' && !file) {
      dispatch(openSnackbar({ message: "Please select a file to upload.", type: "error" }));
      return;
    }

    if (formData.format !== 'File Upload' && !formData.link) {
      dispatch(openSnackbar({ message: "Link is required.", type: "error" }));
      return;
    }

    setLoading(true);

        if (formData.format === 'File Upload' && file) {
            try {
                const fileName = file.name.toLowerCase();
                let detectedFormat = 'File Upload';
                if (fileName.endsWith('.pdf')) detectedFormat = 'PDF';
                else if (fileName.endsWith('.ppt') || fileName.endsWith('.pptx')) detectedFormat = 'PPT';

                const data = new FormData();
                data.append("file", file);
                
                const token = localStorage.getItem("token");
                const uploadRes = await uploadFile(data, token);
                
                setUploadPercent(100);
                const downloadURL = uploadRes.data.secure_url;

                const documentData = { ...formData, format: detectedFormat, link: downloadURL };
                const res = await addProjectDocument(project._id, documentData, token);

                setProject(res.data.project);
                dispatch(openSnackbar({ message: "Document added successfully!", type: "success" }));
                setOpenModal(false);
                setFormData({ name: '', format: 'Link', link: '' });
                setFile(null);
                setUploadPercent(0);
            } catch (error) {
                console.error("Cloudinary Upload Details:", error);
                dispatch(openSnackbar({ message: 'Upload Failed: ' + (error.response?.data?.message || error.message || 'Unknown Error'), type: "error" }));
            } finally {
                setLoading(false);
            }
        } else {
      try {
        const token = localStorage.getItem("token");
        const res = await addProjectDocument(project._id, formData, token);
        setProject(res.data.project);
        dispatch(openSnackbar({ message: "Document added successfully!", type: "success" }));
        setOpenModal(false);
        setFormData({ name: '', format: 'Link', link: '' });
      } catch (err) {
        dispatch(openSnackbar({
          message: err.response?.data?.message || err.message,
          type: "error"
        }));
      } finally {
        setLoading(false);
      }
    }
  };

  const handleDelete = (e, docId) => {
    e.preventDefault();
    setConfirmDelete({ open: true, docId });
  };

  const executeDelete = async () => {
    const { docId } = confirmDelete;
    try {
      const token = localStorage.getItem("token");
      const res = await deleteProjectDocument(project._id, docId, token);
      setProject(res.data.project);
      dispatch(openSnackbar({ message: "Document removed.", type: "success" }));
    } catch (err) {
      dispatch(openSnackbar({
        message: err.response?.data?.message || err.message,
        type: "error"
      }));
    } finally {
      setConfirmDelete({ open: false, docId: null });
    }
  };

  return (
    <Container>
      <Header>
        <Title>Project Documents</Title>
        {canManage && (
          <AddButton onClick={() => setOpenModal(true)}>
            <Add sx={{ fontSize: 20 }} /> Add Document
          </AddButton>
        )}
      </Header>

      {!project?.documents || project.documents.length === 0 ? (
        <EmptyState>
          <InsertDriveFile sx={{ fontSize: 48, color: 'inherit', mb: 2 }} />
          <h3 style={{ margin: '0 0 8px 0', fontSize: '16px', color: 'inherit' }}>No documents attached</h3>
          <p style={{ margin: 0, fontSize: '14px' }}>
            Add links to Google Docs, Dropbox files, or external resources.
          </p>
        </EmptyState>
      ) : (
        <DocumentGrid>
          {project.documents.map((doc) => (
            <DocCard key={doc._id} href={getValidUrl(doc.link)} target="_blank" rel="noopener noreferrer">
              <DocHeader>
                <IconWrapper format={doc.format}>
                  {getFormatIcon(doc.format, doc.link)}
                </IconWrapper>
                <DocInfo>
                  <DocName>{doc.name}</DocName>
                  <DocDate>{new Date(doc.dateAdded).toLocaleDateString()}</DocDate>
                </DocInfo>
              </DocHeader>

              {/* Preview based on format or link extension */}
              {(doc.format === 'PDF' || doc.link.toLowerCase().includes('.pdf')) && (
                <iframe src={getValidUrl(doc.link)} width="100%" height="200px" style={{ border: 'none', marginTop: '8px', pointerEvents: 'none' }} title={doc.name} />
              )}
              {(doc.format === 'PPT' || doc.link.toLowerCase().includes('.ppt') || doc.link.toLowerCase().includes('.pptx')) && (
                <iframe src={`https://view.officeapps.live.com/op/embed.aspx?src=${encodeURIComponent(getValidUrl(doc.link))}`} width="100%" height="200px" style={{ border: 'none', marginTop: '8px', pointerEvents: 'none' }} title={doc.name} />
              )}

              <div style={{ fontSize: '12px', color: '#888', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <LinkIcon sx={{ fontSize: 14 }} /> {doc.format}
              </div>

              {canManage && (
                <DeleteBtn size="small" onClick={(e) => handleDelete(e, doc._id)}>
                  <DeleteOutline sx={{ fontSize: 20 }} />
                </DeleteBtn>
              )}
            </DocCard>
          ))}
        </DocumentGrid>
      )}

      {/* Add Document Modal */}
      <Modal open={openModal} onClose={() => setOpenModal(false)}>
        <ModalContainer>
          <ModalTitle>Add Document Link</ModalTitle>
          <form onSubmit={handleAdd}>
            <FormGroup>
              <Label>Document Name</Label>
              <Input
                autoFocus
                placeholder="e.g. Project Proposal Q3"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </FormGroup>

            <FormGroup>
              <Label>Document Format</Label>
              <Select
                value={formData.format}
                onChange={(e) => setFormData({ ...formData, format: e.target.value })}
              >
                <option value="Link">External Link</option>
                <option value="File Upload">File Upload (PDF, Doc, etc.)</option>
                <option value="Google Doc">Google Doc / Sheet</option>
                <option value="PDF">External PDF Link</option>
                <option value="PPT">Presentation (PPT)</option>
              </Select>
            </FormGroup>

            {formData.format === 'File Upload' ? (
              <FormGroup>
                <Label>Choose File</Label>
                <Input
                  type="file"
                  onChange={(e) => setFile(e.target.files[0])}
                  required
                />
                {uploadPercent > 0 && uploadPercent < 100 && (
                  <div style={{ marginTop: '8px', fontSize: '12px', color: '#888' }}>
                    Uploading: {uploadPercent}%
                  </div>
                )}
              </FormGroup>
            ) : (
              <FormGroup>
                <Label>URL Link</Label>
                <Input
                  placeholder="https://..."
                  type="url"
                  value={formData.link}
                  onChange={(e) => setFormData({ ...formData, link: e.target.value })}
                  required
                />
              </FormGroup>
            )}

            <ModalActions>
              <SubmitButton
                type="button"
                onClick={() => setOpenModal(false)}
                style={{ backgroundColor: 'transparent', color: '#888' }}
              >
                Cancel
              </SubmitButton>
              <SubmitButton type="submit" disabled={loading}>
                {loading ? <CircularProgress size={20} color="inherit" /> : 'Add Document'}
              </SubmitButton>
            </ModalActions>
          </form>
        </ModalContainer>
      </Modal>
      {/* Delete Confirmation Dialog */}
      {confirmDelete.open && (
        <Backdrop onClick={() => setConfirmDelete({ open: false, docId: null })}>
          <Dialog onClick={(e) => e.stopPropagation()}>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogText>
              Are you sure you want to remove this document? This action cannot be undone.
            </DialogText>
            <DialogActions>
              <CancelBtn onClick={() => setConfirmDelete({ open: false, docId: null })}>
                Cancel
              </CancelBtn>
              <DeleteConfirmBtn onClick={executeDelete}>
                Delete Document
              </DeleteConfirmBtn>
            </DialogActions>
          </Dialog>
        </Backdrop>
      )}
    </Container>
  );
};

export default ProjectDocuments;
