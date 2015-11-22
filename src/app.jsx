const React = require('react'),
	ReactDOM = require('react-dom'),
	$ = require('jquery'),

	store = require('./Store').store,
	WichtelBox = require('./WichtelBox'),
	WichtelResult = require('./WichtelResult'),

	AppBar = require('material-ui/lib/app-bar'),
	FlatButton = require('material-ui/lib/flat-button');

//Needed for onTouchTap
//Can go away when react 1.0 release
//Check this repo:
//https://github.com/zilverline/react-tap-event-plugin
const injectTapEventPlugin = require("react-tap-event-plugin");
injectTapEventPlugin();


const App = React.createClass({
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
				<AppBar 
					title="Wichtel-o-Mat"
					showMenuIconButton={false}
					iconElementRight={
						<FlatButton 
							label="&copy; 2015 alexi.ch"
							linkButton={true}
							href="https://alexi.ch/"
						/>
					}/>
				<WichtelBox onShuffle={this.onShuffle} onReset={this.reset}/>
				<WichtelResult data={this.state.result} />
			</div>
		);
	}
});

ReactDOM.render(
	<App />,
	document.getElementById('content')
);