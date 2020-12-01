# Nginx settings to Nodejs application publication using sakura VPS.
The fullsetting explanation is written here. 


## Settings for sakura VPS .

- add usr, and block access as root user. 
```
adduser user_name
passwd user_name
cd /etc/ssh
vim sshd_config
```
- edit #PermitRootLogin yes to no, and reactivate.
`systemctl restart sshd.service`

- allow sudo command
`usrmod -G wheel akitoshi`

### References.
- サーバ作成直後に設定しておくべき初期セキュリティ設定  
https://manual.sakura.ad.jp/vps/support/security/firstsecurity.html

- SiteGuard Server Edition (WAF)
https://manual.sakura.ad.jp/cloud/server/os-packages/siteguard-firewall.html

## Vim Setting.
- paste the following to the .vimrc
```
imap <C-j> <Esc>
imap <C-l> <Esc>la
imap <C-h> <Esc>i
imap <C-d> <Esc>xi
nmap <Enter> o<Esc>
nmap <C-m> o<Esc>
nmap <C-h> :tabprevious<CR>
nmap <C-l> :tabnext<CR>
set nowrap
set hlsearch
set ignorecase
set smartcase
set smartindent
set ruler
set number
set list
set wildmenu
set showcmd
set shiftwidth=4
set softtabstop=4
set expandtab
set tabstop=4
set smarttab
set clipboard=unnamedplus
```

## yum updating. 
```
yum -y update  
```

## git installation. 
```
sudo yum -y install http://opensource.wandisco.com/centos/7/git/x86_64/wandisco-git-release-7-2.noarch.rpm
sudo yum -y install git 
git --version
git config --global user.name "name"
git config --global user.email "email"
git clone https://github.com/toshiakiasakura/task_manager.git
```


### References
- How to install latest version of git on CentOS 7.x/6.x
https://stackoverflow.com/questions/21820715/how-to-install-latest-version-of-git-on-centos-7-x-6-x


## Nginx setting 
- In sakura VPS, nginx is already running. 
- basic command of enginx is the folloing,
```
nginx -t 
nginx 
nginx -s stop
nginx -s reload
ps ax | grep nginx  
ss -an | grep LISTEN | grep :80`
```

- path to nginx.conf is 
`/usr/local/nginx/conf`
- the binary data is in `/usr/local/nginx/sbin/nginx/`, then type, 
```
su 
cd
echo "export PATH=/usr/local/nginx/sbin:$PATH" >> .bash_profile
```

- To revese proxy to Nodejs application,   
write `include sites-enabled/*.conf`
- then additionally write `sites-enabled/task_manager.conf`,
```
server {
    listen 8000;
    server_name localhost;
    proxy_buffers 64 16k;
    proxy_max_temp_file_size 1024m;
    proxy_temp_path nginx_proxy_temp;
    proxy_connect_timeout 5s;
    proxy_send_timeout 10s;
    proxy_read_timeout 10s;

    root /home/akitoshi/task_manager;
    location / {
            proxy_set_header Host host;
            proxy_set_header X-Forwarded-Host host;
            proxy_set_header X-Forwarded-For proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto scheme;
            proxy_pass http://127.0.0.1:3000/;
    }
}
```

- note, this open domain name is "ik1-419-41929.vs.sakura.ne.jp"

## Nodejs installation. 
export the curl path,   
`export PATH=/usr/bin/curl:$PATH`   

- cURL upgrade. 
write the following to /etc/yum.repos.d/city-fan.repo
```
[CityFan]
name=City Fan Repo
baseurl=http://www.city-fan.org/ftp/contrib/yum-repo/rhel$releasever/$basearch/
enabled=1
gpgcheck=0
```
- then, 
```
yum clean all 
yum -y install curl
```
- install linuxbrew
```
sudo yum -y groupinstall 'Development Tools'
sudo yum -y install curl git m4 ruby texinfo bzip2-devel curl-devel expat-devel ncurses-devel zlib-devel
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
```
```
test -d ~/.linuxbrew && eval $(~/.linuxbrew/bin/brew shellenv)
test -d /home/linuxbrew/.linuxbrew && eval $(/home/linuxbrew/.linuxbrew/bin/brew shellenv)
test -r ~/.bash_profile && echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.bash_profile
echo "eval \$($(brew --prefix)/bin/brew shellenv)" >>~/.profile
brew doctor
```

- install nodebrew
```
brew install nodebrew
nodebrew -v
nodebrew setup
echo "export PATH=$HOME/.nodebrew/current/bin:$PATH" >> .bash_profile
source .bash_profile
nodebrew install v14.14.0
nodebrew use v14.14.0
```

## Nodejs Application dependencies, 
- install the following, 
```
npm install -g express-generator
npm install -g forever
```

- setting up applications.
```
cd task_manager
npm install package-lock.json
npm install typescript --save-dev
npx tsc
```

- forever start, check, kill.
```
forever start bin/www
forever list
forever stop 0
forever stop bin/www
```


## sqlite database creation. 
sqlite3 kadai.db
create table kadaitable(
    id integer PRIMARY KEY AUTOINCREMENT,
    kadai text,
    risou text,
    gyappu text,
    kaiketsu text
);

### references.
- 課題管理表をNode.jsとSQLiteで作る①
https://qiita.com/S_Yuuki/items/c9b49b893b5030be8915
