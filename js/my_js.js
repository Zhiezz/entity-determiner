$(document).ready(function(){
	FirstLoad();
	EntitiPopuler(20);
})

function switchMenu(){
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
      		<h5 class='title-category' style='margin: 20px 10px 10px'>Terbaru</h5>\
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

function EntitiPopuler(limit){
	$.ajax({
      url: "/entitipopuler",
      type: "post",
      contentType: 'HTML',
      dataType: 'json',
      data: JSON.stringify({'limit': limit}),
      success: function(data){
      	$.each(data, function(index, data){
      		var word = '"' + data[0] +'"';
  			$('.card-entity-populer').append("\
      			<button class='entity-populer' style='cursor: pointer' onclick='EntitySearch("+word+")'>"+ data[0] +"\
					<span style='font-weight: 700; margin-left: 5px'>\
						"+ data[1] +"\
					</span>\
				</button>\
  			")
  		})
  		$('.card-entity-populer').append('<hr style="margin: 10px 0px">\
  			<a style="font-size: 13px; color: #50af55; cursor: pointer" onclick="AllEntity(100)">Selengkapnya</a>')
      },
      error: function(){
        alert('Failure');
      }
    })
}

function Statistik(){
    $('.left-menu').removeClass('active')
    $('.left-menu-statistik').addClass('active')
    $.ajax({
    	url: "/statistik",
	    type: "post",
	    contentType: 'HTML',
	    dataType: 'json',
	    success: function(data){

	    	$('.bucket').html("")
            $('.col-utama-mid').html('')
            var cat = "";
            $.each(data, function(index, data){
                $('.col-utama-mid').append("\
                    <h5 class='title-category' style='margin: 10px 10px 10px'>"+capitalizeFirstLetter(data.category)+"<span style='font-size: 16px; color: #999;margin-top: 5px;float: right;'>Total Artikel "+data.count+"</span></h5>\
                    <div class='card card-headline card-statistik' style='margin: 20px 0px;'>\
                        <div class='card-body'>\
                            <table class='table table-hover' style='font-size: 13px'>\
                                <thead>\
                                    <tr>\
                                        <th scope='col' style='width: 75px!important;'></th>\
                                        <th scope='col'>Entitas Populer</th>\
                                    </tr>\
                                </thead>\
                                \
                                <tbody class='body-table-"+data.category+"'>\
                                </tbody>\
                            </table>\
                        </div> \
                    </div>\
                ")
                cat = data.category;
                $.each(data.entitas, function(index, value){
                    $('.body-table-'+cat).append('\
                        <tr>\
                            <th scope="row">'+(index+1)+'</th>\
                            <td>'+value+'</td>\
                        </tr>\
                    ')
                });
            });
	    },
	  	error: function(e){
      		alert('Failure');
      	}
    })
}

function AllEntity(limit){
	$('.left-menu').removeClass('active')
	$('.left-menu-all-entity').addClass('active')
	$.ajax({
      	url: "/entitipopuler",
	    type: "post",
	    contentType: 'HTML',
	    dataType: 'json',
	    data: JSON.stringify({'limit': limit}),
	    success: function(data){
	    	$('.bucket').html("")
			$('.col-utama-mid').html('')
			$('.col-utama-mid').append('\
				<div style="top: 140px; position: sticky;">\
					<div class="card" style="background-color: #f8f9fa; border:none;">\
						<div class="card-body card-entity-populer card-all-entity">\
							<span>Entitas Hari Ini</span>\
							<hr>\
						</div>\
					</div>\
				</div>\
			')
			$.each(data, function(index, data){
      		var word = '"' + data[0] +'"';
  			$('.card-all-entity').append("\
      			<button class='entity-populer' style='cursor: pointer' onclick='EntitySearch("+word+")'>"+ data[0] +"\
					<span style='font-weight: 700; margin-left: 5px'>\
						"+ data[1] +"\
					</span>\
				</button>\
  			")
  		})
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
      		if(data.length == 10){
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
	          	var btn = '<button onclick="Category('+cat+','+logo+','+(page + 10)+')" type="button" class="btn btn-primary btn-load-more">Load More</button>'
	          	$('.row-'+ category).append(btn)
	        } else {
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
	        }
      	} else {
      		$('.col-utama-mid').html("")
			$('.col-utama-right').html("")
			$('.col-utama-mid').append('\
          		<h5 style="margin: 20px 20px 10px; color: #50af55"">\
          		<i class="material-icons" style="vertical-align: bottom; margin-right: 5px; color: #50af55">'+ global_logo +'</i>\
          		'+ capitalizeFirstLetter(category) +'</h5>\
				<div class="row-'+ category +'"></div>\
			')
			if(data.length == 10){
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
	          	var btn = '<button onclick="Category('+cat+','+logo+','+(page + 10)+')" type="button" class="btn btn-primary btn-load-more">Load More</button>'
	          	$('.row-'+ category).append(btn)
	        } else {
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
	        }
      	}
      },
      error: function(e){
        alert('Failure');
      }
    })
}

