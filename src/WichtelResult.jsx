const React = require('react'),
	ReactDOM = require('react-dom');

const Card = require('material-ui/lib/card/card');
const CardActions = require('material-ui/lib/card/card-actions');
const CardText = require('material-ui/lib/card/card-text');
const CardTitle = require('material-ui/lib/card/card-title');

const Table = require('material-ui/lib/table/table');
const TableBody = require('material-ui/lib/table/table-body');
const TableFooter = require('material-ui/lib/table/table-footer');
const TableHeader = require('material-ui/lib/table/table-header');
const TableHeaderColumn = require('material-ui/lib/table/table-header-column');
const TableRow = require('material-ui/lib/table/table-row');
const TableRowColumn = require('material-ui/lib/table/table-row-column');

module.exports = React.createClass({
	displayName: 'WichtelResult',

	getDefaultProps() {
	    return {
	        data: []
	    };
	},
	tableHeaderColStyle: {
		fontWeight: 'bold',
		color: '#333'
	},

	render() {
		let data = this.props.data.map((item,index) => (
			<TableRow key={index}>
				<TableRowColumn>{item.name}</TableRowColumn><TableRowColumn>{item.wichtelOf}</TableRowColumn><TableRowColumn>{item.wichtel}</TableRowColumn>
			</TableRow>
		));
		return (
			<Card>
				<CardTitle title="Würfel-Resultat" subtitle="Deine Wichtel wurden ermittelt!"/>
				<CardText>
				<Table selectable={false}>
					<TableHeader displaySelectAll={false} adjustForCheckbox={false}>
						<TableRow>
							<TableHeaderColumn style={this.tableHeaderColStyle}>Name</TableHeaderColumn>
							<TableHeaderColumn style={this.tableHeaderColStyle}>ist Wichtel von</TableHeaderColumn>
							<TableHeaderColumn style={this.tableHeaderColStyle}>hat Wichtel</TableHeaderColumn>
						</TableRow>
					</TableHeader>

					<TableBody displayRowCheckbox={false}>
						{data}
					</TableBody>
				</Table>
				</CardText>
				
			</Card>
		);
	}
});