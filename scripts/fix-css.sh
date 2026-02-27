#!/bin/bash
CSS_DIR=".next/static/css"
if [ -d "$CSS_DIR" ]; then
  for f in $CSS_DIR/*.css; do
    echo "Sanitizing @property in $f"
    # Replace initial-value: 0 or 0% or 0%% with 0.001% for percentage syntax
    # We target the specific property --radialprogress to be safe, 
    # but the regex is broad enough to catch the minifier's output.
    sed -i 's/initial-value:\s*0%\?\s*[;}]/initial-value:0.001%;/g' "$f"
    sed -i 's/initial-value:\s*0%\?\s*}/initial-value:0.001%}/g' "$f"
    # Also catch cases where multiple % signs might have been introduced
    sed -i 's/0%%\+/0.001%/g' "$f"
  done
fi
