$.ready(function(){

    // 1. 轮播
    const bannerImgs = document.querySelectorAll('.banner-img');
    let currentIndex = 0;
    function autoPlay() {
        bannerImgs.forEach(img => img.classList.remove('show'));
        bannerImgs[currentIndex].classList.add('show');
        currentIndex++;
        if (currentIndex >= bannerImgs.length) currentIndex = 0;
    }
    if (bannerImgs.length) {
        setInterval(autoPlay, 3500);
        autoPlay();
    }

    // 2. jQuery写法-注册表单
    $('#regForm').submit(function(){
        let username = $('#username').val().trim();
        let pwd = $('#pwd').val().trim();
        let phone = $('#phone').val().trim();
        let email = $('#email').val().trim();

        let userReg = /^[a-zA-Z0-9_\u4e00-\u9fa5]{3,12}$/;
        let pwdReg = /^.{6,18}$/;
        let phoneReg = /^1[3-9]\d{9}$/;
        let emailReg = /^\w+@\w+\.\w+$/;

        if(!userReg.test(username)){alert('用户名格式错误');return false;}
        if(!pwdReg.test(pwd)){alert('密码6-18位');return false;}
        if(!phoneReg.test(phone)){alert('手机号错误');return false;}
        if(!emailReg.test(email)){alert('邮箱错误');return false;}

        localStorage.setItem('user',JSON.stringify({username,pwd,phone,email}));
        alert('注册成功，跳转登录');
        location.href='login.html';
        return false;
    });

    // 3. jQuery写法-登录
    $('#loginForm').submit(function(){
        let uname = $('#loginUser').val().trim();
        let upwd = $('#loginPwd').val().trim();
        let user = JSON.parse(localStorage.getItem('user')||'null');

        if(!uname||!upwd){alert('账号密码不能为空');return false;}
        if(!user){alert('请先注册');return false;}
        if(user.username===uname && user.pwd===upwd){
            localStorage.setItem('isLogin','true');
            alert('登录成功');
            location.href='../index.html';
        }else{
            alert('账号密码错误');
        }
        return false;
    });

    // 4. 登录拦截
    let loginState = localStorage.getItem('isLogin');
    let pageUrl = location.href;
    if(pageUrl.includes('share.html')||pageUrl.includes('user.html')){
        if(loginState!=='true'){
            alert('请先登录');
            location.href='login.html';
        }
    }

    // 5. 退出登录
    $('#logout').click(function(){
        localStorage.removeItem('isLogin');
        alert('已退出');
        location.href='../index.html';
    });

    // 6. 发布分享
    $('#shareForm').submit(function(){
        alert('发布成功');
        location.href='../index.html';
        return false;
    });

    // 7.分享存储
$('#shareForm').submit(function(){
    let name = $('#foodName').val();
    let type = $('#foodType').val();
    let score = $('#foodScore').val();
    let content = $('#foodContent').val();
    
    let shareList = JSON.parse(localStorage.getItem('shareList') || '[]');
    shareList.push({name, type, score, content, time: new Date().toLocaleString()});
    localStorage.setItem('shareList', JSON.stringify(shareList));
    
    alert('分享成功！已保存到个人中心');
    location.href = 'user.html';
    return false;
});
})