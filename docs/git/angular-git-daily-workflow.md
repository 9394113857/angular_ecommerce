# ======================================================
# ANGULAR FRONTEND – SAFE & PROFESSIONAL GIT WORKFLOW
# (FIRST TIME + DAILY USE)
# ======================================================

# ------------------------------------------------------
# 🔰 FIRST-TIME PROJECT SETUP (RUN ONCE)
# ------------------------------------------------------

# Initialize git repository
git init

# Add remote GitHub repository
git remote add origin <repo-url>

# Verify remote
git remote -v

# ------------------------------------------------------
# 🔁 DAILY WORKFLOW (USE ALWAYS)
# ------------------------------------------------------

# 0️⃣ Check which branch you are currently on (VERY IMPORTANT)
git branch

# (If not on main, switch to main)
# git checkout main

# 1️⃣ Check file status
git status

# 2️⃣ Pull latest changes BEFORE working or pushing
git pull

# 3️⃣ Stage all changes
git add .

# 4️⃣ Commit changes
git commit -m "FRONTEND (Angular) | Feature update / stable checkpoint" || \
git commit --allow-empty -m "FRONTEND | No code changes | Stable checkpoint"

# 5️⃣ Push changes (normal & safe)
git push

🧠 Why this works perfectly
•	git branch → prevents pushing from wrong branch
•	|| git commit --allow-empty → never fails
•	git push → works because upstream is already set
•	git push origin main → kept as knowledge, not daily need



# ------------------------------------------------------
# ⚠️ FORCE PUSH (RARE & DANGEROUS – USE CAREFULLY)
# ------------------------------------------------------

# Use ONLY when:
# - You rebased locally
# - You intentionally rewrote history
# - CI requires overwrite
# - You are the only contributor

# Force push to remote branch
# git push --force

# Safer force push (recommended if needed)
# git push --force-with-lease

# ------------------------------------------------------
# 🧠 KNOWLEDGE / RARELY USED
# ------------------------------------------------------

# Push explicitly to main
# git push origin main

# Set upstream (ONLY ONCE per branch)
# git push --set-upstream origin main

# ------------------------------------------------------
# 🔍 VERIFY BRANCH ↔ REMOTE LINK
# ------------------------------------------------------

git branch -vv

🧠 When to use --force (remember this)
Situation	Use
Rebase done locally	✅
Cleaning bad commits	✅
Shared team branch	❌
Production main branch	❌

🏁 FINAL RULE

Use git push always.
Use git push --force-with-lease only when you KNOW why.

=====================================

docs/git/angular-git-workflow.md

Why this is best
•	docs/ → standard documentation folder
•	git/ → category-based (scales well)
•	workflow → not just commands, but process
•	.md → Markdown (GitHub renders beautifully)




