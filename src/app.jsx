let React = require('react'),
	ReactDOM = require('react-dom');

class Store {
	constructor() {
		this.data = {};
		this.loadFromStorage();
	}

	loadFromStorage() {
		let input = JSON.parse(localStorage.getItem('wichtelInput'));
		let res = JSON.parse(localStorage.getItem('results'));
		this.data.personen = [];
		this.data.result = [];

		if (input) {
			input.forEach((item) => this.data.personen.push(item));
		}
		
		if (res) {
			this.data.result = res;
		}
	}

	storePersonen(personen) {
		localStorage.setItem('wichtelInput',JSON.stringify(personen));
	}

	storeResults(result) {
		localStorage.setItem('results',JSON.stringify(result));
	}

	personen() {
		return this.data.personen || [];
	}
}

const store = new Store();

let PersonRow = React.createClass({
	render() {
		return (
			<tr>
				<td><input type="text" 
					autoFocus
					name="name" 
					defaultValue={this.props.name} 
					onBlur={this.dataChange.bind(this,'name')} 
					onKeyPress={this.props.onKeyPress}
					ref={(c) => this.focusField = c}
				/></td>
				<td><input type="text" name="gruppe" defaultValue={this.props.gruppe} onChange={this.dataChange.bind(this,'gruppe')} onKeyPress={this.props.onKeyPress}/></td>
				<td><button type="button" onClick={this.props.onDelete}>-</button></td>
			</tr>
		);
	},

	dataChange(prop, e) {
		if (this.props.onChange instanceof Function) {
			this.props.onChange(prop, e.target.value);
		}
	},

	setFocus() {
		if (this.focusField) {
			this.focusField.focus();
		}
	}
});

let WichtelBox = React.createClass({
	getInitialState() {
	    return {
	        personen: store.personen() || [{
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
	}
});

let WichtelResult = React.createClass({
	render() {
		return (
			<div className="wichtelresult">
				<table>
					<thead>
					<tr><th>Name</th><th>ist Wichtel von</th><th>hat Wichtel</th></tr>
					</thead>
				</table>
			</div>
		);
	}
});

ReactDOM.render(
	<div>
		<h1 className="title">Wichtel-o-mat</h1>
		<h2>Deine Wichtel</h2>
		<WichtelBox />

		<h2>Resultat</h2>
		<WichtelResult />
	</div>,
	
	document.getElementById('content')
);