let autoWatchVideo = null;

class AUTO_WATCH_VIDEO {
  constructor() {
    this.video_dom_arr = []; // 当前章节中所有的 video dom
    this.video_num = 0; // 当前页面上所有 video dom 数量
    this.video_idx = 0; // 当前正在观看的 video 下标

    this.init();
  }

  init() {
    this.get_dom(document);
    this.video_num = this.video_dom_arr.length;

    if (this.video_num > 0) {
      this.each_watch_video();
    }
  }

  // 获取页面上所有的 video dom
  get_dom(DOC = document) {
    let _this = this;
    let iframe_dom = DOC.querySelectorAll('iframe'); // 获取当前页面上所有的 iframe dom

    // 循环所有 iframe dom 查找当前 iframe 页面内的所有 video
    iframe_dom.forEach((element, index) => {
      let video_dom = element.contentWindow.document.querySelectorAll('video'); // 查找当前 iframe 页面内的所有 video dom

      video_dom.forEach((element2, index2) => {
        _this.video_dom_arr.push(element2); // 添加当前页面的所有 video dom
      });

      this.get_dom(element.contentWindow.document); // 将当前的 iframe dom 递归向下查找
    });
  }

  // 循环播放所有 video
  each_watch_video() {
    let _this = this;

    // 视频播放结束事件
    _this.video_dom_arr[_this.video_idx].addEventListener('ended', () => {
      console.log(`第${_this.video_idx}个视频播放结束，共${_this.video_num}个视频`);

      // 检查当前播放的是第几个，如果所有的 video 都播放完则开启下一章节
      if (_this.video_idx < _this.video_num) {
        _this.each_watch_video();
      } else {
        _this.icon_click();
      }
    });

    // 开始播放视频
    _this.video_dom_arr[_this.video_idx].play();

    _this.video_idx++;

    console.log(`开始播放第${_this.video_idx}个视频，共${_this.video_num}个视频`);
  }

  // 点击最新章节
  icon_click() {
    let _this = this;
    let icon_dom = $('.roundpoint,.roundpointStudent'); // 重新获取章节的播放状态
    let count = 0;

    [].forEach.call(icon_dom, (element, index) => {
      if (!element.classList.contains('blue') && count <= 0) {
        console.log(`当前章节已播放完所有视频，共${_this.video_idx}个视频`);

        $(element).next().find('span').click();

        setTimeout(() => {
          autoWatchVideo = new AUTO_WATCH_VIDEO();
        }, 10 * 1000);

        count++;
      }
    });
  }
}

autoWatchVideo = new AUTO_WATCH_VIDEO();
