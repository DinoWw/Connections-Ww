
const animationDuration = 4;

function translationAnimation(x1, y1, x2, y2, name) {

    const style = document.createElement('style');


    const kf = `
    @keyframes ${name}_ {
        0% {
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
        }
        100% {
            top: ${(x2 - x1) * 100 * 25 / 23}%;
            left: ${(y2 - y1) * 100 * 25 / 23}%;
        }
    }

    .${name} {
        animation-name: ${name}_;
        animation-duration: ${animationDuration}s;
    }


    `//.replace('\n', '');


    style.innerHTML = kf;
    document.getElementsByTagName('head')[0].appendChild(style);
}



// ako ne radi setTimeout ovdje mayb
setTimeout(() => {
    
}, 2000);

