$('form').append('<div><label class="checkbox-inline"><input type="checkbox" class="subType" value="生活" checked="checked">生活</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="動漫" checked="checked">動漫</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="文科" checked="checked">文科</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="理科" checked="checked">理科</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="演藝" checked="checked">演藝</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="體育" checked="checked">體育</label><label class="checkbox-inline" style="display:none"><input type="checkbox" class="subType" value="<待填>" checked="checked"><待填></label></div>');
$('form').append('<div><label class="checkbox-inline"><input type="checkbox" class="eventType" checked="checked">按下Enter查詢</label></div>');
$(".subType").on("change", function() {
	return $("#inputKeyword").trigger("keyup");
});
$('#fromNormal').on("change",function(){
  $('.subType').prop('disabled',!$(this).prop('checked'));
});
$("#inputKeyword").off("keyup");
$("#inputKeyword").on("keyup", function(event) {
	if($('.eventType').prop('checked') && event.keyCode != 13){
		return;
	}
	var type, val, result, arr;
	val = $(this).val();
	$("#question-info").removeClass("active");
	$("#result").html("");
	if (val.length <= 0) {
		return;
	}
	val = val.toLowerCase().split(" ");
	type = $(".from-source:checked").map(function() {
		return this.value;
	}).get();
	subType = $(".subType:checked").map(function() {
		return this.value;
	}).get();
	arr = [];
	for(x in type){
		obj = {};
		obj['type']=type[x];
		obj['fulltext'] = {likenocase:val[0]};
		if(type[x] === '四選一'){
			obj['subType']={likenocase:subType};
		}
		arr.push(obj);
	}
	result = wizLoader.data.db(arr);
	for(var i=1;i<val.length;i++){
		result = result.filter({fulltext:{likenocase: val[i]}});
	}
	result.each(function(r) {
		var imgurl, md5name;
		if (r.type === "四選一") {
			return $("#result").append('<tr data-pos="' + r.id + '" data-type="' + r.type + '"><td class="td-more"><a href="javascript:void(0);" class="btn-more">更多</a></td><td><div class="question">' + util.highlight(val, r.question) + '</div><div class="text-danger">' + util.htmlEncode(r.answer) + '</div></td></tr>');
		} else if (r.type === "排序") {
			return $("#result").append('<tr data-pos="' + r.id + '" data-type="' + r.type + '"><td class="td-more"><a href="javascript:void(0);" class="btn-more">更多</a></td><td><div class="question">' + util.highlight(val, r.question) + '</div><div class="text-danger">' + util.htmlEncode(r.answer) + '</div></td></tr>');
		} else {
			md5name = CryptoJS.MD5(r.imgname).toString();
			imgurl = "http://vignette" + (util.getRandomInt(1, 5)) + ".wikia.nocookie.net/nekowiz/images/" + (md5name.charAt(0)) + "/" + (md5name.charAt(0)) + (md5name.charAt(1)) + "/" + r.imgname + "/revision/latest?path-prefix=zh";
			return $("#result").append('<tr data-pos="' + r.id + '" data-type="' + r.type + '"><td class="td-more"><!--<a href="javascript:void(0);" class="btn-more">更多</a>--></td><td><div class="col-sm-3"><img src="' + imgurl + '" /></div><div class="col-sm-5">' + util.highlight(val, r.question) + '</div><div class="col-sm-4 text-danger">' + util.htmlEncode(r.answer) + '</div></td></tr>');
		}
	});
});