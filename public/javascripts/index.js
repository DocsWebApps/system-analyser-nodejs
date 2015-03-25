var INDEX_PAGE={
  // Set listeners on page load
  listeners: function() {
    $('#server-select').on('change', '#server', function() {
      var server=$('#server option:selected').val();
      $('#server-date').html('Now select a date');

      $.ajax({
        type: 'GET',
        url: '/servers/:'+server
      }).done(function(dates) {
        var options='<option></option>';
        dates.forEach(function(value,index,array) {
          options+="<option value='"+value+"''>"+value+"</option>";
        });
        $('#date-select').html('<select id="date" autofocus="autofocus">'+options+'</select>');
      });
    });

    $('#date-select').on('change', '#date', function() {
      var server=$('#server option:selected').val(),
          date=$('#date option:selected').val(),
          url='/servers/'+server+'/'+date;
          
      window.open(url,'_blank');
    });
  },

  fetchServers: function() {
    $.get('/servers', function(servers) {
      var options='<option></option>';
      servers.forEach(function(value, index, array) {
        options+="<option value='"+value+"''>"+value+"</option>";
      });
      $('#server-select').html('<select id="server" autofocus="autofocus">'+options+'</select>');
    });
  }
};

$(document).ready(function() {
  INDEX_PAGE.fetchServers();
  INDEX_PAGE.listeners();
});