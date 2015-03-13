$('form').append('<div><label class="checkbox-inline"><input type="checkbox" class="subType" value="�ͬ�" checked="checked">�ͬ�</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="�ʺ�" checked="checked">�ʺ�</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="���" checked="checked">���</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="�z��" checked="checked">�z��</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="�t��" checked="checked">�t��</label><label class="checkbox-inline"><input type="checkbox" class="subType" value="��|" checked="checked">��|</label><label class="checkbox-inline" style="display:none"><input type="checkbox" class="subType" value="<�ݶ�>" checked="checked"><�ݶ�></label></div>');
$(".subType").on("change", function() {
	return $("#inputKeyword").trigger("keyup");
});
$("#inputKeyword").off("keyup");
$("#inputKeyword").on("keyup", function() {
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
		if(type[x] === '�|��@'){
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
		if (r.type === "�|��@") {
			return $("#result").append('<tr data-pos="' + r.id + '" data-type="' + r.type + '"><td class="td-more"><a href="javascript:void(0);" class="btn-more">��h</a></td><td><div class="question">' + util.highlight(val, r.question) + '</div><div class="text-danger">' + util.htmlEncode(r.answer) + '</div></td></tr>');
		} else if (r.type === "�Ƨ�") {
			return $("#result").append('<tr data-pos="' + r.id + '" data-type="' + r.type + '"><td class="td-more"><a href="javascript:void(0);" class="btn-more">��h</a></td><td><div class="question">' + util.highlight(val, r.question) + '</div><div class="text-danger">' + util.htmlEncode(r.answer) + '</div></td></tr>');
		} else {
			md5name = CryptoJS.MD5(r.imgname).toString();
			imgurl = "http://vignette" + (util.getRandomInt(1, 5)) + ".wikia.nocookie.net/nekowiz/images/" + (md5name.charAt(0)) + "/" + (md5name.charAt(0)) + (md5name.charAt(1)) + "/" + r.imgname + "/revision/latest?path-prefix=zh";
			return $("#result").append('<tr data-pos="' + r.id + '" data-type="' + r.type + '"><td class="td-more"><!--<a href="javascript:void(0);" class="btn-more">��h</a>--></td><td><div class="col-sm-3"><img src="' + imgurl + '" /></div><div class="col-sm-5">' + util.highlight(val, r.question) + '</div><div class="col-sm-4 text-danger">' + util.htmlEncode(r.answer) + '</div></td></tr>');
		}
	});
});