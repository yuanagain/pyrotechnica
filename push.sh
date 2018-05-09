#!/bin/push.sh
# Quick way to commit and push
comment=$1
echo Commit comment: \"$comment\"
# upload in this folder

echo "============ Uploading to GitHub ============"
git add \.
git status
git commit -m "$comment"
git push


echo "============ DONE ============"