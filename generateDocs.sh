#!/bin/bash
# find all analysis files under sf-core folder
analysisFileArray=()
while IFS= read -rd '' files; do analysisFileArray+=("$files");  done < <(find . -type f -name 'analysis.js' -print0)
inputFiles=${analysisFileArray[@]:0:${#analysisFileArray[@]}}
###############################################

jsduck $inputFiles --tags docs_resource/tags --output api-docs --no-source --config=docs_resource/jsduck.json

cp docs_resource/favicon.ico api-docs/
cp docs_resource/welcome.html api-docs/
cp docs_resource/smf.css api-docs/resources/css/
cp docs_resource/images/logo.png api-docs/resources/images/logo.png

python addVersion.py

cd api-docs
zip -r ../api-docs.zip *
cd ..

rm -rf api-docs