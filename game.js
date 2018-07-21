class Model {

    constructor() {

    }

    array_for_create_field() {
        console.log(1);
    }

}
class View {

    constructor() {

    }

    create_field_html(q){

    }

}
class Controller {

    constructor(view, model) {

        this.view = view || new View();
        this.model = model || new Model();

    }

    size_for_array(){
        console.log(this.model)
        var el = document.getElementById('quantity');
         el.onchange = function(){
             console.log(this.model)
         }
    }
}

document.addEventListener(('DOMContentLoaded'), function(){
    const myModel = new Model(),
        myView = new View(),
        myController = new Controller(new View(), new Model());
    myController.size_for_array();
});