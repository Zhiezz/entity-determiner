$(document).ready(function(){
  FirstLoad(0);
})

function FirstLoad(){
    console.log("First Load");

//	$.ajax({
//	    url: "/first_load",
//	    type: "post",
//	    contentType: 'HTML',
//	    dataType: 'json',
//	    data: JSON.stringify({'no_entry': 'no_entry'}),
//	    success: function(data){
//	    	console.log(data);
//	    },
//	    error: function(){
//	     	alert('Failure');
//	    }
//	})
}

function Result(){
    window.location.href = "/result";
}
