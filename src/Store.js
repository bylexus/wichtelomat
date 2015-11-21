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

module.exports = {store: new Store()};