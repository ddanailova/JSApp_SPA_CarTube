const carController = function () {

    const remove = function (ctx) {
        let id = ctx.params.id;

        carModel.remove(id).then(
            function () {
                notifications.showInfo('Listing deleted!');
                alert('Fix the pop up!');
                ctx.redirect('#/cars/all');
            }).catch(
            function (res) {
                notifications.handleError(res);
            }
        );;
    }

    const details = function (ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        let id = ctx.params.id;
        ctx.carId = ctx.params.id;

        carModel.getDetails(id).then(
            function (res) {
                ctx.title = res.title;
                ctx.description = res.description;
                ctx.brand = res.brand;
                ctx.model = res.model;
                ctx.year = res.year;
                ctx.imageUrl = res.imageUrl;
                ctx.fuel = res.fuel;
                ctx.price = res.price;
                ctx.seller = res.seller;

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                }).then(function () {
                    this.partial('./templates/cars/carDetails.hbs');
                });
            })
    }

    const getAll = function (ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.noCars = false;

        carModel.getAll().then(
            function (res) {

                //check if there are ads
                if (res.length === 0) {
                    ctx.noCars = true;
                    return;
                }
                //check if user is the creator
                res.forEach(carAd => {
                    carAd.isAuthor = sessionStorage.getItem('userId') === carAd._acl.creator;
                });

                ctx.cars = res;

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    listCars: './templates/cars/listCars.hbs',
                }).then(function () {
                    this.partial('./templates/cars/allCars.hbs');
                });
            }
        ).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    }


    const getMine = function (ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        ctx.noCars = false;

        carModel.getMine(ctx.username).then(
            function (res) {
                //check if there are ads
                if (res.length === 0) {
                    ctx.noCars = true;
                    return;
                }
                //filter just my cars

                // ctx.cars = res.filter(carAd => sessionStorage.getItem('userId') === carAd._acl.creator);
                res.forEach(carAd => carAd.isAuthor = 'true');
                ctx.cars = res;

                ctx.loadPartials({
                    header: './templates/common/header.hbs',
                    footer: './templates/common/footer.hbs',
                    listMyCars: './templates/cars/listMyCars.hbs',
                }).then(function () {
                    this.partial('./templates/cars/myCars.hbs');
                })
            }
        ).catch(
            function (res) {
                notifications.handleError(res);
            }
        );
    }

    const getEdit = function (ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');
        let id = ctx.params.id;

        carModel.getDetails(id).then(function (res) {
            ctx.loadPartials({
                header: './templates/common/header.hbs',
                footer: './templates/common/footer.hbs',
            }).then(function () {
                ctx.item = res;
                ctx.item.id=id;
                this.partial('./templates/cars/editCar.hbs')
            })
        }).catch(
            function (res) {
                notifications.handleError(res);
            }
        )
    }

    const postEdit = function (ctx) {
        let title = ctx.params.title.trim();
        let description = ctx.params.description.trim();
        let brand = ctx.params.brand.trim();
        let model = ctx.params.model.trim();
        let year = ctx.params.year.trim();
        let imageUrl = ctx.params.imageUrl.trim();
        let fuel = ctx.params.fuel.trim();
        let price = ctx.params.price.trim();
        let seller = sessionStorage.getItem('username');
        let id = ctx.params.id;

        carModel.edit(id, title, description, brand, model, year, imageUrl, fuel, price, seller)
            .then(
                function () {
                    notifications.showInfo('Listing edited!');
                    ctx.redirect('#/cars/all');
                }
            ).catch(
                function (res) {
                    notifications.handleError(res);
                }
            )
    }

    const getCreate = function (ctx) {
        ctx.loggedIn = sessionStorage.getItem('authtoken') !== null;
        ctx.username = sessionStorage.getItem('username');

        ctx.loadPartials({
            header: './templates/common/header.hbs',
            footer: './templates/common/footer.hbs',
        }).then(function () {
            this.partial('./templates/cars/createCar.hbs')
        })
    }

    const postCreate = function (ctx) {
        let title = ctx.params.title.trim();
        let description = ctx.params.description.trim();
        let brand = ctx.params.brand.trim();
        let model = ctx.params.model.trim();
        let year = ctx.params.year.trim();
        let imageUrl = ctx.params.imageUrl.trim();
        let fuel = ctx.params.fuel.trim();
        let price = ctx.params.price.trim();
        let seller = sessionStorage.getItem('username');

        carModel.create(title, description, brand, model, year, imageUrl, fuel, price, seller)
            .then(
                function () {
                    notifications.showInfo('Listing created!');
                    alert('Fix the pop up!');
                    ctx.redirect('#/cars/all');
                }
            ).catch(
                function (res) {
                    notifications.handleError(res);
                }
            )
    }

    return {
        getAll,
        getCreate,
        postCreate,
        getMine,
        remove,
        details,
        getEdit,
        postEdit,
    }
}();