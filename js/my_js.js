$(document).ready(function(){
	FirstLoad();
	EntitiPopuler();
})

function switchMenu(self){
    var menu = $('#menu')
    var parentMenu = menu.parent();
    (parentMenu.hasClass('col-md-1') ?
        parentMenu.removeClass('col-md-1').addClass('col-md-2') :
        parentMenu.removeClass('col-md-2').addClass('col-md-1')
    )
    menu.toggle();
}

function FirstLoad(){
    $.ajax({
      url: "/firstload",
      type: "post",
      contentType: 'HTML',
      dataType: 'json',
      success: function(data){
      	$('.bucket').append("\
      		<h5 class='title-category' style='margin: 40px 10px 10px'>Terbaru</h5>\
			<div class='row-indonesia'></div>\
			<h5 class='title-category' style='margin: 30px 10px 10px'>\
				<i class='material-icons' style='vertical-align: bottom'>more_vert</i>\
				Dunia\
			</h5>\
			<div class='row-dunia'></div>\
			<h5 class='title-category' style='margin: 30px 20px 10px'>\
				<i class='material-icons' style='vertical-align: bottom'>more_vert</i>\
				Bisnis\
			</h5>\
			<div class='row-bisnis'></div>\
			<h5 class='title-category' style='margin: 30px 10px 10px'>\
				<i class='material-icons' style='vertical-align: bottom'>more_vert</i>\
				Teknologi\
			</h5>\
			<div class='row-teknologi'></div>\
			<h5 class='title-category' style='margin: 30px 10px 10px'>\
				<i class='material-icons' style='vertical-align: bottom'>more_vert</i>\
				Hiburan\
			</h5>\
			<div class='row-hiburan'></div>\
			<h5 class='title-category' style='margin: 30px 10px 10px'>\
				<i class='material-icons' style='vertical-align: bottom'>more_vert</i>\
				Olahraga\
			</h5>\
			<div class='row-olahraga'></div>\
			<h5 class='title-category' style='margin: 30px 10px 10px'>\
				<i class='material-icons' style='vertical-align: bottom'>more_vert</i>\
				Sains\
			</h5>\
			<div class='row-science'></div>\
			<h5 class='title-category' style='margin: 30px 10px 10px'>\
				<i class='material-icons' style='vertical-align: bottom'>more_vert</i>\
				Kesehatan\
			</h5>\
			<div class='row-kesehatan'></div>\
		")

      	$.each(data, function(index, data){
      		var cat = "'"+data.category+"'"
      		$('.row-'+ data.category).append('\
      			<div class="card card-headline" style="margin-bottom: 10px">\
					<div class="card-body">\
						<a onclick="ResultPage('+cat+','+data.id+')" class="title-news title-news-'+ data.id +'" style="display: block;">'+ data.title +'</a>\
						<span style="font-size: 11px; color: black">\
						<img src="https://www.google.com/s2/favicons?domain='+ data.host +'" width="16" height="16" style="margin-right: 5px">\
						<font style="font-weight: 700">'+ data.host +'</font> - '+ data.published_at +'</span>\
						<hr style="margin: 10px 0px">\
						<p style="font-size: 13px">'+ data.spoiler_content +'</p>\
						<a onclick="ResultPage('+cat+','+data.id+')" class="title-news title-news-"'+ data.id +' style="float:right; font-size: 11px; cursor: pointer;">Lihat Selengkapnya</a>\
					</div> \
				</div>\
      		')
      	})
      },
      error: function(){
        alert('Failure');
      }
	})
}

function EntitiPopuler(){
	$.ajax({
      url: "/entitipopuler",
      type: "post",
      contentType: 'HTML',
      dataType: 'json',
      success: function(data){
      	$.each(data, function(index, data){
  			$('.card-entity-populer').append('\
      			<button class="entity-populer">'+ data[0] +'\
					<span style="font-weight: 700; margin-left: 5px">\
						'+ data[1] +'\
					</span>\
				</button>\
  			')
  		})
  		$('.card-entity-populer').append('<hr style="margin: 10px 0px">\
  			<a href="/" style="font-size: 13px; color: #50af55">Selengkapnya</a>')
      },
      error: function(){
        alert('Failure');
      }
    })
}

function capitalizeFirstLetter(string) {
    return string[0].toUpperCase() + string.slice(1);
}

