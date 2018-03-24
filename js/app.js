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
            'html1' : '<div id="file-select1" class="custom-file">\n    <label for="custom-file-input1">Choose file...</label>\n    <input type="file" id="custom-file-input1" class="custom-file-input">\n</div>',
            
            'css1' : '.custom-file {\n  border: 1px solid #d3394c;\n  text-align: center;\n  height: 40px;\n  line-height: 38px;\n  width: 100%;\n  color: #FFFFFF;\n}\n\n.custom-file > label {\n  display: block;\n  padding: 0px 15px;\n  background-color: #d3394c;\n  border-right: 1px solid transparent;\n  cursor: pointer;\n}\n\n.custom-file:hover > label {\n  border-right-color: #d3394c;\n  background-color: transparent;\n}\n\n.custom-file input[type="file"] {\n  display: none;\n}',
            
            'js1' : 'document.addEventListener("DOMContentLoaded", function() {\n   var selects = document.getElementsByClassName("custom-file-input");\n   for (var i = 0; i<selects.length; i++) {\n      selects[i].onchange = function() {\n            var unique_id = this.id;\n          var element = document.querySelector(\'label[for="\'+unique_id+\'"]\');\n           element.innerHTML = this.files[0].name;\n       }\n }\n});\n',

            'html3' : '<div class="checkbox">\n    <input id="select-1" type="checkbox">\n    <label for="select-1">Background image</label>\n</div>\n',
            
            'css3' : '.checkbox {\n  display: block;\n  height: 40px;\n}\n\n.checkbox label {\n  cursor: pointer;\n  font-size: 16px;\n}\n\n.checkbox input[type="checkbox"] {\n  display: none;\n}\n\n.checkbox input[type="checkbox"] + label:before {\n  position: relative;\n  top: 5px;\n  display:inline-block;\n  content:"";\n  height: 20px;\n  width: 20px;\n  margin-right: 10px;\n  border: 1px solid #a1a194;\n  border-radius: 1px;\n}\n\n.checkbox input[type="checkbox"]:checked + label:before {\n  background: url("../img/checked.png") no-repeat;\n}\n',
            
        });
        
    },
    
    setClipboard: function(attrs) {
        for (attr in attrs) {
            document.getElementById(attr).setAttribute("data-clipboard", attrs[attr]);
        }
    }
}


var PanelModule = {
    settings: {
        currentVisiblePanelID: "panel_1",
        lastActiveLinkID: "link_1",
    },
    
    init: function() {
        //Main event listeners
        document.addEventListener("DOMContentLoaded", function() {
            //Panel toggle listeners  
            var panelToggles = document.getElementsByClassName("panel-toggle");

            for (var i = 0; i<panelToggles.length; i++) {
                var panelToggle = panelToggles[i];

                panelToggle.addEventListener("click", function() {
                    var panelID = this.getAttribute("data-panel");
                    PanelModule.togglePanel(panelID, true);
                });
            }

        });
    },
        
    //Toggle panel logic
    togglePanel: function (panelID, menuLink) {
        var panel = document.getElementById(panelID);

        if (menuLink) {
            //Move class "active" to link coresponding to this panel
            var linkID = "link_" + panelID.substr(panelID.indexOf("_")+1, panelID.length - panelID.indexOf("_"))
            PanelModule.toggleLinkActive(linkID);
        }

        //Check if the current opened panel is the one we're trying to open
        if (this.settings.currentVisiblePanelID === panelID) {
            return true;
          //Exit out of the function
        } else {
            //Hide the current opened panel
            var current = document.getElementById(this.settings.currentVisiblePanelID);
            current.style.display = "none";

            //Set the currentVisiblePanel to the one we're openning
            this.settings.currentVisiblePanelID = panelID;

            //Make the one we're trying to open visibile
            panel.style.display = "block";
        }
    },
        
    //Change active state on links
    toggleLinkActive: function (linkID) {
        //The same link clicked 
        if (linkID == this.settings.lastActiveLinkID) return true;

        var lastLink = document.getElementById(this.settings.lastActiveLinkID);
        var link = document.getElementById(linkID);
        link.className += " active";

        //Remove active front last link
        lastLink.className = lastLink.className.replace(" active", "");

        this.settings.lastActiveLinkID = linkID;
    }   
};


var FileChooseCustom = {
    init: function() {
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
    }
};