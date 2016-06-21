import React, { Component } from 'react';
import { Provider } from 'react-redux';
import configureStore from '../configureStore';
import BreezeApp from '../BreezeApp';
import getMuiTheme from 'material-ui/styles/getMuiTheme';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { indigo800, teal700, blueGrey800 } from 'material-ui/styles/colors';

const store = configureStore();

export default class Root extends Component {
    render() {
        return ( 
                <Provider store = { store }>
                    <MuiThemeProvider muiTheme = { getMuiTheme({
                        palette: {
                            primary1Color: indigo800,
                            primary2Color: teal700,
                            accent1Color : blueGrey800                           
                          }
                    }) }>
                        <BreezeApp />
                    </MuiThemeProvider>
                </Provider>
        )
    }
}
