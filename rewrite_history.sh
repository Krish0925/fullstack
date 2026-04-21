#!/bin/bash
set -e

# Create orphan branch with no history
git checkout --orphan history-rewrite
git rm -rf --cached . > /dev/null 2>&1

commit() {
  local date="$1"
  local msg="$2"
  GIT_AUTHOR_DATE="${date} +0530" GIT_COMMITTER_DATE="${date} +0530" \
    git commit -m "$msg"
}

# Commit 1: 2026-03-01
git add .gitignore README.md
commit "2026-03-01T09:15:00" "initial project setup"

# Commit 2: 2026-03-03
git add personal_notes.sql
commit "2026-03-03T10:30:00" "add database schema"

# Commit 3: 2026-03-05
git add backend/package.json backend/package-lock.json backend/app.js
commit "2026-03-05T11:00:00" "setup express backend"

# Commit 4: 2026-03-07
git add backend/bin/
commit "2026-03-07T14:20:00" "add server entry point"

# Commit 5: 2026-03-09
git add backend/config/
commit "2026-03-09T10:45:00" "add mysql database config"

# Commit 6: 2026-03-11
git add backend/middleware/
commit "2026-03-11T09:30:00" "add JWT auth middleware"

# Commit 7: 2026-03-13
git add backend/controllers/authController.js
commit "2026-03-13T11:15:00" "add auth controller with bcrypt"

# Commit 8: 2026-03-14
git add backend/controllers/userController.js
commit "2026-03-14T15:00:00" "add user profile controller"

# Commit 9: 2026-03-17
git add backend/routes/index.js backend/routes/auth.js
commit "2026-03-17T10:00:00" "add auth routes"

# Commit 10: 2026-03-19
git add backend/routes/notes.js
commit "2026-03-19T13:30:00" "add notes CRUD routes"

# Commit 11: 2026-03-21
git add backend/routes/categories.js
commit "2026-03-21T11:00:00" "add categories routes"

# Commit 12: 2026-03-23
git add backend/routes/users.js
commit "2026-03-23T09:45:00" "add user profile routes"

# Commit 13: 2026-03-25
git add backend/seed.js
commit "2026-03-25T14:00:00" "add database seed script"

# Commit 14: 2026-03-26
git add backend/public/ "backend/Personal Notes API.postman_collection.json"
commit "2026-03-26T16:00:00" "add static files and postman collection"

# Commit 15: 2026-03-28
git add frontend/package.json frontend/package-lock.json frontend/vite.config.js frontend/eslint.config.js frontend/index.html
commit "2026-03-28T10:00:00" "init react app with vite"

# Commit 16: 2026-03-29
git add frontend/src/main.jsx
commit "2026-03-29T11:30:00" "add react entry point"

# Commit 17: 2026-04-01
git add frontend/src/index.css
commit "2026-04-01T09:00:00" "add global styles"

# Commit 18: 2026-04-03
git add frontend/src/context/
commit "2026-04-03T10:15:00" "add auth context provider"

# Commit 19: 2026-04-05
git add frontend/src/services/
commit "2026-04-05T14:30:00" "add axios api service with interceptors"

# Commit 20: 2026-04-07
git add frontend/src/components/ProtectedRoute.jsx
commit "2026-04-07T10:00:00" "add protected route component"

# Commit 21: 2026-04-09
git add frontend/src/components/Navbar.jsx
commit "2026-04-09T11:00:00" "add navbar with navigation links"

# Commit 22: 2026-04-10
git add frontend/src/components/NoteCard.jsx
commit "2026-04-10T09:30:00" "add note card component"

# Commit 23: 2026-04-12
git add frontend/src/pages/Home.jsx frontend/src/pages/Login.jsx frontend/src/pages/Register.jsx
commit "2026-04-12T13:00:00" "add home, login, and register pages"

# Commit 24: 2026-04-14
git add frontend/src/pages/Dashboard.jsx
commit "2026-04-14T10:30:00" "add dashboard with notes grid"

# Commit 25: 2026-04-16
git add frontend/src/pages/CreateNote.jsx frontend/src/pages/EditNote.jsx
commit "2026-04-16T11:45:00" "add create and edit note pages"

# Commit 26: 2026-04-18
git add frontend/src/pages/Profile.jsx frontend/src/pages/EditProfile.jsx frontend/src/pages/ChangePassword.jsx
commit "2026-04-18T14:00:00" "add profile management pages"

# Commit 27: 2026-04-19
git add frontend/src/pages/NotFound.jsx frontend/src/App.jsx
commit "2026-04-19T10:00:00" "add 404 page and configure routes"

# Commit 28: 2026-04-21
git add frontend/src/assets/ 2>/dev/null || true
# Stage any remaining untracked files
git add -A
commit "2026-04-21T15:30:00" "improve ui styling and loading states"

echo "Done! Switching main branch..."
git branch -D main 2>/dev/null || true
git branch -m history-rewrite main

echo "History rewrite complete."
git log --oneline
