---
title: "Fifth Post/Blog on Astroblog"
description: "My weekly Astroblog post discussing what I did in class this past week."
publishDate: 2026-05-08
tags:
  - astroblog
  - computer-architecture
  - performance
draft: false
---

## This is my article

Welcome to my sixth weekly blog post! If this is the first blog of mine that you read please know that these blogs that I publish each week are essentially a synopsis of what I've been doing in my computer science 2 class.

This past week in computer science 2, I've been working on my 20% Project like I mentioned in past blogs. I finally got my image and link components to work for my website! What I thought would be a breeze turned out to be a very complicated and rigorous process to actually insert images and links within my page file without my website not responding. I remember that my first approach to inserting images and links was to just reference the Next.JS docs. While the docs did help, I was very confused on where to put the import part of the code without my website going blank. I attempted to put my imports under 'export default function Page() {'. However, that did not work. However, I soon learned that the main problem was keeping the 'export default function Page() {' for each link and image component because the function was already defined! The solution was right in front of my eyes the entire time. All I had to do was place the import sections of my code above the 'export default function Page() {' section and delete the 'export default function Page() {' section of my image and link components. Consequently, I got my page to run without going blank.

In addition to adding an image component to my website, I also used remote patterns to upload external images for my website. I referred to the Next.JS docs to do this, and I had little to no trouble with it.

Like before, I believe I am making great progress on my 20% Project despite my many road blocks and setbacks. Resilience and perseverance is the way!
