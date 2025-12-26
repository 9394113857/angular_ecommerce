# =========================================================
# 📘 GIT OVERALL REFERENCE – LIFETIME USE (ALL-IN-ONE CELL)
# =========================================================
# This file acts as a personal Git knowledge book.
# Use daily, weekly, or whenever Git confuses you.
# =========================================================


# ---------------------------------------------------------
# 🔹 1. FIRST-TIME GLOBAL SETUP (RUN ONCE PER SYSTEM)
# ---------------------------------------------------------

git config --global user.name "Your Name"            # Set global Git username
git config --global user.email "youremail@gmail.com" # Set global Git email
git config --global init.defaultBranch main           # Default branch name = main
git config --global --list                            # Verify global config


# ---------------------------------------------------------
# 🔹 2. CREATE / INITIALIZE A REPOSITORY
# ---------------------------------------------------------

git init        # Initialize git repository
git status      # Check repo status


# ---------------------------------------------------------
# 🔹 3. CLONE AN EXISTING REPOSITORY
# ---------------------------------------------------------

git clone https://github.com/username/repo-name.git   # Clone remote repo


# ---------------------------------------------------------
# 🔹 4. BASIC DAILY WORKFLOW (MOST IMPORTANT)
# ---------------------------------------------------------

git status      # Check changed / staged files
git add .       # Stage all changes
git commit -m "Meaningful commit message"  # Commit changes
git push        # Push to remote (works if upstream is set)


# ---------------------------------------------------------
# 🔹 5. BRANCH MANAGEMENT
# ---------------------------------------------------------

git branch                  # List all branches
git branch new-branch        # Create new branch
git checkout new-branch      # Switch to branch
git checkout -b new-branch   # Create + switch branch
git branch -d branch-name    # Delete branch


# ---------------------------------------------------------
# 🔹 6. PULL & SYNC CODE
# ---------------------------------------------------------

git pull                     # Pull from tracked remote branch
git pull origin main          # Explicit pull from main


# If merge conflicts occur during pull
git pull --rebase origin main # Rebase instead of merge


# ---------------------------------------------------------
# 🔹 7. PUSH TO REMOTE
# ---------------------------------------------------------

git push                     # Normal push (preferred)
git push origin main          # Explicit push to main
git push origin branch-name   # Push specific branch


# First push of a new branch (sets upstream)
git push -u origin branch-name


# ---------------------------------------------------------
# 🔹 8. MERGE BRANCHES
# ---------------------------------------------------------

git checkout main             # Switch to main
git pull origin main          # Update main
git merge feature-branch      # Merge feature into main
git push origin main          # Push merged changes


# ---------------------------------------------------------
# 🔹 9. VIEW HISTORY & LOGS
# ---------------------------------------------------------

git log                       # Full commit history
git log --oneline             # Compact history
git log --graph --oneline --all # Visual branch history


# ---------------------------------------------------------
# 🔹 10. UNDO & FIX MISTAKES
# ---------------------------------------------------------

git reset --soft HEAD~1       # Undo last commit, keep changes
git reset --hard HEAD~1       # Undo last commit, delete changes
git checkout -- file.txt      # Discard file changes


# ---------------------------------------------------------
# 🔹 11. STASH (TEMPORARY SAVE)
# ---------------------------------------------------------

git stash                     # Save uncommitted changes
git stash list                # View stashes
git stash pop                 # Apply last stash


# ---------------------------------------------------------
# 🔹 12. REMOTE MANAGEMENT
# ---------------------------------------------------------

git remote -v                 # View remotes
git remote add origin https://github.com/username/repo.git  # Add remote
git remote remove origin      # Remove remote


# ---------------------------------------------------------
# 🔹 13. FORCE PUSH (⚠️ USE CAREFULLY)
# ---------------------------------------------------------

git push --force              # Force push (rewrites history)
# Use only after rebase or when you KNOW what you are doing
# Prefer: git push --force-with-lease


# ---------------------------------------------------------
# 🔹 14. CHECK DIFFERENCES
# ---------------------------------------------------------

git diff                      # Unstaged changes
git diff --staged             # Staged changes


# ---------------------------------------------------------
# 🔹 15. FIX PUSH REJECTED ERRORS
# ---------------------------------------------------------

git pull --rebase origin branch-name  # Sync before pushing
git push origin branch-name           # Push again


# ---------------------------------------------------------
# 🔹 16. CLEAN UNTRACKED FILES
# ---------------------------------------------------------

git clean -f                  # Remove untracked files
git clean -fd                 # Remove untracked files + folders


# ---------------------------------------------------------
# ✅ GOLDEN RULE (REMEMBER FOREVER)
# ---------------------------------------------------------

# ALWAYS pull before push
# git pull → git add → git commit → git push
