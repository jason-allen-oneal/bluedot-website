#!/bin/bash
CSS_DIR=".next/static/css"
if [ -d "$CSS_DIR" ]; then
  for f in $CSS_DIR/*.css; do
    echo "Fixing @property in $f"
    sed -i 's/initial-value:0}/initial-value:0%}/g' "$f"
    sed -i 's/initial-value:0;/initial-value:0%;/g' "$f"
  done
fi
