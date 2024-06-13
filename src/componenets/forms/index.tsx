import React, { useState } from "react";
import { Box, ToggleButton, ToggleButtonGroup } from '@mui/material';
import LearnerForm from "./learnerForm";
import TutorForm from "./tutorForm";

function Forms() {
  const [selectedForm, setSelectedForm] = useState<"tutor" | "learner">("tutor");

  const handleFormChange = (event: React.MouseEvent<HTMLElement>, newForm: "tutor" | "learner" | null) => {
    if (newForm !== null) {
      setSelectedForm(newForm);
    }
  };

  return (
    <Box sx={{ textAlign: 'center', pt: 5 }}>
      <ToggleButtonGroup
        color="primary"
        value={selectedForm}
        exclusive
        onChange={handleFormChange}
        aria-label="form selection"
      >
        <ToggleButton value="tutor">Tutor Form</ToggleButton>
        <ToggleButton value="learner">Learner Form</ToggleButton>
      </ToggleButtonGroup>
      {selectedForm === "tutor" && <TutorForm />}
      {selectedForm === "learner" && <LearnerForm />}
    </Box>
  );
}

export default Forms;