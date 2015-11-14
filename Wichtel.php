<?php
class Wichtel {
	public $name;
	public $group;
	public $wichtelOf = null;
	public $wichtel = null;
	
	public function __construct($name, $group) {
		$this->name = $name;
		$this->group = $group;
	}
	
	public function toArray() {
		$data = array(
			'name' => $this->name,
			'group' => $this->group,
			'wichtelOf' => ($this->wichtelOf != null? $this->wichtelOf->name:'(niemand)'),
			'wichtel' => ($this->wichtel != null? $this->wichtel->name:'(kein Wichtel)')
		);
		return $data;
	}
}

