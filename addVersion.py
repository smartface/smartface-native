import json;

jsonDatas = open('package.json');
datas = json.load(jsonDatas);


file = open('api-docs/index.html');
content = file.read();
file.close();

newContent = content.replace('header-content">Smartface', 'header-content">' + datas["version"]);
file = open('api-docs/index.html','w');
file.write(newContent);
file.close();
