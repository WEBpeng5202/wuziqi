$(function () {
    let box=$('.box');
    let flag=true;
    let hei={};
    let bai={};
    let blank={};
    let btn=$('button');
    let ai;
    let f1=0,f2=0;
    let fs=$('.fs>strong');
    let audio=new Audio('ChineseBG.mp3');
    let KG=true;
    audio.play();
    btn.click(function () {
        $(this).css({
           border:'1px solid red'
        });
        if ($(this).text()=='人机对战'){
            ai=true;
        }else if ($(this).text()=='人人对战'){
            ai=false;
        }else if ($(this).text()=='重新开始'){
            hei={};
            bai={};
            blank={};
            $('.Bw').removeClass('block');
            $('.Ww').removeClass('block');
            btn.css({border:'1px solid transparent'})
            $('span').removeClass('black white pieces').remove();
            for (let i=0;i<15;i++){
                $('<i>').appendTo(box);
                $('<b>').appendTo(box);
                for (let j=0;j<15;j++){
                    $('<span>').attr('id',i+"_"+j).appendTo(box).addClass('pieces').data('pos',{x:i,y:j});
                    blank[i+"_"+j]=true;
                }
            }
            flag=true;
            box.on('click','.pieces',function () {
                if ($(this).hasClass('black')||$(this).hasClass('white')){
                    return;
                }
                let data=$(this).data('pos');
                if (flag){
                    $(this).addClass('black');
                    hei[data.x+"_"+data.y]=true;
                    delete blank[data.x+"_"+data.y];
                    if (isSuccess(data,hei)===5){
                        f1++;
                        box.off('click');
                        $('.Bw').delay(1000).addClass('block');
                        fs[0].innerText=f1;
                    }
                    if (ai){
                        let pos= position ();
                        $("#"+pos.x+"_"+pos.y).addClass('white');
                        bai[pos.x+"_"+pos.y]=true;
                        delete blank[pos.x+"_"+pos.y];
                        if (isSuccess(pos,bai)===5){
                            f2++;
                            box.off('click');
                            $('.Ww').delay(1000).addClass('block');
                            fs[1].innerText=f2;
                        }
                        return;
                    }
                }else {
                    $(this).addClass('white');
                    bai[data.x+"_"+data.y]=true;
                    if (isSuccess(data,bai)===5){
                        f2++;
                        box.off('click');
                        $('.Ww').delay(1000).addClass('block');
                        fs[1].innerText=f2;
                    }
                }
                flag=!flag;

            });

        }else if ($(this).text()=='背景音乐'){
            if(KG){
                audio.pause();
            }else {
                audio.play();
            }
            KG=!KG;
        }
    });


    for (let i=0;i<15;i++){
        $('<i>').appendTo(box);
        $('<b>').appendTo(box);
        for (let j=0;j<15;j++){
            $('<span>').attr('id',i+"_"+j).appendTo(box).addClass('pieces').data('pos',{x:i,y:j});
            blank[i+"_"+j]=true;
        }
    }
    box.on('click','.pieces',function () {
        if ($(this).hasClass('black')||$(this).hasClass('white')){
            return;
        }
        let data=$(this).data('pos');
        if (flag){
            $(this).addClass('black');
            hei[data.x+"_"+data.y]=true;
            delete blank[data.x+"_"+data.y];
            if (isSuccess(data,hei)===5){
                f1++;
                fs[0].innerText=f1;
                box.off('click');
                $('.Bw').delay(1000).addClass('block');
            }
            if (ai){
                let pos= position ();
                $("#"+pos.x+"_"+pos.y).addClass('white');
                bai[pos.x+"_"+pos.y]=true;
                delete blank[pos.x+"_"+pos.y];
                if (isSuccess(pos,bai)===5){
                    f2++;
                    fs[1].innerText=f2;
                    box.off('click');
                    $('.Ww').delay(1000).addClass('block');
                }
                return;
            }
        }else {
            $(this).addClass('white');
            bai[data.x+"_"+data.y]=true;
            if (isSuccess(data,bai)===5){
                f2++;
                fs[1].innerText=f2;
                box.off('click');
                $('.Ww').delay(1000).addClass('block');
            }
        }
        flag=!flag;

    });
    function isSuccess(data,colorObj) {
        let row=1,col=1,zx=1,yx=1;
        let x=data.x,y=data.y;
        while (colorObj[x+"_"+(++y)]){
            row++;
        }
        x=data.x,y=data.y;
        while (colorObj[x+"_"+(--y)]){
            row++;
        }
        x=data.x,y=data.y;
        while (colorObj[(++x)+"_"+y]){
            col++;
        }
        x=data.x,y=data.y;
        while (colorObj[(--x)+"_"+y]){
            col++;
        }
        x=data.x,y=data.y;
        while (colorObj[(++x)+"_"+(++y)]){
            yx++;
        }
        x=data.x,y=data.y;
        while (colorObj[(--x)+"_"+(--y)]){
            zx++;
        }
        x=data.x,y=data.y;
        while (colorObj[(++x)+"_"+(--y)]){
            yx++;
        }
        x=data.x,y=data.y;
        while (colorObj[(--x)+"_"+(++y)]){
            zx++;
        }

        return Math.max(row,col,zx,yx);

    }
    function position() {
        let score1=0,score2=0,pos1=null,pos2=null;
        for (let i in blank){
            let obj={x:i.split('_')[0],y:i.split('_')[1]};
            if (isSuccess(obj,hei)>score1){
                score1=isSuccess(obj,hei);
                pos1=obj;
            }else if (isSuccess(obj,bai)>score2){
                score2=isSuccess(obj,bai);
                pos2=obj;
            }
        }
        return score1<=score2?pos2:pos1;
    }

});