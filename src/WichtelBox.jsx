let React = require('react'),
	ReactDOM = require('react-dom'),
	PersonRow = require('./PersonRow'),
	store = require('./Store').store;

module.exports = React.createClass({
	displayName: 'WichtelBox',
	
	getInitialState() {
	    return {
	        personen: store.personen().length > 0? store.personen() : [{
	        	name: 'Alex',
	        	gruppe: '1'
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
					key={index} 
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
			<div className="wichtelbox">
				<table>
					<thead>
					<tr><th>Name</th><th>Gruppe</th><th>&nbsp;</th></tr>
					</thead>
					<tbody>
						{rows}
					</tbody>
				</table>
				<button type="button" onClick={this.addRow}>+</button>
				<button type="button" onClick={this.emitShuffle}>Würfeln!</button>
				<button type="button" onClick={this.reset}>Alles leeren</button>
			</div>
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
		let p = {name: '',gruppe: this.state.personen[this.state.personen.length-1].gruppe};
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
		this.setState({personen: [{name: '',gruppe: ''}]});
		store.storePersonen([]);
		if (this.props.onReset instanceof Function) {
			this.props.onReset();
		}
	}
});