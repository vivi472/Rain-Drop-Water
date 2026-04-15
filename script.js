const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// Ajuste de resolução para melhor qualidade
function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

// Função aleatória
function rnd(min, max) {
    return Math.random() * (max - min) + min;
}

// Classe Gota
class Drop {
    constructor() {
        this.reset();
    }

    reset() {
        this.x = rnd(0, canvas.width);
        this.y = rnd(-canvas.height, 0);
        this.size = rnd(1, 2.5);
        this.speedY = rnd(1, 4);
        this.opacity = rnd(0.3, 1);
    }

    update() {
        this.y += this.speedY;

        if (this.y > canvas.height) {
            splashes.push(new Splash(this.x, canvas.height));
            this.reset();
        }
    }

    draw() {
        ctx.beginPath();
        ctx.fillStyle = `rgba(173,216,230,${this.opacity})`;
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fill();
    }
}

// Classe Splash
class Splash {
    constructor(x, y) {
        this.particles = [];

        for (let i = 0; i < 8; i++) {
            this.particles.push({
                x: x,
                y: y,
                size: rnd(1, 2),
                speedX: rnd(-2, 2),
                speedY: rnd(-4, -1),
                opacity: 1
            });
        }
    }

    update() {
        this.particles.forEach(p => {
            p.x += p.speedX;
            p.y += p.speedY;
            p.opacity -= 0.04;
        });

        this.particles = this.particles.filter(p => p.opacity > 0);
    }

    draw() {
        this.particles.forEach(p => {
            ctx.beginPath();
            ctx.fillStyle = `rgba(173,216,230,${p.opacity})`;
            ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
            ctx.fill();
        });
    }
}

// Arrays
const drops = [];
const splashes = [];

// Criar gotas
for (let i = 0; i < 400; i++) {
    drops.push(new Drop());
}

// Loop principal
function animate() {
    // Fundo com efeito rastro
    ctx.fillStyle = "rgba(10, 10, 20, 0.25)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    drops.forEach(drop => {
        drop.update();
        drop.draw();
    });

    splashes.forEach((splash, index) => {
        splash.update();
        splash.draw();

        if (splash.particles.length === 0) {
            splashes.splice(index, 1);
        }
    });

    requestAnimationFrame(animate);
}

animate();