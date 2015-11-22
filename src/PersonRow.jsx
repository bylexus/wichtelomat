const React = require('react'),
	ReactDOM = require('react-dom'),
	FontIcon = require('material-ui/lib/font-icon'),
	IconButton = require('material-ui/lib/icon-button'),
	TextField = require('material-ui/lib/text-field');

module.exports = React.createClass({
	displayName: 'PersonRow',
	render() {
		return (
			<tr>
				<td><TextField
					autoFocus
					hintText="Wichtel-Name"
					defaultValue={this.props.name} 
					onBlur={this.dataChange.bind(this,'name')} 
					onKeyPress={this.props.onKeyPress}
					ref={(c) => this.focusField = c}
				/></td>
				<td><TextField defaultValue={this.props.gruppe} onChange={this.dataChange.bind(this,'gruppe')} onKeyPress={this.props.onKeyPress} style={{width: '80px'}}/></td>
				<td>
					<IconButton iconClassName="material-icons" onClick={this.props.onDelete}>remove_circle_outline</IconButton>
				</td>
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