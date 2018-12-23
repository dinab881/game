class Square {
    el: HTMLDivElement;

    constructor(
        public x: number,
        public y: number,
        public size: number = 100,
        public color: string = '#f0ff0f',

    ) {
        this.el = document.createElement("div");
        this.setPos(this.x, this.y);
        document.body.appendChild(this.el);
    }

    setPos(x: number, y: number): void {
        this.el.style.position = 'absolute';
        this.el.style.width = `${this.size}px`;
        this.el.style.height = `${this.size}px`;
        this.el.style.backgroundColor = this.color;
        this.el.style.top = `${y}px`;
        this.el.style.left = `${x}px`;
        this.el.classList.add('cell');
    }

}


class Game {
    public squares: Square[] = [];
    public timerId: number;

    constructor() {
        this.setEvents();

    }

    start() {
        this.timerId = setInterval(
            function () {
                if (this.squares.length < 10) {
                    this.addSquare();
                }
                else {
                    clearTimeout(this.timerId);
                    alert('Game over');
                }
            }.bind(this)
            ,
            500
        );
    }

    addSquare(): void {
        const size = 50;
        const w = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
        const h = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
        const posx = (Math.random() * (w - size));
        const posy = (Math.random() * (h - size));
        this.squares.push(new Square( posx, posy, size));

    }

    removeSquare(el: HTMLElement) {
        if (el.parentNode) {
            el.parentNode.removeChild(el);
        }
        this.squares.pop();
    }

    setEvents(): void {
        document.addEventListener("click", (e: MouseEvent) => {
            let el = <HTMLElement>e.target;
            if (el.tagName === 'DIV' && el.classList.contains('cell')) {
                this.removeSquare(el);
            }
        });

    }

}


window.onload = () => {
    const game = new Game();
    game.start();
};