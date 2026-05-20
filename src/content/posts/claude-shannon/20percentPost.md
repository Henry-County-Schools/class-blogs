---
title: "My Snake Game"
description: "A simple snake game implemented in JavaScript meant for fun."
publishDate: 5-19-2026
tags:
  - games
  - computerscience
  - snakegame
draft: false
---

Link to the repository: https://github.com/gamermaybe/20percentLD.git

In this post, I am going to talk about the snake game I made on github.
I made this game as a fun project to learn JavaScript and game development, and to have some fun with making the game.
Basically, you just control a snake to eat food and grow longer without hitting the walls or yourself. 

How to play: To run locally:

1. Open [index.html](index.html) directly in your browser (file://), or run a local static server.

Quick with npx (no install):

```bash
npx http-server -p 8000
# then open http://localhost:8000/
```

Or use npm scripts (recommended):

```bash
npm install        # install dev server (one-time)
npm start          # starts a static server on port 8000
# then open http://localhost:8000/
```

How to play:

- Press the Start / Restart button to begin the game.
- Use the arrow keys or WASD to move the snake.
- Eat the orange food squares to grow longer and increase your score.
- Avoid running into the walls or into the snake's own body.
- The game ends when the snake collides with the border or itself.

Files:
- [index.html](index.html)
- [style.css](style.css)
- [script.js](script.js)

Optional: publish to GitHub Pages by enabling Pages in your repo settings (serve the `main` branch or `gh-pages`).

Play in terminal (Node.js)

1. Install dependencies:

```bash
npm install
```

2. Run the terminal game:

```bash
npm run play:terminal
```

For CI/test use, you can run a short non-interactive session:

```bash
node cli.js --test
```

Thanks for reading!




