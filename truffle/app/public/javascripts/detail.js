//detail.js

$(document).ready(function() {
	if ($('#account').children('span').text() == 'null') {
		$('#signout').hide();
	}
	else{
		$('a').hide();
		getBalance();
	}

	$('#create').children('button').click(function(){
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/create',
			async:true,
			data:{
				price:$('#create').children('#pri').val(),
				percentage:$('#create').children('#per').val()
			},
			success:function(data) {
				$('#message').text(data);
			}
		});
	});

	$('#price').children('.get').click(function(){
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/getprice',
			async:true,
			data:{
				address:$('#price').children('#add').val()
			},
			success:function(data) {
				$('#message').text(data);
			}
		});
	});

	$('#price').children('.set').click(function(){
		console.log($('#price').children('#add').val());
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/setprice',
			async:true,
			data:{
				address:$('#price').children('#add').val(),
				price:$('#price').children('#pri').val()
			},
			success:function(data) {
				$('#message').text(data);
				getbalance();
			}
		});
	});

	$('#percentage').children('.get').click(function(){
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/getpercentage',
			async:true,
			data:{
				address:$('#percentage').children('#add').val()
			},
			success:function(data) {
				$('#message').text(data);
			}
		});
	});

	$('#percentage').children('.set').click(function(){
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/setpercentage',
			async:true,
			data:{
				address:$('#percentage').children('#add').val(),
				percentage:$('#percentage').children('#per').val()
			},
			success:function(data) {
				$('#message').text(data);
				getbalance();
			}
		});
	});

	$('#addhospital').children('button').click(function(){
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/addhospital',
			async:true,
			data:{
				address:$('#addhospital').children('#add').val()
			},
			success:function(data) {
				$('#message').text(data);
				getbalance();
			}
		});
	});

	$('#addperson').children('button').click(function(){
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/addperson',
			async:true,
			data:{
				address:$('#addperson').children('#add').val(),
				value:$('#addperson').children('#val').val()
			},
			success:function(data) {
				$('#message').text(data);
				getBalance();
			}
		});
	});

	$('#givebill').children('button').click(function(){
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/givebill',
			async:true,
			data:{
				address:$('#givebill').children('#add').val(),
				to:$('#givebill').children('#to').val(),
				value:$('#givebill').children('#val').val()
			},
			success:function(data) {
				$('#message').text(data);
				getBalance();
			}
		});
	});

	$('#checkfee').children('button').click(function(){
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/checkfee',
			async:true,
			data:{
				address:$('#checkfee').children('#add').val(),
				to:$('#checkfee').children('#to').val()
			},
			success:function(data) {
				$('#message').text(data);
				getBalance();
			}
		});
	});

	$('#pay').children('button').click(function(){
		var htmlobj = $.ajax({
			type:'POST',
			url:'/users/pay',
			async:true,
			data:{
				address:$('#pay').children('#add').val(),
				to:$('#pay').children('#to').val(),
				value:$('#pay').children('#val').val()
			},
			success:function(data) {
				$('#message').text(data);
				getBalance();
			}
		});
	});
});

function getBalance() {
	var htmlobj = $.ajax({
		type:'GET',
		url:'/users/getbalance',
		async:true,
		success:function(data) {
			$('#balance').children('span').text(data);
		}
	});
}
