$(function () {
    function after_form_submitted(data) {
        if (data.result == 'success') {
            $('form#contactForm').hide();
            $('#submitSuccessMessage').show();
            $('#submitErrorMessage').hide();
        }
        else {
            $('#submitErrorMessage').append('<ul></ul>');

            jQuery.each(data.errors, function (key, val) {
                $('#submitErrorMessage ul').append('<li>' + key + ':' + val + '</li>');
            });
            $('#submitSuccessMessage').hide();
            $('#submitErrorMessage').show();

            //reverse the response on the button
            $('button[type="button"]', $form).each(function () {
                $btn = $(this);
                label = $btn.prop('orig_label');
                if (label) {
                    $btn.prop('type', 'submit');
                    $btn.text(label);
                    $btn.prop('orig_label', '');
                }
            });

        }//else
    }

    $('#contactForm').submit(function (e) {
        e.preventDefault();

        $form = $(this);
        //show some response on the button
        $('button[type="submit"]', $form).each(function () {
            $btn = $(this);
            $btn.prop('type', 'button');
            $btn.prop('orig_label', $btn.text());
            $btn.text('Sending ...');
        });


        $.ajax({
            type: "POST",
            url: 'handler.php',
            data: $form.serialize(),
            success: after_form_submitted,
            dataType: 'json'
        });

    });
});