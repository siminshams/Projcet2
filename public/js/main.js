$(document).ready(function() {

  $(document).on("click", ".add-movie", addMovie);

  function addMovie() {
    var movie = {
      movieId: $(this).data("id"),
      title: $(this).data("title"),
      year: $(this).data("year"),
      overview: $(this).data("overview"),
      poster: $(this).data("poster")
    };
    $.post("/api/list/add", movie);
  }

});