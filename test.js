function TestBalls(ballz){
    
    let v0 = createVector(ballz.position.x,ballz.position.y);
    let v1 = createVector(ballz.direction.x, ballz.direction.y);

    drawArrow(v0, v1, 'black');

    let myHeading = v1.heading();
    noStroke();
    text(
        'vector heading: ' +
        myHeading.toFixed(2) +
        ' radians or ' +
        degrees(myHeading).toFixed(2) +
        ' degrees',
        10,
        50,
        90,
        50
    );
}

// draw an arrow for a vector at a given base position
function drawArrow(base, vec, myColor) {
    push();
    stroke(myColor);
    strokeWeight(3);
    fill(myColor);
    translate(base.x, base.y);
    line(base.x,base.y, vec.x, vec.y);
    rotate(vec.heading());
    let arrowSize = 7;
    translate(vec.mag() - arrowSize, 0);
    triangle(0, arrowSize / 2, 0, -arrowSize / 2, arrowSize, 0);
    pop();
}