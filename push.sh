#!/bin/push.sh
# Quick way to commit and push
comment=$ update further naming revisions in RPi
echo Commit comment: \"$ update further naming revisions in RPi\"
# upload in this folder

echo "============ Uploading to GitHub ============"
git add \.
git status
git commit -m "$update naming in RPi folder and add relay switching script for pin 7"
git push


echo "============ DONE ============"