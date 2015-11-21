let React = require('react'),
	ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'WichtelResult',

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