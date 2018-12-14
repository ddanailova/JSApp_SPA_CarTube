const notifications = (()=>{
    function handleError(reason) {
        showError(reason.responseJSON.description);
    }

    function showInfo(message) {
        let infoBox = $('#infoBox');
        let infoSpan =$('#infoBox > span')
        infoSpan.text(message);
        infoBox.show();
       infoBox.fadeOut(3000);
    }
    
    function showError(message) {
        let errorBox = $('#errorBox');
        let errorSpan =$('#errorBox > span')
        errorSpan.text(message);
        errorBox.show();
        errorBox.on('click', function(){
            errorBox.hide()
        })
    }

    return {
        showInfo,
        showError,
        handleError
    }
})();