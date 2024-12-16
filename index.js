class Particle {
	position; //Vector
	size; //number for circle size
	col; //color for circle fill
	lineCol; //color for circle stroke
	off; //Vector for noise
	speed; //number for speed
	ateSomeone; //number for how many particles it ate
	isRaised; //boolean for if it is raised
	maxRaiseSize; //number to tell when it is raised
	maxSize; //number to constrain max size
	maxSpeed; //number to constrain max speed
	isDead = false; //boolean if it was eaten
	didEat = false; //boolean if it is eating
	didEatCounter = 0; //number counter for how long it is devouring
	didEatDuration = 50; //number for how long it is eating
	id; //number for id for comparison
	constructor({ x, y, size = 1, col = "white", id }) {
		this.position = createVector(x, y);
		this.size = size;
		this.col = col;
		this.off = createVector(random(1000), random(2000, 3000));
		this.lineCol = color("crimson");
		this.id = id;
	}
	display() {
		fill(
			hue(this.col),
			saturation(this.col),
			brightness(this.col),
			constrain(100 - this.ateSomeone * 10, 25, 100)
		);

		const strokeCol = this.lineCol;

		stroke(hue(strokeCol), saturation(strokeCol), brightness(strokeCol), 50);
		strokeWeight(0.5);
		// draw the Particle with several circles based on how many particles it ate. Once ot becomes a white walker this is no longer visible due to the size of the circles
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
		//devoure animation
		// if it is eating, draw a smaller circle that is moving around
		// inside the larger circles uses noise, moves to center of the larger circle
		if (this.didEat === true) {
			fill(255, 0, 0, map(this.didEatCounter, 0, this.didEatDuration, 100, 0));
			noStroke();
			circle(
				this.position.x +
					(noise(this.off.x) - 0.5) *
						map(this.didEatCounter, 0, this.didEatDuration, this.size, 1),
				this.position.y +
					(noise(this.off.y) - 0.5) *
						map(this.didEatCounter, 0, this.didEatDuration, this.size, 1),
				5
			);
		}
	}
	/**
	 * update the particle
	 * @param {Particle[]} particles array of particles for comparison
	 */
	update(particles = []) {
		// if it is not raised, grow it
		if (this.isRaised === false) {
			this.size += 0.2;
			if (this.size >= this.maxRaiseSize) {
				this.isRaised = true;
			}
		}
		if (this.didEat === true) {
			this.didEatCounter++;
			if (this.didEatCounter > this.didEatDuration) {
				this.didEat = false;
				this.didEatCounter = 0;
			}
		}
		// move the particle based on noise and speed
		this.position.x = this.position.x + noise(this.off.x) * this.speed; //random(-1, 1);
		this.position.y = this.position.y + (noise(this.off.y) * this.speed) / 2;
		// update noise offset vector
		this.off.add(createVector(random(-1, 1), random(-1, 1)));

		// wrap the particle around the screen
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
			// skip itself
			if (particle.id === this.id) {
				return;
			}
			// skip if it is smaller then the other particle
			if (this.size < particle.size) {
				return;
			}

			// calculate distance between particles
			const distance = this.position.dist(particle.position);
			// if the distance is less than the sum of the particles size plus some MAGIC NUMBER, and it is raised, and it is larger then the other particle
			// move towards the other particle
			if (
				distance < (5 * this.ateSomeone) / 20 + this.size + particle.size &&
				this.isRaised &&
				this.size > particle.size
			) {
				// calculate direction towards the other particle
				const direction = this.position.copy().sub(particle.position);
				// normalize the direction and multiply by the size of the particle divided by 50 (MAGIC NUMBER)
				direction.normalize().mult(this.size / 50);
				// add the direction to the particle's position
				this.position.add(direction);
				// draw a curve from the particle to the other particle that are near
				stroke(this.lineCol);
				noFill();
				beginShape();
				vertex(this.position.x, this.position.y);
				bezierVertex(
					this.position.x + 5,
					this.position.y + 5,
					this.position.x - 15,
					this.position.y - 15,
					particle.position.x,
					particle.position.y
				);
				endShape();

				// if the distance is less than the sum of the particles size divided by 2, and it is raised, and it is larger then the other particle
				// eat the other particle
				if (distance < (this.size + particle.size) / 2) {
					// set the other particle to dead
					particle.isDead = true;
					// grow the particle by 0.2 MAGIC NUMBER
					this.size += 0.2;
					// constrain the size
					if (this.size > this.maxSize) {
						this.size = this.maxSize;
					}
					// increase the ateSomeone counter
					this.ateSomeone++;
					// if it is not already eating, start eating
					if (this.didEat === false) this.didEat = true;
					// change the color of the particle
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
					// increase the speed of the particle by 0.2 MAGIC NUMBER
					this.speed += 0.2;
					// constrain the speed
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
let birthRate = 30;
function setup() {
	const canvas = createCanvas(windowWidth - 16, windowHeight - 64);
	colorMode(HSL, 360, 100, 100, 100);
	canvas.parent("sketch");
}

function draw() {
	if (particleCount < numberOfParticles) {
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
		}
		birthRate--;
		if (birthRate < 2) {
			birthRate = 2;
		}
	}
	const bgCol = color((hue(color("crimson")) + 180) % 360, 50, 90, 60);
	background(bgCol);
	particles.forEach((particle) => {
		particle.update(particles);
		particle.display();
	});

	for (let i = particles.length - 1; i >= 0; i--) {
		if (particles[i].isDead) {
			particles.splice(i, 1);
			if (random(1) > 0.5) {
				particleCount--;
			}
		}
	}
}

function windowResized() {
	resizeCanvas(windowWidth - 16, windowHeight - 64);
}