function Category(category, logo, page){
	var global_logo = logo
	$('.left-menu').removeClass('active')
	$('.left-menu-'+category).addClass('active')
	$.ajax({
      url: "/category",
      type: "post",
      contentType: 'HTML',
      dataType: 'json',
      data: JSON.stringify({'category': category, 'page': page}),
      success: function(data){
      	if(page > 0){
      		$('.btn-load-more').hide()
      		$.each(data, function(index, data){
      			var cat = "'"+data.category+"'"
          		$('.row-'+ category).append('\
          			<div class="card card-headline" style="margin-bottom: 10px">\
						<div class="card-body">\
							<a onclick="ResultPage('+cat+','+data.id+')" class="title-news title-news-'+ data.id +'" style="display: block">'+ data.title +'</a>\
							<span style="font-size: 11px; color: black">\
							<img src="https://www.google.com/s2/favicons?domain='+ data.host +'" width="16" height="16" style="margin-right: 5px">\
							<font style="font-weight: 700">'+ data.host +'</font> - '+ data.published_at +'</span>\
							<hr style="margin: 10px 0px">\
							<p style="font-size: 13px">'+ data.spoiler_content +'</p>\
							<a onclick="ResultPage('+cat+','+data.id+')" class="title-news title-news-"'+ data.id +' style="float:right; font-size: 11px; cursor: pointer;">Lihat Selengkapnya</a>\
						</div> \
					</div>\
          		')
          	})

          	var cat = "'"+category+"'"
          	var logo = "'"+global_logo+"'"
          	var tes = '<button onclick="Category('+cat+','+logo+','+(page + 10)+')" type="button" class="btn btn-primary btn-load-more">Load More</button>'
          	$('.row-'+ category).append(tes)
      	} else {
      		$('.bucket').html('')
          	$('.bucket').append('\
          		<h5 style="margin: 40px 20px 10px">\
          		<i class="material-icons" style="vertical-align: bottom; margin-right: 5px">'+ global_logo +'</i>\
          		'+ capitalizeFirstLetter(category) +'</h5>\
				<div class="row-'+ category +'"></div>\
			')
          	$.each(data, function(index, data){
      			var cat = "'"+data.category+"'"
          		$('.row-'+ category).append('\
          			<div class="card card-headline" style="margin-bottom: 10px">\
						<div class="card-body">\
							<a onclick="ResultPage('+cat+','+data.id+')" class="title-news title-news-'+ data.id +'" style="display: block">'+ data.title +'</a>\
							<span style="font-size: 11px; color: black">\
							<img src="https://www.google.com/s2/favicons?domain='+ data.host +'" width="16" height="16" style="margin-right: 5px">\
							<font style="font-weight: 700">'+ data.host +'</font> - '+ data.published_at +'</span>\
							<hr style="margin: 10px 0px">\
							<p style="font-size: 13px">'+ data.spoiler_content +'</p>\
							<a onclick="ResultPage('+cat+','+data.id+')" class="title-news title-news-"'+ data.id +' style="float:right; font-size: 11px; cursor: pointer;">Lihat Selengkapnya</a>\
						</div> \
					</div>\
          		')
          	})

          	var cat = "'"+category+"'"
          	var logo = "'"+global_logo+"'"
          	var tes = '<button onclick="Category('+cat+','+logo+','+(page + 10)+')" type="button" class="btn btn-primary btn-load-more">Load More</button>'
          	$('.row-'+ category).append(tes)
      	}
      },
      error: function(e){
        alert('Failure');
      }
    })
}

