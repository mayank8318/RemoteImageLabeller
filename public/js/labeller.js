function submitAndNext() {

}

function prevClick() {
	 $.ajax({
            type: "GET",
            url: "/prevClick",
            success: function (msg) {
                location.reload();
            }
     });
}