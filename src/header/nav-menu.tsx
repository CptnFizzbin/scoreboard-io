import {IconButton, Menu, MenuItem} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router';

class NavMenu extends React.Component {
  constructor(props:any) {
    super(props);

    this.state = {
      open: false,
    };

    this.openMenu = this.openMenu.bind(this);
    this.closeMenu = this.closeMenu.bind(this);

    this.onNewGameClick = this.onNewGameClick.bind(this);
    this.onRematchClick = this.onRematchClick.bind(this);
  }

  openMenu() {
    this.setState({
      open: true,
    });
  }

  closeMenu() {
    this.setState({
      open: false,
    });
  }

  onNewGameClick() {
    this.props.history.push('/games/new');
    this.closeMenu();
  }

  onRematchClick() {
    this.props.dispatch({
      type: 'GAME.REMATCH',
      data: {},
    });
    this.closeMenu();
  }

  render() {
    return (
      <React.Fragment>
        <IconButton edge="start" onClick={this.openMenu}>
          <MenuIcon />
        </IconButton>

        <Menu open={this.state.open} onClose={this.closeMenu}>
          <MenuItem onClick={this.onNewGameClick}>New Game</MenuItem>
          <MenuItem onClick={this.onRematchClick}>Rematch</MenuItem>
        </Menu>
      </React.Fragment>
    );
  }
}

export default withRouter(connect()(NavMenu));