function ResultPage(table, idx){
	$('.row-utama').html("")
	$.ajax({
      url: "/result",
      type: "post",
      contentType: 'HTML',
      dataType: 'json',
      data: JSON.stringify({'idx': idx, 'table': table}),
      success: function(data){
      	data = data[0]
      	$('.row-utama').append('\
      		<div class="col-md-1"></div>\
			<div class="col-md-7" style="margin-top: 7px">\
				<button class="btn-back-result" onclick="location.reload();">\
					<i class="material-icons" style="font-size: 20px; vertical-align: middle;">arrow_back</i>\
					Kembali\
				</button>\
				\
				<div class="card card-headline" style="margin: 10px 0px 10px 0px">\
					<div class="card-body content">\
						<h5>'+ data.title +'</h5>\
						<span style="font-size: 13px; color: black">\
							<img src="https://www.google.com/s2/favicons?domain='+ data.url +'" width="16" height="16" style="margin-right: 5px">\
							<font style="font-weight: 700">'+ data.host +'</font>\
							 - '+ data.published_at +'\
						</span>\
						\
						<hr style="margin: 10px 0px; border-bottom: 2px solid #eaeaea">\
						\
						'+data.tagged_content+'\
						\
						<hr style="margin: 10px 0px; border-bottom: 2px solid #eaeaea">\
						\
						<span style="font-size: 13px; color: black">\
							Sumber : <a href="'+data.url+'" style="color: #50af55" target="blank_">'+data.url+'</a>\
						</span>\
					</div> \
				</div>\
				\
				<h6 style="margin: 23px 20px 5px 20px; font-weight: 500; font-size: 13px">BERITA LAINYA</h6>\
				<div class="row">\
					<div class="col-md-6" style="padding-right: 5px">\
						<div class="card card-news-lainya" style="margin-bottom: 10px">\
							<div class="card-body" style="padding-top: 10px">\
								<span style="font-size: 10px; color: black">\
									<img src="https://www.google.com/s2/favicons?domain=www.beritagar.id" width="16" height="16" style="margin-right: 5px">\
									beritagar.id\
								</span>\
								<a class="news-lainya" href="#" style="margin-top: 5px">Selain Novanto, KPK Cari Pihak Lain yang terlibat e-KTP</a>\
							</div>\
						</div>\
					</div>\
					<div class="col-md-6" style="padding-left: 5px">\
						<div class="card card-news-lainya" style="margin-bottom: 10px">\
							<div class="card-body" style="padding-top: 10px">\
								<span style="font-size: 10px; color: black">\
									<img src="https://www.google.com/s2/favicons?domain=www.beritagar.id" width="16" height="16" style="margin-right: 5px">\
									beritagar.id\
								</span>\
								<a class="news-lainya" href="#" style="margin-top: 5px">Selain Novanto, KPK Cari Pihak Lain yang terlibat e-KTP</a>\
							</div>\
						</div>\
					</div>\
				</div>\
			</div>\
			\
			<div class="col-md-3">\
				<div>\
					<h6 style="margin: 23px 20px 5px 20px; font-weight: 500; font-size: 13px">ENTITAS BERITA</h6>\
					<div class="card card-all-entity">\
						<div class="card-body">\
							<table class="table table-hover" style="font-size: 13px">\
							  <thead>\
							    <tr>\
							      <th scope="col"></th>\
							      <th scope="col">Entitas</th>\
							      <th scope="col">Ket.</th>\
							    </tr>\
							  </thead>\
							  <tbody class="entity-table">\
							  </tbody>\
							</table>\
						</div>\
					</div>\
				</div>\
			</div>\
			\
			<div class="col-md-1"></div>\
      	')
		var ent_label = data.entity_label;
		$.each(ent_label, function(index, ent_label){
			$('.entity-table').append('\
				<tr>\
			      <th scope="row">'+ (index + 1) +'</th>\
			      <td>'+ ent_label[0] +'</td>\
			      <td>'+ ent_label[1] +'</td>\
			    </tr>\
			')
		})
      },
      error: function(e){
      	alert('Failure');
      }
    })
}

function Repository(){
	$('.left-menu').removeClass('active')
	$('.left-menu-repository').addClass('active')
	$.ajax({
    	url: "/repository",
	    type: "post",
	    contentType: 'HTML',
	    dataType: 'json',
	    success: function(data){
	    	$('.bucket').html("")
			$('.col-utama-right').html("")
			$('.bucket').append("\
		      		<h5 class='title-category' style='margin: 40px 10px 10px'>Repository</h5>\
		      ")
			$.each(data, function(index, data){
				var cat = "'"+data.category+"'"
	      		$('.bucket').append('\
	      			<div class="card card-headline" style="margin-bottom: 10px">\
						<div class="card-body">\
							<a onclick="ResultPage('+cat+','+data.id+')" class="title-news title-news-'+ data.id +'" style="display: block;">'+ data.title +'</a>\
							<span style="font-size: 11px; color: black">\
							<img src="https://www.google.com/s2/favicons?domain='+ data.host +'" width="16" height="16" style="margin-right: 5px">\
							<font style="font-weight: 700">'+ data.host +'</font> - '+ data.published_at +'</span>\
						</div> \
					</div>\
	      		')
	      	})
	  	},
	  	error: function(e){
      		alert('Failure');
      	}
    })
}


