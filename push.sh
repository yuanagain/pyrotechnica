#!/bin/push.sh
# Quick way to commit and push
comment=$update naming in RPi folder and add relay switching script for pin 7
echo Commit comment: \"$update naming in RPi folder and add relay switching script for pin 7\"
# upload in this folder

echo "============ Uploading to GitHub ============"
git add \.
git status
git commit -m "$update naming in RPi folder and add relay switching script for pin 7"
git push


echo "============ DONE ============"