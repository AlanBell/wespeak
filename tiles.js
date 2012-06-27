$.getJSON('tiles.json', function(data) {
  var items = [];

  $.each(data, function(key, val) {
    //add an empty div to the root set of tiles
    $("#tiles").append('<div id="tile'+key+'" class="wordtile '+val.lexicalclass+'"></div>');
    //put the text of appropriate language in the tile
    $("#tile"+key).append(val.Title.en_gb);
    //add an image if there is one specified (there is css to force it to a sensible size)
    if (val.Image){
      $("#tile"+key).append('<img src="'+val.Image+'"/>');
    }

    //this bit differentiates between a tap and a long touch
    var timeout, longtouch;
    $("#tile"+key).mousedown(function() {
        timeout = setTimeout(function() {
            longtouch = true;
        }, 1000);//TODO this timer should be configurable
    }).mouseup(function() {
        if (longtouch) {
            	$.fancybox($("#tile"+key+"modifiers"),
		{
        		'autoDimensions'	: false,
			'width'         		: 350,
			'height'        		: 'auto',
			'transitionIn'		: 'none',
			'transitionOut'		: 'none'
		}
	);
        } else {
            //speak the title TODO this might be in a different language to the display title
            say(val.Title.en_gb);
        }
        longtouch = false;
        clearTimeout(timeout);
    });

    //above is the tile, now we build the page of modifiers for the tile
    //these will use a mixture of specific modifiers (Jam -> strawberry, apricot, raspberry, honey, chocolate spread)
    //and fairly standard modifier sets (big/small, colours etc)
    //start by adding the modifier set
    $("#modifiers").append('<div id="tile'+key+'modifiers"></div>');
    //now for the modifiers declared in the json file add tiles
    //some maybe modifier sets which get kind of included once somehow
    $("#tile"+key+"modifiers").append('<div id="tile'+key+'modifierstrawberry" class="wordtile"></div>');
    $("#tile"+key+"modifierstrawberry").append("Strawberry");
    $("#tile"+key+"modifiers").append('<div id="tile'+key+'modifierapricot" class="wordtile"></div>');
    $("#tile"+key+"modifierapricot").append("Apricot");

  });
});


