function Game (colrow) {
    var _this = this;
    this._colrow = colrow;
    this.size = [];
    this.currentPlayer = 1;
    this.currentPlayerSign = {1: 'X', 2: 'O'};
    this.setColrow = function (colrow) {
        this._colrow = colrow;
    };
    this.field = function () {
        this.size = [];
        for (var i = 0; i < this._colrow; i++) {
            this.size.push([]);
            for (var j = 0; j < this._colrow; j++) {
                this.size[i].push(0);
            }
        }
        return this.size;
    };
    this.fieldhtml = function () {
        var containerGame = document.getElementById("field");
        document.getElementById('field').innerHTML = '';
        for (var i = 0; i < this.size.length; i++) {
            for (var j = 0; j < this.size[i].length; j++) {
                var inputGame = document.createElement('input');
                inputGame.value = '';
                inputGame.setAttribute('class', 'el' + j);
                inputGame.setAttribute('data-col', j);
                inputGame.setAttribute('data-raw', i);
                inputGame.setAttribute('type', 'submit');
                containerGame.appendChild(inputGame);
            }
        }
    };

    this.check = function (target_y, target_x, targetcP) {
        //    +/- от текущего игрока(зависит от выбранного поля)
        var range = _this._colrow < 6 ? 3 : 5;
        var start_x = target_x - range;
        var start_y = target_y - range;
        var start_x2 = target_x + range;
        // счетчики
        var timer1 = 0;
        var timer2 = 0;
        var timer3 = 0;
        var timer4 = 0;
        for (start_x; start_x <= (target_x + range); start_x++) {
            if (_this.check_timer(start_x, target_y, targetcP)) {timer1++;} else {timer1 = 0;}
            if (_this.check_timer(start_x, start_y, targetcP)) {timer2++;} else {timer2 = 0;}
            if (_this.check_timer(start_x2, start_y, targetcP)) {timer3++;} else {timer3 = 0;}
            if (_this.check_timer(target_x, start_y, targetcP)) {timer4++;} else {timer4 = 0;}
            start_y++;
            start_x2--;
            if (timer1 >= range || timer2 >= range || timer3 >= range || timer4 >= range) {alert('победил игрок' + targetcP);break;}
        }
    };
    this.check_timer = function(x, y, targetPlayer){
        if (typeof(_this.size[y]) == 'undefined' || typeof(_this.size[y][x]) == 'undefined' || _this.size[y][x] != targetPlayer) {return false;} else {return true;}
    };
    this.inputClick = function () {
        var _parent = document.getElementById('field');
        var _child = _parent.getElementsByTagName('input');
        for (var i = 0; i < _child.length; i++) {
            _child[i].addEventListener('click', function () {
                this.setAttribute('disabled', 'disabled');
                var cP = _this.currentPlayer;
                this.value = _this.currentPlayerSign[cP];
                _this._col = this.getAttribute('data-col') * 1;
                _this._raw = this.getAttribute('data-raw') * 1;
                _this.size[_this._raw][_this._col] = cP;
                _this.check(_this._raw, _this._col, _this.currentPlayer);
                _this.currentPlayer = _this.currentPlayer === 1 ? 2 : 1;
            });
        }
    }
}
document.addEventListener('DOMContentLoaded', function(){
    var MyGame = new Game();
    document.getElementById('quantity').onchange = function (){
        var quantity = this.value;
        MyGame.setColrow(quantity);
        MyGame.field();
        MyGame.fieldhtml();
        MyGame.inputClick();
    }
});
