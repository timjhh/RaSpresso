var stButton = $("#stButton");
stButton.click(function()
{
	console.log(stButton.text());
	if (stButton.text() === "Start Cooking")
	{
		$.ajax({
            url: "/stButton",
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

	console.log(stButton.text());

}
);