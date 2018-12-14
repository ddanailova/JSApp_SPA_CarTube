const userController = function () {

    const postLogin = function (ctx) {
        let username = ctx.params.username;
        let password = ctx.params.password;

        userModel.login(username, password).then(
            function (res) {
                userModel.saveSession(res);
                notifications.showInfo('Login successful');
                ctx.redirect('#/cars/all');
            }
        ).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    }

    const postRegister = function (ctx) {
        let username = ctx.params.username.trim();
        let password = ctx.params.password.trim();
        let repeatPassword = this.params.repeatPass.trim();

        userModel.register(username, password, repeatPassword)
            .then(function (response) {
                userModel.saveSession(response);
                notifications.showInfo('User registration successful.');
                ctx.redirect('#/cars/all');
            }).catch(
                function (res) {
                    notifications.handleError(res);
                }
            );
    }

    const logout = function (ctx) {
        userModel.logout()
            .then(function () {
                sessionStorage.clear();
                notifications.showInfo('Logout successful');
                ctx.redirect('#/login');
            }).catch(
                function (res) {
                    notifications.handleError(res);
                }
            );
    }
    const getHome = function (ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/home/home.hbs');
        })
    };

    const getLogin = function (ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/login/login.hbs');
        });
    }

    const getRegister = function (ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/register/register.hbs');
        });
    }


    return {
        getHome,
        getLogin,
        getRegister,
        postLogin,
        postRegister,
        logout
    }
}();