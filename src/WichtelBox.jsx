const React = require('react'),
	ReactDOM = require('react-dom'),
	PersonRow = require('./PersonRow'),
	store = require('./Store').store;

const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');
const FontIcon = require('material-ui/lib/font-icon');
const RaisedButton = require('material-ui/lib/raised-button');


module.exports = React.createClass({
	displayName: 'WichtelBox',
	
	getInitialState() {
	    return {
	        personen: store.personen().length > 0? store.personen() : [{
	        	name: 'Alex',
	        	gruppe: '1',
	        	id: new Date().getTime() + Math.round(Math.random()*1000)
	        }]  
	    };
	},
	render(){
		let last = this.state.personen.length-1;
		let rows = this.state.personen.map((person, index) => {
			let isLast = index === last;
			this.lastRow = null;
			return (
				<PersonRow 
					key={person.id} 
					name={person.name} 
					gruppe={person.gruppe} 
					onChange={this.onPersonChange.bind(this,index)} 
					onKeyPress={this.onKeyPress.bind(this,index)}
					onDelete={this.onDelete.bind(this,index)}
					ref={(ref) => {
						if (isLast && ref) {
							this.lastRow = ref;
						}	
					}}
				/>
			);
		});
		return (
			<Card>
				<CardTitle title="Deine Wichtel" subtitle="trage hier alle deine Wichtel ein"/>
				<CardText>
				<table>
					<thead>
					<tr><th>Name</th><th>Gruppe</th><th>&nbsp;</th></tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<CardActions>
					<RaisedButton secondary={true} iconClassName="material-icons" label="neuer Wichtel" onClick={this.addRow}>
						<FontIcon className="material-icons" style={{color: 'white'}}>add_circle_outline</FontIcon>
					</RaisedButton>
					<RaisedButton label="Würfeln!" secondary={true} onClick={this.emitShuffle} />
					<RaisedButton label="Alles leeren" onClick={this.reset} />
				</CardActions>
				</CardText>
				
			</Card>
		);
	},

	onPersonChange(index,prop,value) {
		let personen = this.state.personen;
		if (index < personen.length) {
			personen[index][prop] = value;
		}
		this.setState({personen: personen});
		store.storePersonen(personen);
	},

	onKeyPress(index,e) {
		if (index === this.state.personen.length-1 && e.key === "Enter") {
			this.addRow();
		}
	},

	onDelete(index, e) {
		if (this.state.personen.length < 2) return;
		let ps = [];
		this.state.personen.forEach((p,i) => {
			if (i !== index) {
				ps.push(p);
			}
		});
		this.setState({personen: ps}, this.focusLast);
	},

	addRow() {
		let ps = this.state.personen;
		let p = {
			name: '',
			gruppe: this.state.personen.length > 0?this.state.personen[this.state.personen.length-1].gruppe:'',
			id: new Date().getTime()+Math.round(Math.random()*1000)
		};
		ps.push(p);
		this.setState({personen: ps},this.focusLast);
		this.focusLast();
	},

	focusLast() {
		if (this.lastRow) this.lastRow.setFocus();	
	},

	emitShuffle() {
		if (this.props.onShuffle instanceof Function) {
			this.props.onShuffle(this.state.personen);
		}
	},

	reset() {
		this.setState({personen: []}, this.addRow);
		store.storePersonen([]);

		if (this.props.onReset instanceof Function) {
			this.props.onReset();
		}
	}
});