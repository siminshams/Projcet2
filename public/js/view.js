$(document).ready(function() {

  var $newItemInput = $("input.new-item");

  var $listContainer = $(".list-container");

  $(document).on("click", "button.delete", deleteList);
  $(document).on("click", "button.complete", toggleComplete);
  $(document).on("click", ".list-item", editList);
  $(document).on("keyup", ".list-item", finishEdit);
  $(document).on("blur", ".list-item", cancelEdit);
  $(document).on("submit", "#list-form", insertList);

  $(document).on("click", ".search", searchPartial);
  
  $(document).on("click", ".add-movie", addMovie);

  function addMovie(event) {
    event.preventDefault();
    var movieId = $(this).data("id");
    $.ajax({
      method: "POST",
      url: "/api/list/add/" + movieId
    });
  }

  var lists = [];
  getLists();
  
  function initializeRows() {
    $listContainer.empty();
    var rowsToAdd = [];
    for (var i = 0; i < lists.length; i++) {
      rowsToAdd.push(createNewRow(lists[i]));
    }
    $listContainer.prepend(rowsToAdd);
  }

 
  function getLists() {
    $.get("/api/lists", function(data) {
      lists = data;
      initializeRows();
    });
  }

  
  function deleteList(event) {
    event.stopPropagation();
    var id = $(this).data("id");
    $.ajax({
      method: "DELETE",
      url: "/api/lists/" + id
    }).then(getLists);
  }


  function editList() {
    var currentList = $(this).data("list");
    $(this).children().hide();
    $(this).children("input.edit").val(currentList.text);
    $(this).children("input.edit").show();
    $(this).children("input.edit").focus();
  }


  function toggleComplete(event) {
    event.stopPropagation();
    var list = $(this).parent().data("list");
    list.complete = !list.complete;
    updateList(list);
  }


  function finishEdit(event) {
    var updatedList = $(this).data("list");
    if (event.which === 13) {
      updatedList.text = $(this).children("input").val().trim();
      $(this).blur();
      updateList(updatedList);
    }
  }

  
  function updateList(list) {
    $.ajax({
      method: "PUT",
      url: "/api/lists",
      data: list
    }).then(getLists);
  }


  function cancelEdit() {
    var currentList = $(this).data("list");
    if (currentList) {
      $(this).children().hide();
      $(this).children("input.edit").val(currentList.text);
      $(this).children("span").show();
      $(this).children("button").show();
    }
  }


  function createNewRow(list) {
    var $newInputRow = $(
      [
        "<li class='list-group-item list-item'>",
        "<span>",
        list.text,
        "</span>",
        "<input type='text' class='edit' style='display: none;'>",
        "<button class='delete btn btn-danger'>x</button>",
        "<button class='complete btn btn-primary'>✓</button>",
        "</li>"
      ].join("")
    );

    $newInputRow.find("button.delete").data("id", list.id);
    $newInputRow.find("input.edit").css("display", "none");
    $newInputRow.data("list", list);
    if (list.complete) {
      $newInputRow.find("span").css("text-decoration", "line-through");
    }
    return $newInputRow;
  }

  
  function insertList(event) {
    event.preventDefault();
    console.log('insertList');
    var list = {
      text: $newItemInput.val().trim(),
      complete: false
    };

    $.post("/api/lists", list, getLists);
    $newItemInput.val("");
  }

  function searchPartial(event) {
    event.preventDefault();
    // switch partial
  }
});