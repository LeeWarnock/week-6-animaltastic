//VARIABLES
var state = "federationChars";
var chosenHero = null;
var chosenFoe = null;
// Characters and Stats (object within object)
var characters = {
	agnes: {
	name: "borg",
	hp: 100,
	attack: 20,
	counter: 15,
	},
	marie: {
	name: "borgQueen",
	hp: 100,
	attack: 35,
	counter: 5,
	},
	sistermary: {
	name: "wesley",
	hp: 100,
	attack: 10,
	counter: 10,
	},
	skids: {
	name: "crusher",
	hp: 100,
	attack: 15,
	counter: 10,
	}
	data: {
	hp: 150,
	attack: 15,
	counter: 10,
	},
	riker: {
	hp: 300,
	attack: 20,
	counter: 15,
	},
};

//FUNCTIONS
function gameInit(){
	$('.allCharas').click(function(e) {
		console.log("gameInit = " + state);
		switch(state) {
		    case "federationChars":
		    	console.log(this.id);
				selectHero(this);
				state = "enemyChars";
		        break;
		    case "enemyChars":
		        selectFoe(this);
		        state = "engageBattle";
		        break;
		} 
	});
	$('#attack-btn').click(function(e) {
		if (state == "engageBattle") {
			fightTime();
		} 
	});
	$(document).ready(function(){
		$(".btn-info").click(function(){
			location.reload();
		});
	});
};

function selectHero(heroDiv) {
	var heroContainer = $(heroDiv);
	heroContainer.appendTo('#hero');
	heroContainer.removeClass('allCharas');
	heroContainer.addClass('hero-img good');
	chosenHero = characters[heroDiv.id]
	$('#hero-hp').html(chosenHero.hp);
	console.log("Selected hero: " + JSON.stringify(chosenHero));
}

function selectFoe(foeDiv) {
	var foeContainer = $(foeDiv);
	foeContainer.appendTo('#foe');
	foeContainer.removeClass('allCharas');
	foeContainer.addClass('foe-img evil');
	chosenFoe = characters[foeDiv.id];
	$('#foe-hp').html(chosenFoe.hp);
	console.log("Selected foe: " + JSON.stringify(chosenFoe));
}

function fightTime() {
	damage(chosenFoe, chosenHero.attack);
	damage(chosenHero, chosenFoe.counter);
	$('#foe-hp').html(chosenFoe.hp);
	$('#hero-hp').html(chosenHero.hp);



}

//PROGRAM
gameInit();
