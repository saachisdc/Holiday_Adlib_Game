# Holiday Adlib Game

This repository contains a Holiday-themed Adlib game built using React (Vite) for the frontend and Python for the backend.

## Overview

- Frontend: React + Vite (located in `src/`). Provides UI for players to choose from icons and display completed adlibs.
- Backend: Python (simple API to store/generate adlibs or serve prompts). The backend supplies the frontend with templates and may validate or persist results.

## Requirements

- Node.js (16+ recommended)
- npm or yarn
- Python 3.8+

## Run the frontend (React / Vite)

1. From the project root, install dependencies:

   npm install

2. Start the dev server:

   npm run dev

3. Open the URL shown in the terminal (usually `http://localhost:5173`).

Files of interest:

- `src/` — React components and app entry points (`index.jsx`, `App.jsx`).
- `index.html` — Vite HTML template.

## Run the backend (Python)

If the project includes a Python backend, follow these general steps (adjust filenames as needed):

1. Create and activate a virtual environment:

   python -m venv .venv
   source .venv/Scripts/activate # on Windows PowerShell/CMD use the appropriate activation command

2. Install dependencies (if a `requirements.txt` exists):

   pip install -r requirements.txt

3. Run the server. Common commands depending on framework:

   # Flask

   python server.py

   # FastAPI / Uvicorn

   uvicorn main:app --reload

The backend will usually run on `http://localhost:8000` (or a port printed in the terminal). Update the frontend API base URL if necessary.

## Project structure

- `src/` — React source
- `public/` — static assets
- `.gitignore` — ignored files

## Contributing

Feel free to open issues or make pull requests. If adding a backend, include a `requirements.txt` and instructions for running the service.

## License

This project does not include a license file. Add one if you plan to distribute the code.