function ResultPage(table, idx){
	$('.col-utama-mid').html("")
	$('.col-utama-right').html("")

	$.ajax({
      url: "/result",
      type: "post",
      contentType: 'HTML',
      dataType: 'json',
      data: JSON.stringify({'idx': idx, 'table': table}),
      success: function(data){
      	switchMenu();
      	data = data[0]
      	var cat = "'" + table + "'"
      	$('.col-utama-mid').append('\
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
		')
      	$('.col-utama-right').append('\
      		<div>\
				<h6 style="margin: 56px 20px 5px 20px; font-weight: 500; font-size: 13px">ENTITAS BERITA</h6>\
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

function BeritaLainya(){
	console.log("Berita Lainya")
	// <h5 style="margin: 40px 20px 5px 20px; font-weight: 500; font-size: 20px">BERITA LAINYA</h5>\
	// <div class="row">\
	// 	<div class="col-md-6" style="padding-right: 5px">\
	// 		<div class="card card-news-lainya" style="margin-bottom: 10px">\
	// 			<div class="card-body" style="padding-top: 10px">\
	// 				<span style="font-size: 10px; color: black">\
	// 					<img src="https://www.google.com/s2/favicons?domain=www.beritagar.id" width="16" height="16" style="margin-right: 5px">\
	// 					beritagar.id\
	// 				</span>\
	// 				<a class="news-lainya" href="#" style="margin-top: 5px">Selain Novanto, KPK Cari Pihak Lain yang terlibat e-KTP</a>\
	// 			</div>\
	// 		</div>\
	// 	</div>\
	// 	<div class="col-md-6" style="padding-left: 5px">\
	// 		<div class="card card-news-lainya" style="margin-bottom: 10px">\
	// 			<div class="card-body" style="padding-top: 10px">\
	// 				<span style="font-size: 10px; color: black">\
	// 					<img src="https://www.google.com/s2/favicons?domain=www.beritagar.id" width="16" height="16" style="margin-right: 5px">\
	// 					beritagar.id\
	// 				</span>\
	// 				<a class="news-lainya" href="#" style="margin-top: 5px">Selain Novanto, KPK Cari Pihak Lain yang terlibat e-KTP</a>\
	// 			</div>\
	// 		</div>\
	// 	</div>\
	// </div>\
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
			$('.col-utama-mid').html("")
			$('.col-utama-mid').append("\
		      		<h5 class='title-category' style='margin: 40px 10px 10px'>Repository</h5>\
		      ")
			$.each(data, function(index, data){
				var cat = "'"+data.category+"'"
	      		$('.col-utama-mid').append('\
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

function Tag(){
	$('.left-menu').removeClass('active')
	$('.left-menu-tagged-corpus').addClass('active')
	$.ajax({
    	url: "/tag",
	    type: "post",
	    contentType: 'HTML',
	    dataType: 'json',
	    success: function(data){
	    	$('.bucket').html("")
			$('.col-utama-right').html("")
			$('.bucket').append("\
		      	<h5 class='title-category' style='margin: 40px 10px 10px'>Indonesia Manually Tagged Corpus (UI)</h5>\
				<div class='card card-headline' style='margin-bottom: 10px'>\
					<div class='card-body'>\
						<table class='table table-hover' style='font-size: 13px'>\
							<thead>\
							    <tr>\
							      	<th scope='col'></th>\
								    <th scope='col'>Entity</th>\
								    <th scope='col'>TAG</th>\
							    </tr>\
							</thead>\
							\
							<tbody class='body-table'>\
							</tbody>\
						</table>\
					</div> \
				</div>\
			")
			$.each(data, function(index, data){
				$('.body-table').append('\
					<tr>\
				      	<th scope="row">'+(index+1)+'</th>\
				      	<td>'+data[0]+'</td>\
				      	<td>'+data[1]+'</td>\
				    </tr>\
				')
			})
	    },
	  	error: function(e){
      		alert('Failure');
      	}
    })
}

function About(){
	$('.bucket').html("")
	$('.col-utama-right').html("")
	$('.bucket').append('\
		<div class="card card-headline" style="margin-top:30px; padding:20px">\
            <div class="card-body">\
                <a href="http://www.amikom.ac.id" target="_blank">\
                    <img src="https://preview.ibb.co/gfzTzJ/logo_amikom.png" style="width:16%; display: block; margin: 0px auto 20px;">\
                </a>\
                <h3 align="center">Determining Entities From Online Media Reporting Using Hidden Markov Model and POS Tagging Method</h2>\
                <h5 align="center">(Menentukan Entitas Dari Pemberitaan Media Daring Menggunakan Hidden Markov Model dan Metode Pos Tagging)</h3>\
                <hr style="border-width:3px;">\
                <p align="center">\
                    Aplikasi yang membantu mengetahui semua entitas yang dibicarakan dalam suatu pemberitaan dari Google News Indonesia.\
                    <br>Entity Determiner menggunakan kecerdasan buatan dengan metode POS Tagging, dan permodelan Hidden Markov Model.\
                </p>\
            </div>\
        </div>\
	')
}

function SubmitEntitySearch(form){
	var word = $(form).val();
	console.log(word);
	EntitySearch(word);
}

function EntitySearch(word){
	$.ajax({
    	url: "/entity_search",
	    type: "post",
	    contentType: 'HTML',
	    dataType: 'json',
	    data: JSON.stringify({'word': word}),
	    success: function(data){
			if(data[0].length != 0){
				$('.bucket').html("")
				$('.col-utama-mid').html('')
				$('.col-utama-mid').append('\
					  <h5 style="margin: 20px 20px 10px">Hasil pencarian kata kunci "'+ word +'"</h5>\
					  <hr style="margin-top: 13px">\
				')
	
				var res_cat = data[1];
				$.each(res_cat, function(index, res_cat){
					console.log(res_cat)
					$('.col-utama-mid').append('\
						<h5 class="title-category" style="margin: 30px 20px 10px">\
							<i class="material-icons" style="vertical-align: bottom">more_vert</i>\
							'+capitalizeFirstLetter(res_cat)+'\
						</h5>\
						<div class="row-'+res_cat+'"></div>');
				})
	
				var res_dt = data[0];
				$.each(res_dt, function(index, res_dt){
					  var cat = "'"+res_dt.category+"'"
					  $('.row-'+ res_dt.category).append('\
						  <div class="card card-headline" style="margin-bottom: 10px">\
							<div class="card-body">\
								<a onclick="ResultPage('+cat+','+res_dt.id+')" class="title-news title-news-'+ res_dt.id +'" style="display: block">'+ res_dt.title +'</a>\
								<span style="font-size: 11px; color: black">\
								<img src="https://www.google.com/s2/favicons?domain='+ res_dt.host +'" width="16" height="16" style="margin-right: 5px">\
								<font style="font-weight: 700">'+ res_dt.host +'</font> - '+ res_dt.published_at +'</span>\
								<hr style="margin: 10px 0px">\
								<p style="font-size: 13px">'+ res_dt.spoiler_content +'</p>\
								<a onclick="ResultPage('+cat+','+res_dt.id+')" class="title-news title-news-"'+ res_dt.id +' style="float:right; font-size: 11px; cursor: pointer;">Lihat Selengkapnya</a>\
							</div> \
						</div>\
					  ')
				  })
			}else{
				$('.bucket').html("")
				$('.col-utama-mid').html('')
				$('.col-utama-mid').append('\
					  <h5 style="margin: 20px 20px 10px">Tidak ditemukan berita dengan kata kunci "'+ word +'"</h5>\
					  <hr style="margin-top: 13px">\
				')
			}
	    },
	  	error: function(e){
      		alert('Failure');
      	}
    })
}