#!/bin/sh
for i in base world; do
   curl "https://api.github.com/repos/red-eclipse/${i}/issues?state=open&sort=updated&direction=desc&callback=issues" > "${i}.json"
done
curl "https://api.github.com/repos/red-eclipse/world/issues/1/comments?callback=issues_comments" -o "comments.json"
