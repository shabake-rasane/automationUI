jQuery(document).ready(function (a) {
    text_editor_summerNote_load();
    upload_input_set();
    select_to_selectize();
    select_cc_selectize();
    select_bcc_selectize();
    tool_tip_on_mail();
    cc_and_bcc_address_control();
    // برای پاک کردن سلکتور گیرندگان یا رونوشت یا رونوشت پنهان
    clearFirstSelect()
});
function clearFirstSelect() {
    var $select =  $("#select-to").selectize();
    var selectize = $select[0].selectize;
    selectize.clear();
    $select =  $("#select-to-cc").selectize();
    selectize = $select[0].selectize;
    selectize.clear();
    $select =  $("#select-to-bcc").selectize();
    selectize = $select[0].selectize;
    selectize.clear();
}
function text_editor_summerNote_load() {
    $(".summernote").summernote({
        height: 150,
        minHeight: null,
        maxHeight: null,
        focus: true,
        codemirror: {theme: "monokai"}
    })
}
function upload_input_set() {
    $("#file-3").fileinput({showCaption: false, browseClass: "btn btn-ls", fileType: "any", showUpload: false})
}
function tool_tip_on_mail() {
    $(".tooltipMail").tooltip({animation: true})
}
function cc_and_bcc_address_control() {
    $(".addBcc").click(function () {
        $(".addBccView").slideToggle()
    });
    $(".addCc").click(function () {
        $(".addCcView").slideToggle()
    })
}
//select girandegan
function select_to_selectize() {
    $("#select-to").selectize({
        plugins: ["remove_button"],
        persist: false,
        maxItems: null
    })
}
//select ronevesh
function select_cc_selectize() {
    $("#select-to-cc").selectize({
        plugins: ["remove_button"],
        persist: false,
        maxItems: null
    })
}
//select ronevesht penhan
function select_bcc_selectize() {
    $("#select-to-bcc").selectize({
        plugins: ["remove_button"],
        persist: false,
        maxItems: null
    })
};