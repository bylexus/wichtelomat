let React = require('react'),
	ReactDOM = require('react-dom'),
	$ = require('jquery');

class Store {
	constructor() {
		this.data = {};
		this.loadFromStorage();
	}

	loadFromStorage() {
		let input = JSON.parse(localStorage.getItem('wichtelInput'));
		let res = JSON.parse(localStorage.getItem('results'));
		this.data.personen = input || [];
		this.data.result = res || [];
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

	resultate() {
		return this.data.result || [];
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

let WichtelResult = React.createClass({
	getDefaultProps() {
	    return {
	        data: []
	    };
	},
	render() {
		let data = this.props.data.map((item,index) => (
			<tr key={index}>
				<td>{item.name}</td><td>{item.wichtelOf}</td><td>{item.wichtel}</td>
			</tr>
		));
		return (
			<div className="wichtelresult">
				<table>
					<thead>
					<tr><th>Name</th><th>ist Wichtel von</th><th>hat Wichtel</th></tr>
					</thead>
					<tbody>{data}</tbody>
				</table>
			</div>
		);
	}
});

let App = React.createClass({
	getInitialState() {
	    return {
	        result: store.resultate()  
	    };
	},

	onShuffle(personen) {
		$.ajax({
			url: 'backend.php',
			type: 'POST',
			data: {
				fcall: 'doShuffle',
				wichtel: personen
			},
			success: function(ret) {
				
				if (ret.success) {
					this.setState({result: ret.result.wichtel});
					store.storeResults(ret.result.wichtel);
				} else {
					alert('Oops! Etwas ging schief: '+ret.msg);
				}
			}.bind(this)
		});
	},

	reset() {
		this.setState({result: []});
		store.storeResults([]);
	},

	render() {
		return (
			<div>
				<h1 className="title">Wichtel-o-mat</h1>
				<h2>Deine Wichtel</h2>
				<WichtelBox onShuffle={this.onShuffle} onReset={this.reset}/>

				<h2>Resultat</h2>
				<WichtelResult data={this.state.result} />
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('content')
);