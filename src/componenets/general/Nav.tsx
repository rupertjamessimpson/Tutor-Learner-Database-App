import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Box, Tabs, Tab } from '@mui/material';

function Nav() {
  const { pathname } = useLocation();

  return (
    <nav>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={pathname}
            textColor="primary"
            indicatorColor="primary">
          <Tab
            component={Link}
            to="/tutors"
            label="Tutors"
            value="/tutors"
          />
          <Tab
            component={Link}
            to="/learners"
            label="Learners"
            value="/learners"
          />
          <Tab
            component={Link}
            to="/matches"
            label="Matches"
            value="/matches"
          />
          <Tab
            component={Link}
            to="/conversation"
            label="Conversation"
            value="/conversation"
          />
          <Tab
            component={Link}
            to="/email"
            label="Email"
            value="/email"
          />
          <Tab
            component={Link}
            to="/hours"
            label="Hours"
            value="/hours"
          />
          <Tab
            component={Link}
            to="/forms"
            label="Forms"
            value="/forms"
          />
        </Tabs>
      </Box>
    </nav>
  );
}

export default Nav;