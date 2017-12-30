#!/bin/sh
for i in base world; do
   curl "https://api.github.com/repos/red-eclipse/${i}/issues?state=open&sort=updated&direction=desc&callback=issues" -H "Accept: application/vnd.github.squirrel-girl-preview" -o "${i}.json"
done
curl "https://api.github.com/repos/red-eclipse/world/issues/1/comments?callback=issues_comments" -H "Accept: application/vnd.github.squirrel-girl-preview" -o "comments.json"
