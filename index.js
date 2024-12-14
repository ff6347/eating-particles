class Particle {
	position;
	size;
	col;
	off;
	speed = 2;
	ateSomeone = 0;
	isRaised = false;
	maxRaiseSize = 5;
	maxSize = 20;
	maxSpeed = 7;
	minSize = 1;
	isDead = false;
	id;
	constructor({ x, y, size = 1, col = "white", id }) {
		this.position = createVector(x, y);
		this.size = size;
		this.col = col;
		this.off = createVector(random(1000), random(2000, 3000));
		this.id = id;
	}
	display() {
		fill(
			hue(this.col),
			saturation(this.col),
			brightness(this.col),
			constrain(100 - this.ateSomeone * 10, 25, 100)
		);
		noStroke();
		for (let i = 0; i < Math.max(this.ateSomeone, 2); i++) {
			circle(
				this.position.x +
					random(
						-constrain(this.ateSomeone, 0, 3),
						constrain(this.ateSomeone, 0, 3)
					),
				this.position.y +
					random(
						-constrain(this.ateSomeone, 0, 3),
						constrain(this.ateSomeone, 0, 3)
					),
				this.size
			);
		}
	}
	update(particles = []) {
		if (this.isRaised === false) {
			this.size += 0.2;
			if (this.size >= this.maxRaiseSize) {
				this.isRaised = true;
			}
		}
		this.position.x = this.position.x + noise(this.off.x) * this.speed; //random(-1, 1);
		this.position.y = this.position.y + (noise(this.off.y) * this.speed) / 2;

		this.off.add(createVector(random(-1, 1), random(-1, 1)));

		if (this.position.x < 0) {
			this.position.x = width;
		}
		if (this.position.x > width) {
			this.position.x = 0;
		}
		if (this.position.y < 0) {
			this.position.y = height;
		}
		if (this.position.y > height) {
			this.position.y = 0;
		}

		// compare with other particles
		particles.forEach((particle) => {
			if (particle.id === this.id) {
				return;
			}
			if (this.size < particle.size) {
				return;
			}

			const distance = this.position.dist(particle.position);
			if (
				distance < (5 * this.ateSomeone) / 10 + this.size + particle.size &&
				this.isRaised &&
				this.size > particle.size
			) {
				const direction = this.position.copy().sub(particle.position);
				direction.normalize().mult(this.size / 100);
				this.position.add(direction);
				stroke(this.col);
				noFill();
				beginShape();
				vertex(this.position.x, this.position.y);
				bezierVertex(
					this.position.x + 15,
					this.position.y + 15,
					this.position.x - 15,
					this.position.y - 15,
					particle.position.x,
					particle.position.y
				);
				endShape();

				if (distance < 2 + this.size + particle.size) {
					particle.isDead = true;
					this.size += 0.2;
					if (this.size > this.maxSize) {
						this.size = this.maxSize;
					}
					this.ateSomeone++;
					let h = hue(this.col);
					if (random(1) > 0.5) {
						h += random(-1, 1);
					}

					let sat = saturation(this.col);
					sat += random(1);
					if (sat > 100) {
						sat = 100;
					}
					let bri = brightness(this.col);
					bri += random(1);
					if (bri > 100) {
						bri = 100;
					}

					this.col = color(hue(this.col), sat, bri, 100);
					this.speed += 0.2;
					if (this.speed > this.maxSpeed) {
						this.speed = this.maxSpeed;
					}
				}
			}
		});
	}
}

const particles = [];
const numberOfParticles = 5000;
let particleCount = 0;
let allSpawend = false;
let birthRate = 30;
function setup() {
	const canvas = createCanvas(windowWidth - 16, windowHeight - 64);
	colorMode(HSL, 360, 100, 100, 100);
	canvas.parent("sketch");
}

function draw() {
	if (particleCount < numberOfParticles && allSpawend === false) {
		if (frameCount > 100 && frameCount % birthRate === 0) {
			const aParticle = new Particle({
				x: random(width),
				y: random(height),
				id: particleCount,
				col: color(320, 10, 5, 100),
			});
			particles.push(aParticle);
		}

		particleCount++;
		if (particleCount >= numberOfParticles) {
			allSpawend = true;
		}
		birthRate--;
		if (birthRate < +2) {
			birthRate = 2;
		}
		// else{
		// 	allSpawend = false;
		// }
	}
	background(320, 0, 90, 100);
	particles.forEach((particle) => {
		particle.update(particles);
		particle.display();
	});

	for (let i = particles.length - 1; i >= 0; i--) {
		if (particles[i].isDead) {
			particles.splice(i, 1);
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth - 16, windowHeight - 64);
}
