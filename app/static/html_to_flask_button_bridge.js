
function get_data() {
	$.ajax({
		url:"/temp",
		type: "GET",
		success: function(response) {
			
			var tmp = parseFloat(response);
			var resp = response;
			
			if(tmp > MAX_TEMP) {
				resp = "Temp too high";
			} else if(tmp < MIN_TEMP) {
				resp = "Temp too low";
			} else {
				resp = "Temp: " + tmp;		
			}
			console.log(tmp);	
			currTemp = tmp;
			cStatus = resp;

			return response;
		
		}

	})


}

$(document).ready(function() {







var stButton = $("#stBtn");
stButton.on("click", function()
{
	if (stButton.text() === "Start Cooking")
	{
	stButton.text("Cooking!");
	stButton.attr("disabled", true);
	$("#info").html("");
		$.ajax({
            url: "/stBtn",
            type: "post",
	        success: function(response)
			{
		        console.log(response);
		        stButton.text("Cooking!");
			}
		});
	}
	else if (stButton.text() === "Cooking!")
	{
		console.log("Already Cooking!")
	}


}
);


});
