
$(document).ready(function(){
    $("#giantbomb-button").click(function(e) {
    
      $.ajax ({
        type: 'GET',
        dataType: 'jsonp',
        crossDomain: true,
        jsonp: 'json_callback',
        url: 'http://www.giantbomb.com/api/search/?format=jsonp&api_key=da0a26a3994cb8bd2bc52f6fe82255ae874430bd&query=uncharted',
        complete: function() {
        console.log('done');
        },
        success: function(data) {
          console.log(data);
        }
      });
    });
});
