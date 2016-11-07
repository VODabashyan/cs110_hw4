'use strict';

let ulist = $('#ulist')
let searchbox = $('#searchtxtbx');
let messagebox = $('#msgtxtbx');



const show = function (items) {
ulist.html('');
items.forEach(function (n) {
let checked = "";
if (n.completed) {
checked = "checked";
}
$(ulist).append($('<li class="todostyle">' + n.message + '</li><input type="checkbox" class="checkbox" id="' + n.id + '" ' + checked + '/><button  class="delete" type="button" id=' + n.id + '>Delete!</button>'));
});
};


const update = function () {
$.ajax({
url: "/todos",
type: 'get',
dataType: 'json',
success: function (data) {
show(data.items);
},
error: function (data) {
alert('Error searching');
}
});
};





$('#searchbutton').on('click', function () {
const searchtext = searchbox.val();
$.ajax({
url: "/todos",
type: 'get',
dataType: 'json',
data: {
searchtext: searchtext
},
success: function (data) {
show(data.items);
},
error: function (data) {
alert('Error searching');
}
});
$('searchtxtbx').val('');
});





$('#addBtn').on('click', function () {
const val = $('#msgtxtbx').val();
$('#msgtxtbx').val(''); // clear the textbox
$.ajax({
url: "/todos",
type: 'post',
dataType: 'json',
data: JSON.stringify({
message: val,
completed: false,
}),
contentType: "application/json; charset=utf-8",
success: function (data) {
update();
},
error: function (data) {
alert('Error creating todo');
}
});
});

update();



ulist.on('click', '.delete', function (e) {
const todoID = e.target.id;
$.ajax({
url: "/todos/" + todoID,
type: 'delete',
success: function (data) {
update();
},
 
error: function (data) {
alert('Error deleting the item');
}
});
});



ulist.on('change', '.checkbox', function (e) {
const todoItemID = e.target.id;
const todoItem = {
completed: e.target.checked,
id: todoItemID,
}

$.ajax({
url: "/todos/" + todoItemID,
type: 'put',
dataType: 'json',
data: JSON.stringify(todoItem),
contentType: "application/json; charset=utf-8",
success: function (data) {
update();
},
error: function (data) {
alert('Error creating todo');
}
});
});