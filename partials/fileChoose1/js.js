document.addEventListener("DOMContentLoaded", function() {
   var selects = document.getElementsByClassName("custom-file-input");
   for (var i = 0; i<selects.length; i++) {
      selects[i].onchange = function() {
            var unique_id = this.id;
          var element = document.querySelector('label[for="'+unique_id+'"]');
           element.innerHTML = this.files[0].name;
       }
 }
});
