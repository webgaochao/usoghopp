/*xiaoneng    edit    2014/12/11  wh*/
var NTKF_PARAM = '';

var u = window.location.pathname;

$.ajax({
    url: "http://www.ugoshop.com/ajax_nTalker.php",
    dataType: 'jsonp',
    async : false,
    data: 'u=' + u,
    jsonp: 'callback',
    error: function() {
        console.log('ajax处理失败');
    },
    success: function(result) {
        // $.each(result, function(i, n) {
        //     alert("Name: " + i + ", Value: " + n);
        // });
        NTKF_PARAM = result;
        //console.log(result);
    }
});
