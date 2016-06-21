import React, { Component } from 'react';
import { connect } from 'react-redux';
import AppBar from 'material-ui/AppBar';
import LocationHolder from './components/LocationHolder';
import WeatherHolder from './components/WeatherHolder';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import NavigationRefresh from 'material-ui/svg-icons/navigation/refresh';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import injectTapEventPlugin from 'react-tap-event-plugin';
import { fetchLocation, fetchWeather } from './actions';

injectTapEventPlugin();

class BreezeApp extends Component {
    constructor(props) {
        super(props);
        this.handleFetch = this.handleFetch.bind(this);
        this.handleFetchWeather = this.handleFetchWeather.bind(this);
    }
    
    handleFetch(e){
    	e.preventDefault();
    	const { dispatch } = this.props;
    	dispatch(fetchLocation());
    }

     handleFetchWeather(e){
    	e.preventDefault();
    	const { dispatch, currentLocation } = this.props;
    	dispatch(fetchWeather(currentLocation));
    }
    render() {
    	return (
    		<div>
    			<RefreshIndicator size={40} top={100} left={0} status={this.props.isLoading ? 'loading' : 'hide'} style={{display : 'inline-block', position : 'fixed', marginLeft : '45%'}} />
    			<AppBar title="Breeze"/> 
    			<LocationHolder handleFetch={this.handleFetch} currentLocation={this.props.currentLocation} />
    			<WeatherHolder handleFetch={this.handleFetchWeather} currentWeather={this.props.currentWeather} currentLocation={this.props.currentLocation} />
    			<FloatingActionButton secondary={true} style={{position : 'absolute', bottom : '4%', right : '5%'}}><NavigationRefresh/></FloatingActionButton>
    		</div>
    		)
    }
}

function mapStateToProps(state){
	const { isLoading, currentLocation, currentWeather } = state.host;
	
	return {
		isLoading,
		currentWeather,
		currentLocation
	}
}

export default connect(mapStateToProps)(BreezeApp);
