let registered_users=require('./preprocessor.js').registered_users;
let serveFile=require('./staticFileHandler.js');
let getContentType=require('./contentType.js');
let fs=require('fs');

const redirectToViewTodo=function (res) {
  res.redirect('./viewTodo.html')
};

const redirectToLoginPage=function (res) {
  res.redirect('./loginPage.html');
};

const handleGetViewTodo=function (req,res) {
  if(!req.user){
    redirectToLoginPage(res);
    return;
  }
  serveFile(req,res);
};

const getUserWithSessionId=function (res,user) {
  let sessionid = new Date().getTime();
  res.setHeader('Set-Cookie',`sessionid=${sessionid}`);
  user.sessionid = sessionid;
};

const redirectToRequiredPage=function (req,res) {
  let user = registered_users.find(u=>u.userName==req.body.userName);
  if(!user) {
    res.setHeader('Set-Cookie',`message=login failed; Max-Age=5`);
    redirectToLoginPage(res);
    return;
  }
  getUserWithSessionId(res,user);
  redirectToViewTodo(res);
};

const handlePostLoginPage=function (req,res) {
  redirectToRequiredPage(req,res);
};

const redirectToIndexPage=function (res) {
  res.redirect('loginPage.html');
};

const handleLogout=function (req,res) {
  res.setHeader('Set-Cookie',[`Expires=${new Date(1).toUTCString()}`,`sessionid=0, Expires=${new Date(1).toUTCString()}`]);
  delete req.user.sessionid;
  redirectToLoginPage(res);
};

const handleGetLoginPage=function (req,res) {
  let path='./public/loginPage.html';
  let content=fs.readFileSync(path);
  res.setHeader('Content-Type',getContentType(path));
  res.write(req.cookies.message||'');
  res.write(content);
}

exports.handleGetLoginPage=handleGetLoginPage;
exports.handleLogout=handleLogout;
exports.handleGetViewTodo=handleGetViewTodo;
exports.handlePostLoginPage=handlePostLoginPage;