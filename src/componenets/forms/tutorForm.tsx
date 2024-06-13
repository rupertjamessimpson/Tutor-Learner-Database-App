import { Box, FormControlLabel, Checkbox, FormControl, Card, MenuItem, CardContent, TextField, Select } from '@mui/material';

import { Times } from './times/times';
import { AltTimes } from './times/altTimes';

function TutorForm() {
  return (
    <Box sx={{ pt: 5, pl: 5, pr: 5, pb: 5 }}>
      <Card>
        <CardContent>
          <Box sx={{ pt: 2, textAlign: 'center' }}>
            <h2>Tutor Form</h2>
          </Box>
          <Box sx={{ pt: 3, pl: 5, pr: 5, pb: 5 }}>
            <FormControl fullWidth id="tutors">
              <h2>Name</h2>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
                <TextField label="First Name" fullWidth />
                <TextField label="Last Name" fullWidth />
              </Box>
              <h2>Contact</h2>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
                <TextField label="Email" fullWidth />
                <TextField label="Phone" fullWidth />
              </Box>
            </FormControl>
            <FormControl fullWidth id="tutor_availability">
              <h2>Availability</h2>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
                Monday
                <Select fullWidth>
                  {Times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                <Select fullWidth>
                  {Times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
                Tuesday
                <Select fullWidth>
                  {Times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                <Select fullWidth>
                  {Times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
                Wednesday
                <Select fullWidth>
                  {Times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                <Select fullWidth>
                  {Times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
                Thursday
                <Select fullWidth>
                  {AltTimes.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                <Select fullWidth>
                  {Times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
              <Box sx={{ display: 'flex', gap: 2, mb: 2, mt: 2 }}>
                Friday
                <Select fullWidth>
                  {AltTimes.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
                <Select fullWidth>
                  {Times.map((time) => (
                    <MenuItem key={time} value={time}>
                      {time}
                    </MenuItem>
                  ))}
                </Select>
              </Box>
            </FormControl>
            <FormControl fullWidth id="preferences">
              <h2>Preferences</h2>
              <FormControlLabel control={<Checkbox />} label="Teaching Conversation Class"/>
              <FormControlLabel control={<Checkbox />} label="Working with an ELL with no English"/>
              <FormControlLabel control={<Checkbox />} label="Working with an ELL with basic vocabulary"/>
              <FormControlLabel control={<Checkbox />} label="ESL Intermediate"/>
              <FormControlLabel control={<Checkbox />} label="Citizenship"/>
              <FormControlLabel control={<Checkbox />} label="SPED ELA"/>
              <FormControlLabel control={<Checkbox />} label="Elementary Level Math"/>
              <FormControlLabel control={<Checkbox />} label="Elementary Level Reading"/>
              <FormControlLabel control={<Checkbox />} label="Elementary Level Writing"/>
            </FormControl>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
}

export default TutorForm;