function translationAnimation(x1, y1, x2, y2, name){


    return `
    @keyframes ${name} {
        0% {
            position: absolute;
            top: 0;
            left: 0;
        }
        100% {
            position: absolute;
            top: ${(x2-x1) * 25}%;
            left: ${(y2-y1) * 25}%;
        }
    }
    `.replace('\n', '');
}