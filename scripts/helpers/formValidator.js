const formValidator = function () {
    const registerForm = function (selector) {
        $(selector).on('submit', function (ev) {
            $("input").removeClass('is-invalid');
            $(".validation-message").text('');
            let isFormValid = true;

            let validateUser = /^[a-zA-Z]{3,}$/;
            let validatePass = /^[a-zA-Z0-9]{6,}$/;
            let username = $('input[name="username"]');
            let password = $('input[name="password"]');
            let repeatPass = $('input[name="repeatPass"]');

            if (!validateUser.test(username.val().trim())) {
                isFormValid = false;
                username.addClass('is-invalid');
                $('#validate-username').text('Username must be more then 3 letters and contain no digits or symbols!');
                $(selector).trigger('reset');
            }else {
                if (!validatePass.test(password.val().trim())) {
                    isFormValid = false;
                    password.addClass('is-invalid');
                    $('#validate-password').text('Password must be more then 6 letters or digits!');
                    password.val('');
                    repeatPass.val('');
                }else{
                    if (password.val().trim() !== repeatPass.val().trim()) {
                        isFormValid = false;
                        repeatPass.addClass('is-invalid');
                        $('#validate-repeatPass').text('The given password does not match!');
                        password.val('');
                        repeatPass.val('');
                    }
                }
            }

            if (!isFormValid) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        })
    }
    const carForm = function (selector) {
        $(selector).on('submit', function (ev) {
            $("input").removeClass('is-invalid');
            $(".validation-message").text('');
            let isFormValid = true;

            if ($('input[name="title"]').val().trim().length > 33 || $('input[name="title"]').val().trim().length === 0) {
                isFormValid = false;
                $('input[name="title"]').addClass('is-invalid');
                $('#validate-title').text('The title length must not exceed 33 characters!');
            }

            if ($('input[name="description"]').val().trim().length < 30 || $('input[name="description"]').val().trim().length > 450) {
                isFormValid = false;
                $('input[name="description"]').addClass('is-invalid');
                $('#validate-description').text('The description length must not exceed 450 characters and should be at least 30!');
            }

            if ($('input[name="brand"]').val().trim().length > 11 || $('input[name="brand"]').val().trim().length === 0) {
                isFormValid = false;
                $('input[name="brand"]').addClass('is-invalid');
                $('#validate-brand').text('The brand length must not exceed 11 characters!');
            }

            if ($('input[name="model"]').val().trim().length > 11 || $('input[name="model"]').val().trim().length < 4) {
                isFormValid = false;
                $('input[name="model"]').addClass('is-invalid');
                $('#validate-model').text('The model length should be at least 4 characters and must not exceed 11 characters!');
            }

            if ($('input[name="fuel"]').val().trim().length > 11 || $('input[name="fuel"]').val().trim().length === 0) {
                isFormValid = false;
                $('input[name="fuel"]').addClass('is-invalid');
                $('#validate-fuel').text('The brand length must not exceed 11 characters!');
            }

            if ($('input[name="year"]').val() < 1970 || $('input[name="year"]').val() > 2030) {
                isFormValid = false;
                $('input[name="year"]').addClass('is-invalid');
                $('#validate-year').text('The year must be between 1970 and 2030!');
            }

            if ($('input[name="price"]').val() <= 0 || $('input[name="price"]').val() > 1000000) {
                isFormValid = false;
                $('input[name="price"]').addClass('is-invalid');
                $('#validate-price').text('The maximum price is 1000000$');

            }

            if ($('input[name="imageUrl"]').val().trim().length === 0) {
                isFormValid = false;
                $('input[name="imageUrl"]').addClass('is-invalid');
                $('#validate-imageUrl').text('The image is mandatory');
            }

            if (!isFormValid) {
                ev.preventDefault();
                ev.stopPropagation();
            }
        })
    }

    return {
        carForm,
        registerForm
    }
}();