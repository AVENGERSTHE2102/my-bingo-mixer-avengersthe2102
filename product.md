# Product Specification

## Overview
My Bingo Mixer is a lightweight open-source web app for generating and playing bingo-style challenge cards. It is built with React, TypeScript, and Vite, and is designed to be a playful, interactive way for teams or individuals to create custom bingo prompts, shuffle cards, and mark wins.

## Vision
Create a modern, design-forward Bingo Mixer that is:
- fun to use for teams, social groups, and learning activities
- easy to extend with new prompt themes and play modes
- accessible, responsive, and visually engaging
- open source and easy to contribute to

## Core Experiences
1. **Shuffle cards**
   - Generate a new 5x5 bingo card with a center free space.
   - Mix the deck on demand and update the card instantly.

2. **Custom prompt creation**
   - Allow users to add their own prompt items to the card deck.
   - Persist custom prompts between sessions.

3. **Interactive play mode**
   - Mark cards as completed during play.
   - Detect bingo patterns, including rows, columns, diagonals, and four corners.
   - Save game state locally so users can resume later.

4. **Design-first UI**
   - Use a neon cyberpunk-inspired theme with glassy panels and responsive layout.
   - Maintain a polished, accessible interface with clear CTAs and feedback.

## Audience
- remote teams and icebreaker facilitators
- educators and workshop leaders
- developers and open source contributors who want a playful frontend project

## Goals
- Ship a working MVP quickly with strong visual polish.
- Maintain a clear TDD workflow for features.
- Make the repository welcoming for open source contribution.
- Add reusable contextual instructions for AI-assisted development.

## Open Source Anchor
This app is intended to be an open specification project:
- use permissive contribution guidance
- keep the codebase clean and well documented
- include workspace-scoped hooks and instructions for quality and consistency
- enable external contributors to understand product intent from documentation alone
