let url = 'xxxxx?a=3&b=2';

function getParams(url) {
  if (url.indexOf('?') === -1) return ;
  let paramsArr = url.split('?')[1].split('&');
  let paramsObj = {};

  for (let param of paramsArr) {
    const tmp = param.split('=');
    paramsObj[tmp[0]] = tmp[1];
  }

  console.log(paramsObj);
}


getParams(url);