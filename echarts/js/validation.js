var addEvent = function (obj, evType, fn){
	if (obj.addEventListener){
		obj.addEventListener(evType, fn, true);
		return true;
	}
	else if (obj.attachEvent){
		var r = obj.attachEvent("on"+evType, fn);
		return r;
	}else{
		return false;
	}
}

var validate = {

  form:0,
  proceed:0,
  init : function(form){
  
    validate.form = form;  
    var elements = form.elements;
    validate.proceed = 1;

    if(elements){
      for(i=0;i<elements.length;i++){
        
        validate.run(elements[i]);
        elements[i].onchange = function(){
          validate.run(this)
        }
        
      }
    }
    if(validate.proceed == 1){
      return true;
    } else{
      return false;
    }
  },
  
  listen : function(form){
  
    validate.form = form;  
    var elements = form.elements;
    if(elements){
      for(i=0;i<elements.length;i++){
        if(elements[i].className.match(/\bdigits\b/gi)){
          validate.digits(elements[i]);
          elements[i].onchange = function(){
            validate.reset(this);
            validate.digits(this);
            if(this.className.match(/\bminlength\b/gi))
              validate.minlength(this);
          }
        }
        elements[i].onblur = function(){
          validate.run(this);
        }
      }
    }

  },
  
  run : function(element){
    validate.reset(element);
    if(element.className.match(/\brequired\b/gi))
      validate.empty(element);
    if(element.className.match(/\bisemail\b/gi))
      validate.email(element);
    if(element.className.match(/\bdigits\b/gi))
      validate.digits(element);
    if(element.className.match(/\bminlength\b/gi))
      validate.minlength(element);
	if(element.className.match(/\bequals\b/gi))
      validate.equals(element);
  },
  
  equals : function(element){
    var pwd = document.getElementById('pwd');
	if(element.value!=pwd.value){
        element.className += " invalid";
        errormsg = 'Passwords do not match';
        validate.error(element,errormsg);
        validate.proceed = 0;
	}
  },
  
  empty : function(element){
    if(element.type=="text" || element.type=="select" || element.type=="textarea" || element.type=="password"){
      if(!element.className.match(/\binvalid\b/gi) && !element.value){
        //alert(inputs[i].className);
        element.className += " invalid";
        errormsg = 'Please enter your '+element.title;
        validate.error(element,errormsg);
        validate.proceed = 0;
      }
    }
  },
  
  email : function(element){
    if(element.type=="text"){
      var pattern = /^([a-zA-Z0-9_.-])+@([a-zA-Z0-9_.-])+\.([a-zA-Z])+([a-zA-Z])+/;
      if(!pattern.test(element.value)){
        //alert(inputs[i].className);
        if(!element.className.match(/invalid/gi))
          element.className += " invalid";
        errormsg = 'Please enter a valid email address.';
        validate.error(element,errormsg);
        validate.proceed = 0;
      }
    }
  },
  
  digits : function(element){
    if(element.type=="text"){
      var pattern = /^\s*\d+\s*$/;
            
      function isNumberKey(evt){
         var charCode = (evt.which) ? evt.which : event.keyCode
         if (charCode > 31 && (charCode < 48 || charCode > 57))
            return false;

         return true;
      }

      element.onkeydown = function(e){
        if(!document.all)
          event = e;
        return isNumberKey(event);
      }
        
      if(element.className.match(/phone/gi)){  
        element.onfocus = function(){
          var value = this.value;
          value = value.replace("(","");
          value = value.replace(")","");
          value = value.replace("-","");
          value = value.replace(" ","");
          this.value = value;
        }
        
        element.onblur = function(){
          if(this.value.length == 10){
            var areaCode = this.value.substr(0,3);
            var first3   = this.value.substr(3,3);
            var last4    = this.value.substr(6,4);
            this.value = "("+areaCode+") "+first3+"-"+last4;
          }
        }
      }

    }
  },
  
  minlength : function(element){
    if(element.type=="text" || element.type=="textarea" || element.type=="password"){
      
      var classes = element.className.split(" ");
      for(t=0;t<classes.length;t++){
        //alert(classes[t]);
        if(classes[t].match(/minlength/gi)){
          //if(classes[t].match(/^\s*\d+\s*$/){
            var minvalue = classes[t].split(":");
            var minlength = parseInt(minvalue[1]);
            //alert(minvalue);
          //}
        }
      }
      
      if(element.maxLength) 
        var maxlength = element.maxLength;
      
      if(minvalue){
        if(element.value.length<minlength){
          //alert(inputs[i].className);
          if(!element.className.match(/invalid/gi))
            element.className += " invalid";
          if(maxlength && maxlength > minlength)
            errormsg = element.title+' must be between '+minlength+' and '+maxlength+' characters.';
          else if(maxlength && maxlength == minlength)
            errormsg = element.title+' must be exactly '+minlength+' characters.';
          else
            errormsg = element.title+' must be at least '+minlength+' characters.';
          validate.error(element,errormsg);
          validate.proceed = 0;
        }
      }
    }
  },
  
  error : function(element,errormsg){
    //alert(element);
    if(element.previousSibling){
      var previousNode = element.previousSibling;
      if(previousNode.nodeName != "DIV" && previousNode.className != "error"){
        errorDiv = document.createElement("DIV");
        errorDiv.className = "error";
        errorSpan = document.createElement("SPAN");
        errorSpan.innerHTML = errormsg;
        errorDiv.appendChild(errorSpan);
        element.parentNode.insertBefore(errorDiv,element);
      } else {
        previousNode.innerHTML =  "<span>"+errormsg+"</span>";
      }
    }
  },
  
  reset : function(element){
    if(element.className.match(/\binvalid\b/gi)){
      element.className = element.className.replace("invalid","");
      if(element.previousSibling.nodeName == "DIV" && element.previousSibling.className == "error"){
        var oldError = element.previousSibling;
        element.parentNode.removeChild(oldError);
      }
    }
  }
}

addEvent(window, 'load', function(){
  if(document.forms){
    for(i=0;i<document.forms.length;i++){
	  var registration = document.forms[i];
      validate.listen(registration);
      registration.onsubmit = function(e){
	    e.preventDefault();
        if(validate.init(this)){
		 J.ajax({
	      type: "POST",
	      url: "sendmail.php",
	      data:"name="+J("input#name").val()+"&email="+J("input#email").val()+"&message="+J("textarea#message").val(),
	      success: function(){
	        J("#success").css("display","inline");
			J("#success").delay(4000).fadeOut(500);
			document.getElementById("name").value = "";
			document.getElementById("email").value = "";
			document.getElementById("message").value = "";
          }
	     });						  
		}
      }
    }
  }
});