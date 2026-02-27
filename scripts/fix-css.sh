#!/bin/bash
CSS_DIR=".next/static/css"
if [ -d "$CSS_DIR" ]; then
  for f in $CSS_DIR/*.css; do
    echo "Sanitizing @property in $f"
    # Target <percentage> or <length-percentage> properties that have initial-value: 0 or 0%
    # We use perl for safe matching without destroying braces.
    perl -pi -e 's/(syntax:"<(?:length-)?percentage>";[^}]*initial-value:)\s*0%?\s*([;}])/$1 0.001%$2/g' "$f"
  done
fi
