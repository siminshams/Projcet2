$("#signupbtn").on("click",function(){
    var user = {
        name: "Simin"
    }
    $.ajax({
        url: "/api/signup",
        method: "POST", 
        data : user
      }).then(function(res) {
        console.log(res);
      });
})