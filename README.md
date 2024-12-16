# Eating particles

small simulation of particles eating each other.

The simulation creates up to 5000 particles that move around the screen using Perlin noise for smooth motion. Each particle starts small and grows until reaching a threshold size. Once "raised", particles can interact with and consume smaller particles nearby.

When a particle eats another:

- It grows slightly larger (up to a maximum size)
- Its speed increases (up to a maximum speed)
- Its color shifts subtly
- A brief "devouring" animation plays
- The eaten particle is removed

## TODO:

- Maintain population balance
- Make particles starve when they are white walkers

Built with p5.js for rendering and animation.
