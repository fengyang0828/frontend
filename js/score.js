function SelectClick() {
    var multipleOption = $('#score_selectpicker').val();
    console.log(multipleOption);
}

$('#score_selectpicker').on('change', function(){
    var selected = $(this).val();
    $('#scoreNameSearch').tagsinput('removeAll');
    for (var i = 0; i < selected.length; i++) {
        var text = $(this).find("option[value=" + selected[i]+"]").text();
        $('#scoreNameSearch').tagsinput('add', {id : selected[i], label : text});
    }
});

$('#bookmarkbutton').on('click', function(){
    if ($('#bookmarkdiv').visibility == 'show') {

    }
    $('#bookmarkdiv').show();
});


$(document).ready(function () {
    $('#scoreNameSearch').tagsinput({
        // itemValue: 'id',  // this will be used to set id of tag
        // itemText: 'label',  // this will be used to set text of tag
        // tagClass: 'label label-warning',
        typeahead: {
            afterSelect: function(val) { this.$element.val(""); },
            source: ['Alabama','Alaska','Arizona','Arkansas','California'],
        },
        freeInput: false
    });
    $('#scoreNameSearch').on('beforeItemRemove', function(event) {
        var item = event.item;
        $('#score_selectpicker').find("option[value=" + item.id +"]").attr('selected', false);
        $('#score_selectpicker').selectpicker('refresh');
    });
    var url="rest/score/getScoreNameForDropdown";
    $.ajax({
        type:"get",
        url:url,
        success:function(result){
            if(result != null) {
                for(var i=0; i<result.length; i++){
                    console.log(result[i].scoreId + "," + result[i].scoreName);
                    $('#score_selectpicker').append("<option value=" + result[i].scoreId + ">" + result[i].scoreName + "</option>");
                }
            }
            $('#score_selectpicker').selectpicker('refresh');
        },
        error:function(){
            alert('Error');
        }
    })
    $(function () {
        var sd = new Date(), ed = new Date();

        $('#startDate').datetimepicker({
            pickTime: false,
            format: "YYYY/MM/DD",
            defaultDate: sd,
            maxDate: ed
        });

        $('#endDate').datetimepicker({
            pickTime: false,
            format: "YYYY/MM/DD",
            defaultDate: ed,
            minDate: sd
        });

    });
    var jsonData = [];
    var fruits = 'Apple,Abbb,Orange,Banana,Strawberry,SSSS,SDF,E,F,DF,E,W,DSF,TEST11111111111111111'.split(',');
    for(var i=0;i<fruits.length;i++) jsonData.push({id:i,name:fruits[i]});
    var ms1 = $('#ms1').tagSuggest({
        data: jsonData,
        sortOrder: 'name',
        maxDropHeight: 200,
        name: 'ms1'
    });
});