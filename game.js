var Square = /** @class */ (function () {
    function Square(x, y, size, color) {
        if (size === void 0) { size = 100; }
        if (color === void 0) { color = '#f0ff0f'; }
        this.x = x;
        this.y = y;
        this.size = size;
        this.color = color;
        this.el = document.createElement("div");
        this.setPos(this.x, this.y);
        document.body.appendChild(this.el);
    }
    Square.prototype.setPos = function (x, y) {
        this.el.style.position = 'absolute';
        this.el.style.width = this.size + "px";
        this.el.style.height = this.size + "px";
        this.el.style.backgroundColor = this.color;
        this.el.style.top = y + "px";
        this.el.style.left = x + "px";
        this.el.classList.add('cell');
    };
    return Square;
}());
var Game = /** @class */ (function () {
    function Game() {
        this.squares = [];
        this.setEvents();
    }
    Game.prototype.start = function () {
        this.timerId = setInterval(function () {
            if (this.squares.length < 10) {
                this.addSquare();
            }
            else {
                clearTimeout(this.timerId);
                alert('Game over');
            }
        }.bind(this), 500);
    };
    Game.prototype.addSquare = function () {
        var size = 50;
        var w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        var h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        var posx = (Math.random() * (w - size));
        var posy = (Math.random() * (h - size));
        this.squares.push(new Square(posx, posy, size));
    };
    Game.prototype.removeSquare = function (el) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
        this.squares.pop();
    };
    Game.prototype.setEvents = function () {
        var _this = this;
        document.addEventListener("click", function (e) {
            var el = e.target;
            if (el.tagName === 'DIV' && el.classList.contains('cell')) {
                _this.removeSquare(el);
            }
        });
    };
    return Game;
}());
window.onload = function () {
    var game = new Game();
    game.start();
};
//# sourceMappingURL=game.js.map