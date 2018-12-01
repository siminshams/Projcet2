$(document).ready(function() {
    // Getting a reference to the input field where user adds a new todo
    var $newItemInput = $("input.new-item");
    // Our new todos will go inside the todoContainer
    var $listContainer = $(".list-container");
    // Adding event listeners for deleting, editing, and adding todos
    $(document).on("click", "button.delete", deleteList);
    $(document).on("click", "button.complete", toggleComplete);
    $(document).on("click", ".list-item", editList);
    $(document).on("keyup", ".list-item", finishEdit);
    $(document).on("blur", ".list-item", cancelEdit);
    $(document).on("submit", "#list-form", insertList);
  
    // Our initial todos array
    var lists = [];
  
    // Getting todos from database when page loads
    getLists();
  
    // This function resets the todos displayed with new todos from the database
    function initializeRows() {
      $listContainer.empty();
      var rowsToAdd = [];
      for (var i = 0; i < lists.length; i++) {
        rowsToAdd.push(createNewRow(lists[i]));
      }
      $listContainer.prepend(rowsToAdd);
    }
  
    // This function grabs todos from the database and updates the view
    function getLists() {
      $.get("/api/lists", function(data) {
        lists = data;
        initializeRows();
      });
    }
  
    // This function deletes a todo when the user clicks the delete button
    function deleteList(event) {
      event.stopPropagation();
      var id = $(this).data("id");
      $.ajax({
        method: "DELETE",
        url: "/api/lists/" + id
      }).then(getLists);
    }
  
    // This function handles showing the input box for a user to edit a todo
    function editList() {
      var currentList = $(this).data("list");
      $(this).children().hide();
      $(this).children("input.edit").val(currentList.text);
      $(this).children("input.edit").show();
      $(this).children("input.edit").focus();
    }
  
    // Toggles complete status
    function toggleComplete(event) {
      event.stopPropagation();
      var todo = $(this).parent().data("list");
      list.complete = !list.complete;
      updateList(list);
    }
  
    // This function starts updating a todo in the database if a user hits the "Enter Key"
    // While in edit mode
    function finishEdit(event) {
      var updatedList = $(this).data("list");
      if (event.which === 13) {
        updatedList.text = $(this).children("input").val().trim();
        $(this).blur();
        updateList(updatedList);
      }
    }
  
    // This function updates a todo in our database
    function updateList(list) {
      $.ajax({
        method: "PUT",
        url: "/api/lists",
        data: list
      }).then(getLists);
    }
  
    // This function is called whenever a todo item is in edit mode and loses focus
    // This cancels any edits being made
    function cancelEdit() {
      var currentList = $(this).data("list");
      if (currentList) {
        $(this).children().hide();
        $(this).children("input.edit").val(currentList.text);
        $(this).children("span").show();
        $(this).children("button").show();
      }
    }
  
    // This function constructs a todo-item row
    function createNewRow(list) {
      var $newInputRow = $(
        [
          "<li class='list-group-item todo-item'>",
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
  
    // This function inserts a new todo into our database and then updates the view
    function insertList(event) {
      event.preventDefault();
      var list = {
        text: $newItemInput.val().trim(),
        complete: false
      };
  
      $.post("/api/lists", list, getLists);
      $newItemInput.val("");
    }
  });
  