#!/bin/push.sh
# Quick way to commit and push
comment=$ update further naming revisions in RPi
echo Commit comment: \"$ update further naming revisions in RPi\"
# upload in this folder

echo "============ Uploading to GitHub ============"
git add \.
git status
git commit -m "$edited actrelay.pi"
git push


echo "============ DONE ============"