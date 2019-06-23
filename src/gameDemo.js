let gameDemo=()=>{
    canvas.addEventListener(
        "click",
        () => {
            if (ai.control) {
                ai.control = false;
                level.reset();
            }
        },
        {
            once: true,
        },
    );
}
export default gameDemo