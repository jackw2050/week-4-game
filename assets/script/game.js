// RPG Week 4



$(document).ready(function() {



    var challengerHealthPoints;
    var challengerAttackPower;
    var challengerCounterAttackPower;
    var challengerBaseHealthPoints;

    var heroHealthPoints;
    var heroAttackPower;
    var heroCounterAttackPower;
    var heroBaseAttackPower;
    var heroBaseHealthPoints;

    var heroSelected = false;
    var challengerSelected = false;
    var heroName, heroID;
    var challengerName, challengerID;
	var backgroundAudio = new Audio('assets/audio/Fairy Tail Main Theme.m4a');
	var backgroundFightAudio = new Audio('assets/audio/Hagane No Hakunetsusen.m4a');



    var myArray = [{
            name: "Natsu",
            image: 'url(assets/images/Natsu.jpg)',
            fightImage:'url(assets/images/natsu-fight.jpg)',
            baseHealthPoints: 800,
            baseAttackPower: 37,
            counterAttackPower: 26,
            healthPoints: 0,
            attackPower: 0
        }, {
            name: "Erza",
            image: 'url(assets/images/erza-scarlet.jpg)',
            fightImage:'url(assets/images/erza-fight.jpg)',
            baseHealthPoints: 500,
            baseAttackPower: 31,
            counterAttackPower: 30,
            healthPoints: 0,
            attackPower: 0
        }, {
            name: 'Pantherlily',
            image: 'url(assets/images/Pantherlily.jpg)',
            fightImage:'url(assets/images/Pantherlily-fight.jpg)',
            baseHealthPoints: 600,
            baseAttackPower: 35,
            counterAttackPower: 18,
            healthPoints: 0,
            attackPower: 0
        }, {
            name: "gamera",
            image: 'url(assets/images/gamera_Fotor.jpg)',
            baseHealthPoints: 750,
            baseAttackPower: 23,
            counterAttackPower: 29,
            healthPoints: 0,
            attackPower: 0
        }

    ];

	backgroundAudio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);
	backgroundAudio.play();

	backgroundFightAudio.addEventListener('ended', function() {
		this.currentTime = 0;
		this.play();
	}, false);




    // Generate selector pictures
    for (var i = 0; i < 4; i++) {

        $('.monsterList').append(
            $('<button>')
            .attr("id", i)
            .addClass("btn monster")
            .text(myArray[i].name)
            .css('background-image', myArray[i].image)
        );
    }


    function timedText() {
        setTimeout(removeA, 1000)
    }


    var uu;

    function removeA() {
        $(uu).attr("id", 5);
    }


    $("button.monster").click(function() {

        if (heroSelected == false) {

            var tempV = Number(this.id);
            var newId = tempV + 10;
            heroBaseAttackPower = myArray[Number(this.id)].baseAttackPower;
            heroAttackPower = myArray[Number(this.id)].baseAttackPower;
            heroHealthPoints = myArray[Number(this.id)].baseHealthPoints
            heroBaseHealthPoints = myArray[Number(this.id)].baseHealthPoints
            $("#" + tempV).attr("id", newId);

            //----------------------------------------------------------------------
            //		Need to set ids on the fl

            //uu = "#" + tempV;// move into selector
            uu = "#" + newId; // move into selector
            $(uu).fadeOut(400);
            timedText();


            // Move hero to left side of screen
            $('.goodGuy').append(
                $('<button>')
                .attr("id", "hero")
                .addClass("btn")
                .hide()
                .text(myArray[tempV].name)
                .css('background-image', myArray[tempV].fightImage)
            );

            $('#hero').fadeIn(400); // fade in at hero position
            heroSelected = true;

            $(".selectText").text("Select your opponent");


        } else if (challengerSelected == false) {

            // Move challenger
            challengerName = this.value;
            challengerID = this.id;

            var tempV = Number(this.id);;

            challengerCounterAttackPower = myArray[Number(this.id)].baseAttackPower;
            challengerHealthPoints = myArray[Number(this.id)].baseHealthPoints
            challengerBaseHealthPoints = myArray[Number(this.id)].baseHealthPoints


            uu = "#" + tempV;
            $(uu).fadeOut(400);
            timedText();
            // move challenger to left side of screen

            $('.badGuy').append(
                $('<button>')
                .attr("id", "badguy")
                .addClass("btn")
                .hide()
                .text(myArray[tempV].name)
                .css('background-image', myArray[tempV].image)
            );

            $('#badguy').fadeIn(400); // fade in at hero position
            challengerSelected = true;
            $(".selectText").text("");
			backgroundAudio.pause();
			backgroundFightAudio.play();
			$("html").css('background-image', 'url(../images/fairy tail wall paper2.jpg)');



        }
    });


    $("button#attack").click(function() {
        challengerHealthPoints -= heroAttackPower;
        heroHealthPoints -= challengerCounterAttackPower;
        heroAttackPower += heroBaseAttackPower;
        checkForWin();
        $("div.goodguyhp").text("Good guy HP: " + heroHealthPoints);
        $("div.badguyhp").text("Bad guy HP: " + challengerHealthPoints);
    });

    function checkForWin() { // Challenger wins
        if (heroHealthPoints <= 0) {
            heroHealthPoints = 0;
            // print win status
            // remove hero
            // end game
        } else if (challengerHealthPoints <= 0) { // Hero wins
            challengerHealthPoints = 0;
            // set win status

            // print win status
            // remove bad guy
            //$('#badGuy').remove();
            $('#badguy').fadeOut(400); // fade in at hero position
            // reset hero HP
            challengerSelected = false;
            heroHealthPoints = heroBaseHealthPoints;
            $(".selectText").text("Select your opponent");
            backgroundFightAudio.pause();
            backgroundAudio.play();
			$("html::before ").css('background-image', 'url(../images/Fairy-Tail-Logo-Desktop-Wallpaper-Backgrounds.jpg)');



        } else {

        }
    }

    function logData() {
        console.log(this.id);
        console.log("ID: " + tempV);
        console.log("Bad guy name: " + myArray[tempV].name);
        console.log("ID: " + tempV);
        console.log("Good guy name: " + myArray[tempV].name);
        console.log("Base attack power: " + heroBaseAttackPower);
        console.log("Attack power: " + heroAttackPower);
        console.log("Base HP: " + heroBaseHealthPoints);
        console.log("HP: " + heroHealthPoints);
        console.log("ID: " + tempV);
        console.log("Bad guy name: " + myArray[tempV].name);
        console.log("Attack power: " + challengerCounterAttackPower);
        console.log("Base HP: " + challengerBaseHealthPoints);
        console.log("HP: " + challengerHealthPoints);
        console.log("Hero HP: " + heroHealthPoints);
        console.log("Bad guy HP: " + challengerHealthPoints);
    }


}); // document ready
