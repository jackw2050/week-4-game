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
    var heroPercent;
    var badGuyPercent;



    var myArray = [{
            name: "Natsu",
            image: 'url(assets/images/Natsu.jpg)',
            fightImage: 'url(assets/images/natsu-fight.jpg)',
            baseHealthPoints: 3500,
            baseAttackPower: 37,
            counterAttackPower: 480,
            healthPoints: 0,
            attackPower: 0
        }, {
            name: "Erza",
            image: 'url(assets/images/erza-scarlet.jpg)',
            fightImage: 'url(assets/images/erza-fight.jpg)',
            baseHealthPoints: 500,
            baseAttackPower: 31,
            counterAttackPower: 30,
            healthPoints: 0,
            attackPower: 0
        }, {
            name: 'Pantherlily',
            image: 'url(assets/images/Pantherlily.jpg)',
            fightImage: 'url(assets/images/Pantherlily-fight.jpg)',
            baseHealthPoints: 500,
            baseAttackPower: 45,
            counterAttackPower: 18,
            healthPoints: 0,
            attackPower: 0
        }, {
            name: "Gray",
            image: 'url(assets/images/Gray.jpg)',
            fightImage: 'url(assets/images/Gray.jpg',
            baseHealthPoints: 700,
            baseAttackPower: 15,
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
            var tempV = this.id;
            var newId = Number(tempV) + 10;
            heroBaseAttackPower = myArray[Number(this.id)].baseAttackPower;
            heroAttackPower = myArray[Number(this.id)].baseAttackPower;
            heroHealthPoints = myArray[Number(this.id)].baseHealthPoints
            heroBaseHealthPoints = myArray[Number(this.id)].baseHealthPoints
            $("#" + tempV).attr("id", newId);

            uu = "#" + newId; // move into selector
            $(uu).fadeOut(400);
            timedText();
            heroName = myArray[tempV].name;
            console.log('Hero name ' + heroName);

            // Move hero to left side of screen
            $('.goodGuy').append(
                $('<button>')
                .attr("id", "hero")
                .addClass("btn")
                .hide()
                .text(myArray[tempV].name)
                .css('background-image', myArray[tempV].fightImage)
                .css('border-color', 'green')
            );
            heroPercent = Math.round(heroHealthPoints / heroBaseHealthPoints * 100);
            $("div.goodguyhp").text(heroName + "'s Health: " + heroPercent + "%");
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
                //  .css('background-image', myArray[tempV].image)
                .css('background-image', myArray[tempV].fightImage)
                .css('border-color', 'green')
            );
            challengerName = myArray[tempV].name;
            console.log('Chanllenger name ' + challengerName);
            badGuyPercent = Math.round(challengerHealthPoints / challengerBaseHealthPoints * 100);
            $("div.badguyhp").text(challengerName + "'s  Health: " + badGuyPercent + "%");

            $('#badguy').fadeIn(400); // fade in at hero position
            challengerSelected = true;
            $(".selectText").text("");
            backgroundAudio.pause();
            backgroundFightAudio.play();
            $("#title").text("Failry tail RPG")
            // $("html").css('background-image', 'url(../images/fairy tail wall paper2.jpg)');
        }
    });


function reportCounterAttack(){
            heroHealthPoints -= challengerCounterAttackPower;
            if(heroHealthPoints < 0){heroHealthPoints = 0;}
            heroAttackPower += heroBaseAttackPower;
            $(".fightInfo").text(challengerName + " attacks " + heroName + " for " + challengerCounterAttackPower);
            heroPercent = Math.round(heroHealthPoints / heroBaseHealthPoints * 100);
            $("div.goodguyhp").text(heroName + "'s Health: " + heroPercent + "%");
            window.clearInterval(counterAttackTimer);

            checkForWin();

}

    $("button#attack").click(function() {
        if (heroSelected && challengerSelected) {
            challengerHealthPoints -= heroAttackPower;
            if(challengerHealthPoints < 0){challengerHealthPoints = 0;}

            badGuyPercent = Math.round(challengerHealthPoints / challengerBaseHealthPoints * 100);
            $(".fightInfo").text(heroName + " attacks " + challengerName + " for " + heroAttackPower);
            $("div.badguyhp").text(challengerName + "'s  Health: " + badGuyPercent + "%");
            checkForWin();
        }



    });
    $('button#reset').click(function() {
        challengerSelected = false;
        heroHealthPoints = heroBaseHealthPoints;
        $(".selectText").text("Select your opponent");
        backgroundFightAudio.pause();
        backgroundAudio.play();
    });



    function checkForWin() { // Challenger wins
        if (heroHealthPoints <= 0) {
            heroHealthPoints = 0;
            // print win status
            $("#title").text("Sorry. You lose.")
                // remove hero
            $(".fightInfo").text(heroName + " is defeated " );
			$("div.goodguyhp").text("");
            $('#goodGuy').fadeOut(400); // fade in at hero position
            heroSelected = false;
            // end game

        } else if (challengerHealthPoints <= 0) { // Hero wins
            challengerHealthPoints = 0;
            // set win status

            // print win status
            // remove bad guy
            $(".fightInfo").text(challengerName + " is defeated " );
            $("div.badguyhp").text("");
            $('#badguy').fadeOut(400); // fade in at hero position
            // reset hero HP
            heroHealthPoints = heroBaseHealthPoints;
            challengerSelected = false;
            heroHealthPoints = heroBaseHealthPoints;
            $(".selectText").text("Select your opponent");
            backgroundFightAudio.pause();
            backgroundAudio.play();
            $("html::before ").css('background-image', 'url(../images/Fairy-Tail-Logo-Desktop-Wallpaper-Backgrounds.jpg)');
			$('#hero').css('border-color', 'green');
			$('#badGuy').css('border-color', 'green');
			heroPercent = Math.round(heroHealthPoints / heroBaseHealthPoints * 100);
			$("div.goodguyhp").text(heroName + "'s Health: " + heroPercent + "%");
            $("#title").text(heroName + " Wins!!")



        } else {
			var counterAttackTimer = setTimeout(reportCounterAttack, 800)
            if (heroHealthPoints / heroBaseHealthPoints * 100 < 75) {

                $('#hero').css('border-color', 'orange');
            }
            if (challengerHealthPoints / challengerBaseHealthPoints * 100 < 75) {
                $('#badguy').css('border-color', 'orange');
            }
            if (heroHealthPoints / heroBaseHealthPoints * 100 < 50) {

                $('#hero').css('border-color', 'yellow');
            }
            if (challengerHealthPoints / challengerBaseHealthPoints * 100 < 50) {
                $('#badguy').css('border-color', 'yellow');
            }
            if (heroHealthPoints / heroBaseHealthPoints * 100 < 25) {

                $('#hero').css('border-color', 'red');
            }
            if (challengerHealthPoints / challengerBaseHealthPoints * 100 < 25) {
                $('#badguy').css('border-color', 'red');
            }
			
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
