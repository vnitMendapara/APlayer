import Icons from './icons';
import tplPlayer from '../template/player.art';
import utils from './utils.js';

class Template {
    constructor(options) {
        this.container = options.container;
        this.options = options.options;
        this.randomOrder = options.randomOrder;
        this.init();
    }

    init() {
        console.log(utils.isMobileDevice);
        let cover = '';
        if (this.options.audio.length) {
            if (this.options.order === 'random') {
                cover = this.options.audio[this.randomOrder[0]].cover;
            } else {
                cover = this.options.audio[0].cover;
            }
        }

        this.container.innerHTML = tplPlayer({
            options: this.options,
            icons: Icons,
            isMobileDevice: utils.isMobileDevice,
            cover: cover,
            getObject: (obj) => obj,
        });

        if (!utils.isMobileDevice) {
            this.lrc = this.container.querySelector('.aplayer-lrc-contents');
            this.lrcWrap = this.container.querySelector('.aplayer-lrc');
            this.ptime = this.container.querySelector('.aplayer-ptime');
            this.info = this.container.querySelector('.aplayer-info');
            this.time = this.container.querySelector('.aplayer-time');
            this.barWrap = this.container.querySelector('.aplayer-bar-wrap');
            this.button = this.container.querySelector('.aplayer-button');
            this.body = this.container.querySelector('.aplayer-body');
            this.list = this.container.querySelector('.aplayer-list');
            this.listCurs = this.container.querySelectorAll('.aplayer-list-cur');
            this.played = this.container.querySelector('.aplayer-played');
            this.loaded = this.container.querySelector('.aplayer-loaded');
            this.thumb = this.container.querySelector('.aplayer-thumb');
            this.volume = this.container.querySelector('.aplayer-volume');
            this.volumeBar = this.container.querySelector('.aplayer-volume-bar');
            this.volumeButton = this.container.querySelector('.aplayer-time button');
            this.volumeBarWrap = this.container.querySelector('.aplayer-volume-bar-wrap');
            this.loop = this.container.querySelector('.aplayer-icon-loop');
            this.order = this.container.querySelector('.aplayer-icon-order');
            this.menu = this.container.querySelector('.aplayer-icon-menu');
            this.pic = this.container.querySelector('.aplayer-pic');
            this.title = this.container.querySelector('.aplayer-title');
            this.author = this.container.querySelector('.aplayer-author');
            this.dtime = this.container.querySelector('.aplayer-dtime');
            this.notice = this.container.querySelector('.aplayer-notice');
            this.miniSwitcher = this.container.querySelector('.aplayer-miniswitcher');
            this.skipBackButton = this.container.querySelector('.aplayer-icon-back');
            this.skipForwardButton = this.container.querySelector('.aplayer-icon-forward');
            this.skipPlayButton = this.container.querySelector('.aplayer-icon-play');
            this.lrcButton = this.container.querySelector('.aplayer-icon-lrc');
            this.details = this.container.querySelector('.aplayer-details');
            this.menuOptions = this.container.querySelector('.aplayer-extra-options');
            this.shareContainer = this.container.querySelector('.aplayer-share-container');
            this.shareMenu = this.container.querySelector('.aplayer-share');
            this.shareFacebook = this.container.querySelector('.aplayer-facebook-share');
            this.shareEmail = this.container.querySelector('.aplayer-email-share');
            this.shareTwitter = this.container.querySelector('.aplayer-twitter-share');
            this.shareWhatsapp = this.container.querySelector('.aplayer-whatsapp-share');
            this.aplayerFav = this.container.querySelector('.aplayer-fav');
            this.aplayerAddTo = this.container.querySelector('.aplayer-add-to');
            this.aplayerShow = this.container.querySelector('.aplayer-show');
        } else {
            this.body = this.container.querySelector('.aplayer-body');
            this.title = this.container.querySelector('.aplayer-title');
            this.titleMobile = this.container.querySelector('.aplayer-title-mobile');
            this.mobileDetail = this.container.querySelector('.aplayer-mobile-details');
            this.authorMobile = this.container.querySelector('.aplayer-author-mobile');
            this.mobileClose = this.container.querySelector('.aplyer-mobile-close');
            this.ptime = this.container.querySelector('.aplayer-ptime');
            this.info = this.container.querySelector('.aplayer-info');
            this.time = this.container.querySelector('.aplayer-time');
            this.barWrap = this.container.querySelector('.aplayer-bar-wrap');
            this.button = this.container.querySelector('.aplayer-button');
            this.list = this.container.querySelector('.aplayer-list');
            this.listCurs = this.container.querySelectorAll('.aplayer-list-cur');
            this.played = this.container.querySelector('.aplayer-played');
            this.loaded = this.container.querySelector('.aplayer-loaded');
            this.thumb = this.container.querySelector('.aplayer-thumb');
            this.barWrapMobile = this.container.querySelector('.aplayer-bar-wrap-mobile');
            this.playedMobile = this.container.querySelector('.aplayer-played-mobile');
            this.loadedMobile = this.container.querySelector('.aplayer-loaded-mobile');
            this.thumbMobile = this.container.querySelector('.aplayer-thumb-mobile');
            this.loop = this.container.querySelector('.aplayer-icon-loop');
            this.order = this.container.querySelector('.aplayer-icon-order');
            this.menu = this.container.querySelector('.aplayer-icon-menu');
            this.pic = this.container.querySelector('.aplayer-pic');
            this.author = this.container.querySelector('.aplayer-author');
            this.dtime = this.container.querySelector('.aplayer-dtime');
            this.notice = this.container.querySelector('.aplayer-notice');
            this.miniSwitcher = this.container.querySelector('.aplayer-miniswitcher');
            this.skipBackButton = this.container.querySelector('.aplayer-icon-back');
            this.skipForwardButton = this.container.querySelector('.aplayer-icon-forward');
            this.skipPlayButton = this.container.querySelector('.aplayer-icon-play');
            this.skipPlayButtonMobile = this.container.querySelector('.aplayer-icon-play-mobile');
            this.lrcButton = this.container.querySelector('.aplayer-icon-lrc');
            this.details = this.container.querySelector('.aplayer-details');
            this.menuOptions = this.container.querySelector('.aplayer-extra-options');
            this.shareContainer = this.container.querySelector('.aplayer-share-container');
            this.shareMenu = this.container.querySelector('.aplayer-share');
            this.shareFacebook = this.container.querySelector('.aplayer-facebook-share');
            this.shareEmail = this.container.querySelector('.aplayer-email-share');
            this.shareTwitter = this.container.querySelector('.aplayer-twitter-share');
            this.shareWhatsapp = this.container.querySelector('.aplayer-whatsapp-share');
            this.aplayerFav = this.container.querySelector('.aplayer-fav');
        }
    }
}

export default Template;
