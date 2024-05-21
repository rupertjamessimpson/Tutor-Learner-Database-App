import React, { useState, useEffect } from "react";
import getPreferenceString from "../../functions/getPreferenceString";
import { Tutor } from '../../types/tutors';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';

function Tutors() {
  const [tutors, setTutors] = useState<Tutor[]>([]);
  const [selectedTutor, setSelectedTutor] = useState<Tutor | null>(null);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [confirmDeleteDialogOpen, setConfirmDeleteDialogOpen] = useState<boolean>(false);

  useEffect(() => {
    fetchTutors();
  }, []);

  const fetchTutors = async () => {
    try {
      const response = await fetch('http://localhost:5001/tutors');
      const data = await response.json();
      setTutors(data);
    } catch (error) {
      console.error('Error fetching tutors:', error);
    }
  };

  const handleListItemClick = (tutor: Tutor) => {
    setSelectedTutor(tutor);
  };

  const handleClose = () => {
    setSelectedTutor(null);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
  };

  const handleDelete = async () => {
    setConfirmDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await fetch(`http://localhost:5001/tutors/${selectedTutor?.tutor_id}`, {
        method: 'DELETE',
      });
      fetchTutors();
      handleClose();
    } catch (error) {
      console.error('Error deleting tutor:', error);
    }
    setConfirmDeleteDialogOpen(false);
  };

  const handleCancelDelete = () => {
    setConfirmDeleteDialogOpen(false);
  };

  const filteredTutors = tutors.filter((tutor) => {
    const fullName = `${tutor.first_name} ${tutor.last_name}`.toLowerCase();
    return fullName.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="tutor-component">
      <div className="search-tutors-container">
        <TextField
          className="search-tutors"
          label="Search tutors"
          variant="outlined"
          value={searchTerm}
          onChange={handleSearch}
          margin="normal"
        />
      </div>
      <div className="tutor-list-container">
        <List className="tutor-list">
          {filteredTutors.map((tutor) => (
            <ListItem key={tutor.tutor_id} button onClick={() => handleListItemClick(tutor)}>
              <ListItemText
                primary={`${tutor.first_name} ${tutor.last_name}`}
                secondary={`${getPreferenceString(tutor)}`}
              />
            </ListItem>
          ))}
        </List>
        <Dialog
          open={selectedTutor !== null} 
          onClose={handleClose}
          maxWidth="lg"
          fullWidth
        >
          <DialogTitle>{selectedTutor ? `${selectedTutor.first_name} ${selectedTutor.last_name}` : "Tutor Information"}</DialogTitle>
          <DialogContent>
            {selectedTutor && (
              <div>
                <p><strong>Email:</strong> {selectedTutor.email}</p>
                <p><strong>Phone:</strong> {selectedTutor.phone}</p>
                <p><strong>Preferences:</strong> {`${getPreferenceString(selectedTutor)}`}</p>
              </div>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleDelete} color="primary">
              Delete
            </Button>
            <Button onClick={handleClose} color="primary">
              Close
            </Button>
          </DialogActions>
        </Dialog>
        <Dialog
          open={confirmDeleteDialogOpen} 
          onClose={handleCancelDelete}
          fullWidth
          maxWidth="sm"
        >
          <DialogTitle>Confirm Delete</DialogTitle>
          <DialogContent>
            <p>Are you sure you want to delete this tutor?</p>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelDelete} color="primary">
              Cancel
            </Button>
            <Button onClick={handleConfirmDelete} color="primary">
              Confirm
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </div>
  );
}

export default Tutors;
