import utils from './utils';
import Icons from './icons';
import { util } from 'prettier';

class Controller {
    constructor(player) {
        this.player = player;
        if (!utils.isMobileDevice) {
            this.initPlayButton();
            this.initPlayBar();
            this.initOrderButton();
            this.initLoopButton();
            this.initMenuButton();
            this.initVolumeButton();
            this.initMiniSwitcher();
            this.initSkipButton();
            this.initLrcButton();
            this.initShareButton();
            this.initFavButton();
            this.initAddToButton();
            this.initShowInfoButton();
        } else {
            this.initTitleClick();
            this.initCloseButton();
            this.initPlayButton();
            this.initPlayBar();
            this.initPlayBarMobile();
            this.initOrderButton();
            this.initLoopButton();
            // this.initMenuButton();
            // this.initVolumeButton();
            // this.initMiniSwitcher();
            this.initSkipButton();
            // this.initLrcButton();
            // this.initShareButton();
            // this.initFavButton();
        }
    }

    initPlayButton() {
        this.player.template.pic.addEventListener('click', () => {
            this.player.toggle();
        });
    }
    
    initPlayBar() {
        const thumbMove = (e) => {
            let percentage = ((e.clientX || e.changedTouches[0].clientX) - this.player.template.barWrap.getBoundingClientRect().left) / this.player.template.barWrap.clientWidth;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.bar.set('played', percentage, 'width');
            this.player.lrc && this.player.lrc.update(percentage * this.player.duration);
            this.player.template.ptime.innerHTML = utils.secondToTime(percentage * this.player.duration);
        };

        const thumbUp = (e) => {
            document.removeEventListener(utils.nameMap.dragEnd, thumbUp);
            document.removeEventListener(utils.nameMap.dragMove, thumbMove);
            let percentage = ((e.clientX || e.changedTouches[0].clientX) - this.player.template.barWrap.getBoundingClientRect().left) / this.player.template.barWrap.clientWidth;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.bar.set('played', percentage, 'width');
            this.player.seek(percentage * this.player.duration,'played');
            this.player.disableTimeupdate = false;
        };

        this.player.template.barWrap.addEventListener(utils.nameMap.dragStart, () => {
            this.player.disableTimeupdate = true;
            document.addEventListener(utils.nameMap.dragMove, thumbMove);
            document.addEventListener(utils.nameMap.dragEnd, thumbUp);
        });
    }
    
    initPlayBarMobile() {
        const thumbMove = (e) => {
            let percentage = ((e.clientX || e.changedTouches[0].clientX) - this.player.template.barWrapMobile.getBoundingClientRect().left) / this.player.template.barWrapMobile.clientWidth;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.bar.set('playedMobile', percentage, 'width');
            this.player.lrc && this.player.lrc.update(percentage * this.player.duration);
            this.player.template.ptime.innerHTML = utils.secondToTime(percentage * this.player.duration);
        };

        const thumbUp = (e) => {
            document.removeEventListener(utils.nameMap.dragEnd, thumbUp);
            document.removeEventListener(utils.nameMap.dragMove, thumbMove);
            let percentage = ((e.clientX || e.changedTouches[0].clientX) - this.player.template.barWrapMobile.getBoundingClientRect().left) / this.player.template.barWrapMobile.clientWidth;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.bar.set('playedMobile', percentage, 'width');
            this.player.seek(percentage * this.player.duration,'playedMobile');
            this.player.disableTimeupdate = false;
        };
        
        this.player.template.barWrapMobile.addEventListener(utils.nameMap.dragStart, () => {
            this.player.disableTimeupdate = true;
            document.addEventListener(utils.nameMap.dragMove, thumbMove);
            document.addEventListener(utils.nameMap.dragEnd, thumbUp);
        });
    }



    initVolumeButton() {
        this.player.template.volumeButton.addEventListener('click', () => {
            if (this.player.audio.muted) {
                this.player.volume(this.player.audio.volume, true);
            } else {
                this.player.audio.muted = true;
                this.player.switchVolumeIcon();
                this.player.bar.set('volume', 0, 'width');
            }
        });

        const thumbMove = (e) => {
            let percentage = ((e.clientX || e.changedTouches[0].clientX) - this.player.template.volumeBar.getBoundingClientRect().left) / this.player.template.volumeBar.clientWidth;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.volume(percentage);
        };

        const thumbUp = (e) => {
            this.player.template.volumeBarWrap.classList.remove('aplayer-volume-bar-wrap-active');
            document.removeEventListener(utils.nameMap.dragEnd, thumbUp);
            document.removeEventListener(utils.nameMap.dragMove, thumbMove);
            let percentage = ((e.clientX || e.changedTouches[0].clientX) - this.player.template.volumeBar.getBoundingClientRect().left) / this.player.template.volumeBar.clientWidth;
            percentage = Math.max(percentage, 0);
            percentage = Math.min(percentage, 1);
            this.player.volume(percentage);
        };

        this.player.template.volumeBarWrap.addEventListener(utils.nameMap.dragStart, () => {
            this.player.template.volumeBarWrap.classList.add('aplayer-volume-bar-wrap-active');
            document.addEventListener(utils.nameMap.dragMove, thumbMove);
            document.addEventListener(utils.nameMap.dragEnd, thumbUp);
        });
    }

