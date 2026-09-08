#!/usr/bin/env bash
# Import CookingHub JSON exports into a local/remote MongoDB.
# Usage:
#   chmod +x scripts/importRecipeAppJson.sh
#   MONGO_URI='mongodb://127.0.0.1:27017/recipeapp' \
#   DATA_DIR='/path/to/WorkSpace' \
#   ./scripts/importRecipeAppJson.sh

set -euo pipefail

MONGO_URI="${MONGO_URI:-mongodb://127.0.0.1:27017/recipeapp}"
DATA_DIR="${DATA_DIR:-$HOME/Desktop/Must/WorkSpace}"
SKIP_SESSIONS="${SKIP_SESSIONS:-1}"

if ! command -v mongoimport >/dev/null 2>&1; then
  echo "ERROR: mongoimport not found. Install MongoDB Database Tools first."
  echo "  macOS: brew install mongodb-database-tools"
  echo "  Ubuntu: follow https://www.mongodb.com/docs/database-tools/installation/"
  exit 1
fi

import_one() {
  local collection="$1"
  local file="$2"
  if [[ ! -f "$file" ]]; then
    echo "SKIP missing file: $file"
    return 0
  fi
  echo "→ importing $collection from $(basename "$file")"
  mongoimport \
    --uri="$MONGO_URI" \
    --collection="$collection" \
    --file="$file" \
    --jsonArray \
    --drop
}

echo "MONGO_URI=$MONGO_URI"
echo "DATA_DIR=$DATA_DIR"
echo

import_one users    "$DATA_DIR/recipeapp.users.json"
import_one recipes  "$DATA_DIR/recipeapp.recipes.json"
import_one comments "$DATA_DIR/recipeapp.comments.json"
import_one tags     "$DATA_DIR/recipeapp.tags.json"

if [[ "$SKIP_SESSIONS" == "0" ]]; then
  import_one sessions "$DATA_DIR/recipeapp.sessions.json"
else
  echo "→ skip sessions (users will log in again)"
fi

echo
echo "Done. Verify with mongosh:"
echo "  mongosh \"$MONGO_URI\" --eval 'db.getCollectionNames()'"
