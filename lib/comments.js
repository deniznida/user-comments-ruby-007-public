'use-strict';

$(document).ready(function(){
  // functions are called inside the document ready
  hideErrors();
  hideForm();
  addCommentListener();
  cancelListener();
  submitCommentListener();
});

// write your functions out here

function hideErrors(){
	$("[id$=-error]").hide();
}

function hideForm(){
	$("form").hide();
}

function addCommentListener(){
	$('#show-comment-form').click(function(){
		$('form').show();
	});
}

function cancelListener(){
	$('#cancel').click(function(){
		$('form').hide();
	});
}

function submitCommentListener(){
	$('form').submit(function(e){
		e.stopPropagation();
		e.preventDefault();

		var name = $('#comment-name').val();
		var email = $('#com-email').val();
		var comment = $('#comment').val();

		var user = new UserInput(name, email, comment);

		if (user.name && user.email && user.comment){
			var comment = $('div.newcomment').clone();

			comment.children('.name').html(user.name);
			comment.children('.email').html(user.email);
			comment.children('.comment').html(user.comment);
			comment.children('.date').html(new Date());

			comment.appendTo('#posts');
			//hideForm();
			$('#comment-name').val("");
			$('#com-email').val("");
			$('#comment').val("");
		} 

	});
}

function UserInput(name, email, comment){
	this.nameValidator(name);
	this.emailValidator(email);
	this.commentValidator(comment);
}

UserInput.prototype.nameValidator = function(name){
	if(name.length < 3){
		$('#com-name-error').show();
	} else {
		this.name = name;
	}
};

UserInput.prototype.emailValidator = function(email){
	var emailRegex = (/^[a-zA-Z0-9]+[a-zA-Z0-9_.-]+@[a-zA-Z0-9_-]+.([a-z]{2}|com|org|net|edu|gov|mil|biz|info|mobi|name|aero|asia|jobs|museum)$/);

	if(email.match(emailRegex)){
		this.email = email;
	} else {
		$('#com-email-error').show();
	}
};

UserInput.prototype.commentValidator = function(comment){
	if(comment.length === 0) {
		$('#comment-error').show();
	} else {
		this.comment = comment;
	}
};
