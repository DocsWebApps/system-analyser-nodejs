var INDEX_PAGE={
  // Set listeners on page load
  listeners: function() {
    $('#server-select').on('change', function(data) {
      var server=$('#server option:selected').val();
      $('#server-date').html('Now select a date...');

      $.ajax({
        type: 'GET',
        url: '/servers/:'+server
      }).done(function(dates) {
        var options='<option></option>';
        dates.forEach(function(value,index,array) {
          options+="<option value='"+value+"''>"+value+"</option>";
        });
        $('#date-select').html('<select id="server" autofocus="autofocus">'+options+'</select>');
      });

    });
  },

  getServers: function() {
    $.get('/servers', function(servers) {
      var options='<option>Select server...</option>';
      servers.forEach(function(value, index, array){
        options+="<option value='"+value+"''>"+value+"</option>";
      });
      $('#server-select').html('<select id="date" autofocus="autofocus">'+options+'</select>');
    });
  }
};

$(document).ready(function() {
  INDEX_PAGE.listeners();
  INDEX_PAGE.getServers();
});