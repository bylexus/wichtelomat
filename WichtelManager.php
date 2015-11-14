<?php
class WichtelManager {
	private $debug = false;
	private $wichtel = array();
	
	public function __construct() {
		$this->wichtel[] = new Wichtel('Alexander',1);
		$this->wichtel[] = new Wichtel('Barbara',1);
		$this->wichtel[] = new Wichtel('Julian',1);
		$this->wichtel[] = new Wichtel('Jan',2);
		$this->wichtel[] = new Wichtel('Martina',2);
		$this->wichtel[] = new Wichtel('Rita',3);
		$this->wichtel[] = new Wichtel('Ernst',3);
		$this->wichtel[] = new Wichtel('Bruno',4);
		$this->wichtel[] = new Wichtel('Pia',4);
		$this->wichtel[] = new Wichtel('Rut',5);
		$this->wichtel[] = new Wichtel('Werni',5);
		$this->wichtel[] = new Wichtel('Yves',6);
		$this->wichtel[] = new Wichtel('Pair',6);
		$this->wichtel[] = new Wichtel('David',7);
	}
	
	
	public function setWichtel(array $wichtel) {
		$this->wichtel = array();
		foreach($wichtel as $entry) {
			if ($entry instanceof Wichtel)
				$this->wichtel[] = $entry;
		}
	}
	
	
	
	
	public $shuffled =  false;
	
		
	
	public function shuffle() {
		// Step 1: find Wichtel from other groups for every wichtel
		$this->out("--> finding wichtels from other groups...\n");
		foreach ($this->wichtel as $act) {
			$w = $this->getRandomFreeWichtelFromOtherGroup($act,$act->group);
			if ($w instanceof Wichtel) {
				$act->wichtel = $w;
				$w->wichtelOf = $act;
			} else {
				$this->out("No more free wichtels from other groups found, switch algorithm\n");
				break;
			}
		}
		
		// Step 2: If no more free wichtels can be found in other groups
		// use from same group
		foreach ($this->wichtel as $act) {
			if ($act->wichtel == null) {
				$w = $this->getRandomFreeWichtelFromOtherGroup($act,-1);
				if ($w instanceof Wichtel) {
					$act->wichtel = $w;
					$w->wichtelOf = $act;
				} else {
					$this->out("--> No more wichtels found... This should not happen!\n");
					break;
				}
			}
			
		}
		
		$this->out("--> Shuffling done.\n\n");
		$shuffled = true;
	}
	
	
	public function printWichtel() {
		$this->debug = true;
		if (!$this->shuffled)
			$this->shuffle();
		
		$this->out("\n\n------------------- WICHTEL RESULTS ------------------------\n");
		foreach($this->wichtel as $w) {
			if ($w->wichtel instanceof Wichtel) {
				$this->out("{$w->name}'s Wichtel is: {$w->wichtel->name}.".($w->group == $w->wichtel->group?' (!! SAME GROUP !!)':'')."\n");
			} else {
				
				$this->out("{$w->name} has no Wichtel.\n");
			}
		}
		$this->debug = false;
	}
	
	public function getWichtel() {
		if (!$this->shuffled)
			$this->shuffle();
		return $this->wichtel;
	}
	
	
	
	private function getRandomFreeWichtelFromOtherGroup($checkWichtel, $group) {
		$available = array();
		
		// find available:
		foreach ($this->wichtel as $w) {
			if ($w != $checkWichtel && $w->group != $group && $w->wichtelOf == null)
				$available[] = $w;
		}
		
		// return random one:
		if (count($available) > 0) {
			return($available[rand(0,count($available)-1)]);
		} else return null;
	}
	
	
	public function out($str) {
		if ($this->debug)
			print $str;
	}
}

