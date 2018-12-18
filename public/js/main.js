$(document).ready(function() {
  
  $(document).on("click", ".add-movie", addMovie);
  $(document).on("click", ".mark-watched", markWatched);
  $(document).on("click", ".mark-unwatched", markUnwatched);

  function addMovie() {
    var movie = {
      movieId: $(this).data("id"),
      title: $(this).data("title"),
      year: $(this).data("year"),
      overview: $(this).data("overview"),
      poster: $(this).data("poster")
    };
    $.ajax({
      url: "/api/list/add",
      type: "POST",
      data: movie
    });
  }

  function markWatched() {
    var movie = {
      movieId: $(this).data("movieid")
    }
    $.ajax({
      url: "/api/list/watched",
      type: "PUT",
      data: movie
    });
  }

  function markUnwatched() {
    var movie = {
      movieId: $(this).data("movieid")
    }
    $.ajax({
      url: "/api/list/unwatched",
      type: "PUT",
      data: movie
    });
  }

});