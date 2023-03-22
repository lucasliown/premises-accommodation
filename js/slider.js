window.onload = function () {
    // create SlideBox array
    const slideBox = new SlideBox([
        {
            img: "../source/building1.jpg",
            title: "Comfrotable"
        },
        {
            img: "../source/building2.jpg",
            title: "Good position"
        },
        {
            img: "../source/building3.jpg",
            title: "Decoration"
        },
    ])
    slideBox.init();
}

class SlideBox {
    constructor(bannerImgs = []) {
        //image array
        this.bannerImgs = bannerImgs;
        //count the page index
        this._pageIndex = 0;
        this.slowTime = 0.5;

        // get dom object
        this.slideBoxDom = document.querySelector(".slide-box") || null;
        this.slideBtnLeftDom = document.querySelector(".slide-btn-left") || null;
        this.slideBtnRightDom = document.querySelector(".slide-btn-right") || null;
        this.bannerDom = document.querySelector(".banner") || null;
        this.paginationBoxDom = document.querySelector(".pagination-box") || null;

        this.throttle = (() => {
            let timer = null;
            return function (fn, cb) {
                if (timer) return;
                fn();
                timer = setTimeout(() => {
                    timer = null;
                    cb();
                }, this.slowTime * 1000);
            }
        })();

        // timer
        this.slideTimer = null;

    }

    get pageIndex() {
        return this._pageIndex;
    }

    //add listener to check pageindex,if index is chenge, chenge the page
    set pageIndex(num) {
        this.throttle(() => {
            this.changePage(num, true);
            //if reach the end of the image, change number to implement the loop
            if(num === -1) {
                num = this.bannerImgs.length - 1;
            } else if (num === this.bannerImgs.length) {
                num = 0;
            }
            this.changePagination(num, this._pageIndex)
        }, () => {
            this.changePage(num, false);
            this._pageIndex = num;
        });

    }

    init() {
        this.drawDOM(this.pageIndex);

        // listen the event
        this.slideBtnLeftDom.addEventListener("click", () => {
            this.pageIndex--;
        });
        this.slideBtnLeftDom.addEventListener("mouseout", () => {
            this.playSlide();
        });
        this.slideBtnLeftDom.addEventListener("mouseover", () => {
            this.stopSlide();
        });

        this.slideBtnRightDom.addEventListener("click", () => {
            this.pageIndex++;
        });
        this.slideBtnRightDom.addEventListener("mouseout", () => {
            this.playSlide();
        });
        this.slideBtnRightDom.addEventListener("mouseover", () => {
            this.stopSlide();
        });

        this.paginationBoxDom.addEventListener("mouseout", () => {
            this.playSlide();
        });
        this.paginationBoxDom.addEventListener("mouseover", () => {
            this.stopSlide();
        });

        // active slider
        this.playSlide();
    }

    // the function of active slider
    playSlide() {
        this.slideTimer = setInterval(() => {
            this.pageIndex++;
        }, 4000);
    }

    // end of slider
    stopSlide() {
        clearInterval(this.slideTimer);
    }

    // change the current page
    changePage(index, isAnim) {
        this.bannerDom.style.transition = !!isAnim ? `left ${this.slowTime}s` : "none";
        this.bannerDom.style.left = `${(-index -1) * 100}%`;
    }

    // change pagination
    changePagination(index, oldIndex) {
        this.paginationBoxDom.children[oldIndex].classList.remove("chose");
        this.paginationBoxDom.children[index].classList.add("chose");
    }

    // render DOM
    drawDOM(pageIndex) {
        //add additional image for seamless switching
        this.bannerDom.innerHTML = [
            this.getBannerItemHTML(this.bannerImgs[this.bannerImgs.length - 1]),
            this.bannerImgs.reduce((html, item) => {
                return html + this.getBannerItemHTML(item);
            }, ''),
            this.getBannerItemHTML(this.bannerImgs[0])
        ].join("");
        this.changePage(pageIndex, false);

        //pagination
        this.bannerImgs.forEach((item, i) => {
            const span = document.createElement("span");
            span.style.transition = `all ${this.slowTime}s`;
            if(i === pageIndex) {
                span.classList.add("chose");
            }
            span.addEventListener("click", () => {
                this.pageIndex = i;
            });
            this.paginationBoxDom.append(span);
        })
    }

    //get banner-item Dom string for dynamic render
    getBannerItemHTML(bannerImg) {
        return `
            <div class="banner-item" 
                style="background-image: url(./images/${bannerImg.img});">
                <div class="bi-content">
                    <h1>
                        <span>${bannerImg.title}</span>
                    </h1>
                    <button><span>Learn More</span></button>
                </div>
            </div>
        `
    }
}