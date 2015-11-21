let React = require('react'),
	ReactDOM = require('react-dom'),
	$ = require('jquery'),

	store = require('./Store').store,
	WichtelBox = require('./WichtelBox'),
	WichtelResult = require('./WichtelResult');


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
			}
		}).then((ret) => {
			if (ret.success) {
				this.setState({result: ret.result.wichtel});
				store.storeResults(ret.result.wichtel);
			} else {
				alert('Oops! Etwas ging schief: '+ret.msg);
			}
		});
	},

	reset() {
		this.setState({result: []});
		store.storeResults([]);
	},

	render() {
		return (
			<div>
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