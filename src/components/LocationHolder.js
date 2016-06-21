import React, { Component } from 'react';
import RaisedButton from 'material-ui/RaisedButton';
import { Card, CardHeader, CardActions, CardText, CardMedia, CardTitle } from 'material-ui/Card';

class LocationHolder extends Component {
	constructor(props) {
        super(props);
    }

	render() {
		return (
			<div style={{margin : 10}}>
				<Card>
					<CardHeader
					title="Location"
					subtitle=""
					/>
					{(this.props.currentLocation.lat !== 0 && this.props.currentLocation.long !== 0) ? 
					<CardMedia overlay={<CardTitle title={this.props.currentLocation.name} />}>
						<img src={`https://maps.googleapis.com/maps/api/staticmap?center=${this.props.currentLocation.lat},${this.props.currentLocation.long}&size=400x200&key=AIzaSyBiad0BKYHjoLLCj5FDxhuUrWdyLA2SrS8&zoom=16&markers=color:red|label:A|${this.props.currentLocation.lat},${this.props.currentLocation.long}&scale=1`} />
					</CardMedia> : ''
					}					
					<CardText>
						
					</CardText>
					<CardActions>
						<RaisedButton label="Fetch Location" secondary={true} onClick={this.props.handleFetch}/>
					</CardActions>
				</Card>
				
			</div>
			)
	}
}

export default LocationHolder;