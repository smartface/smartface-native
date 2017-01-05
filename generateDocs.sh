jsduck ui --output api-docs --no-source --config=docs_resource/jsduck.json

cp docs_resource/favicon.ico api-docs/
cp docs_resource/welcome.html api-docs/
cp docs_resource/smf.css api-docs/resources/css/
cp docs_resource/images/logo.png api-docs/resources/images/logo.png

cd api-docs
zip -r ../api-docs.zip *
cd ..

rm -rf api-docs
