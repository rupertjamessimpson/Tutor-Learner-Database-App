import React from 'react';
import { Link, useLocation } from "react-router-dom";
import { Tabs, Tab } from '@mui/material';

function Nav() {
  const { pathname } = useLocation();

  return (
    <nav>
      <Tabs value={pathname} /* Set initial value based on pathname */
          textColor="primary" /* Set text color */
          indicatorColor="primary" /* Set indicator color */ centered>
        <Tab 
          component={Link} // Wrap Tab with Link for routing
          to="/tutors"
          label="Tutors"
          value="/tutors" /* Set value for active state */
        />
        <Tab 
          component={Link} // Wrap Tab with Link for routing
          to="/learners"
          label="Learners"
          value="/learners" /* Set value for active state */
        />
      </Tabs>
    </nav>
  );
}

export default Nav;