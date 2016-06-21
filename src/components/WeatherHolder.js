import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardActions, CardText, CardMedia } from 'material-ui/Card';

class WeatherHolder extends Component {
	constructor(props) {
        super(props);
    }

	render() {
		let self = this;
		return (			
			<div style={{margin : 10}}>
				<Card>
					<CardHeader
					title="Weather"
					subtitle=""
					/>					
					 <CardText>
					 {(self.props.currentWeather.desc)? 
						<div>
					 	<p>{self.props.currentWeather.desc}</p>
					 	<p>{self.props.currentWeather.temp.val}°C</p>
					 	<p>{self.props.currentWeather.temp.max}°C ↑ {self.props.currentWeather.temp.min}°C ↓</p>
					 	<p>Humidity : {self.props.currentWeather.humidity}%</p>
					 	<p>Pressure : {self.props.currentWeather.pressure} hPa</p>
					 	<p>Wind : {self.props.currentWeather.wind.speed} mps</p>
					 	</div>
					 	: <div></div>
					}	
					</CardText>									
					<CardActions>
						<RaisedButton label="Fetch Weather" secondary={true} onClick={this.props.handleFetch}/>
					</CardActions>
				</Card>
				
			</div>
			)
	}
}

export default WeatherHolder;