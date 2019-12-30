import {Divider} from '@material-ui/core';
import React from 'react';

import './page-title.scss';

const PageTitle:React.FC = ({children}) => {
  return (
    <div className={'page-title'}>
      {children}
      <Divider />
    </div>
  );
};

export default PageTitle;
