let input1 = document.getElementsByClassName("input1")[0];
let input2 = document.getElementsByClassName("input2")[0];

init();

// let input = JSON.parse($.cookie("input")) || {};

let data = $.cookie('form') ? JSON.parse($.cookie('form')) : {};

input1.onblur = function () {
    // input.input1 = input1.value;
    // console.log(input);
    // $.cookie('input', JSON.stringify(input));

    data.input1 = input1.value;

    console.log(data); // ==> { input1 : 'xxxx'}

    $.cookie('form', JSON.stringify(data));
}
input2.onblur = function () {
    // input.input2 = input2.value;
    // console.log(input);
    // $.cookie('input', JSON.stringify(input));

    // $.cookie('input2',input2.value);

    data.input2 = input2.value;

    console.log(data); // ==> { input2 : 'xxxx'}

    $.cookie('form', JSON.stringify(data));
}

function init() {


    // let data = JSON.parse($.cookie('input'));
    // console.log(data);
    // if (data) {
    //     input1.value = data.input1 || '';
    //     input2.value = data.input2 || '';
    // }

    // if($.cookie('input1')){

    //     input1.value = $.cookie('input1');
    // }

    // if($.cookie('input2')){

    //     input2.value = $.cookie('input2');
    // }
    let data = $.cookie('form') ? JSON.parse($.cookie('form')) : {};

    console.log('data ===>',data);
    if(data){

        input1.value = data.input1 || '';
        input2.value = data.input2 || '';
    }
}