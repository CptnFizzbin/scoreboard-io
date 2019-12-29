import React from 'react';

import './page-title.scss';

const PageTitle:React.FC = ({children}) => {
  return (
    <div className={'page-title'}>{children}</div>
  );
};

export default PageTitle;
