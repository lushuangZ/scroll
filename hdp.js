var ppt = {
    $slider:$('.slider'),
    len:$('.slider').length,
    $ul:$('.order ul'),
    $btn:$('.btn'),
    activeIndex : 0,
    flag:false,
    timer:undefined,
    lastIndex:undefined,
    init: function () {
        if(this.len > 1){
            this.createDom(this.len);
            this.bindEvent();
            this.sliderAuto();
        }

},
createDom: function(len){
        var orderStr = ''
        for (var i = 0;i < len ;i++ ){
            orderStr += '<li>' + i + '</li>'
        }
        this.$ul.append ($(orderStr)).find($('li:eq(0)').addClass('active'))
        var btnStr = '<div class = "prev_btn"></div><div class = "next_btn"></div>'
        this.$btn.append($(btnStr));
    },
    bindEvent:function(){
        var _this = this;
        $('li').add($('.prev_btn')).add($('.next_btn')).on('click',function () {
            if($(this).attr('class') == 'prev_btn'){
                _this.tool('prev');
            }else if ($(this).attr('class') == 'next_btn'){
                _this.tool('next');
                
            }else{
                var index = $(this).index();
                _this.tool(index);
                
            }
        })
        this.$slider.on('out',function(){
            $(this).fadeOut(300).find($('img')).animate({width:'0%'},'linear');
        })
        this.$slider.on('in',function(){
            $(this).fadeIn(300).find($('img')).delay(300).animate({width:'40%'},300,'linear',function(){
                _this.flag = false;
                _this.sliderAuto();
            });
        })

    },
    tool:function(text){
        if (!this.flag){
            this.getIndex(text)
            if(this.activeIndex != this.lastIndex){
            this.flag = true;
            this.changeClass(this.activeIndex) ;
            this.$slider.eq(this.lastIndex).trigger('out');
            this.$slider.eq(this.activeIndex).delay(300).trigger('in');
            }
        }
    },
    getIndex:function(text){
        this.lastIndex = this.activeIndex;
        if(text == 'prev'){
            this.activeIndex = this.activeIndex == 0?this.len - 1 : this.activeIndex - 1;
        }else if(text == 'next'){
            this.activeIndex = this.activeIndex == this.len - 1? 0 : this.activeIndex + 1;
        }else{
            this.activeIndex = text;
        }
        console.log(this.lastIndex + '-' + this.activeIndex);
    },
    changeClass:function (index) {
        $('.active').removeClass('active')
        $('li').eq(index).addClass('active');
        
    },
    sliderAuto:function(){
        clearTimeout(this.timer);
        var _this = this;
        this.timer = setTimeout(function(){
            _this.tool('next');
        },3000)
    }
}
ppt.init();