    initOrderButton() {
        this.player.template.order.addEventListener('click', () => {
            if (this.player.options.order === 'list') {
                this.player.options.order = 'random';
                this.player.template.order.innerHTML = Icons.orderRandom;
            } else if (this.player.options.order === 'random') {
                this.player.options.order = 'list';
                this.player.template.order.innerHTML = Icons.orderList;
            }
        });
    }

    initLoopButton() {
        this.player.template.loop.addEventListener('click', () => {
            if (this.player.list.audios.length > 1) {
                if (this.player.options.loop === 'one') {
                    this.player.options.loop = 'none';
                    this.player.template.loop.innerHTML = Icons.loopNone;
                } else if (this.player.options.loop === 'none') {
                    this.player.options.loop = 'all';
                    this.player.template.loop.innerHTML = Icons.loopAll;
                } else if (this.player.options.loop === 'all') {
                    this.player.options.loop = 'one';
                    this.player.template.loop.innerHTML = Icons.loopOne;
                }
            } else {
                if (this.player.options.loop === 'one' || this.player.options.loop === 'all') {
                    this.player.options.loop = 'none';
                    this.player.template.loop.innerHTML = Icons.loopNone;
                } else if (this.player.options.loop === 'none') {
                    this.player.options.loop = 'all';
                    this.player.template.loop.innerHTML = Icons.loopAll;
                }
            }
        });
    }

    initMenuButton() {
        this.player.template.menu.addEventListener('click', () => {
            this.player.list.toggle();
            this.player.template.details.classList.remove('aplayer-details-show');
            this.player.template.details.classList.add('aplayer-details');
        });
    }

    initMiniSwitcher() {
        // this.player.template.miniSwitcher.addEventListener('click', () => {
        this.player.setMode(this.player.mode === 'normal');
        // });
    }

    initSkipButton() {
        this.player.template.skipBackButton.addEventListener('click', () => {
            this.player.skipBack();
        });
        this.player.template.skipForwardButton.addEventListener('click', () => {
            this.player.skipForward();
        });
        this.player.template.skipPlayButton.addEventListener('click', () => {
            this.player.toggle();
        });
        if(utils.isMobileDevice){
            this.player.template.skipPlayButtonMobile.addEventListener('click', () => {
                this.player.toggle();
            });
        }
    }

    initLrcButton() {
        this.player.template.lrcButton.addEventListener('click', () => {
            this.player.list.hide();
            if (this.player.template.details.classList.contains('aplayer-details-show')) {
                this.player.template.details.classList.remove('aplayer-details-show');
                this.player.template.details.classList.add('aplayer-details');
            } else {
                console.log(this.player.template.details.classList);
                this.player.template.details.classList.add('aplayer-details-show');
                this.player.template.details.classList.remove('aplayer-details');
            }

            this.player.template.shareMenu.style.display = 'block';
            this.player.template.shareContainer.style.display = 'none';
        });
    }


    initShareButton() {
        this.player.template.shareMenu.addEventListener('click', () => {
            this.player.template.shareMenu.style.display = 'none';
            this.player.template.shareContainer.style.display = 'flex';
        });
    }

    initAddToButton() {
        this.player.template.aplayerAddTo.addEventListener('click', () => {
            let list = this.player.list
            let index = list.index
            let audios = list.audios
            let currentAudio = audios[index]
            let detail = currentAudio.favDetail
            eval(currentAudio.addto)(detail.id)
        });
    }

    initShowInfoButton() {
        this.player.template.aplayerShow.addEventListener('click', () => {
            let list = this.player.list
            let index = list.index
            let audios = list.audios
            let currentAudio = audios[index]
            let detail = currentAudio.favDetail
            eval(currentAudio.showInfo)(detail.detail)
        });
    }

    initFavButton() {
        this.player.template.aplayerFav.addEventListener('click', () => {
            let list = this.player.list
            let index = list.index
            let audios = list.audios
            let currentAudio = audios[index]
            let detail = currentAudio.favDetail
            let value = eval(currentAudio.favFunction)(detail.id, detail.index, detail.flag)
            detail.flag = value
            // if(!utils.isMobileDevice){
                if (detail.flag) {
                    this.player.template.aplayerFav.innerHTML = "Remove From Fav"
                } else {
                    this.player.template.aplayerFav.innerHTML = "Add To Fav"
                }
            // }
            // console.log(list);
            this.player.list = list
        });
    }

    initTitleClick() {
        this.player.template.title.addEventListener('click', () => {
            this.player.template.body.style.display = 'none';
            this.player.template.mobileDetail.style.display = 'flex';
        });
    }

    initCloseButton() {
        this.player.template.mobileClose.addEventListener('click', () => {
            this.player.template.body.style.display = 'block';
            this.player.template.mobileDetail.style.display = 'none';
        });
    }

}

export default Controller;
