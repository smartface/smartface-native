jsduck ui --output api-docs --no-source --config=docs_resource/jsduck.json

cp docs_resource/favicon.ico api-docs/
cp docs_resource/welcome.html api-docs/
cp docs_resource/smf.css api-docs/resources/css/
cp docs_resource/member-icons/* api-docs/member-icons/
cp docs_resource/images/* api-docs/resources/images/

cd api-docs
zip -r ../api-docs.zip *
cd ..

rm -rf api-docs