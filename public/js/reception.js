// search function for appointment list
$(document).ready(function(){    
    var table= $('#apptTable').DataTable({
      dom: 'Bfrtlp',
      buttons: [ 
        {
          extend: 'collection',
          text: 'Export',
          buttons: [
              'copy',
              'excel',
              'csv',
              'pdf',
              'print'
          ]
      }
      ]
    });
      
      $('#patSearch').on('keyup',function(){
        table.search($(this).val()).draw();
  });
      
  });
  
  // search function for patient
  $(document).ready(function(){    
      var table= $('#patTable').DataTable({
        dom: 'Bfrtlp',
        buttons: [ 
          {
            extend: 'collection',
            text: 'Export',
            buttons: [
                'copy',
                'excel',
                'csv',
                'pdf',
                'print'
            ]
        }
        ]
      });
        
        $('#patSearch').on('keyup',function(){
          table.search($(this).val()).draw();
    });
        
    });
  
  // search for schedule
  $(document).ready(function(){    
    var table= $('#schTable').DataTable({
      dom: 'Blfrtip',
      buttons: [ 
        {
          extend: 'collection',
          text: 'Export',
          buttons: [
              'copy',
              'excel',
              'csv',
              'pdf',
              'print'
          ]
      }
      ]
    });
      
      $('#patSearch').on('keyup',function(){
        table.search($(this).val()).draw();
  });
      
  });
  
  // upload image
  $(document).ready(function() 
  { 
      var readURL = function(input) {
      if (input.files && input.files[0]) {
          var reader = new FileReader();
  
          reader.onload = function (e) {
              $('.avatar').attr('src', e.target.result);
          }
  
          reader.readAsDataURL(input.files[0]);
      }
  }
  
  
  $(".file-upload").on('change', function(){
      readURL(this);
  });
  });
  
  
  