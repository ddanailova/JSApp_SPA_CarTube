const app = Sammy('#container', function () {
    //Plugins
    this.use('Handlebars', 'hbs');

    //Routs
    this.get('#/', userController.getHome);
    this.get('#/home', userController.getHome);
    this.get('#/login', userController.getLogin);
    this.get('#/register', userController.getRegister);
    this.post('#/login', userController.postLogin);
    this.post('#/register', userController.postRegister);
    this.get('#/logout', userController.logout);
    this.get('#/cars/all', carController.getAll);
    this.get('#/cars/mine', carController.getMine);
    this.get('#/car/create', carController.getCreate);
    this.post('#/car/create', carController.postCreate);
    this.get('#/car/delete', carController.remove);
    this.get('#/car/details', carController.details);
    this.get('#/car/edit', carController.getEdit);
    this.put('#/car/edit', carController.postEdit);
});

$(() => app.run('#/'));