#!/bin/sh
for i in base world; do
   curl "https://api.github.com/repos/red-eclipse/${i}/issues?state=open&sort=updated&direction=desc&callback=issues" > "${i}.json"
done
