<?php
class Wichtel {
	public $name;
	public $gruppe;
	public $wichtelOf = null;
	public $wichtel = null;
	
	public function __construct($name, $gruppe) {
		$this->name = $name;
		$this->gruppe = $gruppe;
	}
	
	public function toArray() {
		$data = array(
			'name' => $this->name,
			'gruppe' => $this->gruppe,
			'wichtelOf' => ($this->wichtelOf != null? $this->wichtelOf->name:'(niemand)'),
			'wichtel' => ($this->wichtel != null? $this->wichtel->name:'(kein Wichtel)')
		);
		return $data;
	}
}

