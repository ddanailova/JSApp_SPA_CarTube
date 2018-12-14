const carModel = (() =>  {
    //get all car listings
    const getAll = function () {
        return requester.get('appdata', 'cars', 'kinvey');
    }

    const getMine = function (username) {
        return requester.get('appdata', `cars?query={"seller":"${username}"}&sort={"_kmd.ect": -1}`, 'kinvey');
    }

    const create = function(title,description,brand,model,year,imageUrl,fuel,price, seller){
            let carInfo = {
                title,
                description,
                brand,
                model,
                year,
                imageUrl,
                fuel,
                price,
                seller
            };
    
            return requester.post('appdata', 'cars', 'kinvey', carInfo);
        }

        const getDetails = function (id){
            return requester.get('appdata', `cars/${id}`, 'kinvey');
        }

        const edit =function(id, title,description,brand,model,year,imageUrl,fuel,price, seller){
            let carInfo = {
                "_id":id,
                title,
                description,
                brand,
                model,
                year,
                imageUrl,
                fuel,
                price,
                seller
            };
            return requester.update('appdata', `cars/${id}`, 'kinvey', carInfo);
        }

        const remove = function (id){
            return requester.remove('appdata', `cars/${id}`, 'kinvey');
        }

    return {
        getAll,
        getMine,
        create,
        edit,
        getDetails,
        remove,
    }
})();