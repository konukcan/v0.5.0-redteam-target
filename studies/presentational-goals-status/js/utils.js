// add any helper js functions you need here
// e.g. slider aesthetics, text aesthetics, shuffling trial order (see docs for examples)


// make sure to call set_slider() in your plugin or in the on_load function
// of the page using the plugin
function set_slider() {
    // slider_parent could be something like '#jspsych-html-slider-response-response'
    $(slider_parent).slider();
    
    // hide slider handles, disable button
    // assuming you're using jsquery ui
    $('.ui-slider-handle').hide();
    // next_button could be something like '#jspsych-html-slider-response-next'
    $(next_button).prop('disabled', true);

    // add click event
    $(slider_parent).slider().on('slidestart', function() {
        // show handle
        $(this).find('.ui-slider-handle').show();
        $(next_button).prop('disabled', false);
    });
}
