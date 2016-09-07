var fileChooseApp = {
    init: function() {
        document.addEventListener("DOMContentLoaded", function() {
            
            var copy = document.getElementsByClassName("copy-link");
            var copied = document.getElementsByClassName("copied")[0];
            for (var i = 0; i<copy.length; i++) {
                var link = copy[i];
                
                link.addEventListener("click", function(){
                    var text = this.getAttribute('data-clipboard');
                    clipboard.copy(text);
                    
                    fileChooseApp.showElement(+0.20, copied);
                    setTimeout(function() {
                       fileChooseApp.hideElement(0.15, copied);
                    }, 2000);
                });
                
            }
            
            
            var codeButtons = document.getElementsByClassName("code-toggle");
            for (var i = 0; i<codeButtons.length; i++) {
                var code = codeButtons[i];

                code.addEventListener("click", function() {
                    var elemID = this.getAttribute("data-show");
                    var elem = document.getElementById(elemID);

                    fileChooseApp.showElement(+0.25, elem);
                });
            }
            
            fileChooseApp.assignAttibutes();
        });
    },
    
    showElement: function(add, elem) {
        elem.style.display = "block";
        var animation = setInterval(function() {
            var curr = elem.style.opacity;
            var num = parseFloat(curr);
            
            if (num >= 1) {
                clearInterval(animation);
                elem.opacity = "1.0";
            } else {
                num += add;
                elem.style.opacity = num;
            }
           
        }, 50); 
    },
    
    hideElement: function(sub, elem) {
        var animation = setInterval(function() {
            var curr = elem.style.opacity;
            var num = parseFloat(curr);
            

            if (num <= 0) {
                elem.style.opacity = "0.0";
                elem.style.display = "none";
                clearInterval(animation); 
            } else {
                num -= sub;
                elem.style.opacity = num;
            }
            
        }, 50);  
        
    },
    
    assignAttibutes: function() {
        this.setClipboard({
            'html1' : '<div class="fileChoose1">\n'+'	<div class="btn-choose">\n'+'		<div class="fileChoose1-label">Choose file...</div>\n'+'		<input type="file" class="file-input" data-box="fileChoose1" name="fileChoose1-file">\n'+'	</div>\n'+'</div>\n',
            
            'css1' : '.fileChoose1 {\n  position: relative;\n  text-align: center;\n}\n\n.fileChoose1 .btn-choose {\n  position: relative;\n  padding: 0px 20px;\n  height: 40px;\n  line-height: 40px;\n  text-align: center;\n\n  color: #fff;\n  border: 1px solid transparent;\n  background-color: #d3394c;\n}\n\n.fileChoose1 .btn-choose:hover {\n  border-color: #d3394c;\n  background-color: transparent;\n  color: #d3394c;\n}\n\n.fileChoose1 .fileChoose1-label {\n  display: block;\n  cursor: pointer;\n  font-family: "Verdana", sans-serif;\n  font-weight: bold;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n\n.fileChoose1 input {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  opacity: 0;\n}\n',
            
            'js1' : '<script>\n	var FileSelectCustom = {\n		init: function() {\n			document.addEventListener("DOMContentLoaded", function() {\n				var selects = document.getElementsByClassName("file-input");\n				for (var i = 0; i<selects.length; i++) {\n\n					selects[i].onchange = function() {\n						var id = this.getAttribute("data-box");\n						var label = document.getElementsByClassName(id + "-label")[0]\n						label.innerHTML = this.files[0].name;\n					}\n				}\n			});\n		}\n	};\n	(function() {\n		FileSelectCustom.init();\n	})()\n</script>\n',
            
            'html2' : '<div class="fileChoose2">\n	<div class="btn-choose">\n		<span>Choose file...</span>\n		<input type="file" class="file-input" data-box="fileChoose2" name="fileChoose2-file">\n	</div>\n	<div class="fileChoose2-label">No file</div>\n</div>\n',
            
            'css2' : '.fileChoose2 {\n  position: relative;\n  text-align: center;\n}\n\n.fileChoose2:before {\n  content: " ";\n  display: table;\n}\n\n.fileChoose2:after {\n  content: " ";\n  display: table;\n  clear: both;\n}\n\n.fileChoose2 .btn-choose {\n  position: relative;\n  float: left;\n  width: 50%;\n  padding: 0px 20px;\n  height: 40px;\n  line-height: 40px;\n\n  color: #fff;\n  border: 1px solid transparent;\n  background-color: #d3394c;\n}\n\n.fileChoose2 .btn-choose:hover {\n  border-color: #d3394c;\n  background-color: transparent;\n  color: #fff;\n}\n\n.fileChoose2 .fileChoose2-label {\n  float: left;\n  width: 50%;\n  height: 40px;\n  line-height: 40px;\n\n  font-family: "Verdana", sans-serif;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n\n  border: 1px solid #d3394c;\n  border-left: none;\n  color: #fff;\n}\n\n.fileChoose2 input {\n  position: absolute;\n  top: 0;\n  left: 0;\n  width: 100%;\n  height: 100%;\n  margin: 0;\n  padding: 0;\n  cursor: pointer;\n  opacity: 0;\n}\n',
            
            'js2' : '<script>\n	var FileSelectCustom = {\n		init: function() {\n			document.addEventListener("DOMContentLoaded", function() {\n				var selects = document.getElementsByClassName("file-input");\n				for (var i = 0; i<selects.length; i++) {\n\n					selects[i].onchange = function() {\n						var id = this.getAttribute("data-box");\n						var label = document.getElementsByClassName(id + "-label")[0]\n						label.innerHTML = this.files[0].name;\n					}\n				}\n			});\n		}\n	};\n	(function() {\n		FileSelectCustom.init();\n	})()\n</script>\n',
        });
        
    },
    
    setClipboard: function(attrs) {
        console.log(attrs);
        
        for (attr in attrs) {
            document.getElementById(attr).setAttribute("data-clipboard", attrs[attr]);
        }
    }
}