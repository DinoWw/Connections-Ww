
export { translateElement };

const animationDuration = 1.5;  // in seconds

function translationAnimation(x1, y1, x2, y2, name) {

    const style = document.createElement('style');

    //console.log(x1, y1, "->", x2, y2, name)

    const kf = `
    @keyframes ${name}_ {
        0% {
            top: 0;
            left: 0;
        }
        100% {
            top: ${(y2 - y1) * 100 * 25 / 23}%;
            left: ${(x2 - x1) * 100 * 25 / 23}%;
        }
    }

    .${name} {
        animation-name: ${name}_;
        animation-duration: ${animationDuration}s;
    }
    `

    style.innerHTML = kf;
    document.getElementsByTagName('head')[0].appendChild(style);
}




// TODO: jako jako uzasna globalna varijabla, fix
let AXxjs = 0;
function translateElement(el, x1, y1, x2, y2) {
    AXxjs++;

    translationAnimation(x1, y1, x2, y2, `tr_${AXxjs}`);

    //console.log(el.firstElementChild)
    el.firstElementChild.classList.add(`tr_${AXxjs}`);
    el.classList.add("invis");
    el.firstElementChild.style["z-index"] = el.selected ? 2 : 1;

    const animationEndHandlerForAnimationId = (id) => (e) => {
        el.x = x2;
        el.y = y2;
        el.style.order = 4 * y2 + x2;
        el.classList.remove("invis");
        el.firstElementChild.classList.remove(`tr_${id}`);
        el.firstElementChild.style["z-index"] = "";
    };

    el.addEventListener("animationend", animationEndHandlerForAnimationId(AXxjs));
}