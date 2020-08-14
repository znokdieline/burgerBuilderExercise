import React, { Component } from 'react';
import { connect } from 'react-redux';

//imports
import './Layout.css'
import Aux from '../Aux/Aux';
import Toolbar from '../../components/Navigation/Toolbar/Toolbar';
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer';

//la forma correcta para estos function components es "const name = () => ()" no lleva "()"

class Layout extends Component {
    state = {
        showSideDrawer: false
    }
    sideDrawerCloseHandler = () => {
        this.setState({ showSideDrawer: false})
    }
    sideDrawerToggleHandler = () => {
        this.setState((prevState)=>{
            return { showSideDrawer: !prevState.showSideDrawer }
        })
    }
    render() {
        return(
            <Aux >
                <Toolbar
                    isAuth={this.props.isAuthenticated}
                    drawerToggleClicked={this.sideDrawerToggleHandler}
                />
                <SideDrawer
                isAuth={this.props.isAuthenticated}
                open={this.state.showSideDrawer} 
                closed={this.sideDrawerCloseHandler}/>
                <main className={'Content'}>
                    {this.props.children}
                </main>
            </Aux>
        )
    }
};

const mapStateToProps = state => {
    return {
        isAuthenticated: state.auth.token !== null
    };
};

export default connect(mapStateToProps)(Layout);