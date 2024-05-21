import React, { useState, useEffect } from "react";
import { Learner } from '../../types/learners';
import { List, ListItem, ListItemText, Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@mui/material';
import getLevelString from "../../functions/getLevelString";

function Learners() {
	const [learners, setLearners] = useState<Learner[]>([]);
	const [selectedLearner, setSelectedLearner] = useState<Learner | null>(null);
	const [searchTerm, setSearchTerm] = useState<string>('');

	useEffect(() => {
		fetchLearners();
	}, []);

	const fetchLearners = async () => {
		try {
			const response = await fetch('http://localhost:5001/learners');
			const data = await response.json();
			setLearners(data);
		} catch (error) {
			console.error('Error fetching learners:', error);
		}
	};

	const handleListItemClick = (learner: Learner) => {
		setSelectedLearner(learner);
	};

	const handleClose = () => {
		setSelectedLearner(null);
	};

	const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
			setSearchTerm(event.target.value);
	};

	const filteredLearners = learners.filter((learner) => {
		const fullName = `${learner.first_name} ${learner.last_name}`.toLowerCase();
		return fullName.includes(searchTerm.toLowerCase());
	});

	return (
		<div className="learner-component">
			<div className="search-learners-container">
				<TextField
					className="search-learners"
					label="Search Learners"
					variant="outlined"
					value={searchTerm}
					onChange={handleSearch}
					margin="normal"
				/>
			</div>
				<div className="learner-list-container">
						<List className="learner-list">
							{filteredLearners.map((learner) => (
								<ListItem key={learner.learner_id} button onClick={() => handleListItemClick(learner)}>
									<ListItemText
										primary={`${learner.first_name} ${learner.last_name}`}
										secondary={`${getLevelString(learner.level)}`}
									/>
								</ListItem>
							))}
						</List>
						<Dialog 
							open={selectedLearner !== null} 
							onClose={handleClose}
							maxWidth="lg"
							fullWidth>
							<DialogTitle>{selectedLearner ? `${selectedLearner.first_name} ${selectedLearner.last_name}` : "Learner Information"}</DialogTitle>
								<DialogContent>
									{selectedLearner && (
										<div>
											<p><strong>Email:</strong> {selectedLearner.email}</p>
											<p><strong>Phone:</strong> {selectedLearner.phone}</p>
											<p><strong>Level:</strong> {`${getLevelString(selectedLearner.level)}`}</p>
										</div>
									)}
								</DialogContent>
								<DialogActions>
										<Button onClick={handleClose} color="primary">
												Close
										</Button>
								</DialogActions>
						</Dialog>
			</div>
		</div>
	);
}

export default Learners;