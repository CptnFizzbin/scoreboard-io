import {AppBar, Button, Toolbar, Typography} from '@material-ui/core';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';
import NavMenu from './nav-menu';

class NavBar extends React.Component<any, any> {
  constructor(props:any) {
    super(props);

    this.onGamesClick = this.onGamesClick.bind(this);
    this.onPlayersClick = this.onPlayersClick.bind(this);
  }

  onGamesClick() {
    this.props.history.push('/');
  }

  onPlayersClick() {
    this.props.history.push('/players');
  }

  render() {
    return (
      <AppBar position="static">
        <Toolbar>
          <NavMenu />
          <Typography variant="h6">
            Scoreboard-io
          </Typography>
          <Button onClick={this.onPlayersClick}>
            Players
          </Button>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withRouter(connect()(NavBar));
