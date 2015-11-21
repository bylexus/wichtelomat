let React = require('react'),
	ReactDOM = require('react-dom');

module.exports = React.createClass({
	displayName: 'PersonRow',
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