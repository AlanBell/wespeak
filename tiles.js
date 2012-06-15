$.getJSON('tiles.json', function(data) {
  var items = [];
  $.each(data, function(key, val) {
    $("#tiles").append('<div id="tile'+key+'" class="wordtile '+val.lexicalclass+'"></div>');
    $("#tile"+key).append(val.Title.en_us);
    $("#tile"+key).click(function(){say(key)});
  });
});


