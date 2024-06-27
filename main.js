let sliderControl = document.querySelector(".slider-control");
let controlEls = document.querySelectorAll(".slider-control> li");
const sliderContainer = document.querySelector(".banners");
const slideItems = document.querySelectorAll(".banners li.img");
let toggle = false;

//초기 시작 페이지
let currentPage = 0;

let pagnations;

//전체 페이지 수
let totalPage = slideItems.length;

//마지막 페이지
const lastPage = slideItems.length - 1;

//페이지 전체 컨테이너 넓이
let containerCover;

//슬라이드 1장 넓이
let pageWidth = 0;

let interval;

let startPoint = slideItems[0].clientWidth;

const setTransition = (value) => {
  sliderContainer.style.transition = value;
};

const setTranslateX = ({ index, reset }) => {
  if (reset)
    sliderContainer.style.transform = `translateX(-${slideItems[0].clientWidth}px)`;
  else
    sliderContainer.style.transform = `translateX(-${
      (index + 1) * slideItems[0].clientWidth
    }px)`;
};

//클릭하면 페이지 버튼 활성화
const activePagination = (index) => {
  pagnations = document.querySelectorAll(".slider-control .btns-wrap li");
  if (pagnations.length > 0) {
    [...pagnations].forEach((btn) => {
      btn.classList.remove("On");
    });
    pagnations[index].classList.add("On");
  }
};

const handlePagination = (evt) => {
  if (evt.target.dataset.Index) {
    currentPage = parseInt(evt.target.dataset.index);
    setTransition("all 0.3s linear");
    setTranslateX({ index: currentPage });
    activePagination(currentPage);
  }
};

//페이지 전체 컨테이너 넓이 % 셋팅
function checkContainerWidth() {
  sliderContainer.style.width = `${(totalPage + 2) * 100}%`;
  containerCover = sliderContainer.style.width;
}

//슬라이드 개수가 2개 이상이면 페이지네이션 버튼 만들기
const makePagenation = () => {
  if (totalPage > 1) {
    const playBtn = document.createElement("button");
    const pauseBtn = document.createElement("button");
    playBtn.classList.add("play");
    pauseBtn.classList.add("pause");
    const btnsWrap = document.createElement("ul");
    btnsWrap.classList.add("btns-wrap");
    for (let i = 0; i < totalPage; i++) {
      const li = document.createElement("li");
      const button = document.createElement("button");
      li.dataset.index = i;
      if (i === 0) {
        li.classList.add("On");
      }
      sliderControl.appendChild(playBtn);
      sliderControl.appendChild(pauseBtn);
      sliderControl.appendChild(btnsWrap);
      btnsWrap.appendChild(li);
      li.appendChild(button);
    }
  }
  pagnations = document.querySelectorAll(".slider-control .btns-wrap li");
  pagnations.forEach((btn) => {
    btn.addEventListener("click", handlePagination);
  });
};
//재생 정지 버튼
sliderControl.addEventListener("click", function (evt) {
  evt.preventDefault();
  let target = evt.target;
  if (target.classList.contains("pause") && toggle == false) {
    toggle = true;
    clearInterval(interval);
  }
  if (target.classList.contains("play") && toggle == true) {
    toggle = false;
    interval = setInterval(autoplayIterator, 2000);
  }
});

//맨 앞 뒤 요소 복사하기
function cloneElem() {
  let cloneFirst = slideItems[0].cloneNode(true);
  let cloneLast = slideItems[lastPage].cloneNode(true);
  //맨뒤에 첫번째 화면 복사
  sliderContainer.appendChild(cloneFirst);
  //맨앞에 마지막 화면 복사
  sliderContainer.insertBefore(cloneLast, slideItems[0]);
  firstPage();
}
function firstPage() {
  let pageWidth = slideItems.lenggth + 2;
  let percent = 100 / pageWidth;
  sliderContainer.style.transform = `translateX(${-percent}%)`;
}

//n초 간격으로 슬라이드 자동 넘기기
const autoplayIterator = () => {
  currentPage += 1;
  setTransition("all 0.3s linear");
  setTranslateX({ index: currentPage });
  //현재 페이지가 마지막보다 크면
  if (currentPage > lastPage) {
    currentPage = 0;
    activePagination(0);
    setTimeout(() => {
      setTransition("0s");
      setTranslateX({ reset: true });
    }, 300);
  }
  if (currentPage <= lastPage) activePagination(currentPage);
};

const autoPlay = ({ duration }) => {
  interval = setInterval(autoplayIterator, duration);
};

const render = () => {
  makePagenation();
  checkContainerWidth();
  cloneElem();
  firstPage();
  autoPlay({ duration: 2500 });
};
render();
